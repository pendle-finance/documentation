import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Pendle Documentation',
  tagline:
    'Pendle is an on-chain platform for trading interest rate swaps and future yield.',
  favicon: 'img/favicon.ico',
  url: 'https://pendle.finance/',
  baseUrl: '/',
  organizationName: 'pendle-finance',
  projectName: 'documentation',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  future: {
    v4: true
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  markdown: {
    mermaid: true
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path:'./docs/entry',
          routeBasePath: '/', // docs served at /v2
          sidebarPath: './sidebars.ts',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex]
        },
        theme: {
          customCss: './src/css/custom.css'
        }
      } satisfies Preset.Options
    ]
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'v2', // unique plugin instance id
        path: './docs/v2',
        routeBasePath: 'v2', // docs served at /v2
        sidebarPath: './v2_sidebars.ts',
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex]
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'boros', // unique plugin instance id
        path: './docs/boros',
        routeBasePath: 'boros', // docs served at /boros
        sidebarPath: './boros_sidebars.ts',
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex]
      },
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous'
    }
  ],

  themes: ['@docusaurus/theme-mermaid'],

  themeConfig: {
    algolia: {
      appId: "GFVY0GOMCR",
      apiKey: "1e9c713dfca40c64b56217bb24d5c4cd",
      indexName: "pendle",
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
    },
    navbar: {
      title: 'Pendle Documentation',
      logo: {
        alt: 'Pendle Logo',
        src: 'img/logo.svg'
      },
      items: [
        { to: '/v2', label: 'V2', position: 'left' },
        { to: '/boros', label: 'Boros', position: 'left' },
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
              to: 'https://pendle.finance'
            },
            {
              label: 'V2',
              to: 'https://app.pendle.finance'
            },
            {
              label: 'Boros',
              to: 'https://boros.pendle.finance'
            }
          ]
        },
        {
          title: 'Socials',
          items: [
            {
              label: 'Discord',
              to: 'https://discord.gg/qshFxh6965/'
            },
            {
              label: 'Twitter',
              to: 'https://twitter.com/pendle_fi/'
            },
            {
              label: 'Telegram',
              to: 'https://t.me/pendlefinance/'
            }
          ]
        },
        {
          title: 'About Us',
          items: [
            {
              label: 'Medium',
              to: 'https://medium.com/pendle/'
            },
            {
              label: 'Careers',
              to: 'https://angel.co/company/pendle_finance/'
            },
            {
              label: 'Media Kit',
              to: 'https://www.pendle.finance/brandguide'
            },
            {
              label: 'V2 Audits',
              to: 'https://github.com/pendle-finance/boros-core-public/tree/main/audits/'
            },
            {
              label: 'Boros Audits',
              to: 'https://github.com/pendle-finance/boros-core-public/tree/main/audits/'
            },
          ]
        }
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['solidity']
    }
  } satisfies Preset.ThemeConfig
};

export default config;
