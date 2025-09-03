---
hide_table_of_contents: true
---

# YT

收益代币（YT）代表底层产生收益资产的收益部分。

持有 YT，底层资产的收益将在到期之前流向用户。此收益产生率在 Pendle 应用中表示为“[Implied APY](https://docs.pendle.finance/ProtocolMechanics/Glossary)”。

例如，购买 10 个 YT-stETH 并在 5 天内持有它们，您将在同一时间段内收到与在 Lido 上存入 10 个 ETH 等值的所有收益。

YT 的价值在接近到期时趋向于 $0$（其他条件不变），到期时变为 $0$。当到目前为止收集的总收益高于 YT 获取成本时，用户会获利。

您可以将 [Implied APY](https://docs.pendle.finance/ProtocolMechanics/Glossary) 视为市场定价 YT 的“速率”。如果平均底层 APY 最终高于您支付的“速率”或隐含 APY，您将获利。

因此，购买 YT 可以被视为对资产收益的“看涨”。

您可以在 Pendle 上学习更多有关收益交易的信息[此处](https://app.pendle.finance/trade/education/learn)。

注意：YT 收益以 SY 形式分发，可以使用 [SY Unwrapper](https://docs.pendle.finance/ProtocolMechanics/YieldTokenization/SY) 将其解包回底层资产。

# 索取 YT 收益

![Claiming YT Yield](/img/ProtocolMechanics/claiming-yt-yield.png "Claiming YT Yield")

您可以随时从 [Pendle 仪表板](https://app.pendle.finance/trade/dashboard/overview?timeframe=allTime&inUsd=false)索取任何已赚取的 YT（和 LP）收益和奖励，即使在到期之前。

由于 YT 在到期时等于 $0，因此除了索取收益外，不需要进一步操作。
