import React from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';

export default function LanguageSwitcher() {
  const { 
    i18n: { currentLocale, locales, localeConfigs }
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const { search, hash } = useLocation();

  if (locales.length <= 1) {
    return null;
  }

  const handleLocaleChange = (newLocale) => {
    if (newLocale === currentLocale) return;
    
    const targetUrl = alternatePageUtils.createUrl({
      locale: newLocale,
      fullyQualified: false,
    });
    
    window.location.href = `${targetUrl}${search}${hash}`;
  };

  return (
    <div className="language-switcher" style={{ display: 'flex', alignItems: 'center', marginLeft: '12px' }}>
      <select 
        value={currentLocale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        style={{
          background: 'rgba(248, 250, 252, 0.8)',
          border: '1px solid rgba(15, 23, 42, 0.1)',
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: '14px',
          color: '#475569',
          cursor: 'pointer',
          minWidth: '80px'
        }}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeConfigs[locale]?.label || locale}
          </option>
        ))}
      </select>
    </div>
  );
}