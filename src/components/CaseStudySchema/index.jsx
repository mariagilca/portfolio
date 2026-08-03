import React from 'react';
import Head from '@docusaurus/Head';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * Emits TechArticle JSON-LD for a case study.
 *
 * The docs plugin only emits BreadcrumbList on its own, so the article node has
 * to be added per page. Author is referenced by @id rather than re-described,
 * so the site has exactly one Person node (declared in docusaurus.config.js).
 *
 * Only ever describes content that is actually visible on the page. Google's
 * structured-data guidelines disallow marking up anything a reader can't see.
 */
export default function CaseStudySchema({headline, description, datePublished}) {
  const {siteConfig} = useDocusaurusContext();
  const {pathname} = useLocation();

  const origin = siteConfig.url.replace(/\/$/, '');
  const pageUrl = `${origin}${pathname.endsWith('/') ? pathname : `${pathname}/`}`;
  const siteRoot = `${origin}${siteConfig.baseUrl}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${pageUrl}#article`,
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    headline,
    description,
    datePublished,
    inLanguage: 'en',
    image: `${siteRoot}img/social-card.png`,
    author: {'@id': `${siteRoot}#person`},
    isPartOf: {'@id': `${siteRoot}#website`},
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Head>
  );
}
