import React from 'react';
import Navbar from '@theme-original/Navbar';
import styles from "./index.module.css"
export default function NavbarWrapper(props) {
  return (
    <div className={styles.nav}>
      <Navbar {...props} />
    </div>
  );
}
