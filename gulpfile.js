/**
* @desc    gulp自动化配置
* @author  李壮壮<lzz857183384@163.com>
* @date    2017/5/26
*/

// 引入gulp 以及 gulp 插件列表
var browserSync=require("browser-sync"),			
	gulp = require("gulp"),							
	autoprefixer = require("gulp-autoprefixer"),	
	base64 = require("gulp-base64"),
	batch = require("gulp-batch"),
	cache = require('gulp-cache'),
	changed  = require('gulp-changed'),
	clean = require('gulp-clean'),
	fileinclude = require("gulp-file-include"),
	filter = require('gulp-filter'),
	imagemin = require("gulp-imagemin"),
	less = require("gulp-less"),
	minifycss = require("gulp-minify-css"),
	notify = require("gulp-notify"),
	plumber = require("gulp-plumber"),
	sequence = require('gulp-sequence'),
	uglify = require("gulp-uglify"),
	useref = require("gulp-useref"),
	watch = require("gulp-watch"),
	pngquant = require("imagemin-pngquant");

var projectName = './mer-project/',	//项目名

	appSrc = {
		srcPath: 'src/',   //源代码路径
  		devPath: 'build/', //整合后的路径，开发路径
  		prdPath: 'dist/'   //生产环境路径
	},

	//文件过滤
	fileFilter = {
		htmlFilter: filter('**/*.html', {restore: true}),
		cssFilter: filter('**/*.css', {restore: true}),
		lessFilter: filter('**/*.less', {restore: true}),
		jsFilter: filter('**/*.js', {restore: true})
	};

//合并并压缩html代码里面的JavaScript脚本文件
gulp.task('useref', function(){
	return gulp.src(projectName + appSrc.srcPath + '**/module/**/*.html')
		.pipe(plumber({
			  errorHandler: function(error){
				  this.emit('end');
			  }
		}))
		// .pipe(changed(projectName + appSrc.devPath, {extension: '.html'}))
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(notify({message: "解析html代码里面的include---complete！"}))
		.pipe(useref())
		.pipe(notify({message: "替换js静态资源路由---complete！"}))
		.pipe(gulp.dest(projectName + appSrc.devPath))
		.pipe(fileFilter.jsFilter)
		.pipe(uglify())
		.pipe(fileFilter.jsFilter.restore)
		.pipe(notify({message: "压缩替换后的js静态资源---complete！"}))
    	.pipe(gulp.dest(projectName + appSrc.prdPath));
});

//css
//在src下创建less文件夹，里面存放less文件。只需要index.less文件作为入口，其他的子less文件的引用 通过在index.less中使用@import来实现
gulp.task('css', function(){
  	return gulp.src(projectName + appSrc.srcPath + 'less/**/*.less')
	  	.pipe(changed(projectName + appSrc.devPath + 'less'))
		.pipe(gulp.dest(projectName + appSrc.devPath + 'less'))
	  	.pipe(plumber({
			  errorHandler: function(error){
				  this.emit('end');
			  }
		}))
  		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    	.pipe(less())
		.pipe(notify({message: "less文件转换成css文件---complete！"}))
		.pipe(base64({
			extensions: ['png'],
			maxImageSize: 20 * 1024, 
			debug: false
		}))
		.pipe(notify({message: "css文件图标转换成base64---complete！"}))
    	// .pipe(gulp.dest(projectName + appSrc.srcPath + 'style'))
    	.pipe(gulp.dest(projectName + appSrc.devPath + 'style'))
    	.pipe(minifycss())
    	.pipe(gulp.dest(projectName + appSrc.prdPath + 'style'))
		.pipe(filter('**/*.css')) // Filtering stream to only css files
        .pipe(browserSync.reload({stream:true}));
});

//images
gulp.task('image', function(){
	return gulp.src(projectName + appSrc.srcPath + 'images/**/*')
		.pipe(changed(projectName + appSrc.devPath + 'images'))
		.pipe(gulp.dest(projectName + appSrc.devPath + 'images'))
		.pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))//流入线上环境路径之前，压缩image图片
		.pipe(notify({message: "图片压缩---complete！"}))
		.pipe(gulp.dest(projectName + appSrc.prdPath + 'images'));
});

//clean
gulp.task('clean', function(){
	return gulp.src([projectName + appSrc.devPath, projectName + appSrc.prdPath, projectName + appSrc.srcPath + "style"], {read: false})
        .pipe(clean())
		.pipe(notify({message: "清除目录文件---complete！"}));
});

//build总任务
gulp.task('build', sequence('clean', 'image', 'css', 'useref'));

//文件任务监听以及重新加载
gulp.task('cssWatch', ['css'], browserSync.reload);
gulp.task('htmlWatch', ['useref'], browserSync.reload);
gulp.task('jsWatch', ['useref'], browserSync.reload);
gulp.task('imageWatch', ['image'], browserSync.reload);

//服务任务
gulp.task('browserSync', ['build'], function(){
	browserSync({
		server: {
			baseDir: [projectName + appSrc.devPath, './', projectName, projectName + appSrc.srcPath],
			index: 'html/module/index.html'
		}
	});

	//html文件监听任务
	watch(projectName + appSrc.srcPath + 'html/**/*.html', batch(function(events, done){
		gulp.start('htmlWatch', done);
	}));

	//样式文件监听任务
	watch(projectName + appSrc.srcPath + 'less/**/*.less', batch(function(events, done){
		gulp.start('cssWatch', done);
	}));

	//js文件监听任务
	watch(projectName + appSrc.srcPath + 'js/**/*.js', batch(function(events, done){
		gulp.start('jsWatch', done);
	}));

	//图片文件监听任务
	watch(projectName + appSrc.srcPath + 'images/**/*', batch(function(events, done){
		gulp.start('imageWatch', done);
	}));
});

//gulp默认任务
gulp.task('default', ['browserSync']);