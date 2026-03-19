---
hide_table_of_contents: true
---

# Market Factory

**Contract:** [`PendleMarketFactoryV7Upg`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/Market/PendleMarketFactoryV7Upg.sol)

The factory is the canonical registry for Pendle markets. It deploys new markets and manages protocol-wide fee configuration.

### [`createNewMarket`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/Market/PendleMarketFactoryV7Upg.sol#L70-L103)

```solidity
/**
 * @notice Create a market between PT and its corresponding SY with scalar & anchor config.
 * Anyone is allowed to create a market on their own.
 */
function createNewMarket(
    address PT,
    int256 scalarRoot,
    int256 initialAnchor,
    uint80 lnFeeRateRoot
) external returns (address market);
```

**Parameters:**
- `PT` — Address of the Principal Token. Must be a valid PT registered by the yield contract factory and not yet expired.
- `scalarRoot` — Capital efficiency vs. rate range trade-off. Higher values concentrate liquidity more tightly around the anchor rate, providing greater efficiency but a narrower tradeable range. Must be positive.
- `initialAnchor` — The implied rate at which the market is most capital-efficient at launch. Should be set close to the expected current implied APY of the underlying asset. Must be ≥ 1 (expressed as a fixed-point number).
- `lnFeeRateRoot` — Fee rate as a natural log value. Maximum is `ln(1.05) ≈ 0.0488`. Fee per swap scales with the interest rate impact of the trade.

**Notes:**
- Anyone can call this — market creation is permissionless.
- Multiple markets for the same PT (with different `scalarRoot`, `initialAnchor`, or `lnFeeRateRoot`) are valid and can coexist.
- Reverts if the exact combination of `(PT, scalarRoot, initialAnchor, lnFeeRateRoot)` already exists.

### `VERSION`

```solidity
function VERSION() external view returns (uint256);
```

Returns the version number of the factory contract.

:::note
Starting from **VERSION 7**, vePENDLE is deprecated and is no longer accounted into `activeBalance` for gauge reward calculations.
:::

### [`isValidMarket`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/Market/PendleMarketFactoryV7Upg.sol#L115-L117)

```solidity
/// @dev for gas-efficient verification of market
function isValidMarket(address market) external view returns (bool);
```

Returns `true` if the address was deployed by this factory. This is a low-level on-chain check — it confirms the contract was deployed by Pendle's factory, but says nothing about whether the market is active, whitelisted, or supported by the protocol.

:::tip
To get the list of **whitelisted and verified markets** tracked by Pendle (with TVL, APY, and other metadata), use the [Pendle API](../../Backend/ApiOverview) instead:

```
GET https://api-v2.pendle.finance/core/v1/markets/all
```
:::

### [`getMarketConfig`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/Market/PendleMarketFactoryV7Upg.sol#L105-L112)

```solidity
function getMarketConfig(address market, address router)
    external
    view
    returns (
        address treasury,
        uint80 overriddenFee,
        uint8 reserveFeePercent
    );
```

Returns the protocol fee configuration for a given market and router combination. `overriddenFee == 0` means no override is active for that router (the market's base fee applies). This is called internally by `readState(router)` on every market interaction.
