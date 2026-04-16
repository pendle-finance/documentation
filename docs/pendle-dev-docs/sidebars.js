module.exports = {
  pendleDevSidebar: [
    { type: "doc", id: "Overview", label: "Overview", customProps: { icon: "auto_stories" } },
    { type: "doc", id: "Quickstart", label: "Quickstart", customProps: { icon: "bolt" } },
    { type: "doc", id: "HighLevelArchitecture", label: "High Level Architecture", customProps: { icon: "account_tree" } },
    { type: "doc", id: "FAQ", label: "FAQ", customProps: { icon: "help" } },
    { type: "doc", id: "Troubleshooting", label: "Troubleshooting", customProps: { icon: "build" } },
    {
      type: "category",
      label: "Integration Guides",
      customProps: { icon: "handshake" },
      items: [
        { type: "doc", id: "Integration/CommunityListing", label: "Community Listing" },
        { type: "doc", id: "Integration/CrossChainPT", label: "Cross-Chain PT" },
        { type: "doc", id: "Integration/PointsTracking", label: "Points & Rewards Tracking" },
      ],
    },
    {
      type: "category",
      label: "Contracts",
      customProps: { icon: "description" },
      items: [
        {
          type: "category",
          label: "Standardized Yield",
          items: [
            { type: "doc", id: "Contracts/StandardizedYield/StandardizedYield", label: "Overview" },
            { type: "doc", id: "Contracts/StandardizedYield/CommonSY", label: "Common SY Contracts" },
            { type: "doc", id: "Contracts/StandardizedYield/DecimalsWrapper", label: "Decimals Wrapper" },
          ],
        },
        {
          type: "category",
          label: "Yield Tokenization",
          items: [
            { type: "doc", id: "Contracts/YieldTokenization/YieldTokenization", label: "Overview" },
            { type: "doc", id: "Contracts/YieldTokenization/YieldContractFactory", label: "Yield Contract Factory" },
          ],
        },
        {
          type: "category",
          label: "PendleMarket",
          items: [
            { type: "doc", id: "Contracts/PendleMarket/PendleMarket", label: "Overview" },
            { type: "doc", id: "Contracts/PendleMarket/MarketFactory", label: "Market Factory" },
            { type: "doc", id: "Contracts/PendleMarket/LPWrapper", label: "LP Wrapper" },
            { type: "doc", id: "Contracts/PendleMarket/CommonMarketDeployments", label: "Common Market Deployments" },
          ],
        },
        {
          type: "category",
          label: "PendleRouter",
          items: [
            { type: "doc", id: "Contracts/PendleRouter/PendleRouterOverview", label: "Overview" },
            { type: "doc", id: "Contracts/PendleRouter/ContractIntegrationGuide", label: "Integration Guide" },
            {
              type: "category",
              label: "API Reference",
              items: [
                { type: "doc", id: "Contracts/PendleRouter/ApiReference/Types", label: "Types" },
                { type: "doc", id: "Contracts/PendleRouter/ApiReference/PtFunctions", label: "PT Functions" },
                { type: "doc", id: "Contracts/PendleRouter/ApiReference/YtFunctions", label: "YT Functions" },
                { type: "doc", id: "Contracts/PendleRouter/ApiReference/LiquidityFunctions", label: "Liquidity Functions" },
                { type: "doc", id: "Contracts/PendleRouter/ApiReference/MiscFunctions", label: "Misc Functions" },
                { type: "doc", id: "Contracts/PendleRouter/ApiReference/SimpleFunctions", label: "Simple Functions" },
              ],
            },
          ],
        },
        {
          type: "category",
          label: "RouterStatic",
          items: [
            { type: "doc", id: "Contracts/RouterStatic/RouterStaticOverview", label: "Overview" },
            {
              type: "category",
              label: "API Reference",
              items: [
                { type: "doc", id: "Contracts/RouterStatic/ApiReference/InfoFunctions", label: "Info Functions" },
                { type: "doc", id: "Contracts/RouterStatic/ApiReference/RateFunctions", label: "Rate Functions" },
                { type: "doc", id: "Contracts/RouterStatic/ApiReference/SwapFunctions", label: "Swap Functions" },
                { type: "doc", id: "Contracts/RouterStatic/ApiReference/LiquidityFunctions", label: "Liquidity Functions" },
                { type: "doc", id: "Contracts/RouterStatic/ApiReference/MintRedeemFunctions", label: "Mint & Redeem Functions" },
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Oracle",
          items: [
            { type: "doc", id: "Contracts/Oracle/PYLpOracle", label: "PYLp Oracle" },
            { type: "doc", id: "Contracts/Oracle/ChainlinkOracle", label: "Chainlink Oracle" },
            {
              type: "category",
              label: "Linear Discount Oracle",
              items: [
                { type: "doc", id: "Contracts/Oracle/LinearDiscountOracle/LinearDiscountOracleWrapper", label: "Oracle Wrapper" },
                { type: "doc", id: "Contracts/Oracle/LinearDiscountOracle/LpLinearDiscountOracle", label: "LP Linear Discount Oracle" },
                { type: "doc", id: "Contracts/Oracle/LinearDiscountOracle/SparkLinearDiscountOracle", label: "Spark Linear Discount Oracle" },
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Liquidity Mining",
          items: [
            { type: "doc", id: "Contracts/LiquidityMining/GaugeController", label: "Gauge Controller" },
            { type: "doc", id: "Contracts/LiquidityMining/MerkleDistributor", label: "Merkle Distributor" },
            { type: "doc", id: "Contracts/LiquidityMining/Rewards", label: "Rewards" },
          ],
        },
        { type: "doc", id: "Contracts/sPENDLE", label: "sPENDLE" },
        { type: "doc", id: "Contracts/UnitAndDecimals", label: "Units and Decimals" },
      ],
    },
    {
      type: "category",
      label: "Limit Orders",
      customProps: { icon: "list_alt" },
      items: [
        { type: "doc", id: "LimitOrder/Overview", label: "Overview" },
        { type: "doc", id: "LimitOrder/LimitOrderContract", label: "Contract" },
        { type: "doc", id: "LimitOrder/CreateALimitOrder", label: "Create a Limit Order" },
        { type: "doc", id: "LimitOrder/CancelOrders", label: "Cancel Orders" },
        { type: "doc", id: "LimitOrder/FillALimitOrder", label: "Fill a Limit Order" },
      ],
    },
    {
      type: "category",
      label: "Oracles",
      customProps: { icon: "visibility" },
      items: [
        { type: "doc", id: "Oracles/OracleOverview", label: "Oracle Overview" },
        { type: "doc", id: "Oracles/HowToIntegratePtAndLpOracle", label: "How to Integrate PT & LP Oracle" },
        { type: "doc", id: "Oracles/IntroductionOfLpOracle", label: "LP Oracle Introduction" },
        { type: "doc", id: "Oracles/IntroductionOfPtOracle", label: "PT Oracle Introduction" },
        { type: "doc", id: "Oracles/LPAsCollateral", label: "LP as Collateral" },
        { type: "doc", id: "Oracles/PTAsCollateral", label: "PT as Collateral" },
        { type: "doc", id: "Oracles/PTSanityChecks", label: "PT Sanity Checks" },
        {
          type: "category",
          label: "Deterministic Oracles",
          items: [
            { type: "doc", id: "Oracles/DeterministicOracles/LinearDiscountOracle", label: "Linear Discount Oracle" },
            { type: "doc", id: "Oracles/DeterministicOracles/LPLinearDiscountOracle", label: "LP Linear Discount Oracle" },
            { type: "doc", id: "Oracles/DeterministicOracles/ChoosingLinearDiscountParams", label: "Choosing Params" },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Off-chain Helpers",
      customProps: { icon: "construction" },
      items: [
        { type: "doc", id: "Backend/ApiOverview", label: "API Overview" },
        { type: "doc", id: "Backend/HostedSdk", label: "Hosted SDK" },
        { type: "link", label: "API Reference", href: "https://api-v2.pendle.finance/core/docs", customProps: { icon: "open_in_new" } },
        { type: "doc", id: "Backend/RouterStatic", label: "Router Static" },
      ],
    },
    { type: "doc", id: "Deployments", label: "Deployments", customProps: { icon: "rocket_launch" } },
  ],
};
