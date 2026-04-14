import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { t } from '../data/translations';

export default function About() {
  const { lang } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about">
      <div className="container">
        <div className={`s-head reveal ${isVisible ? 'on' : ''}`}>
          <div className="s-label">{t(lang, 'about.label')}</div>
          <h2 className="s-title" id="about-title">
            {t(lang, 'about.title')}
          </h2>
          <div className="s-line"></div>
        </div>

        <div className="about-grid">
          <div className={`about-text reveal d1 ${isVisible ? 'on' : ''}`}>
            <p>{t(lang, 'about.p1')}</p>
            <p>{t(lang, 'about.p2')}</p>
            <p>{t(lang, 'about.p3')}</p>
            <blockquote className="goal-quote">
              {t(lang, 'about.quote')}
            </blockquote>
          </div>

          <div className={`terminal reveal d2 ${isVisible ? 'on' : ''}`} aria-label="Terminal style introduction">
            <div className="t-header">
              <div className="t-dot"></div>
              <div className="t-dot"></div>
              <div className="t-dot"></div>
              <span className="t-name">mever@portfolio ~</span>
            </div>
            <div className="t-body">
              <div><span className="p">$ </span><span className="c">whoami</span></div>
              <div className="o">Ibrohim Pulatov <span className="h">(Mever)</span></div>
              <br />
              <div><span className="p">$ </span><span className="c">cat location.txt</span></div>
              <div className="o">Tashkent, <span className="h">Uzbekistan</span></div>
              <br />
              <div><span className="p">$ </span><span className="c">cat status.txt</span></div>
              <div className="o">Cybersecurity Student @ <span className="h">IDU</span></div>
              <br />
              <div><span className="p">$ </span><span className="c">ls interests/</span></div>
              <div className="o"><span className="h">cybersecurity/</span> C++/ linux/ gamedev/</div>
              <br />
              <div><span className="p">$ </span><span className="c">echo $GOAL</span></div>
              <div className="o">"<span className="h">secure &amp; valuable products</span>"</div>
              <br />
              <div><span className="p">$ <span className="t-blink"></span></span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
