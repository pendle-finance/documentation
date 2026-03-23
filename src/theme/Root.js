import React, { useLayoutEffect } from 'react';
import { useLocation } from '@docusaurus/router';

function SectionSetter() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const html = document.documentElement;
    if (pathname.startsWith('/pendle-v2') || pathname.startsWith('/pendle-academy')) {
      html.setAttribute('data-section', 'v2');
    } else if (pathname.startsWith('/boros-dev')) {
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
