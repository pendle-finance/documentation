import React from 'react';
import clsx from 'clsx';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import ThinTopBar from './ThinTopBar';
import styles from './styles.module.css';

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
      if (!pathname.startsWith('/pendle-v2/') && !pathname.startsWith('/boros/')) {
        const docPaths = [
          '/Developers/', '/ProtocolMechanics/', '/AppGuide/',
          '/Introduction', '/FAQ', '/LitePaper', '/HighLevelArchitecture',
          '/Contracts/', '/Guides/', '/Pool/', '/User/'
        ];

        const needsDocsPrefix = docPaths.some(path => pathname.startsWith(path));

        if (needsDocsPrefix) {
          e.preventDefault();
          e.stopPropagation();

          const correctedPath = '/pendle-v2' + pathname;

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
