import React from 'react';
import clsx from 'clsx';
import TagPill from './TagPill';

export default function HeroContent({ title, subtitle, tags = [], className }) {
  return (
    <div className={clsx('hero-content', className)}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {tags.length ? (
        <div className="hero-tags">
          {tags.map((tag) => (
            <TagPill key={tag} label={tag} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
