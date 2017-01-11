var pttable = new Array()
   var oldpttable = new Array()
   oldpttable[0] = [[52, 53, 54, 55, 56],[55,56,57,58,59],[58,59,60,61,62],[59,60,61,62,64],[60,61,62,64,65]]
   oldpttable[1] = [[108,110,113,115,117],[114,116,119,121,124],[120,123,125,128,130],[125,127,130,133,135],[130,132,135,138,140]]
   oldpttable[2] = [[173,176,180,185,191],[182,186,190,196,201],[192,196,200,206,212],[202,206,210,216,223],[211,216,220,227,233]]
   oldpttable[3] = [[289,295,301,319,328],[305,311,317,336,346],[321,327,334,354,364],[340,347,354,375,386],[356,363,371,393,404]]
   var newpttable = new Array()
   newpttable[0] = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,70],[66,67,69,70,71]]
   newpttable[1] = [[0,0,0,0,0],[0,0,0,0,0],[125,129,132,135,137],[133,135,137,140,143],[137,140,143,145,148]]
   newpttable[2] = [[0,0,0,0,0],[204,209,213,219,226],[215,220,224,231,237],[226,230,235,242,249],[237,241,246,254,261]]
   newpttable[3] = [[403,0,0,0,0],[426,435,444,470,484],[448,458,467,495,509],[475,485,495,525,540],[498,508,518,549,565]]
   pttable[0] = oldpttable
   pttable[1] = newpttable
   itemcost = [15, 30, 45, 75, 60, 120, 180, 300]
   itemexp = [12, 26, 46, 83, 12, 26, 46, 83]
   expperlp = [2.4, 2.6, 3.1, 3.3]
   var miao = 0
   
   function init(){
   	//alert(document.cookie)
   	var inputs = document.getElementsByTagName("input");
   	var selects = document.getElementsByTagName("select");
   	for (var i=0; i<inputs.length; i++){
   		if (inputs[i].type == "text")
   			if (getCookie(inputs[i].name+"ac") != "")
   				inputs[i].value = getCookie(inputs[i].name+"ac");
   	}
   	for (var i=0; i<selects.length; i++){
   		if (getCookie(selects[i].name+"ac") != "")
   			selects[i].value = getCookie(selects[i].name+"ac");
   	}
   	document.getElementById('timeleft').style.backgroundColor = '#FFFF80'
   }
   
   function getpt(){
      afteraquors = document.getElementById("afteraquors").value
   	diff = document.getElementById("diff").value
   	rank = document.getElementById("rank").value
   	combo = document.getElementById("combo").value
   	if ((rank != -1) && (combo != -1)){
   		if (diff >= 4)
   			document.getElementById("averagept").value = pttable[afteraquors][diff-4][rank][combo]*4
   		else
   			document.getElementById("averagept").value = pttable[afteraquors][diff][rank][combo]
   	} 
   }
   
   function clearchoice(){
   	document.getElementById("rank").value = -1
   	document.getElementById("combo").value = -1
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
   	if (parseInt(document.getElementById("target").value) > 2000000){
   		alert("不可能达到2百万点以上")
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
   		setCookie(inputs[i].name+"ac", inputs[i].value, -1);
   	}
   	for (var i=0; i<selects.length; i++){
   		setCookie(selects[i].name+"ac", selects[i].value, -1);
   	}
   	window.location.href="nomalevent.html"
   }
   
   function calcu(){
   	infolist = ['timeleft','lpwaste','lpnormal','diff','averagept','target','current','items','lp','lvl','exp','expf']
   	remlist = ['current','items','lp','lvl','exp','acplaytime','extraplaytime','extraacplaytime']
   	for (i in infolist)
   		eval(infolist[i]+' = parseFloat(document.getElementById(infolist[i]).value)')
   	playtime = 0
   	extraplaytime = 0
   	acplaytime = 0
   	extraacplaytime = 0
   	loveca = 0
   	lvlupwarning = 0
   	safelp = 2
   	lp += parseInt(timeleft*10)-lpwaste*parseInt((timeleft-14)/24+1)-safelp
   	while ((current < target) || (lp >= 4) || (items >= 15) || (exp >= expbylvl(lvl, expf))){
   		while ((lp >= lpnormal) || (items >= itemcost[diff]) || (exp >= expbylvl(lvl, expf))){
   			//can play chosen normal map
   			if (lp >= lpnormal){
   				play = parseInt(lp/lpnormal)
   				playtime += play
   				lp -= play*lpnormal
   				exp += expbylpmin(lpnormal)*play
   				items += itembylp(lpnormal)*play
   				current += itembylp(lpnormal)*play
   			}
   			//clear items
   			if (items >= itemcost[diff]){
   				acplay = parseInt(items/itemcost[diff])
   				acplaytime += acplay
   				exp += itemexp[diff]*acplay
   				items -= itemcost[diff]*acplay
   				current += averagept*acplay
   			}
   			//lvl up
   			while (exp >= expbylvl(lvl, expf)){
   				//if (lvlupwarning == 1)
   				//	lvlupwarning = 2
   				exp -= expbylvl(lvl, expf)
   				lvl += 1
   				lp += lpbylvl(lvl)
   			}
   		}
   		//deal with remainings
   		for (i in remlist)
   			eval('tmp'+remlist[i]+' = '+remlist[i])
         while ((lp >= 4) || (items >= 15) || (exp >= expbylvl(lvl, expf))){
         while ((lp >= lpnormal) || (items >= itemcost[diff]) || (exp >= expbylvl(lvl, expf))){
            //can play chosen normal map
            if (lp >= lpnormal){
               play = parseInt(lp/lpnormal)
               playtime += play
               lp -= play*lpnormal
               exp += expbylpmin(lpnormal)*play
               items += itembylp(lpnormal)*play
               current += itembylp(lpnormal)*play
            }
            //clear items
            if (items >= itemcost[diff]){
               acplay = parseInt(items/itemcost[diff])
               acplaytime += acplay
               exp += itemexp[diff]*acplay
               items -= itemcost[diff]*acplay
               current += averagept*acplay
            }
            //lvl up
            while (exp >= expbylvl(lvl, expf)){
               //if (lvlupwarning == 1)
               // lvlupwarning = 2
               exp -= expbylvl(lvl, expf)
               lvl += 1
               lp += lpbylvl(lvl)
            }
         }
   		if (lp >= 4){
   			exp += expbylpmax(lp)
   			items += itembylp(lp) 
   			current += itembylp(lp)
   			if (lp > 15)
   				extraplaytime += 2
   			else
   				extraplaytime += 1
   			lp = 0
   		}
         
   		if (exp >= expbylvl(lvl, expf)){
   			continue
   		}
   		if (items>= itemcost[diff]){
   			acplay = parseInt(items/itemcost[diff])
   			acplaytime += acplay
   			exp += itemexp[diff]*acplay
   			items -= itemcost[diff]*acplay
   			current += averagept*acplay
   		}
   		if (items >= 15){
   			for (i = 3; i >= 0; i--){
   				if (items >= itemcost[i]){
   					extraacplaytime += 1
   					exp += itemexp[i]
   					items -= itemcost[i]
   					current += pttable[document.getElementById('afteraquors').value][i][4][4]
   					i++
   				}
   			}
   		}
   		if (exp >= expbylvl(lvl, expf)){
   			continue
   		}
      }

   		//if not enough
   		if (current < target){
   			for (i in remlist)
   				eval(remlist[i]+' = tmp'+remlist[i])
   			loveca += 1
   			lp += lpbylvl(lvl)
   			lvlupwarning = 0
   		}
   	}
      //Thanks for Grit with LLHelper
   	expneed = expbylvl(lvl, expf)
   	returnlist = ['loveca','playtime','extraplaytime','acplaytime','extraacplaytime','lvl','exp','expneed','current','totalhour','totalminute','extrahour','extraminute','warning']
   	totalhour = parseInt((playtime+acplaytime)*2.5/60)
   	totalminute = parseInt((playtime+acplaytime)*2.5)-60*totalhour
   	extrahour = parseInt((extraplaytime+extraacplaytime)*2.5/60)
   	extraminute = parseInt((extraplaytime+extraacplaytime)*2.5)-60*extrahour
   	warning = ""
   	if (exp-4.5*lpbylvl(lvl) < 50)
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
   			setCookie(inputs[i].name+"ac", inputs[i].value, 1);
   	}
   	for (var i=0; i<selects.length; i++){
   		setCookie(selects[i].name+"ac", selects[i].value, 1);
   	}
   }
   
    function showprediction(){
   	document.getElementById('prediction').innerHTML = '一档 25000pt(+5050)；二档 19700pt(-550)（11月9日22:00更新）'
   }
   
   function hideprediction(){
   	document.getElementById('prediction').innerHTML = 'LLhelper十一月猫娘凛活动预测线'
   }
   