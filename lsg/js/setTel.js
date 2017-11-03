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
	//					var sData = plus.webview.currentWebview();
	//					if(!sData.mobile == ""){
	//						$("#mobile").val(sData.mobile);
	//					};

});

//点击二维码按钮
mui(".code-box").on("tap", ".code-btn", function() {
	console.log(1)
	var reg = /^1[3|5|7|8]\d{9}$/gi;
	var mobile = $("#mobile").val().trim();
	var oldMobile = localStorage.getItem("user-tel");
	console.log(oldMobile);
	if(mobile == "") {
		mui.toast("手机号不能为空");
	} else if(!reg.test(mobile)) {
		mui.toast("手机号格式错误");
	} else if(oldMobile == mobile) {
		mui.toast("当前手机号无需修改");
	} else {
		mui.post(CONSTANTS_BASE.BASE_URL+CONSTANTS_BASE.getSMS, {
			mobile: mobile,
			type: 11
		}, function(res) {
			if(res.code == 200) {
				var num = 60;
				$(".code-btn")[0].disabled = true;
				$(".code-btn").css("color", "#999");
				var time = setInterval(function() {
					num--;
					$(".code-btn").text("剩余时间:" + num);
					if(num == 0) {
						clearTimeout(time);
						num = 60;
						$(".code-btn")[0].disabled = false;
						$(".code-btn").css("color", "#ffb348").text("获取短信验证码");
					};
				}, 1000);
			};
		}, 'json');
	}
});

//点击登录
mui(".btn-box").on("tap", ".notarize", function() {
	var mobile = $("#mobile").val(),
		oldMobile = localStorage.getItem("user-tel"),
		mobileCaptcha = $("#mobileCaptcha").val(),
		
		regTel = /^1[3|5|7|8]\d{9}$/gi,
		reg = /^\d{6,}$/;

	if(mobile == "") {
		mui.toast("手机号不能为空");
		return;
	} else if(!regTel.test(mobile)) {
		mui.toast("手机号格式错误");
		return;
	} else if(mobileCaptcha == "") {
		mui.toast("验证码不能为空");
		return;
	} else if(!reg.test(mobileCaptcha)) {
		mui.toast("验证码格式错误");
		return;
	} else {
		mui(this).button('loading');
		console.log("获取本地手机号："+mobile);
		mui.get(CONSTANTS_BASE.BASE_URL+CONSTANTS_BASE.setTel, {
			oldMobile: oldMobile, //原注册手机号
			newMobile: mobile, //修改手机号
			mobileCaptcha: mobileCaptcha
		}, function(res) {
			console.log(JSON.stringify(res));
			if(res.code == 200) {
				//localStorage.removeItem("user-tel");
				localStorage.setItem("user-tel", mobile);
				mui.back();
				mui(".notarize").button('reset');
			} else {
				mui.toast(res.msg);
				mui(".notarize").button('reset');
			}
		}, 'json');
	};

});