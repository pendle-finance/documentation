---
hide_table_of_contents: true
---

# Principal Token (PT) Trading Functions

This document covers all functions for trading Principal Tokens (PT) in Pendle markets. PT tokens represent the principal portion of yield-bearing assets and can be traded against other tokens or SY tokens.

## Token to PT Trading

Since AMM only supports swaps by exact PT, to swap exact tokens for PT requires binary search approximation to find the correct amount of SY needed to achieve the desired PT output. For best usage, use the [SDK](/v2/Developers/Backend/BackendAndHostedSDK#features) for better approximation since running binary search on-chain is costly.

### swapExactTokenForPt

Swaps an exact amount of any supported token for PT tokens.

```solidity
function swapExactTokenForPt(
    address receiver,
    address market,
    uint256 minPtOut,
    ApproxParams calldata guessPtOut,
    TokenInput calldata input,
    LimitOrderData calldata limit
) external payable returns (uint256 netPtOut, uint256 netSyFee, uint256 netSyInterm)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive PT tokens |
| market | `address` | Pendle market address |
| minPtOut | `uint256` | Minimum PT tokens to receive |
| guessPtOut | [`ApproxParams`](/v2/Developers/Contracts/PendleRouter/types#approxparams) | Approximation parameters |
| input | [`TokenInput`](/v2/Developers/Contracts/PendleRouter/types#tokeninput) | Token input configuration |
| limit | [`LimitOrderData`](/v2/Developers/Contracts/PendleRouter/types#limitorderdata) | Limit order configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netPtOut | `uint256` | PT tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |
| netSyInterm | `uint256` | SY tokens generated from input token |


**Use Case**
Most common function for buying PT tokens with any supported token. The function converts your token to SY and then swaps SY for PT, first filling available limit orders, then using the AMM for any remaining amount.

**Simple Version Available**
For basic operations without custom parameters, use [`swapExactTokenForPtSimple`](/Developers/Contracts/PendleRouter/SimpleFunctions#swapexacttokenforptsimple) which automatically handles approximation and skips limit order functionality.

### swapExactSyForPt

Swaps an exact amount of SY tokens for PT tokens.

```solidity
function swapExactSyForPt(
    address receiver,
    address market,
    uint256 exactSyIn,
    uint256 minPtOut,
    ApproxParams calldata guessPtOut,
    LimitOrderData calldata limit
) external returns (uint256 netPtOut, uint256 netSyFee)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive PT tokens |
| market | `address` | Pendle market address |
| exactSyIn | `uint256` | Exact amount of SY tokens to swap |
| minPtOut | `uint256` | Minimum PT tokens to receive |
| guessPtOut | [`ApproxParams`](/v2/Developers/Contracts/PendleRouter/types#approxparams) | Approximation parameters |
| limit | [`LimitOrderData`](/v2/Developers/Contracts/PendleRouter/types#limitorderdata) | Limit order configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netPtOut | `uint256` | PT tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |

**Use Case**
Direct and efficient method when you already have SY tokens and want to buy PT tokens.

**Simple Version Available**
For basic operations without custom parameters, use [`swapExactSyForPtSimple`](/Developers/Contracts/PendleRouter/SimpleFunctions#swapexactsyforptsimple) which automatically handles approximation and skips limit order functionality.

## PT to Token Trading

### swapExactPtForToken

Swaps an exact amount of PT tokens for any supported token.

```solidity
function swapExactPtForToken(
    address receiver,
    address market,
    uint256 exactPtIn,
    TokenOutput calldata output,
    LimitOrderData calldata limit
) external returns (uint256 netTokenOut, uint256 netSyFee, uint256 netSyInterm)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive tokens |
| market | `address` | Pendle market address |
| exactPtIn | `uint256` | Exact amount of PT tokens to swap |
| output | [`TokenOutput`](/v2/Developers/Contracts/PendleRouter/types#tokenoutput) | Token output configuration |
| limit | [`LimitOrderData`](/v2/Developers/Contracts/PendleRouter/types#limitorderdata) | Limit order configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netTokenOut | `uint256` | Amount tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |
| netSyInterm | `uint256` | SY tokens before conversion |

**Use Case**
Most common function for selling PT tokens to receive tokens. The function swaps PT for SY (first filling available limit orders, then using the AMM), then converts SY to your desired token.

### swapExactPtForSy

Swaps an exact amount of PT tokens for SY tokens.

```solidity
function swapExactPtForSy(
    address receiver,
    address market,
    uint256 exactPtIn,
    uint256 minSyOut,
    LimitOrderData calldata limit
) external returns (uint256 netSyOut, uint256 netSyFee)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive SY tokens |
| market | `address` | Pendle market address |
| exactPtIn | `uint256` | Exact amount of PT tokens to swap |
| minSyOut | `uint256` | Minimum SY tokens to receive |
| limit | [`LimitOrderData`](/v2/Developers/Contracts/PendleRouter/types#limitorderdata) | Limit order configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netSyOut | `uint256` | SY tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |

**Use Case**
Direct and efficient method for selling PT tokens to receive SY tokens.

## Integration Examples

### Buying PT-sUSDe with USDe
```solidity
// Swap 1000 USDe for PT-sUSDe tokens
router.swapExactTokenForPt(
    msg.sender,
    PT_SUSDE_MARKET_ADDRESS,
    minPtOut,
    createDefaultApproxParams(),
    createTokenInputSimple(USDE_ADDRESS, 1000e18),
    createEmptyLimitOrderData()
);
```

### Selling PT-sUSDe for USDe
```solidity
// Swap PT-sUSDe tokens for USDe
router.swapExactPtForToken(
    msg.sender,
    PT_SUSDE_MARKET_ADDRESS,
    ptAmount,
    createTokenOutputSimple(USDE_ADDRESS, minUsdeOut),
    createEmptyLimitOrderData()
);
```

### Direct SY to PT Trading
```solidity
// Swap SY tokens directly for PT tokens
router.swapExactSyForPt(
    msg.sender,
    MARKET_ADDRESS,
    syAmount,
    minPtOut,
    createDefaultApproxParams(),
    createEmptyLimitOrderData()
);
```