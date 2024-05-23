"use strict";(self.webpackChunkpendle_documentation=self.webpackChunkpendle_documentation||[]).push([[2304],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},d=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},s="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),s=p(n),f=o,m=s["".concat(l,".").concat(f)]||s[f]||u[f]||a;return n?r.createElement(m,c(c({ref:t},d),{},{components:n})):r.createElement(m,c({ref:t},d))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,c=new Array(a);c[0]=f;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[s]="string"==typeof e?e:o,c[1]=i;for(var p=2;p<a;p++)c[p]=n[p];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},8647:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>p});var r=n(7462),o=(n(7294),n(3905));const a={hide_table_of_contents:!0},c="Pendle Backend",i={unversionedId:"Developers/Backend/Backend",id:"Developers/Backend/Backend",title:"Pendle Backend",description:"Introduction",source:"@site/docs/Developers/Backend/Backend.md",sourceDirName:"Developers/Backend",slug:"/Developers/Backend/",permalink:"/Developers/Backend/",draft:!1,tags:[],version:"current",frontMatter:{hide_table_of_contents:!0},sidebar:"myAutogeneratedSidebar",previous:{title:"Sanity checks for PT Integrations",permalink:"/Developers/Oracles/PTSanityChecks"},next:{title:"Hosted SDK",permalink:"/Developers/Backend/HostedSDK"}},l={},p=[{value:"Introduction",id:"introduction",level:2},{value:"Network URL",id:"network-url",level:2},{value:"Endpoints",id:"endpoints",level:2}],d={toc:p},s="wrapper";function u(e){let{components:t,...n}=e;return(0,o.kt)(s,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"pendle-backend"},"Pendle Backend"),(0,o.kt)("h2",{id:"introduction"},"Introduction"),(0,o.kt)("p",null,"The Pendle Backend can be used to query Asset, Market, Price, vePENDLE, and other information from the Pendle protocol across the different chain deployments."),(0,o.kt)("h2",{id:"network-url"},"Network URL"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://api-v2.pendle.finance/core/"},"https://api-v2.pendle.finance/core/")),(0,o.kt)("h2",{id:"endpoints"},"Endpoints"),(0,o.kt)("p",null,"Documentation on the various endpoints can be found here: ",(0,o.kt)("a",{parentName:"p",href:"https://api-v2.pendle.finance/core/docs"},"https://api-v2.pendle.finance/core/docs")))}u.isMDXComponent=!0}}]);