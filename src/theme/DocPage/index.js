import React from 'react';
import DocPage from '@theme-original/DocPage';

export default function DocPageWrapper(props) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <DocPage {...props} />
    </div>
  );
}
