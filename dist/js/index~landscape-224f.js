(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],[
/* 0 */
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return icom; });
/* unused harmony export ishare */
/* harmony import */ var jquery_transit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var jquery_transit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery_transit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var pxloader_PxLoaderImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var pxloader_PxLoaderImage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pxloader_PxLoaderImage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var base_base_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return base_base_js__WEBPACK_IMPORTED_MODULE_2__["a"]; });

/* harmony import */ var base_math_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return base_math_js__WEBPACK_IMPORTED_MODULE_3__["a"]; });

/* harmony import */ var base_audio_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var base_monitor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "d", function() { return base_monitor_js__WEBPACK_IMPORTED_MODULE_5__["a"]; });







var ishare = importShare();
var icom = importCom(); //-------------------------------------------------------自定义分享内容

ishare.wxId = 'wx1c1f89b6f490b8e7'; //微信 appid

ishare.tbId = ''; //手淘 appid

var hrefs = window.location.href.split('?');
ishare.url = hrefs[0].substr(0, hrefs[0].lastIndexOf('/') + 1);
ishare.content = {
  link: ishare.url,
  image: ishare.url + 'images/share.jpg?v=' + Math.random(),
  title: $('title').html(),
  friend: '发送给朋友的分享文案',
  timeline: '发送到给朋友圈的分享文案',
  weibo: '发送到微博的分享文案'
};
console.log(ishare.content);

if (base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* os */ "b"].weixin) {
  ishare.from = icom.getQueryString('from');
  ishare.from = ishare.from || 'friend';
  ishare.from = ishare.from == 'groupmessage' || ishare.from == 'singlemessage' ? 'friend' : ishare.from;
  console.log('微信分享来源：' + ishare.from);
  ishare.wxSign();
} // com.js


function importCom() {
  var com = {}; //初始化

  com.init = function (callback) {
    var article = $('article');

    if (base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].dir == 'portrait') {
      lock_dected();
    } else {
      html_resize();
      $(window).on('resize', window_orientation);
      lock_dected();
    }

    function lock_dected() {
      if (base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].lock) requestAnimationFrame(lock_dected);else if (callback) callback();
    }

    function window_orientation(e) {
      if (base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* os */ "b"].ios) for (var i = 0; i < 3; i++) {
        setTimeout(html_resize, i * 150);
      } else html_resize();
    }

    function html_resize() {
      var dir = base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].getOrient(true);

      if (dir == 'portrait') {
        if (base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeScaleMode == 'cover' || base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeScaleMode == 'contain') {
          var size = base_math_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].autoSize([base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeHeight, base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeWidth], [window.innerWidth, window.innerHeight], base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeScaleMode);
          var scale = size[0] / base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeHeight;
          console.log('window size:' + window.innerHeight + '/' + window.innerWidth);
          console.log('auto scale:' + scale);
          base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landScapeScaleX = base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landScapeScaleY = scale;
          article.css({
            width: base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeWidth,
            height: base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeHeight,
            rotate: 90,
            scale: scale,
            x: base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* os */ "b"].iphoneX ? 0 : (window.innerHeight / scale - base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeWidth) * 0.5,
            y: -base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeHeight + (base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeHeight - window.innerWidth / scale) * 0.5
          });
        } else {
          var scale = [window.innerWidth / base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeHeight, window.innerHeight / base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeWidth];
          console.log('window size:' + window.innerHeight + '/' + window.innerWidth);
          console.log('auto scale:' + scale);
          base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landScapeScaleX = scale[0];
          base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landScapeScaleY = scale[1];
          article.css({
            width: base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeWidth,
            height: base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeHeight,
            rotate: 90,
            scaleX: scale[1],
            scaleY: scale[0],
            x: 0,
            y: -base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeHeight
          });
        }
      } else {
        console.log('screen landscape');

        if (base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeScaleMode == 'cover' || base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeScaleMode == 'contain') {
          var size = base_math_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].autoSize([base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeWidth, base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeHeight], [base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* os */ "b"].iphoneX && window.innerWidth > 724 ? window.innerWidth - base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].iphoneXOffsetLandscape * 2 : window.innerWidth, window.innerHeight], base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeScaleMode);
          var scale = size[0] / base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeWidth;
          console.log('window size:' + window.innerWidth + '/' + window.innerHeight);
          console.log('auto scale:' + scale);
          base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landScapeScaleX = base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landScapeScaleY = scale;
          article.css({
            width: base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeWidth,
            height: base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeHeight,
            rotate: 0,
            scale: scale,
            x: (window.innerWidth / scale - base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeWidth) * 0.5 + base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* os */ "b"].iphoneX && window.innerWidth > 724 ? base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].iphoneXOffsetLandscape / scale : 0,
            y: (window.innerHeight / scale - base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeHeight) * 0.5
          });
        } else {
          var scale = [window.innerWidth / base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeWidth, window.innerHeight / base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeHeight];
          console.log('window size:' + window.innerHeight + '/' + window.innerWidth);
          console.log('auto scale:' + scale);
          base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landScapeScaleX = scale[0];
          base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landScapeScaleY = scale[1];
          article.css({
            width: base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeWidth,
            height: base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeHeight,
            rotate: 0,
            scaleX: scale[0] + base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* os */ "b"].iphoneX ? base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].iphoneXOffsetLandscape / scale[0] : 0,
            scaleY: scale[1],
            x: 0,
            y: 0
          });
        }
      }
    }
  }; //解锁屏幕滑动


  com.screenScrollEnable = function () {
    var article = $('article');
    var html = $('html');

    if (base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].dir == 'portrait') {
      article.css({
        'overflow-y': 'auto'
      });
      if (base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* os */ "b"].ios) html.css({
        'position': 'relative'
      });
      $(document).off('touchmove', noScroll);
    } else {
      article.off('touchmove', noScroll);
    }
  }; //锁定屏幕滑动


  com.screenScrollUnable = function () {
    var article = $('article');
    var html = $('html');

    if (base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].dir == 'portrait') {
      article.css({
        'overflow-y': 'hidden'
      });
      if (base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* os */ "b"].ios) html.css({
        'position': 'fixed'
      });
      $(document).on('touchmove', noScroll);
    } else {
      article.on('touchmove', noScroll);
    }
  };

  function noScroll(e) {
    e.preventDefault();
  } //取代jquery的fadeIn


  com.fadeIn = function (obj, dur, callback) {
    if (obj) {
      dur = dur || 500;
      obj.show().css({
        opacity: 0
      }).transition({
        opacity: 1
      }, dur, function () {
        if (callback) callback($(this));
      });
    }
  }; //取代jquery的fadeOut


  com.fadeOut = function (obj, dur, callback) {
    if (obj) {
      dur = dur || 500;
      obj.transition({
        opacity: 0
      }, dur, function () {
        $(this).hide().css({
          opacity: 1
        });
        if (callback) callback($(this));
      });
    }
  }; //打开弹窗，会自动寻找a.close对象绑定关闭事件，并在关闭时执行回调


  com.popOn = function (obj, options) {
    if (obj && obj.length > 0) {
      var defaults = {
        closeEvent: 'touchend',
        closeType: 'button',
        closeBtn: obj.find('a.close'),
        onClose: function onClose() {},
        remove: false
      };
      var opts = $.extend(defaults, options);
      if (opts.text) obj.find('.text').html(opts.text);
      if (opts.fade) com.fadeIn(obj, opts.fade);else obj.show();
      if (opts.closeBtn.length > 0 && opts.closeType == 'button') opts.closeBtn.one(opts.closeEvent, obj_close);else obj.one(opts.closeEvent, obj_close);
      obj.on('close', obj_close);
    }

    function obj_close(e) {
      if (opts.closeBtn.length > 0 && opts.closeType == 'button') opts.closeBtn.off(opts.closeEvent, obj_close);else obj.off(opts.closeEvent, obj_close);
      if (opts.fade) com.fadeOut(obj, opts.fade, function () {
        if (opts.remove) obj.remove();
      });else if (opts.remove) obj.remove();else obj.hide();
      obj.off('close', obj_close);
      opts.onClose(obj);
    }
  }; //关闭使用popOn方法打开的弹窗


  com.popOff = function (obj) {
    if (obj && obj.length > 0) obj.trigger('close');
  }; //取代系统alert


  com.alert = function (text, callback) {
    if (text && text != '') {
      var box = $('<aside class="alertBox"><div><p class="text"></p><p class="btn"><a href="javascript:;" class="close">确定</a></p></div></aside>').appendTo(base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].dir == 'landscape' ? 'article' : 'body');
      com.popOn(box, {
        text: text,
        onClose: callback,
        remove: true,
        closeEvent: 'click'
      });
    }
  }; //带有“取消”和“确认”按钮的对话框


  com.confirm = function (text, callbackConfirm, callbackCancel, btnCancelText, btnConfirmText) {
    text = text || '';
    btnCancelText = btnCancelText || '取消';
    btnConfirmText = btnConfirmText || '确认';

    if (text != '') {
      var box = $('<aside class="confirmBox"><div><p class="text">' + text + '</p><p class="btn"><a href="javascript:;" class="cancel">' + btnCancelText + '</a><a href="javascript:;" class="confirm">' + btnConfirmText + '</a></p></div></aside>').appendTo(base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].dir == 'landscape' ? 'article' : 'body');
      var btn = box.find('a');
      btn.one('click', function (e) {
        if ($(this).index() == 0 && callbackCancel) callbackCancel();else if ($(this).index() == 1 && callbackConfirm) callbackConfirm();
        btn.off();
        box.remove();
      });
    }
  }; //获得http url参数


  com.getQueryString = function (name) {
    if (name && name != '') {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]);
      return null;
    } else return null;
  }; //获取路径


  com.getPath = function (path) {
    if (path && path != '') return path.substr(0, path.lastIndexOf('/') + 1);else return false;
  }; //载入图片函数


  com.imageLoad = function (src, callback) {
    if (src) {
      var loader = new PxLoader();
      if ($.type(src) === "string" && src != '') loader.addImage(src);else if ($.type(src) === "array" && src.length > 0) {
        for (var i = 0; i < src.length; i++) {
          loader.addImage(src[i]);
        }
      }
      loader.addCompletionListener(function () {
        loader = null;
        if (callback) callback(src);
      });
      loader.start();
    }
  }; //常用正则


  com.checkStr = function (str, type) {
    if (str && str != '') {
      type = type || 0;

      switch (type) {
        case 0:
          var reg = new RegExp(/^1\d{10}$/); //手机号码验证

          break;

        case 1:
          var reg = new RegExp(/^\d{6}$/); //6位验证码验证

          break;

        case 2:
          var reg = new RegExp(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/); //匹配EMAIL

          break;

        case 3:
          var reg = new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/); //匹配身份证

          break;

        case 4:
          var reg = new RegExp(/^\d+$/); //是否为0-9的数字

          break;

        case 5:
          var reg = new RegExp(/^[a-zA-Z\u0391-\uFFE5]*[\w\u0391-\uFFE5]*$/); //不能以数字或符号开头

          break;

        case 6:
          var reg = new RegExp(/^\w+$/); //匹配由数字、26个英文字母或者下划线组成的字符串

          break;

        case 7:
          var reg = new RegExp(/^[\u0391-\uFFE5]+$/); //匹配中文

          break;

        case 8:
          var reg = new RegExp(/^[a-zA-Z\u0391-\uFFE5]+$/); //不能包含数字和符号

          break;
      } //end switch


      if (reg.exec($.trim(str))) return true;else return false;
    } else return false;
  }; //解决ios下input、textarea无法自动失去焦点的问题


  com.keyboard = function (input) {
    input = input || $('input,textarea,[contenteditable="true"]');

    if (input.length > 0) {
      var body = $('body');
      if (base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* os */ "b"].ios) input.on('focus', input_focus).on('blur', input_blur);else body.height(body[0].clientHeight);
    }

    function input_focus(e) {
      body.one('touchend', ios_blur);
    } //edn event


    function input_blur() {
      $(window).scrollTop(0);
    } //edn event


    function ios_blur(e) {
      if (e.target != input[0]) input.blur();
    } //edn event

  }; //解决ios下select无法自动失去焦点的问题


  com.select = function (select) {
    select = select || $('select');

    if (select.length > 0) {
      if (base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* os */ "b"].ios) {
        select.on('focus', function (e) {
          $(document).one('touchend', ios_select);
        });
      }
    }

    function ios_select(e) {
      if (e.target != select[0]) select.blur();
    }
  }; //物体抖动


  com.shake = function (box, options) {
    if (box && box.length > 0) {
      var defaults = {
        rx: 5,
        ry: 5,
        delay: 33,
        now: 0,
        max: 5,
        restore: true
      };
      var opts = $.extend(defaults, options);
      var x = base_math_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].randomRange(-opts.rx, opts.rx);
      var y = base_math_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].randomRange(-opts.ry, opts.ry);
      box.css({
        x: x,
        y: y
      });
      opts.now++;

      if (opts.now > opts.max) {
        if (opts.restore) box.css({
          x: 0,
          y: 0
        });
        if (opts.onComplete) opts.onComplete();
      } else setTimeout(com.shake, opts.delay, box, opts);
    }
  }; //获取textarea里的回车和空格


  com.textareaGet = function (textarea, row) {
    row = row || 0;
    var str1 = textarea.val();
    if (str1 == '') return '';else {
      var str2 = str1.replaceAll("\n", "<br/>");
      return row_cut(str2, row);
    }
  }; //输入textarea里的回车和空格


  com.textareaSet = function (textarea, str) {
    if (str == '') textarea.val('');else textarea.val(str.replaceAll("<br/>", "\n"));
  }; //限制textarea输入文字的行数


  com.textareaLock = function (textarea) {
    if (textarea && textarea.length > 0) {
      var timer;
      var row = parseInt(textarea.attr('rows')) || 0;
      var col = parseInt(textarea.attr('cols')) || 0;
      var max = parseInt(textarea.attr('maxlength')) || 0;
      max = max == 0 ? row * col : max;
      if (row > 0 && col > 0 && max > 0) textarea.on('focus', textarea_focus).on('blur', textarea_blur);
    }

    function textarea_focus(e) {
      timer = requestAnimationFrame(textarea_lock);
    }

    function textarea_blur(e) {
      cancelAnimationFrame(timer);
      var first = com.textareaGet(textarea, row);

      if (first.indexOf('<br/>') != -1) {
        var str2 = first.split('<br/>');
        var str3 = '';

        for (var i = 0; i < str2.length; i++) {
          str3 += col_break(str2[i], col);
          if (i < str2.length - 1) str3 += '<br/>';
        } //end for


        str3 = row_cut(str3, row);

        var _final = str3.replaceAll("<br/>", "\n");

        textarea.val(_final);
      }
    }

    function textarea_lock() {
      var first = com.textareaGet(textarea, row);
      if (first.indexOf('<br/>') == -1) textarea.attr({
        maxlength: max
      });else textarea.attr({
        maxlength: max + (first.split('<br/>').length - 1) * 2
      });
    }
  };

  function row_cut(str, row) {
    row = row || 0;
    var str2 = str.split('<br/>');
    if (row <= 0 || str2.length <= row) return str;else {
      var str3 = '';

      for (var i = 0; i < row; i++) {
        str3 += str2[i];
        if (i < row - 1) str3 += '<br/>';
      } //edn for


      return str3;
    }
  }

  function col_break(str, col) {
    var line = Math.ceil(str.length / col);
    if (line == 1) return str;else {
      var str1 = '';

      for (var i = 0; i < line; i++) {
        if (i == 0) str1 += str.substr(0, col) + '<br/>';else if (i < line - 1) str1 += str.substr(i * col, col) + '<br/>';else str1 += str.substr(i * col);
      } //edn for


      return str1;
    }
  }

  function col_cut(str, col) {
    if (str.length > col) return str.substr(0, col);else return str;
  } //限制textarea输入文字的行数


  com.textareaUnlock = function (textarea) {
    textarea.off();
  }; //切割单行文字成几行


  com.textToMulti = function (str, col) {
    if (str != '' && col > 1) {
      if (str.indexOf('\n') == -1 && str.length > col) {
        var str1 = '';
        var line = Math.ceil(str.length / col);
        console.log('line:' + line);

        for (var i = 0; i < line; i++) {
          if (i < line - 1) str1 += str.substr(i * col, col) + '\n';else str1 += str.substr(i * col);
        } //edn for


        return str1;
      } else return str;
    } else return null;
  }; //拼带参数的url链接


  com.url = function (url, para) {
    var now = -1;

    for (var key in para) {
      now++;
      if (now == 0) url += '?';else url += '&';
      url += key + '=' + para[key];
    } //end for


    return url;
  }; //以帧为单位的setTimeout


  com.setTimeout = function (callback, frame) {
    if (frame > 0 && callback) return setTimer(callback, frame, false);
  };

  com.clearTimeout = function (timer) {
    if (timer && timer.timer) clearTimer(timer);
  }; //以帧为单位的setInterval


  com.setInterval = function (callback, frame) {
    if (frame > 0 && callback) return setTimer(callback, frame, true);
  };

  com.clearInterval = function (timer) {
    if (timer && timer.timer) clearTimer(timer);
  };

  function clearTimer(timer) {
    cancelAnimationFrame(timer.timer);
    timer = null;
  }

  function setTimer(callback, frame, interval) {
    var timer = {
      now: 0,
      timer: null
    };
    timer_handler();
    return timer;

    function timer_handler() {
      timer.now++;
      var timeup = timer.now == frame;

      if (timeup) {
        timer.now = 0;
        callback();
      }

      if (interval || !interval && !timeup) timer.timer = requestAnimationFrame(timer_handler);
    }
  } //将canvas转成存在cdn服务器上的远程图片地址


  com.canvas_send = function (canvas, callback, secretkey, type, compress) {
    if (canvas) {
      secretkey = secretkey || 'test';
      type = type || 'jpg';
      compress = compress || 0.95;
      if (type == 'png') var base64 = canvas.toDataURL('image/png');else var base64 = canvas.toDataURL('image/jpeg', compress);
      this.base64_send(base64, callback, secretkey);
    }
  }; //将base64数据格式转成存在cdn服务器上的远程图片地址


  com.base64_send = function (base64, callback, secretkey) {
    if (base64) {
      secretkey = secretkey || 'test';
      $.post('https://tool.h5-x.com/cdn/base64', {
        data: base64,
        key: secretkey
      }, function (resp) {
        if (resp.errcode == 0) {
          if (callback) callback(resp.result);
        } else {
          console.log('errmsg:' + resp.errmsg);
        }
      }, 'json');
    }
  }; //将跨域的远程图片地址转成base64数据格式，解决图片跨域问题


  com.base64_get = function (link, callback, secretkey) {
    if (link) {
      secretkey = secretkey || 'test';
      $.post('http://tool.h5-x.com/image/base64', {
        link: link,
        key: secretkey
      }, function (resp) {
        if (callback) callback(resp);
      }, 'text');
    }
  }; //将字符串转成二维码，返回base64数据格式


  com.qrcode = function (txt, options) {
    var defaults = {
      size: 200,
      color: '000000',
      bg: 'ffffff',
      border: 0,
      error: 0
    };
    var data = $.extend(defaults, options);

    if (txt && txt != '') {
      var src = 'http://tool.h5-x.com/image/qrcode?txt=' + txt + '&size=' + data.size + '&color=' + data.color + '&bg=' + data.bg + '&border=' + data.border + '&error=' + data.error + (data.logo ? '&logo=' + data.logo : '');
      return src;
    } else return null;
  }; //将字符串转成条形码，返回base64数据格式


  com.barcode = function (txt, options) {
    var defaults = {
      width: 400,
      height: 200,
      color: '000000',
      bg: 'ffffff',
      pure: true
    };
    var data = $.extend(defaults, options);

    if (txt && txt != '') {
      var src = 'http://tool.h5-x.com/image/barcode?txt=' + txt + '&width=' + data.width + '&height=' + data.height + '&color=' + data.color + '&bg=' + data.bg + '&pure=' + data.pure;
      return src;
    } else return null;
  }; //一键复制字符串到剪贴板


  com.clipboard = function (box, val, onComplete, onError) {
    var support = !!document.queryCommandSupported;
    console.log('support:' + support);

    if (support) {
      if (box.length > 0 && val != '') {
        box.attr({
          'data-copy': val
        }).on('click', {
          callback: onComplete
        }, copyText);
      }
    } else {
      console.log('浏览器不支持复制文本到剪贴板');
      if (onError) onError();
    }
  };

  function copyText(e) {
    var val = $(this).data('copy');
    var input = $('<textarea readonly="readonly"></textarea>').html(val).css({
      position: 'absolute',
      left: 0,
      top: 0,
      width: 1,
      height: 1,
      visible: 'hidden'
    }).appendTo('body');
    input[0].select();
    input[0].setSelectionRange(0, input[0].value.length);
    console.log('copy content:' + input.val());
    document.execCommand('Copy');
    input.remove();
    input = null;
    if (e.data.callback) e.data.callback();
  } //显示页面渲染fps


  com.fpsShow = function (shell, space) {
    space = space || 30;
    space = space < 10 ? 10 : space;
    shell = shell || $('<div id="fpsShow"></div>').appendTo(base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].dir == 'landscape' ? 'article' : 'body');
    requestAnimationFrame(function () {
      fps_dected(new Date().getTime(), -1);
    });

    function fps_dected(last, count) {
      var now = new Date().getTime();
      var fps = Math.round(1000 / (now - last));
      fps = fps > 60 ? 60 : fps;
      count++;

      if (count % space == 0) {
        if (fps >= 40) var classname = 'fpsFast';else if (fps >= 20) var classname = 'fpsNormal';else var classname = 'fpsSlow';
        shell.removeClass().addClass(classname).html('fps:' + fps);
      }

      requestAnimationFrame(function () {
        fps_dected(now, count);
      });
    }
  }; //出血方案


  com.bleed = function (shell, maxSize) {
    shell = shell || $('.articleBleed');
    maxSize = maxSize || [936, 1218];

    if (shell.length > 0) {
      var article = $('article');
      resize_handler();
      $(window).on('resize', shell_resize);
    }

    function shell_resize(e) {
      com.setTimeout(resize_handler, 5);
    }

    function resize_handler() {
      if (window.innerWidth < window.innerHeight) {
        var windowScale = window.innerWidth / 750;
        var scale = article.height() / windowScale / maxSize[1];
        base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].bleedScale = scale;
        shell.css({
          transformOrigin: '50% ' + (base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* os */ "b"].iphoneX ? 0 : '0.15rem'),
          scale: scale
        });
      }
    }
  }; //edn fun
  //为iphoneX加上底部安全区域


  com.FullBar = function (ht) {
    ht = ht || 30;

    if (base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* os */ "b"].FullBar) {
      window_resize();
      $(window).on('resize', window_resize);
    }

    function window_resize(e) {
      if (window.innerHeight > 667) $('article').css({
        height: 'calc( 100% - ' + ht * 0.01 + 'rem )'
      });else $('article').css({
        height: '100%'
      });
    } //end event

  }; //edn fun
  // 缩放适配方案


  com.adaptation = function (scaleType, shell) {
    shell = shell || $('.articleBleed');
    var articleBox = $('article');

    if (shell.length > 0) {
      resize_handler();
      $(window).on('resize', shell_resize);
    }

    function shell_resize(e) {
      com.setTimeout(resize_handler, 5);
    }

    function resize_handler() {
      var w = shell.width(),
          h = shell.height();
      var iw = articleBox.width(),
          ih = articleBox.height(); // xRatio 宽度缩放值 yRatio 高度缩放值

      xRatio = iw / w, yRatio = ih / h, sRatio = 1;

      if (scaleType == 'contain') {
        // 缩放舞台以完全装入父元素					
        sRatio = Math.min(xRatio, yRatio);
      } else if (scaleType == 'cover') {
        // 缩放舞台以完全覆盖父元素						
        sRatio = Math.max(xRatio, yRatio);
      } else if (scaleType == 'width') {
        // 缩放舞台以宽度完全装入父元素				
        sRatio = xRatio;
      } else {
        // 缩放舞台以高度完全装入父元素
        sRatio = yRatio;
      }

      shell.css({
        scale: sRatio
      });
    }
  }; //edn fun
  // 获取开始时间倒结束时间之间n年n月n日


  com.time_valide = function (start_time, end_time) {
    var common_year = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var leap_year = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    end_time = end_time || new Date().Format('yyyy-MM-dd hh:mm:ss'); //验证时间格式

    var reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
    var regExp = new RegExp(reg);

    if (!regExp.test(end_time) || !regExp.test(start_time)) {
      return false;
    } //判断前后时间大小


    var timestamp_start_time = Date.parse(new Date(start_time));
    var timestamp_end_time = Date.parse(new Date(end_time));

    if (timestamp_end_time / 1000 - timestamp_start_time / 1000 < 0) {
      return false;
    } //获取前四位


    var time_info_start = start_time.split(' ');
    var time_info_end = end_time.split(' '); //获取年月日

    var year_month_day_start = time_info_start[0].split('-');
    var year_month_day_end = time_info_end[0].split('-'); //获取时间

    var hour_minute_second_start = time_info_start[1].split(':');
    var hour_minute_second_end = time_info_end[1].split(':');
    var beapart_year = parseInt(year_month_day_end[0]) - parseInt(year_month_day_start[0]); //进行判断时间

    var time_info_1 = parseInt(hour_minute_second_start[2]) + parseInt(hour_minute_second_start[1]) * 60 + parseInt(hour_minute_second_start[0]) * 3600;
    var time_info_2 = parseInt(hour_minute_second_end[2]) + parseInt(hour_minute_second_end[1]) * 60 + parseInt(hour_minute_second_end[0]) * 3600;
    var hour = 0;
    var minute = 0;
    var second = 0;
    var beapart_time = time_info_2 - time_info_1;
    var beapart_day_last = 0;

    if (timestamp_end_time / 1000 - timestamp_start_time / 1000 <= 86400) {
      // 小于一天
      var tim = timestamp_end_time / 1000 - timestamp_start_time / 1000;
      hour = parseInt(tim / 3600);
      minute = parseInt((tim - hour * 60 * 60) / 60);
      second = tim - hour * 60 * 60 - minute * 60;
      return [0, 0, 0, hour, minute, second];
    }

    if (beapart_time < 0) {
      beapart_day = beapart_day - 1;
      beapart_time = time_info_2 + 86400 - time_info_1;
      hour = parseInt(beapart_time / 3600);
      minute = parseInt((beapart_time - hour * 60 * 60) / 60);
      second = beapart_time - hour * 60 * 60 - minute * 60;
      beapart_day_last = 1;
    } else {
      hour = parseInt(beapart_time / 3600);
      minute = parseInt((beapart_time - hour * 60 * 60) / 60);
      second = beapart_time - hour * 60 * 60 - minute * 60;
    } //同一年


    if (beapart_year === 0) {
      var beapart_day = parseInt(year_month_day_end[2]) - parseInt(year_month_day_start[2]);
      var beapart_month = parseInt(year_month_day_end[1]) - parseInt(year_month_day_start[1]);

      if (beapart_day > 0) {
        return [0, beapart_month, beapart_day - beapart_day_last, hour, minute, second];
      } else {
        if (parseInt(year_month_day_end[0]) % 4 === 0) {
          beapart_day = leap_year[parseInt(year_month_day_end[1])] - parseInt(year_month_day_start[2]) + parseInt(year_month_day_end[2]);
        } else {
          beapart_day = common_year[parseInt(year_month_day_end[1])] - parseInt(year_month_day_start[2]) + parseInt(year_month_day_end[2]);
        }

        if (time_info_2 - time_info_1 < 0) {
          beapart_day -= 1;
        }

        return [0, beapart_month - 1, beapart_day - beapart_day_last, hour, minute, second];
      } //非同一年

    } else {
      //判断如果相差一年
      var beapart_day = parseInt(year_month_day_end[2]) - parseInt(year_month_day_start[2]);
      var beapart_month = parseInt(year_month_day_end[1]) - parseInt(year_month_day_start[1]);
      var beapart_year = parseInt(year_month_day_end[0]) - parseInt(year_month_day_start[0]);

      if (beapart_month < 0) {
        beapart_year = beapart_year - 1;
        beapart_month = 12 - parseInt(year_month_day_start[1]) + parseInt(year_month_day_end[1]);
      }

      if (beapart_day > 0) {
        return [beapart_year, beapart_month, beapart_day - beapart_day_last, hour, minute, second];
      } else {
        if (parseInt(year_month_day_end[0]) % 4 === 0) {
          beapart_day = leap_year[parseInt(year_month_day_end[1])] - parseInt(year_month_day_start[2]) + parseInt(year_month_day_end[2]);
        } else {
          beapart_day = common_year[parseInt(year_month_day_end[1])] - parseInt(year_month_day_start[2]) + parseInt(year_month_day_end[2]);
        }

        return [beapart_year, beapart_month - 1, beapart_day - beapart_day_last, hour, minute, second];
      }
    }
  };

  String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
  };
  /**
   * 扩展一个可以指定时间输出格式的 Date 的方法
   * 年(y)可以用 1-4 个占位符、月(M)、日(d)、季度(q)可以用 1-2 个占位符
   * 小时(h)、分(m)、秒(s)、毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
   * @param  fmt  | 格式化表达式
   */


  Date.prototype.Format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }

    return fmt;
  };
  /*按照数组某个字段排序*/


  Array.prototype.bubbleSort = function (key, type) {
    if (key) {
      return this.sort(compare);
    } else {
      return this;
    }

    function compare(obj1, obj2) {
      var val1 = eval('obj1.' + key);
      var val2 = eval('obj2.' + key);

      if (type == 'rise') {
        if (val1 > val2) {
          return -1;
        } else if (val1 < val2) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  };

  return com;
} // share.js


function importShare() {
  var imonitor = window.imonitor || {};
  var share = {};
  share.wxSigned = false;
  share.tbSigned = false;
  share.tbLoaded = 0; //-------------------------------------------------------微信SDK验证

  share.wxSign = function () {
    $.get("http://scrm.h5-x.com/api/jssdk/sign", {
      appid: share.wxId,
      url: location.href
    }, function (data) {
      wx.config({
        debug: false,
        appId: data.appid,
        timestamp: data.timestamp,
        nonceStr: data.noncestr,
        signature: data.signature,
        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard']
      }); //end wx.config

      share.wxSigned = true; //通过微信新SDK验证

      wx.ready(function () {
        wx.showOptionMenu(); //用微信“扫一扫”打开，optionMenu是off状态，默认开启

        share.wxShare();
      }); //end wx.ready
    }, 'json'); //end ajax
  }; //-------------------------------------------------------微信分享函数


  share.wxShare = function () {
    if (share.wxSigned) {
      var sharelink = share.content.link;

      if (localStorage.openid) {
        sharelink = sharelink + (sharelink.indexOf('?') > 0 ? '&' : '?') + 'from_openid=' + localStorage.openid;
      }

      wx.onMenuShareTimeline({
        title: share.content.timeline,
        // 分享标题
        link: sharelink,
        // 分享链接
        imgUrl: share.content.image,
        // 分享图标
        success: function success() {
          // 用户确认分享后执行的回调函数
          if (imonitor.add) imonitor.add({
            label: '分享到朋友圈'
          });
          if (share.wxShareSuccess) share.wxShareSuccess();
        },
        cancel: function cancel() {
          // 用户取消分享后执行的回调函数
          if (share.wxShareCancel) share.wxShareCancel();
        }
      });
      wx.onMenuShareAppMessage({
        title: share.content.title,
        // 分享标题
        desc: share.content.friend,
        // 分享描述
        link: sharelink,
        // 分享链接
        imgUrl: share.content.image,
        // 分享图标
        type: 'link',
        // 分享类型,music、video或link，不填默认为link
        dataUrl: '',
        // 如果type是music或video，则要提供数据链接，默认为空
        success: function success() {
          // 用户确认分享后执行的回调函数
          if (imonitor.add) imonitor.add({
            label: '分享给朋友'
          });
          if (share.wxShareSuccess) share.wxShareSuccess();
        },
        cancel: function cancel() {
          // 用户取消分享后执行的回调函数
          if (share.wxShareCancel) share.wxShareCancel();
        }
      });
    } else setTimeout(share.wxShare, 250);
  }; //-------------------------------------------------------微博站外分享函数


  share.wbShare = function (option) {
    var url,
        txt,
        img,
        imgHtml = '';
    if (option.obj) var btn = option.obj;else var btn = $('a.btnShare');

    if (btn.length > 0) {
      url = option.url || window.location.href;
      txt = option.text || "";
      img = option.image;
      txt = encodeURIComponent(txt);
      url = encodeURIComponent(url);

      if (img && img.length > 0) {
        imgHtml = "&pic=";
        if ($.type(img) === "string") imgHtml += img;else for (var i = 0; i < img.length; i++) {
          imgHtml += img[i];
          if (i < img.length - 1) imgHtml += '||';
        } //end for

        imgHtml += '&searchPic=false';
      } //end for


      btn.attr({
        target: '_blank',
        href: 'http://service.weibo.com/share/share.php?url=' + url + '&title=' + txt + imgHtml
      });
    }
  }; //-------------------------------------------------------一键分享按钮，在微信下弹窗分享提示层，在浏览器下用微博外链式分享


  share.btnShare = function (btn, box) {
    if (btn) var shareBtn = btn;else var shareBtn = $('a.btnShare');
    if (box) var shareBox = box;else var shareBox = $('#shareBox');

    if (shareBtn.length > 0) {
      share.shareBtn = shareBtn;

      if (base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* os */ "b"].weixin) {
        if (shareBox.length == 0) shareBox = $("<aside class=\"shareBox\"><img src=\"".concat(__webpack_require__(17), "\"></aside>")).appendTo(base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].landscapeMode ? 'article' : 'body');
        shareBtn.on('touchend', {
          box: shareBox
        }, shareBtn_click);
      } else share.wbShare({
        obj: shareBtn,
        url: share.content.link,
        text: share.content.weibo,
        image: share.content.image
      });
    }
  };

  function shareBtn_click(e) {
    var shareBox = e.data.box;
    shareBox.show().one('touchend', function (e) {
      $(this).hide();
    });
  } //-------------------------------------------------------重置分享内容


  share.reset = function (opts) {
    if (opts) {
      if (opts.link) share.content.link = opts.link;
      if (opts.image) share.content.image = opts.image + '?v=' + Math.random();
      if (opts.title) share.content.title = opts.title;
      if (opts.friend) share.content.friend = opts.friend;
      if (opts.timeline) share.content.timeline = opts.timeline;
      if (base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* os */ "b"].weixin) wx.ready(function () {
        share.wxShare();
      }); //end wx.ready
      else share.wbShare({
          obj: share.shareBtn,
          url: share.content.link,
          text: share.content.timeline,
          image: share.content.image
        });
    }
  };

  share.hideMenu = function (menuList) {
    wx.ready(function () {
      menuList = menuList || ["menuItem:copyUrl"];
      wx.hideMenuItems({
        menuList: ["menuItem:copyUrl"] // 要隐藏的菜单项

      });
    }); //end wx.ready
  }; //-------------------------------------------------------手淘分享


  share.tbSign = function () {
    if (this.tbId != '') {
      console.log('tbId:' + this.tbId);
      document.write('<meta name="spm-id" content="a1z51.' + this.tbId + '"/>');
      document.write('<meta id="WV.Meta.Share.Title" value="' + this.content.title + '" />');
      document.write('<meta id="WV.Meta.Share.Text" value="' + this.content.timeline + '" />');
      document.write('<meta id="WV.Meta.Share.Image" value="' + this.content.image + '" />');
      base_base_js__WEBPACK_IMPORTED_MODULE_2__[/* ibase */ "a"].loadJs('//g.alicdn.com/tmapp/tida/3.3.26/tida.js?appkey=' + this.tbId, 'body', tbDeccted);
    }
  };

  function tbDeccted() {
    if (Tida) {
      share.Tida = Tida.appinfo.isTaobao || Tida.appinfo.isTmall;
      share.TidaNick = '';
      thLogin();
    } else requestAnimationFrame(tbDeccted);
  }

  function thLogin() {
    Tida.ready({//		 console : 1//1代表开启debug
    }, function (data) {
      console.log('Tida.ready');
      Tida.isLogin(function (data) {
        console.log(JSON.stringify(data));
        console.log(data.isLogin ? '淘宝用户已登录...' : '淘宝用户未登录...');

        if (data.isLogin) {
          Tida.doAuth(function (data) {
            console.log('errorCode:' + data.errorCode);
            console.log('errorMessage:' + data.errorMessage);

            if (data.finish) {
              // 授权成功 可以顺利调用需要授权的接口了
              var options = {
                sellerNick: ""
              };
              Tida.mixNick(options, function (data) {
                console.log(JSON.stringify(data));
                share.TidaNick = data.data.mixnick;
                console.log('TidaNick:' + TidaNick);
              });
            } else {
              // 未能成功授权
              alert('未能成功授权');
            }
          });
        } else {
          alert('请先登录');
        }
      });
    });
  }

  share.tbShare = function (url, title, content, image) {
    //重新自定义手淘分享内容
    Tida.share({
      title: title,
      // 分享标题 在来往和微信好友中有标题显示
      content: content,
      //分享的内容
      url: url,
      // 跳转地址，分享的内容跳转的url
      image: image
    }, function (data) {// 分享接口调用成功，在手机淘宝下面该回调仅代表API执行成功，非分享成功与否的回调。
    });
  };

  return share;
}



/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAAClBAMAAADSV9w3AAAAG1BMVEUAAAD////////////////////////////////rTT7CAAAACHRSTlMAUOwQfTLGCc+Sdr4AAAC4SURBVFjD7di9CsIwFMXxgw7tA1RwFKeMoiCOFSXmBdwDLh2dnK1guI+tBT+gDj3SpcP5r/kRws12kXlnROkAXIwrnRGMrETF0ghjm/3Q/TvfOri2aY1PoYPa5PiqsC76bYh0zuQaWoMpFxUVFRUVFRUVFRUVFRUVFRUVFRUVFf2Xrpg2w1is96LbgqUnYM3RBCBzFL3j2ZSisaE5T0c9b+Xf6vgJVOxcIwL7WyWWxnVbYOwpmXZ4AKZniADCyge5AAAAAElFTkSuQmCC"

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);


//2018.11.28
function importMath() {
  var math = {}; //获得范围内随机整数

  math.randomRange = function (min, max) {
    var randomNumber;
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }; //end func 
  //获得随机颜色


  math.randomColor = function () {
    var str = "0123456789abcdef";
    var s = "#";

    for (j = 0; j < 6; j++) {
      s += str.charAt(Math.random() * str.length);
    }

    return s;
  }; //end func
  //随机打乱一个数组


  math.randomSort = function (ary) {
    if (ary && ary.length > 1) ary.sort(function () {
      return 0.5 - Math.random();
    });
  }; //end func 
  //随机正负


  math.randomPlus = function () {
    return Math.random() < 0.5 ? -1 : 1;
  }; //end func 
  //等比缩放,分cover模式和contain模式


  math.autoSize = function (aryNum, aryMax, scaleMode) {
    if (scaleMode === 1 || scaleMode === 0) scaleMode = scaleMode === 1 ? 'cover' : 'contain';else scaleMode = scaleMode || 'cover';
    var aryNow = [];
    var aryRate = aryNum[0] / aryNum[1];
    aryNow[0] = aryMax[0];
    aryNow[1] = Math.round(aryNow[0] / aryRate);

    if (scaleMode == 'height') {
      aryNow[1] = aryMax[1];
      aryNow[0] = Math.round(aryNow[1] * aryRate);
    } //edn else if
    else if (scaleMode == 'contain') {
        if (aryNow[1] > aryMax[1]) {
          aryNow[1] = aryMax[1];
          aryNow[0] = Math.round(aryNow[1] * aryRate);
        } //end if

      } //edn else if
      else if (scaleMode == 'cover') {
          if (aryNow[1] < aryMax[1]) {
            aryNow[1] = aryMax[1];
            aryNow[0] = Math.round(aryNow[1] * aryRate);
          } //end if

        } //edn else if
        else if (scaleMode == 'full') aryNow = [aryMax[0], aryMax[1]];

    return aryNow;
  }; //end func
  //缓动函数


  math.ease = function (_now, _tar, _speed, _space) {
    _speed = _speed || 10;
    _space = _space || 0.1;

    var _dis = _tar - _now;

    if (Math.abs(_dis) > _space) return _dis / _speed + _now;else return _tar;
  }; //end func
  //角度转弧度


  math.toRadian = function (degree) {
    return degree * Math.PI / 180;
  }; //end func 
  //弧度转角度


  math.toDegree = function (radian) {
    return radian / Math.PI * 180;
  }; //end func 
  //获得2点之间的距离


  math.getDis = function (source, target) {
    var lineX = target[0] - source[0];
    var lineY = target[1] - source[1];
    return Math.sqrt(Math.pow(Math.abs(lineX), 2) + Math.pow(Math.abs(lineY), 2));
  }; //end func 
  //获得2点之间的夹角


  math.getDeg = function (source, target) {
    var deg;

    if (source[0] == target[0] && source[1] == target[1]) {
      deg = 0;
    } else {
      var disX = target[0] - source[0];
      var disY = target[1] - source[1];
      deg = Math.atan(disY / disX) * 180 / Math.PI;

      if (disX < 0) {
        deg = 180 + deg;
      } else if (disY < 0) {
        deg = 360 + deg;
      }
    } //end else


    return deg;
  }; //end func
  //测试2个jquery对象是否重合


  math.hitTest = function (source, target, scaleX, scaleY) {
    scaleX = scaleX != null ? scaleX : 1;
    scaleY = scaleY != null ? scaleY : 1;

    if (source && target) {
      var pos1 = [source.offset().left + source.outerWidth() * scaleX * 0.5, source.offset().top + source.outerHeight() * scaleY * 0.5];
      var pos2 = [target.offset().left + target.outerWidth() * scaleX * 0.5, target.offset().top + target.outerHeight() * scaleY * 0.5];
      var disX = Math.abs(pos2[0] - pos1[0]);
      var disY = Math.abs(pos2[1] - pos1[1]);
      var disXMin = (source.outerWidth() + target.outerWidth()) * scaleX * 0.5;
      var disYMin = (source.outerHeight() + target.outerHeight()) * scaleY * 0.5;
      if (disX <= disXMin && disY <= disYMin) return true;else return false;
    } //end if
    else return false;
  }; //end func
  //测试2个带data().x,data().y的jquery对象是否重合


  math.hitObject = function (source, target) {
    if (source && target) {
      var pos1 = [source.data().x + source.outerWidth() * 0.5, source.data().y + source.outerHeight() * 0.5];
      var pos2 = [target.data().x + target.outerWidth() * 0.5, target.data().y + target.outerHeight() * 0.5];
      var disX = Math.abs(pos2[0] - pos1[0]);
      var disY = Math.abs(pos2[1] - pos1[1]);
      var disXMin = (source.outerWidth() + target.outerWidth()) * 0.5;
      var disYMin = (source.outerHeight() + target.outerHeight()) * 0.5;
      if (disX <= disXMin && disY <= disYMin) return true;else return false;
    } //end if
    else return false;
  }; //end func
  //测试一个点和一个DOM对象是否重合


  math.hitPoint = function (source, target, scaleX, scaleY) {
    scaleX = scaleX != null ? scaleX : 1;
    scaleY = scaleY != null ? scaleY : 1;

    if (source && target) {
      var area = [target.offset().left, target.offset().left + target.outerWidth() * scaleX, target.offset().top, target.offset().top + target.outerHeight() * scaleY];
      if (source[0] >= area[0] && source[0] <= area[1] && source[1] >= area[2] && source[1] <= area[3]) return true;else return false;
    } //end if
    else return false;
  }; //end func
  //把一个数组转成数字


  math.arrayToInt = function (ary) {
    var num = 0;

    for (var i = 0; i < ary.length; i++) {
      num += ary[i] * Math.pow(10, ary.length - 1 - i);
    }

    return num;
  }; //end func
  //深度复制


  math.deepClone = function (source) {
    function getClone(_source) {
      var clone = math.dataType(_source) == "array" ? [] : {};

      for (var i in _source) {
        if (math.dataType(_source[i]) != 'object' && math.dataType(_source[i]) != 'array') clone[i] = _source[i];else clone[i] = getClone(_source[i]);
      } //end for


      return clone;
    } //edn func


    return getClone(source);
  }; //end func
  //判断是数组还是对象


  math.dataType = function (o) {
    if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(o) === 'object') return Array == o.constructor ? 'array' : 'object';else return null;
  }; //end func
  //获得Object的长度


  math.objectLength = function (obj) {
    return Object.keys(obj).length;
  }; //end func
  //合并2个object，重复索引的值由后者替换前者


  math.extend = function (obj1, obj2) {
    if (obj1 && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(obj1) === 'object' && Object.keys(obj1).length > 0) {
      if (obj2 && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(obj2) === 'object' && Object.keys(obj2).length > 0) {
        for (var key in obj1) {
          if (obj2.hasOwnProperty(key)) continue; //有相同的属性则略过 

          obj2[key] = obj1[key];
        } //edn for


        return obj2;
      } //edn if
      else return obj1;
    } //end if
    else return obj2;
  }; //edn func
  //将数字格式化


  math.formatNumber = function (value) {
    value = value.toString();
    if (value.length <= 3) return value;else return this.formatNumber(value.substr(0, value.length - 3)) + ',' + value.substr(value.length - 3);
  }; //end func
  //截取小数点后几位，非四舍五入


  math["float"] = function (value, pt) {
    pt = pt || 2;
    value = value.toString();
    if (value.indexOf('.') == -1) return value;else {
      var str1 = value.split('.');
      var str2 = str1[0] + '.' + str1[1].substr(0, pt);
      return Number(str2);
    } //end else
  }; //edn func
  //将颜色值转换成rgb值


  math.colorToRgb = function (color) {
    if (color.match(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i)) {
      var value = color.slice(color.indexOf('#') + 1),
          isShortNotation = value.length === 3,
          r = isShortNotation ? value.charAt(0) + value.charAt(0) : value.substring(0, 2),
          g = isShortNotation ? value.charAt(1) + value.charAt(1) : value.substring(2, 4),
          b = isShortNotation ? value.charAt(2) + value.charAt(2) : value.substring(4, 6);
      return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
    } //end if
    else return [0, 0, 0];
  }; //end func
  //获取路径


  math.path = function (path) {
    if (path && path != '') return path.substr(0, path.lastIndexOf('/') + 1);else return false;
  }; //edn func

  /**
   * 根据高宽数值计算高宽比例
   * @method
   * @param {widch} 宽度数值
   * @param {height} 高度数值
   * @return {vw:vh} 以vw:vh的形式返回比例值
   */


  math.aspect = function (width, height) {
    var vw = width,
        vh = height,
        vr = gcd(vw, vh);

    function gcd(a, b) {
      return b == 0 ? a : gcd(b, a % b);
    }

    return vw / vr + ':' + vh / vr;
  }; //edn func


  return math;
} //end import


var imath = importMath();
/* harmony default export */ __webpack_exports__["a"] = (imath);

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export iaudio */
/* unused harmony export ibgm */
//2018.9.25
function importAudio() {
  var audio = {};
  var webAudioContext = window.webkitAudioContext || window.AudioContext; //	console.log(webAudioContext);

  audio.on = function (list, options) {
    if (list.length > 0) {
      this.soundList = {};
      this.soundMax = 0;
      this.soundLoaded = 0;
      this.webAudio = 0;

      if (options) {
        this.onProgress = options.onProgress;
        this.onLoadComplete = options.onLoadComplete;
        this.webAudio = options.webAudio || 0;
      } //end if


      console.log(this.webAudio ? 'web audio mode' : 'local audio mode');

      for (var i = 0; i < list.length; i++) {
        var defaults = {
          src: '',
          volume: 1,
          loop: 0,
          autoplay: 0,
          continuePlay: 0,
          currentTime: 0
        };
        var opts = $.extend(defaults, list[i]);

        if (opts.src != '') {
          var str1 = opts.src.split('/');
          var name = str1[str1.length - 1].split('.')[0];
          var option = {
            src: opts.src,
            volume: opts.volume,
            loop: opts.loop,
            autoplay: opts.autoplay,
            continuePlay: opts.continuePlay,
            currentTime: opts.currentTime,
            onListLoaded: this.onListLoaded,
            onLoaded: opts.onLoaded,
            onEnded: opts.onEnded,
            onPlay: opts.onPlay,
            onPause: opts.onPause,
            onTimeupdate: opts.onTimeupdate
          };
          if (this.webAudio) this.soundList[name] = new webAudio(option);else this.soundList[name] = new localAudio(option);
        } //edn if

      } //end for


      this.soundMax = Object.keys(this.soundList).length;
      console.log('sound length:' + this.soundMax);
      return this.soundList;
    } //edn if

  }; //end func


  audio.onListLoaded = function () {
    var _this = audio;
    _this.soundLoaded++;
    if (_this.onProgress) _this.onProgress(_this.soundLoaded / _this.soundMax);

    if (_this.soundLoaded == _this.soundMax) {
      console.log(_this.soundLoaded + ' sounds load complete');
      if (_this.onLoadComplete) _this.onLoadComplete();
    } //end if

  }; //end func


  function localAudio(opts) {
    var _this = this;

    this.autoplay = opts.autoplay;
    this.onListLoaded = opts.onListLoaded;
    this.onLoaded = opts.onLoaded;
    this.onEnded = opts.onEnded;
    this.onPlay = opts.onPlay;
    this.onPause = opts.onPause;
    this.onTimeupdate = opts.onTimeupdate;
    this.loaded = 0;
    this.played = 0;
    this.ended = 0;
    this.audio = new Audio();
    this.audio.src = opts.src;
    this.audio.volume = opts.volume;
    this.audio.currentTime = opts.currentTime;
    this.audio.loop = opts.loop; //如果loop设置成true就无法正确获得ended事件

    this.audio.load();
    this.audio.addEventListener('loadeddata', init, false);
    this.audio.addEventListener('ended', onEnded, false);
    if (this.onListLoaded) this.audio.addEventListener('loadeddata', this.onListLoaded, false);
    if (this.onLoaded) this.audio.addEventListener('loadeddata', this.onLoaded, false);
    if (this.onPlay) this.audio.addEventListener('play', this.onPlay, false);
    if (this.onPause) this.audio.addEventListener('pause', this.onPause, false);
    if (this.onTimeupdate) this.audio.addEventListener('timeupdate', this.onTimeupdate, false);

    function init(event) {
      _this.loaded = 1;
      if (_this.autoplay) _this.play();
    } //end func


    function onEnded(event) {
      _this.ended = 1;
      _this.played = 0;
      if (_this.onEnded) _this.onEnded();
    } //end func

  } //end func


  localAudio.prototype.src = function () {
    return this.audio.src;
  }; //end func


  localAudio.prototype.loop = function (loop) {
    if (loop != null) this.audio.loop = loop;else return this.audio.loop;
  }; //end func


  localAudio.prototype.duration = function () {
    return this.audio.duration;
  }; //end func


  localAudio.prototype.muted = function (muted) {
    if (muted != null) this.audio.muted = muted;else return this.audio.muted;
  }; //end func


  localAudio.prototype.volume = function (volume) {
    if (volume != null) this.audio.volume = volume;else return this.audio.volume;
  }; //end func


  localAudio.prototype.currentTime = function (currentTime) {
    if (currentTime != null && currentTime > 0) this.audio.currentTime = currentTime * 0.001;else return this.audio.currentTime * 1000;
  }; //end func


  localAudio.prototype.play = function (currentTime) {
    if (currentTime != null && currentTime >= 0) this.audio.currentTime = currentTime * 0.001;
    this.played = 1;
    this.ended = 0;
    this.audio.play(); //		console.log(get_src(this.src)+' play');
  }; //end func


  localAudio.prototype.pause = function () {
    this.played = 0;
    this.audio.pause(); //  	console.log(get_src(this.src)+' pause');
  }; //end func


  function webAudio(opts) {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    /* 创建一个 AudioContext */

    this.gainNode = this.context.createGain();
    this.buffer = null;
    this.source = null;
    this.src = opts.src;
    this.volume = opts.volume;
    this.loop = opts.loop;
    this.autoplay = opts.autoplay;
    this.continuePlay = opts.continuePlay;
    this.nowTime = opts.currentTime;
    this.startTime = 0;
    this.onListLoaded = opts.onListLoaded;
    this.onLoaded = opts.onLoaded;
    this.onEnded = opts.onEnded;
    this.onPlay = opts.onPlay;
    this.onPause = opts.onPause;
    this.onTimeupdate = opts.onTimeupdate;
    this.loaded = 0;
    this.played = 0;
    this.ended = 0;
    this.load();
  } //end func


  webAudio.prototype.load = function () {
    var _this = this;

    var xhr = new XMLHttpRequest();
    /*一个新的 XHR 对象 */

    xhr.open('GET', this.src, true);
    /* 通过 GET 请连接到 .mp3 */

    xhr.responseType = 'arraybuffer';
    /* 设置响应类型为字节流 arraybuffer */

    xhr.onload = function (e) {
      console.log(get_src(_this.src) + ' loaded');
      _this.loaded = 1;
      if (_this.onListLoaded) _this.onListLoaded();
      if (_this.onLoaded) _this.onLoaded(_this);
      init(this.response);
    };

    xhr.send();

    function init(arrayBuffer) {
      _this.context.decodeAudioData(arrayBuffer, function (buffer) {
        _this.buffer = buffer;
        /* 将 buffer 传入解码 AudioBuffer. */

        if (_this.autoplay) _this.play();
      }, function (e) {
        console.log('Error decoding file', e);
      });
    } //edn func

  }; //edn prototype


  webAudio.prototype.muted = function (muted) {
    if (muted != null) {
      this.gainNode.gain.value = muted ? -1 : 1;
    } //edn if
    else return this.gainNode.gain.value == -1 ? true : false;
  }; //end prototype
  //在手机浏览器里，webaudio可以调节音量,audio目前还不行


  webAudio.prototype.volume = function (volume) {
    if (volume != null) {
      volume = Math.max(-1, Math.min(volume, 1));
      this.gainNode.gain.value = volume;
    } //ened if
    else return this.gainNode.gain.value;
  }; //end prototype


  webAudio.prototype.currentTime = function (currentTime) {
    if (currentTime != null && currentTime >= 0) this.nowTime = currentTime * 0.001;else return this.nowTime * 1000;
  }; //end func


  webAudio.prototype.play = function (currentTime) {
    if (currentTime != null && currentTime >= 0) this.nowTime = currentTime * 0.001;

    var _this = this;

    _this.played = 1;
    _this.ended = 0;
    _this.source = _this.context.createBufferSource();
    _this.source.buffer = _this.buffer;
    _this.source.loop = _this.loop;

    _this.source.connect(_this.context.destination);
    /*连接 AudioBufferSourceNode 到 AudioContext */


    _this.source.start(0, _this.nowTime % _this.buffer.duration);

    _this.startTime = _this.context.currentTime;

    _this.source.connect(_this.gainNode);

    _this.gainNode.connect(_this.context.destination);

    _this.source.onended = function () {
      if (_this.played) {
        console.log(get_src(_this.src) + ' ended');
        _this.played = 0;
        _this.ended = 1;
        if (_this.onEnded) _this.onEnded(_this);
        if (_this.onTimeupdate) cancelAnimationFrame(_this.timeupdate);
      } //edn if

    };

    if (_this.onPlay) _this.onPlay(this);

    if (_this.onTimeupdate) {
      cancelAnimationFrame(_this.timeupdate);
      webaudio_timeupdate();
    } //edn of
    //	    console.log(get_src(this.src)+' play');


    function webaudio_timeupdate() {
      _this.onTimeupdate(_this);

      if (!_this.ended) _this.timeupdate = requestAnimationFrame(webaudio_timeupdate);
    } //edn func

  }; //end prototype


  webAudio.prototype.pause = function () {
    this.played = 0;
    this.source.stop(0);
    this.nowTime += this.context.currentTime - this.startTime;
    if (this.onPause) this.onPause(_this);
    if (this.onTimeupdate) cancelAnimationFrame(this.timeupdate); //  	console.log(get_src(this.src)+' pause');
  }; //end prototype


  audio.bgm = function (options) {
    var defaults = {
      src: '',
      btn: $('a.bgmBtn'),
      playClassName: 'bgmPlay',
      stopClassName: 'bgmStop',
      webAudio: false,
      autoplay: true
    };
    var opts = $.extend(defaults, options);
    console.log(opts.webAudio ? 'bgm is at web audio mode' : 'bgm is at local audio mode');
    if (opts.webAudio) var bgm = new webAudioBgm(opts);else var bgm = new localAudioBgm(opts);
    return bgm;
  }; //end func


  function localAudioBgm(opts) {
    var _this = this;

    this.src = opts.src;
    this.onLoaded = opts.onLoaded;
    this.loaded = 0;
    this.played = 0;
    this.bgmPlay = sessionStorage.bgmPlay == null ? opts.autoplay : opts.autoplay && parseInt(sessionStorage.bgmPlay);
    console.log('this bgmPlay:' + this.bgmPlay);
    this.bgmTime = sessionStorage.bgmTime;
    this.bgmTime = this.bgmTime || 0;
    this.bgmTime = Number(this.bgmTime);
    console.log('bgmTime:' + this.bgmTime);
    this.currentTime = this.bgmTime;
    this.btn = opts.btn;
    this.playClassName = opts.playClassName;
    this.stopClassName = opts.stopClassName;
    this.audio = new Audio();
    this.audio.src = this.src;
    this.audio.loop = true;
    this.audio.load();

    if (os.weibo && os.ios) {
      //解决ios版微博下，无法触发audio的各种Load事件
      setTimeout(function () {
        init();
        if (_this.onLoaded) this.onLoaded(this.audio);
      }, 250);
    } //end if
    else {
        this.audio.addEventListener('loadeddata', init, false);
        if (this.onLoaded) this.audio.addEventListener('loadeddata', this.onLoaded, false);
      } //edn else


    function init(event) {
      _this.loaded = 1;
      if (_this.bgmPlay) _this.play();else _this.pause();
    } //end func

  } //end func


  localAudioBgm.prototype.volume = function (volume) {
    if (volume != null) this.audio.volume = volume;else return this.audio.volume;
  }; //end func


  localAudioBgm.prototype.time = function (currentTime) {
    if (currentTime != null && currentTime > 0) this.currentTime = currentTime;else return this.currentTime;
  }; //end func


  localAudioBgm.prototype.play = function (e) {
    var _this = e ? e.data.target : this;

    if (!_this.played && _this.loaded) {
      _this.played = 1;
      _this.audio.currentTime = _this.currentTime;

      _this.audio.play();

      _this.bgmPlay = 1;
      _this.playStatus = true;
      if (_this.btn.length > 0) _this.btn.removeClass(_this.stopClassName).addClass(_this.playClassName).one('click', {
        target: _this
      }, _this.pause);
    } //edn if

  }; //end func


  localAudioBgm.prototype.pause = function (e) {
    var _this = e ? e.data.target : this;

    if (_this.played && _this.loaded) {
      _this.played = 0;
      _this.currentTime = _this.audio.currentTime;

      _this.audio.pause();

      _this.bgmPlay = 0;
      _this.playStatus = false;
    } //edn if


    if (_this.btn.length > 0) _this.btn.removeClass(_this.playClassName).addClass(_this.stopClassName).one('click', {
      target: _this
    }, _this.play);
  }; //end func


  localAudioBgm.prototype.mute = function (muted) {
    muted = muted || 0;
    this.audio.muted = muted;
  }; //end func


  function webAudioBgm(opts) {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    ;
    this.gainNode = this.context.createGain();
    this.buffer = null;
    this.source = null;
    this.src = opts.src;
    this.startTime = 0;
    this.onLoaded = opts.onLoaded;
    this.bgmPlay = sessionStorage.bgmPlay == null ? opts.autoplay : opts.autoplay && parseInt(sessionStorage.bgmPlay);
    console.log('this bgmPlay:' + this.bgmPlay);
    this.bgmTime = sessionStorage.bgmTime;
    this.bgmTime = this.bgmTime || 0;
    this.bgmTime = Number(this.bgmTime);
    console.log('bgmTime:' + this.bgmTime);
    this.currentTime = this.bgmTime;
    this.btn = opts.btn;
    this.playClassName = opts.playClassName;
    this.stopClassName = opts.stopClassName;
    this.load();
  } //end func


  webAudioBgm.prototype.load = function () {
    var _this = this;

    var xhr = new XMLHttpRequest(); //通过XHR下载音频文件

    xhr.open('GET', this.src, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function (e) {
      //下载完成
      if (_this.onLoaded) _this.onLoaded();
      init(this.response);
    };

    xhr.send();

    function init(arrayBuffer) {
      _this.context.decodeAudioData(arrayBuffer, function (buffer) {
        _this.buffer = buffer;
        if (_this.bgmPlay) _this.play();else _this.pause();
      }, function (e) {
        console.log('Error decoding file', e);
      });
    } //edn func

  }; //edn prototype


  webAudioBgm.prototype.volume = function (volume) {
    if (volume != null) {
      volume = Math.max(-1, Math.min(volume, 1));
      this.gainNode.gain.value = volume;
    } //ened if
    else return this.gainNode.gain.value;
  }; //end prototype


  webAudioBgm.prototype.time = function (currentTime) {
    if (currentTime != null && currentTime > 0) {
      this.currentTime = currentTime;
    } //edn if
    else return this.currentTime;
  }; //end func


  webAudioBgm.prototype.play = function (e) {
    var _this = e ? e.data.target : this;

    _this.bgmPlay = 1;
    _this.source = _this.context.createBufferSource();
    _this.source.buffer = _this.buffer;
    _this.source.loop = true;

    _this.source.connect(_this.context.destination);

    _this.source.start(0, _this.currentTime % _this.buffer.duration);

    _this.startTime = _this.context.currentTime;

    _this.source.connect(_this.gainNode);

    _this.gainNode.connect(_this.context.destination);

    _this.playStatus = true;
    if (_this.btn.length > 0) _this.btn.removeClass(_this.stopClassName).addClass(_this.playClassName).one('click', {
      target: _this
    }, _this.pause);
  }; //end prototype


  webAudioBgm.prototype.pause = function (e) {
    var _this = e ? e.data.target : this;

    if (_this.source) {
      _this.bgmPlay = 0;

      _this.source.stop(0);

      _this.currentTime += _this.context.currentTime - _this.startTime;
      _this.bgmTime = _this.currentTime;
      _this.playStatus = false;
    } //edn if


    if (_this.btn.length > 0) _this.btn.removeClass(_this.playClassName).addClass(_this.stopClassName).one('click', {
      target: _this
    }, _this.play);
  }; //end prototype


  webAudioBgm.prototype.mute = function (muted) {
    muted = muted || 0;

    if (muted) {
      this.volume(-1);
    } //edn if
    else {
        this.volume(1);
      } //end else

  }; //end prototype


  function get_src(str) {
    var ary = str.split('/');
    return ary[ary.length - 1];
  } //end func


  return audio;
} //end import


function importBgm() {
  var bgm = {};
  var defaults = {
    webAudio: 0,
    src: '',
    autoplay: 1
  };
  var opts = {};

  bgm.init = function (options) {
    opts = $.extend(defaults, options);

    if (opts.src != '') {
      ibase.creatNode('a', null, 'bgmBtn', null, document.querySelector('article'));
      bgm.audio = iaudio.bgm({
        src: opts.src,
        onLoaded: opts.onLoaded,
        webAudio: opts.webAudio,
        autoplay: opts.autoplay
      });
      this.btn = $('a.bgmBtn');
    } //edn if

  }; //edn func


  bgm.href = function (url) {
    if (url && url != '') {
      sessionStorage.bgmPlay = bgm.audio.bgmPlay;
      var bgmTime = opts.webAudio ? bgm.audio.currentTime + bgm.audio.context.currentTime - bgm.audio.startTime : bgm.audio.audio.currentTime;
      sessionStorage.bgmTime = bgm.audio.bgmPlay ? bgmTime : bgm.audio.currentTime;
      location.href = url;
    } //edn func

  }; //edn func


  bgm.volume = function (volume) {
    if (volume != null) bgm.audio.volume(volume);else return bgm.audio.volume();
  }; //end func


  bgm.currentTime = function (currentTime) {
    if (currentTime != null && currentTime > 0) bgm.audio.time(currentTime);else return bgm.audio.time();
  }; //end func


  bgm.pause = function () {
    bgm.audio.pause();
  }; //edn func


  bgm.play = function () {
    bgm.audio.play();
  }; //edn func


  bgm.hide = function (pause) {
    pause = pause != null ? pause : true;
    if (pause) this.pause();
    this.btn.hide();
  }; //edn func


  bgm.show = function (resume) {
    resume = resume != null ? resume : true;
    if (resume) this.play();
    this.btn.show();
  }; //edn func


  bgm.mute = function (muted) {
    muted = muted || 0;
    console.log(bgm.audio);
    bgm.audio.mute(muted);
    if (muted) this.btn.hide();else this.btn.show();
  }; //edn func


  return bgm;
} //edn func


var iaudio = importAudio();
var ibgm = importBgm();

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//2017.12.19
//百度监测贴这里
//var _hmt = _hmt || [];
//(function() {
//var hm = document.createElement("script");
//hm.src = "https://hm.baidu.com/hm.js?42b71e30fab1dd283c8d6f451a4c011b";
//var s = document.getElementsByTagName("script")[0]; 
//s.parentNode.insertBefore(hm, s);
//})();
//ga监测贴这里
//(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
//ga('create', 'UA-55069627-11', 'auto');
//ga('send', 'pageview');
function importMonitor() {
  var monitor = {};

  monitor.add = function (options) {
    if (options) {
      var defaults = {
        action: 'touchend',
        category: 'default',
        label: ''
      };
      var opts = $.extend(defaults, options);

      if (opts.obj && opts.obj.length > 0) {
        opts.obj.each(function (i, n) {
          $(n).on(opts.action, {
            action: opts.action,
            category: opts.category,
            label: opts.label + (i + 1)
          }, event_bind);
        });
      } //end if
      else {
          opts.action = 'script';
          event_bind(null, opts);
        } //end else

    } //end if

  }; //end func


  function event_bind(e, data) {
    if (e) event_handler(e.data);else event_handler(data);
  } //end func


  function event_handler(data) {
    if (window._hmt) window._hmt.push(['_trackEvent', data.category, data.action, data.label]);
    if (window.ga) window.ga('send', 'event', data.category, data.action, data.label);
    if (window.gtag) window.gtag('event', data.action, {
      'event_category': data.category,
      'event_label': data.label
    });
    if (window.console) window.console.log('事件：' + ' | ' + '类别：' + data.category + ' | ' + '标签：' + data.label);
  } //end func


  return monitor;
} //end import


var imonitor = importMonitor();
/* harmony default export */ __webpack_exports__["a"] = (imonitor);

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })
]]);