# Glossary

**YU (Yield Units)**: Each YU represents yield from 1 unit of collateral in the underlying asset. For example, in a BTCUSDT(Hyperliquid) market on Boros with BTC as collateral, each YU in this market represents the funding rate of 1 BTC in Hyperliquid.

**Collateral**: The capital backing your position. Collateral is required to open any position on Boros. Collateral is open for liquidation when your Net Balance falls below the Maintenance Margin.

**Implied APR**: The “price” of the YU in yield percentage terms, essentially the market consensus on what the average future yield of YU will be. Upon entering a position, the implied yield at that point in time becomes the fixed rate payable / receivable (long / short position).

**Mark APR (Mark Implied APR):** The Implied APR used for unrealized PnL and liquidation calculations. This is similar to "mark price" in a perpetual exchange and is used to avoid unwanted consequences from short term price manipulations.

**Underlying APR**: The current APR of the underlying asset (i.e. the current funding rate of the underlying exchange).

**My Fixed APR:** The fixed APR of the currently open position. This is established by the weighted average of the implied APRs during entry.

**Long YU**: A long position on the underlying rate. Long rate positions pay a fixed APR to receive the underlying APR. The fixed APR is determined by the average implied yields of opening the position.

**Short YU**: A short position on the underlying rate. Short rate positions pay the underlying APR to receive a fixed APR. The fixed APR is determined by the average implied yields of opening the position.

**Maturity**: The end of the pool. At maturity, total position value is zero as it has been settled and reflected in your collateral.

**Liquidation Implied APR**: If the market Implied APR reaches this level, your position will be open for liquidation. This happens as implied APR directly affects your total position value.

**Total Position Value**: The value of the currently open position. Total position value decays linearly over time (assuming implied APY does not change) as yields are settled and realized into your collateral.

**Notional Size**: The equivalent underlying asset size that your YU position is earning yield from.

For example: if a user opens a 200-YU-ETHUSDT(Binance) position that is worth 10 ETH, the Notional size is 200 ETH and the total position value is 10 ETH.

**Net Balance**: Your portfolio’s total value in the position. Net Balance comprises of your collateral and unrealized PnL. Collateral value is affected at every yield settlement. Unrealized PnL is affected by the current implied APR of the market.

**Maintenance Margin**: The amount of capital required to keep your position afloat. Your position is open for liquidation when the Net Balance falls below the Maintenance Margin. Maintenance margin is set at 50% of Initial Margin.

**Initial Margin**: The margin required for the set max leverage. This margin is consumed from your collateral and cannot be withdrawn.

**Margin Floor**: The minimal margin necessary to initiate a position when a pool nears maturity or when its Implied APR approaches 0%. This threshold prevents the required margin from falling below a certain level, safeguarding against bad debt risks due to high volatility.
