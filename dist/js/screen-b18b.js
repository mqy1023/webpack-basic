/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ibase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return os; });
//2018.10.17
//-----------------------------------os
function importOS() {
  var userAgent = navigator.userAgent;
  var os = {};
  os.userAgent = userAgent;
  os.android = userAgent.match(/(Android)\s+([\d.]+)/) || userAgent.match(/Silk-Accelerated/) ? true : false;
  os.ipad = userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
  os.iphone = !os.ipad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false;
  os.ios = os.ipad || os.iphone;
  os.wp = userAgent.match(/Windows Phone/) || userAgent.match(/IEMobile/) ? true : false;
  os.supportsTouch = window.DocumentTouch && document instanceof window.DocumentTouch || 'ontouchstart' in window; //	if(os.ios) os.iosVer = parseInt(userAgent.match(/OS\s\d+_/)[0].match(/\d+_/)[0]);

  os.weixin = userAgent.match(/MicroMessenger/) ? true : false;

  if (os.weixin) {
    var ver = userAgent.match(/MicroMessenger\/\d+.\d+.\d+/)[0].match(/\d+.\d+.\d+/)[0].split('.');
    os.weixinVer = 0;

    for (var i = 0; i < ver.length; i++) {
      os.weixinVer += parseInt(ver[i]) * Math.pow(10, ver.length - i - 1);
    }
  } //edn if


  os.wxApp = window.__wxjs_environment == 'miniprogram' || userAgent.match(/miniprogram/) || userAgent.match(/miniProgram/) ? true : false;
  os.weibo = userAgent.match(/Weibo/) || userAgent.match(/weibo/) ? true : false;
  os.ali = userAgent.match(/AliApp/) ? true : false;
  os.alipay = os.ali && userAgent.match(/Alipay/) ? true : false;
  os.taobao = os.ali && userAgent.match(/WindVane/) ? true : false;
  os.tianmao = os.ali && userAgent.match(/Tmall/) ? true : false;
  os.netease = userAgent.match(/NewsApp/) ? true : false;
  os.facebook = userAgent.match(/(FB)/) ? true : false;
  os.baidu = userAgent.match(/Baidu/) ? true : false;
  os.safari = os.ios && userAgent.match(/Safari/) ? true : false;
  os.chrome = userAgent.match(/Chrome/) ? true : false;
  os.firefox = userAgent.match(/Firefox/) ? true : false;
  os.ie = document.documentMode;
  os.edge = userAgent.match(/Edge/) ? true : false;
  os.pc = !(os.android || os.ios || os.wp);
  os.oppo = false;
  os.oppoBrowser = false;
  os.oppoApp = false;
  os.oppoR15 = false;

  if (os.ios) {
    os.iphoneX = screen.width == 375 && screen.height == 812 || screen.width == 375 && window.innerHeight >= 635 || window.innerWidth == 724 && window.innerHeight == 375 || window.innerWidth == 375 && window.innerHeight == 724 || window.innerWidth == 812 && window.innerHeight == 343 || window.innerWidth == 343 && window.innerHeight == 812;
    os.IPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
    os.IPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;
    os.iphoneXFull = os.iphoneX && window.innerHeight > 667;
    os.iphone6Plus = screen.width == 414 && screen.height == 736 || screen.width == 414 && window.innerHeight >= 622;
    os.iphone6 = screen.width == 375 && screen.height == 667 || screen.width == 375 && window.innerHeight <= 603;
    os.iphone5 = screen.width == 320 && screen.height == 568 || screen.width == 320 && window.innerHeight >= 460;
    os.iphone4 = screen.width == 320 && screen.height == 480 || screen.width == 320 && window.innerHeight <= 450;
  } //edn if
  else if (os.android) {
      requestAnimationFrame(function () {
        os.screen159 = screen.width == 360 && window.innerHeight < 540;
        os.screen189 = screen.width == 360 && window.innerHeight > 590 || screen.width == 393 && window.innerHeight > 660;
      });
      os.miui = userAgent.match(/MI/) || userAgent.match(/Redmi/) ? true : false;
      os.huawei = userAgent.match(/HUAWEI/) ? true : false;
      os.oppo = userAgent.match(/OPPO/) ? true : false;
      os.oppoBrowser = userAgent.match(/OppoBrowser/) ? true : false;
      os.oppoApp = os.oppo && !os.oppoBrowser && !!window.JSCallJava;
      os.oppoR15 = userAgent.match(/PAAM00/) || userAgent.match(/PAAT00/) || userAgent.match(/PACM00/) || userAgent.match(/PACT00/) ? true : false;
      os.vivo = userAgent.match(/vivo/) ? true : false;
    } //edn if


  return os;
} //end func
//2018.10.23
//-----------------------------------base


function importBase() {
  var base = {};
  base.dir = 'portrait';
  base.lock = false;
  base.screenWidth = 750;
  base.scrollTop = -1;
  base.iphoneXOffsetLandscape = 44; //以iphoneX在微信横屏下有效内容区域724x343为准，并同比缩放对齐iphonePlus的739x350

  base.iphoneXOffsetPortrait = 35;
  base.bleedScale = 1;

  base.init = function (options) {
    var defaults = {
      dir: 'portrait',
      wd: 1206,
      ht: 750,
      scale: 'cover',
      lock: true
    }; //dir：锁定方向、wd：设计宽度、ht：设计高度、scale：缩放模式(cover,contain,full)、lock：假横屏锁定

    var opts = extend(defaults, options);
    console.log(opts);
    this.dir = opts.dir;
    this.simulation = window.orientation === undefined;
    this.landscapeWidth = opts.wd;
    this.landscapeHeight = opts.ht;
    this.landscapeScaleMode = opts.scale;
    this.screenLock = opts.lock;
    this.screenLock = this.simulation && this.dir == 'landscape' ? false : this.screenLock;
    console.log('simulation:' + this.simulation);
    console.log('screenLock:' + this.screenLock);
    this.debug = parseInt(this.getQueryString('debug')) || 0;
    console.log('ibase debug:' + base.debug);

    if (this.debug) {
      base.load('js/base/vConsole.min.js', 'body', function () {
        this.Console = new VConsole();
      });
    }

    if (this.dir == 'portrait') {
      font_resize();
      window.addEventListener("resize", window_fontResize, false);
      document.write("<aside class=\"turnBoxPortrait\" id=\"turnBox\"><div class=\"phone\"><img src=\"".concat(__webpack_require__(2), "\"><i class=\"yes\"></i><i class=\"no\"></i></div><p>\u7AD6\u5C4F\u4F53\u9A8C\u66F4\u4F73</p></aside>"));
      this.turnBox = document.getElementById("turnBox");

      if (this.screenLock) {
        if (this.getOrient(true) == 'landscape') {
          requestAnimationFrame(function () {
            this.turnBox.style.display = "block";
            this.lock = true;
          });
        } //edn if


        window.addEventListener("orientationchange", portait_lock, false);
      } //edn if

    } //edn if
    else {
        document.write("<aside class=\"turnBoxLandscape\" id=\"turnBox\"><div class=\"lock\"><span></span><span></span></div><div class=\"sign\"><span>\u7AD6\u6392\u65B9\u5411\u9501\u5B9A\uFF1A\u5173\u95ED</span><span>\u7AD6\u6392\u65B9\u5411\u9501\u5B9A\uFF1A\u6253\u5F00</span></div><div class=\"phone\"><img src=\"".concat(__webpack_require__(2), "\"><i class=\"yes\"></i><i class=\"no\"></i></div><p>\u9501\u5B9A\u7AD6\u5C4F\u4F53\u9A8C\u66F4\u4F73</p></aside>"));
        this.turnBox = document.getElementById("turnBox");

        if (this.screenLock) {
          if (this.getOrient(true) == 'landscape') {
            requestAnimationFrame(function () {
              this.turnBox.style.display = "block";
              this.lock = true;
            });
          } //edn if


          window.addEventListener("orientationchange", landscape_lock, false);
        } //edn if

      } //end else

  }; //end func


  function window_fontResize(e) {
    font_resize();
    setFrameout(font_resize, 10);
  } //edn func


  function font_resize() {
    var size = document.documentElement.clientWidth / base.screenWidth * 100;
    document.querySelector('html').style.fontSize = size + 'px';
  } //edn func


  function extend(obj1, obj2) {
    if (obj2 && Object.keys(obj2).length > 0) {
      for (var key in obj1) {
        if (obj2.hasOwnProperty(key)) continue; //有相同的属性则略过 

        obj2[key] = obj1[key];
      } //edn for


      return obj2;
    } //edn if
    else return obj1;
  } //edn func


  base.unlockScreen = function () {
    this.screenLock = false;
    if (this.dir == 'portrait') window.removeEventListener("orientationchange", portait_lock, false);else if (this.screenLock) window.removeEventListener("orientationchange", landscape_lock, false);
    if (this.turnBox) this.turnBox.style.display = 'none';
    document.body.scrollTop = 0;
  }; //end func


  base.lockScreen = function () {
    base.screenLock = true;

    if (this.dir == 'portrait') {
      if (this.dir != base.getOrient(true)) {
        this.turnBox.style.display = "block";
        this.lock = true;
      } //edn if


      window.addEventListener("orientationchange", portait_lock, false);
    } //edn if
    else if (this.screenLock) {
        if (base.getOrient(true) == 'landscape') {
          this.turnBox.style.display = "block";
          this.lock = true;
        } //edn if


        window.addEventListener("orientationchange", landscape_lock, false);
      } //edn if

  }; //end func


  base.getOrient = function (resize) {
    resize = resize || 0;
    if (resize) var dir = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';else var dir = window.orientation == 90 || window.orientation == -90 ? 'landscape' : 'portrait';
    console.log('window orientation:' + dir);
    return dir;
  }; //end func


  function landscape_lock(e) {
    if (base.getOrient() == 'landscape') {
      base.turnBox.style.display = "block";
      base.lock = true;
    } //edn if
    else {
        base.turnBox.style.display = 'none';
        base.lock = false;
      } //end else

  } //end func


  function portait_lock(e) {
    if (base.dir != base.getOrient()) {
      base.turnBox.style.display = 'block';
      base.lock = true;

      if (os.ios) {
        if (base.scrollTop == -1 && document.body.scrollTop > 0) {
          base.scrollTop = document.body.scrollTop;
          document.body.scrollTop = 0;
        } //edn if

      } //end if

    } //edn if
    else {
        base.turnBox.style.display = 'none';
        base.lock = false;

        if (os.ios) {
          if (base.scrollTop != -1) {
            document.body.scrollTop = base.scrollTop;
            base.scrollTop = -1;
          } //edn if

        } //edn if

      } //end else

  } //end func


  base.load = function (f, shell, callback, nocache) {
    nocache = nocache != null ? nocache : true;
    var file = get_filetype(f, nocache);
    if (file.type == "css") this.loadCss(file.src, shell, callback);else if (file.type == "js") this.loadJs(file.src, shell, callback);
  }; //end func


  base.loadCss = function (src, shell, callback) {
    shell = shell || 'head';
    var fileref = document.createElement('link');
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", src);
    document.querySelector(shell).appendChild(fileref);
    if (callback) fileref.onload = callback;
  }; //edn func


  base.loadJs = function (src, shell, callback) {
    shell = shell || 'body';
    var fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", src);
    document.querySelector(shell).appendChild(fileref);
    if (callback) fileref.onload = callback;
  }; //edn func


  base.creatNode = function (nodeName, idName, className, innerHTML, wrapNode) {
    nodeName = nodeName || 'div';
    className = className || '';
    idName = idName || '';
    innerHTML = innerHTML || '';
    wrapNode = wrapNode || document.querySelector('body');
    var newNode = document.createElement(nodeName);
    if (className != '') newNode.className = className;
    if (idName != '') newNode.id = idName;
    if (innerHTML != '') newNode.innerHTML = innerHTML;
    wrapNode.appendChild(newNode);
  }; //end func


  base.getUrl = function (url) {
    var hmsr = getQueryString('hmsr');
    hmsr = hmsr || '';
    var utm_source = getQueryString('utm_source');
    utm_source = utm_source || '';

    if (url && url != '') {
      url += (hmsr != '' ? (url.indexOf('?') == -1 ? '?' : '&') + 'hmsr=' + hmsr : '') + (utm_source != '' ? '&utm_source=' + utm_source : '');
      location.href = url;
    } //end if

  }; //edn func
  //获得http url参数


  base.getQueryString = function (name) {
    if (name && name != '') {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]);
      return null;
    } //end if
    else return null;
  }; //end func


  function get_filetype(f, nocache) {
    nocache = nocache != null ? nocache : true;
    var tmp = f.split('.');
    var type = tmp[tmp.length - 1];
    var src = f + (nocache ? '?v=' + Math.random() : '');
    return {
      type: type,
      src: src
    };
  } //end func


  function setFrameout(callback, frame) {
    frame = frame || 0;
    var now = 0;
    timer_handler();

    function timer_handler() {
      now++;
      var timeup = now >= frame;
      if (timeup) callback();else requestAnimationFrame(timer_handler);
    } //end func

  } //edn func


  return base;
} //end func


var ibase = importBase();
var os = importOS();

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAAClBAMAAADSV9w3AAAAG1BMVEUAAAD////////////////////////////////rTT7CAAAACHRSTlMAUOwQfTLGCc+Sdr4AAAC4SURBVFjD7di9CsIwFMXxgw7tA1RwFKeMoiCOFSXmBdwDLh2dnK1guI+tBT+gDj3SpcP5r/kRws12kXlnROkAXIwrnRGMrETF0ghjm/3Q/TvfOri2aY1PoYPa5PiqsC76bYh0zuQaWoMpFxUVFRUVFRUVFRUVFRUVFRUVFRUVFf2Xrpg2w1is96LbgqUnYM3RBCBzFL3j2ZSisaE5T0c9b+Xf6vgJVOxcIwL7WyWWxnVbYOwpmXZ4AKZniADCyge5AAAAAElFTkSuQmCC"

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_common_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _css_common_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_common_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var base_base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


var articleBox = $('article');
articleBox.fadeTo("slow", 1); // 显示页面

window.addEventListener('resize', window_orientationchange, false);
window.addEventListener('orientationchange', window_orientationchange, false);
window_orientationchange();
console.log('window history', window.history);
console.log('window history', window.history);

if (window.history.length == 2) {} //edn if


function window_orientationchange(event) {
  var dir = base_base_js__WEBPACK_IMPORTED_MODULE_1__[/* ibase */ "a"].getOrient();
  document.getElementById('screenWidth').innerHTML = screen.width;
  document.getElementById('screenHeight').innerHTML = screen.height;
  document.getElementById('innerWidth').innerHTML = document.documentElement.clientWidth;
  document.getElementById('innerHeight').innerHTML = document.documentElement.clientHeight;
  document.getElementById('devicePixelRatio').innerHTML = window.devicePixelRatio;
  document.getElementById('articleWidth').innerHTML = document.querySelector('article').clientWidth;
  document.getElementById('articleHeight').innerHTML = document.querySelector('article').clientHeight;
} //end func

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });