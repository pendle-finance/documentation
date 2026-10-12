---
pagination_label: "概述"
title: "概述"
---

import Hint from '@site/src/components/Hint';

# 概述

**Arbitrage with CrossEx** 是 Pendle 团队构建的免费[开源工具](https://github.com/pendle-finance/arbitrage-with-crossex)，让交易者可以通过 [Gate CrossEx](https://www.gate.com/crossex) 和 Boros，在同一个面板上执行**跨交易所资金费率套利**——全部运行在你自己的机器上。

该应用在本地运行——应用本身无需任何注册。它直接对接你自己的 Gate 账户和你自己的 Boros 钱包。

了解更多并开始使用：[boros.pendle.finance/arbitrage-crossex](https://boros.pendle.finance/arbitrage-crossex)。

## 策略：跨交易所资金费率套利

同一币种的资金费率在不同交易所往往不同。例如，BTC 资金费率在 Hyperliquid 的定价可能为 8% APR，而在 Binance 为 4% APR。该策略正是要将这 4% 的利差锁定为固定收益。

每个仓位由两部分组成，名义本金全部相同：

- **永续合约对（通过 CrossEx）：** 在资金费率较高的交易所做空永续合约，在资金费率较低的交易所做多永续合约。两条永续腿相互抵消价格风险，并共同收取浮动的资金费率利差。
- **利率锁定（在 Boros 上）：** 在 Boros 上把这笔浮动利差支付出去，以换取固定利率。剩下的就是直至 Boros 市场到期的固定回报。

Boros 提供两种锁定利率的方式。

### 方式一：做空价差市场（三腿）

如果 Boros 为该交易所组合上线了[价差市场](../about-boros/spread-markets)，整个利率锁定只需一个仓位。以 BTC Spread HL-Gate 为例：

- 在 Boros 上以 4% 隐含 APR **做空 10 YU** 的 BTC Spread HL-Gate
- 通过 CrossEx **做空 10 BTC** Hyperliquid BTC 永续合约
- 通过 CrossEx **做多 10 BTC** Gate BTC 永续合约

Boros 一侧只需一笔订单，且只有**一个保证金要求和一个清算隐含 APR**，二者都基于价差本身。任一交易所资金费率的单独变动不会导致你被清算，只有价差的变动才会。

### 方式二：两条资金费率市场腿（四腿）

对于没有价差市场的交易所组合，利率锁定由两个[资金费率市场](../about-boros/market-types#funding-markets)仓位构成。以 Hyperliquid 与 Binance 上的 BTC 为例：

- 在 Boros 上以 8% 隐含 APR **做空 10 YU** 的 BTC Hyperliquid 资金费率
- 在 Boros 上以 4% 隐含 APR **做多 10 YU** 的 BTC Binance 资金费率
- 通过 CrossEx **做空 10 BTC** Hyperliquid BTC 永续合约
- 通过 CrossEx **做多 10 BTC** Binance BTC 永续合约

这种方式适用于任意两个共享抵押品与到期日的市场。此时 Boros 一侧是两个仓位，各有各的保证金和清算水平。

无论哪种方式，交易者都保持**市场中性（delta-neutral）**，并持有 **4% 的 APR 利差**作为固定收益，直至 Boros 市场到期（杠杆前）。

![4 leg funding rate arbitrage](/boros-docs/imgs/arbitrage-with-crossex/4-leg-funding-rate-arbitrage.jpg "4 Leg Funding Rate Arbitrage")

配合杠杆，这可以成为一个可观的收益策略——但手动在多个交易所之间协调抵押品和仓位相当繁琐，这也是大多数交易者望而却步的原因。

## 为什么用 CrossEx

[CrossEx](https://www.gate.com/crossex) 是 Gate.io 推出的产品，为交易者提供跨多个交易所同时持仓的**统一保证金**。交易者无需在各交易所分别维护独立的抵押品池，而是可以在同一账户下开出套利的多空永续腿，并保持完全的市场中性。

## 该应用能做什么

Arbitrage with CrossEx 将 CrossEx 与 Boros 整合在一起，让交易者可以：

- **扫描机会** — 查看跨交易所的实时固定利差，并自动计算潜在收益与所需保证金
- **执行每一条腿** — 引导式向导先在 Boros 上锁定固定利率（一笔价差市场订单，或两笔资金费率市场订单），再通过 CrossEx 对冲永续腿，全程无需离开面板
- 在同一个面板中**监控**整个仓位的保证金、盈亏和收益，并完整拆解计入回报的每一项成本

<Hint style="warning">
这是实验性的开源软件，会在你自己的交易所账户上用真实资金下单。本文不构成财务、投资、法律或税务建议。使用前请阅读[风险与安全](./risks-and-security)。
</Hint>

## 延伸阅读

- [Boros 价差市场](../about-boros/spread-markets)
- [理解 Boros 上的隐含 APR 与底层 APR](https://pendle.gitbook.io/boros/the-basics/chapter-2-implied-apr-and-underlying-apr)
- [Boros 如何为浮动资金费率提供固定利率支付](https://pendle.gitbook.io/boros/advanced-strategies/hedging-funding-rates-payment)
- [Boros 如何让你从浮动资金费率中获得固定利率](https://pendle.gitbook.io/boros/advanced-strategies/fixed-funding-rates-receivables)
- [固定收益资金费率套利 — Boros Academy](https://docs.pendle.finance/boros-academy/advanced-strategies/fixed-return-funding-arbitrage)

下一步：[安装](./installation)
