//menu

//¿¡»ÀÕºø‚ www.lanrentuku.com


$(function(){
//	$(".ulnav").css({opacity:.9})
$("#nav").children("li").each(function(){
	$(this).hover(function(navi){
		$(this).addClass("hover")
		$(this).children(".ulnav").slideDown(100)
	},function(){
		$(this).removeClass("hover")
		$(this).children(".ulnav").slideUp(100)
	})	
})
})