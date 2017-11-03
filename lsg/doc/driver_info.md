## 司机信息——获取司机信息

ajax url:/admin/drivers/get_driver_info_by_mobile_ajax

请求

```
    POST
    {
        mobile:"13612345678"
    }
```

结果

```
    {
        code:200,
        msg:"success"
        data:{
            id:1,//表id
            mobile:"13612345678",//注册手机
            name:"张三",//姓名
            licensePlate:"鄂B00001",//车牌
            status:1,//状态标识
            statusDesc:"正常",//账号状态
            addTime:""//注册时间
        }
    }
``` 


## 司机信息——修改司机注册手机号

ajax url:/admin/drivers/update_register_mobile_ajax

请求

```
    POST
    {
        oldMobile:"13612345678",//原注册手机号
        newMobile:"13612345677",//修改手机号
        mobileCaptcha:"123456"
    }
```

结果

```
    {
        code:200,
        msg:"success"
    }
``` 


## 司机信息——修改司机信息

ajax url:/admin/drivers/update_driver_info_ajax

请求

```
    POST
    {
        mobile:"13612345678",//注册手机号
        name:"张三",//姓名
        licensePlate:"鄂B00001",//车牌
    }
```

结果

```
    {
        code:200,
        msg:"success"
    }
``` 