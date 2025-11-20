import React from 'react';
import clsx from 'clsx';

export default function PageSection({ id, className, children }) {
  return (
    <section id={id} className={clsx('section-spacing', className)}>
      <div className="max-width">{children}</div>
    </section>
  );
}
