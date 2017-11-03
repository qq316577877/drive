# 坐标定位

## 添加司机手机坐标

ajax url:/admin/drivers/add_driver_coordinate_location

请求

```
    POST
    {
        mobile:"13612345678",
        latitudeCoordinates:155.555,//纬度坐标
        longitudeCoordinate:155.555,//经度坐标
        
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
    