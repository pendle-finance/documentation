---
hide_table_of_contents: true
---

# Pendle Market Smart Contracts

## Introduction

A Pendle Market is a specialized Automated Market Maker (AMM) pool designed for trading yields. Each market enables efficient trading between:

- **Principal Tokens (PT)** - Tokens representing the principal component of yield-bearing assets
- **Standardized Yield (SY)** - Wrapped yield-bearing assets that standardize yield mechanics

## Pendle AMM Overview

Traditional AMMs like Uniswap use constant product formulas (`x × y = k`) that don't account for the unique properties of fixed-yield assets. Pendle Markets implement a sophisticated time-aware AMM that:

- **Recognizes time decay**: PT prices naturally converge to 1 as they approach expiry
- **Optimizes for yield trading**: Pricing curves are tailored for interest rate movements
- **Maximizes capital efficiency**: Concentrates liquidity around expected yield ranges
- **Minimal Impermanent Loss (IL)**: Pendle’s AMM accounts for PT’s natural price appreciation by shifting the AMM curve to push PT price towards its underlying value as time passes, mitigating time-dependent IL (No IL at maturity).


> **📖 Deep Dive**: For complete mathematical analysis and comparisons, see the [Pendle V2 AMM Whitepaper](V2_AMM.pdf)

## Market Parameters

- **Expiry**: The timestamp when PT tokens can be redeemed 1:1 for underlying assets - drives PT price convergence to 1 as expiry approaches.

- **Scalar Root**: Controls the trade-off between capital efficiency and tradeable interest rate range - higher values create tighter, more efficient markets.

- **Initial Anchor**: Sets the interest rate around which trading is most capital efficient at market launch - centers liquidity around expected yield levels.

- **lnFeeRateRoot**: Dynamic fees based on interest rate impact rather than token amounts - larger market movements incur proportionally higher fees.

## Core Logic

### [`readState`](https://github.com/pendle-finance/pendle-core-v2-public/blob/ba53685767bc16e070136b9dbfe02a5dd6258c61/contracts/core/Market/v3/PendleMarketV3.sol#L272-L292)
Returns the current market state and pricing metadata. 

**Note:** `lnFeeRateRoot` and `lastLnImpliedRate` are stored/returned as natural-log values in fixed-point form for gas-efficient math (document exact scaling). The router parameter allows the function to reflect router-specific settings (e.g., fee discounts if applicable).

```solidity
struct MarketState {
    int256 totalPt; // total PT in the market
    int256 totalSy; // total SY in the market
    int256 totalLp; // total LP minted
    address treasury; // treasury address to receive protocol fees
    int256 scalarRoot; // variable to control the capital efficiency of the market
    uint256 expiry; // timestamp when market expires
    /// fee data ///
    uint256 lnFeeRateRoot; // fee rate in ln
    uint256 reserveFeePercent; // reserve fee in base 100
    /// last trade data ///
    uint256 lastLnImpliedRate; // last ln(implied rate) observed
}
 /**
 * @notice read the state of the market from storage into memory for gas-efficient manipulation
 */
function readState(address router) external view returns (MarketState memory market);
```

### [`mint`](https://github.com/pendle-finance/pendle-core-v2-public/blob/ba53685767bc16e070136b9dbfe02a5dd6258c61/contracts/core/Market/v3/PendleMarketV3.sol#L85-L125)
Adds liquidity by depositing PT and SY; mints LP shares proportional to the amounts used. 

**Note:** caller must transfer PT and SY to the Market before calling. The function mints as many LPs as possible without exceeding `netSyDesired`/`netPtDesired`.

```solidity
/**
 * @notice PendleMarket allows users to provide in PT & SY in exchange for LPs, which
 * will grant LP holders more exchange fee over time
 * @dev will mint as much LP as possible such that the corresponding SY and PT used do
 * not exceed `netSyDesired` and `netPtDesired`, respectively
 * @dev PT and SY should be transferred to this contract prior to calling
 * @dev will revert if PT is expired
 */
function mint(
    address receiver,
    uint256 netSyDesired,
    uint256 netPtDesired
) external returns (uint256 netLpOut, uint256 netSyUsed, uint256 netPtUsed);
```

### [`burn`](https://github.com/pendle-finance/pendle-core-v2-public/blob/ba53685767bc16e070136b9dbfe02a5dd6258c61/contracts/core/Market/v3/PendleMarketV3.sol#L127-L148)
Removes liquidity by burning LP shares for pro-rata SY and PT. 

**Note:** caller must transfer LP to the Market before calling.

```solidity
/**
 * @notice LP Holders can burn their LP to receive back SY & PT proportionally
 * to their share of the market
 */
function burn(
    address receiverSy,
    address receiverPt,
    uint256 netLpToBurn
) external returns (uint256 netSyOut, uint256 netPtOut);
```

### [`swapExactPtForSy`](https://github.com/pendle-finance/pendle-core-v2-public/blob/ba53685767bc16e070136b9dbfe02a5dd6258c61/contracts/core/Market/v3/PendleMarketV3.sol#L150-L184)
Swaps an exact amount of PT for SY. 

**Note:** caller must transfer PT to the Market first; the Market then sends out the computed SY and (optionally) invokes a callback if data is non-empty. For a deeper understanding of the math behind, refer to the [`Pendle V2 AMM Whitepaper`](V2_AMM.pdf) and [`MarketMathCore Contract`](https://github.com/pendle-finance/pendle-core-v2-public/blob/ba53685767bc16e070136b9dbfe02a5dd6258c61/contracts/core/Market/MarketMathCore.sol#L193-L217).

```solidity
/**
 * @notice Pendle Market allows swaps between PT & SY it is holding. This function
 * aims to swap an exact amount of PT to SY.
 * @dev steps working of this contract
     - The outcome amount of SY will be precomputed by MarketMathLib
    - Release the calculated amount of SY to receiver
    - Callback to msg.sender if data.length > 0
    - Ensure exactPtIn amount of PT has been transferred to this address
    * @dev will revert if PT is expired
    * @param data bytes data to be sent in the callback (if any)
    */
function swapExactPtForSy(
    address receiver,
    uint256 exactPtIn,
    bytes calldata data
) external nonReentrant notExpired returns (uint256 netSyOut, uint256 netSyFee);
```

### [`swapSyForExactPt`](https://github.com/pendle-finance/pendle-core-v2-public/blob/ba53685767bc16e070136b9dbfe02a5dd6258c61/contracts/core/Market/v3/PendleMarketV3.sol#L186-L220)
Swaps SY for an exact amount of PT. 

**Note:** the Market sends out exactPtOut to receiver, optionally callbacks msg.sender, and then enforces that the required SY has been provided (typically via `transfer` in the callback/Router). For a deeper understanding of the math behind, refer to the [`Pendle V2 AMM Whitepaper`](V2_AMM.pdf) and [`MarketMathCore Contract`](https://github.com/pendle-finance/pendle-core-v2-public/blob/ba53685767bc16e070136b9dbfe02a5dd6258c61/contracts/core/Market/MarketMathCore.sol#L193-L217).

```solidity
/**
 * @notice Pendle Market allows swaps between PT & SY it is holding. This function
 * aims to swap SY for an exact amount of PT.
 * @dev steps working of this function
     - The exact outcome amount of PT will be transferred to receiver
    - Callback to msg.sender if data.length > 0
    - Ensure the calculated required amount of SY is transferred to this address
    * @dev will revert if PT is expired
    * @param data bytes data to be sent in the callback (if any)
    */
function swapSyForExactPt(
    address receiver,
    uint256 exactPtOut,
    bytes calldata data
) external returns (uint256 netSyIn, uint256 netSyFee);
```

### [`redeemRewards`](https://github.com/pendle-finance/pendle-core-v2-public/blob/ba53685767bc16e070136b9dbfe02a5dd6258c61/contracts/core/Market/v3/PendleMarketV3.sol#L231-L237)
Claims accumulated swap fees/protocol rewards for user (in the order of `getRewardTokens()`).

```solidity
/**
 * @notice redeems the user's reward
 * @return amount of reward token redeemed, in the same order as `getRewardTokens()`
 */
function redeemRewards(address user) external returns (uint256[] memory);
```

## Integration Example

### Basic Swap
```solidity
// Transfer SY to market first
sy.transfer(address(market), syAmount);

// Execute swap
(uint256 ptOut,) = market.swapExactSyForPt(
    msg.sender,
    syAmount,
    ""
);
```

### Basic Mint
```solidity
// Transfer tokens first
sy.transfer(address(market), syAmount);
pt.transfer(address(market), ptAmount);

// Mint LP tokens
(uint256 lpOut,,) = market.mint(
    msg.sender,
    syAmount,
    ptAmount
);
```

## Flash Swap

Similar to Uniswap V2, **all Pendle swaps are actually flash swaps**. The Market sends output tokens to the receiver first, then enforces that sufficient input tokens have been received by the end of the transaction. This facilitates advanced use cases like arbitrage, liquidation, and in Pendle specifically, YT trading.

### How It Works

1. **Market sends output tokens** to receiver immediately
2. **Callback executed** (if data provided) - this is where you implement your logic. You can use the received tokens for arbitrage, liquidation, or other strategies, but you must ensure you transfer the required input tokens back to the Market before the callback ends.
3. **Market checks input tokens** - verifies required tokens were transferred during the transaction

Because Ethereum transactions are atomic, the entire swap reverts if the Market doesn't receive enough input tokens.

### Flash Swap Example
:::danger Example code only
The snippets below are simplified for illustration and **are not audited**.  
**Do not** use them in production or with real funds. If you adapt any example,
conduct a full review, add comprehensive tests, and obtain an independent **security audit**.
:::
```solidity
contract FlashSwapExample is IPMarketSwapCallback {
    IPendleMarket public market;
    
    function flashSwap(uint256 ptAmount) external {
        // Market will send SY first, then callback to this contract
        market.swapExactPtForSy(
            address(this),
            ptAmount,
            abi.encode(msg.sender) // data for callback
        );
    }
    
    // Callback - Market has already sent SY to this contract
    function swapCallback(
        int256 ptToAccount,   // negative = we owe PT to market
        int256 syToAccount,   // positive = we received SY from market  
        bytes calldata data
    ) external {
        require(msg.sender == address(market));
        
        // Your custom logic here (arbitrage, liquidation, etc.)
        // ...
        
        // Must transfer required PT to market before callback ends
        uint256 ptOwed = uint256(-ptToAccount);
        IERC20(market.PT()).transfer(address(market), ptOwed);
    }
}
```

### Interface

```solidity
interface IPMarketSwapCallback {
    function swapCallback(int256 ptToAccount, int256 syToAccount, bytes calldata data) external;
}
``` 

## Oracle

Pendle Markets provide oracle functionality for PT pricing and implied yield rates, adapted from Uniswap V3's time-weighted average price (TWAP) oracle.

### How It Works

The oracle stores **implied rate observations** over time and uses them to calculate manipulation-resistant PT prices and yields.

**Key Formula:**
```
lnImpliedRateCumulative[i] = lnImpliedRateCumulative[i-1] + lnImpliedRate * timeDelta
```

Where `lnImpliedRate` is the natural log of the implied interest rate from the current market state.

### Oracle Functions

#### [`observe`](https://github.com/pendle-finance/pendle-core-v2-public/blob/ba53685767bc16e070136b9dbfe02a5dd6258c61/contracts/core/Market/v3/PendleMarketV3.sol#L448-L457)
Returns cumulative implied rates for specified time periods.

```solidity
function observe(uint32[] memory secondsAgos) 
    external view returns (uint216[] memory lnImpliedRateCumulative);
```

#### [`increaseObservationsCardinalityNext`](https://github.com/pendle-finance/pendle-core-v2-public/blob/ba53685767bc16e070136b9dbfe02a5dd6258c61/contracts/core/Market/v3/PendleMarketV3.sol#L459-L467)
Increases the number of observations the oracle can store (up to 65,535).

```solidity
function increaseObservationsCardinalityNext(uint16 cardinalityNext) external;
```

### Calculating PT Price

:::danger Example code only
The snippets below are simplified for illustration and **are not audited**.  
**Do not** use them in production or with real funds. If you adapt any example,
conduct a full review, add comprehensive tests, and obtain an independent **security audit**.
:::

**Step 1: Get TWAP Implied Rate**
```solidity
contract PTPriceCalculator {
    IPendleMarket public market;
    
    function getTWAPImpliedRate(uint32 twapPeriod) public view returns (uint256) {
        uint32[] memory secondsAgos = new uint32[](2);
        secondsAgos[0] = twapPeriod; // e.g., 3600 (1 hour ago)
        secondsAgos[1] = 0;          // now
        
        uint216[] memory cumulativeRates = market.observe(secondsAgos);
        
        // Calculate TWAP: (current - past) / timeElapsed
        uint256 lnImpliedRate = uint256(cumulativeRates[1] - cumulativeRates[0]) / twapPeriod;
        
        // Convert from ln to actual rate
        return lnImpliedRate.exp(); // Using mathematical library
    }
}
```

**Step 2: Convert to PT Price**
```solidity
function getPTPrice(uint32 twapPeriod) public view returns (uint256) {
    uint256 impliedRate = getTWAPImpliedRate(twapPeriod);
    uint256 timeToExpiry = market.expiry() - block.timestamp;
    uint256 yearsToExpiry = timeToExpiry * 1e18 / 365 days;
    
    // PT Price = 1 / (impliedRate^yearsToExpiry)
    // This represents the present value of 1 unit at expiry
    return 1e18 / impliedRate.powu(yearsToExpiry);
}
```

### Best Practices

1. **Use TWAP for important decisions**: Spot prices can be manipulated
2. **Choose appropriate time windows**: Longer periods = more resistant but less responsive
3. **Monitor cardinality**: Ensure sufficient observations for your time window needs
4. **Handle edge cases**: Near expiry, prices become more volatile

## FAQ

### Why is there no swapExactSy function?

Unlike standard AMMs, Pendle's AMM only allows swapping exact PT in/out. Therefore, functions like `swapExactSyForPt` and `swapPtForExactSy` should generally be avoided. If necessary, use PendleRouter's `swapExactSyForPt` with approx parameters. Refer to the [PendleRouter documentation](/Developers/Contracts/PendleRouter/ApiReference/PtFunctions#swapexactsyforpt) for details.

### How to trade YT tokens when the Market only composes PT and SY?

YT tokens can be traded via flash swaps. Use the PendleRouter's `swapExactYtForPt` or `swapPtForExactYt` functions, which handle the necessary flash swap logic and token transfers. Refer to the [PendleRouter documentation](Developers/Contracts/PendleRouter/ApiReference/YtFunctions#swapexactytforsy) for details.

### Why can’t I swap PT after expiry?

At expiry, **PT becomes a fixed claim on SY** at a deterministic conversion; market-making no longer makes economic sense and would invite circular arbitrage. The Market therefore **disables swaps** and functions solely as a **redemption venue** (LPs withdraw, PT/ YT settle via redeem paths). Use the router’s redeem flows to convert PT (and PT+YT) to SY post-expiry.

### Should I use the router or interact with the market directly?

For **anything involving YT**, multi-step routes, or “exact-SY” style intents, **use the Router** (fee discounts, slippage protection, flash-swap bundling). Interact **directly with the Market** only for simple **PT↔SY** swaps, custom flash-borrow logic, or ultra-lean integrations where you manage token transfers and slippage yourself.