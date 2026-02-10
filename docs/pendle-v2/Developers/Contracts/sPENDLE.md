---
hide_table_of_contents: true
---

# sPENDLE

## Overview

[sPENDLE](https://etherscan.io/address/0x999999999991E178D52Cd95AFd4b00d066664144) is the staked version of [PENDLE](https://etherscan.io/token/0x808507121b80c02388fad14726482e061b8da827), deployed on Ethereum at **[`0x999999999991E178D52Cd95AFd4b00d066664144`](https://etherscan.io/address/0x999999999991E178D52Cd95AFd4b00d066664144)**. Users stake PENDLE to receive sPENDLE at a 1:1 ratio. sPENDLE does not increase in value over time.

sPENDLE held in a user’s wallet is eligible for:
- Voting power within the Pendle ecosystem
- Pro-rata share of reward distributions if they meet the active participation criteria

For details on governance rights and rewards distribution, see the [sPENDLE mechanism documentation](/docs/pendle-v2/ProtocolMechanics/Mechanisms/sPENDLE.md).

### Audit Reports

The sPENDLE contract has been audited. Full audit reports are available [here](https://github.com/pendle-finance/pendle-core-v2-public/tree/main/audits).

## Staking PENDLE

To stake PENDLE and receive sPENDLE

```solidity
function stake(uint256 amount) external;
```

## Unstaking sPENDLE

There are two ways to unstake sPENDLE back to PENDLE.

### Option 1: Cooldown Flow (Fee-Free)

Initiate a cooldown to unlock your PENDLE. After the cooldown period (14 days, readable via `cooldownDuration()`), finalize to receive your PENDLE.

```solidity
/// @notice Initiate cooldown, returning the specified amount of sPENDLE
function cooldown(uint256 amount) external;

/// @notice Claim PENDLE after the cooldown period ends
function finalizeCooldown() external returns (uint256 amount);

/// @notice Cancel the cooldown and return sPENDLE to your wallet
function cancelCooldown() external;
```

### Option 2: Instant Unstake (5% Fee)

For immediate access to PENDLE with a fee

```solidity
function instantUnstake(uint256 amount) external returns (uint256 amountAfterFee, uint256 fee);
```

The fee rate is readable via `instantUnstakeFeeRate()`. Currently it is set to 5%.

### Comparison

<div style={{display: 'inline-block'}}>

| Method | Fee | Wait Time |
|--------|-----|-----------|
| Cooldown | None | 14 days |
| Instant | 5% | None |

</div>

## Events

```solidity
/// @notice Emitted when a user stakes PENDLE
event Staked(address indexed user, uint256 amount);

/// @notice Emitted when cooldown is initiated
event CooldownInitiated(address indexed user, uint256 amount, uint256 cooldownStart);

/// @notice Emitted when cooldown is canceled
event CooldownCanceled(address indexed user, uint256 amount);

/// @notice Emitted on finalizeCooldown() or instantUnstake()
event Unstaked(address indexed user, uint256 amountAfterFee, uint256 fee);
```

## View Functions

```solidity
/// @notice Returns the cooldown duration in seconds (14 days = 1209600)
function cooldownDuration() external view returns (uint24);

/// @notice Returns the instant unstake fee rate (base 1e18, e.g., 5e16 = 5%)
function instantUnstakeFeeRate() external view returns (uint64);

/// @notice Returns a user's pending cooldown state
/// @return cooldownStart The timestamp when cooldown was initiated
/// @return amount The amount of sPENDLE in cooldown
function userCooldown(address user) external view returns (uint104 cooldownStart, uint152 amount);
```

## Full Interface

```solidity
interface IPStakedPendle {
    struct UserCooldown {
        uint104 cooldownStart;
        uint152 amount;
    }

    event Staked(address indexed user, uint256 amount);

    event Unstaked(address indexed user, uint256 amountAfterFee, uint256 fee);

    event CooldownCanceled(address indexed user, uint256 amount);

    event CooldownInitiated(address indexed user, uint256 amount, uint256 cooldownStart);

    function cooldownDuration() external view returns (uint24);

    function instantUnstakeFeeRate() external view returns (uint64);

    function userCooldown(address user) external view returns (uint104 cooldownStart, uint152 amount);

    function stake(uint256 amount) external;

    function cooldown(uint256 amount) external;

    function cancelCooldown() external;

    // fee-free, after cooldown
    function finalizeCooldown() external returns (uint256 amount);

    // instant, but with fee
    function instantUnstake(uint256 amount) external returns (uint256 amountAfterFee, uint256 fee);
}
```
