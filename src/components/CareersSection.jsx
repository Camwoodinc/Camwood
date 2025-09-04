import React from 'react';
import careersImg from '../assets/images/CareersSection-bg.jpeg';

const CareersSection = () => (
  <div className="section-wrapper">
    <section id="careers">
      <div className="container grid grid--2">
        <div>
          <div className="section__head">
            <h2 className="h2">Work With Purpose</h2>
          </div>
          <p className="lead">
            At Camwood, everything we do starts with the client outcome in mind.
            We cut through the noise, remove complexity, and focus on what really matters:
            helping organizations achieve impact faster, with fewer distractions.
          </p>
          <p>
            Join a team that empowers businesses to concentrate on their goals,
            while we streamline the process, simplify the journey, and deliver
            the results that move the needle.
          </p>
          <div className="mt-m row">
            <span className="badge">Outcome-driven</span>
            <span className="badge">No wasted effort</span>
            <span className="badge">Impact-focused</span>
          </div>
          <a className="btn mt-m" href="#">See Roles</a>
        </div>
        <div>
          <img className="careers_media" src={careersImg} alt="" />
        </div>
      </div>
    </section>
  </div>
);

export default CareersSection;