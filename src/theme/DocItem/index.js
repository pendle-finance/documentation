import React from 'react';
import DocItem from '@theme-original/DocItem';

export default function DocItemWrapper(props) {
  return (
    <div style={{padding: '0 20px'}}>
      <DocItem {...props} />
    </div>
  );
}
