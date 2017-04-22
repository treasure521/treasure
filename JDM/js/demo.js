/*
* @Author: Administrator
* @Date:   2017-02-26 10:33:25
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-26 10:41:51
*/

'use strict';
// 默认图片就位
carouseLi[center].style.transform = 'translateX(0px)';
carouseLi[right].style.transform = 'translateX('+ screenWidth +'px)';
carouseLi[left].style.transform = 'translateX('+ -screenWidth +'px)';

carouseLi[center].style.transform = 'translateX(0px)';
carouseLi[right].style.transform = 'translateX('+ screenWidth +'px)';
carouseLi[left].style.transform = 'translateX('+ -screenWidth +'px)';

carouseLi[center].style.transform = 'translateX(0px)';
carouseLi[right].style.transform = 'translateX('+ screenWidth +'px)';
carouseLi[left].style.transform = 'translateX('+ -screenWidth +'px)';

carouseLi[center].style.transform = 'translateX('+ dx +'px)';
carouseLi[right].style.transform = 'translateX('+ (screenWidth + dx) +'px)';
carouseLi[left].style.transform = 'translateX('+ (-screenWidth + dx) +'px)';

// 归位
carouseLi[center].style.transform = 'translateX(0px)';
carouseLi[right].style.transform = 'translateX('+ screenWidth +'px)';
carouseLi[left].style.transform = 'translateX('+ -screenWidth +'px)';

function setTranslate(dx){
	/*dx = dx ? dx : 0;*/
	dx = dx || 0;
	carouseLi[center].style.transform = 'translateX('+ dx +'px)';
	carouseLi[right].style.transform = 'translateX('+ (screenWidth + dx) +'px)';
	carouseLi[left].style.transform = 'translateX('+ (-screenWidth + dx) +'px)';
}




// 添加过渡
carouseLi[center].style.transition = 'transform .5s';
// 右边的图片一定不能添加过渡，因为一旦添加过渡，后期会出现穿帮
carouseLi[right].style.transition = 'none';
carouseLi[left].style.transition = 'transform .5s';

// 添加过渡
carouseLi[center].style.transition = 'transform .5s';
carouseLi[right].style.transition = 'transform .5s';
// 左边的图片一定不能添加过渡，因为一旦添加过渡，后期会出现穿帮
carouseLi[left].style.transition = 'none';

// 清除过渡
carouseLi[center].style.transition = 'none';
carouseLi[right].style.transition = 'none';
carouseLi[left].style.transition = 'none';	

// 添加过渡
carouseLi[center].style.transition = 'transform .5s';
carouseLi[right].style.transition = 'transform .5s';


carouseLi[left].style.transition = 'transform .5s';


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