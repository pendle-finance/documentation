import React, { useEffect, useRef } from "react";
import styles from "./DivingDeeper.module.css";

import lottie from "lottie-web";
import IntroAnimationData from "../lotties/Introduction.json";
import DiscountAnimationData from "../lotties/Discount.json";
import FarmAnimationData from "../lotties/Farm.json";
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
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: SDKAnimationData,
    });

    lottie.loadAnimation({
      container: yieldRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: YieldAnimationData,
    });

    lottie.loadAnimation({
      container: governanceRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: GovernanceAnimationData,
    });

    return () => {
      lottie.destroy();
    };
  }, []);

  const play = () => {
    lottie.setDirection(1);
    lottie.setSpeed(2);
    lottie.play();
  };
  const playReverse = () => {
    lottie.setDirection(-1);
    lottie.setSpeed(2);
    lottie.play();
  };

  return (
    <div className={styles.root}>
      <h2>Diving Deeper</h2>
      <div className={styles.featureContainer}>
        <div className={styles.featureCard}>
          Pendle Pro
          <div className={styles.leftFeatures}>
            <div
              className={styles.indivFeature}
              onMouseEnter={play}
              onMouseLeave={playReverse}
            >
              <div className={styles.lottie} ref={yieldRef} />

              <div className={styles.featureTitle}>Yield Trading</div>
            </div>
            <div
              className={styles.indivFeature}
              onMouseEnter={play}
              onMouseLeave={playReverse}
            >
              <div className={styles.lottie} ref={governanceRef} />
              <div className={styles.featureTitle}>Governance</div>
            </div>
          </div>
        </div>
        <div
          className={styles.rightFeatureCard}
          onMouseEnter={play}
          onMouseLeave={playReverse}
        >
          SDK
          <div className={styles.sdkLottie} ref={sdkRef} />
        </div>
      </div>
    </div>
  );
}
