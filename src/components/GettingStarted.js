import React, { useEffect, useRef } from "react";
import Link from "@docusaurus/Link";
import styles from "./GettingStarted.module.css";
import lottie from "lottie-web";
import IntroAnimationData from "../lotties/Introduction.json";
import HandbookAnimationData from "../lotties/Handbook.json";

export default function GettingStarted() {
  const introRef = useRef(null);
  const handbookRef = useRef(null);
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
      container: handbookRef.current,
      name: "handbook",
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: HandbookAnimationData,
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
          <Link className={styles.link} to="/Introduction">
            Introduction to Pendle
            <div className={styles.introLottie} ref={introRef} />
          </Link>
        </div>
        <div
          className={styles.rightFeatureCard}
          onMouseEnter={() => {
            play("handbook");
          }}
          onMouseLeave={() => {
            playReverse("handbook");
          }}
        >
          <Link className={styles.link} to="https://handbook.pendle.finance/">
            Yield Trading Handbook
            <div className={styles.handbookLottie} ref={handbookRef} />
          </Link>
        </div>
      </div>
    </div>
  );
}
