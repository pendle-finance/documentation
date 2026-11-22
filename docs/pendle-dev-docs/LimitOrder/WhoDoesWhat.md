---
hide_table_of_contents: true
---

# Who Does What

A Pendle V2 limit order is a trade between two users: a maker and a taker. The Limit Order contract settles the trade on-chain. The Pendle API and the Pendle app are optional tools around it.

## The three parts

| Part | What it is | Who uses it |
|------|------------|-------------|
| Settlement | The Limit Order contract. It checks the maker's signature and moves tokens between the maker and the taker in one transaction. | The taker calls it. Any address can call `fill`. |
| Signed orders | Orders that makers sign. A signed order is valid wherever it is stored. | Makers publish them through the Pendle API, on-chain with `preSignSingle`, or both. A pre-signed order is public on-chain: the contract emits the full order in an `OrderPreSigned` event. |
| Quotes | The Pendle app and the Hosted SDK can suggest which orders to fill and how much to trade on the AMM. | The user reviews the quote and signs the transaction. Other tools can make their own quotes. |

## Roles

| Role | What it does |
|------|--------------|
| Maker | Signs an order that sets a token, an amount, an implied APY and an expiry. Keeps the tokens in their own wallet until a taker fills the order. Can cancel the order on-chain at any time with `cancelSingle`, `cancelBatch` or `increaseNonces`. |
| Taker | Chooses which signed orders to fill. Calls `fill` on the Limit Order contract directly, or through the Pendle Router in a swap. Pays the fee and the gas. |
| Limit Order contract | Checks the signature, expiry, nonce and remaining amount of each order. Moves tokens between the maker and the taker in the same transaction, at the rate the maker signed. Sends the fee to the fee recipient. |
| Contract owner | Sets the fee rate for each market and the fee recipient. Can cancel any open order with `forceCancel`, only in an emergency, and can upgrade the contract. Sets a fee rate only for markets that passed security review and audits. See [Owner Parameters](./LimitOrderContract.md#owner-parameters). Cannot sign orders or fill orders for users. |
| Pendle API | An optional service operated by an entity in the Pendle Group. It accepts every signed order that the contract can fill, treats all makers the same, and serves active orders on [public endpoints](https://api-v2.pendle.finance/limit-order/docs#/Taker) and the [Socket.IO feed](../Backend/SocketIO.mdx#order-book). It does not sign or send transactions for users. |
| Pendle app and Hosted SDK | Optional tools that build a quote: which orders to fill and how much to trade on the AMM. The user sees the result and signs. The tools do not hold user funds. |
| Arbitrageurs | Any address can fill orders and trade on the AMM in the same transaction through the [callback](./LimitOrderContract.md#callback-mechanism). An entity in the Pendle Group runs one arbitrage bot, as the [Terms of Use](/pendle-v2/TermsOfUse) disclose. It reads the same order data as every other user. |

## What needs the Pendle API

Nothing in settlement needs the Pendle API. With the contract alone, makers can post and cancel orders, takers can find every pre-signed order from chain events, and takers can fill any signed order they hold. See [Without the Pendle API](./WithoutTheApi.md).
