# Margin & Liquidations

## Understanding Your Position's Risk

Boros uses three linked metrics to characterise a position's exposure and margin requirements:

**Rate Sensitivity** is how much PnL your position gains or loses for every 1% move in implied APR. It's the primary lens for understanding exposure, equivalent to 100 × DV01 in TradFi interest rate swap conventions.

> Rate Sensitivity = Notional Size × (Days to Maturity / 365) × 1%

**Daily Volatility** is the 7-day moving average of the daily implied APR range, how much the rate swings in a typical day.

> Rate Sensitivity × Daily Volatility = Daily P&L Range

This gives you a practical sense of how much your position can gain or lose on any given day under recent conditions. More volatile assets require proportionally higher margin for the same rate sensitivity.

**Margin** is the collateral used to back your position, your buffer against adverse rate moves.


## Net Balance

Your **Net Balance** determines whether a position remains healthy or is eligible for liquidation:

> Net Balance = Collateral + Unrealized PnL

**Collateral** is adjusted at every settlement period (every 8 hours), when the difference between the fixed rate and the underlying rate is cash-settled into your collateral. A short position, for example, will see its collateral erode if the underlying rate stays persistently above the fixed rate it receives.

**Unrealized PnL** moves with the mark implied APR. A long position sees unrealized losses as the mark rate falls, and vice versa.

Monitor your Net Balance closely, add collateral if your margin ratio is trending low.


## Margin Modes

**Cross Margin** allows a single collateral deposit to back multiple positions within the same collateral zone (e.g. all BTC-denominated markets share one BTC collateral pool). Unrealized profits in one position offset margin requirements across the zone. Liquidations in one zone do not affect positions in other zones.

**Isolated Margin** confines collateral to a single market. Losses in an isolated position cannot spill over to other positions.


## Initial Margin

Initial margin is the collateral required to open a position. It scales with notional size, time to maturity, and the implied APR at which the position is opened — floored at the market's Margin Floor (see below):

> IM = IM Factor × |Notional Size| × max(Time to Maturity, Time Floor) × max(|Mark Rate|, Rate Floor)

Once consumed, initial margin is locked and cannot be reused to back other positions. Any remaining collateral beyond the initial margin is your **Available Margin**, which increases with unrealized profits and decreases with unrealized losses. Your collateral balance then increases or decreases by the settlement PnL.


## Maintenance Margin

Maintenance margin is the minimum Net Balance required to keep a position open. It uses the same formula as initial margin but with a lower factor:

> MM = MM Factor × |Notional Size| × max(Time to Maturity, Time Floor) × max(|Mark Rate|, Rate Floor)

As maturity approaches and periodic settlements reduce the position's residual yield exposure, both rate sensitivity and maintenance margin decline in tandem. At maturity, both reach zero and the full position is settled into collateral.

A position becomes eligible for liquidation when its **Net Balance falls below its Maintenance Margin**.


## Margin Floor

The Margin Floor sets a minimum rate (implied APR) and minimum time-to-maturity used in margin calculations, ensuring positions are never backed by trivially small collateral. There are two components:

**Rate Floor:** Because initial margin scales linearly with implied APR, a position opened near 0% (or negative) rates would require near-zero margin, creating bad debt risk. The Rate Floor enforces a minimum APR for margin calculation purposes. For example, in a market with an 8% Rate Floor, any position opened between -8% and +8% is margined as if it were opened at 8%.

**Time Floor (Near-Maturity Floor):** As maturity approaches, required margin shrinks. Without a floor, positions in the final days before maturity would be backed by negligible collateral, leaving the protocol exposed to sharp last-minute rate swings. The Time Floor prevents margin from decaying below the equivalent of a position with a set number of days remaining (e.g. 7 days). Any position opened inside that window is margined as if it still had 7 days to maturity.

Each market applies the **higher** of the two floors.


## Liquidation

When a position's Net Balance falls below its Maintenance Margin, it becomes eligible for liquidation. The position is closed at the current mark rate, and a **liquidation penalty** is deducted from the user's remaining collateral:

> Liquidation Penalty = k × Maintenance Margin of Liquidated Position

**k** starts at **25%** when the position first becomes liquidatable (health ratio = 1.0) and scales linearly up to **50%** as the position becomes progressively more distressed. This escalating penalty incentivises liquidators to act promptly and compensates them for taking on the position. **k** figure can change when a market is in distress or when the team deems necessary to adapt to certain situation.

A protocol liquidation fee is also charged on top of the liquidator incentive (see [Fees](/docs/boros-docs/boros-systems/fees.md)).

Margin figures and requirements can differ by markets, check out the market details for specific information on the respective markets.

![Market Info Popup](/boros-docs/imgs/market-info-popup.png "Market Info Popup")