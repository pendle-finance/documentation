# Fees

Boros charges four types of fees. All fees are denominated in the collateral asset of the relevant market and deducted directly from your collateral balance.

Fee rate can differ by markets, check out the market details for specific information on the respective markets.

![Market Info](/boros-docs/imgs/market-info.png "Market Info")

## 1. Taker Fee (Swap Fee)

Charged when your order executes against a resting order on the book (Market Order). **Maker orders (limit orders that rest on the book) are never charged a fee,** the fee falls entirely on the taker at the point of fill.

The fee scales with position size and time to maturity:

> **Fee = Position Size × Fee Rate × Time to Maturity (in years)**

So a larger position or a longer-dated market incurs a proportionally higher fee. For example, at a 0.05% fee rate, opening a position 90 days before maturity costs roughly 0.012% of notional (0.05% × 90/365).

The practical implication: your position needs implied APR to move by at least **2× the taker fee** in your favor to be profitable on a round-trip (open + close), assuming no yield settlement income in between and both trades were done via market order (taker).

## 2. Settlement Fee (Open Interest Fee)

Charged on all open positions at each periodic settlement. This is the carrying cost of holding a position.

> **Settlement Fee = Position Size × Settlement Fee Rate × Settlement Period (in years)**

At an 0.2% annualized settlement fee rate, the cost per 8-hour period is approximately 0.000183% of your position size — small per cycle, but it accumulates over the life of a position. This is analogous to a funding fee on perpetuals.

The settlement fee applies regardless of whether the position is long or short.

## 3. Market Entrance Fee

A one-time fee charged the first time you interact with a given market. It is approximately **$1 USD** equivalent, denominated in the market's base asset:

- BTC markets: ~0.000008 BTC
- ETH markets: ~0.00027 ETH

This fee is charged once per market and is not repeated on subsequent interactions.

## 4. Liquidation Fee

Fee is charged on the liquidated position size and collected by the protocol. This is separate from the incentive paid to the liquidator. Like the taker fee, it scales with position size and time to maturity remaining at the point of liquidation.

## Fee Summary

| Fee | When | Maker / Taker | Discountable |
| --- | --- | --- | --- |
| Taker fee | On order fill | Taker only | Yes (Referral Discount) |
| Settlement fee | Every settlement on open positions | Both sides | No |
| Market entrance fee | First interaction per market | — | No |
| Liquidation fee | On liquidation | — | No |