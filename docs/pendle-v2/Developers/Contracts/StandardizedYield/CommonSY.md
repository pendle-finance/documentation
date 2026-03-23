---
hide_table_of_contents: true
---

# Common SY Contracts

## Overview

Pendle provides a set of **pre-built, audited** Standardized Yield (SY) implementations that cover the most common yield-bearing asset patterns. Partners doing a [Community Listing](../Integration/CommunityListing.md) should use one of these contracts when their asset fits — this avoids the overhead of writing and auditing a custom SY from scratch.

These contracts can be deployed through [`PendleCommonSYFactory`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/offchain-helpers/deploy/PendleCommonSYFactory.sol), described at the bottom of this page.

:::tip
When in doubt about which common SY to use, reach out to the Pendle team. Choosing the wrong type can result in incorrect `exchangeRate()` behavior or broken deposit/redeem paths.
:::

---

## Choosing the Right Common SY

| Type | Yield token type | `exchangeRate()` | Deposit tokens | Redeem tokens |
|---|---|---|---|---|
| **ERC-20 with Adapter** | Plain ERC-20 + optional adapter tokens | `1e18` (constant) | yieldToken + adapter tokens | yieldToken + adapter tokens |
| **ERC-20 with Oracle** | Plain ERC-20, rate from oracle | From oracle | yieldToken | yieldToken |
| **ERC-4626 with Adapter** | ERC-4626 vault, full deposit/redeem + optional adapter | `vault.convertToAssets(1e18)` | asset, yieldToken + adapter tokens | asset, yieldToken + adapter tokens |
| **ERC-4626 — No Redeem with Adapter** | ERC-4626 vault, restricted withdraw + optional adapter | `vault.convertToAssets(1e18)` | asset, yieldToken + adapter tokens | yieldToken only |
| **ERC-4626 — No Redeem, No Deposit** | ERC-4626, both deposit and withdraw restricted | `vault.convertToAssets(1e18)` | yieldToken only | yieldToken only |

:::note
All `WithAdapter` variants accept `adapter = address(0)` if no adapter is needed at deploy time. An adapter can be set later via `SY.setAdapter(adapterAddress)`.
:::

---

## Common SY Types

### ERC-20 with Adapter — [`PendleERC20WithAdapterSY`](https://github.com/pendle-finance/pendle-sy-public/blob/main/contracts/core/StandardizedYield/implementations/Adapter/extensions/PendleERC20WithAdapterSY.sol)

A 1:1 wrap of a plain ERC-20 token, with optional [adapter](#sy-adapters) support for depositing and redeeming via additional tokens.

**When to use:** The yield token is a standard non-rebasing ERC-20 whose share price against itself is always 1 (`1 SY = 1 yieldToken`). Yield in Pendle comes from **external incentives** (points, Merkle distributions) rather than on-chain token appreciation. If additional deposit/redeem tokens are needed (e.g., deposit `DAI` to receive `USDS`), attach an adapter. Common examples: `USDe`, `USDS`, reward tokens with fixed exchange rate.

**Key behaviors:**
- `exchangeRate()` = `1e18` (constant — no on-chain appreciation)
- `PIVOT_TOKEN` (adapter's pivot) = `yieldToken`
- `assetInfo()` returns `yieldToken` itself as the asset
- Without adapter: `getTokensIn()` / `getTokensOut()` = `[yieldToken]`
- With adapter: adds `adapter.getAdapterTokensDeposit()` / `getAdapterTokensRedeem()` to the lists

**Constructor params** (for `deployUpgradableSY`):
```solidity
bytes memory constructorParams = abi.encode(
    address _erc20,
    address _offchainRewardManager
);
bytes memory initData = abi.encodeWithSelector(
    PendleERC20WithAdapterSY.initialize.selector,
    string  _name,    // e.g. "SY USDS"
    string  _symbol,  // e.g. "SY-USDS"
    address _adapter  // address(0) if no adapter needed at deploy time
);
```

---

### ERC-20 with Oracle — [`PendleERC20WithOracleSY`](https://github.com/pendle-finance/pendle-sy-public/blob/main/contracts/core/StandardizedYield/implementations/PendleERC20WithOracleSY.sol)

A plain ERC-20 wrap where `exchangeRate()` is sourced from an external `IPExchangeRateOracle` contract and `assetInfo()` returns a separately specified underlying asset.

**When to use:** The exchange rate of the yield token against its underlying asset cannot be computed on-chain from the token itself — for example, a token bridged from another chain where the vault state lives. The rate is instead published on-chain via a dedicated oracle contract.

**Example:** `sUSDai` is an Arbitrum-native savings token. It is bridged to Plasma as a LayerZero OFT. On Plasma the vault's `convertToAssets` logic is unavailable, so a Chainlink feed is deployed to publish the `sUSDai / USDai` exchange rate. The SY on Plasma points `exchangeRateOracle` at that Chainlink adapter.

**Key behaviors:**
- `exchangeRate()` = `IPExchangeRateOracle(exchangeRateOracle).getExchangeRate()`
- `assetInfo()` returns `underlyingAsset` (separate from `yieldToken`)
- `getTokensIn()` / `getTokensOut()` = `[yieldToken]`

**Constructor params** (for `deployUpgradableSY`):
```solidity
bytes memory constructorParams = abi.encode(
    address _yieldToken,         // the ERC-20 yield token (e.g. sUSDai OFT on Plasma)
    address _underlyingAsset,    // asset it appreciates against (e.g. USDai)
    address _exchangeRateOracle, // IPExchangeRateOracle (e.g. Chainlink feed adapter)
    address _offchainRewardManager
);
bytes memory initData = abi.encodeWithSelector(
    PendleERC20WithOracleSY.initialize.selector,
    string  _name,
    string  _symbol,
    address _owner
);
```

**`IPExchangeRateOracle` implementations**

Pendle ships two ready-to-use oracle adapters that implement `IPExchangeRateOracle`. Deploy one of these and pass its address as `_exchangeRateOracle`.

#### [`PendleChainlinkExchangeRateWrapper`](https://github.com/pendle-finance/pendle-sy-public/blob/main/contracts/core/misc/PendleChainlinkExchangeRateWrapper.sol)

Wraps any Chainlink-compatible aggregator (`AggregatorV2V3Interface`). Reads `latestRoundData()` and normalises the answer to the 1e18 scale expected by the SY.

```solidity
constructor(
    address _chainlinkFeed,      // Chainlink aggregator address
    int8    _tokenDecimalsOffset // decimal adjustment: see note below
)
```

`tokenDecimalsOffset` bridges the gap between the feed's native decimals and the SY's required scale:
- `offset < 0` → result is **multiplied** by `10^|offset|` (feed has fewer decimals than needed)
- `offset > 0` → result is **divided** by `10^offset` (feed has more decimals than needed)
- `offset = 0` → feed decimals already match; only `oracleDecimals` normalisation is applied

#### [`PendleRedStoneRateOracleAdapter`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/internal/PendleRedStoneRateOracleAdapter.sol)

Wraps a RedStone push-model price feed (`IRedstonePriceFeed`). Reads `latestAnswer()` and rescales from the feed's `rawDecimals` to the target `decimals`.

```solidity
constructor(
    address _redStoneOracle, // RedStone push-feed address
    uint8   _decimals        // desired output decimals (typically 18)
)

// getExchangeRate() output:
// (latestAnswer * 10^decimals) / 10^rawDecimals
```

---

### ERC-4626 with Adapter — [`PendleERC4626WithAdapterSY`](https://github.com/pendle-finance/pendle-sy-public/blob/main/contracts/core/StandardizedYield/implementations/Adapter/extensions/PendleERC4626WithAdapterSY.sol)

A full [ERC-4626](https://eips.ethereum.org/EIPS/eip-4626) vault wrap with bidirectional deposit and redemption, plus optional [adapter](#sy-adapters) support for additional deposit/redeem tokens.

**When to use:** The yield token is a fully ERC-4626 compliant vault with unrestricted `deposit()` and `redeem()`. Users can enter and exit via the vault's underlying asset. If users should also be able to enter/exit with other tokens natively (e.g., deposit USDC → adapter converts USDC → vault asset → vault shares), attach an adapter. Common examples: `sUSDe`, `sDAI`, Morpho vaults.

**Key behaviors:**
- `exchangeRate()` = `IERC4626(yieldToken).convertToAssets(1e18)`
- `PIVOT_TOKEN` (adapter's pivot) = vault's `asset`
- `assetInfo()` returns the vault's `asset()`
- Without adapter: `getTokensIn()` / `getTokensOut()` = `[asset, yieldToken]`
- With adapter: adds `adapter.getAdapterTokens*()` to both lists

**Deposit flow with adapter token:**
1. Non-asset token `T` is transferred to the adapter
2. `adapter.convertToDeposit(T, amount)` converts `T → asset`
3. `IERC4626(yieldToken).deposit(amtAsset, address(this))` mints vault shares

**Constructor params** (for `deployUpgradableSY`):
```solidity
bytes memory constructorParams = abi.encode(
    address _erc4626,
    address _offchainRewardManager
);
bytes memory initData = abi.encodeWithSelector(
    PendleERC4626WithAdapterSY.initialize.selector,
    string  _name,
    string  _symbol,
    address _adapter  // address(0) if no adapter needed at deploy time
);
```

---

### ERC-4626 — No Redeem with Adapter — [`PendleERC4626NoRedeemWithAdapterSY`](https://github.com/pendle-finance/pendle-sy-public/blob/main/contracts/core/StandardizedYield/implementations/Adapter/extensions/PendleERC4626NoRedeemWithAdapterSY.sol)

An ERC-4626 wrap where **depositing** via the underlying asset is supported, but **redeeming back to the underlying asset is not**. Optional [adapter](#sy-adapters) support for extended deposit tokens.

**When to use:** The vault supports `deposit()` but has restricted or locked `redeem()` (e.g., cooldown periods, liquidity limits, or protocol-level withdrawal queues). Users who want to exit to the underlying asset must do so through secondary markets or the vault's own withdrawal mechanism. Add an adapter if users should be able to deposit using tokens other than `asset`.

**Key behaviors:**
- `exchangeRate()` = `IERC4626(yieldToken).convertToAssets(1e18)`
- `PIVOT_TOKEN` (adapter's pivot) = vault's `asset`
- `getTokensIn()` = `[asset, yieldToken] + adapter.getAdapterTokensDeposit()` (with adapter)
- `getTokensOut()` = `[yieldToken]` only — adapter is **not** used on the redeem side

**Constructor params** (for `deployUpgradableSY`): same as `PendleERC4626WithAdapterSY` above.

---

### ERC-4626 — No Redeem, No Deposit — [`PendleERC4626NoRedeemNoDepositUpgSY`](https://github.com/pendle-finance/pendle-sy-public/blob/main/contracts/core/StandardizedYield/implementations/PendleERC4626NoRedeemNoDepositUpgSY.sol)

The most restrictive ERC-4626 variant. Neither `deposit()` nor `redeem()` is called on the vault — the SY only wraps existing vault shares.

**When to use:** The vault does not support standard ERC-4626 `deposit(asset)` or `redeem(shares)` flows at all. Users must already hold vault shares; the SY is purely a wrapper that reads the vault's exchange rate. Common for locked positions, receipt tokens from bespoke protocols, or vaults with fully non-standard deposit mechanisms.

**Key behaviors:**
- `exchangeRate()` = `IERC4626(yieldToken).convertToAssets(1e18)`
- `getTokensIn()` = `[yieldToken]` only
- `getTokensOut()` = `[yieldToken]` only

**Constructor params** (for `deployUpgradableSY`):
```solidity
bytes memory constructorParams = abi.encode(
    address _erc4626,
    address _offchainRewardManager
);
bytes memory initData = abi.encodeWithSelector(
    PendleERC4626NoRedeemNoDepositUpgSY.initialize.selector,
    string _name,
    string _symbol
);
```

---

## SY Adapters

### What Is an Adapter?

An SY Adapter is an optional contract that extends a Common SY's supported deposit and redeem tokens beyond the base set (`yieldToken` and, for ERC-4626, `asset`). Without an adapter, the Pendle Router must rely on DEX swaps to convert between a user's token and the SY's base token, incurring price impact and fees. An adapter performs this conversion **natively and atomically**.

**Example:** A `PendleERC20WithAdapterSY` wrapping `USDS` can, via an adapter, accept `DAI` deposits. The adapter calls the Sky `DAI → USDS` converter on-chain. No DEX swap is needed.

An adapter is a **separate contract** plugged into the SY after deployment via `SY.setAdapter(adapterAddress)`. This lets adapters be added or swapped without redeploying the SY or migrating the market.

### `IStandardizedYieldAdapter` Interface

[Source](https://github.com/pendle-finance/pendle-sy-public/blob/main/contracts/interfaces/IStandardizedYieldAdapter.sol)

```solidity
interface IStandardizedYieldAdapter {
    /// @notice The intermediate token this adapter converts to/from.
    /// For ERC-20 SY: PIVOT_TOKEN = yieldToken
    /// For ERC-4626 SY: PIVOT_TOKEN = vault's asset
    function PIVOT_TOKEN() external view returns (address pivotToken);

    /// @notice Convert tokenIn → PIVOT_TOKEN.
    /// @dev tokenIn has already been transferred to this adapter before this call.
    function convertToDeposit(address tokenIn, uint256 amountTokenIn)
        external returns (uint256 amountOut);

    /// @notice Convert PIVOT_TOKEN → tokenOut.
    /// @dev PIVOT_TOKEN has already been transferred to this adapter before this call.
    function convertToRedeem(address tokenOut, uint256 amountPivotTokenIn)
        external returns (uint256 amountOut);

    /// @notice Preview convertToDeposit (off-chain / view).
    function previewConvertToDeposit(address tokenIn, uint256 amountTokenIn)
        external view returns (uint256 amountOut);

    /// @notice Preview convertToRedeem (off-chain / view).
    function previewConvertToRedeem(address tokenOut, uint256 amountPivotTokenIn)
        external view returns (uint256 amountOut);

    /// @notice Tokens this adapter accepts for deposit.
    function getAdapterTokensDeposit() external view returns (address[] memory tokens);

    /// @notice Tokens this adapter can output on redeem.
    function getAdapterTokensRedeem() external view returns (address[] memory tokens);
}
```

### `PIVOT_TOKEN` — The Adapter's Bridge

The key concept is the **pivot token**: the token the adapter converts *to* on deposit and *from* on redeem.

| SY type | `PIVOT_TOKEN` | What the adapter converts |
|---|---|---|
| ERC-20 with Adapter | `yieldToken` | `tokenIn → yieldToken` on deposit; `yieldToken → tokenOut` on redeem |
| ERC-4626 with Adapter | vault's `asset` | `tokenIn → asset` on deposit; `asset → tokenOut` on redeem |
| ERC-4626 No Redeem with Adapter | vault's `asset` | `tokenIn → asset` on deposit; _(redeem not supported)_ |

When `SY.setAdapter(_adapter)` is called, it validates that `adapter.PIVOT_TOKEN() == expected pivot`. This prevents accidentally attaching an adapter designed for a different SY type.

### Example: `PendleSUSDSAdapter`

[Source](https://github.com/pendle-finance/pendle-sy-public/blob/main/contracts/core/StandardizedYield/implementations/Adapter/examples/PendleSUSDSAdapter.sol)

This adapter allows a `PendleERC20WithAdapterSY` wrapping `USDS` to accept `DAI` as a deposit/redeem token. The Sky protocol provides a 1:1 DAI ↔ USDS converter.

```solidity
contract PendleSUSDSAdapter is IStandardizedYieldAdapter {
    address public constant USDS        = 0xdC035D45d973E3EC169d2276DDab16f1e407384F;
    address public constant DAI         = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address public constant PIVOT_TOKEN = USDS; // yieldToken of the SY

    // On deposit: DAI (already in adapter) → USDS (sent back to SY)
    function convertToDeposit(address, uint256 amountTokenIn)
        external override returns (uint256) {
        ISkyConverter(CONVERTER).daiToUsds(msg.sender, amountTokenIn);
        return amountTokenIn; // 1:1
    }

    // On redeem: USDS (already in adapter) → DAI (sent back to SY)
    function convertToRedeem(address, uint256 amountPivotToken)
        external override returns (uint256) {
        ISkyConverter(CONVERTER).usdsToDai(msg.sender, amountPivotToken);
        return amountPivotToken; // 1:1
    }

    function getAdapterTokensDeposit() external pure override returns (address[] memory tokens) {
        tokens = new address[](1);
        tokens[0] = DAI;
    }

    function getAdapterTokensRedeem() external pure override returns (address[] memory tokens) {
        tokens = new address[](1);
        tokens[0] = DAI;
    }
}
```

With this adapter attached:
- `SY.deposit(DAI, amount)`: `DAI → adapter.convertToDeposit → USDS → SY holds USDS`
- `SY.redeem(DAI, amount)`: `SY releases USDS → adapter.convertToRedeem → DAI → user`

### Writing Your Own Adapter

Partners are responsible for writing, testing, and auditing their own adapters. Key requirements:

1. **`PIVOT_TOKEN` must match** the SY's expected pivot (`yieldToken` for ERC-20 SY; vault `asset` for ERC-4626 SY).
2. **`convertToDeposit` and `convertToRedeem` are stateful** — they receive the input token pre-transferred and must send the output to `msg.sender` (the SY contract).
3. **`previewConvert*` functions are view** — used by `SY.previewDeposit`/`SY.previewRedeem`. They should match the actual conversion as closely as possible.
4. **Approvals must be set in the constructor** — the adapter typically needs infinite approvals to external converters/routers.

Reference implementation: [`PendleSUSDSAdapter`](https://github.com/pendle-finance/pendle-sy-public/blob/main/contracts/core/StandardizedYield/implementations/Adapter/examples/PendleSUSDSAdapter.sol)

---

## Deploying via `PendleCommonSYFactory`

[Source](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/offchain-helpers/deploy/PendleCommonSYFactory.sol)

`PendleCommonSYFactory` is the on-chain factory for deploying all common SY contracts. It uses a split-code deployment pattern (`BaseSplitCodeFactory`) to work around the EVM's contract size limit.

**Deployment address (all supported chains):** `0x466CeD3b33045Ea986B2f306C8D0aA8067961CF8`

### `deployUpgradableSY`

```solidity
function deployUpgradableSY(
    bytes32 id,
    bytes memory constructorParams,  // abi-encoded constructor args for the implementation
    bytes memory initData,           // abi-encoded initialize(...) call for the proxy
    address syOwner
) external returns (address SY);     // returns the proxy address
```

Deploys an implementation contract and wraps it in a `TransparentUpgradeableProxy`. `initData` is the ABI-encoded call to the `initialize(...)` function. The returned address is the proxy — this is the SY address to use.

### Registered Type IDs

These are the `bytes32 id` values registered in the factory for each common SY type. Each `bytes32` value is the `keccak256` hash of the corresponding ID string.

| SY Type | ID string | `bytes32` value |
|---|---|---|
| ERC-20 with Adapter | `"PendleERC20WithAdapterSY"` | `0xe5cce2b1999bf8c2cc4cf6d96d0569a24d8b782ba1647c09a8e1aa8bbfb98996` |
| ERC-4626 with Adapter | `"PendleERC4626WithAdapterSY"` | `0x73f41560741d6765943d3c955034291fe23d9141e3a4719bc97422d5bf019adc` |
| ERC-4626 — No Redeem with Adapter | `"PendleERC4626NoRedeemWithAdapterSY"` | `0x3b8dd2b992f773444e5422ba1db289c4657c57110d740dca7975dc095632ef23` |
| ERC-4626 — No Redeem, No Deposit | `"PendleERC4626NoRedeemNoDepositUpgSY"` | `0x5c1cddc0128e0b02bb711f84a022bf1c13177d4ab028830b702f3a77280025ea` |

### Deploying via `PendleCommonPoolDeployHelperV2`

[Source](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/offchain-helpers/deploy/PendleCommonPoolDeployHelperV2.sol)

`PendleCommonPoolDeployHelperV2` wraps the factory with market deployment and liquidity seeding into a single transaction. Use `deployCommonMarketById` for all common SY types:

```solidity
function deployCommonMarketById(
    bytes32 id,
    bytes memory constructorParams,
    bytes memory initData,
    PoolConfig memory config,
    address tokenToSeedLiquidity,
    uint256 amountToSeed,
    address syOwner
) external returns (PoolDeploymentAddrs memory);
```

This deploys the SY (via `deployUpgradableSY`), then immediately calls `deploy5115MarketAndSeedLiquidity` to create the Pendle market and seed initial liquidity. See [Common Market Deployments](../PendleMarket/CommonMarketDeployments.md) for full details on `PoolConfig` and the seeding flow.
