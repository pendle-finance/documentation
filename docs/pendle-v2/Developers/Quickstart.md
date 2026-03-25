---
hide_table_of_contents: true
---

# Quickstart

Pendle V2 is a yield-trading protocol that lets users split yield-bearing assets into Principal Tokens (PT) and Yield Tokens (YT), trade them on AMM markets, and provide liquidity — all on-chain. The fastest way to start is the off-chain Backend API — no wallet required.

## Prerequisites

- `curl` or any HTTP client (browser, `fetch`, `axios`, etc.)

## Step 1 — Browse available markets

**Endpoint:** `GET https://api-v2.pendle.finance/core/v2/markets/all`

Returns all Pendle markets across every supported chain. Supports `skip` and `limit` for pagination (default `limit` is 10, maximum is 100).

```bash
curl "https://api-v2.pendle.finance/core/v2/markets/all?limit=10&skip=0"
```

```js
const res = await fetch(
  "https://api-v2.pendle.finance/core/v2/markets/all?limit=10&skip=0"
);
const { markets } = await res.json();
console.log(markets);
```

Key fields in each market object:

| Field | Description |
|-------|-------------|
| `chainId` | Chain the market is deployed on (e.g., `1` for Ethereum, `42161` for Arbitrum) |
| `address` | Market contract address |
| `expiry` | Unix timestamp when the market matures |
| `impliedApy` | Current implied fixed APY of the market |
| `pt.price.usd` | Current PT price in USD |

## Step 2 — Get market data

**Endpoint:** `GET https://api-v2.pendle.finance/core/v2/markets/all`

Use the `address` field from Step 1 to identify markets of interest. For filtering and additional query options (e.g., by chain, by asset category), see the [full API reference](./Backend/ApiOverview.mdx).

The example below fetches all markets on Arbitrum (chainId `42161`) and filters client-side for a known market address:

```bash
curl "https://api-v2.pendle.finance/core/v2/markets/all?limit=100&skip=0" \
  | jq '[.markets[] | select(.chainId == 42161 and .address == "{MARKET_ADDRESS}")]'
```

Replace `{MARKET_ADDRESS}` with the address of the market you want to inspect (obtained from Step 1).

## Step 3 — Get sPENDLE staking data (optional)

**Endpoint:** `GET https://api-v2.pendle.finance/core/v1/spendle/data`

```bash
curl "https://api-v2.pendle.finance/core/v1/spendle/data"
```

Returns aggregate sPENDLE staking statistics including total PENDLE staked, historical APRs, per-epoch revenues, and airdrop breakdowns for the last 12 epochs.

## Next steps

:::tip

- **Full API reference** — endpoint details, query parameters, response schemas: [Backend API Overview](./Backend/ApiOverview.mdx)
- **On-chain Router** (swaps, add/remove liquidity, mint/redeem): [Pendle Router Overview](./Contracts/PendleRouter/PendleRouterOverview.md)
- **Deployed contract addresses** — all chains and environments: [Deployments](./Deployments.md)
- **Developer support** — questions, announcements, deprecation notices: [t.me/pendledevelopers](https://t.me/pendledevelopers)

:::
