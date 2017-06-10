	$(document).ready(function(){
		var url = 'http://app.llsupport.cn/appbase/card/test.php?id=2';
		dataType: 'JSONP';
        $.getJSON(url,function(data){
        $('#result').append('<img src="https://card.lovelivesupport.com/asset/'+data.normal_icon_asset+'" witdh="100%" height="auto" >'); 
        $('#result').append('<img src="https://card.lovelivesupport.com/asset/'+data.rank_max_icon_asset+'" witdh="100%" height="auto" >'); 
        });
	});