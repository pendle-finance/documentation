---
hide_table_of_contents: true
---

# Cross-Chain Oracle Service

Bridged assets are increasingly common, and listing one on Pendle requires an on-chain exchange rate on the chain where the market lives. Pendle runs a **cross-chain oracle service** that reads the exchange rate on the asset's hub chain and delivers it to the bridged (target) chain, so partners can launch markets for bridged assets quickly without sourcing a third-party oracle.

## Terminology

- **Hub chain** — the chain where the asset originates and its exchange rate is natively computed.
- **Target chain** — the chain where the bridged asset (e.g., an OFT) lives and where the Pendle market is deployed.

## Example

sUSDe is native on Ethereum. To list the sUSDe OFT on Plasma, the SY contract on Plasma needs the sUSDe exchange rate to account for and distribute yield. The cross-chain oracle service reads the exchange rate from the sUSDe contract on Ethereum and relays it to Plasma, where the SY can consume it.

## Architecture

The service uses **[LayerZero V2](https://docs.layerzero.network/v2)** cross-chain messaging to send exchange rate updates from the hub chain to the target chain.

1. The exchange rate is read from the asset contract on the hub chain.
2. The rate is sent to the target chain as a LayerZero V2 message.
3. On the target chain, the latest relayed rate is stored on-chain, where the market's SY contract reads it.

## Update Configuration

An update is pushed to the target chain whenever either condition is met:

| Parameter | Value | Meaning |
|-----------|-------|---------|
| **Heartbeat** | 24 hours | Maximum time between updates, even if the rate has not moved |
| **Deviation** | 0.1% | An update is pushed as soon as the hub-chain rate deviates by this much from the last relayed value |

## Pricing

The fee covers running and maintaining the oracle **until the market's maturity**.

| Market type | Fee |
|-------------|-----|
| **Standard market** | 0.1 ETH / market / month |
| **Volatile market** | 0.2 ETH / market / month |

Assets with a more volatile exchange rate (e.g., sUSDat) fall under the volatile tier. The Pendle team confirms which tier applies before the oracle is deployed.

Compared with commissioning a dedicated feed from a third-party oracle provider, the service is significantly more cost-efficient and much faster to deploy.

## Requesting the Service

If you are listing a bridged asset and need its exchange rate on the target chain, mention it during the [Community Listing](./CommunityListing.md) process or reach out to the Pendle team via the [developer Telegram](https://t.me/pendledevelopers). Please include:

- The asset and its hub chain
- The exchange rate source contract and function on the hub chain
- The target chain where the market will be deployed
- The intended market maturity
