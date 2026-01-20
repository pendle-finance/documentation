# sPENDLE

:::info[sPENDLE buybacks will commence on Jan 29th 00:00 UTC, and will begin to distribute yields after 2 weeks.]
:::

sPENDLE is Pendle’s native governance token that distributes protocol rewards for active participation in the ecosystem. As a staked version of PENDLE, sPENDLE aligns the interest of various stakeholders while contributing to token stability and overall robustness of the Pendle protocol.

## Staking and Unstaking
PENDLE may be staked to receive sPENDLE instantly at a 1:1 ratio. sPENDLE **does not** increase in value over time.

sPENDLE held in a user’s wallet is eligible for:
- Voting power within the Pendle ecosystem
- Pro-rata share of reward distributions if they meet the active participation criteria

sPENDLE can be unstaked for PENDLE 1:1 after a 14-day withdrawal period, or immediately for a 5% fee.

## Active Participation & Eligibility
sPENDLE holders must be active to receive rewards during a given epoch.

sPENDLE holders are only considered inactive if they fail to vote during a period when a Pendle Protocol Proposal (PPP) is available. During a period without a PPP, all sPENDLE is considered active and eligible for rewards. sPENDLE deployed to eligible DeFi integrations are also considered active at all times.

## sPENDLE Yields
80% of Pendle V2 fees from **Yield** and **Swap Fees** are allocated to PENDLE token buybacks. Up to 100% of repurchased PENDLE will be distributed to active sPENDLE holders in the form of sPENDLE. Airdrops that Pendle Protocol receives as a result of fees from points-bearing assets will be distributed in kind (i.e. not used for buyback).

*Buybacks for the current epoch are sourced from fees from the previous epoch and executed via 1-hour TWAP.*

Rewards from buybacks and point distributions may be claimed from the Pendle dApp at any time.

## Accounting

### Voting Power
A snapshot of sPENDLE balances is taken whenever a PPP is created and determines the voting power of each user. Voting power for virtual sPENDLE balance is equal to the underlying PENDLE locked in the vePENDLE contract. 

sPENDLE held in whitelisted smart contracts is excluded from voting snapshots.

*Example: A holder with 5% of snapshotted sPENDLE receives 5% of that proposal’s votes.*

### Reward Distribution
A snapshot of active sPENDLE balances is taken every 14-days. This includes virtual sPENDLE balances. Rewards are distributed through merkle.

*Example: A holder with 10% of total active sPENDLE receives 10% of that epoch’s rewards.*

Rewards are distributed pro-rata to active sPENDLE holders.


# vePENDLE Loyalty Bonus

![vePENDLE bonus timeline](/img/ProtocolMechanics/vependle_bonus_timeline.png "vePENDLE Bonus Timeline")

__January 20th__
- sPENDLE staking goes live

__January 29th, 00:00 UTC__
- vePENDLE locks paused
- Snapshot of vePENDLE balance and lock duration (for virtual sPENDLE calculation)
- New PENDLE incentive structure commences

![vePENDLE bonus decay](/img/ProtocolMechanics/vependle_bonus_decay.png "vePENDLE Bonus Decay")

During this period, existing vePENDLE holders receive a virtual sPENDLE balance based on their PENDLE locked and time to full unlock during the snapshot at 00:00 UTC, January 29th. This virtual sPENDLE balance is non-transferable.

The maximum multiplier is 4x for 2 years to unlock (i.e. maximum unlock) and decays to 1x by the unlock date, after which the virtual sPENDLE balance expires. To continue receiving sPENDLE benefits, vePENDLE holders must redeem vePENDLE for PENDLE and stake it as sPENDLE.

![vePENDLE multiplier illustration](/img/ProtocolMechanics/vependle_bonus_illustration.png "vePENDLE Multiplier Illustration")

Once all users are fully unlocked, sPENDLE will be the sole governance and revenue token of the Pendle ecosystem.
