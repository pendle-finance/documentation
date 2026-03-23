import React, { useRef, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import lottie from 'lottie-web';
import styles from './index.module.css';
import IntroductionAnim from '../lotties/icons/Introduction.json';
import AcademyAnim from '../lotties/icons/Academy.json';
import DevelopersAnim from '../lotties/icons/Developers.json';
import AppguideAnim from '../lotties/icons/Appguide.json';
import WhitepaperAnim from '../lotties/icons/Whitepaper.json';
import FAQAnim from '../lotties/icons/FAQ.json';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <h1 className="hero__title">Welcome to Pendle's Documentation Hub</h1>
    </header>
  );
}

function SectionTitle({ title }) {
  return (
    <div className={styles.sectionTitle}>
      <h2 className={styles.sectionTitleText}>{title}</h2>
    </div>
  );
}

function DocCard({ title, description, link, animationData, bannerImage, disabled = false, comingSoon = false, external = false }) {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

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
        <h2 className={styles.docCardTitle}>
          {title}
          {external && (
            <span className="material-symbols-outlined" style={{fontSize:'0.85rem', verticalAlign:'middle', marginLeft:'5px', opacity:0.45, fontVariationSettings:"'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20"}}>
              open_in_new
            </span>
          )}
        </h2>
        <p className={styles.docCardDescription}>{description}</p>
        <span className={styles.docCardAction}>
          {comingSoon ? 'Coming Soon' : 'Get Started'}
        </span>
      </div>
    </>
  );

  if (disabled) {
    return (
      <div className={`${styles.docCard} ${styles.docCardDisabled}`}>
        {cardContent}
      </div>
    );
  }

  if (external) {
    return (
      <a
        href={link}
        className={styles.docCard}
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
      className={styles.docCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {cardContent}
    </Link>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Pendle Finance Documentation"
      noFooter={true}>
      <main className="main--landing">
        <div className={styles.root}>
          <HomepageHeader />

          <div className={`${styles.section} ${styles.pendleSection}`}>
            <SectionTitle title="Pendle V2" />
            <div className={styles.docCardsContainer}>
              <DocCard
                title="Pendle V2 Docs"
                description="Learn about Pendle's yield tokenization protocol, AMM mechanics, sPENDLE system, and integration guides for developers."
                link="/pendle-v2/Introduction"
                animationData={IntroductionAnim}
                bannerImage="/img/Pendle v2 docs.svg"
              />
              <DocCard
                title="Pendle Academy"
                description="Learn how to use Pendle products with Pendle Academy."
                link="https://pendle.gitbook.io/pendle-academy/"
                animationData={AcademyAnim}
                bannerImage="/img/Pendle Academy.svg"
                external={true}
              />
              <DocCard
                title="Pendle V2 API"
                description="For developers to integrate Pendle products into their own applications."
                link="/pendle-v2/Developers/Backend/ApiOverview"
                animationData={DevelopersAnim}
                bannerImage="/img/Pendle v2 api.svg"
              />
            </div>
          </div>

          <div className={`${styles.section} ${styles.borosSection}`}>
            <SectionTitle title="Boros" />
            <div className={styles.docCardsContainer}>
              <DocCard
                title="Boros Developer Docs"
                description="Explore Boros, Pendle's interest rate swaps platform with order book mechanics, margin trading, and advanced settlement features."
                link="/boros-dev"
                animationData={AppguideAnim}
                bannerImage="/img/Boros Developer Docs.svg"
              />
              <DocCard
                title="Boros Docs"
                description="Comprehensive documentation for Boros platform features and functionality."
                link="https://pendle.gitbook.io/boros/boros-docs"
                animationData={WhitepaperAnim}
                bannerImage="/img/Boros Docs.svg"
                external={true}
              />
              <DocCard
                title="Boros Academy"
                description="Learn how to become a Boros trader."
                link="https://pendle.gitbook.io/boros"
                animationData={FAQAnim}
                bannerImage="/img/Boros Academy.svg"
                external={true}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
