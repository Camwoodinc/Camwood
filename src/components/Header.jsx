import React, { useState } from 'react';
import logo from '../assets/images/camwoodlogo.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="container nav" role="navigation" aria-label="Main">
        <div className="brand">
          <div className="brand__mark" aria-hidden="true">
            <img src={logo} alt="Camwood Inc. Logo" />
          </div>
          <div className="brand__name">Camwood Inc.</div>
        </div>

        <nav className="nav__links" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#solutions">Solutions</a>
          <a href="#cases">Case Studies</a>
          <a href="#insights">Insights</a>
          <a href="#careers">Careers</a>
          <a href="#contact" className="nav__cta">Partner With Us</a>
        </nav>

        <button className="nav__btn" id="menuBtn" onClick={toggleMenu} aria-expanded={isMenuOpen} aria-controls="mobileMenu" aria-label="Open menu">☰</button>
      </div>

      <div className="container">
        <div id="mobileMenu" className={`nav__menu ${isMenuOpen ? 'is-open' : ''}`} hidden={!isMenuOpen}>
          <a href="#about">About</a>
          <a href="#solutions">Solutions</a>
          <a href="#cases">Case Studies</a>
          <a href="#insights">Insights</a>
          <a href="#careers">Careers</a>
          <a href="#contact" className="nav__cta" style={{ display: 'inline-block' }}>Partner With Us</a>
        </div>
      </div>
    </header>
  );
};

export default Header;