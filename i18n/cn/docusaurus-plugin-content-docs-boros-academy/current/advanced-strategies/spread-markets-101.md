---
pagination_label: "价差市场入门"
title: "价差市场入门"
---

import Hint from '@site/src/components/Hint';

# 价差市场入门

## 什么是价差市场？ {#what-is-a-spread-market}

价差市场（Spread Market）是独立于资金费率市场之外的另一类市场。它让你用单一头寸交易两个资金费率之间的差值。

**例如：** ETH Spread HL-Gate 是 Boros 上追踪 Hyperliquid 与 Gate 之间 ETH 资金费率差值的价差市场。

<figure><img src="/boros-academy/imgs/spread-markets-trading-the-gap.png" alt="价差市场如何运作？Hyperliquid 与 Gate 的 ETH 30 日区间平均资金费率，阴影部分为二者之间的价差" /><figcaption></figcaption></figure>

**因此，底层 APR = HL ETH 资金费率 − Gate ETH 资金费率**

**1 YU = 1 ETH 在 HL 与 Gate 之间的资金费率价差**

<Hint style="info">
在市场剧烈波动期间，价差的底层 APR 可能转为负值。
</Hint>

交易价差市场与交易 Boros 上的其他市场完全相同。多头押注底层利率的平均值将高于其入场时的隐含 APR，空头则押注其平均值将低于入场时的隐含 APR。在价差市场中，多头 YU 头寸押注的是：平均资金费率价差将高于入场时的隐含 APR。

*注：隐含 APR 在价差市场上的运作方式，与在[资金费率市场](../the-basics/chapter-2-implied-apr-and-underlying-apr)上完全相同。*

## 做空价差，进行固定收益套利 {#short-spread-for-fixed-yield-arbitrage}

将 Boros 上的做空价差头寸与等额的永续合约头寸（做空永续合约 A、做多永续合约 B）配对，即可在该价差上实现固定收益套利。

**这就是[固定收益资金费率套利](fixed-return-funding-arbitrage)，只是把两条 Boros 腿合并成了一个头寸。**

**简单 3 步：**

1. 在 Boros 上做空价差市场。这会将隐含 APR 锁定为你的应收收益，同时由你支付浮动价差。
2. 在两个永续合约市场上，以等额名义本金做空永续合约 A、做多永续合约 B。这会建立一个赚取永续合约价差的 Delta 中性头寸。
3. 浮动价差相互抵消：你赚取的永续合约价差，正好用于支付你在 Boros 上应付的浮动价差。

**结果：在到期前，你以固定收益的形式收取隐含 APR。**

<figure><img src="/boros-academy/imgs/short-spread-arbitrage-diagram.png" alt="做空价差套利：在交易所 A 与交易所 B 持有永续合约头寸，并在 Boros 上做空价差，以固定资金费率的形式收取隐含 APR" /><figcaption></figcaption></figure>

## 做多价差 {#long-spread}

**价差市场为多头提供了资金费率市场所没有的结构性优势。**

**做空价差的一方基本不关心利率变动。** 他们做空价差市场，是为了把永续合约价差转化为固定收益套利，因此*支付的价格大多是次要的。*

因此，隐含价差持续面临做空压力，多头可以通过站在订单簿的另一侧获益。

持有至到期的多头，赚取的是隐含价差与底层价差之间的差额。**隐含价差被压得越低于底层价差，多头的潜在利润就越大。** 差距越大，持有做多价差头寸所赚取的收益就越多。

套利者做空价差，为其永续合约价差锁定固定收益。而做多价差，你就能收取隐含价差与底层价差之间的差额。

想了解做多价差为何同时也是一种有历史数据支持的均值回归交易，请阅读[这篇推文](https://x.com/gabavineb/status/2102389618394223006)。

## 价差市场的 PvE 特性 {#the-pve-nature-of-spread-markets}

交易双方都能从中受益，这使价差市场成为 Boros 上一种正和（玩家对环境，即 PvE）的收益机会。套利者利用价差市场的固定收益机制锁定高额固定收益；多头则赚取被压缩的隐含价差与底层利率之间的差额。

多空双方相互成就。价差市场被做空得越多，做多价差的潜在收益就越大；多头将隐含价差推得越高，空头在套利中能赚取的收益也越高。

<figure><img src="/boros-academy/imgs/spread-markets-how-everyone-wins.png" alt="价差市场：多空共赢。四步飞轮：套利者做空价差以锁定固定收益；多头在价差回归时买入被压缩的价差；套利者以更大规模再次做空扩大后的价差；多头再次买入被压缩的价差" /><figcaption></figcaption></figure>

关于价差市场的完整机制（包括结算与保证金），请参阅文档中的[价差市场](/boros-docs/about-boros/spread-markets)。
