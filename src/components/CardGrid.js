import React from 'react';
import styles from './CardGrid.module.css';

export default function CardGrid({ children, type = 'default' }) {
  const gridClass = `${styles.cardGrid} ${styles[type] || styles.default}`;

  return (
    <div className={gridClass}>
      {children}
    </div>
  );
}

export function Card({ title, description, link, icon, level }) {
  const cardClass = level ? `${styles.card} ${styles[level]}` : styles.card;

  const CardContent = () => (
    <div className={cardClass}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.content}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );

  if (link) {
    // Handle both external links and internal anchors
    const isExternal = link.startsWith('http');
    const isAnchor = link.startsWith('#');

    if (isExternal) {
      return (
        <a href={link} className={styles.cardLink} target="_blank" rel="noopener noreferrer">
          <CardContent />
        </a>
      );
    } else if (isAnchor) {
      return (
        <a href={link} className={styles.cardLink}>
          <CardContent />
        </a>
      );
    } else {
      return (
        <a href={link} className={styles.cardLink}>
          <CardContent />
        </a>
      );
    }
  }

  return <CardContent />;
}