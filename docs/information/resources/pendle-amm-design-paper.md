---
sidebar_position: 4
---

# Pendle AMM Design Paper

In the Pendle litepaper, we introduced the idea of tokenizing future yield in the form of a token, YT. YT represents ownership of the future yield flows of an underlying asset over a fixed time period.

The loose definition of the value of YT is the sum of all expected yield over a fixed period of time. YT is freely tradable and its price will fluctuate according to the shifting market expectations of future yield.


## Automated Market Makers (AMMs)

AMMs have proven their market fit, playing a core role in numerous decentralized exchanges.  In such constant function market maker models, traders and arbitrageurs execute trades against liquidity pools instead of specific counterparts.

Liquidity providers (LPs) provide liquidity to the pools. Trades are managed by contracts and LPs earn from any trading fees generated.
There are numerous advantages AMMs bring about that drive the ever-increasing adoption by crypto natives:

* Fully on-chain;
* Faster trades (no complexity from order placements);
* Simplified liquidity bootstrapping;
* Automated price discovery; and
* Path independence (history of trades does not matter).

### AMM Variants

The best known AMM was created by Uniswap, which utilizes the constant product formula $x \cdot y = k$, where $x$ and $y$ are the pool's reserves of the two assets. This function creates a hyperbolic curve where any point along the curve represents the pool's reserves of X:Y. This will determine the exchange rate of a trade executed at that point in time.

<figure>
  <img src="/img/resources/amm-curve.png" alt="AMM Curve" />
  <figcaption>Figure 1. A generic hyperbolic curve representing the constant product function</figcaption>
</figure>

The Uniswap constant product formula is widely utilized for a multitude of ERC20 token pairs, with the caveat that for volatile assets, LPs are exposed to the risk of impermanent loss (IL). IL refers to the loss in value when depositing assets into a liquidity pool versus holding them in your wallet.

To reduce IL risk, Balancer Labs introduced another variant of AMM, the constant mean function.

$$$
{\displaystyle \prod_{i=1}^{n}} R_i^{w_i} = k
$$$

Here, $R$ is the reserve of each asset, $w$ is the weight of each asset, and $k$ is the constant. The weighted geometric mean of the reserves will always remain constant.

The constant mean function is able to reduce volatility on tokens with a lower weight, which leads to a reduced risk of impermanent loss on the more price volatile asset in the pair. This lower risk has been shown to reduce barriers for LPs. 
The adjustable parameters from Balancer allow for interesting deployment options for liquidity pools with different token classes, i.e. assets with large price volatility (weights adjustment), assets with elastic supplies (smart pool), liquidity bootstrapping pools (smart pool), etc.

Other prominent AMM models have been introduced for other token classes as well. One example would be Curve for stablecoins, which greatly reduces trading slippage by capitalising on the knowledge that prices of stablecoins fluctuate within a band.
These examples illustrate that while Uniswap's constant product function is enough to cater to generic token classes, innovation in AMM models targeted at specific token classes is required to bring more efficiency to the trading and liquidity provision experience.

One category of tokens that has yet to see an efficient AMM model is tokens with time decaying properties, i.e. a token which loses value over time as the contract approaches maturity. Some examples of this token class (heavily traded and relevant in traditional finance) include:

* Tokens modelled after bonds; and
* Tokens modelled after options;

### Constant product function unsuitability for tokens with time decay

Depositing tokens with time decay in a constant product function AMM such as Uniswap will result in guaranteed impermanent loss for LPs. For illustration purposes, we add X, a token with time decay, and Y, a non time-decaying token, into a liquidity pool using the constant product AMM at a 1:1 ratio.

1. As time passes, the value of X trends downwards with respect to Y.
2. As the value of X depreciates, the ratio of X:Y will shift higher, i.e. 1:1 -> 1.1:1 -> 2:1 -> infinity:1, as time reaches maturity.
3. The impact of this on a constant product function AMM would be a complete draining of pool Y, resulting in substantial impermanent loss for LPs. 

There are 2 reasons the existing constant product formula cannot be used Firstly, time is not considered as a variable, resulting in guaranteed losses for LPs due to arbitrage. Secondly, the overall liquidity pool's value would tend to zero as the token price decays, resulting in poor pool depth.

The "guaranteed" loss mentioned above can be attributed to the time decaying property of the token class, in addition to the typical impermanent loss from liquidity provision (called market-risk impermanent loss). For the purposes of this paper, a clear distinction should be made, and we will denote it using the term time-dependent impermanent loss.

## Pendle's AMM variant

The goal of Pendle's AMM variant is to counteract the time-dependent impermanent loss specific to token classes with time decay. Pendle tackles this problem by incorporating the element of time into the AMM design.

Here, we introduce Pendle's AMM design.

$$$
x^{\alpha_{i+1}} \cdot y^{\beta_{i+1}} = x_i^{\alpha_{i+1}} \cdot y_i^{\beta_{i+1}}
$$$

where

$\alpha$: the weight of $x$ at $time = i + 1$<br />
$\beta$: the weight of $y$ at $time = i + 1$<br />
$x_i$ and $y_i$: the equilibrium point of $x$ and $y$ at $time = i$

At $time = 0$, $\alpha$ and $\beta$ are initiated at 0.5, the quantity of Token X and Token Y is initiated by the market creator which translates to $x$ and $y$. The curve will resemble Uniswap's constant product curve. When a swap happens, the equilibrium point shifts along the curve. At subsequent time step $time = i$, $\alpha$ and $\beta$ will change with the following formulas:

At a subsequent time step when $time = i + 1$ (i.e. defined as when the next trade happens), swaps between x and y will trigger calculated shifts of the curve at the equilibrium point (x, y), where $\alpha$ and $\beta$ will adjust based on the formulas:

$$$
\alpha_{i+1} = \alpha_i - \epsilon_i
$$$
$$$
\beta_{i+1} = \beta_i - \epsilon_i
$$$

where

$$$
\epsilon_i = \frac{\alpha_i\beta_i(1 - R_i)}{R_i\alpha_i + \beta_i}
$$$
$$$
R_i = \frac{price_{i+1}}{price_i}
$$$

$\epsilon$ is assumed to always be greater than zero in predictable cases, meaning that the variables $\alpha$ and $\beta$ range from 0.5 to 0 and 0.5 to 1 over time, respectively. This balances the volatility of the token and ensures that the pool's value will not tend to zero even as the token price does.

Meanwhile, $R$ is the parameter that precisely determines the degree to which a curve shift occurs. Bootstrapped by the protocol, it should reflect the skeletal pricing model employed to delineate the time decaying property of the given asset. By default, we follow the pricing model of options or bonds, where the rate of price decrement tends to accelerate over the duration of a contract period.

The AMM shift is a rather dynamic one as a result. It involves the then-equilibrium point on the AMM as well as the calculated ratio R based on time left. This means that Pendle's AMM formula, while inspired by the constant product formula, would in fact not guarantee any constant as a function of remaining supply of tokens (e.g. YT and USDC) left in the pool. Its dynamic nature is what enables the dynamic pricing of YT based on time.

<figure>
  <img src="/img/core-concepts/pendle-amm-1.png" alt="Graph" />
  <figcaption>Figure 2. Pendle's AMM curve shifts at different time intervals</figcaption>
</figure>

As the above figure demonstrates, we can see that the AMM curve itself makes a calculated shift every time a swap is performed (from $t_1$ to $t_2$) such that the token price (slope of the curve) would be near zero as time nears time to maturity.

### Illustrating Pendle's AMM for token classes with time decay

Time-dependent impermanent loss is inevitable should LPs stake tokens with time decay on a traditional AMM like Uniswap. This is due to the fact that the value of a pool on Uniswap is linked to that of its base token. In a pool where the token's value is bound to depreciate to zero over time, LPs will be left with nothing by the time they withdraw their liquidity provision.

<figure>
  <img src="/img/resources/amm-timedependent-il.png" alt="Time Dependent Impermanent Loss" />
  <figcaption>Figure 3. The effect of time-dependent impermanent loss (assuming linear pricing model)</figcaption>
</figure>

This is where Pendle aims to contribute. Pendle's AMM effectively breaks the hard-coded link between the value of a pool and the value of its base tokens. Essentially, the AMM allows for pools that do not lose any value even as the token price decreases to zero. As such, time-dependent impermanent loss will be substantially eliminated on Pendle, via calculated curve shifts modeled after the way theta is traditionally priced into bonds and options.

### Details on the Curve Shifts

In the style of the aforementioned option/bond pricing model (where the price should drop more drastically towards the end of the contract period than the beginning), we use the formula detailed in equation (7) for Pendle's bootstrapped model of Price (fraction) of tokens with time decay over Time to maturity (%), denoted by p(t).

The magnitude of each shift is dependent on time in UNIX timestamps as follows:

$$$
R_i = \cfrac{p(t_{now})}{p(t_{eq})} \\
p(t) = \cfrac{ln(3.14 \dot t + 1)}{ln(4.14)} \\
t(T) = \cfrac{T_{end} - T}{T_{end} - T_{start}}
$$$

where

$t$: time to maturity from 1 to 0<br />
$T_{start}$: contract start timestamp<br />
$T_{end}$: contract end timestamp<br />
$T_{now}$: current timestamp<br />
$T_{eq}$: latest equilibrium point's timestamp<br />

While the "(fraction)" part of Price (fraction) refers to setting the original price of YT as 1.0 (or 100%), the following plot shows the involved pricing model as time remaining to maturity travels from $t = 100%$ to $t = 0%$. Note that $p(100) = 1$ while $p(0) = 0$.

<figure>
  <img src="/img/core-concepts/pendle-amm-2.png" alt="Price as function of time" />
  <figcaption>Figure 4. Price (fraction) as a function of time remaining to maturity</figcaption>
</figure>

The motivation for the constants chosen for the above formula is the fact that the price loses about 1/3 of its original value (at the beginning of the contract period) when time to maturity reaches 50%.

### Impermanent Loss: Sample Scenarios

Because of the distinctive nature of Pendle's tokens pertaining to their time decaying property, we are able to measure impermanent loss by simply checking how much USDC (or whichever token in the pool traded with YT) remains in the pool. In the following scenarios, we consider specific cases with regards to impermanent loss as the market exhibits sudden price volatility during our protocol's curve shifts.

**Table 1.** Illustrations of the impact of impermanent loss for pools on Pendle vs Uniswap, with different price movements.

| Cases |                     Price Swings and Curve Shifts                     |                                         Results                                          |
| :---: | :-------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: |
|   1   | $2 $1 (down-swing)<br />→ Curve shift(s)<br />→ Back to $2 (up-swing) | Less impermanent loss on Pendle.<br />Pools on Pendle have 3.22% more USDC than Uniswap. |
|   2   | $1 (no swing)<br />→ Curve shift(s)<br />→ Price maintained at $1 | Less impermanent loss on Pendle.<br />Pools on Pendle have 5.12% more USDC than Uniswap. |
|   3   | $0.50 $1 (up-swing)<br />→ Curve shift(s)<br />→ Back to $0.50 (down-swing) | Less impermanent loss on Pendle.<br />Pools on Pendle have 7.05% more USDC than Uniswap. |
|   4   | $10 $1 (flash crash)<br />→ Curve shift(s)<br />→ Back to $10 (flash recovery) | Less impermanent loss on Pendle.<br />Pools on Pendle have 1.06% more USDC than Uniswap. |

:::note
Curve shifts occur at the factor of 0.9 (i.e. the slope decreases by 10%)
:::

### Impermanent Loss: Generalization

We can generalize the above scenarios and explore what happens given various possible cases of price swings on a continuous scale rather than merely discrete. Some parameters included in the following generalization include:

1. Price swing ratio.
   * 0.5: Down-swing (e.g. $2 -> $1) -> curve shift(s) -> up-swing (e.g. back to $2); and
   * 1.5: Up-swing (e.g. $2 -> $3) -> curve shift(s) -> down-swing (e.g. back to $2).
2. Time when the curve shift happens (represented by α) amid the period of a contract.
  * $\alpha = 0.5$, time remaining to maturity ~100%; and
  * $\alpha = 0.3$, time remaining to maturity ~27%.
3. Magnitude of curve shifts (represented by R) with reference to Figure 4.
  * $R$ = the factor of 0.9, the slope decreases by 10%; and
  * $R$ = the factor of 0.7, the slope decreases by 30%.

<figure>
  <img src="/img/resources/amm-lp-profit.png" alt="LP profit compared to Uniswap" />
  <figcaption>Figure 5. Effectiveness analysis in the case of a price swing</figcaption>
</figure>


The y-axis of the graph represents Pendle’s LP profit (in relative terms) compared to Uniswap during times of an abrupt price swing coupled with a curve shift, as innately specified by Pendle's protocol. As such, one can see that it is more profitable to provide liquidity to Pendle rather than to Uniswap in most cases (and in fact all reasonable cases). Namely, the domain (i.e. part of the x-axis) for which the output values (i.e. y values) are above the horizontal line at y = 0 is where Pendle remains more profitable than Uniswap.

The only exception, as aforementioned, is when there is an occurrence of a flash crash (e.g. 90% decrease in price), followed by a flash recovery. Even then, the magnitude of the decrease in the pool's value is strictly less than that of the increase in the pool's value in the opposite case of a sudden rise in price, meaning one will still end up with a net positive if an average is taken over all possible price swing scenarios.

## Liquidity Provision Tokens

Pendle issues liquidity provision tokens (LP tokens) representing the ownership of assets in the liquidity pools in direct proportions. The proportion of liquidity deposits and withdrawals will strictly be based on the prevailing distribution of assets X and Y in the pool.

New liquidity deposits will trigger the minting of new LP tokens and the LP tokens will be burnt following liquidity withdrawals.

### Pool Initialization

The number of LP tokens initially minted and issued is proportional to the quantity of USDC added to the liquidity pool.

### Adding/Removing Liquidity

$$$
LP_{toMint} = \cfrac{D_i}{Q_i} \cdot LP_{supply}
$$$

where
$LP_{supply}$ = is the current circulating supply of LP tokens of the pool,<br />
$LP_{toMint}$ = is the quantity of LP tokens that the depositor will obtain by depositing $D_i$,<br />
$D_i$ = is the quantity of an asset deposited by the depositor at $time = i$,<br />
$Q_i$ = is the token balance of an asset in the pool before the deposit at $time = i$

Removing liquidity follows a similar logic where the quantity of LP tokens burnt is proportional to the quantity of assets withdrawn.

<hr />

## References

1. Fernando Martinelli and Nikolai Mushegian. [A non-custodial portfolio manager, liquidity provider, and price sensor](https://balancer.finance/whitepaper/).
2. Hayden Adams, Noah Zinsmeister, and Dan Robinson. [Uniswap v2 Core](https://uniswap.org/whitepaper.pdf). 
3. Michael Egorov. [StableSwap - efficient mechanism for Stablecoin liquidity](https://www.curve.fi/stableswap-paper.pdf). 