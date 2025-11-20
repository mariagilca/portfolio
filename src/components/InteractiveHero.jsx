import React from 'react';
import Link from '@docusaurus/Link';
import PageSection from './PageSection';
import HeroContent from './HeroContent';

export default function InteractiveHero() {
  return (
    <PageSection id="hero" className="interactive-hero">
      <div className="hero-shell single-column">
        <HeroContent
          title="Build product-inspired docs in minutes."
          subtitle="I partner with product teams to ship Arcade-level walkthroughs backed by CI/CD, localization workflows, and visual storytelling."
        />
        <div className="hero-actions hero-actions--trimmed">
          <Link
            className="button button--lg hero-button hero-button--primary"
            to="/contact">
            Talk to Maria
          </Link>
          <Link className="button button--lg hero-button hero-button--ghost" to="/blog">
            Read the blog
          </Link>
          <Link className="button button--lg hero-button hero-button--ghost" to="/docs/portfolio/overview">
            View portfolio
          </Link>
        </div>
      </div>
    </PageSection>
  );
}
