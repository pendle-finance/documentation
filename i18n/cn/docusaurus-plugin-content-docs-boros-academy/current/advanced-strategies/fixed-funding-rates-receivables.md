---
pagination_label: "锁定固定资金费率收益"
title: "锁定固定资金费率收益"
---

import Hint from '@site/src/components/Hint';

# 锁定固定资金费率收益

在资金费率为正的市场环境下，在永续合约交易所持有空头头寸的交易者，将在每个结算间隔收取资金费率支付（各交易所结算频率不同）。

<figure><img src="/boros-academy/imgs/image (37).png" alt="" /><figcaption></figcaption></figure>

如上图所示，在 Binance BTCUSDT 永续合约市场持有空头头寸，每 8 小时可收取 0.0062%（即年化 6.789% APR）的资金费率。然而，资金费率的波动可能相当剧烈，可通过 Boros 将其锁定为固定 APR。

这对于大量持有资金费率 APR 敞口的机构尤为有用，例如资金费率基差交易者（如 Ethena）。

交易者可以通过在 Boros 上将浮动资金费率收益锁定为固定 APR，从而对冲浮动收益敞口。为此，在底层永续合约交易所持有空头头寸的交易者，应在 Boros 上针对相同市场开设 YU 空头头寸。

以下是具体操作示例：

假设 Bob 在 Binance BTCUSDT 市场持有 50 BTC 的空头头寸，在该头寸持续期间，实际上持续收取来自 50 BTC 的资金费率。

为对冲资金费率收益的浮动敞口，**Bob 在 Boros 上以 5% 隐含 APR 开设 50 YU-BTCUSDT（Binance）的空头头寸**。

请注意，YU 空头头寸：

* 收取固定利率 5%（即开仓时的隐含 APR）
* 支付底层 APR（即底层头寸的资金费率）

<figure><img src="/boros-academy/imgs/image (16).png" alt="" /><figcaption></figcaption></figure>

可以注意到，Bob 原本持有来自 Binance 的浮动资金费率收益敞口。在 Boros 上开设 50 YU 空头头寸后，Bob 支付相同的浮动资金费率，以换取固定 APR 收益。

由此形成的合并头寸，使 Bob 最终以 5% 的固定 APR（即开仓时的隐含 APR）收取收益。

<figure><img src="/boros-academy/imgs/image (17).png" alt="" /><figcaption></figcaption></figure>

<Hint style="info">
**希望对冲资金费率收益的交易者，只需关注所要对冲资产的当前隐含 APR 即可。**

若隐含 APR 处于有利水平，交易者可开设 YU 空头头寸，将资金费率收益锁定为固定值。隐含 APR 越高，可锁定的固定 APR 越高，固定收益效果越佳。
</Hint>

简而言之：若要对冲在永续合约交易所持有空头头寸的资金费率收益敞口，你应在 Boros 上以相同名义规模开设 YU 空头头寸。

例如，若你在 ETHUSDT（Hyperliquid）持有 20 ETH 的空头头寸，可通过在 Boros 上开设 20 YU-ETHUSDT（Hyperliquid）的空头头寸来对冲资金费率收益。
