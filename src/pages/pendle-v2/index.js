import React, { useRef, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import lottie from 'lottie-web';
import styles from '../index.module.css';
import IntroductionAnim from '../../lotties/icons/Introduction.json';
import AcademyAnim from '../../lotties/icons/Academy.json';
import DevelopersAnim from '../../lotties/icons/Developers.json';

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
        <span className={styles.docCardAction}>Get Started</span>
      </div>
    </>
  );

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

export default function PendleV2Home() {
  return (
    <Layout
      title="Pendle V2 Documentation"
      description="Learn about Pendle's yield tokenization protocol, AMM mechanics, and developer integrations."
      noFooter={true}
    >
      <main className="main--landing">
        <div className={`${styles.root} ${styles.pendleRoot}`}>
          <div className={styles.heroIllustration}>
            <img src="/img/cube-v2.png" alt="Pendle V2" />
          </div>
          <header className={styles.heroBanner}>
            <h1 className="hero__title">Pendle V2 Documentation Hub</h1>
          </header>

          <div className={`${styles.section} ${styles.pendleSection}`}>
            <div className={styles.docCardsContainer}>
              <DocCard
                title="Pendle Docs"
                description="Learn about Pendle's yield tokenization protocol, AMM mechanics, sPENDLE system, and integration guides for developers."
                link="/pendle-v2/Introduction"
                animationData={IntroductionAnim}
                bannerImage="/img/Pendle v2 docs.svg"
              />
              <DocCard
                title="Pendle Academy"
                description="Learn how to use Pendle products with Pendle Academy."
                link="/pendle-academy/Introduction"
                animationData={AcademyAnim}
                bannerImage="/img/Pendle Academy.svg"
              />
              <DocCard
                title="Pendle API"
                description="For developers to integrate Pendle products into their own applications."
                link="/pendle-v2/Developers/Backend/ApiOverview"
                animationData={DevelopersAnim}
                bannerImage="/img/Pendle v2 api.svg"
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
