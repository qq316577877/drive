(function(mui, doc) {
mui.init();
mui.plusReady(function() {
	console.log("url："+CONSTANTS_BASE.BASE_URL);
	var mobile,
		licensePlate,
		name;
	ajaxGet();
	mui(".mui-content").on("tap", ".mui-navigate-right", function() {
		var skipAddress = $(this).data("id");
		mui.openWindow({
			url: skipAddress + ".html",
			id: skipAddress + ".html",
			extras: {
				mobile: mobile,
				licensePlate: decodeURIComponent( licensePlate),
				name: decodeURIComponent(name)
			}
		});
	});

	function ajaxGet() {
		var mobile = localStorage.getItem("user-tel");
		console.log("传入手机号："+mobile);
		mui.post(CONSTANTS_BASE.BASE_URL+CONSTANTS_BASE.userSafetyAJax, {
			mobile: mobile
		}, function(res) {
			console.log(JSON.stringify(res));
			if(res.code == 200) {
				mobile = res.data.mobile;
				licensePlate = res.data.licensePlate,
					name = res.data.name;
				$("#tel").text(mobile);
				$("#carId").text(licensePlate);
				$("#name").text(name);
			}
		}, 'json');
	}

	window.addEventListener('refresh', function(e) {
		ajaxGet();
	});
});
}(mui, document));