var alleffect = {
	//方法入口
	init:function(){
		alleffect.carousel();//首页首屏轮播
		alleffect.layered();//分层效果
	},
	carousel:function(){
		var mySwiper = new Swiper('.swiper-container',{
	    	pagination: '.pagination',
	    	loop:true,
	    	grabCursor: true,
	    	autoplay:3000,
	    	calculateHeight:true,
	    	autoplayDisableOnInteraction : false,
	    	paginationClickable: true
	  	})
	},
	layered:function(){
		var positionX = 0;
		$('.thisposition').on('mousemove', function(ev) {
            var ev = window.event ? event : ev;
            var x = ev.pageX;
            var picwz = $('.fceffect').offset().left;
            var positionX = (x - 1400)/50;
            if(positionX>0){
            	positionX === 0;
            }else{
            	$('.fceffect').css({'left':positionX})
            }
            
       });
       $('.activecon').on('mousemove', function(ev) {
            var ev = window.event ? event : ev;
            var x = ev.pageX;
            var picwz = $('.fceffect').offset().left;
            var positionXtwo = (x - 1400)/50;
            if(positionXtwo>0){
            	positionXtwo === 0;
            }else{
            	$('.housepic').css({'left':positionXtwo})
            }
            
       });
	}
}
alleffect.init();