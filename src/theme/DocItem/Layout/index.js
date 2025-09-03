import React, { useEffect } from 'react';
import clsx from 'clsx';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import Link from '@docusaurus/Link';
import SearchBar from '@theme/SearchBar';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useAlternatePageUtils} from '@docusaurus/theme-common/internal';
import styles from './styles.module.css';

// Simple Language Switcher component
function LanguageSwitcher() {
  const { 
    i18n: { currentLocale, locales, localeConfigs }
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const {search, hash} = useLocation();

  if (locales.length <= 1) {
    return null;
  }

  const handleLocaleChange = (newLocale) => {
    if (newLocale === currentLocale) return;
    
    // Use Docusaurus's built-in locale switching utilities
    const targetUrl = alternatePageUtils.createUrl({
      locale: newLocale,
      fullyQualified: false,
    });
    
    // Use window.location for full page reload to ensure proper locale loading
    // Client-side routing doesn't work well with locale changes in production
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

// Thin top bar component with reading progress
function ThinTopBar() {
  useEffect(() => {
    // Premium reading progress indicator
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
    updateProgress(); // Set initial progress
    
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

export default function DocItemLayout({children}) {
  // Handle hash navigation on page load
  React.useEffect(() => {
    // Check if there's a hash in the URL on page load
    if (window.location.hash) {
      const hash = window.location.hash.substring(1); // Remove the #
      
      // Wait for the page to fully render
      setTimeout(() => {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500); // Wait for page to render
    }
  }, []); // Run once on mount
  
  // Fix search result URLs by adding /docs prefix where needed
  React.useEffect(() => {
    const fixDocLinks = (e) => {
      // Only intercept clicks within the search modal
      const searchModal = document.querySelector('.DocSearch-Modal');
      if (!searchModal || !searchModal.contains(e.target)) {
        return; // Not a search result click
      }
      
      const link = e.target.closest('a');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('/')) return;
      
      // Parse the URL to separate path and hash
      const hashIndex = href.indexOf('#');
      const pathname = hashIndex > -1 ? href.substring(0, hashIndex) : href;
      const hash = hashIndex > -1 ? href.substring(hashIndex + 1) : '';
      const currentPath = window.location.pathname;
      
      // Check if we need to add /docs prefix
      if (!pathname.startsWith('/docs/') && !pathname.startsWith('/boros/')) {
        const docPaths = [
          '/Developers/', '/ProtocolMechanics/', '/AppGuide/',
          '/Introduction', '/FAQ', '/LitePaper', '/HighLevelArchitecture',
          '/Contracts/', '/Guides/', '/Pool/', '/User/'
        ];
        
        const needsDocsPrefix = docPaths.some(path => pathname.startsWith(path));
        
        if (needsDocsPrefix) {
          e.preventDefault();
          e.stopPropagation();
          
          const correctedPath = '/docs' + pathname;
          
          // Check if we're already on the right page
          if (correctedPath === currentPath && hash) {
            // Same page, just scroll to section
            const closeButton = document.querySelector('.DocSearch-Cancel');
            if (closeButton) closeButton.click();
            
            setTimeout(() => {
              const targetElement = document.getElementById(hash);
              if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.history.pushState(null, '', '#' + hash);
              }
            }, 200);
          } else {
            // Different page, navigate with hash
            window.location.href = correctedPath + (hash ? '#' + hash : '');
          }
        }
      }
    };
    
    // Add listener in capture phase to intercept before other handlers
    document.addEventListener('click', fixDocLinks, true);
    
    return () => {
      document.removeEventListener('click', fixDocLinks, true);
    };
  }, []);
  
  return (
    <>
      <ThinTopBar />
      <div className={clsx('row', styles.docItemRow)}>
        <div className={clsx('col', styles.docItemCol)}>
          <DocVersionBanner />
          <div className={styles.docItemContainer}>
            <article>
              <DocBreadcrumbs />
              <DocVersionBadge />
              <DocItemTOCMobile />
              <DocItemContent>{children}</DocItemContent>
              <DocItemFooter />
            </article>
            <DocItemPaginator />
          </div>
        </div>
        <div className="col col--3">
          <DocItemTOCDesktop />
        </div>
      </div>
    </>
  );
}