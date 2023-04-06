import React from "react";
import GettingStarted from "./GettingStarted";
import AboutTheProtocol from "./AboutTheProtocol";
import styles from "./HomepageFeatures.module.css";

export default function HomepageFeatures() {
  return (
    <div className={styles.root}>
      <GettingStarted />
      <AboutTheProtocol />
    </div>
  );
}
