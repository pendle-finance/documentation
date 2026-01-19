# sPENDLE

:::info[sPENDLE buybacks will commence on Jan 29th 00:00 UTC, and will begin to distribute yields after 2 weeks.]
:::

sPENDLE is Pendle’s native governance token that distributes protocol rewards for active participation in the ecosystem. As a staked version of PENDLE, sPENDLE aligns the interest of various stakeholders while contributing to token stability and overall robustness of the Pendle protocol.

## Staking and Unstaking
PENDLE may be staked to receive sPENDLE instantly at a 1:1 ratio.

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
A snapshot of sPENDLE balances is taken whenever a PPP is created and determines the voting power of each user. This **does not** include virtual sPENDLE balances.

sPENDLE held in whitelisted smart contracts is excluded from voting snapshots.

*Example: A holder with 5% of snapshotted sPENDLE receives 5% of that proposal’s votes.*

### Reward Distribution
A snapshot of active sPENDLE balances is taken every 14-days. This **does** include virtual sPENDLE balances. 

*Example: A holder with 10% of total active sPENDLE receives 10% of that epoch’s rewards.*

Rewards are distributed pro-rata to active sPENDLE holders.
