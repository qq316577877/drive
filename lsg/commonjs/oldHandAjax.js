/**
 * ajax 请求服务
 * Created by 秦梦欢 on 2017/7/17.
 */

// 共通ajax方法
function httpRequest(params) {

    var baseUrl="";   // 如果有域名或ip地址

    // 为空判断
    if (!params.params) {
        params.params = {};
    }

    // 拼接请求的url
    var requestUrl = baseUrl + params.url;
    var para =requestUrl,{
    	type: params.type||"POST",
        data: params.params,
        dataType: "json",
        timeout: 60000,
        success: function (res) {
            // 自动下线
            if (res.code == 200) {
                if ($.isFunction(params.success)) {
                    params.success(res);
                }
            } else{
                // to do
                if ($.isFunction(params.error)) {
                    params.error(res);
                }
            }
        },
        error: function (res) {
            // to do
            if ($.isFunction(params.error)) {
                params.error(res);
            }
        },
        complete: function (res) {
            if ($.isFunction(params.complete)) {
                params.complete(res);
            }
        }
    };
    mui.ajax(para);
}



