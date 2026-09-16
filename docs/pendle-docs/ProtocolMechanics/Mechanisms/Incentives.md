---
hide_table_of_contents: true
---

# Incentives

The Algorithmic Incentive Model (AIM) is an automated, merit-based reward system that allocates PENDLE emissions to pools based on their performance. Pools that excel across liquidity, swap fees, limit-order depth, and co-incentives receive a higher share of rewards to recognize their contribution to the Pendle ecosystem. Each weekly incentive epoch starts on **Thursday 00:00 UTC**.

Incentives are delivered through four reward streams:
- **Performance**: emissions based on a pool's liquidity (LP TVL) and swap-fee generation
- **Limit Order**: emissions that reward limit-order depth, paid separately on each side of the book
- **Co-Incentives**: PENDLE that Pendle matches against protocol-provided incentives — used to lift the market's limit-order depth targets
- **Discretionary**: strategic allocations for high-potential pools

| Stream | What it is paid on | Rate | Cap |
|---|---|---|---|
| Liquidity | LP TVL, capped at a \$2.5m anchor | 0.20% APR (1.00% bootstrapping) | \$96/wk · \$481/wk |
| Fee | the week's swap fees | 25c per \$1 | \$625/wk |
| Long book | target depth × maker capital at risk | 30% APR | 100% APR on posted depth · \$1,250/wk |
| Short book | target depth × maker capital at risk | 30% APR | 200% APR on posted depth · \$1,250/wk |
| Co-incentives | partner campaign value | 15% match (22% in PENDLE) | 9,000 PENDLE per epoch, all pools |

Every amount above is an **absolute figure derived from the pool's own liquidity, fees and depth** — there is no fixed weekly PENDLE budget that pools compete for a share of, and nothing rolls over between weeks.

### Converting Dollars to PENDLE

All four streams are sized in dollars and then converted to PENDLE at:

```Math
PENDLE = USD / max(PENDLE price, $1.25)
```

The \$1.25 floor caps **issuance**, not value. Below \$1.25 the protocol emits the tokens it would have emitted at \$1.25, and the dollar value delivered falls with the price.

## How Often Are Incentives Updated?​

Incentives are recalculated and updated every hour. When a new pool is whitelisted, it begins receiving incentives within the next hour.

Individual components update on different schedules:
- **Liquidity emissions**: continuously in real time as LP TVL changes
- **Fee emissions**: recalculated three times per epoch — at the initial Thursday distribution, then again on Saturday and Monday
- **Limit order emissions**: continuously (hourly) as TVL, volume and posted depth change
- **Co-incentives**: updated weekly
- **Discretionary**: updated weekly

## Performance

A pool's Performance incentive is the sum of its **liquidity-based** and **fee-based** emissions. Both are quoted against a single **\$2.5m anchor** — the pool size the system is calibrated for — and both read **LP TVL**, because LPs are who receives the reward.

```Math
Performance = Liquidity + Fee
```

The model is adapted to support pools across their lifecycle: newer pools are incentivized on liquidity growth at a much higher rate, while mature pools earn primarily on swap-fee performance.

## Liquidity-Based Emissions

Pools receive PENDLE as an **APR on their own LP TVL, capped at the \$2.5m anchor**. Above \$2.5m the dollar amount is flat, so a larger pool is paid the same money spread thinner.

The rate depends on the pool's age, counted from the first Thursday after it was whitelisted:

| Phase | Age | Weekly emission | Ceiling |
|---|---|---|---|
| **Bootstrap** | under 7 days | `1.00% × min(floorTVL(LP TVL), $2.5m) / 52` | \$481 /wk |
| **Growth** | 7 – 14 days | `[1.00% × (1−p) + 0.20% × p] × min(LP TVL, $2.5m) / 52` where `p = (age − 7) / 7` | — |
| **Mature** | 14 days or more | `0.20% × min(LP TVL, $2.5m) / 52` | \$96 /wk |

During the Bootstrap phase, pools also receive an artificial TVL floor so very small new pools are not paid on near-zero liquidity: pools under \$200K are treated as \$200K, pools between \$200K and \$500K as \$500K, and pools between \$500K and \$2M as \$2M. These floors are a bootstrap device only — **they lapse at day 7**, so the Growth week is a genuine taper on both the rate and the basis.

#### Examples

- A **mature** pool with \$5m LP TVL: the basis is capped at the \$2.5m anchor, so it earns `0.20% × $2.5m / 52` = **\$96/week** — the same as a pool with \$2.5m.
- A **mature** pool with \$1m LP TVL earns `0.20% × $1m / 52` = **\$38/week**.
- A **bootstrapping** pool 3 days old with \$300K LP TVL: the floor lifts its basis to \$500K, so it earns `1.00% × $500K / 52` = **\$96/week** — five times what the same liquidity would earn at maturity.
- A pool **10.5 days old** sits halfway through the Growth taper (`p = 0.5`), so its rate is 0.60%.

### Activation Gate

A gate can zero a **mature** pool whose total TVL sits below a threshold. It never applies to a pool that is still bootstrapping or growing, and it is **set to \$0 by default** — nothing is cut unless it is switched on.

### Renewed Pools

Renewal no longer has its own liquidity curve. A renewed pool walks the same Bootstrap → Growth → Mature path as any other new pool. Continuity for rollovers is handled on the **limit-order side** instead, through the long book's [initialization rule](#long-book), which lets a renewed market inherit its predecessor's depth target for the first 7 days.

## Fee-Based Emissions

Pools receive PENDLE based on the swap fees they actually produced that week, with a ceiling quoted against the same \$2.5m anchor:

```Math
Fee = min( 0.25 × the week's swap fees , 1.30% × $2.5m / 52 )
    = min( 0.25 × fees , $625/wk )
```

There is **no phase distinction, no eligibility gate of its own, and no recency weighting** — the week's fees are the week's fees. This is the component that rewards a pool for being *used* rather than for being *large*, and at \$625 against the liquidity side's \$96 it is deliberately the larger of the two.

#### Examples

- A pool that generated \$1,200 in swap fees this week earns `0.25 × $1,200` = **\$300**.
- A pool that generated \$4,000 earns `0.25 × $4,000 = $1,000`, which is trimmed to the **\$625** ceiling.

## Performance Ceiling & Cut-off

The Performance ceiling is not a separate cap — it falls out of the two rates:

| Phase | Ceiling | As APR on the anchor |
|---|---|---|
| Mature | \$96 + \$625 = **\$721 /wk** | 1.50% |
| Bootstrap | \$481 + \$625 = **\$1,106 /wk** | 2.30% |

If a pool's combined Liquidity + Fee incentive falls below **50 PENDLE per week**, it is set to zero. This avoids pushing negligibly small on-chain rewards that cost gas but add little value. The cut-off is **skipped** in two cases:
- **Pre-mature pools** (still bootstrapping or growing, under 14 days old) — these legitimately have small liquidity and fee revenue while ramping up.
- **Manually overridden pools** — when an admin has fixed a Liquidity or Fee value for the market.

Limit Order incentives, the co-incentive top-up, and Discretionary allocations are added **on top** and are not subject to the Performance ceiling or cut-off.

## Limit Order Emissions

Pools receive Limit Order (LO) rewards for providing depth on the orderbook. **Each side of the book is sized and capped independently**, so a single pool can draw up to **\$2,500 a week** across both. Incentives are distributed to limit orders within **±3.5%** of the current implied yield, on a time- and notional-value-weighted basis.

### How a Target Becomes Dollars

```Math
Budget/day = Target depth × DTM multiplier × YT relative price × 30% / 365

YT relative price = 1 − (1 + IY)^(−DTM/365)
```

Depth is quoted in **notional**, but a maker's actual **capital at risk** is the YT leg, and that is what the protocol pays on. The YT relative price converts one to the other: a 30-day market at 10% implied yield prices YT near 0.8% of notional, so \$10m of resting depth is about \$80k of maker capital. The protocol pays **30% APR on that \$80k**, not on the \$10m.

The **DTM multiplier** discounts long-dated books, which are cheap to hold and rarely need to be bought:

| Days to maturity | Multiplier |
|---|---|
| above 120 | 0.75 |
| 60 – 120 | slides linearly up to 1.00 at 60 days |
| below 60 | 1.00 |

For example, a \$1m target depth is treated as \$750k at 120 DTM, \$875k at 90 DTM, and the full \$1m at 60 DTM or less.

#### Example

Given a \$1m target depth at 60 DTM (no discount) and a YT relative price of 2%, maker capital at risk is \$20,000, so the pool earns `$20,000 × 30% / 52` ≈ **\$115 per week**.

### Long Book

The long book is **Sell PT / Buy YT resting below mid**. It is consumed by short-direction flow — a taker buying PT or selling YT — so that is the flow it sizes against. Four rules set the target, and **the target on any day is the largest that applies**:

| Rule | Definition | What it is for |
|---|---|---|
| **Floor** | `min(1% × pool TVL, $1m)` | the depth the target decays back to |
| **Initialization** | `max(50% × predecessor's peak, $1m)`, held 7 days on a renewal | a rolled market inherits its predecessor's book instead of restarting on the floor |
| **Expansion** | `min(1.5 × trailing 24h short-side volume, $10m)` | flow that arrived yesterday buys depth today |
| **Decay** | `Peak × (1 − (d/7)²)` | a busy day funds depth for a week, then lets go |

```Math
Long target = max( decayed expansion peak , floor , initialization if in window )

Long pay/day = min( budget , 100% APR × posted in-band long depth / 365 , $1,250 / 7 )
```

The **max-APR cap** is what keeps the rule honest: the protocol offers to pay for a *target*, but only pays for depth that **actually shows up**, and never at more than 100% APR on it.

### Short Book

The short book is **Buy PT / Sell YT resting above mid** — where a YT holder goes to exit. It is filled by a taker going long, so it sizes against **long-side flow**, exactly mirroring the other side.

Four things differ from the long book; the floor, the 1.5× expansion multiplier and the seven-day decay are shared.

| Difference | Why |
|---|---|
| Reads **long-side** volume | long flow is what consumes short depth |
| Expansion ceiling of **\$5m**, not \$10m | the short side is structurally smaller |
| A second ceiling at **33.33% of floating YT supply** | a short maker can only be filled against YT that actually exists |
| **No initialization bonus** | a new or renewed market opens on its floor and earns its way up |

```Math
Short target = min( max( decayed peak , min(1% × TVL, $1m) ) , $5m , 33.33% × YT supply )

Short pay/day = min( budget , 200% APR × posted in-band short depth / 365 , $1,250 / 7 )
```

The max-APR cap is **200%** on this side against the long book's 100%, because short depth is scarcer and harder to source.

## Co-Incentives

Protocols can use **External Incentive Campaigns** to provide additional rewards to Pendle users. The protocol's own deposited tokens are distributed to that market's holders, exactly as before. On top of that, Pendle **matches** a portion of the campaign's value in PENDLE:

- **22%** when the contributed token is PENDLE
- **15%** for external incentives provided as other tokens

```Math
Allocation/day = 15% × partner campaign value/day   (22% if the partner pays in PENDLE)
```

**Where the matched PENDLE goes.** The match is spent **lifting both limit-order books' depth targets to campaign floors**, so it rewards makers who actually place orders and trade PT/YT. These floors exist only while a campaign runs — a pool with no campaign keeps its ordinary targets on both sides.

```Math
Long floor  = $3m
Short floor = min( $1.5m , 33.33% × floating YT supply )
```

The top-up on each side is whatever is still needed to reach that side's floor, given what the base stream already pays. If the allocation cannot cover both, it is **split pro rata**.

Three limits then apply, in order:

1. **Protocol cap** — 9,000 PENDLE per epoch across all pools. If the epoch's top-ups exceed it, every pool is scaled down pro rata.
2. **Per-side APR headroom** — each side's top-up is capped at that side's remaining max-APR room (100% long, 200% short) on the depth **actually posted**, net of what the base stream already pays.
3. **Unspent allocation is not emitted.** A pool whose own volume already carries it past both floors earns nothing extra, and the match is simply not spent. It does not roll over.

Campaign pools also benefit on the base stream: the **expansion multiplier rises from 1.5× to 3×** for as long as the campaign runs, on both books.

**How matching works​**
- Protocols submit incentives weekly through External Incentive Campaigns.
- Token values are calculated using 7-day moving-average prices for both the contributed token and PENDLE.
- Protocols receive their guaranteed match rate for that week.
- The external protocol's own tokens are unaffected: they still go to the campaign's holders.

## Discretionary

Up to **15%** of the maximum weekly emissions may be used for discretionary allocations, primarily targeted at pools with high growth potential. Discretionary is unchanged by this model.

## How It Adds Up

A pool's total weekly incentive is:

> **Total = Discretionary + Co-incentive top-up + Long book + Short book + (Liquidity + Fee)**

Each stream carries its own bound: Liquidity + Fee is bounded by the Performance ceiling and the small-amount cut-off, each book by its own budget, max-APR cap and \$1,250 weekly cap, and the co-incentive top-up by the per-epoch protocol cap and the per-side APR headroom.
