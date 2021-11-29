---
sidebar_position: 3
---

# Litepaper

Pendle enables the tokenizing and trading of future yield by leveraging on base lending layers created by prominent DeFi protocols such as Aave and Compound, which have shown incredible growth and community acceptance.

With Pendle, future yield can be separated from its underlying asset and traded independently. Pendle is powered by an AMM specifically designed to support tokens with depreciating time value, creating a new type of DeFi derivative. Pendle focuses on developing this layer of yield derivatives - expanding the supported token pairs, creating market depth, and growing the ecosystem.


## What does this allow?

This allows for freely tradable on-chain fixed and floating yields of altcoins, creating forward yield curves across tokens. This gives the lending market greater visibility and more maturity.

Having on-chain information tradable across multiple time horizons creates a new avenue for yield strategies, such as Harvest vaults, to maximize or protect returns.

It allows for lenders to lock in their yields and traders to speculate and gain exposure to changes in yield.

The tokenization of future yield also allows for the creation of products with future yield as collateral. Various new trading derivatives, such as rate swap products, the selling and buying of yield protection, and spread trading, will be feasible.

Besides creating a vibrant-rates trading layer across the most relevant lending token pairs, Pendle can also participate in the creation of yield products, providing the ecosystem with a greater selection of strategies to easily express their view of the market.


## Technical Design

### Yield Tokenization

To allow owners to give up rights to their yield for a fixed period of time, users will deposit their yield token (aLINK for the purposes of this paper) into a smart contract. Two tokens will be issued, YT and OT.

#### Future Yield Token (YT)

Each YT represents ownership of the future yield of the locked aLINK for a preset number of blocks. YT can be traded in the AMM, and the holder of the token receives aLINK yield as distributed by the base lending platform.

At expiry, YT have a value of zero. After expiry, only the OT is needed to redeem the underlying asset.

YT differ from each other according to underlying asset and expiry date. Tokens with the same underlying asset and expiry are fungible. 

#### Ownership Token (OT)

OT represent the underlying staked asset and are transferable. Only wallets holding OT and its corresponding YT can withdraw the underlying asset deposited.

### Automated Market Maker (AMM) for Tokens with Time-Decay

While YT can be traded on existing Uniswap type AMMs, the constant product invariant formula x · y = k is not ideal for YT, where time is an additional factor. Utilizing a formula which is a pure function of reserves would cause pools to suffer from predictable losses to arbitrage as YT maturity approaches. 

Taking inspiration from the constant product invariant and incorporating a constant decaying time factor, we have developed a strain of AMMs that can be utilized for tokens with time value.

A series of sample graphs at different timestamps are shown below.

![Curve Shifting](/img/resources/litepaper-1.png)

When YT is issued at the start of the contract period, the curve follows that of a standard constant product AMM curve, $x \cdot y = k$. As time passes, the curve eventually eases into a horizontal line. This is a reflection of how the price of YT decreases as the remaining future interest yield approaches zero.

### Chaining Liquidity Pools

A set of new pools per token pair will be created after each expiry, chaining new expiries as old expiries become irrelevant. The setup will look like this:

![Chaining](/img/resources/litepaper-2.png)

Essentially, the overlapping of liquidity pools enables a constant yield curve for the underlying. Liquidity incentives will be utilized to create this chain and popular pairs can be accorded longer time frames. For example, ETH or WBTC pairs may have demand for a 360-day expiry.


## System Overview

![System Overview](/img/resources/litepaper-3.png)

### How Pendle Works

#### Minting and Trading

1. User mints YT and OT through Pendle by depositing aToken; OT (ownership token) and YT (future yield token) are minted. OT represents ownership of the underlying aToken, and YT represents the future yield of the underlying aToken.
2. YT Minter can sell the YT or add to the YT liquidity pool in exchange for LP tokens to earn liquidity incentives.
3. YT can be purchased or sold, and after the change of ownership has occurred, the entitlement of subsequent interest revenue tied to the underlying aToken will be changed to the new YT owner.
4. YT can be traded until its expiry. YT has no value upon expiry. The OT holder can choose to roll forward to a new expiry and repeat the process, or redeem the underlying

#### Redeeming the Underlying Asset

1. Redeeming aToken before contract expiry requires the possession of both OT and YT. The OT holder can obtain YT by either purchasing YT from the market or withdrawing YT from the liquidity pool.
2. With both OT and its corresponding YT in the wallet, the minter can execute redemption of the underlying aToken from Pendle.


## Applications

### Increased Exposure

If a trader holds the view that lending rates on LINK will continue to increase, he can simply buy YT on Pendle. The value of YT increases if interest rates rise, and he can choose to sell at any time or hold YT until expiry. He gains exposure in a more capital efficient manner as compared to buying and depositing the underlying asset.

Example:

Assuming 1 LINK is $1 and its annual yield is 24%, this makes 2 months of yield worth roughly 4c.

Disregarding time value of money, a trader can purchase exposure to 2 months of aLINK yield for 4 cents per token, instead of purchasing and locking in the actual token at $1, which is 25x more capital efficient.

### Yield Lock

An upcoming staking event increases demand for LINK, causing lending rates to increase sharply. Lender A holding Aave's aLINK anticipates that demand will begin to fall post event, leading to a decrease in rates in 2 week's time. He can act on this view and lock in his yields with Pendle. 

To do this, he deposits his aLINK, and in turn, receives both OT and YT. Next, he sells his YT (Uniswap style) on Pendle and receives USDT in return for giving up ownership of his future aLINK yield. Lender A can now repeat the process to lock in more yield or deploy his funds elsewhere. 

### Interest Rate Oracle

Using the price of YT traded and the time left to maturity, we can derive the implied yield the market is attributing to the underlying asset. This implied yield may be utilized in various forms, such as on-chain settlement of interest rate derivatives, input as part of an oracle service or an indication of the expected path of interest rates.

### Spread Trading

As the forward yield curve is created, traders can express their views on the market by trading YT with different maturities or different underlying assets. Pendle can be involved by creating products that provide 1-click exposure to such structures. For future development, it is possible for fees to be charged on such products and funnelled to the treasury to be managed by PENDLE holders (see below).

### On-Chain Yield Strategies

Given that prices of tokens are on-chain, a variety of strategies can be deployed for arbitrage and automated buying and selling of yield, as we see in the Yearn vaults.


## PENDLE Token

Pendle's native token will be utilized for governance. The landscape is changing rapidly and we see many innovations of value accrual. The team is committed but not limited to enabling the following token governance:

1. Allocation of liquidity incentives
2. Usage of treasury funds
3. Creation of new market pairs


## Future

As protocols like Aave continue to innovate in the space, we can continue to utilize these building blocks and grow the pie. Trading on credit will be possible in the near future.

DeFi ecosystems are also growing on emerging chains such as Polkadot and Cosmos. There will be opportunities to tokenize the yield of the most popular tokens and allow for cross-chain yield exposure and trading.

We are closely following the progress on cross-chain possibilities and believe that as the DeFi ecosystem expands, the emerging technologies will be able to support a vibrant interest rate trading layer across multiple chains.
