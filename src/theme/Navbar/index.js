import React from 'react';
import Navbar from '@theme-original/Navbar';

export default function NavbarWrapper(props) {
  return (
    <div style={{display: "none"}}>
      <Navbar {...props} />
    </div>
  );
}
