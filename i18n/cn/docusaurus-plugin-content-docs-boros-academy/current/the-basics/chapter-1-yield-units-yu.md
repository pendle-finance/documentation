---
pagination_label: "第 1 章 - 收益单位（YU）"
title: "第 1 章 - 收益单位（YU）"
---

import Hint from '@site/src/components/Hint';

# 第 1 章 - 收益单位（YU）

<Hint style="success">
熟悉 Pendle V2 的用户请注意：Boros 上的 YU（收益单位，Yield Units）与 Pendle V2 上的 YT（收益代币）类似。
</Hint>

<iframe height="400" width="100%" src="https://www.youtube.com/embed/JOoJO3ZCo28" title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## 理解 YU

Boros 通过创建一种名为收益单位（YU）的工具来实现收益率交易。YU 代表底层资产在到期日前的未来收益。简而言之，持有 YU 即意味着你拥有该资产在特定期限内所产生收益的权利。

例如：

* 5 个 YU-ETHUSDT-Binance 代表 Binance ETHUSDT 上 5 ETH 头寸的资金费率收益。
* 69 个 YU-BTCUSDT-Hyperliquid 代表 Hyperliquid 上 69 BTC 头寸的资金费率收益。

<Hint style="info">
收益单位（YU）是 Boros 上所有操作的核心。在 Boros 上进行收益率交易，就是通过做多或做空 YU 来进行。目标是捕捉预期收益随时间的差异。
</Hint>

### 隐含 APR

YU 的价格以「隐含 APR」（Implied APR）表示。你可以将其理解为购买 YU 的成本。

开仓时，入场的平均隐含 APR 构成固定利率支付的基础。

隐含 APR 的另一种理解方式是：市场对从现在到到期日，该资产平均资金费率支付的预期。

你可以在[第 2 章](chapter-2-implied-apr-and-underlying-apr)中了解更多关于隐含 APR 的内容。

### 到期

每个市场都有一个到期日。到期后，你的头寸将不再产生任何收益，所有支付义务均已结清。

示例：

在到期日为 2026 年 12 月 25 日的 ETHUSDT-Binance 市场中，开设 5 个多头 YU 头寸的交易者将：

1. 从现在到 2026 年 12 月 25 日，持续收取相当于 Binance ETHUSDT 上 5 ETH 头寸的资金费率收益
2. 从现在到 2026 年 12 月 25 日，持续支付固定收益（即入场时的隐含 APR）

***

补充说明：

请注意，Boros 上所有收益均以 APR 形式表示（即以单利年化，非复利），以符合市场惯例。

熟悉 Pendle V2 的用户可将 YU 类比为 YT：用户「支付」隐含收益，以换取底层收益。Boros 上的收益单位（YU）代表底层永续合约交易所（如 Hyperliquid、Binance、Deribit 等）中，1 单位抵押资产的资金费率收益。
