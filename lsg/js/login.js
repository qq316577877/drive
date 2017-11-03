/**
 * 登陆注册
 * Created by yangdezong on 2017/8/2.
 */
(function(mui, doc) {
	mui.init();

	mui.plusReady(function() {
		//		// 扩展API加载完毕后调用onPlusReady回调函数 
		//			document.addEventListener("plusready", onPlusReady, false);
		//
		//			function onPlusReady() {
		//				document.addEventListener("foreground", onAppForeground, false);
		//			}
		//
		//			function onAppForeground(e) {
		//				console.log("Application foreground!");
		//				var activeType = e.active; // 获取激活到前台来源
		//			}

		rapidEnrollment();
		//设置bottom绝对位置
		document.getElementsByClassName("footer")[0].style.top = (plus.display.resolutionHeight - 90) + "px";

		plus.geolocation.getCurrentPosition(function(p) {
			console.log("拿到");
			console.log(p.address);

		}, function(e) {
			console.log("Geolocation error:" + e.message);
		});

		//点击二维码按钮
		mui(".mui-input-group").on("tap", ".code-btn", function() {
			var reg = /^1[3|5|7|8]\d{9}$/gi;
			var mobile = $("#mobile").val().trim();
			if(mobile == "") {
				mui.toast("手机号不能为空");

			} else if(!reg.test(mobile)) {
				mui.toast("手机号格式错误");
			} else {
				mui.post(CONSTANTS_BASE.BASE_URL + CONSTANTS_BASE.getSMS, {
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
				}, "json");
			};
		});
		//点击登录
		$(".login").click(function() {
			var mobile = $("#mobile").val(),
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
			};
			mui.post(CONSTANTS_BASE.BASE_URL + CONSTANTS_BASE.loginAjax, {
				mobile: mobile,
				mobileCaptcha: mobileCaptcha
			}, function(res) {
				if(res.code == 200) {
					localStorage.setItem("user-tel", mobile);
					mui.openWindow({
					url: "main.html",
					id: "main.html"
				});
				} else {
					if(!res.msg) return;
					mui.toast(res.msg);
				}

			}, "json");
		});

		function rapidEnrollment() {
			var user = localStorage.getItem("user-tel");
			if(user) {
				mui.openWindow({
					url: "main.html",
					id: "main.html"
				});
			};
		};

	});
}(mui, document));