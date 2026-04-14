import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { t } from '../data/translations';
import { skills } from '../data/skills';

export default function Skills() {
  const { lang } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

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

    const section = document.getElementById('skills');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const filteredSkills = activeFilter === 'all' ? skills : skills.filter(s => s.id === activeFilter);

  return (
    <section id="skills">
      <div className="container">
        <div className={`s-head reveal ${isVisible ? 'on' : ''}`}>
          <div className="s-label">{t(lang, 'skills.label')}</div>
          <h2 className="s-title" id="skills-title">
            {t(lang, 'skills.title')}
          </h2>
          <div className="s-line"></div>
        </div>

        <div className="filter-row reveal" aria-label="Skill categories">
          {['all', 'programming', 'frontend', 'system', 'security'].map((filter, idx) => (
            <button
              key={filter}
              className={`f-tab ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {t(lang, filter === 'all' ? 'sk.all' : `sk.${filter}`)}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filteredSkills.map((skillCard, idx) => (
            <article key={skillCard.id} className={`sk-card reveal d${(idx % 4) + 1} ${isVisible ? 'on' : ''}`}>
              <div className="sk-cat">
                <i className={skillCard.icon} aria-hidden="true"></i>
                <span>{t(lang, skillCard.category)}</span>
              </div>
              <div className="sk-badges">
                {skillCard.items.map((item, itemIdx) => (
                  <span key={itemIdx} className="sk-badge">
                    {item.name}
                    <span className="sk-badge-level">{item.level}</span>
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
