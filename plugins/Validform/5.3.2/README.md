
## Validform

一行代码搞定整站的表单验证


### 功能简介

>可以在input上直接绑定正则，可以自定义datatype，自定义datatype可以是正则，也可以是函数，datatype可以累加或单选，甚至还可以对datatype规则执行简单的逻辑运算。内置10类常见的格式验证；

>可以自定义提示方式，可以实现你想要的任何提示效果。内置了4种常见的提示方式；

>可以对表单下的某一块区域或具体的某个表单元素单独进行验证，并可以选择验证后需不需要显示出错信息，还能得到一个值来判断被检测对象是否通过了验证；

>可以轻松的取消或恢复对表单下的某一块区域或具体的某个表单元素的验证；

>强大的ajax功能，很轻松的可以实现实时验证以及表单的ajax提交；可以灵活的设置ajax提交时的参数；

>智能的出错信息提示：会根据绑定的datatype输出相应的出错信息，另外还可以在自定义datatype里返回具体的出错信息，错误信息里可以使用html标签，如果页面里没有显示出错信息的标签，会根据tiptype值自动创建。可以选择在没有输入时不提示和只在提交表单时有信息提示。可以选择一次提示单个错误或一次显示全部出错信息。可以自己设置默认的提示文字；

>可以在表单开始检测前和表单检测通过后，提交表单之前绑定事件；

>当前版本外调插件可以实现文件上传检测、密码强度检测、日期控件和表单美化效果；

>丰富的Validform对象的属性和方法，给你的验证操作带来无限的可能。


### 基础用法

1、引入css

    请查看文件中的style.css，把里面Validform必须部分复制到你的css中（文件里这个注释 "/*==========以下部分是Validform必须的===========*/" 之后的部分是必须的）。之前发现有部分网友把整个style.css都引用在了页面里，然后发现样式冲突了。
2、引入js （jquery 1.4.3 以上版本都可以）

    <script type="text/javascript" src="http://validform.rjboy.cn/wp-content/themes/validform/js/jquery-1.6.2.min.js"></script>
    <script type="text/javascript" src="http://validform.rjboy.cn/Validform/v5.1/Validform_v5.1_min.js"></script>
3、给需要验证的表单元素绑定附加属性

    <form class="demoform">
    <input type="text" value="" name="name" datatype="s5-16" errormsg="昵称至少5个字符,最多16个字符！" />
    </form>
    
4、初始化，就这么简单


    $(".demoform").Validform();

#### 文档
http://validform.rjboy.cn/document.html

####进阶用法:

	$(".demoform").Validform({//$(".demoform")指明是哪一表单需要验证,名称需加在form表单上;
		btnSubmit:"#btn_sub", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
		btnReset:".btn_reset",//可选项 .btn_reset是该表单下要绑定点击重置表单事件的按钮;
		tiptype:1, //可选项 1=>pop box,2=>side tip(parent.next.find; with default pop),3=>side tip(siblings; with default pop),4=>side tip(siblings; none pop)，默认为1，也可以传入一个function函数，自定义提示信息的显示方式（可以实现你想要的任何效果，具体参见demo页）;
		ignoreHidden:false,//可选项 true | false 默认为false，当为true时对:hidden的表单元素将不做验证;
		dragonfly:false,//可选项 true | false 默认false，当为true时，值为空时不做验证；
		tipSweep:true,//可选项 true | false 默认为false，只在表单提交时触发检测，blur事件将不会触发检测（实时验证会在后台进行，不会显示检测结果）;
		label:".label",//可选项 选择符，在没有绑定nullmsg时查找要显示的提示文字，默认查找".Validform_label"下的文字;
		showAllError:false,//可选项 true | false，true：提交表单时所有错误提示信息都会显示，false：一碰到验证不通过的就停止检测后面的元素，只显示该元素的错误信息;
		postonce:true, //可选项 表单是否只能提交一次，true开启，不填则默认关闭;
		ajaxPost:true, //使用ajax方式提交表单数据，默认false，提交地址就是action指定地址;
		datatype:{//传入自定义datatype类型，可以是正则，也可以是函数（函数内会传入一个参数）;
			"*6-20": /^[^\s]{6,20}$/,
			"z2-4" : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
			"username":function(gets,obj,curform,regxp){
				//参数gets是获取到的表单元素值，obj为当前表单元素，curform为当前验证的表单，regxp为内置的一些正则表达式的引用;
				var reg1=/^[\w\.]{4,16}$/,
					reg2=/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,8}$/;
				
				if(reg1.test(gets)){return true;}
				if(reg2.test(gets)){return true;}
				return false;
				
				//注意return可以返回true 或 false 或 字符串文字，true表示验证通过，返回字符串表示验证失败，字符串作为错误提示显示，返回false则用errmsg或默认的错误提示;
			},
			"phone":function(){
				// 5.0 版本之后，要实现二选一的验证效果，datatype 的名称 不 需要以 "option_" 开头;	
			}
		},
		usePlugin:{
			swfupload:{},
			datepicker:{},
			passwordstrength:{},
			jqtransform:{
				selector:"select,input"
			}
		},
		beforeCheck:function(curform){
			//在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话将不会继续执行验证操作;	
		},
		beforeSubmit:function(curform){
			//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话表单将不会提交;	
		},
		callback:function(data){
			//返回数据data是json格式，{"info":"demo info","status":"y"}
			//info: 输出提示信息;
			//status: 返回提交数据的状态,是否提交成功。如可以用"y"表示提交成功，"n"表示提交失败，在ajax_post.php文件返回数据里自定字符，主要用在callback函数里根据该值执行相应的回调操作;
			//你也可以在ajax_post.php文件返回更多信息在这里获取，进行相应操作；
			//ajax遇到服务端错误时也会执行回调，这时的data是{ status:**, statusText:**, readyState:**, responseText:** }；
			
			//这里执行回调操作;
			//注意：如果不是ajax方式提交表单，传入callback，这时data参数是当前表单对象，回调函数会在表单验证全部通过后执行，然后判断是否提交表单，如果callback里明确return false，则表单不会提交，如果return true或没有return，则会提交表单。
		}
	});
	
	##Validform对象的方法和属性：
	
	tipmsg：自定义提示信息，通过修改Validform对象的这个属性值来让同一个页面的不同表单使用不同的提示文字；
	dataType：获取内置的一些正则；
	eq(n)：获取Validform对象的第n个元素;
	ajaxPost(flag,sync,url)：以ajax方式提交表单。flag为true时，跳过验证直接提交，sync为true时将以同步的方式进行ajax提交，传入了url地址时，表单会提交到这个地址；
	abort()：终止ajax的提交；
	submitForm(flag,url)：以参数里设置的方式提交表单，flag为true时，跳过验证直接提交，传入了url地址时，表单会提交到这个地址；
	resetForm()：重置表单；
	resetStatus()：重置表单的提交状态。传入了postonce参数的话，表单成功提交后状态会设置为"posted"，重置提交状态可以让表单继续可以提交；
	getStatus()：获取表单的提交状态，normal：未提交，posting：正在提交，posted：已成功提交过；
	setStatus(status)：设置表单的提交状态，可以设置normal，posting，posted三种状态，不传参则设置状态为posting，这个状态表单可以验证，但不能提交；
	ignore(selector)：忽略对所选择对象的验证；
	unignore(selector)：将ignore方法所忽略验证的对象重新获取验证效果；
	addRule(rule)：可以通过Validform对象的这个方法来给表单元素绑定验证规则；
	check(bool,selector):对指定对象进行验证(默认验证当前整个表单)，通过返回true，否则返回false（绑定实时验证的对象，格式符合要求时返回true，而不会等ajax的返回结果），bool为true时则只验证不显示提示信息；
	config(setup):可以通过这个方法来修改初始化参数，指定表单的提交地址，给表单ajax和实时验证的ajax里设置参数；

