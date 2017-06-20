
## lib.cookie

cookie操作

* lib.cookie('keyname') 获取cookie value
* lib.cookie('keyname','keyvalue') 设置cookie
* lib.cookie('keyname','keyvalue', options) 设置cookie 带参数
        options {
            expires : 7,            //cookie生命周期             默认session cookie //修改后 单位为小时
            path: '/foo',           //cookie生效路径             默认当前路径
            domain: 'example.com',  //cookie 生效域名            默认当前域名
            secure: true,           //是否是https                默认是false 即http
            raw: true               //是否对cookie进行URI编码     默认是false
        }
