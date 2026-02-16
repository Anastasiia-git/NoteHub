'use client';

import { BeatLoader } from 'react-spinners';

export default function Spinner() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <BeatLoader size={12} />
    </div>
  );
}
