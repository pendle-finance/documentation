import React, { useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import NavbarItem from "@theme/NavbarItem";
import SearchBar from "@theme/SearchBar";
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const NAV_LABELS = {
  en: {
    pendleDocs: "Pendle Docs",
    pendleAcademy: "Pendle Academy",
    pendleDev: "Pendle Dev Docs",
    borosDocs: "Boros Docs",
    borosAcademy: "Boros Academy",
    borosDev: "Boros Dev Docs",
  },
  cn: {
    pendleDocs: "Pendle 文档",
    pendleAcademy: "Pendle 学院",
    pendleDev: "Pendle 开发者文档",
    borosDocs: "Boros 文档",
    borosAcademy: "Boros 学院",
    borosDev: "Boros 开发者文档",
  },
};

function getNavItems(isBoros, locale) {
  const l = NAV_LABELS[locale] ?? NAV_LABELS.en;
  if (isBoros) {
    return [
      { label: l.borosDocs, to: "/boros-docs/Introduction", activeBaseRegex: "^(/[a-z]{2})?/boros-docs", position: "left" },
      { label: l.borosAcademy, to: "/boros-academy/Introduction", activeBaseRegex: "^(/[a-z]{2})?/boros-academy", position: "left" },
      { label: l.borosDev, to: "/boros-dev", activeBaseRegex: "^(/[a-z]{2})?/boros-dev", position: "left" },
    ];
  }
  return [
    { label: l.pendleDocs, to: "/pendle-v2/Introduction", activeBaseRegex: "^(/[a-z]{2})?/pendle-v2/", position: "left" },
    { label: l.pendleAcademy, to: "/pendle-academy/Introduction", activeBaseRegex: "^(/[a-z]{2})?/pendle-academy", position: "left" },
    { label: l.pendleDev, to: "/pendle-v2-dev/Overview", activeBaseRegex: "^(/[a-z]{2})?/pendle-v2-dev", position: "left" },
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

function NavbarItems({ items }) {
  return (
    <>
      {items.map((item, i) => (
        <NavbarItem {...item} key={i} />
      ))}
    </>
  );
}

function NavbarContentLayout({ left, right }) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}

export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const { pathname } = useLocation();
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const borosActive = isBoros(pathname);
  const navItems = getNavItems(borosActive, currentLocale);
  const logoSrc = useBaseUrl(borosActive ? "/img/boros-logo.svg" : "/img/logo.svg");

  useEffect(() => {
    document.documentElement.dataset.site = borosActive ? "boros" : "pendle";
  }, [borosActive]);

  return (
    <NavbarContentLayout
      left={
        <>
          <NavbarMobileSidebarToggle />
          <Link to={borosActive ? "/boros" : "/pendle-v2/Introduction"}>
            <div className="navbar__logo">
               <img src={logoSrc} alt={borosActive ? "Boros" : "Pendle"} />
            </div>
          </Link>
          <NavbarItems items={navItems} />
        </>
      }
      right={
        <>
          <div className={styles.searchContainer}>
            <SearchBar />
          </div>
          <NavbarItem type="localeDropdown" position="right" />
        </>
      }
    />
  );
}
