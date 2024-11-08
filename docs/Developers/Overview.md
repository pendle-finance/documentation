---
hide_table_of_contents: true
---

Follow our [Pendle Developer Updates](https://t.me/pendledevelopers) for important updates about the [Pendle Backend API](https://api-v2.pendle.finance/core/docs)

# Overview

## Core Documentation

- [High Level Architecture](./HighLevelArchitecture.md)
- [StandardizedYield (SY)](./Contracts/StandardizedYield.md)
- [vePENDLE](./Contracts/vePENDLE.md)
- [Common Questions](./UncategorisedQuestions.md)

## Integration Guides

### On-chain Integration

- **Router**: [Documentation](./Contracts/PendleRouter.md) | [Integration Guide](./Contracts/PendleRouter.md#integration-guide)
- **Oracles**: [Integration Guide](./Oracles/HowToIntegratePtAndLpOracle.md) | [PT as Collateral](./Oracles/PTAsCollateral.md) | [LP as Collateral](./Oracles/LPAsCollateral.md)
- [Example Repository](https://github.com/pendle-finance/pendle-examples-public) - Various contract interaction examples

### Off-chain Integration

- [Backend RESTful API](./Backend/BackendAndHostedSDK#pendle-restful-api)
- [RouterStatic](./Backend/RouterStatic.md) - Extensively tested contract for off-chain calculations. Not audited; should not be used for on-chain fund-related operations.

### Limit Orders

- [Contract](./LimitOrder/LimitOrderContract.md) | [Create](./LimitOrder/CreateALimitOrder.md) | [Cancel](./LimitOrder/CancelOrders.md) | [Fill](./LimitOrder/FillALimitOrder.md)

## Deployed Contract Addresses

All deployed contracts and markets can be found here: [GitHub link](https://github.com/pendle-finance/pendle-core-v2-public/tree/main/deployments)

To find the relevant addresses and details of a specific market:

1. Go to the market page.
2. Select the desired chain and click on an asset.
3. Click the button as shown in the image below.

![Market Info](/img/ProtocolMechanics/market_info.png "Market Info")

## Resources

- [Contract Addresses](https://github.com/pendle-finance/pendle-core-v2-public/tree/main/deployments)
- [Example Repository](https://github.com/pendle-finance/pendle-examples-public)
- [Whitepapers](https://github.com/pendle-finance/pendle-v2-resources/tree/main/whitepapers)

## Support

Join our [Discord Developer Channel](https://pendle.finance/discord) for support (response within 12 hours).
