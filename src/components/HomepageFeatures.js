import React from "react";
import styles from "./HomepageFeatures.module.css";
import GettingStarted from "./GettingStarted";
import DivingDeeper from "./DivingDeeper";
import JoinTheConvo from "./JoinTheConvo";

export default function HomepageFeatures() {
  return (
    <div className={styles.root}>
      <GettingStarted />
      <DivingDeeper />
      {/* <JoinTheConvo /> */}
    </div>
  );
}
