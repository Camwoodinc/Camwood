import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroBg from '../assets/images/Herobg.jpeg';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  useEffect(() => {
    // Headline Text Rotation Logic
    const phrases = document.querySelectorAll('.headline-rotate span');
    let index = 0;
    phrases[index].classList.add('is-active');

    const interval = setInterval(() => {
      phrases[index].classList.remove('is-active');
      index = (index + 1) % phrases.length;
      phrases[index].classList.add('is-active');
    }, 2600);

    // Ticker Count-up Animation
    const counters = document.querySelectorAll('.count-number');
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

    // Hero Section Animation
    // Removed 'opacity: 0' to fix the invisibility issue.
    gsap.timeline().from(".hero__wrap > *", {
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out"
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="section-wrapper">
      <img src={heroBg} alt="" id="hero-bg" className="section-bg" />
      <section className="hero" id="home">
        <div className="container hero__wrap">
          <span className="eyebrow">Welcome to Camwood Inc.</span>
          <h1>
            Building trust.
            <span className="headline-rotate" aria-live="polite">
              <span className="is-active">Driving growth.</span>
              <span>Shaping the future.</span>
              <span>Delivering measurable impact.</span>
            </span>
          </h1>
          <p className="hero__sub">We partner with ambitious teams to solve critical challenges with precision, velocity, and care—turning complexity into competitive advantage.</p>
          <div className="cta-row">
            <a className="btn btn--primary" href="#contact">Start a Conversation</a>
            <a className="btn" href="#about" aria-label="Learn more about Camwood Inc.">Explore Our Vision</a>
          </div>
          <div className="hero__meta">
            <div>
              <div className="mt-m heroticker" aria-live="polite">
                <span>On-time delivery: <strong className="count-number" data-target="98">0</strong><strong>.4%</strong></span>
                <span>Clients NPS: <strong className="count-number" data-target="72">0</strong></span>
                <span>Global: <strong className="count-number" data-target="12">0</strong><strong>+ regions</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;