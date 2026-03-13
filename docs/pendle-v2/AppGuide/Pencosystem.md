---
hide_table_of_contents: true
---

# Pencosystem

The Pencosystem is the growing ecosystem of DeFi protocols, CeFi platforms, and institutions that have built on, partnered with, or integrated Pendle — collectively expanding what you can do with PT, YT, and LP positions beyond the Pendle app itself.

From money markets that accept PT as collateral, to yield strategy protocols that automate looping, to CEXs and wallets that bring Pendle to a broader audience — the Pencosystem makes Pendle yields accessible across the wider crypto landscape.

## Finding Integrations

### Global Pencosystem Directory

All Pencosystem partners are listed at [pendle.finance/pencosystem](https://pendle.finance/pencosystem), organized by category:

- **Money Market** — protocols where you can deposit PT as collateral and borrow against it (e.g., Aave, Morpho, Euler, Dolomite)
- **Yield Strategy** — protocols that build automated strategies on top of Pendle markets (e.g., Contango, Ceres, AFI)
- **CEX / Web3 Wallet** — centralized exchanges and wallets that have listed or integrated Pendle assets (e.g., Binance, Bybit, Coinbase, Bitget)
- **Insurance** — protocols providing coverage for Pendle positions

### Per-Market Pencosystem Tab

When viewing a specific PT market on the Pendle app, navigate to the **Pencosystem** tab to see which integrations are available for that market. This gives you a focused view of how you can put your PT to work beyond simply holding it.

The Money Market section displays key metrics at a glance:

| Field | Description |
|---|---|
| **Total Supply / Cap** | Total PT currently deposited in the money market and the protocol's supply cap, if any |
| **Assets to Borrow** | The asset you can borrow against your PT collateral, and its current borrow rate |
| **Max LTV** | The maximum Loan-to-Value ratio — how much you can borrow relative to your PT collateral value |
| **Available Liquidity** | How much is currently available to borrow |
| **Max Looping APY** | The maximum APY achievable by looping your PT position (see below) |

---

## Money Markets

Money market integration is one of the most useful aspects of the Pencosystem. By depositing PT as collateral, you can borrow against your fixed yield position — unlocking capital without giving up your PT exposure.

### Borrowing Against PT

1. Navigate to the PT market you hold and open the **Pencosystem** tab.
2. Select a money market (e.g., Morpho) and click the link to open it.
3. Deposit your PT as collateral.
4. Borrow an asset (e.g., USDC) against your PT, up to the displayed Max LTV.

PT is a fixed-yield asset that accrues value toward face value at maturity, making it a predictable and low-volatility form of collateral. Many money markets recognize this with relatively favorable LTV ratios.

### Looping PT for Leveraged Fixed Yield

Looping amplifies your fixed APY by using borrowed funds to buy more PT recursively. The **Max Looping APY** shown in the Pencosystem tab represents the theoretical maximum yield achievable through this strategy at current rates.

A typical loop:

1. Deposit PT as collateral → borrow USDC.
2. Use borrowed USDC to buy more PT on Pendle.
3. Deposit the new PT as additional collateral → borrow more USDC.
4. Repeat until you reach your desired leverage level.

The result is a larger PT position earning the fixed APY, with borrowing costs subtracted. The **Max Looping APY** reflects the net yield at maximum loop depth.

**Note:** Looping increases your exposure and carries liquidation risk if the PT's collateral value drops relative to your borrow position. Some protocols — such as Contango — automate this strategy and manage the loop on your behalf.

---

## Cross-Chain Access

With [Cross-Chain PT](./CrossChainPT.md), you can hold PT on a chain where a money market or yield strategy is available, even if the underlying Pendle market is on a different chain. This makes the full Pencosystem accessible regardless of where your funds originate.

For example, if a money market on HyperEVM accepts PT-wstETH as collateral, you can buy that PT from any chain and receive it directly on HyperEVM — ready to deposit without any additional bridging.
