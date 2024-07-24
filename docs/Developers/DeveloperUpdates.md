---
hide_table_of_contents: true
---

# Developer Updates

Follow: @pendledevelopers on Telegram for the latest updates

## July. 17, 2024

The new YieldContractFactory and MarketFactory V4 have just been deployed. The only change in these new factories is that Permit has been completely removed from PT, YT, and Markets. In other words, all Pendle PT YT & LP from today onwards will no longer have Permit.

You can find the new addresses here: https://github.com/pendle-finance/pendle-core-v2-public/tree/main/deployments

Or package @pendle/core-v2@5.0.0

Please reach out if you have any questions!


## Nov. 28, 2023

* New `PendleYieldContractFactoryV3` and `PendleMarketFactoryV3` deployed on all chains will solely be used moving forward. Please refer to the Deployments page to find the contracts addresses of the new factories on each chain.


## Apr. 29, 2024

 We deployed our RouterV4 at `0x888888888889758F76e7103c6CbF23ABbF58F946`. This router is fully backward compatible with RouterV3, meaning only a change in address is needed for migration.

The purpose of this Router is to:
- Enhance the reliability of limit order matching in high-traffic environments
- Lay the groundwork for upcoming features like Auto Roll-over for mature markets, smart exit all (automatically pairing YT with PT for lower price impact), and more
- Enable us to optimize the router without requiring you to change the address or interface in the future
-
Router V2 & V3 will continue functioning normally, but upgrading to V4 is recommended to enjoy the latest optimisations!  Please let us know if you have any questions.