# Order Book

Boros operates a central limit order book (CLOB) for trading interest rate swaps (YU). 

## Mark Rate

The **mark rate** is Boros's reference rate for margining, liquidations, and order validity checks. It is a **time-weighted average of recent trade prices** (TWAP), typically calculated over a 5-minute (subject to changes) rolling window.

When a trade occurs, the mark rate updates as a blend of the newly executed rate and the prior mark rate, weighted by how much time has elapsed since the last trade. This makes the mark rate resistant to short-term manipulation (a single trade cannot move it instantaneously).

The mark rate is distinct from the **Last Traded Rate (**the last filled order in the order book). Under normal conditions, these should be very close or the same. They can diverge slightly during volatile trading periods or when the mark APR TWAP is still updating to catch-up with the last traded rate.

![Order Book](/boros-docs/imgs/image3.png "Order Book")

## Order Types

Orders on Boros are placed based on Implied APR of the asset, which is the price of the asset denominated in APR terms. Learn more **here**.

- Market: Order executes immediately in order of the best prices in the order book.
- Limit: Order executes at the selected limit price or better.

Limit orders on Pendle are Good Til Cancel (GTC) orders, which means they will be available in the order book until it is filled or cancelled.

The order book will be closed at maturity and all orders will automatically be cancelled.

## Matching Priority

Orders are matched by **rate-time priority**:

- Better rates (prices) are matched first (long orders willing to pay higher rates; short orders willing to receive lower rates)
- Within the same rate (price), orders are matched in the order they were placed (first-in, first-out)

## Rate Bounds and Out-of-Range Errors

Boros enforces rate bounds relative to the mark rate to protect traders from filling at stale or manipulative prices. There are two distinct checks:

### Taker Orders — *"Executed Rate Out of Range"*

When an incoming order executes against the book, the furthest filled rate is checked against the mark rate. If the deviation is too large, the transaction reverts.

Reduce your order size to within the executable range to have your order sent to the book.

### Maker Orders (Limit Orders) — *"Limit Rate Out of Bounds"*

Resting limit orders are also constrained. An order will be rejected at placement if its rate deviates too far from the mark rate. The allowable range widens as time to maturity increases, reflecting that longer-duration positions reasonably trade at a wider spread from the current mark.

*Long / short* maker orders that are placed too far *above / below* the mark rate respectively will be rejected.

## Order Lifecycle and Purging

Beyond manual cancellation, orders can be removed by the protocol's risk management system:

- **Force-cancellation**: If your account's health ratio deteriorates to a risky level, all open orders across all markets may be force-cancelled to prevent further exposure.
- **Purging**: If a resting order's rate drifts too far from the current mark rate (due to mark rate movement after placement), it is purged from the book. Purged orders are not filled, they are simply removed. Purged orders are likely so far out of the current mark rate that it will not affect the order book even in extreme market conditions.
- **Health-jump cancellation**: If a pending funding rate update would push your health ratio into risky territory, orders contributing to that risk may be proactively cancelled.

## Order Limits

- No minimum order size
- Maximum of **100 open orders per account** across both sides (configurable per market). Exceeding this causes the transaction to revert.
- Self-trading is prevented, if an incoming order would match against your own resting order, the transaction reverts.

## Market Modes

Markets operate in one of three states:

| Status | Meaning |
| --- | --- |
| **GOOD** | Normal operations — all order types permitted |
| **OI Capped** | Only orders that reduce existing position size are allowed. No new exposure can be opened (OI is capped from current value). Limit orders can still be posted to the book.  |
| Makers Only Mode | No new trades can execute, including closing open positions. Limit orders can still be posted to the book. |
| Market Paused (Halted) | All trading and order placement suspended. |