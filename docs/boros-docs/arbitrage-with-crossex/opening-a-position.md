import Hint from '@site/src/components/Hint';

# Opening a Position

Both halves of the trade are executed from the terminal: the **rate legs** on Boros and the **perp legs** through CrossEx. The recommended order is always **lock the rate first, then hedge the perps** — Boros price impact is higher and less predictable, so you want the spread secured before committing to the perp side.

## Reading the Opportunities scan

The Opportunities tab lists live fixed-rate spreads, each priced at your chosen notional and net of every cost the engine can model.

![Opportunities scan](/boros-docs/imgs/arbitrage-with-crossex/opportunities-scan.png "Opportunities scan")

Each card shows the coin, the two venues (which side is shorted and which is longed), the maturity, and:

- **APR** — the net return after fees, price impact, and slippage, annualised
- **CAPITAL** — what the four legs actually consume as margin
- **RETURN** — the estimated profit in dollars over the life of the position
- **NOTIONAL** — the size each leg is priced at

## Adjusting the assumptions

Click the **with these assumptions** bar to open the panel. Every change re-prices all the cards.

![Opportunity assumptions](/boros-docs/imgs/arbitrage-with-crossex/opportunity-assumptions.png "Opportunity assumptions")

**Notional** — $10k, $100k, $500k, or a custom amount from $1k to $100M.

**Perp entry**

- **2 market orders** — enter both legs immediately at market.
- **Limit + hedge** — rest a limit order on one venue, then market-order the other the moment it fills. Saves the maker/taker fee difference, at the cost of execution time.

**Perp exit cost**

- **Close positions** — assumes you close the perp legs at maturity.
- **Roll over** — assumes you keep the perp legs and roll them into the next maturity, skipping a round of perp fees entirely.

**Boros entry**

- **At mark rate** — assumes the Boros legs fill with no price impact.
- **Market at size** — assumes both Boros legs fill via market order at your size.

<Hint style="info">
Your current Gate VIP tier is already factored into every number. A higher tier meaningfully raises the APR on the same trade, since perp fees are one of the largest cost lines.
</Hint>

## Seeing the full breakdown

Click **More details** on any card to see how the number was built.

![Opportunity details](/boros-docs/imgs/arbitrage-with-crossex/opportunity-details.png "Opportunity details")

The panel lays out all four legs — the two CrossEx perp legs with their available leverage, and the two Boros rate legs with their rate before and after price impact — then a **NET EFFECT** line stating the funding spread being locked and the resulting APR on capital.

Below that, two waterfall charts: **profit by maturity**, itemising the gross spread down through Boros impact, Boros fees, settlement, perp entry fees, and entry slip to reach estimated profit; and **capital**, showing the initial margin each of the four legs contributes.

<Hint style="warning">
The APR here is modelled against the *minimum* capital the legs require. The Positions tab divides by the Boros collateral you have actually posted, so a live, over-collateralised position will read a lower APR than the estimate for the very same trade.
</Hint>

## Step 1 — Lock the rate on Boros

Click **Lock the rate** on the opportunity. This loads the two Boros legs into the **Boros rates** order ticket.

![Boros rates ticket](/boros-docs/imgs/arbitrage-with-crossex/boros-rates-ticket.png "Boros rates ticket")

Check **Leg A** and **Leg B** — each is a market and maturity, with its own Long/Short side — then set **Size per leg**, keep the mode on **Open**, and set **Max slippage (% APR)**, which caps how far each leg may fill from the quoted rate. Click **Confirm — 2 Boros market orders** to send them.

The two markets must share a collateral and maturity. You can also use this ticket standalone to close rate legs (switch to **Close**, which is reduce-only) or to open a single leg via the **Single** tab.

<Hint style="info">
To improve the spread you lock, consider resting a limit order on one Boros leg and market-ordering the other, rather than taking both at market. Sometimes this is worth a good deal of APR — though a clearly good opportunity may be worth taking immediately before someone else does.
</Hint>

## Step 2 — Hedge the perps on CrossEx

With the rate locked, click **Hedge the perps** to load the perp legs into the **CrossEx perps** ticket. Set **Size per leg**, then choose an execution mode.

**2 market orders** opens both legs immediately — simple, and the right choice when you want certainty of fill.

**Limit + hedge** is the default and saves fees. The maker side is chosen automatically to minimise the total fee bill. After you click **Execute pair**:

1. A limit order is placed at the maker price — set just beyond the touch by default, and tracking the book until you type a price to pin it.
2. Each time it fills, in whole or in part, the filled amount is immediately hedged with a market order on the other venue.
3. This repeats until the pair is complete.

If the **Convert to taker after** countdown (1m / 5m / 15m) expires with the order unfilled, the remainder is cancelled and completed at market. Click **Stop** before it runs out if you'd rather it didn't. If a resting order is sitting too far from the market, **Re-peg to touch** moves it back beside the best bid/ask, and you can also re-peg to a custom price.

<Hint style="warning">
Execute a small test size first to get familiar with the flow before trading meaningful amounts. For a large position, break it into several executions — five lots of $100k rather than $500k at once — to reduce average slippage. Executing when the market is calm helps too.
</Hint>

Once both steps are done you hold all four legs, and the **Positions** tab shows your locked rate and estimated return until maturity.

Next: [Monitoring & Closing Positions](./monitoring-and-closing)
