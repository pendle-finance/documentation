import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { useThemeConfig } from "@docusaurus/theme-common";
import {
  useHideableNavbar,
  useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import NavbarMobileSidebar from "@theme/Navbar/MobileSidebar";
import styles from "./styles.module.css";
function NavbarBackdrop(props) {
  return (
    <div
      role="presentation"
      {...props}
      className={clsx("navbar-sidebar__backdrop", props.className)}
    />
  );
}
export default function NavbarLayout({ children }) {
  const {
    navbar: { hideOnScroll, style },
  } = useThemeConfig();
  const mobileSidebar = useNavbarMobileSidebar();
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);
  const scrollProgressLineRef = useRef(null);

  // Mirror navbar-sidebar--show onto body so portalled sidebar CSS works
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("navbar-sidebar--show", mobileSidebar.shown);
    return () => document.body.classList.remove("navbar-sidebar--show");
  }, [mobileSidebar.shown]);

  // Transfer scroll progress functionality from ThinTopBar
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);

      const scrollProgressLine = scrollProgressLineRef.current;
      if (scrollProgressLine) {
        scrollProgressLine.style.setProperty('--scroll-progress', `${scrollPercent}%`);
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, [navbarRef]);

  const portalTarget = typeof document !== "undefined" ? document.body : null;

  return (
    <>
      <nav
        ref={navbarRef}
        className={clsx(
          "navbar",
          "navbar--fixed-top",
          {
            "navbar--dark": style === "dark",
            "navbar--primary": style === "primary",
            "navbar-sidebar--show": mobileSidebar.shown,
          }
        )}
      >
        {children}
        <div ref={scrollProgressLineRef} className={styles.scrollProgressLine} />
      </nav>
      {portalTarget && createPortal(
        <>
          <NavbarBackdrop onClick={mobileSidebar.toggle} />
          <NavbarMobileSidebar />
        </>,
        portalTarget
      )}
    </>
  );
}
