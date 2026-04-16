---
pagination_label: "AMM"
title: "AMM"
hide_table_of_contents: true
---

# AMM

Pendle V2 AMM 专为收益交易而设计，充分利用了 PT 和 YT 的特性。与在**价格区间**内集中流动性的标准 AMM 不同，Pendle AMM 将流动性集中在预配置的**收益区间**（即 Implied APY 区间）内。这使得在预期收益边界内的交易极为高效，大额交易的滑点更低。

该 AMM 模型改编自 Notional Finance 的 AMM。AMM 曲线会随时间推移调整以反映已累积的收益，并随 PT 临近到期日而收窄其价格区间（**动态曲线收紧**）。通过将流动性集中在有意义的窄区间内，随着 PT 临近到期，收益交易的资本效率得以提高。这种自动收紧反映了对未来收益不确定性的降低，是最小化无常损失的关键因素。

此外，我们实现了一种伪 AMM，可以仅使用单一流动性池同时支持 PT 和 YT 的兑换。在 PT/SY 池中，PT 可直接与 SY 交易，而 YT 交易也通过闪兑（flash swaps）实现。

### 手续费计算

与传统 AMM 按交易本金收取手续费不同，Pendle AMM 的手续费根据**所交易的收益**计算。这意味着手续费与到期时间相关——距到期日还有一年时进行的交易，手续费将远高于距到期日仅剩一个月时的同等交易。完整公式请参阅[手续费](../Mechanisms/Fees)。

## 流动性提供者（LP）

<iframe width="860" height="615" src="https://www.youtube.com/embed/AWceGmkv2pc" title="Chapter 6: Liquidity Provision on Pendle" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

Pendle V2 的流动性由 PT/SY 组成（SY 是底层生息资产的封装版本）。LP 可从以下来源获取收益：

1. PT 固定收益
2. 底层收益（SY 收益）
3. 交易手续费（来自 PT 和 YT 的兑换）
4. $PENDLE 激励

## 兑换

PT 和 YT 均可随时通过单一流动性池在 Pendle 上交易，这通过实现伪 AMM 与闪兑机制得以实现。

Pendle V2 的流动性池设置为 PT/SY，例如 PT-aUSDC / SY-aUSDC。PT 兑换是在两种资产间直接互换的简单过程，而 YT 兑换则通过同一池子的闪兑实现。

> 内置自动路由，任何人都可以用任何主流资产交易 PT 和 YT。

### 闪兑（Flash Swaps）

闪兑的可行性源于 PT 与 YT 之间的关系。由于 PT 和 YT 可以从底层 SY 铸造，也可以赎回为底层 SY，可以表达出以下价格关系：

$$
P(PT) + P(YT) = P(\text{Underlying})
$$

YT 价格与 PT 价格呈反向相关，利用这一价格关系，我们使用 PT/SY 池来实现 YT 的兑换。

买入 YT：
1. 买方将 SY 发送至兑换合约（从任意主流代币自动路由）
2. 合约从池中提取更多 SY
3. 用所有 SY 铸造 PT 和 YT
4. 将 YT 发送给买方
5. 将 PT 卖出换回 SY，归还步骤 2 中的借款

![Buying YT](/pendle-docs/imgs/ProtocolMechanics/buying_yt.png "Buying YT")

卖出 YT：
1. 卖方将 YT 发送至兑换合约
2. 合约从池中借入等量的 PT
3. 用 YT 和 PT 赎回 SY
4. 将 SY 发送给卖方（或路由为 ETH、USDC、wBTC 等主流代币）
5. 用部分 SY 向池子买入 PT，归还步骤 2 中的借款

![Selling YT](/pendle-docs/imgs/ProtocolMechanics/selling_yt.png "Selling YT")

## 到期 LP 处理

到期后，LP 可在单笔交易中完成快捷出池（Zap Out）+ 赎回 PT 为底层资产 + 领取奖励：

1. 访问 [Pendle Trade](https://app.pendle.finance/trade/pools) 并切换至「**非活跃**」("Inactive") 池子列表
2. 选择一个池子
3. 开启「**领取全部池子奖励**」("Claim All Pool Rewards")
4. 选择输出资产，Pendle 将自动完成「赎回 PT 为底层资产 → 解封 SY → 执行兑换（如需）」的全流程

## 核心特性

### 最小无常损失（IL）

Pendle V2 的设计确保无常损失几乎可以忽略不计。Pendle AMM 通过随时间推移调整曲线来推动 PT 价格趋向其底层价值，从而缓解时间相关的无常损失（到期时 IL 为零）。

此外，由于 LP 中的两种资产高度相关（例如 PT-stETH / SY-stETH），兑换造成的无常损失也得到了有效控制。若流动性持续提供至到期，LP 仓位将等同于完全持有底层资产，因为 PT 本质上会升值趋近于底层资产。

大多数情况下，到期前 PT 在收益区间内交易，波动幅度远小于资产的现货价格。例如，合理假设 Aave 的 USDC 借贷利率在一定时间内波动区间为 0%-15%（PT 也在该收益区间内交易），这一前提保证了任意时点的 IL 都较低，因为 PT 价格不会偏离提供流动性时的价格太远。

### 可定制 AMM

![Customizable AMM](/pendle-docs/imgs/ProtocolMechanics/customizable_amm.png "Customizable AMM")

Pendle AMM 曲线可根据不同收益波动率的代币进行定制。收益率通常具有周期性，在高点与低点之间波动。对于流动性资产，其收益率的下限和上限往往比现货价格更易预测。

例如，ETH 质押年收益率大概率在 0.5%-7% 的区间内波动。了解资产的大致收益区间后，我们可以将流动性集中在该区间内，从而以更低的滑点支持更大规模的交易。

但如果池子的隐含收益率超出设定区间，该方向的流动性将过于稀薄，无法继续推动。以上例为例，若 stETH 池的隐含收益率超过 7%，买入 YT（或卖出 PT）可能将不再可行。

要查看池子的设定收益区间，请点击下图所示位置的标志。

![Market Info](/pendle-docs/imgs/ProtocolMechanics/market_info.png "Market Info")

### 更高资本效率

_对于流动性提供者_
由于 YT 交易路由经过同一 PT/SY 池，LP 可从单次流动性提供中同时获取 PT 和 YT 兑换产生的手续费，LP 收益翻倍。

_对于交易者_
相比为 YT 和 PT 分别建立独立池子，将所有代币集中在 PT/SY 池中可以获得更充裕的流动性，允许交易者进行更大规模的交易而无需担心过多滑点，从而获得更高的价格确定性。
