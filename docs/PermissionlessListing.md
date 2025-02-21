# How Pendle Works 
Pendle splits a yield-bearing token into:
- PT (Principal Token): Fixed yield until maturity.
- YT (Yield Token): Earns all yield and rewards.

Users can trade PT and YT via Pendle AMM (LP), which consists of PT and the underlying asset (SY).
YT holders and part of LP (SY portion) receive yield, rewards, and points.
Learn more [here](https://docs.pendle.finance/ProtocolMechanics/YieldTokenization/SY).


# Step 1. SY Deployment

- Write the SY contract for underlying asset. Some examples below as reference 
    - [sUSDe (Ethena)](https://github.com/pendle-finance/Pendle-SY-Public/blob/main/contracts/core/StandardizedYield/implementations/Ethena/PendleSUSDESY.sol)
    - [USDe (Ethena)](https://github.com/pendle-finance/Pendle-SY-Public/blob/main/contracts/core/StandardizedYield/implementations/Ethena/PendleUSDESY.sol)

- Engage auditors to audit the SY contract
    - WatchPug (faster process):
        - ~$3k for simple ERC4626 (1-day audit)
        - ~$5k for complex SY (2-day audit)
    - Other trusted auditors.

- Both deployer and auditor to complete [Pendle ERC4626 checklist](https://www.notion.so/pendle/Pendle-ERC4626-checklist-190567a21d3780f6b83dd249528df978?pvs=4).

- Deploy SY once the checklist is cleared.


# Step 2. Market Deployment

- Deploy Market using Pendle’s market deployer contract
    - Detailed guide [here](https://github.com/pendle-finance/Pendle-Common-Pool-Deploy)

- Necessary parameters to set
    - Maturity
    - Min implied APY
    - Max implied APY
    - token to seed
    - Initial seed amount

- Guide on setting maturity
    - Shorter maturity has higher activity but longer maturity is more attractive for LP
    - Generally 2 to 6 months maturity is the sweet spot
    - Maturity must always end on a Thursday 00:00 UTC
    - For market with points, maturity should ideally be slightly before or slightly after the end of the points campaign or TGE
    - Example
        - USDe: Season 1 campaign ends and TGE happens late April 2024, so first USDe pool maturity was set to end of April 2024
        - USD0++: TGE and campaign happens until end of December 2024, but incentive kicks in straight away, so 2 pools were launched, one with January 2025 maturity and one with March 2025 maturity
        - liquidBeraETH and liquidBeraBTC: redemption opens up around April or May 2025 period, so pool maturity was set to mid April 2025 to align the dates

- Guide on setting yield range (min and max implied APY)
    - Metrics used to determine yield range
        - Historical min and max APY data
        - $ value of points by estimating FDV and airdrop amount along with points multiplier
        - Market condition (yield tends to be higher when market is bullish)
        - Some buffer on the upper and lower end (~25% in yield terms)
    - Example
        - SY-DUMMY underlying yield historically fluctuates between 6% to 10% APY
        - SY-DUMMY gives out `dummy` points and expected APY from airdrop is 10%
        - Adding a 5% buffer at the bottom and top range means `min rate: 11%` and `max rate: 25%`

- A small amount of liquidity (~$10) has to be seeded for deployment


# Step 3. Token Pricing Setup

- All SY’s related tokens must have a way to get price, including: ***Input tokens***, ***output tokens***, ***yield token***, ***underlying asset token***, ***reward tokens*** (if any).

- For each applicable token:
    1. Check if the price exists on Pendle: `https://api-v2.pendle.finance/core/v1/<chainId>/prices/assets/addresses?addresses=<assetAddress>`.
    2. If not available, provide pricing source from one or more sources below
        - Chainlink / Redstone feed — provide chain & contract adddress (L2 preferred)
        - DEX pool with deepest liquidity — Provide the chain, type of pool (UniV3, UniV2, BalancerV2, Curve, etc) & address of the liquidity pool
        - Pyth feed — provide Price Feed ID

- Make a copy of this [sheet](https://docs.google.com/spreadsheets/d/1akNXXqvia-o-5s1v4hQc_eB30ILVcCFOCtO63y7lLQQ/edit?usp=sharing) and fill it up with the information above (Example is included in the google sheet)

- Once completed, send the sheet to Pendle team for verification

- Once verified, Pendle team will complete the pricing strategy setup for all the tokens

- One-time setup per SY


# Step 4. Metadata Setup

- Submit this [form](https://docs.google.com/forms/d/e/1FAIpQLSfuOkE0nRMcKPvzTVdsjrkpbR7f1p24IJHvpoEyIW7W8RQESw/viewform?usp=header ) using team's official account (sUSDe (Bera Concrete) market used as an example in the form)

- Includes:
    - Market metadata
    - Points metadata (multiplier and points dashboard)
    - Campaign details, off-chain rewards, special boosting duration and locking mechanisms

- Once verified, the Pendle team will enable limit orders, add to the vote controller, and whitelist the market on Pendle UI.

- Each new market/maturity requires a new form submission.


# Step 5. Post deployment

- **Bootstrap Liquidity**: Seed $150k+ in the pool with Keep YT Mode enabled.
    - This reduces price impact for zaps (<1%) which helps to further build the liquidity.
    - There are no conditions on the POL you have on Pendle. Feel free to withdraw your POL if you feel that the pool is sufficiently bootstrapped.
    - Holding until maturity earns yields, $PENDLE incentives, and fees.
    - Zero IL at maturity; minimal IL for early withdrawals.

- **Liquid Lockers**: Your pool should appear on liquid lockers within 5 days. Feel free to contact them if it has not appeared after 5 days.
    - Currently there are 3 liquid lockers built on top of Pendle, each with their own bribe ecosystem.
        - [Penpie](https://www.pendle.magpiexyz.io/stake)
        - [Equilibria](https://equilibria.fi/stake)
        - [StakeDAO](https://www.stakedao.org/yield?protocol=pendle)
    - Protocols can consider using one of the bribe markets to help bootstrap liquidity to their pool by increasing the amount of $PENDLE incentives channeled to their pools
    - Alternatively, protocols can also Lock $PENDLE to vePendle and vote for their pools directly to channel incentives

- **Points & Rewards Distribution**:
    - As a partner, you are responsible for ensuring the points tracking are implemented quickly and accurately. Use the script provided by us to ensure that points are calculated accurately
    - To query for balances for YT and LP for users to allocate off-chain points and rewards, refer to this [guide](https://www.notion.so/pendle/Pendle-Points-Tracking-8267edcaa0714752be1cb9c726610ddb?pvs=4)
    - Any rewards that are accrued to the SY must be distributed to the end users of YT and LP. If there are rewards airdropped to our SY contract, we will not be able to claim it and redistribute to users. For any queries related to points for your protocol, we will redirect them to your discord.
    - Additional things to note for points tracking (which the script has taken into account):
        - SY in LP and YT are eligible for points, PT will forgo points
        - 3% of points generated from YT will be accrued into Pendle Treasury as fees
        - 100% of points generated from matured PT will be accrued into Pendle Treasury as fees