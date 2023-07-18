import React, { useEffect, useRef } from "react";
import Link from "@docusaurus/Link";
import styles from "./GettingStarted.module.css";
import lottie from "lottie-web";
import IntroAnimationData from "../lotties/Introduction.json";
import GovernanceAnimationData from "../lotties/Governance.json";
import AMMAnimationData from "../lotties/AMM.json";
import YieldTokenizationAnimationData from "../lotties/YieldTokenization.json";

export default function GettingStarted() {
  const introRef = useRef(null);
  const governanceRef = useRef(null);
  const yieldRef = useRef(null);
  const ammRef = useRef(null);

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
      container: governanceRef.current,
      name: "governance",
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: GovernanceAnimationData,
    });

    lottie.loadAnimation({
      container: yieldRef.current,
      name: "yield",
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: YieldTokenizationAnimationData,
    });

    lottie.loadAnimation({
      container: ammRef.current,
      name: "amm",
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: AMMAnimationData,
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
      <h2>Getting Started with the Protocol</h2>
      <div className={styles.featureContainer}>
      <div className={styles.leftFeatureCard}>
          <Link to="/Introduction" className={styles.sibling}>
            Overview
          </Link>
          <Link to="/Introduction" className={styles.subFeatures}>
            <Link to="/Introduction" className={styles.indivFeature}>
              <div
                onMouseEnter={() => {
                  play("intro");
                }}
                onMouseLeave={() => {
                  playReverse("intro");
                }}
                className={styles.lottieWrapper}
              >
                <div className={styles.lottie} ref={introRef} />
                <div className={styles.featureTitle}>
                  Introduction
                </div>
              </div>
            </Link>
            <Link to="/ProtocolMechanics/Mechanisms/vePENDLE" className={styles.indivFeature}>
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
                <div className={styles.featureTitle}>vePENDLE</div>
              </div>
            </Link>
          </Link>
        </div>
        <div className={styles.rightFeatureCard}>
          <Link to="/ProtocolMechanics/YieldTokenization/SY" className={styles.sibling}>
            Protocol Mechanics
          </Link>
          <Link to="/ProtocolMechanics/YieldTokenization/SY" className={styles.subFeatures}>
            <Link to="/ProtocolMechanics/YieldTokenization/SY" className={styles.indivFeature}>
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
                  Yield Tokenization
                </div>
              </div>
            </Link>
            <Link to="/ProtocolMechanics/AMM" className={styles.indivFeature}>
              <div
                onMouseEnter={() => {
                  play("amm");
                }}
                onMouseLeave={() => {
                  playReverse("amm");
                }}
                className={styles.lottieWrapper}
              >
                <div className={styles.lottie} ref={ammRef} />
                <div className={styles.featureTitle}>Pendle AMM</div>
              </div>
            </Link>
          </Link>
        </div>
      </div>
    </div>
  );
}
