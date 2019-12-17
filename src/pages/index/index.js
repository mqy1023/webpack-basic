
// 默认模板
import { ibase, imonitor, ishare } from '@/common/js'
import { screenScrollUnable, adaptation } from '@/common/js/com.js'
import { Basics } from '@/common/js/toolclass.js'
import './index.scss'
ibase.init({ dir: 'portrait', lock: true });
ishare.init();
$(function () {
	let home = new Home('.home');
	let second = new Second('.second');
	home.on('loaded', () => {
		imonitor.add({ label: '首页' })// 添加监测
		second.init();
	})
});
/**
 * 首页
 */
class Home extends Basics {
	constructor(el, options = {}) {
		super()
		this.$el = $(el);
		this.loadPagePer = options.loadPagePer;
		this.init();
	}
	async init() {
		console.log('index_handler');
		let _this = this;
		_this.userGetted();// 获取用户信息
		screenScrollUnable();//如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为
		adaptation('cover');// 缩放适配
		await _this.load_handler([require('@/images/share.jpg')]);// 首屏预加载
		_this.fadeIn();// 显示首页
		_this.trigger('loaded');// 触发loaded事件
	}
	load_handler(images) {
		let _this = this;
		return new Promise((resolve, reject) => {
			_this.loaderImage(images, {
				autoStart: true,
				addProgressListener: (e) => load_set(Math.round(e.completedCount / e.totalCount * 50)),
				addCompletionListener: () => load_timer(50) && (preloading = null)
			})
			//实际加载进度
			function load_timer(per) {
				per = Math.min(100, ++per);
				load_set(per);
				per >= 100 ? setTimeout(resolve, 200) : setTimeout(load_timer, 33, per)
			}
			function load_set(per) { if (_this.loadPagePer) _this.loadPagePer.html(per + '%'); }
		})
	}
	userGetted() {
		let _this = this;
		if (window.Data) {
			Data.OAuth.Login(function (res) {
				if (res.errcode == 0) {
					_this.setData('UserInfo', res.result)
				}
			});
		} else {
			_this.setData('UserInfo', {
				OpenID: 'xxxx-xxxx-xxxx',
				Nickname: "Nickname",
				HeadImage: 'https://wx.qlogo.cn/mmopen/vi_32/l1R1ORryeZaAU5pwF4iavDQc04aGPC6FdJOiccHHzTbyDBIjGDJjicib1sVOXgYLjkjt3NTks92TMybeGvPgw1mjPA/132'
			})
		}
		console.log('UserInfo', _this.UserInfo);
	}
}
/**
 * 第二页
 */
class Second extends Basics {
	constructor(el, options = {}) {
		super()
		this.$el = $(el);
	}
	init() {
		console.log('开始第二页资源加载，业务逻辑')
		console.log('UserInfo', this.UserInfo)
	}
}