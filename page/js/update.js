var wgtVer=null;
function plusReady(){
	// Android back
	
// get local version
	plus.runtime.getProperty(plus.runtime.appid,function(inf){
		wgtVer=inf.version;
		console.log("当前内部资源版本："+wgtVer);
	});
}
if(window.plus){
	plusReady();
}else{
	document.addEventListener('plusready',plusReady,false);
}
// check update
var checkUrl="http://app.llsupport.cn/appserver/update/ios/version.php";
function checkUpdate(){
	plus.nativeUI.showWaiting("看看有没有Noah可爱的软件包");
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		switch(xhr.readyState){
			case 4:
			plus.nativeUI.closeWaiting();
			if(xhr.status==200){
				console.log("检测更新成功："+xhr.responseText);
				var newVer=xhr.responseText;
				if(wgtVer&&newVer&&(wgtVer!=newVer)){
					downWgt();	// downloah the packge
				}else{
					plus.nativeUI.alert("没有新的东西诶Noah变懒了~");
				}
			}else{
				console.log("检测更新失败啦/;w;/");
				plus.nativeUI.alert("检测更新失败啦/;w;/");
			}
			break;
			default:
			break;
		}
	}
	xhr.open('GET',checkUrl);
	xhr.send();
}
// download wgt
var wgtUrl="http://app.llsupport.cn/appserver/update/ios/wget/H582300EB.wgt";
function downWgt(){
	plus.nativeUI.showWaiting("远程接收Noah中");
	plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
		if ( status == 200 ) { 
			console.log("下载Noah成功：");
			installWgt(d.filename);	// install wgt packge
		} else {
			console.log("下载Noah失败QAQ");
			plus.nativeUI.alert("下载Noah失败QAQ");
		}
		plus.nativeUI.closeWaiting();
	}).start();
}
// update version
function installWgt(path){
	plus.nativeUI.showWaiting("安装Noah中 Kira~");
	plus.runtime.install(path,{},function(){
		plus.nativeUI.closeWaiting();
		console.log("安装Noah成功啦~");
		plus.nativeUI.alert("新的Noah进入了你的手机！",function(){
			plus.runtime.restart();
		});
	},function(e){
		plus.nativeUI.closeWaiting();
		console.log("安装Noah失败");
		plus.nativeUI.alert("安装Noah失败");
	});
}



// update

//function{
//	plus.nativeUI.showwatting ( "BOOTING")
//	[i]>[i3]>{plus.[ib]{ 
//	secs/SharedWorker/SVGForeignObjectElement[songs>objSelect]
//	}
//	}
//}
