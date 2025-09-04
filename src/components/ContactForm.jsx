import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import contactBg from '../assets/images/ContactBg.jpeg';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  useEffect(() => {
    const counters = document.querySelectorAll('.ticker .count-number');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target, 10);
      gsap.to(counter, {
        textContent: target,
        duration: 2.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        }
      });
    });
  }, []);

  return (
    <div className="section-wrapper">
      <img src={contactBg} alt="Abstract image of light streaks on a dark, textured background" id="contact-bg" className="section-bg" />
      <section id="contact">
        <div className="container">
          <div className="section__head">
            <h2 className="h2">Let’s Build Something That Lasts</h2>
            <p className="lead">Tell us a bit about your goals. We’ll respond within one business day.</p>
          </div>
          <div className="contact">
            <form action="#" method="post" aria-label="Contact form">
              <label className="sr-only" htmlFor="topic">Inquiry type</label>
              <select id="topic" name="topic" aria-label="Inquiry type">
                <option>Partnership</option>
                <option>Media</option>
                <option>Careers</option>
                <option>General</option>
              </select>
              <label className="sr-only" htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Full name" required />
              <label className="sr-only" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="Work email" required />
              <label className="sr-only" htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="What challenge are you tackling?"></textarea>
              <button className="btn btn--primary" type="submit">Request a Call</button>
            </form>
          </div>
        </div>
        <div>
          <div className="mt-m ticker" aria-live="polite">
            <span>Projects: <strong className="count-number" data-target="327">0</strong></span>
            <span>Clients: <strong className="count-number" data-target="152">0</strong></span>
            <span>Regions: <strong className="count-number" data-target="12">0</strong></span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;