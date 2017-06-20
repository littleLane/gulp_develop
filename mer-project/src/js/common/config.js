/**
 * @desc    网站配置
 * @author  郎爽<inshuang@sina.com>
 * @date    2017/5/26
 */

;(function(win, lib) {
    lib.config=function() {
        window.mockApiUrl = 'http://10.99.5.250:7080/mockjsdata/3/';
        window.apiUrl =  'http://api.guahao.cn';
        //接口默认版本号
        window.Version ='1';
        window.hostname= location.hostname;
        window.domain = window.location.protocol + "//" + hostname + "/";
     }
    lib.config();
})(window, window['lib'] || (window['lib'] = {}));

