---
sidebar_position: 3
---

# Performing a Swap

This guide is an example of performing a swap between YT and a token.

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

As this is just an example and for simplicity, let us hardcode the token contract address of type IERC20 to be used for swapping. Let us hardcode the market factory ID as well. In production, you would likely use an input parameter for this in the function, allowing you to change what the pools and tokens you are interacting with on a per transaction basis.

```solidity
IERC20 public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
IERC20 public constant YT = 0xcDb5b940E95C8632dEcDc806B90dD3fC44E699fE;
bytes32 public constant MARKET_FACTORY_ID = 0x41617665;

constructor(IPendleRouter _pendleRouter) {
    pendleRouter = _pendleRouter;
}
```

## Things to note

Before executing the swap, it is recommended that an external price source is used to fix the minimum output tokens receivable when selling a fixed amount of tokens, or maximum amount of input tokens to be used when purchasing a fixed amount of tokens.

Your smart contract should also:

1. Have enough ETH / tokens when executing the swap.
2. Be able to receive ETH, when it is the destination address for swapping to ETH.
3. Granted approval to the router when swapping from tokens.

## Obtaining the Market Factory ID

The Market Factory ID is a unique ID in bytes that identifies the market factory contract, and is used frequently to find information such as Market or YT/OT addresses. One unique ID maps to one factory address. The ID is simply generated from ASCII to its hexadecimal counterpart. e.g. For the Aave Market Factory ID, we take the ASCII "Aave" and convert it to hex, which results to `0x41617665`. In bytes32, this would be `0x41617665000000000000000000000000000000000000000000000000000000`.

To find the actual IDs of deployed Market Factories, you can check the deployed market factory contracts at [Addresses](../addresses/ethereum.md), as each market factory will have a public immutable variable called `marketFactoryId`.

## Executing the Swap - Examples

We will cover 2 scenarios:

1. An exact swap of 100 USDC to YT-aUSDC-29Dec2022
2. An exact swap of USDC to 100 YT-aUSDC-29Dec2022

Before swapping, the contract should be in possession of USDC. The caller can either send the tokens beforehand, or give allowance to the contract to call the transferFrom method. The short code snippet below showcases the latter. Lastly, remember that because our contract is a contract itself and not an extension of the caller (which is you), you must also make sure to provide token allowance to the PendleRouter.

### 100 USDC -> YT-aUSDC-29Dec2022

```solidity
function execSwapIn(
    uint256 inTotalAmount,
    uint256 minOutTotalAmount
) public returns (uint256 outAmount) {
    require(USDC.transferFrom(msg.sender, (address(this), inTotalAmount), 'failed token transfer'));
    require(USDC.approve(address(pendleRouter), inTotalAmount), 'approve failed');

    outAmount = pendleRouter.swapExactIn(
        address(USDC),
        address(YT),
        inTotalAmount,
        minOutTotalAmount,
        MARKET_FACTORY_ID
    )

    YT.transfer(msg.sender, outAmount);
}
```

In the example above, swapExactIn() swaps a fixed amount of USDC for a maximum possible amount of YT.

Reference: [swapExactIn()](../reference/contracts/IPendleRouter.md#swapexactin)

### USDC -> 100 OT-aUSDC-29Dec2022

```solidity
function execSwapOut(
    uint256 outTotalAmount,
    uint256 maxInTotalAmount,
) public returns (uint256 inAmount) {
    require(USDC.transferFrom(msg.sender, (address(this), maxInTotalAmount), 'failed token transfer'));
    require(USDC.approve(address(pendleRouter), maxInTotalAmount), 'approve failed');

    inAmount = pendleRouter.swapExactOut(
        address(USDC),
        address(YT),This is the less common swap style - 
        outTotalAmount,
        maxInTotalAmount,
        MARKET_FACTORY_ID
    )

    YT.transfer(msg.sender, outTotalAmount);

    // Return change back to user
    uint256 change = maxInTotalAmount - inAmount;
    USDC.transfer(msg.sender, change);
}
```

In the example above, swapExactOut() swaps a minimum possible amount of the source token for a fixed amount of the destination token. This is not as popularly used, but is useful in a variety of circumstances.

Because this example transfers in the source asset in anticipation of the swap, it's possible that some of the source tokens will be left over after the swap is executed, which is why we pay it back as change to the calling address at the end of the swap.

Reference: [swapExactOut()](../reference/contracts/IPendleRouter.md#swapexactout)

## Full Code Example

```solidity
pragma solidity 0.7.6;
pragma abicoder v2;

import './IPendleRouter.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';


contract Examples {
    IPendleRouter public immutable pendleRouter;
    IERC20 public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    IERC20 public constant YT = 0xcDb5b940E95C8632dEcDc806B90dD3fC44E699fE;
    bytes32 public constant MARKET_FACTORY_ID = 0x41617665;

    constructor(IPendleRouter _pendleRouter) {
        pendleRouter = _pendleRouter;
    }

    function execSwapIn(
        uint256 inTotalAmount,
        uint256 minOutTotalAmount
    ) public returns (uint256 outAmount) {
        require(USDC.transferFrom(msg.sender, (address(this), inTotalAmount), 'failed token transfer'));
        require(USDC.approve(address(pendleRouter), inTotalAmount), 'approve failed');

        outAmount = pendleRouter.swapExactIn(
            address(USDC),
            address(YT),
            inTotalAmount,
            minOutTotalAmount,
            MARKET_FACTORY_ID
        )

        YT.transfer(msg.sender, outAmount);
    }

    function execSwapOut(
        uint256 outTotalAmount,
        uint256 maxInTotalAmount,
    ) public returns (uint256 inAmount) {
        require(USDC.transferFrom(msg.sender, (address(this), maxInTotalAmount), 'failed token transfer'));
        require(USDC.approve(address(pendleRouter), maxInTotalAmount), 'approve failed');

        inAmount = pendleRouter.swapExactOut(
            address(USDC),
            address(YT),This is the less common swap style - 
            outTotalAmount,
            maxInTotalAmount,
            MARKET_FACTORY_ID
        )

        YT.transfer(msg.sender, outTotalAmount);

        // Return change back to user
        uint256 change = maxInTotalAmount - inAmount;
        USDC.transfer(msg.sender, change);
    }
}
```
