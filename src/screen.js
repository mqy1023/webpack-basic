import './css/common.css'
import 'base.js'
import 'jquery'
var articleBox = $('article');
articleBox.fadeTo("slow", 1);// 显示页面
window.addEventListener('resize', window_orientationchange, false);
window.addEventListener('orientationchange', window_orientationchange, false);
window_orientationchange();
console.log('window history', window.history);
console.log('window history', window.history);
if (window.history.length == 2) {
  
}//edn if

function window_orientationchange(event) {
  var dir = ibase.getOrient();
  document.getElementById('screenWidth').innerHTML = screen.width;
  document.getElementById('screenHeight').innerHTML = screen.height;
  document.getElementById('innerWidth').innerHTML = document.documentElement.clientWidth;
  document.getElementById('innerHeight').innerHTML = document.documentElement.clientHeight;
  document.getElementById('devicePixelRatio').innerHTML = window.devicePixelRatio;
  document.getElementById('articleWidth').innerHTML = document.querySelector('article').clientWidth;
  document.getElementById('articleHeight').innerHTML = document.querySelector('article').clientHeight;
}//end func