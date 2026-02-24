---
hide_table_of_contents: true
---

# Troubleshooting Guide

This guide covers common errors and issues encountered when integrating with or using the Pendle Protocol. It is organized by category to help you quickly identify and resolve problems.

## General Troubleshooting Principles

When facing unexpected behavior, start with these client-side checks:

- **Hard Refresh and Clear Cache**: A simple hard refresh can resolve transient UI glitches or data display issues. If problems persist, clear browser cache and application storage.
- **Check Wallet and Network Connection**: Verify the correct wallet is connected and set to the appropriate network. An incorrect ETH balance display is almost always a sign of a wrong wallet connection.
- **Review Browser Console Logs**: Open the developer console (F12), retry the failing operation, and look for error messages. A screenshot of the console output is extremely helpful when reporting issues.
- **Check RPC and Security Software**: Transaction signing issues (e.g., wallet pop-up not appearing) are often related to the RPC provider, not Pendle's infrastructure. Try switching to a different public RPC from [Chainlist](https://chainlist.org). VPNs, firewalls, or malware protection software can sometimes block RPC communications.

### Bug Reporting Best Practices

To facilitate a swift resolution, provide as much detail as possible:

- **Transaction Hash (Tx Hash)**: The most critical piece of information, even for failed transactions.
- **Transaction Calldata**: For pre-transaction failures or simulation issues.
- **Wallet Address**: Helps trace user-specific states (balances, rewards, voting history).
- **Simulation Links**: Generate and share simulations using tools like [Tenderly](https://tenderly.co) or [Sentio](https://sentio.xyz).
- **Operation Specifics**: The blockchain network, market/pool address, input/output tokens and amounts, and the exact error message.

---

## Smart Contract Interaction Errors

### Slippage and Price Movement

Transactions can fail if the asset price moves beyond the specified slippage tolerance between transaction creation and on-chain confirmation.

- **Solution 1 (Preferred)**: Increase the transaction's gas fee (e.g., use 'aggressive' or 'instant' settings). This reduces confirmation time, minimizing the window for price changes.
- **Solution 2**: Increase the slippage tolerance in the dApp settings. This allows wider price fluctuation but may result in a less favorable execution price.

### Expired Aggregator Quotes (`APPROX_EXHAUSTED`)

Data generated for a transaction (e.g., a route from an aggregator or an `approx` parameter) is highly time-sensitive and often only valid for the block in which it was generated.

- **Error**: `Slippage: APPROX_EXHAUSTED` or `Insufficient PT`
- **Cause**: Using stale transaction data even a few blocks after generation.
- **Solution**: Always generate fresh calldata immediately before sending the transaction.

### `Slippage: search range overflow`

This error indicates the swap amount is too large for the market to handle at its current liquidity depth. Reduce the trade size or wait for more liquidity.

### Market Out of Range (`MarketProportionTooHigh`)

Pendle's AMM pools operate within a configured yield range. If high demand pushes the implied APY beyond the pool's upper boundary, the market goes **"out of range."**

- **Error**: `MarketProportionTooHigh` (error signature `0xfc68d09e`)
- **Impact**: The following actions are disabled:
  - Buying YT via market orders
  - Selling PT via market orders
  - Using the "Zap Out" function
- **Workaround**: Use **limit orders** instead of market orders.
- **Resolution**: The Pendle team typically redeploys the pool with a wider yield range. LPs in the old pool should migrate to the new pool.

### `No route found` / `No route found to add liquidity`

This error indicates the system could not find a viable path to convert the input token to the required asset(s).

- **Insufficient Liquidity**: Most common cause — the token pair lacks DEX liquidity on the specified chain.
- **Aggregator Issues**: The aggregator may be experiencing transient issues or may not support the token pair.
- **RPC Issues**: Sometimes caused by an underlying RPC problem.

### `liquidity insufficient`

The pool's liquidity is not deep enough for the requested trade size. This is distinct from "no route" — a route exists, but the trade is too large.

### `TransferHelper: TRANSFER_FROM_FAILED`

Often occurs during liquidity removal when the aggregator used for the transaction encounters issues, especially when zapping out to tokens requiring complex swap data.

### Reward Claiming Issues

- **`userReward` Returning Zero**: Calling `userReward` on a `PendleMarket` contract may return 0 even if rewards have accrued. The contract does not write accrued rewards to storage in real-time. To get accurate values, perform a **static call** (`eth_call` or `.callStatic`) to `redeemRewards(address user)`.
- **UI Showing Zero Rewards**: The Pendle UI uses a static call to check claimable rewards. If this call reverts (e.g., the recipient contract lacks a `receive()` function to accept native ETH rewards), the UI defaults to displaying 0.
- **Reverts on `redeemRewards` in Matured Pools**: An older implementation caused reward calculations to be incorrect after pool expiry. A **reward redeem proxy** contract was deployed as a fix. To redeem rewards from affected markets, call the proxy instead of the market contract directly.
- **Reverts Due to Depleted Incentives**: Transactions can revert if an external incentive program (e.g., ARB incentives from Silo pools) runs out of its reward tokens.

---

## Oracle and Price Feed Issues

### `increaseCardinalityRequired=true` / Error `0x39db717e`

- **Cause**: The oracle lacks enough historical price data points (cardinality) for the requested TWAP. The `observationCardinality` on the underlying AMM pool may be at its default value of 1.
- **Solution**:
  1. Call `increaseObservationCardinalityNext` on the market/oracle contract. A common required value is 1800. For some oracles, calculate as `duration / 11` (e.g., for a 900s TWAP, use `82`).
  2. **Wait ~15 minutes** for the oracle to populate with sufficient data. The `increaseCardinalityRequired` flag will switch to `false` once ready.

### `OracleTargetTooOld` / `TooStalePrice()`

The last price update from the oracle is older than the maximum acceptable age. This safety mechanism prevents trading on outdated information. If an oracle provider (e.g., Pyth) is unresponsive, Pendle's functions fall back to the last known exchange rate.

### `ORACLE_NOT_FEASIBLE`

Originates from an integrated DEX, not directly from Pendle. Often occurs in a **forked network** environment where the Chainlink or Pyth oracle has not been updated and has fallen behind the forked block's timestamp.

### Incorrect Price Display

Mismatches between the UI and on-chain reality (e.g., a matured PT displaying an incorrect price, or a "100% loss" display) are often due to an external data provider (like DeBank) supplying a faulty price feed.

---

## Data, Indexing, and API Errors

### Rate Limiting & Timeouts

For detailed information on rate limiting (CU system, headers, best practices) and recommended timeout settings, see the [API Overview — Rate Limiting](./Backend/ApiOverview.mdx#rate-limiting) section.

**Quick tips**: A `429` error is most often caused by the **RPC provider**, not the Pendle API. Use a private or paid archival RPC for intensive operations. Set a client-side HTTP timeout of at least **120 seconds**.

### Hosted SDK Limitations

The Hosted SDK only supports **whitelisted markets**. Interacting with a non-whitelisted market returns a `Market not found` error.

- **`400 Bad Request: syTokenOutAddr is not a valid SY token out`**: Previously an intermittent bug; now fixed.
- **`404 Not Found`**: When checking rewards eligibility, 404 means the address is not eligible. When querying a market, it means the market address is not found on the specified chain.
- **`Token is not swappable via aggregator`**: The token is not whitelisted for zapping. This can happen if a token initially has very high price impact; it can be whitelisted after review.

### `selector not found`

When calling functions like `getYtToSyRate` on a historical block, this error indicates the function did not exist on the contract at that point in time. The function was added in a later deployment and cannot query data before its deployment block.

---

## Third-Party Integration Issues

### Public RPC Limitations

Public RPCs (e.g., the default MetaMask Arbitrum RPC via Ankr) are prone to issues: multicall problems, corrupted data, and strict rate limits that interfere with data-intensive tasks.

**Recommendation**: For any serious development, backfilling, or production service, use a **private, archival RPC provider** (e.g., QuickNode).

### Aggregator-Related Failures

- **Stale Routes**: A common cause for `swapExactTokenForPt` reverts — the route provided is stale or invalid by execution time.
- **Simulation Inaccuracy**: Aggregator simulations can be unreliable when the wallet lacks sufficient funds for the simulated amount. The aggregator may return a "stale" route that looks good on paper but fails in a real transaction. Accurate simulation requires both sufficient balance and token approval.
- **KyberSwap Reliability**: KyberSwap has been noted as occasionally unreliable. If transactions fail, retry with the problematic aggregator excluded from the `aggregators` parameter.

### Protocol Pauses

In the event of a security compromise on an integrated protocol (e.g., Penpie, Zerolend), Pendle may pause its own contracts as a precautionary measure. Once the attack is confirmed to be isolated and that protocol has been paused, Pendle will unpause its contracts.

---

## Development and Testing

### No Maintained Testnet

Pendle **does not maintain a deployment on public testnets** like Sepolia.

### Forking Mainnet (Recommended Approach)

The standard approach for testing is to **fork a mainnet environment** (e.g., Ethereum, Arbitrum) to a local development environment. Tools like [Foundry](https://book.getfoundry.sh/) or [Hardhat](https://hardhat.org/) are essential.

**Hardhat Configuration Tips:**

- **Persistence**: When running multiple operations (e.g., deploying then seeding), ensure Hardhat connects to a **single, persistent fork instance**. Otherwise, each operation may create a new, independent fork, losing state from previous steps.
- **Shanghai Hardfork**: When using a forked network, `Invalid Opcode` errors are common if the environment is not configured for the Shanghai hardfork. Ensure your Hardhat version is up-to-date and configure the `hardforkHistory` in your `hardhat.config.ts`.
