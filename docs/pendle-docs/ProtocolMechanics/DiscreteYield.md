---
hide_table_of_contents: true
title: Discrete Yield
---

# Discrete Yield Markets

Most yield-bearing tokens accrue continuously, so a YT holder earns a little every block. A **discrete-yield** asset does not: it pays in one lump on a schedule, and between payouts its on-chain value is flat. STRCx is the first such listing.

Under ordinary accounting, a YT holder's yield is the movement in the SY interest index while they held. When the index is flat and then jumps, that pays the **whole period's yield to whoever holds at the instant of the jump** — so the position to be in is bought the day before the payout and sold the day after.

Discrete-yield markets replace that rule with a time-weighted one and distribute retrospectively through a merkle claim on the Pendle dashboard.

## The three rules

1. **You earn for time held.** Held for three days of a month, you get three days' worth.
2. **You must still hold when the payout lands.** Sell partway through and the accrued yield is forfeited — and *not* passed to the buyer, who paid you for it in the sale price.
3. **You never earn more than your own position generated.** One YT earns the yield of one unit of underlying.

Rule 2 has a consequence worth stating outright: **forfeited yield is not redistributed to the holders who stayed.** Giving it to them would pay them more than their positions generated, which rule 3 forbids. It goes to the Pendle treasury instead.

Three quantities appear in the examples below, all measured in SY so that YT and LP positions compare directly:

- $A$ — the **average** SY a position held across the period
- $P$ — the SY it **still holds** at the payout block
- $E = \min(A, P)$ — what it is actually **paid on**

[How it is calculated](#how-it-is-calculated) at the end of the page gives the full derivation.

## Example 1 — earning for time held

A 10% annual yield, a period of one year, 2,000 YT in the pool and 200 funded, so the rate is 0.1 per SY. Both holders still hold at the payout.

- **Alice** holds 1,000 YT all year: $A = 1{,}000$, paid **100**.
- **Bob** holds 1,000 YT for two months of twelve: $A = 1{,}000 \times \tfrac{2}{12} = 167$, paid **17**.

The remaining **83** goes to the treasury. Under the old index rule Bob would have collected the same 100 as Alice, for a sixth of the holding time.

## Example 2 — selling before the payout

Same setup, except Bob holds all year and sells everything the day before the payout, to a buyer who is still holding when it lands.

$A = 1{,}000, \quad P = 0, \quad E = \min(1{,}000, 0) = 0$

Bob is paid nothing — he was compensated in the sale price. Alice still receives exactly **100, not 200**: Bob's forfeit is not redistributed to her, because her own position only generated 100.

## Example 3 — both legs, with a round trip

Same year, same 10% yield.

- **Alice** holds 1,000 YT all year, and adds liquidity worth 500 SY at the midpoint. She still holds both at the payout.
- **Carol** holds 1,000 YT for six months, sells everything, then buys 1,000 YT back the day before the payout.
- **Dave** buys Carol's 1,000 YT at the midpoint and sells it back to her the day before the payout.

The YT reserve holds at 2,000 all year; the market's SY reserve is empty until Alice adds liquidity. The base is read at the payout block, so that late liquidity counts in full: $B = 2{,}500$ and $r = 250 / 2{,}500 = 0.1$.

| position | held | $A$ | $P$ | $E$ | would earn | paid |
| --- | --- | --- | --- | --- | --- | --- |
| Alice · YT | all year | $1{,}000$ | $1{,}000$ | $1{,}000$ | $100$ | $100$ |
| Alice · LP | last 6 mo | $250$ | $500$ | $250$ | $50$ | $25$ |
| Carol · YT | first 6 mo, re-buys | $500$ | $1{,}000$ | $500$ | $100$ | $50$ |
| Dave · YT | middle 6 mo | $500$ | $0$ | $0$ | $0$ | $0$ |
| **total** | | $2{,}250$ | $2{,}500$ | $1{,}750$ | $\mathbf{250}$ | $\mathbf{175}$ |

**would earn** is $P \times r$ — what the balance held at the payout block would earn had it been held all year, which sums to the full 250. **paid** is $E \times r$, and the gap of 75 goes to the treasury. The protocol's yield fee is left out for clarity; it changes neither the rate nor the remainder.

- **Alice** takes 125 across two rows, [capped per position](#why-the-legs-are-capped-separately). Her YT ran the full year and pays in full; her liquidity arrived at the midpoint, so it counts fully toward the base but accrued only half.
- **Carol** shows that buying back does not buy back the yield: $P$ returns to 1,000, but $E$ is still capped at her accrual of 500.
- **Dave** accrued 500 and held nothing at the payout, so he is paid nothing.
- **The 75** is 50 from Dave leaving and 25 from Alice's liquidity arriving late. Dave's own row is zero, so his shortfall shows against Carol, who holds those YT by the payout.

## What this means for your position

- **Holding YT** — your yield builds through the period and is distributed retrospectively via merkle, claimable on the Pendle dashboard. Hold throughout and you receive exactly what your position earned.
- **Providing liquidity** — the SY in the pool earns on the same terms, with the same time-weighting and the same cap. The monthly arbitrage against the pool no longer works.
- **Holding PT** — nothing changes. Your fixed yield is still fixed.

## FAQ

**Do I need to have held since the market opened?** No. The clock resets with each payout; only the period being paid out counts.

**What if I sell halfway through?** The accrued yield is forfeited — not paid to you, not passed to the buyer. You are compensated through the implied-yield swing and points at the time of sale.

**Am I earning less than before?** Not if you hold through the period. The only people earning less are those who used to arrive right before a payout.

**Do points work the same way?** Yes, points continue to accrue continuously.

**What happens to the forfeited yield?** It goes to the Pendle treasury. It is never handed to the holders who stayed, because that would pay them more than their own positions generated.

---

## How it is calculated

Everything below is in **SY**. $[t_0, t_1]$ is the period being paid for, and the **payout block** is the moment the distribution is measured at, which may sit after the period closes.

| | |
| --- | --- |
| $A$ | **accrual** — the average SY the position held across the period |
| $P$ | **payout balance** — the SY it still holds at the payout block |
| $E$ | **eligible** — what gets paid on, $\min(A, P)$ |
| $B$ | **base** — total SY in the pool at the payout block |
| $r$ | **rate** — yield per unit of SY, $R / B$, where $R$ is the amount funded |

$A$, $P$ and $E$ are computed **per position**: separately for a holder's YT and for their LP. Someone with both gets two sets, and their payout is the sum.

### From a position to what it is eligible for

A YT position is worth its unclaimed interest plus its balance divided by the interest index; an LP position is worth its share of the market's SY reserve.

$\text{YT} = a + \dfrac{y}{I} \qquad\qquad \text{LP} = \dfrac{\ell}{L} \times S_{\text{mkt}}$

The two draw on **separate reserves** — the YT contract holds its own SY, the market holds its own — and each is exhaustive over the reserve it draws on, so nothing is double-counted. PT does not appear: it has no yield exposure.

Balances only move on a transfer, mint, redeem or claim, so the accrual is a time-weighted average, and the cap is the balance still standing at the payout block:

$A = \dfrac{\text{sum of } (\text{size} \times \text{seconds held})}{t_1 - t_0} \qquad\qquad E = \min(A, P)$

That is rules 1 and 2 together, and one expression covers every case. Held throughout, $E = A$ and you are paid in full. Sold everything, $P = 0$ and you are paid nothing. Sold half, $E$ is capped at the half still held.

### Why the legs are capped separately

The cap is applied **to each position, then summed** — never to a holder's YT and LP added together. Accruals and balances add across positions fine, but $\min$ does not:

$\min(A_{\text{yt}} + A_{\text{lp}},\; P_{\text{yt}} + P_{\text{lp}}) \;\ge\; \min(A_{\text{yt}}, P_{\text{yt}}) + \min(A_{\text{lp}}, P_{\text{lp}})$

The inequality only points one way, so pooling can never pay *less* — only more. Consider a holder who held 100 SY of YT all period, sold it the day before the payout, and bought a 200 SY LP position right at the end:

| position | $A$ | $P$ | $E$ |
| --- | --- | --- | --- |
| YT | $100$ | $0$ | $0$ |
| LP | $20$ | $200$ | $20$ |

Separately they get 20. Pooled it would be $\min(120, 200) = 120$ — the late LP purchase resurrecting 100 of forfeited YT yield. There is a mechanical reason too: the treasury fee applies to YT alone, and one pooled figure leaves nothing to charge it against.

### The rate and the payout

$B = S_{\text{yt}} + S_{\text{mkt}} \text{ at the payout block} \qquad r = \dfrac{R}{B} \qquad \text{paid} = E \times r$

**Only the SY present at the payout block is distributed against.** $B$ is read there and nowhere else — not at the start of the period, not as an average. SY that left the pool before then is not in $B$ and receives nothing. That is rule 3: one unit of underlying earns what one unit of underlying earned.

Payouts round down, so they sum to at or below the funded amount rather than a unit above it. The protocol's yield fee is taken on YT first, on the *eligible* amount rather than the accrual, since forfeited yield earned no fee: each YT holder keeps $E(1 - \phi)$ and the treasury receives the rest. LP carries no such fee — the market's SY reserve was never YT-wrapped.

### What is left over — and where it goes

With $D$ for everything paid:

$U = R - D = \left(B - \textstyle\sum E\right) r \;=\; \underbrace{\left(B - \textstyle\sum A\right) r}_{\text{arrived late}} \;+\; \underbrace{\left(\textstyle\sum A - \textstyle\sum E\right) r}_{\text{left early}}$

$U$ is the forfeited yield, and it is paid to the Pendle treasury — a normal outcome, not an error. The second term is rule 2: yield accrued by holders who left. The first is rule 1: capital that arrived late counts fully toward $B$ but earns little time-weight. On a growing pool it can be the larger of the two; on a shrinking one it goes negative and offsets the other. The total is never negative, because:

$\textstyle\sum E \le B \quad\Longrightarrow\quad D \le R$

A distribution can never claim more than was funded, and both are asserted at generation time — per position and per token — before any merkle root is produced. Holders receive $D$ and the treasury receives $U$, so the funded amount $R$ is always claimable in full and nothing is left stranded in the distributor. And since a payout depends only on that position's own $E$ and on $B$, one holder's behaviour can never change what another receives.
