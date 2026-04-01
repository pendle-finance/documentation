---
hide_table_of_contents: true
---

# Decimals Wrapper

## Overview

`PendleDecimalsWrapper` is a thin ERC-20 wrapper that re-expresses any token with fewer than 18 decimals as a new token with exactly 18 decimals. No interest accrues, there is no rebasing, and no fees are taken — it is a purely mechanical decimal normalisation layer.

Within the Pendle system, this is the foundation of the **Scaled18 SY pattern**: an SY contract accepts a low-decimal raw token (e.g., LBTC with 8 decimals or USDC with 6 decimals), wraps it through `PendleDecimalsWrapper`, and exposes the 18-decimal representation to PY contracts and the market. The `PendleDecimalsWrapperFactory` creates and caches these wrappers so that only one wrapper ever exists per `(rawToken, targetDecimals)` pair.

**Sources:**
- [`PendleDecimalsWrapper.sol`](https://github.com/pendle-finance/pendle-sy-public/blob/main/contracts/core/misc/PendleDecimalsWrapper.sol)
- [`PendleDecimalsWrapperFactory.sol`](https://github.com/pendle-finance/pendle-sy-public/blob/main/contracts/core/misc/PendleDecimalsWrapperFactory.sol)
- **Interface**: [`IPDecimalsWrapper.sol`](https://github.com/pendle-finance/pendle-sy-public/blob/main/contracts/interfaces/IPDecimalsWrapper.sol)
- **Interface**: [`IPDecimalsWrapperFactory.sol`](https://github.com/pendle-finance/pendle-sy-public/blob/main/contracts/interfaces/IPDecimalsWrapperFactory.sol)

---

## `PendleDecimalsWrapper`

A standard ERC-20 token (inherits `PendleERC20`) with `decimals() = 18`. Wrapping and unwrapping is a simple multiply/divide by `10^(18 - rawDecimals)`.

The constructor enforces `rawDecimals <= 18`. The contract is always deployed by the factory — do not deploy it directly.

### Public State

| Variable | Type | Description |
|---|---|---|
| `factory` | `address` | The `PendleDecimalsWrapperFactory` that deployed this contract |
| `rawToken` | `address` | The original token being wrapped |
| `rawDecimals` | `uint8` | Decimals of `rawToken` |

### `wrap`

```solidity
function wrap(uint256 amount) external returns (uint256 amountOut);
```

Transfers `amount` of `rawToken` from `msg.sender` into the wrapper, then mints `rawToWrapped(amount)` of the wrapped token to `msg.sender`.

**Important:** `amount` is in raw units (i.e., `rawToken` decimals). The returned `amountOut` is in wrapped units (18 decimals). There is no rounding loss in the wrap direction.

### `unwrap`

```solidity
function unwrap(uint256 amount) external returns (uint256 amountOut);
```

Burns `amount` of the wrapped token from `msg.sender`, then transfers `wrappedToRaw(amount)` of `rawToken` back.

**Important:** `amount` is in wrapped units (18 decimals). `wrappedToRaw` performs integer division — the caller may receive slightly fewer raw units than the proportional share (the remainder stays in the contract as recoverable dust). See [`sweep`](#sweep).

### `rawToWrapped`

```solidity
function rawToWrapped(uint256 amount) public view returns (uint256);
```

```
wrappedAmount = amount × 10^(18 - rawDecimals)
```

Converts a raw-unit quantity to its 18-decimal representation. No rounding; exact for any `amount`.

### `wrappedToRaw`

```solidity
function wrappedToRaw(uint256 amount) public view returns (uint256);
```

```
rawAmount = amount / 10^(18 - rawDecimals)    (integer division — truncates)
```

Converts a wrapped-unit quantity back to raw units. Because of integer truncation, `wrappedToRaw(rawToWrapped(x))` always equals `x`, but `rawToWrapped(wrappedToRaw(y))` may be slightly less than `y` if `y` is not a multiple of the scale factor. The shortfall remains in the contract as dust.

---

## `PendleDecimalsWrapperFactory`

Idempotent factory that ensures only one wrapper exists per `(rawToken, targetDecimals)` pair. The factory is the sole deployer of `PendleDecimalsWrapper` instances.

:::note Current limitation

`getOrCreate` currently only supports `_decimals = 18`. Passing any other target decimals will revert. The API accepts `_decimals` as a parameter for forward-compatibility, but the implementation asserts `_decimals == 18` internally.

:::

### Constructor

```solidity
constructor(address _dustReceiver);
```

Sets the immutable `dustReceiver` address that receives dust from all wrappers created by this factory.

### `getOrCreate`

```solidity
function getOrCreate(
    address _rawToken,
    uint8   _decimals
) external returns (address decimalWrapper);
```

Returns the wrapper address for `(_rawToken, _decimals)`. If no wrapper exists yet, deploys a new `PendleDecimalsWrapper` and registers it. Subsequent calls with the same arguments return the already-deployed address without re-deploying.

**Reverts:** implicitly via `assert` if `_decimals != 18` (see note above).

Emits `DecimalWrapperCreated(rawToken, decimals, decimalWrapper)` on first deployment only.

### `decimalWrappers`

```solidity
mapping(address => mapping(uint8 => address)) public decimalWrappers;
```

Registry mapping `rawToken → targetDecimals → wrapper address`. Returns `address(0)` if no wrapper has been created for that pair.

### `dustReceiver`

```solidity
address public immutable dustReceiver;
```

The address that receives dust when any wrapper's `sweep()` is called.

### Events

| Event | Parameters | Description |
|---|---|---|
| `DecimalWrapperCreated` | `rawToken, decimals, decimalsWrapper` | Emitted when a new wrapper is deployed |

---

## Token Naming Convention

Wrapper tokens are named automatically by the factory:

| Property | Value |
|---|---|
| `name` | `"{rawToken.name} scaled18"` |
| `symbol` | `"{rawToken.symbol}-scaled18"` |
| `decimals` | `18` (always) |

For example, wrapping LBTC (8 decimals) produces a token named `"Lombard Staked Bitcoin scaled18"` with symbol `"LBTC-scaled18"`.

---

## How Scaled18 SY Contracts Use the Wrapper

For concrete implementations, refer to some of our examples:
- [`PendleLBTCBaseSYScaled18.sol`](https://github.com/pendle-finance/Pendle-SY-Public/blob/main/contracts/core/StandardizedYield/implementations/Lombard/PendleLBTCBaseSYScaled18.sol) — yield-bearing example with oracle-based `exchangeRate()`
- [`PendleUniBTCBeraSYUpgScaled18.sol`](https://github.com/pendle-finance/Pendle-SY-Public/blob/main/contracts/core/StandardizedYield/implementations/BedRock/PendleUniBTCBeraSYUpgScaled18.sol) — simple 1:1 example using `ScaledTokenMath`

---

## Further Reading

- [Common SY Contracts](./CommonSY.md) — the Scaled18 SY types that rely on this wrapper
- [StandardizedYield](./StandardizedYield.md) — `pricingInfo()` Scaled18 example (`PendleLBTCBaseSYScaled18`)
- [Unit and Decimals](../UnitAndDecimals.md) — full explanation of Scaled18 SY decimals and conversion rates
