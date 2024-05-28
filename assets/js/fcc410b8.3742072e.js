"use strict";(self.webpackChunkpendle_documentation=self.webpackChunkpendle_documentation||[]).push([[7183],{3905:(e,t,r)=>{r.d(t,{Zo:()=>m,kt:()=>h});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var s=n.createContext({}),d=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},m=function(e){var t=d(e.components);return n.createElement(s.Provider,{value:t},e.children)},c="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),c=d(r),u=i,h=c["".concat(s,".").concat(u)]||c[u]||p[u]||a;return r?n.createElement(h,o(o({ref:t},m),{},{components:r})):n.createElement(h,o({ref:t},m))}));function h(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:i,o[1]=l;for(var d=2;d<a;d++)o[d]=r[d];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},3510:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>d});var n=r(7462),i=(r(7294),r(3905));const a={},o="Fill a Limit Order",l={unversionedId:"Developers/LimitOrder/FillALimitOrder",id:"Developers/LimitOrder/FillALimitOrder",title:"Fill a Limit Order",description:"Takers can fill any signed limit order from the Pendle Limit Order order books by executing the fill order on the smart contract. By using Pendle Limit Order APIs, takers can access liquidity sources without slippage, ensuring secure on-chain settlements.",source:"@site/docs/Developers/LimitOrder/FillALimitOrder.md",sourceDirName:"Developers/LimitOrder",slug:"/Developers/LimitOrder/FillALimitOrder",permalink:"/Developers/LimitOrder/FillALimitOrder",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"myAutogeneratedSidebar",previous:{title:"Cancel Limit Orders",permalink:"/Developers/LimitOrder/CancelOrders"},next:{title:"How to Integrate PT and LP Oracle",permalink:"/Developers/Oracles/HowToIntegratePtAndLpOracle"}},s={},d=[{value:"Step 1: Fetch the limit orders",id:"step-1-fetch-the-limit-orders",level:3},{value:"Step 2: Fill the order",id:"step-2-fill-the-order",level:3}],m={toc:d},c="wrapper";function p(e){let{components:t,...r}=e;return(0,i.kt)(c,(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"fill-a-limit-order"},"Fill a Limit Order"),(0,i.kt)("p",null,"Takers can fill any signed limit order from the Pendle Limit Order order books by executing the fill order on the smart contract. By using Pendle Limit Order APIs, takers can access liquidity sources without slippage, ensuring secure on-chain settlements."),(0,i.kt)("p",null,"Pendle exposes 1 API for takers to view active orders to fill them on-chain"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://api-v2.pendle.finance/limit-order/docs#/Taker/TakersController_generateLimitOrderData"},"Get limit orders")),(0,i.kt)("h1",{id:"typescript-example"},"Typescript example"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Note:"),": The code examples in the guide below are taken from our demo GitHub repository, which demonstrates the complete end-to-end Limit Order processes in a TypeScript environment."),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/pendle-finance/limit-order-api-demo"},"Repo")),(0,i.kt)("h3",{id:"step-1-fetch-the-limit-orders"},"Step 1: Fetch the limit orders"),(0,i.kt)("p",null,"Takers can use Pendle's API to fetch the limit orders and use any fetched orders to fill."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"const requestQuery: LimitOrderQuery = {\n  skip: 0,\n  limit: 10, // Use skip and limit to fetch the orders, you can fetch upto 100 orders at a request\n  chainId: ChainId.ARBITRUM,\n  yt: aUSDC_MARKET.yt,\n  type: LimitOrderType.TOKEN_FOR_PT,\n  sortBy: 'Implied Rate',\n  sortOrder: 'asc',\n};\n")),(0,i.kt)("p",null,"A single API response can return up to 100 orders. Takers can use the skip and limit parameters to find more orders."),(0,i.kt)("p",null,"Takers can sort the orders by implied rate (in ascending or descending order) to find the best orders."),(0,i.kt)("p",null,"For example: If a taker want to find orders sell token for YT, the orders with lower implied rate will be profitable than those with a higher implied rate. So takers can fetch the orders sorted by ",(0,i.kt)("inlineCode",{parentName:"p"},"Implied Rate")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"sortOrder")," set to ",(0,i.kt)("inlineCode",{parentName:"p"},"asc"),"."),(0,i.kt)("p",null,"The returned data will include ",(0,i.kt)("inlineCode",{parentName:"p"},"netFromTaker"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"netToTaker"),", indicating the amount the taker will receive and the amount that will be taken from the taker."),(0,i.kt)("h3",{id:"step-2-fill-the-order"},"Step 2: Fill the order"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"const sumNetFromTaker = limitOrdersInfo.reduce((acc, limitOrderInfo) => {\n  return acc + BigInt(limitOrderInfo.netFromTaker);\n}, 0n);\n\n// Maximum amount to be used to fill the order\n// We recommend buffer the returned value from BE by 1% because\n// the netFromTaker amount will change by time\nconst maxTaking = (sumNetFromTaker * 101n) / 100n;\n\nconst tx = await contract.fill(\n  fillParams, // limit of order to fill\n  signer.getAddress(), // receiver\n  maxTaking,\n  '0x',\n  '0x'\n);\n")),(0,i.kt)("p",null,"There are three main params that you need to fill the limit orders"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"fillParams"),": The list of limit orders and the amount you want to fill (you can partially fill the order)"),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"receiver"),": The address that will receive the maker amount from the limit orders."),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"maxTaking"),": The maximum amount the limit order contract can take from the Taker to fill the limit orders.")),(0,i.kt)("p",null,"The maxTaking value indicates the maximum amount the limit order contract can take from the Taker to fill the limit orders."),(0,i.kt)("p",null,"Because the ",(0,i.kt)("inlineCode",{parentName:"p"},"netFromTaker")," data received from Pendle's backend can be change over time, it's recommended to buffer the maxTaking by 1% of the sumNetFromTaker."),(0,i.kt)("p",null,"You can find more implementation details in our ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/pendle-finance/limit-order-api-demo"},"demo repository")))}p.isMDXComponent=!0}}]);