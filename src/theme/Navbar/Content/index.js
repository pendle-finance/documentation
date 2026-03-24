import React, { useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import NavbarItem from "@theme/NavbarItem";
import SearchBar from "@theme/SearchBar";
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

const PENDLE_ITEMS = [
  { label: "Pendle Docs", to: "/pendle-v2/Introduction", position: "left" },
  { label: "Pendle Academy", to: "/pendle-academy/Introduction", position: "left" },
  { label: "Pendle API", to: "/pendle-v2/Developers/Backend/ApiOverview", position: "left" },
];

const BOROS_ITEMS = [
  { label: "Boros Docs", to: "/boros-docs/Introduction", position: "left" },
  { label: "Boros Academy", to: "/boros-academy/Introduction", position: "left" },
  { label: "Boros Dev Docs", to: "/boros-dev", position: "left" },
];

function isBoros(pathname) {
  return (
    pathname.startsWith("/boros-dev") ||
    pathname.startsWith("/boros-docs") ||
    pathname.startsWith("/boros-academy") ||
    pathname.startsWith("/boros")
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
  const borosActive = isBoros(pathname);
  const navItems = borosActive ? BOROS_ITEMS : PENDLE_ITEMS;

  useEffect(() => {
    document.documentElement.dataset.site = borosActive ? "boros" : "pendle";
  }, [borosActive]);

  return (
    <NavbarContentLayout
      left={
        <>
          <NavbarMobileSidebarToggle />
          <Link to={borosActive ? "/boros" : "/pendle-v2"}>
            <div className="navbar__logo">
               <img src="/img/logo.svg" alt="Pendle" />
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
        </>
      }
    />
  );
}
