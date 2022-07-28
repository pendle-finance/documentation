import React from "react";
import GettingStarted from "./GettingStarted";
import DivingDeeper from "./DivingDeeper";
import styles from "./HomepageFeatures.module.css";

export default function HomepageFeatures() {
  return (
    <div className={styles.root}>
      <GettingStarted />
      <DivingDeeper />
    </div>
  );
}
