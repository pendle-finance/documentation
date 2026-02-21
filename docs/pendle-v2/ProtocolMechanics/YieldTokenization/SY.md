---
hide_table_of_contents: true
---

# SY

![SY](/img/ProtocolMechanics/sy.png "SY")

SY is a token standard that implements a standardized API for wrapped yield-bearing tokens within smart contracts. All yield-bearing tokens can be wrapped into SY, giving them a common interface that can be built upon. SY opens up Pendle’s yield-tokenization mechanism to all yield-bearing tokens in DeFi, creating a permissionless ecosystem.

> For example, stETH, cDAI and yvUSDC can be wrapped into SY-stETH, SY-cDAI and SY-yvUSDC, standardizing their yield-generating mechanics to be supported on Pendle.

As all SYs have the same mechanism, Pendle interacts with SY as the main interface to all yield-bearing tokens. PT and YT are minted from SY and Pendle AMM pools trade PT against SY.

While this might seem daunting, Pendle automatically converts yield-bearing tokens into SY and vice versa. This process happens automatically behind the scenes, making users feel as if they’re interacting directly with their yield-bearing tokens instead of having to manually deal with SY ↔ yield-bearing token conversion.

### Key Characteristics

- **1:1 Wrapping (Typically):** In most cases, 1 SY token represents 1 unit of the underlying yield-bearing asset. For instance, 1 SY-rsETH is equivalent to 1 rsETH. However, there are exceptions (e.g., mPendle, aUSDC) where the ratio is not strictly 1:1. Integrators should verify the specific wrapping mechanism for each SY token.
- **No Maturity Date:** Unlike PT and YT, the SY token does not have an expiry date. It acts as a perpetual wrapper for the underlying asset as long as it is held within the Pendle ecosystem.
- **Source of Yield and Points:** The SY contract holds the deposited underlying asset and is the direct recipient of all accrued yield and points from that asset. All rewards distributed within a Pendle market originate from the SY tokens held within it.
- **Upgradability:** Most newer SY contracts are deployed as upgradable proxies. This allows for future enhancements — such as adding support for new deposit assets or adjusting mechanisms — without requiring a full market migration.

While this standard benefits Pendle, our vision for SY extends beyond just our own protocol. SY aims to create unprecedented composability across all of DeFi, enabling developers to seamlessly build on top of existing contracts without the need for manual integration.

## SY Converter

![SY Converter](/img/ProtocolMechanics/sy-converter.png "SY Converter")

The SY Converter can be found in the trade form for any of the associated market. For example *SY-sUSDe* wrapper/unwrapper is accessible from sUSDe market of any maturity. 

**To use the SY Converter:**

![SY Converter Window](/img/ProtocolMechanics/sy-converter-window.png "SY Unwrapper Window")

Step 1: Select between “Unwrap” or “Wrap” mode

Step 2: Select the token to wrap from or unwrap to

Step 3: Check the rate and output.

Step 4: Confirm and approve the transaction.
