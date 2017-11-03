/**
 * 设置与退出
 * Created by yangdezong 2017/8/2.
 */

mui.init();
mui.plusReady(function() {
	//设置bottom绝对位置
	document.getElementsByClassName('footer')[0].style.top = (plus.display.resolutionHeight - 90) + "px";
	mui(".btn-box").on("tap", ".exit", function() {
		localStorage.removeItem("user-tel");
		mui.openWindow({
			url: "login.html",
			id: "login.html"
		});
	});

	mui(".user").on("tap", ".user-safety-skip", function() {
		mui.openWindow({
			url: "userSafety.html",
			id: "userSafety.html"
		});
	});
}); 