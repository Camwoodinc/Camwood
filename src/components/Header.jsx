import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/camwoodlogo.svg";

const Header = () => {
  // derive initial theme from saved value or OS preference
  const getInitialTheme = () => {
    try {
      const saved = window?.localStorage?.getItem("theme");
      if (saved) return saved;
      if (window?.matchMedia?.("(prefers-color-scheme: dark)").matches)
        return "dark";
    } catch {
      /* ignore */
    }
    return "light";
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  // keep body attribute synced and persist theme
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const toggleMenu = () => {
    setIsMenuOpen((s) => !s);
  };

  return (
    <header>
      <div className="container nav" role="navigation" aria-label="Main">
        <a href="/" className="brand">
          <div className="brand__mark" aria-hidden="true">
            <img src={logo} alt="Camwood Inc. Logo" />
          </div>
          <div className="brand__name">Camwood Inc.</div>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <a href="/#about">About</a>
          <a href="/#solutions">Solutions</a>
          <a href="/#cases">Case Studies</a>
          <a href="/#insights">Insights</a>
          <a href="/#careers">Careers</a>
          <a href="/#contact" className="nav__cta">
            Partner With Us
          </a>

          {/* visible theme toggle for desktop */}
          <button
            type="button"
            onClick={toggleTheme}
            className="nav__cta_switch theme-toggle-btn"
            aria-label="Toggle light or dark theme"
            aria-pressed={theme === "dark"}
          >
            <span aria-hidden>{theme === "dark" ? "☀" : "☪︎"}</span>
            <span className="visually-hidden">
              {theme === "dark"
                ? ""
                : ""}
            </span>
          </button>
        </nav>

        <div className="nav-controls-mobile">
          {/* mobile theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="nav__btn theme-toggle-btn-mobile"
            aria-label="Toggle light or dark theme"
            aria-pressed={theme === "dark"}
          >
            {theme === "dark" ? "☀" : "☪︎"}
          </button>

          <button
            type="button"
            className="nav__btn"
            id="menuBtn"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobileMenu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            ☰
          </button>
        </div>
      </div>

      <div className="container">
        <div
          id="mobileMenu"
          className={`nav__menu ${isMenuOpen ? "is-open" : ""}`}
          hidden={!isMenuOpen}
        >
          <a href="/#about">About</a>
          <a href="/#solutions">Solutions</a>
          <a href="/#cases">Case Studies</a>
          <a href="/#insights">Insights</a>
          <a href="/#careers">Careers</a>
          <a
            href="/#contact"
            className="nav__cta"
            style={{ display: "inline-block" }}
          >
            Partner With Us
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
