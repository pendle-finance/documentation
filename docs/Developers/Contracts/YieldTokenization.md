---
hide_table_of_contents: true
---

# Yield Tokenization Smart Contracts


## Overview
This guide explains how Pendle tokenizes yield by splitting assets into PT (Principal Token) and YT (Yield Token), and how the YT contract handles minting/redeeming, index accounting, and interest/reward distribution. This documentation is for developers and partners who want a deep dive into the Pendle yield mechanism and how it works under the hood.


## Key Concepts
Yield tokenization takes a yield-bearing asset, then splits that value into two claims with a fixed expiry:
- [PT (Principal Token)](/ProtocolMechanics/YieldTokenization/PT): represents the principal of the underlying yield-bearing token.
- [YT (Yield Token)](/ProtocolMechanics/YieldTokenization/YT): represents entitlement to all the yield, reward and points of the asset until expiry.

Example: A user stakes 100 USDe in Ethena and, via Pendle, tokenizes it into 100 PT-USDe and 100 YT-USDe with a 3-month expiry. They can sell the YT-USDe to someone who wants the next three months of yield and points while keeping the PT-USDe to redeem the principal at maturity; assuming a 12% APY (~3% over three months), the position would accrue about 3 USDe - so at expiry the YT-USDe holder is entitled to ~3 USDe of accrued yield (plus any program points earned during that period), and the PT-USDe holder redeems the 100 USDe principal.


## Architecture

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
- Deposit SY into the YT contract; the amounts of PT and YT minted are `SY_deposited × current PY index`. (current PY index can be thought of as how much SY is worth in terms of the underlying asset)
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

* The user supplies equal amounts of PT and YT to the YT contract.
* The contract burns them and returns SY based on the current PY index:
  `SY_out = PY_burn / PY_index_current`.
* SY is sent to the specified receiver; Interest and rewards accrued to YT are **not** included in this redemption.

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

**Purpose:** Claims what a YT holder has earned so far: interest (in SY) and any external reward tokens. Interest for YT is **always paid in SY**.


**Behavior notes**

* **Interest unit:** Always **SY**. If you want the underlying/base asset, unwrap or route SY afterward (e.g., via Router).
* **Pre- vs post-expiry:**

  * *Pre-expiry:* interest and rewards continue accruing; this function pays whatever is due up to the call.
  * *Post-expiry:* YT no longer earns new yield. Calling still pays any **remaining** pre-expiry interest/rewards, if any.
* **Zero-flag calls:** If both flags are `false`, no tokens are transferred (a no-op aside from any index sync).
* **Token order:** `rewardsOut[i]` corresponds to `getRewardTokens()[i]`. Always read the list first.

**Examples**

* *Claim both:*
  User has accrued `2.5 SY` of interest and `[10 ABC, 0.3 XYZ]` rewards. Calling with `(true, true)` returns `(2.5, [10, 0.3])`, transfers those amounts, and resets baselines.
* *Claim rewards only:*
  Calling `(false, true)` transfers only rewards. Due interest remains in SY terms and continues to count toward reward-share until it’s eventually claimed or the user redeems PY.

## FAQ

### When the underlying asset’s exchange rate increases, does Pendle buy more of the asset on the market and distribute it to YT holders?

No. Pendle’s accounting is **index-based**: yield accrues inside the **SY** balance held by the contracts as `exchangeRate` rises. **YT** holders are entitled to the yield portion of that **existing SY collateral** (paid in SY), while **PT** holders claim principal at/after maturity; users can then unwrap or swap SY to the base asset if they wish. No open-market purchases are required.

### Is 1 SY always equal to 1 PT + 1 YT

No. **PT** is a principal claim **in units of the accounting asset at maturity**, whereas **SY** is a wrapper whose value floats with `exchangeRate`; **YT** represents the pre-expiry yield claim. The amounts of PT and YT you mint depend on the **current index**—they collectively replicate the economic exposure of the underlying, but **1 SY ≠ 1 PT + 1 YT** except in edge cases (e.g., `exchangeRate == 1`).
