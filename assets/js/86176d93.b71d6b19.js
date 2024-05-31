"use strict";(self.webpackChunkpendle_documentation=self.webpackChunkpendle_documentation||[]).push([[1475],{3905:(e,a,t)=>{t.d(a,{Zo:()=>o,kt:()=>d});var s=t(7294);function n(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function p(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,s)}return t}function r(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?p(Object(t),!0).forEach((function(a){n(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function m(e,a){if(null==e)return{};var t,s,n=function(e,a){if(null==e)return{};var t,s,n={},p=Object.keys(e);for(s=0;s<p.length;s++)t=p[s],a.indexOf(t)>=0||(n[t]=e[t]);return n}(e,a);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(s=0;s<p.length;s++)t=p[s],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var l=s.createContext({}),i=function(e){var a=s.useContext(l),t=a;return e&&(t="function"==typeof e?e(a):r(r({},a),e)),t},o=function(e){var a=i(e.components);return s.createElement(l.Provider,{value:a},e.children)},c="mdxType",N={inlineCode:"code",wrapper:function(e){var a=e.children;return s.createElement(s.Fragment,{},a)}},k=s.forwardRef((function(e,a){var t=e.components,n=e.mdxType,p=e.originalType,l=e.parentName,o=m(e,["components","mdxType","originalType","parentName"]),c=i(t),k=n,d=c["".concat(l,".").concat(k)]||c[k]||N[k]||p;return t?s.createElement(d,r(r({ref:a},o),{},{components:t})):s.createElement(d,r({ref:a},o))}));function d(e,a){var t=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var p=t.length,r=new Array(p);r[0]=k;var m={};for(var l in a)hasOwnProperty.call(a,l)&&(m[l]=a[l]);m.originalType=e,m[c]="string"==typeof e?e:n,r[1]=m;for(var i=2;i<p;i++)r[i]=t[i];return s.createElement.apply(null,r)}return s.createElement.apply(null,t)}k.displayName="MDXCreateElement"},9083:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>l,contentTitle:()=>r,default:()=>N,frontMatter:()=>p,metadata:()=>m,toc:()=>i});var s=t(7462),n=(t(7294),t(3905));const p={hide_table_of_contents:!0},r="Glossary",m={unversionedId:"ProtocolMechanics/Glossary",id:"ProtocolMechanics/Glossary",title:"Glossary",description:"Yield-Bearing Token",source:"@site/docs/ProtocolMechanics/Glossary.md",sourceDirName:"ProtocolMechanics",slug:"/ProtocolMechanics/Glossary",permalink:"/ProtocolMechanics/Glossary",draft:!1,tags:[],version:"current",frontMatter:{hide_table_of_contents:!0},sidebar:"myAutogeneratedSidebar",previous:{title:"FAQ",permalink:"/FAQ"},next:{title:"SY",permalink:"/ProtocolMechanics/YieldTokenization/SY"}},l={},i=[],o={toc:i},c="wrapper";function N(e){let{components:a,...t}=e;return(0,n.kt)(c,(0,s.Z)({},o,t,{components:a,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"glossary"},"Glossary"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Yield-Bearing Token")),(0,n.kt)("p",null,"Yield-bearing Token is an umbrella term that refers to any token that generates yield. Examples include stETH, GLP, gDAI or even liquidity tokens such as Aura rETH-WETH."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Accounting Asset")),(0,n.kt)("p",null,"The asset yield bearing token appreciates in value against. While some tokens have a clear accounting asset, others do not. Here are some examples:"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"For tokens like stETH and GLP, stETH and GLP themselves serve as the accounting asset. In the case of stETH, its value remains fixed, but holders receive more stETH over time due to rebasing. Similarly, GLP distributes ETH rewards, but its own value does not increase."),(0,n.kt)("li",{parentName:"ol"},"Tokens like cDAI and ezETH have DAI deposits in Compound Finance and ETH deposits in Renzo Protocol as their accounting assets, respectively. These tokens accrue yield by increasing in value relative to the DAI and ETH in their respective pools. Therefore, the accounting asset for these tokens is the base asset (e.g. DAI for cDAI, ETH for ezETH) deposited in the protocol.")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"SY = Standardized Yield")),(0,n.kt)("p",null,"SY is a token standard (",(0,n.kt)("a",{parentName:"p",href:"https://eips.ethereum.org/EIPS/eip-5115"},"EIP-5115"),") written by the Pendle team that wraps any yield-bearing token and provides a standardized interface for interacting with any yield-bearing token\u2019s yield generating mechanism. SY is a purely technical component, the user does not interact directly with SY."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"PT = Principal Token")),(0,n.kt)("p",null,"PT entitles you to the principal of the underlying yield-bearing token, redeemable after maturity. If you own 1 PT-stETH with 1 year maturity, you will be able to redeem 1 ETH worth of stETH after 1 year."),(0,n.kt)("p",null,"PT is tradeable anytime, even before maturity."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"YT = Yield Token")),(0,n.kt)("p",null,"YT entitles you to all the yield generated by the underlying yield-bearing token in real-time, and the yield accrued can be manually claimed\xa0",(0,n.kt)("em",{parentName:"p"},"at any time")," from the Pendle Dashboard. "),(0,n.kt)("p",null,"If you own 1 YT-stETH and stETH has an average yield of 5% through the year, you will have accrued 0.05 stETH by the end of the year."),(0,n.kt)("p",null,"YT is tradeable anytime, even before maturity."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Maturity")),(0,n.kt)("p",null,"Maturity is the date at which PT becomes fully redeemable for the underlying asset and YT stops accruing yield. One asset can have multiple maturity dates, with an independent market for each maturity date. As such, the implied yield of an asset can also differ across different maturities."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Underlying APY")),(0,n.kt)("p",null,"Underlying APY represents the 7-day moving average yield rate of the underlying asset. This approach allows a more accurate indication of the underlying yield over a period of time, which can help traders to better estimate the Future Average Underlying APY."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Implied APY")),(0,n.kt)("p",null,"Implied APY is the market consensus of the future APY of an asset. This value is calculated based on the ratio of the price of YT to PT and the formula is shown below. "),(0,n.kt)("p",null,"When used in conjunction with the Underlying APY, Implied APY can be used to establish the relative valuation of an asset such as YT and PT at their current price, and help traders determine their trading strategies."),(0,n.kt)("p",null,"The value of Implied Yield is numerically equivalent to the to Fixed Yield APY."),(0,n.kt)("div",{className:"math math-display"},(0,n.kt)("span",{parentName:"div",className:"katex-display"},(0,n.kt)("span",{parentName:"span",className:"katex"},(0,n.kt)("span",{parentName:"span",className:"katex-mathml"},(0,n.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},(0,n.kt)("semantics",{parentName:"math"},(0,n.kt)("mrow",{parentName:"semantics"},(0,n.kt)("mtext",{parentName:"mrow"},"Implied\xa0APY"),(0,n.kt)("mo",{parentName:"mrow"},"="),(0,n.kt)("mrow",{parentName:"mrow"},(0,n.kt)("mo",{parentName:"mrow",fence:"true"},"["),(0,n.kt)("msup",{parentName:"mrow"},(0,n.kt)("mrow",{parentName:"msup"},(0,n.kt)("mo",{parentName:"mrow",fence:"true"},"("),(0,n.kt)("mn",{parentName:"mrow"},"1"),(0,n.kt)("mo",{parentName:"mrow"},"+"),(0,n.kt)("mfrac",{parentName:"mrow"},(0,n.kt)("mtext",{parentName:"mfrac"},"YT\xa0Price"),(0,n.kt)("mtext",{parentName:"mfrac"},"PT\xa0Price")),(0,n.kt)("mo",{parentName:"mrow",fence:"true"},")")),(0,n.kt)("mfrac",{parentName:"msup"},(0,n.kt)("mn",{parentName:"mfrac"},"365"),(0,n.kt)("mtext",{parentName:"mfrac"},"Days\xa0to\xa0expiry"))),(0,n.kt)("mo",{parentName:"mrow",fence:"true"},"]")),(0,n.kt)("mo",{parentName:"mrow"},"\u2212"),(0,n.kt)("mn",{parentName:"mrow"},"1")),(0,n.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\text{Implied APY} = \\left[\\left(1 + \\cfrac{\\text{YT Price}}{\\text{PT Price}}\\right)^\\cfrac{365}{\\text{Days to expiry}}\\right] - 1")))),(0,n.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,n.kt)("span",{parentName:"span",className:"base"},(0,n.kt)("span",{parentName:"span",className:"strut",style:{height:"0.8888799999999999em",verticalAlign:"-0.19444em"}}),(0,n.kt)("span",{parentName:"span",className:"mord text"},(0,n.kt)("span",{parentName:"span",className:"mord"},"Implied\xa0APY")),(0,n.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2777777777777778em"}}),(0,n.kt)("span",{parentName:"span",className:"mrel"},"="),(0,n.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2777777777777778em"}})),(0,n.kt)("span",{parentName:"span",className:"base"},(0,n.kt)("span",{parentName:"span",className:"strut",style:{height:"5.574435em",verticalAlign:"-2.4500349999999997em"}}),(0,n.kt)("span",{parentName:"span",className:"minner"},(0,n.kt)("span",{parentName:"span",className:"mopen"},(0,n.kt)("span",{parentName:"span",className:"delimsizing mult"},(0,n.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,n.kt)("span",{parentName:"span",className:"vlist-r"},(0,n.kt)("span",{parentName:"span",className:"vlist",style:{height:"2.953995em"}},(0,n.kt)("span",{parentName:"span",style:{top:"-1.3499850000000007em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.1550000000000002em"}}),(0,n.kt)("span",{parentName:"span",className:"delimsizinginner delim-size4"},(0,n.kt)("span",{parentName:"span"},"\u23a3"))),(0,n.kt)("span",{parentName:"span",style:{top:"-2.4999850000000006em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.1550000000000002em"}}),(0,n.kt)("span",{parentName:"span",className:"delimsizinginner delim-size4"},(0,n.kt)("span",{parentName:"span"},"\u23a2"))),(0,n.kt)("span",{parentName:"span",style:{top:"-3.0959850000000007em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.1550000000000002em"}}),(0,n.kt)("span",{parentName:"span",className:"delimsizinginner delim-size4"},(0,n.kt)("span",{parentName:"span"},"\u23a2"))),(0,n.kt)("span",{parentName:"span",style:{top:"-3.6919850000000003em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.1550000000000002em"}}),(0,n.kt)("span",{parentName:"span",className:"delimsizinginner delim-size4"},(0,n.kt)("span",{parentName:"span"},"\u23a2"))),(0,n.kt)("span",{parentName:"span",style:{top:"-3.712975em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.1550000000000002em"}}),(0,n.kt)("span",{parentName:"span",className:"delimsizinginner delim-size4"},(0,n.kt)("span",{parentName:"span"},"\u23a2"))),(0,n.kt)("span",{parentName:"span",style:{top:"-4.953995em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.1550000000000002em"}}),(0,n.kt)("span",{parentName:"span",className:"delimsizinginner delim-size4"},(0,n.kt)("span",{parentName:"span"},"\u23a1")))),(0,n.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,n.kt)("span",{parentName:"span",className:"vlist-r"},(0,n.kt)("span",{parentName:"span",className:"vlist",style:{height:"2.4500349999999997em"}},(0,n.kt)("span",{parentName:"span"})))))),(0,n.kt)("span",{parentName:"span",className:"minner"},(0,n.kt)("span",{parentName:"span",className:"minner"},(0,n.kt)("span",{parentName:"span",className:"mopen delimcenter",style:{top:"0em"}},(0,n.kt)("span",{parentName:"span",className:"delimsizing size4"},"(")),(0,n.kt)("span",{parentName:"span",className:"mord"},"1"),(0,n.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222222222222222em"}}),(0,n.kt)("span",{parentName:"span",className:"mbin"},"+"),(0,n.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222222222222222em"}}),(0,n.kt)("span",{parentName:"span",className:"mord"},(0,n.kt)("span",{parentName:"span",className:"mopen nulldelimiter"}),(0,n.kt)("span",{parentName:"span",className:"mfrac"},(0,n.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,n.kt)("span",{parentName:"span",className:"vlist-r"},(0,n.kt)("span",{parentName:"span",className:"vlist",style:{height:"1.5899999999999999em"}},(0,n.kt)("span",{parentName:"span",style:{top:"-2.314em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,n.kt)("span",{parentName:"span",className:"mord"},(0,n.kt)("span",{parentName:"span",className:"mord text"},(0,n.kt)("span",{parentName:"span",className:"mord"},"PT\xa0Price")))),(0,n.kt)("span",{parentName:"span",style:{top:"-3.23em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,n.kt)("span",{parentName:"span",className:"frac-line",style:{borderBottomWidth:"0.04em"}})),(0,n.kt)("span",{parentName:"span",style:{top:"-3.74em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,n.kt)("span",{parentName:"span",className:"mord"},(0,n.kt)("span",{parentName:"span",className:"mord text"},(0,n.kt)("span",{parentName:"span",className:"mord"},"YT\xa0Price"))))),(0,n.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,n.kt)("span",{parentName:"span",className:"vlist-r"},(0,n.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.686em"}},(0,n.kt)("span",{parentName:"span"}))))),(0,n.kt)("span",{parentName:"span"})),(0,n.kt)("span",{parentName:"span",className:"mclose delimcenter",style:{top:"0em"}},(0,n.kt)("span",{parentName:"span",className:"delimsizing size4"},")"))),(0,n.kt)("span",{parentName:"span",className:"msupsub"},(0,n.kt)("span",{parentName:"span",className:"vlist-t"},(0,n.kt)("span",{parentName:"span",className:"vlist-r"},(0,n.kt)("span",{parentName:"span",className:"vlist",style:{height:"3.1244000000000005em"}},(0,n.kt)("span",{parentName:"span",style:{top:"-5.1244000000000005em",marginRight:"0.05em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.6215em"}}),(0,n.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,n.kt)("span",{parentName:"span",className:"mord sizing reset-size3 size6 mtight"},(0,n.kt)("span",{parentName:"span",className:"mopen nulldelimiter sizing reset-size3 size6"}),(0,n.kt)("span",{parentName:"span",className:"mfrac"},(0,n.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,n.kt)("span",{parentName:"span",className:"vlist-r"},(0,n.kt)("span",{parentName:"span",className:"vlist",style:{height:"1.6215000000000002em"}},(0,n.kt)("span",{parentName:"span",style:{top:"-2.248em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,n.kt)("span",{parentName:"span",className:"mord mtight"},(0,n.kt)("span",{parentName:"span",className:"mord text mtight"},(0,n.kt)("span",{parentName:"span",className:"mord mtight"},"Days\xa0to\xa0expiry")))),(0,n.kt)("span",{parentName:"span",style:{top:"-3.2255000000000003em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,n.kt)("span",{parentName:"span",className:"frac-line mtight",style:{borderBottomWidth:"0.049em"}})),(0,n.kt)("span",{parentName:"span",style:{top:"-3.7715em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,n.kt)("span",{parentName:"span",className:"mord mtight"},(0,n.kt)("span",{parentName:"span",className:"mord mtight"},"3"),(0,n.kt)("span",{parentName:"span",className:"mord mtight"},"6"),(0,n.kt)("span",{parentName:"span",className:"mord mtight"},"5")))),(0,n.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,n.kt)("span",{parentName:"span",className:"vlist-r"},(0,n.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.94644em"}},(0,n.kt)("span",{parentName:"span"}))))),(0,n.kt)("span",{parentName:"span"}))))))))),(0,n.kt)("span",{parentName:"span",className:"mclose"},(0,n.kt)("span",{parentName:"span",className:"delimsizing mult"},(0,n.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,n.kt)("span",{parentName:"span",className:"vlist-r"},(0,n.kt)("span",{parentName:"span",className:"vlist",style:{height:"2.953995em"}},(0,n.kt)("span",{parentName:"span",style:{top:"-1.3499850000000007em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.1550000000000002em"}}),(0,n.kt)("span",{parentName:"span",className:"delimsizinginner delim-size4"},(0,n.kt)("span",{parentName:"span"},"\u23a6"))),(0,n.kt)("span",{parentName:"span",style:{top:"-2.4999850000000006em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.1550000000000002em"}}),(0,n.kt)("span",{parentName:"span",className:"delimsizinginner delim-size4"},(0,n.kt)("span",{parentName:"span"},"\u23a5"))),(0,n.kt)("span",{parentName:"span",style:{top:"-3.0959850000000007em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.1550000000000002em"}}),(0,n.kt)("span",{parentName:"span",className:"delimsizinginner delim-size4"},(0,n.kt)("span",{parentName:"span"},"\u23a5"))),(0,n.kt)("span",{parentName:"span",style:{top:"-3.6919850000000003em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.1550000000000002em"}}),(0,n.kt)("span",{parentName:"span",className:"delimsizinginner delim-size4"},(0,n.kt)("span",{parentName:"span"},"\u23a5"))),(0,n.kt)("span",{parentName:"span",style:{top:"-3.712975em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.1550000000000002em"}}),(0,n.kt)("span",{parentName:"span",className:"delimsizinginner delim-size4"},(0,n.kt)("span",{parentName:"span"},"\u23a5"))),(0,n.kt)("span",{parentName:"span",style:{top:"-4.953995em"}},(0,n.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.1550000000000002em"}}),(0,n.kt)("span",{parentName:"span",className:"delimsizinginner delim-size4"},(0,n.kt)("span",{parentName:"span"},"\u23a4")))),(0,n.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,n.kt)("span",{parentName:"span",className:"vlist-r"},(0,n.kt)("span",{parentName:"span",className:"vlist",style:{height:"2.4500349999999997em"}},(0,n.kt)("span",{parentName:"span"}))))))),(0,n.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222222222222222em"}}),(0,n.kt)("span",{parentName:"span",className:"mbin"},"\u2212"),(0,n.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222222222222222em"}})),(0,n.kt)("span",{parentName:"span",className:"base"},(0,n.kt)("span",{parentName:"span",className:"strut",style:{height:"0.64444em",verticalAlign:"0em"}}),(0,n.kt)("span",{parentName:"span",className:"mord"},"1")))))),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Fixed APY")),(0,n.kt)("p",null,"Fixed APY is the guaranteed yield you will receive by holding PT. This value is numerically equivalent to the Implied APY."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Long Yield APY")),(0,n.kt)("p",null,"Long Yield APY is the approximated return (annualized) from buying YT at the current price, assuming underlying APY remains constant at its current value. "),(0,n.kt)("p",null,"This value can be negative, meaning that the total value of all the future yield based on the Underlying APY will be less than the cost of buying YT."))}N.isMDXComponent=!0}}]);