import React from "react";
import styles from "./GettingStarted.module.css";
import Svg from "../../static/img/intro.svg";

export default function GettingStarted() {
  return (
    <div>
      <h2>Getting Started</h2>
      <div className={styles.featureContainer}>
        <div className={styles.featureCard}>
          Introduction to Pendle
          <Svg role="img" className={styles.image} />
        </div>
        <div className={styles.featureCard}>
          Using Pendle
          <div className={styles.rightFeatures}>
            <div className={styles.indivFeature}>
              <Svg />
              <div className={styles.featureTitle}>
                Purchase Assets <br /> at a Discount
              </div>
            </div>
            <div className={styles.indivFeature}>
              <Svg />
              <div className={styles.featureTitle}>Farm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
