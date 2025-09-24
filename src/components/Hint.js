import React from 'react';
import styles from './Hint.module.css';

export default function Hint({ style = 'info', children }) {
  const hintClass = `${styles.hint} ${styles[style] || styles.info}`;

  return (
    <div className={hintClass}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
