---
hide_table_of_contents: true
---

# AMM

Pendle’s V2 AMM is designed specifically for trading yield, and takes advantage of the behaviours of PT and YT.

**The AMM model was adapted from Notional Finance's AMM.** The AMM curve changes to account for yield accrued over time and narrows PT’s price range as it approaches maturity. By concentrating liquidity into a narrow, meaningful range, the capital efficiency to trade yield is increased as PT approaches maturity

Furthermore, we managed to create a pseudo-AMM that allows us to both facilitate PT and YT swaps using just a single pool of liquidity. With a PT/SY pool, PT can be directly traded with SY, while YT trades are also possible via flash swaps

## Swaps

Both PT and YT are tradeable anytime on Pendle through a single pool of liquidity. This is made possible by implementing a pseudo-AMM with flash swaps.

Liquidity pools in Pendle V2 are set up as PT/SY, e.g. PT-aUSDC / SY-aUSDC. Swapping PT is a straightforward process of swapping between the 2 assets in the pool, while swapping YT is enabled via flash swaps in the same pool.

> Auto-routing is built in, allowing anyone to trade PTs and YTs with any major asset.

## Flash Swaps

Flash swaps are possible due to the relationship between PT and YT. As PT and YT can be minted from and redeemed to its underlying SY, we can express the price relationship:
$$$
P(PT) + P(YT) = P(Underlying)
$$$

Knowing that YT price has an inverted correlation against PT price, we use this price relationship to utilise the PT/SY pool for YT swaps.

Buying YT:
1. Buyer sends SY into the swap contract (auto-routed from any major token)
2. Contract withdraws more SY from the pool
3. Mint PTs and YTs from all of the SY
4. Send the YTs to the buyer
5. The PTs are sold for SY to return the amount from step 2

![Buying YT](/img/ProtocolMechanics/buying_yt.png "Buying YT")

Selling YT:
1. Seller sends YT into the swap contract
2. Contract borrows an equivalent amount of PT from the pool
3. The YTs and PTs are used to redeem SY
4. SY is sent to the seller (or routed to any major tokens, e.g. ETH, USDC, wBTC, etc)
5. A portion of the SY is sold to the pool for PT to return the amount from step 2

![Selling YT](/img/ProtocolMechanics/selling_yt.png "Selling YT")

## Key Features

### Minimal Impermanent Loss (IL)

Pendle V2 design ensures that IL is a negligible concern. Pendle’s AMM accounts for PT’s natural price appreciation by shifting the AMM curve to push PT price towards its underlying value as time passes, mitigating time-dependent IL.

On top of that, IL from swaps is also mitigated as both assets LP’ed are very highly correlated against one another (e.g. PT-stETH / SY-stETH). If liquidity is provided until maturity, an LP’s position will be equivalent to fully holding the underlying asset since PT essentially appreciates towards the underlying asset.

In most cases prior to maturity, PT trades within a yield range and does not fluctuate as much as an asset’s spot price. For example, it’s rational to assume that Aave’s USDC lending rate fluctuates between 0%-15% for a reasonable timeframe (and PT accordingly trades within that yield range). This premise ensures a low IL at any given time as PT price will not deviate too far from the time of liquidity provision.

### Customizable AMM

![Customizable AMM](/img/ProtocolMechanics/customizable_amm.png "Customizable AMM")

Pendle’s AMM curve can be customised to cater to tokens with varying yield volatilities. Yields are often cyclical in nature and typically swing between highs and lows. Typically, the floor and ceiling for the yield of a liquid asset are much easier to predict than its price.

For example, the annual yield of staked ETH is likely to fluctuate in a band of 0.5-7%. Knowing the rough yield range of an asset enables us to concentrate liquidity within that range, enabling much larger trade sizes at a lower slippage.

### Greater Capital Efficiency

_For Liquidity Providers_
Since YT trades are routed through the same PT/SY pool, LPs earn fees from both PT and YT swaps from a single liquidity provision, doubling the yield from LPing.

_For Traders_
Rather than having separate pools for YT and PT, concentrating all tokens in a PT/SY pool will result in greater liquidity. This will allow traders to make trades of greater volume without having to worry about much slippage, granting traders greater price certainty.
