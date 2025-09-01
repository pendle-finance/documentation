import React, { useEffect } from 'react';
import clsx from 'clsx';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

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
        <div className="thin-top-bar-search">
          <button type="button" className="DocSearch DocSearch-Button" aria-label="Search">
            <span className="DocSearch-Button-Container">
              <svg width="20" height="20" className="DocSearch-Search-Icon" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span className="DocSearch-Button-Placeholder">Search</span>
            </span>
            <span className="DocSearch-Button-Keys">
              <kbd className="DocSearch-Button-Key">⌘</kbd>
              <kbd className="DocSearch-Button-Key">K</kbd>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DocItemLayout({children}) {
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
              <DocItemContent>{children}</DocItemContent>
              <DocItemFooter />
            </article>
            <DocItemPaginator />
          </div>
        </div>
      </div>
    </>
  );
}