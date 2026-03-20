---
hide_table_of_contents: true
---

# Cross-Chain PT

## 1. Why Cross-Chain PT?

Cross-chain PT enables protocols and money markets on spoke chains to list Pendle PT assets while leveraging the deep liquidity of hub chain markets:

- **Redeemable at maturity** — always redeemable 1:1 with the underlying asset at maturity
- **Predictable price behavior** — PT price generally increases toward the underlying asset value over time, though it can decrease temporarily due to yield rate changes
- **Low liquidation risk** — bounded price behavior reduces liquidation risk compared to other collateral types
- **Hub chain liquidity** — spoke chains benefit from the hub chain's AMM depth without needing their own deep pools

## 2. Requesting a New Cross-Chain PT Deployment

To request a new cross-chain PT deployment for your protocol or chain:

1. Submit your request via the [Cross-Chain PT Request Form](https://launch.pendle.finance/f/q1BK1hNyQ)
2. The Pendle team will review and complete the deployment

> **Note:** This request flow will migrate to the listing portal at [portal.pendle.finance](https://portal.pendle.finance) in the future.

## 3. Bridging, Selling, and Bridging Back

Once a cross-chain PT is deployed, liquidators and users need a way to sell PT received on the spoke chain. Since AMM depth lives on the hub chain, selling involves bridging the PT to the hub chain, swapping, and bridging proceeds back.

**Example: PT-sUSDe on Sonic**

1. **Bridge** PT-sUSDe from Sonic (spoke chain) to Ethereum (hub chain)
2. **Sell** PT-sUSDe on the Ethereum Pendle market (deeper liquidity)
3. **Bridge** proceeds (e.g., USDC) back to Sonic

### Using Pendle UI (No Code)

For manual or low-frequency operations:

1. Go to [Pendle Trade Markets](https://app.pendle.finance/trade/markets)
2. The UI handles bridging, swapping, and returning funds automatically in a single transaction

For a detailed UI walkthrough, see the [Cross-Chain PT App Guide](/pendle-v2/AppGuide/CrossChainPT).

### Using pt-bridger Script (Programmatic)

For programmatic or automated flows (e.g., liquidation bots), use the **pt-bridger** script:

- **Repository:** [pendle-finance/pt-bridger](https://github.com/pendle-finance/pt-bridger)

## 4. Risks of Cross-Chain PT in Money Markets

Protocols listing cross-chain PT as collateral should be aware of the following risks:

- **PT price can decrease before maturity** — changes in the yield rate can cause PT price to drop, even though it converges to 1:1 at maturity
- **Price drops may trigger liquidation** — if PT is used as collateral in a money market, a price decrease can push positions below the liquidation threshold
- **Liquidation on spoke chains** — if AMM depth on the spoke chain is sufficient, Pendle will run the liquidation trigger flow automatically. If AMM depth is not enough, liquidators can use their own tokens to liquidate the position first, then use the [pt-bridger script](#using-pt-bridger-script-programmatic) to bridge the PT to the hub chain, sell it, and bridge proceeds back

## 5. Liquidation AMM

To address the liquidation risk on spoke chains, Pendle provides a **Discount Rate AMM** — a specialized AMM designed to facilitate PT liquidations.

### What is the Discount Rate AMM?

The Discount Rate AMM is a mechanism deployed on spoke chains that provides liquidity specifically for PT liquidation scenarios. It enables liquidators to swap PT for the underlying asset at a discount.

### What is a Discount Rate and the Recommendation?

### How to Seed Liquidity

To bootstrap the Liquidation AMM with initial liquidity:

1. Coordinate with the Pendle team after your cross-chain PT deployment is complete
2. Provide initial liquidity to the Discount Rate AMM on the spoke chain
3. The seeded liquidity serves as the backstop for liquidation events

### Managing AMM Liquidity

- **Who manages it** — the protocol listing PT as collateral is responsible for ensuring adequate liquidation AMM liquidity on the spoke chain
- **Rebalancing after liquidation events** — when liquidations consume AMM liquidity, the pool needs to be replenished to maintain liquidation capacity
- **Flashloan-based liquidation flow** — liquidators can use flashloans to execute liquidations, selling the PT through the Discount Rate AMM and repaying the flashloan from the proceeds. After liquidation, the consumed liquidity should be replenished by the managing protocol
