# sPENDLE

:::info[sPENDLE 回购将于 1 月 29 日 00:00（UTC） 开始，并将在 2 周后开始分发收益。]
:::

sPENDLE 是 Pendle 的原生治理代币，用于向活跃参与条件的用户分配协议收入。作为 PENDLE 的质押版本，sPENDLE 能够统一不同用户的利益，同时提升 Pendle 协议的代币稳定性与整体稳健性。

## 质押与解质押（Staking & Unstaking）
- PENDLE 可按 **1:1** 的比例质押，**即时**获得 sPENDLE
- sPENDLE 的数量不会随时间自动增加（不具备复利属性）

持有在用户钱包中的 sPENDLE 可享有：
- Pendle 生态内的**投票权**
- 若满足**活跃参与条件**，可按比例获得奖励分配

sPENDLE 可按 **1:1** 解质押为 PENDLE：
- 需等待 **14 天的退出期**
- 或选择**立即解质押**，需支付 **5% 手续费**

## 活跃参与与分红资格（Active Participation & Eligibility）
sPENDLE 持有者必须在某个 epoch（周期）内保持活跃，才能获得该周期的奖励。

仅在以下情况下，sPENDLE 持有者会被视为**不活跃**：
- 在存在 **Pendle 协议提案（Pendle Protocol Proposal-PPP）** 的期间内，未参与投票

若某段时间内**没有 PPP**，则所有 sPENDLE 均视为活跃并有资格获得奖励。

部署至**符合条件的 DeFi 集成协议**中的 sPENDLE，也始终被视为活跃状态。

## sPENDLE 收益（Yields）
- Pendle V2 的 **收益费用与交易费用** 中的 **80%** 将用于 **PENDLE 回购**
- 被回购的 PENDLE 中，**最多 100%** 将以 **sPENDLE 的形式**分配给活跃的 sPENDLE 持有者
- Pendle 协议因带积分资产产生的费用而获得的**空投**，将**原样分发**（不会用于回购）

当前 epoch 的回购资金来源于**上一 epoch 的费用**，并通过 **1 小时 TWAP（时间加权平均价格）** 执行。

来自回购及积分分配的奖励，可**随时**通过 Pendle dApp 进行领取。

## 计算机制（Accounting）

### 投票权（Voting Power）
- 每当创建一个 PPP 时，都会对 sPENDLE 余额进行一次快照，用于确定用户的投票权
- **虚拟 sPENDLE** 的投票权等同于其在 **vePENDLE 合约中锁定的 PENDLE 数量**
- 存放在**白名单智能合约**中的 sPENDLE 不计入投票快照

**示例：**

若某用户持有快照中 **5% 的 sPENDLE**，则其在该提案中拥有 **5% 的投票权**。

### 奖励分配（Reward Distribution）
- 每 **14 天** 对**活跃 sPENDLE 余额**进行一次快照（包含虚拟 sPENDLE）
- 奖励在 sPendle 页面领取

**示例：**
若某用户持有 **10% 的活跃 sPENDLE**，则可获得该 epoch **10% 的奖励**。
奖励将按比例分配给所有活跃的 sPENDLE 持有者。

# vePENDLE 忠诚度奖励（Loyalty Bonus）

![vePENDLE bonus timeline](/img/ProtocolMechanics/vependle_bonus_timeline.png "vePENDLE Bonus Timeline")

### vePENDLE 奖励时间线

**1 月 20 日**
- sPENDLE 质押功能上线

**1 月 29 日 00:00（UTC）**
- vePENDLE 锁仓暂停
- 对 vePENDLE 余额及锁定期限进行快照（用于计算虚拟 sPENDLE）
- 新的 PENDLE 激励结构开始
- vePENDLE 奖励倍数开始衰减

![vePENDLE bonus decay](/img/ProtocolMechanics/vependle_bonus_decay.png "vePENDLE Bonus Decay")

在此期间，现有 vePENDLE 持有者将根据以下因素获得**虚拟 sPENDLE 余额**：
- 锁定的 PENDLE 数量
- 距离完全解锁的剩余时间（以 1 月 29 日 00:00 UTC 的快照为准）

虚拟 sPENDLE **不可转让**。

- **最大倍数为 4×**（剩余 2 年解锁，即最大锁定期）
- 倍数会随时间逐渐衰减，并在解锁日降至 **1×**
- 完全解锁后，虚拟 sPENDLE 将失效

若 vePENDLE 持有者希望继续享受 sPENDLE 的权益，必须将 vePENDLE 兑换为 PENDLE，并重新质押为 sPENDLE。

![vePENDLE multiplier illustration](/img/ProtocolMechanics/vependle_bonus_illustration.png "vePENDLE Multiplier Illustration")

当所有用户均完成解锁后，sPENDLE 将成为 Pendle 生态中唯一的治理与收益代币。
