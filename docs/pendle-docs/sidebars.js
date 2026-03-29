module.exports = {
  pendleSidebar: [
    { type: "doc", id: "Introduction", label: "Introduction", customProps: { icon: "auto_stories" } },
    { type: "doc", id: "FAQ", label: "FAQ", customProps: { icon: "help" } },
    {
      type: "category",
      label: "Protocol Mechanics",
      customProps: { icon: "settings" },
      items: [
        { type: "doc", id: "ProtocolMechanics/Glossary", label: "Glossary", customProps: { icon: "library_books" } },
        {
          type: "category",
          label: "Yield Tokenization",
          customProps: { icon: "stacked_line_chart" },
          items: [
            { type: "doc", id: "ProtocolMechanics/YieldTokenization/SY", label: "SY" },
            { type: "doc", id: "ProtocolMechanics/YieldTokenization/Minting", label: "Minting" },
            { type: "doc", id: "ProtocolMechanics/YieldTokenization/PT", label: "PT" },
            { type: "doc", id: "ProtocolMechanics/YieldTokenization/YT", label: "YT" }
          ],
        },
        {
          type: "category",
          label: "Liquidity Engines",
          customProps: { icon: "water" },
          items: [
            { type: "doc", id: "ProtocolMechanics/LiquidityEngines/AMM", label: "AMM" },
            { type: "doc", id: "ProtocolMechanics/LiquidityEngines/OrderBook", label: "Order Book" }
          ],
        },
        {
          type: "category",
          label: "Tokenomics and Fees",
          customProps: { icon: "payments" },
          items: [
            { type: "doc", id: "ProtocolMechanics/Mechanisms/Tokenomics", label: "Tokenomics" },
            { type: "doc", id: "ProtocolMechanics/Mechanisms/sPENDLE", label: "sPENDLE" },
            { type: "doc", id: "ProtocolMechanics/Mechanisms/Incentives", label: "Incentives" },
            { type: "doc", id: "ProtocolMechanics/Mechanisms/Fees", label: "Fees" }
          ],
        },
        { type: "doc", id: "ProtocolMechanics/NegativeYield", label: "Negative Yield" },
        { type: "doc", id: "ProtocolMechanics/PendleMarketAPYCalculation", label: "APY Calculation" }
      ],
    },
    {
      type: "category",
      label: "App Guide",
      customProps: { icon: "apps" },
      items: [
        { type: "doc", id: "AppGuide/UsingPendle", label: "Using Pendle", customProps: { icon: "rocket_launch" } },
        { type: "doc", id: "AppGuide/Mint", label: "Mint", customProps: { icon: "generating_tokens" } },
        { type: "doc", id: "AppGuide/Swap", label: "Swap", customProps: { icon: "swap_horiz" } },
        { type: "doc", id: "AppGuide/LimitOrder", label: "Limit Order", customProps: { icon: "tune" } },
        { type: "doc", id: "AppGuide/CrossChainPT", label: "Cross-Chain PT", customProps: { icon: "public" } },
        { type: "doc", id: "AppGuide/Pool", label: "Pool", customProps: { icon: "water" } },
        { type: "doc", id: "AppGuide/Claim", label: "Claim", customProps: { icon: "redeem" } },
        { type: "doc", id: "AppGuide/Dashboard", label: "Dashboard", customProps: { icon: "dashboard" } },
        { type: "doc", id: "AppGuide/Pencosystem", label: "Pencosystem", customProps: { icon: "hub" } },
        { type: "doc", id: "AppGuide/BridgePendle", label: "Bridge PENDLE", customProps: { icon: "swap_horizontal_circle" } }
      ],
    },
    { type: "doc", id: "Security", label: "Security", customProps: { icon: "security" } },
    { type: "link", label: "Whitepapers", href: "https://github.com/pendle-finance/pendle-v2-resources/tree/main/whitepapers", customProps: { icon: "article" } }
  ],
};
