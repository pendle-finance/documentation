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

| Parameter  |  Type   |      Description      |
| :--------: | :-----: | :-------------------: |
| `lockNumerator` | uint256 | Numerator of lock param. |
| `lockDenominator` | uint256 | Denominator of lock param. |

Signature: `0xa598b4dbf59d90f6b4cad0a1397a48801765d3b3e2bbb144cb8fca53d0737a02`

<br />

### `ExpiryDivisorSet`
Emitted when ExpiryDivisor is set.
___
```solidity
event ExpiryDivisorSet(uint256 expiryDivisor);
```

| Parameter  |  Type   |      Description      |
| :--------: | :-----: | :-------------------: |
| `expiryDivisor` | uint256 | Expiry divisor value. |

Signature: `0x90c17e2890a3d0c88fdb2b6383e9bf7f1a7b7c925325e2c810fb998c4f44ec06`

<br />

### `ForgeFeeSet`
Emitted when forge fee is set.
___
```solidity
event ForgeFeeSet(uint256 forgeFee);
```

| Parameter  |  Type   |      Description      |
| :--------: | :-----: | :-------------------: |
| `forgeFee` | uint256 | Forge fee value. |

Signature: `0x2ef1bce60d7bbfae6c837d0b8e2a628c96ba39aaa79bd1aecfc972313843b7b7`

<br />

### `InterestUpdateRateDeltaForMarketSet`
Emitted when interestUpdateRateDeltaForMarket is set.
___
```solidity
event InterestUpdateRateDeltaForMarketSet(uint256 interestUpdateRateDeltaForMarket);
```

| Parameter  |  Type   |      Description      |
| :--------: | :-----: | :-------------------: |
| `interestUpdateRateDeltaForMarket` | uint256 | Interest update rate delta for market value. |

Signature: `0x65ec3e0128626032a413924458fc6b81e4c8c20bfcecd79df9a7822829929fff`

<br />

### `MarketFeesSet`
Emitted when market fees are set.
___
```solidity
event MarketFeesSet(uint256 swapFee, uint256 protocolSwapFee);
```

| Parameter  |  Type   |      Description      |
| :--------: | :-----: | :-------------------: |
| `swapFee` | uint256 | Market swap fee percentage. |
| `protocolSwapFee` | uint256 | Protocol swap fee percentage. |

Signature: `0xdc40a2ee81b25d18d01c581d3094089420126c71715b91c435d672a506aea7bb`

<br />

### `CurveShiftBlockDeltaSet`
Emitted when the curve shift block delta is set.
___
```solidity
event CurveShiftBlockDeltaSet(uint256 blockDelta);
```

| Parameter  |  Type   |      Description      |
| :--------: | :-----: | :-------------------: |
| `blockDelta` | uint256 | Block delta value for curve shifting. |

Signature: `0x2e6187d5d52493f2d476b10975d0cce536900209dc8448ee5701ac80bc4c30dc`

<br />

### `NewMarketFactory`
Emiitted when a new market factory is added.
___
```solidity
event NewMarketFactory(bytes32 indexed marketFactoryId, address indexed marketFactoryAddress);
```

| Parameter  |  Type   |      Description      |
| :--------: | :-----: | :-------------------: |
| `marketFactoryId` | bytes32 | The market factory ID in bytes. |
| `marketFactoryAddress` | address | The market factory address. |

Signature: `0x1a525a612420d955b2801652ec888e9764e1ae41da65cc2561596d4618ccb539`

<br />
