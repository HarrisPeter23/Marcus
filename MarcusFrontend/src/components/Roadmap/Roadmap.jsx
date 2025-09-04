import React from 'react';
import './Roadmap.css';

const steps = [
  { label: 'Getting Input', active: true, icon: '🟢' },
  { label: 'Thinking', active: true, icon: '🟢' },
  { label: 'Optimizing', active: true, icon: '🟢' },
  { label: 'Finalizing', active: true, icon: '🟢' },
  { label: 'Ready', active: true, icon: '🟢' }
];

const Roadmap = () => (
  <div className="roadmap-bar">
    {steps.map((step, idx) => (
      <React.Fragment key={step.label}>
        <div className={`roadmap-step${step.active ? ' step-active' : ''}`}>
          {step.icon} <span>{step.label}</span>
        </div>
        {idx < steps.length - 1 && <div className="roadmap-line"></div>}
      </React.Fragment>
    ))}
  </div>
);

export default Roadmap;
