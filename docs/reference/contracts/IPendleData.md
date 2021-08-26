---
sidebar_position: 2
---

# IPendleData

imports IPendleRouter, IPendleYieldToken, IPendlePausingManager, IPendleMarket

*Source*: [IPendleData.sol](https://github.com/pendle-finance/pendle-core/blob/master/contracts/interfaces/IPendleData.sol)
___

## REFERENCE

### Events

### `ForgeFactoryValiditySet`
Emitted when validity of a forge-factory pair is updated.
___
```solidity
event ForgeFactoryValiditySet(
  bytes32 forgeId,
  bytes32 marketFactoryId,
  bool valid
);
```

|     Parameter     |  Type   |                       Description                       |
| :---------------: | :-----: | :-----------------------------------------------------: |
|     `forgeId`     | bytes32 |                   Forge ID in bytes.                    |
| `marketFactoryId` | bytes32 |               Market factory ID in bytes.               |
|      `valid`      | address | Flag setting whether the Forge factory is valid or not. |

Signature: `0x9153d773f9bc4eb73e257d5a608cd7be93c422bed8aec9121f9bf9ab9a18b46f`

<br />

### `TreasurySet`
Emitted when Treasury address has been set.
___
```solidity
event TreasurySet(address treasury);
```

| Parameter  |  Type   |      Description      |
| :--------: | :-----: | :-------------------: |
| `treasury` | address | The treasury address. |

Signature: `0x3c864541ef71378c6229510ed90f376565ee42d9c5e0904a984a9e863e6db44f`

<br />

### `LockParamsSet`
Emitted when LockParams is set.
___
```solidity
event LockParamsSet(uint256 lockNumerator, uint256 lockDenominator);
```

|     Parameter     |  Type   |        Description         |
| :---------------: | :-----: | :------------------------: |
|  `lockNumerator`  | uint256 |  Numerator of lock param.  |
| `lockDenominator` | uint256 | Denominator of lock param. |

Signature: `0xa598b4dbf59d90f6b4cad0a1397a48801765d3b3e2bbb144cb8fca53d0737a02`

<br />

### `ExpiryDivisorSet`
Emitted when ExpiryDivisor is set.
___
```solidity
event ExpiryDivisorSet(uint256 expiryDivisor);
```

|    Parameter    |  Type   |      Description      |
| :-------------: | :-----: | :-------------------: |
| `expiryDivisor` | uint256 | Expiry divisor value. |

Signature: `0x90c17e2890a3d0c88fdb2b6383e9bf7f1a7b7c925325e2c810fb998c4f44ec06`

<br />

### `ForgeFeeSet`
Emitted when forge fee is set.
___
```solidity
event ForgeFeeSet(uint256 forgeFee);
```

| Parameter  |  Type   |   Description    |
| :--------: | :-----: | :--------------: |
| `forgeFee` | uint256 | Forge fee value. |

Signature: `0x2ef1bce60d7bbfae6c837d0b8e2a628c96ba39aaa79bd1aecfc972313843b7b7`

<br />

### `InterestUpdateRateDeltaForMarketSet`
Emitted when interestUpdateRateDeltaForMarket is set.
___
```solidity
event InterestUpdateRateDeltaForMarketSet(uint256 interestUpdateRateDeltaForMarket);
```

|             Parameter              |  Type   |                 Description                  |
| :--------------------------------: | :-----: | :------------------------------------------: |
| `interestUpdateRateDeltaForMarket` | uint256 | Interest update rate delta for market value. |

Signature: `0x65ec3e0128626032a413924458fc6b81e4c8c20bfcecd79df9a7822829929fff`

<br />

### `MarketFeesSet`
Emitted when market fees are set.
___
```solidity
event MarketFeesSet(uint256 swapFee, uint256 protocolSwapFee);
```

|     Parameter     |  Type   |          Description          |
| :---------------: | :-----: | :---------------------------: |
|     `swapFee`     | uint256 |  Market swap fee percentage.  |
| `protocolSwapFee` | uint256 | Protocol swap fee percentage. |

Signature: `0xdc40a2ee81b25d18d01c581d3094089420126c71715b91c435d672a506aea7bb`

<br />

### `CurveShiftBlockDeltaSet`
Emitted when the curve shift block delta is set.
___
```solidity
event CurveShiftBlockDeltaSet(uint256 blockDelta);
```

|  Parameter   |  Type   |              Description              |
| :----------: | :-----: | :-----------------------------------: |
| `blockDelta` | uint256 | Block delta value for curve shifting. |

Signature: `0x2e6187d5d52493f2d476b10975d0cce536900209dc8448ee5701ac80bc4c30dc`

<br />

### `NewMarketFactory`
Emitted when a new market factory is added.
___
```solidity
event NewMarketFactory(bytes32 indexed marketFactoryId, address indexed marketFactoryAddress);
```

|       Parameter        |  Type   |           Description           |
| :--------------------: | :-----: | :-----------------------------: |
|   `marketFactoryId`    | bytes32 | The market factory ID in bytes. |
| `marketFactoryAddress` | address |   The market factory address.   |

Signature: `0x1a525a612420d955b2801652ec888e9764e1ae41da65cc2561596d4618ccb539`

<br />

### `ForgeAdded`
Emitted when a new market factory is added.
___
```solidity
event ForgeAdded(bytes32 indexed forgeId, address indexed forgeAddress);
```

|   Parameter    |  Type   |      Description       |
| :------------: | :-----: | :--------------------: |
|   `forgeId`    | bytes32 | The forge ID in bytes. |
| `forgeAddress` | address |   The forge address.   |

Signature: `0x69055c715401f521099c448934ded38665f743c00f6c38849feef24404adc8e5`

<br />

### General Functions

### `router`
Gets a reference to the PendleRouter contract.
___
```solidity
function router() external view returns (IPendleRouter);
```
**Returns:**<br />
IPendleRouter — Returns the router contract reference.

<br />

### `pausingManager`
Gets a reference to the PendlePausingManager contract.
___
```solidity
function pausingManager() external view returns (IPendlePausingManager);
```
**Returns:**<br />
IPendlePausingManager — Returns the pausing manager contract reference.

<br />

### `treasury`
Gets a reference to the treasury contract.
___
```solidity
function treasury() external view returns (address);
```
**Returns:**<br />
Treasury contract address.

<br />

### `getPendleYieldTokens`
Gets the Pendle yield tokens given a forge ID, underlying yield token, and expiry.
___
```solidity
function getPendleYieldTokens(
    bytes32 forgeId,
    address underlyingYieldToken,
    uint256 expiry
) external view returns (IPendleYieldToken ot, IPendleYieldToken xyt);
```

|       Parameter        |  Type   |                   Description                   |
| :--------------------: | :-----: | :---------------------------------------------: |
|       `forgeId`        | bytes32 |             The forge ID in bytes.              |
| `underlyingYieldToken` | address |   The address of the underlying yield token.    |
|        `expiry`        | uint256 | The expiry of the yield contract in epoch time. |

**Returns:**<br />
ot — Returns the OT contract reference.<br />
xyt — Returns the YT contract reference.

<br />

### `getForgeAddress`
Gets the Forge address given a forge ID.
___
```solidity
function getForgeAddress(bytes32 forgeId) external view returns (address forgeAddress);
```

| Parameter |  Type   |      Description       |
| :-------: | :-----: | :--------------------: |
| `forgeId` | bytes32 | The forge ID in bytes. |

**Returns:**<br />
forgeAddress — Returns the address of the forge.

<br />

### `isValidXYT`
Checks if the underlying asset has a valid corresponding YT.
___
```solidity
function isValidXYT(
    bytes32 forgeId,
    address underlyingAsset,
    uint256 expiry
) external view returns (bool);
```

|     Parameter     |  Type   |                   Description                   |
| :---------------: | :-----: | :---------------------------------------------: |
|     `forgeId`     | bytes32 |             The forge ID in bytes.              |
| `underlyingAsset` | address |      The address of the underlying asset.       |
|     `expiry`      | uint256 | The expiry of the yield contract in epoch time. |

**Returns:**<br />
`true` if the underlying asset has a valid YT, otherwise `false`.

<br />

### `isValidOT`
Checks if the underlying asset has a valid corresponding OT.
___
```solidity
function isValidOT(
    bytes32 forgeId,
    address underlyingAsset,
    uint256 expiry
) external view returns (bool);
```

|     Parameter     |  Type   |                   Description                   |
| :---------------: | :-----: | :---------------------------------------------: |
|     `forgeId`     | bytes32 |             The forge ID in bytes.              |
| `underlyingAsset` | address |      The address of the underlying asset.       |
|     `expiry`      | uint256 | The expiry of the yield contract in epoch time. |

**Returns:**<br />
`true` if the underlying asset has a valid OT, otherwise `false`.

<br />

### `validForgeFactoryPair`
Checks if the Forge and Market Factory are a canonical pair in the network.
___
```solidity
 function validForgeFactoryPair(bytes32 forgeId, bytes32 marketFactoryId)
    external
    view
    returns (bool);
```

|     Parameter     |  Type   |           Description           |
| :---------------: | :-----: | :-----------------------------: |
|     `forgeId`     | bytes32 |     The forge ID in bytes.      |
| `marketFactoryId` | bytes32 | The market factory ID in bytes. |

**Returns:**<br />
`true` if the pair is valid, otherwise `false`.

<br />

### `otTokens`
Gets a reference to a specific OT.
___
```solidity
function otTokens(
    bytes32 forgeId,
    address underlyingYieldToken,
    uint256 expiry
) external view returns (IPendleYieldToken ot);
```

|       Parameter        |  Type   |                   Description                   |
| :--------------------: | :-----: | :---------------------------------------------: |
|       `forgeId`        | bytes32 |             The forge ID in bytes.              |
| `underlyingYieldToken` | address |   The address of the underlying yield token.    |
|        `expiry`        | uint256 | The expiry of the yield contract in epoch time. |

**Returns:**<br />
ot - Returns the OT contract reference.

<br />

### `xytTokens`
Gets a reference to a specific YT.
___
```solidity
function xytTokens(
    bytes32 forgeId,
    address underlyingYieldToken,
    uint256 expiry
) external view returns (IPendleYieldToken ot);
```

|       Parameter        |  Type   |                   Description                   |
| :--------------------: | :-----: | :---------------------------------------------: |
|       `forgeId`        | bytes32 |             The forge ID in bytes.              |
| `underlyingYieldToken` | address |   The address of the underlying yield token.    |
|        `expiry`        | uint256 | The expiry of the yield contract in epoch time. |

**Returns:**<br />
yt - Returns the YT contract reference.

<br />

### `isMarket`
Des
___
```solidity
function isMarket(address addr) external view returns (bool result);
```

| Parameter |  Type   |         Description         |
| :-------: | :-----: | :-------------------------: |
|  `addr`   | address | Address to check if Market. |

**Returns:**<br />
des

<br />

### `isXyt`
Des
___
```solidity
function isXyt(address _ddr) external view returns (bool result);
```

| Parameter |  Type   |       Description       |
| :-------: | :-----: | :---------------------: |
|  `addr`   | address | Address to check if YT. |

**Returns:**<br />
des

<br />

### `allMarketsLength`
Returns the number of markets currently existing.
___
```solidity
function allMarketsLength() external view returns (uint256);
```
**Returns:**<br />
Market length

<br />

### `forgeFee`
Returns the current forge fee when tokenizing yield bearing tokens.
___
```solidity
function forgeFee() external view returns (uint256);
```
**Returns:**<br />
Forge fee

<br />

### `interestUpdateRateDeltaForMarket`
Returns the update rate delta for updateparamL.
___
```solidity
function interestUpdateRateDeltaForMarket() external view returns (unt256);
```
**Returns:**<br />
Update rate delta

<br />

### `expiryDivisor`
Des
___
```solidity
function expiryDivisor() external view returns (uint256);
```
**Returns:**<br />
Des

<br />

### `lockNumerator`
Des
___
```solidity
function lockNumerator() external view returns (uint256);
```
**Returns:**<br />
Des

<br />

### `lockDenominator`
Des
___
```solidity
function lockDenominator() external view returns (uint256);
```
**Returns:**<br />
Des

<br />

### `swapFee`
Returns the swap fee when trading in the market.
___
```solidity
function swapFee() external view returns (uint256);
```
**Returns:**<br />
Swap fee

<br />

### `protocolSwapFee`
Returns the protocol swap fee when trading in the market.
___
```solidity
function protocolSwapFee() external view returns (uint256);
```
**Returns:**<br />
Protocol swap fee

<br />

### `curveShiftBlockDelta`
Returns the number of delta blocks before executing a curve shift.
___
```solidity
function curveShiftBlockDelta() external view returns (uint256);
```
**Returns:**<br />
Curve shift delta blocks

<br />

### `getMarketByIndex`
Returns the market address by passing its uint index.
___
```solidity
function getMarketByIndex(uint256 index) external view returns (address market);
```
**Returns:**<br />
The market address.

<br />

### `getMarket`
Gets a market given a YT and an ERC20 token.
___
```solidity
function getMarket(
    bytes32 marketFactoryId,
    address xyt,
    address token
) external view returns (address market);
```

|     Parameter     |  Type   |               Description               |
| :---------------: | :-----: | :-------------------------------------: |
| `marketFactoryId` | bytes32 |     The market factory ID in bytes.     |
|       `xyt`       | address |  The address of the YT in the market.   |
|      `token`      | address | The address of the token in the market. |

**Returns:**<br />
The market address.

<br />

### `getMarketFactoryAddress`
Gets a market factory address given the identifier.
___
```solidity
function getMarketFactoryAddress(bytes32 marketFactoryId)
    external
    view
    returns (address marketFactoryAddress);
```

|     Parameter     |  Type   |           Description           |
| :---------------: | :-----: | :-----------------------------: |
| `marketFactoryId` | bytes32 | The market factory ID in bytes. |


**Returns:**<br />
The market factory address.

<br />

### `getMarketFromKey`
Gets a market factory address given the params.
___
```solidity
function getMarketFromKey(
    address xyt,
    address token,
    bytes32 marketFactoryId
) external view returns (address market);
```

|     Parameter     |  Type   |               Description               |
| :---------------: | :-----: | :-------------------------------------: |
|       `xyt`       | address |  The address of the YT in the market.   |
|      `token`      | address | The address of the token in the market. |
| `marketFactoryId` | bytes32 |     The market factory ID in bytes.     |

**Returns:**<br />
The market address.
