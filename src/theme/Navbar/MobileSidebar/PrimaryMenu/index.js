import React from 'react';
import { useLocation } from '@docusaurus/router';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';

const LOCALE_PREFIX_RE = /^\/(cn)\//;

const NAV_LABELS = {
  en: {
    pendleDocs: 'Pendle Docs', pendleAcademy: 'Pendle Academy', pendleDev: 'Pendle Dev Docs',
    borosDocs: 'Boros Docs', borosAcademy: 'Boros Academy', borosDev: 'Boros Dev Docs',
  },
  cn: {
    pendleDocs: 'Pendle 文档', pendleAcademy: 'Pendle 学院', pendleDev: 'Pendle 开发者文档',
    borosDocs: 'Boros 文档', borosAcademy: 'Boros 学院', borosDev: 'Boros 开发者文档',
  },
};

function isBoros(pathname) {
  const stripped = pathname.replace(LOCALE_PREFIX_RE, '/');
  return (
    stripped.startsWith('/boros-dev') ||
    stripped.startsWith('/boros-docs') ||
    stripped.startsWith('/boros-academy') ||
    stripped.startsWith('/boros')
  );
}

function getItems(borosActive, locale) {
  const l = NAV_LABELS[locale] ?? NAV_LABELS.en;
  if (borosActive) {
    return [
      { label: l.borosDocs,    to: '/boros-docs/Introduction',   activeBaseRegex: /^(\/[a-z]{2})?\/boros-docs/ },
      { label: l.borosAcademy, to: '/boros-academy/Introduction', activeBaseRegex: /^(\/[a-z]{2})?\/boros-academy/ },
      { label: l.borosDev,     to: '/boros-dev',                  activeBaseRegex: /^(\/[a-z]{2})?\/boros-dev/ },
    ];
  }
  return [
    { label: l.pendleDocs,    to: '/pendle-v2/Introduction',     activeBaseRegex: /^(\/[a-z]{2})?\/pendle-v2\// },
    { label: l.pendleAcademy, to: '/pendle-academy/Introduction', activeBaseRegex: /^(\/[a-z]{2})?\/pendle-academy/ },
    { label: l.pendleDev,     to: '/pendle-v2-dev/Overview',     activeBaseRegex: /^(\/[a-z]{2})?\/pendle-v2-dev/ },
  ];
}

function getActiveItem(pathname, items) {
  const matches = items.filter(item => item.activeBaseRegex.test(pathname));
  if (matches.length === 0) return null;
  return matches.reduce((best, item) =>
    item.activeBaseRegex.source.length > best.activeBaseRegex.source.length ? item : best
  );
}

export default function NavbarMobileSidebarPrimaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar();
  const { pathname } = useLocation();
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const borosActive = isBoros(pathname);
  const items = getItems(borosActive, currentLocale);
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
