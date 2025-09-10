import React from 'react';
import insightsBg from '../assets/images/Insightbg.jpeg';
import { Link } from 'react-router-dom';

const Insights = () => (
  <div className="section-wrapper">
    <img src={insightsBg} alt="" id="insights-bg" className="section-bg" />
    <section id="insights">
      <div className="container">
        <div className="section__head">
          <h2 className="h2">Insights</h2>
          <a className="btn" href="#">Browse All</a>
        </div>
        <div className="posts">
          <article className="card post">
            <div className="meta">Report • 7 min read</div>
            <h3>Operating Models that Actually Scale</h3>
            <p>Patterns for resilient growth without losing speed or quality.</p>
          </article>
          <article className="card post"><Link to="/Insights">
            <div className="meta">Article • 5 min read</div>
            <h3>From Data to Decisions</h3>
            <p>Turning analytics into accountable action.</p></Link>
          </article>
          <article className="card post">
            <div className="meta">Webinar • Sept 24</div>
            <h3>The Playbook for Sustainable Transformation</h3>
            <p>Join our experts live with Q&A.</p>
          </article>
        </div>
      </div>
    </section>
  </div>
);

export default Insights;