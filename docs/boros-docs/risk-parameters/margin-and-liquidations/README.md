import Hint from '@site/src/components/Hint';

# Margin and Liquidations

## Understanding Positions on Boros

**Positions on Boros are priced and monitored via Rate Sensitivity, Daily Volatility, and Margin.** 

**Rate Sensitivity:** How much your position gains or loses for every 1% change in APR, equivalent to 100x DV01 in TradFi interest rate swap conventions. This is the primary way to understand your position's exposure.

```jsx
Rate Sensitivity = Notional Size (YU) * DaysToMaturity/365 * 1%
```

**Daily Volatility:** The 7-day moving average (7DMA) of the daily implied rate range, represents volatility by showing how much Implied APR swings in a day on average 

> ***Rate Sensitivity x Daily Volatility = Daily P&L Range,** giving you sense of how much your position can gain or lose on any given day under normal market conditions*

**Margin:**  The capital backing your position and your runway against adverse rate moves.

## Trading Example

A trader wishes to long BTCUSD-Hyperliquid rates with 59 days to maturity. Implied APR is at 1.18%, and he opens a long position of 10 YU.

![image.png](/boros-docs/imgs/positions-overview.png)

- Rate Sensitivity: 0.0163 BTC per 1% move
- Margin Requirement: 0.024 BTC

Comparing your Rate Sensitivity against Margin Requirement can provide a sense of scale on how much buffer you have before your position is at risk of liquidation.

**Volatile assets with higher volatility will require higher margin requirement for the same rate sensitivity.**

## Cross Margin

Boros allows for cross-margin with the same assets, allowing users to use the same collateral across multiple positions within the same collateral zone (e.g. Same BTC collateral utilized across all markets within the BTC zone).

Additionally, Boros also offers isolated pools, where collateral is only confined to specific markets.

The Collateral and Notional size will always be denoted in the same asset. For example, in the BTCUSDT-Binance market on Boros, each YU-BTCUSDT-Binance represents yield from funding rates of 1 BTC and the collateral required to back the position is in BTC.

**Liquidations within a collateral zone will not affect positions in other zones or isolated pools.**

## **Initial Margin**

Leverage can be set between 1 and the max leverage, which may vary by asset. The initial margin required to open a position is:

```jsx
Initial Margin = NotionalSize*YearsToMaturity*max(ImpliedAPR, MarginFloor)*IMRatio
```

The margin scales with notional size, time to maturity, and the implied APR of the position, floored at the market's Margin Floor (see below) to ensure adequate collateral even when rates are low or negative. Once consumed, the initial margin cannot be withdrawn or used to back other positions. The collateral remaining after margin consumption is your Available Margin.

Example: If you have 2000 USDT and proceed to open a 2000 USDT position, the margin consumed is 2000 USDT (i.e. fully consumed). The available margin becomes 0 USDT and the same collateral cannot be reused to open a new position.

Unrealized profits from open positions are automatically reflected as an increase in Available Margin. Conversely, unrealized losses reduce Available Margin.

## **Maintenance Margin and Liquidations**

Positions can be liquidated when the position’s Net Balance falls below the maintenance margin requirement.

### Net Balance

A position’s Net Balance comprises of:

```jsx
Net Balance = Collateral + Unrealized PnL
```

#### Collateral

Collateral value changes after every rate settlement where Boros settles every position’s fixed APR against the underlying APR. Learn more about interest rate accounting and settlement [here](../../interest-rate-accounting/interest-rate-accounting-and-settlement).

Note that the value of your collateral is only affected after every rate settlement, where a portion of the position is realized. The change in collateral is only affected by the difference between fixed vs underlying APR.

For example:

A short positions can be liquidated if the underlying rate maintains above its fixed rate in extended periods.

This is because at every settlement period, the position pays a higher underlying rate vs the fixed rate it receives, reducing its collateral. A prolonged exposure in this situation might reduce the collateral to the point where the Net Balance falls below the maintenance margin, triggering a liquidation.

#### Unrealized PnL

Unrealized PnL value is entirely dependent on the current **mark implied APR** of the asset (learn more about implied APR [here](../../interest-rate-trading/interest-rate-trading-yu-trading#implied-apr-and-fixed-apr)). In essence, unrealized PnL is affected by changes in YU value, which is derived from the mark implied APR.

For example: A long position will have a negative Unrealized PnL when mark implied APR falls. The position can be liquidated if the mark implied APR falls to the point where the Net Balance falls below the maintenance margin.

|                                             | Underlying Rate ⬆️ | Underlying Rate ⬇️ | Mark Implied APR ⬆️ | Mark Implied APR ⬇️ |
| ------------------------------------------- | ------------------ | ------------------ | ------------------- | ------------------- |
| Long Rates (pay fixed, receive underlying)  | Net Balance ⬆️     | Net Balance ⬇️     | Net Balance ⬆️      | Net Balance ⬇️      |
| Short Rates (pay underlying, receive fixed) | Net Balance ⬇️     | Net Balance ⬆️     | Net Balance ⬇️      | Net Balance ⬆️      |

<Hint style="danger">
Always monitor your Net Balance and Margin Ratio. Top up your collateral to increase your Net Balance when Margin Ratio gets dangerously low to avoid liquidations.
</Hint>

#### Mark Implied APR

The mark implied APR is a simple time-weighted average (TWAP) of the last traded implied APR on the order book.

It serves as the reference rate for Boros’ margin system, meaning your net balance is calculated based on the mark implied APR, not the last traded price. This helps prevent unnecessary liquidations caused by short-term price spikes or potential manipulation.

### Maintenance Margin

The maintenance margin is set at 66% of the initial margin upon opening a position. Positions can be liquidated when the their Net Balance falls below this maintenance margin.

```jsx
Maintenance Margin = Initial Margin * 66%
```

As yields are settled, the Rate Sensitivity of the position declines over time. **A 1% move in Implied APR produces a smaller P&L impact as maturity approaches, since the remaining yield period is shorter.** Consequently, the maintenance margin required to maintain the position declines too.

At maturity, the entire position is settled. Rate Sensitivity reaches zero (as there is no remaining yield to respond to rate movements) and maintenance margin is also zero. The realized position is reflected in the collateral.

### Margin Floor

The margin floor on Boros is the minimal Initial Margin necessary to open a position when the market is in a state where it is subject to high implied APR volatility. This threshold prevents the required margin from falling below a certain level, ensuring that all positions will be adequately backed by sufficient collateral under all circumstances, safeguarding the platform against bad debts.

There are 2 types of Margin Floors on Boros.

#### **1. Margin Floor Near Maturity**

<figure><img src="/boros-docs/imgs/image (8).png" alt="" /><figcaption></figcaption></figure>

As a position approaches maturity, its required margin decreases. This reduction is due to the periodic settlement of yields, which lowers the effective value of the position and consequently the required margin as the maturity date nears.

Without a Margin Floor, a position that is close to maturity will only be backed by a minimal amount of collateral. Given that funding rates can experience sharp fluctuations over short periods, significant rate changes could force positions to close at an implied APR below the Maintenance Margin, potentially leading to bad debts.

For example, a market with a &lt;1 Week to Maturity&gt; Margin Floor would mean that the margin CANNOT decay below the threshold as maturity approaches. Positions initiated during &lt;1 week to maturity must provide a margin _equivalent_ to an order placed with 7 days remaining until maturity. The Maintenance Margin for such positions will also be derived from the Margin Floor.

The Margin Floor acts as a critical buffer that ensures that there will be sufficient collateral to withstand extreme market movements throughout maturity, protecting the platform against bad debts.

#### **2. Margin Floor for Low Implied APR**

On Boros, the required margin for opening or maintaining a position is proportional to the Implied APR. A lower Implied APR means a lower required margin.

Users have the flexibility to place limit orders at any Implied APR, including negative values or even at 0%, which can occur in funding rates.

Since Initial Margin is linearly correlated to Implied APR, an order set at 0% APR would theoretically require zero collateral. In the absence of a Margin Floor, this could allow users to place an unlimited number of YU orders at 0% APR without any collateral. Any losses from such scenarios would thus lead to bad debts for the platform.

To mitigate this risk, the Margin Floor establishes a minimum Implied APR that must be considered when calculating the required margin for a position.

For example, in a market with 8% Implied APR Margin Floor, any orders placed between the range of _-8% to 8%_ must provide a margin _equivalent_ to an order at 8% Implied APR.

Additionally, the Margin Floor also acts as a buffer that ensures there will be sufficient collateral to handle any Implied APR fluctuations throughout maturity, thereby safeguarding the platform against bad debts.

Each market will only have ONE Margin Floor value, determined by the higher of the two aforementioned types: \<Margin Floor Near Maturity> or \<Margin Floor for Low Implied APR>.

### **Auto deleveraging**

Boros has an option to trigger auto-deleveraging, a critical feature designed as a vital safeguard to protect against significant bad debt risks.

The purpose of auto-deleveraging is strictly to ensure the platform stays solvent. If triggered, the users on the opposite side of the position at risk, ranked by various metrics (e.g. unrealized P&L, margin usage, among others), will be forced to close their positions (i.e. take profit). These positions are closed at the current implied APR against the liquidated user, ensuring that the platform does not accrue bad debt.

Audo-deleveraging is an important final safeguard, with the goal of ensuring that under all circumstances, the protocol and users can continue to operate with ease of mind.

You can refer to a more in-depth calculation and other preventive mechanisms on Boros over at the [next page](detailed-calculations-on-margin-and-liquidations).&#x20;
