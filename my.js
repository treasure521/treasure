/**
 * Created by lenovo on 2016/12/6.
 */
function scroll(){
    if(window.pageYOffset!=null){
        return{
            left:window.pageXOffset,
            top:window.pageYOffset
        }
    }else if(document.compatMode=="CSS1Compat"){ //检查是否有<!DOCTYPE html>
        //BackCompat 是未声明  CSS1Compat已经声明  注意大小写
        return{
            left:document.documentElement.scrollLeft,
            top:document.documentElement.scrollTop
        }
    }
    return{
        left:document.body.scrollLeft,
        top:document.body.scrollTop
    }
}