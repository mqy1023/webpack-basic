!function(e){function n(n){for(var t,a,c=n[0],l=n[1],u=n[2],d=0,f=[];d<c.length;d++)a=c[d],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&f.push(r[a][0]),r[a]=0;for(t in l)Object.prototype.hasOwnProperty.call(l,t)&&(e[t]=l[t]);for(s&&s(n);f.length;)f.shift()();return i.push.apply(i,u||[]),o()}function o(){for(var e,n=0;n<i.length;n++){for(var o=i[n],t=!0,c=1;c<o.length;c++){var l=o[c];0!==r[l]&&(t=!1)}t&&(i.splice(n--,1),e=a(a.s=o[0]))}return e}var t={},r={3:0},i=[];function a(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=e,a.c=t,a.d=function(e,n,o){a.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,n){if(1&n&&(e=a(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)a.d(o,t,function(n){return e[n]}.bind(null,t));return o},a.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(n,"a",n),n},a.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},a.p="";var c=window.webpackJsonp=window.webpackJsonp||[],l=c.push.bind(c);c.push=n,c=c.slice();for(var u=0;u<c.length;u++)n(c[u]);var s=l;i.push([18,1,0]),o()}({18:function(e,n,o){"use strict";o.r(n);o(5),o(6),o(1),o(7),o(8),o(9),o(10),o(19),o(20);ibase.init({dir:"landscape",lock:!0}),$(document).ready((function(){var e,n=$("article"),t=($("aside#loadBox"),"landscape"==ibase.getOrient(!0)?window.innerWidth/ibase.landscapeWidth:window.innerHeight/ibase.landscapeWidth);function r(n){var t;0==n.errcode?((e=n.result).HeadImage=""!=e.HeadImage?e.HeadImage:"https://wx.qlogo.cn/mmopen/vi_32/l1R1ORryeZaAU5pwF4iavDQc04aGPC6FdJOiccHHzTbyDBIjGDJjicib1sVOXgYLjkjt3NTks92TMybeGvPgw1mjPA/132",console.log("UserInfo",e),(t=new PxLoader).addImage(o(0)),t.addProgressListener((function(e){Math.round(e.completedCount/e.totalCount*50)})),t.addCompletionListener((function(){a(),t=null})),t.start()):console.log(n.errmsg)}console.log("windowScale:"+t),icom.init((function(){requestAnimationFrame((function(){window.Data?Data.OAuth.Login(r):r({errcode:0,errmsg:"ok",result:{OpenID:"xxxx-xxxx-xxxx",Nickname:"Nickname",HeadImage:"https://wx.qlogo.cn/mmopen/vi_32/l1R1ORryeZaAU5pwF4iavDQc04aGPC6FdJOiccHHzTbyDBIjGDJjicib1sVOXgYLjkjt3NTks92TMybeGvPgw1mjPA/132"}}),n.css({opacity:1}).show()}))})),icom.screenScrollUnable(),n.fadeTo("slow",1);var i=$("aside#loadPage");i.find(".per");function a(){console.log("init handler"),i.length>0&&icom.fadeOut(i,500,(function(){i.remove()})),console.log("index_handler"),c.show(),imonitor.add({label:"首页"})}var c=$("section.index")}))},19:function(e,n,o){},20:function(e,n,o){}});