---
hide_table_of_contents: true
---

# Pendle Ecosystem Vaults

This page applies to both Pendle Ecosystem USDC and Pendle Ecosystem High Yield USDC.

## The Two Vaults

| Vault | Address |
| --- | --- |
| Pendle Ecosystem USDC | `0x55C1B6e461a6334B567bAF0FEb5D728715446f05` |
| Pendle Ecosystem High Yield USDC | `0xcf609F8327E68b42AF54F9D529b9f65d68038435` |

Live APY, allocations and fees are shown on each vault's Morpho page.

## What It Is

The Pendle Ecosystem Vaults are USDC vaults on Morpho, on Ethereum, that lend exclusively to markets where Pendle PT is the collateral.

- USDC deposited into the vaults is lent to borrowers who post PT as collateral, giving PT loopers deeper USDC borrow liquidity.
- The vaults are non-custodial: depositors can withdraw at any time through Morpho, subject to the liquidity available in the vault.

## Who Runs It

The vaults are curated by Armitage by Wintermute.

- **What Armitage does.** Armitage is Wintermute's vault curation business. It curates non-custodial vaults on DeFi lending protocols: it picks the markets each vault lends to, sets the risk parameters, and monitors and rebalances positions for depositors.
- **Who Wintermute is.** One of crypto's largest trading firms, active since 2017. It trades more than $10B a day across 70+ venues, which gives Armitage a live view of liquidity and market stress.

## How Markets Are Chosen and Allocated

Armitage owns the process of choosing and allocating markets. Pendle is not a curator of the vaults, but supports in providing information on PT assets proposed by Armitage.

1. **Armitage does the due diligence.** It is the curator and reviews each PT and its underlying asset.
2. **Armitage sets allocation parameters.** It sets a supply cap for each market, the maximum USDC the vault can lend into it, and rebalances deposits between markets as conditions change.
3. **Changes are timelocked.** Raising a market's limit, or adding a new type of allocation, only takes effect after a waiting period, so depositors see it coming. Current timelocks are listed on each vault page.

## Risks

**Liquidity risk.** Withdrawals are paid from USDC that is not currently lent out. When most of the vault's USDC is borrowed (high utilization), a large withdrawal may have to wait until borrowers repay or the curator moves funds from other markets. High utilization also pushes borrow rates up, which encourages repayment.

**Bad debt risk.** If a PT's price falls faster than a loan can be liquidated, the borrower can owe more than the collateral is worth. Morpho shares any resulting bad debt proportionally among that market's lenders, which include the vault, so depositors bear the loss.

**Oracle risk.** Each Morpho market prices its PT collateral with an oracle fixed when the market is created. PT oracles typically use a Pendle market TWAP, a linear discount to maturity, or a mix of the two. No oracle is immune to mispricing or manipulation, which can trigger liquidations or bad debt.

**Underlying asset risk.** Each PT is backed by an underlying asset, such as sUSDS, sUSDe or reUSD. A depeg, exploit or issuer action affecting that asset, such as blacklisting, lowers the PT's value as collateral.

**Curation risk.** The curator chooses markets, caps and allocations. Most changes are timelocked, but these remain judgment calls that may not work as intended.

## Disclosure

By using this product, users acknowledge that they have read and accept the risk disclosures relating to the underlying Pendle protocol and PT assets set out in the Pendle's [Terms of Use](https://docs.pendle.finance/pendle-v2/TermsOfUse), which are incorporated into this disclosure by reference.
