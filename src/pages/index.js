import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <h1 className="hero__title">Welcome to the Pendle Documentation</h1>
      <p className={styles.subtitle}>Learn more about Pendle, a DeFi protocol that features two unique products: <br/>
        <b>V2</b>, which allows users to tokenize and trade future yields. <br/>
        <b>Boros</b>, an on-chain platform for trading interest rate swaps.
      </p>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />">
      <main className="main--landing">
        <div className={styles.root}>
          <HomepageHeader />
          <HomepageFeatures />
        </div>
      </main>
    </Layout>
  );
}
