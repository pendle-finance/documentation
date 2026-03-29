#!/usr/bin/env node
/**
 * Creates _category_.json files for all subdirectories in each doc section,
 * using labels and icons extracted from the existing sidebars.js definitions.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Category metadata extracted from each sidebars.js
// Format: { 'folder/path': { label, icon, position } }
const CATEGORY_META = {
  // ── pendle-v2 ─────────────────────────────────────────────────────────────
  'docs/pendle-v2/ProtocolMechanics':                           { label: 'Protocol Mechanics',    icon: 'settings',       position: 3 },
  'docs/pendle-v2/ProtocolMechanics/YieldTokenization':         { label: 'Yield Tokenization',    icon: 'stacked_line_chart', position: 2 },
  'docs/pendle-v2/ProtocolMechanics/LiquidityEngines':          { label: 'Liquidity Engines',     icon: 'water',          position: 3 },
  'docs/pendle-v2/ProtocolMechanics/Mechanisms':                { label: 'Tokenomics and Fees',   icon: 'payments',       position: 4 },
  'docs/pendle-v2/AppGuide':                                    { label: 'App Guide',             icon: 'apps',           position: 4 },
  'docs/pendle-v2/Developers':                                  { label: 'Developers',            icon: 'code',           position: 5 },
  'docs/pendle-v2/Developers/Integration':                      { label: 'Integration Guides',    icon: 'handshake',      position: 5 },
  'docs/pendle-v2/Developers/Contracts':                        { label: 'Contracts',             icon: 'description',    position: 6 },
  'docs/pendle-v2/Developers/Contracts/PendleRouter':           { label: 'PendleRouter',          icon: null,             position: 4 },
  'docs/pendle-v2/Developers/Contracts/PendleRouter/ApiReference': { label: 'API Reference',     icon: null,             position: 3 },
  'docs/pendle-v2/Developers/LimitOrder':                       { label: 'Limit Orders',          icon: 'list_alt',       position: 7 },
  'docs/pendle-v2/Developers/Oracles':                          { label: 'Oracles',               icon: 'visibility',     position: 8 },
  'docs/pendle-v2/Developers/Oracles/DeterministicOracles':     { label: 'Deterministic Oracles', icon: null,             position: 7 },
  'docs/pendle-v2/Developers/Backend':                          { label: 'Off-chain Helpers',     icon: 'construction',   position: 9 },

  // ── boros-dev ─────────────────────────────────────────────────────────────
  'docs/boros-dev-docs/Mechanics':                              { label: 'Mechanics',             icon: 'settings',       position: 4 },
  'docs/boros-dev-docs/Contracts':                              { label: 'Contracts',             icon: 'description',    position: 5 },
  'docs/boros-dev-docs/Backend':                                { label: 'Backend Integration',   icon: 'integration_instructions', position: 6 },

  // ── pendle-academy ────────────────────────────────────────────────────────
  'docs/pendle-academy/pendle-101':                             { label: 'Pendle 101',            icon: 'school',         position: 2 },
  'docs/pendle-academy/optimizing-yields-with-pendle':          { label: 'Optimizing Yields with Pendle', icon: 'trending_up', position: 3 },
  'docs/pendle-academy/cheatsheet-for-the-impatient':           { label: 'Cheatsheet for the Impatient', icon: 'bolt',    position: 4 },
  'docs/pendle-academy/yield-trading-deep-dives':               { label: 'Yield Trading Deep Dives', icon: 'analytics',  position: 5 },
  'docs/pendle-academy/ecosystem-and-resources':                { label: 'Ecosystem & Resources', icon: 'hub',            position: 6 },
  'docs/pendle-academy/ecosystem-and-resources/points-trading': { label: 'Points Trading',        icon: 'stars',          position: 1 },

  // ── boros-docs ────────────────────────────────────────────────────────────
  'docs/boros-docs/about-boros':                                { label: 'About Boros',           icon: 'info',           position: 2 },
  'docs/boros-docs/interest-rate-accounting':                   { label: 'Interest Rate Accounting', icon: 'calculate',  position: 3 },
  'docs/boros-docs/interest-rate-trading':                      { label: 'Interest Rate Trading', icon: 'candlestick_chart', position: 4 },
  'docs/boros-docs/risk-parameters':                            { label: 'Risk Parameters',       icon: 'shield',         position: 5 },
  'docs/boros-docs/risk-parameters/margin-and-liquidations':    { label: 'Margin and Liquidations', icon: 'account_balance', position: 1 },
  'docs/boros-docs/others':                                     { label: 'Others',                icon: 'more_horiz',     position: 6 },

  // ── boros-academy ─────────────────────────────────────────────────────────
  'docs/boros-academy/the-basics':                              { label: 'The Basics',            icon: 'school',         position: 2 },
  'docs/boros-academy/advanced-strategies':                     { label: 'Advanced Strategies',   icon: 'psychology',     position: 3 },
};

let created = 0;
for (const [relPath, meta] of Object.entries(CATEGORY_META)) {
  const dirPath = path.join(ROOT, relPath);
  if (!fs.existsSync(dirPath)) {
    console.log(`⚠ Directory not found: ${relPath}`);
    continue;
  }
  const categoryFile = path.join(dirPath, '_category_.json');
  const content = {
    label: meta.label,
    position: meta.position,
    ...(meta.icon ? { customProps: { icon: meta.icon } } : {}),
  };
  fs.writeFileSync(categoryFile, JSON.stringify(content, null, 2) + '\n', 'utf8');
  console.log(`✓ ${relPath}/_category_.json`);
  created++;
}

console.log(`\nCreated ${created} _category_.json files.`);
