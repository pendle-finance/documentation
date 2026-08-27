---
hide_table_of_contents: true
---

# Dynamic Incentives

The **Dynamic Incentive Controller (DIC)** lets a protocol fund a rewards campaign on a single Pendle market whose reward rate **responds automatically to the market's liquidity (TVL)**. Instead of paying a flat APR regardless of pool size, a DIC campaign pays along two pre-agreed curves: one that *grows* the incentive as liquidity arrives, and one that *bootstraps* the earliest liquidity and then steps out of the way.

A campaign always targets one market, is funded in a single **reward token** chosen by the protocol, and runs from its start until that market matures. It rewards **both sides of the market at once**:

- a **YT reward** that ramps **up** as TVL grows — the *growth engine*, and
- a **PT reward** that ramps **down** as TVL grows — the *bootstrap counter-lever*.

Both rewards accrue continuously to the market's holders and are paid out through Pendle's standard Merkle distribution, exactly like other external incentives.

## The Two Reward Curves

A DIC campaign is defined by an **End Target** TVL — the liquidity level the campaign is calibrated for — and a small set of reward rates. The current TVL's position along the curve is:

```Math
progress = clamp( TVL / End Target , 0 , 1 )
```

The two reward APRs are simple linear functions of that progress:

```Math
YT reward APR = ytMin + (ytMax − ytMin) × progress          (ramps up)
PT reward APR = ptMax × (1 − progress)                       (ramps down, floored at 0)
```

**Intuition:**
- **YT (growth engine).** When the pool is small the YT reward is low; as TVL climbs toward the End Target the YT reward rises to `ytMax`. This pulls in more liquidity precisely as the campaign gains traction.
- **PT (bootstrap counter-lever).** When the pool is empty the PT reward is at its maximum (`ptMax`), giving the very first depositors an outsized fixed-yield sweetener. As TVL climbs, the PT reward decays to zero — the market no longer needs the extra push once it is deep.

| Pool state | `progress` | YT reward APR | PT reward APR |
|---|---|---|---|
| Empty pool (TVL = 0) | 0 | `ytMin` | `ptMax` |
| Halfway to End Target | 0.5 | `ytMin + ½(ytMax − ytMin)` | `½ ptMax` |
| At (or beyond) End Target | 1 | `ytMax` | 0 |

The curve is fixed by the End Target alone and never changes for the life of the campaign — only the market's TVL moves along it.

## The Ratchet

If the reward rate simply tracked live TVL, a brief liquidity spike (or a whale entering and leaving) would make the advertised APR flicker. DIC prevents this with a **ratchet**.

Both reward APRs are driven by a **confirmed TVL high-water-mark** rather than by the instantaneous TVL. A new TVL level only lifts the high-water-mark after it has been *sustained for a dwell period* (a few hours by default), so an unsustained spike cannot inflate the rate. Because the high-water-mark only ever moves up:

- the **YT reward APR is monotonically non-decreasing** — once earned, the growth-engine rate never falls back, even if TVL retreats; and
- the **PT reward APR is monotonically non-increasing** — the bootstrap reward decays as the pool grows and **cannot be revived** by letting TVL fall again.

The *rate* is sticky, but *emission* still tracks reality: emission is `reward APR × current TVL`, so a smaller pool still pays proportionally less in absolute terms. The ratchet only fixes the rate the curve reads, not the base it is applied to.

## Funded Cap and Committed Budget

The End Target fixes the *shape* of the curve. A separate **Funded Cap** decides how far *up* that curve the campaign is actually funded. The Cap is always at or below the End Target, and it mirrors the market's **on-chain SY supply cap** — the protocol funds rewards for exactly the liquidity the market is allowed to hold.

- TVL **up to the Cap** accrues rewards.
- TVL **beyond the Cap** is *unfunded* — it earns no DIC reward.

### The worst-case budget

Because both rewards move with the ratcheted high-water-mark, the most a campaign can ever owe in a period is bounded. The controller funds against that **worst case**, evaluated at the TVL that maximises joint (YT + PT) spend:

```Math
worst-case TVL  h* = clamp(  (ytMin + ptMax) × End Target
                             ─────────────────────────────── ,  0 , Cap )
                              2 × ( ptMax − (ytMax − ytMin) )

Total budget = h* × ( YT reward APR(h*) + PT reward APR(h*) ) × (days-to-maturity / 365)
```

The joint peak `h*` matters because YT and PT can both pay at the same TVL: charging only at the End Target (where PT reward is 0) would under-fund the campaign whenever that joint peak sits in the interior of the curve. When the YT ramp is steep enough that `ptMax ≤ ytMax − ytMin`, joint spend only ever increases with TVL and the worst case simply sits at the Cap.

**The Cap is the input; the budget is derived from it.** A protocol declares the Cap it will support (matching its on-chain SY cap), and the **Total budget** — the reward tokens needed to honour the worst case for the whole campaign window — follows directly. For convenience the app also runs this in reverse: a protocol can enter the budget it is willing to commit and be shown the Cap that budget unlocks before committing to it.

## Funding Lifecycle

A DIC campaign is **not** fully pre-paid. It runs on a topped-up runway, which keeps a protocol's capital efficient while still guaranteeing solvency.

- **Entry deposit.** Before a campaign may start paying, it must hold at least **20% of the Total budget** (or one epoch's worth, whichever is larger, so even a short campaign is covered for its first epoch). This is the entry ticket that stops a campaign from advertising a rate it has not funded.
- **Minimum funding required.** At any moment the campaign must hold enough to cover what it has already spent plus the maximum the next epoch could cost. This is the **runway** rule, and it uses the Cap-based worst case so it stays solvent even if TVL runs to the Cap during the coming epoch.
- **Top-ups.** A protocol can add reward tokens at any time, including through a shareable public deposit link that requires only a connected wallet.
- **Auto pause / resume.** If holdings fall below the minimum funding required, the campaign automatically **pauses** and stops accruing rewards; a top-up brings it back. A campaign can also be paused if its on-chain SY cap and the campaign's Cap fall out of sync, or manually by an operator.

## How Rewards Are Distributed

DIC accounting is done in **SY units**, not USD. Every campaign pins a single conversion rate, `rewardTokenPerSy`, when it is created, and all emission is converted from SY into the reward token through that one rate. This makes the funding guarantee exact — the amount owed and the amount deposited are always the same unit — at the cost of the displayed rate being **nominal** (a holder's realised USD APR also moves with the SY and reward-token prices, which the pinned rate deliberately does not track).

Rewards accrue continuously to a holder as `balance × side reward APR(TVL) × time`, are summed per epoch, and are published to the same Merkle distribution pipeline Pendle uses for other campaign rewards, so holders claim them the usual way.

Crucially, the reward reaches the **economic owner** of the position, not merely the direct token holder — PT that sits inside an LP position, or is looped into a money market, is attributed to the underlying holder rather than to the intermediary contract.

## How Rewards Appear in the App

DIC rewards surface as first-class parts of a market's advertised yield:

- The **YT reward** is added to the market's YT / long-yield APY — it shows up in the hero YT APY figure, the breakdown tooltip, and the historical yield chart as a Pendle-campaign incentive.
- The **PT reward** is shown under the market's **PT Yield / Fixed APY** as an *extra incentive*, labelled with the reward token, and is included in the aggregate "My APY" figures.

In both cases the badge identifies the reward as coming from a Pendle campaign on that pool, distinct from the asset's own underlying yield.

## Worked Example

*A protocol runs a 10-week DIC campaign on a market with an End Target of ≈$100M and a Funded Cap of $100M (funding the whole curve). Reward rates: YT ramps 1% → 2%, PT ramps 5% → 0%. The reward token is priced at campaign creation via `rewardTokenPerSy`.*

Since `ptMax (5%) > ytMax − ytMin (1%)`, the joint-spend peak is interior:

```Math
h* = (ytMin + ptMax) × End Target / ( 2 × (ptMax − (ytMax − ytMin)) )
   = (1% + 5%) × $100M / ( 2 × (5% − 1%) )
   = $75M
```

At `h* = $75M` (75% of the way to the End Target):

- YT reward APR = `1% + (2% − 1%) × 0.75` = **1.75%**
- PT reward APR = `5% × (1 − 0.75)` = **1.25%**
- Joint reward APR = **3.00%**

```Math
Total budget ≈ $75M × 3.00% × (70 / 365) ≈ $431,500  (in reward-token value)
```

So the protocol must commit roughly **$431.5k** of the reward token for the full campaign, deposit at least **~$86k** (20%) before it can go live, and keep at least one epoch's ceiling (~**$43k/week**) of runway on hand as the campaign runs. Early depositors enjoy the full 5% PT sweetener while the pool is small; as liquidity approaches the End Target the PT reward fades and the YT reward climbs to its 2% maximum.

## Parameters at a Glance

| Parameter | Meaning |
|---|---|
| **End Target** | The TVL the reward curve is calibrated for; fixes the curve shape. |
| **Funded Cap** | How far up the curve the campaign is funded (≤ End Target); mirrors the market's on-chain SY supply cap. TVL beyond it is unfunded. |
| **`ytMin` / `ytMax`** | YT reward APR at TVL 0 and at the End Target (ramps up). |
| **`ptMax`** | PT reward APR at TVL 0 (ramps down to 0 at the End Target). |
| **Reward token** | The token the protocol funds and holders are paid in. |
| **`rewardTokenPerSy`** | The SY → reward-token conversion, pinned at creation. |
| **Maturity (weeks)** | Campaign duration, from start to the market's maturity. |
| **Total budget** | Reward tokens needed to honour the worst case up to the Cap (derived from the Cap). |
| **Minimum funding required** | Reward tokens the campaign must hold right now to keep paying (spent-to-date + next epoch's ceiling, with a 20%-of-budget entry floor). |
