---
hide_table_of_contents: true
---

# AMM

Pendle的V2 AMM是专门为交易收益率并针对市场对PT和YT的互动行为而设计的。

AMM曲线随着时间按著累积的收益而改变，并在PT接近到期时缩小价格范围。通过将流动性集中到一个狭窄的、有意义的范围内，PT接近到期日时，交易收益率的资本效率得到提高。

此外，通过受Notional Finance启发而实现的一个pseudo-AMM，我们只需单一的流动性池就能实现PT和YT的交易。通过一组PT/SY流动性池，PT可与SY直接交易，而YT交易则通过闪电交易进行。

## Swaps

PT和YT两者都可以随时在Pendle上通过单一的流动性池进行交易。这是通过支持闪电交换的pseudo-AMM实现的。

Pendle V2中的流动性池设置为PT/SY，例如PT-aUSDC / SY-aUSDC。交易PT是一个简单的过程，只需在池中的两种资产之间进行交换，而通过闪电交换也可以在同一池中进行YT交易。

> 透过我们内置的自动路由，您可使用任何主要资产交易PT和YT。

## 闪电交换

基于PT和YT之间的固定关系，我们可以实现闪电交换。PT和YT可以从其底层的SY中铸造和赎回，价格关系可以表达为:
$$$
P(PT) + P(YT) = P(Underlying)
$$$

YT价格与PT价格呈反向相关，我们使用这个价格关系，利用PT/SY池进行YT的交换。

购买YT:
1. 买方向交换合约发送SY（透过自动路由，可使用任何主要代币）
2. 合约从流动性池中提取更多的SY
3. 从所有的SY中铸造PT和YT
4. 将YT发送给买方
5. 将PT出售以换回SY，并返还步骤2中的金额

![Buying YT](/img/ProtocolMechanics/buying_yt.png "Buying YT")

出售YT:
1. 卖方向交换合约发送YT
2. 合约从流动性池中借出相应数量的PT
3. 将YT和PT合并赎回对应的SY
4. 将卖方应得的SY发送给卖方（或透过路由交换成任何主要代币，如ETH、USDC、wBTC等）
5. 将馀下的SY出售交换为PT以返还步骤2中的金额

![Selling YT](/img/ProtocolMechanics/selling_yt.png "Selling YT")

## 关键特点

### 最小化无常损失 (IL)

Pendle V2的设计确保无常损失（IL）是可以忽略的。Pendle的AMM通过移动AMM曲线，来推动PT价格随时间流动趋近其底层价值，从而实现了PT的自然价格升值，抵消了基于时间值的IL。

除此之外，由于LP的资产（例如PT-stETH/SY-stETH）高度相关，因此交易带来的IL也被缓解了。因为PT基本上会朝着底层资产升值，所以，如果提供流动性直到到期，LP的头寸将等同于完全持有底层资产。

在到期前的大多数情况下，PT的交易通常在一特定收益率范围内波动，并不像资产的现货价格那样波动。例如，合理的时间范围内，可以合理地假设Aave的USDC借贷利率在0%-15%之间波动（因此PT也相应地在该收益率范围内交易）。这个前提确保了任何给定时间点的IL都很低，因为PT价格不会在提供流动性时太远离。

### 可定制的AMM

![Customizable AMM](/img/ProtocolMechanics/customizable_amm.png "Customizable AMM")

Pendle的AMM曲线可以进行定制，以适应收益率波动不同的代币。收益率通常具有周期性，通常在高峰和低谷之间摆动。通常，某某流动资产的收益率底线和顶线，比其价格更容易预测。

例如，质押的ETH的年收益率大概在0.5-7%的范围内波动。了解资产的大致收益率范围，使我们能够在该范围内集中流动性，从而在更低的滑点下实现更大的交易规模。

### 更高的资本效率

_对于提供流动性的LP而言_
由于YT交易和PT/SY交易都将路由到同一个池子，LP可以从单个流动性提供中获得PT和YT两者交易费用，使LP的收益翻倍。

_对于交易者而言_
对于交易者而言，将YT和PT集中在一个PT/SY池中，而不是分别放在不同的池中，将带来更好的深度和流动性。这将允许交易者进行更大交易量的交易而无需担心太大的滑点，从而赋予交易者更高的价格确定性。
