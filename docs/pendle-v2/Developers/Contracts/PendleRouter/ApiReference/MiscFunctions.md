---
hide_table_of_contents: true
---

# Misc Functions

This document covers core functions for SY/PY operations, reward claiming, exit strategies, and utility functions in Pendle Router.

## SY Operations

### mintSyFromToken

Mints SY tokens from any supported tokens.

```solidity
function mintSyFromToken(
    address receiver,
    address SY,
    uint256 minSyOut,
    TokenInput calldata input
) external payable returns (uint256 netSyOut)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive SY tokens |
| SY | `address` | SY token contract address |
| minSyOut | `uint256` | Minimum SY tokens to receive |
| input | [`TokenInput`](./Types#tokeninput) | Token input configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netSyOut | `uint256` | SY tokens received |

**Use Case**
Convert any supported token into SY tokens, which are standardized yield-bearing tokens used throughout the Pendle ecosystem.

### redeemSyToToken

Redeems SY tokens back to any supported tokens.

```solidity
function redeemSyToToken(
    address receiver,
    address SY,
    uint256 netSyIn,
    TokenOutput calldata output
) external returns (uint256 netTokenOut)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive tokens |
| SY | `address` | SY token contract address |
| netSyIn | `uint256` | Amount of SY tokens to redeem |
| output | [`TokenOutput`](./Types#tokenoutput) | Token output configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netTokenOut | `uint256` | Tokens received |

**Use Case**
Convert SY tokens back to tokens when you want.

## Principal/Yield Token Operations

### mintPyFromToken

Mints PT and YT tokens (collectively called PY) from any supported tokens.

```solidity
function mintPyFromToken(
    address receiver,
    address YT,
    uint256 minPyOut,
    TokenInput calldata input
) external payable returns (uint256 netPyOut, uint256 netSyInterm)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive PT and YT tokens |
| YT | `address` | YT token contract address |
| minPyOut | `uint256` | Minimum PY tokens to mint |
| input | [`TokenInput`](./Types#tokeninput) | Token input configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netPyOut | `uint256` | PT and YT tokens minted (equal amounts) |
| netSyInterm | `uint256` | SY tokens generated as intermediate step |

**Use Case**
Split any supported token into separate principal and yield components.

### redeemPyToToken

Redeems equal amounts of PT and YT tokens back to any supported tokens.

```solidity
function redeemPyToToken(
    address receiver,
    address YT,
    uint256 netPyIn,
    TokenOutput calldata output
) external returns (uint256 netTokenOut, uint256 netSyInterm)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive tokens |
| YT | `address` | YT token contract address |
| netPyIn | `uint256` | Amount of PT+YT pairs to redeem |
| output | [`TokenOutput`](./Types#tokenoutput) | Token output configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netTokenOut | `uint256` | Tokens received |
| netSyInterm | `uint256` | SY tokens generated as intermediate step |

**Use Case**
Recombine PT and YT tokens back into any supported token. Requires holding equal amounts of both PT and YT.

### mintPyFromSy

Mints PT and YT tokens directly from SY tokens.

```solidity
function mintPyFromSy(
    address receiver,
    address YT,
    uint256 netSyIn,
    uint256 minPyOut
) external returns (uint256 netPyOut)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive PT and YT tokens |
| YT | `address` | YT token contract address |
| netSyIn | `uint256` | Amount of SY tokens to use |
| minPyOut | `uint256` | Minimum PY tokens to mint |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netPyOut | `uint256` | PT and YT tokens minted (equal amounts) |

**Use Case**
Efficient splitting of SY tokens into PT and YT when you already have SY tokens.

### redeemPyToSy

Redeems equal amounts of PT and YT tokens back to SY tokens.

```solidity
function redeemPyToSy(
    address receiver,
    address YT,
    uint256 netPyIn,
    uint256 minSyOut
) external returns (uint256 netSyOut)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive SY tokens |
| YT | `address` | YT token contract address |
| netPyIn | `uint256` | Amount of PT+YT pairs to redeem |
| minSyOut | `uint256` | Minimum SY tokens to receive |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netSyOut | `uint256` | SY tokens received |

**Use Case**
Recombine PT and YT tokens into SY tokens for further operations within Pendle ecosystem.

## Reward Functions

### redeemDueInterestAndRewards

Claims all pending rewards and interest from SY tokens, YT tokens, and LP positions.

```solidity
function redeemDueInterestAndRewards(
    address user,
    address[] calldata sys,
    address[] calldata yts,
    address[] calldata markets
) external
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| user | `address` | Address to receive rewards |
| sys | `address[]` | Array of SY token addresses |
| yts | `address[]` | Array of YT token addresses |
| markets | `address[]` | Array of market addresses |

**Use Case**
Batch claim all rewards across multiple positions. This is the most gas-efficient way to claim rewards from multiple sources.

### redeemDueInterestAndRewardsV2

Advanced reward claiming with token swapping capabilities.

```solidity
function redeemDueInterestAndRewardsV2(
    IStandardizedYield[] calldata SYs,
    RedeemYtIncomeToTokenStruct[] calldata YTs,
    IPMarket[] calldata markets,
    IPSwapAggregator pendleSwap,
    SwapDataExtra[] calldata swaps
) external returns (uint256[] memory netOutFromSwaps, uint256[] memory netInterests)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| SYs | `IStandardizedYield[]` | Array of SY contracts |
| YTs | [`RedeemYtIncomeToTokenStruct[]`](./Types#redeemytincometotokenstruct) | YT redemption configurations |
| markets | `IPMarket[]` | Array of market contracts |
| pendleSwap | `IPSwapAggregator` | Swap aggregator for token conversions |
| swaps | [`SwapDataExtra[]`](./Types#swapdata) | Swap configurations |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netOutFromSwaps | `uint256[]` | Tokens received from swaps |
| netInterests | `uint256[]` | Interest tokens received |

**Use Case**
Advanced reward claiming that can automatically swap reward tokens to desired tokens. Useful for complex strategies and automated systems.

## Token Swapping

### swapTokensToTokens

Performs multiple token-to-token swaps using external aggregators.

```solidity
function swapTokensToTokens(
    IPSwapAggregator pendleSwap,
    SwapDataExtra[] calldata swaps,
    uint256[] calldata netSwaps
) external payable returns (uint256[] memory netOutFromSwaps)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| pendleSwap | `IPSwapAggregator` | Swap aggregator contract |
| swaps | `SwapDataExtra[]` | Array of swap configurations |
| netSwaps | `uint256[]` | Array of input amounts for each swap |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netOutFromSwaps | `uint256[]` | Output amounts from each swap |

**Use Case**
Batch multiple token swaps for gas efficiency.

### swapTokenToTokenViaSy

Swaps tokens using SY as an intermediate step.

```solidity
function swapTokenToTokenViaSy(
    address receiver,
    address SY,
    TokenInput calldata input,
    address tokenRedeemSy,
    uint256 minTokenOut
) external payable returns (uint256 netTokenOut, uint256 netSyInterm)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive output tokens |
| SY | `address` | SY token contract address |
| input | `TokenInput` | Input token configuration |
| tokenRedeemSy | `address` | Output token address |
| minTokenOut | `uint256` | Minimum output tokens to receive |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netTokenOut | `uint256` | Output tokens received |
| netSyInterm | `uint256` | SY tokens used as intermediate |

**Use Case**
Swap between tokens that both support the same SY token, often providing better rates than external DEXes.

## Exit Strategies

### exitPreExpToToken

Comprehensive position exit before market expiry, converting everything to a single token.

```solidity
function exitPreExpToToken(
    address receiver,
    address market,
    uint256 netPtIn,
    uint256 netYtIn,
    uint256 netLpIn,
    TokenOutput calldata output,
    LimitOrderData calldata limit
) external returns (uint256 totalTokenOut, ExitPreExpReturnParams memory params)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive tokens |
| market | `address` | Pendle market address |
| netPtIn | `uint256` | Amount of PT tokens to exit |
| netYtIn | `uint256` | Amount of YT tokens to exit |
| netLpIn | `uint256` | Amount of LP tokens to exit |
| output | `TokenOutput` | Output token configuration |
| limit | [`LimitOrderData`](./Types#limitorderdata) | Limit order configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| totalTokenOut | `uint256` | Total tokens received |
| params | [`ExitPreExpReturnParams`](./Types#exitpreexpreturnparams) | Detailed breakdown of exit operations |

**Use Case**
Complete portfolio liquidation before expiry. Optimally combines PT+YT pairs and swaps remaining tokens.

### exitPreExpToSy

Comprehensive position exit before market expiry, converting everything to SY tokens.

```solidity
function exitPreExpToSy(
    address receiver,
    address market,
    uint256 netPtIn,
    uint256 netYtIn,
    uint256 netLpIn,
    uint256 minSyOut,
    LimitOrderData calldata limit
) external returns (ExitPreExpReturnParams memory params)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive SY tokens |
| market | `address` | Pendle market address |
| netPtIn | `uint256` | Amount of PT tokens to exit |
| netYtIn | `uint256` | Amount of YT tokens to exit |
| netLpIn | `uint256` | Amount of LP tokens to exit |
| minSyOut | `uint256` | Minimum SY tokens to receive |
| limit | [`LimitOrderData`](./Types#limitorderdata) | Limit order configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| params | [`ExitPreExpReturnParams`](./Types#exitpreexpreturnparams) | Detailed breakdown of exit operations |

**Use Case**
Portfolio liquidation to SY tokens, useful when you want to stay within Pendle ecosystem or perform further operations.

### exitPostExpToToken

Position exit after market expiry, when PT tokens can be redeemed 1:1.

```solidity
function exitPostExpToToken(
    address receiver,
    address market,
    uint256 netPtIn,
    uint256 netLpIn,
    TokenOutput calldata output
) external returns (uint256 totalTokenOut, ExitPostExpReturnParams memory params)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive tokens |
| market | `address` | Pendle market address |
| netPtIn | `uint256` | Amount of PT tokens to redeem |
| netLpIn | `uint256` | Amount of LP tokens to exit |
| output | `TokenOutput` | Output token configuration |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| totalTokenOut | `uint256` | Total tokens received |
| params | [`ExitPostExpReturnParams`](./Types#exitpostexpreturnparams) | Breakdown of redemption operations |

**Use Case**
Clean exit after maturity when PT tokens are worth face value. Much simpler than pre-expiry exits.

### exitPostExpToSy

Position exit after market expiry, converting to SY tokens.

```solidity
function exitPostExpToSy(
    address receiver,
    address market,
    uint256 netPtIn,
    uint256 netLpIn,
    uint256 minSyOut
) external returns (ExitPostExpReturnParams memory params)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| receiver | `address` | Address to receive SY tokens |
| market | `address` | Pendle market address |
| netPtIn | `uint256` | Amount of PT tokens to redeem |
| netLpIn | `uint256` | Amount of LP tokens to exit |
| minSyOut | `uint256` | Minimum SY tokens to receive |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| params | [`ExitPostExpReturnParams`](./Types#exitpostexpreturnparams) | Breakdown of redemption operations |

**Use Case**
Post-expiry exit to SY tokens, maintaining position within Pendle ecosystem.

## Utility Functions

### boostMarkets

Triggers market updates to refresh boost multipliers.

```solidity
function boostMarkets(address[] memory markets) external
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| markets | `address[]` | Array of market addresses to boost |

**Use Case**
Refresh boost calculations for multiple markets in a single transaction.

### multicall

Executes multiple function calls in a single transaction.

```solidity
function multicall(Call3[] calldata calls) external payable returns (Result[] memory res)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| calls | `Call3[]` | Array of function calls to execute |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| res | `Result[]` | Results from each function call |

**Use Case**
Batch multiple operations for gas efficiency and atomic execution.

### simulate

Simulates function execution without state changes.

```solidity
function simulate(address target, bytes calldata data) external payable
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| target | `address` | Contract address to simulate |
| data | `bytes` | Encoded function call data |

**Use Case**
Test function execution and get return values without actually executing the transaction.

## Integration Examples

### Basic SY Operations
```solidity
// Mint SY-sUSDe from USDe
router.mintSyFromToken(
    msg.sender,
    SY_USDE_ADDRESS,
    minSyOut,
    createTokenInputSimple(USDE_ADDRESS, 1000e18)
);

// Redeem SY-sUSDe back to USDE
router.redeemSyToToken(
    msg.sender,
    SY_USDE_ADDRESS,
    syAmount,
    createTokenOutputSimple(USDE_ADDRESS, minUsdeOut)
);
```

### Reward Claiming
```solidity
// Claim all rewards
address[] memory sys = new address[](1);
address[] memory yts = new address[](1);
address[] memory markets = new address[](1);
sys[0] = SY_ADDRESS;
yts[0] = YT_ADDRESS;
markets[0] = MARKET_ADDRESS;

router.redeemDueInterestAndRewards(msg.sender, sys, yts, markets);
```

### Complete Position Exit
```solidity
// Exit all positions before expiry
router.exitPreExpToToken(
    msg.sender,
    MARKET_ADDRESS,
    ptAmount,
    ytAmount,
    lpAmount,
    createTokenOutputSimple(USDC_ADDRESS, minUsdcOut),
    createEmptyLimitOrderData()
);
```