

import { PxLoader } from '@/common/js'
export default class Page {
	constructor(opts = { methods: {} }) {
		if (!opts.el) throw '错误：el必须是一个css选择器';
		this.$methods = opts.methods;
		this.$data = opts.data;
		this.$el = $(opts.el);
		['mounted', 'beforShow', 'beforHide', 'beforFadeIn', 'beforFadeOut'].forEach(n => this[n] = opts[n]);
		this.proxy(this.$methods);
		this.proxy(this.$data);
		this.createdEvents();
		if (typeof this.mounted == 'function') this.mounted();
	}
}
/**
 * 加载图片，并且返回资料清单
 * @param {Object,Array} images 
 * @param {Object} opts 
 * autoStart 是否自动开始加载
 * addProgressListener 加载进度
 * addCompletionListener 加载完成
 */
Page.prototype.loaderImage = function (images, opts) {
	if (!images) { throw '错误：images是必填参数' };
	var loader = new PxLoader();
	if (Array.isArray(images)) {
		images.forEach((n, i) => images[i] = loader.addImage(n))
	} else if (Object.prototype.toString.call(images) == "[object Object]") {
		for (const key in images) images[key] = loader.addImage(images[key]);
	}
	if (Object.prototype.toString.call(opts.addProgressListener) == "[object Function]") loader.addProgressListener(opts.addProgressListener);
	if (Object.prototype.toString.call(opts.addCompletionListener) == "[object Function]") loader.addProgressListener(opts.addCompletionListener);
	if (opts.autoStart) loader.start();
	return { manifest: images, start: loader.start.bind(loader) }
}
/**
 * 淡出页面
 */
Page.prototype.fadeOut = function () {
	let _this = this;
	let params = Array.prototype.slice.call(arguments, 0);
	typeof _this.beforFadeOut == 'function' ? _this.beforFadeOut(() => _this.$el.fadeOut(params)) : _this.$el.fadeOut(params);
}
/**
 * 淡入页面
 */
Page.prototype.fadeIn = function () {
	let _this = this;
	let params = Array.prototype.slice.call(arguments, 0);
	typeof _this.beforFadeIn == 'function' ? _this.beforFadeIn(() => _this.$el.fadeIn(params)) : _this.$el.fadeIn(params);
}
/**
 * 显示页面
 */
Page.prototype.show = function () {
	let _this = this;
	let params = Array.prototype.slice.call(arguments, 0);
	typeof _this.beforShow == 'function' ? _this.beforShow(() => _this.$el.show(params)) : _this.$el.show(params);
}
/**
 * 隐藏页面
 */
Page.prototype.hide = function () {
	let _this = this;
	let params = Array.prototype.slice.call(arguments, 0);
	typeof _this.beforHide == 'function' ? _this.beforHide(() => _this.$el.hide(params)) : _this.$el.hide(params);
}
/**
 * 创建事件机制
 */
Page.prototype.createdEvents = function () {
	let events = {};
	this.on = (event, callback) => {
		if (!event) return
		if (Array.isArray(events[event])) {
			events[event].push(callback);
		} else {
			events[event] = [callback];
		}
	}
	this.trigger = (event) => {
		if (!event) return
		if (events[event]) {
			events[event].forEach(callback => {
				callback.apply(this, Array.prototype.slice.call(arguments, 1))
			});
		}
	}
}
/**
 * 数据访问代理
 * @param {*} data 
 */
Page.prototype.proxy = function (data) {
	Object.keys(data).forEach(key => {
		Object.defineProperty(this, key, {
			enumerable: true,
			configurable: true,
			get() {
				return data[key]
			},
			set(newValue) {
				if (data[key] == newValue) {
					return
				}
				data[key] = newValue
			}
		})
	})
}
/**
 * 数据访问代理
 * @param {*} data 
 */
Page.prototype.setData = function (key, value) {
	Page.prototype[key] = value
}
