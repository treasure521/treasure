var gulp        = require('gulp');
var less        = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var notify      = require('gulp-notify');
var concat      = require('gulp-concat');

gulp.task('less',function(){
	gulp.src(['src/css/index.less','src/css/main.less'])   //需要处理的文件
		.pipe(less())
		.pipe(gulp.dest('src/css'))  //处理后文件放的位置
		.pipe(notify("完成了 less->css"))
});
  
gulp.task('concat',function(){
	gulp.src(['src/css/index.css','src/css/main.css'])   //需要处理的文件
		.pipe(concat('concat.css'))
		.pipe(gulp.dest('build/css'))  //处理后文件放的位置
		.pipe(notify("合并css"))
});

gulp.task('defalut',['less','concat'],function(){  //第一个是任务名字  第二个参数是一个数组 可能引用的任务
	
});
