import Hint from '@site/src/components/Hint';

# Margin and Liquidations

## Cross Margin

Boros allows for cross-margin with the same assets, allowing users to leverage the same collateral across multiple positions within the same collateral zone (e.g. Same BTC collateral utilized across all markets within the BTC zone).

Additionally, Boros also offers isolated pools, where collateral is only confined to specific markets.

The Collateral and Notional size will always be denoted in the same asset. For example, in the BTCUSDT-Binance market on Boros, each YU-BTCUSDT-Binance represents yield from funding rates of 1 BTC and the collateral required to back the position is in BTC.

Liquidations within a collateral zone will not affect positions in other zones or isolated pools.

<figure><img src="..//boros-docs/imgs/image (6).png" alt="" /><figcaption></figcaption></figure>

## Leverage

Leverage is the ratio of the position value against the required collateral backing it.

For example: A trader is looking to open a 10,000 YU-ETHUSDT, at current prices that position has a value of 20 ETH. If the market has a 2x leverage, the minimum amount of collateral the trader has to place will be 10 ETH. In other words, with 10 ETH collateral, the trader will be able to open a position of 20ETH.

## **Initial Margin**

Leverage can be set between 1 and the max leverage, which may vary by asset. The initial margin required to open a position is:

```jsx
Initial Margin = (NotionalSize * YearsToMaturity * ImpliedAPR) / Leverage
```

The initial margin is consumed by the position and CANNOT be withdrawn or used for cross margin positions. The remaining margin in your collateral that is not consumed by the position is the “Available Margin”.

Example 1: If you have \$2000 in collateral and proceeds to open a \$6000 position in a 3x leverage market, the margin consumed is \$2000 (i.e. fully consumed). The available margin is zero and the same collateral cannot be reused to open a new position.

Example 2: If you have \$10000 in collateral and proceeds to open a \$8000 position in a 2x leverage market, the margin consumed is \$4000 (i.e. \$4000 collateral is used to back an \$8000 position in a 2x lev market) and the available margin remaining is \$6000.

Unrealized profits from open positions are automatically added to the initial margin available for new positions, reflected by an increase in the "Available Margin" within the dApp. Conversely, unrealized losses will result in a decrease in "Available Margin.”

## **Maintenance Margin and Liquidations**

Positions can be liquidated when the position’s **Net Balance** falls below the maintenance margin requirement (i.e. Your total net worth in the position based on the current mark implied APR is less than the required maintenance margin).

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

It serves as the reference rate for Boros’ margin system—meaning your position value and unrealized PnL is calculated based on the mark implied APR, not the last traded price. This helps prevent unnecessary liquidations caused by short-term price spikes or potential manipulation.

### Maintenance Margin

The maintenance margin is set at 66% of the initial margin at max leverage upon opening a position. Positions can be liquidated when the their Net Balance falls below this maintenance margin.

```jsx
Maintenance Margin = Initial Margin * 66%
```

The maintenance margin on Boros declines linearly to the margin floor until maturity as the position approaches maturity, assuming all other factors remain constant.

This is because:

1. As time passes, part of the position is settled at each settlement interval (e.g. In a long-rates position, part of the position is settled when the position pays a fixed yield in exchange for the underlying yield during settlement).
2. As yields are settled, the effective position value declines overtime, hence maintenance margin required to maintain that position declines too.
3. At maturity, the entire position is settled (realized). Total position value is zero and maintenance margin is also zero. The realized position is reflected in the collateral.

<figure><img src="..//boros-docs/imgs/image (7).png" alt="" /><figcaption></figcaption></figure>

### Margin Floor

The margin floor on Boros is the minimal Initial Margin necessary to open a position when the market is in a state where it is subject to high implied APR volatility. This threshold prevents the required margin from falling below a certain level, ensuring that all positions will be adequately backed by sufficient collateral under all circumstances, safeguarding the platform against bad debts.

There are 2 types of Margin Floors on Boros.

#### **1. Margin Floor Near Maturity**

<figure><img src="..//boros-docs/imgs/image (8).png" alt="" /><figcaption></figcaption></figure>

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

The purpose of auto-deleveraging is strictly to ensure the platform stays solvent. If triggered, the users on the opposite side of the position at risk (ranked by unrealized P\&L and leverage used) will be forced to close their positions (i.e. take profit). These positions are closed at the current implied APR against the liquidated user, ensuring that the platform does not accrue bad debt.

Audo-deleveraging is an important final safeguard, with the goal of ensuring that under all circumstances, the protocol and users can continue to operate with ease of mind.

You can refer to a more in-depth calculation and other preventive mechanisms on Boros over at the [next page](detailed-calculations-on-margin-and-liquidations).&#x20;
