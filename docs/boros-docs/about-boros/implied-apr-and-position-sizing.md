# Implied APR and Position Sizing

## Implied APR and Fixed APR

**Implied APR is the market price of a YU position, expressed as an annualised rate.** It reflects the market's collective expectation of an asset's future funding rate and is the rate at which traders enter positions.

When you open a position, the prevailing implied APR locks in as your **fixed APR,** the rate you will pay (long) or receive (short) through to maturity. It does not change after entry.

Implied APR is also the primary driver of unrealised PnL:

- Rising implied APR benefits long positions, hurts short positions
- Falling implied APR benefits short positions, hurts long positions


### Long YU

**Pay fixed APR, receive floating APR.**

Going long is a bet that the underlying funding rate will exceed your fixed APR, or that implied APR will rise after entry (increasing the mark-to-market value of your position).

A long position profits when:

1. Underlying rate > fixed rate (positive settlement cash flows)
2. Implied APR rises after entry (unrealised PnL improves)

Both can occur simultaneously, and either alone is sufficient to generate a profit.


### Short YU

**Pay floating APR, receive fixed APR.**

Going short is a bet that the underlying funding rate will stay below your fixed APR, or that implied APR will fall after entry.

A short position profits when:

1. Underlying rate < fixed rate (positive settlement cash flows)
2. Implied APR falls after entry (unrealised PnL improves)


## Rate Sensitivity and Position Sizing

Unlike spot or perp trading, YU positions are not sized by collateral leverage in the traditional sense. The relevant measure is **Rate Sensitivity,** how much your collateral changes for every 1% move in implied APR.

> **Rate Sensitivity = Position Size × Time to Maturity (years) × 1%**

![Rate Sens](/boros-docs/imgs/rate-sensitivity.png "Rate Sensitivity")

For example, A 250 ETH YU **short** position with 17 days to maturity has a rate sensitivity of ~0.122 ETH per 1% move ($200 at the time of writing):

- 1% increase in implied APR (adverse move) costs you 0.122 ETH
- 1% decline in implied APR (favourable move) earns you 0.122 ETH

Rate sensitivity declines naturally as maturity approaches, since the same position has less exposure with, for instance, 10 days remaining vs 180 days.

**Using Rate Sensitivity to assess risk:**

Your effective risk buffer is:

> **Buffer = Margin / Rate Sensitivity**

This tells you how many percentage points implied APR can move against you before you approach liquidation. Compare this against **Daily Volatility** (the 7-day moving average of daily implied APR range) to gauge whether your margin is adequate for current market conditions.

For example: $1000 margin with a rate sensitivity of $200 gives a buffer of ~5%. If daily volatility is running >5%, your position can be wiped out in a single day's move and could a signal to reduce size or top up collateral.

The levers for managing your rate sensitivity (risks) are straightforward:

- **Reduce position size** → lower rate sensitivity
- **Choose a shorter-dated market** → lower rate sensitivity for same notional size
- **Add collateral** → widens your buffer without changing rate sensitivity


## Opening a Position

1. Select a market and deposit collateral into the relevant zone
2. Enter position size and direction (long or short)
3. Execute a market order for immediate fill, or place a limit order at your target implied APR
4. Position is live once the order fills


## Closing a Position

Closing works by executing the opposite trade against your existing position. A long is closed by going short for the equivalent size, and vice versa. The floating rate legs cancel out, leaving a net fixed APR cash flow to maturity, which Boros immediately settles into your collateral rather than requiring you to hold to expiry.

![Closing Position](/boros-docs/imgs/image5.png "Closing Position")

You can close partially by entering a smaller opposing size than your current position. The remainder stays open at your original fixed APR.

**Caution:** Limit orders are independent of open positions. If you place a limit order to close 1,000 YU and then manually close 250 YU via market order, the original limit order for 1,000 YU remains active. If it fills, it will close your remaining 750 YU and open a new 250 YU position in the opposite direction. Always cancel or adjust limit orders when manually managing positions.