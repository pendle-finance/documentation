# sPENDLE

sPENDLE 是 Pendle 的原生治理代币，通过积极参与生态系统来分配协议奖励。作为 PENDLE 的质押版本，sPENDLE 协调各方利益，同时有助于代币稳定和 Pendle 协议的整体健壮性。

## 质押与解质押

PENDLE 可即时以 1:1 的比例质押获得 sPENDLE。sPENDLE **不会**随时间升值。

持有在钱包中的 sPENDLE 可享有：
- Pendle 生态系统内的投票权
- 满足活跃参与标准的情况下，按比例获得奖励分配

sPENDLE 可在 14 天取款等待期后以 1:1 解质押换回 PENDLE，或支付 5% 手续费立即解质押。

## 活跃参与资格

sPENDLE 持有者需保持活跃状态，才能在特定 epoch（周期）内获得奖励。

只有在有 Pendle 协议提案（PPP）期间未参与投票，才会被视为非活跃。在没有 PPP 的周期内，所有 sPENDLE 均视为活跃并有资格获得奖励。部署至符合条件的 DeFi 集成中的 sPENDLE 也始终被视为活跃。

## sPENDLE 收益

Pendle V2 来自**收益手续费**和**兑换手续费**的 80% 将用于回购 PENDLE。最多 100% 的回购 PENDLE 将以 sPENDLE 的形式分配给活跃 sPENDLE 持有者。Pendle 协议因积分相关资产的手续费而获得的空投将按原样分配（即不用于回购）。

*当前 epoch 的回购资金来源于上一 epoch 的手续费，并在当前 epoch 内以 1 小时为间隔通过 TWAP 执行。*

回购奖励和积分奖励每 2 周分发一次，可随时从 Pendle dApp 领取。

## 回购执行

协议手续费每 2 周归集一次并存入回购合约。资金到位后，合约在随后一周内以 1 小时为间隔通过 TWAP 执行 PENDLE 购买。

回购合约：[0x9e08C5499f953C6297A7755BcBcEd383b606896b](https://etherscan.io/address/0x9e08C5499f953C6297A7755BcBcEd383b606896b)

## 会计机制

### 投票权

每当 PPP 创建时，会对 sPENDLE 余额进行快照，以确定每位用户的投票权。虚拟 sPENDLE 余额的投票权等于 vePENDLE 合约中锁定的底层 PENDLE。

白名单智能合约中持有的 sPENDLE 不计入投票快照。

*示例：持有快照 sPENDLE 总量 5% 的用户，对该提案享有 5% 的投票权。*

### 奖励分配

每 14 天对活跃 sPENDLE 余额进行快照（含虚拟 sPENDLE 余额）。奖励通过 sPENDLE 仪表板（merkle 分发）领取。

*示例：持有活跃 sPENDLE 总量 10% 的用户，可获得该 epoch 奖励的 10%。*

奖励按比例分配给活跃 sPENDLE 持有者。


# vePENDLE 忠诚度奖励

![vePENDLE bonus timeline](/pendle-docs/imgs/ProtocolMechanics/vependle_bonus_timeline.png "vePENDLE Bonus Timeline")

**1 月 20 日**
- sPENDLE 质押正式上线

**1 月 29 日，00:00 UTC**
- vePENDLE 锁仓暂停
- 对锁仓余额和锁仓时长进行快照（用于计算虚拟 sPENDLE）
- 新 PENDLE 激励结构生效（参见[算法激励模块](./Incentives)）

![vePENDLE bonus decay](/pendle-docs/imgs/ProtocolMechanics/vependle_bonus_decay.png "vePENDLE Bonus Decay")

在此过渡期内，现有 vePENDLE 持有者将根据其在 1 月 29 日 00:00 UTC 快照时的 PENDLE 锁仓量和距完全解锁的时间，获得虚拟 sPENDLE 余额。虚拟 sPENDLE 余额不可转让。

最高倍率为 4 倍（对应 2 年解锁期，即最长锁仓），并在解锁日衰减至 1 倍，届时虚拟 sPENDLE 余额到期失效。要继续享受 sPENDLE 权益，vePENDLE 持有者需赎回锁仓的 PENDLE 并将其质押为 sPENDLE。

![vePENDLE multiplier illustration](/pendle-docs/imgs/ProtocolMechanics/vependle_bonus_illustration.png "vePENDLE Multiplier Illustration")

当所有用户完全解锁后，sPENDLE 将成为 Pendle 生态系统唯一的治理和收益代币。
