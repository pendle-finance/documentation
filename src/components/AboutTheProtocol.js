import React, { useEffect, useRef } from "react";
import styles from "./AboutTheProtocol.module.css";
import Link from "@docusaurus/Link";
import lottie from "lottie-web";
import AMMAnimationData from "../lotties/AMM.json";
import GovernanceAnimationData from "../lotties/Governance.json";
import YieldTokenizationAnimationData from "../lotties/YieldTokenization.json";

export default function AboutTheProtocol() {
  const governanceRef = useRef(null);
  const yieldRef = useRef(null);
  const ammRef = useRef(null);

  useEffect(() => {
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
      <h2>About the Protocol</h2>
      <div className={styles.featureContainer}>
        <div className={styles.leftFeatureCard}>
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
        <div
          className={styles.rightFeatureCard}
          onMouseEnter={() => {
            play("governance");
          }}
          onMouseLeave={() => {
            playReverse("governance");
          }}
        >
          <Link className={styles.link} to="/ProtocolMechanics/Mechanisms/vePENDLE">
            Governance
            <div className={styles.governanceLottie} ref={governanceRef} />
          </Link>
        </div>
      </div>
    </div>
  );
}
