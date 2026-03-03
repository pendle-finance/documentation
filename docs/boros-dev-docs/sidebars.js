module.exports = {
  borosSidebar: [
    {
      type: "doc",
      id: "Introduction",
      label: "📖 Introduction",
    },
    {
      type: "doc",
      id: "LitePaper",
      label: "📄 Lite Paper",
    },
    {
      type: "doc",
      id: "HighLevelArchitecture",
      label: "🏗️ High Level Architecture",
    },
    {
      type: "category",
      label: "⚙️ Mechanics",
      items: [
        { type: "doc", id: "Mechanics/OrderBook", label: "📊 Order Book" },
        { type: "doc", id: "Mechanics/Margin", label: "💰 Margin" },
        { type: "doc", id: "Mechanics/Settlement", label: "✅ Settlement" },
        { type: "doc", id: "Mechanics/Fees", label: "💵 Fees" },
      ],
    },
    {
      type: "category",
      label: "📜 Contracts",
      items: [
        { type: "doc", id: "Contracts/Router", label: "🔀 Router" },
        { type: "doc", id: "Contracts/MarketHub", label: "🏪 MarketHub" },
        { type: "doc", id: "Contracts/Market", label: "📈 Market" },
        { type: "doc", id: "Contracts/CustomTypes", label: "🎨 Custom Types" },
      ],
    },
    {
      type: "category",
      label: "🔌 Backend Integration",
      items: [
        { type: "doc", id: "Backend/overview", label: "📖 Overview" },
        { type: "doc", id: "Backend/glossary", label: "📚 Glossary" },
        { type: "doc", id: "Backend/agent", label: "🤖 Agent" },
        { type: "doc", id: "Backend/api", label: "🌐 API" },
        { type: "doc", id: "Backend/websocket", label: "📡 WebSocket" },
        { type: "doc", id: "Backend/stop-orders", label: "🎯 Stop Orders" },
        { type: "doc", id: "Backend/best-practices", label: "✨ Best Practices" },
      ],
    },
    {
      type: "doc",
      id: "FAQ",
      label: "❓ FAQ",
    },
  ],
};
