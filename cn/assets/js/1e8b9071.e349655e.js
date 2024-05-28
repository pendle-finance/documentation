"use strict";(self.webpackChunkpendle_documentation=self.webpackChunkpendle_documentation||[]).push([[4597],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>k});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),m=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},p=function(e){var t=m(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=m(a),u=r,k=d["".concat(s,".").concat(u)]||d[u]||c[u]||i;return a?n.createElement(k,l(l({ref:t},p),{},{components:a})):n.createElement(k,l({ref:t},p))}));function k(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=u;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[d]="string"==typeof e?e:r,l[1]=o;for(var m=2;m<i;m++)l[m]=a[m];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},6500:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>m});var n=a(7462),r=(a(7294),a(3905));const i={},l="Limit Order Contract",o={unversionedId:"Developers/LimitOrder/LimitOrderContract",id:"Developers/LimitOrder/LimitOrderContract",title:"Limit Order Contract",description:"The Limit Order contract is where limit orders are settled, allowing orders to be generated off-chain and settled on-chain.",source:"@site/i18n/cn/docusaurus-plugin-content-docs/current/Developers/LimitOrder/LimitOrderContract.md",sourceDirName:"Developers/LimitOrder",slug:"/Developers/LimitOrder/LimitOrderContract",permalink:"/cn/Developers/LimitOrder/LimitOrderContract",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"myAutogeneratedSidebar",previous:{title:"vePENDLE",permalink:"/cn/Developers/Contracts/vePENDLE"},next:{title:"Create a Limit Order",permalink:"/cn/Developers/LimitOrder/CreateALimitOrder"}},s={},m=[{value:"Order Struct Definition",id:"order-struct-definition",level:2},{value:"Field Explanations",id:"field-explanations",level:2},{value:"Method Definitions",id:"method-definitions",level:2},{value:"hashOrder",id:"hashorder",level:3},{value:"Parameters:",id:"parameters",level:4},{value:"Returns:",id:"returns",level:4},{value:"cancelSingle",id:"cancelsingle",level:3},{value:"Parameters:",id:"parameters-1",level:4},{value:"cancelBatch",id:"cancelbatch",level:3},{value:"Parameters:",id:"parameters-2",level:4},{value:"orderStatusesRaw",id:"orderstatusesraw",level:3},{value:"Parameters:",id:"parameters-3",level:4},{value:"Returns:",id:"returns-1",level:4},{value:"fill",id:"fill",level:3},{value:"Parameters:",id:"parameters-4",level:4},{value:"Returns:",id:"returns-2",level:4},{value:"Callback Mechanism",id:"callback-mechanism",level:2},{value:"Callback Interface",id:"callback-interface",level:3},{value:"Parameters:",id:"parameters-5",level:4},{value:"Returns:",id:"returns-3",level:4},{value:"Callback Flow and Arbitrage Use Cases",id:"callback-flow-and-arbitrage-use-cases",level:3}],p={toc:m},d="wrapper";function c(e){let{components:t,...i}=e;return(0,r.kt)(d,(0,n.Z)({},p,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"limit-order-contract"},"Limit Order Contract"),(0,r.kt)("p",null,"The Limit Order contract is where limit orders are settled, allowing orders to be generated off-chain and settled on-chain."),(0,r.kt)("p",null,"The Limit Order contract provides methods to support:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Makers canceling their orders."),(0,r.kt)("li",{parentName:"ol"},"Takers filling orders."),(0,r.kt)("li",{parentName:"ol"},"A callback function to support arbitrageurs arbitraging limit orders.")),(0,r.kt)("p",null,"You can find the contract's implementation ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/pendle-finance/pendle-core-v2/tree/main/contracts/limit"},"here"),"."),(0,r.kt)("h2",{id:"order-struct-definition"},"Order Struct Definition"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sol"},"interface IPLimitOrderType {\n    enum OrderType {\n        SY_FOR_PT,\n        PT_FOR_SY,\n        SY_FOR_YT,\n        YT_FOR_SY\n    }\n}\n\nstruct Order {\n    uint256 salt;\n    uint256 expiry;\n    uint256 nonce;\n    IPLimitOrderType.OrderType orderType;\n    address token;\n    address YT;\n    address maker;\n    address receiver;\n    uint256 makingAmount;\n    uint256 lnImpliedRate;\n    uint256 failSafeRate;\n    bytes permit;\n}\n")),(0,r.kt)("p",null,"You can find the contract's implementation ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/pendle-finance/pendle-core-v2/tree/main/contracts/limit"},"here"),"."),(0,r.kt)("h2",{id:"field-explanations"},"Field Explanations"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"salt"),": A randomly generated number that differentiates between orders."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"expiry"),": The expiration timestamp of the order. Orders cannot be settled on-chain after this point."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"nonce"),": This field allows makers to cancel all their created orders by simply increasing the nonce. All orders with a nonce less than the current nonce will be invalid. Orders are typically created with a nonce equal to the current nonce at the time of creation."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"orderType"),": Indicates the type of trade. There are four types of limit orders:",(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"SY_FOR_PT"),": Swap SY (or another SY's token in) for PT."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"PT_FOR_SY"),": Swap PT for SY (or another SY's token out)."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"SY_FOR_YT"),": Swap SY (or another SY's token in) for YT."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"YT_FOR_SY"),": Swap YT for SY (or another SY's token out)."))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"token"),": Specifies which token to use for the order. If the orderType is SY_FOR_PT or SY_FOR_YT, this is the token-in address. Otherwise, it's the token-out address."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"YT"),": The YT address for this limit order. From this address, you can derive the SY and PT addresses."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"maker"),": The address of the maker who created the order."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"receiver"),": The address of the receiver, who will get the output amount if the order is settled."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"makingAmount"),": The amount of input token used to create the order. If the orderType is SY_FOR_PT or SY_FOR_YT, the makingAmount is the SY amount. If PT_FOR_SY or YT_FOR_SY, it refers to the PT or YT amount, respectively."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"lnImpliedRate"),": The natural logarithm of the implied rate, formatted as a uint256 by multiplying by 10^18 and then rounding to an integer. You can find the actual implied APY with the formula: ",(0,r.kt)("span",{parentName:"li",className:"math math-inline"},(0,r.kt)("span",{parentName:"span",className:"katex"},(0,r.kt)("span",{parentName:"span",className:"katex-mathml"},(0,r.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,r.kt)("semantics",{parentName:"math"},(0,r.kt)("mrow",{parentName:"semantics"},(0,r.kt)("mi",{parentName:"mrow"},"e"),(0,r.kt)("mi",{parentName:"mrow"},"x"),(0,r.kt)("mi",{parentName:"mrow"},"p"),(0,r.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,r.kt)("mi",{parentName:"mrow"},"l"),(0,r.kt)("mi",{parentName:"mrow"},"n"),(0,r.kt)("mi",{parentName:"mrow"},"I"),(0,r.kt)("mi",{parentName:"mrow"},"m"),(0,r.kt)("mi",{parentName:"mrow"},"p"),(0,r.kt)("mi",{parentName:"mrow"},"l"),(0,r.kt)("mi",{parentName:"mrow"},"i"),(0,r.kt)("mi",{parentName:"mrow"},"e"),(0,r.kt)("mi",{parentName:"mrow"},"d"),(0,r.kt)("mi",{parentName:"mrow"},"R"),(0,r.kt)("mi",{parentName:"mrow"},"a"),(0,r.kt)("mi",{parentName:"mrow"},"t"),(0,r.kt)("mi",{parentName:"mrow"},"e"),(0,r.kt)("mi",{parentName:"mrow",mathvariant:"normal"},"/"),(0,r.kt)("mn",{parentName:"mrow"},"1"),(0,r.kt)("msup",{parentName:"mrow"},(0,r.kt)("mn",{parentName:"msup"},"0"),(0,r.kt)("mn",{parentName:"msup"},"18")),(0,r.kt)("mo",{parentName:"mrow",stretchy:"false"},")"),(0,r.kt)("mo",{parentName:"mrow"},"\u2212"),(0,r.kt)("mn",{parentName:"mrow"},"1")),(0,r.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"exp(lnImpliedRate/10^{18}) - 1")))),(0,r.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"1.064108em",verticalAlign:"-0.25em"}}),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal"},"e"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal"},"x"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal"},"p"),(0,r.kt)("span",{parentName:"span",className:"mopen"},"("),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.01968em"}},"l"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal"},"n"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.07847em"}},"I"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal"},"m"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal"},"p"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.01968em"}},"l"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal"},"i"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal"},"e"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal"},"d"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.00773em"}},"R"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal"},"a"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal"},"t"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal"},"e"),(0,r.kt)("span",{parentName:"span",className:"mord"},"/"),(0,r.kt)("span",{parentName:"span",className:"mord"},"1"),(0,r.kt)("span",{parentName:"span",className:"mord"},(0,r.kt)("span",{parentName:"span",className:"mord"},"0"),(0,r.kt)("span",{parentName:"span",className:"msupsub"},(0,r.kt)("span",{parentName:"span",className:"vlist-t"},(0,r.kt)("span",{parentName:"span",className:"vlist-r"},(0,r.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.8141079999999999em"}},(0,r.kt)("span",{parentName:"span",style:{top:"-3.063em",marginRight:"0.05em"}},(0,r.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,r.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,r.kt)("span",{parentName:"span",className:"mord mtight"},(0,r.kt)("span",{parentName:"span",className:"mord mtight"},"1"),(0,r.kt)("span",{parentName:"span",className:"mord mtight"},"8"))))))))),(0,r.kt)("span",{parentName:"span",className:"mclose"},")"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222222222222222em"}}),(0,r.kt)("span",{parentName:"span",className:"mbin"},"\u2212"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222222222222222em"}})),(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"0.64444em",verticalAlign:"0em"}}),(0,r.kt)("span",{parentName:"span",className:"mord"},"1"))))),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"failSafeRate"),": If at the time the limit order is settled, the rate of converting input token to SY or converting from SY to output token (based on the type of order) is lower than this failSafeRate, the order will not be settled."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"permit"),": Reserved for future use.")),(0,r.kt)("h2",{id:"method-definitions"},"Method Definitions"),(0,r.kt)("h3",{id:"hashorder"},"hashOrder"),(0,r.kt)("p",null,"This function returns a unique hash for a given order, allowing you to get the order's status later."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sol"},"function hashOrder(Order memory order) external view returns (bytes32);\n")),(0,r.kt)("h4",{id:"parameters"},"Parameters:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"order"),": The order to be hashed.")),(0,r.kt)("h4",{id:"returns"},"Returns:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The unique hash of the order.")),(0,r.kt)("h3",{id:"cancelsingle"},"cancelSingle"),(0,r.kt)("p",null,"This method cancels a specific limit order. Once canceled, the order cannot be filled or settled."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sol"},"function cancelSingle(Order calldata order) external;\n")),(0,r.kt)("h4",{id:"parameters-1"},"Parameters:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"order"),": The limit order to be canceled.")),(0,r.kt)("h3",{id:"cancelbatch"},"cancelBatch"),(0,r.kt)("p",null,"This method allows you to cancel multiple limit orders in a single transaction."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sol"},"function cancelBatch(Order[] calldata orders) external;\n")),(0,r.kt)("h4",{id:"parameters-2"},"Parameters:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"orders"),": An array of limit orders to be canceled.")),(0,r.kt)("h3",{id:"orderstatusesraw"},"orderStatusesRaw"),(0,r.kt)("p",null,"This method retrieves raw remaining and filled amounts for specified orders."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sol"},"function orderStatusesRaw(\n    bytes32[] memory orderHashes\n) external view returns (uint256[] memory remainingsRaw, uint256[] memory filledAmounts);\n")),(0,r.kt)("h4",{id:"parameters-3"},"Parameters:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"orderHashes"),": An array of hashes identifying the orders for which statuses are requested.")),(0,r.kt)("h4",{id:"returns-1"},"Returns:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"remainingsRaw"),": The raw remaining amounts for each order. If ",(0,r.kt)("inlineCode",{parentName:"li"},"remainingsRaw")," is zero, the order is unknown to the contract. To distinguish between unknown orders and fully filled orders, known orders have ",(0,r.kt)("inlineCode",{parentName:"li"},"remainingsRaw")," increased by one. For example, if an order has a real remaining of ",(0,r.kt)("inlineCode",{parentName:"li"},"100"),", its ",(0,r.kt)("inlineCode",{parentName:"li"},"remainingsRaw")," will be ",(0,r.kt)("inlineCode",{parentName:"li"},"101"),". Fully filled or canceled orders will have ",(0,r.kt)("inlineCode",{parentName:"li"},"remainingsRaw")," set to one."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"filledAmounts"),": The filled amounts for each order.")),(0,r.kt)("h3",{id:"fill"},"fill"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"fill")," function allows you to fill one or more limit orders. This is a key operation in a limit order system, where takers fill the orders submitted by makers. It has several parameters and returns multiple values, indicating the outcome of the fill operation."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sol"},"function fill(\n        FillOrderParams[] memory params,\n        address receiver,\n        uint256 maxTaking,\n        bytes calldata optData,\n        bytes calldata callback\n    ) external returns (uint256 actualMaking, uint256 actualTaking, uint256 totalFee, bytes memory callbackReturn);\n")),(0,r.kt)("h4",{id:"parameters-4"},"Parameters:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"params"),": An array of ",(0,r.kt)("inlineCode",{parentName:"li"},"FillOrderParams"),", specifying the orders to be filled, including order data, signatures, and the amount the taker intends to fill."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"receiver"),": The address that receives the output tokens when the orders are filled, typically the taker's address."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"maxTaking"),": The maximum amount of tokens that can be taken from the taker."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"optData"),": Reserved for future use. Pass empty bytes (",(0,r.kt)("inlineCode",{parentName:"li"},"'0x'"),")."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"callback"),": Optional callback data for executing additional logic. For most cases, you can pass empty bytes. See the callback part below for more details.")),(0,r.kt)("h4",{id:"returns-2"},"Returns:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"actualMaking"),": The total amount of tokens received by the taker from the fill operation."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"actualTaking"),": The total amount of tokens taken from the taker to complete the fill operation."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"totalFee"),": The total fee incurred during the fill operation."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"callbackReturn"),": Data returned from the callback function, if used.")),(0,r.kt)("h2",{id:"callback-mechanism"},"Callback Mechanism"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"fill")," function supports a callback mechanism for executing additional logic during the filling process, making it versatile for arbitrage and other custom operations."),(0,r.kt)("h3",{id:"callback-interface"},"Callback Interface"),(0,r.kt)("p",null,"The callback mechanism allows additional logic to be executed during the fill operation. Here's the interface for the callback function:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sol"},"interface IPLimitRouterCallback {\n    function limitRouterCallback(\n        uint256 actualMaking,\n        uint256 actualTaking,\n        uint256 totalFee,\n        bytes memory data\n    ) external returns (bytes memory);\n}\n")),(0,r.kt)("h4",{id:"parameters-5"},"Parameters:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"actualMaking"),": The amount of tokens received by the taker's contract from the fill operation. This amount is in SY if the orderType is ",(0,r.kt)("inlineCode",{parentName:"li"},"SY_FOR_PT")," or ",(0,r.kt)("inlineCode",{parentName:"li"},"SY_FOR_YT"),", in PT if it's ",(0,r.kt)("inlineCode",{parentName:"li"},"PT_FOR_SY"),", and in YT if it's ",(0,r.kt)("inlineCode",{parentName:"li"},"YT_FOR_SY"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"actualTaking"),": The amount of tokens the taker's contract must send to the limit order router to complete the fill. This amount is in SY if ",(0,r.kt)("inlineCode",{parentName:"li"},"PT_FOR_SY")," or ",(0,r.kt)("inlineCode",{parentName:"li"},"YT_FOR_SY"),", in PT if it's ",(0,r.kt)("inlineCode",{parentName:"li"},"SY_FOR_PT"),", and in YT if it's ",(0,r.kt)("inlineCode",{parentName:"li"},"SY_FOR_YT"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"totalFee"),": The total fee for the operation."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"data"),": Additional data provided during the ",(0,r.kt)("inlineCode",{parentName:"li"},"fill")," operation. This corresponds to the callback parameter in the ",(0,r.kt)("inlineCode",{parentName:"li"},"fill")," function.")),(0,r.kt)("h4",{id:"returns-3"},"Returns:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"bytes"),": Optional return data from the callback function.")),(0,r.kt)("h3",{id:"callback-flow-and-arbitrage-use-cases"},"Callback Flow and Arbitrage Use Cases"),(0,r.kt)("p",null,"The callback mechanism enables complex interactions and arbitrage opportunities. Here's a simplified flow for using the callback feature:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Taker Contract Calls ",(0,r.kt)("inlineCode",{parentName:"strong"},"fill")),": The ",(0,r.kt)("inlineCode",{parentName:"li"},"fill")," function is called with the specified parameters and the callback data."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Tokens Are Transferred"),": The ",(0,r.kt)("inlineCode",{parentName:"li"},"actualMaking")," amount is transferred to the receiver (typically the taker's contract)."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Callback Function Is Invoked"),": The callback function (",(0,r.kt)("inlineCode",{parentName:"li"},"limitRouterCallback"),") is called with the ",(0,r.kt)("inlineCode",{parentName:"li"},"actualMaking"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"actualTaking"),", and ",(0,r.kt)("inlineCode",{parentName:"li"},"totalFee")," values, along with the callback parameter in ",(0,r.kt)("inlineCode",{parentName:"li"},"fill"),"."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Callback Logic Executes"),": The taker's contract can perform additional operations during the callback, such as arbitrage with Pendle's AMM or other limit orders. The goal is to use the ",(0,r.kt)("inlineCode",{parentName:"li"},"actualMaking")," amount to generate more value than the ",(0,r.kt)("inlineCode",{parentName:"li"},"actualTaking")," amount, creating a profit."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Send Tokens to Complete"),": The taker's contract must send back the ",(0,r.kt)("inlineCode",{parentName:"li"},"actualTaking")," amount to ensure the fill operation completes successfully."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Limit Order Contract Sends Output"),": Once the taker's contract sends the required tokens, the limit order contract transfers the agreed output to the limit order receivers.")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Limit Order Callback Flow",src:a(6573).Z,title:"Limit Order Callback Flow",width:"1382",height:"986"})),(0,r.kt)("p",null,"This flow allows for flexible and creative use of the ",(0,r.kt)("inlineCode",{parentName:"p"},"fill")," function, providing opportunities for arbitrage and custom contract logic. Arbitrageurs can take advantage of this mechanism to execute strategies that generate profit by finding discrepancies in token values or other"))}c.isMDXComponent=!0},6573:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/limit_order_callback_flow-bcca747a2640e9e901a6987f45b6ee20.png"}}]);