---
hide_table_of_contents: true
---

# Who Does What

A Pendle V2 limit order is a trade between two users: a maker and a taker. The Limit Order contract settles the trade on-chain. The Pendle API, the Pendle app and the Hosted SDK are optional tools around the contract.

| Role | What it does |
|------|--------------|
| Maker | Signs an order that sets a token, an amount, an implied APY and an expiry. Publishes it through the Pendle API, on-chain with `preSignSingle`, or both. A pre-signed order is public on-chain. Keeps the tokens in their own wallet until a taker fills the order, and can cancel the order on-chain at any time. |
| Taker | Chooses which signed orders to fill. Calls `fill` on the Limit Order contract directly, or through the Pendle Router in a swap. Pays the fee and the gas. |
| Limit Order contract | Checks the signature, expiry, nonce and remaining amount of each order. Moves tokens between the maker and the taker in the same transaction, at the rate the maker signed. Sends the fee to the fee recipient. Any address can call `fill`. |
| Contract owner | Holds owner powers over fee rates, emergency cancellation and upgrades. Cannot sign orders or fill orders for users. See [Owner Parameters](./LimitOrderContract.md#owner-parameters). |
| Pendle API | An optional service operated by an entity in the Pendle Group. It accepts every signed order that the contract can fill, treats all makers the same, and serves active orders on [public endpoints](https://api-v2.pendle.finance/limit-order/docs#/Taker) and the [Socket.IO feed](../Backend/SocketIO.mdx#order-book). It does not sign or send transactions for users. |
| Pendle app and Hosted SDK | Optional tools that build a quote: which orders to fill and how much to trade on the AMM. The user sees the quote and signs. Other tools can build their own quotes. The tools do not hold user funds. |
| Arbitrageurs | Any address can fill orders and trade on the AMM in the same transaction. An entity in the Pendle Group runs one arbitrage bot with the same order data as every other user. See [Limit Orders › Arbitrage](/pendle-v2/ProtocolMechanics/LiquidityEngines/OrderBook). |

Nothing in settlement needs the Pendle API. See [Without the Pendle API](./WithoutTheApi.md).
