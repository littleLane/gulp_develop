A、从SVN或者GIT上拉取项目文件到本地，可以看到的目录结构大致是

![](/assets/import4.png)

B、确保机器上安装了Node环境，在控制台操作

![](/assets/import5.png)

如果输出版本号就说明已经安装了Node环境，还有我们希望您安装的稳定的Node版本越新越好，至少6.10.1以上。若没有正常输出版本信息则需安装Node环境，安装步骤请看相关文档。安装Node环境后，我们所需的npm, cnpm等工具都会附带装上（这里仅限较高版本的Node），这就是我们要求安装高版本的原因。安装完Node环境后，在控制台操作

![](/assets/import6.png)

都会正常输出版本信息。

C、搭建gulp自动化开发环境，首先确保您的Node环境顺利安装完成。在控制台将文件目录导向项目的hf-web-project目录，并在控制台运行

Npm install安装gulp环境所需要的插件包

E、全局安装gulp环境，在控制台运行npm install gulp–g

F、启动前端开发环境，在控制台运行gulp指令

![](/assets/import7.png)

服务启动后会在浏览器端自动打开配置的首页信息（localhost:3000）。

