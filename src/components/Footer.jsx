import React, { useEffect } from 'react';
import logo from '../assets/images/camwoodlogo.svg';

const Footer = () => {
  useEffect(() => {
    // Get the element with the ID "year"
    const yearElement = document.getElementById("year");
    // Check if the element exists before trying to update its textContent
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }, []); // The empty dependency array ensures this effect runs only once after the initial render

  return (
    <footer>
      <div className="container footer__grid">
        <div>
        <a href=""><div className="brand">
            <div className="brand__mark" aria-hidden="true">
              <img src={logo} alt="Camwood Inc. Logo" />
            </div>
            <div className="brand__name">Camwood Inc.</div>
          </div></a>
          <p className="mt-s" style={{ color: 'var(--ink-muted)' }}>Clarity. Delivery. Impact.</p>
        </div>

        <nav aria-label="Footer">
          <strong>Company</strong><br />
          <span className='qlinks'>
          <a href="#about">About</a><br />
          <a href="#careers">Careers</a><br />
          <a href="#insights">Insights</a>
          </span>
        </nav>

        <div>
          <strong>Connect</strong><br />
          <span className='social'><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className='LinkedIn'>LinkedIn</a><br />
          <a href="https://www.x.com/" target="_blank" rel="noopener noreferrer" className='Twitter'>Twitter</a><br />
          <a href="mailto:info@camwood.inc" target="_blank" rel="noopener noreferrer" className='Email'>Contact</a></span>
        </div>
      </div>

      <div className="container legal">
        <span>©️ <span id="year"></span> Camwood Inc. All rights reserved.</span>
        <span><a href="#">Privacy</a> • <a href="#">Terms</a> • <a href="#">Security</a></span>
      </div>
    </footer>
  );
};

export default Footer;