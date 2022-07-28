/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import styles from "./styles.module.css";

function Footer() {
  return (
    <div className={styles.background}>
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
    </div>
  );
}

export default Footer;
