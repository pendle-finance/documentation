---
sidebar_position: 1
---

# Yield Tokenization

Pendle enables the tokenization of yield-bearing assets by splitting them into OT and YT. OT represents ownership of the underlying asset for a fixed period of time, and YT represents the yield of the underlying asset for the same period of time.

## Tokens

### Currently Supported Assets

| Protocol  | Yield Bearing Asset |                       Each YT / OT Represents                       |
| :-------: | :-----------------: | :-----------------------------------------------------------------: |
| TraderJoe |   PENDLE/AVAX LP    |   Represents Yield / Ownership of PENDLE/AVAX LP from TraderJoe.    |
| TraderJoe |        xJoe         |    Represents Yield / Ownership of 1 JOE deposited in TraderJoe.    |
|   BenQi   |       qiUSDC        |     Represents Yield / Ownership of 1 USDC deposited in BenQi.      |
|   BenQi   |       qiAVAX        |     Represents Yield / Ownership of 1 AVAX deposited in BenQi.      |
|   Aave    |        aUSDC        |      Represents Yield / Ownership of 1 USDC deposited in Aave.      |
| Compound  |        cDAI         | Represents Yield / Ownership of 0.021475 DAI deposited in Compound. |
|   Sushi   |    PENDLE/ETH LP    |    Represents Yield / Ownership of PENDLE/ETH LP from SushiSwap.    |
|   Sushi   |     ETH/USDC LP     |     Represents Yield / Ownership of ETH/USDC LP from SushiSwap.     |

### Ownership Token (OT)

|    Items     |                                   Descriptions                                   |
| :----------: | :------------------------------------------------------------------------------: |
| Token Ticker | **OT - <underlyingToken\> - <expiryDate\>** <br /> Example: _OT-aUSDC-23Nov2020_ |
|  Token Type  |                                      ERC-20                                      |
|  Represents  |              The ownership of underlying assets deposited in Pendle              |

e.g. After expiry, depositing 1 OT-cDAI entitles the redeemer to redeem 0.021475 DAI worth of cDAI. Before expiry, to redeem the same amount the redeemer will have to deposit 1 OT-cDAI and 1 YT-cDAI.

### Yield Token (YT)

|    Items     |                                   Descriptions                                   |
| :----------: | :------------------------------------------------------------------------------: |
| Token Ticker | **YT - <underlyingToken\> - <expiryDate\>** <br /> Example: _YT-aUSDC-23Nov2020_ |
|  Token Type  |                                      ERC-20                                      |
|  Represents  |    The right to the yield of the underlying tokens for a stipulated duration     |

e.g. One YT-cDAI entitles the holder to the yield of 0.021475 DAI deposited in Compound.


## Fees

Forge Fees: 3% of the interest accrued from YT will be directed to the Pendle Treasury. This value will be adjustable via governance.


## Market States

There are three market states for YT in Pendle:
 1. Active
 2. Frozen
 3. Expired

### Active state

The Active State makes up the majority of the life cycle of the market. During this phase, users are able to perform all functions in the pool, with the exception of the renew function.

### Frozen state

As YT contracts near expiry, the market will enter the Frozen State. The start time for the Frozen State can be calculated as follows:

$$$
startTimeFrozenState = \cfrac{1}{20} \cdot contractDuration
$$$

During this time, there will be a margin of error in the accuracy of token quantity. Swaps, additions, and removals of liquidity with a single token will be impacted by this loss of accuracy.

Adding liquidity with dual tokens at this time would also be inefficient for a new LP, as liquidity incentives and swap fees cease upon contract expiry.

As such, during the Frozen state, the following functions will be disabled for that pool:

* Swapping of tokens
* Addition of liquidity with both single token and dual tokens
* Withdrawal of liquidity with single token

However, users are still free to withdraw liquidity with dual tokens and the interest of YT will still be accrued in the same way.

### Expired state

As contracts enter the Expired State, no new incentives and interest will be accrued to the LP. The following points list the different situations and actions users can take with regards to their tokens in the pool:

* If you have staked your LP token to farm PENDLE rewards, you are advised to
    1. Unstake the LP tokens
    2. Remove liquidity of the position held
    3. Renew the expired OT to a new expiry or redeem the underlying
* If you have LP positions, you are advised to
    1. Remove liquidity of the position held
    2. Renew the expired OT to a new expiry or redeem the underlying
* If you have expired OT, you are advised to
    1. Renew the expired OT to a new expiry or redeem the underlying
