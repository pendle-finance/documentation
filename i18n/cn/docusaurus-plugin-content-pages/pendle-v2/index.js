import React, { useRef, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import lottie from 'lottie-web';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '../../../../src/pages/index.module.css';
import IntroductionAnim from '../../../../src/lotties/icons/Introduction.json';
import AcademyAnim from '../../../../src/lotties/icons/Academy.json';
import DevelopersAnim from '../../../../src/lotties/icons/Developers.json';

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
        <span className={styles.docCardAction}>开始使用</span>
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
  const cubeImg = useBaseUrl('/img/cube-v2.png');
  const bannerDocs = useBaseUrl('/img/Pendle v2 docs.svg');
  const bannerAcademy = useBaseUrl('/img/Pendle Academy.svg');
  const bannerDev = useBaseUrl('/img/Pendle v2 api.svg');

  return (
    <Layout
      title="Pendle V2 文档"
      description="了解 Pendle 的收益代币化协议、AMM 机制及开发者集成指南。"
      noFooter={true}
    >
      <main className="main--landing">
        <div className={`${styles.root} ${styles.pendleRoot}`}>
          <div className={styles.heroIllustration}>
            <img src={cubeImg} alt="Pendle V2" />
          </div>
          <header className={styles.heroBanner}>
            <h1 className="hero__title">Pendle V2 文档中心</h1>
          </header>

          <div className={`${styles.section} ${styles.pendleSection}`}>
            <div className={styles.docCardsContainer}>
              <DocCard
                title="Pendle 文档"
                description="了解 Pendle 的收益代币化协议、AMM 机制、sPENDLE 系统及面向开发者的集成指南。"
                link="/pendle-v2/Introduction"
                animationData={IntroductionAnim}
                bannerImage={bannerDocs}
              />
              <DocCard
                title="Pendle 学院"
                description="通过 Pendle 学院，学习如何使用 Pendle 产品。"
                link="/pendle-academy/Introduction"
                animationData={AcademyAnim}
                bannerImage={bannerAcademy}
              />
              <DocCard
                title="Pendle 开发者文档"
                description="面向开发者，将 Pendle 产品集成到自己应用程序的参考文档。"
                link="/pendle-v2-dev/Overview"
                animationData={DevelopersAnim}
                bannerImage={bannerDev}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
