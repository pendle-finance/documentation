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
```solidity
event MarketCreated(
    bytes32 marketFactoryId,
    address indexed xyt,
    address indexed token,
    address indexed market
);
```

|     Parameter     |  Type   |                            Description                             |
| :---------------: | :-----: | :----------------------------------------------------------------: |
| `marketFactoryId` | bytes32 |                     Market factory ID in bytes                     |
|       `xyt`       | address | The address of the tokenized future yield token as the base asset. |
|      `token`      | address |         The address of an ERC20 token as the quote asset.          |
|     `market`      | address |              The address of the newly created market.              |

Signature: `0xb18af3690cc6a832c9b2e802aab7a21111f4cfca5c2e4fcf614f6ea55b405f4a`

<br />

### `SwapEvent`
Emitted when a swap happens on the market.
___
```solidity
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
```solidity
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
```solidity
event Exit(
    address indexed sender,
    uint256 token0Amount,
    uint256 token1Amount,
    address market,
    uint256 exactInLp
);
```

|   Parameter    |  Type   |                   Description                    |
| :------------: | :-----: | :----------------------------------------------: |
|    `sender`    | address |         The user who removed liquidity.          |
| `token0Amount` | uint256 | The amount of token0 (xyt) returned to the user. |
| `token1Amount` | uint256 |    The amount of token1 returned to the user.    |
|    `market`    | address |               The market address.                |
|  `exactOutLp`  | address |              The exact LP removed.               |

Signature: `0x3af46289ed754c6821a8849534b8412a33bcd8387cb986f39e7e9937fb251cde`

<br />

### General Functions

### `data`
Gets a reference to the PendleData contract.
___
```solidity
function data() external view returns (IPendleData);
```
**Returns:**<br />
IPendleData — Returns the data contract reference.

<br />

### `weth`
Gets a reference of the WETH9 token contract address.
___
```solidity
function weth() external view returns (IWETH);
```
**Returns:**<br />
IWETH — WETH token reference.

<br />

### Forge Functions

### `newYieldContracts`
Tokenizes the yield-bearing asset into YT and OT.
___
```solidity
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
```solidity
function redeemAfterExpiry(
    bytes32 forgeId,
    address underlyingAsset,
    uint256 expiry
) external returns (uint256 redeemedAmount);
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
```solidity
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
```solidity
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
Renews this yield contract by burning the old OT and YT tokens, while mining new OT and YT tokens without having to remove his underlying asset.
___
```solidity
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
```solidity
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
Add both YT and Token liquidity into the market.
___
```solidity
function addMarketLiquidityDual(
    bytes32 marketFactoryId,
    address xyt,
    address token,
    uint256 desiredXytAmount,
    uint256 desiredTokenAmount,
    uint256 xytMinAmount,
    uint256 tokenMinAmount
)
    external
    payable
    returns (
        uint256 amountXytUsed,
        uint256 amountTokenUsed,
        uint256 lpOut
    );
```

|      Parameter       |  Type   |                                 Description                                 |
| :------------------: | :-----: | :-------------------------------------------------------------------------: |
|  `marketFactoryId`   | bytes32 |                       The market factory ID in bytes.                       |
|        `xyt`         | address |                        The address of the YT token.                         |
|       `token`        | address |                       The address of the quote token.                       |
|  `desiredXytAmount`  | uint256 |                Amount of YT to add liquidity to the market.                 |
| `desiredTokenAmount` | uint256 |           Amount of quote tokens to add liquidity to the market.            |
|    `xytMinAmount`    | uint256 |      The minimum expected amount of YT to add liquidity to the market.      |
|   `tokenMinAmount`   | uint256 | The minimum expected amount of quote tokens to add liquidity to the market. |

**Returns:**<br />
amountXytUsed — amount of YT liquidity added to the market.<br />
amountTokenUsed — amount of quote tokens liquidity added to the market.<br />
lpOut — amount of LP tokens minted.

<br />

### `addMarketLiquiditySingle`
Add either YT or Token liquidity into the market.
___
```solidity
function addMarketLiquiditySingle(
    bytes32 marketFactoryId,
    address xyt,
    address token,
    bool forXyt,
    uint256 exactInAsset,
    uint256 minOutLp
) external payable returns (uint256 exactOutLp);
```

|     Parameter     |  Type   |                         Description                          |
| :---------------: | :-----: | :----------------------------------------------------------: |
| `marketFactoryId` | bytes32 |               The market factory ID in bytes.                |
|       `xyt`       | address |                 The address of the YT token.                 |
|      `token`      | address |               The address of the quote token.                |
|     `forXyt`      |  bool   |     `true` if adding liquidity to YT, otherwise `false`.     |
|  `exactInAsset`   | uint256 | Amount of YT or quote tokens to add liquidity to the market. |
|    `minOutLp`     | uint256 |        The minimum amount of LP tokens to be minted.         |

**Returns:**<br />
exactOutLp — amount of LP tokens minted.

<br />

### `removeMarketLiquidityDual`
Remove both YT and Token liquidity from the market.
___
```solidity
function removeMarketLiquidityDual(
    bytes32 marketFactoryId,
    address xyt,
    address token,
    uint256 exactInLp,
    uint256 minOutXyt,
    uint256 minOutToken
) external returns (uint256 exactOutXyt, uint256 exactOutToken);
```

|     Parameter     |  Type   |                              Description                              |
| :---------------: | :-----: | :-------------------------------------------------------------------: |
| `marketFactoryId` | bytes32 |                    The market factory ID in bytes.                    |
|       `xyt`       | address |                     The address of the YT token.                      |
|      `token`      | address |                    The address of the quote token.                    |
|    `exactInLp`    | uint256 | The exact amount of LP tokens provided to redeem YT and quote tokens. |
|    `minOutXyt`    | uint256 |      The minimum expected amount of YT redeemed from the market.      |
|   `minOutToken`   | uint256 | The minimum expected amount of quote tokens redeemed from the market. |

**Returns:**<br />
exactOutXyt — the exact amount of YT redeemed from the market.<br />
exactOutToken — the exact amount of quote tokens redeemed from the market.

<br />

### `removeMarketLiquiditySingle`
Remove either YT or Token liquidity from the market.
___
```solidity
function removeMarketLiquiditySingle(
    bytes32 marketFactoryId,
    address xyt,
    address token,
    bool forXyt,
    uint256 exactInLp,
    uint256 minOutAsset
) external returns (uint256 exactOutXyt, uint256 exactOutToken);
```

|     Parameter     |  Type   |                           Description                           |
| :---------------: | :-----: | :-------------------------------------------------------------: |
| `marketFactoryId` | bytes32 |                 The market factory ID in bytes.                 |
|       `xyt`       | address |                  The address of the YT token.                   |
|      `token`      | address |                 The address of the quote token.                 |
|     `forXyt`      |  bool   |     `true` if removing liquidity to YT, otherwise `false`.      |
|    `exactInLp`    | uint256 |  Amount of exact LP tokens used to redeem YT and quote tokens.  |
|   `minOutAsset`   | uint256 | The minimum amount of either YT ro quote tokens to be redeemed. |


**Returns:**<br />
exactOutXyt — the exact amount of YT redeemed from the market.<br />
exactOutToken — the exact amount of quote tokens redeemed from the market.

<br />

### `createMarket`
Creates a market given a protocol ID, future yield token, and an ERC20 token.
___
```solidity
function createMarket(
    bytes32 marketFactoryId,
    address xyt,
    address token
) external returns (address market);
```

|     Parameter     |  Type   |           Description           |
| :---------------: | :-----: | :-----------------------------: |
| `marketFactoryId` | bytes32 | The market factory ID in bytes. |
|       `xyt`       | address |  The address of the YT token.   |
|      `token`      | address | The address of the quote token. |

**Returns:**<br />
market — address of the newly created market.

<br />

### `bootstrapMarket`
Bootstrap initial liquidity in the newly created market.
___
```solidity
function bootstrapMarket(
    bytes32 marketFactoryId,
    address xyt,
    address token,
    uint256 initialXytLiquidity,
    uint256 initialTokenLiquidity
) external payable;
```

|        Parameter        |  Type   |              Description               |
| :---------------------: | :-----: | :------------------------------------: |
|    `marketFactoryId`    | bytes32 |    The market factory ID in bytes.     |
|          `xyt`          | address |      The address of the YT token.      |
|         `token`         | address |    The address of the quote token.     |
|  `initialXytLiquidity`  | uint256 |  Initial YT liquidity in the market.   |
| `initialTokenLiquidity` | uint256 | Initial token liquidity in the market. |

**Returns:**<br />
ot — address of the new OT token.<br />
xyt — address of the new YT token.<br />
amountTokenMinted — amount of LP tokens minted.

<br />

### `swapExactIn`
Trades an exact amount of source assets into destination assets.
___
```solidity
function swapExactIn(
    address tokenIn,
    address tokenOut,
    uint256 inTotalAmount,
    uint256 minOutTotalAmount,
    bytes32 marketFactoryId
) external payable returns (uint256 outTotalAmount);
```

|      Parameter      |  Type   |                     Description                     |
| :-----------------: | :-----: | :-------------------------------------------------: |
|      `tokenIn`      | address |      The address of the source asset to trade.      |
|     `tokenOut`      | address |   The address of the destination asset to trade.    |
|   `inTotalAmount`   | uint256 |     The exact amount of source assets to trade.     |
| `minOutTotalAmount` | uint256 | The minimum output amount resulting from the trade. |
|  `marketFactoryId`  | bytes32 |            The market factory in bytes.             |

**Returns:**<br />
outTotalAmount — the total output amount resulting from the trade.

<br />

### `swapExactOut`
Tokenize the underlying asset into OT and YT for a yield contract.
___
```solidity
function swapExactOut(
    address tokenIn,
    address tokenOut,
    uint256 outTotalAmount,
    uint256 maxInTotalAmount,
    bytes32 marketFactoryId
) external payable returns (uint256 inTotalAmount);
```

|     Parameter      |  Type   |                             Description                             |
| :----------------: | :-----: | :-----------------------------------------------------------------: |
|     `tokenIn`      | address |              The address of the source asset to trade.              |
|     `tokenOut`     | address |           The address of the destination asset to trade.            |
|  `outTotalAmount`  | uint256 | The exact amount of destination assets desired to use in the trade. |
| `maxInTotalAmount` | uint256 |        The maximum input amount allowed to use in the trade.        |
| `marketFactoryId`  | bytes32 |                    The market factory in bytes.                     |

**Returns:**<br />
inTotalAmount — the total input amount used in the trade.

<br />

### `redeemLpInterests`
Redeem the LP interests generated from the market LP tokens.
___
```solidity
function redeemLpInterests(address market, address user) external returns (uint256 interests);
```

| Parameter |  Type   |        Description         |
| :-------: | :-----: | :------------------------: |
| `market`  | address | The address of the market. |
|  `user`   | address |  The address of the user.  |

**Returns:**<br />
interests — amount of interests redeemed.
