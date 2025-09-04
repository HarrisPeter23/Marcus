import React from 'react';
import './header.css';

const Header = ({ onBack }) => (
  <div className="header-wrapper">
    <button className="back-button" onClick={onBack} aria-label="Go back">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#31235e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
    <h2 className="header-title">
      AI Business Intelligence
    </h2>
    <span className="header-desc">
      Enterprise-grade AI solutions for business automation and intelligent decision making
    </span>
  </div>
);

export default Header;
