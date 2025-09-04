import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for internal routing
import logo from '../assets/images/camwoodlogo.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="container nav" role="navigation" aria-label="Main">
        <Link to="/" className="brand">
          <div className="brand__mark" aria-hidden="true">
            <img src={logo} alt="Camwood Inc. Logo" />
          </div>
          <div className="brand__name">Camwood Inc.</div>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <Link to="/#about">About</Link>
          <Link to="/#solutions">Solutions</Link>
          <Link to="/#cases">Case Studies</Link>
          <Link to="/insights">Insights</Link>
          <Link to="/#careers">Careers</Link>
          <Link to="/#contact" className="nav__cta">Partner With Us</Link>
        </nav>

        <button className="nav__btn" id="menuBtn" onClick={toggleMenu} aria-expanded={isMenuOpen} aria-controls="mobileMenu" aria-label="Open menu">☰</button>
      </div>

      <div className="container">
        <div id="mobileMenu" className={`nav__menu ${isMenuOpen ? 'is-open' : ''}`} hidden={!isMenuOpen}>
          <Link to="/#about">About</Link>
          <Link to="/#solutions">Solutions</Link>
          <Link to="/#cases">Case Studies</Link>
          <Link to="/insights">Insights</Link>
          <Link to="/#careers">Careers</Link>
          <Link to="/#contact" className="nav__cta" style={{ display: 'inline-block' }}>Partner With Us</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;