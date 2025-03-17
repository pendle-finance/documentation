"use strict";(self.webpackChunkpendle_documentation=self.webpackChunkpendle_documentation||[]).push([[1515],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d=r.createContext({}),s=function(e){var t=r.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(d.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,d=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=s(n),h=a,m=p["".concat(d,".").concat(h)]||p[h]||u[h]||o;return n?r.createElement(m,i(i({ref:t},c),{},{components:n})):r.createElement(m,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=h;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l[p]="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},2746:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var r=n(7462),a=(n(7294),n(3905));const o={hide_table_of_contents:!0},i="Frequently Asked Questions",l={unversionedId:"Developers/FAQ",id:"Developers/FAQ",title:"Frequently Asked Questions",description:"This document is being iterated on rapidly due to incoming questions from partner protocols.",source:"@site/docs/Developers/FAQ.md",sourceDirName:"Developers",slug:"/Developers/FAQ",permalink:"/cn/Developers/FAQ",draft:!1,tags:[],version:"current",frontMatter:{hide_table_of_contents:!0},sidebar:"myAutogeneratedSidebar",previous:{title:"High Level Architecture",permalink:"/cn/Developers/HighLevelArchitecture"},next:{title:"StandardizedYield (SY)",permalink:"/cn/Developers/Contracts/StandardizedYield"}},d={},s=[{value:"Contract",id:"contract",level:2},{value:"Why No\xa0<code>swapExactSyForPt</code>?",id:"why-noswapexactsyforpt",level:3},{value:"How can I deploy a new SY Token on Pendle?",id:"how-can-i-deploy-a-new-sy-token-on-pendle",level:3},{value:"Backend",id:"backend",level:2},{value:"How can I preview the received amount of add/remove liquidity?",id:"how-can-i-preview-the-received-amount-of-addremove-liquidity",level:3},{value:"How do I fetch the PT price?",id:"how-do-i-fetch-the-pt-price",level:3},{value:"How can I retrieve historical PT and YT prices?",id:"how-can-i-retrieve-historical-pt-and-yt-prices",level:3},{value:"Others",id:"others",level:2},{value:"Getting Up-to-Date\xa0<code>accruedRewards</code>\xa0On-Chain (Applicable to SY, YT, &amp; LP)",id:"getting-up-to-dateaccruedrewardson-chain-applicable-to-sy-yt--lp",level:3},{value:"Can the output of\xa0<code>getRewardTokens</code>\xa0change?",id:"can-the-output-ofgetrewardtokenschange",level:3},{value:"How to read unclaimed Rewards and Interest for SY/YT/Market",id:"how-to-read-unclaimed-rewards-and-interest-for-syytmarket",level:3}],c={toc:s},p="wrapper";function u(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"frequently-asked-questions"},"Frequently Asked Questions"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"This document is being iterated on rapidly due to incoming questions from partner protocols."),"\xa0"),(0,a.kt)("h2",{id:"contract"},"Contract"),(0,a.kt)("h3",{id:"why-noswapexactsyforpt"},"Why No\xa0",(0,a.kt)("inlineCode",{parentName:"h3"},"swapExactSyForPt"),"?"),(0,a.kt)("p",null,"Unlike standard AMMs, Pendle's AMM only allows swapping exact PT in/out. Therefore, functions like\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"swapExactSyForPt"),"\xa0and\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"swapPtForExactSy"),"\xa0should generally be avoided. If necessary, use PendleRouter's\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"swapExactSyForPt"),"\xa0with\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"approx"),"\xa0parameters. Refer to the PendleRouter documentation for details."),(0,a.kt)("h3",{id:"how-can-i-deploy-a-new-sy-token-on-pendle"},"How can I deploy a new SY Token on Pendle?"),(0,a.kt)("p",null,"Pendle's smart contracts are permissionless, meaning anyone can deploy a new Standardized Yield (SY) Token without requiring approval from the Pendle team. To implement an SY Token, you must follow the Pendle SY Token standard, ensuring compatibility with the ecosystem. Detailed guidance, including contract structure and best practices, can be found in the ",(0,a.kt)("a",{parentName:"p",href:"https://docs.pendle.finance/Developers/Contracts/StandardizedYield"},"Pendle Developer Documentation"),"."),(0,a.kt)("h2",{id:"backend"},"Backend"),(0,a.kt)("h3",{id:"how-can-i-preview-the-received-amount-of-addremove-liquidity"},"How can I preview the received amount of add/remove liquidity?"),(0,a.kt)("p",null,"To preview the amount you'll receive before submitting transactions, you can use:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Pendle API method (recommended): ",(0,a.kt)("a",{parentName:"li",href:"https://api-v2.pendle.finance/core/docs#/SDK/SdkController_addLiquidity"},"Pendle Hosted SDK API")),(0,a.kt)("li",{parentName:"ul"},"On-chain method: ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/interfaces/IPActionAddRemoveLiqV3.sol"},"PendleRouter Contract"),". The detailed guide can be found here ",(0,a.kt)("a",{parentName:"li",href:"https://docs.pendle.finance/Developers/Contracts/PendleRouter"},"https://docs.pendle.finance/Developers/Contracts/PendleRouter"))),(0,a.kt)("h3",{id:"how-do-i-fetch-the-pt-price"},"How do I fetch the PT price?"),(0,a.kt)("p",null,"You can get the PT (Principal Token) price via:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Pendle API method (recommended): ",(0,a.kt)("a",{parentName:"li",href:"https://api-v2.pendle.finance/core/docs#/Assets/AssetsSimplifiedController_getAllAssetPricesByAddresses"},"Pendle price API")),(0,a.kt)("li",{parentName:"ul"},"On-chain method: ",(0,a.kt)("inlineCode",{parentName:"li"},"getPtToAssetRate")," of RouterStatic ",(0,a.kt)("a",{parentName:"li",href:"https://docs.pendle.finance/Developers/Backend/RouterStatic"},"https://docs.pendle.finance/Developers/Backend/RouterStatic"))),(0,a.kt)("h3",{id:"how-can-i-retrieve-historical-pt-and-yt-prices"},"How can I retrieve historical PT and YT prices?"),(0,a.kt)("p",null,"You can track historical PT/YT prices using:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Pendle API method: ",(0,a.kt)("a",{parentName:"li",href:"https://api-v2.pendle.finance/core/docs#/Prices/PricesController_ohlcv_v4"},"Pendle ohlcv API"),". Note that shorter timeframes (e.g., minute-by-minute updates) are not yet available.")),(0,a.kt)("h2",{id:"others"},"Others"),(0,a.kt)("h3",{id:"getting-up-to-dateaccruedrewardson-chain-applicable-to-sy-yt--lp"},"Getting Up-to-Date\xa0",(0,a.kt)("inlineCode",{parentName:"h3"},"accruedRewards"),"\xa0On-Chain (Applicable to SY, YT, & LP)"),(0,a.kt)("p",null,"There are two methods:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("strong",{parentName:"li"},"Call\xa0",(0,a.kt)("inlineCode",{parentName:"strong"},"redeemRewards(user)"),"\xa0and retrieve the output."),"\xa0This method has the side effect of redeeming the user's rewards, so it might not be ideal."),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("strong",{parentName:"li"},"Call\xa0",(0,a.kt)("inlineCode",{parentName:"strong"},"IERC20(market).transfer(user,0)"),"\xa0followed by\xa0",(0,a.kt)("inlineCode",{parentName:"strong"},"accruedRewards"),"."),"\xa0The transfer triggers an update of the user's rewards.")),(0,a.kt)("h3",{id:"can-the-output-ofgetrewardtokenschange"},"Can the output of\xa0",(0,a.kt)("inlineCode",{parentName:"h3"},"getRewardTokens"),"\xa0change?"),(0,a.kt)("p",null,"Yes, the output can change if the underlying protocol adds new reward tokens. However, no reward tokens will ever be removed."),(0,a.kt)("h3",{id:"how-to-read-unclaimed-rewards-and-interest-for-syytmarket"},"How to read unclaimed Rewards and Interest for SY/YT/Market"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"On-Chain Method:")),(0,a.kt)("p",null,"To read for SY, please execute an ",(0,a.kt)("inlineCode",{parentName:"p"},"eth_call")," (",(0,a.kt)("inlineCode",{parentName:"p"},"callStatic")," in ethersjs) to the following function of SY:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-solidity"},"function claimRewards(address user) external returns (uint256[] memory rewardAmounts);\n")),(0,a.kt)("p",null,"For YT, execute the following function:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-solidity"},"function redeemDueInterestAndRewards(\n    address user,\n    bool redeemInterest,\n    bool redeemRewards\n) external returns (uint256 interestOut, uint256[] memory rewardsOut);\n")),(0,a.kt)("p",null,"For Market, execute the following function:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-solidity"},"function redeemRewards(address user) external returns (uint256[] memory);\n")),(0,a.kt)("p",null,"These calls can be batched through Multicall if necessary."),(0,a.kt)("p",null,"This FAQ section is regularly updated with new questions and answers as they arise."))}u.isMDXComponent=!0}}]);