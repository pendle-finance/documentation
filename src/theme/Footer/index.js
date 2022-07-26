/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useThemeConfig } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import isInternalUrl from "@docusaurus/isInternalUrl";
import styles from "./styles.module.css";
import ThemedImage from "@theme/ThemedImage";

function FooterLink({ to, href, label, prependBaseUrlToHref, ...props }) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {
    forcePrependBaseUrl: true,
  });
  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}
    >
      {href && !isInternalUrl(href) ? <span>{label}</span> : label}
    </Link>
  );
}

const FooterLogo = ({ sources, alt, width, height }) => (
  <ThemedImage
    className="footer__logo"
    alt={alt}
    sources={sources}
    width={width}
    height={height}
  />
);

function Footer() {
  return (
    <div className={styles.root}>
      <div className={styles.linkGroup}>
        <div className={styles.linkGroupTitle}>Pages</div>
        <a href="https://www.pendle.finance/" target="_blank">
          Website
        </a>
        <a href="https://app.pendle.finance/market" target="_blank">
          App
        </a>
      </div>
      <div className={styles.linkGroup}>
        <div className={styles.linkGroupTitle}>Socials</div>
        <a href="https://discord.com/invite/EAujvncY2R" target="_blank">
          Discord
        </a>
        <a href="https://twitter.com/pendle_fi/" target="_blank">
          Twitter
        </a>
        <a href="https://t.me/pendlefinance/" target="_blank">
          Telegram
        </a>
      </div>
      <div className={styles.linkGroup}>
        <div className={styles.linkGroupTitle}>About Us</div>
        <a href="https://medium.com/pendle/" target="_blank">
          Medium
        </a>
        <a href="https://angel.co/company/pendle_finance/" target="_blank">
          Careers
        </a>
        <a href="https://pendle.finance/Pendle_Media_Kit.zip" target="_blank">
          Media Kit
        </a>
        <a
          href="https://github.com/pendle-finance/pendle-core/tree/master/docs/audits"
          target="_blank"
        >
          Audits
        </a>
      </div>
    </div>
  );
}

export default Footer;
