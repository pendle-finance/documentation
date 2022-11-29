import React, { useEffect, useRef } from "react";
import Link from "@docusaurus/Link";
import styles from "./GettingStarted.module.css";
import lottie from "lottie-web";
import IntroAnimationData from "../lotties/Introduction.json";
import DiscountAnimationData from "../lotties/Discount.json";
import PoolsAnimationData from "../lotties/Pools.json";

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
      name: "pools",
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: PoolsAnimationData,
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
          <Link className={styles.link} to="/introduction">
            Introduction to Pendle
            <div className={styles.introLottie} ref={introRef} />
          </Link>
        </div>
        <div className={styles.rightFeatureCard}>
          <Link to="/UsingPendle/Simple" className={styles.sibling}>
            Using Pendle
          </Link>
          <Link to="/UsingPendle/Simple" className={styles.subFeatures}>
            <Link to="/UsingPendle/Discount" className={styles.indivFeature}>
              <div
                onMouseEnter={() => {
                  play("discount");
                }}
                onMouseLeave={() => {
                  playReverse("discount");
                }}
                className={styles.lottieWrapper}
              >
                <div className={styles.lottie} ref={discountRef} />
                <div className={styles.featureTitle}>
                  Purchase Assets <br /> at a Discount
                </div>
              </div>
            </Link>
            <Link to="/UsingPendle/Pools" className={styles.indivFeature}>
              <div
                onMouseEnter={() => {
                  play("pools");
                }}
                onMouseLeave={() => {
                  playReverse("pools");
                }}
                className={styles.lottieWrapper}
              >
                <div className={styles.lottie} ref={farmRef} />
                <div className={styles.featureTitle}>Pools</div>
              </div>
            </Link>
          </Link>
        </div>
      </div>
    </div>
  );
}
