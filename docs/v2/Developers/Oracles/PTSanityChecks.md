---
hide_table_of_contents: true
---

# Sanity checks for PT Integrations

### Sanity check for PT Oracle
After integrating an oracle for PT price (assuming it's a PT/stable price), you should do these steps to quickly check the oracle's correctness:
1. Get the TWAP PT price from your oracle implementation.
2. Go to Pendle Market page for the PT, click the "Price" tab and check the PT price in terms of the underlying asset. In almost all cases, PT absolute price (in terms of the underlying asset) does not fluctuate that much over 30m-1hr.
3. Multiply the price in step 2 with the price of the underlying asset. Please take note which underlying asset it is from the Pendle Frontend.
![Step 3](/img/checkPtPrice.jpg "Step 3")
4. Compare the price in step 1 with the price in step 3. They should be almost identical. If there's a difference of more than 0.2%, something is likely wrong and please ask the Pendle team to help double check.

# Sanity checks for PT liquidity
If you need to assess PT liquidity and PT price volatility (when doing risk assessment for PT as a collateral or other similar use cases), you should do these sanity checks:
### Check PT/underlying asset price volatility
1. Go to Pendle Market page for the PT, click the "Price" tab and check the volatility of PT/Underlying asset price
2. From there, you could gauge the volatility of PT/stable price

### Check PT liquidity
You can check the price impact of different swap sizes (in either direction) for PT
1. Go to Pendle Market page for the PT, click the "Price" tab
2. Simulate a trade to sell or buy PT from the underlying asset
3. Check the price impact
![Check price impact](/img/PTPriceImpact.jpg "Check price impact")