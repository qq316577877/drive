/**
 * 基本常量
 * Created by qinmenghuan on 2017/7/24.
 */

// 基本配置
var CONSTANTS_BASE = {
	//"BASE_URL":"http://172.241.1.223",
	//"BASE_URL": "http://www.boshicun.com",
	BASE_URL: "http://192.168.2.51",
	loginAjax: "/admin/drivers/register_and_login_ajax", //登录注册
	mainAjax: "/admin/drivers/add_driver_coordinate_location", //main经纬上传
	userSafetyAJax: "/admin/drivers/get_driver_info_by_mobile_ajax",//查詢信息
	setCarIdAndName: "/admin/drivers/update_driver_info_ajax",//修改車牌號及姓名
	setTel: "/admin/drivers/update_register_mobile_ajax",//修改電話號碼
	getSMS:"/admin/drivers/captcha/send_sms_drivers_ajax"//获取短信验证码
};

