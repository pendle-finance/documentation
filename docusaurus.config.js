const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
const config = {
  title: 'Pendle Documentation',
  tagline: 'Pendle is a protocol that liberates future yield. It enables the tokenization and trading of future yield on a novel AMM designed to support assets with time decay.',
  url: 'https://pendle.finance/',
  baseUrl: '/',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'ignore',
  favicon: 'img/favicon.ico',
  organizationName: 'pendle-finance', // Usually your GitHub org/user name.
  projectName: 'pendle-core', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          breadcrumbs: false,
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        gtag: {
          trackingID: 'G-6ZBS49V0YS',
          anonymizeIP: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
      integrity: "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
      crossorigin: "anonymous",
    },
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  ({
    algolia: {
      appId: "GFVY0GOMCR",
      apiKey: "1e9c713dfca40c64b56217bb24d5c4cd",
      indexName: "pendle",
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
    },
    docs:{
      sidebar: {
        hideable: false
      }
    },
    navbar: {
      items: [
        {
          type: 'localeDropdown',
          position: 'right',
        }
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Pages',
          items: [
            {
              label: 'Website',
              href: 'https://pendle.finance',
            },
            {
              label: 'App',
              href: 'https://app.pendle.finance',
            },
          ],
        },
        {
          title: 'Socials',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/qshFxh6965/',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/pendle_fi/',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/pendlefinance/',
            },
          ],
        },
        {
          title: 'About Us',
          items: [
            {
              label: 'Medium',
              href: 'https://medium.com/pendle/',
            },
            {
              label: 'Careers',
              href: 'https://angel.co/company/pendle_finance/',
            },
            {
              label: 'Media Kit',
              href: 'https://pendle.finance/Pendle_Media_Kit.zip',
            },
            {
              label: 'Audits',
              href: 'https://github.com/pendle-finance/pendle-core-v2-public/tree/main/audits'
            }
          ],
        },
      ],
      logo: {
        alt: 'Pendle Finance Logo',
        src: 'img/logo.svg',
        href: 'https://pendle.finance',
      },
      copyright: `Copyright © ${new Date().getFullYear()} Pendle Finance`,
    },
    prism: {
      additionalLanguages: ["solidity"],
    },
  }),

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'cn'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
      cn: {
        label: '中文（中国)',
        direction: 'ltr',
        htmlLang: 'zh-Hans',
        calendar: 'gregory',
        path: 'cn',
      },
    },
  },
};

module.exports = config;
