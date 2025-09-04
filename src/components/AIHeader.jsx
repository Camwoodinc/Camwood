import React from 'react';

const AIHeader = ({ onThemeToggle, theme }) => {
  return (
    <header className="site-header">
      <div className="site-inner container">
        
        <nav className="nav" aria-label="Primary">
          <a className="nav-link" href="#overview">Overview</a>
          <a className="nav-link" href="#principles">Principles</a>
          <a className="nav-link" href="#process">Process</a>
          <a className="nav-link" href="#governance">Governance</a>
          <a className="nav-link" href="#architecture">Architecture</a>
          <a className="nav-link" href="#outcomes">Outcomes</a>
          <a className="nav-link" href="#faq">FAQ</a>
        </nav>
        <button id="themeToggle" className="toggle-btn" onClick={onThemeToggle} aria-label="Toggle theme" title="Toggle theme">
          <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
        </button>
      </div>
    </header>
  );
};

export default AIHeader;