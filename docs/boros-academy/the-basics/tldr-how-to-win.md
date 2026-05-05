# TL;DR How to Win on Boros

**Now that you understand how to long/short funding rates on Boros, you now know:**

* **You can win on funding settlements** by Underlying APR > Implied APR if you’re long, and vice versa if short
* **You can win on Implied APR movements** when Implied APR moves the direction of your trade (Positive if long, negative if short). The magnitude of which is denoted in your position’s rate sensitivity.
* **By combining these, you can win big on Boros.** And if you’re losing on one part of the YU trade (Implied APR movement, or Underlying APR settlements) — the other part may be your saving grace!

## If you're speculating on funding rates (betting on Underlying APR movements)

1. Deposit Collateral
2. Open a position
   1. Long YU if you think: average funding rate > current implied APR
   2. Short YU if you think: average funding rate < current implied APR
3. Watch your position's health factor and make sure you don’t get liquidated!

## If you're trading the price of YUs (betting on Implied APR movements)

1. Deposit Collateral
2. Open a position
   1. If you think implied APR is going up (buy low sell high) → Long YU
   2. If you think implied APR is going down (short a falling price) → Short YU
3. Watch your position's health factor and make sure you don’t get liquidated!

Note: you may lose on Implied APR movements, but make it back and more on Underlying APR payouts/settlements. Vice versa losing on settlements, but winning on Implied APR.

## How much can your position win?

### Implied APR

Rate sensitivity allows you to calculate your possible wins/losses based on Implied APR targets.

**For example:**

<figure><img src="/boros-academy/imgs/rate-sensitivity-tldr.png" alt="" width="480" /><figcaption></figcaption></figure>

* You are considering a Long 100 YU-ETHUSDC-Hyperliquid at 3.83% Implied APR
* The UI indicates that you require 1.65 ETH as margin with a 1% rate sensitivity of 0.413 ETH.
* **Ignoring settlements, if Implied APR hits 8% then your position gains 1.72 ETH (0.413 ETH x 4.17 ETH)**

### Underlying APR

YU holders either earn or pay the spread between Underlying and Implied APR at the end of each settlement. Holders earn if the direction is in their favour (Underlying > Implied for Long; Implied > Underlying for Short) and pay if it is not.

**For example:**

* You are long 100 YU-ETHUSDC-Hyperliquid at 3.83% Implied APR
* Hyperliquid’s hourly funding settles at 8.00% Underlying APR.
* **You receive 0.000476 ETH (100 \* (8% - 3.83%) / 365 / 24) as your net settlement for that hour.**

This is the net settlement for a single funding period. If you are correct over longer time periods, your positive spreads can compound.

**Assuming funding remains elevated at 8.00% Underlying APR for the next 10 days, your position would earn 0.11424 ETH (100 \* (8% - 3.83%) / 365 / 24 \* (24 \* 10)) in net settlements.**

Settlements allow traders to make directional bets on Underlying APR regardless of Implied APR. Net settlement spreads accrue directly to margin and, if held until maturity, represent the realized difference between the trader’s Implied APR and the market’s average Underlying APR.

To estimate the potential profit from holding positions on Boros until maturity, use our [“Get Started” page](https://boros.pendle.finance/get-started) to view the possible ROIs:

<figure><img src="/boros-academy/imgs/get-started-dashboard-tldr.png" alt="" /><figcaption></figcaption></figure>

Simply select the asset, exchange and time period (maturity) you’re intending to trade, and input your predicted average funding rate. From there, you’ll see potential ROIs IF your prediction is correct, and you hold the position till maturity.

We recommend bookmarking this page and using it to analyze trade ideas before opening positions on Boros.

## TL;DR there are multiple ways to win on Boros!

Whether you intend to trade short term Implied APR fluctuations, capture settlement spreads or both, Boros gives you the flexibility to execute any funding rate-powered strategy.

To understand how traders have executed these strategies in practice, here’s two trader case studies:

* [**From 11k to 117k on Boros with ONE Trading Strategy**](https://x.com/boros_fi/status/2018788835166216319)
* [**How this trader made +147k on Boros trading oil funding rates**](https://x.com/boros_fi/status/2046164694084296728)
