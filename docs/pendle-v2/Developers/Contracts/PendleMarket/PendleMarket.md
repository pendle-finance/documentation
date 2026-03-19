---
hide_table_of_contents: true
---

# Pendle Market Smart Contracts

## Introduction

Pendle Market is a specialized Automated Market Maker (AMM) pool designed for trading yields. Each market enables efficient trading between:

- **Principal Tokens (PT)** - Tokens that represent the principal component of yield-bearing assets
- **Standardized Yield (SY)** - Wrapped yield-bearing assets that standardize yield mechanics

## Pendle AMM Overview

Traditional AMMs like Uniswap use constant product formulas (`x × y = k`) that do not account for the unique properties of fixed-yield assets. Pendle Markets implement a sophisticated time-aware AMM based on Notional Finance's AMM model that:

- **Recognizes time decay**: PT prices naturally converge to 1 as they approach expiry
- **Optimizes for yield trading**: Pricing curves are tailored for interest rate movements
- **Maximizes capital efficiency**: Concentrates liquidity around expected yield ranges
- **Minimizes Impermanent Loss (IL)**: Pendle's AMM accounts for PT's natural price appreciation by shifting the AMM curve to push PT price towards its underlying value as time passes, mitigating time-dependent IL (No IL at maturity).


> **Deep Dive**: For complete mathematical analysis and comparisons, see the [Pendle V2 AMM Whitepaper](https://github.com/pendle-finance/pendle-v2-resources/blob/main/whitepapers/V2_AMM.pdf)

## Market Parameters

- **Expiry**: The timestamp when PT tokens can be redeemed 1:1 for underlying assets - drives PT price convergence to 1 as expiry approaches.

- **Scalar Root**: Controls the trade-off between capital efficiency and tradeable interest rate range - higher values create tighter, more efficient markets.

- **Initial Anchor**: Sets the interest rate around which trading is most capital efficient at market launch - centers liquidity around expected yield levels.

- **Fee Rate Root**: Dynamic fees based on interest rate impact rather than token amounts - larger market movements incur proportionally higher fees.

## Core Logic

### [`mint`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/Market/PendleMarketV7.sol#L105-L136)
Adds liquidity using PT & SY; mints LP shares proportional to the amounts used.

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

**Note:**
- Caller must transfer PT and SY to the Market before calling. The function mints as many LPs as possible without exceeding `netSyDesired`/`netPtDesired`.

### [`burn`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/Market/PendleMarketV7.sol#L142-L159)
Removes liquidity by burning LP shares for pro-rata SY and PT.

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

**Note:** caller must transfer LP to the Market before calling.

### [`swapExactPtForSy`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/Market/PendleMarketV7.sol#L172-L202)
Swaps an exact amount of PT for SY.

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

**Note:** caller must transfer PT to the Market first; the Market then sends out the computed SY and (optionally) invokes a callback if data is non-empty. For a deeper understanding of the math behind it, refer to the [`Pendle V2 AMM Whitepaper`](https://github.com/pendle-finance/pendle-v2-resources/blob/main/whitepapers/V2_AMM.pdf) and [`MarketMathCore Contract`](https://github.com/pendle-finance/pendle-core-v2-public/blob/ba53685767bc16e070136b9dbfe02a5dd6258c61/contracts/core/Market/MarketMathCore.sol#L193-L217).

### [`swapSyForExactPt`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/Market/PendleMarketV7.sol#L214-L246)
Swaps SY for an exact amount of PT.

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

**Note:** the Market sends out exactPtOut to receiver, optionally callbacks msg.sender, and then enforces that the required SY has been provided (typically via `transfer` in the callback/Router). For a deeper understanding of the math behind it, refer to the [`Pendle V2 AMM Whitepaper`](https://github.com/pendle-finance/pendle-v2-resources/blob/main/whitepapers/V2_AMM.pdf) and [`MarketMathCore Contract`](https://github.com/pendle-finance/pendle-core-v2-public/blob/ba53685767bc16e070136b9dbfe02a5dd6258c61/contracts/core/Market/MarketMathCore.sol#L193-L217).

### [`redeemRewards`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/Market/PendleMarketV7.sol#L261-L263)
Claims accumulated swap fees/protocol rewards for user (in the order of `getRewardTokens()`).

```solidity
/**
 * @notice redeems the user's reward
 * @return amount of reward token redeemed, in the same order as `getRewardTokens()`
 */
function redeemRewards(address user) external returns (uint256[] memory);
```

### [`increaseObservationsCardinalityNext`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/Market/PendleMarketV7.sol#L284-L291)
Grows the oracle ring buffer to support longer TWAP windows.

```solidity
function increaseObservationsCardinalityNext(uint16 cardinalityNext) external;
```

**Note:** The ring buffer starts with a cardinality of 1. To query TWAP windows longer than the current buffer covers, call this function first to pre-expand the buffer. Anyone can call this; it only increases (never decreases) the cardinality.

### [`skim`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/Market/PendleMarketV7.sol#L249-L255)
Forces internal reserves to match actual token balances.

```solidity
/// @notice forces balances to match reserves
function skim() external;
```

**Note:** If tokens are accidentally sent directly to the market contract (not via a swap/mint), they accumulate as excess. `skim` transfers this excess to the treasury. This is an emergency recovery function; normal integrations do not need to call it.

### [`readState`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/Market/PendleMarketV7.sol#L300-L315)
Returns the current market state and pricing metadata.

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

**Note:**
- `lnFeeRateRoot` and `lastLnImpliedRate` are stored/returned as natural-log values in fixed-point form.
- The router parameter allows the function to reflect router-specific settings (e.g., fee discounts if applicable).

### [`readTokens`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/Market/PendleMarketV7.sol#L348-L352)
Returns the three token addresses of the market.

```solidity
function readTokens() external view returns (
    IStandardizedYield SY,
    IPPrincipalToken PT,
    IPYieldToken YT
);
```

**Note:** Use this as the canonical way to discover the SY, PT, and YT addresses associated with any market address.

### [`isExpired`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/Market/PendleMarketV7.sol#L354-L356)
Returns whether the market has passed its expiry timestamp.

```solidity
function isExpired() external view returns (bool);
```

**Note:** Swaps and liquidity minting revert after expiry. LP burning and reward claiming remain available post-expiry.

### [`getRewardTokens`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/Market/PendleMarketV7.sol#L266-L268)
Lists all reward tokens distributed to LP holders.

```solidity
function getRewardTokens() external view returns (address[] memory);
```

**Note:** The list includes both SY external rewards (e.g., AAVE incentives passed through the underlying SY) and PENDLE incentives distributed via the gauge controller. Always call this first to map indices before calling `redeemRewards`.

### [`observe`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/Market/PendleMarketV7.sol#L274-L282)
Oracle API — reads cumulative implied rates at past time deltas.

```solidity
function observe(uint32[] memory secondsAgos)
    external
    view
    returns (uint216[] memory lnImpliedRateCumulative);
```

**Note:** Each element of `secondsAgos` is a lookback in seconds from the current block (e.g., `[300, 0]` = 5 minutes ago and now). Returns the cumulative `lnImpliedRate` at each point, from which a TWAP can be derived. See the [Oracle section](#oracle) below and [Introduction to PT Oracle](../../Oracles/IntroductionOfPtOracle) for details.

### [`getNonOverrideLnFeeRateRoot`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/Market/PendleMarketV7.sol#L340-L342)
Returns the base fee rate before any router-specific override.

```solidity
function getNonOverrideLnFeeRateRoot() external view returns (uint80);
```

**Note:** `readState(router)` may return a lower `lnFeeRateRoot` if an override is set for that router. This function always returns the original fee set at market creation.

## Fee & Rewards

### `reserveFeePercent` (Treasury fee)

A percentage of each swap's fee is sent to Pendle's treasury. The remainder goes to LP providers. `reserveFeePercent` is stored in `MarketState` and is configurable by the factory owner. It is expressed as a value in base 100 (e.g., `80` = 80% of the fee goes to the treasury, 20% to LPs).

When `readState(router)` is called, the current `reserveFeePercent` is fetched from the factory's `getMarketConfig` and included in the returned `MarketState`.

### Fee Override Mechanism (Router discount)

`PendleMarketFactoryV7Upg.setOverriddenFee(router, market, newFee)` sets a lower fee for a specific router on a specific market. When `readState(router)` is called with that router address, the overridden fee is returned in `MarketState.lnFeeRateRoot` instead of the base fee. This is how the Pendle Router earns a fee discount compared to direct market interaction.

- The overridden fee must be strictly lower than `getNonOverrideLnFeeRateRoot()`.
- Setting `newFee = 0` is allowed (zero fee for that router).
- Only the factory owner can set overrides.

### Reward Mechanism (Gauge)

The market inherits from `PendleGauge`. LP holders accumulate two types of rewards passively:

- **SY external rewards** — incentives from the underlying protocol (e.g., AAVE rewards) that are passed through the SY contract.
- **PENDLE incentives** — distributed via the `gaugeController` based on gauge weights.

Both types accumulate in proportion to the LP balance held. Call `redeemRewards(user)` to claim all pending rewards. `getRewardTokens()` returns the full ordered list of reward token addresses.

## Integration Example

:::danger Example code only
The snippets below are simplified for illustration and **are not audited**.
**Do not** use them in production or with real funds. If you adapt any example,
conduct a full review, add comprehensive tests, and obtain an independent **security audit**.
:::

### Discover Market Tokens

```solidity
// Discover SY, PT, YT from a market address
(IStandardizedYield sy, IPPrincipalToken pt, IPYieldToken yt) = market.readTokens();
```

### Basic Swap
```solidity
// Transfer PT to market first
pt.transfer(address(market), ptAmount);

// Execute swap (exact PT in → SY out)
(uint256 syOut,) = market.swapExactPtForSy(
    msg.sender,
    ptAmount,
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

### Claiming LP Rewards

```solidity
// Discover what reward tokens this market distributes
address[] memory rewardTokens = market.getRewardTokens();

// Claim all accumulated rewards for msg.sender
uint256[] memory rewardAmounts = market.redeemRewards(msg.sender);

// rewardAmounts[i] corresponds to rewardTokens[i]
for (uint256 i = 0; i < rewardTokens.length; i++) {
    // handle rewardTokens[i] with amount rewardAmounts[i]
}
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

The oracle stores **implied rate observations** over time, which are then used to calculate manipulation-resistant PT prices and yields.

**Key Formula:**

$$
\text{lnImpliedRateCumulative}_i
= \text{lnImpliedRateCumulative}_{i-1}
+ \text{lnImpliedRate} \times \Delta t
$$

where **lnImpliedRate** is the natural logarithm of the implied interest rate at the current market state, and **Δt** is the time elapsed.

From these cumulative values, you can compute the **geometric mean price of PT** over a given interval (see [Introduction to PT Oracle](../../Oracles/IntroductionOfPtOracle) for details).

### Integration Guide

See [How to Integrate PT and LP Oracles](../../Oracles/HowToIntegratePtAndLpOracle) for implementation details.

## FAQ

### Why is there no swapExactSy function?

Unlike standard AMMs, Pendle's AMM only allows swapping exact PT in/out. Therefore, functions like `swapExactSyForPt` and `swapPtForExactSy` should generally be avoided. If necessary, use PendleRouter's `swapExactSyForPt` with approx parameters. Refer to the [PendleRouter documentation](../PendleRouter/ApiReference/PtFunctions#swapexactsyforpt) for details.

### How can I trade YT tokens when the Market only contains PT and SY?

YT tokens can be traded via [flash swaps](../../../ProtocolMechanics/LiquidityEngines/AMM#flash-swaps). Use the PendleRouter's `swapExactTokenForYt` or `swapExactYtForToken` functions, which handle the necessary flash swap logic and token transfers. Refer to the [PendleRouter documentation](../PendleRouter/ApiReference/YtFunctions#swapexacttokenforyt) for details.


### Why can't I swap PT after expiry?

At expiry, PT can be redeemed for the underlying asset. Market-making no longer makes economic sense at this point and would enable circular arbitrage. To redeem PT post-expiry, use the [Router](../PendleRouter/ApiReference/LiquidityFunctions#removeliquiditysingletoken).

### Should I use the Router or interact with the Market directly?

* Use the Router for:
  * Any operations involving YT.
  * Swaps using tokens other than the underlying (since additional swaps are required).
  * Fee discounts, slippage protection, etc.

* Interact directly with the Market for:
  * Simple PT ↔ SY swaps.
  * Flash swaps.
  * Highly gas-optimized integrations where you manage token transfers and slippage manually.
