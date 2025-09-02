import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <h1 className="hero__title">Welcome to Pendle Documentation</h1>
      <p className={styles.subtitle}>
        Choose your documentation area to get started
      </p>
    </header>
  );
}

function DocCard({ title, description, link, icon }) {
  return (
    <Link to={link} className={styles.docCard}>
      <div className={styles.docCardContent}>
        <div className={styles.docCardIcon}>{icon}</div>
        <h2 className={styles.docCardTitle}>{title}</h2>
        <p className={styles.docCardDescription}>{description}</p>
        <span className={styles.docCardAction}>Get Started</span>
      </div>
    </Link>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title={siteConfig.title}
      description="Pendle Finance Documentation">
      <main className="main--landing">
        <div className={styles.root}>
          <HomepageHeader />
          <div className={styles.docCardsContainer}>
            <DocCard
              title="Pendle V2 Docs"
              description="Learn about Pendle's yield tokenization protocol, AMM mechanics, vePENDLE system, and integration guides for developers."
              link="/docs/Home"
              icon="📚"
            />
            <DocCard
              title="Boros Dev Docs"
              description="Explore Boros, Pendle's interest rate swaps platform with order book mechanics, margin trading, and advanced settlement features."
              link="/boros"
              icon="📊"
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}