/*
* @Author: Administrator
* @Date:   2017-02-23 14:46:26
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-26 10:48:31
*/

'use strict';

// topbar的透明度的动态改变
//（1）给window绑定scroll 事件 动态获取不断被卷曲的高度
//（2）比例公式  不断变化的卷曲高度/自己设定的最大值 = 不断变化的透明度/1
var maxTop = 600;
var jdHeader = document.querySelector('.jd-header');
window.addEventListener('scroll',function(){
	// 获取不断在变化的卷曲头部
	var top = document.body.scrollTop;
	// 一旦超过最大值，就让透明度定在1上面
	if(top > maxTop) {
		jdHeader.style.background = 'rgba(201,21,35,1)'
	}else {
		jdHeader.style.background = 'rgba(201,21,35,'+ top/maxTop +')';
	}
})


// 京东快报
var scrollWrap = document.querySelector('.scroll-wrap');
var scrollWrapLi = scrollWrap.querySelectorAll('li');
var newsTimer = null;
var liHeight = scrollWrapLi[0].offsetHeight;
// 在这里获取长度的话是4 因为那个时候还没有克隆
var scrollWrapLiLen = scrollWrapLi.length;
// 信号量
var index = 0;
// 克隆一个临时工放在最后面
scrollWrap.appendChild(scrollWrapLi[0].cloneNode(true));

newsTimer = setInterval(function(){
	index++;
	// 添加过渡 过渡时间尽量小于定时器的时间
	scrollWrap.style.transition = 'transform .5s';
	scrollWrap.style.transform = 'translateY('+ (-index*liHeight) +'px)';
}, 1000);

//　当过渡结束的时候，判断当前的index 一旦index = 4(scrollWrapLiLen)的时候,立马“蹦”回去
scrollWrap.addEventListener('transitionend',function(){
	//　一旦看到最后一张，立马跳回去
	if(index >= scrollWrapLiLen) {
		index = 0;
		// 清除过渡
		scrollWrap.style.transition = 'none';
		scrollWrap.style.transform = 'translateY(0px)';
	}
})

// 倒计时　首先声明　倒计时的时间应该是从后台获取，因为前台的时间是不安全的

// 拿到当前时间
var nowDate = new Date();
// 未来时间
var furDate = new Date('Feb 25 2017 17:40:00');
// 将得到的时间差转换成秒数
var dTime = Math.floor((furDate - nowDate)/1000);
// 找到所有的spans
var spans = document.querySelectorAll('.jd-time-w > span');
var djsTime = null;

djsTime = setInterval(function(){
	// 每一秒自减一
	dTime--;
	if(dTime <= 0){
		clearInterval(djsTime);
		return false;
	}
	// 转换成小时
	var h = Math.floor(dTime/3600);
	// 转换成分钟
	var m = Math.floor(dTime%3600/60);
	// 转换成秒钟
	var s = Math.floor(dTime%60);

	/*spans[0].innerHTML = Math.floor(h/10);
	spans[1].innerHTML = Math.floor(h%10);

	spans[3].innerHTML = Math.floor(m/10);
	spans[4].innerHTML = Math.floor(m%10);

	spans[6].innerHTML = Math.floor(s/10);
	spans[7].innerHTML = Math.floor(s%10);*/
	// 将时间连成一个字符串，并且自己只能检测是否需要补0
	var str = toTwo(h) + ':' + toTwo(m) + ':' + toTwo(s);
	// 遍历当前的字符串，遍历谁就将谁拿出来放到对应的spans的位置上
	for(var i = 0; i < str.length; i++){
		spans[i].innerHTML = str.charAt(i);
	}


}, 1000);

function toTwo(n){
	return n > 9 ? '' + n : '0' + n;
}

// 动态计算滚动条ul的长度
var scrollWrap2 = document.querySelector('.jd-sk-b > .scroll-wrap');
var scrollWrap2Li = scrollWrap2.querySelectorAll('li');

scrollWrap2.style.width = scrollWrap2Li[0].offsetWidth * scrollWrap2Li.length + 'px';


// 轮播图大逻辑
// 思路：
// （1）自动轮播
// 		  1.1 : 先设置三个基本位置变量，将三个变量里面装最基本的下标（0,1，长度-1），并且让这三张图片就位
// 		  1.2 : 开启定时器，每一次让下标进行轮转 ，在让图片进行归位
// 		  1.3 ：设置小圆点 当前小圆点的下标就是center里面装的下标
// （2）手动控制轮播
// 		  2.1 : 首先，一个完整的触摸动作由三个touch事件组成
// 		  2.2 : 获取手指滑动的距离 在touchmove的时候的手指落点 - touchstart的手指落点，并且自带正负
// 		  2.3 ：将这个距离累加上当前的位置
// 		  2.4 ：在滑动的结束的时候判断是否滑动成功（依据是滑动的距离大于屏幕的1/3）成功则看到上一张或者下一张，不成功则弹回原来的位置
// 		  2.5 ：在滑动成功里面判断是上一张还是下一张（依据是滑动的距离是正还是负）正代表上一张，负代表下一张 
var carousel = document.querySelector('.carousel');
var carouselUl = carousel.querySelector('ul');
var carouseLi = carouselUl.querySelectorAll('li');
var pointWrap = carousel.querySelector('ol');
var carouselTime = null;
// 获取屏幕的宽度
var screenWidth = document.documentElement.offsetWidth;
// 动态创建小圆点
for(var i = 0; i < carouseLi.length; i++){

	var li = document.createElement('li');
	if(i == 0){
		// 当索引为0的 时候 添加上active这个类名
		li.classList.add('active');
	}
	pointWrap.appendChild(li);
}
// 获取所有的小圆点，注意，一定是先创建在获取
var points = pointWrap.querySelectorAll('li');
// 拿到li的高度赋值给UL
carouselUl.style.height = carouseLi[0].offsetHeight + 'px';
var left = carouseLi.length - 1;
var center = 0;
var right = 1;
// 默认图片就位
setTranslate();
//开启定时器 每一次执行以下showNext
carouselTime = setInterval(showNext, 1000);
// 用手指去控制轮播图
var startX = 0;
var startTime = null;
carousel.addEventListener('touchstart',touchstartHandler);
carousel.addEventListener('touchmove',touchmoveHandler);
carousel.addEventListener('touchend',touchendHandler);

// 看到下一张的逻辑
function showNext (){
	// 轮转下标
	left = center;
	center = right;
	right++;

	// 极值判断
	if(right > carouseLi.length - 1){
		right = 0;
	}
	// 设置过渡
	setTransition(true,true,false);
	// 设置移动
	setTranslate();
	// 设置小圆点
	setPoint();}
// 看到上一张
function showPrev(){
	// 轮转下标
	right = center;
	center = left;
	left--;

	// 极值判断
	if(left < 0){
		left = carouseLi.length - 1;
	}

	setTransition(false,true,true);
	setTranslate();

	// 设置小圆点
	setPoint();
}
// 设置小圆点
function setPoint (){
	for(var i = 0; i < points.length; i++){
		points[i].classList.remove('active');
	}
	points[center].classList.add('active');
}
// 封装移动
function setTranslate(dx){
	/*dx = dx ? dx : 0;*/
	dx = dx || 0;
	carouseLi[center].style.transform = 'translateX('+ dx +'px)';
	carouseLi[right].style.transform = 'translateX('+ (screenWidth + dx) +'px)';
	carouseLi[left].style.transform = 'translateX('+ (-screenWidth + dx) +'px)';
}
// 封装过渡
function setTransition(a,b,c){
	if(a){
		carouseLi[left].style.transition = 'transform .5s';
	}else{
		carouseLi[left].style.transition = 'none';
	}
	if(b){
		carouseLi[center].style.transition = 'transform .5s';
	}else{
		carouseLi[center].style.transition = 'none';
	}
	if(c){
		carouseLi[right].style.transition = 'transform .5s';
	}else{
		carouseLi[right].style.transition = 'none';
	}
}
// 滑动开始
function touchstartHandler(e){
	// 获取开始的时间
	startTime = new Date();
	// 拿到当前的第一个手指的水平坐标
	startX = e.touches[0].pageX;
	// 清除定时器
	clearInterval(carouselTime);
	// 清除过渡
	setTransition(false,false,false);
}
// 滑动持续中
function touchmoveHandler (e){
	// 滑动的距离 并且自带正负
	var dx = e.touches[0].pageX - startX;

	setTranslate(dx);	
}
// 滑动结束
function touchendHandler(e){
	// 当前是否滑动成功 滑动成功的依据是滑动的 距离大于屏幕的1/3 或者说滑动的时间小于300同时距离大于30
	var dx = e.changedTouches[0].pageX - startX;
	// 得到滑动的时间差
	var dTime = new Date() - startTime;
	if(Math.abs(dx) > screenWidth/3 || (dTime < 300 &&  Math.abs(dx) > 30)){
		// 滑动成功  
		// 在滑动成功里面还需要判断当前是需要看到下一张还是上一张
		if(dx > 0){
			// 看到上一张
			showPrev();
		}else{
			// 看到下一张
			showNext();
		}
	}else{
		//滑动失败
		// 添加过渡
		setTransition(true,true,true);
		// 归位
		setTranslate();
	}

	// 清除定时器
	clearInterval(carouselTime);
	//开启定时器 每一次执行以下showNext
	carouselTime = setInterval(showNext, 1000);
}