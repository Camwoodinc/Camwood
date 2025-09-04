import React from 'react';
import casesBg from '../assets/images/CaseBg.jpeg';
import finServImg from '../assets/images/FinServ.jpeg';
import dataImg from '../assets/images/dataImg.jpeg';
import ecommerceImg from '../assets/images/ecommerceimg.jpeg';

const CaseStudies = () => (
  <div className="section-wrapper">
    <img src={casesBg} alt="Abstract, colorful light streaks on a dark background" id="cases-bg" className="section-bg" />
    <section id="cases">
      <div className="container">
        <div className="section__head">
          <h2 className="h2">Proof of Impact</h2>
          <p className="lead">Selected engagements and outcomes.</p>
        </div>

        <div className="cases">
          <article className="card case">
            <div className="case__media case__media--finserv">
              <img src={finServImg} alt="Abstract chart on a screen representing financial data." />
              <div className="case__media-overlay">
                <span>View Details</span>
              </div>
            </div>
            <div className="case__body">
              <h3>Operational Uplift for FinServ</h3>
              <p>Cycle time reduced by <span className="stat">37%</span>, errors down <span className="stat">-52%</span>.</p>
            </div>
          </article>
          <article className="card case">
            <div className="case__media case__media--data">
              <img src={dataImg} alt="Colorful light streaks on a dark background." />
              <div className="case__media-overlay">
                <span>View Details</span>
              </div>
            </div>
            <div className="case__body">
              <h3>Data Platform Modernization</h3>
              <p>Time-to-insight improved by <span className="stat">3.4×</span>; costs optimized <span className="stat">-28%</span>.</p>
            </div>
          </article>
          <article className="card case">
            <div className="case__media case__media--ecommerce">
              <img src={ecommerceImg} alt="An open laptop with shopping bags next to it." />
              <div className="case__media-overlay">
                <span>View Details</span>
              </div>
            </div>
            <div className="case__body">
              <h3>E-commerce Replatform</h3>
              <p>Conversion +<span className="stat">19%</span>, cart abandonment −<span className="stat">12%</span>.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
);

export default CaseStudies;