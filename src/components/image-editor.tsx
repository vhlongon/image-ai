'use client';

import { useState } from 'react';

export const ImageEditor = () => {
  const [src, setSrc] = useState('');

  return <div>{src && <img src={src} />}</div>;
};
