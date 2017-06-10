	$(document).ready(function(){
		var url = 'http://app.llsupport.cn/appserver/event/now.php';
		dataType: 'JSONP';
        $.getJSON(url,function(data){
        $('#result').append('<img src="http://app.llsupport.cn/appserver/event/img/banner/chs/'+data.banner_id+'.png" witdh="100%" height="auto" >'); 
        });
	});
	
	$(document).ready(function(){
		var url = 'http://app.llsupport.cn/appserver/event/notice.php';
		dataType: 'JSONP';
        $.getJSON(url,function(data){
        $('#notice').append('<P>'+data.notice+'</p>'); 
        });
	});
