---
sidebar_position: 2
---

# Yield Tokenization for LP Tokens

:::note
The yield tokenization and yield accrual mechanism for LP tokens are similar to that of Compound's c-tokens.
:::

In a typical $x * y = k$ AMM like Sushiswap / Uniswap, $k$ represents the size of the pool. Upon liquidity addition, the liquidity provider receives LP tokens to represent his share of the pool. The share of the pool is quantified by $\sqrt{K}$ — a unit called *Liquidity*.

$$$
Liquidity = \sqrt{qtyTokenX \cdot qtyTokenY}
$$$

LP tokens represent the amount of Liquidity that an LP is entitled to. [Learn more](https://docs.uniswap.org/protocol/V2/concepts/core-concepts/pools).

Swap fee is incurred on the transaction sender whenever a swap occurs. The swap fee added to the pool increases the size of the pool, increasing the value of *Liquidity*. Hence, when swaps occur, the *Liquidity* owned by each LP increases.

In other words, the amount of *Liquidity* per unit LP token increases as swaps occur. (1 LP tokens will be worth more unit of *Liquidity*)

## LP Token Yield Tokenization

1 YT-LP represents the yield from 1 unit of *Liquidity*.

Yield for LP position is equivalent to the swap fees generated in a fixed time period. As swap fee incurred is added to the liquidity pool, yield accrued will be in the form of LP tokens.

1 OT represents the ownership of 1 unit of Liquidity (redeemable for 1 unit of *Liquidity* at expiry, NOT number of LP tokens).

To simply illustrate this, when LP token is deposited into Pendle, the amount of *Liquidity* it represents at that point in time is represented by *OT*. As swap happens, *YT* holders receive the extra *Liquidity* that the LP token accrues.

## Example

### 1st Jan 2022:

Let's say that at the very start, the PENDLE/ETH pool on Sushiswap has 10 ETH and 1000 PENDLE. We'll subsequently refer to this pool as *PE*.

* Amount of liquidity of the pool = $\sqrt{10 \cdot 1000}$ = 100 liquidity
* Initially, the total amount of LPs is also exactly 100 LPs
* 1 LP = 1 liquidity = 0.1 ETH + 10 PENDLE

### 1st July 2022:

After some swaps, the *PE* pool could have 11 ETH and 1100 PENDLE

* Amount of liquidity of the pool now = $\sqrt{11 \cdot 1100}$ = 110 liquidity
* The total amount of LPs is still 100 LPs (we assume no-one has entered or left the pool, for the sake of simplicity)
* 1 LP = 1.1 liquidity = 0.11 ETH + 11 PENDLE

Let's say user A tokenizes 10 PE SLP (=11 liquidity) in Pendle now, A will receive 11 OT-PE-Dec2022 and 11 YT-PE-Dec2022. A transfers the 11 YT to B

* By holding 11 OT-PE-Dec2022, A is entitled to receive 11 liquidity after the expiry (which will be paid in terms of LP tokens)
  * Currently, 11 liquidity is equivalent to 1.1ETH + 110 PENDLE (10% of the Sushiswap pool)
* By holding 11 YT-PE-Dec2022, B is entitled to receive swap fees (in terms of LP tokens) from the moment B started holding the YT, until the expiry. If B transfers away the YT at some point, B will only receive the swap fees up to that point

### 1st Jan 2023:

After more swapping on Sushiswap happened, the PE pool could have 6 ETH and 2400 PENDLE

* Amount of liquidity of the pool = sqrt(6 * 2400) = 120
* The total amount of LPs is still 100 LPs
* 1 LP = 1.2 liquidity = 0.06 ETH + 24 PENDLE

A can now redeem his 11 OT-PE-Dec2022:

* 11 liquidity is equivalent to 11/120 = 9.17% of the Sushiswap pool = 0.55 ETH + 220 PENDLE
* 11 liquidity is equivalent to 9.17 LP now
* As such, A will get back 9.17 LP token

B has held 11 YT-PE-Dec2022 from 1st July 2022 to 1st Jan 2023, and will get the swap fees on 11 liquidity for this whole period:

* 1st July 2022: 11 liquidity was equivalent to 10 LPs
* 1st Jan 2023: 10 LPs now will be worth 10*1.2 = 12 liquidity. Therefore, the swap fees gained was 12-11 = 1 liquidity. Exchanged into LPs, this is equivalent to 1/12 = 0.83 LPs

We can see that 9.17 + 0.83 = 10. Essentially, the ownership of 10 LPs on 1st Jul 2022 was split into the ownership of the underlying liquidity for OT, and the swap fees for YT.
