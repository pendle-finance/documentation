---
sidebar_position: 4
---

# Provisioning Liquidity

This guide is an example of being able to create a new Market or add/decrease liquidity in a Market.

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
bytes32 public constant MARKET_FACTORY_ID = 0x41617665000000000000000000000000000000000000000000000000000000;

constructor(IPendleRouter _pendleRouter) {
    pendleRouter = _pendleRouter;
}
```

## Market Creation

You may have a case where you may be instantiating a new market for a YT/Token pair. This can be done by calling the router's [createMarket](../reference/contracts/IPendleRouter.md#createmarket) function. Let us assume two examples where we create a Market then [bootstrap liquidity](../reference/contracts/IPendleRouter.md#bootstrapmarket), and another where we add liquidity to an existing market.

Before bootstrapping the market, the contract should be in possession of USDC and YT. The caller can either send the tokens beforehand, or give allowance to the contract to call the transferFrom method. The short code snippet below showcases the latter. Lastly, remember that because our contract is a contract itself and not an extension of the caller (which is you), you must also make sure to provide token allowance to the PendleRouter.

```solidity
function createAndBootstrapMarket(
    uint256 initialXytLiquidity,
    uint256 initialTokenLiquidity
) public returns (address market) {
    require(USDC.transferFrom(msg.sender, address(this), initialTokenLiquidity), 'transfer failed');
    require(YT.transferFrom(msg.sender, address(this), initialXytLiquidity), 'transfer failed');
    require(USDC.approve(address(pendleRouter), initialTokenLiquidity), 'approve failed');
    require(YT.approve(address(pendleRouter), initialXytLiquidity), 'approve failed');

    market = pendleRouter.createMarket(
      MARKET_FACTORY_ID,
      address(YT),
      address(USDC)
    );

    pendleRouter.bootstrapMarket(
      MARKET_FACTORY_ID,
      address(YT),
      address(USDC),
      initialXytLiquidity,
      initialTokenLiquidity
    );
}
```

## Adding Liquidity

There are [several methods](../reference/contracts/IPendleRouter.md#addmarketliquiditydual) to add liquidity to a market. Adding liquidity can only be done through the PendleRouter. These methods both require commitment to a belief about the current price, which is encoded in the desired*Amount parameters. While it is fairly safe to assume that the current fair market price is around what the current reserve ratio is for a pair due to arbitrage, it is dangerous to obtain this ratio within the same transaction as it can be easily manipulated.

In this example, we first determine the appropriate market to add liquidity to. As we already have this marketFactoryID pre-determined and hardcoded in our contract, we can use this to find the canonical market address, or we can use the market address that was generated when executing `createAndBootstrapMarket()`. Then we pass in our desired amounts by calling the appropriate addMarketLiquidity* function. Here, let us add liquidity for both YT and the token.

```solidity
function addLiquidityToMarket(
    address market,
    uint256 desiredXytAmount,
    uint256 desiredTokenAmount,
    uint256 xytMinAmount,
    uint256 tokenMinAmount
) public returns (
    uint256 amountXytUsed,
    uint256 amountTokenUsed,
    uint256 lpOut
) {
    require(USDC.transferFrom(msg.sender, address(this), desiredTokenAmount), 'transfer failed');
    require(YT.transferFrom(msg.sender, address(this), desiredXytAmount), 'transfer failed');
    require(USDC.approve(address(pendleRouter), desiredTokenAmount), 'approve failed');
    require(YT.approve(address(pendleRouter), desiredXytAmount), 'approve failed');

    (amountXytUsed, amountTokenUsed, lpOut) = pendleRouter.addMarketLiquidityDual(
      MARKET_FACTORY_ID,
      address(YT),
      address(USDC),
      desiredXytAmount,
      desiredTokenAmount,
      xytMinAmount,
      tokenMinAmount
    )

    // Return the change to the user
    uint256 xytChange = desiredXytAmount - amountXytUsed;
    uint256 tokenChange = desiredTokenAmount - tokenMinAmount;
    YT.transfer(msg.sender, xytChange);
    USDC.transfer(msg.sender, tokenChange);

    // Send LP token to the user
    // We can wrap this with IERC20, since LP tokens implement IERC20
    IERC20(market).transfer(msg.sender, lpOut);
}
```

## Removing Liquidity

There are [several methods](../reference/contracts/IPendleRouter.md#removemarketliquiditydual) to remove liquidity from a market. Removing liquidity can only be done through the PendleRouter. Similar to adding liquidity above, these methods both require commitment to a belief about the current price as the amounts taken out will depend on the current ratio. While it is fairly safe to assume that the current fair market price is around what the current reserve ratio is for a pair due to arbitrage, it is dangerous to obtain this ratio within the same transaction as it can be easily manipulated.

In this example, we first determine the appropriate market to removed liquidity from. As we already have this marketFactoryID pre-determined and hardcoded in our contract, we can use this to find the canonical market address, or we can use the market address that was generated when executing `createAndBootstrapMarket()`. Then we pass in the minimum amounts to take out by calling the appropriate removeMarketLiquidity* function. Here, let us remove liquidity for both YT and the token.

```solidity
function removeLiquidityFromMarket(
    address market,
    uint256 exactInLp,
    uint256 minOutXyt,
    uint256 minOutToken
) public returns (
    uint256 exactOutXyt,
    uint256 exactOutToken
) {
    // We can wrap this with IERC20, since LP tokens implement IERC20
    // Send to this contract the LP tokens from msg.sender, as well as provide allowance to the PendleRouter
    require(IERC20(market).transferFrom(msg.sender, address(this), lpOut), 'transfer failed');
    require(IERC20(market).approve(address(pendleRouter), exactInLp), 'approve failed');

    (exactOutXyt, exactOutToken) = pendleRouter.removeMarketLiquidityDual(
      MARKET_FACTORY_ID,
      address(YT),
      address(USDC),
      exactInLp,
      minOutXyt,
      minOutToken
    )

    // Return YT and tokens to user
    YT.transfer(msg.sender, exactOutXyt);
    USDC.transfer(msg.sender, exactOutToken);
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
    IERC20 public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    IERC20 public constant YT = 0xcDb5b940E95C8632dEcDc806B90dD3fC44E699fE;
    bytes32 public constant MARKET_FACTORY_ID = 0x41617665000000000000000000000000000000000000000000000000000000;

    constructor(IPendleRouter _pendleRouter) {
        pendleRouter = _pendleRouter;
    }

    function createAndBootstrapMarket(
        uint256 initialXytLiquidity,
        uint256 initialTokenLiquidity
    ) public returns (address market) {
        require(USDC.transferFrom(msg.sender, address(this), initialTokenLiquidity), 'transfer failed');
        require(YT.transferFrom(msg.sender, address(this), initialXytLiquidity), 'transfer failed');
        require(USDC.approve(address(pendleRouter), initialTokenLiquidity), 'approve failed');
        require(YT.approve(address(pendleRouter), initialXytLiquidity), 'approve failed');

        market = pendleRouter.createMarket(
          MARKET_FACTORY_ID,
          address(YT),
          address(USDC)
        );

        pendleRouter.bootstrapMarket(
          MARKET_FACTORY_ID,
          address(YT),
          address(USDC),
          initialXytLiquidity,
          initialTokenLiquidity
        );
    }

    function addLiquidityToMarket(
        address market,
        uint256 desiredXytAmount,
        uint256 desiredTokenAmount,
        uint256 xytMinAmount,
        uint256 tokenMinAmount
    ) public returns (
        uint256 amountXytUsed,
        uint256 amountTokenUsed,
        uint256 lpOut
    ) {
        require(USDC.transferFrom(msg.sender, address(this), desiredTokenAmount), 'transfer failed');
        require(YT.transferFrom(msg.sender, address(this), desiredXytAmount), 'transfer failed');
        require(USDC.approve(address(pendleRouter), desiredTokenAmount), 'approve failed');
        require(YT.approve(address(pendleRouter), desiredXytAmount), 'approve failed');

        (amountXytUsed, amountTokenUsed, lpOut) = pendleRouter.addMarketLiquidityDual(
          MARKET_FACTORY_ID,
          address(YT),
          address(USDC),
          desiredXytAmount,
          desiredTokenAmount,
          xytMinAmount,
          tokenMinAmount
        )

        // Return the change to the user
        uint256 xytChange = desiredXytAmount - amountXytUsed;
        uint256 tokenChange = desiredTokenAmount - tokenMinAmount;
        YT.transfer(msg.sender, xytChange);
        USDC.transfer(msg.sender, tokenChange);

        // Send LP token to the user
        // We can wrap this with IERC20, since LP tokens implement IERC20
        IERC20(market).transfer(msg.sender, lpOut);
    }

    function removeLiquidityFromMarket(
        address market,
        uint256 exactInLp,
        uint256 minOutXyt,
        uint256 minOutToken
    ) public returns (
        uint256 exactOutXyt,
        uint256 exactOutToken
    ) {
        // We can wrap this with IERC20, since LP tokens implement IERC20
        // Send to this contract the LP tokens from msg.sender, as well as provide allowance to the PendleRouter
        require(IERC20(market).transferFrom(msg.sender, address(this), lpOut), 'transfer failed');
        require(IERC20(market).approve(address(pendleRouter), exactInLp), 'approve failed');

        (exactOutXyt, exactOutToken) = pendleRouter.removeMarketLiquidityDual(
          MARKET_FACTORY_ID,
          address(YT),
          address(USDC),
          exactInLp,
          minOutXyt,
          minOutToken
        )

        // Return YT and tokens to user
        YT.transfer(msg.sender, exactOutXyt);
        USDC.transfer(msg.sender, exactOutToken);
    }
}
```