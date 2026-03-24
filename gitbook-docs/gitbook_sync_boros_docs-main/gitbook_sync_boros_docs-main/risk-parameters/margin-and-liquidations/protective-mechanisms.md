# Protective mechanisms

There a few mechanisms in place to mitigate risks for the users and Boros' system.

### OI Cap

* There is a hard cap on the OI of any market
* To get the value from market API:
  * OI Cap = **`hardOICap`/`1e18`**

### Closing Only Mode

* When the market dynamics becomes too extreme (for example, abnormally high price volatility or low liquidity), the Closing Only Mode will be automatically turned on
* When Closing Only Mode is on, users will only be able to close existing positions (and not open new positions)

### Max Rate Deviation

* The system disallows any market trade that happens at a rate too far away from the current mark rate.
* If a trade exceeds this limit, an error “Large Rate Deviation” will be displayed on the UI
* The exact requirement is as follows:

$$
|markRate - rateTraded| \leq maxRateDeviationFactor \times max(markRate, RateFloor)
$$

* `maxRateDeviationFactor` = **`maxRateDeviationFactorBase1e4` / `1e4`**
  * where **`maxRateDeviationFactorBase1e4`** is from the market API

### Max Bounds on Limit Order rates

* When placing a limit order, a user can’t long at a rate too high above the mark rate, or short at a rate too low below the mark rate.
* The exact mechanics is this:
  * A long order rate must not exceed _f_<sup>_u_</sup>
  * A short order rate must not be lower than _f_<sup>_l_</sup>

$$
f^u(r_m) =    \begin{cases}      r_m\times upperLimitSlope & r_m \geq I_{threshold} \\      r_m + upperLimitConstant & 0 \leq r_m < I_{threshold} \\      -f^l(-r_m) & r_m < 0    \end{cases}\\    f^l(r_m) =    \begin{cases}      r_m\times lowerLimitSlope & r_m \geq I_{threshold} \\      r_m + lowerLimitConstant & 0 \leq r_m < I_{threshold} \\      -f^u(-r_m) & r_m < 0    \end{cases}
$$

* To get the variables from the values returned from market API:
  * `upperLimitSlope` = **`loUpperSlopeBase1e4` / 1e4**
  * `upperLimitConstant` = **`loUpperConstBase1e4` / 1e4**
  * `lowerLimitSlope` = **`loLowerSlopeBase1e4` / 1e4**
  * `lowerLimitConstant` = **`loLowerConstBase1e4` / 1e4**
