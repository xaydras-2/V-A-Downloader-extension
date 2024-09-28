(()=>{var e={964:(e,r,s)=>{"use strict";r.browser=s(815)},815:function(e,r){var s,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,s=function(e){"use strict";if("undefined"==typeof browser||Object.getPrototypeOf(browser)!==Object.prototype){const r="The message port closed before a response was received.",s="Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)",n=e=>{const n={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:!1}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0},elements:{createSidebarPane:{minArgs:1,maxArgs:1}}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},goBack:{minArgs:0,maxArgs:1},goForward:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(0===Object.keys(n).length)throw new Error("api-metadata.json has not been included in browser-polyfill");class a extends WeakMap{constructor(e,r=void 0){super(r),this.createItem=e}get(e){return this.has(e)||this.set(e,this.createItem(e)),super.get(e)}}const g=(r,s)=>(...n)=>{e.runtime.lastError?r.reject(new Error(e.runtime.lastError.message)):s.singleCallbackArg||n.length<=1&&!1!==s.singleCallbackArg?r.resolve(n[0]):r.resolve(n)},t=e=>1==e?"argument":"arguments",m=(e,r,s)=>new Proxy(r,{apply:(r,n,a)=>s.call(n,e,...a)});let o=Function.call.bind(Object.prototype.hasOwnProperty);const i=(e,r={},s={})=>{let n=Object.create(null),a={has:(r,s)=>s in e||s in n,get(a,A,l){if(A in n)return n[A];if(!(A in e))return;let c=e[A];if("function"==typeof c)if("function"==typeof r[A])c=m(e,e[A],r[A]);else if(o(s,A)){let r=((e,r)=>function(s,...n){if(n.length<r.minArgs)throw new Error(`Expected at least ${r.minArgs} ${t(r.minArgs)} for ${e}(), got ${n.length}`);if(n.length>r.maxArgs)throw new Error(`Expected at most ${r.maxArgs} ${t(r.maxArgs)} for ${e}(), got ${n.length}`);return new Promise(((a,t)=>{if(r.fallbackToNoCallback)try{s[e](...n,g({resolve:a,reject:t},r))}catch(g){console.warn(`${e} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,g),s[e](...n),r.fallbackToNoCallback=!1,r.noCallback=!0,a()}else r.noCallback?(s[e](...n),a()):s[e](...n,g({resolve:a,reject:t},r))}))})(A,s[A]);c=m(e,e[A],r)}else c=c.bind(e);else if("object"==typeof c&&null!==c&&(o(r,A)||o(s,A)))c=i(c,r[A],s[A]);else{if(!o(s,"*"))return Object.defineProperty(n,A,{configurable:!0,enumerable:!0,get:()=>e[A],set(r){e[A]=r}}),c;c=i(c,r[A],s["*"])}return n[A]=c,c},set:(r,s,a,g)=>(s in n?n[s]=a:e[s]=a,!0),defineProperty:(e,r,s)=>Reflect.defineProperty(n,r,s),deleteProperty:(e,r)=>Reflect.deleteProperty(n,r)},A=Object.create(e);return new Proxy(A,a)},A=e=>({addListener(r,s,...n){r.addListener(e.get(s),...n)},hasListener:(r,s)=>r.hasListener(e.get(s)),removeListener(r,s){r.removeListener(e.get(s))}}),l=new a((e=>"function"!=typeof e?e:function(r){const s=i(r,{},{getContent:{minArgs:0,maxArgs:0}});e(s)}));let c=!1;const x=new a((e=>"function"!=typeof e?e:function(r,n,a){let g,t,m=!1,o=new Promise((e=>{g=function(r){c||(console.warn(s,(new Error).stack),c=!0),m=!0,e(r)}}));try{t=e(r,n,g)}catch(e){t=Promise.reject(e)}const i=!0!==t&&((A=t)&&"object"==typeof A&&"function"==typeof A.then);var A;if(!0!==t&&!i&&!m)return!1;return(i?t:o).then((e=>{a(e)}),(e=>{let r;r=e&&(e instanceof Error||"string"==typeof e.message)?e.message:"An unexpected error occurred",a({__mozWebExtensionPolyfillReject__:!0,message:r})})).catch((e=>{console.error("Failed to send onMessage rejected reply",e)})),!0})),d=({reject:s,resolve:n},a)=>{e.runtime.lastError?e.runtime.lastError.message===r?n():s(new Error(e.runtime.lastError.message)):a&&a.__mozWebExtensionPolyfillReject__?s(new Error(a.message)):n(a)},u=(e,r,s,...n)=>{if(n.length<r.minArgs)throw new Error(`Expected at least ${r.minArgs} ${t(r.minArgs)} for ${e}(), got ${n.length}`);if(n.length>r.maxArgs)throw new Error(`Expected at most ${r.maxArgs} ${t(r.maxArgs)} for ${e}(), got ${n.length}`);return new Promise(((e,r)=>{const a=d.bind(null,{resolve:e,reject:r});n.push(a),s.sendMessage(...n)}))},p={devtools:{network:{onRequestFinished:A(l)}},runtime:{onMessage:A(x),onMessageExternal:A(x),sendMessage:u.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:u.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},f={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return n.privacy={network:{"*":f},services:{"*":f},websites:{"*":f}},i(e,p,n)};if("object"!=typeof chrome||!chrome||!chrome.runtime||!chrome.runtime.id)throw new Error("This script should only be loaded in a browser extension.");e.exports=n(chrome)}else e.exports=browser},void 0===(n=s.apply(r,[e]))||(e.exports=n)}},r={};function s(n){var a=r[n];if(void 0!==a)return a.exports;var g=r[n]={exports:{}};return e[n].call(g.exports,g,g.exports,s),g.exports}(()=>{"use strict";var e=s(964);e.browser.runtime.onMessage.addListener((r=>{return s=void 0,n=void 0,g=function*(){if("download"===r.action){const{data:s,api_key:n}=r;try{const r=yield fetch("https://xaydras-api-tt1-production.up.railway.app/api/download",{method:"POST",headers:{"Content-Type":"application/json","api-key":`${n}`},body:JSON.stringify({data:s})});if(r.ok){const n=yield r.blob(),a=r.headers.get("Content-Disposition");let g=`download.${s.type}`;if(a){const e=/(?:filename\*=UTF-8''([^;]+)|filename\s*=\s*"([^"]+)")/i.exec(a);null!=e&&(e[1]?g=decodeURIComponent(e[1]).replace(/['"]/g,""):e[2]&&(g=e[2].replace(/['"]/g,"")))}const t=window.URL.createObjectURL(n);e.browser.downloads.download({url:t,filename:g,conflictAction:"overwrite"}).then((()=>{e.browser.runtime.sendMessage({action:"downloadStatus",status:"Download completed!"})})).catch((r=>{console.error("Download error:",r),e.browser.runtime.sendMessage({action:"downloadStatus",status:"An error occurred during download: "+(r instanceof Error?r.message:"Unknown error")})}))}else{const s=yield r.json();e.browser.runtime.sendMessage({action:"downloadStatus",status:s.detail||"An error occurred"})}}catch(r){console.error("Fetch error:",r),e.browser.runtime.sendMessage({action:"downloadStatus",status:"An error occurred: "+(r instanceof Error?r.message:"Unknown error")})}}},new((a=void 0)||(a=Promise))((function(e,r){function t(e){try{o(g.next(e))}catch(e){r(e)}}function m(e){try{o(g.throw(e))}catch(e){r(e)}}function o(r){var s;r.done?e(r.value):(s=r.value,s instanceof a?s:new a((function(e){e(s)}))).then(t,m)}o((g=g.apply(s,n||[])).next())}));var s,n,a,g}))})()})();
//# sourceMappingURL=background.js.map