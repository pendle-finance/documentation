import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/**
 * Recursively walk generated sidebar items and copy `sidebar_icon` frontmatter
 * into `customProps.icon` so the sidebar rendering components pick it up.
 * Only applies to items that don't already have a customProps.icon set.
 */
function propagateFrontmatterIcons(items, docs) {
  return items.map(item => {
    if (item.type === 'doc' || item.type === 'ref') {
      const doc = docs.find(d => d.id === item.id || d.unversionedId === item.id);
      const fmIcon = doc?.frontMatter?.sidebar_icon;
      if (fmIcon && !item.customProps?.icon) {
        return { ...item, customProps: { ...item.customProps, icon: fmIcon } };
      }
      return item;
    }
    if (item.type === 'category' && item.items) {
      return { ...item, items: propagateFrontmatterIcons(item.items, docs) };
    }
    return item;
  });
}

/** @type {import('@docusaurus/types').DocusaurusConfig} */
const config = {
  title: 'Pendle Documentation',
  tagline: 'Pendle is a protocol that liberates future yield. It enables the tokenization and trading of future yield on a novel AMM designed to support assets with time decay.',
  url: 'https://huberthalim.github.io',
  baseUrl: '/documentation/',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'ignore',
  onBrokenAnchors: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'HubertHalim',
  projectName: 'documentation',
  deploymentBranch: 'gh-pages',

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'llms-txt',
        href: '/llms.txt',
      },
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          id: 'default',
          path: 'docs/pendle-docs',
          breadcrumbs: true,
          routeBasePath: 'pendle-v2',
          sidebarPath: './docs/pendle-docs/sidebars.js',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          exclude: ['**/Boros/**'],
          async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
            const items = await defaultSidebarItemsGenerator(args);
            return propagateFrontmatterIcons(items, args.docs);
          },
        },
        gtag: {
          trackingID: 'G-6ZBS49V0YS',
          anonymizeIP: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: [
    // ... Your other themes.
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,

        // For Docs using Chinese, it is recomended to set:
        language: ["en", "zh"],
        docsRouteBasePath: ["/pendle-v2", "/pendle-v2-dev", "/boros-dev", "/pendle-academy", "/boros-docs", "/boros-academy"],

        // Customize the keyboard shortcut to focus search bar (default is "mod+k"):
        // searchBarShortcutKeymap: "s", // Use 'S' key
        // searchBarShortcutKeymap: "ctrl+shift+f", // Use Ctrl+Shift+F

        // If you're using `noIndex: true`, set `forceIgnoreNoIndex` to enable local index:
        // forceIgnoreNoIndex: true,
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'pendle-v2-dev',
        path: 'docs/pendle-dev-docs',
        routeBasePath: 'pendle-v2-dev',
        sidebarPath: './docs/pendle-dev-docs/sidebars.js',
        breadcrumbs: true,
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
          const items = await defaultSidebarItemsGenerator(args);
          return propagateFrontmatterIcons(items, args.docs);
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'boros-dev',
        path: 'docs/boros-dev-docs',
        routeBasePath: 'boros-dev',
        sidebarPath: './docs/boros-dev-docs/sidebars.js',
        breadcrumbs: true,
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
          const items = await defaultSidebarItemsGenerator(args);
          return propagateFrontmatterIcons(items, args.docs);
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'pendle-academy',
        path: 'docs/pendle-academy',
        routeBasePath: 'pendle-academy',
        sidebarPath: './docs/pendle-academy/sidebars.js',
        breadcrumbs: true,
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
          const items = await defaultSidebarItemsGenerator(args);
          return propagateFrontmatterIcons(items, args.docs);
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'boros-docs',
        path: 'docs/boros-docs',
        routeBasePath: 'boros-docs',
        sidebarPath: './docs/boros-docs/sidebars.js',
        breadcrumbs: true,
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
          const items = await defaultSidebarItemsGenerator(args);
          return propagateFrontmatterIcons(items, args.docs);
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'boros-academy',
        path: 'docs/boros-academy',
        routeBasePath: 'boros-academy',
        sidebarPath: './docs/boros-academy/sidebars.js',
        breadcrumbs: true,
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
          const items = await defaultSidebarItemsGenerator(args);
          return propagateFrontmatterIcons(items, args.docs);
        },
      },
    ],
    [
      '@docusaurus/plugin-sitemap',
      {
        id: 'sitemap',
        lastmod: null,
        changefreq: 'weekly',
        priority: 0.5,
        ignorePatterns: ['/tags/**'],
        filename: 'sitemap.xml',
        createSitemapItems: async (params) => {
          const {defaultCreateSitemapItems, ...rest} = params;
          const items = await defaultCreateSitemapItems(rest);
          return items.filter((item) => !item.url.includes('/page/'));
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
    {
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block",
      rel: "stylesheet",
    },
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  {
    algolia: {
      appId: "GFVY0GOMCR",
      apiKey: "1e9c713dfca40c64b56217bb24d5c4cd",
      indexName: "pendle",
      contextualSearch: true,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    docs:{
      sidebar: {
        hideable: false
      }
    },
    navbar: {
      logo: {
        alt: 'Pendle Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
      },
      title: 'Pendle Documentation',
      items: [
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
              href: 'https://www.pendle.finance/brandguide',
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
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
};

export default config;
