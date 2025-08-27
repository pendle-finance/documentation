import React, { useEffect, useRef } from "react";
import styles from "./Directory.module.css";
import Link from "@docusaurus/Link";

export default function AboutTheProtocol() {
  return (
    <div className={styles.root}>
      <div className={styles.featureContainer}>
        <div className={styles.leftFeatureCard}>
          <Link className={styles.link} to="/v2">
            <img src="/img/V2.png" alt="V2" />
            <h1 className={styles.v2Title}>
              <span className={styles.leftTitle}>V2</span>
              <span className={styles.v2RightTitle}>SPOT</span>
            </h1>
            <p className={styles.description}>
              Trade spot yield. Earn fixed yield. Or long yield with leverage — no lockups, no liquidation risk.
            </p>
          </Link>
        </div>
        <div className={styles.rightFeatureCard}>
          <Link className={styles.link} to="/boros">
            <img src="/img/BOROS.png" alt="BOROS" />
            <h1 className={styles.borosTitle}>
              <span className={styles.leftTitle}>BOROS</span>
              <span className={styles.borosRightTitle}>MARGIN</span>
            </h1>
            <p className={styles.description}>
              Trade any yield — even off-chain rates — with powerful leverage and unprecedented capital efficiency.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
