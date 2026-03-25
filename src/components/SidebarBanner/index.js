import React from 'react';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

const BANNERS = {
  '/pendle-v2':      { label: 'Pendle Docs',     img: '/img/banners/pendle-docs.png',    theme: 'teal' },
  '/pendle-academy': { label: 'Pendle Academy',   img: '/img/banners/pendle-academy.png', theme: 'teal' },
  '/boros-academy':  { label: 'Boros Academy',    img: '/img/banners/boros-academy.png',  theme: 'blue' },
  '/boros-docs':     { label: 'Boros Docs',       img: '/img/banners/boros-docs.png',     theme: 'blue' },
  '/boros-dev':      { label: 'Boros Dev Docs',   img: '/img/banners/boros-dev.png',      theme: 'blue' },
};

export default function SidebarBanner() {
  const { pathname } = useLocation();
  const entry = Object.entries(BANNERS).find(([prefix]) => pathname.startsWith(prefix));
  if (!entry) return null;
  const [, { label, img, theme }] = entry;

  return (
    <div className={`${styles.banner} ${styles[theme]}`}>
      <img src={img} alt="" className={styles.illustration} />
      <span className={`${styles.label} ${theme === 'teal' ? styles.labelTeal : styles.labelBlue}`}>
        {label}
      </span>
    </div>
  );
}
