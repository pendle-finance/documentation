---
hide_table_of_contents: true
---

# vePENDLE

Pendle’s governance is powered by Vote-escrowed PENDLE, or vePENDLE.

vePENDLE enables Pendle to be further decentralized. With vePENDLE, an array of new features are unlocked for PENDLE holders, increasing the utility of the token.

As a result, it also creates another sink for the PENDLE token, giving more stability to the price of the token and to the protocol.

## Getting vePENDLE

Lock PENDLE and receive vePENDLE. Your vePENDLE value is proportional to the amount and duration staked (up to a maximum of 2 years). Tutorial [here](Guides/Lock.md). Each wallet is associated with a single vePENDLE expiry date.

Your vePENDLE value will decay over time, and reaches zero once the lock duration is over. Your staked PENDLE will then be unlocked.

![vePendle Value Over Time](/img/governance/vependle_value.jpg "vePendle Value Over Time")

To increase your vePENDLE value, you can choose to extend your staking duration and/or increase your staked amount.

## Earn Protocol Fees

Pendle collects a 3% fee from all yield accrued by YT. Currently, 100% of this fee is distributed to vePENDLE holders, while the team collects no revenue. This is subject to change in the future.

A portion of yield from matured unredeemed PTs will be distributed pro rata to vePENDLE holders as well. 

For example, matured PT-aUSDC is equivalent to aUSDC. If left unredeemed, all of its yield will be converted to a stablecoin and collected by the protocol as protocol revenue, and distributed to vePENDLE holders. 

All of these rewards will be converted to USDC and distributed every 2 epochs via Ethereum, regardless of where your vePENDLE is being held. Each epoch starts at Thursday, 00:00 UTC. 

## Incentive Channelling

vePENDLE powers the incentive channelling mechanism on Pendle. vePENDLE holders vote for and direct the flow of rewards to different pools, effectively incentivizing liquidity in the pool they vote for.

Intuitively, the higher your vePENDLE value, the more incentives you are entitled to channel.

A snapshot of all votes is taken at the start of every epoch at Thursday, 00:00 UTC and the incentive rates for each pool will be adjusted accordingly.

![Epoch Snapshots](/img/governance/epoch_snapshots.jpg "Epoch Snapshots")

Voting for a pool also entitles vePENDLE holders to 80% of the swap fees collected by the pool, distributed pro rata between all voters of the pool.

## LP Reward Boost

If you LP in a pool while you are holding vePENDLE, your PENDLE incentives and rewards for all of your LPs will be further boosted as well, by up to 250% based on your vePENDLE value.

![Boost received against vePendle](/img/governance/vependle_boost.jpg "Boost received against vePendle")

Although your vePENDLE value decays over time, your LP boost rate is calculated at the time the boost is first applied. The boost rate will remain constant until you update your LP positions, in which case the rate will change based on your current vePENDLE value.

To receive boosted rewards, you should lock your PENDLE into vePENDLE first before LPing.

If you are already LPing and want to boost your rewards with vePENDLE, you have to manually [apply the boost](Guides/ApplyBoost.md) after voting for the pool.
