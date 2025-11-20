import React from 'react';
import clsx from 'clsx';

export default function GlassCard({ as = 'div', className, children }) {
  const Component = as;

  return <Component className={clsx('glass-card', className)}>{children}</Component>;
}
