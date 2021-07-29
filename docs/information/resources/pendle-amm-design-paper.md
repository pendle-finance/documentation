---
sidebar_position: 1
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
