import React from 'react';
import portfolio from '../data/portfolio.json';
import './Hero.css';

function Hero() {
  const { identity } = portfolio;

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{identity.name}</h1>
        <h2 className="headline">{identity.headline}</h2>
        <p className="tagline">{identity.tagline}</p>
        <p className="subheading">{identity.subheading}</p>
        <div className="hero-cta">
          <a href={`mailto:${identity.contact.email}`} className="btn btn-primary">
            {identity.cta}
          </a>
          <a href={identity.contact.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            LinkedIn
          </a>
          <a href={identity.contact.linktree} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            More Links
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
