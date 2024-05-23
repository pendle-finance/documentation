"use strict";(self.webpackChunkpendle_documentation=self.webpackChunkpendle_documentation||[]).push([[4571],{3905:(a,e,t)=>{t.d(e,{Zo:()=>o,kt:()=>k});var n=t(7294);function s(a,e,t){return e in a?Object.defineProperty(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}function m(a,e){var t=Object.keys(a);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(a);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),t.push.apply(t,n)}return t}function r(a){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?m(Object(t),!0).forEach((function(e){s(a,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(t)):m(Object(t)).forEach((function(e){Object.defineProperty(a,e,Object.getOwnPropertyDescriptor(t,e))}))}return a}function p(a,e){if(null==a)return{};var t,n,s=function(a,e){if(null==a)return{};var t,n,s={},m=Object.keys(a);for(n=0;n<m.length;n++)t=m[n],e.indexOf(t)>=0||(s[t]=a[t]);return s}(a,e);if(Object.getOwnPropertySymbols){var m=Object.getOwnPropertySymbols(a);for(n=0;n<m.length;n++)t=m[n],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(a,t)&&(s[t]=a[t])}return s}var i=n.createContext({}),l=function(a){var e=n.useContext(i),t=e;return a&&(t="function"==typeof a?a(e):r(r({},e),a)),t},o=function(a){var e=l(a.components);return n.createElement(i.Provider,{value:e},a.children)},c="mdxType",h={inlineCode:"code",wrapper:function(a){var e=a.children;return n.createElement(n.Fragment,{},e)}},N=n.forwardRef((function(a,e){var t=a.components,s=a.mdxType,m=a.originalType,i=a.parentName,o=p(a,["components","mdxType","originalType","parentName"]),c=l(t),N=s,k=c["".concat(i,".").concat(N)]||c[N]||h[N]||m;return t?n.createElement(k,r(r({ref:e},o),{},{components:t})):n.createElement(k,r({ref:e},o))}));function k(a,e){var t=arguments,s=e&&e.mdxType;if("string"==typeof a||s){var m=t.length,r=new Array(m);r[0]=N;var p={};for(var i in e)hasOwnProperty.call(e,i)&&(p[i]=e[i]);p.originalType=a,p[c]="string"==typeof a?a:s,r[1]=p;for(var l=2;l<m;l++)r[l]=t[l];return n.createElement.apply(null,r)}return n.createElement.apply(null,t)}N.displayName="MDXCreateElement"},8422:(a,e,t)=>{t.r(e),t.d(e,{assets:()=>i,contentTitle:()=>r,default:()=>h,frontMatter:()=>m,metadata:()=>p,toc:()=>l});var n=t(7462),s=(t(7294),t(3905));const m={hide_table_of_contents:!0},r="How to Integrate PT and LP Oracle",p={unversionedId:"Developers/Oracles/HowToIntegratePtAndLpOracle",id:"Developers/Oracles/HowToIntegratePtAndLpOracle",title:"How to Integrate PT and LP Oracle",description:"Integrating PT and LP oracles into your system can be accomplished in six easy steps. This document provides detailed instructions along with runnable examples. If you need personalized assistance, don't hesitate to contact us via our Developers channel on Discord.",source:"@site/docs/Developers/Oracles/HowToIntegratePtAndLpOracle.md",sourceDirName:"Developers/Oracles",slug:"/Developers/Oracles/HowToIntegratePtAndLpOracle",permalink:"/Developers/Oracles/HowToIntegratePtAndLpOracle",draft:!1,tags:[],version:"current",frontMatter:{hide_table_of_contents:!0},sidebar:"myAutogeneratedSidebar",previous:{title:"vePENDLE",permalink:"/Developers/Contracts/vePENDLE"},next:{title:"Introduction of LP Oracle",permalink:"/Developers/Oracles/IntroductionOfLpOracle"}},i={},l=[{value:"First, Understand SY, PT, LP",id:"first-understand-sy-pt-lp",level:2},{value:"Second, Choose a Market &amp; Duration",id:"second-choose-a-market--duration",level:2},{value:"Third, Initialize the Oracle",id:"third-initialize-the-oracle",level:2},{value:"Fourth, Get the Price",id:"fourth-get-the-price",level:2},{value:"(Optional) Fifth, Multiply the Price with a 3rd Price",id:"optional-fifth-multiply-the-price-with-a-3rd-price",level:2},{value:"Lastly, Handle liquidation &amp; LP&#39;s rewards",id:"lastly-handle-liquidation--lps-rewards",level:2},{value:"For PT liquidation",id:"for-pt-liquidation",level:3},{value:"For LP liquidation",id:"for-lp-liquidation",level:3},{value:"Handling of Pendle LP&#39;s rewards:",id:"handling-of-pendle-lps-rewards",level:3}],o={toc:l},c="wrapper";function h(a){let{components:e,...m}=a;return(0,s.kt)(c,(0,n.Z)({},o,m,{components:e,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"how-to-integrate-pt-and-lp-oracle"},"How to Integrate PT and LP Oracle"),(0,s.kt)("p",null,"Integrating PT and LP oracles into your system can be accomplished in six easy steps. This document provides detailed instructions along with runnable examples. If you need personalized assistance, don't hesitate to contact us via our Developers channel on ",(0,s.kt)("a",{parentName:"p",href:"https://pendle.finance/discord"},"Discord"),"."),(0,s.kt)("h2",{id:"first-understand-sy-pt-lp"},"First, Understand SY, PT, LP"),(0,s.kt)("p",null,"You can read High Level Architecture & StandardizedYield to understand the Pendle system."),(0,s.kt)("p",null,"Refer to the examples ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/pendle-finance/pendle-examples/tree/main/test"},"here")," & ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/pendle-finance/pendle-core-v2-public/tree/main/contracts/oracles"},"here")," for further understanding."),(0,s.kt)("h2",{id:"second-choose-a-market--duration"},"Second, Choose a Market & Duration"),(0,s.kt)("p",null,"We recommend choosing a market with high trading activities & deep liquidity. For instance, we'll choose EtherFi's weETH market on Arbitrum, which has 70M USD liquidity at block 192_001_277."),(0,s.kt)("p",null,"The recommended duration is 15 mins (900 secs) or 30 mins (1800 secs), but it can vary depending on the market."),(0,s.kt)("p",null,"For a detailed guide on assessing the risk, depth of liquidity & twap duration, refer to the corresponding risk assessment docs."),(0,s.kt)("h2",{id:"third-initialize-the-oracle"},"Third, Initialize the Oracle"),(0,s.kt)("p",null,"By default, markets' oracles are un-initialized. You can check the oracle's status & initialize it if necessary using ",(0,s.kt)("inlineCode",{parentName:"p"},"getOracleState")," on the ",(0,s.kt)("inlineCode",{parentName:"p"},"PendlePYLpOracle")," contract."),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"/img/Developers/Pasted_image_20240319215123.png",src:t(2250).Z,width:"1087",height:"426"})),(0,s.kt)("h2",{id:"fourth-get-the-price"},"Fourth, Get the Price"),(0,s.kt)("p",null,"There are 2 units PT / LP can be denominated in, in SY or in Asset. To get the price in SY, call ",(0,s.kt)("inlineCode",{parentName:"p"},"getPtToSyRate()"),", else call ",(0,s.kt)("inlineCode",{parentName:"p"},"getPtToAssetRate()"),". Ensure to use the appropriate function as SY price is well defined for some markets, but Asset price is not & vice-versa."),(0,s.kt)("p",null,"Refer to ",(0,s.kt)("a",{parentName:"p",href:"/Developers/Contracts/StandardizedYield"},"StandardizedYield docs")," to call the correct function."),(0,s.kt)("p",null,"Below is an example of how to call the functions."),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"/img/Developers/Pasted_image_20240319221744.png",src:t(7075).Z,width:"704",height:"301"})),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"/img/Developers/Pasted_image_20240319221801.png",src:t(3742).Z,width:"363",height:"125"})),(0,s.kt)("p",null,"If you don't want to use the library, you can call the ",(0,s.kt)("inlineCode",{parentName:"p"},"PendlePtLpOracle")," directly though it will take around ~4k additional gas."),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"/img/Developers/Pasted_image_20240319230732.png",src:t(8123).Z,width:"773",height:"297"})),(0,s.kt)("h2",{id:"optional-fifth-multiply-the-price-with-a-3rd-price"},"(Optional) Fifth, Multiply the Price with a 3rd Price"),(0,s.kt)("p",null,"You can multiply the ",(0,s.kt)("inlineCode",{parentName:"p"},"PT-weETH")," to ",(0,s.kt)("inlineCode",{parentName:"p"},"weETH")," price by ",(0,s.kt)("inlineCode",{parentName:"p"},"weETH/ETH")," price to get the ",(0,s.kt)("inlineCode",{parentName:"p"},"PT-weETH/ETH")," price, which is more applicable for money markets."),(0,s.kt)("p",null,"For example:"),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"/img/Developers/Pasted_image_20240319230333.png",src:t(6520).Z,width:"922",height:"119"})),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"/img/Developers/Pasted_image_20240319230350.png",src:t(9100).Z,width:"481",height:"65"})),(0,s.kt)("h2",{id:"lastly-handle-liquidation--lps-rewards"},"Lastly, Handle liquidation & LP's rewards"),(0,s.kt)("h3",{id:"for-pt-liquidation"},"For PT liquidation"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"When a liquidation with ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"P"),(0,s.kt)("mi",{parentName:"mrow"},"T")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"PT")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"P"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"T")))))," as collateral occurs, commonly, the liquidator will have to sell ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"P"),(0,s.kt)("mi",{parentName:"mrow"},"T")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"PT")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"P"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"T")))))," into common asset to pay their debt."),(0,s.kt)("li",{parentName:"ul"},"In Pendle's system, we support converting ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"P"),(0,s.kt)("mi",{parentName:"mrow"},"T")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"PT")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"P"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"T")))))," back to ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"S"),(0,s.kt)("mi",{parentName:"mrow"},"Y")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"SY")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.05764em"}},"S"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.22222em"}},"Y")))))," by selling ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"P"),(0,s.kt)("mi",{parentName:"mrow"},"T")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"PT")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"P"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"T")))))," on our AMM (before maturity) or redeeming directly from ",(0,s.kt)("inlineCode",{parentName:"li"},"PendleYieldToken")," contract (post maturity). This will then allow the liquidator to redeem their ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"S"),(0,s.kt)("mi",{parentName:"mrow"},"Y")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"SY")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.05764em"}},"S"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.22222em"}},"Y")))))," into one of the output token of ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"S"),(0,s.kt)("mi",{parentName:"mrow"},"Y")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"SY")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.05764em"}},"S"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.22222em"}},"Y")))))," (see ",(0,s.kt)("a",{parentName:"li",href:"https://eips.ethereum.org/EIPS/eip-5115"},"EIP-5115"),")."),(0,s.kt)("li",{parentName:"ul"},"For reference, we have written the ",(0,s.kt)("a",{parentName:"li",href:"https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/offchain-helpers/BoringPtSeller.sol"},(0,s.kt)("inlineCode",{parentName:"a"},"BoringPtSeller"))," contract to sell ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"P"),(0,s.kt)("mi",{parentName:"mrow"},"T")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"PT")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"P"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"T")))))," into one of the output token."),(0,s.kt)("li",{parentName:"ul"},"You can extend this abstract contract to use in a liquidation system.")),(0,s.kt)("h3",{id:"for-lp-liquidation"},"For LP liquidation"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"When a liquidation with ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"L"),(0,s.kt)("mi",{parentName:"mrow"},"P")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"LP")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"L"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"P")))))," as collateral occurs, commonly, the liquidator will have to sell ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"L"),(0,s.kt)("mi",{parentName:"mrow"},"P")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"LP")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"L"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"P")))))," into common asset to pay their debt."),(0,s.kt)("li",{parentName:"ul"},"In Pendle's system, we support converting ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"L"),(0,s.kt)("mi",{parentName:"mrow"},"P")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"LP")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"L"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"P")))))," back to ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"S"),(0,s.kt)("mi",{parentName:"mrow"},"Y")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"SY")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.05764em"}},"S"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.22222em"}},"Y")))))," by removing liquidity single-sided into ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"S"),(0,s.kt)("mi",{parentName:"mrow"},"Y")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"SY")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.05764em"}},"S"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.22222em"}},"Y")))))," on our AMM (before maturity) or redeeming ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"P"),(0,s.kt)("mi",{parentName:"mrow"},"T")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"PT")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"P"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"T")))))," + ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"S"),(0,s.kt)("mi",{parentName:"mrow"},"Y")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"SY")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.05764em"}},"S"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.22222em"}},"Y")))))," and redeeming ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"P"),(0,s.kt)("mi",{parentName:"mrow"},"T")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"PT")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"P"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"T")))))," to ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"S"),(0,s.kt)("mi",{parentName:"mrow"},"Y")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"SY")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.05764em"}},"S"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.22222em"}},"Y")))))," directly from ",(0,s.kt)("inlineCode",{parentName:"li"},"PendleYieldToken")," contract (post maturity). This will then allow the liquidator to redeem their ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"S"),(0,s.kt)("mi",{parentName:"mrow"},"Y")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"SY")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.05764em"}},"S"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.22222em"}},"Y")))))," into one of the output token of ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"S"),(0,s.kt)("mi",{parentName:"mrow"},"Y")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"SY")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.05764em"}},"S"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.22222em"}},"Y")))))," (see ",(0,s.kt)("a",{parentName:"li",href:"https://eips.ethereum.org/EIPS/eip-5115"},"EIP-5115"),")."),(0,s.kt)("li",{parentName:"ul"},"For reference, we have written the ",(0,s.kt)("a",{parentName:"li",href:"https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/offchain-helpers/BoringLpSeller.sol"},(0,s.kt)("inlineCode",{parentName:"a"},"BoringLpSeller"))," contract to sell ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"L"),(0,s.kt)("mi",{parentName:"mrow"},"P")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"LP")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"L"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"P")))))," into one of SY's output tokens."),(0,s.kt)("li",{parentName:"ul"},"You can extend this abstract contract to use in a liquidation system.")),(0,s.kt)("h3",{id:"handling-of-pendle-lps-rewards"},"Handling of Pendle LP's rewards:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"Holding Pendle LP tokens will generate PENDLE incentives and potential reward tokens (like WETH for LP for GLP pool)"),(0,s.kt)("li",{parentName:"ul"},"The money market contracts will need to redeem these rewards by calling the ",(0,s.kt)("inlineCode",{parentName:"li"},"redeemRewards")," function and implement logic to distribute these rewards to their users")))}h.isMDXComponent=!0},2250:(a,e,t)=>{t.d(e,{Z:()=>n});const n=t.p+"assets/images/Pasted_image_20240319215123-04825f37fe5f11918c28b0691185bb34.png"},7075:(a,e,t)=>{t.d(e,{Z:()=>n});const n=t.p+"assets/images/Pasted_image_20240319221744-5dead83e685b13a95294ac98dff64107.png"},3742:(a,e,t)=>{t.d(e,{Z:()=>n});const n=t.p+"assets/images/Pasted_image_20240319221801-33fe2c7f3adb99e72c2ab6532efe0984.png"},6520:(a,e,t)=>{t.d(e,{Z:()=>n});const n=t.p+"assets/images/Pasted_image_20240319230333-4d44fd9978ea0d68bc618def4fe12c25.png"},9100:(a,e,t)=>{t.d(e,{Z:()=>n});const n=t.p+"assets/images/Pasted_image_20240319230350-e320e3c7b1efdf08fffc12127fc7bed2.png"},8123:(a,e,t)=>{t.d(e,{Z:()=>n});const n=t.p+"assets/images/Pasted_image_20240319230732-f917151387622501fc1ff3d36390f129.png"}}]);