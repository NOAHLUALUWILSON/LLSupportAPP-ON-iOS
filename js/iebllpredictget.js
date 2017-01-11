	function getdata(evt){
	var isevt = evt;
	if(isevt==true){
	$.ajax({
		type: "GET",
		url: "https://sifcn.loveliv.es/predict/json/",
		dataType: "json",
		success: function pr(src){
		var prd1 = src.T1;
		var prd2 = src.T2;
		var prdo1 = parseInt(prd1);
		var prdo2 = parseInt(prd2);
		var prd_text = "一档：" + prdo1 + "pt；二档：" + prdo2 + "pt";
		document.getElementById("prd").innerHTML = prd_text;
		},
		error:function(){
			var failed = "获取失败_(:3」∠)_请稍后再试";
		}
	});	
	}else{
	document.getElementById("prd").innerHTML = "_(:3」∠)_别刷啦！当前未在活动期间";
	}
	}