---
hide_table_of_contents: true
---

# 仪表板

仪表板旨在帮助 Pendle 用户管理所有仓位，提供投资组合的全面视图，让你轻松追踪在 Pendle 上的所有历史和当前表现。

来自收益代币（YT）和流动性提供（LP）仓位的已累积收益和奖励也可直接在此监控和领取。

## 概览

<figure>
  <img src="/pendle-docs/imgs/AppGuide/dashboard.png" alt="Dashboard" />
  <figcaption>仪表板上半部分提供仓位概览。</figcaption>
</figure>

#### 我的总余额（My Total Balance）

所选链上当前**活跃**仓位的美元总价值

#### 我的可领取收益和奖励（My Claimable Yield & Rewards）

所选链上来自 YT 和 LP 的全部累积收益和奖励，可[领取](https://docs.pendle.finance/AppGuide/Trade/Guides/Claim)

#### 排行榜（Leaderboard）

显示你在季节性排行榜上相较其他收益交易者的盈亏（P&L）排名。请注意，仅显示排名 ≥1000 的用户。点击[此处](https://app.pendle.finance/trade/dashboard/leaderboard/valuation)按钮可进入排行榜。

## 我的全部仓位（All My Positions）

仪表板下半部分按资产分解你的 Pendle 仓位，包括该资产的活跃仓位（PT、YT 或 LP）、总仓位价值及盈亏。

![All My Positions](/pendle-docs/imgs/AppGuide/all_my_positions.png "All My Positions")

点击「详情」可查看更完整的资产仓位视图，进一步按 PT、YT 和 LP 分解仓位，并附有动态盈亏图表（即将上线）。

![My Position](/pendle-docs/imgs/AppGuide/my_position.png "My Position")

「交易记录」标签显示与该资产相关的所有交易，包括按交易实现的利润。点击操作列下的操作（如「Claim Yield」或「LP Transferred Out」）可跳转至区块链浏览器上的交易页面。

![My Transactions](/pendle-docs/imgs/AppGuide/my_transactions.png "My Transactions")

## 仪表板查看模式

Pendle 为仪表板提供两种不同的查看模式：USD 模式和底层资产模式（Underlying Mode）。每种模式对仓位和盈亏的计算视角不同：

### USD 模式
USD 模式下，所有仓位和盈亏均以美元表示，对底层资产价格波动敏感——资产价格的任何变动都会直接影响你的盈亏和仓位价值。

### 底层资产模式（Underlying Mode）
底层资产模式使用底层资产数量计算所有仓位和盈亏，将财务指标与资产价格波动隔离。市价波动不影响你的盈亏或仓位估值，这些仅受 Pendle 内部的交易和事件影响。

### 汇总计算
无论选择哪种模式，总盈亏、仓位总价值和资本等汇总指标始终以 USD 计算，确保整体财务表现评估的清晰性和统一性。模式切换仅影响各资产数据的显示和计算方式。
