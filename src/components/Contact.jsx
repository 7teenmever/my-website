import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from '../context/ThemeContext';
import { t } from '../data/translations';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || 'xjgpnwkw';

export default function Contact() {
  const { lang } = useTheme();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', key: '' });

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

    const section = document.getElementById('contact');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const onSubmit = async (data) => {
    setStatusMessage({ type: '', key: '' });

    const formAction = `https://formspree.io/f/${FORMSPREE_ID}`;

    try {
      const response = await fetch(formAction, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Request failed');

      reset();
      setStatusMessage({ type: 'ok', key: 'con.success' });

      // Clear message after 5 seconds
      setTimeout(() => setStatusMessage({ type: '', key: '' }), 5000);
    } catch (error) {
      setStatusMessage({ type: 'err', key: 'con.error' });
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <div className={`s-head reveal ${isVisible ? 'on' : ''}`}>
          <div className="s-label">{t(lang, 'con.label')}</div>
          <h2 className="s-title" id="contact-title">
            {t(lang, 'con.title')}
          </h2>
          <div className="s-line"></div>
        </div>

        <div className="contact-grid">
          <div className={`reveal d1 ${isVisible ? 'on' : ''}`}>
            <h3 className="ci-title">{t(lang, 'con.sub')}</h3>
            <p className="ci-desc">{t(lang, 'con.desc')}</p>

            <div className="soc-links">
              <a href="https://t.me/seventeenmever" target="_blank" rel="noopener noreferrer" className="soc-link">
                <i className="fab fa-telegram" aria-hidden="true"></i>
                <span>@seventeenmever</span>
              </a>
              <a href="https://github.com/7teenmever" target="_blank" rel="noopener noreferrer" className="soc-link">
                <i className="fab fa-github" aria-hidden="true"></i>
                <span>7teenmever</span>
              </a>
              <a href="https://www.linkedin.com/in/ibrohim-pulatov-18150a3b1" target="_blank" rel="noopener noreferrer" className="soc-link">
                <i className="fab fa-linkedin" aria-hidden="true"></i>
                <span>Ibrohim Pulatov</span>
              </a>
            </div>
          </div>

          <form className={`c-form reveal d2 ${isVisible ? 'on' : ''}`} onSubmit={handleSubmit(onSubmit)}>
            <p className="form-note">{t(lang, 'con.note')}</p>

            <div className="f-row">
              <div className="f-grp">
                <label htmlFor="fname">{t(lang, 'con.name')}</label>
                <input
                  type="text"
                  id="fname"
                  placeholder={t(lang, 'con.namePh')}
                  {...register('name', { required: true })}
                />
              </div>
              <div className="f-grp">
                <label htmlFor="femail">{t(lang, 'con.email')}</label>
                <input
                  type="email"
                  id="femail"
                  placeholder={t(lang, 'con.emailPh')}
                  {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                />
              </div>
            </div>

            <div className="f-grp">
              <label htmlFor="fsubj">{t(lang, 'con.subj')}</label>
              <input
                type="text"
                id="fsubj"
                maxLength="120"
                placeholder={t(lang, 'con.subjPh')}
                {...register('subject')}
              />
            </div>

            <div className="f-grp">
              <label htmlFor="fmsg">{t(lang, 'con.msg')}</label>
              <textarea
                id="fmsg"
                minLength="10"
                placeholder={t(lang, 'con.msgPh')}
                {...register('message', { required: true, minLength: 10 })}
              />
            </div>

            {statusMessage.key && (
              <div className={`f-msg ${statusMessage.type}`} role="status">
                {t(lang, statusMessage.key)}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              <i className={isSubmitting ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'} aria-hidden="true"></i>
              <span>{isSubmitting ? t(lang, 'con.sending') : t(lang, 'con.send')}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
