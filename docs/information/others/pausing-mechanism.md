---
sidebar_position: 1
---

# Pausing Mechanism

## Where does pausing apply?

1. Forges' functions, which could be from the most general (all forges), to the
specific yield contract (with a forgeId, underlyingAsset, and expiry)
2. Markets, which could be from the most general (all markets), to the
specific market
3. LiquidityMining contracts

## Contract States

Contracts with pausing functionality will have 3 states:

1. **Normal** — everything works per normal
2. **Paused** — all functions will stop working, until unpaused
3. **Emergency Mode** — the contracts must be paused first before reaching this state.
    * For an affected yield contract, users can only call a function to withdraw their reasonable fund left in the contract
    * For an affected market, users can only call a function to withdraw their reasonable fund left in the contract

## PausingManager contract

There will be a `PausingManager` contract to manage the pausing mechanism. The PausingManager points to 3 other contracts:
1. **ForgeEmergencyHandler** — logic on how users could withdraw their fund from a forge
2. **MarketEmergencyHandler** — logic on  how users could withdraw their fund from a market
3. **LiquidityMiningHandler** — logic on  how users could withdraw their fund from a liquidity mining contract

These 3 addresses could be changed by the Governance Multisig (meaning the strategy for distributing the funds could be changed), with a timelock of 7 days to take into effect.

## Pausing Admins

There are `pausing admins`, who could trigger "paused" state for specific market/yield contract. The other things to note are:
* Only the Governance can unpause or trigger the emergency state for specific market/yield contract
* Governance could set/unset the pausing admins.
* Governance could change the ForgeEmergencyHandler, MarketEmergencyHandler and LiqMiningEmergencyHandler addresses, which would have a 7 day timelock before the change is executed.
* Governance could turn off the feature to pause/put into emergency forever
* Governance role could lock the addresses of theForgeEmergencyHandler and MarketEmergencyHandler, and LiqMiningEmergencyHandler contracts.
