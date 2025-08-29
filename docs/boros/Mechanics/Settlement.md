# Settlement

In Boros, settlement refers to position update when a trade happens (e.g. market order placed, limit order filled) and the periodic floating payment.

### Trade Settlement

When a trade is executed (e.g., a market order fills against limit orders), traders must pay an upfront fixed cost immediately. This upfront cost represents the present value of the fixed rate component of the interest rate swap for the remaining time to maturity.

**Formula:**

$$
\text{Upfront Cost} = \text{Order Size} \times \text{Order Rate} \times \frac{\text{Time to Maturity}}{\text{YEAR}}
$$

Where:

- **Order Size**: The notional amount of the trade
- **Order Rate**: The fixed interest rate agreed upon in the trade
- **Time to Maturity**: `maturity - latestFTime` (in seconds)
  - `maturity`: The market's expiration timestamp
  - `latestFTime`: The timestamp of the last periodic payment
- **YEAR**: 365 days in seconds (31,536,000)
- Both `maturity` and `latestFTime` can be retrieved from `market.descriptor()`

**Example:**
For a market with 8-hour payment periods:

- If current time is 10:00 UTC
- The `latestFTime` would be 8:00 UTC (the last 8-hour boundary)

**Direction of Payment:**

- **Long positions**: Pay upfront cost to receive floating rate
- **Short positions**: Receive upfront cost to pay floating rate

### Floating Rate Settlement

Floating rate payments occur periodically (e.g., every 8 hours) to exchange the difference between fixed and floating rates. These payments are calculated based on the position size and the change in the floating index.

**Formula:**

$$
\text{Floating Payment} = \text{Signed Position Size} \times \Delta\text{Floating Index}
$$

Where:

- **Signed Position Size**: Positive for long positions, negative for short positions
- **ΔFloating Index**: The change in floating index since the last settlement

**Floating Index:**
The floating index is a cumulative value that represents the total yield earned by 1 unit of the underlying asset since inception.

**Example:**
Consider a perpetual futures funding rate scenario:

- If the funding rate on Binance for the last 8-hour epoch is 0.0001 (0.01%)
- The ΔFloating Index would be 0.0001
- A long position of 100 units would receive: `100 × 0.0001 = 0.01` units
- A short position of 100 units would receive: `-100 × 0.0001 = -0.01` units (negative payment means paying)

**Fees:**
Floating payments are subject to settlement fees. For detailed fee structure, see [Fees](./Fees.md).

## Algorithm

In traditional order books, when a market order matches against limit orders, all makers' positions are updated immediately. On-chain, this becomes prohibitively expensive as a single order could match against hundreds or thousands of limit orders, each requiring storage updates. Boros solved this by using a lazy settlement process that defers the position update until the next time users interact with Boros.

Since the last time a user interacted with Boros, multiple events may have occurred that affect their position:

- Limit orders could have been filled
- Floating rate settlements could have occurred
- These events can interleave in complex patterns

The settlement algorithm processes all pending events in chronological order to ensure correctness:

1. **Event Collection**: Gather all events since the user's last settlement:

   - Filled limit orders (grouped by the `fTime` when they were filled)
   - Floating payment settlements at each `fTime` boundary

2. **Chronological Processing**: Iterate through events by `fTime`:

   ```
   For each fTime period:
     a. Process all filled orders from that period
        - Calculate and apply upfront costs
        - Update position sizes
     b. Process floating payment for that period
        - Calculate payment based on position size at settlement time
        - Apply floating index changes
     c. Continue to next fTime period
   ```

3. **State Update**: After processing all events:
   - Update user's final position size
   - Update user's cash balance
   - Update user's last settlement timestamp

**Example Timeline:**

```
User last settled: 08:00
Current time: 18:00

Events to process:
- 09:30: Limit order filled (100 units)
- 16:00: Floating payment settlement
- 17:15: Limit order filled (50 units)

Processing order:
1. Process fills from 08:00-16:00 period (100 units)
2. Process Floating payment at 16:00
3. Process fills from 16:00-24:00 period (50 units)
```

## Notes

Due to lazy settlement, on-chain state may not reflect the latest position values and balances. Query functions ending with `NoSettle` return raw, unsettled data that may be outdated.

**Getting Up-to-Date Data:**

To retrieve current, accurate position information, you must first trigger settlement:

```solidity
IMarketHub(marketHub).settleAllAndGet(acc, GetRequest.ZERO, MarketId.ZERO);
```

You can also use the [REST API](../Backend/REST%20API.md), which provides accurate, up-to-date data without requiring manual settlement triggers.

**Strategic Position Management:**

Floating payments are calculated based on your position size at the exact payment timestamp. This creates an opportunity for strategic position management:

- **Avoiding Payments**: You can close or reduce your position before the payment time to minimize floating payments
- **Payment Timing**: Payments occur at regular intervals (e.g., every 8 hours)
- **Position Size Matters**: Only the position size at the payment timestamp is used for calculation

**Oracle Update Delays:**

In practice, Floating payments don't occur at the exact period boundaries due to off-chain oracle update delays:

- **Expected Time**: Payment for 8:00:00 boundary
- **Actual Time**: Usually occurs ~10 seconds later (e.g., 8:00:10)
