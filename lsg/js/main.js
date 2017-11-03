/**
 * 主界面
 * Created by qinmenghuan on 2017/8/2.
 */

(function(mui, doc) {
	mui.init();
	// var settings = app.getSettings();
	// 获取登录的账号
	//	var account = doc.getElementById('account');

	//	window.addEventListener('show', function() {
	//		var state = app.getState();
	//		account.innerText = state.account;
	//	}, false);
	mui.plusReady(function() {

		// 全局变量
		var interval = 240 * 1000; // 上传经纬度间隔时间 
		var telphone = localStorage.getItem("user-tel");
		// 创建地图
		var baiduMap = new plus.maps.Map("map");
		// 更新地图
		refreshBaiduMap();

		// 更新地图
		function refreshBaiduMap() {
			console.log("开始更新地图啦");

			baiduMap.getUserLocation(function(state, point) {
				if(0 == state) { // 清除
					//	alert(JSON.stringify(point));
					baiduMap.clearOverlays();
					baiduMap.centerAndZoom(new plus.maps.Point(point.longitude, point.latitude), 17);

					//var myIcon = new plus.maps.Icon("http://api.map.baidu.com/img/markers.png",new plus.maps.Size(23, 25), {offset: new plus.maps.Size(10, 25), imageOffset: new plus.maps.Size(0, 0 - 10 * 25)  });  
					// var marker=new BMap.Marker(e.point,{icon:myIcon});  
					//var myIcon = new plus.maps.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif");

					var marker = new plus.maps.Marker(new plus.maps.Point(point.longitude, point.latitude));

					//var marker2 = new BMap.Marker(pt,{icon:myIcon});  

					marker.setIcon("/position.png");
					//marker.setIcon("../position.png");
					//					marker.setLabel("当前位置");
					var bubble = new plus.maps.Bubble("当前位置");
					marker.setBubble(bubble);
					baiduMap.addOverlay(marker);

					// 上传经纬度
					uploadPosition(point);
					//console.log(JSON.stringify(point));
				} else {
					console.log("Failed!");
				}
			});
		}

		// 循环上传
		setInterval(function() {
			// 更新
			refreshBaiduMap();
		}, interval);

		// 设置按钮
		mui(".mui-bar").on('tap', '.mui-icon', function() {
			mui.openWindow({
				url: "setAndExit.html",
				id: "setAndExit.html",
				styles: {
					top: 0
				}
			});
		});

		// 上传经纬度
		function uploadPosition(point) {
			if(telphone) {
				var ajaxUrl = CONSTANTS_BASE.BASE_URL + CONSTANTS_BASE.mainAjax;
				mui.post(ajaxUrl, {
					mobile: telphone,
					latitudeCoordinates: point.latitude,
					longitudeCoordinate: point.longitude
				}, function(res) {
					console.log(JSON.stringify(res));
				}, "json");
			};
		};

	});
}(mui, document));