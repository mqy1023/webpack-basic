import { ibase, os } from './base.js'
import { imonitor } from '@/common/js'
// share.js
function importShare() {
  var share = {};
  share.wxSigned = false;
  share.tbSigned = false;
  share.tbLoaded = 0;
  //-------------------------------------------------------自定义分享内容
  share.init = function (Id = { wxId: 'wx1c1f89b6f490b8e7', tbId: '' }, content) {
    share.wxId = Id.wxId;//微信 appid
    share.tbId = Id.tbId;//手淘 appid
    let hrefs = window.location.href.split('?');
    share.url = hrefs[0].substr(0, hrefs[0].lastIndexOf('/') + 1);
    share.content = Object.assign({
      link: share.url,
      image: require('@/images/share.jpg'),
      title: '分享标题',
      friend: '发送给朋友的分享文案',
      timeline: '发送到给朋友圈的分享文案',
      weibo: '发送到微博的分享文案'
    }, content);
    console.log(share.content);
    if (os.weixin) {
      share.wxSign();
    }
    if (os.taobao || os.tianmao) {
      share.tbSign();
    }
  }
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
      });
      share.wxSigned = true;//通过微信新SDK验证
      wx.ready(function () {
        wx.showOptionMenu();//用微信“扫一扫”打开，optionMenu是off状态，默认开启
        share.wxShare();
      });
    }, 'json');
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
    share.shareBtn = option.obj || $('a.btnShare')
    if (share.shareBtn.length > 0) {
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
        }
        imgHtml += '&searchPic=false';
      }
      share.shareBtn.attr({ target: '_blank', href: 'http://service.weibo.com/share/share.php?url=' + url + '&title=' + txt + imgHtml });
    }
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
      });
      else share.wbShare({ obj: share.shareBtn, url: share.content.link, text: share.content.timeline, image: share.content.image });
    }
  }

  share.hideMenu = function (menuList) {
    wx.ready(function () {
      menuList = menuList || ["menuItem:copyUrl"];
      wx.hideMenuItems({
        menuList: menuList // 要隐藏的菜单项
      });
    });
  }

  //-------------------------------------------------------手淘分享
  share.tbSign = function () {
    if (this.tbId != '') {
      console.log('tbId:' + this.tbId);
      document.write('<meta name="spm-id" content="a1z51.' + this.tbId + '"/>');
      document.write('<meta id="WV.Meta.Share.Title" value="' + this.content.title + '" />');
      document.write('<meta id="WV.Meta.Share.Text" value="' + this.content.timeline + '" />');
      document.write('<meta id="WV.Meta.Share.Image" value="' + this.content.image + '" />');
      ibase.loadJs('//g.alicdn.com/tmapp/tida/3.3.26/tida.js?appkey=' + this.tbId, 'body');
    }
  }
  return share;
}

let ishare = importShare()
export default ishare