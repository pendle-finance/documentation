import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "@docusaurus/router";
import { useNavbarMobileSidebar, useAlternatePageUtils } from "@docusaurus/theme-common/internal";
import NavbarItem from "@theme/NavbarItem";
import SearchBar from "@theme/SearchBar";
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const NAV_LABELS = {
  en: {
    pendleDocs: "Pendle Docs", pendleAcademy: "Pendle Academy", pendleDev: "Pendle Dev Docs",
    borosDocs: "Boros Docs", borosAcademy: "Boros Academy", borosDev: "Boros Dev Docs",
  },
  cn: {
    pendleDocs: "Pendle 文档", pendleAcademy: "Pendle 学院", pendleDev: "Pendle 开发者文档",
    borosDocs: "Boros 文档", borosAcademy: "Boros 学院", borosDev: "Boros 开发者文档",
  },
};

function getNavItems(borosActive, locale) {
  const l = NAV_LABELS[locale] ?? NAV_LABELS.en;
  if (borosActive) {
    return [
      { label: l.borosDocs,    to: "/boros-docs/Introduction",  activeBaseRegex: "^(/[a-z]{2})?/boros-docs",    position: "left" },
      { label: l.borosAcademy, to: "/boros-academy/Introduction", activeBaseRegex: "^(/[a-z]{2})?/boros-academy", position: "left" },
      { label: l.borosDev,     to: "/boros-dev",                 activeBaseRegex: "^(/[a-z]{2})?/boros-dev",     position: "left" },
    ];
  }
  return [
    { label: l.pendleDocs,    to: "/pendle-v2/Introduction",   activeBaseRegex: "^(/[a-z]{2})?/pendle-v2/",    position: "left" },
    { label: l.pendleAcademy, to: "/pendle-academy/Introduction", activeBaseRegex: "^(/[a-z]{2})?/pendle-academy", position: "left" },
    { label: l.pendleDev,     to: "/pendle-v2-dev/Overview",   activeBaseRegex: "^(/[a-z]{2})?/pendle-v2-dev", position: "left" },
  ];
}

const LOCALE_PREFIX_RE = /^\/(cn)\//;

function isBoros(pathname) {
  const stripped = pathname.replace(LOCALE_PREFIX_RE, "/");
  return (
    stripped.startsWith("/boros-dev") ||
    stripped.startsWith("/boros-docs") ||
    stripped.startsWith("/boros-academy") ||
    stripped.startsWith("/boros")
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function MobileLocaleDropdown() {
  const { i18n: { currentLocale, locales, localeConfigs } } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const { search, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [open]);

  const currentLabel = localeConfigs[currentLocale]?.label ?? currentLocale;

  return (
    <div ref={ref} className={styles.localeDropdown}>
      <button
        className={styles.localeTrigger}
        onClick={() => setOpen(s => !s)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {currentLabel}
        <span className={`${styles.localeCaret} ${open ? styles.localeCaretOpen : ''}`} />
      </button>
      {open && (
        <ul className={styles.localeMenu} role="listbox">
          {locales.map(locale => {
            const isActive = locale === currentLocale;
            const to = `${alternatePageUtils.createUrl({ locale, fullyQualified: false })}${search}${hash}`;
            return (
              <li key={locale} role="option" aria-selected={isActive}>
                <a
                  href={to}
                  className={`${styles.localeOption} ${isActive ? styles.localeOptionActive : ''}`}
                  onClick={(e) => { e.preventDefault(); setOpen(false); window.location.href = to; }}
                >
                  {localeConfigs[locale].label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function NavbarContent() {
  const { pathname } = useLocation();
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const borosActive = isBoros(pathname);
  const navItems = getNavItems(borosActive, currentLocale);
  const logoSrc = useBaseUrl(borosActive ? "/img/boros-logo.svg" : "/img/logo.svg");
  const [searchExpanded, setSearchExpanded] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.site = borosActive ? "boros" : "pendle";
  }, [borosActive]);

  // Collapse on outside click/tap
  useEffect(() => {
    if (!searchExpanded) return;
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchExpanded(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [searchExpanded]);

  // Focus input when expanded
  useEffect(() => {
    if (searchExpanded && searchRef.current) {
      const input = searchRef.current.querySelector('input');
      if (input) setTimeout(() => input.focus(), 50);
    }
  }, [searchExpanded]);

  return (
    <div className="navbar__inner">

      {/* ── DESKTOP layout ── */}
      <div className={`navbar__items ${styles.desktopLeft}`}>
        <NavbarMobileSidebarToggle />
        <Link to={borosActive ? "/boros" : "/pendle-v2/Introduction"}>
          <div className="navbar__logo">
            <img src={logoSrc} alt={borosActive ? "Boros" : "Pendle"} />
          </div>
        </Link>
        {navItems.map((item, i) => <NavbarItem {...item} key={i} />)}
      </div>
      <div className={`navbar__items navbar__items--right ${styles.desktopRight}`}>
        <div className={styles.searchContainer}><SearchBar /></div>
        <NavbarItem type="localeDropdown" position="right" />
      </div>

      {/* ── MOBILE layout ── */}
      <div className={styles.mobileBar}>

        {/* Always visible left group: hamburger + (logo when not expanded) */}
        <div className={styles.mobileLeft}>
          <NavbarMobileSidebarToggle />
          {!searchExpanded && (
            <Link to={borosActive ? "/boros" : "/pendle-v2/Introduction"} className={styles.mobileLogo}>
              <img src={logoSrc} alt={borosActive ? "Boros" : "Pendle"} />
            </Link>
          )}
        </div>

        {/* Center: expanded search bar */}
        {searchExpanded && (
          <div ref={searchRef} className={styles.mobileSearchExpanded}>
            <SearchBar />
          </div>
        )}

        {/* Right group: search icon (hidden when expanded) + locale */}
        <div className={styles.mobileRight}>
          {!searchExpanded && (
            <button
              className={styles.mobileSearchBtn}
              onClick={() => setSearchExpanded(true)}
              aria-label="Open search"
            >
              <SearchIcon />
            </button>
          )}
          <MobileLocaleDropdown />
        </div>

      </div>
    </div>
  );
}
