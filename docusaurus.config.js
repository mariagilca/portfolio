// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Maria Gilca – Technical Writer',
  tagline: 'Docs systems for teams who build fast',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // GitHub Pages / production URL
  url: 'https://mariagilca.github.io',
  baseUrl: '/portfolio',

  // GitHub pages deployment config.
  organizationName: 'mariagilca', // your real GitHub username
  projectName: 'portfolio',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: undefined,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: undefined,
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: false,
        defaultMode: 'light',
        disableSwitch: true,
      },
      navbar: {
        title: 'Maria Gilca',
        logo: {
          alt: 'Maria Gilca logo',
          src: 'img/brand-mark.png',
          srcDark: 'img/brand-mark-dark.png',
          width: 32,
          height: 32,
        },
        items: [
          {
            label: 'Portfolio',
            to: '/docs/portfolio/overview',
            position: 'left',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/about', label: 'About', position: 'left'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Explore',
            items: [
              {
                label: 'Portfolio',
                to: '/docs/portfolio/overview',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'About',
                to: '/about',
              },
            ],
          },
          {
            title: 'Connect',
            items: [
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/maria-gilca/',
              },
              {
                label: 'Email',
                href: 'mailto:mariag@voix.com',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Maria Gilca.`,
      },
      prism: {
        theme: prismThemes.github,
      },
    }),
};

export default config;
