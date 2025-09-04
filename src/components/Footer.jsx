import React from 'react';
import logo from '../assets/images/camwoodlogo.svg';

const Footer = () => (
  <footer>
    <div className="container footer__grid">
      <div>
        <div className="brand">
          <div className="brand__mark" aria-hidden="true">
            <img src={logo} alt="Camwood Inc. Logo" />
          </div>
          <div className="brand__name">Camwood Inc.</div>
        </div>
        <p className="mt-s" style={{ color: 'var(--ink-muted)' }}>Clarity. Delivery. Impact.</p>
      </div>

      <nav aria-label="Footer">
        <strong>Company</strong><br />
        <a href="#about">About</a><br />
        <a href="#careers">Careers</a><br />
        <a href="#insights">Insights</a>
      </nav>

      <div>
        <strong>Connect</strong><br />
        <a href="#">LinkedIn</a><br />
        <a href="#">Twitter</a><br />
        <a href="#">Contact</a>
      </div>
    </div>

    <div className="container legal">
      <span>©️ <span id="year"></span> Camwood Inc. All rights reserved.</span>
      <span><a href="#">Privacy</a> • <a href="#">Terms</a> • <a href="#">Security</a></span>
    </div>
  </footer>
);

export default Footer;