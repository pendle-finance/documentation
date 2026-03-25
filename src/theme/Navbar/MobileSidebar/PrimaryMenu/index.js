import React from 'react';
import { useLocation } from '@docusaurus/router';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';

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

// Only the most specific matching activeBasePath wins
function getActiveItem(pathname, items) {
  const matches = items.filter(item => pathname.startsWith(item.activeBasePath));
  if (matches.length === 0) return null;
  return matches.reduce((best, item) =>
    item.activeBasePath.length > best.activeBasePath.length ? item : best
  );
}

export default function NavbarMobileSidebarPrimaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar();
  const { pathname } = useLocation();
  const items = isBoros(pathname) ? BOROS_ITEMS : PENDLE_ITEMS;
  const activeItem = getActiveItem(pathname, items);

  return (
    <ul className="menu__list">
      {items.map((item, i) => {
        const isActive = activeItem === item;
        return (
          <li key={i} className="menu__list-item">
            <Link
              to={item.to}
              className={`menu__link${isActive ? ' menu__link--active' : ''}`}
              onClick={() => mobileSidebar.toggle()}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
