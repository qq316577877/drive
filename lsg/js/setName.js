mui.init({
	beforeback: function() {
		//获得列表界面的webview  
		var list = plus.webview.currentWebview().opener();
		//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
		mui.fire(list, 'refresh');
		//返回true，继续页面关闭逻辑  
		return true;
	}
});
mui.plusReady(function() {
	var sData = plus.webview.currentWebview();
	console.log(sData.name)
	if(!sData.name == "") {
		$("#name").val(sData.name);
	};

	document.getElementsByClassName("notarize")[0].addEventListener("tap", function() {
		var name = $("#name").val().trim();
		var mobile = localStorage.getItem("user-tel");
		if(name == "") {
			mui.toast("姓名不能为空");
			return;
		} else if(/[\u4e00-\u9fa5]/.test(name)) {
			var num = name.length + name.match(/[^x00-xff]/g).length;
			if(num > 32) {
				mui.toast("输入长度超出");
				return;
			}
		};
		mui(this).button('loading');
		mui.post(CONSTANTS_BASE.BASE_URL+CONSTANTS_BASE.setCarIdAndName, {
			name:name,
			mobile: mobile
		}, function(res) {
			console.log(JSON.stringify(res));
			if(res.code == 200) {
				mui.back();
				mui(".notarize").button('reset');
			} else {
				mui.toast(res.msg);
				mui(".notarize").button('reset');
			}
		}, 'json');
	});
});