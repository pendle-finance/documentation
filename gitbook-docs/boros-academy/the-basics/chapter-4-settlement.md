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

{% hint style="info" %}
On Boros, settlements are conducted periodically, just like the underlying funding rates. During each settlement:

* **Collateral increases** if the rate you receive is higher than what you paid.
* **Collateral decreases** if the rate you receive is lower than what you paid.

These adjustments repeat every settlement until the position reaches maturity.
{% endhint %}
