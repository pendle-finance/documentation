---
hide_table_of_contents: true
---

# Yield Contract Factory

**Contract:** [`PendleYieldContractFactoryUpg`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/YieldContracts/PendleYieldContractFactoryUpg.sol)

The factory is the canonical registry for all Pendle PT/YT pairs. It deploys new yield contracts and tracks existing ones.

### [`createYieldContract`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/YieldContracts/PendleYieldContractFactoryUpg.sol#L108-L166)

```solidity
/**
 * @notice Create a pair of (PT, YT) from any SY and valid expiry.
 * Anyone can create a yield contract.
 */
function createYieldContract(
    address SY,
    uint32 expiry,
    bool doCacheIndexSameBlock
) external returns (address PT, address YT);
```

**Parameters:**
- `SY` — Address of the Standardized Yield token to tokenize.
- `expiry` — Unix timestamp for the PT/YT expiry. Must be in the future and divisible by `expiryDivisor` (e.g., 86400 enforces day-boundary expirations).
- `doCacheIndexSameBlock` — If `true`, the PY index updates at most once per block (gas optimization). This trades a small amount of real-time precision for reduced write costs on high-frequency blocks.

**Notes:**
- Anyone can call this — yield contract creation is permissionless.
- Reverts if the `(SY, expiry)` pair already exists (`YCFactoryYieldContractExisted`).
- Reverts if `expiry` is in the past or not divisible by `expiryDivisor` (`YCFactoryInvalidExpiry`).

### Query Functions

```solidity
// Look up existing PT/YT addresses for a given SY and expiry
function getPT(address sy, uint256 expiry) external view returns (address);
function getYT(address sy, uint256 expiry) external view returns (address);

// Validate whether an address is a Pendle-deployed PT or YT
function isPT(address token) external view returns (bool);
function isYT(address token) external view returns (bool);
```

**Usage:** Before creating a yield contract, call `getPT(sy, expiry)` — if it returns a non-zero address, the pair already exists and you should use that address directly.

### `VERSION`

```solidity
function VERSION() external view returns (uint256);
```

Returns the version number of the factory contract.

### Protocol Fee Parameters

These are set by the factory owner and applied to all yield contracts at redemption time:

```solidity
// Fraction of YT interest sent to treasury (max 20%, 1e18 = 100%)
function interestFeeRate() external view returns (uint256);

// Fraction of external reward tokens sent to treasury (max 20%, 1e18 = 100%)
function rewardFeeRate() external view returns (uint256);
```

These are read-only from an integrator's perspective; they are deducted automatically on `redeemDueInterestAndRewards` calls.
