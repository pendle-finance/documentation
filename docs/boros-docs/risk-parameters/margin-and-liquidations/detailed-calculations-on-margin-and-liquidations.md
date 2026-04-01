# Detailed Calculations on Margin and Liquidations

## Initial Margin (IM)

* Overview: Initial Margin is the margin a user needs to open a new position
* Variables:
  * `k`<sub>`IM`</sub>: Initial Margin Factor, a setting specific to each market
  * `s`: Notional Size
  * `t`: Time to maturity (in years)
  * `TimeFloor`: floor for time to maturity, a setting specific to each market
  * `RateFloor`: floor for Mark Rate, a setting specific to each market
* Formula:

$$
IM = k_{IM} \times |s| \times max(t, TimeFloor) \times max(markRate, RateFloor)
$$

* A user is able to open a new limit order or market order, if their total Initial Margin is less than their Net Balance, or they are closing their existing position

## Maintenance Margin (MM)

* Overview: Maintenance Margin is the margin a user needs to have to maintain a position (and not be liquidated)
* Variables:
  * `k`<sub>`MM`</sub>: Maintenance Margin Factor, a setting specific to each market
  * `s`: Notional Size
  * `t`: Time to maturity (in years)
  * `TimeFloor`: floor for time to maturity, a setting specific to each market
  * `RateFloor`: floor for Mark Rate, a setting specific to each market
* Formula:

$$
MM = k_{MM} \times |s| \times max(t, TimeFloor) \times max(markRate, RateFloor)
$$

* To get the settings from the API:
  * API: [https://api.boros.finance/core/docs#/Markets/MarketsController\_getMarketInfo](https://api.boros.finance/core/docs#/Markets/MarketsController_getMarketInfo)
  * Notes on how to get settings from the API:
    * TimeFloor: **`tThresh`** from the API, divided by 365\*_24\*_&#x33;600
    * RateFloor:
      * `1.00005^(iTickThresh*tickStep) - 1`

## Liquidation

* Overview: a user is liquidated in a collateral zone if their Net Balance goes below Maintenance Margin
* When a liquidation happens, the user’s position is closed at the mark rate, and the user loses an liquidation penalty of:

$$
LiquidationPenalty = k * maintenanceMarginOfLiquidatedPosition
$$

* Where k will start from 25% when a position just become liquidate-able and increases linearly to 50% when the position becomes more and more unhealthy (and still not liquidated)
