---
pagination_label: "第 6 章 - 做空利率"
title: "第 6 章 - 做空利率"
---

import Hint from '@site/src/components/Hint';

# 第 6 章 - 做空利率

若你预期 BTCUSDT-Binance 的资金费率将下降——你应在 Boros 上做空其 YU 市场。

以下是通过做空 YU 头寸获利的两种方式：

1. 底层 APR 下降
2. 隐含 APR 下降

## 底层 APR 下降

<figure><img src="/boros-academy/imgs/image (50).png" alt="" /><figcaption></figcaption></figure>

在 Boros 上开设空头头寸时，你承诺支付浮动的底层 APR，以换取固定 APR——该固定 APR 由入场时的平均隐含 APR 决定。

本质上，你是在押注你锁定的固定 APR 将超过最终需要支付的底层 APR 总额。

每次结算时，你的收益支付将基于 YU 的底层 APR（即此处的资金费率）。当你累计收取的收益（固定 APR）超过累计支付的收益（底层 APR）时，你将获利。

**举例说明：**

Dylan 以 10% 隐含 APR 开设 5 个 YU-BTCUSDT-Binance 的空头头寸。

到期（或平仓）时，若入场时的平均隐含 APR > 平均底层 APR，Dylan 将获利。

换言之，Dylan 累计收取的收益将超过其累计支付的收益。

_Total Profit = (Fixed Yield Collected - Underlying Yield Paid)_

## 隐含 APR 下降

请注意，隐含 APR 是 YU 的「价格」。

做空时这与「高卖低买」的原则类似——当 YU 的价格跌至入场价格以下时获利。

同理，你也可以在 YU 的隐含 APR（即其价格）下降时平仓，从中获利。

<Hint style="warning">
**重要提示**

不同于代币价格的下限为 \$0，YU 既没有价格下限，也没有价格上限。例如，以 10% 隐含 APR 开设的空头头寸，其隐含 APR 可能上升至 100%、200% 甚至更高，没有上限。

每上升 1 个百分点，都会按照你的利率敏感度蚕食保证金。开仓前在头寸规模与保证金缓冲方面，请务必将这一点纳入考量。

<figure><img src="/boros-academy/imgs/no-price-ceiling-ch6.png" alt="" /><figcaption></figcaption></figure>
</Hint>

**举例说明：**

<figure><img src="/boros-academy/imgs/short-rates-example-ch6.png" alt="" /><figcaption></figcaption></figure>

Peepo 以 5.2% 隐含 APR 开设 5 个 YU-BTCUSDT-Hyperliquid 的空头头寸。

一段时间后，隐含 APR 下降 2%，至 3.2%。

此时，Peepo 可选择在到期前以更低的「价格」平仓——这对空头持仓者而言是有利的。

_Total Profit = (Fixed APR Collected - Underlying APR Paid) + Profit from YU Sale (2 x Rate Sensitivity)_

**相比持有至到期，这一策略通过把握市场时机，在隐含 APR（YU 的市场价值）低于入场价格时平仓，从而同时获取：**

1. 收益利润
2. YU 交易带来的资本收益
