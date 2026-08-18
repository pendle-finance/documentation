---
pagination_label: "概述"
title: "概述"
---

import Hint from '@site/src/components/Hint';

# 概述

**Arbitrage with CrossEx** 是 Pendle 团队构建的免费[开源工具](https://github.com/pendle-finance/crossex-boros-terminal)，让交易者可以通过 [Gate CrossEx](https://www.gate.com/crossex) 和 Boros，在同一个面板上执行**四腿跨交易所资金费率套利**——全部运行在你自己的机器上。

该应用在本地运行——应用本身无需任何注册。它直接对接你自己的 Gate 账户和你自己的 Boros 钱包。

## 策略：四腿资金费率套利

Boros 让交易者可以将某个交易所的浮动资金费率转换为可交易的固定利率。同一币种的资金费率在不同交易所往往存在不同的**隐含 APR**——例如 ETH 资金费率在 Hyperliquid 隐含 APR 为 8%，而在 Binance 为 4%。该策略正是要锁定这一利差作为收益。

一个仓位由 4 条腿组成，名义本金全部相同。以 BTC 为例：

- 在 Boros 上**做空 10 YU** 的 BTC Hyperliquid 资金费率，隐含 APR 为 8%
- 在 Boros 上**做多 10 YU** 的 BTC Binance 资金费率，隐含 APR 为 4%
- 通过 CrossEx**做空 10 BTC** Hyperliquid BTC 永续合约
- 通过 CrossEx**做多 10 BTC** Binance BTC 永续合约

两条永续合约腿相互抵消价格风险，并对冲 Boros 腿上应付的浮动资金费率，使交易者保持**市场中性（delta-neutral）**，并持有 **4% 的 APR 利差**作为固定收益，直至 Boros 市场到期（杠杆前）。

![4 leg funding rate arbitrage](/boros-docs/imgs/arbitrage-with-crossex/4-leg-funding-rate-arbitrage.jpg "4 Leg Funding Rate Arbitrage")

配合杠杆，这可以成为一个可观的收益策略——但手动在多个交易所之间协调抵押品和仓位相当繁琐，这也是大多数交易者望而却步的原因。

## 为什么用 CrossEx

[CrossEx](https://www.gate.com/crossex) 是 Gate.io 推出的产品，为交易者提供跨多个交易所同时持仓的**统一保证金**。交易者无需在各交易所分别维护独立的抵押品池，而是可以在同一账户下开出套利的多空永续腿，并保持完全的市场中性。

## 该应用能做什么

Arbitrage with CrossEx 将 CrossEx 与 Boros 整合在一起，让交易者可以：

- **扫描机会** — 查看跨交易所的实时固定利差，并自动计算潜在收益与所需保证金
- **一键执行**套利的永续合约腿
- 在同一个面板中**监控**整个四腿仓位的保证金、盈亏和收益

<Hint style="warning">
这是实验性的开源软件，会在你自己的交易所账户上用真实资金下单。本文不构成财务、投资、法律或税务建议。使用前请阅读[风险与安全](./risks-and-security)。
</Hint>

## 延伸阅读

- [理解 Boros 上的隐含 APR 与底层 APR](https://pendle.gitbook.io/boros/the-basics/chapter-2-implied-apr-and-underlying-apr)
- [Boros 如何为浮动资金费率提供固定利率支付](https://pendle.gitbook.io/boros/advanced-strategies/hedging-funding-rates-payment)
- [Boros 如何让你从浮动资金费率中获得固定利率](https://pendle.gitbook.io/boros/advanced-strategies/fixed-funding-rates-receivables)
- [固定收益资金费率套利 — Boros Academy](https://docs.pendle.finance/boros-academy/advanced-strategies/fixed-return-funding-arbitrage)

下一步：[安装](./installation)
