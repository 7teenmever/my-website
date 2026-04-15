import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { t, translations } from '../data/translations';

export default function Hero() {
  const { lang } = useTheme();
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const phrases = translations[lang]?.typed ?? translations.en.typed;
    const currentPhrase = phrases[phraseIndex % phrases.length];

    const timeout = setTimeout(() => {
      if (isDeleting) {
        if (charIndex > 0) {
          setCharIndex(charIndex - 1);
          setDisplayText(currentPhrase.slice(0, charIndex - 1));
        } else {
          setIsDeleting(false);
          setPhraseIndex(phraseIndex + 1);
        }
      } else {
        if (charIndex < currentPhrase.length) {
          setCharIndex(charIndex + 1);
          setDisplayText(currentPhrase.slice(0, charIndex + 1));
        } else {
          setIsDeleting(true);
        }
      }
    }, isDeleting ? 45 : 95);

    return () => clearTimeout(timeout);
  }, [displayText, phraseIndex, charIndex, isDeleting, lang]);

  return (
    <section id="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-label">{t(lang, 'hero.hello')}</div>
          <h1 className="hero-name" id="hero-title">
            <span>{t(lang, 'hero.iam')}</span>
            <span className="c1 glitch" data-text="Ibrohim">Ibrohim</span>
            <br />
            <span className="c2">Mever</span>
          </h1>

          <p className="hero-sub" aria-live="polite" aria-atomic="true">
            <span id="typed">{displayText}</span><span className="cursor" aria-hidden="true"></span>
          </p>

          <p className="hero-desc">{t(lang, 'hero.desc')}</p>

          <ul className="hero-tags" aria-label="Focus areas">
            {['tag1', 'tag2', 'tag3', 'tag4'].map(tag => (
              <li key={tag} className="hero-tag">
                {t(lang, `hero.${tag}`)}
              </li>
            ))}
          </ul>

          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              {t(lang, 'hero.btn1')}
            </a>
            <a href="#contact" className="btn btn-outline">
              {t(lang, 'hero.btn2')}
            </a>
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <span>{t(lang, 'hero.scroll')}</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
