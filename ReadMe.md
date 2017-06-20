## gulp 自动化前端开发环境

### 一、认识 gulp 自动化工具

> gulp 是前端开发过程中对代码进行构建的工具，是自动化项目的构建利器；她不仅能对网站资源进行优化，而且在开发过程中很多重复的任务能够使用正确的工具自动完成；使用她，我们不仅可以很愉快的编写代码，而且大大提高我们的工作效率。

> gulp 是基于 Nodejs 的自动任务运行器， 她能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的的测试、检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成，并监听文件在改动后重复指定的这些步骤。在实现上，她借鉴了Unix操作系统的管道（pipe）思想，前一级的输出，直接变成后一级的输入，使得在操作上非常简单。通过本文，我们将学习如何使用Gulp来改变开发流程，从而使开发更加快速高效。

> gulp 和 grunt 非常类似，但相比于 grunt 的频繁 IO 操作，gulp 的流操作，能更快地更便捷地完成构建工作。

### 二、开发环境的搭建

> 从 [SVN](svn://10.10.188.100/hf-web-project) 上拉下总的项目代码，里面包含多个以项目名字命名的项目文件夹，在每个项目文件夹中会有 src (源码目录)、build (开发环境目录)、dist(线上环境目录)。开发时就在 src 源码目录进行编码和修改，gulp 在我们编码时会自动将代码编译、处理到对应的目录。在浏览器里面运行看到的效果是做了部分编译和处理后的 build 开发环境目录里面的代码，最后若开发完成，我们会将完全编译和处理后的 dist 代码目录里面的代码在线上服务器进行部署。所以三个目录环境的结构不一样是很正常的。

> 将项目代码拉下来后，打开控制台或命令行，将路径转到 `hf-web-project` 目录下。运行 `npm install` 安装 `package.json` 文件里面配置的依赖包文件。

### 三、开发环境启动

> 等待安装完后再运行 `gulp` 指令启动本地开发环境的服务。gulp 服务会自动起 3000 端口并在浏览器里面打开 build 项目的 index.html。

### 四、相关 gulp 开发环境注意事项

1、 gulp-file-include

> 开发时，我们会将页面的公共部分提取出来形成单独的代码文件。我们要在主要的文件里面引入公共部分（ps:这里特指 html ）,这时 `gulp-file-include` 就登场了。

> 使用例子：只需要在页面的 body 里面的任意位置轻轻的敲入 `@@include('url')`（ps: 这里的 url 就是相对文件的地址）即可。

2、 gulp-useref

> `gulp-useref` 同样是针对 `html` 代码的，但是它主要处理 `html` 里面的 `js` `css` 引入文件。当一个 `html` 源码里面引入了多个脚本文件而后需要将多个脚本文件合并时，它的作用就显现了。

> 使用例子：

使用前
```html
<html>
<head>
    <!-- 其中这里的配置是必须的，格式 build:[type] [希望处理后引入合成的地址]。其中的 type 包含 css/js/remove -->

    <!-- build:css css/combined.css -->
    <link href="css/one.css" rel="stylesheet">
    <link href="css/two.css" rel="stylesheet">
    <!-- endbuild -->
</head>
<body>
    <!-- build:js scripts/combined.js -->
    <script type="text/javascript" src="scripts/one.js"></script> 
    <script type="text/javascript" src="scripts/two.js"></script> 
    <!-- endbuild -->
</body>
</html>
```

编译处理后
```html
<html>
<head>
    <link rel="stylesheet" href="css/combined.css"/>
</head>
<body>
    <script src="scripts/combined.js"></script> 
</body>
</html>
```
