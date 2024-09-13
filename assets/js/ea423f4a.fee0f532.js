"use strict";(self.webpackChunkpendle_documentation=self.webpackChunkpendle_documentation||[]).push([[8542],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>k});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=p(n),c=r,k=u["".concat(s,".").concat(c)]||u[c]||m[c]||i;return n?a.createElement(k,o(o({ref:t},d),{},{components:n})):a.createElement(k,o({ref:t},d))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},9785:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const i={hide_table_of_contents:!0},o="PendleRouter",l={unversionedId:"Developers/Contracts/PendleRouter",id:"Developers/Contracts/PendleRouter",title:"PendleRouter",description:"Quick Start",source:"@site/docs/Developers/Contracts/PendleRouter.md",sourceDirName:"Developers/Contracts",slug:"/Developers/Contracts/PendleRouter",permalink:"/Developers/Contracts/PendleRouter",draft:!1,tags:[],version:"current",frontMatter:{hide_table_of_contents:!0},sidebar:"myAutogeneratedSidebar",previous:{title:"StandardizedYield (SY)",permalink:"/Developers/Contracts/StandardizedYield"},next:{title:"vePENDLE",permalink:"/Developers/Contracts/vePENDLE"}},s={},p=[{value:"Quick Start",id:"quick-start",level:2},{value:"Overview",id:"overview",level:2},{value:"Common Functions",id:"common-functions",level:2},{value:"Add/Remove Liquidity",id:"addremove-liquidity",level:3},{value:"Buy/Sell PT, YT",id:"buysell-pt-yt",level:3},{value:"Redeeming PT post-expiry for the underlying",id:"redeeming-pt-post-expiry-for-the-underlying",level:3},{value:"Redeeming LP, YT yield",id:"redeeming-lp-yt-yield",level:3},{value:"Importance of Using Pendle&#39;s SDK",id:"importance-of-using-pendles-sdk",level:2},{value:"Off-chain Helpers",id:"off-chain-helpers",level:2},{value:"Important Structs in PendleRouter",id:"important-structs-in-pendlerouter",level:2},{value:"ApproxParams",id:"approxparams",level:3},{value:"TokenInput &amp; TokenOutput",id:"tokeninput--tokenoutput",level:3},{value:"Overview",id:"overview-1",level:4},{value:"TokenInput",id:"tokeninput",level:4},{value:"TokenOutput",id:"tokenoutput",level:4},{value:"LimitOrderData",id:"limitorderdata",level:3}],d={toc:p},u="wrapper";function m(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"pendlerouter"},"PendleRouter"),(0,r.kt)("h2",{id:"quick-start"},"Quick Start"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"To see examples of how to call various functions, check our ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/pendle-finance/pendle-examples"},"Example repository"),"."),(0,r.kt)("li",{parentName:"ul"},"To generate calldata for any functions, it's highly recommended to use ",(0,r.kt)("a",{parentName:"li",href:"https://api-v2.pendle.finance/core/docs#/SDK"},"Pendle's Hosted SDK"),". Using the SDK provides significant advantages in terms of gas efficiency, accurate price impacts, and ease of integration.")),(0,r.kt)("h2",{id:"overview"},"Overview"),(0,r.kt)("p",null,"PendleRouter is a contract that aggregates callers' actions with various different SYs, PTs, YTs, and Markets. It does not have any special permissions or whitelists on any contracts it interacts with. Therefore, any third-party protocols can freely embed the router's logic into their code for better gas efficiency."),(0,r.kt)("p",null,"Please note that new versions of PendleRouter are released a couple of times per year. While older versions will continue to operate correctly, they will not receive new features. Up until now, the Router has had four versions:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"RouterV1"),", deployed on 23/11/2022 at ",(0,r.kt)("inlineCode",{parentName:"li"},"0x41FAD93F225b5C1C95f2445A5d7fcB85bA46713f")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"RouterV2"),", deployed on 21/02/2023 at ",(0,r.kt)("inlineCode",{parentName:"li"},"0x0000000001e4ef00d069e71d6ba041b0a16f7ea0"),", 15% to 20% more gas-optimized"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"RouterV3"),", deployed on 18/12/2023 at ",(0,r.kt)("inlineCode",{parentName:"li"},"0x00000000005BBB0EF59571E58418F9a4357b68A0"),", supporting limit orders"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"RouterV4"),", deployed on 29/04/2024 at ",(0,r.kt)("inlineCode",{parentName:"li"},"0x888888888889758F76e7103c6CbF23ABbF58F946"),", upgradable router to support new features and optimize the algorithm more easily without requiring partners to migrate. This is likely the last version of the Router with features being added gradually.")),(0,r.kt)("p",null,"Since PendleRouter is a proxy to multiple implementations, the caller can call the desired functions, and the Router will resolve to the correct implementation. Please refer to the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/interfaces/IPAllActionV3.sol"},"list of callable functions"),"."),(0,r.kt)("p",null,"For a comprehensive understanding of the Pendle ecosystem, including key concepts and terminology, please refer to the ",(0,r.kt)("a",{parentName:"p",href:"/Developers/Overview"},"Overview document"),"."),(0,r.kt)("h2",{id:"common-functions"},"Common Functions"),(0,r.kt)("h3",{id:"addremove-liquidity"},"Add/Remove Liquidity"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"addLiquiditySingleToken")),": Add liquidity to a market with any ERC20 tokens."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"removeLiquiditySingleToken")),": Remove liquidity from a market with ERC20 tokens.")),(0,r.kt)("h3",{id:"buysell-pt-yt"},"Buy/Sell PT, YT"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"swapExactTokenForPt")),": Swap an exact amount of a supported ERC20 token for PT."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"swapExactPtForToken")),": Swap an exact amount of PT for a supported ERC20 token."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"swapExactTokenForYt")),": Swap an exact amount of a supported ERC20 token for YT."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"swapExactYtForToken")),": Swap an exact amount of YT for a supported ERC20 token.")),(0,r.kt)("h3",{id:"redeeming-pt-post-expiry-for-the-underlying"},"Redeeming PT post-expiry for the underlying"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"RedeemPyToToken")),": PY stands for PT and YT. Post-expiry, you no longer need YT to redeem.")),(0,r.kt)("h3",{id:"redeeming-lp-yt-yield"},"Redeeming LP, YT yield"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"redeemDueInterestAndRewards")),": Redeem the accrued interest and rewards from both the LP position and YT.")),(0,r.kt)("h2",{id:"importance-of-using-pendles-sdk"},"Importance of Using Pendle's SDK"),(0,r.kt)("p",null,"We highly recommend using Pendle's SDK to generate calldata for several reasons:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Gas Efficiency"),": The SDK leverages off-chain data to optimize gas usage, potentially reducing gas costs significantly."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Accurate Price Impacts"),": The SDK provides precise calculations for swaps, ensuring better price impacts for users."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Ease of Integration"),": By using the SDK, developers can seamlessly integrate Pendle's functionality into their applications, leveraging the full power of the swap aggregator, limit order system, and off-chain data preparation.")),(0,r.kt)("p",null,"For on-chain operations, our ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/pendle-finance/pendle-examples"},"Example repository")," contains useful helper functions and examples to assist you."),(0,r.kt)("h2",{id:"off-chain-helpers"},"Off-chain Helpers"),(0,r.kt)("p",null,"PendleRouter heavily relies on off-chain data to address three main issues:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Swap Execution"),": Currently, Pendle's AMM only supports the built-in ",(0,r.kt)("inlineCode",{parentName:"li"},"swapExactPtForSy")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"swapSyForExactPt"),". To execute a ",(0,r.kt)("inlineCode",{parentName:"li"},"swapExactTokenForPt")," (which is essentially the same as ",(0,r.kt)("inlineCode",{parentName:"li"},"swapExactSyForPt"),"), the router will conduct a binary search to determine the amount of PT to swap. While the binary search can be done entirely on-chain, limiting the search range off-chain will result in significantly less gas consumption for this function."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Liquidity Fragmentation"),": Liquidity is currently fragmented across a large number of pools across various DEXes. Integrating only Uniswap or Balancer has proven to be insufficient. As a result, PendleRouter has natively integrated ",(0,r.kt)("a",{parentName:"li",href:"https://kyberswap.com/"},"KyberSwap")," to swap from any ERC20 token to another. For KyberSwap to work, the routing algorithm must be called off-chain and then pass the routing results to the Router to execute."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Limit Order System"),": The limit order system of Pendle exists solely off-chain. Including these limit orders in on-chain swaps can significantly improve the price impact for users, particularly during large-size swaps.")),(0,r.kt)("h2",{id:"important-structs-in-pendlerouter"},"Important Structs in PendleRouter"),(0,r.kt)("p",null,"While most function arguments should be straightforward, using structs can be less intuitive. PendleRouter is a sophisticated contract that supports various powerful features and relies on off-chain pre-computed data to help save gas. Below are the important structs and instructions on how to fill them:"),(0,r.kt)("h3",{id:"approxparams"},"ApproxParams"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"struct ApproxParams {\n    uint256 guessMin;\n    uint256 guessMax;\n    uint256 guessOffchain;\n    uint256 maxIteration;\n    uint256 eps;\n}\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"guessMin")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"guessMax"),": The minimum and maximum values for binary search."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"maxIteration"),": The maximum number of times binary search will be performed."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"eps"),": The precision of binary search - the maximum proportion of the input that can be unused. ",(0,r.kt)("inlineCode",{parentName:"li"},"eps")," is 1e18-based, so an ",(0,r.kt)("inlineCode",{parentName:"li"},"eps")," of 1e14 implies that no more than 0.01% of the input might be unused."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"guessOffchain"),": This is the first answer to be checked before performing any binary search. If the answer already satisfies the conditions, we skip the search and save significant gas.")),(0,r.kt)("p",null,"In case off-chain data cannot be provided, the parameters can be passed as:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"guessMin: 0, // adjust as desired\nguessMax: type(uint256).max, // adjust as desired\nguessOffchain: 0, // strictly 0\nmaxIteration: 256, // adjust as desired\neps: 1e14 // max 0.01% unused, adjust as desired\n")),(0,r.kt)("p",null,"Please note that in this situation, the parameters can be fine-tuned to narrow the search range for optimal gas usage or to reduce the number of unused inputs."),(0,r.kt)("h3",{id:"tokeninput--tokenoutput"},"TokenInput & TokenOutput"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"struct TokenInput {\n    // TOKEN DATA\n    address tokenIn;\n    uint256 netTokenIn;\n    address tokenMintSy;\n    // AGGREGATOR DATA\n    address pendleSwap;\n    SwapData swapData;\n}\n\nstruct TokenOutput {\n    // TOKEN DATA\n    address tokenOut;\n    uint256 minTokenOut;\n    address tokenRedeemSy;\n    // AGGREGATOR DATA\n    address pendleSwap;\n    SwapData swapData;\n}\n")),(0,r.kt)("h4",{id:"overview-1"},"Overview"),(0,r.kt)("p",null,"Pendle system doesn't interact with the underlying token. Swaps happen between SY <-> PT, SY <-> YT, etc. Hence, ",(0,r.kt)("inlineCode",{parentName:"p"},"TokenInput")," & ",(0,r.kt)("inlineCode",{parentName:"p"},"TokenOutput")," are data about the conversion between the underlying token and the corresponding SY."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"TokenInput"),": Users start with ",(0,r.kt)("inlineCode",{parentName:"li"},"netTokenIn")," of ",(0,r.kt)("inlineCode",{parentName:"li"},"tokenIn"),", using a swap aggregator to convert those tokens to ",(0,r.kt)("inlineCode",{parentName:"li"},"tokenMintSy"),", and those ",(0,r.kt)("inlineCode",{parentName:"li"},"tokenMintSy")," is used to mint SY."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"TokenOutput"),": Users receive SY & redeem the SY to ",(0,r.kt)("inlineCode",{parentName:"li"},"tokenRedeemSy"),". These tokens are swapped through an aggregator to ",(0,r.kt)("inlineCode",{parentName:"li"},"tokenOut"),".")),(0,r.kt)("h4",{id:"tokeninput"},"TokenInput"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"tokenIn")," & ",(0,r.kt)("inlineCode",{parentName:"li"},"netTokenIn"),": Token & amount that the user starts with."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"tokenMintSy"),": The token used to mint SY. Must be in ",(0,r.kt)("inlineCode",{parentName:"li"},"SY.getTokensIn()"),". If ",(0,r.kt)("inlineCode",{parentName:"li"},"tokenMintSy != tokenIn"),", aggregator data must be populated."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"pendleSwap"),": Address of swap helper, do not hardcode."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"swapData"),": Data for swap, generated by Pendle's SDK.")),(0,r.kt)("p",null,"Aggregator data can be generated by Pendle's SDK. If no aggregator is used, ",(0,r.kt)("inlineCode",{parentName:"p"},"tokenIn = tokenMintSy"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"pendleSwap = address(0)"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"swapData")," is empty."),(0,r.kt)("h4",{id:"tokenoutput"},"TokenOutput"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"tokenOut")," & ",(0,r.kt)("inlineCode",{parentName:"li"},"minTokenOut"),": Token & minimal amount that the user finally receives."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"tokenRedeemSy"),": The token used to redeem SY. Must be in ",(0,r.kt)("inlineCode",{parentName:"li"},"SY.getTokensOut()"),". If ",(0,r.kt)("inlineCode",{parentName:"li"},"tokenRedeemSy != tokenOut"),", aggregator data must be populated."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"pendleSwap"),": Address of swap helper, do not hardcode."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"swapData"),": Data for swap, generated by Pendle's SDK.")),(0,r.kt)("p",null,"If no aggregator is used, ",(0,r.kt)("inlineCode",{parentName:"p"},"tokenOut = tokenRedeemSy"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"pendleSwap = address(0)"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"swapData")," is empty."),(0,r.kt)("h3",{id:"limitorderdata"},"LimitOrderData"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"\n\nstruct LimitOrderData {\n    address limitRouter;\n    uint256 epsSkipMarket;\n    FillOrderParams[] normalFills;\n    FillOrderParams[] flashFills;\n    bytes optData;\n}\n")),(0,r.kt)("p",null,"LimitOrderData is generated using Pendle's SDK. If not using a limit order, all fields can be set to ",(0,r.kt)("inlineCode",{parentName:"p"},"address(0)")," or empty."))}m.isMDXComponent=!0}}]);