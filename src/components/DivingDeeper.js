import React, { useEffect, useRef } from "react";
import styles from "./DivingDeeper.module.css";
import Link from "@docusaurus/Link";
import lottie from "lottie-web";
import GovernanceAnimationData from "../lotties/Governance.json";
import SDKAnimationData from "../lotties/SDK.json";
import YieldAnimationData from "../lotties/Yield.json";

export default function DivingDeeper() {
  const sdkRef = useRef(null);
  const yieldRef = useRef(null);
  const governanceRef = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: sdkRef.current,
      name: "sdk",
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: SDKAnimationData,
    });

    lottie.loadAnimation({
      container: yieldRef.current,
      name: "yield",
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: YieldAnimationData,
    });

    lottie.loadAnimation({
      container: governanceRef.current,
      name: "governance",
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: GovernanceAnimationData,
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
      <h2>Diving Deeper</h2>
      <div className={styles.featureContainer}>
        <div className={styles.leftFeatureCard}>
          <Link to="/PendlePro/UsingPro" className={styles.sibling}>
            Pendle Pro
          </Link>
          <Link to="/PendlePro/UsingPro" className={styles.subFeatures}>
            <Link to="/PendlePro/UsingPro" className={styles.indivFeature}>
              <div
                onMouseEnter={() => {
                  play("yield");
                }}
                onMouseLeave={() => {
                  playReverse("yield");
                }}
                className={styles.lottieWrapper}
              >
                <div className={styles.lottie} ref={yieldRef} />
                <div className={styles.featureTitle}>
                  Yield Trading
                </div>
              </div>
            </Link>
            <Link to="/Governance/vePENDLE" className={styles.indivFeature}>
              <div
                onMouseEnter={() => {
                  play("governance");
                }}
                onMouseLeave={() => {
                  playReverse("governance");
                }}
                className={styles.lottieWrapper}
              >
                <div className={styles.lottie} ref={governanceRef} />
                <div className={styles.featureTitle}>Governance</div>
              </div>
            </Link>
          </Link>
        </div>
        <div
          className={styles.rightFeatureCard}
          onMouseEnter={() => {
            play("sdk");
          }}
          onMouseLeave={() => {
            playReverse("sdk");
          }}
        >
          <Link className={styles.link} to="/developers/sdk">
            SDK
            <div className={styles.sdkLottie} ref={sdkRef} />
          </Link>
        </div>
      </div>
    </div>
  );
}
