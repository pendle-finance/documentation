---
hide_table_of_contents: true
---

# Limit Orders

Limit orders let users trade PT and YT with each other at a set implied APY. A maker signs an order, a taker fills it, and the Limit Order contract settles the trade on-chain. For the role of each party, see [Who Does What](./WhoDoesWhat.md).

## How It Works

1. **Makers** create an order that sets a token, an amount, an implied APY and an expiry. They either (a) sign it off-chain at no gas cost and publish it through the Pendle API — the recommended path for EOAs — or (b) pre-sign it on-chain via `preSignSingle` / `preSignBatch`, which publishes the full order in an `OrderPreSigned` event.
2. **Takers** choose the orders to fill, for example from the Pendle API, and fill them on-chain by calling the Limit Order contract. Pre-signed orders (and orders already partially filled) can be filled with an empty signature; ERC-1271 contract signatures are also supported.
3. The **Limit Order contract** settles each fill atomically. It moves tokens between the maker and the taker at the rate that the maker signed.

The [Pendle Hosted SDK](../Backend/HostedSdk.mdx) can include open limit orders in a swap quote. When enabled, the quote can fill some orders and trade the rest on the AMM, which helps most on large trades. The quote is a suggestion: the caller reviews the calldata and signs the transaction.

## Order Types

| Order Type | Description |
|------------|-------------|
| `SY_FOR_PT` | Swap SY (or a supported token) for PT |
| `PT_FOR_SY` | Swap PT for SY (or a supported token) |
| `SY_FOR_YT` | Swap SY (or a supported token) for YT |
| `YT_FOR_SY` | Swap YT for SY (or a supported token) |

## Sections

- [**Who Does What**](./WhoDoesWhat.md) — The role of makers, takers, the contract, the contract owner and the Pendle API
- [**Limit Order Contract**](./LimitOrderContract.md) — Smart contract reference: order struct, method definitions, callback mechanism, and owner parameters
- [**Create a Limit Order**](./CreateALimitOrder.md) — Guide for makers: generate, sign, and submit orders
- [**Cancel Limit Orders**](./CancelOrders.mdx) — Guide for makers: cancel specific orders or invalidate all via nonce
- [**Fill a Limit Order**](./FillALimitOrder.md) — Guide for takers: query and fill orders on-chain
- [**Without the Pendle API**](./WithoutTheApi.md) — Cancel, fill and post orders with the contract alone

## API Reference

- [Maker APIs](https://api-v2.pendle.finance/limit-order/docs#/Maker) — Generate order data, submit orders, view active orders
- [Taker APIs](https://api-v2.pendle.finance/limit-order/docs#/Taker) — Query available orders for filling
- [Order Book Socket.IO feed](../Backend/SocketIO.mdx#order-book) — Pushed order-book snapshots every 5s instead of polling REST

## Maker Incentives

Certain markets offer token rewards to makers who provide liquidity through limit orders.

### How Incentives Work

- **Epochs**: Incentives are distributed on a weekly basis.
- **Qualifying orders**: To be eligible, an order must be placed within the market's configured APY range and remain active for a minimum period. Orders that are placed and immediately canceled do not qualify.
- **Reward calculation**: Rewards are proportional to your order's effective making amount relative to the total qualifying volume within the epoch.

### Incentive Modes

| Mode | Description |
|------|-------------|
| `RELATIVE` | Rewards apply to orders placed within a configured APY range relative to the current market rate |
| `ABSOLUTE` | Rewards apply to orders placed within a fixed APY range |

### Qualifying for Rewards

1. Check whether the market has an active incentive program.
2. Place an order within the market's configured APY range.
3. Keep the order active — rewards accumulate proportionally to your share of total qualifying making volume within the epoch.
