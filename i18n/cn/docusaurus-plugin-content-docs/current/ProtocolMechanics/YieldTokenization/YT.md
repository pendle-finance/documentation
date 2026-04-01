---
hide_table_of_contents: true
---

# YT

<iframe width="860" height="615" src="https://www.youtube.com/embed/RHuqNScvrnw" title="Chapter 5: What is Yield Token (YT)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

收益代币（YT）代表底层生息资产的收益部分。

持有 YT 期间，底层资产的收益将持续流向用户，直至到期日。这一收益产出速率在 Pendle 应用中以「[底层 APY](https://docs.pendle.finance/ProtocolMechanics/Glossary)」表示。

例如，买入 10 个 YT-wstETH（stETH）并持有 5 天，即可获得等同于在同一时期持有 10 个 stETH 所产生的全部收益。

### 杠杆收益敞口

由于 YT 的购买价格仅为底层资产价格的一小部分，它提供了对收益的**杠杆敞口**。底层 APY 的小幅变动可能导致 YT 回报率发生显著的百分比变化，使 YT 成为收益投机和积分挖矿的强力工具。

### 价值衰减

*在其他条件不变（ceteris paribus）的情况下*，YT 的价值随到期日临近趋向 $0，到期时价值归零。若隐含收益率保持不变，YT 的价格随剩余时间线性递减——剩余 15 天的 YT 价格约为剩余 30 天时的一半。当持有期间累积的收益总额超过购买 YT 的成本时，用户实现盈利。

可以将 [Implied APY](https://docs.pendle.finance/ProtocolMechanics/Glossary) 理解为市场对 YT 定价的「利率」。若底层 APY 的实际平均值高于你购入时的 Implied APY，则可获利。

因此，买入 YT 可视为对某资产收益的「做多」。

### 积分挖矿

YT 是一种流行的空投积分挖矿工具，因为它能捕获底层资产的全部积分，且通常具有相当的杠杆倍数。由于 1 个 YT 与 1 单位底层资产获得的积分相同，而 YT 的成本仅为底层资产的一小部分，用户可以获得数倍的积分敞口。

更多收益交易内容请访问[此处](https://app.pendle.finance/trade/education/learn)。

注意：YT 收益以 SY 的形式分发，可通过 [SY 解封工具](https://docs.pendle.finance/ProtocolMechanics/YieldTokenization/SY)解封为底层资产。

# 领取 YT 收益

![Claiming YT Yield](/pendle-docs/imgs/ProtocolMechanics/claiming-yt-yield.png "Claiming YT Yield")

你可以随时从 [Pendle Dashboard](https://app.pendle.finance/trade/dashboard/overview?timeframe=allTime&inUsd=false) 领取已累积的 YT（及 LP）收益和奖励，无需等到到期日。

由于 YT 到期价值为 $0，除领取收益外无需采取其他操作。
