/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		2: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([9,1,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var base_com_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _css_common_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _css_common_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_common_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_2__);
// 默认模板
 // 在com.js中暴露所有模块，打包的时候未使用到的模块会自动去除



base_com_js__WEBPACK_IMPORTED_MODULE_0__[/* ibase */ "a"].init({
  dir: 'portrait',
  lock: true
});
$(document).ready(function () {
  //-----------------------------------------定义和初始化变量----------------------------------------
  var articleBox = $('article');
  var loadBox = $('aside#loadBox');
  var windowScale = window.innerWidth / 750;
  var UserInfo; //----------------------------------------页面初始化----------------------------------------

  base_com_js__WEBPACK_IMPORTED_MODULE_0__[/* icom */ "b"].init(init); //初始化

  base_com_js__WEBPACK_IMPORTED_MODULE_0__[/* icom */ "b"].screenScrollUnable(); //如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为

  articleBox.fadeTo("slow", 1); // 显示页面

  function init() {
    requestAnimationFrame(function () {
      if (window.Data) Data.OAuth.Login(userGetted);else userGetted({
        errcode: 0,
        errmsg: 'ok',
        result: {
          OpenID: 'xxxx-xxxx-xxxx',
          Nickname: "Nickname",
          HeadImage: 'https://wx.qlogo.cn/mmopen/vi_32/l1R1ORryeZaAU5pwF4iavDQc04aGPC6FdJOiccHHzTbyDBIjGDJjicib1sVOXgYLjkjt3NTks92TMybeGvPgw1mjPA/132'
        }
      });
    });
  } //edn func
  //----------------------------------------微信用户登录验证----------------------------------------	


  function userGetted(res) {
    if (res.errcode == 0) {
      UserInfo = res.result;
      UserInfo.HeadImage = UserInfo.HeadImage != '' ? UserInfo.HeadImage : 'https://wx.qlogo.cn/mmopen/vi_32/l1R1ORryeZaAU5pwF4iavDQc04aGPC6FdJOiccHHzTbyDBIjGDJjicib1sVOXgYLjkjt3NTks92TMybeGvPgw1mjPA/132';
      console.log('UserInfo', UserInfo);
      load_handler();
    } //end if
    else {
        console.log(res.errmsg);
      } //end else

  } //end func
  //----------------------------------------加载页面图片----------------------------------------


  var loadPage = $('aside#loadPage');
  var loadPagePer = loadPage.find('.per');

  function load_handler() {
    var loader = new PxLoader();
    loader.addImage(__webpack_require__(2)); //实际加载进度

    loader.addProgressListener(function (e) {
      var per = Math.round(e.completedCount / e.totalCount * 50);
      load_set(per);
    });
    loader.addCompletionListener(function () {
      load_timer(50); //模拟加载进度

      loader = null;
    });
    loader.start();
  } //end func
  //模拟加载进度


  function load_timer(per) {
    per = per || 0;
    per += base_com_js__WEBPACK_IMPORTED_MODULE_0__[/* imath */ "c"].randomRange(1, 3);
    per = per > 100 ? 100 : per;
    load_set(per);
    if (per == 100) setTimeout(init_handler, 200);else setTimeout(load_timer, 33, per);
  } //edn func


  function load_set(per) {
    if (loadPagePer.length > 0) loadPagePer.html(per + '%');
  } //edn func
  //----------------------------------------页面逻辑代码----------------------------------------


  function init_handler() {
    console.log('init handler');
    if (loadPage.length > 0) base_com_js__WEBPACK_IMPORTED_MODULE_0__[/* icom */ "b"].fadeOut(loadPage, 500, function () {
      loadPage.remove();
    });
    index_handler();
  } //end func
  //----------------------------------------index----------------------------------------


  var indexBox = $('section.index');

  function index_handler() {
    console.log('index_handler');
    indexBox.show();
    base_com_js__WEBPACK_IMPORTED_MODULE_0__[/* imonitor */ "d"].add({
      label: '首页'
    }); //添加监测
  } //end func

}); //end ready

/***/ })

/******/ });