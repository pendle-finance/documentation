---
hide_table_of_contents: true
---

# vePENDLE

Pendle's governance relies on Vote-escrowed PENDLE, also known as vePENDLE, which enables a higher degree of decentralization. By utilizing vePENDLE, PENDLE holders gain access to an array of features that increase the token's utility.

vePENDLE also serves as an additional sink for reducing the supply of PENDLE tokens, thereby increasing the token's stability and the overall robustness of the protocol. In this way, vePENDLE serves as an important tool for maintaining the long-term health and success of the Pendle ecosystem.

## Getting vePENDLE

Lock PENDLE and receive vePENDLE. Your vePENDLE value is proportional to the amount and duration staked (up to a maximum of 2 years). Tutorial [here](./Guides/Lock). Each wallet is associated with a single vePENDLE expiry date.

Your vePENDLE value will decay over time, and reaches zero once the lock duration is over. Your staked PENDLE will then be unlocked.

![vePENDLE Value Over Time](/img/ProtocolMechanics/vependle_value.jpg "vePENDLE Value Over Time")

To increase your vePENDLE value, you can choose to extend your staking duration and/or increase your staked amount.

## Incentive Channelling

vePENDLE powers the incentive channeling mechanism on Pendle. vePENDLE holders vote for and direct the flow of rewards to different pools, effectively incentivizing liquidity in the pool they vote for.

Intuitively, the higher your vePENDLE value, the more incentives you are entitled to channel.

A snapshot of all votes is taken at the start of every epoch on Thursday, 00:00 UTC and the incentive rates for each pool will be adjusted accordingly.

![Epoch Snapshots](/img/ProtocolMechanics/epoch_snapshots.jpg "Epoch Snapshots")

Voting for a pool also entitles vePENDLE holders to 80% of the swap fees collected by the pool, distributed pro rata between all voters of the pool.

## Fees and Rewards

Pendle collects a 3% fee from all yield accrued by YT. Currently, 100% of this fee is distributed to vePENDLE holders, while the protocol collects no revenue. This is subject to change in the future.

A portion of yield from matured unredeemed PTs will be distributed pro rata to vePENDLE holders as well. 

For example, matured PT-aUSDC is equivalent to aUSDC. If left unredeemed, all of its yield will be converted to a stablecoin and collected by the protocol as protocol revenue, and distributed to vePENDLE holders. 

All of these rewards will be converted to USDC regardless of where your vePENDLE is being held and distributed periodically by a disbursement contract.

## vePENDLE APY

The interests collected from YT and matured PT rewards constitute the vePENDLE _Base APY._

![vePENDLE Voter APYs](/img/ProtocolMechanics/vependle_voter_apys.png "vePENDLE Voter APYs")

On top of this, vePENDLE voters are also entitled to receiving 80% of the swap fees from voted pools, which constitute the _Voter's APY_. 

Together, _Base APY + Voter's APY_ determine the total rewards you will receive.

_Base APY + Highest Possible Voter's APY_ is the highest amount of rewards that you can receive from vePENDLE (i.e. vePENDLE Max APY).

![vePENDLE Base/Max APYs](/img/ProtocolMechanics/vependle_base_max_apys.png "vePENDLE Base/Max APYs")

For more information and stats about vePENDLE, visit our in-app [Community Dashboard](https://app.pendle.finance/vependle/stats).

## LP Reward Boost

If you LP in a pool while you are holding vePENDLE, your PENDLE incentives and rewards for all of your LPs will be further boosted as well, by up to 250% based on your vePENDLE value.

![Boost received against vePendle](/img/ProtocolMechanics/vependle_boost.jpg "Boost received against vePendle")

Although your vePENDLE value decays over time, your LP boost rate is calculated at the time the boost is first applied. The boost rate will remain constant until you update your LP positions, in which case the rate will change based on your current vePENDLE value.

To receive boosted rewards, you should lock your PENDLE into vePENDLE first before LPing.

If you are already LPing and want to boost your rewards with vePENDLE, you have to manually [apply the boost](./Guides/ApplyBoost) after voting for the pool.

For cross-chain reward boosts (e.g. boosting LP positions on Arbitrum), you will first need to to synchronize your vePENDLE balance from Ethereum before the boost can be applied.

![vePENDLE Cross-chain Reward Boosts](/img/ProtocolMechanics/vependle_crosschain.png "vePENDLE Cross-chain Reward Boosts")
