import React, { useState } from 'react';

const AIHeader = () => {
  return (
    <header className="site-header">
      <div className="container nav" role="navigation" aria-label="Main">

        
        <nav className="nav__links" aria-label="Primary">
          <a href="#overview">Overview</a>
          <a href="#principles">Principles</a>
          <a href="#process">Process</a>
          <a href="#governance">Governance</a>
          <a href="#architecture">Architecture</a>
          <a href="#outcomes">Outcomes</a>
          <a href="#faq">FAQ</a>
        </nav>
      </div>
    </header>
  );
};

export default AIHeader;