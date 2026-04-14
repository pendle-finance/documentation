import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import IconHome from '@theme/Icon/Home';
import styles from './styles.module.css';

const LOCALE_PREFIX_RE = /^\/(cn)\//;

function isBoros(pathname) {
  const stripped = pathname.replace(LOCALE_PREFIX_RE, '/');
  return (
    stripped.startsWith('/boros-dev') ||
    stripped.startsWith('/boros-docs') ||
    stripped.startsWith('/boros-academy') ||
    stripped.startsWith('/boros')
  );
}

function localePrefix(pathname) {
  const m = pathname.match(LOCALE_PREFIX_RE);
  return m ? `/${m[1]}` : '';
}

export default function HomeBreadcrumbItem() {
  const { pathname } = useLocation();
  const prefix = localePrefix(pathname);
  const homeHref = isBoros(pathname)
    ? `${prefix}/boros`
    : prefix
      ? `${prefix}/pendle-v2/Introduction`
      : `/`;

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
