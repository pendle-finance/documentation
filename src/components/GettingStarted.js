import React, { useEffect, useRef } from "react";
import Link from "@docusaurus/Link";
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
      name: "intro",
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: IntroAnimationData,
    });

    lottie.loadAnimation({
      container: discountRef.current,
      name: "discount",
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: DiscountAnimationData,
    });

    lottie.loadAnimation({
      container: farmRef.current,
      name: "farm",
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: FarmAnimationData,
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
    <div>
      <h2>Getting Started</h2>
      <div className={styles.featureContainer}>
        <div
          className={styles.leftFeatureCard}
          onMouseEnter={() => {
            play("intro");
          }}
          onMouseLeave={() => {
            playReverse("intro");
          }}
        >
          <Link className={styles.link} to="/docs/introduction">
            Introduction to Pendle
            <div className={styles.introLottie} ref={introRef} />
          </Link>
        </div>
        <div className={styles.featureCard}>
          Using Pendle
          <div className={styles.rightFeatures}>
            <div
              className={styles.indivFeature}
              onMouseEnter={() => {
                play("discount");
              }}
              onMouseLeave={() => {
                playReverse("discount");
              }}
            >
              <Link className={styles.link} to="/docs/simple">
                <div className={styles.lottie} ref={discountRef} />
                <div className={styles.featureTitle}>
                  Purchase Assets <br /> at a Discount
                </div>
              </Link>
            </div>
            <div
              className={styles.indivFeature}
              onMouseEnter={() => {
                play("farm");
              }}
              onMouseLeave={() => {
                playReverse("farm");
              }}
            >
              <Link className={styles.link} to="/docs/simple#farm">
                <div className={styles.lottie} ref={farmRef} />
                <div className={styles.featureTitle}>Farm</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
