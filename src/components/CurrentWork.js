import React from 'react';
import portfolio from '../data/portfolio.json';
import SkillBadge from './SkillBadge';
import './CurrentWork.css';

function CurrentWork() {
  const { currentWork } = portfolio;

  return (
    <section className="current-work">
      <div className="section-header">
        <h2>Currently</h2>
        <p>What I'm working on right now</p>
      </div>
      <div className="work-grid">
        {currentWork.map((position) => (
          <div key={position.id} className="work-card">
            <div className="work-header">
              <h3>{position.title}</h3>
              <p className="organization">{position.organization}</p>
              <p className="date">{position.date}</p>
            </div>
            <p className="description">{position.description}</p>
            <div className="highlights">
              <h4>Key Responsibilities:</h4>
              <ul>
                {position.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div className="skills-section">
              <h4>Skills:</h4>
              <div className="skills-list">
                {position.skills.map((skill, idx) => (
                  <SkillBadge key={idx} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CurrentWork;
