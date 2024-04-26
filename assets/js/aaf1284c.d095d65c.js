"use strict";(self.webpackChunkpendle_documentation=self.webpackChunkpendle_documentation||[]).push([[4143],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>y});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=s(r),d=i,y=u["".concat(c,".").concat(d)]||u[d]||h[d]||a;return r?n.createElement(y,o(o({ref:t},p),{},{components:r})):n.createElement(y,o({ref:t},p))}));function y(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[u]="string"==typeof e?e:i,o[1]=l;for(var s=2;s<a;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},2120:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var n=r(7462),i=(r(7294),r(3905));const a={hide_table_of_contents:!0},o="Sanity checks for PT Integrations",l={unversionedId:"Developers/Integration/PTSanityChecks",id:"Developers/Integration/PTSanityChecks",title:"Sanity checks for PT Integrations",description:"Sanity check for PT Oracle",source:"@site/docs/Developers/Integration/PTSanityChecks.md",sourceDirName:"Developers/Integration",slug:"/Developers/Integration/PTSanityChecks",permalink:"/Developers/Integration/PTSanityChecks",draft:!1,tags:[],version:"current",frontMatter:{hide_table_of_contents:!0},sidebar:"myAutogeneratedSidebar",previous:{title:"PT as Collateral in a Money Market",permalink:"/Developers/Integration/PTAsCollateral"},next:{title:"Pendle Backend",permalink:"/Developers/Helpers/Backend"}},c={},s=[{value:"Sanity check for PT Oracle",id:"sanity-check-for-pt-oracle",level:3},{value:"Check PT/underlying asset price volatility",id:"check-ptunderlying-asset-price-volatility",level:3},{value:"Check PT liquidity",id:"check-pt-liquidity",level:3}],p={toc:s},u="wrapper";function h(e){let{components:t,...a}=e;return(0,i.kt)(u,(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"sanity-checks-for-pt-integrations"},"Sanity checks for PT Integrations"),(0,i.kt)("h3",{id:"sanity-check-for-pt-oracle"},"Sanity check for PT Oracle"),(0,i.kt)("p",null,"After integrating an oracle for PT price (assuming it's a PT/stable price), you should do these steps to quickly check the oracle's correctness:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Get the TWAP PT price from your oracle implementation."),(0,i.kt)("li",{parentName:"ol"},'Go to Pendle Market page for the PT, click the "Price" tab and check the PT price in terms of the underlying asset. In almost all cases, PT absolute price (in terms of the underlying asset) does not fluctuate that much over 30m-1hr.'),(0,i.kt)("li",{parentName:"ol"},"Multiply the price in step 2 with the price of the underlying asset. Please take note which underlying asset it is from the Pendle Frontend.\n",(0,i.kt)("img",{alt:"Step 3",src:r(8532).Z,title:"Step 3",width:"1018",height:"216"})),(0,i.kt)("li",{parentName:"ol"},"Compare the price in step 1 with the price in step 3. They should be almost identical. If there's a difference of more than 0.2%, something is likely wrong and please ask the Pendle team to help double check.")),(0,i.kt)("h1",{id:"sanity-checks-for-pt-liquidity"},"Sanity checks for PT liquidity"),(0,i.kt)("p",null,"If you need to assess PT liquidity and PT price volatility (when doing risk assessment for PT as a collateral or other similar use cases), you should do these sanity checks:"),(0,i.kt)("h3",{id:"check-ptunderlying-asset-price-volatility"},"Check PT/underlying asset price volatility"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},'Go to Pendle Market page for the PT, click the "Price" tab and check the volatility of PT/Underlying asset price'),(0,i.kt)("li",{parentName:"ol"},"From there, you could gauge the volatility of PT/stable price")),(0,i.kt)("h3",{id:"check-pt-liquidity"},"Check PT liquidity"),(0,i.kt)("p",null,"You can check the price impact of different swap sizes (in either direction) for PT"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},'Go to Pendle Market page for the PT, click the "Price" tab'),(0,i.kt)("li",{parentName:"ol"},"Simulate a trade to sell or buy PT from the underlying asset"),(0,i.kt)("li",{parentName:"ol"},"Check the price impact\n",(0,i.kt)("img",{alt:"Check price impact",src:r(8420).Z,title:"Check price impact",width:"451",height:"574"}))))}h.isMDXComponent=!0},8420:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/PTPriceImpact-6ed714e81148316eb99e0d68b9458caa.jpg"},8532:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/checkPtPrice-f981917d45f283d7af29790a4cf852ac.jpg"}}]);