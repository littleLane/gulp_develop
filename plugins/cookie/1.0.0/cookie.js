/**
 * @desc    cookie操作
 */
;(function(win, lib){
    var $ = win['jQuery'] || win['$'];

    lib.cookie = function (key, value, options) {
        var hour, time, result, decode

        // A key and value were given. Set cookie.
        if (arguments.length > 1 && String(value) !== "[object Object]") {
            // Enforce object
            options = $.extend({}, options)

            if (value === null || value === undefined) options.expires = -1

            if (typeof options.expires === 'number') {
                hour = (options.expires  * 60 * 60 * 1000)
                time = options.expires = new Date()
                time.setTime(time.getTime() + hour)
            }

            value = String(value)

            return (document.cookie = [
                encodeURIComponent(key), '=',
                options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '',
                '; path=/',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''))
        }

        // Key and possibly options given, get cookie
        options = value || {}

        decode = options.raw ? function (s) { return s } : decodeURIComponent

        return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null
    }

})(window, window.lib || (window.lib = {}))