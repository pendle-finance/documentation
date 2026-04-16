---
hide_table_of_contents: true
---

# Types and Utility Functions

This document covers all struct types used throughout the Pendle Router and utility functions for generating parameters on-chain.

## Core Parameter Types

### TokenInput

Defines input token configuration for functions that accept tokens.

```solidity
struct TokenInput {
    address tokenIn;
    uint256 netTokenIn;
    address tokenMintSy;
    address pendleSwap;
    SwapData swapData;
}
```

**Fields**

| Name | Type | Description |
|------|------|-------------|
| tokenIn | `address` | Address of the input token (can be any ERC20 token supported by Pendle) |
| netTokenIn | `uint256` | Amount of input tokens |
| tokenMintSy | `address` | Token used to mint SY (must be supported by target SY contract) |
| pendleSwap | `address` | Swap aggregator address (use `address(0)` for direct SY token input) |
| swapData | `SwapData` | Swap configuration data for external aggregation |

### Usage Patterns

**Direct SY Token Input (Simple):**
When `tokenIn` is already a token supported by the target SY contract:
- Set `tokenIn = tokenMintSy` (same token)
- Set `pendleSwap = address(0)` (no external swap needed)
- Set `swapData` to empty (no aggregation)

**Any ERC20 Token Input (Zap In):**
When `tokenIn` is any ERC20 token that needs to be swapped to a supported SY token:
- Set `tokenIn` to the user's input token (e.g., USDC, DAI, WETH)
- Set `tokenMintSy` to a token supported by the target SY
- Set `pendleSwap` to the swap aggregator address
- Set `swapData` with proper aggregator configuration.
  
    **E.g**: When you have USDC and want to mint SY-sUSDe:
    - Set `tokenIn = USDC`
    - Set `tokenMintSy = sUSDe` (a token accepted by SY-sUSDe's `deposit()` function)
    - Set `pendleSwap = 0xd4F480965D2347d421F1bEC7F545682E5Ec2151D`
    - Set `swapData` to proper data configuration obtained from [SDK](../../../Backend/HostedSdk#supported-functions)

**Benefits of Zap In:**
- Users can interact with any Pendle market using any ERC20 token they hold
- No need to manually swap tokens before interacting with Pendle
- Optimal routing through multiple DEXes for best price execution
- Single transaction for swap + Pendle operation

**SDK Integration:**
The [Pendle Hosted SDK](../../../Backend/HostedSdk#features) automatically handles all TokenInput configuration when you enable routing. When you set `enableAggregator: true` in SDK calls, it:
- Automatically selects the best swap aggregator (KyberSwap, ODOS, 1inch, etc.)
- Generates optimal `swapData` for the chosen route
- Handles all token conversions transparently
- Provides the best possible price execution across multiple DEXes

For direct contract interaction, you need to manually configure these fields or use utility functions like `createTokenInputSimple()` for basic operations.

### TokenOutput

Defines output token configuration for functions that return tokens.

```solidity
struct TokenOutput {
    address tokenOut;
    uint256 minTokenOut;
    address tokenRedeemSy;
    address pendleSwap;
    SwapData swapData;
}
```

**Fields**

| Name | Type | Description |
|------|------|-------------|
| tokenOut | `address` | Address of the desired output token (can be any ERC20 token supported by Pendle) |
| minTokenOut | `uint256` | Minimum amount of output tokens to receive (slippage protection) |
| tokenRedeemSy | `address` | Token to redeem SY to (must be supported by target SY contract) |
| pendleSwap | `address` | Swap aggregator address (use `address(0)` for direct SY token output) |
| swapData | `SwapData` | Swap configuration data for external aggregation |

### Usage Patterns

**Direct SY Token Output (Simple):**
When `tokenOut` is already a token supported by the target SY contract:
- Set `tokenOut = tokenRedeemSy` (same token)
- Set `pendleSwap = address(0)` (no external swap needed)
- Set `swapData` to empty (no aggregation)

**Any ERC20 Token Output (Zap Out):**
When `tokenOut` is any ERC20 token different from supported SY tokens:
- Set `tokenOut` to the user's desired token (e.g., USDC, DAI, WETH)
- Set `tokenRedeemSy` to a token supported by the target SY
- Set `pendleSwap` to the swap aggregator address
- Set `swapData` with proper aggregator configuration (KyberSwap, 1inch, etc.)

**Benefits of Zap Out:**
- Users can receive any ERC20 token as output from Pendle operations
- No need to manually swap tokens after exiting Pendle positions
- Optimal routing through multiple DEXes for best price execution
- Single transaction for Pendle operation + swap
- Built-in slippage protection with `minTokenOut`

**SDK Integration:**
The [Pendle Hosted SDK](../../../Backend/HostedSdk#features) automatically handles all TokenOutput configuration when you enable routing. When you set `enableAggregator: true` in SDK calls, it:
- Automatically selects the best swap aggregator for output token conversion
- Generates optimal `swapData` for the chosen route
- Calculates appropriate slippage protection
- Handles all token conversions transparently

For direct contract interaction, you need to manually configure these fields or use utility functions like `createTokenOutputSimple()` for basic operations.

### ApproxParams

Parameters for approximation algorithms used when swapping exact tokens to PT or YT. **ApproxParams is required when the exact output amount needs to be determined through iterative approximation** because the Pendle AMM formula cannot be directly inverted.

```solidity
struct ApproxParams {
    uint256 guessMin;
    uint256 guessMax;
    uint256 guessOffchain;
    uint256 maxIteration;
    uint256 eps;
}
```

**Fields**

| Name | Type | Description |
|------|------|-------------|
| guessMin | `uint256` | Minimum bound for binary search |
| guessMax | `uint256` | Maximum bound for binary search (use `type(uint256).max` for auto) |
| guessOffchain | `uint256` | Initial guess from off-chain calculation (use `0` for on-chain) |
| maxIteration | `uint256` | Maximum iterations for binary search (recommended: `256`) |
| eps | `uint256` | Precision tolerance (recommended: `1e14`) |

**When ApproxParams is Needed:**

ApproxParams is required for functions that swap an exact amount of tokens to PT or YT, such as:
- [`swapExactTokenForPt`](./PtFunctions#swapexacttokenforpt) - Convert exact token amount to PT
- [`swapExactSyForPt`](./PtFunctions#swapexactsyforpt) - Convert exact SY amount to PT
- [`swapExactTokenForYt`](./YtFunctions#swapexacttokenforyt) - Convert exact token amount to YT
- [`swapExactSyForYt`](./YtFunctions#swapexactsyforyt) - Convert exact SY amount to YT

**Why Approximation is Required:**
The Pendle AMM natively supports functions like `swapExactPtForSy` and `swapSyForExactPt`, but does NOT have `swapExactSyForPt`. When you want to swap an exact amount of tokens/SY for PT/YT, the router must use binary search to determine how much PT/YT can be obtained, since the AMM can only calculate the reverse (exact PT amounts).

### LimitOrderData

Configuration for limit order functionality that **provides better prices and reduces slippage** by filling user orders at predetermined rates before routing to the AMM.

```solidity
struct LimitOrderData {
    address limitRouter;
    uint256 epsSkipMarket;
    FillOrderParams[] normalFills;
    FillOrderParams[] flashFills;
    bytes optData;
}
```

**Fields**

| Name | Type | Description |
|------|------|-------------|
| limitRouter | `address` | Address of limit order router |
| epsSkipMarket | `uint256` | Threshold to skip market operations |
| normalFills | `FillOrderParams[]` | Normal limit order fills |
| flashFills | `FillOrderParams[]` | Flash loan limit order fills |
| optData | `bytes` | Additional optimization data |

### RedeemYtIncomeToTokenStruct

Configuration for YT income redemption with token conversion.

```solidity
struct RedeemYtIncomeToTokenStruct {
    IPYieldToken yt;
    bool doRedeemInterest;
    bool doRedeemRewards;
    address tokenRedeemSy;
    uint256 minTokenRedeemOut;
}
```

**Fields**

| Name | Type | Description |
|------|------|-------------|
| yt | `IPYieldToken` | YT token contract interface |
| doRedeemInterest | `bool` | Whether to redeem accrued interest |
| doRedeemRewards | `bool` | Whether to redeem reward tokens |
| tokenRedeemSy | `address` | Token to convert SY interest to |
| minTokenRedeemOut | `uint256` | Minimum tokens to receive from conversion |

### SwapData

Configuration for external swap aggregation functionality.

```solidity
struct SwapData {
    SwapType swapType;
    address extRouter;
    bytes extCalldata;
    bool needScale;
}
```

**Fields**

| Name | Type | Description |
|------|------|-------------|
| swapType | `SwapType` | Type of swap aggregator to use |
| extRouter | `address` | Address of the external swap router |
| extCalldata | `bytes` | Encoded calldata for the external swap |
| needScale | `bool` | Whether the swap amount needs scaling |

**Use Case**
Enables integration with external swap aggregators like KyberSwap, 1inch, Paraswap, etc. This allows Pendle to support zapping in/out with any ERC20 token by routing through external DEXes.

### SwapType

Enumeration defining supported swap aggregator types. See the [complete SwapType definition](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/router/swap-aggregator/IPSwapAggregator.sol#L18-L31) in the smart contract.

```solidity
enum SwapType {
    NONE,
    KYBERSWAP,
    ODOS,
    ETH_WETH,
    OKX,
    ONE_INCH,
    PARASWAP
}
```

**Values**

| Value | Description |
|-------|-------------|
| `NONE` | No external swap aggregation |
| `KYBERSWAP` | KyberSwap aggregation |
| `ODOS` | ODOS aggregation |
| `ETH_WETH` | ETH/WETH conversion |
| `OKX` | OKX DEX aggregation |
| `ONE_INCH` | 1inch aggregation |
| `PARASWAP` | Paraswap aggregation |

**Use Case**
Specifies which external aggregator to use for token swaps, enabling Pendle to leverage the best available liquidity across different DEXes. The [Pendle Hosted SDK](../../../Backend/HostedSdk#features) automatically selects the optimal SwapType based on available liquidity and routing efficiency.

### ExitPreExpReturnParams

Detailed breakdown of returns from pre-expiry position exit operations.

```solidity
struct ExitPreExpReturnParams {
    uint256 netPtFromRemove;
    uint256 netSyFromRemove;
    uint256 netPyRedeem;
    uint256 netSyFromRedeem;
    uint256 netPtSwap;
    uint256 netYtSwap;
    uint256 netSyFromSwap;
    uint256 netSyFee;
    uint256 totalSyOut;
}
```

**Fields**

| Name | Type | Description |
|------|------|-------------|
| netPtFromRemove | `uint256` | PT tokens obtained from LP removal |
| netSyFromRemove | `uint256` | SY tokens obtained from LP removal |
| netPyRedeem | `uint256` | PT+YT pairs redeemed to SY |
| netSyFromRedeem | `uint256` | SY tokens from PT+YT redemption |
| netPtSwap | `uint256` | PT tokens swapped to SY |
| netYtSwap | `uint256` | YT tokens swapped to SY |
| netSyFromSwap | `uint256` | SY tokens from PT/YT swaps |
| netSyFee | `uint256` | Trading fees paid in SY |
| totalSyOut | `uint256` | Total SY tokens received |

**Use Case**
Provides detailed breakdown of complex exit operations before market expiry, helping users understand exactly how their positions were unwound and what fees were paid.

### ExitPostExpReturnParams

Breakdown of returns from post-expiry position exit operations.

```solidity
struct ExitPostExpReturnParams {
    uint256 netPtFromRemove;
    uint256 netSyFromRemove;
    uint256 netPtRedeem;
    uint256 netSyFromRedeem;
    uint256 totalSyOut;
}
```

**Fields**

| Name | Type | Description |
|------|------|-------------|
| netPtFromRemove | `uint256` | PT tokens obtained from LP removal |
| netSyFromRemove | `uint256` | SY tokens obtained from LP removal |
| netPtRedeem | `uint256` | PT tokens redeemed at maturity |
| netSyFromRedeem | `uint256` | SY tokens from PT redemption |
| totalSyOut | `uint256` | Total SY tokens received |

**Use Case**
Provides breakdown of exit operations after market expiry when PT tokens can be redeemed 1:1 for underlying assets. Simpler than pre-expiry exits since no swapping is required.

## Utility Functions

These functions generate the parameters described above on-chain, offering an alternative for users who do not utilize the Pendle SDK.

### createTokenInputSimple

Creates a simple TokenInput struct without external swapping.

```solidity
function createTokenInputSimple(address tokenIn, uint256 netTokenIn) pure returns (TokenInput memory)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| tokenIn | `address` | Input token address (must be supported by target SY) |
| netTokenIn | `uint256` | Amount of input tokens |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| - | `TokenInput` | Configured TokenInput struct |

**Use Case**
Most common way to create TokenInput for standard operations. The tokenIn must be one of the tokens accepted by the target SY contract (check via `IStandardizedYield.getTokensIn()`).

### createTokenOutputSimple

Creates a simple TokenOutput struct without external swapping.

```solidity
function createTokenOutputSimple(address tokenOut, uint256 minTokenOut) pure returns (TokenOutput memory)
```

**Input Parameters**

| Name | Type | Description |
|------|------|-------------|
| tokenOut | `address` | Output token address (must be supported by target SY) |
| minTokenOut | `uint256` | Minimum amount of output tokens |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| - | `TokenOutput` | Configured TokenOutput struct |

**Use Case**
Most common way to create TokenOutput for standard operations. The tokenOut must be one of the tokens that the target SY can redeem to (check via `IStandardizedYield.getTokensOut()`).

### createDefaultApproxParams

Creates default approximation parameters suitable for most operations.

```solidity
function createDefaultApproxParams() pure returns (ApproxParams memory)
```

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| - | `ApproxParams` | Configured ApproxParams with optimal defaults |

**Configuration**
- guessMin: `0`
- guessMax: `type(uint256).max` (auto-detection)
- guessOffchain: `0` (pure on-chain calculation)
- maxIteration: `256` (sufficient for most cases)
- eps: `1e14` (0.01% precision)

**Use Case**
Recommended for all operations requiring approximation. These parameters provide good balance between accuracy and gas costs.

### createEmptyLimitOrderData

Creates an empty LimitOrderData struct for operations without limit orders.

```solidity
function createEmptyLimitOrderData() pure returns (LimitOrderData memory)
```

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| - | `LimitOrderData` | Empty LimitOrderData struct |

**Use Case**
Use when you don't need limit order functionality. Required by many functions but can be empty for standard market operations.

## Integration Examples

### Basic Parameter Creation
```solidity
// Create input parameters for 1000 USDC
TokenInput memory input = createTokenInputSimple(USDC_ADDRESS, 1000e6);

// Create output parameters expecting at least 950 USDC
TokenOutput memory output = createTokenOutputSimple(USDC_ADDRESS, 950e6);

// Create default approximation parameters
ApproxParams memory approx = createDefaultApproxParams();

// Create empty limit order data
LimitOrderData memory limit = createEmptyLimitOrderData();
```

### Complete Function Call Example
```solidity
// Add liquidity with properly configured parameters
router.addLiquiditySingleToken(
    msg.sender,                                           // receiver
    MARKET_ADDRESS,                                       // market
    minLpOut,                                            // minLpOut
    createDefaultApproxParams(),                         // guessPtReceivedFromSy
    createTokenInputSimple(USDC_ADDRESS, 1000e6),        // input
    createEmptyLimitOrderData()                          // limit
);
```

### Custom ApproxParams for Advanced Use
```solidity
// Create custom approximation parameters for high precision
ApproxParams memory customApprox = ApproxParams({
    guessMin: 0,
    guessMax: type(uint256).max,
    guessOffchain: estimatedOutput,  // Use off-chain calculation if available
    maxIteration: 512,               // Higher precision
    eps: 1e15                        // Looser tolerance (0.1%)
});
```

## Best Practices

**For Standard Operations:**
- Always use `createDefaultApproxParams()` unless you have specific precision requirements
- Use `createEmptyLimitOrderData()` for simple market operations
- Ensure token addresses are supported by target SY contracts

**For Performance:**
- Off-chain approximation (`guessOffchain`) can reduce gas costs significantly
- Higher `maxIteration` values increase precision but cost more gas
- Tighter `eps` values improve precision but may increase iterations