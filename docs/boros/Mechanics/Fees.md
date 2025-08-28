# Fees

Boros charges various fees to maintain protocol sustainability. This section outlines all fee types that users should be aware of when trading on the platform.

## Position Opening Fees

Boros charges fees when opening new positions through:

- **Taker orders**: When executing against existing orders in the order book
- **OTC swaps**: When opening direct swaps with other users (typically AMMs)

**Important**: Maker orders (limit orders placed in the order book) incur **no fees** when placed. Fees are only charged to the taker when these orders are filled.

### Fee Formula

Both taker orders and OTC swaps follow the same fee calculation:

```
Fee = |Position Size| × Fee Rate × Time to Maturity
```

Where:

- **Position Size**: The notional size of the position being opened
- **Fee Rate**: 0.05% (0.0005)
- **Time to Maturity**: The time remaining until the swap maturity, expressed in years

### Example

Suppose you want to open a long position by taking an order:

- Position size: 100 ETH
- Current time: January 1, 2025
- Maturity: April 1, 2025 (90 days = 0.2466 years)
- Fee rate: 0.05%

```
Fee = 100 ETH × 0.0005 × 0.2466 = 0.01233 ETH
```

The same fee calculation applies for OTC swaps of the same size and maturity.

## Settlement Fees

Boros charges settlement fees on all open positions during each periodic payment settlement.

### Fee Formula

Settlement fees are calculated as:

```
Settlement Fee = |Position Size| × Settlement Fee Rate × Settlement Period
```

Where:

- **Position Size**: The absolute value of your current position size
- **Settlement Fee Rate**: Set by the protocol (varies by market)
- **Settlement Period**: Typically 8 hours (8/8760 = 0.000913 years)

### Example

For an open position during settlement:

- Position size: 50 ETH (long)
- Settlement fee rate: 0.2% (0.002)
- Settlement period: 8 hours = 0.000913 years

```
Settlement Fee = 50 ETH × 0.002 × 0.000913 = 0.0000913 ETH
```

This fee is charged every 8 hours (or the configured settlement period) for as long as the position remains open.

## Market Entrance Fees

A one-time market entrance fee is charged when you perform your first action in any specific market.

The entrance fee is denominated in the base asset of the market:

- **BTC markets**: 0.000008 BTC (approx. $1 USD)
- **ETH markets**: 0.00027 ETH (approx. $1 USD)

You can check if you've already paid the entrance fee by calling:

```solidity
bool hasEntered = MarketHub.hasEnteredMarketBefore(userAccount, marketId);
```

If `hasEntered` returns `true`, you won't be charged the entrance fee again for that market.
