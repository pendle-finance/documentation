import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';

export default function LanguageSwitcher() {
  const {
    i18n: { currentLocale, locales, localeConfigs },
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const { search, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (locales.length <= 1) return null;

  const handleSelect = (locale) => {
    if (locale === currentLocale) { setOpen(false); return; }
    const targetUrl = alternatePageUtils.createUrl({ locale, fullyQualified: false });
    window.location.href = `${targetUrl}${search}${hash}`;
  };

  const currentLabel = localeConfigs[currentLocale]?.label || currentLocale;

  return (
    <div ref={ref} style={{ position: 'relative', marginLeft: '8px' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="navbar__item navbar__link"
        style={{
          background: 'none',
          border: '1px solid rgba(55, 75, 109, 0.6)',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          height: '36px',
          padding: '0 10px 0 12px',
          fontSize: '14px',
          fontWeight: 400,
          color: '#9DAFCD',
          whiteSpace: 'nowrap',
        }}
      >
        {currentLabel}
        <span style={{
          display: 'inline-block',
          width: '5px',
          height: '5px',
          borderRight: '1.5px solid currentColor',
          borderBottom: '1.5px solid currentColor',
          transform: open ? 'rotate(225deg) translateY(2px)' : 'rotate(45deg)',
          marginBottom: open ? '-2px' : '2px',
          opacity: 0.7,
          flexShrink: 0,
        }} />
      </button>

      {open && (
        <div
          className="dropdown__menu"
          style={{
            position: 'absolute',
            right: 0,
            top: 'calc(100% + 8px)',
            zIndex: 1000,
            minWidth: '140px',
          }}
        >
          {locales.map((locale) => (
            <a
              key={locale}
              onClick={() => handleSelect(locale)}
              className={`dropdown__link${locale === currentLocale ? ' dropdown__link--active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {localeConfigs[locale]?.label || locale}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
