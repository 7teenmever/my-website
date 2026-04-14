import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { t } from '../data/translations';
import { projects, projectFilters } from '../data/projects';

export default function Projects() {
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

    const section = document.getElementById('projects');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects">
      <div className="container">
        <div className={`s-head reveal ${isVisible ? 'on' : ''}`}>
          <div className="s-label">{t(lang, 'proj.label')}</div>
          <h2 className="s-title" id="projects-title">
            {t(lang, 'proj.title')}
          </h2>
          <div className="s-line"></div>
        </div>

        <div className="filter-row reveal" aria-label="Project categories">
          {projectFilters.map((filter, idx) => (
            <button
              key={filter.id}
              className={`f-tab ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={activeFilter === filter.id}
            >
              {t(lang, filter.label)}
            </button>
          ))}
        </div>

        <div className="proj-grid">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className={`proj-card reveal d${(idx % 5) + 1} ${isVisible ? 'on' : ''}`}
              data-cat={project.category}
            >
              <span className={`proj-badge ${project.badgeClass}`}>
                {project.badge}
              </span>
              <h3 className="proj-title">{t(lang, project.title)}</h3>
              <p className="proj-desc">{t(lang, project.description)}</p>
              <div className="proj-foot">
                <span className="proj-status">{t(lang, project.status)}</span>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-link"
                  >
                    <span>{t(lang, project.linkText)}</span>
                    <i className="fas fa-arrow-right" aria-hidden="true"></i>
                  </a>
                ) : (
                  <span className="proj-link dead">
                    <span>{t(lang, project.linkText)}</span>
                    <i className="fas fa-wrench" aria-hidden="true"></i>
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
