---
hide_table_of_contents: true
---

# LP Wrapper

**Contracts:**
- [`PendleLPWrapper.sol`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/offchain-helpers/PendleLPWrapper.sol)
- [`PendleLPWrapperFactory.sol`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/offchain-helpers/PendleLPWrapperFactory.sol)

## Overview

`PendleLPWrapper` wraps a Pendle LP token 1:1 into a plain ERC-20, making it compatible with money markets (e.g., Morpho, Aave) that require collateral tokens to behave as standard, non-rebasing ERC-20s.

**Why wrapping is needed:** Pendle LP tokens call `redeemRewards` on every token transfer (via `_beforeTokenTransfer`). This side-effect is incompatible with many money market protocols, which assume collateral tokens have no state-changing transfer hooks. The wrapper absorbs the reward logic internally: rewards are harvested to the wrapper contract itself, not the holder. The holder receives a clean 1:1 ERC-20 backed by the underlying LP.

**Exchange rate:** Always 1:1. `wrap` and `unwrap` involve no fees, slippage, or exchange rate.

## Finding a Wrapper

Wrappers are deployed and tracked by `PendleLPWrapperFactory`. Look up the wrapper address for any LP token before interacting:

```solidity
// PendleLPWrapperFactory
function wrappers(address LP) external view returns (address wrapper);
```

Returns the wrapper address for the given LP token, or `address(0)` if no wrapper exists for it yet. Wrapper creation is owner-gated — contact the Pendle team to have one deployed for a new LP.

## Wrapping & Unwrapping

Each `PendleLPWrapper` is specific to one LP token. It is an ERC-20 with name `"Pendle Market Wrapped"` and symbol `"PENDLE-LPT-WRAPPED"`.

### `wrap`

```solidity
function wrap(address receiver, uint256 netLpIn) external;
```

Transfers `netLpIn` LP tokens from `msg.sender` and mints an equal amount of wrapped tokens to `receiver`. Caller must approve the wrapper to spend LP tokens first.

### `unwrap`

```solidity
function unwrap(address receiver, uint256 netWrapIn) external;
```

Burns `netWrapIn` wrapped tokens from `msg.sender` and returns an equal amount of LP tokens to `receiver`.

### `LP`

```solidity
function LP() external view returns (address);
```

Returns the address of the underlying Pendle LP token this wrapper is backed by.

## Reward Handling

On every token transfer, the wrapper calls `IPMarket(LP).redeemRewards(address(this))` before updating balances. This snapshots accrued rewards into the wrapper contract itself rather than letting them accrue unevenly across holders.

Rewards accumulate in the wrapper and are periodically swept out by anyone calling:

```solidity
// PendleLPWrapperFactory
function redeemRewardsAndTransfer(address[] memory _wrappers) external;
```

This harvests all accumulated rewards from each wrapper and sends them to the factory's `rewardReceiver`:

```solidity
// PendleLPWrapperFactory
function rewardReceiver() external view returns (address);
```

**LP wrapper holders do not receive rewards directly.** Rewards are claimed by the designated `rewardReceiver` and later distributed to holders off-chain. Integrators building on top of the wrapper should be aware of this trade-off.

## Admin Functions

```solidity
// PendleLPWrapperFactory — owner only

// Update the reward recipient address
function setRewardReceiver(address _rewardReceiver) external onlyOwner;

// Disable or re-enable the per-transfer reward hook on a specific wrapper
function setRewardRedemptionDisabled(address _wrapper, bool _isRewardRedemptionDisabled) external onlyOwner;
```

`setRewardRedemptionDisabled` skips the `redeemRewards` call on every transfer. This can be used as a gas optimization in contexts where per-transfer reward accuracy is not required. Current state is readable via:

```solidity
// PendleLPWrapper
function isRewardRedemptionDisabled() external view returns (bool);
```

## Integration Notes

- **Collateral use:** Supply the wrapped token to the money market as collateral. Unwrap via `unwrap` to retrieve the underlying LP at any time.
- **Rewards:** Rewards do not flow to the wrapper holder directly. If your integration requires LP reward exposure, interact with the LP token directly rather than through the wrapper.
- **1:1 rate:** The wrapped token always redeems 1:1 for the underlying LP — there is no oracle or exchange rate to track.
