import React from 'react';
import portfolio from '../data/portfolio.json';
import './Contact.css';

function Contact() {
  const { identity, education, honors, languages } = portfolio;

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-column">
          <h3>Get In Touch</h3>
          <p>Open to roles in AI/ML, Product Management, and Data Science</p>
          <div className="contact-links">
            <a href={`mailto:${identity.contact.email}`} className="contact-link">
              📧 Email
            </a>
            <a href={identity.contact.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
              🔗 LinkedIn
            </a>
            <a href={identity.contact.linktree} target="_blank" rel="noopener noreferrer" className="contact-link">
              🌐 Linktree
            </a>
          </div>
        </div>

        <div className="contact-column">
          <h3>Education</h3>
          <div className="edu-list">
            {education.map((edu, idx) => (
              <div key={idx} className="edu-item">
                <p className="edu-degree">{edu.degree}</p>
                <p className="edu-institution">{edu.institution}</p>
                <p className="edu-meta">{edu.date} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-column">
          <h3>Honors & Awards</h3>
          <ul className="honors-list">
            {honors.map((honor, idx) => (
              <li key={idx}>{honor}</li>
            ))}
          </ul>
        </div>

        <div className="contact-column">
          <h3>Languages</h3>
          <div className="languages-list">
            {languages.map((lang, idx) => (
              <div key={idx} className="language-item">
                <p className="language-name">{lang.name}</p>
                <p className="language-proficiency">{lang.proficiency}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer">
        <p>© 2026 Sophie Krajmalnik. Designed with purpose for job applications and beyond.</p>
      </div>
    </section>
  );
}

export default Contact;
