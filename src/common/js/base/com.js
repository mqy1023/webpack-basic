import { ibase, os } from './base.js'
import {randomRange} from './math.js'

//解锁屏幕滑动
function screenScrollEnable() {
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
function screenScrollUnable() {
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

//关闭使用popOn方法打开的弹窗
function popOff(obj) {
    if (obj && obj.length > 0) obj.trigger('close');
}

//取代系统alert
function alert(text, callback) {
    if (text && text != '') {
        var box = $('<aside class="alertBox"><div><p class="text"></p><p class="btn"><a href="javascript:;" class="close">确定</a></p></div></aside>').appendTo(ibase.dir == 'landscape' ? 'article' : 'body');
        popOn(box, {
            text: text,
            onClose: callback,
            remove: true,
            closeEvent: 'click'
        });
    }
}

//带有“取消”和“确认”按钮的对话框
function confirm(text, callbackConfirm, callbackCancel, btnCancelText, btnConfirmText) {
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

//常用正则
function checkStr(str, type) {
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
function keyboard(input) {
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
function select(select) {
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
function shake(box, options) {
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
        var x = randomRange(-opts.rx, opts.rx);
        var y = randomRange(-opts.ry, opts.ry);
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
        else setTimeout(shake, opts.delay, box, opts);
    }
}

//获取textarea里的回车和空格
function textareaGet(textarea, row) {
    row = row || 0;
    var str1 = textarea.val();
    if (str1 == '') return '';
    else {
        var str2 = str1.replaceAll("\n", "<br/>");
        return row_cut(str2, row);
    }
}

//输入textarea里的回车和空格
function textareaSet(textarea, str) {
    if (str == '') textarea.val('');
    else textarea.val(str.replaceAll("<br/>", "\n"));
}

//限制textarea输入文字的行数
function textareaLock(textarea) {
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
        var first = textareaGet(textarea, row);
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
        var first = textareaGet(textarea, row);
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

//解除限制textarea输入文字的行数
function textareaUnlock(textarea) {
    textarea.off();
}

//切割单行文字成几行
function textToMulti(str, col) {
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
function spliceurl(url, para) {
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
function setTimeout(callback, frame) {
    if (frame > 0 && callback) return setTimer(callback, frame, false);
}

function clearTimeout(timer) {
    if (timer && timer.timer) clearTimer(timer);
}

//以帧为单位的setInterval
function setInterval(callback, frame) {
    if (frame > 0 && callback) return setTimer(callback, frame, true);
}

function clearInterval(timer) {
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
function canvas_send(canvas, callback, secretkey, type, compress) {
    if (canvas) {
        secretkey = secretkey || 'test';
        type = type || 'jpg';
        compress = compress || 0.95;
        if (type == 'png') var base64 = canvas.toDataURL('image/png');
        else var base64 = canvas.toDataURL('image/jpeg', compress);
        base64_send(base64, callback, secretkey);
    }
}

//将base64数据格式转成存在cdn服务器上的远程图片地址
function base64_send(base64, callback, secretkey) {
    if (base64) {
        secretkey = secretkey || 'test';
        $.post('/common/cdn/base64', {
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
function base64_get(link, callback, secretkey) {
    if (link) {
        secretkey = secretkey || 'test';
        $.post('/common/image/base64', {
            link: link,
            key: secretkey
        }, function (resp) {
            if (callback) callback(resp);
        }, 'text');
    }
}

//将字符串转成二维码，返回base64数据格式
function qrcode(txt, options) {
    var defaults = { size: 200, color: '000000', bg: 'ffffff', border: 0, error: 0 };
    var data = $.extend(defaults, options);
    if (txt && txt != '') {
        var src = 'http://tool.h5-x.icom/image/qrcode?txt=' + txt + '&size=' + data.size + '&color=' + data.color + '&bg=' + data.bg + '&border=' + data.border + '&error=' + data.error + (data.logo ? '&logo=' + data.logo : '');
        return src;
    }
    else return null;
}

//将字符串转成条形码，返回base64数据格式
function barcode(txt, options) {
    var defaults = { width: 400, height: 200, color: '000000', bg: 'ffffff', pure: true };
    var data = $.extend(defaults, options);
    if (txt && txt != '') {
        var src = 'http://tool.h5-x.icom/image/barcode?txt=' + txt + '&width=' + data.width + '&height=' + data.height + '&color=' + data.color + '&bg=' + data.bg + '&pure=' + data.pure;
        return src;
    }
    else return null;
}

//一键复制字符串到剪贴板
function clipboard(box, val, onComplete, onError) {
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
function fpsShow(shell, space) {
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
function bleed(shell, maxSize) {
    shell = shell || $('.articleBleed');
    maxSize = maxSize || [936, 1218];
    if (shell.length > 0) {
        var article = $('article');
        resize_handler();
        $(window).on('resize', shell_resize);
    }
    function shell_resize(e) {
        setTimeout(resize_handler, 5);
    }
    function resize_handler() {
        if (window.innerWidth < window.innerHeight) {
            var windowScale = window.innerWidth / 750;
            var scale = article.height() / windowScale / maxSize[1];
            window.bleedScale = scale;
            shell.css({
                transformOrigin: '50% 0',
                scale: scale
            });
        }
    }
}//edn fun

// 缩放适配方案
function adaptation(scaleType, shell) {
    shell = shell || $('.articleBleed');
    var articleBox = $('article');
    if (shell.length > 0) {
        resize_handler();
        $(window).on('resize', shell_resize);
    }
    function shell_resize(e) {
        setTimeout(resize_handler, 5);
    }
    function resize_handler() {
        var w = shell.width(), h = shell.height();
        var iw = articleBox.width(), ih = articleBox.height();
        // xRatio 宽度缩放值 yRatio 高度缩放值
        var xRatio = iw / w, yRatio = ih / h, sRatio = 1;
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
        window.scaleRatio = sRatio;
        shell.css({
            scale: sRatio
        });
    }
}//edn fun

// 获取开始时间倒结束时间之间n年n月n日
function time_valide(start_time, end_time) {
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
export {
    screenScrollEnable,
    screenScrollUnable,
    popOff,
    alert,
    confirm,
    checkStr,
    keyboard,
    select,
    shake,
    textareaGet,
    textareaSet,
    textareaLock,
    textareaUnlock,
    textToMulti,
    spliceurl,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    canvas_send,
    time_valide,
    adaptation,
    base64_send,
    base64_get,
    qrcode,
    barcode,
    clipboard,
    fpsShow,
    bleed,
}