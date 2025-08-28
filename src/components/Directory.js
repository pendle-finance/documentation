import React, { useEffect, useRef } from "react";
import styles from "./Directory.module.css";
import Link from "@docusaurus/Link";
import lottie from "lottie-web";
import V2AnimationData from "../lotties/v2-ball.json";
import BorosAnimationData from "../lotties/boros-ball.json";

export default function AboutTheProtocol() {
  const v2Ref = useRef(null);
  const borosRef = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: v2Ref.current,
      name: "v2",
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: V2AnimationData,
    });

    lottie.loadAnimation({
      container: borosRef.current,
      name: "boros",
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: BorosAnimationData,
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
      <div className={styles.featureContainer}>
        <div className={styles.leftFeatureCard}>
          <Link className={styles.link} to="/v2">
            <div className={styles.lottie} ref={v2Ref} />
            <h1 className={styles.v2Title}>
              <span className={styles.leftTitle}>V2</span>
              <span className={styles.v2RightTitle}>SPOT</span>
            </h1>
            <p className={styles.description}>
              Trade spot yield. Earn fixed yield. Or long yield with leverage — no lockups, no liquidation risk.
            </p>
          </Link>
        </div>
        <div className={styles.rightFeatureCard}>
          <Link className={styles.link} to="/boros">
            <div className={styles.lottie} ref={borosRef} />
            <h1 className={styles.borosTitle}>
              <span className={styles.leftTitle}>BOROS</span>
              <span className={styles.borosRightTitle}>MARGIN</span>
            </h1>
            <p className={styles.description}>
              Trade any yield — even off-chain rates — with powerful leverage and unprecedented capital efficiency.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
