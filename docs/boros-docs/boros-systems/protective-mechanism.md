# Protective Mechanisms

Boros has multiple protective risk systems, a set of interventions at various level of forcefulness designed to protect the protocol from bad debt. Under normal conditions, most of these mechanisms are invisible. They activate in response to deteriorating health ratios, extreme rate movements, or rising open interest. Understanding them helps traders anticipate how their positions and orders might be affected.

## Order Rate Bounds

This is a passive protective mechanism, it simply prevents bad fills from happening in the first place.

### Taker Orders  (Executed Rate Out of Range)

Every taker fill is validated against the current mark rate. If the executed rate deviates too far, the transaction reverts. This protects traders from filling at stale or manipulative rates.

### Limit Orders (Limit Rate Out of Bounds)

Resting limit orders are also constrained. Orders cannot be placed at rates that are too far above (for longs) or below (for shorts) the current mark rate. The allowable band uses the mark rate as an anchor and expands slightly with time to maturity.

If a placed limit order later drifts outside the acceptable band as the mark rate moves, it is **purged** (see below).


## Out-of-Bound Order Purging

As the mark rate moves after an order is placed, a previously valid limit order may fall outside the current rate bounds. Boros periodically scans the book and **purges** orders that are no longer within acceptable range.

Purged orders receive a **PURGED** status. They are not filled and the order is simply removed and your margin for that order is returned. Funding payments are correctly applied up to the point of purge.

This mechanism keeps the order book clean and prevents stale orders from matching at economically unreasonable rates during fast-moving markets.


## Force-Cancellation of Risky Orders

If your account's health ratio falls below the risky threshold, all your open orders across all markets may be force-cancelled by the protocol's risk bots.

This is a protective intervention, to prevent resting orders from filling and increasing your exposure at a time when you are already near the margin boundary. No positions are closed, only unfilled orders are removed.

Additionally, if a pending funding rate update would push your health ratio below the risky threshold, the system may proactively cancel orders that are materially contributing to that risk **before** the settlement executes. This is the **health-jump order cancellation** mechanism.

Both actions are performed automatically by Boros's infrastructure with no manual input required.


## Liquidation

When your Net Balance falls below your Maintenance Margin (health ratio < 1.0), your account becomes eligible for liquidation.

### How It Works

Your position is closed at the current mark rate and transferred to a liquidator, who absorbs it in exchange for a discount (the liquidation incentive).

### Liquidation Incentive

The liquidator receives a rate discount relative to the mark rate, scaled by how distressed your position is. The incentive scales **up** as your health ratio falls, a more distressed position offers a larger discount to attract timely liquidation. It is capped at your health ratio to ensure that the liquidated user’s health improves after the liquidation.

### After Liquidation

Liquidation always strictly **improves your health ratio**. This is because the incentive paid to the liquidator is capped at a level that ensures your remaining value-to-margin ratio cannot decline. You keep any collateral that was not required to cover the margin deficit and incentive.


## Auto-Deleveraging (ADL)

ADL on Boros is the **last resort**. It is only triggered when a position is so distressed that normal liquidation cannot resolve it due to insufficient market liquidity for the liquidator to hedge the position and the health ratio has fallen to the ADL threshold.

### What Happens

The protocol identifies accounts on the **opposite side** of the distressed position and a portion of their position is forcibly closed against the distressed account.

Unlike liquidation, there is no liquidation incentive in ADL. The winning counterparties do not choose to participate, their profitable positions are unwound to absorb the losses of the distressed account.

### Bad Debt Sharing

If the distressed account has negative value (i.e. losses exceed all remaining collateral), ADL may involve proportional bad debt sharing:

> Loss assigned to winner = Bad Debt × (Size Deleveraged / Total Loser Size)

The deleverage executes at (or near) the mark rate. Total value across the system is preserved and only margin requirements change. Only in extraordinary circumstances, ADL can happen at a rate other than the mark APR (for example when the losing user is already on bad debt, the deleverage will happen at the price where bad debt is avoided instead of the mark rate)

### Who Gets Deleveraged First

Counterparties are selected and ranked based on health ratio (lowest health ratio accounts are selected first).

### How to Reduce ADL Risk

To reduce ADL risks while participating in a market that could be in distress: simply improve your health ratio, which can be done by:

- Closing/reducing your position size to lower maintenance margin
- Increase collateral

ADL is not expected under normal market conditions, it exists purely as a final safeguard for extreme scenarios.


## Market Modes

### **OI Capped**

Triggered when total open interest hits the market cap, or when abnormal conditions are detected. Market orders can only reduce existing positions and no new exposure can be opened (OI is not allowed to increase). Limit orders remain open and can be posted freely.

### **Makers Only Mode**

Triggered in severe cases. No new trades can execute, including closing open positions. Limit orders can still be posted to the book. In practice, this is similar to OI Capped given that limit orders remain available, the only meaningful difference is that all taker orders (including closing open positions) are fully disabled.

### **Market Halted**

In the most extreme scenarios, an entire market can be halted, suspending all trading, order placement, and cancellation. This is a manual intervention by the team and is reserved for exceptional circumstances.