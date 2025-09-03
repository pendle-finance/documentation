import React from "react";
import Link from "@docusaurus/Link";
import styles from "./GettingStarted.module.css";
import lottie from "lottie-web";
import useLottieAnimation from "./hooks/useLottieAnimation";
import IntroAnimationData from "../lotties/Introduction.json";
import GovernanceAnimationData from "../lotties/Governance.json";
import AMMAnimationData from "../lotties/AMM.json";
import YieldTokenizationAnimationData from "../lotties/YieldTokenization.json";

export default function GettingStarted() {
  const intro = useLottieAnimation(IntroAnimationData, "intro");
  const governance = useLottieAnimation(GovernanceAnimationData, "governance");
  const yieldAnim = useLottieAnimation(YieldTokenizationAnimationData, "yield");
  const amm = useLottieAnimation(AMMAnimationData, "amm");

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
                <div className={styles.lottie} ref={intro.containerRef} />
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
                <div className={styles.lottie} ref={governance.containerRef} />
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
                <div className={styles.lottie} ref={yieldAnim.containerRef} />
                <div className={styles.featureTitle}>
                  Yield Tokenization
                </div>
              </div>
            </Link>
            <Link to="/ProtocolMechanics/LiquidityEngines/AMM" className={styles.indivFeature}>
              <div
                onMouseEnter={() => {
                  play("amm");
                }}
                onMouseLeave={() => {
                  playReverse("amm");
                }}
                className={styles.lottieWrapper}
              >
                <div className={styles.lottie} ref={amm.containerRef} />
                <div className={styles.featureTitle}>Liquidity Engines</div>
              </div>
            </Link>
          </Link>
        </div>
      </div>
    </div>
  );
}
