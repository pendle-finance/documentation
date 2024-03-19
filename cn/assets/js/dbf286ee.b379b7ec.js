"use strict";(self.webpackChunkpendle_documentation=self.webpackChunkpendle_documentation||[]).push([[9421],{3905:(t,e,n)=>{n.d(e,{Zo:()=>p,kt:()=>g});var a=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},l=Object.keys(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var s=a.createContext({}),d=function(t){var e=a.useContext(s),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},p=function(t){var e=d(t.components);return a.createElement(s.Provider,{value:e},t.children)},u="mdxType",m={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},k=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,l=t.originalType,s=t.parentName,p=o(t,["components","mdxType","originalType","parentName"]),u=d(n),k=r,g=u["".concat(s,".").concat(k)]||u[k]||m[k]||l;return n?a.createElement(g,i(i({ref:e},p),{},{components:n})):a.createElement(g,i({ref:e},p))}));function g(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=n.length,i=new Array(l);i[0]=k;var o={};for(var s in e)hasOwnProperty.call(e,s)&&(o[s]=e[s]);o.originalType=t,o[u]="string"==typeof t?t:r,i[1]=o;for(var d=2;d<l;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}k.displayName="MDXCreateElement"},9077:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>o,toc:()=>d});var a=n(7462),r=(n(7294),n(3905));const l={hide_table_of_contents:!0},i="StandardizedYield (SY)",o={unversionedId:"Developers/Contracts/StandardizedYield",id:"Developers/Contracts/StandardizedYield",title:"StandardizedYield (SY)",description:"Overview",source:"@site/docs/Developers/Contracts/StandardizedYield.md",sourceDirName:"Developers/Contracts",slug:"/Developers/Contracts/StandardizedYield",permalink:"/cn/Developers/Contracts/StandardizedYield",draft:!1,tags:[],version:"current",frontMatter:{hide_table_of_contents:!0},sidebar:"myAutogeneratedSidebar",previous:{title:"PendleRouter",permalink:"/cn/Developers/Contracts/PendleRouter"},next:{title:"vePENDLE",permalink:"/cn/Developers/Contracts/vePENDLE"}},s={},d=[{value:"Overview",id:"overview",level:2},{value:"Minting and Redeeming SY",id:"minting-and-redeeming-sy",level:2},{value:"Preview Functions",id:"preview-functions",level:2},{value:"AccruedRewards Function",id:"accruedrewards-function",level:2},{value:"Asset of SY / AssetInfo Function",id:"asset-of-sy--assetinfo-function",level:2},{value:"Standard SYs",id:"standard-sys",level:3},{value:"Non-standard SYs",id:"non-standard-sys",level:3}],p={toc:d},u="wrapper";function m(t){let{components:e,...n}=t;return(0,r.kt)(u,(0,a.Z)({},p,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"standardizedyield-sy"},"StandardizedYield (SY)"),(0,r.kt)("h2",{id:"overview"},"Overview"),(0,r.kt)("p",null,"SY is a wrapped version of the interest-bearing token (ibToken) that can also be staked into other protocols to earn even more interest. In the Pendle system, SY is used instead of the ibToken for all operations, including trading on PendleMarket or minting Principal Token & Yield Token."),(0,r.kt)("p",null,"The following are true:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"center"},"SY"),(0,r.kt)("th",{parentName:"tr",align:"center"},"ibToken (1 SY = 1 ib Token)"),(0,r.kt)("th",{parentName:"tr",align:"center"},"Asset (ibToken appreciates against)"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"SY GLP"),(0,r.kt)("td",{parentName:"tr",align:"center"},"GLP"),(0,r.kt)("td",{parentName:"tr",align:"center"},"NIL, GLP doesn't appreciate")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"SY wstETH"),(0,r.kt)("td",{parentName:"tr",align:"center"},"wstETH"),(0,r.kt)("td",{parentName:"tr",align:"center"},"stETH")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"SY ETHx"),(0,r.kt)("td",{parentName:"tr",align:"center"},"ETHx"),(0,r.kt)("td",{parentName:"tr",align:"center"},"ETH locked in ETHx contract*")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"SY aUSDC"),(0,r.kt)("td",{parentName:"tr",align:"center"},"Not 1-1 to aUSDC since it's rebasing"),(0,r.kt)("td",{parentName:"tr",align:"center"},"aUSDC")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"SY rETH-WETH_BalancerLP Aura"),(0,r.kt)("td",{parentName:"tr",align:"center"},"rETH-WETH LP of Balancer staked into the corresponding Aura's gauge"),(0,r.kt)("td",{parentName:"tr",align:"center"},"Liquidity of rETH-WETH pool")))),(0,r.kt)("p",null,"For *: ETH locked in ETHx is different from normal ETH due to withdrawal from ETHx having a delay. Under normal circumstances, it's also normal for ETHx to trade at a market price lower than the amount of ETH it can be withdrawn to."),(0,r.kt)("h2",{id:"minting-and-redeeming-sy"},"Minting and Redeeming SY"),(0,r.kt)("p",null,"SY can usually be minted using\xa0tokenIn, with some exceptions. Remember, SY simply wraps the underlying yield token. Minting SY essentially buys the underlying token. Consequently, minting/redeeming behavior varies based on the underlying protocol. Here are some examples of quirks:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"GLP:\xa0While purchasable with ETH, USDC, USDT, UNI, etc., caps on ETH & USDC are frequently reached, preventing their use for GLP acquisition. Therefore, SY-GLP, despite offering these tokens as\xa0tokenIn, may not guarantee their use for minting."),(0,r.kt)("li",{parentName:"ul"},"ankrBNB:\xa0Requires a minimum mint amount of 0.1 BNB. Minting SY-ankrBNB with less than 0.1 BNB will revert. Similarly, ankrBNB can only be withdrawn to BNB through a quick withdrawal pool with sufficient liquidity. Redeeming SY-ankrBNB might occasionally fail."),(0,r.kt)("li",{parentName:"ul"},"wstETH:\xa0Allows minting by staking ETH, but not vice versa. Consequently, SY-wstETH's\xa0getTokensIn\xa0includes ETH, but\xa0getTokensOut\xa0does not.")),(0,r.kt)("p",null,"The most reliable way to mint/redeem SY is by using the protocol's\xa0yieldToken. However, hardcoding this is not recommended."),(0,r.kt)("h2",{id:"preview-functions"},"Preview Functions"),(0,r.kt)("p",null,"The underlying protocol often lacks an explicit function for previewing the amount of mintable/redeemable tokens. SY's preview function, a best effort by the Pendle team, approximates the actual mint/redeem results. While its correctness is verified through testing, it's not audited & on-chain use is discouraged."),(0,r.kt)("h2",{id:"accruedrewards-function"},"AccruedRewards Function"),(0,r.kt)("p",null,"Similar to preview functions, the underlying protocol might not offer a way to preview a user's redeemable rewards. Therefore, SY's\xa0accruedRewards\xa0function only reflects accrued rewards for the user. To get the latest results simulate\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"claimRewards(user)"),"\xa0through\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"eth_call"),"\xa0or\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"staticCall"),"."),(0,r.kt)("h2",{id:"asset-of-sy--assetinfo-function"},"Asset of SY / AssetInfo Function"),(0,r.kt)("p",null,"Pendle is a derivative protocol & integrates a wide range of underlying protocols, each has their own unique mechanism. SY acts as an adapter for these protocols, and hence SY's metadata standard (AssetInfo function, what SY is wrapping) is not consistent and doesn't follow a strict standard even though Pendle tries its best to make it so."),(0,r.kt)("p",null,"The AssetInfo function returns the asset that represents the best estimation of what asset SY appreciates against & aims to enable a rough estimation of SY's value on-chain. It's important to note that it's an estimation because more often than not the asset doesn't exist. The address may not be on the same chain as the SY, for example, SY-wstETH on Arbitrum appreciates against stETH, but stETH doesn't exist on Arbitrum, so we set the address to be stETH address on Ethereum instead."),(0,r.kt)("p",null,"SY's exchangeRate represents how much Asset a SY is worth. A 2x in exchangeRate represents a SY now worth double the underlying asset amount."),(0,r.kt)("h3",{id:"standard-sys"},"Standard SYs"),(0,r.kt)("p",null,"Most SY in Pendle are standard. 1-1 wrap of ibToken. Best to value PT/YT/LP by ibToken if it's tradable (getPtToSy / getLpToSy). If not possible, value it by Asset but take into account the risk of not being able to withdraw from ibToken to Asset (getPtToAsset / getLpToAsset). ",(0,r.kt)("inlineCode",{parentName:"p"},"(*)")," represents it's recommended against valuing by that ibToken / Asset, usually applicable for cases where there is risk of insolvency / slashing. This is not to be considered an official security advisory in any way."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"SY"),(0,r.kt)("th",{parentName:"tr",align:null},"ibToken"),(0,r.kt)("th",{parentName:"tr",align:null},"Asset"),(0,r.kt)("th",{parentName:"tr",align:null},"Risk of ibToken conversion to Asset"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-sDAI"),(0,r.kt)("td",{parentName:"tr",align:null},"sDAI"),(0,r.kt)("td",{parentName:"tr",align:null},"DAI"),(0,r.kt)("td",{parentName:"tr",align:null},"Liquidity not available")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-weETH"),(0,r.kt)("td",{parentName:"tr",align:null},"weETH"),(0,r.kt)("td",{parentName:"tr",align:null},"eETH"),(0,r.kt)("td",{parentName:"tr",align:null},"None")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-USDe"),(0,r.kt)("td",{parentName:"tr",align:null},"USDe"),(0,r.kt)("td",{parentName:"tr",align:null},"USDe"),(0,r.kt)("td",{parentName:"tr",align:null},"None")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-sUSDe"),(0,r.kt)("td",{parentName:"tr",align:null},"sUSDe"),(0,r.kt)("td",{parentName:"tr",align:null},"USDe"),(0,r.kt)("td",{parentName:"tr",align:null},"Withdrawal wait")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-crvUSD Silo"),(0,r.kt)("td",{parentName:"tr",align:null},"scrvUSD"),(0,r.kt)("td",{parentName:"tr",align:null},"crvUSD"),(0,r.kt)("td",{parentName:"tr",align:null},"Liquidity not available")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-wsETH"),(0,r.kt)("td",{parentName:"tr",align:null},"wstETH"),(0,r.kt)("td",{parentName:"tr",align:null},"stETH"),(0,r.kt)("td",{parentName:"tr",align:null},"None")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-fUSDC"),(0,r.kt)("td",{parentName:"tr",align:null},"fUSDC"),(0,r.kt)("td",{parentName:"tr",align:null},"USDC"),(0,r.kt)("td",{parentName:"tr",align:null},"Liquidity not available")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-sFRAX"),(0,r.kt)("td",{parentName:"tr",align:null},"sFRAX"),(0,r.kt)("td",{parentName:"tr",align:null},"FRAX"),(0,r.kt)("td",{parentName:"tr",align:null},"None")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-sfrxETH"),(0,r.kt)("td",{parentName:"tr",align:null},"sfrxETH"),(0,r.kt)("td",{parentName:"tr",align:null},"frxETH"),(0,r.kt)("td",{parentName:"tr",align:null},"None")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-woETH"),(0,r.kt)("td",{parentName:"tr",align:null},"woETH"),(0,r.kt)("td",{parentName:"tr",align:null},"oETH"),(0,r.kt)("td",{parentName:"tr",align:null},"None")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-GLP"),(0,r.kt)("td",{parentName:"tr",align:null},"GLP"),(0,r.kt)("td",{parentName:"tr",align:null},"GLP"),(0,r.kt)("td",{parentName:"tr",align:null},"None")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-MUXLP"),(0,r.kt)("td",{parentName:"tr",align:null},"MUXLP"),(0,r.kt)("td",{parentName:"tr",align:null},"MUXLP"),(0,r.kt)("td",{parentName:"tr",align:null},"None")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-HLP"),(0,r.kt)("td",{parentName:"tr",align:null},"HLP"),(0,r.kt)("td",{parentName:"tr",align:null},"HLP"),(0,r.kt)("td",{parentName:"tr",align:null},"None")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-gDAI"),(0,r.kt)("td",{parentName:"tr",align:null},"gDAI"),(0,r.kt)("td",{parentName:"tr",align:null},"DAI (*)"),(0,r.kt)("td",{parentName:"tr",align:null},"Withdrawal wait / insolvency risk")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-ezETH"),(0,r.kt)("td",{parentName:"tr",align:null},"ezETH"),(0,r.kt)("td",{parentName:"tr",align:null},"ETH staked on Renzo (*)"),(0,r.kt)("td",{parentName:"tr",align:null},"Withdrawal wait / slashing risk")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-rETH"),(0,r.kt)("td",{parentName:"tr",align:null},"rETH"),(0,r.kt)("td",{parentName:"tr",align:null},"ETH staked on Rocket (*)"),(0,r.kt)("td",{parentName:"tr",align:null},"Withdrawal wait / slashing risk")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-ezETH (Zircuit)"),(0,r.kt)("td",{parentName:"tr",align:null},"ezETH"),(0,r.kt)("td",{parentName:"tr",align:null},"ETH staked on Renzo then Zircuit (*)"),(0,r.kt)("td",{parentName:"tr",align:null},"Withdrawal wait / slashing risk")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-uniETH"),(0,r.kt)("td",{parentName:"tr",align:null},"uniETH"),(0,r.kt)("td",{parentName:"tr",align:null},"ETH staked on Bedrock (*)"),(0,r.kt)("td",{parentName:"tr",align:null},"Withdrawal wait / slashing risk")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-rswETH"),(0,r.kt)("td",{parentName:"tr",align:null},"rswETH"),(0,r.kt)("td",{parentName:"tr",align:null},"ETH staked on Swell (*)"),(0,r.kt)("td",{parentName:"tr",align:null},"Withdrawal wait / slashing risk")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-swETH"),(0,r.kt)("td",{parentName:"tr",align:null},"swETH"),(0,r.kt)("td",{parentName:"tr",align:null},"ETH staked on Swell (*)"),(0,r.kt)("td",{parentName:"tr",align:null},"Withdrawal wait / slashing risk")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-ETHx"),(0,r.kt)("td",{parentName:"tr",align:null},"ETHx"),(0,r.kt)("td",{parentName:"tr",align:null},"ETH staked on Stadler (*)"),(0,r.kt)("td",{parentName:"tr",align:null},"Withdrawal wait / slashing risk")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-rsETH"),(0,r.kt)("td",{parentName:"tr",align:null},"rsETH"),(0,r.kt)("td",{parentName:"tr",align:null},"ETH staked on Kelp (*)"),(0,r.kt)("td",{parentName:"tr",align:null},"Withdrawal wait / slashing risk")))),(0,r.kt)("h3",{id:"non-standard-sys"},"Non-standard SYs"),(0,r.kt)("p",null,"Each SY has its own properties. To value by ibToken, use getPtToSy / getLpToSy. To value by Asset, use getPtToAsset / getLpToAsset."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"SY"),(0,r.kt)("th",{parentName:"tr",align:null},"ibToken"),(0,r.kt)("th",{parentName:"tr",align:null},"Asset"),(0,r.kt)("th",{parentName:"tr",align:null},"Note"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-aUSDT"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"USDT"),(0,r.kt)("td",{parentName:"tr",align:null},"SY-aUSDT is worth more aUSDT over time. Not 1-1 wrap. Best to value by Asset")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-aUSDC"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"USDC"),(0,r.kt)("td",{parentName:"tr",align:null},"SY-aUSDC is worth more aUSDC over time. Not 1-1 wrap. Best to value by Asset")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-ePENDLE"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"ePENDLE"),(0,r.kt)("td",{parentName:"tr",align:null},"SY-ePENDLE is worth more ePENDLE over time. Not 1-1 wrap. Best to value by Asset")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SY-ankrETH-wstETH on Balancer"),(0,r.kt)("td",{parentName:"tr",align:null},"LP of ankrETH-wstETH on Balancer"),(0,r.kt)("td",{parentName:"tr",align:null},"Liquidity of ankrETH-wstETH pool"),(0,r.kt)("td",{parentName:"tr",align:null},"(1)")))),(0,r.kt)("p",null,"(1) Liquidity of LPs is a very superficial term & is different for each type of AMM. In general, we can take the following example:\n1 LP is worth 10 asset, and can be redeemed for 10 ankrETH & 10 wstETH. Assuming no IL, if this LP worths double the amount of liquidity, it now can be redeemed for 20 ankrETH & 20 wstETH. This is a 2x in exchangeRate."))}m.isMDXComponent=!0}}]);