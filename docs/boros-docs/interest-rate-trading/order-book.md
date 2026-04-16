# Order Book

Orders on Boros are placed on Implied APR of the asset, which is the yield denominated price of the asset. Learn more [here](interest-rate-trading-yu-trading#implied-apr-and-fixed-apr).

## **Order types:**

* Market: Order executes immediately in order of the best prices in the order book.
* Limit: Order executes at the selected limit price or better.

Limit orders on Pendle are Good Til Cancel (GTC) orders, which means they will be available in the order book until it is filled or cancelled.

The order book will be closed at maturity and all orders will automatically be cancelled.
