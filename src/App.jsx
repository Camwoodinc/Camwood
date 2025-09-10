import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SolutionsSection from "./components/SolutionsSection";
import CaseStudies from "./components/CaseStudies";
import CamwoodEdge from "./components/CamwoodEdge";
import Insights from "./components/Insights";
import CareersSection from "./components/CareersSection";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import InsightsPage from "./pages/Insight";
import Chatbot from "./components/Chatbot";

const Home = () => (
  <>
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
  </>
);

const App = () => {
  // Use a useEffect hook to set the theme based on the user's system preference
  useEffect(() => {
    // Check if the user's system prefers a dark color scheme.
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set the data-theme attribute on the body element.
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, []); // The empty dependency array ensures this runs once on initial render.

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
        <Chatbot />
      </Router>
    </>
  );
};

export default App;