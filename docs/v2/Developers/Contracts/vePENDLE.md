---
hide_table_of_contents: true
---

# vePENDLE

## Overall Structure

The vePENDLE system requires Ethereum to access important features like locking, voting, and claiming fees. Other chains, like Arbitrum, only have data mirrored from Ethereum. To receive boosting benefits, users who provide liquidity on Arbitrum must lock PENDLE on Ethereum and synchronize the information to Arbitrum using cross-chain messages.

Below is a high-level diagram of the vePENDLE system:

![vePENDLE Structure](/img/Developers/vependle_structure.png "vePENDLE Structure")

## VotingEscrowPendle

### VotingEscrowPendleBase

This interface is common for all chains.

```sol
// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.17;


interface IPVeToken {
    // ============= USER INFO =============

    /// @notice Returns the user's vePENDLE balance which decreases linearly on a weekly basis.
    function balanceOf(address user) external view returns (uint128);

    /// @notice Returns the total supply as it was last updated.
    /// There are two cases:
    /// - On Ethereum, this number will be updated once a week after any write actions to vePENDLE
    /// by anyone.
    /// - On Arbitrum, this number will always be equal to totalSupplyCurrent().
    function positionData(address user) external view returns (uint128 amount, uint128 expiry);

    // ============= META DATA =============

    /// @notice Returns the totalSupply last it was updated. There are 2 cases:
    /// - On Ethereum, this number will be updated once a week after any write actions to vePENDLE
    /// by anyone
    /// - On Arbitrum, this number will always be equal to totalSupplyCurrent();
    function totalSupplyStored() external view returns (uint128);

    /// @notice Decays the total supply of vePENDLE weekly and returns the most up-to-date value.
    /// The only time this function will return a different value from totalSupplyStored() is if
    /// it is on Ethereum and there have been no write actions to vePENDLE for the current week.
    function totalSupplyCurrent() external returns (uint128);

    /// @notice Aggregates two numbers to save gas
    function totalSupplyAndBalanceCurrent(address user) external returns (uint128, uint128);
}
```

### VotingEscrowPendleMainchain

```sol
// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.17;

import "./IPVeToken.sol";
import "../LiquidityMining/libraries/VeHistoryLib.sol";


interface IPVotingEscrowMainchain is IPVeToken {
    /// @notice Emit when a user's vePENDLE position changes, with `amount` and `expiry` representing
    /// the new position.
    event NewLockPosition(address indexed user, uint128 amountPendleLocked, uint128 expiry);

    /// @notice Emit when a user withdraws all of their vePENDLE.
    event Withdraw(address indexed user, uint128 amountPendleUnlocked);

    /// @notice Emit when `totalSupply` is broadcasted to other chains.
    event BroadcastTotalSupply(VeBalance newTotalSupply, uint256[] chainIds);

    /// @notice Emit when a user's vePENDLE position is broadcasted to other chains.
    event BroadcastUserPosition(address indexed user, uint256[] chainIds);

    /// @notice Combines `increaseLockPosition` and `broadcastUserPosition` into one transaction.
    function increaseLockPositionAndBroadcast(
        uint128 additionalAmountToLock,
        uint128 newExpiry,
        uint256[] calldata chainIds
    ) external payable returns (uint128 newVeBalance);

    /**
     * @notice Modify the vePENDLE position of the msg.sender. If the msg.sender has no position,
     a new position is created with the given amount and expiry. Otherwise, the position is
     increased accordingly.
     * @param additionalAmountToLock: the amount of PENDLE to lock in addition to the current position.
     * @param newExpiry: the new expiry of the position. If newExpiry is not equal to currentExpiry,
     then the expiry of the position is extended to the new expiry. If newExpiry is equal to currentExpiry,
     then the expiry of the position is unchanged.
     * @param newExpiry must be divisible by 1 week (i.e. 604800 seconds), more than 1 week but
     no more than 104 weeks from now.
     * @return newVeBalance.
     */
    function increaseLockPosition(uint128 additionalAmountToLock, uint128 newExpiry)
        external
        returns (uint128);

    /// @notice Withdraws all PENDLE of msg.sender if the lock has expired.
    function withdraw() external returns (uint128);

    /// @notice sync the current totalSupply to other chains. The ETH amount to attach can be retrieved
    /// by `getBroadcastSupplyFee`. Refer to `broadcastUserPosition` for more details.
    function broadcastTotalSupply(uint256[] calldata chainIds) external payable;

    /**
     * @notice sync the vePENDLE position of msg.sender & the current totalSupply to other chains.
     * @param chainIds chains to sync to. The chainId is the actual chainId of the chains,
         not the chainId of LayerZero.
     * @notice Some ETH must be attached to pay for the cross-chain fee. Any excess amount will be
         refunded. To know the exact amount of ETH to attach, call `getBroadcastPositionFee`
     */
    function broadcastUserPosition(address user, uint256[] calldata chainIds) external payable;

    /// @notice refer to `getUserHistoryAt`
    function getUserHistoryLength(address user) external view returns (uint256);

    /// @notice read the history of vePENDLE balance changes of an user
    function getUserHistoryAt(address user, uint256 index)
        external
        view
        returns (Checkpoint memory);

    function getBroadcastSupplyFee(uint256[] calldata chainIds)
        external
        view
        returns (uint256 fee);

    function getBroadcastPositionFee(uint256[] calldata chainIds)
        external
        view
        returns (uint256 fee);

    /// @notice get totalSupply of vePENDLE for any week. timestamp must be a divisible for 1 week
    /// (604800 seconds)
    function totalSupplyAt(uint128) external view returns (uint128);

    /// @notice The timestamp of the last weekly vePENDLE supply decay.
    /// If it is before the current week, any changes made to vePENDLE will trigger another decay
    /// and change the supply.
    function lastSlopeChangeAppliedAt() external view returns (uint128);

    /// @notice get total slopes of vePENDLE positions expiring on a given week. timestamp must be
    /// divisible for 1 week (604800 seconds)
    function slopeChanges(uint128) external view returns (uint128);
}
```

### VotingEscrowPendleSidechain

```sol
// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.17;

import "./IPVeToken.sol";
import "../LiquidityMining/libraries/VeBalanceLib.sol";


interface IPVotingEscrowSidechain is IPVeToken {
    /// @notice Emit when a new delegator is set for a user by governance.
    event SetNewDelegator(address delegator, address receiver);

    /// @notice Emit when totalSupply is updated via cross-chain message.
    event SetNewTotalSupply(VeBalance totalSupply);

    /// @notice Emit when a user's position is updated via cross-chain message
    event SetNewUserPosition(LockedPosition position);

    /// @notice Get the last time the vePENDLE total supply was broadcasted to this chain.
    function lastTotalSupplyReceivedAt() external view returns (uint256);

    /// @notice Returns the delegator of the user. If set, querying the vePENDLE balance of the user will return
    /// the balance of the delegator.
    /// @notice Due to some issues, this mapping can only be read off-chain.
    // function delegatorOf(address user) external view returns (address)
}
```

## VotingController

The VotingController only exists on Ethereum and broadcast results to the `GaugeControllers` on both Ethereum and other chains.

```sol
// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.17;

import "../LiquidityMining/libraries/VeBalanceLib.sol";


interface IPVotingController {
    // ============= STRUCTS =============

    struct PoolData {
        uint64 chainId;
        uint128 lastSlopeChangeAppliedAt;
        VeBalance totalVote;
        // wTime => slopeChange value
        mapping(uint128 => uint128) slopeChanges;
    }

    struct UserPoolData {
        uint64 weight;
        VeBalance vote;
    }

    struct UserData {
        uint64 totalVotedWeight;
        mapping(address => UserPoolData) voteForPools;
    }

    struct WeekData {
        bool isEpochFinalized;
        uint128 totalVotes;
        mapping(address => uint128) poolVotes;
    }

    // ============= EVENTS =============

    /// @notice Emit when new pool added to controller.
    event AddPool(uint64 indexed chainId, address indexed pool);

    /// @notice Emit when a pool is removed from the controller.
    event RemovePool(uint64 indexed chainId, address indexed pool);

    /**
     * @notice Emit when a user's pool vote is updated
     * @param weight the allocated weight of the vote, base 1e18
     * @param vote The new vePENDLE vote power for this pool, determined by dividing the user's current vePENDLE balance by the weight.
     */
    event Vote(address indexed user, address indexed pool, uint64 weight, VeBalance vote);

    /**
     * @notice Emit when the total vote of a pool changes
     * @param vote The new total vote of the pool
     */
    event PoolVoteChange(address indexed pool, VeBalance vote);

    /// @notice Emit when governance changes total distributed PENDLE per second.
    event SetPendlePerSec(uint256 newPendlePerSec);

    /// @notice Emit the vote result for an epoch when it is finalized and broadcast it to gaugeControllers.
    event BroadcastResults(
        uint64 indexed chainId,
        uint128 indexed wTime,
        uint128 totalPendlePerSec
    );

    // ============= FUNCTIONS =============

    /**
    * @notice Vote for pools with new weights using current vePENDLE balance of msg.sender.
    Sum of weights for all voted pools must be 1e18 or less.
    * @notice Only pools passed in will have their votes updated with new weight & current vePENDLE
    position of msg.sender.
    * @notice Example: a user with a position of (100 PENDLE, 1 year) calls vote([A,B,C], [2e17, 3e17, 5e17]).
    Their position becomes (A,B,C) = ((20 PENDLE, 1 year), (30 PENDLE, 1 year), (50 PENDLE, 1 year)).
    If they increase their position to (200 PENDLE, 2 years):
    - If they call vote([A,B], [1e17, 4e17]), their position becomes
        (A,B,C) = ((20 PENDLE, 2 years), (80 PENDLE, 2 years), (50 PENDLE, 1 year)).
    - If they call vote([A,B,C], [0, 0, 1e18]), their position becomes
        (A,B,C) = (0, 0, (200 PENDLE, 2 years)).
    - If they call vote([A,B], [2e17, 4e17]), the call is invalid because the sum of weights is > 1e18.
    */
    function vote(address[] memory pools, uint64[] memory weights) external;

    /// @notice Get the governance's voting power (if the governance decides to vote). Currently equals
    /// to 10 million.
    function GOVERNANCE_PENDLE_VOTE() external view returns (uint128);

    /// @notice Apply weekly vote decay to an active pool. Reverts if the pool is inactive.
    /// Succeeds without state updates if the pool is already up-to-date.
    function applyPoolSlopeChanges(address pool) external;

    function getPoolTotalVoteAt(address pool, uint128 wTime) external view returns (uint128);

    /**
    * @notice Finalize the voting results of all pools, up to the current epoch.
    * @dev This function applies applyPoolSlopeChanges on all pools and marks the result as final.
    * @dev In rare cases where too many pools need to be applyPoolSlopeChanges in one transaction, the pools
    can be split into multiple transactions by calling applyPoolSlopeChanges() for each pool separately.
    */
    function finalizeEpoch() external;

    /**
     * @notice Broadcast voting results of the current week to the specified chain ID.
     This function can be called by anyone. However, the epoch must have already been finalized
     by finalizeEpoch(), otherwise, the function will revert.
     * @notice Some ETH must be attached to pay for the cross-chain fee.
     Any excess amount will be refunded. To determine the exact amount of ETH to attach, call getBroadcastResultFee.
     */
    function broadcastResults(uint64 chainId) external payable;

    function getBroadcastResultFee(uint64 chainId) external view returns (uint256);

    /// @notice Get all eligible voting pools for a chain
    function getActiveChainPools(uint64 chainId) external view returns (address[] memory);

    /// @notice Get all eligible voting pools for all chains
    function getAllActivePools() external view returns (address[] memory);

    /// @notice Get pools removed from voting. Specify range.
    /// @param start range start index
    /// @param end range end index. Reverts if greater than array length.
    function getAllRemovedPools(uint256 start, uint256 end)
        external
        view
        returns (uint256 lengthOfRemovedPools, address[] memory arr);

    /// @notice Refer to IPVotingEscrowMainchain for details on lastSlopeChangeAppliedAt and slopeChanges.
    function getPoolData(address pool, uint128[] memory wTimes)
        external
        view
        returns (
            uint64 chainId,
            uint128 lastSlopeChangeAppliedAt,
            VeBalance memory totalVote,
            uint128[] memory slopeChanges
        );

    function getUserData(address user, address[] memory pools)
        external
        view
        returns (uint64 totalVotedWeight, UserPoolData[] memory voteForPools);

    function getUserPoolVote(address user, address pool)
        external
        view
        returns (UserPoolData memory);

    function getWeekData(uint128 wTime, address[] memory pools)
        external
        view
        returns (
            bool isEpochFinalized,
            uint128 totalVotes,
            uint128[] memory poolVotes
        );

    /// @notice Get the PENDLE reward speed for the next epoch. The number only takes effect after
    /// the weekly result finalization.
    function pendlePerSec() external view returns (uint128);
}
```

## GaugeController

The GaugeController doesn't offer write functions to regular users (except for allowing anyone to fund PENDLE to it), so the interface primarily emphasizes read functions.

### GaugeControllerBase

This interface is applicable to both the main deployment on Ethereum (which we simply term Mainchain) and the other protocol deployments on other chains (which we simply term Sidechain).

```sol
// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.17;

import "./IPMarketFactory.sol";


interface IPGaugeController {
    // ============= EVENTS =============

    /// @notice Emit when a market redeems its accrued rewards.
    event MarketClaimReward(address indexed market, uint256 amount);

    /**
     * @notice Emit when the gauge controller receives reward data for a given week.
     * @param wTime The week that this batch of rewards is for.
     * @param pendleAmounts The amounts of PENDLE to distribute for the next week.
     * @notice Please refer to IPGaugeControllerMainchain.updateVotingResults for more details.
     */
    event ReceiveVotingResults(uint128 indexed wTime, address[] markets, uint256[] pendleAmounts);

    /// @notice Emit when the gauge controller updates the reward data for a market. Please refer to
    /// `IPGaugeController.rewardData` for more details.
    event UpdateMarketReward(
        address indexed market,
        uint256 pendlePerSec,
        uint256 incentiveEndsAt
    );

    // ============= FUNCTIONS =============

    /// @notice Fund PENDLE for GaugeController, callable by anyone.
    function fundPendle(uint256 amount) external;

    /// @notice Withdraw PENDLE from GaugeController, callable only by the governance
    function withdrawPendle(uint256 amount) external;

    /// @notice Returns the PENDLE token address on the chain.
    function pendle() external returns (address);

    /// @notice Claim accrued rewards allocated by the GaugeController.
    /// Only Pendle Markets can call this function.
    function redeemMarketReward() external;

    /**
     * @notice Returns the reward data for a market.
     * @return pendlePerSec The amount of Pendle tokens to be distributed per second for this market.
     * @return accumulatedPendle The amount of Pendle tokens that this market has not yet redeemed.
     * @return lastUpdated The last time this market had its reward data updated by the VoteController.
     * @return incentiveEndsAt The end time of the current incentives period.
     */
    function rewardData(address)
        external
        view
        returns (
            uint128 pendlePerSec,
            uint128 accumulatedPendle,
            uint128 lastUpdated,
            uint128 incentiveEndsAt
        );

    function marketFactory() external view returns (IPMarketFactory);

    /// @notice Returns whether this gauge controller has received reward data for a given week.
    /// The timestamp must be a multiple of 1 week (604800 seconds).
    function epochRewardReceived(uint128) external view returns (bool);
}
```

### GaugeControllerMainchain

```sol
// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.17;

import "./IPGaugeController.sol";


interface IPGaugeControllerMainchain is IPGaugeController {
    function votingController() external view returns (address);

    /**
     * @notice Update the PENDLE allocation for a given week. Can only be called by the VotingController.
     * @param wTime the week that this batch of rewards is for, to prevent duplication in vote result updates.
     * @param markets list of markets to update.
     * @param pendleSpeeds parameter specifies the amount of PENDLE tokens to be distributed per second
        for each market for the next 7 days (604800 seconds).
     * @notice If the previous incentives period hasn't ended, the remaining amount of PENDLE will
        be combined with this new batch to distribute for the next 7 days. This is applicable even if
        this batch was for a week in the past.
     */
    function updateVotingResults(
        uint128 wTime,
        address[] calldata markets,
        uint256[] calldata pendleSpeeds
    ) external;
}
```

### GaugeControllerSidechain

Sidechain updates reward data when it receives a cross-chain message from `VotingController`.

## FeeDistributorV2

The FeeDistributorV2 exists only on Ethereum and all accrued fees from pools on other chains are bridged and distributed here.

```sol
// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.17;


interface IPFeeDistributorV2 {
    // ========================= STRUCT =========================
    struct UpdateProtocolStruct {
        address user;
        bytes32[] proof;
        address[] pools;
        uint256[] topUps;
    }

    // ========================= EVENTS =========================
    /// @notice Emit when a new merkleRoot is set & the fee is funded by the governance
    event SetMerkleRootAndFund(bytes32 indexed merkleRoot, uint256 amountFunded);

    /// @notice Emit when an user claims their fees
    event Claimed(address indexed user, uint256 amountOut);

    /// @notice Emit when the Pendle team populates data for a protocol
    event UpdateProtocolClaimable(address indexed user, uint256 sumTopUp);

    // ========================= FUNCTIONS =========================
    /**
     * @notice Submit total fee and proof to claim outstanding amount. Fee will be sent as raw ETH,
     so receiver should be an EOA or have receive() function.
     */
    function claimRetail(
        address receiver,
        uint256 totalAccrued,
        bytes32[] calldata proof
    ) external returns (uint256 amountOut);

    /**
    * @notice Claim all outstanding fees for the specified pools. This function is intended for use
    by protocols that have contacted the Pendle team. Note that the fee will be sent in raw ETH,
    so the receiver should be an EOA or have a receive() function.
    * @notice Protocols should not use claimRetail, as it can make getProtocolFeeData unreliable.
     */
    function claimProtocol(address receiver, address[] calldata pools)
        external
        returns (uint256 totalAmountOut, uint256[] memory amountsOut);

    ///@notice Returns the claimable fees per pool. This function is only available if the Pendle
    ///team has specifically set up the data.
    function getProtocolClaimables(address user, address[] calldata pools)
        external
        view
        returns (uint256[] memory claimables);

    ///@notice Returns the lifetime totalAccrued fees for protocols. This function is only available
    ///if the Pendle team has specifically set up the data.
    function getProtocolTotalAccrued(address user) external view returns (uint256);
}
```

## PendleGauge

### Overview

PendleGauge is how LPs receive PENDLE rewards distributed by the GaugeController. To streamline the process and avoid unnecessary fees and system fragmentation, the PendleGauge is integrated into each PendleMarket, which means that all LPs automatically receive PENDLE rewards.

### Rewards Distribution

Please note that PendleMarket is paired between PrincipalToken (PT) and its corresponding StandardizedYieldToken (SY). PT does not generate any rewards, while SY generates rewards that must be distributed to LP holders (such as AURA/BAL of Aura pools and ETH of GLP pools). These rewards will be distributed together with PENDLE rewards from the GaugeController.

Each user will have an `activeBalance` that indicates how many `shares` of rewards they will receive, with the `totalActiveBalance` being the total number of `shares`. A simple mental model is that every time some rewards accrue, they will be distributed to all outstanding shares. Over time, shareholders will be able to claim more rewards.

### More on ActiveBalance

The `activeBalance` is calculated as follows:

$$$
activeBalance_u = min(lpBalance_u, boostedBalance_u)
$$$

$$$
boostedBalance_u = 0.4lpBalance_u + 0.6totalLP \cdot \cfrac{vePendleValue^Y_u}{veTotalSupply^Y}
$$$

The `activeBalance` of a user will be updated whenever there is a transaction related to LP that affects the user. Examples of such transactions include minting, burning, transferring LP, or redeeming rewards from the LP. This has several implications: 

1. Boost transaction after providing liquidity: If a user increases their vePENDLE balance after providing liquidity, they will need to perform LP-related transactions for the Gauge to update their `activeBalance` if it has not already reached the maximum boost.. The most gas-efficient way to do this is for the user to call `LP.transfer(market.address, 0)`.
  
2. An user's `activeBalance` can change even if their vePENDLE position and LP position remain the same. This is because vePENDLE decays weekly. `activeBalance` depends on `boostedBalance`, which can change if `vePendleBalance / veTotalSupply` changes. `boostedBalance` may increase if `vePendleBalance` decays slower than `veTotalSupply`. On the other hand, it will decrease if `veTotalSupply` increases because people lock more or if `vePendleBalance` decays faster than `veTotalSupply`.

### Interface

```sol
interface IPGauge {
    function totalActiveSupply() external view returns (uint256);

    function activeBalance(address user) external view returns (uint256);
		
		/// @notice Redeem all accrued rewards, returning amountOuts in the same order as getRewardTokens.
		function redeemRewards(address user) external returns (uint256[] memory);

		/// @notice Returns the list of reward tokens being distributed
		function getRewardTokens() external view returns (address[] memory);
}
```