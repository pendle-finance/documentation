## 1. Pendle Protocol Overview

This document provides a comprehensive overview of key technical capabilities and limitations when integrating with the Pendle Protocol. It is designed for developers, technical analysts, and partners who are building applications, smart contracts, or services that interact with Pendle’s infrastructure.

The content herein is derived from an analysis of technical discussions and focuses on providing general, long-term valid knowledge. We will explore the nuances of liquidity access, the functionalities of different API endpoints, and the planned evolution of the protocol’s swapping mechanisms. This guide prioritizes the most current information and best practices, while also providing historical context to illustrate the platform’s development.

### 1.1. High-Level Architecture and Core Function

Pendle is a decentralized finance (DeFi) protocol that enables the tokenization and trading of future yield. It splits yield-bearing assets into two distinct components: a Principal Token (PT) and a Yield Token (YT). This separation allows users to manage their yield exposure with greater flexibility, enabling strategies such as fixing future yield, speculating on yield fluctuations, or providing liquidity to earn a mix of rewards.

The protocol is designed as a second-order derivative layer, meaning it builds upon and integrates with existing core yield-generating primitives in the DeFi ecosystem. These primitives often come from categories like Liquid Staking Tokens (LSTs), perpetual swaps, and Real World Assets (RWAs). The success and liquidity of Pendle’s markets are therefore inherently linked to the traction and stability of these underlying assets.

Pendle’s architecture is built to be adaptable, supporting a wide variety of underlying token types. While it can easily integrate standard tokens like ERC-4626 vaults or points-only ERC-20 tokens, it also has the flexibility to support more complex and non-standardized assets through custom SY (Standardized Yield) token adapters.

For those seeking a deeper understanding of the protocol’s structure, a high-level architectural overview is available in the official documentation, which serves as essential prerequisite reading for developers and integrators.

A key characteristic of Pendle’s smart contract architecture is its permissionless nature. This design allows any user or protocol to create a new yield-trading market on-chain. This open approach fosters innovation and expands the range of assets available for yield trading within the Pendle ecosystem.

However, while the on-chain creation is permissionless, the visibility of these markets on the official Pendle user interface (UI) is curated. This curation process, which involves a formal review and whitelisting by the Pendle team, ensures a level of quality and safety for users of the main application. It prevents the UI from being cluttered with potentially low-quality or malicious markets while still allowing for open experimentation on the contract level.

More recently, Pendle has been moving towards a more streamlined “Community Pool” listing process. This initiative aims to empower partners and the community to launch pools more efficiently with minimal intervention from the core team, further embracing the protocol’s permissionless ethos while maintaining a structured review process for UI visibility.

### 1.2. Core Token Concepts and Mechanics

Pendle’s core innovation is the tokenization of future yield. It takes a yield-bearing asset (like stETH or eETH) and splits it into two components:

### 1.2.1. Standardized Yield (SY) Tokens

This is an ERC-5115 compliant wrapper for an underlying yield-bearing asset. For example, if the underlying asset is `stETH`, Pendle wraps it into `SY-stETH`. The SY token contract holds all user deposits of the underlying asset and serves as the foundational layer for tokenization within Pendle. For most integrations, 1 SY is pegged 1:1 to 1 unit of the underlying yield-bearing token (e.g., 1 SY-ezETH = 1 ezETH).

The Standardized Yield (SY) token is a foundational component of the Pendle protocol. It functions as an ERC-5115 wrapper that standardizes various types of underlying yield-bearing assets, making them compatible with Pendle’s AMM and other smart contracts. When a user deposits a yield-bearing asset into Pendle, it is wrapped into a corresponding SY token. For example, depositing `eETH` would result in `SY-eETH`.

**Key Characteristics of SY Tokens:**

- **1:1 Wrapping (Typically):** In most cases, 1 SY token represents 1 unit of the underlying yield-bearing asset. For instance, 1 `SY-rsETH` is equivalent to 1 `rsETH`. However, there are exceptions, such as `mPendle` and `aUSDC`, where the ratio is not strictly 1:1. It is crucial for integrators to verify the specific wrapping mechanism for each SY token.
- **No Maturity Date:** Unlike PT and YT, the SY token itself does not have an expiry date. It acts as a perpetual wrapper for the underlying asset as long as it is held within the Pendle ecosystem.
- **Source of Yield and Points:** The SY token is the contract that holds the deposited underlying asset and is the direct recipient of all accrued yield and points from that asset. All rewards distributed within a Pendle market originate from the SY tokens held within it.
- **Upgradability:** To accommodate the diverse and evolving nature of DeFi protocols, SY tokens are designed to be upgradable. This allows for the addition of new reward sources or adjustments to the token’s mechanics without requiring a complete redeployment of the market.

### 1.2.2. Principal Tokens (PT) and Yield Tokens (YT)

Once an asset is wrapped into an SY token, it can be split into its two core components: the Principal Token (PT) and the Yield Token (YT). This separation is the central mechanism that enables yield trading on Pendle.

- **Principal Token (PT):** Represents the principal component of the underlying asset. A PT is redeemable for one unit of the underlying asset upon maturity. It trades at a discount to its face value, and its price gradually appreciates towards that value as the maturity date approaches. Holding PT to maturity provides a fixed yield. This token represents the principal component of the underlying yield-bearing asset. A holder of one PT is entitled to redeem it for one unit of the underlying asset upon the token’s maturity date. For example, 1 PT-ezETH will be redeemable for 1 ezETH after its specified expiry. PTs are inherently non-yield-bearing and their value appreciates towards the value of the underlying asset as maturity approaches.
- **Yield Token (YT):** Represents the right to receive all the future yield generated by the underlying asset until the maturity date. YT allows users to speculate on or hedge against fluctuations in yield rates. This token represents the right to all the yield generated by the underlying asset until the maturity date. This includes staking rewards, airdrops, points, and any other form of yield. After maturity, the YT token becomes worthless as its claim on future yield expires.

**Principal Tokens (PT):**

- **Function:** A PT represents the principal of the underlying asset. It is a zero-coupon bond that can be redeemed 1:1 for the underlying *accounting asset* at a specific maturity date. For example, 1 `PT-sUSDe` redeems for 1 `USDe` worth of `sUSDe` at maturity.
- **Fixed Yield:** By purchasing PT at a discount to its face value, a user effectively locks in a fixed yield if they hold the token until maturity. The profit is the difference between the discounted purchase price and the 1:1 redemption value at expiry.
- **No Points or Variable Yield:** PT holders forgo all variable yield and points generated by the underlying asset. This yield is redirected to the YT holders.
- **Use as Collateral:** PTs are increasingly used as collateral in various money markets (e.g., Spark, Silo, Morpho) due to their predictable value at maturity, which minimizes liquidation risk from market price volatility.

**Yield Tokens (YT):**

- **Function:** A YT represents the right to all future yield and points generated by the underlying asset until the token’s maturity date. Holding 1 YT is equivalent to receiving the yield from 1 unit of the underlying asset.
- **Leveraged Yield Exposure:** Because YTs are purchased for a fraction of the underlying asset’s price, they offer leveraged exposure to its yield. A small change in the underlying APY can result in a significant percentage change in the YT’s return.
- **Value Decay:** The value of a YT decays over time and trends towards zero as it approaches its maturity date. This is because the period for which it can accrue yield diminishes. After maturity, the YT becomes worthless, though any yield accrued before expiry remains claimable.
- **Points Farming:** YTs are a popular instrument for farming points from airdrop campaigns, as they capture all points from the underlying asset, often with significant leverage.

This separation allows users to trade principal and yield as distinct assets, enabling a variety of fixed-income and yield-trading strategies. A user can deposit a yield-bearing asset into Pendle to mint both PT and YT, or they can trade these tokens individually on Pendle’s AMM.

To improve clarity, especially for assets where the yield-bearing token and its underlying principal have different units, Pendle updated its UI naming convention. The name now explicitly includes the **accounting asset** in parentheses.

- **Example:** `PT-sUSDe (USDe) 31 July`
    - `PT-sUSDe`: The Principal Token is derived from the `sUSDe` yield-bearing asset.
    - `(USDe)`: The accounting asset is `USDe`. This means at maturity, 1 `PT-sUSDe` redeems for 1 `USDe` worth of `sUSDe`.
    - `31 July`: The maturity date.

This change is purely a UI/cosmetic update to enhance user understanding and does not alter the underlying mechanics of the tokens. For external integrations, retaining the older naming convention (e.g., `PT-sUSDe`) is generally acceptable, as it’s unlikely for the same PT to have different accounting assets.

All Yield Tokens (YT) of the same underlying asset are completely fungible. It is **not programmatically possible** to distinguish between YT that was acquired through different methods, such as:
* Minting (by splitting a yield-bearing asset)
* Swapping (by buying it on the Pendle AMM)
* LPing (by receiving it as part of providing liquidity)

This is because user balances are queried on the Standard Yield (SY) contract, which treats all YT of a given type as identical. This has important implications for ecosystem projects: any attempt to classify users or distribute rewards based on how they acquired their YT is not feasible, as the on-chain data does not preserve this history.

### 1.2.3. Liquidity Provider (LP) Tokens

A standard Pendle liquidity pool is a two-token pool that facilitates the trading of PT against its underlying asset. For example, a pool for a tokenized liquid staking asset might contain:

1. **The Principal Token (PT)**, e.g., PT-stETH.
2. **The Underlying Asset**, e.g., stETH.

By pairing PT with its underlying asset, the AMM can determine a market price for PT, which in turn implies a market-driven yield. LPs deposit these two assets in a specific ratio to receive LP tokens, which represent their share of the pool.

Users can provide liquidity to Pendle’s Automated Market Maker (AMM) by pairing SY tokens with their corresponding PTs. In return, they receive LP tokens, which represent their share of the liquidity pool.

- **Composition:** A Pendle LP token represents a position in a pool composed of SY and PT. The ratio of SY to PT in the pool is dynamic and changes with every trade, similar to a standard Uniswap V2 pool.
- **Earning Multiple Yields:** LPs earn returns from several sources simultaneously:
    1. **Swap Fees:** A portion of the fees from every trade that occurs in the pool.
    2. **PENDLE Incentives:** Rewards from PENDLE emissions, directed by vePENDLE voters.
    3. **Underlying Yield/Points:** From the SY portion of their LP position.
    4. **Fixed Yield:** An implicit yield from the PT portion of their LP position.
- **Impermanent Loss:** Pendle’s AMM design significantly minimizes Impermanent Loss (IL). If held to maturity, IL is zero. Early withdrawals may incur minimal IL. (See section 3.2 for details).
- **Use as Collateral:** Recently, Pendle has introduced LP wrappers, enabling LP tokens to be used as collateral in money markets while still accruing PENDLE rewards and off-chain points.

### 1.2.4. The Fundamental Pricing Relationship

The relationship between PT, YT, and the underlying asset is a cornerstone of the Pendle ecosystem. The value of these tokens is intrinsically linked by the following formula:

**1 PT + 1 YT = 1 Underlying Asset**

This equation holds true in terms of value. It’s crucial to note that for most Liquid Restaking Tokens (LRTs), the “Underlying Asset” in this context is the LRT itself (e.g., `eETH`), not its base asset (e.g., `ETH`). For example, `1 PT-weETH + 1 YT-weETH = 1 eETH`.

This relationship is fundamental for pricing and arbitrage within the protocol. It allows the AMM to facilitate swaps between all three components (SY, PT, and YT) even though the liquidity pool itself only contains PT and SY.

The fundamental relationship is that the value of the SY token is represented by the sum of its PT and YT components: `1 SY-Token = 1 PT + 1 YT`. Users can mint PT and YT from SY, or combine PT and YT to redeem the original SY at any time before maturity.

### 1.3. The Pendle AMM and Trading Dynamics

Pendle’s Automated Market Maker (AMM) is the engine that facilitates the trading of Principal Tokens (PT) and Yield Tokens (YT). This engine requires liquidity to function, which is supplied by users known as Liquidity Providers (LPs).

Pendle’s Automated Market Maker (AMM) is a highly specialized engine designed for trading interest rates, not just asset prices. Its architecture is fundamentally different from standard AMMs like Uniswap or Curve.

**Key Design Principles:**

- **Concentrated Liquidity on Yield:** The AMM concentrates liquidity within a pre-configured **yield range** (e.g., 5% to 40% APY), rather than a price range. This allows for extremely capital-efficient trading of yield, as liquidity is focused where it’s most likely to be used.
- **Dynamic Curve Tightening:** The AMM’s curve is aware of the time to maturity. As a pool approaches its expiry date, the AMM automatically tightens the curve, narrowing the effective trading range. This reflects the decreasing uncertainty of future yield and is a key factor in minimizing impermanent loss.
- **Immutable Range:** Once a pool is deployed, its configured yield range is immutable. This provides predictability but also introduces the risk of the market trading “out of range.”
- **Fee Calculation:** Unlike traditional AMMs that charge fees on the swap principal, Pendle’s AMM fee is calculated relative to the **yield** being traded. This means the fee is influenced by the time to maturity; a trade made one year before maturity will incur a significantly higher fee than the same size trade made one month before maturity.

When deploying a new market, it is mandatory to define a minimum and maximum implied APY. This range is typically determined by analyzing historical yield volatility, the performance of similar markets, and estimated APY from points campaigns, with a buffer added to accommodate market fluctuations.

The Pendle Automated Market Maker (AMM) is not a standard constant product (x*y=k) AMM. It is a highly specialized interest-rate AMM designed specifically for trading PT.

- **Pool Composition:** Each Pendle AMM pool consists of a pair of a specific **PT** and its corresponding **SY** (e.g., PT-ezETH and SY-ezETH). Liquidity providers supply liquidity in these two assets.
- **Concentrated Liquidity:** Similar to Uniswap V3, the Pendle AMM uses a concentrated liquidity model. However, instead of concentrating liquidity within a price range, it concentrates liquidity within a pre-configured **yield range** (or Implied APY range). This design makes trading within the expected yield boundaries highly efficient, with lower slippage for larger trades.
- **Immutability of Yield Range:** A critical feature of the AMM is that this configured yield range is **immutable** once the pool is deployed. If market dynamics cause the implied yield to trade outside of this configured range, the pool is considered “out of range,” and liquidity for one side of the pair is exhausted. This necessitates the deployment of a new pool with a wider range.
- **YT Swaps via Flash Swaps:** Since there is no direct YT liquidity pool, YT swaps are facilitated through an internal flash swap mechanism. When a user “sells” YT, the protocol essentially mints both PT and YT, then sells the PT on the AMM. Conversely, buying YT involves buying PT and combining it with SY to redeem the underlying, from which YT is then extracted. This complex interaction is abstracted away for the end-user through the Pendle Router.

To complement its AMM, Pendle has integrated a limit order book system, which is particularly crucial for providing deep liquidity and enabling efficient trading, especially for large order sizes.

- **Functionality:** Users can place off-chain limit orders to buy or sell PT and YT at specific prices. These orders are then matched against incoming market orders.
- **Hybrid Routing:** Pendle’s swap router is designed to intelligently source liquidity from both the AMM pool and the limit order book simultaneously. It automatically calculates the optimal path for any given trade, splitting the order between the two sources to minimize price impact and gas costs for the user.
- **Deep Liquidity:** The limit order system is a key source of deep liquidity, especially in popular markets. It allows market makers and large traders to provide liquidity without being subject to the path-dependent nature of AMM LPs.
- **Gas and Fees:** For limit orders, the **taker** of the order pays both the gas fee and the swap fee. The **maker** of the order does not incur these costs.
- **Chain Availability:** As of recent updates, the limit order feature is primarily available on the Arbitrum network. Its availability on other chains may vary.

### 1.4. Governance, Incentives, and Fees (vePENDLE)

`vePENDLE` (vote-escrowed PENDLE) is the governance token of the Pendle ecosystem. It is obtained by locking `PENDLE` tokens for a period of up to two years. The amount of `vePENDLE` received is proportional to the amount of `PENDLE` locked and the duration of the lock.

**Key Functions of vePENDLE:**

- **Voting:** `vePENDLE` holders can vote on which liquidity pools receive `PENDLE` emissions for the upcoming epoch. This voting power is a central driver of the protocol’s incentive structure.
- **Yield Boosting:** Holding `vePENDLE` allows liquidity providers to boost their `PENDLE` rewards and points-based rewards by up to **2.5x**. The boost is calculated based on the user’s share of the total `vePENDLE` supply relative to their share of the liquidity pool. A user with no `vePENDLE` defaults to a 0.4x effective share, while a max-boosted user achieves a 1.0x effective share.
- **Fee-Sharing:** `vePENDLE` holders are entitled to a share of the protocol’s revenue. This includes 100% of the 5% fee collected from YT yields and points, as well as yield from unredeemed, matured PTs.
- **Voter’s APY:** Voters also receive 80% of the swap fees generated by the pools they vote for.

**Important Characteristics:**

- **Non-Transferable:** `vePENDLE` locks are non-transferable.
- **No Delegation:** Native delegation of `vePENDLE` voting power is not supported. To receive a boost, the same address that holds `vePENDLE` must also provide the liquidity. However, third-party protocols like liquid lockers have emerged to facilitate bribe-based voting.

Pendle distributes a fixed amount of `PENDLE` tokens each week as incentives to liquidity providers. As of late 2024, this amount is approximately 160,000 PENDLE per week.

- **Emission Control:** The total weekly emission amount is determined by the Pendle team. This amount is subject to a decay schedule, decreasing by 1.1% each week until April 2026, after which a 2% terminal inflation rate will apply.
- **Distribution Mechanism:** The distribution of these emissions to specific pools is entirely controlled by the votes of `vePENDLE` holders. Pools with more votes receive a larger share of the weekly `PENDLE` rewards.
- **Voting Epochs:** The voting cycle, or epoch, runs weekly, starting and ending every **Thursday at 00:00 UTC**. Votes cast in one epoch determine the incentive distribution for the following epoch.

Since `vePENDLE` does not support native delegation, an ecosystem of third-party “liquid locker” and “bribe market” protocols has emerged. Platforms like **Penpie**, **Equilibria**, and **Hidden Hand** allow projects and users to offer bribes to influence `vePENDLE` voters.

- **Process:**
    1. A project wanting to attract liquidity to its Pendle pool can post a bribe (e.g., in their native token) on one of these platforms.
    2. `vePENDLE` holders (or holders of the liquid locker’s derivative token, like `vlPNP`) can then vote for that project’s pool.
    3. In return for their vote, they receive a share of the bribe.
- **Bribe Efficiency:** This system has proven highly effective. Bribe efficiency, measured as the dollar value of `PENDLE` incentives directed per dollar of bribe, can often exceed 1x (e.g., an efficiency of 3x means $1 in bribes directs $3 of PENDLE emissions). This makes bribing a capital-efficient way for projects to bootstrap liquidity and attract attention.

Pendle generates revenue through a multi-faceted fee structure, with proceeds primarily distributed to `vePENDLE` holders.

- **Swap Fees:** The AMM charges a fee on trades, which is calculated based on the yield being traded, not the principal amount.
    - **Distribution:** 80% of swap fees from a pool are distributed to the `vePENDLE` holders who voted for that pool. The remaining 20% is retained by the liquidity providers in the pool.
- **YT Fee:** A **5% fee** is levied on all yield accrued by Yield Tokens (YT). This includes both on-chain yield and off-chain points. This fee was increased from 3% effective May 2, 2025.
    - **Distribution:** 100% of this fee is distributed to all `vePENDLE` holders.
- **Matured PT Fee:** When a PT matures, any underlying yield that accrues on unredeemed principal is collected by the protocol.
    - **Distribution:** This collected yield is also distributed to all `vePENDLE` holders.
- **Distribution Cycle:** Fee distributions to `vePENDLE` holders occur approximately once a month. The process is manual to optimize for gas efficiency and involves liquidating collected fees into a single currency (recently changed from ETH to USDT) before distribution.

### 1.5. Points, Airdrops, and External Rewards

With the rise of points-based campaigns from protocols like EigenLayer and Ethena, Pendle has established a standard framework for distributing these off-chain rewards to its users.

- **Eligible Positions:** Points are allocated to users holding positions that have exposure to the underlying yield. This includes:
    - **Yield Token (YT) holders:** YTs receive the full share of points corresponding to one unit of the underlying asset.
    - **Liquidity Provider (LP) token holders:** LPs receive points proportional to the **SY portion** of their LP position. The PT portion does not earn points.
    - **Liquid Locker receipt token holders:** Users who deposit their LP tokens into liquid lockers (e.g., Penpie, Equilibria) are also eligible, as their underlying position is still an LP token.
- **Tracking Mechanism:** Pendle provides a generic balance-fetching script (`pendle-generic-balance-fetcher`) that partner protocols can use. This script takes a snapshot of all eligible user balances (YT, LP, and liquid locker positions) at a specific block, resolving them into their equivalent underlying asset shares. The partner protocol is then responsible for using this data to allocate points.
- **Treasury Fee:** Pendle’s standard 5% YT fee applies to points as well. This means 5% of all points generated by YT positions are allocated to the Pendle treasury.

The `vePENDLE` boosting mechanism extends to off-chain points rewards, creating an additional layer of incentive for LPs.

- **Boost Application:** The up-to-2.5x boost applies to the points earned by the **SY portion of an LP position**. It does not apply to points earned by holding YT.
- **`activeBalance` Calculation:** The boost is factored in through the `activeBalance` metric. A user’s share of points is calculated based on their `activeBalance` relative to the pool’s `totalActiveSupply`. Users with a `vePENDLE` boost will have a higher `activeBalance` than their raw LP balance, thus earning a larger share of the points distributed to the LP pool.
- **Zero-Sum Game:** It’s important to note that boosting is a zero-sum redistribution of rewards within the LP pool. Boosting one user’s share means other, non-boosted LPs in the same pool receive a comparatively smaller share of the total points allocated to the pool’s SY component.

Pendle’s architecture is designed to be compatible with various external reward distribution platforms, most notably Merkl.

- **Merkl Integration:** For campaigns that use Merkl to distribute rewards (e.g., Aave’s Merit program for GHO), Pendle enables its users to claim their rewards directly from the Merkl UI. Pendle’s SY contract can be configured to claim rewards from Merkl and then make them available for distribution to the end-users.
- **Direct Airdrops:** In other cases, rewards may be distributed via a direct airdrop. Pendle can assist partners by providing the necessary user balance data to facilitate these airdrops. For rewards sent to liquid locker contracts, the liquid locker protocol is responsible for the final distribution to its users.
- **Claiming on Pendle Dashboard:** For certain campaigns, such as the Arbitrum STIP, rewards are made claimable directly on a dedicated dashboard within the Pendle app. These distributions are typically done periodically (e.g., bi-weekly or monthly) via a Merkle tree.

An important and often misunderstood aspect of Pendle is how rewards are handled after a pool’s maturity date.

- **YT Holders:** At maturity, YTs become worthless and stop accruing new yield or points. However, any rewards accrued *before* maturity remain claimable.
- **Unredeemed PTs and LPs:** If a user does not redeem their PT or LP position after maturity, the underlying asset remains in the SY contract. This underlying asset **continues to accrue yield and points**.
- **Redirection to Treasury:** However, all points and yield generated by these unredeemed, matured positions are automatically redirected to the **Pendle treasury fee wallet**. This serves as an incentive for users to promptly redeem their matured assets and roll them over into new pools, ensuring capital remains active and productive within the ecosystem.

### 1.6. New Products and Features

To solve the challenge of using LP tokens as collateral without losing rewards, Pendle developed the LP Wrapper.

- **Problem:** Previously, when a user deposited their Pendle LP token into a money market, the money market contract became the owner of the LP token. This meant the original user could no longer claim their PENDLE rewards or be tracked for off-chain points.
- **Solution:** The LP Wrapper is an ERC20 token that wraps the underlying LP position on a 1:1 basis. This wrapper is then used as the collateral. Pendle’s backend systems are designed to recognize these wrapped positions and correctly redirect all associated on-chain PENDLE rewards and off-chain points back to the original user.
- **Impact:** This innovation unlocks the ability for users to perform leveraged LP looping strategies and other complex DeFi interactions, significantly increasing the utility and composability of Pendle LP tokens. The feature was piloted with Ethena LPs and is being expanded.

Cross-chain Principal Tokens (PTs).

- **Goal:** The primary goal is to expand the reach of Pendle’s PTs to new blockchain networks where Pendle may not have a full deployment. This allows users on other chains to access the fixed-yield products and use PTs as collateral, while concentrating the deep trading liquidity on a mainnet like Ethereum.
- **Mechanism:** The high-level idea involves allowing users to ‘zap in’ to a PT position on a mainnet pool, and then bridge the PT to a destination chain (e.g., Avalanche, HyperEVM). On the destination chain, the user can then use this cross-chain PT as collateral in local money markets.
- **Liquidation and Exits:** The system is designed to handle liquidations and exits without relying on DEX liquidity on the destination chain. Instead, the underlying asset would be converted and bridged back from the mainnet, ensuring a robust exit path. This project is in active development, with initial pilots planned in collaboration with partners like Ethena.

## 2. System and Smart Contract Architecture

### 2.2. Smart Contract Design and Evolution

Pendle’s architecture has evolved significantly to enhance security, gas efficiency, and functionality. This section details the key architectural components, their purpose, and their development over time.

### 2.2.1. The Pendle Router: A Diamond Proxy Approach

The `PendleRouter` is the primary entry point for most user interactions with the protocol, such as swaps and liquidity management.

The Pendle Router is implemented using the **EIP-2535 Diamond Standard**. This is a proxy contract pattern that allows a single contract address to delegate function calls to multiple underlying implementation contracts, known as “facets.”

- **Benefits:** This architecture allows for gas-efficient upgrades and the addition of new functionality without changing the main router address that users and other contracts interact with. It also helps circumvent the contract size limit on the EVM.
- **Interaction Challenges:** A notable consequence of this design is that block explorers like Etherscan often cannot correctly display all the functions available on the router. They typically only show the ABI of the base proxy contract, not the aggregated functions from all its facets. To interact with the full range of router functions, developers need the complete, combined ABI, which can be found in the Pendle public repositories (e.g., `IPAllActionV3.sol`).

Pendle’s router has undergone several iterations, each introducing new features and optimizations.

- **RouterV2:** An early version of the router. As of early 2024, it was noted that for newer markets, a necessary approval step was not being called, causing some operational issues. On networks like Mantle, RouterV2 is not supported, and attempts to use it will revert.
- **RouterV3:** Introduced additional features, including support for Limit Orders. It is fully backward compatible with RouterV2.
- **RouterV4:** The latest and recommended version, deployed in early May 2024.
    - **Backward Compatibility:** RouterV4 is fully backward compatible with RouterV3. Migration for existing integrations simply requires updating the contract address to the new V4 address: `0x888888888889758F76e7103c6CbF23ABbF58F946`.
    - **Key Improvements:** The primary goals of RouterV4 are to enhance the reliability of limit order matching in high-traffic environments and to lay the groundwork for future features like “Auto Roll-over” for matured markets and “Smart Exit All” for optimized liquidity removal.
    - **Recommendation:** While older router versions (V2, V3) remain functional, upgrading to RouterV4 is highly recommended to leverage the latest optimizations and ensure future compatibility.

### 2.2.2. Contract Factories

Pendle utilizes a factory pattern for deploying new markets, PTs, and YTs. This standardizes the creation process and provides a single source of truth for identifying valid protocol components.

Factories are smart contracts responsible for deploying other contracts. In Pendle, there are distinct factories for markets (`MarketFactory`) and for yield contracts (`YieldContractFactory`, which creates PT and YT). This architecture allows for permissionless creation of pools, although only pools whitelisted on the Pendle UI are considered “official.”

The factory contracts have also evolved over time, with new versions being deployed to introduce improvements and address security concerns.

- **Early Versions (pre-V3):** Older factories were used for initial deployments.
- **FactoryV3:** Introduced in late 2023, `PendleYieldContractFactoryV3` and `PendleMarketFactoryV3` became the standard for all new deployments across all chains.
- **FactoryV4 & V5:** Deployed in mid-2024, these newer versions introduced a significant security enhancement.
- **Removal of `Permit` (EIP-2612):** A critical change introduced with the V4/V5 factories was the **complete removal of `Permit` functionality** from all newly created PT, YT, and LP tokens. The `Permit` function, which allows for gasless approvals via off-chain signatures, was identified as a significant vector for phishing attacks. To mitigate this risk, all tokens created by the new factories no longer support it. This was a major security-driven architectural change.
- **Current Recommendation:** As of late 2025, developers must use the latest factory versions (V6) for all new market deployments. Using deprecated factories can lead to issues, including improper contract verification.

### 2.2.3. Immutability vs. Upgradability

The trade-off between immutability (for security and predictability) and upgradability (for flexibility and bug fixes) is a key architectural consideration in Pendle.

As a core design principle, **Pendle market contracts are immutable once deployed**. This means their fundamental parameters, most notably the **concentrated yield range**, cannot be changed.

- **Rationale:** This immutability provides greater price certainty and allows the AMM to be highly efficient, enabling larger trade volumes with less slippage.
- **Implications:** If a pool’s parameters need to be changed (e.g., the yield range is too narrow and the pool goes “out of range”), a **brand new market contract must be deployed**, and liquidity providers must manually migrate their funds to the new pool.

While markets are immutable, other components have been designed with upgradability in mind to provide flexibility.

- **SY Contracts:** Most newer SY contracts are deployed as **upgradable proxies**. This allows for future enhancements, such as adding support for new deposit assets or adjusting cap mechanisms, without requiring a full market migration. When an external team develops an SY, it is recommended to deploy it as an upgradeable contract using Pendle’s proxy admin and transfer ownership of the SY to Pendle’s pause controller.

### 2.4. Cross-Chain Architecture

Pendle’s multi-chain strategy has led to the integration of several cross-chain messaging and bridging solutions over time. The choice of provider has evolved based on strategic needs, security assessments, and ecosystem support.

### Cross-Chain Principal Tokens (PT)

A recent and significant development is the introduction of cross-chain PTs. This functionality allows PTs to be bridged and used on other networks. The initial implementation of this feature utilizes **LayerZero’s Omnichain Fungible Token (OFT)** standard, a choice influenced by the fact that key assets like USDe are natively available via LayerZero. The first pilot for cross-chain PTs focuses on sUSDe/USDe, with the goal of having them supported as collateral on money markets like Morpho.

## 3. Developer Integration Guide

This document provides a comprehensive guide for developers integrating with Pendle Protocol’s APIs and smart contracts. It covers a wide range of topics, from querying market data and generating transactions to understanding advanced concepts like oracles and points tracking. The information is synthesized from technical discussions and is structured to reflect the most current and recommended practices.

### 3.1. Getting Started: API vs. Direct Smart Contract Interaction

The Pendle API is a powerful, off-chain data service designed to provide developers with easy access to aggregated, real-time, and historical data from the Pendle Protocol. It serves as a crucial middleware layer, sitting between the blockchain (where the Pendle smart contracts reside) and client-side applications (such as web interfaces, mobile apps, or data analysis scripts).

By offering a standardized and efficient method for data retrieval, the API abstracts away the significant complexities associated with directly querying and interpreting data from decentralized smart contracts. This allows developers to focus on building user-facing features and unique applications rather than managing complex blockchain data infrastructure.

Interacting directly with smart contracts on a blockchain for data retrieval presents several fundamental challenges:

1. **Data Fragmentation:** Information is often spread across multiple smart contracts. For example, a user’s complete portfolio might involve balances in various market contracts, liquidity pool contracts, and staking contracts. Querying each of these individually is inefficient.
2. **Lack of Historical Context:** Smart contracts primarily reflect the *current state* of the system. Retrieving historical data, such as past transaction histories or APY fluctuations, requires indexing and processing blockchain events over time, a task that is computationally intensive and requires specialized infrastructure.
3. **Computational Overhead:** Some data points, like implied APYs or detailed analytics, are not stored directly on-chain. They must be calculated based on multiple on-chain variables. Performing these calculations on the client-side can be complex and error-prone.

The Pendle API is engineered to solve these problems by performing the heavy lifting of data aggregation, indexing, and computation on the backend, delivering clean, structured, and ready-to-use data through simple HTTP requests.

Developers have a choice when building on top of a DeFi protocol: interact directly with the smart contracts or use a managed API. Understanding the trade-offs is key to making the right architectural decision.

**Challenges of Direct On-Chain Data Retrieval**

- **Complexity:** Requires deep expertise in the protocol’s smart contract architecture and the ability to decode contract storage and event logs.
- **High Latency:** Aggregating data from multiple contracts (e.g., for a user portfolio) involves sequential on-chain calls, which can be slow and result in a poor user experience.
- **Infrastructure Overhead:** Demands running and maintaining dedicated blockchain nodes and indexing services, which is both costly and resource-intensive.
- **Limited Scope:** Provides only the current state, making historical analysis or trend calculation extremely difficult without a separate indexing layer.

**Advantages of the API-Driven Approach**

- **Simplicity and Speed:** A simple REST call replaces dozens of complex on-chain queries. The API’s backend is optimized for fast data retrieval.
- **Rich, Computed Data:** The API provides not just raw on-chain data but also valuable computed metrics like implied APYs, historical performance, and aggregated TVL that are not stored on-chain.
- **Zero Infrastructure Burden:** Developers can leverage Pendle’s managed infrastructure, eliminating the need to run their own nodes or indexers.
- **Reliability and Maintainability:** The API provides a stable interface. Even if the underlying smart contracts are upgraded or changed, the API can maintain a consistent data structure, reducing the maintenance burden on integrator applications.

The primary trade-off is a degree of centralization. By using the API, an application places trust in the API provider to deliver accurate and timely data. For most use cases, especially user-facing applications, the benefits in development speed and user experience far outweigh this consideration.

### 3.2. Listing New Assets & Pools: The Community Listing Process

Pendle has evolved from an ad-hoc, team-managed listing process to a more structured, self-service “Community Listing” model. This empowers partners to deploy and manage their own markets.

**The Modern Listing Workflow:**
The entire process is managed through the official Pendle Listing Portal.

1. **Initiate Submission:** Start by accessing the listing portal at `https://listing.pendle.finance`. This requires registration with a wallet, email, or Discord, and linking a Telegram handle.
2. **Complete Checklists:** The portal guides you through a series of mandatory checklists. These documents are crucial for ensuring asset compatibility and security.
    - **Asset Launching Checklist:** Gathers fundamental information about the asset, its yield source, and desired market parameters (e.g., maturity, yield range).
    - **Security Checklist (ERC-4626 or Non-ERC-4626):** This is a critical step. For assets compliant with the **ERC-4626** standard, a specific checklist must be completed and confirmed by the asset’s auditors. For non-compliant assets (most assets on Pendle), a different checklist must be filled out.
    - **Token Pricing & Metadata Checklists:** Provide details for displaying the asset correctly on the Pendle UI.
3. **Develop the SY Token (If Necessary):** For most non-ERC4626 assets, a custom **Standardized Yield (SY)** contract must be written. This is a wrapper that makes the underlying yield-bearing asset compatible with Pendle’s AMM. Pendle provides extensive documentation and over 150 reference implementations in the `Pendle-SY-Public` GitHub repository.
4. **Deploy the Market:** Once the checklists are approved, partners can use the `Pendle-Common-Pool-Deploy` repository (`https://github.com/pendle-finance/Pendle-Common-Pool-Deploy`) to deploy the SY and the market contracts themselves.
5. **Sign Risk Acknowledgment:** Before deployment, the deploying entity must sign a message on-chain (e.g., via Etherscan’s verified signatures page) acknowledging they assume all inherent risks for security vulnerabilities originating from their own contracts.
6. **Seed Liquidity:** After deployment, the partner is responsible for bootstrapping the pool with initial liquidity.
7. **Finalize with Pendle:** Once seeded, the Pendle team handles the final steps: setting up backend metadata and pricing, and whitelisting the pool on the UI and for vePENDLE voting.

Pendle has a streamlined process for community-led asset listings.

- **Pendle Community Listing Portal**: A dedicated portal, accessible via an invite link, guides users through the process. The portal is hosted on Charmverse.
- **Checklists**: The portal provides different checklists for different asset types. For example, there is a “Non-ERC4626 checklist” for assets that require a custom SY wrapper.
- **Admin Portal Access**: Upon successful listing, protocols can be granted access to a Pool Admin Portal to manage their market’s metadata.

### 3.3. Developing SY Tokens and Adapters

The **Standardized Yield (SY)** token is the cornerstone of Pendle’s architecture. It is a wrapper contract that conforms to the **EIP-5115** standard, abstracting away the complexities of different yield-bearing tokens into a unified interface that the Pendle AMM can understand.

**Key Functions of SY:**
* **Yield Standardization:** It normalizes various yield mechanisms (rebasing, repricing, etc.) into a consistent format.
* **Minting & Redemption:** The SY contract handles the logic for minting SY from the underlying asset and redeeming SY back to the underlying asset.
* **Exchange Rate Oracle:** It provides a function to read the exchange rate between the SY token and its underlying asset.

**Integration Requirements for SY:**
For an asset to be wrapped in an SY token, it must generally meet these criteria:
* **Transferability:** The asset must be a fully transferable ERC20 token.
* **No Vesting/Locks:** There should be no locking or vesting periods associated with minting the asset (e.g., staking ETH to get an LST).
* **“Up-Only” Yield:** The yield generated by the asset should not go negative. For assets with potential negative yield, special mechanisms like an insurance fund or separate reward distribution via Merkle tree are required.

For assets that are not standard ERC-4626 vaults or have unique yield mechanisms, a **custom SY contract** must be developed.

- **Purpose:** The custom SY acts as an adapter, wrapping the non-standard asset and exposing the functions required by the Pendle protocol. This allows for the integration of a wide variety of yield-bearing tokens, including those with rebasing mechanics or complex reward distributions.
- **Development and Auditing:** Pendle encourages external teams to write their own SY contracts to expedite listings. A comprehensive guide and public repository with examples (`Pendle-SY-Public`) are provided. **All custom SY contracts must be audited.** Pendle can recommend and facilitate an audit with their retained auditors (e.g., WatchPug) who have extensive experience with SY contracts.
- **Upgradability:** It is highly recommended to deploy custom SY contracts as **upgradable proxies**, using Pendle’s designated proxy admin. This allows for future modifications without requiring a full market migration.

For an optimal user experience, Pendle strongly encourages the implementation of an **SY adapter**. This optional contract enhances the zapping process by enabling native minting and redemption.
* **Functionality:** An adapter allows the Pendle Router to mint the underlying asset directly from a base token (e.g., minting `yUSD` from `USDC`) instead of relying on a DEX swap. This avoids price impact and fees for the user. An adapter is a separate contract that can be “plugged into” an existing SY contract after deployment by calling `SY.setAdapter()`. Its primary purpose is to handle the logic for native minting and redeeming of the underlying asset, especially for complex swaps (e.g., USDC -> USDe -> SY-USDe).
* **Implementation:** Partners are responsible for writing and testing their own adapters. A comprehensive guide, “How to write a SY adapter,” is available in Pendle’s documentation. A SY adapter must implement four key functions: `convertToDeposit`, `convertToRedeem`, `previewConvertToDeposit`, and `previewConvertToRedeem`.

### 3.4. Interacting with the Pendle Router & SDK

The Pendle Router is the primary smart contract for user interactions, batching multiple actions into a single transaction. For developers, the **Pendle Hosted SDK** is the recommended tool for programmatic interaction.

**Pendle Router (V4):**
* **Functionality:** The router acts as a wrapper and code-batcher, simplifying interactions with various underlying components like the AMM and SY contracts.
* **Backward Compatibility:** The latest version, **RouterV4**, is fully backward compatible with V3. Migration only requires updating the contract address. Older versions remain functional, but upgrading is recommended for optimizations.
* **Direct Interaction:** While the SDK is recommended, developers can interact with the router directly. The full interfaces, including for `IPRouterStatic`, are available in the `pendle-core-v2-public` repository.

**Pendle Hosted SDK:**
* **Purpose:** The SDK is designed to abstract away the complexity of calculating parameters for router functions. It is the recommended method for generating calldata, especially for complex structs like `ApproxParams`, `TokenInput`, and `SwapData`.
* **Statelessness:** The SDK Router instance is stateless. If the web3 provider or chain changes, the instance must be re-instantiated to load the correct contract addresses for the new chain.
* **Limitations:** The SDK operates on a per-market basis and does not currently offer a function for discovering all available markets for a given SY token. Developers should refer to the Pendle UI for market discovery.
* **Access & Documentation:** The Hosted SDK is available at `https://api-v2.pendle.finance/core/docs`. A migration guide for moving to the latest version is available in the `pendle-examples-public` repository.

**Programmatic Price Queries:**
While the backend API is the easiest way to get price data, on-chain queries are also possible:
* **PT/SY Exchange Rate:** A common method is to use `ethers.js callStatic` to simulate a swap on the AMM contract (e.g., `swapExactSyForPt(1, 0)`) and extrapolate the rate from the result.
* **PT Discount APR:** This can be queried by calling the `getMarketState` function on the `RouterStatic` contract.
* **PT/SY Rate from Oracle:** The `getPtToSyRate()` function can be called directly on the Pendle oracle contract. For gas-efficient contract-level calls, use the `PendlePYOracleLib.sol` library.

### 3.5. Integrating Pendle Assets as Collateral

Pendle’s Principal Tokens (PT) and LP tokens can be used as collateral in external money markets (e.g., Morpho, Silo, Euler), unlocking advanced yield strategies like looping.

### Integrating Principal Tokens (PT) as Collateral

- **Core Component (PT Oracle):** The integration hinges on the **Pendle PT Oracle**, which provides a reliable on-chain price for the PT relative to its underlying asset. Pendle offers a factory to create linear discount oracles, simplifying setup. For assets with de-pegging risk, the Pendle Market oracle (based on AMM price) can be used instead.
- **Documentation:** Comprehensive documentation is available for developers:
    - Introduction to the PT Oracle: `https://docs.pendle.finance/Developers/Integration/IntroductionOfPtOracle`
    - Using PT as Collateral: `https://docs.pendle.finance/Developers/Integration/PTAsCollateral`
- **Liquidation:** Integrators are responsible for building and running their own liquidation bots. The `BoringPtSeller.sol` contract in Pendle’s public repositories serves as a reference implementation for selling PT during a liquidation.

### Integrating LP Tokens as Collateral

- **LP Wrapper Contract:** To simplify integration, Pendle provides a **wrapper contract** for each LP token. This wrapper is a fully ERC20-compatible token representing a 1-to-1 share of the underlying LP token.
- **Simplified Integration:**
    - **Pricing:** Integrators can simply price the wrapper token by pricing the underlying LP token. Pendle’s built-in LP oracle can be used for this.
    - **Wrap/Unwrap:** Pendle handles the wrap/unwrap logic on its side, so integrators do not need to implement these functions.
    - **Liquidation:** During liquidation, the integrator only needs to call the `unwrap` function on the wrapper contract before proceeding to remove liquidity from the underlying LP position.
- **Reward Handling:** A key challenge with using LPs as collateral is that rewards (PENDLE, points, etc.) can get stuck in the money market’s collateral contract. Pendle is actively developing its LP wrapper to include functionality for automatically retrieving and re-distributing these rewards to the end-user.

### 3.6. Points & Rewards Tracking Integration

The rise of points-based reward systems and Liquid Restaking Tokens (LRTs) has made accurate, off-chain tracking a critical integration area. Pendle provides standardized tools to help partners manage this complexity.

**The Standard Tracking Mechanism:**
The recommended approach for tracking points (e.g., EigenLayer points, Kelp Miles, Ethena Sats) is to use the **`pendle-generic-balance-fetcher`** script.

- **Core Functionality:** This script returns a user’s balance snapshot at a specific block height. The output is a mapping of `user_address => implied_yield_share`, representing each user’s proportional share of the underlying asset held in the SY contract.
- **Comprehensive Calculation:** The script is designed to handle all of Pendle’s internal nuances, ensuring fair allocation. This includes:
    - **vePENDLE Boosting:** Correctly applies the yield boost (up to 2.5x) for users holding vePENDLE.
    - **YT Fee:** Accounts for the **5% fee** applied to YT yields (updated from 3% as of May 2, 2025), which is allocated to vePENDLE holders.
    - **Liquid Lockers:** Integrates with APIs from protocols like Penpie and Equilibria to track end-user balances held within their liquid locker contracts.
    - **Post-Expiry Handling:** Correctly attributes points for expired but unredeemed positions.
- **Partner Responsibility:** The partner protocol is responsible for running this script, using the output to calculate the pro-rata distribution of points, and displaying it on their own dashboard. Pendle does not handle the final distribution of partner points.

## 4. API Reference and Usage

This document provides a comprehensive overview of the Pendle Protocol’s Application Programming Interface (API). It is designed for developers, integrators, and technical users who wish to build applications, dashboards, or services that interact with the Pendle ecosystem. The guide covers the API’s core purpose, the types of data it provides, and best practices for integration.

**The single source of truth for modern Pendle integration is the new Hosted SDK, with documentation available at `https://api-v2.pendle.finance/core/docs`.**

### 4.1. Querying Pendle Data

The Pendle API provides a rich set of endpoints for querying on-chain and indexed data, forming the foundation of most integrations. The API exposes a rich dataset covering nearly all aspects of the Pendle Protocol. The data can be broadly categorized into market-level information and user-specific information.

### 4.1.1. Market and Asset Data

The API serves as the canonical source for discovering and analyzing all active and expired markets within the Pendle ecosystem. This is data that is not available in a simple, aggregated list directly on-chain. For each market, the API can provide detailed information, including:

- **A comprehensive list of all active markets and their associated vaults (SY tokens).**
- **Core Asset Details:** The underlying yield-bearing asset, its associated SY (Standardized Yield) token, and the maturity date of the market.
- **Real-Time Financial Metrics:** Current prices for the Principal Token (PT) and Yield Token (YT), implied yield rates, and underlying asset APYs.
- **Liquidity and Volume Data:** Total value locked (TVL) in the market, available liquidity, and recent trading volumes.

To retrieve a list of all active, launched markets on a given chain, use the `getActiveMarkets` endpoint. This is the primary method for discovering pools programmatically.

- **Documentation**: [`https://api-v2.pendle.finance/core/docs#tag/markets/get/v1/markets/all`](https://api-v2.pendle.finance/core/docs#tag/markets/get/v1/markets/all)

This endpoint is crucial for applications that need to display a list of available pools to users. It returns an array of market objects, each containing vital information such as the addresses for PT, YT, and SY tokens, maturity dates, and underlying assets.

To get in-depth, real-time data for a single market, you can query it directly by its address.

- **Documentation**: [`https://api-v2.pendle.finance/core/docs#tag/markets/get/v2/{chainId}/markets/{address}/data`](https://api-v2.pendle.finance/core/docs#tag/markets/get/v2/%7BchainId%7D/markets/%7Baddress%7D/data)

This endpoint is a powerhouse of information, providing:
* **Liquidity**: TVL in USD (`liquidity.usd`).
* **APYs**: A full breakdown including `underlyingApy`, `impliedApy` (the fixed rate for PT), and more.
* **Supply Caps**: `sySupplyCap` and `syCurrentSupply` to monitor pool capacity.
* **Token Details**: Addresses and metadata for all associated tokens.

To get a comprehensive list of all tokens within the Pendle ecosystem (including PT, YT, SY, and underlying assets), use the `getAllAssets` endpoint.

- **Endpoint**: [`https://api-v2.pendle.finance/core/docs#tag/assets/get/v1/assets/all`](https://api-v2.pendle.finance/core/docs#tag/assets/get/v1/assets/all)
- **Filtering**: You can filter for specific token types by checking the `baseType` field in the response (e.g., `baseType: 'PT'`).
- **Icons**: The `proIcon` field is used for displaying token icons in a trading UI.

### 4.1.2. User Position and Balance Data

One of the most powerful features of the API is its ability to aggregate all positions for a specific user address across the entire protocol. A “position” can refer to various types of holdings:

- **Principal Tokens (PT):** Holdings of PTs across different markets.
- **Yield Tokens (YT):** Holdings of YTs, representing claims on future yield.
- **Liquidity Positions (LP):** Balances of LP tokens from providing liquidity to various Pendle markets.
- **Staked Assets:** Information related to staked PENDLE (vePENDLE) or other staked assets within the ecosystem.

To gather this information manually, a developer would need to execute multiple, separate read calls to numerous smart contracts. The API consolidates this into a single, efficient query, returning a structured object that represents a user’s complete portfolio within Pendle. This is invaluable for portfolio trackers, dApp frontends, and any application that needs to display a holistic view of a user’s assets.

`https://api-v2.pendle.finance/core/docs#/Statistics/StatisticsController_getDistinctUserFromToken`The API offers several ways to get user balance and position data.
* **All Positions**: [`https://api-v2.pendle.finance/core/docs#tag/dashboard/get/v1/dashboard/positions/database/{user}`](https://api-v2.pendle.finance/core/docs#tag/dashboard/get/v1/dashboard/positions/database/%7Buser%7D)  retrieves all PT, YT, LP, and SY positions for a user. Note this API has a slight delay (around 3 minute).
* **Distinct Users**: [`https://api-v2.pendle.finance/core/docs#tag/statistics/get/v1/statistics/get-distinct-user-from-token`](https://api-v2.pendle.finance/core/docs#tag/statistics/get/v1/statistics/get-distinct-user-from-token) returns a list of all addresses that have ever held a specific token (PT, YT, LP, or SY). This list is cumulative and only grows over time.
* **Balance Snapshots**: The `pendle-generic-balance-fetcher` [https://github.com/Pendle-Finance-Periphery/pendle-generic-balance-fetcher](https://github.com/Pendle-Finance-Periphery/pendle-generic-balance-fetcher)repository contains a script with functions like `fetchUserBalanceSnapshot` and `fetchUserBalanceSnapshotBatch` to query user balances at specific historical blocks. This is highly efficient as it can query multiple blocks in a single API call to Pendle’s backend. to query user balances at specific historical blocks. This is highly efficient as it can query multiple blocks in a single API call to Pendle’s backend.

### 4.1.3. Historical Data (OHLCV, APY, TVL)

Pendle provides a robust endpoint for fetching historical Open-High-Low-Close-Volume (OHLCV) data for any Pendle token (PT, YT, LP). This is invaluable for charting, backtesting, and analysis.

- **Documentation**: [`https://api-v2.pendle.finance/core/docs#tag/assets/get/v4/{chainId}/prices/{address}/ohlcv`](https://api-v2.pendle.finance/core/docs#tag/assets/get/v4/%7BchainId%7D/prices/%7Baddress%7D/ohlcv)
- **Parameters**:
    - `time_frame`: Can be set to `'hour'`, `'day'`, or `'week'`.
    - `timestamp_start` / `timestamp_end`: ISO 8601 format in UTC (e.g., `2025-03-28T02:57:44.575Z`).
- **Output**: The endpoint conveniently returns data in CSV format.

To track the history of a market’s APY and other state variables, use the following endpoint

- **APY History Endpoint**: [`https://api-v2.pendle.finance/core/docs#tag/markets/get/v2/{chainId}/markets/{address}/historical-data`](https://api-v2.pendle.finance/core/docs#tag/markets/get/v2/%7BchainId%7D/markets/%7Baddress%7D/historical-data)

These endpoints are essential for understanding yield trends over time. The APY history endpoint returns trendlines, such as 7-day moving averages, which are displayed on the Pendle UI.

When querying historical data, it’s important to understand how the data is aggregated. The API endpoints typically return **closing values** for the requested `time_frame`. For example, if `time_frame=hour`, you will receive the closing values for each hour. All data points, including APY metrics, are generally **averaged values** over the period. Currently, there is no endpoint to return raw, non-averaged data points within a time frame.

### 4.1.4. Pricing, APY, and Yield Data

For real-time price data, Pendle offers an efficient endpoint that can fetch prices for multiple assets in a single call.

- **Endpoint**: [`https://api-v2.pendle.finance/core/docs#tag/assets/get/v1/prices/assets`](https://api-v2.pendle.finance/core/docs#tag/assets/get/v1/prices/assets)
- **Update Frequency**: This API refreshes prices approximately every 15-30 seconds.
- **Usage**: Pass a comma-separated list of token addresses to the `addresses` query parameter to get their current prices in USD.

For exact swapping prices at the moment of a trade, the `getMarketSpotSwappingPrice` ([https://api-v2.pendle.finance/core/docs#tag/sdk/get/v1/sdk/{chainId}/markets/{market}/swapping-prices](https://api-v2.pendle.finance/core/docs#tag/sdk/get/v1/sdk/%7BchainId%7D/markets/%7Bmarket%7D/swapping-prices)) SDK endpoint is more suitable, as it is designed for that specific use case and updates more frequently (every block).

The main `/markets` endpoints return a detailed structure of APY components. As of recent updates, these include:
* `underlyingApy`: The base yield from the underlying asset.
* `impliedApy`: The fixed yield for holding PT to maturity. This is the PT yield.
* `lpRewardApy`: APY from additional incentives for LPs (e.g., USUAL rewards).
* `swapFeeApy`: APY generated from trading fees in the pool.
* `pendleApy`: APY from PENDLE token emissions.
* `arbApy`: A specific field added to reflect APY from Arbitrum grant incentives. This field will be `null` if a market does not have ARB rewards.
* `aggregatedApy` / `maxBoostedApy`: The total APY for liquidity providers, which can include boosting effects.

The API will list every APY item, providing the same level of detail as the official website. The APY returned by the API is a direct value and does not need to be adjusted for conversions (e.g., to ETH).

The PT Yield for a market can be derived from the `impliedApy` field. To calculate the overall contribution of this fixed yield to the entire pool, you can use a formula that scales it by the proportion of PT in the pool’s liquidity: `(totalPt / (totalPt + totalSy)) * impliedApy`.

Pendle’s backend API is updated to incorporate additional yield sources from grants or partner protocols. Pendle often requests partner protocols to provide an API endpoint that returns the APY of their reward token (e.g., for FLUID, USUAL). This external APY is then integrated into the underlying APY displayed on Pendle’s UI, giving users a complete picture of their potential returns.

### 4.2. Transaction and Calldata Generation

The most significant evolution in Pendle integration has been the shift to a **Hosted SDK** for generating transaction calldata. This approach is now the standard and is strongly recommended over manual contract interaction or older client-side SDKs.

The Hosted SDK provides a set of RESTful API endpoints that return the exact `calldata` needed to execute complex Pendle operations. This is especially useful for zaps and swaps involving multiple steps and aggregators.

- **Primary Documentation**: the newer, recommended documentation is at `https://api-v2.pendle.finance/core/docs`.
- **Benefit**: Instead of constructing transactions yourself, you can simply call an API endpoint with your desired parameters (e.g., `tokenIn`, `amountIn`, `slippage`), and it will return the encoded data to be sent to the Pendle Router contract. This greatly simplifies integration.

The Hosted SDK covers all primary user actions on Pendle.

The API provides dedicated endpoints for all swap variations.
* **Swap Token for PT/YT**: `swapExactTokenForPt`, `swapExactTokenForYt`
* **Swap PT/YT for Token**: `swapExactPtForToken`, `swapExactYtForToken`
* **Swap SY for PT**: `swapExactSyForPt`
* **Universal Convert Function**: A `Convert` ([https://api-v2.pendle.finance/core/docs#tag/sdk/get/v2/sdk/{chainId}/convert](https://api-v2.pendle.finance/core/docs#tag/sdk/get/v2/sdk/%7BchainId%7D/convert)) endpoint is available to handle complex conversions, such as PT to an underlying token, in a single transaction by routing through the limit order system. A future “Universal Swap” feature will also simplify rolling maturities by allowing swaps between two PTs of the same underlying asset.

When swapping, the `tokenInAddr` parameter accepts non-SY tokens. To use a native asset like ETH, you can use the zero address (`0x00...00`).

The API simplifies complex “zap” operations for liquidity provision.
* **Add Liquidity**: `addLiquiditySingleToken` for zapping in with a single asset.
* **Remove Liquidity**: `removeLiquiditySingleToken` mimics the “Zap Out” feature on the UI, allowing LPs to withdraw their position into a single token of their choice. The output amount can be retrieved from the `amountTokenOut` field in the API response.

The API also provides functionality for claiming accrued interest and rewards.
* **Endpoint**: `redeemInterestsAndRewards`
* **Functionality**: This endpoint allows users to claim pending rewards from multiple markets at once. Currently, the API does not return which specific tokens are being claimed, nor does it auto-swap them to a base asset like USDC.

### 4.3. API Usage, Rate Limiting, and Best Practices

Pendle’s API rate limiting has evolved from simple request counts to a more sophisticated system based on **Compute Units (CU)**. This allows for more granular control, where computationally intensive endpoints consume more CUs per call.

API rate limits have changed frequently as Pendle’s infrastructure has scaled. Past limits have been cited as 10/min, 100/min, 10/sec, and even higher for specific partners or endpoints. **It is critical to not hardcode any specific rate limit and to handle rate limit errors gracefully.**

- **Default Limit**: The standard, un-whitelisted rate limit is low, around **2-10 requests per second (RPS)** or **100 CU per minute**.
- **Endpoint Costs**: Different endpoints have different CU costs. For example, the transaction API might cost 5 CU per call, meaning the default limit allows for ~20 calls per minute. The cost for each endpoint is listed in the API documentation.
- **IP-Based**: For client-side integrations, rate limiting is typically per IP address.
- **Key-Based**: For server-side or high-volume integrations, a dedicated API key is used, and the limit is applied to the key. A publicly shared API key will have its rate limit consumed by all users, making it unsuitable for production applications.

Pendle is very supportive of partners and can provide significantly higher or even unrestricted rate limits.
* **Process**: To request an increase, you must contact the Pendle team. Be prepared to provide:
1. Your specific use case.
2. The API endpoints you intend to use.
3. Your expected call volume (e.g., requests per minute/second).
4. Your server IP address(es) for whitelisting if applicable.
* **Rationale**: This information helps the Pendle team ensure you are using the correct, most efficient endpoints and allows them to provision resources accordingly. High limits, such as 1000-3600 requests per minute, are possible for institutional backends.

- **Rate Limiting**: A `429 Too Many Requests` status code indicates you have exceeded your rate limit. Your application should implement exponential backoff and retry logic.
- **Pagination**: For endpoints that return large lists (e.g., historical transactions), the API uses a `resumeToken` for pagination. Include the `resumeToken` from a response in your next request to fetch the subsequent page of data.
- **Appropriate Endpoints**: Use the right tool for the job. For general price monitoring, use the `getAllAssetPricesByAddresses` endpoint, which updates every ~30 seconds. For pre-swap price checks, use the more frequently updated `getMarketSpotSwappingPrice` endpoint.

The V2 SDK API allows you to specify which aggregators to use for a swap. This is a powerful feature for troubleshooting and routing optimization.
* **Parameter**: `aggregators`
* **Value**: A comma-separated string of aggregator names (e.g., `aggregators=odos,okx,paraswap`).
* **Example**: `.../swap?receiver=...&aggregators=odos,okx,paraswap`

- **Route Discrepancies**: At times, the API may provide a suboptimal route compared to the UI (e.g., routing through a shallow liquidity pool). Specifying aggregators can help diagnose if a particular aggregator is the cause.
- **Transaction Failures**: If transactions are failing, a recommended strategy is to first attempt a route with all aggregators. If it fails, retry the API call with the problematic aggregator (e.g., KyberSwap has been noted as occasionally unreliable) excluded from the `aggregators` list.
- **Future Enhancements**: The API is planned to be enhanced to return multiple routes in a single call, which will streamline this fallback logic.

## 5. On-Chain Operations and Best Practices

### 5.1. Liquidity Provisioning & Pool Management

Effective liquidity management is the lifeblood of Pendle markets. This section covers the best practices for seeding, managing, and configuring pools for optimal performance and user experience.

A critical aspect of integrating with Pendle is understanding the different sources of liquidity available and the methods required to access them. The protocol utilizes a hybrid model, combining on-chain automated market maker (AMM) pools with an off-chain limit order book system. This design has significant implications for developers, particularly those building fully on-chain integrations.

The core of Pendle’s on-chain liquidity resides in its AMM pools. Each market (e.g., for a specific Principal Token and underlying asset) has a corresponding AMM pool.

- **Mechanism**: These pools operate based on a deterministic mathematical formula that balances the assets within the pool and determines the price at which swaps occur. All interactions with the AMM are executed directly on the blockchain as transactions.
- **Accessibility**: This liquidity is fully composable and accessible to any on-chain entity, including other smart contracts, decentralized autonomous organizations (DAOs), and automated strategies. Any transaction that calls the appropriate functions on Pendle’s smart contracts can interact with this liquidity source.

To provide more sophisticated trading options, Pendle also supports limit orders. This liquidity is fundamentally different from the on-chain AMM pools.

- **Mechanism**: Limit orders are specific buy or sell orders placed by users at a desired price. These orders are typically managed in an off-chain order book for efficiency and to avoid gas costs for placing, updating, or canceling orders. When a match is found (e.g., the market price crosses the limit order price), a transaction is initiated to settle the trade on-chain.
- **Accessibility**: This source of liquidity is generally accessed through the Pendle user interface or specialized APIs that can interact with the off-chain order book system.

The distinction between these two liquidity sources leads to a crucial limitation for certain types of integrations.

**Fully on-chain operations, such as those executed by another smart contract, cannot natively access the liquidity provided by the off-chain limit order book.**

When a smart contract initiates a swap on Pendle, it can only interact with other smart contracts on the blockchain. Therefore, it can only “see” and trade against the on-chain AMM liquidity. It has no awareness of the off-chain order book where limit orders are resting.

### 5.1.1. The Process of Providing Liquidity

Pendle offers flexible methods for adding liquidity, catering to both novice and advanced DeFi users.

“Zapping” is a user-friendly feature that simplifies the liquidity provision process into a single transaction. Instead of manually acquiring both PT and the underlying asset, a user can start with a single asset, such as:

- The underlying yield-bearing asset (e.g., rswETH).
- A base asset (e.g., ETH).

When a user zaps in, the Pendle router automatically performs the necessary steps in the background:
1. A portion of the input asset is used to mint both PT and YT.
2. The newly minted YT is sold on the market for more of the underlying asset.
3. The resulting PT and underlying asset are then paired and deposited into the liquidity pool.

This method is highly recommended as it abstracts away the complexity of multi-step transactions, reduces gas costs, and ensures the assets are added in the optimal ratio according to the current pool balance.

Advanced users or arbitrageurs may prefer to provide liquidity manually. This process involves:

1. Acquiring the exact amounts of PT and the underlying asset required by the pool’s current ratio. This might involve minting PT and YT from the underlying asset or purchasing PT directly from the market.
2. Depositing both assets into the liquidity pool in a separate transaction.

This method offers more control but requires a deeper understanding of the pool’s mechanics and may incur higher gas fees. It is typically used for specific strategies, such as capitalizing on pricing inefficiencies between minting and market rates.

### 5.1.2. Seeding Initial Liquidity: The “Keep YT Mode”

Seeding a new pool with initial liquidity is a critical prerequisite for its launch. It ensures that early liquidity providers and users who “zap in” do not suffer from excessive price impact.

- **The Importance of Seeding**: When a user adds liquidity to a Pendle AMM, they must acquire a portion of the pool’s PT. If the pool has insufficient liquidity, this purchase can cause significant price impact, creating a poor experience for early participants. Bootstrapping the pool with a substantial initial amount mitigates this issue.
- **Recommended Seeding Amounts**:
    - A minimum of **$150,000** worth of the underlying asset is the standard recommendation to ensure subsequent zaps experience less than 1% price impact.
    - Amounts between **$50,000 and $100,000** have been considered workable in some cases, but higher amounts are always better for market health.
    - For pools on major networks like Ethereum, providing **$500,000 or more** is recommended, especially if a large migration from an older pool is anticipated.
- **“Keep YT Mode” (Formerly “Zero Price Impact Mode”)**:
    - **CRITICAL EVOLUTION**: The feature previously known as “Zero Price Impact Mode” is now labeled **“Keep YT Mode”** in the Pendle UI. This is a crucial best practice that must be enabled for nearly all liquidity-adding operations, especially initial seeding.
    - **Functionality**: This mode allows a user to provide liquidity by supplying only the underlying asset. Instead of selling a portion of the newly minted Yield Token (YT) on the open market to acquire PT (which would cause price impact), this mode allows the liquidity provider to keep their YT. This effectively seeds the pool without creating any price impact.
    - **Mandatory for Seeding**: It is **mandatory** to enable “Keep YT Mode” when seeding a new pool, transferring liquidity, or adding liquidity to a low-liquidity environment. This recommendation is one of the most frequently emphasized best practices.
- **Seeding Process**: A recommended strategy for seeding is to first deposit a smaller amount (e.g., $100k), verify that the pool’s Implied APY is at the desired level, and then proceed with the larger, remaining amount. This helps minimize immediate impermanent loss.

When a user provides liquidity with a single token (e.g., the underlying asset), the process is known as “zapping in.” The user interface provides a crucial toggle that fundamentally changes how this process works.

- **Standard Zap-In (“Keep YT Mode” OFF):**
    1. The router takes a portion of the user’s input asset (e.g., `eETH`).
    2. It swaps this portion for the corresponding PT (`PT-eETH`) on the open market (using the AMM and/or limit orders). This step is subject to **price impact**.
    3. The remaining portion of the input asset (as SY) is paired with the newly acquired PT.
    4. Both are deposited into the AMM to create LP tokens.
    - **Outcome:** The user holds only LP tokens. This is simpler but exposes the user to price impact on the initial PT purchase.
- **“Keep YT Mode” ON:**
    1. The router takes a portion of the user’s input asset (as SY).
    2. It uses this SY to **mint** a fresh set of both PT and YT. This minting process has **no price impact**.
    3. The newly minted PT is paired with the user’s remaining SY.
    4. Both are deposited into the AMM to create LP tokens.
    - **Outcome:** The user holds both LP tokens and the leftover YT tokens from the minting process. This avoids price impact on liquidity provision but results in a more complex position.

The feature now known as “Keep YT Mode” was previously labeled “Zero Price Impact Mode.” While the name has changed for clarity, the underlying technical mechanism remains the same. The new name better reflects what is happening under the hood: the user is choosing to *keep* the YT that is generated during the liquidity provision process, rather than having it implicitly sold.

This mode is automatically enabled by default for pools with low liquidity (e.g., below approximately $100,000) to protect new LPs from incurring significant losses due to price impact.

### 5.1.3. Adding & Removing Liquidity

- **Adding Liquidity**: As with seeding, it is a consistent best practice to enable **“Keep YT Mode”** when adding liquidity to any existing pool to avoid price impact. For large participants (“whales”), this is the standard method: use “Keep YT Mode” and then place a limit order to sell the retained YT over time.
- **Removing Liquidity**:
    - **Manual vs. Zap Out**: It is strongly recommended to **manually remove liquidity** to the pool’s base assets (e.g., SY and PT) rather than using a “zap out” function to a single token. Zapping out can expose the user to unnecessary price impact.
    - **Gas Optimization**: To save gas when withdrawing, choose SY as one of the output tokens instead of the final underlying asset. This will return SY and PT tokens, and the user can handle the final redemption or swap separately.
    - **Complex Withdrawals**: If a user needs to remove liquidity to a token other than the base asset (e.g., withdraw from a swETH pool to USDC), the recommended path is to first remove liquidity to the base asset (swETH) and then perform a separate swap from the base asset to the desired token.
- **Protocol Owned Liquidity (POL)**: There are no conditions or lockups on POL provided to Pendle pools. The protocol that provided the liquidity is free to withdraw it at any time, for example, once the pool is deemed sufficiently bootstrapped by community liquidity.

### 5.1.4. Key Considerations for Liquidity Providers

While providing liquidity can be profitable, it is crucial to understand the associated risks and mechanics.

Impermanent Loss (IL) is a risk inherent to providing liquidity in most AMMs. It describes the potential for the value of your deposited assets in the pool to be less than what their value would have been if you had simply held them in your wallet.

In a standard Pendle pool (PT/underlying asset), IL is primarily driven by fluctuations in the price of the underlying asset. However, the nature of PT provides a unique mitigating factor: as the maturity date approaches, the value of PT naturally converges to the value of the underlying asset. This convergence helps to reduce the divergence that causes IL. Nonetheless, significant volatility in the underlying asset’s price can still lead to IL, especially in the short term.

Rewards from swap fees and incentives accumulate over time and do not compound automatically. LPs must periodically visit the “Claim Rewards” section of the Pendle dashboard to claim their earned `PENDLE` and any other third-party tokens. These claimed tokens can then be sold, staked, or used elsewhere in the DeFi ecosystem.

LPs can withdraw their liquidity at any time before maturity. The process is the reverse of adding liquidity. Users can “zap out,” converting their LP tokens back into a single asset (like the underlying asset or ETH) in one transaction, or manually withdraw the constituent pair of PT and the underlying asset.

### 5.2. Managing Maturing Pools and Rollovers

A core concept of Pendle Protocol is the tokenization of future yield into Principal Tokens (PT) and Yield Tokens (YT), which are traded within liquidity pools that have a fixed maturity date. When a pool’s maturity date is reached, it “expires,” and the underlying assets can be redeemed. For liquidity providers (LPs) and yield strategists, this necessitates a process to move capital from an expiring pool to a new one with a later maturity date to continue earning yield and trading fees.

The “Transfer Liquidity” (or “Rollover”) feature is a purpose-built tool integrated into the Pendle ecosystem designed to facilitate the seamless migration of assets from an expiring pool to a new, active pool. It abstracts the complex, multi-step manual process into a single, user-friendly workflow, providing significant benefits in terms of user experience and gas efficiency.

By using this feature, a user can bundle the withdrawal from the old pool and the deposit into the new pool into a single atomic transaction. The underlying smart contracts handle the necessary swaps and re-deposits, ensuring that the user’s capital is moved efficiently. This is the recommended method for all users—from retail LPs to sophisticated DeFi strategists—to manage their positions across different maturities.

**Step-by-Step Guide to Migrating Liquidity**

**Step 1: Locate the Transfer Functionality**

Navigate to the expiring pool within the Pendle application. This functionality is typically found on the pool’s detail page or within a dedicated portfolio management section that highlights expiring positions. Look for a prominent button or tab labeled “Transfer Liquidity,” “Migrate,” or “Rollover.”

**Step 2: Select Positions for Migration**

Once in the transfer interface, you will be prompted to select the positions you wish to migrate from the old pool. This includes any combination of:
* **LP (Liquidity Provider) Tokens:** Representing your share of the liquidity in the expiring pool.
* **PT (Principal Tokens):** Representing the principal component of the underlying asset.
* **YT (Yield Tokens):** Representing the yield component.

For a complete rollover of your position, you should select all assets you hold in the expiring pool.

**Step 3: Configure Migration Options**

This is a critical step where you define the parameters for your new position.

- **Target Pool:** Select the new, active pool you wish to migrate your liquidity into. This will be a pool with a later maturity date. The interface will typically present a list of valid destination pools for the asset.
- **Target Asset Type:** Specify the type of asset you want to receive in the new pool. The most common choice is **LP**, which means your capital will be used to provide liquidity in the new pool, allowing you to continue earning swap fees and other incentives. Other options may be available depending on your desired strategy.
- **“Keep YT Mode” (or similar setting):** This is a crucial option for users who held YT in the old pool. Enabling this mode ensures that the migration process results in you holding YT in the new pool, thereby maintaining your exposure to the underlying asset’s yield. If you were an LP, this setting helps re-establish a similar position structure in the new pool. It is generally recommended to keep this enabled for a consistent strategy rollover.

**Step 4: Approve and Execute the Migration**

The final step involves executing the on-chain transactions. This is typically a two-part process:

1. **Approve:** You must first grant the Pendle router contract permission to access and manage your tokens from the expiring pool (LP, PT, YT). This is a standard ERC20 `approve` transaction that requires a signature from your wallet.
2. **Transfer / Roll Over:** After the approval is confirmed, you will execute the main migration transaction. This transaction calls the smart contract function that performs the withdrawal, asset swaps, and deposit into the new pool. Carefully review the transaction details in your wallet before confirming.

Once the final transaction is confirmed on the blockchain, your liquidity will be successfully migrated to the new pool, and you will see your new LP, PT, or YT positions reflected in your portfolio.

## 6. Technical Calculations, Formulas, and Algorithms

### 6.1. Core Token Pricing and Conversion

The Pendle ecosystem revolves around several key tokens: Principal Tokens (PT), Yield Tokens (YT), Standardized Yield Tokens (SY), and Liquidity Provider (LP) tokens. Understanding how their prices and values are calculated is fundamental for any integration. A key evolution in the protocol’s calculation logic is a two-step process: first, all derivative tokens (PT, YT, LP) are priced in terms of SY using a consistent logic, and second, the SY price is converted to its specific underlying asset, a step that is customized for each asset.

SY tokens are wrappers around the underlying yield-bearing asset, standardizing them for use within the Pendle AMM. The price of an SY token is not always 1:1 with its underlying asset.

To accurately price an SY token, you must use the `sy.assetInfo` function on the SY contract. This function returns the `type` and `address` of the underlying asset, which dictates the pricing formula:

- **If `type` is 0 (ERC20 Asset):** The underlying asset is a standard ERC20 token. The SY price is calculated by multiplying the price of this underlying asset by an exchange rate.
`syPrice = Price(sy.assetInfo.address) * exchangeRate`
- **If `type` is 1 (e.g., Native Asset):** The SY price is directly equal to the price of the asset at `sy.assetInfo.address`.
`syPrice = Price(sy.assetInfo.address)`

For example, to convert a weETH amount to eETH, you would divide the weETH amount by the SY contract’s `exchangeRate`. This same exchange rate is consistent with the eETH to weETH rate on the mainnet.

A Principal Token (PT) represents the principal component of an underlying yield-bearing asset, redeemable 1:1 for the underlying asset at maturity. Its price before maturity is always at a discount, which is determined by the market’s implied yield and the time remaining until expiry.

The most accurate way to calculate the PT price is through its relationship with the market’s implied APY. The mathematical flow is `Implied APY -> PT Exchange Rate -> PT Price`.

**On-Chain Calculation:**
The fixed APY, and by extension the PT price, can be calculated on-chain. The most current and recommended formula uses the `routerStatic.getPtToAssetRate()` function:

```
Implied APY = (1 / routerStatic.getPtToAssetRate()) ** (365 / daysUntilExpiry) - 1
```

This formula can be rearranged to solve for the PT-to-Asset rate, which is the price of PT in terms of the underlying asset. An alternative on-chain method involves reading the market state directly: `e^(market.readState().lastLnImpliedRate)`.

**API Method:**
For off-chain calculations, the Pendle API provides this value directly. The `impliedApy` field in the market data endpoint (`/core/v1/{chainId}/markets`) corresponds to the fixed yield for a given PT.

**Important Note:** It is **not safe** to assume that the USD value of 1 PT is always greater than the spot price of the corresponding native asset (e.g., 1 PT-weETH > 1 ETH). The PT price is determined by the AMM pool dynamics. If the implied yield is high, the discount on the PT will be larger, and its price can be lower than the underlying asset’s spot price.

A Yield Token (YT) represents the right to the yield generated by the underlying asset until maturity. Its value is derived entirely from this future yield.

- **Conceptual Value:** The value of 1 YT is equivalent to the total yield generated by 1 unit of the underlying asset from the present time until the token’s maturity date. For example, holding 73 YT-pufETH means you are entitled to the yield generated by 73 ETH worth of pufETH.
- **Time Decay:** The price of a YT decays over time. If the implied yield remains constant, the YT’s price decreases linearly with the time remaining. For instance, a YT with 15 days left to maturity will be worth half its price when it had 30 days left.
- **Appreciating Assets:** For assets like sUSDe whose yield is expressed through value appreciation rather than distributions, Pendle calculates the interest for YT by observing the change in the asset’s exchange rate (e.g., `sUSDe.convertToAsset`). If 1 sUSDe is worth 1 USDe at the start and 1.1 USDe at maturity, 1 PT will be redeemable for a fraction of the final sUSDe (e.g., ~0.9 sUSDe), with the remaining value (~0.1 sUSDe) having been distributed as yield to YT holders over the period.

The price of a Pendle LP token represents a share in the liquidity pool, which contains a mix of PT and SY tokens.

- **Basic Formula:** The fundamental calculation for an LP token’s price is the total value of all assets in the pool divided by the total supply of the LP token.
`LP_Token_Price = (Total_Value_of_SY_in_Pool + Total_Value_of_PT_in_Pool) / Total_LP_Token_Supply`
- **Asset-Specific Formulas:** For practical application, pricing formulas are often expressed in relation to the underlying asset. The exact formula depends on whether the asset is SY-based or Asset-based.
    - For SY-based assets (e.g., agETH, rswETH, stETH): `LP Value = getLpToSyRate * [underlying_asset_price]`
    - For Asset-based assets (e.g., sUSDe, gUSDC): `LP Value = getLpToAssetRate * [underlying_asset_price]`

Several key formulas are used to convert between the different token types within the ecosystem. These are essential for tracking positions and calculating values.

- **PT Amount to Asset Amount:**`AssetAmount = PTAmount * PTtoAssetRate / 1e18`
- **PT Amount to SY Amount:**`SY_Amount = PT_Amount * PtToSyRate / 1e18`
- **PT Price (in Asset) to PT Price (in SY):**`PT_Price_in_SY = PT_Price_in_Asset * 1e18 / SY.exchangeRate()`
- **LP Amount to Token Amount:**`TokenAmount = LP_Amount * result / 1e18`
    - **Crucial Note:** Always account for the decimals of the tokens involved. For assets like BTC where tokens may have 8 decimals instead of 18, this will significantly affect the calculation.

### 6.2. APY, Yield, and Fee Calculations

The “fixed APY” on Pendle is the implied yield of the market at which PT is trading.

**The Definitive Formula:** To precisely match the APY displayed on the Pendle UI, you must use a compound interest formula that accounts for the exact time to maturity.

1. **Determine the Rate:** Calculate the rate of return from buying PT to holding until maturity. For example, a rate of `1.01384` represents a gain of 1.384% over the period.
2. **Calculate APY:** Use the following formula, ensuring `time_to_maturity_in_days` is a precise decimal value (including hours, minutes, etc.).
`APY = (rate ^ (365 / time_to_maturity_in_days)) - 1`*Example:* For a rate of `1.01384` and a maturity of `48.6139` days:
`APY = (1.01384 ^ (365 / 48.6139)) - 1 = ~11.01%`

The “Underlying APY” displayed on the Pendle UI reflects the recent performance of the yield-bearing asset itself.

- **Calculation Method:** It is derived from the total rewards accrued to the SY contract over the **past 7 days**, which are then annualized. This is a 7-day moving average (7DMA).
- **New Pool Behavior:** For new pools, this calculation can lead to unusually high and volatile APY figures. This is because the initial reward distributions are annualized over a short period. The APY is expected to stabilize and become more representative as the pool matures and accumulates more data.
- **Exchange Rate Monitoring:** For many assets, the most accurate way to track the underlying APY is by observing the change in the exchange rate between the yield-bearing token and its base asset (e.g., monitoring the sUSDe-to-USDe exchange rate).

Trading fees on Pendle are not static. They are dynamically adjusted based on the time remaining until the market’s maturity, ensuring fees are proportional to the remaining achievable yield.

- **Fee Formula:**`Trading Fee = (Fee Tier / 365) * Days to Maturity`
- **Fee Tier:** The `Fee Tier` is specific to each market and can be found by clicking the “specs” button on the market’s trading interface.
- **Application:** The fee is calculated on the **nominal PT amount** being traded and is emulated before the swap occurs.
- **Example:** A market with a `0.1%` fee tier and `26` days to maturity would have a trading fee of:
`0.1% / 365 * 26 = 0.007123%`
- **Redemption:** Redeeming PT for the underlying asset *after* maturity incurs no protocol fee, only standard network gas fees.

### 6.3. Points and Rewards Calculation Engine

Many Pendle pools offer additional rewards in the form of points from integrated protocols (e.g., EigenLayer, Renzo, Zircuit). The calculation of these points follows a consistent and sophisticated logic.

- **YT Equivalence:** For point calculation purposes, **1 YT is treated as equivalent to 1 unit of the underlying SY asset**, regardless of the YT’s market price. It earns the same amount of points and yield as if you were holding the full underlying asset.
- **LP Position:** For LPs, only the **SY portion** of the LP position earns points. The PT portion does not. The ratio of SY to PT within an LP position is dynamic and changes with every trade in the pool.
- **Fees:** A **5% fee** is typically applied to the yield and points earned from **YT holdings**. This fee is allocated to Pendle governance. No such fee is applied to points earned from LP positions.
- **Boosting:** Point earnings from LP positions are influenced by the vePENDLE boost mechanism, which can multiply rewards.

A user’s proportional share of a liquidity pool is the foundation for calculating their share of points and rewards from the LP position. This is consistently calculated using the `activeBalance` of the user relative to the `totalActiveSupply` of the pool, which accounts for the vePENDLE incentive model.

1. **Query Contracts:**
    - Get the user’s balance: `LP_Contract.activeBalance(userAddress)`
    - Get the pool’s total supply: `LP_Contract.totalActiveSupply()`
2. **Calculate Proportion:**`User Proportion = activeBalance(user) / totalActiveSupply`

This proportion represents the user’s ownership percentage of the pool’s active liquidity.

To find a user’s total point-earning position, you must sum the contributions from their YT and LP holdings.

**Step-by-Step Guide:**

1. **Calculate YT Contribution:**
    - Identify the user’s YT balance (e.g., `100 YT-ezETH`).
    - Apply the 5% fee: `100 * 0.95 = 95`.
    - The point-earning asset amount from YT is `95 ezETH`.
2. **Calculate LP Contribution:**
    - Calculate the user’s proportion in the LP using the `activeBalance` formula described in section 3.2.
    - Query the total amount of SY held within the LP contract: `SY_Contract.balanceOf(LP_Contract_Address)`.
    - Multiply the user’s proportion by the total SY in the LP to find their attributable SY share.
    `LP SY Share = User Proportion * Total SY in LP`
3. **Calculate Total Position:**
    - Sum the contributions from YT and LP.
    `Total Point-Earning Position = (YT Balance * 0.97) + LP SY Share`

This final value, in terms of the underlying asset, is what is used to calculate the user’s point allocation.

Points programs often involve multiple layers of multipliers, which are typically multiplicative.

- **Base Multipliers:** Protocols may offer a base multiplier for depositing certain assets. For example, depositing an LRT might yield 2x the points of depositing native ETH.
- **Pendle Multipliers:** Pendle may apply its own additional multiplier for participating in a specific pool.
- **Combined Effect:** The total effective multiplier is the product of all applicable multipliers.

**Example (Zircuit & Renzo Points):**
* **Zircuit Base:** 1x for ETH, 2x for ezETH.
* **Pendle Pool:** 2x Zircuit multiplier, 1x Renzo multiplier.
* **Effective Zircuit Points:** `(2x ETH base) * (2x Pendle) = 4x` the base ETH emission rate.
* **Effective Renzo Points:** `(1x Renzo base) * (1x Pendle) = 1x` the base Renzo emission rate.

Similarly, if a user deposits into an ether.fi vault for a 3x native multiplier and then uses the resulting token on Pendle in a pool with a 2x multiplier, their total effective multiplier is `3x * 2x = 6x`.

### 6.4. vePENDLE and Boosting Calculations

LPs can boost their PENDLE rewards and point earnings by up to a maximum of **2.5x** by holding vePENDLE.

**Formula for Maximum Boost:**
To achieve the full 2.5x boost, a user’s share of the total vePENDLE supply must be greater than or equal to their share of the capital in the liquidity pool.

`Your vePENDLE / Total vePENDLE >= Your Capital in LP / Total Pool TVL`

**Calculating Required vePENDLE:**
* **Example:** If you provide 0.01% of a pool’s TVL and the total vePENDLE supply is 32.82 million, you need at least `0.01% * 32,820,000 = 3,282 vePENDLE` to get the max boost. The amount of PENDLE required to get this much vePENDLE depends on the lock duration (e.g., a 2-year lock gives a 1:1 ratio).

**Proportional Decrease:**
If the condition for the max boost is not met, the boost decreases linearly. If your vePENDLE share is less than your pool capital share, your boost will be somewhere between 1x and 2.5x.

To ensure a fair and efficient distribution of PENDLE emissions, Pendle utilizes a dynamic cap system that adjusts each epoch based on market performance.

- **Key Metrics:**
    - **Vote Share %:** Percentage of total vePENDLE votes a market receives.
    - **Fee Share % (F):** Percentage of total protocol swap fees generated by that market over the past 7 days.
    - **Vote Efficiency:** `Fee Share / Vote Share`.
- **Cap Adjustment Rules (per epoch):**
    - Let `C` be the current cap.
    - **If `C > 4 * F` (Cap is high relative to fees):** The cap is reduced.
    `New Cap = max(C - 20% * C, 4 * F)`
    - **If `C < 4 * F` (Cap is low relative to fees):** The cap is increased.
    `New Cap = min(C + 20% * (4 * F), 4 * F)`
    This system is designed to be lenient, allowing caps to be up to 4x the fee share and increasing caps more aggressively than it reduces them.

## 7. Technical Specifications and Definitions

### 7.1. Market Integration and Liquidity Standards

Price impact, often used interchangeably with the market-related component of slippage, refers to the effect a trade has on the market price of an asset within a liquidity pool. In Automated Market Makers (AMMs), prices are determined by the ratio of assets in a pool. When a trader executes a swap, they add one asset and remove another, thereby changing this ratio and moving the asset’s price.

**As a best practice, a DEX market integrated with or built upon Pendle should possess sufficient liquidity such that a trade in the range of $500,000 to $1,000,000 results in a price impact of less than 1%.**

This benchmark serves as a clear target for a mature and healthy market. Achieving this level of liquidity indicates that the market can handle institutional-sized volume without causing excessive price volatility or unfavorable execution for the trader. It signals to the broader DeFi ecosystem that the market is deep, efficient, and reliable. While newer or more niche asset pools may initially operate with lower liquidity, this standard should be the goal as the market develops and attracts more capital.

### 7.2. Asset Specifications and Relationships

Within the Pendle ecosystem, it is common to encounter standardized tokens that wrap an underlying yield-bearing asset. A key example of this is the relationship between `stUSR` and `USR`.

**The standardized token, `stUSR`, is designed to maintain a strict 1:1 value relationship with its underlying asset, `USR`.**

This means that one `stUSR` token is, by design, always equivalent in value to one `USR` token. `USR` can be understood as the base yield-bearing asset (e.g., a liquid staking token or a tokenized vault share), while `stUSR` is a wrapped, standardized representation of `USR` used specifically for interacting with Pendle’s internal mechanics, such as its AMM pools. This wrapping process abstracts away complexities of the underlying yield-bearing token (like rebasing mechanisms) and creates a uniform token standard that the protocol can handle more efficiently.

The 1:1 peg between `stUSR` and `USR` is not maintained by algorithmic means or market-based arbitrage alone. Instead, it is enforced through a direct and deterministic conversion mechanism, typically a smart contract often referred to as a “wrapper” or “adapter.”

This mechanism functions as follows:
1. **Minting `stUSR`**: A user can deposit any amount of `USR` into the designated contract and mint an exactly equal amount of `stUSR`. For example, depositing 1,000 `USR` will yield 1,000 `stUSR`.
2. **Redeeming `USR`**: Conversely, a user can burn any amount of `stUSR` at the same contract to redeem an exactly equal amount of the underlying `USR`. Burning 1,000 `stUSR` will return 1,000 `USR`.

## 8. Troubleshooting Guide

### 8.1. General Troubleshooting Principles

When facing unexpected behavior, especially in the user interface, start with these client-side checks:

- **Hard Refresh and Clear Cache**: A simple hard refresh of the browser page can often resolve transient UI glitches or data display issues. If problems persist, clearing the browser cache and application storage ensures you are not interacting with stale data or application states.
- **Check Wallet and Network Connection**: A very common source of errors is a user being connected to the wrong wallet or blockchain network. Double-check that the correct wallet is connected to the Pendle dApp and that it is set to the appropriate network for the intended transaction. An incorrect ETH balance display is almost always a sign of a wrong wallet connection.
- **Review Browser Console Logs**: For web-based interactions, the browser’s developer console (usually accessed with F12) is an invaluable tool. Open the console, retry the failing operation, and look for error messages. These logs provide critical clues for debugging. When reporting an issue, a screenshot of the console output is extremely helpful.
- **Check RPC and Security Software**: Transaction signing issues (e.g., wallet pop-up not appearing) are often related to the RPC (Remote Procedure Call) provider configured in your wallet, not Pendle’s infrastructure. Try switching to a different public RPC from a reputable source like Chainlist. Additionally, VPNs, firewalls, or malware protection software can sometimes block RPC communications, so check their configurations for potential interference.

To facilitate a swift and accurate resolution, provide as much detail as possible when reporting a bug or an error.

- **Transaction Hash (Tx Hash)**: If a transaction was attempted (even if it failed), the transaction hash is the most critical piece of information. It allows developers to inspect the exact on-chain activity.
- **Transaction Calldata**: For pre-transaction failures or simulation issues, the raw transaction `calldata` is essential. This allows developers to replicate the exact contract interaction you are attempting.
- **Wallet Address**: Providing the public wallet address involved helps developers trace user-specific states, such as balances, rewards, and voting history.
- **Simulation Links**: If possible, generate and share a simulation of the failing transaction using tools like Tenderly or Sentio. This provides a detailed, step-by-step execution trace that is invaluable for debugging complex interactions.
- **Specifics of the Operation**: Clearly describe the action you were trying to perform, including:
    - The blockchain network (e.g., Ethereum, Arbitrum, BNB Chain).
    - The specific market or pool address.
    - The input and output tokens and amounts.
    - The exact error message received (e.g., `MarketProportionTooHigh`, `Slippage: APPROX_EXHAUSTED`).

### 8.2. Smart Contract Interaction Errors

Many transaction failures are not bugs but are expected reverts designed to protect users from unfavorable outcomes.

- **Slippage and Price Movement**: Transactions, especially swaps, can fail if the price of an asset moves beyond the user’s specified slippage tolerance between the time the transaction is created and when it is confirmed on-chain.
    - **Solution 1 (Preferred)**: Increase the transaction’s gas fee (e.g., use ‘aggressive’ or ‘instant’ settings in your wallet). This reduces the confirmation time, minimizing the window for price changes.
    - **Solution 2**: Increase the slippage tolerance in the dApp settings. This allows for a wider price fluctuation but may result in a less favorable execution price.
- **Expired Aggregator Quotes or `approx` Parameters**: Data generated for a transaction, such as a route from an aggregator or an `approx` parameter for a swap, is highly time-sensitive and often only valid for the block in which it was generated. Using this data even a few blocks later can lead to reverts like `Slippage: APPROX_EXHAUSTED`. This is a common cause of an ‘Insufficient PT’ error, which can be due to state mis-syncing from using stale transaction data.
- **`Slippage: search range overflow`**: This error specifically indicates that the amount of tokens being swapped is too large for the market to handle at its current liquidity depth.

Pendle’s AMM pools operate within a configured yield range. If high demand for YT (Yield Token) pushes the implied APY beyond the pool’s upper boundary, the market is considered **‘out of range’**.

- **Impact**: When a market is out of range, certain actions are disabled to protect the protocol’s stability. Users will be unable to:
    - Buy YT via market orders.
    - Sell PT via market orders.
    - Use the ‘Zap Out’ function.
- **Error Message**: Attempting these actions often results in a `MarketProportionTooHigh` error (error signature `0xfc68d09e`). This error signifies that the requested trade would push the pool’s composition beyond its acceptable limits.
- **Solution**: For trades that are blocked due to an out-of-range market, the only available mechanism is to use **limit orders**. Limit orders can be placed and will be filled if/when the market conditions allow.
- **Resolution**: The Pendle team typically addresses out-of-range markets by redeploying the pool with a wider yield range. LPs in the old pool are then advised to migrate their liquidity to the new, wider-range pool.
- **`No route found to add liquidity` / `No route found`**: This error during a zap-in or swap indicates that the system, often relying on an external aggregator, could not find a viable path to convert the input token to the required asset(s). This can be due to:
    - **Insufficient Liquidity**: The most common cause is a lack of liquidity for the token pair on the specified chain. For example, trying to add liquidity using PENDLE on a chain where PENDLE has no DEX liquidity will fail.
    - **Aggregator Issues**: The aggregator may be experiencing transient issues or may not support the specific token pair. See the [Aggregator-Related Failures](about:blank#52-aggregator-related-failures-and-workarounds) section.
    - **RPC Issues**: This error can sometimes be caused by an underlying RPC problem.
- **`liquidity insufficient`**: This error occurs when the pool’s liquidity is not deep enough to handle the size of the requested transaction. This is distinct from a “no route” error; a route exists, but the trade size is too large. This is common when trying to buy a large amount of PT, as it is limited by the available PT-SY liquidity.
- **`TransferHelper: TRANSFER_FROM_FAILED`**: This error during liquidity removal is often an issue with the aggregator used for the transaction, especially when zapping out to tokens that require complex swap data. Testing such operations on a forked network is challenging due to the short validity of aggregator data.
- **`VCExceededMaxWeight` / Gas Estimation Failures**: A common reason for voting transactions to fail is that the sum of the percentage weights allocated across all pools exceeds 100%. Users must ensure the total weight is less than or equal to 100%. A successful workaround has been to slightly adjust one of the percentages (e.g., using 69.99% instead of 70%) to avoid potential precision or rounding issues.
- **Zero-Weight Votes**: If a transaction includes multiple vote actions for the same pool, the last vote will be the one that counts. If a 0-weight vote is cast last for a pool, it will effectively nullify any prior, non-zero votes for that pool within the same transaction.
- **Multisig Voting Failures**: There have been persistent reports of voting transactions failing after being signed when using a multisig setup (including with Rabby wallet). When troubleshooting, providing the transaction `calldata` is crucial.
- **`userReward` Returning Zero**: Calling the `userReward` function on a `PendleMarket` contract may return 0 even if rewards have accrued. This is because the contract does not write accrued rewards to storage in real-time. To get an accurate, up-to-date value of claimable rewards, you must perform a static call (`eth_call` or `.callStatic`) to the `redeemRewards(address user)` function.
- **UI Showing Zero Rewards**: The Pendle UI uses a static call to check for claimable rewards. If this call reverts (for example, if the recipient contract lacks a `receive()` function to accept native ETH rewards), the UI will default to displaying 0.
- **Reverts on `redeemRewards` in Matured Pools**: An older, faulty implementation of the `redeemRewards` function caused reward calculations to be incorrect after a pool’s expiry. This led to reverts when users tried to claim rewards.
    - **Evolution & Solution**: This issue was a key driver for the upgrade from Factory V4 to V5. A **`reward redeem proxy`** contract was deployed. To correctly redeem rewards from affected markets, users should call this proxy instead of the market contract directly, as the proxy handles the underlying issues. The primary fix is to avoid calling `redeemRewards` after a pool has expired.
- **Reverts Due to Depleted Incentives**: Transactions related to rewards (including claims and even unrelated interactions with the pool) can revert if an external incentive program, which the Pendle contracts are integrated with, runs out of its reward tokens (e.g., ARB incentives from Silo pools).

### 8.3. Oracle and Price Feed Issues

- **Error**: `increaseCardinalityRequired=true` or a revert with error `0x39db717e`.
- **Cause**: This state indicates that the oracle does not have enough historical price data points (cardinality) to compute the requested TWAP. This often happens because the `observationCardinality` on the underlying AMM pool is at its default value of 1, which is insufficient for any TWAP calculation.
- **Solution**:
    1. **Increase Cardinality**: You must call the `increaseObservationCardinalityNext` (or a similar function) on the underlying market or oracle contract. A common required value is 1800. For some oracles, the parameter can be calculated as `duration / 11` (e.g., for a 900s TWAP, the parameter is `82`).
    2. **Wait for Population**: After increasing the cardinality, you must wait for the oracle to populate with sufficient data. This typically takes around 15 minutes (900 seconds). The `increaseCardinalityRequired` flag will switch to `false` once the oracle is ready.
- **`OracleTargetTooOld` / `TooStalePrice()`**: These errors indicate that the last price update from the oracle is older than the maximum acceptable age. This is a safety mechanism to prevent trading based on outdated information. If an oracle provider (e.g., Pyth) is unresponsive, Pendle’s functions will fall back to using the last known exchange rate.
- **Incorrect Price Display**: Mismatches between the UI and on-chain reality can occur. For example, a matured PT displaying an incorrect price, or a token’s value showing as a “100% loss,” is often due to an external data provider (like Debank) supplying a faulty price feed.
- **`ORACLE_NOT_FEASIBLE`**: This error originates from an integrated DEX, not directly from Pendle. It often occurs in a forked network environment where the Chainlink or Pyth oracle has not been updated and has fallen behind the forked block’s timestamp.

### 8.4. Data, Indexing, and API Errors

- **Rate Limiting (`429 Too Many Requests`)**:
    - **Source**: Rate limiting issues are most often caused by the user’s **RPC provider**, not the Pendle API itself. This is especially common when backfilling historical data, which generates a high volume of requests in a short period.
    - **Solution**: For intensive operations like backfilling, it is **highly recommended to use a private or paid archival RPC service** (e.g., QuickNode) to avoid public rate limits.
- **Timeouts**: The Pendle API, particularly endpoints that query complex data via Sentio, can be slow. It is advisable to set a generous client-side HTTP timeout (e.g., 120 seconds or more) to prevent premature request termination.
- **Hosted SDK Limitations**: The Pendle Hosted SDK is designed for ease of use but has limitations. It only supports whitelisted markets, and attempting to interact with a non-whitelisted market will result in a `Market not found` error.
    - **`400 Bad Request: syTokenOutAddr is not a valid SY token out`**: This error from the `redeemPyToToken` API was identified as a potentially misleading or intermittent bug on Pendle’s side and has been fixed.
    - **`404 Not Found`**: When checking for rewards eligibility, a 404 error indicates the address is not eligible. When querying a market, it means the market address is not found on the specified chain.
    - **`Token is not swappable via aggregator`**: This error occurs when a token is not whitelisted for zapping. This can happen if a token initially has very high price impact, but it can be whitelisted after review.
- **`selector not found`**: This error, for instance when calling `getYtToSyRate` on a historical block, indicates the function did not exist on the contract at that point in time. The function was a more recent addition and cannot be used to query data before its deployment.

### 8.5. Third-Party Integration Issues

- **Public RPC Limitations**: Public RPCs, such as the default MetaMask RPC for Arbitrum (Ankr), are prone to issues. They may have problems with multicall operations, return corrupted data, or have strict rate limits that interfere with data-intensive tasks.
- **Recommendation for Private RPCs**: For any serious development, backfilling, or production-level service, using a **private, archival RPC provider is strongly recommended**. Providers like QuickNode have been noted to handle queries more reliably than public alternatives.
- **General Aggregator Faults**: A common cause for a `swapExactTokenForPt` transaction to revert is an “aggregator fault,” where the route provided is stale or invalid by the time of execution.
- **Simulation Inaccuracy**: Aggregator simulations can be unreliable, especially when the user’s wallet lacks sufficient funds for the simulated amount. The aggregator may return a “stale” or unusable route that looks good on paper but would fail in a real transaction. Accurate simulation requires the user to have both sufficient balance and token approval.
- **Protocol Pauses**: In the event of a security compromise on an integrated protocol (e.g., Penpie, Zerolend), Pendle may pause its own contracts as a precautionary measure. Once the attack is confirmed to be isolated to the external protocol and that protocol has been paused, Pendle will unpause its contracts.

### 8.6. Development, Testing, and Deployment

- **No Maintained Testnet**: Pendle **does not maintain a deployment on public testnets** like Sepolia. The deprecation of the Kovan testnet marked the end of this support.
- **Forking Mainnet is Recommended**: The standard and recommended approach for testing is to **fork a mainnet environment** (e.g., Ethereum, Arbitrum) to a local or hosted development environment. Tools like **Foundry** or **Hardhat** are essential for this.
- **Hardhat Configuration for Forking**:
    - **Persistence**: When running multiple operations (e.g., deploying then seeding), ensure Hardhat is configured to connect to a single, persistent fork instance. Otherwise, each operation may create a new, independent fork, losing the state from previous steps.
    - **Shanghai Hardfork**: When using a forked network, ‘Invalid Opcode’ errors are common if the environment is not configured for the Shanghai hardfork. Ensure your Hardhat version is up-to-date and configure the `hardforkHistory` in your `hardhat.config.ts`.

## 9. Developer Resources

### 9.1. Official Documentation Hubs

- **Main Developer Docs**: The central hub for all developer documentation.
    - `https://docs.pendle.finance/Developers/Overview`
- **Hosted SDK/API V2 Docs (Current)**: The primary reference for all modern API interactions.
    - `https://api-v2.pendle.finance/core/docs`
- **Contract Technical Details**: In-depth documentation for Pendle’s smart contracts.
    - `https://docs.pendle.finance/Developers/Contracts/TechnicalDetails`
- **Pendle Academy**: GitBook resource with explanations of core concepts like points trading.
    - `https://pendle.gitbook.io/pendle-academy/`

- **Listing Guide:** `https://pendle.notion.site/pendle-listing`

### 9.2. Community and Support

- **Developer Telegram**: For announcements and community discussion.
    - `https://t.me/pendledevelopers`
- **GitHub Repositories**:
    - **Generic Balance Fetcher**: `https://github.com/Pendle-Finance-Periphery/pendle-generic-balance-fetcher`
    - **`external-integration`:** [`https://github.com/pendle-finance/external-integration`](https://github.com/pendle-finance/external-integration)  Repository for submitting PRs to feature partner integrations on the Pendle UI.
    - `Contract repo` : [`https://github.com/pendle-finance/pendle-core-v2-public`](https://github.com/pendle-finance/pendle-core-v2-public)