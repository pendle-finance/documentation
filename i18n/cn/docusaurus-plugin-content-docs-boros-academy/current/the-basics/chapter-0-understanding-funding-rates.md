---
pagination_label: "第 0 章 - 理解资金费率"
title: "第 0 章 - 理解资金费率"
---

import Hint from '@site/src/components/Hint';

# 第 0 章 - 理解资金费率

<iframe height="400" width="100%" src="https://www.youtube.com/embed/u918Tj7S0Ug" title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## 什么是资金费率？

资金费率 (Funding Rate) 是 Binance 合约、Hyperliquid 等永续合约市场的重要组成部分。

它作为一种机制，确保永续合约的价格锚定实际市场价格（即现货市场价格）。

资金费率通过在多头和空头持仓者之间定期收付款项来实现这一平衡：

* 若 BTCUSDT 永续合约价格高于 BTC 现货价格，多头持仓者将向空头持仓者支付资金费。这一机制抑制多头、激励空头，从而推动合约价格向现货价格靠拢。
* 反之，若 BTCUSDT 永续合约价格低于 BTC 现货价格，空头持仓者向多头持仓者支付资金费，激励更多交易者做多，从而推动永续合约价格上涨至现货水平。

<figure><img src="/boros-academy/imgs/image (3).png" alt="" /><figcaption></figcaption></figure>

<Hint style="info">
交易者持有永续合约时，要么支付、要么收取资金费。这种定期收付即为资金费率。

* 当资金费率为正时，多头持仓者向空头持仓者支付资金费
* 当资金费率为负时，空头持仓者向多头持仓者支付资金费
</Hint>

## 资金费率如何运作？

资金费率按固定间隔结算，不同交易所的结算频率各不相同（Binance 每 8 小时结算一次，Hyperliquid 每 1 小时结算一次，等等）。

每次结算时，多头或空头持仓将被收取或获得相应的资金费率。

<figure><img src="/boros-academy/imgs/image (44).png" alt="" /><figcaption><p><em>来源：</em><a href="https://app.hyperliquid.xyz/trade/BTC"><em>Hyperliquid</em></a></p></figcaption></figure>

在交易所上，资金费率通常按结算间隔折算后显示。

在 Hyperliquid 上，资金费率**每小时**结算一次，因此上图中 0.0013% 的资金费率（正向资金费）意味着：

* 在 Hyperliquid BTCUSD 持有 10 万美元多头的交易者，每小时需支付 _\$100,000 × 0.0013% = \$1.30_（假设资金费率不变）。
* 在 Hyperliquid BTCUSD 持有 10 万美元空头的交易者，每小时可获得 \$1.30（假设资金费率不变）。

<figure><img src="/boros-academy/imgs/image (46).png" alt="" /><figcaption><p><em>来源：</em><a href="https://www.coinglass.com/funding/BTC"><em>CoinGlass</em></a></p></figcaption></figure>

上图展示了不同交易所之间资金费率可能存在较大差异。资金费率往往表现出显著的波动性，有时甚至超过底层资产价格的波动幅度。

例如，上图中 Binance BTCUSDT 的资金费率在 48 小时内从 0.0032% 骤降至 -0.0041%，年化换算后变化幅度高达 228%。

这种剧烈波动在资金费率领域相当常见，即便是 BTC 这类蓝筹资产也不例外。

Boros 允许交易者对资金费率的走向进行投机，从这些变动中获利。

## 如何利用资金费率

以下是一些将资金费率融入交易策略的示例。

### 判断市场情绪

<figure><img src="/boros-academy/imgs/image (47).png" alt="" /><figcaption><p><em>来源：</em><a href="https://www.coinglass.com/FundingRateHeatMap"><em>CoinGlass</em></a></p></figcaption></figure>

许多交易者将资金费率作为市场情绪的指标。

例如，ETHUSDT 正向资金费率说明多头持仓者更多，市场偏向看涨。然而，_过高的_正向资金费率_**可能**_意味着 ETH 已被超买。

资金费率反映的是集体市场行为。善用这一信息，可能有助于你构建对市场的整体判断。

在 Boros 上，你可以主动将这一理解转化为优势：看涨 ETH？做多 ETH 资金费率。认为 SOL 已超买？做空 SOL 资金费率。鉴于历史上资金费率的高波动性，盈利（或亏损）的潜力同样存在。

### 市场中性策略（现货套利交易）

资金费率是一种优质的收益来源，尤其适合采用市场中性策略的交易者——通过双重收益流来实现增益。

一个简单的市场中性策略示例：

1. 在 Lido 质押 100 ETH，获得约 4% APR
2. 在 Binance 做空 100 ETH

这一策略使投资组合对 ETH 价格波动保持中性。

若 ETH 价格下跌，Binance 的空头获利将抵消 Lido 上质押 ETH 的贬值损失。

若 ETH 价格上涨，Lido 上的 ETH 价值增加，抵消空头头寸的损失。

无论 ETH 价格如何变动，你都能从 Lido 的收益中获利，扣除空头持仓的相关费用（如有）。

若资金费率为正，你实际上还能额外获得维持空头的报酬，从而同时享受 Lido 收益_**和**_资金费率收入的双重收益流。

这实质上就是 Ethena 协议的做法——以 ETH 进行市场中性套利。双重收益流使 Ethena 能够为 sUSDe 提供超额稳定币收益（当 ETH 资金费率为正时）。然而，这一收益暴露于资金费率的波动之中，无法在高资金费率环境下锁定更高的 APR。Boros 解决了这一问题。

在 Boros 上，用户可以将其现有市场中性策略中来自资金费率的浮动收益转化为_**固定**_收益流，从而补充其原有策略。这一功能使 Ethena 等交易者和协议能够从市场中性套利中获取稳定收益，让收益流更可预测，更易管理，甚至能够锁定更高的利率。

你可以在[这里](/broken/pages/saP5y79RkhZutSr2jN3w)了解 Boros 的高级策略。

## 延伸阅读

BitMex 于 2025 年第三季度发布了一份关于资金费率的深度报告，欢迎查阅：[https://blog.bitmex.com/2025q3-derivatives-report/](https://blog.bitmex.com/2025q3-derivatives-report/)
