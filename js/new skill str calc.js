function skillstr(c, str, revised, version, mode){
	
	var combo = songsettings.notes;
	var perfectrate = songsettings.perfect;
	var time = songsettings.time
	var longrate=songsettings.hold;
	var score = c.skilleffect;
	var possibility = c.skillchance;
	var require = c.skilltrigger;
	var type=c.skilltype;
	var skill;
	var waste;
	if (revised==0){
	  //accurracy
	  if ((type[1]=="spl") || (type[1]=="pl")){
		  //time - PL
		if (type[0]=="time"){
		  skill = score*possibility/require
		  skill = skill/(skill+1.0)
		}
		//icon or combo PL
		else if ((type[0]=="icon") || (type[0]=="combo")){
		  skill = combo*score*possibility/require/time
		}
	  }
	  //recover
	  if (type[1]=="healer"){
		  //time - healer
		if (type[0]=="time")
		  skill = time*score*possibility/require/combo
		//icon - healer
		else if (type[0]=="icon")
		  skill = score*possibility/require
		//combo - healer      
		else if (type[0]=="combo")
		  skill = score*possibility/require
	  //perfect - healer
		else if (type[0]=="perfect")
		  skill = perfectrate*score*possibility/require
	  }
	  //score
	  if (type[1]=="score"){
		  //time - score up
		if (type[0]=="time")
		  skill = 80/1.1/cbmulti(combo)/(1+0.25*longrate)/(0.88+0.12*perfectrate)*time/combo*score*possibility/require
	      //icon - score up
		else if (type[0]=="icon")
		  skill = 80/1.1/cbmulti(combo)/(1+0.25*longrate)/(0.88+0.12*perfectrate)*score*possibility/require
			//combo - score up
		else if (type[0]=="combo")
		  skill = 80/1.1/cbmulti(combo)/(1+0.25*longrate)/(0.88+0.12*perfectrate)*score*possibility/require
			//score - score up
		else if (type[0]=="score"){
			skill = str*score*possibility/require
		}
			//perfect - score up
		else if (type[0]=="perfect")
		  skill = 80/1.1/cbmulti(combo)/(1+0.25*longrate)/(0.88+0.12*perfectrate)*score*perfectrate*possibility/require
			//starperfect - score up
		else if (type[0]=="star")
		  skill = 80/1.1/cbmulti(combo)/(1+0.25*longrate)/(0.88+0.12*perfectrate)*score*star/combo*perfectrate*possibility/require
		if ((type[0]!="score") && (version==4))
		  skill = skill/1.1
	  }
	}
	else if (revised==1){
	  //accurracy
	  if ((type[1]=="spl") || (type[1]=="pl")){
		if (type[0]=="time"){
		  skill = score*possibility/require
		  skill = skill/(skill+1.0)
		  waste = (1-skill)*skill*require/2+skill*score/2
		  skill = (skill*time-waste)/time
		}
		else if ((type[0]=="icon") || (type[0]=="combo")){
		  skill = combo*score*possibility/require/time
		  waste = skill*score/2
		  skill = combo*score*possibility/require/time*(combo-require/2)/combo
		  skill = (skill*time-waste)/time
		}
	  }
	  //recover
	  if (type[1]=="healer"){
		if (type[0]=="time")
		  skill = time*score*possibility/require/combo*(time-require/2)/time
		else if (type[0]=="icon")
		  skill = score*possibility/require*(combo-require/2)/combo
		else if (type[0]=="combo")
		  skill = score*possibility/require*(combo-require/2)/combo
		else if (type[0]=="perfect")
		  skill = perfectrate*score*possibility/require*((combo*perfectrate)-require/2)/(combo*perfectrate)
	  }
	  //score
	  if (type[1]=="score"){
		if (type[0]=="time")
		  skill = 80/1.1/cbmulti(combo)/(1+0.25*longrate)/(0.88+0.12*perfectrate)*time/combo*score*possibility/require*(time-require/2)/time
		else if (type[0]=="icon")
		  skill = 80/1.1/cbmulti(combo)/(1+0.25*longrate)/(0.88+0.12*perfectrate)*score*possibility/require*(combo-require/2)/combo
		else if (type[0]=="combo")
		  skill = 80/1.1/cbmulti(combo)/(1+0.25*longrate)/(0.88+0.12*perfectrate)*score*possibility/require*(combo-require/2)/combo
		else if (type[0]=="score"){
			skill = str*score*possibility/require*((str*60/7)-require/2)/(str*60/7)
		}
		else if (type[0]=="perfect")
		  skill =80/1.1/cbmulti(combo)/(1+0.25*longrate)/(0.88+0.12*perfectrate)*score*perfectrate*possibility/require*((combo*perfectrate)-require/2)/(combo*perfectrate)
		else if (type[0]=="star")
		  skill = 80/1.1/cbmulti(combo)/(1+0.25*longrate)/(0.88+0.12*perfectrate)*score*star/combo*perfectrate*possibility/require*(star-require/2)/star
		if ((type[0]!="score") && (version==4))
		  skill = skill/1.1
	  }
	}
	switch(mode){
		case "str":
			//only score skill will be returned
			if(type[1]!="score"){
				skill=0;
			}
		break;
		case "siskill":
			//score will * 1.5 and healing will ... * something complicated and this will be compared w/ att*0.208*ctr.
			if(type[1]=="score"){
				skill*=1.5;
			}else if(type[1]=="healer"){
				skill=skill*80/1.1/1.1/cbmulti(combo)/(1+0.25*longrate)/(0.88+0.12*perfectrate)*270;
			}else{
				//PL = 0!
				skill=0;
			}
		break;
		case "healer":
			if(type[1]!="healer"){
				skill=0;
			}
			skill*=songsettings.notes;
		break;
		case "pl":
			if(type[1]!="pl"){
				skill=0;
			}
		break;
		case "spl":
			if(type[1]!="spl"){
				skill=0;
			}
		break;
		default:
		
		break;
	}
	return skill;
   }

   
function cbmulti(cb) {
  if (cb <= 50) {
	 return 1;
  } else if (cb <= 100) {
	 return 1.1 - 5 / cb;
  } else if (cb <= 200) {
	 return 1.15 - 10 / cb;
  } else if (cb <= 400) {
	 return 1.2 - 20 / cb;
  } else if (cb <= 600) {
	 return 1.25 - 40 / cb;
  } else if (cb <= 800) {
	 return 1.3 - 70 / cb;
  } else {
	 return 1.35 - 110 / cb;
  }
}