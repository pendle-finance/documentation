const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Pendle Documentation',
  tagline: 'Liberating Future Yield',
  url: 'https://pendle.finance/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'ignore',
  favicon: 'img/favicon.ico',
  organizationName: 'pendle-finance', // Usually your GitHub org/user name.
  projectName: 'pendle-core', // Usually your repo name.
  themeConfig: {
    prism: {
      additionalLanguages: ["solidity"],
    },
    algolia: {
      apiKey: "eb7e0ba752b13b50b0836bc9f7c72af1",
      indexName: "pendle-docs",
      appId: "8YJ1OICVXV",
    },
    navbar: {
      title: 'Pendle Finance',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.png',
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
          docId: 'integration/intro',
          position: 'left',
          label: 'Integration',
        },
        {
          type: 'doc',
          docId: 'addresses/mainnet',
          position: 'left',
          label: 'Addresses',
        },
        {
          type: 'doc',
          docId: 'reference/intro',
          position: 'left',
          label: 'Reference',
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
      style: 'dark',
      links: [
        {
          title: 'Essentials',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/information/getting-started',
            },
            {
              label: 'Core Concepts',
              to: '/docs/information/core-concepts',
            },
            {
              label: 'Addresses',
              to: '/docs/addresses/mainnet',
            },
            {
              label: 'Contract Reference',
              to: '/docs/reference/contracts/IPendleRouter',
            },
          ],
        },
        {
          title: 'Community',
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
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Pendle Finance`,
    },
    prism: {      
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
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
          editUrl:
            'https://github.com/pendle-finance/documentation/edit/master/website/',
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
