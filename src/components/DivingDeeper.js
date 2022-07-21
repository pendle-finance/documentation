import React, { useEffect, useRef } from "react";
import styles from "./DivingDeeper.module.css";
import Svg from "../../static/img/intro.svg";

import lottie from "lottie-web";
import animationData from "../lotties/test.json";

export default function DivingDeeper() {
  const lottieRef = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: animationData,
    });

    return () => {
      lottie.destroy();
    };
  }, []);

  const play = () => {
    lottie.setDirection(1)
    lottie.setSpeed(2)
    lottie.play()
  }
  const playReverse = () => {
    lottie.setDirection(-1)
    lottie.setSpeed(2)
    lottie.play()
  }

  return (
    <div className={styles.root}>
      <h2>Diving Deeper</h2>
      <div className={styles.featureContainer}>
        <div className={styles.featureCard}>
          Pendle Pro
          <div className={styles.rightFeatures}>
            <div className={styles.indivFeature}>
              <Svg />
              <div className={styles.featureTitle}>Yield Trading</div>
            </div>
            <div className={styles.indivFeature}>
              <Svg />
              <div className={styles.featureTitle}>Governance</div>
            </div>
          </div>
        </div>
        <div className={styles.featureCard}>
          SDK
          <div className={styles.lottie} ref={lottieRef} onMouseEnter={play} onMouseLeave={playReverse}/>
        </div>
      </div>
    </div>
  );
}
