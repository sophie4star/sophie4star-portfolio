import React, { useState } from 'react';
import portfolio from '../data/portfolio.json';
import SkillBadge from './SkillBadge';
import './ExperiencesByRole.css';

function ExperiencesByRole() {
  const { experiencesByRole } = portfolio;
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="experiences">
      <div className="section-header">
        <h2>Experience</h2>
        <p>Organized by role type</p>
      </div>
      <div className="roles-container">
        {Object.entries(experiencesByRole).map(([roleType, experiences]) => (
          <div key={roleType} className="role-section">
            <h3 className="role-title">{roleType}</h3>
            <div className="experiences-list">
              {experiences.map((exp) => (
                <div key={exp.id} className="experience-item">
                  <div
                    className="experience-header"
                    onClick={() => toggleExpanded(exp.id)}
                    role="button"
                    tabIndex="0"
                  >
                    <div className="exp-title-group">
                      <h4>{exp.title}</h4>
                      <p className="exp-org">{exp.organization}</p>
                    </div>
                    <div className="exp-meta">
                      <p className="exp-date">{exp.date}</p>
                      <span className={`toggle-icon ${expandedId === exp.id ? 'open' : ''}`}>▼</span>
                    </div>
                  </div>
                  {expandedId === exp.id && (
                    <div className="experience-details">
                      <p className="exp-description">{exp.description}</p>
                      {exp.location && <p className="exp-location">📍 {exp.location}</p>}
                      <div className="highlights">
                        <h5>Highlights:</h5>
                        <ul>
                          {exp.highlights.map((highlight, idx) => (
                            <li key={idx}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="skills-section">
                        <h5>Skills:</h5>
                        <div className="skills-list">
                          {exp.skills.map((skill, idx) => (
                            <SkillBadge key={idx} skill={skill} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExperiencesByRole;
