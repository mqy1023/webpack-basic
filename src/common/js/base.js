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
	os.supportsTouch = ((window.DocumentTouch && document instanceof window.DocumentTouch) || 'ontouchstart' in window);
	os.weixin = userAgent.match(/MicroMessenger/) ? true : false;
	if (os.weixin) {
		var ver = userAgent.match(/MicroMessenger\/\d+.\d+.\d+/)[0].match(/\d+.\d+.\d+/)[0].split('.');
		os.weixinVer = 0;
		for (var i = 0; i < ver.length; i++) os.weixinVer += parseInt(ver[i]) * Math.pow(10, ver.length - i - 1);
	}
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
	if (os.ios) {
		os.iphoneX = (screen.width == 375 && screen.height == 812) || (screen.width == 375 && window.innerHeight >= 635) || (window.innerWidth == 724 && window.innerHeight == 375) || (window.innerWidth == 375 && window.innerHeight == 724) || (window.innerWidth == 812 && window.innerHeight == 343) || (window.innerWidth == 343 && window.innerHeight == 812);
		os.IPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
		os.IPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;
		os.iphone6Plus = (screen.width == 414 && screen.height == 736) || (screen.width == 414 && window.innerHeight >= 622);
		os.iphone6 = (screen.width == 375 && screen.height == 667) || (screen.width == 375 && window.innerHeight <= 603);
		os.iphone5 = (screen.width == 320 && screen.height == 568) || (screen.width == 320 && window.innerHeight >= 460);
		os.iphone4 = (screen.width == 320 && screen.height == 480) || (screen.width == 320 && window.innerHeight <= 450);
	}
	return os;
}

//2018.10.23
//-----------------------------------base
function importBase() {
	var base = {}
	base.dir = 'portrait';
	base.lock = false;
	base.scrollTop = -1;
	base.init = function (options) {
		var defaults = { dir: 'portrait', lock: true };// dir：锁定方向、lock：是否锁定
		var opts = Object.assign(defaults, options)
		base.dir = opts.dir == base.dir ? opts.dir : 'landscape';
		base.simulation = window.orientation === undefined;
		base.screenLock = base.simulation && base.dir == 'landscape' ? false : opts.lock;
		base.debug = parseInt(this.getQueryString('debug')) || 0;
		console.log('ibase debug:' + base.debug);
		console.log('simulation:' + this.simulation);
		console.log('screenLock:' + this.screenLock);
		if (this.debug) {
			import('vconsole').then(({ default: VConsole }) => {
				this.Console = new VConsole({
					defaultPlugins: ['system', 'network', 'element', 'storage']
				});
			})
		}
		// rem
		font_resize();
		window.addEventListener("resize", function () { font_resize(); setFrameout(font_resize, 10); }, false);
		// 锁定提示
		if (this.dir == 'portrait') {
			document.write(`<aside class="turnBoxPortrait" id="turnBox"><div class="phone"><img src="${require('@/images/turn_phone.png')}"><i class="yes"></i><i class="no"></i></div><p>竖屏体验更佳</p></aside>`);
		} else {
			document.write(`<aside class="turnBoxLandscape" id="turnBox"><div class="lock"><span></span><span></span></div><div class="sign"><span>竖排方向锁定：关闭</span><span>竖排方向锁定：打开</span></div><div class="phone"><img src="${require('@/images/turn_phone.png')}"><i class="yes"></i><i class="no"></i></div><p>锁定竖屏体验更佳</p></aside>`);
		}
		this.turnBox = document.getElementById("turnBox");
		if (this.screenLock && (this.getOrient(true) == 'landscape')) {
			this.turnBox.style.display = "block";
			this.lock = true;
		}
		window.addEventListener("orientationchange", portait_lock, false);
	}

	function font_resize() {
		var size = document.documentElement.clientWidth / base.screenWidth * 100;
		document.querySelector('html').style.fontSize = size + 'px';
	}

	base.unlockScreen = function () {
		this.screenLock = false;
		window.removeEventListener("orientationchange", portait_lock, false)
		if (this.turnBox) this.turnBox.style.display = 'none';
		document.body.scrollTop = 0;
	};

	base.lockScreen = function () {
		base.screenLock = true;
		if (base.dir == 'landscape') {
			var lock = base.dir == base.getOrient();
		} else if (base.dir == 'portrait') {
			var lock = base.dir != base.getOrient();
		}
		if (lock) {
			this.turnBox.style.display = "block";
			this.lock = true;
		}
		window.addEventListener("orientationchange", portait_lock, false);
	};

	base.getOrient = function (resize = false) {
		if (resize) {
			var dir = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
		} else {
			var dir = window.orientation == 90 || window.orientation == -90 ? 'landscape' : 'portrait';
		}
		console.log('window orientation:' + dir);
		return dir;
	};

	function portait_lock() {
		if (base.dir == 'landscape') {
			var lock = base.dir == base.getOrient();
		} else if (base.dir == 'portrait') {
			var lock = base.dir != base.getOrient();
		}
		if (lock) {
			base.turnBox.style.display = 'block';
			base.lock = true;
			if (os.ios) {
				if (base.scrollTop == -1 && document.body.scrollTop > 0) {
					base.scrollTop = document.body.scrollTop;
					document.body.scrollTop = 0;
				}
			}
		} else {
			base.turnBox.style.display = 'none';
			base.lock = false;
			if (os.ios) {
				if (base.scrollTop != -1) {
					document.body.scrollTop = base.scrollTop;
					base.scrollTop = -1;
				}
			}
		}
	}

	base.load = function (f, shell, callback, nocache) {
		nocache = nocache != null ? nocache : true;
		var file = get_filetype(f, nocache);
		if (file.type == "css") this.loadCss(file.src, shell, callback);
		else if (file.type == "js") this.loadJs(file.src, shell, callback);
	}

	base.loadCss = function (src, shell, callback) {
		shell = shell || 'head';
		var fileref = document.createElement('link');
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", src);
		document.querySelector(shell).appendChild(fileref);
		if (callback) fileref.onload = callback;
	}

	base.loadJs = function (src, shell, callback) {
		shell = shell || 'body';
		var fileref = document.createElement('script');
		fileref.setAttribute("type", "text/javascript");
		fileref.setAttribute("src", src);
		document.querySelector(shell).appendChild(fileref);
		if (callback) fileref.onload = callback;
	}

	//获得http url参数
	base.getQueryString = function (name) {
		if (name && name != '') {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURIComponent(r[2]);
			return null;
		}
		else return null;
	}

	function get_filetype(f, nocache) {
		nocache = nocache != null ? nocache : true;
		var tmp = f.split('.');
		var type = tmp[tmp.length - 1];
		var src = f + (nocache ? '?v=' + Math.random() : '');
		return {
			type: type,
			src: src
		};
	}

	function setFrameout(callback, frame) {
		frame = frame || 0;
		var now = 0;
		timer_handler();
		function timer_handler() {
			now++;
			var timeup = now >= frame;
			if (timeup) callback();
			else requestAnimationFrame(timer_handler);
		}
	}

	return base;
}

export const ibase = importBase();

export const os = importOS();