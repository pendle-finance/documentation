"use strict";(self.webpackChunkpendle_documentation=self.webpackChunkpendle_documentation||[]).push([[3998],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>f});var l=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,l)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,l,r=function(e,t){if(null==e)return{};var a,l,r={},n=Object.keys(e);for(l=0;l<n.length;l++)a=n[l],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(l=0;l<n.length;l++)a=n[l],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=l.createContext({}),c=function(e){var t=l.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},u=function(e){var t=c(e.components);return l.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},m=l.forwardRef((function(e,t){var a=e.components,r=e.mdxType,n=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),p=c(a),m=r,f=p["".concat(s,".").concat(m)]||p[m]||d[m]||n;return a?l.createElement(f,i(i({ref:t},u),{},{components:a})):l.createElement(f,i({ref:t},u))}));function f(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var n=a.length,i=new Array(n);i[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[p]="string"==typeof e?e:r,i[1]=o;for(var c=2;c<n;c++)i[c]=a[c];return l.createElement.apply(null,i)}return l.createElement.apply(null,a)}m.displayName="MDXCreateElement"},9536:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>n,metadata:()=>o,toc:()=>c});var l=a(7462),r=(a(7294),a(3905));const n={hide_table_of_contents:!0},i="LP as Collateral in a Money Market",o={unversionedId:"Developers/Oracles/LPAsCollateral",id:"Developers/Oracles/LPAsCollateral",title:"LP as Collateral in a Money Market",description:"Pendle pools' LP tokens are good collaterals in a money market since it is a yield bearing position on the asset. This document discusses the use cases for LP as a collateral, as well as considerations for a money market when integrating LP as a collateral.",source:"@site/docs/Developers/Oracles/LPAsCollateral.md",sourceDirName:"Developers/Oracles",slug:"/Developers/Oracles/LPAsCollateral",permalink:"/Developers/Oracles/LPAsCollateral",draft:!1,tags:[],version:"current",frontMatter:{hide_table_of_contents:!0},sidebar:"myAutogeneratedSidebar",previous:{title:"Introduction of PT Oracle",permalink:"/Developers/Oracles/IntroductionOfPtOracle"},next:{title:"PT as Collateral in a Money Market",permalink:"/Developers/Oracles/PTAsCollateral"}},s={},c=[{value:"Main Use Cases",id:"main-use-cases",level:2},{value:"1. Leverage farming",id:"1-leverage-farming",level:4},{value:"2. Leverage long assets while earning yields on Pendle",id:"2-leverage-long-assets-while-earning-yields-on-pendle",level:4},{value:"Risk analysis for LP as a collateral",id:"risk-analysis-for-lp-as-a-collateral",level:2},{value:"1. Smart contract vulnerability in Pendle contracts:",id:"1-smart-contract-vulnerability-in-pendle-contracts",level:3},{value:"2. Smart contract vulnerability in underlying protocols:",id:"2-smart-contract-vulnerability-in-underlying-protocols",level:3},{value:"3. Oracle exploit:",id:"3-oracle-exploit",level:3},{value:"4. Insufficient LP liquidity for liquidation in a short duration",id:"4-insufficient-lp-liquidity-for-liquidation-in-a-short-duration",level:3},{value:"5. Highly volatile LP price could liquidate users unnecessarily",id:"5-highly-volatile-lp-price-could-liquidate-users-unnecessarily",level:3}],u={toc:c},p="wrapper";function d(e){let{components:t,...a}=e;return(0,r.kt)(p,(0,l.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"lp-as-collateral-in-a-money-market"},"LP as Collateral in a Money Market"),(0,r.kt)("p",null,"Pendle pools' LP tokens are good collaterals in a money market since it is a yield bearing position on the asset. This document discusses the use cases for LP as a collateral, as well as considerations for a money market when integrating LP as a collateral."),(0,r.kt)("h2",{id:"main-use-cases"},"Main Use Cases"),(0,r.kt)("h4",{id:"1-leverage-farming"},"1. Leverage farming"),(0,r.kt)("p",null,"Example: LP-stETH gives a 12% APY, but the ETH borrow rate is only 3% in the money market."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"In this case, a user can deposit LP-stETH as collateral, borrow ETH, swap borrowed ETH to more LP-stETH to use as more collateral, and so on."),(0,r.kt)("li",{parentName:"ul"},"As a result, the user will get a leveraged APY in ETH terms, benefiting from the difference between the Pendle LP APY and ETH borrow rate"),(0,r.kt)("li",{parentName:"ul"},"If the collateral factor is 0.80, the user can leverage 5x their capital to get a maximum APY of 5 * (12-3) = 45%")),(0,r.kt)("p",null,"This use case is similar to depositing a yield bearing asset like wstETH and borrowing (ETH) in a money market."),(0,r.kt)("h4",{id:"2-leverage-long-assets-while-earning-yields-on-pendle"},"2. Leverage long assets while earning yields on Pendle"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"If a user is bullish on an asset in the long term, they can use its Pendle LP as a collateral to borrow stables to buy more LP"),(0,r.kt)("li",{parentName:"ul"},"For example, a long term ETH holder can use LP-stETH as collateral to borrow USDC to buy more LP-stETH"),(0,r.kt)("li",{parentName:"ul"},"Essentially, the user will be getting a good returns from the Pendle LP position on top of their leveraged long position on ETH.")),(0,r.kt)("h2",{id:"risk-analysis-for-lp-as-a-collateral"},"Risk analysis for LP as a collateral"),(0,r.kt)("h3",{id:"1-smart-contract-vulnerability-in-pendle-contracts"},"1. Smart contract vulnerability in Pendle contracts:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"This is similar to the analysis in the ",(0,r.kt)("a",{parentName:"li",href:"/Developers/Oracles/PTAsCollateral#1-smart-contract-vulnerability-in-pendle-contracts"},"risk analysis for PT as a collateral"))),(0,r.kt)("h3",{id:"2-smart-contract-vulnerability-in-underlying-protocols"},"2. Smart contract vulnerability in underlying protocols:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"This is similar to the analysis in the ",(0,r.kt)("a",{parentName:"li",href:"/Developers/Oracles/PTAsCollateral#2-smart-contract-vulnerability-in-underlying-protocols"},"risk analysis for PT as a collateral"))),(0,r.kt)("h3",{id:"3-oracle-exploit"},"3. Oracle exploit:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"If the oracle for LP price is easily manipulated or exploited, LP price could inflate unnaturally (leading to an attack of using over-priced LP to borrow, and get away with free money leading to bad protocol debt after LP price drops sharply after), or drops sharply (leading to bad debt for the protocol)"),(0,r.kt)("li",{parentName:"ul"},"Assessment:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Pendle's oracle for LP/asset builds on top of the PT/asset oracle. The PT/asset oracle is permissionless and built into the contract (no maintanance needed), hence liveness and correctness is not a concern."),(0,r.kt)("li",{parentName:"ul"},"The LP/asset oracle returns TWAP prices for any customisable duration (within 65536 blocks, which is ~9 days for Ethereum), hence is not susceptible to short term or within-a-block manipulation of prices if the TWAP duration used is sufficient."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Important note"),":",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"You should only use the current LP oracle is the ",(0,r.kt)("inlineCode",{parentName:"li"},"SY")," contract doesn't have a callback function. If the ",(0,r.kt)("inlineCode",{parentName:"li"},"SY")," contract has a callback function, it is technically possible for the oracle to return an incorrect LP price, if it's called inside a SY's callback function. "),(0,r.kt)("li",{parentName:"ul"},"It should be very rare to have a SY with a callback function. If you do integrate with one, you can contact us. We can deploy a specialised oracle to deal with a SY with a call back function.")))))),(0,r.kt)("h3",{id:"4-insufficient-lp-liquidity-for-liquidation-in-a-short-duration"},"4. Insufficient LP liquidity for liquidation in a short duration"),(0,r.kt)("p",null,"The considerations for this part is the same as the ones for integrating PT as collateral ",(0,r.kt)("a",{parentName:"p",href:"/Developers/Oracles/PTAsCollateral#4-insufficient-pt-liquidity-for-liquidation-in-a-short-duration"},"here"),"."),(0,r.kt)("p",null,"The difference between LP and PT is just that LP prices fluctuate less than PT prices (because LP = PT + SY). Therefore, with the same pool, the parameters for supporting LP as a collateral could more more aggressive than that for supporting PT as a collateral."),(0,r.kt)("h3",{id:"5-highly-volatile-lp-price-could-liquidate-users-unnecessarily"},"5. Highly volatile LP price could liquidate users unnecessarily"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"This is similar to the analysis in the ",(0,r.kt)("a",{parentName:"li",href:"/Developers/Oracles/PTAsCollateral#5-highly-volatile-pt-price-could-liquidate-users-unnecessarily"},"risk analysis for PT as a collateral"))))}d.isMDXComponent=!0}}]);