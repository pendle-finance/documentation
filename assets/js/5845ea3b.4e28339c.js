"use strict";(self.webpackChunkpendle_documentation=self.webpackChunkpendle_documentation||[]).push([[2087],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),i=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},p=function(e){var t=i(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=i(r),f=o,m=u["".concat(c,".").concat(f)]||u[f]||d[f]||a;return r?n.createElement(m,l(l({ref:t},p),{},{components:r})):n.createElement(m,l({ref:t},p))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,l=new Array(a);l[0]=f;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[u]="string"==typeof e?e:o,l[1]=s;for(var i=2;i<a;i++)l[i]=r[i];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},6944:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>i});var n=r(7462),o=(r(7294),r(3905));const a={hide_table_of_contents:!0},l="Fees",s={unversionedId:"ProtocolMechanics/Mechanisms/Fees",id:"ProtocolMechanics/Mechanisms/Fees",title:"Fees",description:"Pendle protocol has 2 revenue sources:",source:"@site/docs/ProtocolMechanics/Mechanisms/Fees.md",sourceDirName:"ProtocolMechanics/Mechanisms",slug:"/ProtocolMechanics/Mechanisms/Fees",permalink:"/ProtocolMechanics/Mechanisms/Fees",draft:!1,tags:[],version:"current",frontMatter:{hide_table_of_contents:!0},sidebar:"myAutogeneratedSidebar",previous:{title:"vePENDLE",permalink:"/ProtocolMechanics/Mechanisms/vePENDLE"},next:{title:"Lock",permalink:"/ProtocolMechanics/Mechanisms/Guides/Lock"}},c={},i=[],p={toc:i},u="wrapper";function d(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"fees"},"Fees"),(0,o.kt)("p",null,"Pendle protocol has 2 revenue sources:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Swap Fees"))),(0,o.kt)("p",null,"Fees generated by all swaps on Pendle\u2019s AMM."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"YT Fees"))),(0,o.kt)("p",null,"Pendle collects a 3% fee from all yield accrued by all YT in existence, and all yields from the SYs of unredeemed PTs. "),(0,o.kt)("p",null,'Pendle also collects a 0.1% swap fee from the "implied yield" of all PT swaps. In essence, Pendle taxes the yield-receivables of PT when swaps occur. This creates a fair fee-tier for all pools and maturities as assets with shorter maturities have lower swap fees (less time to maturity -> less yield-receivables -> lower fees in $ terms). Since YT swaps are also routed through the PT AMM, its fees are calculated based on the PT swapped.'),(0,o.kt)("p",null,"Pendle distributes protocol revenue from ",(0,o.kt)("strong",{parentName:"p"},"YT fees to vePENDLE holders")," and all protocol revenue from ",(0,o.kt)("strong",{parentName:"p"},"swap fees to vePENDLE voters")," of the correspondent pools (E.g. vePENDLE holders who voted for pool X will receive all protocol revenue from swap fee of pool X)."),(0,o.kt)("p",null,"At the moment, Pendle protocol distributed all protocol revenue to vePENDLE with no allocation to the Pendle treasury. In the future, a portion of protocol revenue may be redirected to the Pendle treasury."))}d.isMDXComponent=!0}}]);