---
hide_table_of_contents: true
---

# Yield Tokenization Smart Contracts


## Overview
This guide explains how Pendle tokenizes yield by splitting assets into PT (Principal Token) and YT (Yield Token), and how the YT contract handles minting and redeeming, index accounting, and the distribution of interest and rewards. This documentation is for developers and partners who want a deep dive into the Pendle yield mechanism and how it works under the hood.


## Key Concepts
Yield tokenization takes a yield-bearing asset, then splits that value into two claims with a fixed expiry:
- [PT (Principal Token)](/ProtocolMechanics/YieldTokenization/PT): represents the principal of the underlying yield-bearing token.
- [YT (Yield Token)](/ProtocolMechanics/YieldTokenization/YT): represents entitlement to all yield, rewards, and points of the asset until expiry.

Example: A user stakes 100 USDe in Ethena and, via Pendle, tokenizes it into 100 PT-USDe and 100 YT-USDe with a 3-month expiry. They can sell the YT-USDe to someone who wants the next three months of yield and points while keeping the PT-USDe to redeem the principal at maturity; assuming a 12% APY (~3% over three months), the position would accrue about 3 USDe - so at expiry the YT-USDe holder is entitled to ~3 USDe of accrued yield (plus any program points earned during that period), and the PT-USDe holder redeems the 100 USDe principal.


## Technical Details

The Pendle yield-tokenization architecture comprises three core components:

* **Standardized Yield (SY):** A unified wrapper interface for yield-bearing assets; underlying yield and rewards accrue to the SY contract.
* **YT contract:** The core logic that splits SY into PT and YT, maintains index accounting, and accrues/distributes yield and rewards.
* **PT contract:** The ERC-20 representing principal; PT is minted/burned by the YT contract and is redeemable for principal at/after maturity.


![PT and YT Yield Stream](/img/Developers/sy_pt_yt_yield_stream.png)

Before splitting, yield-bearing assets are wrapped into SY. To tokenize yield, users deposit SY into the YT contract, which mints PT and YT. The YT contract tracks yield and rewards accrued to the SY and distributes them to YT holders. At maturity, PT holders can redeem their principal from the YT contract.

## Core Logic

### [`mintPY`](https://github.com/pendle-finance/pendle-core-v2-public/blob/ba53685767bc16e070136b9dbfe02a5dd6258c61/contracts/core/YieldContracts/PendleYieldToken.sol#L84-L100)
```solidity
/**
 * @notice Tokenize SY into PT + YT of equal qty. Every unit of asset of SY will create 1 PT + 1 YT
 * @dev SY must be transferred to this contract prior to calling
 */
function mintPY(address receiverPT, address receiverYT) external returns (uint256 amountPYOut);
```

**Purpose**: Mints equal amounts of PT and YT by depositing SY into the YT contract.

**How it works:**
- The YT contract mints using its current SY balance. Therefore, you must transfer SY into the YT contract before calling the function. The amount of PT and YT minted is calculated as:

$$
PY \; minted = SY \; deposited \times current \; PY \; index
$$

- The YT contract mints equal quantities of PT and YT to the specified recipient addresses.

**Example:**
- If `1 SY-sUSDe = 1.2 USDe` (`PY index = 1.2`) and a user deposits `100 SY-sUSDe`, the contract mints `120 PT-sUSDe` and `120 YT-sUSDe`.
- Since `100 SY-sUSDe` corresponds to `120 USDe` of underlying value, the user receives `120 PT-sUSDe` (principal exposure) and `120 YT-sUSDe` (pre-expiry yield claim).


### [`redeemPY`](https://github.com/pendle-finance/pendle-core-v2-public/blob/ba53685767bc16e070136b9dbfe02a5dd6258c61/contracts/core/YieldContracts/PendleYieldToken.sol#L120-L134)
```solidity
/**
 * @notice converts PT(+YT) tokens into SY, but interests & rewards are not redeemed at the
 * same time
 * @dev PT/YT must be transferred to this contract prior to calling
 */
function redeemPY(address receiver) external returns (uint256 amountSyOut);
```

**Purpose:** Redeem SY by burning PT and YT. Think of this as converting back to the principal accounting unit, while **interest and rewards are claimed separately**.

**How it works:**

- You have to provide equal amounts of PT and YT to the YT contract before calling the function.
- The contract burns the tokens and returns SY according to the current PY index:
$$
SY \; redeemed = PY \; burned \; \div current \; PY \; index
$$
- The redeemed SY is sent to the specified receiver. Note that interest and rewards accrued to YT are not included in this redemption.

**Notes:**

* **Pre-expiry:** both PT and YT are required to redeem SY.
* **Post-expiry:** only PT is required (YT has no value after maturity).

**Example:**

**Pre-expiry**

* Continuing the prior example: if the user holds `120 PT-sUSDe` and `120 YT-sUSDe`, and now the PY index is `1.25`, then
  `SY_out = 120 / 1.25 = 96 SY-sUSDe` (which corresponds to **120 USDe**).
  Interest and rewards accrued to YT are **not** included in this redemption.

**Post-expiry**

* After maturity, with `120 PT-sUSDe` and PY index `1.25`,
  `SY_out = 120 / 1.25 = 96 SY-sUSDe` (again equal to **120 USDe**).
  The user receives `96 SY-sUSDe`, which can be unwrapped or swapped back to the underlying **120 USDe** principal.


### [`redeemDueInterestAndRewards`](https://github.com/pendle-finance/pendle-core-v2-public/blob/ba53685767bc16e070136b9dbfe02a5dd6258c61/contracts/core/YieldContracts/PendleYieldToken.sol#L150-L186)

```solidity
/**
 * @notice Redeems interests and rewards for `user`
 * @param redeemInterest will only transfer out interest for user if true
 * @param redeemRewards will only transfer out rewards for user if true
 * @dev With YT yielding interest in the form of SY, which is redeemable by users, the reward
 * distribution should be based on the amount of SYs that their YT currently represent, plus
 * their dueInterest. It has been proven and tested that _rewardSharesUser will not change over
 * time, unless users redeem their dueInterest or redeemPY. Due to this, it is required to
 * update users' accruedReward STRICTLY BEFORE transferring out their interest.
 */
function redeemDueInterestAndRewards(
    address user,
    bool redeemInterest,
    bool redeemRewards
) external returns (uint256 interestOut, uint256[] memory rewardsOut);
```

**Purpose:** Allows a YT holder to claim accrued earnings: interest (in SY) and any external reward tokens. Interest for YT is **always paid in SY**, but it can be swapped into your preferred token through the [router](/Developers/Contracts/PendleRouter/ApiReference/MiscFunctions#redeemdueinterestandrewardsv2).

**Behavior notes:**

* **Interest unit:** Always **SY**. If you want the underlying/base asset, unwrap or swap through the [router](/Developers/Contracts/PendleRouter/ApiReference/MiscFunctions#redeemdueinterestandrewardsv2).
* **Pre- vs post-expiry:**

  * Pre-expiry: interest and rewards continue accruing; this function pays whatever is due up to the call.
  * Post-expiry: YT no longer earns new yield. Calling still pays any **remaining** pre-expiry interest/rewards, if any.
* **Zero-flag calls:** If both flags are `false`, no tokens are transferred (effectively a no-op, except for index synchronization)
* **Token order:** `rewardsOut[i]` corresponds to `getRewardTokens()[i]`. Always read the list first.

**Examples:**

* *Claim both:*
  User has accrued `2.5 SY` of interest and `[10 X, 0.3 Y]` rewards. Calling with `(true, true)` returns `(2.5, [10, 0.3])`, transfers those amounts, and resets baselines.
* *Claim rewards only:*
  Calling `(false, true)` transfers only rewards. Due interest remains in SY terms and continues to count toward reward-share until it’s eventually claimed or the user redeems PY.


### [`pyIndexCurrent`](https://github.com/pendle-finance/pendle-core-v2-public/blob/ba53685767bc16e070136b9dbfe02a5dd6258c61/contracts/core/YieldContracts/PendleYieldToken.sol#L226-L236)

```solidity
/**
 * @notice updates and returns the current PY index
 * @dev this function maximizes the current PY index with the previous index, guaranteeing
 * non-decreasing PY index
 * @dev if `doCacheIndexSameBlock` is true, PY index only updates at most once per block,
 * and has no state changes on the second call onwards (within the same block).
 * @dev see `pyIndexStored()` for view function for cached value.
 */
function pyIndexCurrent() external returns (uint256 currentIndex);
```

* **Purpose:** Returns the **current PY index**, updating it if needed. The PY index tracks the SY exchange rate and is stored **monotonically** (never decreases).

* **Behavior notes:**

  * The PY index is **non-decreasing**: `pyIndexCurrent = max(SY.exchangeRate(), pyIndexStored)`.
  * If `doCacheIndexSameBlock` is enabled, the index is updated **at most once per block**; subsequent calls in the same block are read-only (no further state changes).
  * If `SY.exchangeRate()` falls below the stored index (negative yield), the PY index **does not** move down. Consequences:

    * Pre-expiry redemptions return **less SY per PY** until `SY.exchangeRate()` recovers above the stored index.
    * YT accrual effectively **pauses** (no new interest) until recovery.
    * In sustained drawdowns, even PT’s eventual redemption (valued in the accounting asset) can be **less than previously expected** because the SY backing has shrunk. See [Negative Yield](/ProtocolMechanics/NegativeYield).

* **Examples:**

  * **Up move:** Last stored `SY.exchangeRate()` = `1.20`; it rises to `1.25`. Calling `pyIndexCurrent()` updates the PY index to `1.25`.
  * **Down move:** Last stored index = `1.20`; `SY.exchangeRate()` drops to `1.15`. The PY index **stays at `1.20`**.
    If a user minted **120 PT** when the index was `1.20`, their claim on SY is `120 / 1.20 = 100 SY`.
    At maturity, if each SY equals `1.15 USDe`, they redeem `100 × 1.15 = 115 USDe` (less than 120 USDe), reflecting the underlying negative yield.


## Integration Example
:::danger Example code only
The snippets below are simplified for illustration and **are not audited**.  
**Do not** use them in production or with real funds. If you adapt any example,
conduct a full review, add comprehensive tests, and obtain an independent **security audit**.
:::

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

IPYieldToken yt;
IStandardizedYield sy = IStandardizedYield(yt.SY());
IPrincipalToken pt = IPrincipalToken(yt.PT());

address receiver;


// Minting PT + YT by depositing SY
IERC20(address(sy)).transfer(address(yt), 100e18); // deposit 100 SY
uint256 amountPYOut = yt.mintPY(receiver, receiver); // receive PT + YT


// Redeeming SY by burning PT + YT (pre-expiry)
IERC20(address(pt)).transfer(address(yt), amountPYOut); // send PT
IERC20(address(yt)).transfer(address(yt), amountPYOut); // send YT
uint256 amountSyOut = yt.redeemPY(receiver); // receive SY

// Redeeming SY by burning PT only (post-expiry)
IERC20(address(pt)).transfer(address(yt), amountPYOut); // send PT
uint256 amountSyOut = yt.redeemPY(receiver); // receive SY


// Claiming accrued interest (in SY) and rewards (in reward tokens)
(uint256 interestOut, uint256[] memory rewardsOut) = yt.redeemDueInterestAndRewards(
    receiver,
    true,  // claim interest
    true   // claim rewards
);
```


## FAQ

### When the underlying asset’s exchange rate increases, does Pendle buy more of the asset on the market and distribute it to YT holders?

No. Pendle’s accounting is **index-based**: yield accrues inside the **SY** balance held by the contracts as `exchangeRate` rises. **YT** holders are entitled to the yield portion of that **existing SY collateral** (paid in SY), while **PT** holders claim principal at/after maturity; users can then unwrap or swap SY to the base asset if they wish. No open-market purchases are required.

### Is 1 SY always equal to 1 PT + 1 YT?

No. **PT** is a principal claim **in units of the accounting asset at maturity**, whereas **SY** is a wrapper whose value floats with `exchangeRate`; **YT** represents the pre-expiry yield claim. The amounts of PT and YT you mint depend on the **current index** - they collectively replicate the economic exposure of the underlying, but **1 SY ≠ 1 PT + 1 YT** except in edge cases (e.g., `exchangeRate == 1`).
