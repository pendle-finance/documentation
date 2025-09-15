import React from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';

function IconMenu({ width = 24, height = 24, className, ...restProps }) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...restProps}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 12h18m-9-9h9m-9 18h9"
      />
    </svg>
  );
}

export default function NavbarMobileSidebarToggle() {
  const { toggle, shown } = useNavbarMobileSidebar();

  return (
    <button
      onClick={toggle}
      aria-label={translate({
        id: 'theme.docs.sidebar.toggleSidebarButtonAriaLabel',
        message: 'Toggle navigation bar',
        description: 'The ARIA label for hamburger menu button of mobile navigation',
      })}
      aria-expanded={shown}
      className="navbar__toggle clean-btn"
      type="button">
      <IconMenu />
    </button>
  );
}