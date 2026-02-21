---
hide_table_of_contents: true
---

# Points & Rewards Tracking

This guide covers how partner protocols can track and distribute points-based rewards (e.g., EigenLayer points, Renzo Miles, Ethena Sats) to Pendle users.

## Overview

Many Pendle pools offer additional rewards in the form of points from integrated protocols. Pendle provides standardized tools to help partners manage the complexity of tracking points across YT holders, LP positions, and liquid lockers.

## The Balance Fetcher

The recommended approach for tracking points is to use the **[`pendle-generic-balance-fetcher`](https://github.com/Pendle-Finance-Periphery/pendle-generic-balance-fetcher)** script.

### Core Functionality

The script returns a user's balance snapshot at a specific block height. The output is a mapping of `user_address => implied_yield_share`, representing each user's proportional share of the underlying asset held in the SY contract.

### What It Handles

The balance fetcher correctly accounts for all of Pendle's internal nuances:

| Factor | How it's handled |
|--------|-----------------|
| **LP Boosting** | Applies the yield boost (up to 2.5x) for eligible stakers |
| **YT Fee** | Accounts for the 5% fee applied to YT yields, allocated to the protocol |
| **Liquid Lockers** | Integrates with APIs from Penpie and Equilibria to track end-user balances within their contracts |
| **Post-Expiry** | Correctly attributes points for expired but unredeemed positions |

### Partner Responsibility

The partner protocol is responsible for:
1. Running the balance fetcher script
2. Using the output to calculate the pro-rata distribution of points
3. Displaying it on their own dashboard

Pendle does **not** handle the final distribution of partner points.

## Points Calculation Logic

### YT Holders

For point calculation purposes, **1 YT is treated as equivalent to 1 unit of the underlying SY asset**, regardless of the YT's market price. It earns the same amount of points as if you were holding the full underlying asset.

A **5% fee** is applied to points earned from YT holdings. This fee is allocated to Pendle governance.

### LP Holders

For LPs, only the **SY portion** of the LP position earns points. The PT portion does not. The ratio of SY to PT within an LP position is dynamic and changes with every trade.

No points fee is applied to LP positions. However, LP point earnings are influenced by the **LP boost** mechanism (up to 2.5x).

### Calculating User Proportion (LP)

A user's proportional share of a liquidity pool is calculated using `activeBalance`:

```
User Proportion = activeBalance(user) / totalActiveSupply
```

Query these values from the LP contract:
- `LP_Contract.activeBalance(userAddress)`
- `LP_Contract.totalActiveSupply()`

### Calculating Total Point-Earning Position

To find a user's total point-earning position, sum contributions from YT and LP:

**Step 1: YT Contribution**
- Get user's YT balance (e.g., 100 YT-ezETH)
- Apply 5% fee: `100 × 0.95 = 95`
- Point-earning amount from YT = **95 ezETH**

**Step 2: LP Contribution**
- Calculate user's proportion using the `activeBalance` formula above
- Query total SY in LP: `SY_Contract.balanceOf(LP_Contract_Address)`
- `LP SY Share = User Proportion × Total SY in LP`

**Step 3: Total**
```
Total Point-Earning Position = (YT Balance × 0.95) + LP SY Share
```

This final value (in terms of the underlying asset) is used to calculate the user's point allocation.

### Multipliers

Points programs often involve multiple layers of multipliers, which are **multiplicative**:

**Example (Zircuit & Renzo Points):**
- Zircuit Base: 1x for ETH, 2x for ezETH
- Pendle Pool: 2x Zircuit multiplier, 1x Renzo multiplier
- **Effective Zircuit Points**: `(2x ETH base) × (2x Pendle) = 4x` the base ETH emission rate
- **Effective Renzo Points**: `(1x Renzo base) × (1x Pendle) = 1x` the base Renzo emission rate

## Eligible Positions

Points are allocated to positions with exposure to the underlying yield:

| Position Type | Earns Points? | Notes |
|--------------|--------------|-------|
| **YT holders** | Yes | Full share (minus 5% fee) corresponding to 1 unit of the underlying asset per YT |
| **LP holders** | Yes | Proportional to the SY portion of their LP position only |
| **Liquid locker holders** | Yes | Via Penpie, Equilibria, etc. — their underlying position is still an LP token |
| **PT holders** | No | PT holders forgo all variable yield and points |

## LP Boost on Points

The up-to-2.5x boost applies to points earned by the **SY portion of an LP position**. It does **not** apply to points earned by holding YT.

Boosting is a **zero-sum redistribution** of rewards within the LP pool. Boosting one user's share means other, non-boosted LPs receive a comparatively smaller share of the total points allocated to the pool's SY component.

## External Reward Distribution

### Merkl Integration

For campaigns that use [Merkl](https://merkl.angle.money/) to distribute rewards, Pendle enables users to claim directly from the Merkl UI. The SY contract can be configured to claim rewards from Merkl and distribute them to end-users.

### Direct Airdrops

Pendle can assist partners by providing necessary user balance data to facilitate direct airdrops. For rewards sent to liquid locker contracts, the liquid locker protocol is responsible for the final distribution.
