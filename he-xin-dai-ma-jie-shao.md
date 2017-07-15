A、gulp任务配置（这里配置并不是最终的配置，可以根据业务进行调整，接下来的截图也只是做个例子）

**注：所有文件处理任务中**

**gulp.src\(url\)是获取所需要进行处理的文件流，**

**pipe\(gulp.dest\(url\)\)是指将处理后的文件输出到对应的目录**

**pipe\(notify\({message:“”}\)\)在控制台输出日志**

**我在之后的介绍中就不一一介绍了**

处理html文件

![](/assets/import2.png)

处理less样式文件

![](/assets/import9.png)

处理图片文件

![](/assets/import10.png)

清除文件

![](/assets/import11.png)

总线任务

![](/assets/import12.png)

文件监听任务以及页面重载

![](/assets/import13.png)

服务任务

![](/assets/import14.png)

设置gulp默认任务

![](/assets/import15.png)





