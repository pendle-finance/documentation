# Boros — Deleveraging and Liquidation Mechanism Disclosure

:::tip IMPORTANT NOTICE

**Nature of This Document.** This document is published to provide users with information about the Boros protocol's risk management, liquidation, and auto-deleveraging mechanisms as currently designed and understood. It is informational only. Nothing in this document constitutes a warranty, guarantee, contractual commitment, financial advice, legal advice, or investment advice of any kind.

**Accuracy and Completeness.** While reasonable care has been taken in preparing this document, it may contain errors, omissions, or inaccuracies. The Boros protocol is technically complex; not every aspect of the protocol's behaviour may be fully or accurately captured herein. This document does not purport to be an exhaustive or complete description of the protocol and should not be treated as such.

**Development and Change.** Boros is an actively developed and evolving protocol. The mechanisms, parameters, processes, and thresholds described in this document reflect the protocol's current design and understanding and may be amended, modified, updated, or discontinued at any time — with or without prior notice to users. The protocol team is under no obligation to update this document immediately upon any change to the protocol.

**Protocol Discretion.** The protocol team reserves the right, at its sole and absolute discretion, to deviate from, modify, suspend, or act inconsistently with any mechanism, parameter, threshold, or process described in this document where it determines this to be necessary or appropriate for the safety, integrity, solvency, or sound operation of the protocol, or in response to extraordinary, unforeseen, or emergency circumstances. The exercise of such discretion will be made in good faith in the overall interests of the protocol and its users, but shall not give rise to any liability or claim against the team or its affiliates by reason of any inconsistency with this document.

**No Reliance.** Users should not rely solely or primarily on this document when making trading, financial, or risk management decisions. Leveraged trading in digital assets involves substantial risk of loss, including total loss of invested capital. Users should conduct independent research, consult appropriate professional advisors, and carefully consider their own financial circumstances and risk tolerance before trading.

**Limitation of Liability.** To the maximum extent permitted by applicable law, the protocol team, its affiliates, officers, directors, employees, and agents disclaim all liability for any loss, damage, cost, or expense of any kind arising directly or indirectly from: (i) any inaccuracy, error, or omission in this document; (ii) any change to the protocol not reflected in this document; (iii) any deviation by the team from the mechanisms described in this document; (iv) any unknown or unanticipated aspects of the protocol's operation; or (v) any reliance by any person on the contents of this document.

**On-Chain Protocol Governs.** In the event of any inconsistency or conflict between the description of any mechanism in this document and the actual behaviour of the on-chain smart contracts, the actual on-chain behaviour governs. The deployed smart contracts are the authoritative source of truth regarding how the protocol operates.

**Jurisdiction.** This document does not constitute an offer or solicitation in any jurisdiction where such activity is restricted or prohibited. Users are responsible for ensuring their use of the Boros protocol and reliance on this document complies with all applicable laws and regulations in their jurisdiction.

:::


## 1. Purpose and Overview

Boros is a fixed-for-floating funding rate exchange protocol. Users trade YU positions — instruments that exchange a fixed implied APR for the floating underlying funding rate of a referenced perpetual market, held to a fixed maturity. Unlike price-based perpetual futures, positions on Boros are not sized by leverage in the conventional sense. The primary risk metric is **Rate Sensitivity**: the amount by which a position's collateral changes for every 1% move in the implied APR. A position with higher Rate Sensitivity experiences larger gains and losses relative to its collateral buffer.

This document explains the mechanisms Boros activates when positions become, or risk becoming, undercollateralised. It covers: (i) market-level protective controls; (ii) account-level order controls activated as a user's Health Ratio deteriorates; (iii) the liquidation process for positions that breach the Maintenance Margin; and (iv) Auto-Deleveraging (ADL), the protocol's last resort when ordinary liquidation cannot be completed.

Boros does not maintain an insurance fund. The layered protective controls described here are the primary safeguards, and they are designed to make ADL rare; but ADL can and does occur under extreme or illiquid market conditions.


## 2. Key Concepts

### 2.1 Margin Modes

Before considering any position-risk metric, users should understand which margin mode applies, as this determines how collateral is allocated and how liquidations interact with a portfolio.

**Cross Margin** allows a single collateral deposit to back multiple positions within the same collateral zone (all markets denominated in the same collateral asset share one pool). Unrealised profits in one position offset margin requirements across the zone. Liquidations in one zone do not affect positions held in other zones — cross-zone isolation is maintained.

**Isolated Margin** confines collateral to a single market. Losses in an isolated position cannot spill over to other positions; a user's maximum loss is limited to the collateral allocated to that position.

The margin mode is selected when a position is opened. The risk metrics below are calculated within the applicable collateral zone for cross-margin positions, or at the individual position level for isolated positions.

### 2.2 Risk Metrics and Reference Rates

**Rate Sensitivity** is the primary exposure measure on Boros. It equals Notional Size × (Days to Maturity / 365) × 1%, representing the PnL impact of a 1% move in the implied APR. Rate Sensitivity declines naturally as maturity approaches.

**Net Balance** = Collateral + Unrealised PnL. Boros monitors Net Balance against the Maintenance Margin. Collateral is adjusted at every settlement period (as at the date of this document, Binance markets settle every 8 hours and Hyperliquid markets every 1 hour), when the net difference between the floating and fixed rates is realised into the user's collateral. A position that is persistently out of the money will see its collateral eroded each cycle, even if the Mark Implied APR does not change.

**Health Ratio** = Net Balance / Maintenance Margin. A Health Ratio below 1.0 may render a position eligible for liquidation. Levels below 1.0 may also lead to earlier protective interventions (Section 3B), and a Health Ratio at or below certain ADL thresholds may lead to Auto-Deleveraging (Section 4).

**Health Factor** (app display). The Boros application displays a Health Factor — a remapping of the Health Ratio onto a 0-to-1 scale, where 0 represents the most distressed state. The Health Factor is a visual aid for users; the Health Ratio is the underlying metric used in all calculations described in this document.

**Mark Implied APR** is a five-minute time-weighted average (TWAP) of the last traded rate on Boros's own order book. It is the reference rate used to value unrealised profit and loss and to determine liquidation and ADL eligibility. Because it is time-averaged, it is designed to resist artificial liquidations caused by transient rate spikes or momentary low-liquidity conditions.

**Underlying APR** is the funding rate of the referenced external perpetual market (for example, Binance ETHUSDT).


## 3. Layered Risk Management Framework

Boros operates a layered set of risk controls at three levels — market-wide, account-wide, and position-level — that generally activate in escalating order of severity. Under normal conditions most of these mechanisms are invisible; they are generally activated in response to deteriorating Health Ratios, extreme rate movements, or rising open interest.

### 3A. Market-Level Controls

The following controls operate at the market level. They apply uniformly to all participants in an affected market and are designed to maintain orderly conditions before account- or position-level interventions become necessary.

**Order Rate Bounds** (passive, always on). Every taker order fill is validated against the current Mark Implied APR. If the executed rate would deviate beyond an acceptable band, the transaction reverts. Resting limit orders are likewise constrained: they cannot be placed at rates too far above (for longs) or below (for shorts) the current mark rate.

**Out-of-Bound Order Purging.** As the Mark Implied APR moves, a previously valid limit order may drift outside the acceptable rate band. Boros may periodically purge such orders. A purged order receives a **PURGED** status, and the margin allocated to it is returned to the user; settlement payments are applied up to the point of purge.

**OI Capped Mode.** When total open interest in a market approaches its hard cap, or when abnormal conditions (a "red zone") arise, the market may enter OI Capped Mode. In this mode, market (taker) orders may generally only reduce or close existing positions — new positions are generally not opened by market order — while limit orders may still be posted freely. Certain whitelisted market-maker accounts may be exempt. The mode is generally activated and deactivated automatically, and a 30-minute lockout is applied to limit rapid toggling.

**Makers Only Mode.** In more severe conditions, the market may enter Makers Only Mode. In this mode, taker trades generally do not execute: existing positions are generally not closed by market order, and users may only post limit orders. This is intended to allow liquidity — in practice, principally from market makers — to rebuild and stabilise the rate without taker orders driving a cascade.

**Market Halt.** In the most extreme scenarios (for example, a security incident or an extreme market circumstance), a market may be halted entirely, suspending all trading, order placement, and cancellation. This is reserved for circumstances that automated controls cannot adequately address. Users with open positions in a halted market should refer to Boros's official communications for the conditions for resuming trading.

### 3B. Account-Level Order Controls

The following controls operate at the individual account level, activating as an account's Health Ratio deteriorates but before liquidation is triggered. They affect open orders, not open positions.

**Force-Cancellation of Risky Orders.** If an account's Health Ratio falls below certain risky thresholds, all open orders across all markets for that account may be cancelled.

**Health-Jump Order Cancellation.** If a pending settlement would push an account's Health Ratio below the risky threshold, the protocol may pre-emptively cancel the orders materially contributing to that risk before the settlement executes. This acts on projected health, not only current health.

### 3C. Position-Level Controls: Liquidation and ADL

The following steps activate when an account's Net Balance falls to or below the Maintenance Margin. Market- and account-level controls (Sections 3A and 3B) may already be in effect.

**Net Balance monitoring.** Boros continuously monitors each position's Net Balance against its Maintenance Margin, calculated as:

> Maintenance Margin = Maintenance Margin Factor × |Notional Size| × max(Time to Maturity, Time Floor) × max(|Mark Rate|, Rate Floor)

As maturity approaches, Rate Sensitivity and Maintenance Margin decline in tandem; at maturity both reach zero and the position settles fully into collateral. Boros does not issue a separate margin warning; instead, the application continuously displays the account's health through a colour-coded Health Factor bar.

**Liquidation.** When Net Balance falls below the Maintenance Margin (Health Ratio < 1.0), the position becomes eligible for liquidation. On Boros, liquidation is not a forced market sale by the protocol: where it occurs, the position is transferred to a liquidator, who absorbs it at the current Mark Implied APR and receives a liquidation penalty paid from the liquidated user's collateral. The penalty scales with the user's level of distress and is generally capped at the account's Health Ratio, so that liquidation is not intended to worsen the liquidated user's Health Ratio. The penalty is calculated as:

> Liquidation Penalty = k × Maintenance Margin

where **k** is generally 25% when a position first becomes liquidatable (Health Ratio = 1.0) and scales linearly up to 50% as distress increases. The value of k is the current default; it may change over time, and may increase while a market is in OI Capped Mode in order to encourage timely liquidation. A separate protocol liquidation fee also applies to the liquidated position size (see the Boros fee schedule). Liquidation is generally structured so as not to worsen the account's Health Ratio, and any collateral not required to cover the margin deficit and penalty is generally retained by the user.

**Auto-Deleveraging (ADL).** ADL is the protocol's last resort, generally applied only when ordinary liquidation cannot resolve the position. Its mechanics are described in Section 4.


## 4. Auto-Deleveraging (ADL)

ADL may be applied when the liquidation process cannot resolve a distressed position. ADL is an industry-standard mechanism used across major perpetual and derivative venues. Its activation is not a protocol failure; it is a final structural safeguard intended to help the protocol continue to honour its obligations between users. Users should regard ADL as a realistic operational feature of the protocol.

### 4.1 ADL Trigger

ADL may be applied when an account's Health Ratio falls to or below certain ADL thresholds. By the time the Health Ratio reaches this level, market liquidity is generally already insufficient for a liquidator to take on and offload the distressed position. Boros reserves the right, in extraordinary circumstances, including but not limited to a dysfunctional market suffering a severe lack of liquidity, to apply ADL at Health Ratios above the threshold where it considers this appropriate to restore the market to a functional state, and to adjust the ADL threshold itself.

### 4.2 What ADL Is and How It Executes

When ADL is applied, the protocol identifies accounts holding positions on the opposite side of the distressed position, and a portion of those positions may be closed against the distressed account at the current Mark Implied APR. Unlike liquidation, there is no rate-discount incentive, and the selected counterparties do not choose to participate. Generally, a selected counterparty does not absorb a loss: its profitable position is closed earlier than it might have chosen — in other words, a forced realisation of profit that caps further upside on that position.

In extraordinary circumstances, ADL may execute at a rate other than the Mark Implied APR. In particular, where the distressed account is already in bad debt, deleveraging may instead occur at the **bankruptcy price** — the rate at which the account's unrealised loss exactly equals its remaining collateral (that is, Net Balance = 0) — rather than at the Mark Implied APR.

### 4.3 Bad Debt Sharing

If a distressed account's losses exceed all of its remaining collateral, so that its Net Balance is negative, the resulting shortfall ("bad debt") may be shared with the selected counterparties. Each counterparty would generally bear a share of the bad debt in proportion to the size deleveraged against it relative to the distressed account's total position size. Where this occurs, sharing is generally applied on a full proportional basis.

### 4.4 Counterparty Selection

When ADL is applied, eligible counterparties on the opposite side of the distressed position are generally ranked by Health Ratio, with the **lowest-Health-Ratio accounts selected first**. Selection is generally based on Health Ratio only, but may include other factors as determined by the protocol. A portion, or all, of a selected counterparty's position may be closed.

### 4.5 Post-ADL Notification

If a counterparty's position is partially or fully closed as a result of an ADL event, Boros will generally provide a record of the event through the Trade History tab, with an in-app notification to follow. The record generally specifies: (i) the quantity closed; (ii) the Mark Implied APR at closure; (iii) any bad debt absorbed; and (iv) the reason (ADL).


## 5. User Notifications and Displays

Boros generally provides the following notifications and displays in connection with risk management, liquidation, and ADL.

**Health display.** The application continuously displays each account's health through a colour-coded Health Factor bar. Boros does not issue a separate margin warning.

**Order force-cancellation notice.** If the protocol cancels a user's resting orders because the account's Health Ratio has fallen below the risky threshold, the user is generally notified, identifying which orders were cancelled and the reason.

**Market-status notifications.** When a market enters OI Capped Mode or Makers Only Mode, or is halted, users with open positions or resting orders in that market are generally notified.

**Post-ADL notification.** If a user's position is partially or fully closed as a result of an ADL event, Boros will generally provide a record via the Trade History tab in-app.
