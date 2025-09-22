import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

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

function DocCard({ title, description, link, icon, disabled = false, comingSoon = false, external = false }) {
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

  if (external) {
    return (
      <a href={link} className={styles.docCard} target="_blank" rel="noopener noreferrer">
        {cardContent}
      </a>
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
                link="/pendle-academy/Introduction"
                icon="📊"
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
            <div className={`${styles.docCardsContainer}`}>
              <DocCard
                title="Boros Developer Docs"
                description="Explore Boros, Pendle's interest rate swaps platform with order book mechanics, margin trading, and advanced settlement features."
                link="/boros-dev"
                icon="💻"
              />
              <DocCard
                title="Boros Docs"
                description="Comprehensive documentation for Boros platform features and functionality."
                link="https://pendle.gitbook.io/boros/boros-docs"
                icon="📖"
                external={true}
              />
              <DocCard
                title="Boros Academy"
                description="Learn how to become a Boros trader."
                link="https://pendle.gitbook.io/boros"
                icon="💰"
                external={true}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
