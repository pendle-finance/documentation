# 第 5 章 - 做多利率

在 Boros 上交易时，若你预期某资产（例如 BTCUSDT-Binance）的资金费率将上升，你应开设该资产 YU 的多头头寸。

以下是通过做多 YU 头寸获利的两种方式：

1. 底层 APR 上升
2. 隐含 APR 上升

## 底层 APR 上升

<figure><img src="/boros-academy/imgs/image (12).png" alt="" /><figcaption></figcaption></figure>

持有多头头寸时，你本质上是在押注底层 APR 将超过你承诺支付的固定 APR（由入场时的平均隐含 APR 决定）。底层 APR 代表你在持仓期间实际收取的收益率。

每次结算时，你将根据 YU 的底层 APR（即资金费率）收取收益。对于 BTCUSDT-Binance 而言，收益来自该市场的资金费率支付。当你累计收取的收益（底层 APR）超过累计支付的收益（固定 APR）时，你将获利。

**举例说明：**

Peepo 以 10% 隐含 APR 开设 2 个 YU-BTCUSDT-Binance 的多头头寸。

这意味着 Peepo 承诺支付 10% 的固定利率，同时收取底层 APR（即 Binance BTCUSDT 市场 2 BTC 头寸的资金费率支付）。

到期（或平仓）时，若平均底层 APR > 入场时的平均隐含 APR，Peepo 将获利。

换言之，Peepo 累计收取的收益将超过其累计支付的收益。

_总利润 = （收取的底层收益 - 支付的固定收益）_

## 隐含 APR 上升

请注意，隐含 APR 是 YU 的「价格」。

这与「低买高卖」的原则类似。例如，持有 BTC 的交易者可以在价格较高时卖出 BTC 获利。

同理，你也可以在 YU 的隐含 APR（即其价格）上涨时平仓，从中获利。

**举例说明：**

Peepo 以 10% 隐含 APR 开设 2 个 YU-BTCUSDT-Binance 的多头头寸。

经过 3 轮结算后，YU-BTCUSDT-Binance 的隐含 APR 上升至 15%。

此时，Peepo 可选择在到期前以更高价格卖出 YU（即平仓）。

_总利润 = （收取的底层收益 - 支付的固定收益）+ YU 卖出收益_

相比持有至到期，这一策略通过把握市场时机，在隐含 APR（YU 的市场价值）高于入场价格时平仓，从而同时获取：

1. 收益利润
2. 资本增值
