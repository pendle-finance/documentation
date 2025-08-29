import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import type {Props} from '@theme/Footer/Layout';
import styles from "./styles.module.css";

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: Props): ReactNode {
  return (
    <footer
      className={clsx(ThemeClassNames.layout.footer.container, styles.background, 'footer', {
        'footer--dark': style === 'dark',
      })}>
        <div className={styles.root}>
          <div className="container container-fluid">
            {links}
            {(logo || copyright) && (
              <div className="footer__bottom text--center">
                {logo && <div className="margin-bottom--sm">{logo}</div>}
                {copyright}
              </div>
            )}
          </div>
        </div>
    </footer>
  );
}
