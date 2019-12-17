

import { PxLoader } from '@/common/js'
export class Basics {
	constructor() {
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
	 * 加载图片，并且返回资料清单
	 * @param {Object,Array} images 
	 * @param {Object} options 
	 * autoStart 是否自动开始加载
	 * addProgressListener 加载进度
	 * addCompletionListener 加载完成
	 */
	loaderImage(images, options) {
		if (!images) { throw new Error('images是必填参数') };
		var loader = new PxLoader();
		if (Array.isArray(images)) {
			images.forEach((n, i) => images[i] = loader.addImage(n))
		} else if (Object.prototype.toString.call(images) == "[object Object]") {
			for (const key in images) images[key] = loader.addImage(images[key]);
		}
		if (Object.prototype.toString.call(options.addProgressListener) == "[object Function]") loader.addProgressListener(options.addProgressListener);
		if (Object.prototype.toString.call(options.addCompletionListener) == "[object Function]") loader.addProgressListener(options.addCompletionListener);
		if (options.autoStart) loader.start();
		return { manifest: images, start: loader.start.bind(loader) }
	}
	show() {
		let _this = this;
		let params = Array.prototype.slice.call(arguments, 0);
		typeof _this.beforShow == 'function' ? _this.beforShow(() => _this.$el.show(params)) : _this.$el.show(params);
	}
	hide() {
		let _this = this;
		let params = Array.prototype.slice.call(arguments, 0);
		typeof _this.beforHide == 'function' ? _this.beforHide(() => _this.$el.hide(params)) : _this.$el.hide(params);
	}
	fadeIn() {
		let _this = this;
		let params = Array.prototype.slice.call(arguments, 0);
		typeof _this.beforShow == 'function' ? _this.beforFadeIn(() => _this.$el.fadeIn(params)) : _this.$el.fadeIn(params);
	}
	fadeOut() {
		let _this = this;
		let params = Array.prototype.slice.call(arguments, 0);
		typeof _this.beforHide == 'function' ? _this.beforFadeOut(() => _this.$el.fadeOut(params)) : _this.$el.fadeOut(params);
	}
	/**
	 * 设置所有页面都可以访问的数据
	 * @param {*} attr 
	 * @param {*} value 
	 */
	setData(attr, value) {
		let publicData = Basics.prototype;
		publicData[attr] = value
	}
}