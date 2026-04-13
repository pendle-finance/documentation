import React from 'react';
import { useLocation } from '@docusaurus/router';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import IconClose from '@theme/Icon/Close';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

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

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <button
      type="button"
      aria-label={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: 'Close navigation bar',
        description: 'The ARIA label for close button of mobile sidebar',
      })}
      className="clean-btn navbar-sidebar__close"
      onClick={() => mobileSidebar.toggle()}>
      <IconClose color="var(--ifm-color-emphasis-600)" />
    </button>
  );
}

export default function NavbarMobileSidebarHeader() {
  const { pathname } = useLocation();
  const borosActive = isBoros(pathname);
  const prefix = localePrefix(pathname);
  const logoSrc = useBaseUrl(borosActive ? '/img/boros-logo.svg' : '/img/logo.svg');

  return (
    <div className="navbar-sidebar__brand">
      <Link to={borosActive ? `${prefix}/boros` : `${prefix}/pendle-v2/Introduction`} className="navbar__brand">
        <div className="navbar__logo">
          <img
            src={logoSrc}
            alt={borosActive ? 'Boros' : 'Pendle'}
          />
        </div>
      </Link>
      <NavbarColorModeToggle className="margin-right--md" />
      <CloseButton />
    </div>
  );
}
