import React, { useRef, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import lottie from 'lottie-web';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '../../../../src/pages/index.module.css';
import AppguideAnim from '../../../../src/lotties/icons/Appguide.json';
import WhitepaperAnim from '../../../../src/lotties/icons/Whitepaper.json';
import FAQAnim from '../../../../src/lotties/icons/FAQ.json';

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
        <span className={`${styles.docCardAction} ${styles.borosAction}`}>开始使用</span>
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
  const cubeImg = useBaseUrl('/img/cube-boros.png');
  const bannerDocs = useBaseUrl('/img/Boros Docs.svg');
  const bannerAcademy = useBaseUrl('/img/Boros Academy.svg');
  const bannerDev = useBaseUrl('/img/Boros Developer Docs.svg');

  return (
    <Layout
      title="Boros 文档"
      description="Boros 是 Pendle 的利率互换平台，具备订单簿机制和高级结算功能。"
      noFooter={true}
    >
      <main className="main--landing">
        <div className={`${styles.root} ${styles.borosRoot}`}>
          <div className={styles.heroIllustration}>
            <img src={cubeImg} alt="Boros" />
          </div>
          <header className={styles.heroBanner}>
            <h1 className="hero__title">Boros 文档中心</h1>
          </header>

          <div className={`${styles.section} ${styles.borosSection}`}>
            <div className={styles.docCardsContainer}>
              <DocCard
                title="Boros 文档"
                description="Boros 平台功能与使用的完整文档。"
                link="/boros-docs/Introduction"
                animationData={WhitepaperAnim}
                bannerImage={bannerDocs}
              />
              <DocCard
                title="Boros 学院"
                description="学习如何成为 Boros 交易者。"
                link="/boros-academy/Introduction"
                animationData={FAQAnim}
                bannerImage={bannerAcademy}
              />
              <DocCard
                title="Boros 开发者文档"
                description="探索 Boros——Pendle 的利率互换平台，支持订单簿机制、保证金交易和高级结算功能。"
                link="/boros-dev"
                animationData={AppguideAnim}
                bannerImage={bannerDev}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
