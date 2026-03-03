---
hide_table_of_contents: true
---

# Limit Orders

Pendle's Limit Order system enables gasless, off-chain order creation with secure on-chain settlement. It allows users to place orders at specific implied APY rates, which are matched and settled through the Limit Order smart contract.

## How It Works

1. **Makers** create and sign limit orders off-chain (no gas required). Orders specify a desired implied APY rate and are stored on Pendle's backend.
2. **Takers** query available orders via the API and fill them on-chain by calling the Limit Order contract.
3. The **Limit Order contract** settles orders atomically, transferring tokens between makers and takers at the agreed rates.

Limit orders are also integrated into the [Pendle Hosted SDK](../Backend/HostedSdk.mdx) — when enabled, the SDK automatically includes limit order liquidity alongside AMM liquidity to improve execution prices, especially for large trades.

## Order Types

| Order Type | Description |
|------------|-------------|
| `SY_FOR_PT` | Swap SY (or a supported token) for PT |
| `PT_FOR_SY` | Swap PT for SY (or a supported token) |
| `SY_FOR_YT` | Swap SY (or a supported token) for YT |
| `YT_FOR_SY` | Swap YT for SY (or a supported token) |

## Sections

- [**Limit Order Contract**](./LimitOrderContract.md) — Smart contract reference: order struct, method definitions, and callback mechanism
- [**Create a Limit Order**](./CreateALimitOrder.md) — Guide for makers: generate, sign, and submit orders
- [**Cancel Limit Orders**](./CancelOrders.mdx) — Guide for makers: cancel specific orders or invalidate all via nonce
- [**Fill a Limit Order**](./FillALimitOrder.md) — Guide for takers: query and fill orders on-chain

## API Reference

- [Maker APIs](https://api-v2.pendle.finance/limit-order/docs#/Maker) — Generate order data, submit orders, view active orders
- [Taker APIs](https://api-v2.pendle.finance/limit-order/docs#/Taker) — Query available orders for filling
