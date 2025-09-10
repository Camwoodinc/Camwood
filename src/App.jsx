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
import Chatbot from "./components/Chatbot";
import InsightsPage from "./pages/Insight"; // Renamed to avoid conflict

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
  // Add this useEffect hook to handle the light/dark mode logic
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.body.setAttribute("data-theme", theme);
    }
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </Router>
      <Chatbot />
    </>
  );
};

export default App;
