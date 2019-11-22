import 'jquery.transit'
import 'pxloader/PxLoaderImage'
import { ibase, os } from 'base.js'
import imath from 'math.js'
import { ibgm, iaudio } from 'audio.js'
import imonitor from 'monitor.js'
const ishare = importShare()
const icom = importCom()
//-------------------------------------------------------自定义分享内容
ishare.wxId = 'wx1c1f89b6f490b8e7';//微信 appid
ishare.tbId = '';//手淘 appid
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
if (os.weixin) {
    ishare.from = icom.getQueryString('from');
    ishare.from = ishare.from || 'friend';
    ishare.from = ishare.from == 'groupmessage' || ishare.from == 'singlemessage' ? 'friend' : ishare.from;
    console.log('微信分享来源：' + ishare.from);
    ishare.wxSign();
}
// com.js
function importCom() {
    var com = {};

    //初始化
    com.init = function (callback) {
        var article = $('article');
        if (ibase.dir == 'portrait') {
            lock_dected();
        }
        else {
            html_resize();
            $(window).on('resize', window_orientation);
            lock_dected();
        }

        function lock_dected() {
            if (ibase.lock) requestAnimationFrame(lock_dected);
            else if (callback) callback();
        }

        function window_orientation(e) {
            if (os.ios) for (var i = 0; i < 3; i++) setTimeout(html_resize, i * 150);
            else html_resize();
        }

        function html_resize() {
            var dir = ibase.getOrient(true);
            if (dir == 'portrait') {
                if (ibase.landscapeScaleMode == 'cover' || ibase.landscapeScaleMode == 'contain') {
                    var size = imath.autoSize([ibase.landscapeHeight, ibase.landscapeWidth], [window.innerWidth, window.innerHeight], ibase.landscapeScaleMode);
                    var scale = size[0] / ibase.landscapeHeight;
                    console.log('window size:' + window.innerHeight + '/' + window.innerWidth);
                    console.log('auto scale:' + scale);
                    ibase.landScapeScaleX = ibase.landScapeScaleY = scale;
                    article.css({
                        width: ibase.landscapeWidth,
                        height: ibase.landscapeHeight,
                        rotate: 90,
                        scale: scale,
                        x: os.iphoneX ? 0 : (window.innerHeight / scale - ibase.landscapeWidth) * 0.5,
                        y: -ibase.landscapeHeight + (ibase.landscapeHeight - window.innerWidth / scale) * 0.5
                    });
                }
                else {
                    var scale = [window.innerWidth / ibase.landscapeHeight, window.innerHeight / ibase.landscapeWidth];
                    console.log('window size:' + window.innerHeight + '/' + window.innerWidth);
                    console.log('auto scale:' + scale);
                    ibase.landScapeScaleX = scale[0];
                    ibase.landScapeScaleY = scale[1];
                    article.css({
                        width: ibase.landscapeWidth,
                        height: ibase.landscapeHeight,
                        rotate: 90,
                        scaleX: scale[1],
                        scaleY: scale[0],
                        x: 0,
                        y: -ibase.landscapeHeight
                    });
                }
            }
            else {
                console.log('screen landscape');
                if (ibase.landscapeScaleMode == 'cover' || ibase.landscapeScaleMode == 'contain') {
                    var size = imath.autoSize([ibase.landscapeWidth, ibase.landscapeHeight], [os.iphoneX && window.innerWidth > 724 ? window.innerWidth - ibase.iphoneXOffsetLandscape * 2 : window.innerWidth, window.innerHeight], ibase.landscapeScaleMode);
                    var scale = size[0] / ibase.landscapeWidth;
                    console.log('window size:' + window.innerWidth + '/' + window.innerHeight);
                    console.log('auto scale:' + scale);
                    ibase.landScapeScaleX = ibase.landScapeScaleY = scale;
                    article.css({
                        width: ibase.landscapeWidth,
                        height: ibase.landscapeHeight,
                        rotate: 0,
                        scale: scale,
                        x: (window.innerWidth / scale - ibase.landscapeWidth) * 0.5 + os.iphoneX && window.innerWidth > 724 ? ibase.iphoneXOffsetLandscape / scale : 0,
                        y: (window.innerHeight / scale - ibase.landscapeHeight) * 0.5
                    });
                }
                else {
                    var scale = [window.innerWidth / ibase.landscapeWidth, window.innerHeight / ibase.landscapeHeight];
                    console.log('window size:' + window.innerHeight + '/' + window.innerWidth);
                    console.log('auto scale:' + scale);
                    ibase.landScapeScaleX = scale[0];
                    ibase.landScapeScaleY = scale[1];
                    article.css({
                        width: ibase.landscapeWidth,
                        height: ibase.landscapeHeight,
                        rotate: 0,
                        scaleX: scale[0] + os.iphoneX ? ibase.iphoneXOffsetLandscape / scale[0] : 0,
                        scaleY: scale[1],
                        x: 0,
                        y: 0
                    });
                }
            }
        }

    }

    //解锁屏幕滑动
    com.screenScrollEnable = function () {
        var article = $('article');
        var html = $('html');
        if (ibase.dir == 'portrait') {
            article.css({ 'overflow-y': 'auto' });
            if (os.ios) html.css({ 'position': 'relative' });
            $(document).off('touchmove', noScroll);
        }
        else {
            article.off('touchmove', noScroll);
        }
    }

    //锁定屏幕滑动
    com.screenScrollUnable = function () {
        var article = $('article');
        var html = $('html');
        if (ibase.dir == 'portrait') {
            article.css({ 'overflow-y': 'hidden' });
            if (os.ios) html.css({ 'position': 'fixed' });
            $(document).on('touchmove', noScroll);
        }
        else {
            article.on('touchmove', noScroll);
        }
    }

    function noScroll(e) {
        e.preventDefault();
    }

    //取代jquery的fadeIn
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
    }

    //取代jquery的fadeOut
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
    }

    //打开弹窗，会自动寻找a.close对象绑定关闭事件，并在关闭时执行回调
    com.popOn = function (obj, options) {
        if (obj && obj.length > 0) {
            var defaults = {
                closeEvent: 'touchend',
                closeType: 'button',
                closeBtn: obj.find('a.close'),
                onClose: function () { },
                remove: false
            };
            var opts = $.extend(defaults, options);
            if (opts.text) obj.find('.text').html(opts.text);
            if (opts.fade) com.fadeIn(obj, opts.fade);
            else obj.show();
            if (opts.closeBtn.length > 0 && opts.closeType == 'button') opts.closeBtn.one(opts.closeEvent, obj_close);
            else obj.one(opts.closeEvent, obj_close);
            obj.on('close', obj_close);
        }
        function obj_close(e) {
            if (opts.closeBtn.length > 0 && opts.closeType == 'button') opts.closeBtn.off(opts.closeEvent, obj_close);
            else obj.off(opts.closeEvent, obj_close);
            if (opts.fade) com.fadeOut(obj, opts.fade, function () {
                if (opts.remove) obj.remove();
            });
            else if (opts.remove) obj.remove();
            else obj.hide();
            obj.off('close', obj_close);
            opts.onClose(obj);
        }
    }

    //关闭使用popOn方法打开的弹窗
    com.popOff = function (obj) {
        if (obj && obj.length > 0) obj.trigger('close');
    }

    //取代系统alert
    com.alert = function (text, callback) {
        if (text && text != '') {
            var box = $('<aside class="alertBox"><div><p class="text"></p><p class="btn"><a href="javascript:;" class="close">确定</a></p></div></aside>').appendTo(ibase.dir == 'landscape' ? 'article' : 'body');
            com.popOn(box, {
                text: text,
                onClose: callback,
                remove: true,
                closeEvent: 'click'
            });
        }
    }

    //带有“取消”和“确认”按钮的对话框
    com.confirm = function (text, callbackConfirm, callbackCancel, btnCancelText, btnConfirmText) {
        text = text || '';
        btnCancelText = btnCancelText || '取消';
        btnConfirmText = btnConfirmText || '确认';
        if (text != '') {
            var box = $('<aside class="confirmBox"><div><p class="text">' + text + '</p><p class="btn"><a href="javascript:;" class="cancel">' + btnCancelText + '</a><a href="javascript:;" class="confirm">' + btnConfirmText + '</a></p></div></aside>').appendTo(ibase.dir == 'landscape' ? 'article' : 'body');
            var btn = box.find('a');
            btn.one('click', function (e) {
                if ($(this).index() == 0 && callbackCancel) callbackCancel();
                else if ($(this).index() == 1 && callbackConfirm) callbackConfirm();
                btn.off();
                box.remove();
            })
        }
    }

    //获得http url参数
    com.getQueryString = function (name) {
        if (name && name != '') {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]);
            return null;
        }
        else return null;
    }

    //获取路径
    com.getPath = function (path) {
        if (path && path != '') return path.substr(0, path.lastIndexOf('/') + 1);
        else return false;
    }

    //载入图片函数
    com.imageLoad = function (src, callback) {
        if (src) {
            var loader = new PxLoader();
            if ($.type(src) === "string" && src != '') loader.addImage(src);
            else if ($.type(src) === "array" && src.length > 0) {
                for (var i = 0; i < src.length; i++) loader.addImage(src[i]);
            }
            loader.addCompletionListener(function () {
                loader = null;
                if (callback) callback(src);
            });
            loader.start();
        }
    }

    //常用正则
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
            if (reg.exec($.trim(str))) return true;
            else return false;
        }
        else return false;
    }

    //解决ios下input、textarea无法自动失去焦点的问题
    com.keyboard = function (input) {
        input = input || $('input,textarea,[contenteditable="true"]');
        if (input.length > 0) {
            var body = $('body');
            if (os.ios) input.on('focus', input_focus).on('blur', input_blur);
            else body.height(body[0].clientHeight);
        }
        function input_focus(e) {
            body.one('touchend', ios_blur);
        }//edn event
        function input_blur() {
            $(window).scrollTop(0);
        }//edn event
        function ios_blur(e) {
            if (e.target != input[0]) input.blur();
        }//edn event
    }

    //解决ios下select无法自动失去焦点的问题
    com.select = function (select) {
        select = select || $('select');
        if (select.length > 0) {
            if (os.ios) {
                select.on('focus', function (e) {
                    $(document).one('touchend', ios_select);
                });
            }
        }

        function ios_select(e) {
            if (e.target != select[0]) select.blur();
        }

    }

    //物体抖动
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
            var x = imath.randomRange(-opts.rx, opts.rx);
            var y = imath.randomRange(-opts.ry, opts.ry);
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
            }
            else setTimeout(com.shake, opts.delay, box, opts);
        }
    }

    //获取textarea里的回车和空格
    com.textareaGet = function (textarea, row) {
        row = row || 0;
        var str1 = textarea.val();
        if (str1 == '') return '';
        else {
            var str2 = str1.replaceAll("\n", "<br/>");
            return row_cut(str2, row);
        }
    }

    //输入textarea里的回车和空格
    com.textareaSet = function (textarea, str) {
        if (str == '') textarea.val('');
        else textarea.val(str.replaceAll("<br/>", "\n"));
    }

    //限制textarea输入文字的行数
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
                var final = str3.replaceAll("<br/>", "\n");
                textarea.val(final);
            }
        }

        function textarea_lock() {
            var first = com.textareaGet(textarea, row);
            if (first.indexOf('<br/>') == -1) textarea.attr({
                maxlength: max
            });
            else textarea.attr({
                maxlength: max + (first.split('<br/>').length - 1) * 2
            });
        }
    }

    function row_cut(str, row) {
        row = row || 0;
        var str2 = str.split('<br/>');
        if (row <= 0 || str2.length <= row) return str;
        else {
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
        if (line == 1) return str;
        else {
            var str1 = '';
            for (var i = 0; i < line; i++) {
                if (i == 0) str1 += str.substr(0, col) + '<br/>';
                else if (i < line - 1) str1 += str.substr(i * col, col) + '<br/>';
                else str1 += str.substr(i * col);
            } //edn for
            return str1;
        }
    }

    function col_cut(str, col) {
        if (str.length > col) return str.substr(0, col);
        else return str;
    }

    //限制textarea输入文字的行数
    com.textareaUnlock = function (textarea) {
        textarea.off();
    }

    //切割单行文字成几行
    com.textToMulti = function (str, col) {
        if (str != '' && col > 1) {
            if (str.indexOf('\n') == -1 && str.length > col) {
                var str1 = '';
                var line = Math.ceil(str.length / col);
                console.log('line:' + line);
                for (var i = 0; i < line; i++) {
                    if (i < line - 1) str1 += str.substr(i * col, col) + '\n';
                    else str1 += str.substr(i * col);
                } //edn for
                return str1;
            }
            else return str;
        }
        else return null;
    }

    //拼带参数的url链接
    com.url = function (url, para) {
        var now = -1;
        for (var key in para) {
            now++;
            if (now == 0) url += '?';
            else url += '&';
            url += key + '=' + para[key]
        } //end for
        return url;
    };

    //以帧为单位的setTimeout
    com.setTimeout = function (callback, frame) {
        if (frame > 0 && callback) return setTimer(callback, frame, false);
    }

    com.clearTimeout = function (timer) {
        if (timer && timer.timer) clearTimer(timer);
    }

    //以帧为单位的setInterval
    com.setInterval = function (callback, frame) {
        if (frame > 0 && callback) return setTimer(callback, frame, true);
    }

    com.clearInterval = function (timer) {
        if (timer && timer.timer) clearTimer(timer);
    }

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
            if (interval || (!interval && !timeup)) timer.timer = requestAnimationFrame(timer_handler);
        }

    }

    //将canvas转成存在cdn服务器上的远程图片地址
    com.canvas_send = function (canvas, callback, secretkey, type, compress) {
        if (canvas) {
            secretkey = secretkey || 'test';
            type = type || 'jpg';
            compress = compress || 0.95;
            if (type == 'png') var base64 = canvas.toDataURL('image/png');
            else var base64 = canvas.toDataURL('image/jpeg', compress);
            this.base64_send(base64, callback, secretkey);
        }
    }

    //将base64数据格式转成存在cdn服务器上的远程图片地址
    com.base64_send = function (base64, callback, secretkey) {
        if (base64) {
            secretkey = secretkey || 'test';
            $.post('https://tool.h5-x.com/cdn/base64', {
                data: base64,
                key: secretkey
            }, function (resp) {
                if (resp.errcode == 0) {
                    if (callback) callback(resp.result);
                }
                else {
                    console.log('errmsg:' + resp.errmsg);
                }
            }, 'json');
        }
    }

    //将跨域的远程图片地址转成base64数据格式，解决图片跨域问题
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
    }

    //将字符串转成二维码，返回base64数据格式
    com.qrcode = function (txt, options) {
        var defaults = { size: 200, color: '000000', bg: 'ffffff', border: 0, error: 0 };
        var data = $.extend(defaults, options);
        if (txt && txt != '') {
            var src = 'http://tool.h5-x.com/image/qrcode?txt=' + txt + '&size=' + data.size + '&color=' + data.color + '&bg=' + data.bg + '&border=' + data.border + '&error=' + data.error + (data.logo ? '&logo=' + data.logo : '');
            return src;
        }
        else return null;
    }

    //将字符串转成条形码，返回base64数据格式
    com.barcode = function (txt, options) {
        var defaults = { width: 400, height: 200, color: '000000', bg: 'ffffff', pure: true };
        var data = $.extend(defaults, options);
        if (txt && txt != '') {
            var src = 'http://tool.h5-x.com/image/barcode?txt=' + txt + '&width=' + data.width + '&height=' + data.height + '&color=' + data.color + '&bg=' + data.bg + '&pure=' + data.pure;
            return src;
        }
        else return null;
    }

    //一键复制字符串到剪贴板
    com.clipboard = function (box, val, onComplete, onError) {
        var support = !!document.queryCommandSupported;
        console.log('support:' + support);
        if (support) {
            if (box.length > 0 && val != '') {
                box.attr({ 'data-copy': val }).on('click', { callback: onComplete }, copyText);
            }
        }
        else {
            console.log('浏览器不支持复制文本到剪贴板');
            if (onError) onError();
        }
    }

    function copyText(e) {
        var val = $(this).data('copy');
        var input = $('<textarea readonly="readonly"></textarea>').html(val).css({ position: 'absolute', left: 0, top: 0, width: 1, height: 1, visible: 'hidden' }).appendTo('body');
        input[0].select();
        input[0].setSelectionRange(0, input[0].value.length);
        console.log('copy content:' + input.val())
        document.execCommand('Copy');
        input.remove();
        input = null;
        if (e.data.callback) e.data.callback();
    }

    //显示页面渲染fps
    com.fpsShow = function (shell, space) {
        space = space || 30;
        space = space < 10 ? 10 : space;
        shell = shell || $('<div id="fpsShow"></div>').appendTo(ibase.dir == 'landscape' ? 'article' : 'body');
        requestAnimationFrame(function () {
            fps_dected(new Date().getTime(), -1);
        });

        function fps_dected(last, count) {
            var now = new Date().getTime();
            var fps = Math.round(1000 / (now - last));
            fps = fps > 60 ? 60 : fps;
            count++;
            if (count % space == 0) {
                if (fps >= 40) var classname = 'fpsFast';
                else if (fps >= 20) var classname = 'fpsNormal';
                else var classname = 'fpsSlow';
                shell.removeClass().addClass(classname).html('fps:' + fps);
            }
            requestAnimationFrame(function () {
                fps_dected(now, count);
            });
        }

    }

    //出血方案
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
                ibase.bleedScale = scale;
                shell.css({
                    transformOrigin: '50% ' + (os.iphoneX ? 0 : '0.15rem'),
                    scale: scale
                });
            }
        }
    }//edn fun

    //为iphoneX加上底部安全区域
    com.FullBar = function (ht) {
        ht = ht || 30;
        if (os.FullBar) {
            window_resize();
            $(window).on('resize', window_resize);
        }
        function window_resize(e) {
            if (window.innerHeight > 667) $('article').css({ height: 'calc( 100% - ' + (ht * 0.01) + 'rem )' });
            else $('article').css({ height: '100%' });
        }//end event
    }//edn fun

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
            var w = shell.width(), h = shell.height();
            var iw = articleBox.width(), ih = articleBox.height();
            // xRatio 宽度缩放值 yRatio 高度缩放值
            xRatio = iw / w, yRatio = ih / h, sRatio = 1;
            if (scaleType == 'contain') {
                // 缩放舞台以完全装入父元素					
                sRatio = Math.min(xRatio, yRatio);
            } else if (scaleType == 'cover') {
                // 缩放舞台以完全覆盖父元素						
                sRatio = Math.max(xRatio, yRatio);
            } else if (scaleType == 'width') {
                // 缩放舞台以宽度完全装入父元素				
                sRatio = xRatio
            } else {
                // 缩放舞台以高度完全装入父元素
                sRatio = yRatio
            }
            shell.css({
                scale: sRatio
            });
        }
    }//edn fun

    // 获取开始时间倒结束时间之间n年n月n日
    com.time_valide = function (start_time, end_time) {
        var common_year = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var leap_year = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        end_time = end_time || new Date().Format('yyyy-MM-dd hh:mm:ss');
        //验证时间格式
        var reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
        var regExp = new RegExp(reg);
        if (!regExp.test(end_time) || !regExp.test(start_time)) {
            return false;
        }
        //判断前后时间大小
        var timestamp_start_time = Date.parse(new Date(start_time));
        var timestamp_end_time = Date.parse(new Date(end_time));
        if (timestamp_end_time / 1000 - timestamp_start_time / 1000 < 0) {
            return false;
        }

        //获取前四位
        var time_info_start = start_time.split(' ');
        var time_info_end = end_time.split(' ');

        //获取年月日
        var year_month_day_start = time_info_start[0].split('-');
        var year_month_day_end = time_info_end[0].split('-');
        //获取时间
        var hour_minute_second_start = time_info_start[1].split(':');
        var hour_minute_second_end = time_info_end[1].split(':');

        var beapart_year = parseInt(year_month_day_end[0]) - parseInt(year_month_day_start[0]);

        //进行判断时间
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
        }
        //同一年
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
            }
            //非同一年
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
    }
    String.prototype.replaceAll = function (s1, s2) {
        return this.replace(new RegExp(s1, "gm"), s2);
    }
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
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

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
    }
    return com;
}

// share.js
function importShare() {
    var imonitor = window.imonitor || {};
    var share = {};
    share.wxSigned = false;
    share.tbSigned = false;
    share.tbLoaded = 0;

    //-------------------------------------------------------微信SDK验证
    share.wxSign = function () {
        $.get("http://scrm.h5-x.com/api/jssdk/sign", { appid: share.wxId, url: location.href }, function (data) {
            wx.config({
                debug: false,
                appId: data.appid,
                timestamp: data.timestamp,
                nonceStr: data.noncestr,
                signature: data.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                ]
            });//end wx.config
            share.wxSigned = true;//通过微信新SDK验证
            wx.ready(function () {
                wx.showOptionMenu();//用微信“扫一扫”打开，optionMenu是off状态，默认开启
                share.wxShare();
            });//end wx.ready
        }, 'json');//end ajax
    }

    //-------------------------------------------------------微信分享函数
    share.wxShare = function () {
        if (share.wxSigned) {
            var sharelink = share.content.link;
            if (localStorage.openid) {
                sharelink = sharelink + (sharelink.indexOf('?') > 0 ? '&' : '?') + 'from_openid=' + localStorage.openid;
            }
            wx.onMenuShareTimeline({
                title: share.content.timeline, // 分享标题
                link: sharelink, // 分享链接
                imgUrl: share.content.image, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    if (imonitor.add) imonitor.add({ label: '分享到朋友圈' });
                    if (share.wxShareSuccess) share.wxShareSuccess();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if (share.wxShareCancel) share.wxShareCancel();
                }
            });
            wx.onMenuShareAppMessage({
                title: share.content.title, // 分享标题
                desc: share.content.friend, // 分享描述
                link: sharelink, // 分享链接
                imgUrl: share.content.image, // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                    if (imonitor.add) imonitor.add({ label: '分享给朋友' });
                    if (share.wxShareSuccess) share.wxShareSuccess();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if (share.wxShareCancel) share.wxShareCancel();
                }
            });
        }
        else setTimeout(share.wxShare, 250);
    }

    //-------------------------------------------------------微博站外分享函数
    share.wbShare = function (option) {
        var url, txt, img, imgHtml = '';
        if (option.obj) var btn = option.obj;
        else var btn = $('a.btnShare');
        if (btn.length > 0) {
            url = option.url || window.location.href;
            txt = option.text || "";
            img = option.image;
            txt = encodeURIComponent(txt);
            url = encodeURIComponent(url);
            if (img && img.length > 0) {
                imgHtml = "&pic=";
                if ($.type(img) === "string") imgHtml += img;
                else for (var i = 0; i < img.length; i++) {
                    imgHtml += img[i];
                    if (i < img.length - 1) imgHtml += '||'
                }//end for
                imgHtml += '&searchPic=false';
            }//end for
            btn.attr({ target: '_blank', href: 'http://service.weibo.com/share/share.php?url=' + url + '&title=' + txt + imgHtml });
        }
    }

    //-------------------------------------------------------一键分享按钮，在微信下弹窗分享提示层，在浏览器下用微博外链式分享
    share.btnShare = function (btn, box) {
        if (btn) var shareBtn = btn;
        else var shareBtn = $('a.btnShare');
        if (box) var shareBox = box;
        else var shareBox = $('#shareBox');
        if (shareBtn.length > 0) {
            share.shareBtn = shareBtn;
            if (os.weixin) {
                if (shareBox.length == 0) shareBox = $(`<aside class="shareBox"><img src="${require('../../images/common/share.png')}"></aside>`).appendTo(ibase.landscapeMode ? 'article' : 'body');
                shareBtn.on('touchend', { box: shareBox }, shareBtn_click);
            }
            else share.wbShare({ obj: shareBtn, url: share.content.link, text: share.content.weibo, image: share.content.image });
        }
    }

    function shareBtn_click(e) {
        var shareBox = e.data.box;
        shareBox.show().one('touchend', function (e) {
            $(this).hide();
        });
    }

    //-------------------------------------------------------重置分享内容
    share.reset = function (opts) {
        if (opts) {
            if (opts.link) share.content.link = opts.link;
            if (opts.image) share.content.image = opts.image + '?v=' + Math.random();
            if (opts.title) share.content.title = opts.title;
            if (opts.friend) share.content.friend = opts.friend;
            if (opts.timeline) share.content.timeline = opts.timeline;
            if (os.weixin) wx.ready(function () {
                share.wxShare();
            });//end wx.ready
            else share.wbShare({ obj: share.shareBtn, url: share.content.link, text: share.content.timeline, image: share.content.image });
        }
    }

    share.hideMenu = function (menuList) {
        wx.ready(function () {
            menuList = menuList || ["menuItem:copyUrl"];
            wx.hideMenuItems({
                menuList: ["menuItem:copyUrl"] // 要隐藏的菜单项
            });
        });//end wx.ready
    }

    //-------------------------------------------------------手淘分享
    share.tbSign = function () {
        if (this.tbId != '') {
            console.log('tbId:' + this.tbId);
            document.write('<meta name="spm-id" content="a1z51.' + this.tbId + '"/>');
            document.write('<meta id="WV.Meta.Share.Title" value="' + this.content.title + '" />');
            document.write('<meta id="WV.Meta.Share.Text" value="' + this.content.timeline + '" />');
            document.write('<meta id="WV.Meta.Share.Image" value="' + this.content.image + '" />');
            ibase.loadJs('//g.alicdn.com/tmapp/tida/3.3.26/tida.js?appkey=' + this.tbId, 'body', tbDeccted);
        }
    }

    function tbDeccted() {
        if (Tida) {
            share.Tida = Tida.appinfo.isTaobao || Tida.appinfo.isTmall;
            share.TidaNick = '';
            thLogin();
        }
        else requestAnimationFrame(tbDeccted);
    }

    function thLogin() {
        Tida.ready({
            //		 console : 1//1代表开启debug
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
                }
                else {
                    alert('请先登录');
                }
            });
        });
    }

    share.tbShare = function (url, title, content, image) {//重新自定义手淘分享内容
        Tida.share({
            title: title, // 分享标题 在来往和微信好友中有标题显示
            content: content, //分享的内容
            url: url, // 跳转地址，分享的内容跳转的url
            image: image
        }, function (data) {
            // 分享接口调用成功，在手机淘宝下面该回调仅代表API执行成功，非分享成功与否的回调。
        });
    }

    return share;
}

export {
    icom,
    ishare,
    ibase,
    os,
    ibgm,
    iaudio,
    imonitor,
    imath
} 