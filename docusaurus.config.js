const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
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
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
    },
    prism: {
      additionalLanguages: ["solidity"],
    },
    algolia: {
      apiKey: "eb7e0ba752b13b50b0836bc9f7c72af1",
      indexName: "pendle-docs",
      appId: "8YJ1OICVXV",
    },
    navbar: {
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo-title.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'information/intro',
          position: 'left',
          label: 'Information',
        },
        {
          type: 'doc',
          docId: 'guides/intro',
          position: 'left',
          label: 'Guides',
        },
        {
          type: 'doc',
          docId: 'addresses/avalanche',
          position: 'left',
          label: 'Addresses',
        },
        {
          type: 'doc',
          docId: 'reference/intro',
          position: 'left',
          label: 'References',
        },
        {
          type: 'doc',
          docId: 'information/resources/litepaper',
          position: 'right',
          label: 'Litepaper',
        },
        {
          href: 'https://github.com/pendle-finance/',
          label: 'GitHub',
          position: 'right',
        },
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
              href: 'https://discord.gg/EAujvncY2R/',
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
              href: 'https://github.com/pendle-finance/pendle-core/tree/master/docs/audits'
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
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
      integrity: "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
      crossorigin: "anonymous",
    },
  ],
};
