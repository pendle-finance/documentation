---
sidebar_position: 1
---

# Primary Functions

This section covers the basic functions on Pendle with elaboration on how each of the features enables different exposures.


## Mint (Tokenize)

The mint function allows the tokenization of yield-bearing assets and is the fundamental entry point to Pendle. Users mint OT and YT by selecting an underlying asset and the desired expiry date. OT represents ownership of the underlying asset for a fixed period of time, and YT represents the future yield for the same period of time.

![Tokenization](/img/getting-started/basic-functions-1.png)


## Swap

Pendle allows the swapping of YT and baseTokens to maximize yield and capital efficiency. The swap function utilizes the Pendle AMM. 

There are two different exposure strategies users can employ while swapping on Pendle. 

Firstly, swapping YT for baseToken allows users to lock in the current yield and receive cash upfront.

Secondly, swapping baseToken for YT allows users to gain exposure to future yield without having to lock in a capital-heavy asset.


## Claiming Accrued Yield

Holders of YT have the right to future yield for as long as they own it. This yield is based on interest rates of the underlying. Yield accumulates as time passes and is usually awarded in the form of the underlying token, depending on the underlying protocol.

Users will be able to claim the accrued yield through Pendle at any given time.

:::note
Claiming accrued yield will incur gas fees on the blockchain.
:::

## Liquidity Provision

Pendle's AMM also allows users to deposit token assets into the liquidity pools in exchange for swap fees and liquidity incentives.

LPs will also receive PendleLP, which represents a proportional share of the pooled assets. It also allows users to reclaim the corresponding assets at any given time.

Note: Liquidity provision adheres to the prevailing token weights on the Pendle AMM, for more information, refer [here](https://docs.pendle.finance/resources/pendle-amm-design-paper).


## Redemption

OT holders are able to redeem the locked underlying asset at any time, as long as the following conditions are met:

* To redeem the underlying after the contract expiry, only OT is required. A 1:1 proportion of underlying will be redeemed with OT.
* To redeem the underlying before the contract expiry, equal amounts of OT and YT are required. The amount of underlying that can be redeemed will be equal to the amount of OT and YT.

Pendle also has a renew function to roll expired contracts forward. 
