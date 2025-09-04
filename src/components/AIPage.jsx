import React, { useEffect } from 'react';
import AIHeader from './AIHeader';
import HeroSection from './AIHero';
import AIOverview from './AIOverview';
import AIPrinciples from './AIPrinciples';
import AIProcess from './AIProcess';
import AIGovernance from './AIGovernance';
import AIArchitecture from './AIArchitecture';
import AIOutcomes from './AIOutcomes';
import AIFaq from './AIFaq';
import AIFooter from './AIFooter';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

const AIPage = () => {
  const { theme, toggleTheme } = useTheme();

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
  }, [theme]); // Rerun effect if theme changes to handle element updates

  return (
    <ThemeProvider>
      <AIHeader onThemeToggle={toggleTheme} theme={theme} />
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
      <AIFooter />
    </ThemeProvider>
  );
};

export default AIPage;