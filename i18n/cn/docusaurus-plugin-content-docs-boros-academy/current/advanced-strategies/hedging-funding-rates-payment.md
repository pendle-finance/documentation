import Hint from '@site/src/components/Hint';

# 对冲资金费率支付

在资金费率为正的市场环境下，在永续合约交易所持有多头头寸的交易者，将在每个结算间隔支付资金费率（各交易所结算频率不同）。

<figure><img src="/boros-academy/imgs/image (33).png" alt="" /><figcaption></figcaption></figure>

如上图所示，在 Binance BTCUSDT 永续合约市场持有多头头寸，将支付 0.0069%（即年化 7.55% APR）的资金费率。然而，资金费率的波动可能相当剧烈，对于持仓规模较大的交易者而言，这是一笔不可忽视的成本。

交易者可以通过在 Boros 上将浮动资金费率支付锁定为固定支付，从而对冲资金费率敞口。为此，在底层永续合约交易所持有多头头寸的交易者，应在 Boros 上针对相同市场开设 YU 多头头寸。

以下是具体操作示例：

假设某交易者在 Binance BTCUSDT 市场持有 100 BTC 的多头头寸，在该头寸持续期间，实际上需要持续支付 100 BTC 对应的资金费率。

为对冲该资金费率敞口，该交易者在 Boros 上以 6% 隐含 APR 开设 100 YU-BTCUSDT（Binance）的多头头寸。

该 YU 多头头寸：

* 以 6% 隐含 APR 支付固定利率
* 收取底层 APR（即底层头寸的资金费率）

<figure><img src="/boros-academy/imgs/image (14).png" alt="" /><figcaption></figcaption></figure>

可以注意到，该交易者原本在 Binance 支付浮动资金费率。在 Boros 上开设 100 YU 多头头寸后，交易者现在可以收取相同的浮动资金费率，同时支付固定 APR 6%。

由此形成的合并头寸，使交易者锁定了支付固定 APR 6%（即开仓时的隐含 APR），并消除了对浮动资金费率剧烈波动的敞口。

<figure><img src="/boros-academy/imgs/image (15).png" alt="" /><figcaption></figcaption></figure>

<Hint style="info">
**希望对冲资金费率支付的交易者，只需关注所要对冲资产的当前隐含 APR 即可。**

若隐含 APR 处于有利水平，交易者可开设 YU 多头头寸，将资金费率支付锁定为固定值。隐含 APR 越低，锁定的固定 APR 越低，对冲效果越佳。
</Hint>

简而言之：若要对冲在永续合约交易所持有多头头寸的资金费率支付敞口，你应在 Boros 上以相同名义规模开设 YU 多头头寸。

例如，若你在 ETHUSDT（Hyperliquid）持有 50 ETH 的多头头寸，可通过在 Boros 上开设 50 YU-ETHUSDT（Hyperliquid）的多头头寸来对冲资金费率支付。
