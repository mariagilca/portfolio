import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * Overrides the default breadcrumb JSON-LD for two reasons:
 *
 * 1. Google requires at least two ListItem entries. The default omits Home and
 *    drops any breadcrumb without an href, which on this site left a
 *    single-item (and therefore invalid) BreadcrumbList on every doc page.
 * 2. The default emits `item` URLs without a trailing slash, disagreeing with
 *    the canonical tag on the same page.
 */
export default function DocBreadcrumbsStructuredData({breadcrumbs}) {
  const {siteConfig} = useDocusaurusContext();
  const origin = siteConfig.url.replace(/\/$/, '');
  const absolute = (path) =>
    `${origin}${path.endsWith('/') ? path : `${path}/`}`;

  const trail = [
    {name: 'Home', url: absolute(siteConfig.baseUrl)},
    // Items without an href aren't linkable and aren't allowed in the markup.
    ...breadcrumbs
      .filter((breadcrumb) => breadcrumb.href)
      .map((breadcrumb) => ({
        name: breadcrumb.label,
        url: absolute(breadcrumb.href),
      })),
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Head>
  );
}
