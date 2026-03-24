import React, { useRef, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import lottie from 'lottie-web';
import styles from '../index.module.css';
import AppguideAnim from '../../lotties/icons/Appguide.json';
import WhitepaperAnim from '../../lotties/icons/Whitepaper.json';
import FAQAnim from '../../lotties/icons/FAQ.json';

function DocCard({ title, description, link, animationData, bannerImage, external = false }) {
  const animationRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (animationData && containerRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData,
      });
      return () => {
        animationRef.current?.destroy();
        animationRef.current = null;
      };
    }
  }, [animationData]);

  const handleMouseEnter = () => {
    animationRef.current?.setDirection(1);
    animationRef.current?.play();
  };
  const handleMouseLeave = () => {
    animationRef.current?.setDirection(-1);
    animationRef.current?.play();
  };

  const cardContent = (
    <>
      <div className={styles.docCardBanner}>
        <img src={bannerImage} alt="" className={styles.docCardBannerImg} aria-hidden="true" />
      </div>
      <div className={styles.docCardContent}>
        <h2 className={styles.docCardTitle}>{title}</h2>
        <p className={styles.docCardDescription}>{description}</p>
        <span className={`${styles.docCardAction} ${styles.borosAction}`}>Get Started</span>
      </div>
    </>
  );

  if (external) {
    return (
      <a
        href={link}
        className={`${styles.docCard} ${styles.borosCard}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link
      to={link}
      className={`${styles.docCard} ${styles.borosCard}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {cardContent}
    </Link>
  );
}

export default function BorosHome() {
  return (
    <Layout
      title="Boros Documentation"
      description="Boros is Pendle's interest rate swaps platform with order book mechanics and advanced settlement features."
      noFooter={true}
    >
      <main className="main--landing">
        <div className={styles.root}>
          <header className={styles.heroBanner}>
            <h1 className="hero__title">Boros Documentation</h1>
          </header>

          <div className={`${styles.section} ${styles.borosSection}`}>
            <div className={styles.docCardsContainer}>
              <DocCard
                title="Boros Docs"
                description="Comprehensive documentation for Boros platform features and functionality."
                link="/boros-docs/Introduction"
                animationData={WhitepaperAnim}
                bannerImage="/img/Boros Docs.svg"
              />
              <DocCard
                title="Boros Academy"
                description="Learn how to become a Boros trader."
                link="/boros-academy/Introduction"
                animationData={FAQAnim}
                bannerImage="/img/Boros Academy.svg"
              />
              <DocCard
                title="Boros Dev Docs"
                description="Explore Boros, Pendle's interest rate swaps platform with order book mechanics, margin trading, and advanced settlement features."
                link="/boros-dev"
                animationData={AppguideAnim}
                bannerImage="/img/Boros Developer Docs.svg"
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
