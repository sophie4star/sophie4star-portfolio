import React from 'react';
import Hero from './components/Hero';
import CurrentWork from './components/CurrentWork';
import ExperiencesByRole from './components/ExperiencesByRole';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="App">
      <Hero />
      <CurrentWork />
      <ExperiencesByRole />
      <Contact />
    </div>
  );
}

export default App;
