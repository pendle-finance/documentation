import React, { useLayoutEffect } from 'react';
import { useLocation } from '@docusaurus/router';

const LOCALE_PREFIX_RE = /^\/(cn)\//;

function SectionSetter() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const html = document.documentElement;
    const stripped = pathname.replace(LOCALE_PREFIX_RE, '/');
    if (stripped.startsWith('/pendle')) {
      html.setAttribute('data-section', 'v2');
    } else if (stripped.startsWith('/boros')) {
      html.setAttribute('data-section', 'boros');
    } else {
      html.removeAttribute('data-section');
    }
  }, [pathname]);

  return null;
}

export default function Root({ children }) {
  return (
    <>
      <SectionSetter />
      {children}
    </>
  );
}
