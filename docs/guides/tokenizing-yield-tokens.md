---
sidebar_position: 2
---

# Tokenizing Yield Tokens

This guide is an example of tokenizing yield-bearing assets such as aTokens from Aave or cTokens from Compound.

## Setting up your contract

To first set up, let's declare the solidity version that will be used to compile the contract as well as the abicoder-v2, to allow for arbitrary nested arrays and structs to be encoded and decoded in calldata.

```solidity
pragma solidity 0.7.6;
pragma abicoder v2;
```

Next, import the IPendleRouter interface contract, which can be obtained in the [pendle-core GitHub repo](https://github.com/pendle-finance/pendle-core/blob/master/contracts/interfaces/IPendleRouter.sol). For this example, let's assume that the IPendleRouter interface is in the same directory level as your contract. As we'll be using USDC, and ERC20 token, for the examples below, you must import its interface as well. We can use the [OpenZeppelin NPM package](https://www.npmjs.com/package/@openzeppelin/contracts).

``` solidity
import './IPendleRouter.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
```

Here we create our contract called `Examples`, and declare an immutable public variable `pendleRouter` of type `IPendleRouter`. This allows us to call functions in the IPendleRouter interface.

```solidity
contract Examples {
    IPendleRouter public immutable pendleRouter;
}

```

As this is just an example and for simplicity, let us hardcode the yield-bearing token contract address of type IERC20 to be used for tokenization. Let us hardcode the forge ID as well. In production, you would likely use an input parameter for this in the function, allowing you to change what the pools and tokens you are interacting with on a per transaction basis.

```solidity
IERC20 public constant AUSDC = 0xBcca60bB61934080951369a648Fb03DF4F96263C;
bytes32 public constant FORGE_ID = 0x41617665;

constructor(IPendleRouter _pendleRouter) {
    pendleRouter = _pendleRouter;
}
```

## Things to note

The examples here assumes that the user has already obtained and in possession of yield-bearing assets such as aUSDC. The aUSDC has already been minted from Aave and is sitting in the user's wallet. For this example, we'll be using aUSDC.

Your smart contract should have also:

1. Granted approval to the router when for the tokenization of yield bearing assets and redemption of yields.

## Creating new yield contracts

New yield token and ownership token contracts will be created on-chain by the Forge when the `newYieldContracts()` function in the PendleRouter is called.

```solidity
function newContracts(uint256 expiry) public return (address ot, address yt) {
    (ot, yt) = pendleRouter.newYieldContracts(FORGE_ID, address(AUSDC), expiry);
}
```

The expiry is the desired expiry date of the yield contract in epoch time. For example, for an expiry date of December 30th, 2021, the input required is `1640822400`. Multiple yield contracts of different expiries can be created. This results to different YT/OT smart contracts created.

## Tokenizing yield bearing tokens

Before yield tokenization can occur, the yield contracts must already be existing for the intended underlying yield-bearing asset and expiry. There are certain checks done on the `tokenizeYield()` function on the PendleRouter that ascertains this.

The tokenization sends the minted YT and OT directly back to the caller of the function (msg.sender).

```solidity
function tokenize(uint256 expiry, uint256 amount) public returns (address ot, address yt, uint256 amountMinted) {
    require(AUSDC.transferFrom(msg.sender, (address(this), amount), 'failed token transfer'));
    require(AUSDC.approve(address(pendleRouter), amount), 'approve failed');

    (ot, yt, amountMinted) = pendleRouter.tokenizeYield(
        FORGE_ID,
        address(AUSDC),
        expiry,
        amount,
        msg.sender
    );
}
```

## Redemptions

### Redeeming due interests

A user holding YT of a particular underlying yield-token and expiry is entitled to receive the due interests generated by the underlying yield protocol (such as Aave and Compound). Redemption of interests can always be done regardless of whether the YT has reached its expiry or not.

For this example, we simply return the redeemed interests back to the caller of the function.

```solidity
function redeemInterest(uint256 expiry) public returns (uint256 interestRedeemed) {
    interestRedeemed = pendleRouter.redeemDueInterests(
        FORGE_ID,
        address(AUSDC),
        expiry,
        msg.sender
    );
}
```

### Redeeming the underlying yield-bearing asset

The user can redeem the underlying yield-bearing asset anytime before the yield contracts expiry. In this case, for each OT used to redeem, there must be an equivalent amount of YT (of the same yield contract and expiry). The YT and OT will be burned, and the underlying yield-bearing asset will be returned to the user.

```solidity
function redeemUnderlying(uint256 expiry, uint256 amount, IERC20 yt, IERC20 ot) public returns (uint256 redeemedAmount) {
    // Transfer the YT and OT to this contract to be used for redemption
    require(yt.transferFrom(msg.sender, (address(this), amount), 'failed token transfer'));
    require(yt.approve(address(pendleRouter), amount), 'approve failed');
    require(ot.transferFrom(msg.sender, (address(this), amount), 'failed token transfer'));
    require(ot.approve(address(pendleRouter), amount), 'approve failed');

    redeemedAmount = pendleRouter.redeemUnderlying(
        FORGE_ID,
        address(AUSDC),
        expiry,
        amount
    );
}
```

### Redeeming after expiry of the yield contract

Once the YT has reach its expiry or maturation date, its value is essentially 0 as no yield is being generated by it. The user can then redeem his underlying yield-bearing asset using his OT only. The OT will be burned, and the underlying yield-bearing asset will be returned to the user.

```solidity
function redeemAfterExpiry(uint256 expiry, IERC20 ot) public returns (uint256 redeemedAmount) {
    // Transfer the whole OT balance to this contract to be used for redemption
    uint256 balance = ot.balanceOf(msg.sender);
    require(ot.transferFrom(msg.sender, (address(this), balance), 'failed token transfer'));
    require(ot.approve(address(pendleRouter), balance), 'approve failed');

    redeemedAmount = pendleRouter.redeemAfterExpiry(
        FORGE_ID,
        address(AUSDC),
        expiry
    );
}
```
## Renewing the Yield Contract

After the yield contract has expired or reached the maturity date, instead of redeeming back the underlying yield-bearing asset, we can renew the yield contract to a new expiry date. Underneath it all, the function is basically just a proxy call to `redeemAfterExpiry()` and `tokenizeYield()` in the PendleRouter. We specify the `renewalRate` as well, which is a fixed point number that indicates how much of the total redeemed underlying yield-bearing asset amount will be used for tokenization for the new expiry. In this example, we simply use a `renewalRate` of 1 to make use of the full renewed amount. Using a value greater than 1 means increasing your position in the new yield contract.


```solidity
function renewYieldContract(uint256 oldExpiry, uint256 newExpiry) public returns (
    uint256 redeemedAmount,
    uint256 amountRenewed,
    address ot,
    address xyt,
    uint256 amountTokenMinted
) {
    // Transfer the whole OT balance to this contract to be used for renewal
    uint256 balance = ot.balanceOf(msg.sender);
    require(ot.transferFrom(msg.sender, (address(this), balance), 'failed token transfer'));
    require(ot.approve(address(pendleRouter), balance), 'approve failed');

    (redeemedAmount, amountRenewed, ot, xyt, amountTokenMinted) = pendleRouter.renewYield(
        FORGE_ID,
        oldExpiry,
        address(AUSDC),
        newExpiry,
        1
    );
}
```

## Full Code Example

```solidity
pragma solidity 0.7.6;
pragma abicoder v2;

import './IPendleRouter.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';


contract Examples {
    IPendleRouter public immutable pendleRouter;
    IERC20 public constant AUSDC = 0xBcca60bB61934080951369a648Fb03DF4F96263C;
    bytes32 public constant FORGE_ID = 0x41617665;

    constructor(IPendleRouter _pendleRouter) {
        pendleRouter = _pendleRouter;
    }

    function newContracts(uint256 expiry) public return (address ot, address yt) {
        (ot, yt) = pendleRouter.newYieldContracts(FORGE_ID, address(AUSDC), expiry);
    }

    function tokenize(uint256 expiry, uint256 amount) public returns (address ot, address yt, uint256 amountMinted) {
        require(AUSDC.transferFrom(msg.sender, (address(this), amount), 'failed token transfer'));
        require(AUSDC.approve(address(pendleRouter), amount), 'approve failed');

        (ot, yt, amountMinted) = pendleRouter.tokenizeYield(
            FORGE_ID,
            address(AUSDC),
            expiry,
            amount,
            msg.sender
        );
    }

    function redeemInterest(uint256 expiry) public returns (uint256 interestRedeemed) {
        interestRedeemed = pendleRouter.redeemDueInterests(
            FORGE_ID,
            address(AUSDC),
            expiry,
            msg.sender
        )
    }

    function redeemUnderlying(uint256 expiry, uint256 amount, IERC20 yt, IERC20 ot) public returns (uint256 redeemedAmount) {
        // Transfer the YT and OT to this contract to be used for redemption
        require(yt.transferFrom(msg.sender, (address(this), amount), 'failed token transfer'));
        require(yt.approve(address(pendleRouter), amount), 'approve failed');
        require(ot.transferFrom(msg.sender, (address(this), amount), 'failed token transfer'));
        require(ot.approve(address(pendleRouter), amount), 'approve failed');

        redeemedAmount = pendleRouter.redeemUnderlying(
            FORGE_ID,
            address(AUSDC),
            expiry,
            amount
        );
    }

    function redeemAfterExpiry(uint256 expiry, IERC20 ot) public returns (uint256 redeemedAmount) {
        // Transfer the whole OT balance to this contract to be used for redemption
        uint256 balance = ot.balanceOf(msg.sender);
        require(ot.transferFrom(msg.sender, (address(this), balance), 'failed token transfer'));
        require(ot.approve(address(pendleRouter), balance), 'approve failed');

        redeemedAmount = pendleRouter.redeemAfterExpiry(
            FORGE_ID,
            address(AUSDC),
            expiry
        );
    }

    function renewYieldContract(uint256 oldExpiry, uint256 newExpiry) public returns (
        uint256 redeemedAmount,
        uint256 amountRenewed,
        address ot,
        address xyt,
        uint256 amountTokenMinted
    ) {
        // Transfer the whole OT balance to this contract to be used for renewal
        uint256 balance = ot.balanceOf(msg.sender);
        require(ot.transferFrom(msg.sender, (address(this), balance), 'failed token transfer'));
        require(ot.approve(address(pendleRouter), balance), 'approve failed');

        (redeemedAmount, amountRenewed, ot, xyt, amountTokenMinted) = pendleRouter.renewYield(
            FORGE_ID,
            oldExpiry,
            address(AUSDC),
            newExpiry,
            1
        );
        }
}
```