import React, { useEffect, useRef } from "react";
import styles from "./AboutTheProtocol.module.css";
import Link from "@docusaurus/Link";
import lottie from "lottie-web";
import ArchitectureAnimationData from "../lotties/YieldTrading.json";
import IntegrationAnimationData from "../lotties/Developers.json";
import DeploymentsAnimationData from "../lotties/Pools.json";

export default function AboutTheProtocol() {
  const architectureRef = useRef(null);
  const integrationRef = useRef(null);
  const deploymentsRef = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: architectureRef.current,
      name: "architecture",
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: ArchitectureAnimationData,
    });

    lottie.loadAnimation({
      container: integrationRef.current,
      name: "integration",
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: IntegrationAnimationData,
    });

    lottie.loadAnimation({
      container: deploymentsRef.current,
      name: "deployments",
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: DeploymentsAnimationData,
    });

    return () => {
      lottie.destroy();
    };
  }, []);

  const play = (name) => {
    lottie.setDirection(1);
    lottie.setSpeed(2);
    lottie.play(name);
  };
  const playReverse = (name) => {
    lottie.setDirection(-1);
    lottie.setSpeed(2);
    lottie.play(name);
  };

  return (
    <div className={styles.root}>
      <h2>For the Developers</h2>
      <div className={styles.featureContainer}>
        <div className={styles.leftFeatureCard}>
          <Link to="/Developers/Overview" className={styles.sibling}>
            Integration
          </Link>
          <Link to="/Developers/Overview" className={styles.subFeatures}>
            <Link to="/Developers/Overview" className={styles.indivFeature}>
              <div
                onMouseEnter={() => {
                  play("architecture");
                }}
                onMouseLeave={() => {
                  playReverse("architecture");
                }}
                className={styles.lottieWrapper}
              >
                <div className={styles.lottie} ref={architectureRef} />
                <div className={styles.featureTitle}>
                  Developer Overview
                </div>
              </div>
            </Link>
            <Link to="/Developers/Integration/PTOracle" className={styles.indivFeature}>
              <div
                onMouseEnter={() => {
                  play("integration");
                }}
                onMouseLeave={() => {
                  playReverse("integration");
                }}
                className={styles.lottieWrapper}
              >
                <div className={styles.lottie} ref={integrationRef} />
                <div className={styles.featureTitle}>Using PT</div>
              </div>
            </Link>
          </Link>
        </div>
        <div
          className={styles.rightFeatureCard}
          onMouseEnter={() => {
            play("deployments");
          }}
          onMouseLeave={() => {
            playReverse("deployments");
          }}
        >
          <Link className={styles.link} to="/Developers/Deployments/Ethereum">
            Deployed Contracts
            <div className={styles.deploymentsLottie} ref={deploymentsRef} />
          </Link>
        </div>
      </div>
    </div>
  );
}
