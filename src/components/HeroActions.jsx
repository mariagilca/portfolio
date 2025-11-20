import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

export default function HeroActions({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}) {
  return (
    <div className={clsx('hero-actions', className)}>
      <Link
        className={clsx('button button--lg hero-button hero-button--primary')}
        to={primaryHref}>
        {primaryLabel}
      </Link>
      <Link className={clsx('button button--lg hero-button hero-button--ghost')} to={secondaryHref}>
        {secondaryLabel}
      </Link>
    </div>
  );
}
