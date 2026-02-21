---
hide_table_of_contents: true
---

# Community Listing Guide

Pendle has evolved from an ad-hoc, team-managed listing process to a structured, self-service **Community Listing** model. This empowers partners to deploy and manage their own markets with minimal intervention from the core team.

## Listing Workflow

The entire process is managed through the official [Pendle Listing Portal](https://listing.pendle.finance).

### Step 1: Initiate Submission

Access the listing portal at **[listing.pendle.finance](https://listing.pendle.finance)**. Registration requires a wallet, email, or Discord account, and linking a Telegram handle.

### Step 2: Complete Checklists

The portal guides you through a series of mandatory checklists:

| Checklist | Purpose |
|-----------|---------|
| **Asset Launching Checklist** | Gathers fundamental information about the asset, yield source, and desired market parameters (maturity, yield range) |
| **Security Checklist (ERC-4626)** | For ERC-4626 compliant assets — must be confirmed by the asset's auditors |
| **Security Checklist (Non-ERC-4626)** | For non-compliant assets (most assets on Pendle) |
| **Token Pricing & Metadata** | Details for displaying the asset correctly on the Pendle UI |

### Step 3: Develop the SY Token (If Necessary)

For most non-ERC-4626 assets, a custom **Standardized Yield (SY)** contract must be written. Pendle provides extensive documentation and **150+ reference implementations** in the [`Pendle-SY-Public`](https://github.com/pendle-finance/pendle-core-v2-public) GitHub repository.

**Requirements for SY integration:**
- The underlying asset must be a fully **transferable ERC-20** token
- There should be **no locking or vesting** periods associated with minting
- The yield generated should not go negative ("**up-only**" yield). For assets with potential negative yield, special mechanisms (e.g., insurance fund or Merkle-based distribution) are required

**All custom SY contracts must be audited.** Pendle can recommend and facilitate an audit with their retained auditors who have extensive experience with SY contracts.

:::tip
It is highly recommended to deploy custom SY contracts as **upgradable proxies** using Pendle's designated proxy admin. This allows for future modifications without requiring a full market migration.
:::

### Step 4: Deploy the Market

Once checklists are approved, partners can use the [`Pendle-Common-Pool-Deploy`](https://github.com/pendle-finance/Pendle-Common-Pool-Deploy) repository to deploy the SY and market contracts themselves.

### Step 5: Sign Risk Acknowledgment

Before deployment, the deploying entity must **sign a message on-chain** (e.g., via Etherscan's verified signatures page) acknowledging they assume all inherent risks for security vulnerabilities originating from their own contracts.

### Step 6: Seed Liquidity

After deployment, the partner is responsible for bootstrapping the pool with initial liquidity. See the [Pool Guide](../../AppGuide/Pool) for recommended seeding amounts and best practices.

### Step 7: Finalize with Pendle

Once seeded, the Pendle team handles the final steps:
- Setting up backend metadata and pricing
- Whitelisting the pool on the UI
- Enabling the pool for PENDLE incentive allocation

## Pool Admin Portal

Upon successful listing, protocols are granted access to a **Pool Admin Portal** to manage their market's metadata.

## Setting Market Parameters

When deploying a new market, you must define a minimum and maximum implied APY (the yield range). This range should be determined by:

- Historical yield volatility of the underlying asset
- Performance of similar markets
- Estimated APY from points campaigns
- A buffer to accommodate market fluctuations

:::caution
The yield range is **immutable** once the pool is deployed. If market dynamics push the implied yield outside this range, the pool goes "out of range" and a new market must be deployed with a wider range. See [Troubleshooting](../Troubleshooting.md#market-out-of-range-marketproportiontoohigh) for details.
:::
