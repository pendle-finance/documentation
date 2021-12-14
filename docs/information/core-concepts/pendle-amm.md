---
sidebar_position: 2
---

# Pendle AMM

The Pendle AMM aims to minimize time-dependent impermanent loss that arises from the provision of liquidity using tokens with time decay.


## The Math behind Pendle's AMM

The Pendle AMM observes the formula:

$$$
x^{\alpha_{i+1}} \cdot y^{\beta_{i+1}} = x_i^{\alpha_{i+1}} \cdot y_i^{\beta_{i+1}}
$$$

where

$\alpha$: the weight of $x$ at $time = i + 1$<br />
$\beta$: the weight of $y$ at $time = i + 1$<br />
$x_i$ and $y_i$: the equilibrium point of $x$ and $y$ at $time = i$

At $time = 0$, $\alpha$ and $\beta$ are initiated at 0.5, the quantity of Token X and Token Y is initiated by the market creator which translates to $x$ and $y$. The curve will resemble Uniswap's constant product curve. When a swap happens, the equilibrium point shifts along the curve. At subsequent time step $time = i$, $\alpha$ and $\beta$ will change with the following formulas:

$$$
\alpha_{i+1} = \alpha_i - \epsilon_i
\beta_{i+1} = \beta_i + \epsilon_i
$$$

where

$$$
\epsilon_i = \cfrac{\alpha_i \cdot \beta_i \cdot (1 - R_i)}{(R_i \cdot \alpha_i) + \beta_i} \\
R_i = \cfrac{p(t_{now})}{p(t_{eq})} \\
p(t) = \cfrac{ln(3.14 \cdot t+1)}{ln(4.14)} \\
t(T) = \cfrac{T_{end} - T}{T_{end} - T_{start}} \\
t_{now} = t(T_{now}) \\
t_{eq} = t(T_{eq})
$$$

$t$: time to maturity from 1 to 0
$T$: UNIX timestamp
$T_{start}$: contract start timestamp
$T_{end}$: contract end timestamp

The changing weights of X and Y cause changes in the shape of the curve.

![Graph](/img/core-concepts/pendle-amm-1.png)

The pivot point for curve shifting is the equilibrium point of X and Y at the time of curve shift. Swapping between X and Y changes the equilibrium point, and the pivot point for curve shift will vary accordingly.

At time close to $T_{end}$, the slope of the curve will be near zero. And reaches zero at $T_{end}$.


## Curve Shifting

The Pendle curve shifting algorithm closely resembles the concept of option pricing models, where price decays more drastically towards the end of the contract than at the beginning. The magnitude of price decay over time is represented by the p(t) formula outlined in the section above.

The motivation for the constants chosen for the above formula is the fact that the price loses about 1/3 of its original value (at the beginning of the contract period) when time to maturity reaches 50%.

<figure>
  <img src="/img/core-concepts/pendle-amm-2.png" alt="Graph" />
  <figcaption>The function of price (fraction) w.r.t. time remaining to maturity</figcaption>
</figure>


## Fees

There will be a default 1% swap fee for all trades against liquidity pools on the Pendle's AMM. This fee will be adjustable via governance proposals and voting once it goes live.

The Pendle AMM is designed to support a protocol-level exit fee to be used to support continual work on the Pendle platform. However, it is currently being set to 0% and will be changeable via governance proposals if deemed necessary.


# LP Token Issuance/Burning

The LP token issuance will be in proportion to the liquidity provided to the pool.

### Liquidity Provision

Taking inspiration from Balancer, for a generic joinMarketByAll, the LP tokens received by the depositor is the ratio of deposited tokens to the current reserves of the token in the pool. In other words:

$$$
inAmount = (\cfrac{totalLP + outAmount LP}{totalLP} - 1) \cdot B_{in}
$$$

derives to

$$$
outAmountLp = (\cfrac{inAmount}{B_{in}}) \cdot totalLp
$$$

where

$B_{in}$: inTokenReserve.balance <br />
$W_{in}$: inToken Reserve.weight

### Liquidity Withdrawals

Without considering the swapFee, the liquidity withdrawal formula is the inverse of that provision (without swapFee considerations).

With swapFee, adapting from Balancer, the formula for outAmountToken given inAmountLp is:

$$$
outAmountToken = B_{out} \cdot (1 - (1 - \cfrac{inAmountLp}{totalLp})^{\cfrac{1}{W_{out}}}) \cdot (1 - (1 - W_{out}) \cdot swapFee)
$$$

where

$B_{out}$: outTokenReserve.balance <br />
$W_{out}$: outTokenReserve.weight