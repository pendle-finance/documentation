---
hide_table_of_contents: true
---

# AMM

Pendle 的 V2 AMM 是专门设计用于交易收益，并利用了 PT 和 YT 的行为。

AMM 模型是从 Notional Finance 的 AMM 改编而来的。AMM 曲线会随着时间推移而变化，以考虑随时间累积的收益，并在 PT 接近到期时缩小价格范围。通过将流动性集中到一个狭窄而有意义的范围内，随着 PT 接近到期，交易收益的资本效率得到了提高

此外，我们成功创建了一个伪 AMM，使我们能够只使用单一流动性池来促进 PT 和 YT 的交换。通过 PT/SY 池，可以直接交换 PT 和 SY，同时也可以通过闪电交换实现 YT 交易。

## 流动性提供者（LP）

Pendle V2 上的流动性由 PT/SY 组成（其中 SY 只是底层产生收益资产的一种包装版本）。这意味着 LP 从以下方面获得收益：

1. PT 固定收益
2. 底层收益（SY 收益）
3. 交换费（来自 PT 和 YT 交换）
4. $PENDLE 激励

## 交换

Pendle 上的 PT 和 YT 随时可交易，只需一个流动性池即可。这是通过实现一个具有闪电交换的伪 AMM 实现的。

Pendle V2 中的流动性池设置为 PT/SY，例如 PT-aUSDC / SY-aUSDC。交换 PT 是一个简单的过程，即在池中的两种资产之间进行交换，而通过闪电交换在同一池中也可以进行 YT 交易。

> 自动路由已内置，允许任何人与任何主要资产交易 PT 和 YT。

### 闪电交换 {#flash-swaps}

由于 PT 和 YT 之间的关系，闪电交换是可能的。由于 PT 和 YT 可以从其底层 SY 铸造和兑换，我们可以表达价格关系：
$$
P(PT) + P(YT) = P(\text{Underlying})
$$

知道 YT 价格与 PT 价格呈反比关系，我们利用这种价格关系来利用 PT/SY 池进行 YT 交换。

购买 YT：
1. 买方将 SY 发送到交换合约（从任何主要代币自动路由）
2. 合约从池中提取更多 SY
3. 从所有 SY 铸造 PT 和 YT
4. 将 YTs 发送给买方
5. PT 将出售为 SY，以返还步骤 2 中的金额

![Buying YT](/img/ProtocolMechanics/buying_yt.png "Buying YT")

卖出 YT：
1. 卖方将 YT 发送到交换合约
2. 合约从池中借出相等数量的 PT
3. 使用 YTs 和 PTs 兑换 SY
4. 将 SY 发送给卖方（或自动路由到任何主要代币，例如 ETH、USDC、wBTC 等）
5. 将部分 SY 出售给池，以返还步骤 2 中的金额

![Selling YT](/img/ProtocolMechanics/selling_yt.png "Selling YT")

## 到期的 LP

在到期时，LP 可以在单个交易中执行 Zap Out + 兑换 PT 为底层资产 + 索取奖励：

1. 访问 [Pendle App](https://app.pendle.finance/trade/pools)，切换到“Inactive”池列表
2. 选择一个池
3. 切换到“Claim All Pool Rewards”
4. 选择一个输出资产。Pendle 将自动为您执行兑换 PT 为底层 > 解包 SY > 执行交换（如果需要）

## 主要特点

### 极小的无常损失（IL）

Pendle V2 的设计确保无常损失是可以忽略的。Pendle 的 AMM 考虑了 PT 的自然价格增值，通过调整 AMM 曲线，随着时间的推移将 PT 价格推向其底层价值，减轻了时间相关的无常损失（到期时无 IL）。

此外，通过交换产生的无常损失也得到了减轻，因为 LP 的两种资产都与对方高度相关（例如 PT-stETH / SY-stETH）。如果提供流动性直到到期，LP 的头寸将等同于完全持有底层资产，因为 PT 本质上会向底层资产增值。

在到期之前的大多数情况下，PT 交易在一个收益范围内，并且不像资产的现货价格那样波动。例如，可以合理地假设 Aave 的 USDC 借贷利率在 0%-15% 的范围内波动一段合理的时间（相应地，PT 将在该收益范围内交易）。这个前提确保了在任何给定时间点的低 IL，因为 PT 价格不会偏离提供流动性的时间太远。

### 可定制的 AMM

![Customizable AMM](/img/ProtocolMechanics/customizable_amm.png "Customizable AMM")

Pendle 的 AMM 曲线可以定制，以适应具有不同收益波动性的代币。收益通常是循环性的，通常在高点和低点之间波动。通常，流动性的底部和顶部比资产的价格更容易预测。

例如，质押 ETH 的年收益可能在 0.5-7% 的范围内波动。了解一个资产的粗略收益范围使我们能够将流动性集中在该范围内，从而在更低的滑点下进行更大规模的交易。

然而，如果池子的隐含收益超出了其设定的范围，流动性将会太低，无法进一步推动它朝着该方向发展。使用上面的例子，如果 stETH 池的隐含收益超过了 7%，购买 YT（或卖出 PT）可能不再可能。

要检查池的设定收益范围，请单击如下截图中的符号。

![Market Info](/img/ProtocolMechanics/market_info.png "Market Info")

### 更大的资本效率

_对于流动性提供者_
由于 YT 交易通过相同的 PT/SY 池路由，LP 可以从单一流动性提供中获得来自 PT 和 YT 交易的费用，使 LP 的收益翻倍。

_对于交易者_
与为 YT 和 PT 分别建立不同的池子相比，在一个 PT/SY 池中集中所有代币将产生更大的流动性。这将允许交易者进行更大规模的交易，而不必担心太多滑点，为交易者提供更大的价格确定性。