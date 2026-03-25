import React from 'react';
import { useLocation } from '@docusaurus/router';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';

const PENDLE_ITEMS = [
  { label: 'Pendle Docs', to: '/pendle-v2/Introduction', activeBasePath: '/pendle-v2' },
  { label: 'Pendle Academy', to: '/pendle-academy/Introduction', activeBasePath: '/pendle-academy' },
  { label: 'Pendle API', to: '/pendle-v2/Developers/Backend/ApiOverview', activeBasePath: '/pendle-v2/Developers/Backend' },
];

const BOROS_ITEMS = [
  { label: 'Boros Docs', to: '/boros-docs/Introduction', activeBasePath: '/boros-docs' },
  { label: 'Boros Academy', to: '/boros-academy/Introduction', activeBasePath: '/boros-academy' },
  { label: 'Boros Dev Docs', to: '/boros-dev', activeBasePath: '/boros-dev' },
];

function isBoros(pathname) {
  return (
    pathname.startsWith('/boros-dev') ||
    pathname.startsWith('/boros-docs') ||
    pathname.startsWith('/boros-academy') ||
    pathname.startsWith('/boros')
  );
}

export default function NavbarMobileSidebarPrimaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar();
  const { pathname } = useLocation();
  const items = isBoros(pathname) ? BOROS_ITEMS : PENDLE_ITEMS;

  return (
    <ul className="menu__list">
      {items.map((item, i) => (
        <NavbarItem
          mobile
          {...item}
          key={i}
          onClick={() => mobileSidebar.toggle()}
        />
      ))}
    </ul>
  );
}
