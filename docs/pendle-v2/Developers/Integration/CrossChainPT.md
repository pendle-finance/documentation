---
hide_table_of_contents: true
---

# Cross-Chain PT

## Terminology

- Hub chain — the chain that the PT is originated from.
- Spoke chain — the chain that the bridged PT is deployed onto.

There is only 1 hub chain, but there can be multiple spoke chains. The terms "hub PT" and "spoke PT" are also used for the PT on the corresponding chain.

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

Protocols listing cross-chain PT as collateral should be aware of the following risks if the AMM on the <u>**hub chain**</u> is chosen for liquidation:

- **PT price can decrease before maturity** — changes in the yield rate can cause PT price to drop, even though it converges to 1:1 at maturity
- **Price drops may trigger liquidation** — if PT is used as collateral in a money market, a price decrease can push positions below the liquidation threshold
- **Bridging time** — there is a deplay to bridge PT and token back and fort, up to a few minutes. Liquidator is adviced to prepare their own tokens to liquidate the position first then use the [pt-bridger script](#using-pt-bridger-script-programmatic) to bridge the PT to the hub chain, sell it, and bridge proceeds back

## 5. Liquidation AMM

To address the liquidation risk on spoke chains, Pendle provides a **FixedPricePTAMM**.

- This AMM is deployed on **spoke chain**, enabling fast and direct liquidation with flash loan. There is no bridging deplay.
- This AMM allows to swap PT to token with a **fixed** price, which is provided by a [Linear discount oracle](../Oracles/DeterministicOracles/LinearDiscountOracle.md). The price feed by this oracle is **deterministic**, and is **linearly** converged to 1 at PT's maturity. The convergence rate is called the _discounted rate_.

Because the AMM is **fast** and **deterministic**, it is suitable for the liquidation application on spoke chain. We also refer to this AMM as the liquidation AMM.

Pendle can help deploy a **FixedPricePTAMM** with a Linear discount oracle of your **desired** _discounted rate_.

### The Recommended Discounted Rate for the Oracle

The oracle's _discounted rate_ is defined as the PT price **one year** before the PT's maturity (so it is also called the _annually discounted rate_).

It is **recommended** to choose the discounted rate to satisfy the **suboptimal price** condition: the _discounted price_ should **always** be smaller than PT market price on hub chain.

The _discounted rate_ can be derived from the maximum yield of the market on the hub chain with the following formula:

$$
\ln (1 + \textrm{max yield})
$$

For example, if the maximum yield of a market is 27%, the the recommended _discounted rate_ is $\ln(1 + 27\%) \approx 0.239 \approx 24\%$.

This formula guarantees the above condition about the suboptimal price.

The maximum yield of the market can be seen in the Specs section on Pendle DApp.

:::note Example for the USDe 2025Sep market.

| Click the spec button                                                       | Getting the yield range                                                           |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| ![image.png](/img/Oracles/ChoosingLinearDiscountParams/ui-market-specs.png) | ![image.png](/img/Oracles/ChoosingLinearDiscountParams/ui-market-yield-range.png) |

Here the liquidity yield range is 5% - 27%. So the maximum yield is 27%.

:::

:::tip

The specs page shows the maximum _possible_ yield that the market allows to trade. If the implied yield is low and is not likely to hit this maximum yield, lower _max yield_ can be chosen to increase the capital efficiency of the **FixedPricePTAMM**.

:::

### How to Seed Liquidity

To bootstrap the Liquidation AMM with initial liquidity:

1. Coordinate with the Pendle team after your cross-chain PT deployment is complete
2. Provide initial liquidity to the Discount Rate AMM on the spoke chain
3. The seeded liquidity serves as the backstop for liquidation events

### Managing AMM Liquidity

- **Who manages it** — the protocol listing PT as collateral is responsible for ensuring adequate liquidation AMM liquidity on the spoke chain
- **Rebalancing after liquidation events** — when liquidations consume AMM liquidity, the pool needs to be replenished to maintain liquidation capacity
- **Flashloan-based liquidation flow** — liquidators can use flashloans to execute liquidations, selling the PT through the Discount Rate AMM and repaying the flashloan from the proceeds. After liquidation, the consumed liquidity should be replenished by the managing protocol

### Liquidation Bot

Pendle runs liquidation bot for this AMM to help with liquidation on Morpho.

Please reach out if you want Pendle to support the liquidation bot system for your market.
