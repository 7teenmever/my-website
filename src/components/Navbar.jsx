import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { t } from '../data/translations';

export default function Navbar() {
  const { theme, lang, toggleTheme, toggleLanguage } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    function handleClick(e) {
      if (isMenuOpen && !e.target.closest('.nav-links') && !e.target.closest('.hamburger')) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);

      const position = window.scrollY + 140;
      const sections = document.querySelectorAll('section[id]');
      let current = 'hero';

      sections.forEach(section => {
        if (position >= section.offsetTop) {
          current = section.id;
        }
      });

      setActiveSection(current);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const navItems = ['hero', 'about', 'skills', 'projects', 'contact'];

  return (
    <nav className={isScrolled ? 'scrolled' : ''}>
      <div className="container">
        <a href="#hero" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
          <span>M</span>ever
        </a>

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <li key={item}>
              <a
                href={`#${item}`}
                className={activeSection === item ? 'active' : ''}
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveSection(item);
                }}
                {...(activeSection === item && { 'aria-current': 'page' })}
              >
                {t(lang, `nav.${item}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-controls">
          <button
            className="ctrl-btn"
            onClick={toggleLanguage}
            aria-label={t(lang, lang === 'en' ? 'a11y.switchToRu' : 'a11y.switchToEn')}
            title={t(lang, lang === 'en' ? 'a11y.switchToRu' : 'a11y.switchToEn')}
          >
            {lang === 'en' ? 'RU' : 'EN'}
          </button>

          <button
            className="ctrl-btn theme-btn"
            onClick={toggleTheme}
            aria-label={t(lang, theme === 'dark' ? 'a11y.switchToLight' : 'a11y.switchToDark')}
            title={t(lang, theme === 'dark' ? 'a11y.switchToLight' : 'a11y.switchToDark')}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button
            className={`hamburger ${isMenuOpen ? 'is-open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t(lang, isMenuOpen ? 'a11y.closeMenu' : 'a11y.openMenu')}
            aria-expanded={isMenuOpen}
            aria-controls="navLinks"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <button
          className={`nav-overlay ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
          tabIndex="-1"
        />
      )}
    </nav>
  );
}
