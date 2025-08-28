# Margin

Similar to other derivative exchanges, Boros supports both cross margin and isolated margin modes:

- **Cross Margin**: Enables maximum capital efficiency by sharing collateral across multiple markets within the same collateral zone. A single collateral deposit can back positions across all markets in the zone, allowing unrealized profits in one market to offset potential losses in another.

- **Isolated Margin**: Constrains collateral to a single market, providing position-level risk isolation. Liquidations in an isolated market only affect that specific position and do not impact other isolated positions or cross-margin positions.

This document covers the essential concepts of Boros margin system. For complete specifications, please refer to the [Boros whitepaper](https://github.com/pendle-finance/boros-core-public/blob/main/whitepapers/Boros.pdf).

## Position Value and Total Value

### Position Value

The position value represents the current unrealized profit or loss of an interest rate swap position:

```
Position Value = Position Size × Mark Rate × Time to Maturity
```

### Total Value

A user's total value across all positions is calculated as:

```
Total Value = Account Cash + Σ(Position Values across all markets)
```

This total value determines the user's available margin for new positions and liquidation risk.

## Initial Margin

Initial margin requirements must be satisfied when opening new positions to ensure sufficient collateral backing.

### Pre-scaling Initial Margin

The pre-scaling initial margin (PIM) for each component is calculated as:

```
Pre-scaling IM = |Size| × max(|Rate|, Rate Threshold)
```

Where `Rate Threshold` is a market parameter that sets the minimum rate used for margin calculations.

### Combined Initial Margin

The system combines initial margin requirements from:

1. **Active Position**: Existing standalone position.
2. **Long Orders**: Unfilled buy orders
3. **Short Orders**: Unfilled sell orders

PIM for active position is using with mark rate. PIM for orders are calculated using order rates.

The calculation evaluates worst-case margin requirements for both long and short sides:

**Long-side Pre-scaling IM:**

- If current position is SHORT and total long order sizes ≤ |short position size|: Long PIM = 0 (orders only reduce position)
- Otherwise: Long PIM = Sum of long orders' PIM + position PIM (adjusted for direction)

**Short-side Pre-scaling IM:**

- If current position is LONG and total short order sizes ≤ |long position size|: Short PIM = 0 (orders only reduce position)
- Otherwise: Short PIM = Sum of short orders' PIM + position PIM (adjusted for direction)

**Final Pre-scaling IM** = max(Long-side PIM, Short-side PIM)

This ensures sufficient margin for the worst-case scenario where all orders on one side get filled.

#### Examples

_Note: For simplicity, these examples ignore the rate threshold parameter and use the actual rates directly._

**Example 1: Long position with additional long orders**

- Current position: LONG 1000 units at mark rate 5%
- Open orders: LONG 500 units at 4.5%
- Position PIM = 1000 × 5% = 50
- Long orders PIM = 500 × 4.5% = 22.5
- **Long-side PIM** = 50 + 22.5 = 72.5 (position and orders add up)
- **Short-side PIM** = 0 (no short orders)
- **Final PIM** = 72.5

**Example 2: Long position with small short orders (not enough to flip position)**

- Current position: LONG 1000 units at mark rate 5%
- Open orders: SHORT 600 units at 5.5%
- Position PIM = 1000 × 5% = 50
- Short orders PIM = 600 × 5.5% = 33
- **Long-side PIM** = 50 (no long orders)
- **Short-side PIM** = 0 (600 < 1000, orders only reduce position)
- **Final PIM** = 50

**Example 3: Long position with large short orders (can flip position)**

- Current position: LONG 1000 units at mark rate 5%
- Open orders: SHORT 2500 units at 6%
- Position PIM = 1000 × 5% = 50
- Short orders PIM = 2500 × 6% = 150
- **Long-side PIM** = 50 (no long orders)
- **Short-side PIM** = 150 - 50 = 100
- **Final PIM** = 100 (Short-side PIM is larger)

### Final Initial Margin

The actual initial margin requirement scales the pre-scaling amount:

```
Initial Margin = Pre-scaling IM × IM Factor × Personal Factor × max(Time to Maturity, Time Threshold)
```

### Opening Position Requirements

To open new positions:

```
Total Initial Margin (all markets) ≤ User's Total Value
```

### Margin Check for Closing Orders

When initial margin requirements are not met, users can still place orders under "closing-only" conditions:

- **Position Size Reduction**: Orders must reduce absolute position size (no position flipping)
- **No Opposite Side Orders**: Cannot place orders on the opposite side of existing position
- **Rate Bounds**: Closing rate must be within reasonable bounds from mark rate

These relaxed conditions allow users to reduce risk even when under-collateralized.

## Maintenance Margin and Liquidation

### Maintenance Margin

Maintenance margin represents the minimum collateral required to keep positions open:

```
Maintenance Margin = |Position Size| × max(|Mark Rate|, Rate Threshold) × MM Factor × max(Time to Maturity, Time Threshold)
```

### Health Ratio

A user's health ratio indicates their margin safety:

```
Health Ratio = Total Value / Total Maintenance Margin
```

- **Health Ratio > 1**: Position is healthy
- **Health Ratio ≤ 1**: Position is eligible for liquidation

### Liquidation Process

When a user's total value drops below maintenance margin requirements, their position becomes eligible for liquidation. Liquidation is a permissioned action carried out by Pendle to maintain protocol solvency.

**Liquidation Mechanics:**

1. Position is closed (partially or fully) at current mark rate
2. Liquidator takes over the closed position
3. Liquidation incentive is transferred from liquidated user to liquidator

**Liquidation Incentive:**

```
Liquidation Incentive = min(Incentive Factor, Health Ratio) × Change in Maintenance Margin
```

Where the **Incentive Factor** is calculated as:

```
Incentive Factor = Base Factor + Slope Factor × (1 - Health Ratio)
```

This structure provides larger incentives as positions become more distressed, encouraging timely liquidation.

### Forced Deleverage

When insufficient liquidity exists for normal liquidation and a user's health ratio continues declining to **0.7**, the system performs forced deleverage as a last resort.

**Deleverage Process:**

1. Identifies accounts with opposite-side positions (typically highest leverage)
2. Forces a swap between distressed account and counterparty at mark rate
3. Total value across accounts remains unchanged
4. Maintenance margin requirements decrease, restoring account health

**Important Notes:**

- Forced deleverage is an emergency mechanism to protect protocol solvency
- This action is not expected to occur frequently under normal market conditions
- Priority targets are high-leverage positions on the opposite side

## Additional Restrictions

### Hard Open Interest Cap

Boros implements a hard cap on total open interest to limit system-wide risk:

```
Total Open Interest ≤ Hard OI Cap
```

When the system approaches this limit, "Closing only" mode may be activated for risk management.

### Closing Only Mode

Markets can enter closing-only mode during high-risk conditions. In this mode:

- Only orders that reduce position size are allowed
- New position opening is prohibited
- Market makers may be whitelisted to continue providing liquidity
