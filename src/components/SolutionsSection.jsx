import React, { useState } from 'react';
import solutionsBg from '../assets/images/Solutionsbg.jpeg';

const solutionsData = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="16" cy="16" r="6" stroke="url(#grad2)" strokeWidth="2" />
        <circle cx="32" cy="32" r="6" stroke="url(#grad2)" strokeWidth="2" />
        <path d="M16 22v10M22 16h10" stroke="url(#grad2)" strokeWidth="2" strokeLinecap="round" />
        <defs>
          <linearGradient id="grad2" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#007BFF" />
            <stop offset="1" stopColor="#00C6FF" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Intelligent Automation',
    description: 'We design, build, and deploy intelligent AI agents that automate complex tasks. Our solutions enhance decision-making and scale operations by transforming data into actionable insights, helping you achieve measurable outcomes with an autonomous workforce.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M16 12l-8 12 8 12M32 12l8 12-8 12" stroke="url(#grad3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="grad3" x1="8" y1="12" x2="40" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF6A00" />
            <stop offset="1" stopColor="#FF3C00" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Software Development',
    description: 'We deliver custom software that solves your most critical challenges. Our teams engineer scalable, secure, and user-centric applications, from ideation to launch. We focus on creating robust platforms that seamlessly integrate into your business and drive growth.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 8c4 4 6 8 6 12v8h-12v-8l6-12Z" stroke="url(#grad4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="12" y="36" width="24" height="4" fill="url(#grad4)" />
        <defs>
          <linearGradient id="grad4" x1="12" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#007BFF" />
            <stop offset="1" stopColor="#00C6FF" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Advisory & Strategy',
    description: 'We bring clarity to chaos. Our strategic roadmaps are meticulously crafted to align your teams around a shared vision and measurable value. We help you cut through the noise, prioritize initiatives, and define a clear, actionable path forward.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M16 12h20v8M32 36H12v-8" stroke="url(#grad5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 8l8 8-8 8M20 40l-8-8 8-8" stroke="url(#grad5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="grad5" x1="12" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF6A00" />
            <stop offset="1" stopColor="#FF3C00" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Workflow Optimization',
    description: 'We streamline your business processes to boost efficiency and productivity. Our experts analyze current workflows to identify bottlenecks and implement smarter solutions. We eliminate manual effort and increase velocity, enabling your teams to focus on high-impact work.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M8 16l16 8 16-8-16-8-16 8Z" stroke="url(#grad6)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M8 24l16 8 16-8M8 32l16 8 16-8" stroke="url(#grad6)" strokeWidth="2" strokeLinejoin="round" />
        <defs>
          <linearGradient id="grad6" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#007BFF" />
            <stop offset="1" stopColor="#00C6FF" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Platform Development & Optimization',
    description: 'We build and refine the digital foundations of your business. Our focus is on creating high-performance, secure, and scalable platforms. We ensure your systems are robust, modern, and ready to support your growth, providing a flawless experience for your users.'
  }
];

const SolutionsSection = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleSolutions = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="section-wrapper">
      <img src={solutionsBg} alt="" id="solutions-bg" className="section-bg" />
      <section id="solutions">
        <div className="container">
          <div>
            <div className="section__head">
              <h2 className="h2">Solutions</h2>
              <button id="viewMoreBtn" className="btn" onClick={toggleSolutions} aria-expanded={showMore} aria-controls="solutions-grid">
                {showMore ? 'View Less' : 'View More'}
              </button>
            </div>
            <p className="lead">Our suite of services is designed to guide your organization through every phase of growth and transformation.</p>
            <p className="mt-m">We don't just offer services; we deliver integrated solutions that build resilience, foster innovation, and drive sustainable success.</p>
          </div>

          <div className="grid grid--3" id="solutions-grid">
            {solutionsData.map((solution, index) => (
              <article key={index} className={`card ${!showMore && index > 2 ? 'hidden-card' : ''}`} role="article">
                <div className="card__icon" aria-hidden="true">{solution.icon}</div>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsSection;