---
sidebar_position: 1
---

# IPendleRouter

imports IWETH, IPendleData, IPendleMarketFactory, PendleStructs

*Source*: [IPendleRouter.sol](https://github.com/pendle-finance/pendle-core/blob/master/contracts/interfaces/IPendleRouter.sol)
___

## REFERENCE

### Events

### `MarketCreated`
Emitted when a market for a future yield token and an ERC20 token is created.
___
```sol
event MarketCreated(
    bytes32 marketFactoryId,
    address indexed xyt,
    address indexed token,
    address indexed market
);
```

|     Parameter     |  Type   |                            Description                             |
| :---------------: | :-----: | :----------------------------------------------------------------: |
| `marketFactoryId` | bytes32 |                         Forge identifier.                          |
|       `xyt`       | address | The address of the tokenized future yield token as the base asset. |
|      `token`      | address |         The address of an ERC20 token as the quote asset.          |
|     `market`      | address |              The address of the newly created market.              |

Signature: `0xb18af3690cc6a832c9b2e802aab7a21111f4cfca5c2e4fcf614f6ea55b405f4a`

<br />

### `SwapEvent`
Emitted when a swap happens on the market.
___
```sol
event SwapEvent(
    address indexed trader,
    address inToken,
    address outToken,
    uint256 exactIn,
    uint256 exactOut,
    address market
);
```

| Parameter  |      Type       |          Description           |
| :--------: | :-------------: | :----------------------------: |
|  `trader`  | indexed address |   The address of msg.sender.   |
| `inToken`  |     address     |        The input token.        |
| `outToken` |     address     |       The output token.        |
| `exactIn`  |     uint256     | The exact amount being traded. |
| `exactOut` |     uint256     |   The exact amount received.   |
|  `market`  |     address     |      The market address.       |

Signature: `0xf5fd10e802251a919c2bfd2cfc15e2526d3864c819e2b4dc346ca1ade0f51658`

<br />

### `Join`
Emitted when user adds liquidity.
___
```sol
event Join(
    address indexed sender,
    uint256 token0Amount,
    uint256 token1Amount,
    address market,
    uint256 exactOutLp
);
```

|   Parameter    |      Type       |                 Description                  |
| :------------: | :-------------: | :------------------------------------------: |
|    `sender`    | indexed address |        The user who added liquidity.         |
| `token0Amount` |     uint256     | The amount of token0 (xyt) provided by user. |
| `token1Amount` |     uint256     |    The amount of token1 provided by user.    |
|    `market`    |     address     |             The market address.              |
|  `exactOutLp`  |     address     |             The exact LP minted.             |

Signature: `0xe37fea01e65dea7d589abafc4bd0d5282a09ddce3e9ea971ed3399d776a1a296`

<br />

### `Exit`
Emitted when user removes liquidity.
___
```sol
event Exit(
    address indexed sender,
    uint256 token0Amount,
    uint256 token1Amount,
    address market,
    uint256 exactInLp
);
```

|   Parameter    |      Type       |                   Description                    |
| :------------: | :-------------: | :----------------------------------------------: |
|    `sender`    | indexed address |         The user who removed liquidity.          |
| `token0Amount` |     uint256     | The amount of token0 (xyt) returned to the user. |
| `token1Amount` |     uint256     |    The amount of token1 returned to the user.    |
|    `market`    |     address     |               The market address.                |
|  `exactOutLp`  |     address     |              The exact LP removed.               |

Signature: `0x3af46289ed754c6821a8849534b8412a33bcd8387cb986f39e7e9937fb251cde`

<br />

### General Functions

### `data`
Gets a reference to the PendleData contract.
___
```sol
function data() external view returns (IPendleData);
```
**Returns:**<br />
IPendleData — Returns the data contract reference.

<br />

### `weth`
Gets a reference of the WETH9 token contract address.
___
```sol
function weth() external view returns (IWETH);
```
**Returns:**<br />
IWETH — WETH token reference.

<br />

### Forge Functions

### `newYieldContracts`
Gets a reference of the WETH9 token contract address.
___
```sol
function newYieldContracts(
    bytes32 forgeId,
    address underlyingAsset,
    uint256 expiry
) external returns (address ot, address xyt);
```

|     Parameter     |  Type   |                   Description                   |
| :---------------: | :-----: | :---------------------------------------------: |
|     `forgeId`     | bytes32 |             The forge ID in bytes.              |
| `underlyingAsset` | address |      The address of the underlying token.       |
|     `expiry`      | uint256 | The expiry of the yield contract in epoch time. |

**Returns:**<br />
ot — address of the OT token created.<br />
xyt — address of the YT token created.

<br />

### `redeemAfterExpiry`
Redeems the underlying asset after the yield contract expiry by burning OT and YT.
___
```sol
function redeemAfterExpiry(
    bytes32 forgeId,
    address underlyingAsset,
    uint256 expiry
) external returns (address ot, address xyt);
```

|     Parameter     |  Type   |                   Description                   |
| :---------------: | :-----: | :---------------------------------------------: |
|     `forgeId`     | bytes32 |             The forge ID in bytes.              |
| `underlyingAsset` | address |      The address of the underlying token.       |
|     `expiry`      | uint256 | The expiry of the yield contract in epoch time. |

**Returns:**<br />
redeemedAmount — amount that was redeemed.

<br />

### `redeemDueInterests`
Redeems the user's due interests earned from the yield protocols.
___
```sol
function redeemDueInterests(
    bytes32 forgeId,
    address underlyingAsset,
    uint256 expiry,
    address user
) external returns (uint256 interests);
```

|     Parameter     |  Type   |                   Description                   |
| :---------------: | :-----: | :---------------------------------------------: |
|     `forgeId`     | bytes32 |             The forge ID in bytes.              |
| `underlyingAsset` | address |      The address of the underlying token.       |
|     `expiry`      | uint256 | The expiry of the yield contract in epoch time. |
|      `user`       | address |            The address of the user.             |

**Returns:**<br />
interests — amount of due interests that was redeemed.

<br />

### `redeemUnderlying`
Redeems the underlying asset by burning OT and YT.
___
```sol
function redeemUnderlying(
    bytes32 forgeId,
    address underlyingAsset,
    uint256 expiry,
    uint256 amountToRedeem
) external returns (uint256 redeemedAmount);
```

|     Parameter     |  Type   |                   Description                   |
| :---------------: | :-----: | :---------------------------------------------: |
|     `forgeId`     | bytes32 |             The forge ID in bytes.              |
| `underlyingAsset` | address |      The address of the underlying token.       |
|     `expiry`      | uint256 | The expiry of the yield contract in epoch time. |
| `amountToRedeem`  | uint256 |  The amount of the underlying asset to redeem.  |

**Returns:**<br />
redeemedAmount — amount that was redeemed.

<br />

### `renewYield`
Renews his yield contract by burning the old OT and YT tokens, while mining new OT and YT tokens without having to remove his underlying asset.
___
```sol
function renewYield(
    bytes32 forgeId,
    uint256 oldExpiry,
    address underlyingAsset,
    uint256 newExpiry,
    uint256 renewalRate
)
    external
    returns (
        uint256 redeemedAmount,
        uint256 amountRenewed,
        address ot,
        address xyt,
        uint256 amountTokenMinted
    );
```

|     Parameter     |  Type   |                     Description                     |
| :---------------: | :-----: | :-------------------------------------------------: |
|     `forgeId`     | bytes32 |               The forge ID in bytes.                |
|    `oldExpiry`    | uint256 | The old expiry of the yield contract in epoch time. |
| `underlyingAsset` | address |        The address of the underlying token.         |
|    `newExpiry`    | uint256 | The new expiry of the yield contract in epoch time. |
|   `renewalRate`   | uint256 |   The rate to be used for the new yield contract.   |

**Returns:**<br />
redeemedAmount — amount that was redeemed.<br />
amountRenewed — amount that was renewed.<br />
ot — address of the new OT token.<br />
xyt — address of the new YT token.<br />
amountTokenMinted — amount of LP tokens minted.

<br />

### `tokenizeYield`
Tokenize the underlying asset into OT and YT for a yield contract.
___
```sol
function tokenizeYield(
    bytes32 forgeId,
    address underlyingAsset,
    uint256 expiry,
    uint256 amountToTokenize,
    address to
)
    external
    returns (
        address ot,
        address xyt,
        uint256 amountTokenMinted
    );
```

|     Parameter      |  Type   |                   Description                   |
| :----------------: | :-----: | :---------------------------------------------: |
|     `forgeId`      | bytes32 |             The forge ID in bytes.              |
| `underlyingAsset`  | address |      The address of the underlying token.       |
|      `expiry`      | uint256 | The expiry of the yield contract in epoch time. |
| `amountToTokenize` | uint256 |     Amount of underlying asset to tokenize.     |
|        `to`        | address |      The address to send the OT and YT to.      |

**Returns:**<br />
ot — address of the new OT token.<br />
xyt — address of the new YT token.<br />
amountTokenMinted — amount of LP tokens minted.

<br />

### Market Functions

### `addMarketLiquidityDual`
Tokenize the underlying asset into OT and YT for a yield contract.
___
```sol
function addMarketLiquidityDual(
    bytes32 _marketFactoryId,
    address _xyt,
    address _token,
    uint256 _desiredXytAmount,
    uint256 _desiredTokenAmount,
    uint256 _xytMinAmount,
    uint256 _tokenMinAmount
)
    external
    payable
    returns (
        uint256 amountXytUsed,
        uint256 amountTokenUsed,
        uint256 lpOut
    );
```

|     Parameter      |  Type   |                   Description                   |
| :----------------: | :-----: | :---------------------------------------------: |
|     `forgeId`      | bytes32 |             The forge ID in bytes.              |
| `underlyingAsset`  | address |      The address of the underlying token.       |
|      `expiry`      | uint256 | The expiry of the yield contract in epoch time. |
| `amountToTokenize` | uint256 |     Amount of underlying asset to tokenize.     |
|        `to`        | address |      The address to send the OT and YT to.      |

**Returns:**<br />
ot — address of the new OT token.<br />
xyt — address of the new YT token.<br />
amountTokenMinted — amount of LP tokens minted.

<br />

### `addMarketLiquiditySingle`
Tokenize the underlying asset into OT and YT for a yield contract.
___
```sol
function addMarketLiquiditySingle(
    bytes32 marketFactoryId,
    address xyt,
    address token,
    bool forXyt,
    uint256 exactInAsset,
    uint256 minOutLp
) external payable returns (uint256 exactOutLp);
```

|     Parameter      |  Type   |                   Description                   |
| :----------------: | :-----: | :---------------------------------------------: |
|     `forgeId`      | bytes32 |             The forge ID in bytes.              |
| `underlyingAsset`  | address |      The address of the underlying token.       |
|      `expiry`      | uint256 | The expiry of the yield contract in epoch time. |
| `amountToTokenize` | uint256 |     Amount of underlying asset to tokenize.     |
|        `to`        | address |      The address to send the OT and YT to.      |

**Returns:**<br />
ot — address of the new OT token.<br />
xyt — address of the new YT token.<br />
amountTokenMinted — amount of LP tokens minted.

<br />

### `removeMarketLiquidityDual`
Tokenize the underlying asset into OT and YT for a yield contract.
___
```sol
function removeMarketLiquidityDual(
    bytes32 marketFactoryId,
    address xyt,
    address token,
    uint256 exactInLp,
    uint256 minOutXyt,
    uint256 minOutToken
) external returns (uint256 exactOutXyt, uint256 exactOutToken);
```

|     Parameter      |  Type   |                   Description                   |
| :----------------: | :-----: | :---------------------------------------------: |
|     `forgeId`      | bytes32 |             The forge ID in bytes.              |
| `underlyingAsset`  | address |      The address of the underlying token.       |
|      `expiry`      | uint256 | The expiry of the yield contract in epoch time. |
| `amountToTokenize` | uint256 |     Amount of underlying asset to tokenize.     |
|        `to`        | address |      The address to send the OT and YT to.      |

**Returns:**<br />
ot — address of the new OT token.<br />
xyt — address of the new YT token.<br />
amountTokenMinted — amount of LP tokens minted.

<br />

### `removeMarketLiquiditySingle`
Tokenize the underlying asset into OT and YT for a yield contract.
___
```sol
function removeMarketLiquiditySingle(
    bytes32 marketFactoryId,
    address xyt,
    address token,
    bool forXyt,
    uint256 exactInLp,
    uint256 minOutAsset
) external returns (uint256 exactOutXyt, uint256 exactOutToken);
```

|     Parameter      |  Type   |                   Description                   |
| :----------------: | :-----: | :---------------------------------------------: |
|     `forgeId`      | bytes32 |             The forge ID in bytes.              |
| `underlyingAsset`  | address |      The address of the underlying token.       |
|      `expiry`      | uint256 | The expiry of the yield contract in epoch time. |
| `amountToTokenize` | uint256 |     Amount of underlying asset to tokenize.     |
|        `to`        | address |      The address to send the OT and YT to.      |

**Returns:**<br />
ot — address of the new OT token.<br />
xyt — address of the new YT token.<br />
amountTokenMinted — amount of LP tokens minted.

<br />

### `createMarket`
Tokenize the underlying asset into OT and YT for a yield contract.
___
```sol
function createMarket(
    bytes32 marketFactoryId,
    address xyt,
    address token
) external returns (address market);
```

|     Parameter      |  Type   |                   Description                   |
| :----------------: | :-----: | :---------------------------------------------: |
|     `forgeId`      | bytes32 |             The forge ID in bytes.              |
| `underlyingAsset`  | address |      The address of the underlying token.       |
|      `expiry`      | uint256 | The expiry of the yield contract in epoch time. |
| `amountToTokenize` | uint256 |     Amount of underlying asset to tokenize.     |
|        `to`        | address |      The address to send the OT and YT to.      |

**Returns:**<br />
ot — address of the new OT token.<br />
xyt — address of the new YT token.<br />
amountTokenMinted — amount of LP tokens minted.

<br />

### `bootstrapMarket`
Tokenize the underlying asset into OT and YT for a yield contract.
___
```sol
function bootstrapMarket(
    bytes32 marketFactoryId,
    address xyt,
    address token,
    uint256 initialXytLiquidity,
    uint256 initialTokenLiquidity
) external payable;
```

|     Parameter      |  Type   |                   Description                   |
| :----------------: | :-----: | :---------------------------------------------: |
|     `forgeId`      | bytes32 |             The forge ID in bytes.              |
| `underlyingAsset`  | address |      The address of the underlying token.       |
|      `expiry`      | uint256 | The expiry of the yield contract in epoch time. |
| `amountToTokenize` | uint256 |     Amount of underlying asset to tokenize.     |
|        `to`        | address |      The address to send the OT and YT to.      |

**Returns:**<br />
ot — address of the new OT token.<br />
xyt — address of the new YT token.<br />
amountTokenMinted — amount of LP tokens minted.

<br />

### `swapExactIn`
Tokenize the underlying asset into OT and YT for a yield contract.
___
```sol
function swapExactIn(
    address tokenIn,
    address tokenOut,
    uint256 inTotalAmount,
    uint256 minOutTotalAmount,
    bytes32 marketFactoryId
) external payable returns (uint256 outTotalAmount);
```

|     Parameter      |  Type   |                   Description                   |
| :----------------: | :-----: | :---------------------------------------------: |
|     `forgeId`      | bytes32 |             The forge ID in bytes.              |
| `underlyingAsset`  | address |      The address of the underlying token.       |
|      `expiry`      | uint256 | The expiry of the yield contract in epoch time. |
| `amountToTokenize` | uint256 |     Amount of underlying asset to tokenize.     |
|        `to`        | address |      The address to send the OT and YT to.      |

**Returns:**<br />
ot — address of the new OT token.<br />
xyt — address of the new YT token.<br />
amountTokenMinted — amount of LP tokens minted.

<br />

### `swapExactOut`
Tokenize the underlying asset into OT and YT for a yield contract.
___
```sol
function swapExactOut(
    address tokenIn,
    address tokenOut,
    uint256 outTotalAmount,
    uint256 maxInTotalAmount,
    bytes32 marketFactoryId
) external payable returns (uint256 inTotalAmount);
```

|     Parameter      |  Type   |                   Description                   |
| :----------------: | :-----: | :---------------------------------------------: |
|     `forgeId`      | bytes32 |             The forge ID in bytes.              |
| `underlyingAsset`  | address |      The address of the underlying token.       |
|      `expiry`      | uint256 | The expiry of the yield contract in epoch time. |
| `amountToTokenize` | uint256 |     Amount of underlying asset to tokenize.     |
|        `to`        | address |      The address to send the OT and YT to.      |

**Returns:**<br />
ot — address of the new OT token.<br />
xyt — address of the new YT token.<br />
amountTokenMinted — amount of LP tokens minted.

<br />

### `redeemLpInterests`
Tokenize the underlying asset into OT and YT for a yield contract.
___
```sol
function redeemLpInterests(address market, address user) external returns (uint256 interests);
```

|     Parameter      |  Type   |                   Description                   |
| :----------------: | :-----: | :---------------------------------------------: |
|     `forgeId`      | bytes32 |             The forge ID in bytes.              |
| `underlyingAsset`  | address |      The address of the underlying token.       |
|      `expiry`      | uint256 | The expiry of the yield contract in epoch time. |
| `amountToTokenize` | uint256 |     Amount of underlying asset to tokenize.     |
|        `to`        | address |      The address to send the OT and YT to.      |

**Returns:**<br />
ot — address of the new OT token.<br />
xyt — address of the new YT token.<br />
amountTokenMinted — amount of LP tokens minted.
