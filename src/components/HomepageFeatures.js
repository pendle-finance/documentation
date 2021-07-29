import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Accessibility',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Pendle aims to support numerous protocols and assets, allowing you holistic and effortless management of yield on a single platform.
      </>
    ),
  },
  {
    title: 'Flexibility',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        You own your capital. On Pendle, you can deposit or withdraw as you please, without having to wait for contract maturation.
      </>
    ),
  },
  {
    title: 'Fully On-Chain',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        All transactions are handled by smart contracts and are verifiable. This means transparency and honesty between Pendle and you.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
