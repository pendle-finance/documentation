---
hide_table_of_contents: true
---

# Liquidity Management Functions

This document covers all functions for managing liquidity positions in Pendle markets. These functions allow adding and removing liquidity in various token combinations.

## Add Liquidity Functions

### addLiquidityDualTokenAndPt

Adds liquidity using both a token and PT tokens in exact amounts.

```solidity
function addLiquidityDualTokenAndPt(
    address receiver,
    address market,
    TokenInput calldata input,
    uint256 netPtDesired,
    uint256 minLpOut
) external payable returns (uint256 netLpOut, uint256 netPtUsed, uint256 netSyInterm)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive LP tokens |
| market | `address` | Pendle market address |
| input | `TokenInput` | Token input configuration |
| netPtDesired | `uint256` | Desired amount of PT tokens to use |
| minLpOut | `uint256` | Minimum LP tokens to receive |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netLpOut | `uint256` | LP tokens received |
| netPtUsed | `uint256` | PT tokens actually used |
| netSyInterm | `uint256` | SY tokens generated from input token |

**Use Case**
When you have both the underlying token and PT tokens and want to add liquidity using exact amounts of both. The function will mint SY from your token input and combine it with your PT tokens.

### addLiquidityDualSyAndPt

Adds liquidity using both SY and PT tokens in exact amounts.

```solidity
function addLiquidityDualSyAndPt(
    address receiver,
    address market,
    uint256 netSyDesired,
    uint256 netPtDesired,
    uint256 minLpOut
) external returns (uint256 netLpOut, uint256 netSyUsed, uint256 netPtUsed)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive LP tokens |
| market | `address` | Pendle market address |
| netSyDesired | `uint256` | Desired amount of SY tokens to use |
| netPtDesired | `uint256` | Desired amount of PT tokens to use |
| minLpOut | `uint256` | Minimum LP tokens to receive |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netLpOut | `uint256` | LP tokens received |
| netSyUsed | `uint256` | SY tokens actually used |
| netPtUsed | `uint256` | PT tokens actually used |

**Use Case**
When you already have both SY and PT tokens and want to add liquidity directly.

### addLiquiditySinglePt

Adds liquidity using only PT tokens by internally swapping some PT for SY.

```solidity
function addLiquiditySinglePt(
    address receiver,
    address market,
    uint256 netPtIn,
    uint256 minLpOut,
    ApproxParams calldata guessPtSwapToSy,
    LimitOrderData calldata limit
) external returns (uint256 netLpOut, uint256 netSyFee)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive LP tokens |
| market | `address` | Pendle market address |
| netPtIn | `uint256` | Amount of PT tokens to use |
| minLpOut | `uint256` | Minimum LP tokens to receive |
| guessPtSwapToSy | `ApproxParams` | Approximation parameters |
| limit | `LimitOrderData` | Limit order configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netLpOut | `uint256` | LP tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |

**Use Case**
When you only have PT tokens and want to add liquidity. The function will automatically determine the optimal amount of PT to swap for SY to achieve balanced liquidity provision.

**Simple Version Available**
For basic operations without custom parameters, use [`addLiquiditySinglePtSimple`](/Developers/Contracts/PendleRouter/SimpleFunctions#addliquiditysingleptSimple) which automatically handles approximation and skips limit order functionality.

### addLiquiditySingleToken

Adds liquidity using any supported token by converting it to SY and PT as needed.

```solidity
function addLiquiditySingleToken(
    address receiver,
    address market,
    uint256 minLpOut,
    ApproxParams calldata guessPtReceivedFromSy,
    TokenInput calldata input,
    LimitOrderData calldata limit
) external payable returns (uint256 netLpOut, uint256 netSyFee, uint256 netSyInterm)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive LP tokens |
| market | `address` | Pendle market address |
| minLpOut | `uint256` | Minimum LP tokens to receive |
| guessPtReceivedFromSy | `ApproxParams` | Approximation parameters |
| input | `TokenInput` | Token input configuration |
| limit | `LimitOrderData` | Limit order configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netLpOut | `uint256` | LP tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |
| netSyInterm | `uint256` | SY tokens generated from input token |

**Use Case**
Most convenient method when you have any supported token and want to add liquidity. The function handles all necessary conversions and swaps automatically.

**Simple Version Available**
For basic operations without custom parameters, use [`addLiquiditySingleTokenSimple`](/Developers/Contracts/PendleRouter/SimpleFunctions#addliquiditysingletokenSimple) which automatically handles approximation and skips limit order functionality.

### addLiquiditySingleSy

Adds liquidity using only SY tokens by converting some to PT through market operations.

```solidity
function addLiquiditySingleSy(
    address receiver,
    address market,
    uint256 netSyIn,
    uint256 minLpOut,
    ApproxParams calldata guessPtReceivedFromSy,
    LimitOrderData calldata limit
) external returns (uint256 netLpOut, uint256 netSyFee)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive LP tokens |
| market | `address` | Pendle market address |
| netSyIn | `uint256` | Amount of SY tokens to use |
| minLpOut | `uint256` | Minimum LP tokens to receive |
| guessPtReceivedFromSy | `ApproxParams` | Approximation parameters |
| limit | `LimitOrderData` | Limit order configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netLpOut | `uint256` | LP tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |

**Use Case**
When you have SY tokens and want to add liquidity. The function will swap some SY for PT to achieve optimal liquidity provision.

**Simple Version Available**
For basic operations without custom parameters, use [`addLiquiditySingleSySimple`](/Developers/Contracts/PendleRouter/SimpleFunctions#addliquiditysingleSySimple) which automatically handles approximation and skips limit order functionality.

### addLiquiditySingleTokenKeepYt

Adds liquidity while keeping the generated YT tokens instead of selling them.

```solidity
function addLiquiditySingleTokenKeepYt(
    address receiver,
    address market,
    uint256 minLpOut,
    uint256 minYtOut,
    TokenInput calldata input
) external payable returns (uint256 netLpOut, uint256 netYtOut, uint256 netSyMintPy, uint256 netSyInterm)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive LP and YT tokens |
| market | `address` | Pendle market address |
| minLpOut | `uint256` | Minimum LP tokens to receive |
| minYtOut | `uint256` | Minimum YT tokens to receive |
| input | `TokenInput` | Token input configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netLpOut | `uint256` | LP tokens received |
| netYtOut | `uint256` | YT tokens received |
| netSyMintPy | `uint256` | SY used to mint PT/YT |
| netSyInterm | `uint256` | SY tokens generated from input token |

**Use Case**
When you want to add liquidity and also keep YT tokens for yield farming. This strategy avoids price impact since no swapping occurs - the underlying asset is converted to SY, then PT/YT pairs are minted directly. The PT and remaining SY are used for liquidity provision while YT is returned to you.

### addLiquiditySingleSyKeepYt

Adds liquidity using SY tokens while keeping the generated YT tokens.

```solidity
function addLiquiditySingleSyKeepYt(
    address receiver,
    address market,
    uint256 netSyIn,
    uint256 minLpOut,
    uint256 minYtOut
) external returns (uint256 netLpOut, uint256 netYtOut, uint256 netSyMintPy)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive LP and YT tokens |
| market | `address` | Pendle market address |
| netSyIn | `uint256` | Amount of SY tokens to use |
| minLpOut | `uint256` | Minimum LP tokens to receive |
| minYtOut | `uint256` | Minimum YT tokens to receive |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netLpOut | `uint256` | LP tokens received |
| netYtOut | `uint256` | YT tokens received |
| netSyMintPy | `uint256` | SY used to mint PT/YT |

**Use Case**
When you have SY tokens and want both LP tokens and YT tokens. This method avoids price impact since no swapping occurs - SY is used to mint PT/YT pairs directly, with PT used for liquidity provision and YT returned to you.

## Remove Liquidity Functions

### removeLiquidityDualTokenAndPt

Removes liquidity and receives both the underlying token and PT tokens.

```solidity
function removeLiquidityDualTokenAndPt(
    address receiver,
    address market,
    uint256 netLpToRemove,
    TokenOutput calldata output,
    uint256 minPtOut
) external returns (uint256 netTokenOut, uint256 netPtOut, uint256 netSyInterm)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive tokens |
| market | `address` | Pendle market address |
| netLpToRemove | `uint256` | Amount of LP tokens to burn |
| output | `TokenOutput` | Token output configuration |
| minPtOut | `uint256` | Minimum PT tokens to receive |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netTokenOut | `uint256` | Amount tokens received |
| netPtOut | `uint256` | PT tokens received |
| netSyInterm | `uint256` | SY tokens converted to underlying |

**Use Case**
When you want to exit a liquidity position and receive both the underlying token and PT tokens separately.

### removeLiquidityDualSyAndPt

Removes liquidity and receives both SY and PT tokens.

```solidity
function removeLiquidityDualSyAndPt(
    address receiver,
    address market,
    uint256 netLpToRemove,
    uint256 minSyOut,
    uint256 minPtOut
) external returns (uint256 netSyOut, uint256 netPtOut)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive tokens |
| market | `address` | Pendle market address |
| netLpToRemove | `uint256` | Amount of LP tokens to burn |
| minSyOut | `uint256` | Minimum SY tokens to receive |
| minPtOut | `uint256` | Minimum PT tokens to receive |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netSyOut | `uint256` | SY tokens received |
| netPtOut | `uint256` | PT tokens received |

**Use Case**
Most efficient method when you want both SY and PT tokens. No additional conversions are performed.

### removeLiquiditySinglePt

Removes liquidity and converts everything to PT tokens.

```solidity
function removeLiquiditySinglePt(
    address receiver,
    address market,
    uint256 netLpToRemove,
    uint256 minPtOut,
    ApproxParams calldata guessPtReceivedFromSy,
    LimitOrderData calldata limit
) external returns (uint256 netPtOut, uint256 netSyFee)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive PT tokens |
| market | `address` | Pendle market address |
| netLpToRemove | `uint256` | Amount of LP tokens to burn |
| minPtOut | `uint256` | Minimum PT tokens to receive |
| guessPtReceivedFromSy | `ApproxParams` | Approximation parameters |
| limit | `LimitOrderData` | Limit order configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netPtOut | `uint256` | PT tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |

**Use Case**
When you want to exit liquidity and hold only PT tokens, maximizing your PT position.

**Simple Version Available**
For basic operations without custom parameters, use [`removeLiquiditySinglePtSimple`](/Developers/Contracts/PendleRouter/SimpleFunctions#removeliquiditysingleptSimple) which automatically handles approximation and skips limit order functionality.

### removeLiquiditySingleToken

Removes liquidity and converts everything to a specified underlying token.

```solidity
function removeLiquiditySingleToken(
    address receiver,
    address market,
    uint256 netLpToRemove,
    TokenOutput calldata output,
    LimitOrderData calldata limit
) external returns (uint256 netTokenOut, uint256 netSyFee, uint256 netSyInterm)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive tokens |
| market | `address` | Pendle market address |
| netLpToRemove | `uint256` | Amount of LP tokens to burn |
| output | `TokenOutput` | Token output configuration |
| limit | `LimitOrderData` | Limit order configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netTokenOut | `uint256` | Amount tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |
| netSyInterm | `uint256` | SY tokens before conversion |

**Use Case**
Most convenient exit method when you want to receive a specific underlying token. Handles all necessary conversions automatically.

### removeLiquiditySingleSy

Removes liquidity and converts everything to SY tokens.

```solidity
function removeLiquiditySingleSy(
    address receiver,
    address market,
    uint256 netLpToRemove,
    uint256 minSyOut,
    LimitOrderData calldata limit
) external returns (uint256 netSyOut, uint256 netSyFee)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive SY tokens |
| market | `address` | Pendle market address |
| netLpToRemove | `uint256` | Amount of LP tokens to burn |
| minSyOut | `uint256` | Minimum SY tokens to receive |
| limit | `LimitOrderData` | Limit order configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netSyOut | `uint256` | SY tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |

**Use Case**
When you want to exit liquidity and hold SY tokens, useful for further operations within the Pendle ecosystem.

## Integration Examples

### Basic Liquidity Addition
```solidity
// Add liquidity with USDC
router.addLiquiditySingleToken(
    msg.sender,
    MARKET_ADDRESS,
    minLpOut,
    createDefaultApproxParams(),
    createTokenInputSimple(USDC_ADDRESS, 1000e6),
    createEmptyLimitOrderData()
);
```

### Basic Liquidity Removal
```solidity
// Remove liquidity to USDC
router.removeLiquiditySingleToken(
    msg.sender,
    MARKET_ADDRESS,
    lpAmount,
    createTokenOutputSimple(USDC_ADDRESS, minUsdcOut),
    createEmptyLimitOrderData()
);
```

For operations that don't require complex parameters, the router automatically uses simplified versions with on-chain approximation when possible.