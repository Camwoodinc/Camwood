import React from 'react';
import edgeBg from '../assets/images/CamwoodEdge-bg.jpeg';

const CamwoodEdge = () => (
  <div className="section-wrapper">
    <img src={edgeBg} alt="" id="edge-bg" className="section-bg" />
    <section id="edge">
      <div className="container">
        <div className="section__head">
          <h2 className="h2">The Camwood Edge</h2>
        </div>
        <div className="grid grid--3">
          <div className="card">
            <div className="card__icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="12" stroke="url(#grad7)" strokeWidth="2" />
                <circle cx="24" cy="24" r="4" fill="url(#grad7)" />
                <path d="M30 18l8-8" stroke="url(#grad7)" strokeWidth="2" strokeLinecap="round" />
                <path d="M36 12l2 6-6-2" stroke="url(#grad7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="grad7" x1="16" y1="16" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF6A00" />
                    <stop offset="1" stopColor="#FF3C00" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Outcome-First</h3>
            <p>We anchor decisions to business metrics—every sprint, every deliverable.</p>
          </div>
          <div className="card">
            <div className="card__icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M4 24c4-8 12-12 20-12s16 4 20 12c-4 8-12 12-20 12s-16-4-20-12Z" stroke="url(#grad8)" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="24" cy="24" r="4" fill="url(#grad8)" />
                <defs>
                  <linearGradient id="grad8" x1="4" y1="12" x2="44" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#007BFF" />
                    <stop offset="1" stopColor="#00C6FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Transparent by Design</h3>
            <p>Integrated dashboards & reviews keep stakeholders aligned and informed.</p>
          </div>
          <div className="card">
            <div className="card__icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="16" r="4" fill="url(#grad9)" />
                <circle cx="12" cy="28" r="4" fill="url(#grad9)" />
                <circle cx="36" cy="28" r="4" fill="url(#grad9)" />
                <path d="M12 32c4 4 20 4 24 0" stroke="url(#grad9)" strokeWidth="2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="grad9" x1="12" y1="16" x2="36" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF6A00" />
                    <stop offset="1" stopColor="#FF3C00" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Right-Sized Teams</h3>
            <p>Specialists on demand to accelerate critical work without bloat.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default CamwoodEdge;