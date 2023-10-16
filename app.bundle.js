!function(){"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),function(){var t;e.g.importScripts&&(t=e.g.location+"");var n=e.g.document;if(!t&&n&&(n.currentScript&&(t=n.currentScript.src),!t)){var r=n.getElementsByTagName("script");if(r.length)for(var s=r.length-1;s>-1&&!t;)t=r[s--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t}();var t=async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{url:url,sendMethod:sendMethod,method:method,data:data,callback:callback};const t=e.url+e.method;"GET"===e.sendMethod&&fetch(t).then((e=>e.json())).then((t=>{console.log(t),e.callback(t)})).catch((e=>{console.error(`Error: ${e}`)}))};class n{constructor(e){this.url=e}list(e){t({url:this.url,sendMethod:"GET",method:"news",callback:e})}}var r=e.p+"501b315d7ecaaeecea6a.jpg";e.p,"serviceWorker"in navigator&&navigator.serviceWorker.register("sw.js",{scope:"./"}).then((e=>{console.log(`Registration succeeded. Scope is ${e.scope}`)})).catch((e=>{console.log(`Registration failed with ${e}`)}));const s=new class{constructor(e){this.container=e,this.url="https://ahj-homeworks-serviceworker-backend.onrender.com/",this.NewsService=new n(this.url)}bindToDOM(){this.containerElem=document.querySelector(this.container)}getFakeData(){return{news:[{title:"Waiting for news",photo:r,date:Date.now()},{title:"Waiting for news",photo:r,date:Date.now()}]}}getNews(){caches.match(`${this.url}news`).then((async e=>void 0!==e?e.json():this.getFakeData())).then((e=>{this.renderNews(e.news,!0)})),this.NewsService.list((e=>{this.clearNews(),this.renderNews(e.news)}))}clearNews(){document.querySelectorAll(".news-item").forEach((e=>{e.remove()}))}renderNewsItem(e,t){const n=document.createElement("div"),r=new Date(e.date),s=e.photo;let o;return o=t?"news-item blured":"news-item",n.innerHTML=`\n        <div class="${o}">\n            <div class="news__date">\n              ${r.getDate().toString().padStart(2,"0")}.${r.getMonth().toString().padStart(2,"0")}.${r.getFullYear()} ${r.getHours().toString().padStart(2,"0")}:${r.getMinutes().toString().padStart(2,"0")}\n            </div>\n            <div class="news__content">\n                <img src="${s}" class="news__content_img">\n                <div class="new__content_title">\n                  ${e.title}\n                </div>\n            </div>\n        </div>\n    `,n}renderNews(e,t){e.forEach((e=>{const n=this.renderNewsItem(e,t);this.containerElem.insertBefore(n,null)}))}}(".container");s.bindToDOM(),s.getNews()}();