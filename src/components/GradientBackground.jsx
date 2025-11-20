import React from 'react';
import clsx from 'clsx';

export default function GradientBackground({ children, className }) {
  return (
    <div className={clsx('gradient-shell', className)}>
      <div className="gradient-shell__layer gradient-shell__layer--one" aria-hidden="true" />
      <div className="gradient-shell__layer gradient-shell__layer--two" aria-hidden="true" />
      <div className="gradient-shell__layer gradient-shell__layer--three" aria-hidden="true" />
      <div className="gradient-shell__content">{children}</div>
    </div>
  );
}
