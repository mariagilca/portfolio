import React from 'react';
import clsx from 'clsx';

export default function SectionTitle({ eyebrow, title, subtitle, align = 'left' }) {
  const alignment = align === 'center' ? 'center' : 'left';

  return (
    <div className={clsx('section-title')} style={{ textAlign: alignment }}>
      {eyebrow ? <p className="pill">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {subtitle ? <p className="section-title__subtitle">{subtitle}</p> : null}
    </div>
  );
}
