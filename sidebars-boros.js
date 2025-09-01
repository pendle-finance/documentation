module.exports = {
  borosSidebar: [
    {
      type: "link",
      label: "← Back to Home",
      href: "/",
    },
    {
      type: "doc",
      id: "Introduction",
      label: "Introduction",
    },
    {
      type: "doc",
      id: "LitePaper",
      label: "Lite Paper",
    },
    {
      type: "doc",
      id: "HighLevelArchitecture",
      label: "High Level Architecture",
    },
    {
      type: "category",
      label: "Mechanics",
      items: [
        { type: "doc", id: "Mechanics/OrderBook" },
        { type: "doc", id: "Mechanics/Margin" },
        { type: "doc", id: "Mechanics/Settlement" },
        { type: "doc", id: "Mechanics/Fees" },
      ],
    },
    {
      type: "category",
      label: "Contracts",
      items: [
        { type: "doc", id: "Contracts/Router" },
        { type: "doc", id: "Contracts/MarketHub" },
        { type: "doc", id: "Contracts/Market" },
        { type: "doc", id: "Contracts/CustomTypes" },
      ],
    },
    {
      type: "category",
      label: "Backend Integration",
      items: [
        { type: "doc", id: "Backend/REST API" },
        { type: "doc", id: "Backend/WebSocket" },
        { type: "doc", id: "Backend/SDK" },
      ],
    },
    {
      type: "doc",
      id: "FAQ",
      label: "FAQ",
    },
    {
      type: "link",
      label: "Back to Main Docs",
      href: "/docs",
    },
  ],
};