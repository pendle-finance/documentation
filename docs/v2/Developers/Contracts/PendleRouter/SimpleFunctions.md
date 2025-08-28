---
hide_table_of_contents: true
---

# Simple Functions

This document lists simplified versions of Pendle Router functions that use on-chain approximation algorithms instead of requiring complex parameters. These functions are automatically used by the main router when conditions allow for simplified execution.

## Overview

The Pendle Router includes simplified versions of complex functions that:
- Use on-chain approximation algorithms (no `ApproxParams` needed)
- Skip limit order functionality (no `LimitOrderData` needed)
- Provide streamlined interfaces for common operations
- Are automatically selected when no off-chain guess is provided and limit order data is empty

## PT Trading Functions

### swapExactTokenForPtSimple

Simplified version of `swapExactTokenForPt` using on-chain approximation.

```solidity
function swapExactTokenForPtSimple(
    address receiver,
    address market,
    uint256 minPtOut,
    TokenInput calldata input
) external payable returns (uint256 netPtOut, uint256 netSyFee, uint256 netSyInterm)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive PT tokens |
| market | `address` | Pendle market address |
| minPtOut | `uint256` | Minimum PT tokens to receive |
| input | `TokenInput` | Token input configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netPtOut | `uint256` | PT tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |
| netSyInterm | `uint256` | SY tokens generated from input token |

### swapExactSyForPtSimple

Simplified version of `swapExactSyForPt` using on-chain approximation.

```solidity
function swapExactSyForPtSimple(
    address receiver,
    address market,
    uint256 exactSyIn,
    uint256 minPtOut
) external returns (uint256 netPtOut, uint256 netSyFee)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive PT tokens |
| market | `address` | Pendle market address |
| exactSyIn | `uint256` | Exact amount of SY tokens to swap |
| minPtOut | `uint256` | Minimum PT tokens to receive |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netPtOut | `uint256` | PT tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |

## YT Trading Functions

### swapExactTokenForYtSimple

Simplified version of `swapExactTokenForYt` using on-chain approximation.

```solidity
function swapExactTokenForYtSimple(
    address receiver,
    address market,
    uint256 minYtOut,
    TokenInput calldata input
) external payable returns (uint256 netYtOut, uint256 netSyFee, uint256 netSyInterm)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive YT tokens |
| market | `address` | Pendle market address |
| minYtOut | `uint256` | Minimum YT tokens to receive |
| input | `TokenInput` | Token input configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netYtOut | `uint256` | YT tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |
| netSyInterm | `uint256` | SY tokens generated from input token |

### swapExactSyForYtSimple

Simplified version of `swapExactSyForYt` using on-chain approximation.

```solidity
function swapExactSyForYtSimple(
    address receiver,
    address market,
    uint256 exactSyIn,
    uint256 minYtOut
) external returns (uint256 netYtOut, uint256 netSyFee)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive YT tokens |
| market | `address` | Pendle market address |
| exactSyIn | `uint256` | Exact amount of SY tokens to swap |
| minYtOut | `uint256` | Minimum YT tokens to receive |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netYtOut | `uint256` | YT tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |

## Liquidity Management Functions

### addLiquiditySingleTokenSimple

Simplified version of `addLiquiditySingleToken` using on-chain approximation.

```solidity
function addLiquiditySingleTokenSimple(
    address receiver,
    address market,
    uint256 minLpOut,
    TokenInput calldata input
) external payable returns (uint256 netLpOut, uint256 netSyFee, uint256 netSyInterm)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive LP tokens |
| market | `address` | Pendle market address |
| minLpOut | `uint256` | Minimum LP tokens to receive |
| input | `TokenInput` | Token input configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netLpOut | `uint256` | LP tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |
| netSyInterm | `uint256` | SY tokens generated from input token |

### addLiquiditySingleSySimple

Simplified version of `addLiquiditySingleSy` using on-chain approximation.

```solidity
function addLiquiditySingleSySimple(
    address receiver,
    address market,
    uint256 netSyIn,
    uint256 minLpOut
) external returns (uint256 netLpOut, uint256 netSyFee)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive LP tokens |
| market | `address` | Pendle market address |
| netSyIn | `uint256` | Amount of SY tokens to use |
| minLpOut | `uint256` | Minimum LP tokens to receive |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netLpOut | `uint256` | LP tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |

### addLiquiditySinglePtSimple

Simplified version of `addLiquiditySinglePt` using on-chain approximation.

```solidity
function addLiquiditySinglePtSimple(
    address receiver,
    address market,
    uint256 netPtIn,
    uint256 minLpOut
) external returns (uint256 netLpOut, uint256 netSyFee)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive LP tokens |
| market | `address` | Pendle market address |
| netPtIn | `uint256` | Amount of PT tokens to use |
| minLpOut | `uint256` | Minimum LP tokens to receive |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netLpOut | `uint256` | LP tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |

### removeLiquiditySinglePtSimple

Simplified version of `removeLiquiditySinglePt` using on-chain approximation.

```solidity
function removeLiquiditySinglePtSimple(
    address receiver,
    address market,
    uint256 netLpToRemove,
    uint256 minPtOut
) external returns (uint256 netPtOut, uint256 netSyFee)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive PT tokens |
| market | `address` | Pendle market address |
| netLpToRemove | `uint256` | Amount of LP tokens to burn |
| minPtOut | `uint256` | Minimum PT tokens to receive |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netPtOut | `uint256` | PT tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |

## When Simple Functions Are Used

The Pendle Router automatically determines when to use simplified functions. Simple functions are used when:

1. **No limit orders**: `LimitOrderData` is empty
2. **No off-chain guess**: `ApproxParams` doesn't include off-chain calculated estimates
3. **Default parameters**: Standard approximation parameters are used

## Advantages of Simple Functions

**Ease of Use**: Require fewer parameters and no complex configuration.

**Reliability**: Built-in approximation algorithms are optimized for common trading scenarios.

**Automatic Selection**: The main router functions automatically delegate to simple versions when no off-chain guess is provided and limit order data is empty.

## Integration Approach

**Recommended Pattern**: Always use the main router functions (e.g., `swapExactTokenForPt`) with default parameters. The router will automatically use simple versions when optimal.

```solidity
// This may automatically use the simple version
router.swapExactTokenForPt(
    receiver,
    market,
    minPtOut,
    createDefaultApproxParams(),
    createTokenInputSimple(tokenIn, amountIn),
    createEmptyLimitOrderData()
);
```

**Direct Usage**: Only call simple functions directly if you're building custom routing logic and want to force the use of on-chain approximation.

## Important Notes

⚠️ **Internal Use**: These functions are primarily designed for internal router use and their interfaces may change without notice.

⚠️ **Limited Flexibility**: Simple functions don't support limit orders or custom approximation parameters.

⚠️ **Market Dependent**: Effectiveness depends on current market conditions and may not always be available.

The simple functions provide a streamlined interface for common operations while maintaining the full functionality of the Pendle trading system through automated approximation algorithms.