import React from "react";
import Link from "@docusaurus/Link";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "Introduction",
    Svg: require("../../static/img/intro.svg").default,
    url: "/docs/intro"
  },
  {
    title: "Pendle - Simple",
    Svg: require("../../static/img/intro.svg").default,
    url: "/docs/simple"
  },
  {
    title: "Pendle - Pro",
    Svg: require("../../static/img/intro.svg").default,
    url: "/docs/pro"
  },
  {
    title: "Governance",
    Svg: require("../../static/img/intro.svg").default,
    url: "/docs/governance"
  },
  {
    title: "Developers",
    Svg: require("../../static/img/intro.svg").default,
    url: "/docs/developers"
  },
  {
    title: "Contracts",
    Svg: require("../../static/img/intro.svg").default,
    url: "/docs/contracts"
  },
  {
    title: "Purchase Assets at a Discount",
    Svg: require("../../static/img/intro.svg").default,
    url: "/docs/discounted-assets"
  },
  {
    title: "Farm",
    Svg: require("../../static/img/intro.svg").default,
    url: "/docs/farm"
  },
  {
    title: "Yield Trading",
    Svg: require("../../static/img/intro.svg").default,
    url: "/docs/yield-trading"
  },
];

function FeatureCard({ url, title, Svg }) {
  return (
    <Link to={url}>
      <div className={styles.featureCard}>
        <Svg role="img" className={styles.image} />
        <div className={styles.featureTitle}>
          <h3>{title}</h3>
        </div>
      </div>
    </Link>
  );
}

export default function HomepageFeatures() {
  return (
    <div className={styles.root}>
      <h2 className={styles.header}>Getting Started</h2>
      <div className={styles.featureContainer}>
        {FeatureList.map((feature) => (
          <FeatureCard {...feature} />
        ))}
      </div>
    </div>
  );
}
