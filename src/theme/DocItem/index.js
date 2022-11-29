import React from 'react';
import DocItem from '@theme-original/DocItem';

export default function DocItemWrapper(props) {
  return (
    <div style={{marginTop: '2rem', maxWidth: '900px', minHeight: '70vh'}}>
      <DocItem {...props} />
    </div>
  );
}
