import React from 'react';
import { useLocation } from '@docusaurus/router';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import IconClose from '@theme/Icon/Close';
import Link from '@docusaurus/Link';

function isBoros(pathname) {
  return (
    pathname.startsWith('/boros-dev') ||
    pathname.startsWith('/boros-docs') ||
    pathname.startsWith('/boros-academy') ||
    pathname.startsWith('/boros')
  );
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

  return (
    <div className="navbar-sidebar__brand">
      <Link to={borosActive ? '/boros' : '/pendle-v2'} className="navbar__brand">
        <div className="navbar__logo">
          <img
            src={borosActive ? '/img/boros-logo.svg' : '/img/logo.svg'}
            alt={borosActive ? 'Boros' : 'Pendle'}
          />
        </div>
      </Link>
      <NavbarColorModeToggle className="margin-right--md" />
      <CloseButton />
    </div>
  );
}
