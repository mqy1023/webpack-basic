
// 默认模板
import { icom, ibase, imath, ishare } from '@/common/js/base' // 在com.js中暴露所有模块，打包的时候未使用到的模块会自动去除
import './index.scss'

ibase.init({ dir: 'portrait', lock: true });
$(function () {
	//-----------------------------------------定义和初始化变量----------------------------------------
	let articleBox = $('article');
	let unableView = 'https://wx.qlogo.cn/mmopen/vi_32/l1R1ORryeZaAU5pwF4iavDQc04aGPC6FdJOiccHHzTbyDBIjGDJjicib1sVOXgYLjkjt3NTks92TMybeGvPgw1mjPA/132';
	var UserInfo;
	//----------------------------------------页面初始化----------------------------------------
	icom.screenScrollUnable();//如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为
	articleBox.fadeTo("slow", 1);// 显示页面

	if (window.Data) {
		Data.OAuth.Login(userGetted);
	} else {
		userGetted({
			errcode: 0,
			errmsg: 'ok',
			result: {
				OpenID: 'xxxx-xxxx-xxxx',
				Nickname: "Nickname",
				HeadImage: unableView
			}
		});
	}

	//----------------------------------------微信用户登录验证----------------------------------------	
	function userGetted(res) {
		if (res.errcode == 0) {
			UserInfo = res.result;
			UserInfo.HeadImage = UserInfo.HeadImage != '' ? UserInfo.HeadImage : unableView;
			console.log('UserInfo', UserInfo);
			load_handler();
		} else {
			console.log(res.errmsg);
		}
	}

	//----------------------------------------加载页面图片----------------------------------------
	function load_handler() {
		var loader = new PxLoader();
		loader.addImage(require('@/images/turn_phone.png'));
		//实际加载进度
		loader.addProgressListener(function (e) {
			var per = Math.round(e.completedCount / e.totalCount * 50);
			load_set(per)
		});
		loader.addCompletionListener(function () {
			load_timer(50);//模拟加载进度
			loader = null;
		});
		loader.start();
	}

	//模拟加载进度
	function load_timer(per) {
		per = per || 0;
		per += imath.randomRange(1, 3);
		per = per > 100 ? 100 : per;
		load_set(per);
		if (per == 100) setTimeout(init_handler, 200);
		else setTimeout(load_timer, 33, per);
	}

	function load_set(per) {
		// loadPagePer.html(per + '%');
	}

	//----------------------------------------页面逻辑代码----------------------------------------
	function init_handler() {
		console.log('init handler');
		index_handler();
	}

	//----------------------------------------index----------------------------------------
	function index_handler() {
		console.log('index_handler');
		imonitor.add({ label: '首页' });//添加监测
	}
});
