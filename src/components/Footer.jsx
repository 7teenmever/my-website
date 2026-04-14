import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { t } from '../data/translations';

export default function Footer() {
  const { lang } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="foot-inner">
          <span className="foot-logo">Mever</span>
          <span id="footCopy">
            {t(lang, 'foot.copy', { year })}
          </span>
          <span className="foot-ver">v6.7</span>
        </div>
      </div>
    </footer>
  );
}
