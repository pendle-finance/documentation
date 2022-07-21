
# How it Works

Pendle operates on three core pillars:

1. SCY
2. AMM
3. vePENDLE

## SCY

<!-- <p id="gdcalert8" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image8.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert9">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

![alt_text](images/image8.png "image_tooltip") -->

SCY (EIP-5115) is a token standard that implements a standardized API for wrapped ibTokens within smart contracts. All ibTokens can be wrapped into SCY, giving them a common interface that can be built upon. SCY opens up Pendle’s yield-tokenization mechanism to all ibTokens in DeFi, creating a permissionless ecosystem.

For example, stETH, cDAI and yvUSDC can be wrapped into SCY-stETH, SCY-cDAI and SCY-yvUSDC, standardising their yield-generating mechanics to be supported on Pendle._

As all SCYs have the same mechanism, Pendle interacts with SCY as the main interface to all ibTokens. PT and YT are minted from SCY and Pendle AMM pools trade PT against SCY.

While this might seem daunting, Pendle automatically converts ibTokens into SCY and vice versa. This process happens automatically behind the scenes, making users feel as if they’re interacting directly with their ibTokens instead of having to manually deal with SCY &lt;> ibToken conversion.

While this standard benefits Pendle, our vision for SCY extends beyond just our own protocol. SCY aims to create unprecedented composability across all of DeFi, enabling developers to seamlessly build on top of existing contracts without the need for manual integration.

Read more about SCY and EIP-5115 [here](https://ethereum-magicians.org/t/eip-5115-super-composable-yield-token/9423)

## AMM

Pendle’s V2 AMM is designed specifically for trading yield, and takes advantage of the behaviours of PT and YT.

The AMM curve changes to account for yield accrued over time and narrows PT’s price range as it approaches expiry. This results in increased capital efficiency to trade yield as the possible price range is narrowed down as PT approaches expiry, concentrating liquidity into a meaningful range.

Furthermore, by implementing a pseudo-AMM inspired by Notional Finance, we are able to both facilitate PT and YT swaps using a single pool of liquidity. With a PT/SCY pool, PT can be directly traded with SCY, while YT trades are also possible via flash swaps.

### Swaps

Both PT and YT are tradeable on Pendle through a single pool of liquidity. This is made possible by implementing a pseudo-AMM with flash swaps, inspired by [Notional Finance](https://notional.finance/).  

Liquidity pools in Pendle V2 are set up as PT/SCY, e.g. PT-aUSDC / SCY-aUSDC. Swapping PT is a straightforward process of swapping between the 2 assets in the pool, while swapping YT is enabled via flash swaps in the same pool.

    _Auto-routing is built in, allowing anyone to trade PTs and YTs with any major asset._

### Flash Swaps

Flash swaps are possible due to the relationship between PT and YT. As PT and YT can be minted from and redeemed to its underlying SCY, we can express the price relationship:

PT + YT = SCY.

Knowing that YT price has an inverted correlation against PT price, we use this price relationship to utilise the PT/SCY pool for YT swaps.

Buying YT:

1. Buyer sends SCY into the swap contract (auto-routed from any major token)
2. Contract withdraws more SCY from the pool
3. Mint PTs and YTs from all of the SCY
4. Send the YTs to the buyer
5. The PTs are sold for SCY to return the amount from step 2

<!-- <p id="gdcalert9" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image9.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert10">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

![alt_text](images/image9.png "image_tooltip") -->

Selling YT:

1. Seller sends YT into the swap contract
2. Contract borrows an equivalent amount of PT from the pool
3. The YTs and PTs are used to redeem SCY
4. A portion of the SCY is swapped to PT to return the amount from step 2
5. SCY is sent to the seller (or routed to any major tokens, e.g. ETH, USDC, wBTC, etc)

<!-- <p id="gdcalert10" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image10.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert11">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

![alt_text](images/image10.png "image_tooltip") -->

As shown above, YT trades are executed through the PT / SCY pool. As the pool accommodates both PT and YT swaps, LPs will earn fees from both YT and PT swaps.

### Key Features

#### Minimal Impermanent Loss (IL)

Pendle V2 design ensures that IL is a negligible concern. Pendle’s AMM accounts for PT’s natural price appreciation by shifting the AMM curve to push PT price towards its underlying value as time passes, mitigating time-dependent IL.

On top of that, IL from swaps is also mitigated as both assets LP’ed are very highly correlated against one another (e.g. PT-stETH / SCY-stETH). If liquidity is provided until expiry, an LP’s position will be equivalent to fully holding the underlying asset since PT essentially appreciates towards the underlying asset.

In most cases prior to expiry, PT trades within a yield range and does not fluctuate as much as an asset’s spot price. For example, it’s rational to assume that Aave’s USDC lending rate fluctuates between 0%-15% for a reasonable timeframe (and PT accordingly trades within that yield range). This premise ensures a low IL at any given time as PT price will not deviate too far from the time of liquidity provision.

#### Customizable

<!-- <p id="gdcalert11" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image11.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert12">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

![alt_text](images/image11.png "image_tooltip") -->

Pendle’s AMM curve can be customised to cater to tokens with varying yield volatilities. Yields are often cyclical in nature and typically swing between highs and lows. Typically, the floor and ceiling for the yield of a liquid asset are much easier to predict than its price.

For example, the annual yield of staked ETH is likely to fluctuate in a band of 0.5-7%. Knowing the rough yield range of an asset enables us to concentrate liquidity within that range, enabling much larger trade sizes at a lower slippage.

#### Greater Capital Efficiency

_For Liquidity Providers_

Since YT trades are routed through the same PT/SCY pool, LPs earn fees from both PT and YT swaps from a single liquidity provision, doubling the yield from LPing.

_For Traders_

Rather than having separate pools for YT and PT, concentrating all tokens in a PT/SCY pool will result in greater liquidity. This will allow traders to make trades of greater volume without having to worry about much slippage, granting traders greater price certainty.

## vePENDLE
