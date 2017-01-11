 basept = [[31,64,99],[72,150,234],[126,262,408],[241,500,777]]
   lpcost = [4, 8, 12, 20]
   expbydiff = [12, 26, 46, 83]
   minutebynum = [3, 5, 7]
   
   function init(){
   	//alert(document.cookie)
   	var inputs = document.getElementsByTagName("input");
   	var selects = document.getElementsByTagName("select");
   	for (var i=0; i<inputs.length; i++){
   		if (inputs[i].type == "text")
   			if (getCookie(inputs[i].name+"mf") != "")
   				inputs[i].value = getCookie(inputs[i].name+"mf");
   	}
   	for (var i=0; i<selects.length; i++){
   		if (getCookie(selects[i].name+"mf") != "")
   			selects[i].value = getCookie(selects[i].name+"mf");
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
   
   function setcombo(){
   	om = [1, 1.02, 1.04, 1.06, 1.08]
   	order = document.getElementById("comboselect").value
   	if (order != ""){
   		document.getElementById("combo").value = om[parseInt(order)]
   	}
   }
   
   function clearcombo(){
   	document.getElementById("comboselect").value = ""
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
   	}
   	if (parseInt(document.getElementById("target").value) > 5000000){
   		alert("不可能达到5百万点以上")
   		return false;
   	}
   	if (parseInt(document.getElementById("lpwaste").value) > 240){
   		alert("一天几小时来着？")
   		return false;
   	}
   	saveToCookie();
   	calcu();
   	document.getElementById("result").scrollIntoView()
   	return true;
   }
   
   function clearall(){
   	var inputs = document.getElementsByTagName("input");
   	var selects = document.getElementsByTagName("select");
   	for (var i=0; i<inputs.length; i++){
   		setCookie(inputs[i].name+"mf", inputs[i].value, -1);
   	}
   	for (var i=0; i<selects.length; i++){
   		setCookie(selects[i].name+"mf", selects[i].value, -1);
   	}
   	window.location.href="llmf.html"
   }
   
   function calcu(){
   	infolist =['timeleft','lpwaste','diff','songnum','rank','combo','target','current','lp','lvl','exp','expf']
   	remlist =['current', 'lp', 'lvl', 'exp', 'extraplaytime','extraminute']
   	for (i in infolist)
   		eval(infolist[i]+' = parseFloat(document.getElementById(infolist[i]).value)')
   	expmulti = 1
   	ptmulti = 1
   	if (document.getElementById('expbonus').checked)
   		expmulti = 1.1
   	if (document.getElementById('acptbonus').checked)
   		ptmulti = 1.1
   	friendmulti = 1
   	playtime = 0
   	extraplaytime = 0
   	totalminute = 0
   	extraminute = 0
   	loveca = 0
   	lvlupwarning = 0
   	safelp = 2
   	lp += parseInt(timeleft*10)-lpwaste*parseInt((timeleft-14)/24+1)-safelp
   	while ((current < target) || (lp >= 4) || (exp >= expbylvl(lvl, expf))){
   		while ((lp >= lpcost[diff]*songnum) || (exp >= expbylvl(lvl, expf))){
   			if (lp >= lpcost[diff]*songnum){
   				play = parseInt(lp/(lpcost[diff]*songnum))
   				playtime += play
   				totalminute += play*minutebynum[songnum-1]
   				lp -=play*lpcost[diff]*songnum
   				exp += parseInt((expbydiff[diff]*songnum*play*expmulti).toFixed(0))
   				current += parseInt((basept[diff][songnum-1]*rank*combo*ptmulti*friendmulti*play).toFixed(0))
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
   		while ((lp >= 4) || (exp >= expbylvl(lvl, expf))){
         while ((lp >= lpcost[diff]*songnum) || (exp >= expbylvl(lvl, expf))){
            if (lp >= lpcost[diff]*songnum){
               play = parseInt(lp/(lpcost[diff]*songnum))
               playtime += play
               totalminute += play*minutebynum[songnum-1]
               lp -=play*lpcost[diff]*songnum
               exp += parseInt((expbydiff[diff]*songnum*play*expmulti).toFixed(0))
               current += parseInt((basept[diff][songnum-1]*rank*combo*ptmulti*friendmulti*play).toFixed(0))
            }
            while (exp >= expbylvl(lvl, expf)){
               exp -= expbylvl(lvl, expf)
               lvl += 1
               lp += lpbylvl(lvl)
            }
         }
   		if (lp >= 4){
   			for (i = songnum-1; i >= 1; i--){
   				if (lp >= lpcost[diff]*i){
   					lp -= lpcost[diff]*i
   					exp += parseInt((expbydiff[diff]*i*expmulti).toFixed(0))
   					current += parseInt((basept[diff][i-1]*rank*combo*ptmulti*friendmulti).toFixed(0))
   					extraplaytime += 1
   					extraminute += 3
   				}
   			}
   			for (i = diff-1; i >=0; i--){
   				if (lp >= lpcost[i]){
   					lp -= lpcost[i]
   					exp += parseInt((expbydiff[i]*expmulti).toFixed(0))
   					current += parseInt((basept[i][0]*rank*combo*ptmulti*friendmulti).toFixed(0))
   					extraplaytime += 1
   					extraminute += 3
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
   	exp = parseInt(exp)
   	current = parseInt(current)
   	totalminute = parseInt(totalminute)
   	extraminute = parseInt(extraminute)
   	returnlist = ['loveca','playtime','extraplaytime','lvl','exp','expneed','current','totalhour','totalminute','extrahour','extraminute','warning']
   	totalhour = parseInt(totalminute/60)
   	totalminute -= 60*totalhour
   	extrahour = parseInt(extraminute/60)
   	extraminute -= 60*extrahour
   	warning = ""
   	if (exp-4.1*expmulti*lpbylvl(lvl) < 50)
   		warning = "最后一次升级的时间离活动结束时间较近，请提前规划好时间"
   	for (i in returnlist)
   		eval('document.getElementById("r"+returnlist[i]).innerHTML = '+returnlist[i])
   	document.getElementById("result").style.display = ""
   }
   
   function saveToCookie(){
   	var inputs = document.getElementsByTagName("input");
   	var selects = document.getElementsByTagName("select");
   	for (var i=0; i<inputs.length; i++){
   		if (inputs[i].type == "text")
   			setCookie(inputs[i].name+"mf", inputs[i].value, 1);
   	}
   	for (var i=0; i<selects.length; i++){
   		setCookie(selects[i].name+"mf", selects[i].value, 1);
   	}
   }