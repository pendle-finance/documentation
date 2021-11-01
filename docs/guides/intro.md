---
sidebar_position: 1
---

# Introduction

Tokenizing your future yield and performing swaps are the most common features that are used in the Pendle Finance protocol. Kindly note that the example code given are not production ready code and are implemented in the simplest manner as to provide an example.

As Pendle is reliant on other other DeFi protocols like Aave and Compound for their yield tokens, it is important to have these protocols set up in your test environment during development. Hence, to avoid having to deploy these protocols from scratch, and to best simulate mainnet conditions, we recommend using [Hardhat's mainnet forking feature](https://hardhat.org/guides/mainnet-forking.html).

## Overview

Users who would like to realize their future yield or users hedging should view the section on [tokenizing yield tokens](tokenizing-yield-tokens.md).

Traders and arbitrageurs who need to take liquidity should view the section on [performing a swap](performing-a-swap.md).

The section on [liquidity provision](provisioning-liquidity.md) will guide liquidity providers through the process of adding and removing liquidity to Pendle's AMM.

Generally, the contracts of interest are the following:

* Router contract for tokenization, swapping, querying token rates, and liquidity provision.
* Data contract for fetching specific forge, market, or YT/OT token data, such as fees, forge or market IDs, and canonical YT/OT addresses.
