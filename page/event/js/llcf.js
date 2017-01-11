 basept = [[39,40,41,42,43],[91,94,97,100,103],[158,164,170,176,182],[301,320,339,358,377]]
   lpcost = [5, 10, 15, 25]
   baseexp = [[12,13,14,15,16],[26,29,32,35,38],[46,51,56,61,66],[83,93,103,113,123]]
   expbydiff = [12, 26, 46, 83]
   minutebynum = [3, 5, 7]
   
   function init(){
   	//alert(document.cookie)
   	var inputs = document.getElementsByTagName("input");
   	var selects = document.getElementsByTagName("select");
   	for (var i=0; i<inputs.length; i++){
   		if (inputs[i].type == "text")
   			if (getCookie(inputs[i].name+"cf") != "")
   				inputs[i].value = getCookie(inputs[i].name+"cf");
   	}
   	for (var i=0; i<selects.length; i++){
   		if (getCookie(selects[i].name+"cf") != "")
   			selects[i].value = getCookie(selects[i].name+"cf");
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
   		setCookie(inputs[i].name+"cf", inputs[i].value, -1);
   	}
   	for (var i=0; i<selects.length; i++){
   		setCookie(selects[i].name+"cf", selects[i].value, -1);
   	}
   	window.location.href="llcf.html"
   }
   
   function calcu(){
   	infolist =['timeleft','lpwaste','diff','songnum','rank','combo','target','current','lp','lvl','exp','expf','bonus','currentround','poolpt','exppool']
   	remlist =['current', 'lp', 'lvl', 'exp', 'extraplaytime','extraminute','currentround','exppool','poolpt','playtime']
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
   	while ((current < target) || (lp >= 5) || (exp >= expbylvl(lvl, expf))){
   		while ((lp >= lpcost[diff]) || (exp >= expbylvl(lvl, expf))){
   			if (lp >= lpcost[diff]){
   				playtime += 1
   				lp -= lpcost[diff]
               exppool += Math.round(baseexp[diff][currentround-1]*expmulti)
               poolpt += Math.round(basept[diff][currentround-1]*rank*combo*ptmulti*bonus)
               currentround += 1
               if (currentround > songnum){
                  exp += exppool
                  current += poolpt
                  poolpt = 0
                  exppool=0
                  currentround = 1
               }
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
         //stop in current round
         exp += exppool
         current += poolpt
         poolpt = 0
         exppool=0
         currentround = 1
   		while ((lp >= 5) || (exp >= expbylvl(lvl, expf))){
            while ((lp >= lpcost[diff]) || (exp >= expbylvl(lvl, expf))){
               if (lp >= lpcost[diff]){
                  playtime += 1
                  lp -= lpcost[diff]
                  exppool += Math.ceil(baseexp[diff][currentround-1]*expmulti)
                  poolpt += Math.round(basept[diff][currentround-1]*rank*combo*ptmulti*bonus)
                  currentround += 1
                  if (currentround > songnum){
                     exp += exppool
                     current += poolpt
                     poolpt = 0
                     exppool=0
                     currentround = 1
                  }
               }
               while (exp >= expbylvl(lvl, expf)){
                  exp -= expbylvl(lvl, expf)
                  lvl += 1
                  lp += lpbylvl(lvl)
               }
            }
            exp += exppool
            current += poolpt
            poolpt = 0
            exppool=0
            currentround = 1
            if (exp >= expbylvl(lvl, expf))
               continue
      		if (lp >= 5){
      			for (i = diff-1; i >=0; i--){
      				if (lp >= lpcost[i]){
      					lp -= lpcost[i]
      					exp += Math.ceil(baseexp[i][0]*expmulti)
      					current += Math.round(basept[i][0]*rank*combo*ptmulti*bonus)
      					extraplaytime += 1
      				}
      			}
      		}
      		if (exp >= expbylvl(lvl, expf)){
      			continue
      		}
         }
         //backtrace
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

   	returnlist = ['loveca','playtime','extraplaytime','lvl','exp','expneed','current','totalhour','totalminute','extrahour','extraminute','warning']
   	totalhour = parseInt((playtime)*3/60)
      totalminute = parseInt((playtime)*3)-60*totalhour
      extrahour = parseInt((extraplaytime)*3/60)
      extraminute = parseInt((extraplaytime)*3)-60*extrahour
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
   			setCookie(inputs[i].name+"cf", inputs[i].value, 1);
   	}
   	for (var i=0; i<selects.length; i++){
   		setCookie(selects[i].name+"cf", selects[i].value, 1);
   	}
   }