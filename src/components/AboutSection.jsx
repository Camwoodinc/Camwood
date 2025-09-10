import React from 'react';
import aboutBg from '../assets/images/About-bg.jpeg';

const AboutSection = () => (
  <div className="section-wrapper">
    <img src={aboutBg} alt="" id="about-bg" className="section-bg" />
    <section id="about">
      <div className="container grid grid--2">
        <div>
          <div className="section__head">
            <h2 className="h2">Our Story</h2>
          </div>
          <p className="lead">Camwood exists to make bold ideas practical. We combine deep domain expertise with rigorous execution to deliver outcomes that last.</p>
          <p className="mt-m">From strategy to scale, our teams align around your metrics—so progress is visible, value is provable, and momentum never stalls.</p>
          <a className="btn mt-m" href="#">Learn More</a>
        </div>
        <div className="card">
          <div className="card__icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M12 40V8M12 8h20l-6 8 6 8H12" stroke="url(#grad1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="grad1" x1="12" y1="8" x2="32" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF6A00" />
                  <stop offset="1" stopColor="#FF3C00" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h3>Milestones</h3>
          <p>200+ projects • 150+ clients • 8 industry verticals</p>
          <div className="mt-l marquee-container">
            <div className="marquee-content">
              <span className="badge">GDPR</span>
              <span className="badge">PIPEDA</span>
              <span className="badge">LGPD</span>
              <span className="badge">APPI</span>
              <span className="badge">CPRA</span>
              <span className="badge">HIPAA</span>
              <span className="badge">DPA</span>
              <span className="badge">PDPA</span>
              <span className="badge">GDPR</span>
              <span className="badge">PIPEDA</span>
              <span className="badge">LGPD</span>
              <span className="badge">APPI</span>
              <span className="badge">CPRA</span>
              <span className="badge">HIPAA</span>
              <span className="badge">DPA</span>
              <span className="badge">PDPA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default AboutSection;