## layer 弹出层帮助文档（基础参数）

`详细文档请见 http://www.layui.com/doc/modules/layer.html`

### type - 基础层类型

> 类型：Number，默认：0

> layer提供了5种层类型。可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。 若你采用layer.open({type: 1})方式调用，则type为必填项（信息框除外）

### title - 标题

> 类型：String/Array/Boolean，默认：'信息'

> title支持三种类型的值，若你传入的是普通的字符串，如title :'我是标题'，那么只会改变标题文本；若你还需要自定义标题区域样式，那么你可以title: ['文本', 'font-size:18px;']，数组第二项可以写任意css样式；如果你不想显示标题栏，你可以title: false

### content - 内容

> 类型：String/DOM/Array，默认：''

> content可传入的值是灵活多变的，不仅可以传入普通的html内容，还可以指定DOM，更可以随着type的不同而不同。

```
/!*
 如果是页面层
 */
layer.open({
  type: 1, 
  content: '传入任意的文本或html' //这里content是一个普通的String
});

layer.open({
  type: 1,
  content: $('#id') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
});

//Ajax获取
$.post('url', {}, function(str){
  layer.open({
    type: 1,
    content: str //注意，如果str是object，那么需要字符拼接。
  });
});

/!*
 如果是iframe层
 */
layer.open({
  type: 2, 
  content: 'http://sentsin.com' //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
}); 

/!*
 如果是用layer.open执行tips层
 */
layer.open({
  type: 4,
  content: ['内容', '#id'] //数组第二项即吸附元素选择器或者DOM
});
```

### skin - 样式类名

> 类型：String，默认：''

> skin不仅允许你传入layer内置的样式class名，还可以传入您自定义的class名

```
//单个使用
layer.open({
  skin: 'demo-class'
});
//全局使用。即所有弹出层都默认采用，但是单个配置skin的优先级更高
layer.config({
  skin: 'demo-class'
})
//CSS 
body .demo-class .layui-layer-title{background:#c00; color:#fff; border: none;}
body .demo-class .layui-layer-btn{border-top:1px solid #E9E7E7}
body .demo-class .layui-layer-btn a{background:#333;}
body .demo-class .layui-layer-btn .layui-layer-btn1{background:#999;}
…
加上body是为了保证优先级。你可以借助Chrome调试工具，定义更多样式控制层更多的区域。
```

`注意：对于修改样式，现在我们不建议使用这种方式，我们希望您可以按照插件自带的样式文件，重新写一套样式，然后在相应的html里面手动引入`

### area - 宽高

> 类型：String/Array，默认：'auto'

> 在默认状态下，layer是宽高都自适应的，但当你只想定义宽度时，你可以area: '500px'，高度仍然是自适应的。当你宽高都要定义时，你可以area: ['500px', '300px']

### offset - 坐标

> 类型：String/Array，默认：垂直水平居中

> offset默认情况下不用设置。

### icon - 图标。信息框和加载层的私有参数

> 类型：Number，默认：-1（信息框）/0（加载层）

> 信息框默认不显示图标。当你想显示图标时，默认皮肤可以传入0-6如果是加载层，可以传入0-2。

### btn - 按钮

> 类型：String/Array，默认：'确认'

> 信息框模式时，btn默认是一个确认按钮，其它层类型则默认不显示，加载层和tips层则无效。

### btnAlign - 按钮排列

> 类型：String，默认：r

> 'l'为按钮左对齐，'c'为按钮居中对齐，'r'为按钮右对齐

### closeBtn - 关闭按钮

> 类型：String/Boolean，默认：1

> layer提供了两种风格的关闭按钮，可通过配置1和2来展示，如果不显示，则closeBtn: 0

### shade - 遮罩

> 类型：String/Array/Boolean，默认：0.3

> 即弹层外区域。默认是0.3透明度的黑色背景（'#000'）。如果你想定义别的颜色，可以shade: [0.8, '#393D49']；如果你不想显示遮罩，可以shade: 0

### shadeClose - 是否点击遮罩关闭

> 类型：Boolean，默认：false

> 如果你的shade是存在的，那么你可以设定shadeClose来控制点击弹层外区域关闭。

### time - 自动关闭所需毫秒

> 类型：Number，默认：0

> 默认不会自动关闭。当你想自动关闭时，可以time: 5000，即代表5秒后自动关闭，注意单位是毫秒（1秒=1000毫秒）

### id - 用于控制弹层唯一标识

> 类型：String，默认：空字符

> 设置该值后，不管是什么类型的层，都只允许同时弹出一个。一般用于页面层和iframe层模式

### anim - 弹出动画

> 类型：Number，默认：0

> 我们的出场动画全部采用CSS3。这意味着除了ie6-9，其它所有浏览器都是支持的。目前anim可支持的动画类型有0-6 如果不想显示动画，设置 anim: -1 即可。另外需要注意的是，3.0之前的版本用的是 shift 参数

### isOutAnim - 关闭动画 （layer 3.0.3新增）

> 类型：Boolean，默认：true

>默认情况下，关闭层时会有一个过度动画。如果你不想开启，设置 isOutAnim: false 即可

### maxmin - 最大最小化

> 类型：Boolean，默认：false

> 该参数值对type:1和type:2有效。默认不显示最大小化按钮。需要显示配置maxmin: true即可

### fixed - 固定

> 类型：Boolean，默认：true

> 即鼠标滚动时，层是否固定在可视区域。如果不想，设置fixed: false即可

### resize - 是否允许拉伸

> 类型：Boolean，默认：true

> 默认情况下，你可以在弹层右下角拖动来拉伸尺寸。如果对指定的弹层屏蔽该功能，设置 false即可。该参数对loading、tips层无效

### resizing - 监听窗口拉伸动作

> 类型：Function，默认：null

> 当你拖拽弹层右下角对窗体进行尺寸调整时，如果你设定了该回调，则会执行。回调返回一个参数：当前层的DOM对象

### scrollbar - 是否允许浏览器出现滚动条

> 类型：Boolean，默认：true

> 默认允许浏览器滚动，如果设定scrollbar: false，则屏蔽

### maxWidth - 最大宽度

> 类型：，默认：360

> 请注意：只有当area: 'auto'时，maxWidth的设定才有效。

### zIndex - 层叠顺序

> 类型：，默认：19891014（贤心生日 0.0）

> 一般用于解决和其它组件的层叠冲突。

### move - 触发拖动的元素

> 类型：String/DOM/Boolean，默认：'.layui-layer-title'

> 默认是触发标题区域拖拽。如果你想单独定义，指向元素的选择器或者DOM即可。如move: '.mine-move'。你还配置设定move: false来禁止拖拽

### moveOut - 是否允许拖拽到窗口外

> 类型：Boolean，默认：false

> 默认只能在窗口内拖拽，如果你想让拖到窗外，那么设定moveOut: true即可

### moveEnd - 拖动完毕后的回调方法

> 类型：Function，默认：null

> 默认不会触发moveEnd，如果你需要，设定moveEnd: function(layero){}即可。其中layero为当前层的DOM对象

### tips - tips方向和颜色

> 类型：Number/Array，默认：2

### tips层的私有参数。支持上右下左四个方向，通过1-4进行方向设定。如tips: 3则表示在元素的下面出现。有时你还可能会定义一些颜色，可以设定tips: [1, '#c00']

### tipsMore - 是否允许多个tips

> 类型：Boolean，默认：false

> 允许多个意味着不会销毁之前的tips层。通过tipsMore: true开启

### success - 层弹出后的成功回调方法

> 类型：Function，默认：null

> 当你需要在层创建完毕时即执行一些语句，可以通过该回调。success会携带两个参数，分别是当前层DOM当前层索引。

### yes - 确定按钮回调方法
> 类型：Function，默认：null

> 该回调携带两个参数，分别为当前层索引、当前层DOM对象。

### cancel - 右上角关闭按钮触发的回调

> 类型：Function，默认：null

> 该回调携带两个参数，分别为：当前层索引参数（index）、当前层的DOM对象（layero），默认会自动触发关闭。如果不想关闭，return false即可

### end - 层销毁后触发的回调

> 类型：Function，默认：null

> 无论是确认还是取消，只要层被销毁了，end都会执行，不携带任何参数。

### full/min/restore -分别代表最大化、最小化、还原 后触发的回调

> 类型：Function，默认：null

> 携带一个参数，即当前层DOM

### layer.config(options) - 初始化全局配置

> 这是一个可以重要也可以不重要的方法，重要的是，它的权利真的很大，尤其是在模块化加载layer时，你会发现你必须要用到它。它不仅可以配置一些诸如路径、加载的模块，甚至还可以决定整个弹层的默认参数。而说它不重要，是因为多数情况下，你会发现，你似乎不是那么十分需要它。但你真的需要认识一下这位伙计。

### vlayer.ready(callback) - 初始化就绪
> 由于我们的layer内置了轻量级加载器，所以你根本不需要单独引入css等文件。但是加载总是需要过程的。当你在页面一打开就要执行弹层时，你最好是将弹层放入ready方法中

### layer.open(options) - 原始核心方法

> 基本上是露脸率最高的方法，不管是使用哪种方式创建层，都是走layer.open()，创建任何类型的弹层都会返回一个当前层索引

### layer.alert(content, options, yes) - 普通信息框

> 它的弹出似乎显得有些高调，一般用于对用户造成比较强烈的关注，类似系统alert，但却比alert更灵便。它的参数是自动向左补齐的。通过第二个参数，可以设定各种你所需要的基础参数，但如果你不需要的话，直接写回调即可。

### layer.confirm(content, options, yes, cancel) - 询问框

> 类似系统confirm，但却远胜confirm，另外它不是和系统的confirm一样阻塞你需要把交互的语句放在回调体中。同样的，它的参数也是自动补齐的。

### layer.msg(content, options, end) - 提示框

> 我们在源码中用了相对较大的篇幅来定制了这个msg，目的是想将其打造成露脸率最高的提示框。而事实上我的确也在大量地使用它。因为它简单，而且足够得自觉，它不仅占据很少的面积，而且默认还会3秒后自动消失所有这一切都决定了我对msg的爱。因此我赋予了她许多可能在外形方面，它坚持简陋的变化，在作用方面，他坚持零用户操作。而且它的参数也是自动补齐的。

### layer.load(icon, options) - 加载层

> type:3的深度定制。load并不需要你传太多的参数，但如果你不喜欢默认的加载风格，你还有选择空间。icon支持传入0-2如果是0，无需传。另外特别注意一点：load默认是不会自动关闭的，因为你一般会在ajax回调体中关闭它。

### layer.tips(content, follow, options) - tips层

> type:4的深度定制。也是我本人比较喜欢的一个层类型，因为它拥有和msg一样的低调和自觉，而且会智能定位，即灵活地判断它应该出现在哪边。默认是在元素右边弹出

### layer.close(index) - 关闭特定层

### layer.closeAll(type) - 关闭所有层

### layer.style(index, cssStyle) - 重新定义层的样式

> 该方法对loading层和tips层无效。参数index为层的索引，cssStyle允许你传入任意的css属性

### layer.title(title, index) - 改变层的标题

### layer.getChildFrame(selector, index) - 获取iframe页的DOM

### layer.getFrameIndex(windowName) - 获取特定iframe层的索引

### layer.iframeAuto(index) - 指定iframe层自适应

### layer.iframeSrc(index, url) - //重置特定iframe url

### layer.setTop(layero) -置顶当前窗口

### layer.full()、layer.min()、layer.restore() - 手工执行最大小化

### layer.prompt(options, yes) - 输入层

### layer.tab(options) - tab层

### layer.photos(options) - 相册层
