---
pagination_label: "第 7 章 - 保证金与清算"
title: "第 7 章 - 保证金与清算"
---

import Hint from '@site/src/components/Hint';

# 第 7 章 - 保证金与清算

在 Boros 上开仓前，你首先需要存入抵押品。

<figure><img src="/boros-academy/imgs/image (25).png" alt="" /><figcaption></figcaption></figure>

## 保证金

存入抵押品后，你即可在 Boros 上开设头寸。

应用界面将显示以下关键信息，助你开启交易：

1. **可用保证金**

   可用于开仓的抵押品总额。随着你开设更多头寸，该数值将逐渐减少，因为抵押品被用于支撑已开设的头寸（即开仓时保证金被占用）。

2. **所需保证金**

   开设该头寸所需的抵押品数量。

   开仓时，一定数量的抵押品将被「占用」或「锁定」，从而减少〈可用交易〉的抵押品总额。

   被占用的抵押品无法提取，也不能用于开设其他头寸。

3. **名义规模**

   该头寸对底层资产的敞口大小（即你做多或做空的 YU 数量）。

   示例：5 YU-BTCUSDT-Binance = 名义规模为 5 YU，代表 Binance BTCUSDT 市场上 5 BTC 头寸的收益敞口。

<figure><img src="/boros-academy/imgs/image (27).png" alt="" /><figcaption></figcaption></figure>

## 杠杆

与永续合约交易所类似，Boros 允许交易者使用杠杆开仓。

例如，在 2 倍杠杆市场中，持有 10 ETH 抵押品的交易者最多可开设价值 20 ETH 的头寸，将购买力翻倍。

简而言之，杠杆可以让交易者用相同的资金做更多事，但请注意，杠杆越高，清算风险也越大。

<figure><img src="/boros-academy/imgs/image (28).png" alt="" /><figcaption></figcaption></figure>

## 清算

当你头寸的价值跌至指定阈值以下时，系统将自动平仓以防止进一步损失，这就是清算。

你可以通过以下两种方式监控清算风险：

1. **清算隐含 APR**

   类似于永续合约交易所的「清算价格」，若 YU 的隐含 APR 达到该利率，你的头寸将被触发清算。

   请注意，由于你当前持仓的定期收益结算会影响抵押品余额，清算隐含 APR 可能随时间变化。

2. **健康因子**

   健康因子是衡量 Boros 上头寸安全性的指标，帮助用户直观了解头寸距离清算的「健康」程度。当健康因子降至 0 时，你的头寸将被清算。保持健康因子高于零是避免清算的关键。

<Hint style="danger">
请密切关注你头寸的健康因子或清算隐含 APR，以避免被清算。
</Hint>

总体而言，你头寸的整体健康状况对某些变化较为敏感，包括 YU 的「价格」（隐含 APR）以及抵押品数量——后者在每次结算后都可能发生变化（参见[第 4 章](chapter-4-settlement)）。

定期监控并及时调整抵押品，对于维持头寸健康（健康因子）、避免清算至关重要。

你可以在我们的文档[此处](https://pendle.gitbook.io/boros/boros-docs/risk-parameters/margin-and-liquidations)了解更多关于保证金与清算的详细内容。

***
