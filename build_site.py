"""Builds index.html from projects.json. Run after editing projects.json:  python build_site.py"""
import json, os, re, subprocess, sys

# ----- Site settings: edit these -----
SITE = {
    "owner": "sophie4star",
    "repo": "sophie4star-portfolio",   # the GitHub repository that holds the files
    "branch": "main",
    "name": "Sophie Krajmalnik",
    "tagline": "Data science and product work that turns messy data into decisions people act on.",
    "intro": [
        "I'm a data scientist and product manager (UNT B.S. Data Science, class of 2027) with experience spanning marketing, student affairs, technical research, and camp programming. My projects range from a crash-simulation study and wearable sensor prototypes to a 14,873-record education dataset and a team case on scaling operations.",
        "Most recently, my team's CTRL product won first place among 8 teams at a selective hackathon and earned a $10,000 grant toward production.",
    ],
    "photo": "images/profile.jpg",
    "contact": {"email": "sophie4star@live.com", "github": "https://github.com/sophie4star", "linkedin": "https://www.linkedin.com/in/sophie-krajmalnik"},
    "updated": "2026-11-05",
}

HERE = os.path.dirname(os.path.abspath(__file__))
records = json.load(open(os.path.join(HERE, "projects.json"), encoding="utf-8"))
schema = json.load(open(os.path.join(HERE, "projects.schema.json"), encoding="utf-8"))

# Validate against the schema so bad vocabulary or missing fields fail the build.
try:
    import jsonschema
    validator = jsonschema.Draft202012Validator(schema)
    errors = [(r.get("project_id"), e.message) for r in records for e in validator.iter_errors(r)]
    if errors:
        print("Schema errors (build stopped):")
        for pid, msg in errors:
            print(" -", pid, msg)
        sys.exit(1)
    print("Schema check passed.")
except ImportError:
    print("jsonschema not installed: skipping schema check.")

# Only public projects are published. Private records never reach the HTML.
# Search text: the words in each public project's readable files (PDFs, code, READMEs).
# Set PORTFOLIO_REPO to the folder that holds the repository's files.
REPO_DIR = os.environ.get("PORTFOLIO_REPO", os.path.join(HERE, "..", "portfolio"))
TEXT_EXT = (".pdf", ".py", ".rmd", ".md")

def file_text(filename):
    path = os.path.join(REPO_DIR, filename)
    if not os.path.isfile(path) or not filename.lower().endswith(TEXT_EXT):
        return ""
    if filename.lower().endswith(".pdf"):
        try:
            out = subprocess.run(["pdftotext", "-q", path, "-"], capture_output=True, text=True, timeout=120).stdout
        except (OSError, subprocess.SubprocessError):
            return ""
    else:
        out = open(path, encoding="utf-8", errors="ignore").read()
    return re.sub(r"\s+", " ", out).strip()

if not os.path.isdir(REPO_DIR):
    print(f"Note: repository folder not found at {REPO_DIR}; project search covers the written fields only.")

public = [r for r in records if r.get("visibility") == "public"]
for r in public:
    texts = [file_text(a["filename"]) for a in r.get("artifacts", [])]
    r["search_text"] = " ".join(t for t in texts if t)[:300000]
print("Indexed file text:", {r["project_id"]: len(r["search_text"]) for r in public})
hidden = [r["project_id"] for r in records if r.get("visibility") != "public"]
payload = {"site": SITE, "projects": public}
data_json = json.dumps(payload, ensure_ascii=False).replace("</", "<\\/")

html = open(os.path.join(HERE, "template.html"), encoding="utf-8").read().replace("__PORTFOLIO_DATA__", data_json)
open(os.path.join(HERE, "index.html"), "w", encoding="utf-8").write(html)
print(f"Wrote index.html with {len(public)} public projects. Not published: {hidden or 'none'}")
