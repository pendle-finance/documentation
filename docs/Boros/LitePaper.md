---
hide_table_of_contents: true
---

# Boros Lite Paper

This document outlines how Boros works in a more high level and user-centric manner. Exact formal definitions and formulas can be found in the [whitepaper](https://github.com/pendle-finance/boros-core-public/blob/main/whitepapers/AMM.pdf).

# How does Boros work from a user perspective?

### Interest rate swap mechanics

- Users can open **interest rate swap positions** to speculate on **interests** of certain asset.
- An **interest rate swap position** = user has to pay an **interest stream** and receive another **interest stream** until a **maturity**. There are only two possible scenarios:
  - Receive the **floating interest**, and pay a **fixed interest**
  - Receive a **fixed interest**, and pay the **floating interest**
- **floating interest** = the current interest (underlying APY in V2), **always in APR**, being determined by **an external oracle**
- What is the **fixed interest** that the user has to pay?
  - It's specific to each user's position and it's basically based on demand and supply in Boros **when the user opens the position**.
- Example:
  - Today, the fixed interest level (or Implied APR) being traded in Boros is 5% for ETHUSDT funding rate market.
  - Alice gets an interest swap position (pay fixed, get floating) at the current 5% fixed rate ⇒ Alice can hold this position all the way to the maturity and pay 5% APR all the way, while getting the floating interest along the way.
  - The next day, the fixed interest level (implied interest) being traded in Boros is 6%. However, Alice is still paying 5% in her interest rate swap position. Alice's position is already locked in at 5% fixed rate.
  - However, Alice can "sell the current swap position" by essentially creating another opposite position of (pay floating, get fixed) of the same magnitude to **close** the current position. Depending on the difference between the fixed rate of the user's position and the current fixed rate being traded, the sale of the user's position can be deemed a net loss or profit.

### Interest rate swap markets

- For users to start holding and trading interest rate swaps, there has to be a market created for it.
- Each interest rate swap market has a few main attributes:
  - The external oracle for floating interest rate. This defines which interest the users will be trading. For example: Binance ETHUSDT Perp Funding Rate
  - The base asset (like ETH for trading Binance ETHUSDT Perp), which is used for accounting profit/loss and denominating the position sizes.
  - The maturity for the interest rate swap positions
  - Parameters to control the risks for the market
- Each market will have a "Mark Rate", which is the market Implied APR that will be used to value user positions' unrealized profits and loss. This Mark Rate will be a TWAP-like oracle taking from historical trades.

### Interest rate swap trading zone

- Users must deposit **collateral** in terms of base asset into a "trading zone", to open interest rate swaps.
- Each trading zone comprises of multiple interest rate swap markets of the same base asset.
  - For example: an "ETH trading zone" could have the following markets:
    - Binance ETHUSDT Funding Rate, 27 Dec 2024 Maturity
    - Binance ETHUSDT Funding Rate, 28 March 2025 Maturity
    - Deribit ETHUSDT Funding Rate, 28 March 2025 Maturity
- To open a new interest rate swap, a user must satisfy the **initial margin requirements** for the position they want to open.
- Users must maintain enough collateral to cover the **maintenance margin requirements** for their open positions, otherwise they could be liquidated.
- User's health and liquidations are trading-zone-specific.

### Orderbook for matching swaps

- Each Boros market has a native orderbook to facilitating opening swaps.
- Users can open a new swap in two ways:
  - Open a limit order on the orderbook and wait for someone to take their order, creating a pair of swaps between the two users.
  - Do a market order, filling an existing limit orders, creating a pair of swaps between the two users.

### Important terms and mechanics, using an example

- Example market: ETHUSDT funding rates on Binance
  - Maturity: in 6 months (June 2025)
  - Liquidation Incentive Factor:
    - Starts at 10%, linearly increases to 50% when marginRatio = 0.5
  - Initial Margin Rate:
    - 50% of Mark Rate, with a minimum of 5% (I_threshold = 10%)
  - Maintenance Margin Rate:
    - 25% of Mark Rate, with a minimum of 2.5%
- 6 months before maturity
  - Alice wants to gets a **swap position** with **size = 10 ETH**, **paying fixed and receiving floating (Long Rate)**
  - Alice deposits 0.4 ETH collateral into the ETH trading zone.
  - Current Mark Rate is 12%
  - Alice is good to pay a fixed rate of 12% (and below), so she offers to pay 12% fixed rate on 10 ETH to get the floating interest stream, by placing an order in an on-chain orderbook.
    - **Initial Margin Rate** is 50% \* 12% = 6%
    - **Initial margin needed** for this position = 10 \* 0.5 years \* 6% = 0.3 ETH out of Alice's 0.4 ETH collateral. Alice's available initial margin left is 0.1 ETH after placing the limit order.
  - Bob is another user who wants to pay the **floating rate** in exchange for a **fixed rate**. Bob is good to receive 12% fixed (and above) on 10 ETH, do a market order on the orderbook and fills Alice's limit order.
  - Now, a pair of swap between Alice is Bob is created and:
    - Alice has
      - 0.4 ETH in collateral, minus a debt of 12% \* 10 \* 0.5 = 0.6 ETH that is "realized" immediately
        - = -0.2 ETH **collateral** (it's ok to have negative "collateral" because there is still the value of the floating leg)
      - A **position** of **"10 ETH paying fixed 12% (already paid upfront) & receiving floating until June 2025"**
        - Note that from the contract perspective, we don't track and don't care about the number 12%, because it's already paid upfront
      - The **Mark rate** in the ETHUSDT Dec 2024 **interest rate swap market** is currently **12%** (it's a TWAP rate)
      - Alice's **swap position** has a **"unrealized PnL"** of 12% \* 10ETH \* 0.5 years = **0.6 ETH** because the floating stream is currently valued at 12%
      - Alice has 0 **realized PnL** because she has just opened the swap
      - Alice has a **current** **total value** = **collateral value** + **unrealized PNL = -0.2 + 0.6 = 0.4 ETH**
      - Alice's total initial margin consumed is 0.3 ETH
      - Alice's total maintenance margin required is 10 \* 0.5 years \* 3% = 0.15 ETH
        - (Margin rate = 25% \* 12% = 3%)
      - Alice's health ratio is 0.4 / 0.15 = 2.67 (healthy)
- After 1 months, (5 **months** before maturity), the average ETH funding rate has been 10%. Now, let's say the **mark rate** is 5% (traders on Boros collectively thinks the average future rate is at 5%)
  - At this point, Alice has
    - A **swap position** of **"10 ETH, paying 12% fixed (paid upfront) & receiving floating until June 2025"** [Same]
    - Alice's **swap position** has a **"unrealized PnL"** of: 5% \* (5 months / 12 months) \* 10 ETH = 0.2083 **ETH**
    - Alice has **realized PnL** = 10% \* (1 months / 12 months) \* 10 ETH = +0.08333 ETH = total floating stream payments over the 1 month
      - All realized PnL **gets reflected in the collateral value** immediately
      - New **collateral value** = -0.2 + 0.08333 = -0.1167 ETH
    - Alice has a **current total value** = **collateral value** + **unrealized PnL** = -0.1167 + 0.2083 = 0.0916 ETH
    - Alice's maintenance margin required is: 10 ETH \* 5/12 years \* 2.5% = 0.1042 ETH
      - Maintenance margin rate is 2.5%, since 25% of Mark rate = 25% \* 5% is below the min 2.5%
    - Alice's margin ratio is **0.0916** / 0.1042 = 0.88 < 1 ⇒ unhealthy
- Charlie liquidates 100% of Alice's position (5 months before maturity)
  - Before liquidation, Charlie has:
    - 10 ETH collateral
    - 0 position
  - When liquidation happens, two steps happen:
    - Step 1: A swap of 10ETH happens between Charlie and Alice at the current Mark Price (5%)
      - For Charlie:
        - Charlie will hold a position of "10 ETH, paying 5% (paid upfront) & receiving floating until June 2025"
        - The debt of 10 \* 5% \* 5/12 = -0.2083 is realized into Charlie collateral
        - Charlie's collateral is 10ETH-0.2083ETH = 9.7917 ETH now
      - For Alice:
        - Alice's new swap of "10 ETH, receiving 5% (paid upfront) & paying floating until June 2025" is merged with her existing position of "10 ETH, paying 12% fixed (paid upfront) & receiving floating until June 2025"
          - The result of the merge is a 0 position, and getting paid upfront for the new debt of -10 \* 5% \* 5/12 = -0.2083 ETH
        - Alice's collateral is now -0.1167 - (-0.2083) = 0.0916 ETH
    - Step 2: A liquidation incentive is transferred from Alice's collateral to Charlie's collateral
      - Since Alice's margin Ratio is 0.88, the liquidation incentive factor is 19.6% (it linearly goes up from 10% to 50% as margin ratio goes down from 1 to 0.5)
      - After the liquidation, Alice's maintenance margin goes down by 0.1042 ETH
      - Liquidation incentives = 19.6% \* 0.1042 = 0.0204 ETH
      - As such, 0.0204 ETH is transferred from Alice's collateral to Charlie's collateral
  - Final states:
    - Alice:
      - 0 position
      - Collateral = 0.0916 - 0.0204 = 0.0712 ETH
    - Charlie:
      - a position of "10 ETH, paying 5% (paid upfront) & receiving floating until June 2025"
      - Collateral = 9.7917 + 0.0204 = 9.8121 ETH
