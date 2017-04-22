/*
* @Author: Administrator
* @Date:   2017-02-26 11:00:43
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-26 16:17:04
*/

'use strict';

scrollFn('.scroll-wrap');
scrollFn('.scroll-wrap2');
function scrollFn(bigBox){
	/*侧边栏滑动*/
	//  （1）让UL至少是能跟着滑动起来
	//  （2）在滑动的时候限制最大的滑动区间
	//  （3）在滑动结束的时候判断最终的距离是否在反弹区间内
	var scrollWrap = document.querySelector(bigBox);
	var ul = scrollWrap.querySelector('.scroll');

	scrollWrap.addEventListener('touchstart', touchstartHandler);
	scrollWrap.addEventListener('touchmove', touchmoveHandler);
	scrollWrap.addEventListener('touchend', touchendHandler);

	var startY = 0;  // 最开始的手指落点
	var centerY = 0 // 记录上一次滑动的位置
	var dy = 0; // 每一次滑动的距离

	var UlDownMax = 50; // 往下滑的最大值
	// 往上滑的最大值
	console.log(ul)
	var UlUpMax = -(ul.offsetHeight - scrollWrap.offsetHeight + UlDownMax);
	// 向上反弹的最大值
	var fTUpMax = 0;
	// 向下反弹的最大值
	var ftDownMax = -(ul.offsetHeight - scrollWrap.offsetHeight);

	function touchstartHandler(e){
		// 获取手指的落点
		startY = e.touches[0].pageY;
		// 清过渡
		ul.style.transition = 'none';
	};
	function touchmoveHandler(e){
		// 获取手指滑动的距离
		dy = e.touches[0].pageY - startY;
		//　判断最终滑动的距离  这里面必须是(centerY + dy)作为判断
		if((centerY + dy) > UlDownMax) {
			ul.style.transform = 'translateY('+ UlDownMax +'px)';
		}else if((centerY + dy) < UlUpMax){
			ul.style.transform = 'translateY('+ UlUpMax +'px)';
		}else{
			// 在这里设一个中间变量 centerY 这个centerY记录的上一次滑动的位置
			ul.style.transform = 'translateY('+ (centerY + dy) +'px)';
		}
	};
	function touchendHandler(e){
		// 将最终的距离赋值给centerY 以便下一次基于当前这个位置继续滑动
		centerY = (centerY + dy);
		//　当最终的距离超过0 让他优雅的弹回到0的位置
		//　
		if(centerY > fTUpMax){
			// 添加过渡
			ul.style.transition = 'transform .5s';
			// 重新赋值centerY
			centerY = fTUpMax;
			// 将位置定回0的位置上
			ul.style.transform = 'translateY('+ centerY +'px)';
		}else if(centerY < ftDownMax){
			// 当最终的距离超过ftDownMax 让他优雅的弹回到ftDownMax的位置
			// 添加过渡
			ul.style.transition = 'transform .5s';
			// 重新赋值centerY
			centerY = ftDownMax;
			// 将位置定回0的位置上
			ul.style.transform = 'translateY('+ centerY +'px)';
		}
	};
}
	




