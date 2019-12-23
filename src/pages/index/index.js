
// 默认模板
import { ibase, imonitor, ishare } from '@/common/js'
import { screenScrollUnable, adaptation } from '@/common/js/com.js'
import Page from '@/common/js/toolclass.js'
import './index.scss'
ibase.init({ dir: 'portrait', lock: true });
ishare.init();
$(function () {
	let home = new Page({
		el: '.home',
		/**
		 * 初始化完成的钩子
		 */
		async mounted() {
			console.log('index_handler');
			let _this = this;
			_this.userGetted();// 获取用户信息
			_this.fadeIn();// 显示首页
			screenScrollUnable();//如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为
			adaptation('cover');// 缩放适配
			await _this.load_handler([require('@/images/share.jpg')]);// 首屏预加载
			_this.trigger('loaded');// 触发loaded事件
		},
		methods: {
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
			},
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
		},
		data: {
			a: '#000',
			b: '我是b'
		}
	})
	home.on('loaded', () => {
		imonitor.add({ label: '首页' })// 添加监测
		$('#sc').on('click',function(){
			home.$el.find('p').remove();
		})
		$('#hq').on('click',function(){
			console.log(home.a)
		})
		$('#gb').on('click',function(){
			console.log(home.a = '哈哈哈')
		})
	})
});
// new Page({
// 	el: '', // css选择器
// 	/**
// 	 * 初始化完成的钩子
// 	 */
// 	mounted() {

// 	},
// 	/**
// 	 * 调用show方法的钩子
// 	 * @param {*} resolve 调用resolve函数的话继续show，否则直接停止show
// 	 */
// 	beforShow(resolve) {
// 		resolve()
// 	},
// 	/**
// 	 * 调用hide方法的钩子
// 	 * @param {*} resolve 调用resolve函数的话继续hide，否则直接停止hide
// 	 */
// 	beforHide(resolve) {
// 		resolve()
// 	},
// 	/**
// 	 * 调用fadeIn方法的钩子
// 	 * @param {*} resolve 调用resolve函数的话继续fadeIn，否则直接停止fadeIn
// 	 */
// 	beforFadeIn(resolve) {
// 		resolve()
// 	},
// 	/**
// 	 * 调用fadeOut方法的钩子
// 	 * @param {*} resolve 调用resolve函数的话继续fadeOut，否则直接停止fadeOut
// 	 */
// 	beforFadeOut(resolve) {
// 		resolve()
// 	}
// })