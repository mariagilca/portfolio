import React from 'react';
import clsx from 'clsx';

export default function TagPill({ label, className }) {
  if (!label) {
    return null;
  }

  return <span className={clsx('pill', className)}>{label}</span>;
}
