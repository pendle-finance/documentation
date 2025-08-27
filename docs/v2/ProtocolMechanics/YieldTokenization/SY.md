---
hide_table_of_contents: true
---

# SY

![SY](/img/ProtocolMechanics/sy.png "SY")

SY is a token standard that implements a standardized API for wrapped yield-bearing tokens within smart contracts. All yield-bearing tokens can be wrapped into SY, giving them a common interface that can be built upon. SY opens up Pendle’s yield-tokenization mechanism to all yield-bearing tokens in DeFi, creating a permissionless ecosystem.

> For example, stETH, cDAI and yvUSDC can be wrapped into SY-stETH, SY-cDAI and SY-yvUSDC, standardizing their yield-generating mechanics to be supported on Pendle.

As all SYs have the same mechanism, Pendle interacts with SY as the main interface to all yield-bearing tokens. PT and YT are minted from SY and Pendle AMM pools trade PT against SY. 

While this might seem daunting, Pendle automatically converts yield-bearing tokens into SY and vice versa. This process happens automatically behind the scenes, making users feel as if they’re interacting directly with their yield-bearing tokens instead of having to manually deal with SY &lt;&gt; yield-bearing token conversion.
 
While this standard benefits Pendle, our vision for SY extends beyond just our own protocol. SY aims to create unprecedented composability across all of DeFi, enabling developers to seamlessly build on top of existing contracts without the need for manual integration. 

Read more about SY and EIP-5115 [here](https://eips.ethereum.org/EIPS/eip-5115).

## SY Unwrapper

![SY Unwrapper](/img/ProtocolMechanics/sy-unwrapper.png "SY Unwrapper")

The SY Unwrapper can be found in the top-right dropdown menu of the Pendle app, allowing users convert SY Tokens back into their underlying yield-bearing assets, vice versa.

**To use the SY Unwrapper:**

![SY Unwrapper Window](/img/ProtocolMechanics/sy-unwrapper-window.png "SY Unwrapper Window")

Step 1: Select between “Unwrap” or “Wrap” mode

Step 2: Select the inputs to be Unwrapped / Wrapped

Step 3: Check the rate and output.

Step 4: Confirm and approve the transaction.
