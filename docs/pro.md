# Pro UI
Pro gives users access to the full suite of Pendle’s functionality, allowing you to freely trade yield and execute any yield strategies. 

Users can deposit yield-generating assets into Pendle and mint Principal Tokens (PT) and Yield Tokens (YT). PT represents the principal of the underlying ibToken, while YT represents entitlement to all the yield of the asset. You can trade both PT and YT on Pendle. 

In TradFi, what Pendle does is similar to bond stripping. The principal and interest of bonds are separated, so PTs are equivalent to zero-coupon bonds, while YTs are the detached coupons.

## Using Pendle Pro
To enable Pendle Pro, toggle the button in the top right corner of the app. 
insert UI screenshot

If you are new to Pendle or yield trading, we have a handy tutorial in this section to give you a tour of the Pro interface, and an ELI15 guide in the next section for you to read about the basics of yield trading. 
### Mint 
### Trade 
### Liquidity Provision 
### Claim 
### Creating New Pools

## ELI15 Yield Trading
By separating the yield from the asset, Pendle enables users to trade yield, unlocking a wide variety of strategies that asset holders can choose from. This is the core functionality of Pendle.

Besides securing high yields, you can also get massive discounts on assets, as well as earn additional yield on top of already insane APYs.

With V2 architecture, your yield trading potential is further improved, with reduced slippage and impermanent loss thanks to the new AMM.

### The Basics
Buy low, sell high.

Every trader knows this mantra. We buy assets when the price is low, and sell them for a profit when the price pumps.

Trading yield on Pendle is no different, except instead of looking at the price itself, we look at a derived value known as implied yield.
Implied Yield
The math behind implied yield is a little more involved, but it is also not absolutely necessary to understand the math to understand how to trade. Refer to the appendix to dive deeper.

TL;DR: implied yield is the market's evaluation of an asset's yield, as determined by the market price of YT.

A lower YT price implies a lower yield, while a higher YT price implies higher yield. The opposite would be true for PT price.


Implied yield of YT-PA/P

To know when to buy or sell, you just need to compare the yield of the underlying asset versus the implied yield or discount.

If the implied yield is lower than the average expected yield, you are paying less to get the same underlying yield via YT.

If the implied yield is higher than the average expected yield, your YT is worth more than the yield accrued by holding YT.

Knowing all this, you can easily make informed trading decisions on Pendle.

#### Case Study
We can see the power of yield trading on Pendle from Vu's 240K% APY example that was brought up earlier. Let's see if we can emulate what he did with a more relevant asset.

Let’s say you want to farm stablecoins on Avalanche and you have supplied $1000 of USDC into Benqi, receiving qiUSDC in return. That deposit would net you around 6% APY if you simply let it sit there.

That's not a lot, but Pendle can help to make your wealth work a little harder and squeeze out some extra yield.

Let's say the implied yield of qiUSDC on Pendle is currently at 4%. If you think that the Benqi yield of 6% will hold in the long term, it means that YT-qiUSDC is currently underpriced.

To convert your qiUSDC to YT-qiUSDC, you can first mint YT and PT from qiUSDC, then sell your PT for USDC and use that to buy YT.

How much of a difference does this make? Using this method, you will actually get an APY of 150%, since you have effectively bought a 6% APY at the price of a 4% APY. That's a huge difference compared to simply holding qiUSDC.

In the case that the implied yield is higher than the actual yield, this means the PT is underpriced and you can simply buy and hold PT to earn the extra APY.

Of course, there is a bit of luck and timing involved, but with the volatility of crypto prices and some number crunching, there will be plenty of opportunities to make quick bucks.

#### Appendix
Copy paste: https://docs.pendle.finance/docs/information/dive-deeper/implied-yield

### Fixed Yield
Also known as 'Lock Yield' or 'Capture Yield'.

With variable yield assets, APYs can spike to unusually high values. These spikes are not uncommon, but they don't last for very long.

Pendle enables users to fix your future yield at current rates, which is very useful if you are bearish on yield - you believe that current APY is unsustainable and will fall in the future.

To do this, you would want to convert all of the underlying asset to its PT equivalent. This can be achieved in two ways.
If you already hold the underlying asset, deposit it into Pendle to mint YT and PT, sell the YT and buy more PT.
If you don't have any underlying tokens or wish to increase your exposure to the asset, you can simply buy PT outright.
So you might be wondering, how does holding PT instead of the asset help you to capture high APY? Let's find out in the next section.

#### Case Study
Dan notices that lending interest for $AVAX on Benqi, which usually sits around 8%, has spiked to 15%. To take advantage of this, he wants to buy PT-qiAVAX with 1 year expiry, which is trading at ~87% the price of $AVAX. (Why 87%? Click here to learn more about the fair price.)

Let's say he has 100 $AVAX and buys ~115 PT-qiAVAX. After a year, when the contract expires, he will be able to redeem 115 PT-qiAVAX for 115 qiAVAX, giving an APY of 15%.

If he instead deposited his 100 $AVAX in BenQI directly, the lending rates would have regressed to its average of 8%, and he would have only gotten 108 qiAVAX in a year, or 8% APY.

By buying PT, he "locks in" the high prevailing APY, allowing him to take full advantage of the spike, even if the actual APY falls afterwards.

### Compounded Yield
Leverage is a common concept in crypto. You loop lending and borrowing to increase your exposure to the price of an asset, so that when its price increases 100x, you will profit 300x.

One big risk here though - you're "leveraged to the tits", as it were. On the off-chance that the price actually drops, your entire portfolio can potentially get liquidated, leaving you with next to nothing.

With Pendle, you can leverage your exposure to the yield of a yield-bearing asset without any borrowing, meaning that there's no liquidation risk and you can multiply your profits without risking more than what you invest if you are bullish on yield.

image

To leverage, you simply buy YT. YT is capital efficient, as you can buy more YT with the same amount of capital since it always costs less than the underlying asset. Holding more YT entitles you to more units of the asset yield, thus increasing your exposure to the yield.

#### Case Study
Anton is a savvy trader. Anton looks at the 3% lending rates for USDC on Aave and thinks that it will increase to 5% by EOY as demand for stablecoins will increase with an overall bearish market.

image

Let's say Anton has 1,000 USDC. If Anton simply deposits his USDC into Aave, he will receive 1,000 aUSDC in return, and by EOY, if his predictions come true, he will have 1,050 aUSDC, a 5% yield.

Instead, he can go to Pendle and buy YT-aUSDC priced at $0.03. (Why $0.03? Click here to learn more about Fair Price) With 1,000 USDC, he can buy 33,333 YT-aUSDC - that's more than 33x leverage.

By EOY when the YT expires, he will have accrued 33,333 units worth of aUSDC yield, which will be $0.05. In total, he has accrued 33,333 x 0.05 = 1667 aUSDC, giving an APY of 67%.

The 2% increase in Aave lending rates was multiplied by 33x for Anton due to his exposure to aUSDC yield via holding YT. That's the power of leverage on Pendle - all without any form of borrowed capital.

## How it Works
Pendle operates on three core pillars:

1. SCY
2. AMM
3. vePENDLE

### SCY

image

SCY (EIP-5115) is a token standard that implements a standardized API for wrapped ibTokens within smart contracts. All ibTokens can be wrapped into SCY, giving them a common interface that can be built upon. SCY opens up Pendle’s yield-tokenization mechanism to all ibTokens in DeFi, creating a permissionless ecosystem.

For example, stETH, cDAI and yvUSDC can be wrapped into SCY-stETH, SCY-cDAI and SCY-yvUSDC, standardizing their yield-generating mechanics to be supported on Pendle.

As all SCYs have the same mechanism, Pendle interacts with SCY as the main interface to all ibTokens. PT and YT are minted from SCY and Pendle AMM pools trade PT against SCY. 

While this might seem daunting, Pendle automatically converts ibTokens into SCY and vice versa. This process happens automatically behind the scenes, making users feel as if they’re interacting directly with their ibTokens instead of having to manually deal with SCY <-> ibToken conversion.
 
While this standard benefits Pendle, our vision for SCY extends beyond just our own protocol. SCY aims to create unprecedented composability across all of DeFi, enabling developers to seamlessly build on top of existing contracts without the need for manual integration. 

Read more about SCY and EIP-5115 here.

### AMM

Pendle’s V2 AMM is designed specifically for trading yield, and takes advantage of the behaviors of PT and YT. 

The AMM curve changes to account for yield accrued over time and narrows PT’s price range as it approaches expiry. This results in increased capital efficiency to trade yield as the possible price range is narrowed down as PT approaches expiry, concentrating liquidity into a meaningful range.

Furthermore, by implementing a pseudo-AMM inspired by Notional Finance, we are able to both facilitate PT and YT swaps using a single pool of liquidity. With a PT/SCY pool, PT can be directly traded with SCY, while YT trades are also possible via flash swaps.
Swaps 
Both PT and YT are tradeable on Pendle through a single pool of liquidity. This is made possible by implementing a pseudo-AMM with flash swaps, inspired by Notional Finance.  

Liquidity pools in Pendle V2 are set up as PT/SCY, e.g. PT-aUSDC / SCY-aUSDC. Swapping PT is a straightforward process of swapping between the 2 assets in the pool, while swapping YT is enabled via flash swaps in the same pool.

Auto-routing is built in, allowing anyone to trade PTs and YTs with any major asset.
Flash Swaps
Flash swaps are possible due to the relationship between PT and YT. As PT and YT can be minted from and redeemed to its underlying SCY, we can express the price relationship: 

PT + YT = SCY. 

Knowing that YT price has an inverted correlation against PT price, we use this price relationship to utilise the PT/SCY pool for YT swaps.

Buying YT: 
Buyer sends SCY into the swap contract (auto-routed from any major token)
Contract withdraws more SCY from the pool
Mint PTs and YTs from all of the SCY
Send the YTs to the buyer
The PTs are sold for SCY to return the amount from step 2


Selling YT:
Seller sends YT into the swap contract
Contract borrows an equivalent amount of PT from the pool
The YTs and PTs are used to redeem SCY
A portion of the SCY is swapped to PT to return the amount from step 2
SCY is sent to the seller (or routed to any major tokens, e.g. ETH, USDC, wBTC, etc)


As shown above, YT trades are executed through the PT / SCY pool. As the pool accommodates both PT and YT swaps, LPs will earn fees from both YT and PT swaps. 

#### Key Features
Minimal Impermanent Loss (IL)
Pendle V2 design ensures that IL is a negligible concern. Pendle’s AMM accounts for PT’s natural price appreciation by shifting the AMM curve to push PT price towards its underlying value as time passes, mitigating time-dependent IL. 

On top of that, IL from swaps is also mitigated as both assets LP’ed are very highly correlated against one another (e.g. PT-stETH / SCY-stETH). If liquidity is provided until expiry, an LP’s position will be equivalent to fully holding the underlying asset since PT essentially appreciates towards the underlying asset. 

In most cases prior to expiry, PT trades within a yield range and does not fluctuate as much as an asset’s spot price. For example, it’s rational to assume that Aave’s USDC lending rate fluctuates between 0%-15% for a reasonable timeframe (and PT accordingly trades within that yield range). This premise ensures a low IL at any given time as PT price will not deviate too far from the time of liquidity provision.

#### Customizable
image

Pendle’s AMM curve can be customised to cater to tokens with varying yield volatilities. Yields are often cyclical in nature and typically swing between highs and lows. Typically, the floor and ceiling for the yield of a liquid asset are much easier to predict than its price. 

For example, the annual yield of staked ETH is likely to fluctuate in a band of 0.5-7%. Knowing the rough yield range of an asset enables us to concentrate liquidity within that range, enabling much larger trade sizes at a lower slippage.

#### Greater Capital Efficiency
For Liquidity Providers 
Since YT trades are routed through the same PT/SCY pool, LPs earn fees from both PT and YT swaps from a single liquidity provision, doubling the yield from LPing.

For Traders 
Rather than having separate pools for YT and PT, concentrating all tokens in a PT/SCY pool will result in greater liquidity. This will allow traders to make trades of greater volume without having to worry about much slippage, granting traders greater price certainty. 

