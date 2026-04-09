import Hint from '@site/src/components/Hint';

# 第 2 章 - 隐含 APR 与底层 APR

在 Boros 上交易与在永续合约交易所（perps）交易有相似之处，但有一个关键区别：Boros 的交易者押注的是收益率的走向，而非资产价格的涨跌。

在普通永续合约交易所：

* 多头头寸在开仓后_价格_上涨时获利。
* 空头头寸在开仓后_价格_下跌时获利。

在 Boros 上：

* YU 多头头寸在开仓后_隐含 APR_ 上升时获利。
* YU 空头头寸在开仓后_隐含 APR_ 下降时获利。

换言之，Boros 上的 YU 同样有一个「价格」，以收益率的形式表示。这就是「隐含 APR」（Implied APR）——本质上是你为获取资产底层收益而支付的_价格_。

正如 BTC 的价格是市场对该资产的估值，Boros 上的隐含 APR 可理解为市场对该资产到期前平均收益率的预期。

<Hint style="success">
YU 的隐含 APR 也可以理解为：市场（在理性市场假设下）对该资产到期前平均收益率的共识预期。
</Hint>

## 理解隐含 APR

**开仓时，当时的隐含 APR 将被锁定为你的固定 APR，直至到期。** 无论此后隐含 APR 如何波动，这一利率始终保持不变。

多头 YU 示例：

假设 YU-ETHUSDT-Binance 当前隐含 APR 为 5%，开设_**多头**_头寸意味着：

* 你承诺支付 5% APR 直至到期，或直至平仓
* 此后隐含 APR 的任何变动（上升或下降）均不影响你锁定的固定 APR

空头 YU 示例：

同样，假设 YU-ETHUSDT-Binance 当前隐含 APR 为 5%，开设_**空头**_头寸意味着：

* 你将收取 5% APR 直至到期，或直至平仓
* 此后隐含 APR 的任何变动（上升或下降）均不影响你锁定的固定 APR

<Hint style="warning">
请注意，隐含 APR 是 YU 的「价格」。当你开设 YU 多头头寸时，你支付的是入场时的隐含 APR，即当时的「价格」。

这与开设 BTC 多头头寸时支付入场时的 BTC 价格类似。

做空时亦然。
</Hint>

## 理解底层 APR

<figure><img src="/boros-academy/imgs/image (2).png" alt="" /><figcaption></figcaption></figure>

持有 YU 多头头寸时，你将收取底层资产的 APR，即「底层 APR」（Underlying APR）。

例如，若你持有 2 个 YU-BTCUSDT-Hyperliquid 的多头头寸，你将收取 Hyperliquid 上 2 BTC 资金费率的收益。

有效交易 YU 的关键，在于比较当前市场的隐含 APR 与你对到期前底层 APR 的预期。

<Hint style="success">
**做多 YU：** 若当前隐含 APR 低于你对底层 APR 的预期，说明 YU 可能被低估或价格偏低。

**做空 YU：** 反之，若当前隐含 APR 高于你对底层 APR 的预期，说明 YU 可能被高估或价格偏高。
</Hint>

***
