import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Learn about us',
    Svg: require('../../static/img/logo.svg').default,
    description: (
      <>
        All you need to know to get started on your Pendle journey
      </>
    ),
    url: '/docs/information/intro',
  },
  {
    title: 'Build on top of Pendle',
    Svg: require('../../static/img/database.svg').default,
    description: (
      <>
        Build DApps on top of the Pendle ecosystem
      </>
    ),
    url: '/docs/guides/intro',
  },
  {
    title: 'Contract reference',
    Svg: require('../../static/img/contracts.svg').default,
    description: (
      <>
        Detailed documentation on Pendle's contracts
      </>
    ),
    url: '/docs/reference/intro',
  },
  {
    title: 'List of addresses',
    Svg: require('../../static/img/addresses.svg').default,
    description: (
      <>
        The necessary Pendle contract addresses across the different chains
      </>
    ),
    url: '/docs/addresses/avalanche',
  },
];

function Feature({Svg, title, description, url}) {
  return (
    <Link
    className="button col col--4 item shadow--md"
    to={url}>
      <div>
        <div className="text--center">
          <Svg className={styles.featureSvg} alt={title} />
        </div>
        <div className={`text--left padding-left--xl ${styles.featureText}`}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={`row ${styles.featureRow}`}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
