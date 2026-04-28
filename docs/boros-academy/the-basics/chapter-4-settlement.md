import Hint from '@site/src/components/Hint';

# Chapter 4 - Settlement

## Yield Settlement

Boros currently supports trading of Funding Rates which are typically settled periodically. On Boros, yields are settled periodically at the same time as the underlying perp DEX’s funding rate settlement.

For example, funding rates on Binance are settled every 8 hours; consequently, rates on Boros for the Binance pools are also settled every 8 hours. Similarly, Hyperliquid funding rates are settled hourly, and Boros rates for these pools follow the same hourly settlement schedule. You get the idea.

#### How Settlement Works

Using an 8h settlement interval for example: every 8 hours, Boros settles the underlying rate against every user’s fixed rate. The difference between these rates will be settled and reflected in the users’ collateral (the rates’ difference is taken at the point of settlement, i.e. a single snapshot).

| At Every Settlement → | Pay                 | Receive             |
| --------------------- | ------------------- | ------------------- |
| **Long YU**           | Implied APR (fixed) | Underlying APR      |
| **Short YU**          | Underlying APR      | Implied APR (fixed) |



1.  **Long YU positions: User pays a Fixed Rate (i.e. Implied APR) and receives the Underlying Rate**

    If your long position was opened at an Implied APR of 8% and the Underlying APR averages 10% at settlement, you gain the difference: 10% - 8% = 2%.

    This gain is scaled down to 8-hours. Your collateral will be updated and increase accordingly.
2.  **Short YU positions: User pays the Underlying Rate and receives a Fixed Rate (i.e. Implied APR)**

    If your short position was opened at an Implied APR of 20% and the Underlying APR averages 25% at settlement, you bear the loss: 25% - 20% = 5%.

    This loss is scaled down to 8-hours. Your collateral will be updated and decrease accordingly.

<Hint style="info">
On Boros, settlements are conducted periodically, just like the underlying funding rates. During each settlement:

* **Collateral increases** if the rate you receive is higher than what you paid.
* **Collateral decreases** if the rate you receive is lower than what you paid.

These adjustments repeat every settlement until the position reaches maturity.
</Hint>

## Understanding Settlement & Implied APR Entries

Settlement and Implied APR are two separate forces acting on your position at the same time throughout maturity, and understanding how they interact is key to managing a Boros position well.

At every settlement, your collateral is adjusted based on the difference between the Underlying APR and your Fixed APR.

At the same time, your margin is also constantly responding to movements in Implied APR. A position can be winning on settlements while losing on Implied APR, or vice versa.

**As such, always check Rate Sensitivity to understand the possible price swings of your position.**

**Example:**

<figure><img src="/boros-academy/imgs/settlement-example-ch4.png" alt="" /><figcaption></figcaption></figure>

You entered a long 1000 YU-ETHUSDT-Hyperliquid at 3% Implied APR with 60 days to maturity, current underlying APR is -3.32%.

* Margin: 4.9 ETH
* Rate Sensitivity: 1.64 ETH (per 1% move of Implied APR)

**Settlements are against you at very low APRs throughout, below your Fixed APR of 3%, so your collateral is decreasing each settlement.**

Shortly after, suddenly Implied APR has increased to 5%. That 2% increase in Implied APR increases your net balance by 3.28 ETH (Rate Sensitivity × 2), or an unrealized profit of 3.28 ETH.

This illustrates that while each settlement can be against you, if sentiments shift, a favorable implied APR movement can result in a net profit.
