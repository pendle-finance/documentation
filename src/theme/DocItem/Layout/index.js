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
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      setTimeout(() => {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, []);

  // Wrap tables and iframes in a scrollable/responsive div on mobile
  React.useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    article.querySelectorAll('table').forEach((table) => {
      if (table.parentElement.classList.contains('tableScrollWrapper')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'tableScrollWrapper';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });

    article.querySelectorAll('iframe').forEach((iframe) => {
      if (iframe.parentElement.classList.contains('iframeWrapper')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'iframeWrapper';
      iframe.parentNode.insertBefore(wrapper, iframe);
      wrapper.appendChild(iframe);
    });
  });

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
