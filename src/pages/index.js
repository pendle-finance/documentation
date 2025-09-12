import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <h1 className="hero__title">Welcome to Pendle Documentation</h1>
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

function DocCard({ title, description, link, icon, disabled = false, comingSoon = false }) {
  const cardContent = (
    <div className={styles.docCardContent}>
      <div className={styles.docCardIcon}>{icon}</div>
      <h2 className={styles.docCardTitle}>{title}</h2>
      <p className={styles.docCardDescription}>{description}</p>
      <span className={styles.docCardAction}>
        {comingSoon ? 'Coming Soon' : 'Get Started'}
      </span>
    </div>
  );

  if (disabled) {
    return (
      <div className={`${styles.docCard} ${styles.docCardDisabled}`}>
        {cardContent}
      </div>
    );
  }

  return (
    <Link to={link} className={styles.docCard}>
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
          
          <div className={styles.section}>
            <SectionTitle title="Pendle V2" />
            <div className={styles.docCardsContainer}>
              <DocCard
                title="Pendle V2 Docs"
                description="Learn about Pendle's yield tokenization protocol, AMM mechanics, vePENDLE system, and integration guides for developers."
                link="/pendle-v2/Introduction"
                icon="📚"
              />
              <DocCard
                title="Pendle Academy"
                description="Learn how to use Pendle products with Pendle Academy."
                link="/boros"
                icon="📊"
                disabled={true}
                comingSoon={true}
              />
              <DocCard
                title="Pendle V2 API"
                description="For developers to integrate Pendle products into their own applications."
                link="/boros"
                icon="🔌"
                disabled={true}
                comingSoon={true}
              />
            </div>
          </div>

          <div className={styles.section}>
            <SectionTitle title="Boros" />
            <div className={`${styles.docCardsContainer} ${styles.borosSection}`}>
              <DocCard
                title="Boros Developer Docs"
                description="Explore Boros, Pendle's interest rate swaps platform with order book mechanics, margin trading, and advanced settlement features."
                link="/boros"
                icon="💻"
              />
              <DocCard
                title="Boros Academy"
                description="Learn how to become a Boros trader."
                link="/boros"
                icon="💰"
                disabled={true}
                comingSoon={true}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
