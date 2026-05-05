module.exports = {
  borosSidebar: [
    { type: "doc", id: "Introduction", label: "Introduction", customProps: { icon: "auto_stories" } },
    { type: "doc", id: "LitePaper", label: "Lite Paper", customProps: { icon: "article" } },
    { type: "doc", id: "HighLevelArchitecture", label: "High Level Architecture", customProps: { icon: "architecture" } },
    {
      type: "category", label: "Mechanics", customProps: { icon: "settings" },
      items: [
        { type: "doc", id: "Mechanics/OrderBook", label: "Order Book", customProps: { icon: "candlestick_chart" } },
        { type: "doc", id: "Mechanics/AMM", label: "AMM", customProps: { icon: "waves" } },
        { type: "doc", id: "Mechanics/Margin", label: "Margin", customProps: { icon: "account_balance" } },
        { type: "doc", id: "Mechanics/Settlement", label: "Settlement", customProps: { icon: "task_alt" } },
        { type: "doc", id: "Mechanics/Fees", label: "Fees", customProps: { icon: "payments" } },
        { type: "doc", id: "Mechanics/Incentives", label: "Incentives", customProps: { icon: "redeem" } },
      ],
    },
    {
      type: "category", label: "Contracts", customProps: { icon: "description" },
      items: [
        { type: "doc", id: "Contracts/Router", label: "Router", customProps: { icon: "alt_route" } },
        { type: "doc", id: "Contracts/MarketHub", label: "MarketHub", customProps: { icon: "storefront" } },
        { type: "doc", id: "Contracts/Market", label: "Market", customProps: { icon: "trending_up" } },
        { type: "doc", id: "Contracts/CustomTypes", label: "Custom Types", customProps: { icon: "data_object" } },
      ],
    },
    {
      type: "category", label: "Backend Integration", customProps: { icon: "integration_instructions" },
      items: [
        { type: "doc", id: "Backend/overview", label: "Overview", customProps: { icon: "info" } },
        { type: "doc", id: "Backend/glossary", label: "Glossary", customProps: { icon: "library_books" } },
        { type: "doc", id: "Backend/agent", label: "Agent", customProps: { icon: "smart_toy" } },
        { type: "doc", id: "Backend/api", label: "API", customProps: { icon: "api" } },
        { type: "doc", id: "Backend/websocket", label: "WebSocket", customProps: { icon: "wifi" } },
        { type: "doc", id: "Backend/stop-orders", label: "Stop Orders", customProps: { icon: "stop_circle" } },
        { type: "doc", id: "Backend/historical-data", label: "Historical Data", customProps: { icon: "history" } },
        { type: "doc", id: "Backend/indicators", label: "Indicators", customProps: { icon: "insights" } },
        { type: "doc", id: "Backend/computing-units", label: "Computing Units", customProps: { icon: "speed" } },
        { type: "doc", id: "Backend/best-practices", label: "Best Practices", customProps: { icon: "star" } },
      ],
    },
    { type: "doc", id: "FAQ", label: "FAQ", customProps: { icon: "help" } },
  ],
};
