lpmf = [4,8,12,20]
   lpsm = [5,10,15,25]
   lpbydiff = [5,10,15,25]
   expbydiff = [12,26,46,83]
   expbyfivemin = [12,26,46,52,83]
   expbylpmax = [0, 0, 0, 0, 9, 12, 14, 17, 20, 25, 29, 29, 35, 35, 42, 46, 46, 47, 51, 55, 58, 60, 63, 66, 71, 83]
   expbylpmin = [0, 0, 0, 0, 9, 12, 14, 17, 20, 23, 26, 29, 35, 35, 42, 46, 46, 47, 51, 55, 58, 60, 63, 66, 69, 83]
   function init(){
   	//alert(document.cookie)
   	var inputs = document.getElementsByTagName("input");
   	var selects = document.getElementsByTagName("select");
   	for (var i=0; i<inputs.length; i++){
   		if (inputs[i].type == "text")
   			if (getCookie(inputs[i].name+"lvlup") != "")
   				inputs[i].value = getCookie(inputs[i].name+"lvlup");
   	}
   	for (var i=0; i<selects.length; i++){
   		if (getCookie(selects[i].name+"lvlup") != "")
   			selects[i].value = getCookie(selects[i].name+"lvlup");
   	}
   	settype()
   }
   
   function maxchoice(lvl){
   	if (lvl >= 70)
   		return 60
   	else if (lvl >= 30)
   		return 40
   	else if (lvl >= 22)
   		return 36
   	else
   		return 24
   }
   
   function settype(){
   	type = document.getElementById("actype").value
   	if (type == 1){
   		document.getElementById("mfexp").style.display = "none"
   		document.getElementById("actimes").style.display = ""
   	}
   	else if (type == 3){
   		document.getElementById("actimes").style.display = "none"
   		document.getElementById("mfexp").style.display = ""
   	}
   	else{
   		document.getElementById("mfexp").style.display = "none"
   		document.getElementById("actimes").style.display = "none"
   		/*
   		document.getElementById("aceasy").value = 0
   		document.getElementById("acnormal").value = 0
   		document.getElementById("achard").value = 0
   		document.getElementById("acexpert").value = 0*/
   	}	
   }
   
   function clearall(){
   	var inputs = document.getElementsByTagName("input");
   	var selects = document.getElementsByTagName("select");
   	for (var i=0; i<inputs.length; i++){
   		setCookie(inputs[i].name+"lvlup", inputs[i].value, -1);
   	}
   	for (var i=0; i<selects.length; i++){
   		setCookie(selects[i].name+"lvlup", selects[i].value, -1);
   	}
   	window.location.href="lllvup.html"
   }
   
   function saveToCookie(){
   	var inputs = document.getElementsByTagName("input");
   	var selects = document.getElementsByTagName("select");
   	for (var i=0; i<inputs.length; i++){
   		if (inputs[i].type == "text")
   			setCookie(inputs[i].name+"lvlup", inputs[i].value, 1);
   	}
   	for (var i=0; i<selects.length; i++){
   		setCookie(selects[i].name+"lvlup", selects[i].value, 1);
   	}
   }
   
   function totwo(string){
   	str = String(string)
   	while (str.length < 2){
   		str = '0'+str
   	}
   	return str
   }
   
   function calcu(){
   	infolist = ['lvl', 'exp', 'lp', 'loveca', 'aceasy', 'acnormal', 'achard', 'acexpert', 'actype', 'lpcost', 'expf']
   	returnlist = ['nowexp', 'minlvluptime', 'bestlvluptime', 'maxlvluptime', 'nowtime', 'expremain']
   	for (i in infolist)
   		eval(infolist[i]+' = parseFloat(document.getElementById(infolist[i]).value)')
   	
   	expneed = expbylvl(lvl, expf)
   	nowexp = String(exp)+'/'+String(expneed)
   	
   	nowtime = new Date()
   	lvluptime = new Date()
   	if (actype == 3){
   		lpbydiff = lpmf
   	}
   	else {
   		lpbydiff = lpsm
   	}
   	if (actype <= 3){
   		if (actype == 1){
   			exp += aceasy*12+acnormal*26+achard*46+acexpert*83
   		}
   		expmulti = 1
   		if ((document.getElementById('expbonus').checked) && (actype == 3))
   			expmulti = 1.1
   		if (document.getElementById('rank').checked)
   			expmulti *= 0.5
   		lp += loveca*lpbylvl(lvl)
   		ptime = parseInt(lp/lpbydiff[lpcost])
   		exp += parseInt(expbydiff[lpcost]*expmulti)*ptime
   		lp -= lpbydiff[lpcost]*ptime
   		if (exp > expneed){
   			//lvluptime="已经能升级了"
   			//expremain = exp-expneed
   			returnlist = ['nowexp','nowtime']
   			nowtime = timeString(nowtime)
   			document.getElementById('result').style.display = ''
   			document.getElementById('resultdata').style.display = 'none'
   			document.getElementById('already').style.display = ''
   			for (i in returnlist)
   		eval('document.getElementById("r"+returnlist[i]).innerHTML = '+returnlist[i])
   			return
   		}
   		else{
   			ptimes = Math.ceil((expneed-83-exp)/(expbydiff[lpcost]*expmulti))
   			if (ptimes > 0){
   				lpneed = lpbydiff[lpcost]*ptimes-lp
   				lp = 0
   				exp += parseInt(expbydiff[lpcost]*expmulti)*ptimes
   				lvluptime.setMinutes(lvluptime.getMinutes()+6*lpneed)
   			}
   			
   			//remaining
   			ptimes = Math.ceil((expneed-exp)/expbydiff[lpcost])
   			lpneed = lpbydiff[lpcost]*ptimes-lp
   			bestlvluptime = new Date(lvluptime)
   			bestlvluptime.setMinutes(bestlvluptime.getMinutes()+6*lpneed)
   			expbest = expbydiff[lpcost]*ptimes+exp
   			expremain = expbest-expneed
   			
   			minlvluptime = new Date(lvluptime)
   			if (actype <= 1){
   				for (i=0;i<=25;i++){
   					if (exp+expbylpmax[i] >= expneed){
   						minlvluptime.setMinutes(minlvluptime.getMinutes()+6*(i-lp))
   						break
   					}
   				}
   			}
   			else{
   				for (i=0;i<4;i++){
   					if (exp+expbydiff[i] >= expneed){
   						minlvluptime.setMinutes(minlvluptime.getMinutes()+6*(lpbydiff[i]-lp))
   						break
   					}
   				}
   			}
   			
   			maxlvluptime = new Date(lvluptime)
   			if (actype <= 1){
   				//canplay = 0
   				for (i=24;i>=4;i--){
   					if (exp+expbylpmin[i] < expneed){
   						maxlvluptime.setMinutes(maxlvluptime.getMinutes()+6*(i-lp))
   						lp = 0
   						break
   					}
   				}
   				maxlvluptime.setMinutes(maxlvluptime.getMinutes()+6*(25-lp))
   			}
   			else if (actype == 2){
   				for (i = 4; i >=0;i--){
   					if (exp+expbyfivemin[i] < expneed){
   						maxlvluptime.setMinutes(maxlvluptime.getMinutes()+6*(5*(i+1)-lp))
   						lp = 0
   						break
   					}
   				}
   				maxlvluptime.setMinutes(maxlvluptime.getMinutes()+6*(25-lp))
   			}
   			else if (actype == 3){
   				for (i = 4; i >=0;i--){
   					if (exp+expbyfivemin[i] < expneed){
   						maxlvluptime.setMinutes(maxlvluptime.getMinutes()+6*(4*(i+1)-lp))
   						lp = 0
   						break
   					}
   				}
   				maxlvluptime.setMinutes(maxlvluptime.getMinutes()+6*(maxchoice(lvl)-lp))
   			}
   			
   			minlvluptime = timeString(minlvluptime)
   			bestlvluptime = timeString(bestlvluptime)
   			maxlvluptime = timeString(maxlvluptime)
   		}
   	}
   	
   	
   	nowtime = timeString(nowtime)
   	document.getElementById('resultdata').style.display = ''
   	
   	for (i in returnlist)
   		eval('document.getElementById("r"+returnlist[i]).innerHTML = '+returnlist[i])
   	document.getElementById("result").style.display = ""
   	document.getElementById("already").style.display = "none"
   }
   
   function timeString(t){
   	return String(t.getMonth()+1)+'月'+String(t.getDate())+'日 '+totwo(String(t.getHours()))+':'+totwo(String(t.getMinutes()))
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
   	if (parseInt(document.getElementById("lvl").value) < 1){
   		alert("等级不能为负")
   		return false;
   	}
   	saveToCookie();
   	calcu()
   	return true;
   }