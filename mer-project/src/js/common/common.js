/**
 * @desc    底层公共方法
 * @author  郎爽<inshuang@sina.com>
 * @date    2017/5/26
 */

;(function(win, lib){
    var $ = win['jQuery'] || win['$'],
        loadingRequests = {};

    var GH = {};
    $.extend(GH, {
        callAPI: function(config){
            var defaultConfig = {
                url: "",
                type: "POST",
                cache: true,
                dataType: "json",
                contentType:'application/json; charset=utf-8',
                // jsonpCallback: "",
                data: null,
                success: function () {
                    console.warn("你没有定义success回调函数");
                },
                error: function () {
                    console.error("加载失败，请检查网络");
                },
                complete: function(){
                },
            };

            config = $.extend(defaultConfig, config);
            if (!config.url) {
                config.url = config.baseUrl + config.method;
            }
            // 避免对同一个url重复请求
            if (loadingRequests[config.url]) {
                return;
            }

            loadingRequests[config.url] = true;

            var loadingDialog;

            //token,platform放在data里，用config.data.token,config.data.platform

            return $.ajax({
                type: config.type,
                url: config.url,
                data: config.data,
                dataType: config.dataType,
                contentType: config.contentType,
                // jsonpCallback: config.jsonpCallback,
                cache: config.cache,
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function(xhr){

                },
                success: function(resp){
                    config.success(resp);
                    // return 0;
                    if (resp.code==0) {
                        config.success(resp.data);
                    }else if(resp.code==1501||resp.code==1503){
                        config.success(resp);
                    }
                },
                error: function(resp){
                    console.error("加载失败，请检查网络");
                    config.error;
                    console.log(resp);
                },
                complete: function() {
                    loadingRequests[config.url] = false;
                    config.complete();
                }
            });

        },

        autoRun: function(){
            var self = this,
                pathname = lib.uri.pathname;


            //    当前cookie中不存在userOpenID,则自动获取
            //     self.autoGetWeixinOpenID();
        },

        /*
         * note 获取URL中的参数值
         * param utm  所要获取的utm值
         * author zsl
         */
        getUrlParam : function (utm){
            var url = window.location.search.split('&');
            for(var i=0;i<url.length;i++){
                if(url[i].indexOf(utm) != -1){
                    var val = url[i].split(utm +'='),
                        utmVal = val[val.length-1];
                }
            }
            return utmVal;
        },

        /**
         * 组装API URL
         */
        getApiUrl: function(method,apiVersion) {
            // configVersion =apiVersion ? apiVersion : window.Version;
            // return  window.apiUrl+'/'+configVersion + '/' + method  + '.do';
            return "http://192.168.16.167:8080/" + method + ".do";
        },

        /**
         * 组装MOCK API URL
         */
        getMockApiUrl: function(method,apiVersion) {
            // configVersion =apiVersion ? apiVersion : window.Version;
            // return  window.mockApiUrl+'/'+configVersion + '/' + method + '.html';
            // configVersion =apiVersion ? apiVersion : window.Version;
            return  'http://localhost:3000/mock/index/' + method + '.html';
        },
        /*
        * 组装转跳url
        * @param
        * @value
        * */
        getTargetPage:function(pageName,id){
            if(pageName=='affiche'){
                return
            }

        },
        /**
         * 设置session存储
         * @param key
         * @param val
         */
        setSessionStorage: function(key,val){
            sessionStorage.setItem(key, val);
        },

        /**
         * 获取session存储
         * @param key
         * @returns {*}
         */
        getSessionStorage: function(key){
            return sessionStorage.getItem(key);
        },

        /**
         * 清除session存储
         * @param key
         */
        removeSessionStorage: function(key) {
            if(key){
                sessionStorage.removeItem(key);
            }else {
                sessionStorage.clear();
            }
        },

        /*
        * 本地登录状态设置标记
        * @param status time
        * @value 0 1
        *        已登录 未登录
        * @note 设置过期时间30分钟
        **/
        setLoginStatus:function () {
            lib.cookie('x_login_status','1',0.5);
        },
        /*
        * 移除登录标记*/
        removeLoginStatus:function () {
            lib.cookie('x_login_status','0');
        },
        /*获取登录标记*/
        getLoginStatus:function () {
            if(lib.cookie('x_login_status')){
                return lib.cookie('x_login_status')
            }else{
                return '0';
            }
        },
        ajaxForData: function(method, data, cb) {
            GH.callAPI({
                url:GH.getApiUrl(method),
                data:data,
                success: function(response) {
                    typeof cb == "function" && cb(response);
                }
            });
        },
        ajaxForMockData: function(method, data, cb) {
            GH.callAPI({
                url:GH.getMockApiUrl(method),
                data:data,
                success: function(response) {
                    typeof cb == "function" && cb(response);
                }
            });
        },
        /*
        * 左边栏高亮
        * */
        setLeftNavCurrentStatus:function (navkey) {
            $(".leftNav").find(".item_li").each(function () {
                var navkey_ = $(this).attr("data-key");
                console.log(navkey_ );
                console.log(navkey);
                console.log(navkey_==navkey);
                if (navkey_ == navkey) {
                    $('.item_li').removeClass("current");
                    $(this).addClass("current");
                }
            });
        },
        //分页插件
        laypage: function(dataObj){
            var config = {
                cont: '',                           //容器。值支持id名、原生dom对象，jquery对象,
                pages: '',                          //总页数
                curr: '',                           //当前页
                groups: 4,                          //显示的页数
                skip: true,                         //是否开启跳页
                skin: '#377bee',                    //皮肤
                first: 1,                           //将首页显示为数字1,。若不显示，设置false即可
                last: resp.totalPageNo,             //将尾页显示为总页数。若不显示，设置false即可
                prev: '<i class="to_prev"></i>',    //若不显示，设置false即可
                next: '<i class="to_next"></i>',    //若不显示，设置false即可
                jump: function(){}                  //点击跳转调用的函数
            };

            $.extend(config, dataObj);

            win['laypage'](config);
        },
        //时间插件
        laydate: function(dataObj){
            var config = {
                elem: '',                   //需显示日期的元素选择器
                event: 'click',             //触发事件
                format: 'YYYY-MM-DD',       //日期格式
                istime: false,              //是否开启时间选择
                isclear: false,             //是否显示清空
                istoday: false,             //是否显示今天
                issure: false,              //是否显示确认
                festival: false,            //是否显示节日
                min: '1900-01-01 00:00:00', //最小日期
                max: '2099-12-31 23:59:59', //最大日期
                start: laydate.now(),       //开始日期
                fixed: false,               //是否固定在可视区域
                zIndex: 99999999,           //css z-index
                choose: function(dates){}   //选择好日期的回调
            };

            $.extend(config, dataObj);

            win['laydate'](config);
        },
        /**
         * 数据部分替换
         * params{
         *      string: 要被替换的字符串
         *      symbol: 进行替换需要的字符
         *      index： 开始替换的位置，从1开始
         *      num: 总共所需替换的位数
         * }
         * 
         * 调用方式：GH.getSymbolReplace("123455", '*', 2, 3)
         */
        getSymbolReplace: function(string, symbol, index, num){
            if(index > 0 && index <= string.length && num > 0){
                var arr = string.split('');
                var start = index - 1;
                var count = (num < string.length - start) ? num : string.length - start;

                for(var i = 0; i < count; i++){
                    arr[start + i] = symbol;
                }

                return arr.join('');
            }else{
                return new Error("请传入正确的参数！");
            }
        }
    });

    window.GH = GH;

    // GH.autoRun();

})(window, window.lib || (window.lib = {}));

