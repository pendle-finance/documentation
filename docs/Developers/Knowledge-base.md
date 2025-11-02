
---
hide_table_of_contents: true
---
# Knowledge Base

Below are conversation excerpts with different Pendle partners, useful for answering questions. Note that "E" means external partners, whereas "P" stands for the Pendle team. Answers from the Pendle team are for reference only and not to be considered official answers or security advice.

## Upper Bound for LP-to-SY Rate

**E:** Is there a value that can be used as an upper bound for LP-to-SY? We're used to capping PT tokens that should equal synthetic dollars at maturity by 1 from above to add additional data validation and be protected from random events where the price may pump. Is that excessive in your opinion?

**P:** LP in theory can have a value as high as infinity if the fee generated is infinity. However, an upper bound of approximately 3 units is somewhat reasonable. (This is not security advice.)

## PT Pricing: Asset vs SY (eBTC Example)

**E:** We are using WBTC as the underlying asset in our PT TWAP feed for `PT_eBTC_26DEC2024`. This causes a moderately large difference with the market exchange rate from `PT_eBTC_26DEC2024` to WBTC on Pendle UI (0.996 our oracle vs 0.991 in UI). This seems to be due to eBTC trading at a discount to WBTC on the market. For other PTs, we are computing the price as `PTToAssetRate * base asset price` (i.e., USDe for sUSDe PT, WETH for ezETH/weETH PT), which produces correct prices. Would you recommend using eBTC instead as the base asset? Or is using WBTC in this case correct, and we should never use the SY underlying in the price feed?

**P:** We recommend pricing PT to SY and pricing the token that SY wraps whenever possible, because these tokens frequently trade at a discount compared to their true value. So PT-eBTC should be priced to eBTC, and PT-ezETH should be priced to ezETH.

It's quite straightforward:
- If you use `getPtToAsset`, multiply it by the asset price
- If you use `getPtToSy`, multiply it by the SY price

For example, PT-ezETH can be priced by either:
- Method 1: `1 PT-ezETH = 1.2 ETH = 1.2 * $3500 = $4200 USD`
- Method 2: `1 PT-ezETH = 1.01 ezETH = 1.01 * $4158 = $4199.58 USD`

Pricing in the wrapped token (eBTC, ezETH) is always strictly more accurate since PT-eBTC is only tradable to eBTC in Pendle. The eBTC to WBTC conversion is external to Pendle.

## Oracle Cardinality Mechanic

**E:** Could you clarify what's the purpose of the cardinality mechanic in the market TWAP oracle? As far as I can see, this makes `observe` revert if there were more than cardinality observations within the `[block.timestamp - secondsAgo; block.timestamp]` interval. Is it some kind of anti-spam measure? Is there any downside to calling `increaseObservationsCardinalityNext`?

**P:** No downside, anyone can call it. It's the same as Uniswap V3. If we call it to the max, we would have to pay `65536 * 20000 gas`, which is a lot of ETH.

**E:** So just an initialization gas savings measure? Makes sense.

**P:** Yes.

## PendleChainlinkOracle Decimals

**E:** We've just deployed an LP feed that returns a price with 30 decimals instead of 18. Can you please check what's the problem with it?

**P:** 30 decimals is correct. You are using the `PendleChainlinkOracle`. The round data should be interpreted as follows:

The `answer` will satisfy:
```
1 natural unit of PendleToken = (answer / 1e18) natural unit of OutputToken
```

In other words:
```
10**(PendleToken.decimals) = (answer / 1e18) * 10**(OutputToken.decimals)
```

This means the `answer` returned has `18 + OutputToken.decimals` total decimals, which explains why you're seeing 30 decimals when `OutputToken.decimals = 12`.