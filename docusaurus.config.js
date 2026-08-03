// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const SITE_URL = 'https://mariagilca.github.io';
const BASE_URL = '/portfolio/';
const SITE_ROOT = `${SITE_URL}${BASE_URL}`;

/**
 * One Person node for the whole site, with a stable @id. Every other node
 * (ProfilePage.mainEntity, TechArticle.author, DefinedTermSet.author,
 * BlogPosting.author) references this by @id instead of re-describing it, so
 * there is exactly one description of the entity for Google to reconcile.
 */
const PERSON_ID = `${SITE_ROOT}#person`;
const WEBSITE_ID = `${SITE_ROOT}#website`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  // Kept short and free of the role, because the theme appends it to every page
  // title. Including "Technical Writer" here is what produced the duplicated
  // a title with the site name repeated twice.
  title: 'Maria Gilca',
  tagline: 'Technical writer and information architect',
  favicon: 'img/favicon.ico',

  future: {
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
      useCssCascadeLayers: true,
      siteStorageNamespacing: true,
      mdx1CompatDisabledByDefault: false,
      fasterByDefault: false,
    },
  },

  url: SITE_URL,
  baseUrl: BASE_URL,

  // GitHub Pages serves `about/index.html`, so it 301-redirects `/about` to
  // `/about/`. Without this, every canonical tag and every sitemap <loc> would
  // point at a redirecting URL.
  trailingSlash: true,

  organizationName: 'mariagilca',
  projectName: 'portfolio',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  markdown: {
    hooks: {
      // Broken-link detection only runs in production builds, so this has to
      // gate the deploy rather than local dev.
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {rel: 'apple-touch-icon', href: `${BASE_URL}img/apple-touch-icon.png`},
    },
    {
      tagName: 'link',
      attributes: {rel: 'icon', type: 'image/svg+xml', href: `${BASE_URL}img/favicon.svg`},
    },
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_ROOT,
        name: 'Maria Gilca',
        description:
          'Portfolio of Maria Gilca, technical writer and information architect for data-intensive software.',
        inLanguage: 'en',
        publisher: {'@id': PERSON_ID},
      }),
    },
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Maria Gilca',
        jobTitle: 'Technical Writer and Information Architect',
        description:
          'Technical writer and information architect for data-intensive software, building documentation pipelines where agents draft, CI gates catch errors, and git governs every change.',
        url: SITE_ROOT,
        mainEntityOfPage: `${SITE_ROOT}about/`,
        image: `${SITE_ROOT}img/social-card.png`,
        email: 'mailto:mariag@voix.com',
        sameAs: [
          'https://www.linkedin.com/in/maria-gilca/',
          'https://github.com/mariagilca',
        ],
        knowsAbout: [
          'Technical writing',
          'Information architecture',
          'AI-assisted documentation',
          'Documentation agents',
          'Docs-as-code',
          'Continuous integration for documentation',
          'Metadata standards',
          'Documentation governance',
          'Docusaurus',
          'Git',
        ],
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Certificate in Professional Technical Writing',
          credentialCategory: 'certificate',
          // The public assertion, so the claim is machine-verifiable.
          url: 'https://badges.parchment.com/public/assertions/AXRnvaiXQl-dGx4qmeer1Q',
          dateCreated: '2026-06-15',
          recognizedBy: {
            '@type': 'CollegeOrUniversity',
            name: 'University of Washington Professional & Continuing Education',
            url: 'https://www.pce.uw.edu/',
          },
        },
      }),
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // Case studies read as work, not as documentation of this site, and
          // `/work/...` is a shorter, more descriptive URL than the old
          // `/docs/portfolio/...` with its duplicated path segment.
          routeBasePath: 'work',
          sidebarPath: './sidebars.js',
          editUrl: undefined,
          showLastUpdateTime: false,
        },
        blog: {
          routeBasePath: 'blog',
          blogTitle: 'Writing',
          blogDescription:
            'Notes on terminology, information architecture and treating documentation as software, by Maria Gilca.',
          showReadingTime: true,
          editUrl: undefined,
          feedOptions: {
            type: 'all',
            title: 'Writing by Maria Gilca',
            description:
              'Notes on terminology, information architecture and treating documentation as software.',
            copyright: `© ${new Date().getFullYear()} Maria Gilca.`,
            language: 'en',
            limit: 20,
            xslt: true,
          },
          onInlineTags: 'throw',
          onInlineAuthors: 'throw',
          onUntruncatedBlogPosts: 'throw',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          // `lastmod` is the only one of the three Google actually consumes; it
          // resolves from git history, so a shallow CI clone silently drops it.
          lastmod: 'date',
          changefreq: null,
          priority: null,
          filename: 'sitemap.xml',
          // These are matched against baseUrl-prefixed route paths, so the
          // documented `/tags/**` form would match nothing on this site.
          ignorePatterns: [
            '/portfolio/search',
            '/portfolio/blog/tags/**',
            '/portfolio/blog/authors/**',
            '/portfolio/blog/archive/**',
            '/portfolio/blog/page/**',
          ],
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        // GitHub Pages cannot issue real 301s, so these are the fallback for the
        // URLs that changed in this restructure. Internal links were updated too.
        redirects: [
          {from: '/docs/portfolio/overview', to: '/work'},
          {
            from: '/docs/portfolio/sample-openlm-architecture',
            to: '/work/information-architecture-data-platform',
          },
          {
            from: '/docs/portfolio/sample-docusaurus-ci-cd',
            to: '/work/process-documentation-decision-trees',
          },
          {
            from: [
              '/docs/portfolio/sample-localization-workflow',
              '/work/multilingual-terminology-localization',
            ],
            to: '/work/terminology-consistency-at-scale',
          },
          {
            from: '/blog/designing-docs-with-gradients',
            to: '/blog/designing-docs-for-restraint',
          },
          // The glossary was replaced by the practice page.
          {from: '/glossary', to: '/practice'},
          {from: '/markdown-page', to: '/'},
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Cannot be an SVG; no platform renders an SVG share preview.
      image: 'img/social-card.png',

      metadata: [
        {name: 'author', content: 'Maria Gilca'},
        {property: 'og:site_name', content: 'Maria Gilca'},
      ],

      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },

      navbar: {
        title: 'Maria Gilca',
        logo: {
          alt: '',
          src: 'img/logo.svg',
          srcDark: 'img/logo-dark.svg',
          width: 24,
          height: 24,
        },
        items: [
          {to: '/work', label: 'Work', position: 'left'},
          {to: '/practice', label: 'Practice', position: 'left'},
          {to: '/blog', label: 'Writing', position: 'left'},
          {to: '/about', label: 'About', position: 'left'},
          {to: '/contact', label: 'Contact', position: 'right'},
        ],
      },

      footer: {
        style: 'light',
        links: [
          {
            title: 'Work',
            items: [
              {label: 'Selected work', to: '/work'},
              {
                label: 'Information architecture',
                to: '/work/information-architecture-data-platform',
              },
              {
                label: 'Process documentation',
                to: '/work/process-documentation-decision-trees',
              },
              {
                label: 'Consistency at scale',
                to: '/work/terminology-consistency-at-scale',
              },
            ],
          },
          {
            title: 'Practice',
            items: [
              {label: 'AI in a docs pipeline', to: '/practice'},
              {label: 'Writing', to: '/blog'},
              {label: 'About', to: '/about'},
            ],
          },
          {
            title: 'Elsewhere',
            items: [
              {label: 'Email', href: 'mailto:mariag@voix.com'},
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/maria-gilca/',
              },
              {label: 'GitHub', href: 'https://github.com/mariagilca'},
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Maria Gilca · Technical writer and information architect`,
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.oneDark,
      },
    }),
};

export default config;
