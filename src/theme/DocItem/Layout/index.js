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

  return (
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
  );
}
