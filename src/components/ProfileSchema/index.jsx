import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * ProfilePage JSON-LD for /about.
 *
 * Google lists "Profile page" as a supported feature and names an About-me page
 * as a qualifying use case, but explicitly excludes a site's home page, which
 * is why this lives here and not in the global headTags. The Person itself is
 * declared once site-wide and referenced by @id.
 */
export default function ProfileSchema({dateCreated, dateModified}) {
  const {siteConfig} = useDocusaurusContext();
  const origin = siteConfig.url.replace(/\/$/, '');
  const siteRoot = `${origin}${siteConfig.baseUrl}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteRoot}about/#profilepage`,
    url: `${siteRoot}about/`,
    inLanguage: 'en',
    dateCreated,
    dateModified,
    mainEntity: {'@id': `${siteRoot}#person`},
    isPartOf: {'@id': `${siteRoot}#website`},
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Head>
  );
}
