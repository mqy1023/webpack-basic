//获得范围内随机整数
function randomRange(min, max) {
    var randomNumber;
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
} //end func 

//获得随机颜色
function randomColor() {
    var str = "0123456789abcdef";
    var s = "#";
    for (j = 0; j < 6; j++) s += str.charAt(Math.random() * str.length);
    return s;
} //end func

//随机打乱一个数组
function randomSort(ary) {
    if (ary && ary.length > 1) ary.sort(function () {
        return 0.5 - Math.random();
    });
} //end func 

//随机正负
function randomPlus() {
    return Math.random() < 0.5 ? -1 : 1;
} //end func 

//等比缩放,分cover模式和contain模式
function autoSize(aryNum, aryMax, scaleMode) {
    if (scaleMode === 1 || scaleMode === 0) scaleMode = scaleMode === 1 ? 'cover' : 'contain';
    else scaleMode = scaleMode || 'cover';
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
} //end func

//缓动函数
function ease(_now, _tar, _speed, _space) {
    _speed = _speed || 10;
    _space = _space || 0.1;
    var _dis = _tar - _now;
    if (Math.abs(_dis) > _space) return _dis / _speed + _now;
    else return _tar;
} //end func

//角度转弧度
function toRadian(degree) {
    return degree * Math.PI / 180;
} //end func 

//弧度转角度
function toDegree(radian) {
    return radian / Math.PI * 180;
} //end func 

//获得2点之间的距离
function getDis(source, target) {
    var lineX = target[0] - source[0];
    var lineY = target[1] - source[1];
    return Math.sqrt(Math.pow(Math.abs(lineX), 2) + Math.pow(Math.abs(lineY), 2));
} //end func 

//获得2点之间的夹角
function getDeg(source, target) {
    var deg;
    if (source[0] == target[0] && source[1] == target[1]) {
        deg = 0;
    } else {
        var disX = target[0] - source[0];
        var disY = target[1] - source[1];
        deg = Math.atan(disY / disX) * 180 / Math.PI;
        if (disX < 0) {
            deg = 180 + deg;
        }
        else if (disY < 0) {
            deg = 360 + deg;
        }
    } //end else
    return deg;
} //end func

//测试2个jquery对象是否重合
function hitTest(source, target, scaleX, scaleY) {
    scaleX = scaleX != null ? scaleX : 1;
    scaleY = scaleY != null ? scaleY : 1;
    if (source && target) {
        var pos1 = [source.offset().left + source.outerWidth() * scaleX * 0.5, source.offset().top + source.outerHeight() * scaleY * 0.5];
        var pos2 = [target.offset().left + target.outerWidth() * scaleX * 0.5, target.offset().top + target.outerHeight() * scaleY * 0.5];
        var disX = Math.abs(pos2[0] - pos1[0]);
        var disY = Math.abs(pos2[1] - pos1[1]);
        var disXMin = (source.outerWidth() + target.outerWidth()) * scaleX * 0.5;
        var disYMin = (source.outerHeight() + target.outerHeight()) * scaleY * 0.5;
        if (disX <= disXMin && disY <= disYMin) return true;
        else return false;
    } //end if
    else return false;
} //end func

//测试2个带data().x,data().y的jquery对象是否重合
function hitObject(source, target) {
    if (source && target) {
        var pos1 = [source.data().x + source.outerWidth() * 0.5, source.data().y + source.outerHeight() * 0.5];
        var pos2 = [target.data().x + target.outerWidth() * 0.5, target.data().y + target.outerHeight() * 0.5];
        var disX = Math.abs(pos2[0] - pos1[0]);
        var disY = Math.abs(pos2[1] - pos1[1]);
        var disXMin = (source.outerWidth() + target.outerWidth()) * 0.5;
        var disYMin = (source.outerHeight() + target.outerHeight()) * 0.5;
        if (disX <= disXMin && disY <= disYMin) return true;
        else return false;
    } //end if
    else return false;
} //end func

//测试一个点和一个DOM对象是否重合
function hitPoint(source, target, scaleX, scaleY) {
    scaleX = scaleX != null ? scaleX : 1;
    scaleY = scaleY != null ? scaleY : 1;
    if (source && target) {
        var area = [target.offset().left, target.offset().left + target.outerWidth() * scaleX, target.offset().top, target.offset().top + target.outerHeight() * scaleY];
        if (source[0] >= area[0] && source[0] <= area[1] && source[1] >= area[2] && source[1] <= area[3]) return true;
        else return false;
    } //end if
    else return false;
} //end func


//将数字格式化
function formatNumber(value) {
    value = value.toString();
    if (value.length <= 3) return value;
    else return this.formatNumber(value.substr(0, value.length - 3)) + ',' + value.substr(value.length - 3);
} //end func

//截取小数点后几位，非四舍五入
function float(value, pt) {
    pt = pt || 2;
    value = value.toString();
    if (value.indexOf('.') == -1) return value;
    else {
        var str1 = value.split('.');
        var str2 = str1[0] + '.' + str1[1].substr(0, pt);
        return Number(str2);
    } //end else
} //edn func

//将颜色值转换成rgb值
function colorToRgb(color) {
    if (color.match(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i)) {
        var value = color.slice(color.indexOf('#') + 1),
            isShortNotation = (value.length === 3),
            r = isShortNotation ? (value.charAt(0) + value.charAt(0)) : value.substring(0, 2),
            g = isShortNotation ? (value.charAt(1) + value.charAt(1)) : value.substring(2, 4),
            b = isShortNotation ? (value.charAt(2) + value.charAt(2)) : value.substring(4, 6);
        return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
    } //end if
    else return [0, 0, 0];
} //end func

//获取路径
function getPath(path) {
    if (path && path != '') return path.substr(0, path.lastIndexOf('/') + 1);
    else return false;
} //edn func


/**
 * 根据高宽数值计算高宽比例
 * @method
 * @param {widch} 宽度数值
 * @param {height} 高度数值
 * @return {vw:vh} 以vw:vh的形式返回比例值
 */
function aspect(width, height) {
    var vw = width,
        vh = height,
        vr = gcd(vw, vh);
    function gcd(a, b) {
        return (b == 0) ? a : gcd(b, a % b);
    }
    return vw / vr + ':' + vh / vr;
} //edn func
/**
 * 按照数组某个字段排序
 * @method
 * @param {arr} 原数组
 * @param {key} 数组对象中的key
 * @return {type} 值等于rise则升序，反之降序
 */
function bubbleSort(arr, key, type) {
    if (key) {
        return arr.sort(compare);
    } else {
        return arr;
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
/**
 * 扩展一个可以指定时间输出格式的 Date 的方法
 * 年(y)可以用 1-4 个占位符、月(M)、日(d)、季度(q)可以用 1-2 个占位符
 * 小时(h)、分(m)、秒(s)、毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @param  fmt  | 格式化表达式
 */
function format(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
export  {
    randomRange,
    randomColor,
    randomSort,
    randomPlus,
    autoSize,
    ease,
    toRadian,
    toDegree,
    getDis,
    getDeg,
    hitTest,
    hitObject,
    hitPoint,
    formatNumber,
    float,
    colorToRgb,
    getPath,
    aspect,
    bubbleSort,
    format
}