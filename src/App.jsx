import React, { useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SolutionsSection from './components/SolutionsSection';
import CaseStudies from './components/CaseStudies';
import CamwoodEdge from './components/CamwoodEdge';
import Insights from './components/Insights';
import CareersSection from './components/CareersSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const App = () => {
  useEffect(() => {
    document.getElementById('year').textContent = new Date().getFullYear();
  }, []);

  return (
    <>
      <Header />
      <div className="main-content">
        <HeroSection />
        <AboutSection />
        <SolutionsSection />
        <CaseStudies />
        <CamwoodEdge />
        <Insights />
        <CareersSection />
        <ContactForm />
      </div>
      <Footer />
      <Chatbot />
    </>
  );
};

export default App;