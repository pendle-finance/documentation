---
pagination_label: "市场类型"
title: "市场类型"
---

# 市场类型

每个 Boros 市场都以一个浮动利率与固定利率进行交易，直至到期。不同市场之间变化的只是利率本身，交易机制保持不变。Boros 目前有两种市场类型，分别显示在市场页面的「**资金费率**」("Funding") 与「**价差**」("Spread") 标签下。

订单簿、[保证金与清算](../boros-systems/margin-and-liquidations)、[费用](../boros-systems/fees)以及[保护机制](../boros-systems/protective-mechanism)在两种类型中的运作方式完全相同。

## 资金费率市场 {#funding-markets}

底层利率是单一交易所上单个永续合约市场的资金费率。

| | |
| --- | --- |
| **底层 APR** | 所参考永续合约市场的资金费率（年化） |
| **1 YU 代表** | 1 单位抵押品所赚取的资金费率，例如 Binance BTCUSDT 上 1 BTC 的名义规模 |
| **结算频率** | 与交易所的资金费率间隔一致，例如 Binance 每 8 小时、Hyperliquid 每 1 小时 |
| **预言机** | 交易所的资金费率，经链上验证（参见[费率结算](./rate-settlement#the-underlying-rate-oracle)） |
| **示例** | BTCUSDT (Binance) |

## 价差市场 {#spread-markets}

底层利率是同一资产在两家交易所的资金费率之差：**利率 A − 利率 B**。排在前面的交易所通常是历史资金费率较高的一方。

| | |
| --- | --- |
| **底层 APR** | 交易所 A 资金费率 − 交易所 B 资金费率（年化），可以为负 |
| **1 YU 代表** | 1 单位抵押品所赚取的价差，例如两家交易所上各 1 BTC 的名义规模 |
| **结算频率** | 与两家交易所中结算频率较低的一方一致 |
| **预言机** | 两条腿各自现有的资金费率数据源 |
| **示例** | BTC Spread HL-Gate（Hyperliquid BTC 资金费率 − Gate BTC 资金费率） |

关于价差市场的详细运作方式，请参阅[价差市场](./spread-markets)。
