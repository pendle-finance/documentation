import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

export default function Home() {
  const history = useHistory();
  useEffect(() => {
    history.replace('/pendle-v2');
  }, []);
  return null;
}
