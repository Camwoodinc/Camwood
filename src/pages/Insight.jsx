import React, { useEffect } from 'react';
import AIHeader from '../components/AIHeader';
import HeroSection from '../components/AIHero';
import AIOverview from '../components/AIOverview';
import AIPrinciples from '../components/AIPrinciples';
import AIProcess from '../components/AIProcess';
import AIGovernance from '../components/AIGovernance';
import AIArchitecture from '../components/AIArchitecture';
import AIOutcomes from '../components/AIOutcomes';
import AIFaq from '../components/AIFaq';
import Footer from '../components/Footer';

const Insight = () => {
  useEffect(() => {
    // Scroll spy logic
    const sections = ['overview', 'principles', 'process', 'governance', 'architecture', 'outcomes', 'faq'];
    const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);
    const navLinks = sections.map(id => document.querySelector(`.nav-link[href="#${id}"]`)).filter(Boolean);

    const setActiveHash = (href) => {
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === href));
    };

    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          setActiveHash(id);
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: [0.2, 0.6] });

    sectionElements.forEach(s => spy.observe(s));

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
        const currentHash = window.location.hash || '#overview';
        let idx = Math.max(0, sections.indexOf(currentHash.replace('#', '')));
        if (e.key === 'ArrowLeft') idx = Math.max(0, idx - 1);
        if (e.key === 'ArrowRight') idx = Math.min(sections.length - 1, idx + 1);
        const nextId = sections[idx];
        const nextElement = document.getElementById(nextId);
        if (nextElement) {
          nextElement.scrollIntoView({ behavior: 'smooth' });
          setActiveHash(`#${nextId}`);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Initial state check
    const initialHash = window.location.hash || '#overview';
    setActiveHash(initialHash);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      spy.disconnect();
    };
  }, []);

  return (
    <>
      <AIHeader />
      <main>
        <HeroSection />
        <AIOverview />
        <AIPrinciples />
        <AIProcess />
        <AIGovernance />
        <AIArchitecture />
        <AIOutcomes />
        <AIFaq />
      </main>
      <Footer />
    </>
  );
};

export default Insight;