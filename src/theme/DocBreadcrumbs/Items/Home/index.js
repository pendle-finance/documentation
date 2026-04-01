import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import IconHome from '@theme/Icon/Home';
import styles from './styles.module.css';

function isBoros(pathname) {
  return (
    pathname.startsWith('/boros-dev') ||
    pathname.startsWith('/boros-docs') ||
    pathname.startsWith('/boros-academy') ||
    pathname.startsWith('/boros')
  );
}

export default function HomeBreadcrumbItem() {
  const { pathname } = useLocation();
  const homeHref = isBoros(pathname) ? '/boros' : '/';

  return (
    <li className="breadcrumbs__item">
      <Link
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.home',
          message: 'Home page',
          description: 'The ARIA label for the home page in the breadcrumbs',
        })}
        className="breadcrumbs__link"
        href={homeHref}>
        <IconHome className={styles.breadcrumbHomeIcon} />
      </Link>
    </li>
  );
}
