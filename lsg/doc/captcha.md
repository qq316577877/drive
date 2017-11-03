# 验证码


## 发送短信验证码

ajax url:/admin/drivers/captcha/send_sms_drivers_ajax

请求

``` 
    POST
    {
        mobile:"13612345678",
        type:11 // 11.老司机注册登录
    }
``` 

结果

``` 
    {
        code:200,
        msg:"success",
        data:
    }
``` 
