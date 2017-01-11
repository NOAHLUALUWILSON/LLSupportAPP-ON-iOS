lpcost = [5, 10, 15, 25]
   basept = [36, 89, 163, 272]
   expbydiff = [12, 26, 46, 83]
   
   function init(){
   	var inputs = document.getElementsByTagName("input");
   	var selects = document.getElementsByTagName("select");
   	for (var i=0; i<inputs.length; i++){
   		if (inputs[i].type == "text")
   			if (getCookie(inputs[i].name) != "")
   				inputs[i].value = getCookie(inputs[i].name);
   	}
   	for (var i=0; i<selects.length; i++){
   		if (getCookie(selects[i].name) != "")
   			selects[i].value = getCookie(selects[i].name);
   	}
   	document.getElementById('timeleft').style.backgroundColor = '#FFFF80'
   }
   
   function setrank(){
   	rm = [1, 1.05, 1.1, 1.15, 1.2]
   	rank = document.getElementById("rankselect").value
   	if (rank != ""){
   		document.getElementById("rank").value = rm[parseInt(rank)]
   	}
   }
   
   function clearrank(){
   	document.getElementById("rankselect").value=""
   }
   
   function setorder(){
   	om = [1.1125, 1.25, 1.15, 1.05, 1]
   	order = document.getElementById("orderselect").value
   	if (order != ""){
   		document.getElementById("order").value = om[parseInt(order)]
   	}
   }
   
   function clearorder(){
   	document.getElementById("orderselect").value = ""
   }
   
   function saveToCookie(){
   	var inputs = document.getElementsByTagName("input");
   	var selects = document.getElementsByTagName("select");
   	for (var i=0; i<inputs.length; i++){
   		if (inputs[i].type == "text")
   			setCookie(inputs[i].name, inputs[i].value, 1);
   	}
   	for (var i=0; i<selects.length; i++){
   		setCookie(selects[i].name, selects[i].value, 1);
   	}
   }
   
   function check(){
   	var inputs = document.getElementsByTagName("input");
   	for (i in inputs){
   		if (inputs[i].type != "text")
   			continue
   		if (!isNotNegative(inputs[i].value)){
   			alert("请输入非负数");
   			return false;
   		}
   		if (parseInt(document.getElementById("target").value) > 5000000){
   			alert("不可能达到5百万点以上")
   			return false;
   		}
   		if (parseInt(document.getElementById("lpwaste").value) > 240){
   			alert("一天几小时来着？")
   			return false;
   		}
   	}
   	saveToCookie();
   	calcu()
   	document.getElementById("result").scrollIntoView()
   	return true;
   }
   
   function calcu(){
   	infolist = ['timeleft', 'lpwaste','diff','rank','order','target','current','lp','lvl','exp','expf']
   	remlist = ['current','lp','lvl','exp','extraplaytime']
   	for (i in infolist)
   		eval(infolist[i]+' = parseFloat(document.getElementById(infolist[i]).value)')
   	playtime = 0
   	extraplaytime = 0
   	loveca = 0
   	lvlupwarning = 0
   	safelp = 2
   	lp += parseInt(timeleft*10)-lpwaste*parseInt((timeleft-14)/24+1)-safelp
   	while ((current < target) || (lp >= 5) || (exp >= expbylvl(lvl, expf))){
   		while ((lp >= lpcost[diff]) || (exp >= expbylvl(lvl, expf))){
   			if (lp >= lpcost[diff]){
   				play = parseInt(lp/lpcost[diff])
   				playtime += play
   				lp -=play*lpcost[diff]
   				exp += expbydiff[diff]*play
   				current += parseInt(basept[diff]*rank*order*play)
   			}
   			while (exp >= expbylvl(lvl, expf)){
   				exp -= expbylvl(lvl, expf)
   				lvl += 1
   				lp += lpbylvl(lvl)
   			}
   		}
   		//deal with remainings
   		for (i in remlist)
   			eval('tmp'+remlist[i]+' = '+remlist[i])
         while ((lp >= 5) || (exp >= expbylvl(lvl, expf))){
         while ((lp >= lpcost[diff]) || (exp >= expbylvl(lvl, expf))){
            if (lp >= lpcost[diff]){
               play = parseInt(lp/lpcost[diff])
               playtime += play
               lp -=play*lpcost[diff]
               exp += expbydiff[diff]*play
               current += parseInt(basept[diff]*rank*order*play)
            }
            while (exp >= expbylvl(lvl, expf)){
               exp -= expbylvl(lvl, expf)
               lvl += 1
               lp += lpbylvl(lvl)
            }
         }
   		if (lp >= 5){
   			for (i = 3; i >= 0; i--){
   				if (lp >= lpcost[i]){
   					lp -= lpcost[i]
   					exp += expbydiff[i]
   					current += parseInt(basept[i]*rank*order)
   					extraplaytime += 1
   				}
   			}
   		}
   		if (exp >= expbylvl(lvl, expf)){
   			continue
   		}
      }

   		if (current < target){
   			for (i in remlist)
   				eval(remlist[i]+' = tmp'+remlist[i])
   			loveca += 1
   			lp += lpbylvl(lvl)
   			lvlupwarning = 0
   		}	
   	}
   	//powered by Glaceon
   	expneed = expbylvl(lvl, expf)
   	returnlist = ['loveca','playtime','extraplaytime','lvl','exp','expneed','current','totalhour','totalminute','extrahour','extraminute','warning']
   	totalhour = parseInt((playtime)*3/60)
   	totalminute = parseInt((playtime)*3)-60*totalhour
   	extrahour = parseInt((extraplaytime)*3/60)
   	extraminute = parseInt((extraplaytime)*3)-60*extrahour
   	warning = ""
   	if (exp-3.3*lpbylvl(lvl) < 50)
   		warning = "最后一次升级的时间离活动结束时间较近，请提前规划好时间"
   	for (i in returnlist)
   		eval('document.getElementById("r"+returnlist[i]).innerHTML = '+returnlist[i])
   	document.getElementById("result").style.display = ""
   }
   
   function clearall(){
   	var inputs = document.getElementsByTagName("input");
   	var selects = document.getElementsByTagName("select");
   	for (var i=0; i<inputs.length; i++){
   		setCookie(inputs[i].name, inputs[i].value, -1);
   	}
   	for (var i=0; i<selects.length; i++){
   		setCookie(selects[i].name, selects[i].value, -1);
   	}
   	window.location.href="llsm.html"
   }
   /*
   function showprediction(){
   	document.getElementById('prediction').innerHTML = '一档 65000pt(-1100)； 二档 53500pt(-800) （10月26日12:00更新）'
   }
   
   function hideprediction(){
   	document.getElementById('prediction').innerHTML = 'LLhelper国服十月秋收花活动预测线'
   }*/