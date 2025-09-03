import React, { useEffect } from 'react';
import Link from '@docusaurus/Link';
import SearchBar from '@theme/SearchBar';
import LanguageSwitcher from './LanguageSwitcher';

export default function ThinTopBar() {
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
      
      const topBar = document.querySelector('.thin-top-bar');
      if (topBar) {
        topBar.style.setProperty('--scroll-progress', `${scrollPercent}%`);
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="thin-top-bar">
      <div className="thin-top-bar-content">
        <Link to="/" className="thin-top-bar-logo">
          <img src="/img/logo.svg" alt="Pendle" />
          <span className="thin-top-bar-logo-text">PENDLE</span>
        </Link>
        <div className="thin-top-bar-search" style={{ display: 'flex', alignItems: 'center' }}>
          <SearchBar />
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}