// 默认模板
import { icom, ibase, imonitor, imath } from 'com.js' // 在com.js中暴露所有模块，打包的时候未使用到的模块会自动去除
import '@/css/common.landscape.css'
import './index.landscape.scss'
ibase.init({ dir: 'landscape', lock: true });
$(document).ready(function () {
	//-----------------------------------------定义和初始化变量----------------------------------------
	var articleBox = $('article');
	var loadBox = $('aside#loadBox');
	var windowScale = ibase.getOrient(true) == 'landscape' ? window.innerWidth / ibase.landscapeWidth : window.innerHeight / ibase.landscapeWidth;
	console.log('windowScale:' + windowScale);
	var UserInfo;

	//----------------------------------------页面初始化----------------------------------------
	icom.init(init);//初始化
	icom.screenScrollUnable();//如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为
	articleBox.fadeTo("slow", 1);// 显示页面

	function init() {
		requestAnimationFrame(function () {
			if (window.Data) Data.OAuth.Login(userGetted);
			else userGetted({
				errcode: 0,
				errmsg: 'ok',
				result: {
					OpenID: 'xxxx-xxxx-xxxx',
					Nickname: "Nickname",
					HeadImage: 'https://wx.qlogo.cn/mmopen/vi_32/l1R1ORryeZaAU5pwF4iavDQc04aGPC6FdJOiccHHzTbyDBIjGDJjicib1sVOXgYLjkjt3NTks92TMybeGvPgw1mjPA/132'
				}
			});
			articleBox.css({ opacity: 1 }).show();
		});
	}//edn func

	//----------------------------------------微信用户登录验证----------------------------------------	
	function userGetted(res) {
		if (res.errcode == 0) {
			UserInfo = res.result;
			UserInfo.HeadImage = UserInfo.HeadImage != '' ? UserInfo.HeadImage : 'https://wx.qlogo.cn/mmopen/vi_32/l1R1ORryeZaAU5pwF4iavDQc04aGPC6FdJOiccHHzTbyDBIjGDJjicib1sVOXgYLjkjt3NTks92TMybeGvPgw1mjPA/132';
			console.log('UserInfo', UserInfo);
			load_handler();
		}//end if
		else {
			console.log(res.errmsg);
		}//end else
	}//end func

	//----------------------------------------加载页面图片----------------------------------------
	var loadPage = $('aside#loadPage');
	var loadPagePer = loadPage.find('.per');

	function load_handler() {
		var loader = new PxLoader();
		loader.addImage(require('@/images/common/turn_phone.png'));

		//实际加载进度
		loader.addProgressListener(function (e) {
			var per = Math.round(e.completedCount / e.totalCount * 50);
		});

		loader.addCompletionListener(function () {
			load_timer(50);//模拟加载进度
			loader = null;
		});
		loader.start();
	}//end func

	//模拟加载进度
	function load_timer(per) {
		per = per || 0;
		per += imath.randomRange(1, 3);
		per = per > 100 ? 100 : per;
		load_set(per);
		if (per == 100) setTimeout(init_handler, 200);
		else setTimeout(load_timer, 33, per);
	}//edn func

	function load_set(per) {
		if (loadPagePer.length > 0) loadPagePer.html(per + '%');
	}//edn func

	//----------------------------------------页面逻辑代码----------------------------------------
	function init_handler() {
		console.log('init handler');
		if (loadPage.length > 0) icom.fadeOut(loadPage, 500, function () { loadPage.remove(); });
		index_handler();
	}//end func

	//----------------------------------------index----------------------------------------
	var indexBox = $('section.index');

	function index_handler() {
		console.log('index_handler');
		indexBox.show();
		imonitor.add({ label: '首页' });//添加监测
	}//end func

});//end ready
