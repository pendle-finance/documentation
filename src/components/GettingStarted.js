import React, { useEffect, useRef } from "react";

import styles from "./GettingStarted.module.css";
import lottie from "lottie-web";
import IntroAnimationData from "../lotties/Introduction.json";
import DiscountAnimationData from "../lotties/Discount.json";
import FarmAnimationData from "../lotties/Farm.json";

export default function GettingStarted() {
  const introRef = useRef(null);
  const discountRef = useRef(null);
  const farmRef = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: introRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: IntroAnimationData,
    });

    lottie.loadAnimation({
      container: discountRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: DiscountAnimationData,
    });

    lottie.loadAnimation({
      container: farmRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: FarmAnimationData,
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
    <div>
      <h2>Getting Started</h2>
      <div className={styles.featureContainer}>
        <div
          className={styles.leftFeatureCard}
          onMouseEnter={play}
          onMouseLeave={playReverse}
        >
          Introduction to Pendle
          <div className={styles.introLottie} ref={introRef} />
        </div>
        <div className={styles.featureCard}>
          Using Pendle
          <div className={styles.rightFeatures}>
            <div
              className={styles.indivFeature}
              onMouseEnter={play}
              onMouseLeave={playReverse}
            >
              <div className={styles.lottie} ref={discountRef} />
              <div className={styles.featureTitle}>
                Purchase Assets <br /> at a Discount
              </div>
            </div>
            <div
              className={styles.indivFeature}
              onMouseEnter={play}
              onMouseLeave={playReverse}
            >
              <div className={styles.lottie} ref={farmRef} />
              <div className={styles.featureTitle}>Farm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
