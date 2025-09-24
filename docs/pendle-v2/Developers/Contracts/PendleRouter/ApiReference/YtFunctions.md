---
hide_table_of_contents: true
---

# Yield Token (YT) Trading Functions

This document covers all functions for trading Yield Tokens (YT) in Pendle markets. YT tokens represent the yield portion of yield-bearing assets and can be traded against other tokens or SY tokens.

## Token to YT Trading

Since AMM only supports swaps by exact YT, to swap exact tokens for YT requires binary search approximation to find the correct amount of SY needed to achieve the desired YT output. For best usage, use the [SDK](/Developers/Backend/BackendAndHostedSDK#features) for better approximation since running binary search on-chain is costly.

### swapExactTokenForYt

Swaps an exact amount of any supported token for YT tokens.

```solidity
function swapExactTokenForYt(
    address receiver,
    address market,
    uint256 minYtOut,
    ApproxParams calldata guessYtOut,
    TokenInput calldata input,
    LimitOrderData calldata limit
) external payable returns (uint256 netYtOut, uint256 netSyFee, uint256 netSyInterm)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive YT tokens |
| market | `address` | Pendle market address |
| minYtOut | `uint256` | Minimum YT tokens to receive |
| guessYtOut | [`ApproxParams`](/Developers/Contracts/PendleRouter/ApiReference/types#approxparams) | Approximation parameters |
| input | [`TokenInput`](/Developers/Contracts/PendleRouter/ApiReference/types#tokeninput) | Token input configuration |
| limit | [`LimitOrderData`](/Developers/Contracts/PendleRouter/ApiReference/types#limitorderdata) | Limit order configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netYtOut | `uint256` | YT tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |
| netSyInterm | `uint256` | SY tokens generated from input token |

**Use Case**
Most common function for buying YT tokens with any supported token. The function converts your token to SY and then swaps SY for YT, first filling available limit orders, then using the AMM for any remaining amount.

**Simple Version Available**
For basic operations without custom parameters, use [`swapExactTokenForYtSimple`](/Developers/Contracts/PendleRouter/ApiReference/SimpleFunctions#swapexacttokenforytSimple) which automatically handles approximation and skips limit order functionality.

### swapExactSyForYt

Swaps an exact amount of SY tokens for YT tokens.

```solidity
function swapExactSyForYt(
    address receiver,
    address market,
    uint256 exactSyIn,
    uint256 minYtOut,
    ApproxParams calldata guessYtOut,
    LimitOrderData calldata limit
) external returns (uint256 netYtOut, uint256 netSyFee)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive YT tokens |
| market | `address` | Pendle market address |
| exactSyIn | `uint256` | Exact amount of SY tokens to swap |
| minYtOut | `uint256` | Minimum YT tokens to receive |
| guessYtOut | [`ApproxParams`](/Developers/Contracts/PendleRouter/ApiReference/types#approxparams) | Approximation parameters |
| limit | [`LimitOrderData`](/Developers/Contracts/PendleRouter/ApiReference/types#limitorderdata) | Limit order configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netYtOut | `uint256` | YT tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |

**Use Case**
Direct and efficient method when you already have SY tokens and want to buy YT tokens.

**Simple Version Available**
For basic operations without custom parameters, use [`swapExactSyForYtSimple`](/Developers/Contracts/PendleRouter/ApiReference/SimpleFunctions#swapexactsyforytSimple) which automatically handles approximation and skips limit order functionality.

## YT to Token Trading

### swapExactYtForToken

Swaps an exact amount of YT tokens for any supported token.

```solidity
function swapExactYtForToken(
    address receiver,
    address market,
    uint256 exactYtIn,
    TokenOutput calldata output,
    LimitOrderData calldata limit
) external returns (uint256 netTokenOut, uint256 netSyFee, uint256 netSyInterm)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive tokens |
| market | `address` | Pendle market address |
| exactYtIn | `uint256` | Exact amount of YT tokens to swap |
| output | [`TokenOutput`](/Developers/Contracts/PendleRouter/ApiReference/types#tokenoutput) | Token output configuration |
| limit | [`LimitOrderData`](/Developers/Contracts/PendleRouter/ApiReference/types#limitorderdata) | Limit order configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netTokenOut | `uint256` | Amount tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |
| netSyInterm | `uint256` | SY tokens before conversion |

**Use Case**
Most common function for selling YT tokens to receive tokens. The function swaps YT for SY (first filling available limit orders, then using the AMM), then converts SY to your desired token.

### swapExactYtForSy

Swaps an exact amount of YT tokens for SY tokens.

```solidity
function swapExactYtForSy(
    address receiver,
    address market,
    uint256 exactYtIn,
    uint256 minSyOut,
    LimitOrderData calldata limit
) external returns (uint256 netSyOut, uint256 netSyFee)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive SY tokens |
| market | `address` | Pendle market address |
| exactYtIn | `uint256` | Exact amount of YT tokens to swap |
| minSyOut | `uint256` | Minimum SY tokens to receive |
| limit | [`LimitOrderData`](/Developers/Contracts/PendleRouter/ApiReference/types#limitorderdata) | Limit order configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netSyOut | `uint256` | SY tokens received |
| netSyFee | `uint256` | Trading fees paid in SY |

**Use Case**
Direct and efficient method for selling YT tokens to receive SY tokens.

## Integration Examples

### Buying YT-sUSDe with USDe
```solidity
// Swap 1000 USDe for YT-sUSDe tokens
router.swapExactTokenForYt(
    msg.sender,
    PT_SUSDE_MARKET_ADDRESS,
    minYtOut,
    createDefaultApproxParams(),
    createTokenInputSimple(USDE_ADDRESS, 1000e18),
    createEmptyLimitOrderData()
);
```

### Selling YT-sUSDe for USDe
```solidity
// Swap YT-sUSDe tokens for USDe
router.swapExactYtForToken(
    msg.sender,
    PT_SUSDE_MARKET_ADDRESS,
    ytAmount,
    createTokenOutputSimple(USDE_ADDRESS, minUsdeOut),
    createEmptyLimitOrderData()
);
```

### Direct SY to YT Trading
```solidity
// Swap SY tokens directly for YT tokens
router.swapExactSyForYt(
    msg.sender,
    MARKET_ADDRESS,
    syAmount,
    minYtOut,
    createDefaultApproxParams(),
    createEmptyLimitOrderData()
);
```