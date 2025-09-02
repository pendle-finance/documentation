---
hide_table_of_contents: true
---

# 词汇表

**生息代币 (Yield-Bearing Token)**

生息代币是一个泛指，指任何可以产生收益的代币。例如，stETH、GLP、gDAI，甚至包括像Aura rETH-WETH这样的流动性代币。

**SY = 标准化生息代币 (Standardized Yield)**

SY是Pendle团队编写的一种代币标准 ([EIP-5115](https://eips.ethereum.org/EIPS/eip-5115))，它可包装任何生息代币，并提供了一个标准化的接口，用于与任何生息代币的收益生成机制进行交互。SY是一个纯技术组件，用户不会直接与SY交互。

**PT = 本金代币 (Principal Token)**

PT乃由底层生息代币分拆出来、本金的组成部份。持有PT代表你握有本金的拥有权、并于到期后可兑换领回。例如你拥有一张1年后到期的1枚PT-stETH，那么在1年后你将能兑换价值1 ETH的stETH。

PT可以在到期之前随时交易。

**YT = 收益代币 (Yield Token)**

YT乃由底层生息代币分拆出来、收益的组成部份。持有YT代表你拥有底层资产产生的所有实时收益，并且可以随时在Pendle面板上手动领取所累积的收益。

如果你拥有1个YT-stETH，而stETH的平均收益率为5%，那么在一年结束时你将累积0.05个stETH。

YT可以在到期之前随时交易。

**到期日 (Maturity)**

在到期日，PT可以完全兑换并领回其底层资产，而YT则停止获得收益。同一种资产可以有多个到期日，每个到期日都有一个独立的市场。因此，同一种资产在不同到期日的隐含收益率也可能有所不同。

**底层APY (Underlying APY)**

底层年化收益率，或简称「底层APY」，代表底层资产的7天移动平均收益率。这种方法可以更准确地指示一段时间内底层收益率，有助于交易者更好地评估未来的平均底层APY。

**隐含APY (Implied APY)**

隐含年化收益率，或简称「隐含APY」，是市场对于资产未来APY的共识。该值基于YT和PT价格比率计算得出，公式如下所示。

当与底层APY一起使用时，隐含APY可用于评定当前价格下YT和PT等资产的相对估值，帮助交易者制定其交易策略。

隐含收益率的数值与「固定收益APY」数值相等。


```math
\text{Implied APY} = \left[\left(1 + \cfrac{\text{YT Price}}{\text{PT Price}}\right)^\cfrac{365}{\text{Days to expiry}}\right] - 1
```

**固定收益APY (Fixed APY)**

固定收益APY是持有PT至到期日将获得的保证收益。该数值与「隐含APY」数值相等。

**收益率多头APY (Long Yield APY)**

或译为「收益率长仓APY」或「收益率好仓APY」，是基于以当前价格购买YT、并假设底层APY保持不变下的预估回报（年化）。

此值可以为负数 － 表示按当前底层APY所有计算的未来收益总价值，低于当前购买YT的成本。

#### Exchange Rate

指生息代币与其记账资产之间的汇率。

#### Watermark Rate

生息代币与其记账资产之间记录的最高汇率。当汇率低于此水平时，PT在到期时将以低于其实际价值赎回，YT将停止赚取收益。

