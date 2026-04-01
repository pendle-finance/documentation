import React, { useState, useRef, useEffect } from 'react';
import styles from './CardGrid.module.css';

export default function CardGrid({ children, type = 'default', theme }) {
  const classes = [
    styles.cardGrid,
    styles[type] || styles.default,
    theme ? styles[`theme-${theme}`] : null,
  ].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
}

export function Card({ title, description, link, icon, hasSMIL = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const svgWrapperRef = useRef(null);

  // Reset SMIL to frame 1 and pause on mount
  useEffect(() => {
    if (!hasSMIL || !svgWrapperRef.current) return;
    const svgEl = svgWrapperRef.current.querySelector('svg');
    if (svgEl) { svgEl.setCurrentTime(0); svgEl.pauseAnimations(); }
  }, [hasSMIL]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (hasSMIL && svgWrapperRef.current) {
      const svgEl = svgWrapperRef.current.querySelector('svg');
      if (svgEl) svgEl.unpauseAnimations();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hasSMIL && svgWrapperRef.current) {
      const svgEl = svgWrapperRef.current.querySelector('svg');
      // Reset to frame 1 then pause
      if (svgEl) { svgEl.setCurrentTime(0); svgEl.pauseAnimations(); }
    }
  };

  const inner = (
    <div className={`${styles.card} ${isHovered ? styles.hovered : ''}`}>
      <div className={styles.cardText}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {icon && (
        <div
          ref={svgWrapperRef}
          className={`${styles.svgWrapper} ${!isHovered ? styles.svgPaused : ''}`}
        >
          {icon}
        </div>
      )}
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
        className={styles.cardLink}
onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {inner}
      </a>
    );
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {inner}
    </div>
  );
}
