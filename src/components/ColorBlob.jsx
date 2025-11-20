import React from 'react';
import clsx from 'clsx';

const colorTokens = {
  pink: 'var(--color-accent-pink)',
  aqua: 'var(--color-accent-aqua)',
  purple: 'var(--color-accent-purple)',
};

export default function ColorBlob({ size = 260, x = '50%', y = '50%', color = 'pink', blur = 90 }) {
  const blobStyle = {
    width: size,
    height: size,
    left: x,
    top: y,
    background: `radial-gradient(circle, ${colorTokens[color] || colorTokens.pink}, transparent 70%)`,
    filter: `blur(${blur}px)`,
  };

  return <span className={clsx('color-blob')} style={blobStyle} aria-hidden="true" />;
}
