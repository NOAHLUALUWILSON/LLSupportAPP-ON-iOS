//Run these code ON START

$(document).ready(function(){
	//hide elements
	$("#block_advsettings").hide();
	$("#block_songsettings").hide();
	$("#block_database").hide();
	$("#block_cardeditor").hide();
	$("#cardeditor-skillinfo").hide();
	$("#cardeditor-ctrskilldetail").hide();
	$("#cardeditor-saveanyway").hide();
	$("#block_cardeditor_inner").hide();
	$("#block_inventory").hide();
	$("#block_import").hide();
	$("#block_results").hide();
	$("#results_smile_muse").hide();
	$("#results_pure_muse").hide();
	$("#results_cool_muse").hide();
	$("#results_smile_aqours").hide();
	$("#results_pure_aqours").hide();
	$("#results_cool_aqours").hide();
	$("#results_healer").hide();
	$("#results_pl").hide();
	//disable things that are to be disabled
	versionsettings();
	
	//DEV variables actions
	if(optimize_enabled){
		document.getElementById("settings-sismode-optimized").disabled=false;
	}
	if(show_all_settings){
		document.getElementById("block_sisest").style.display="";
	}
	if(promo_ssr_has_two_slots){
		sisslots.ssr[1]=[2,2];
	}
	loaded=true;
});
var txtvar=localization.zh.vars;



//VARIABLES FOR DEVELOPERS

//When you have got that optimizing thing ready, change that to TRUE. It will allow the "optimize" mode of dealing with SIS.
var optimize_enabled=false;

//If this is set to be true, all setting will be available regardless of the game version setting.
var show_all_settings=false;

//In case of upcoming Promo SSR: The database currently assumes that it has 1 SIS slot. If it has two, set below to true.
var promo_ssr_has_two_slots=false;


//variables!!!!!!!!!!!!!!!>_<
//in case some code got running w/o having everything properly loaded
var loaded=false;

//card editor variables
//determins show/hide, also determins if will warn on overwrite
var isediting=false;
//determins if it's "editing new card" mode. If yes the card will be pushed to the end of the array, otherwise it will replace an existing card
var iseditingnewcard=false;
//the index of the card that is being edited, if above is yes
var currentlyeditingcardindex;

var version=3;  //3=3.x or below, 4=4.0 or above
var settings=new Object();
	settings.forceatt=0;
	settings.forcegroup=0;
	settings.sismode=""; //broken now?
	settings.maxlevel=0;
	settings.maxkizuna=0;
	settings.maxslots=0;
	settings.attemptallctrskills=0;
	settings.userevisedskilleff=0;
	settings.colordebuff=0.1;
	settings.groupdebuff=0.1;
	settings.ignorewarnings="";
	settings.sisestimation= new Object();
	//N, R and promo do not have these because of the one-or-two-slot exception. To be exact, 1 slot is fixed to be 200, and 2 slots will choose from 10% or 450.
	settings.sisestimation.sr=new Object();
	settings.sisestimation.sr.mode=0;
	settings.sisestimation.sr.value=0;
	settings.sisestimation.ssr=new Object();
	settings.sisestimation.ssr.mode=0;
	settings.sisestimation.ssr.value=0;
	settings.sisestimation.ur=new Object();
	settings.sisestimation.ur.mode=0;
	settings.sisestimation.ur.value=0;
	
var songsettings=new Object();
	songsettings.notes=500;
	songsettings.hold=0.08;
	songsettings.perfect=0.95
	songsettings.star=65;
	songsettings.time=120;
var advanced=new Object();
	advanced.quickimport=false;
var inventory=[];
var inv=[];
var language="";
var songsettingpresets=new Object();
	//[0]=# of notes, [1]=hold%, [2]=perf%, [3]=time, [4]=star. Star perf will be floor(star*perf%).
	songsettingpresets.glaceon=[500,8,95,120,65];
	songsettingpresets.glaceon2=[300,10,95,100,50];
var charactertype=new Object;
	charactertype.honoka=["muse",2,"printemps"];
	charactertype.umi=["muse",2,"lilywhite"];
	charactertype.kotori=["muse",2,"printemps"];
	charactertype.hanayo=["muse",1,"printemps"];
	charactertype.maki=["muse",1,"bibi"];
	charactertype.rin=["muse",1,"lilywhite"];
	charactertype.nico=["muse",3,"bibi"];
	charactertype.eli=["muse",3,"bibi"];
	charactertype.nozomi=["muse",3,"lilywhite"];
	charactertype.chika=["aqours",2,"cyaron"];
	charactertype.riko=["aqours",2,"guiltykiss"];
	charactertype.kanan=["aqours",3,"azalea"];
	charactertype.dia=["aqours",3,"azalea"];
	charactertype.you=["aqours",2,"cyaron"];
	charactertype.yoshiko=["aqours",1,"guiltykiss"];
	charactertype.hanamaru=["aqours",1,"azalea"];
	charactertype.mari=["aqours",3,"guiltykiss"];
	charactertype.ruby=["aqours",1,"cyaron"];
	charactertype.others=["",0,""];
var kizuna = new Object();
	kizuna.n = [25, 50];
	kizuna.r = [100, 200];
	kizuna.sr = [250, 500];
	kizuna.ssr= [375,750];
	kizuna.ur = [500, 1000];
var sisslots = new Object();
//usage: sisslots.rarity[promo][idolized]
//or     sisslots[rarity][promo][idolized]
	sisslots.n=[[0,1],[0,0]];
	sisslots.r=[[1,2],[1,1]];
	sisslots.sr=[[2,4],[1,1]];
	sisslots.ssr=[[3,6],[1,1]];
	sisslots.ur=[[4,8],[2,2]];
var debug=new Object();
var results=new Object();
	results.ready=false;
	results.estatt=new Object();
	results.eststr=new Object();
	
//F**K YOU Notepad++! You have made things disappear SO MANY TIMES!!!
//This one is used by some functions since methods of arrays won't allow custom parameter...
var temp;
	
//var txtvar=new Object();
	/*txtvar.skilltext=new Object();
	txtvar.skilltext.none=["","",""];
	txtvar.skilltext.icon_score=["icons","increasing score by",""];
	txtvar.skilltext.perfect_score=["perfects","increasing score by",""];
	txtvar.skilltext.score_score=["score","increasing score by",""];
	txtvar.skilltext.time_score=["seconds","increasing score by",""];
	txtvar.skilltext.combo_score=["hit combo string","increasing score by",""];
	txtvar.skilltext.star_score=["perfect on starred notes","increasing score by",""];
	txtvar.skilltext.icon_healer=["icons","healing by",""];
	txtvar.skilltext.perfect_healer=["perfects","healing by",""];
	txtvar.skilltext.time_healer=["seconds","healing by",""];
	txtvar.skilltext.combo_healer=["hit combo string","healing by",""];
	txtvar.skilltext.icon_pl=["icons","changing all Greats and Goods into Perfects for","seconds"];
	txtvar.skilltext.time_pl=["seconds","changing all Greats and Goods into Perfects for","seconds"];
	txtvar.skilltext.combo_pl=["hit combo string","changing all Greats and Goods into Perfects for","seconds"];
	txtvar.skilltext.icon_spl=["icons","changing all Greats into Perfects for","seconds"];
	txtvar.skilltext.time_spl=["seconds","changing all Greats into Perfects for","seconds"];*/
	




//Detect if running in "file" protocol
if(location.protocol=="file:"){
	//Warn the user about it
	//alert("WARNING: You are running this file LOCALLY.\n\nSome features, such as cookies, might not work properly.");
}

//This deals with the localization
/*function setlang(lang){
	alert("L10n not ready!");
}*/

//Enables the "Show/Hide" thing on the page
function showhide(id){
		$("#"+id).toggle("slow");
}


//change available fields when change versions
function versionsettings(){
	if(document.getElementById("settings-version").value=="3"){
		if(show_all_settings==false){
		document.getElementById("locale-forcegroup").style.textDecoration="line-through";
		document.getElementById("locale-sismode").style.textDecoration="line-through";
		document.getElementById("locale-maxslots").style.textDecoration="line-through";
		document.getElementById("locale-groupdebuff").style.textDecoration="line-through";
		document.getElementById("settings-forcegroup").value="0";
		document.getElementById("settings-forcegroup").disabled=true;
		document.getElementById("settings-sismode").value="ignored";
		document.getElementById("settings-sismode").disabled=true;
		document.getElementById("settings-maxslots").value="0";
		document.getElementById("settings-maxslots").disabled=true;
		document.getElementById("settings-groupdebuff").disabled=true;
		document.getElementById("block_sisest").style.display="none";
		}
		
	}
	if(document.getElementById("settings-version").value=="4"){
		document.getElementById("locale-forcegroup").style.textDecoration="none";
		document.getElementById("locale-sismode").style.textDecoration="none";
		document.getElementById("locale-maxslots").style.textDecoration="none";
		document.getElementById("locale-groupdebuff").style.textDecoration="none";
		document.getElementById("settings-forcegroup").disabled=false;
		document.getElementById("settings-sismode").disabled=false;
		document.getElementById("settings-maxslots").disabled=false;
		document.getElementById("settings-groupdebuff").disabled=false;
		document.getElementById("block_sisest").style.display="";
		
	}
	savesettings();
	if(loaded){
		updatecardeditorsection();
		updateinv();
	}
}

//Show help when clicked on the (?) thing
//NOTE: THIS IS NOT YET LOCALIZED!
function explain(a){
	switch(a){
		case "forceatt":
		alert("将强制使队伍仅含有对应属性的成员。 \n\n如果不确定，请选择 \"No\".");
		break;
		case "forcegroup":
		alert("将强制使队伍仅含有对应组合的成员。 \n\n如果不确定，请选择 \"No\".");
		break;
		case "sismode":
		alert("决定程序如何计算学园偶像技能。仅在版本4.0或以上模式生效。\n\n阅读“帮助与关于”获取更多信息。 如果不确定，请选择 \"LLHelper\".");
		break;
		case "maxlevel":
		alert("计算将使用“最大”属性值而非“当前”。 \n\n如果不确定，请选择 \"No\".");
		break;
		case "maxkizuna":
		alert("计算将使用“最大”绊而非“当前”。\n\n 如果不确定，请选择 \"No\".");
		break;
		case "maxslots":
		alert("计算将使用“最大”技能槽数而非“当前”。 \n\n如果不确定，请选择 \"No\".");
		break;
		case "userevisedskilleff":
		alert("如果设为“Yes”，计算将使用修正技能强度。 \n\n阅读“帮助与关于”获取更多信息。 如果不确定，请选择 \"Yes\".");
		break;
		case "colordebuff":
		alert("决定当卡片与队伍不同色时扣除的强度。 \n\n阅读“帮助与关于”获取更多信息。 如果不确定，请填写 \"10\".");
		break;
		case "groupdebuff":
		alert("决定当卡片与队伍不同团时扣除的强度。 \n\n阅读“帮助与关于”获取更多信息。 如果不确定，请填写 \"10\".");
		break;
		case "sisestimation":
		alert("在“固定”SIS模式下使用的数值。注意此处使用的是“每槽”数值而非“每个技能”。阅读“帮助与关于”获取更多信息。 ");
		break;
		case "renamecard":
		alert("");
		break;
		case "ctr-undefined":
		alert("如果出现 \"undefined 成员的 __%\": \n\n这表示你选择了“其他角色”。请确保你选择正确的角色！");
		break;
		case "importcardfromtext":
		alert("允许你从Glaceon的LLHelper导入卡片。要进行导入，你必须先将一段JavaScript代码保存为书签。 \n\n阅读“帮助与关于”了解如何使用此功能。");
		break;
	}
}

//load things from the dropdown / textboxes
function savesettings(){
	version=parseInt(document.getElementById("settings-version").value);
	
	//things that will use parseInt and in settings
	var arr=["version","forceatt","forcegroup","maxlevel","maxkizuna","maxslots","userevisedskilleff"];
	//"attemptallctrskills",
	for(var i in arr){
		settings[arr[i]]=parseInt(document.getElementById("settings-"+arr[i]).value);
	}
	settings.sismode=document.getElementById("settings-sismode").value;
	
	
	settings.sisestimation.sr.mode=parseInt(document.getElementById("settings-sism-sr").value);
	settings.sisestimation.sr.value=parseInt(document.getElementById("settings-sis-sr").value);
	if(settings.sisestimation.sr.mode==1){
		settings.sisestimation.sr.value/=100;
		settings.sisestimation.sr.value=Number((settings.sisestimation.sr.value).toPrecision(10));
	}
	settings.sisestimation.ssr.mode=parseInt(document.getElementById("settings-sism-ssr").value);
	settings.sisestimation.ssr.value=parseInt(document.getElementById("settings-sis-ssr").value);
	if(settings.sisestimation.ssr.mode==1){
		settings.sisestimation.ssr.value/=100;
		settings.sisestimation.ssr.value=Number((settings.sisestimation.ssr.value).toPrecision(10));
	}
	settings.sisestimation.ur.mode=parseInt(document.getElementById("settings-sism-ur").value);
	settings.sisestimation.ur.value=parseInt(document.getElementById("settings-sis-ur").value);
	if(settings.sisestimation.ur.mode==1){
		settings.sisestimation.ur.value/=100;
		settings.sisestimation.ur.value=Number((settings.sisestimation.ur.value).toPrecision(10));
	}
	
	settings.colordebuff=Number((parseFloat(document.getElementById("settings-colordebuff").value)/100).toPrecision(10));
	settings.groupdebuff=Number((parseFloat(document.getElementById("settings-groupdebuff").value)/100).toPrecision(10));
	//settings.ignorewarnings=document.getElementById("settings-ignorewarnings").value.trim();
	songsettings.notes=parseInt(document.getElementById("songsettings-numofnotes").value);
	songsettings.hold=Number((parseFloat(document.getElementById("songsettings-hold%").value)/100).toPrecision(10));
	songsettings.perfect=Number((parseFloat(document.getElementById("songsettings-perfect%").value)/100).toPrecision(10));
	songsettings.star=parseInt(document.getElementById("songsettings-stars").value);
	songsettings.time=parseInt(document.getElementById("songsettings-time").value);
}

//When editing song settings manually, clear the "preset" dropdown
function clearpreset(){
	document.getElementById("songsettings-preset").value="";
}

//When selecting a songsettings preset, load the values.
function loadsongsettingpresets(){
	var p=document.getElementById("songsettings-preset").value;
	document.getElementById("songsettings-numofnotes").value=songsettingpresets[p][0];
	document.getElementById("songsettings-hold%").value=songsettingpresets[p][1];
	document.getElementById("songsettings-perfect%").value=songsettingpresets[p][2];
	document.getElementById("songsettings-time").value=songsettingpresets[p][3];
	document.getElementById("songsettings-stars").value=songsettingpresets[p][4];
	
	savesettings();
}


function updatecardeditorsection(){

	var character=document.getElementById("cardeditor-character").value;
	var group=charactertype[character][0];
	var year=charactertype[character][1];
	switch(year){
		case 1:
		year="one";
		break;
		case 2:
		year="two";
		break;
		case 3:
		year="three";
		break;
	}
	var subunit=charactertype[character][2];
	
	//show char type
	if(character!="others"){
		document.getElementById("cardeditor-chartype").innerHTML="("+txtvar.chartypetext[group]+" / "+txtvar.chartypetext[year]+" / "+txtvar.chartypetext[subunit]+")";
	}else{
		document.getElementById("cardeditor-chartype").innerHTML="";
	}
	
	var rarity=document.getElementById("cardeditor-rarity").value;
	var idolized=parseInt(document.getElementById("cardeditor-idolized").value);
	var maxkizuna=kizuna[rarity][idolized];
	//Next line: print max kizuna
	document.getElementById("cardeditor-maxkizuna").innerHTML=maxkizuna;
	var ispromo=parseInt(document.getElementById("cardeditor-ispromo").value);
	var maxslots=sisslots[rarity][ispromo][idolized];
	//Next line: print max slots
	document.getElementById("cardeditor-maxslots").innerHTML=maxslots;
	var att=document.getElementById("cardeditor-mainatt").value;
	var skill=document.getElementById("cardeditor-skill").value;
	//Next 3 lines: print skill description texts
	document.getElementById("cardeditor-skilltriggertext").innerHTML=txtvar.skilltext[skill][0];
	document.getElementById("cardeditor-skilltypetext1").innerHTML=txtvar.skilltext[skill][1];
	document.getElementById("cardeditor-skilltypetext2").innerHTML=txtvar.skilltext[skill][2];
	//Next "if" block: If "no skill", hide skill detail and show "None", and vice versa
	if (skill!="none"){
		$("#cardeditor-noskill").hide();
		$("#cardeditor-skillinfo").show();
	}else{
		$("#cardeditor-skillinfo").hide();
		$("#cardeditor-noskill").show();
	}
	//Center skill is a pain!
	//Show or hide the "None" based on if the rarity is N...
	if (rarity!="n"){
		$("#cardeditor-noctrskill").hide();
		$("#cardeditor-ctrskilldetail").show();
	}else{
		$("#cardeditor-ctrskilldetail").hide();
		$("#cardeditor-noctrskill").show();
	}
	
	if(rarity=="r"||(rarity!="n"&&ispromo==1)){
		//if rarity is R OR is R-and-above promo:
		//ctr skill is Power (3%)
		document.getElementById("cardeditor-ctrskillatt").innerHTML=txtvar.ctrskill[att];
		document.getElementById("cardeditor-ctrskilleff").innerHTML=txtvar.ctrskill.power+" (3%)";
		$("#cardeditor-ctrskillur").hide();
		$("#cardeditor-ctrskillextra").hide();
		document.getElementById("cardeditor-ctrskillplus").innerHTML="";
	}else if(rarity=="sr"){
		//if rarity is SR:
		//ctr skill is Heart (6%)
		document.getElementById("cardeditor-ctrskillatt").innerHTML=txtvar.ctrskill[att];
		document.getElementById("cardeditor-ctrskilleff").innerHTML=txtvar.ctrskill.heart+" (6%)";
		$("#cardeditor-ctrskillur").hide();
		$("#cardeditor-ctrskillextra").hide();
		document.getElementById("cardeditor-ctrskillplus").innerHTML="";
	}else if(rarity=="ssr"){
		//if rarity is SSR:
		// ctr skill is Star (7%)...
		document.getElementById("cardeditor-ctrskillatt").innerHTML=txtvar.ctrskill[att];
		document.getElementById("cardeditor-ctrskilleff").innerHTML=txtvar.ctrskill.star+" (7%)";
		//plus... (4.0+ only)
		if(version==4){
			$("#cardeditor-ctrskillextra").show();
			document.getElementById("cardeditor-ctrskillplus").innerHTML=txtvar.ctrskill.plus;
			document.getElementById("cardeditor-ctrskillgroup").innerHTML=txtvar.chartypetext[group]+" 成员的1%";
			document.getElementById("cardeditor-ctrskillyear").innerHTML=txtvar.chartypetext[year]+" 成员的2%";
			document.getElementById("cardeditor-ctrskillsubunit").innerHTML=txtvar.chartypetext[subunit]+" 成员的2%";
		}else{
			//else? HIDE!!
			$("#cardeditor-ctrskillextra").hide();
			document.getElementById("cardeditor-ctrskillplus").innerHTML="";
		}
		//hide unwanted...
		$("#cardeditor-ctrskillur").hide();
	}else if(rarity=="ur"){
		//if rarity is UR...
		//ctr skill is ... ... ...
		document.getElementById("cardeditor-ctrskillatt").innerHTML=txtvar.ctrskill[att];
		$("#cardeditor-ctrskillur").show();
		// first fill w/ 12% data...
		document.getElementById("cardeditor-ctrskillprincess").innerHTML=txtvar.ctrskill.princess+" (12% of "+txtvar.ctrskill.smile+")";
		document.getElementById("cardeditor-ctrskillangel").innerHTML=txtvar.ctrskill.angel+" (12% of "+txtvar.ctrskill.pure+")";
		document.getElementById("cardeditor-ctrskillempress").innerHTML=txtvar.ctrskill.empress+" (12% of "+txtvar.ctrskill.cool+")";
		//then use a chain of if's to fix the mainatt to 9%...
		if(att=="smile"){
			document.getElementById("cardeditor-ctrskillprincess").innerHTML=txtvar.ctrskill.princess+" (9%)";
		}else if(att=="pure"){
			document.getElementById("cardeditor-ctrskillangel").innerHTML=txtvar.ctrskill.angel+" (9%)";
		}else if(att=="cool"){
			document.getElementById("cardeditor-ctrskillempress").innerHTML=txtvar.ctrskill.empress+" (9%)";
		}
		//and plus... ... ...
		if(version==4){
			$("#cardeditor-ctrskillextra").show();
			document.getElementById("cardeditor-ctrskillplus").innerHTML=txtvar.ctrskill.plus;
			document.getElementById("cardeditor-ctrskillgroup").innerHTML=txtvar.chartypetext[group]+" 成员的3%";
			document.getElementById("cardeditor-ctrskillyear").innerHTML=txtvar.chartypetext[year]+" 成员的6%";
			document.getElementById("cardeditor-ctrskillsubunit").innerHTML=txtvar.chartypetext[subunit]+" 成员的6%";
		}else{
			//else? HIDE!!
			$("#cardeditor-ctrskillextra").hide();
			document.getElementById("cardeditor-ctrskillplus").innerHTML="";
		}
		//hide unwanted...
		document.getElementById("cardeditor-ctrskilleff").innerHTML="";
	}
	$("#cardeditor-saveanyway").hide();
}


function savecard(ignorewarnings){
	//check empty values.........
	if(!checkempty("cardeditor"))return;
	
	//if ignorewarnings, ask if they confirm...
	if(ignorewarnings){
		if(!confirm("您确定无视警告并继续保存卡片？")){
			return;
		}
	}
	
	//in case max kiz and max slots are empty...
	updatecardeditorsection();
	//grab settings to variable...
	var c=new Object();
	//NOTE THAT its format is different from the LLH format!!!!!!!!!!!!!!!!!!!!!!
	c.name=document.getElementById("cardeditor-renamecard").value;
	c.character=document.getElementById("cardeditor-character").value;
	c.group=charactertype[c.character][0];
	c.year=charactertype[c.character][1];
	switch(c.year){
		case 1:
		c.year="one";
		break;
		case 2:
		c.year="two";
		break;
		case 3:
		c.year="three";
		break;
	}
	c.subunit=charactertype[c.character][2];
	c.rarity=document.getElementById("cardeditor-rarity").value;
	c.idolized=parseInt(document.getElementById("cardeditor-idolized").value);
	c.ispromo=parseInt(document.getElementById("cardeditor-ispromo").value);
	c.mainatt=document.getElementById("cardeditor-mainatt").value;
	
	
	c.smile=parseInt(document.getElementById("cardeditor-currsmile").value);
	c.pure=parseInt(document.getElementById("cardeditor-currpure").value);
	c.cool=parseInt(document.getElementById("cardeditor-currcool").value);
	c.kizuna=parseInt(document.getElementById("cardeditor-currkizuna").value);
	c.slots=parseInt(document.getElementById("cardeditor-currslots").value);
	c.maxsmile=parseInt(document.getElementById("cardeditor-maxsmile").value);
	c.maxpure=parseInt(document.getElementById("cardeditor-maxpure").value);
	c.maxcool=parseInt(document.getElementById("cardeditor-maxcool").value);
	c.maxkizuna=parseInt(document.getElementById("cardeditor-maxkizuna").innerHTML);
	c.maxslots=parseInt(document.getElementById("cardeditor-maxslots").innerHTML);

	//if some fields are left empty, take the other field.
	if(!c.smile){
		c.smile=c.maxsmile;
	}
	if(!c.pure){
		c.pure=c.maxpure;
	}
	if(!c.cool){
		c.cool=c.maxcool;
	}
	if(!c.maxsmile){
		c.maxsmile=c.smile;
	}
	if(!c.maxpure){
		c.maxpure=c.pure;
	}
	if(!c.maxcool){
		c.maxcool=c.cool;
	}
			
	
	c.skilltypestring=document.getElementById("cardeditor-skill").value;
	if(c.skilltype!="none"){
		c.skilltype=c.skilltypestring.split("_");
	}else{
		c.skilltype=["none","none"];
	}
	c.skilltrigger=parseInt(document.getElementById("cardeditor-skilltrigger").value);
	c.skillchance=Number((parseInt(document.getElementById("cardeditor-skillchance").value)/100).toPrecision(10));
	c.skilleffect=parseFloat(document.getElementById("cardeditor-skilleffect").value);
	
	//temp vars here
	var ctrur=document.getElementById("cardeditor-ctrskillur").value;
	var ctrextra=document.getElementById("cardeditor-ctrskillextra").value;
	//ctr: % of main ctr skill
	//ctrfrom: from which att
	//ctrextra: % of new ctr skill
	//ctrextrafrom: from exactly which members
	//ctrextrafromtype: from group, year, or subunit
	c.ctr=0;
	c.ctrfrom="";
	c.ctrextra=0;
	c.ctrextrafrom="";
	c.ctrextrafromtype="";
	if(c.rarity=="n"){
		c.ctr=0;
	}else if(c.rarity=="r"||c.ispromo==1){
		c.ctr=0.03;
		c.ctrfrom=c.mainatt;
	}else if(c.rarity=="sr"){
		c.ctr=0.06;
		c.ctrfrom=c.mainatt;
	}else if(c.rarity=="ssr"){
		c.ctr=0.07;
		c.ctrfrom=c.mainatt;
		if(ctrextra=="group"){
			c.ctrextra=0.01;
			c.ctrextrafrom=c.group;
			c.ctrextrafromtype="group";
		}else if(ctrextra=="year"){
			c.ctrextra=0.02;
			c.ctrextrafrom=c.year;
			c.ctrextrafromtype="year";
		}else if(ctrextra=="subunit"){
			c.ctrextra=0.02;
			c.ctrextrafrom=c.subunit;
			c.ctrextrafromtype="subunit";
		}
	}else if(c.rarity=="ur"){
		if(c.mainatt==ctrur){
			c.ctr=0.09;
		}else{
			c.ctr=0.12;
		}
		c.ctrfrom=ctrur;
		if(ctrextra=="group"){
			c.ctrextra=0.03;
			c.ctrextrafrom=c.group;
			c.ctrextrafromtype="group";
		}else if(ctrextra=="year"){
			c.ctrextra=0.06;
			c.ctrextrafrom=c.year;
			c.ctrextrafromtype="year";
		}else if(ctrextra=="subunit"){
			c.ctrextra=0.06;
			c.ctrextrafrom=c.subunit;
			c.ctrextrafromtype="subunit";
		}
	}
	
	//check if things are valid...
	var errorfound=false;
	var numberoferrors=0;
	var errortext="";
	//1. Ns can't be promo
	if(c.rarity=="n"&&c.ispromo==1){
		errorfound=true;
		numberoferrors++;
		errortext+="*N卡不能是特典卡。\n";
	}
	//2. Other (ie. not muse nor aqours) cards can't be SR or above
	//note: R cards that are Others are A-RISE cards.
	if(c.character=="others"&&c.rarity!="n"&&c.rarity!="r"){
		errorfound=true;
		numberoferrors++;
		errortext+="*“其他角色”不能是SR或更高的稀有度。 \n";
	}
	//2.2. Non-other caracters can't be N
	if(c.character!="others"&&c.rarity=="n"){
		errorfound=true;
		numberoferrors++;
		errortext+="*μ's 和 Aqours 成员不能是N卡。 \n";
	}
	//3. Promo cards can't be not idolized
	if(c.ispromo==1&&c.idolized==0){
		errorfound=true;
		numberoferrors++;
		errortext+="*特典卡必须是觉醒的。 \n";
	}
	//4. N cards can't have skills.
	if(c.rarity=="n"&&c.skilltype!="none"){
		errorfound=true;
		numberoferrors++;
		errortext+="*N卡不能有技能。 \n";
	}
	//4.2. Non-N cards must have a skill.
	if(c.rarity!="n"&&c.skilltype=="none"){
		errorfound=true;
		numberoferrors++;
		errortext+="*R或以上的卡必须有技能。 \n";
	}
	//5. values can't go beyond max.
	if( (c.smile>c.maxsmile) || (c.pure>c.maxpure) || (c.cool>c.maxcool) || (c.kizuna>c.maxkizuna) || (c.slots>c.maxslots)){
		errorfound=true;
		numberoferrors++;
		errortext+="*\"当前\" 值不能大于 \"最大\". \n";
	}
	//6. SIS slots can't be less than min, either.
	//Now this is moved to Warning section
	/*if(c.slots<sisslots[c.rarity][c.ispromo][0]){
		errorfound=true;
		numberoferrors++;
		errortext+="You can't have a card's SIS slots less than its initial number, which is ";
		errortext+=sisslots[c.rarity][c.ispromo][0];
		errortext+=" in this case. \n";
	}*/
	
	//the real #6: name shouldn't include the following:
	// | (because this is used as a separator when exporting INV to text)
	// '
	// "
	// ?
	// !
	// <
	// >
	// :
	// /
	// \
	// *
	if(c.name.indexOf("|")!=-1||c.name.indexOf("'")!=-1||c.name.indexOf("\"")!=-1||c.name.indexOf("?")!=-1||c.name.indexOf("!")!=-1||c.name.indexOf("<")!=-1||c.name.indexOf(">")!=-1||c.name.indexOf(":")!=-1||c.name.indexOf("/")!=-1||c.name.indexOf("\\")!=-1||c.name.indexOf("*")!=-1){
		errorfound=true;
		numberoferrors++;
		errortext+="*卡片名称包含可能导致程序出现问题的字符。这些字符包括： | \' \" ? ! : < > / \\ * \n";
	}
	//7. Real SR and above can't use SPL skill
	if((c.rarity=="sr"||c.rarity=="ssr"||c.rarity=="ur")&&c.ispromo==0&&c.skilltype[1]=="spl"){
		errorfound=true;
		numberoferrors++;
		errortext+="*SR或以上的非特典卡不能使用小判定技能。 \n";
	}
	//8. Promo and R can't use real PL skill
	if((c.rarity=="r"||c.ispromo==1)&&c.skilltype[1]=="pl"){
		errorfound=true;
		numberoferrors++;
		errortext+="*R或特典卡不能使用大判定技能。 \n";
	}
	if(errorfound){
		alert(numberoferrors+" 个错误已发现。请在保存前先修正这些错误： \n\n"+errortext);
		return;
	}
	
	//warnings
	//1. SPC values shouldn't be bigger than 5,500 
	if(c.smile>5500||c.pure>5500|c.cool>5500||c.maxsmile>5500||c.maxpure>5500||c.maxcool>5500){
		errorfound=true;
		numberoferrors++;
		errortext+="*属性值似乎太大了。您也许打错了。 \n";
	}
	//2. note / combo / perf trigger should be btwn 7-40, time 7-25, score 12k-18k, star ONE
	if( (c.skilltype[0]=="star"&&c.skilltrigger!=1) || ((c.skilltype[0]=="icon"||c.skilltype[0]=="perfect"||c.skilltype[0]=="combo")&&(c.skilltrigger>40||c.skilltrigger<7)) || c.skilltype[0]=="time"&&(c.skilltrigger>25||c.skilltrigger<7) || c.skilltype[0]=="score"&&(c.skilltrigger>18000||c.skilltrigger<12000)){
		errorfound=true;
		numberoferrors++;
		errortext+="*技能触发条件似乎太大或太小。您也许打错了。 \n";
	}
	//3. score effect shouldn't be >2k, healer 10, PL 16. (The super duper 16-sec PL is the card #88. Sadly it's a timed PL)
	if((c.skilltype[1]=="score"&&c.skilleffect>2000)||(c.skilltype[1]=="healer"&&c.skilleffect>10)||((c.skilltype[1]=="pl"||c.skilltype[1]=="spl")&&c.skilleffect>16) ){
		errorfound=true;
		numberoferrors++;
		errortext+="*技能效果似乎太大了。您也许打错了。 \n";
	}
	//4. SIS slots less than min
	if(c.slots<sisslots[c.rarity][c.ispromo][0]&&version==4){
		errorfound=true;
		numberoferrors++;
		errortext+="*学园偶像技能槽数小于初始值（对于这张卡是 ";
		errortext+=sisslots[c.rarity][c.ispromo][0];
		errortext+=" ）。如果您技能不足，您可以将其设置的低一些来降低使用量，不过因为只要玩得足够多，技能会足够的，所以我不建议您这样做。 \n";
	}
	if(errorfound&&!ignorewarnings){
		alert(numberoferrors+" 个警告已发现。您仍然可以用“仍然保存”按钮保存卡片，不过我建议您检查以下几点： \n\n"+errortext);
		$("#cardeditor-saveanyway").show();
		return;
	}
	if(iseditingnewcard){
		c.id=inventory.length-1;
		inventory.push(c);
	}else{
		inventory[currentlyeditingcardindex]=c;
	}
	alert("Saved!");
	isediting=false;
	$("#block_cardeditor_inner").hide();
	updateinv();
}

function checkempty(section){
	if(section=="cardeditor"){
		var list=["currsmile","currpure","currcool","currkizuna","currslots","maxsmile","maxpure","maxcool","skilltrigger","skillchance","skilleffect"];
		var values=[];
		for (var i in list){
			values.push(document.getElementById("cardeditor-"+list[i]).value);
		}
		var haveskill=document.getElementById("cardeditor-skill").value;
		
		//if no skill, don't consider the last 3 items
		if(haveskill=="none"){
			values.pop();
			values.pop();
			values.pop();
		}
		//First things shouldn't be neg or not numbers...
		var err=false;
		for (var i in values){
			if(isNotNegative(values[i])==false && values[i]!=""){
				err=true;
			}
		}
		
		if (err){
			alert("您输入了一些负数或不是数字的值。请更正。");
			return false;
		}
		
		//then check if things are unexpectedly empty...
		//At least one in smile and maxsmile should be filled, same for pure and cool...
		if((values[0]==""&&values[5]=="")  ||  (values[1]==""&&values[6]=="")  ||  (values[2]==""&&values[7]=="")){
			err=true;
		}
		//kiz should be filled...
		if(values[3]==""){
			err=true;
		}
		//if version 4, SIS skill slots should be filled...
		if(version==4&&values[4]==""){
			err=true;
		}
		//if skill != none, all skill parameters should be filled...
		if(haveskill!="none"){
			if(values[8]==""||values[9]==""||values[10]==""){
				err=true;
			}
		}
		if(err){
			alert("一些不该空着的文本框现在是空白的。提交前试着填写所有文本框。");
			return false;
		}
		
		for (var i in values){
			values[i]=parseInt(values[i]);
		}
		//SPC and skill can't be zero
		if(values[0]==0||values[1]==0||values[2]==0||values[5]==0||values[6]==0||values[7]==0){
			err=true;
		}
		if(haveskill!="none"){
			if(values[8]==0||values[9]==0||values[10]==0){
				err=true;
			}
		}
		if(err){
			alert("有些值为零。属性值和技能信息不能为零。");
			return false;
		}
		
		return true;
	}
	
}

function createcard(index){
	if(isediting){
		if(!confirm("您现在正在编辑一张卡片。要覆盖吗？")){
			return;
		}
	}
	if(index==-1){
		//create a new card
		document.getElementById("cardeditor-renamecard").value="";
		document.getElementById("cardeditor-character").value="others";
		document.getElementById("cardeditor-rarity").value="n";
		document.getElementById("cardeditor-idolized").value="0";
		document.getElementById("cardeditor-ispromo").value="0";
		document.getElementById("cardeditor-mainatt").value="smile";
		document.getElementById("cardeditor-currsmile").value="";
		document.getElementById("cardeditor-currpure").value="";
		document.getElementById("cardeditor-currcool").value="";
		document.getElementById("cardeditor-currkizuna").value="";
		document.getElementById("cardeditor-currslots").value="";
		document.getElementById("cardeditor-maxsmile").value="";
		document.getElementById("cardeditor-maxpure").value="";
		document.getElementById("cardeditor-maxcool").value="";
		document.getElementById("cardeditor-maxkizuna").innerHTML="";
		document.getElementById("cardeditor-maxslots").innerHTML="";
		document.getElementById("cardeditor-skill").value="none";
		document.getElementById("cardeditor-skilltrigger").value="";
		document.getElementById("cardeditor-skillchance").value="";
		document.getElementById("cardeditor-skilleffect").value="";
		document.getElementById("cardeditor-ctrskillur").value="smile";
		document.getElementById("cardeditor-ctrskillextra").value="group";
		$("#block_cardeditor_inner").show();
		isediting=true;
		iseditingnewcard=true;
	}else{
		//load a card from inv
		document.getElementById("cardeditor-renamecard").value=inventory[index].name;
		document.getElementById("cardeditor-character").value=inventory[index].character;
		document.getElementById("cardeditor-rarity").value=inventory[index].rarity;
		document.getElementById("cardeditor-idolized").value=inventory[index].idolized;
		document.getElementById("cardeditor-ispromo").value=inventory[index].ispromo;
		document.getElementById("cardeditor-mainatt").value=inventory[index].mainatt;
		document.getElementById("cardeditor-currsmile").value=inventory[index].smile;
		document.getElementById("cardeditor-currpure").value=inventory[index].pure;
		document.getElementById("cardeditor-currcool").value=inventory[index].cool;
		document.getElementById("cardeditor-currkizuna").value=inventory[index].kizuna;
		document.getElementById("cardeditor-currslots").value=inventory[index].slots;
		document.getElementById("cardeditor-maxsmile").value=inventory[index].maxsmile;
		document.getElementById("cardeditor-maxpure").value=inventory[index].maxpure;
		document.getElementById("cardeditor-maxcool").value=inventory[index].maxcool;
		document.getElementById("cardeditor-skill").value=inventory[index].skilltypestring;
		
		document.getElementById("cardeditor-skilltrigger").value=inventory[index].skilltrigger;
		document.getElementById("cardeditor-skillchance").value=Number((inventory[index].skillchance*100).toPrecision(10));
		document.getElementById("cardeditor-skilleffect").value=inventory[index].skilleffect;
		document.getElementById("cardeditor-ctrskillur").value=inventory[index].ctrfrom;
		document.getElementById("cardeditor-ctrskillextra").value=inventory[index].ctrextrafromtype;
		$("#block_cardeditor_inner").show();
		isediting=true;
		iseditingnewcard=false;
		currentlyeditingcardindex=index;
	}
	updatecardeditorsection();
	$("#block_cardeditor").show("slow");
}

function updateinv(){
	var txt="";
	if(inventory.length==0){
		txt="Your inventory is empty.";
	}else{
		txt+="<table border=1>"
		for(var i in inventory){
			inventory[i].id=i;
			txt+=carddatatable(inventory[i],i,"inv");
		}
		txt+="</table>"
	}
document.getElementById("inventory").innerHTML=txt;
}

function deletecard(index){
	if(confirm("您确定要删除这张卡片吗？ \n\n本操作不能撤销！")){
		inventory.splice(index,1);
	}
	updateinv();
}

function carddatatable(c,i,mode,data){
	var txt="";
	txt+="<tr ><td colspan=6 class=\"";
	//class = mainatt
	txt+=c.mainatt;
	txt+="\">";
	//id...
	txt+=i+". ";
	//... rarity...
	txt+=txtvar.rarity[c.rarity];
	txt+=" ";
	//... and char name
	txt+=txtvar.character[c.character];
	txt+="</td><td rowspan=2>";
	//loc
	txt+="Type";
	txt+="</td><td colspan=2 rowspan=2>";
	//type
	if(c.character=="others"){
		txt+="--- / --- / ---";
	}else{
		txt+=txtvar.chartypetext[c.group]+" / "+txtvar.chartypetext[c.year]+" / "+txtvar.chartypetext[c.subunit];
	}
	txt+="</td></tr><tr><td colspan=6 >";
	//alt name
	txt+=c.name+"&nbsp;";
	txt+="</td></tr><tr ><td ></td><td class=\"smile\">";
	//loc
	txt+="Smile";
	txt+="</td><td class=\"pure\">";
	//loc
	txt+="Pure";
	txt+="</td><td class=\"cool\">";
	//loc
	txt+="Cool";
	txt+="</td><td>";
	//loc
	txt+="绊";
	txt+="</td><td>";
	//loc
	txt+="技能槽";
	txt+="</td><td>";
	//loc
	txt+="技能";
	txt+="</td><td>";
	//loc
	txt+="主唱技能"
	txt+="</td><td>";
	//loc
	if(mode=="inv"){
		txt+="操作";
	}else{
		txt+="详情";
	}
	txt+="</td></tr><tr ><td >";
	//loc
	txt+="当前";
	txt+="</td><td class=\"smile\">";
	//current smile
	txt+=c.smile;
	txt+="</td><td class=\"pure\">";
	//current pure
	txt+=c.pure;
	txt+="</td><td class=\"cool\">";
	//current cool
	txt+=c.cool;
	txt+="</td><td>";
	//current kiz
	txt+=c.kizuna;
	txt+="</td><td>";
	//current slots
	txt+=c.slots;
	txt+="</td><td rowspan=2>";
	//SKILL DESC
	if(c.skilltypestring=="none"){
		txt+="无";
	}else{
		txt+="每 "+c.skilltrigger+" "+txtvar.skilltext[c.skilltypestring][0]+"，有"+Number((c.skillchance*100).toPrecision(10))+"%概率<br />"+txtvar.skilltext[c.skilltypestring][1]+" "+c.skilleffect+" "+txtvar.skilltext[c.skilltypestring][2];
	}
	txt+="</td><td rowspan=2>";
	//CTR SKILL DESC
	//if no ctr skill...
	if(c.ctr==0){
		txt+="无";
	}else{
		//standard ctr skills...
		if(c.ctr==0.03){
			//power...
			txt+=txtvar.ctrskill[c.mainatt]+" "+txtvar.ctrskill.power+" (3%)";
		}else if(c.ctr==0.06){
			//heart...
			txt+=txtvar.ctrskill[c.mainatt]+" "+txtvar.ctrskill.heart+" (6%)";
		}else if(c.ctr==0.07){
			//star...
			txt+=txtvar.ctrskill[c.mainatt]+" "+txtvar.ctrskill.star+" (7%)";
		}else if(c.ctr==0.09||c.ctr==0.12){
			//things get complicated...
			txt+=txtvar.ctrskill[c.mainatt]+" ";
			if(c.ctrfrom=="smile"){
				txt+=txtvar.ctrskill.princess;
			}else if(c.ctrfrom=="pure"){
				txt+=txtvar.ctrskill.angel;
			}else if(c.ctrfrom=="cool"){
				txt+=txtvar.ctrskill.empress;
			}
			if(c.mainatt==c.ctrfrom){
				txt+=" (9%)";
			}else{
				txt+=" (12% "+txtvar.ctrskill.increaseof+" "+txtvar.ctrskill[c.ctrfrom]+")";
			}
		}
		
		if(c.ctrextra!=0&&version==4){
			txt+=txtvar.ctrskill.plus+" "+Number((c.ctrextra*100).toPrecision(10))+"% "+txtvar.ctrskill.increaseof+" "+txtvar.chartypetext[c.ctrextrafrom];
		}
	}
	txt+="</td><td rowspan=2 >";
	//actions...
	if(mode=="inv"){
		txt+="<a href=\"javascript:\" onclick=\"createcard("+i+")\">编辑</a> <br /> <a href=\"javascript:\" onclick=\"deletecard("+i+")\">删除</a> <br /> <a href=\"javascript:\" onclick=\"duplicate("+i+")\">复制</a>";
	}else if(mode=="str"){
		txt+="强度: "+data.str+"<br /><a href=\"javascript:\" onclick=\"alert(\'"+data.txt+"\')\">强度详情</a>";
	}else if(mode=="healer"){
		txt+="回血量: "+data.str;
	}else if(mode=="pl"){
		txt+="判定覆盖率: "+(data.str*100).toPrecision(4)+"%";
	}
	
	txt+="</td></tr><tr ><td >";
	//loc
	txt+="最大";
	txt+="</td><td class=\"smile\">";
	//max smile
	txt+=c.maxsmile;
	txt+="</td><td class=\"pure\">";
	//max pure
	txt+=c.maxpure;
	txt+="</td><td class=\"cool\">";
	//max cool
	txt+=c.maxcool;
	txt+="</td><td>";
	//max kiz
	txt+=c.maxkizuna;
	txt+="</td><td>";
	//max slots
	txt+=c.maxslots;
	txt+="</td></tr>";
	return txt;
}

//Check if cards are enough for the force att or force group settings.
function ifhaveenoughcards(){
	var a=new Object();
		a.smile=new Object();
			a.smile.muse=0;
			a.smile.aqours=0;
			a.smile.others=0;
		a.pure=new Object();
			a.pure.muse=0;
			a.pure.aqours=0;
			a.pure.others=0;
		a.cool=new Object();
			a.cool.muse=0;
			a.cool.aqours=0;
			a.cool.others=0;
	var att="";
	var group="";
	for (var i in inv){
		if(settings.forceatt==1){
			att=inv[i].mainatt;
		}else{
			att="smile";
		}
		if(settings.forcegroup==1){
			group=inv[i].group;
		}else{
			group="muse";
		}
		a[att][group]++;
	}
	if(settings.forceatt==0){
		a.pure.muse=-1;
		a.pure.aqours=-1;
		a.cool.muse=-1;
		a.cool.aqours=-1;
	}
	if(settings.forcegroup==0){
		a.smile.aqours=-1;
		a.pure.aqours=-1;
		a.cool.aqours=-1;
	}
	if( (a.smile.muse<=9&&a.smile.muse!=-1) || (a.pure.muse<=9&&a.pure.muse!=-1) || (a.cool.muse<=9&&a.cool.muse!=-1) || (a.smile.aqours<=9&&a.smile.aqours!=-1) || (a.pure.aqours<=9&&a.pure.aqours!=-1) || (a.cool.aqours<=9&&a.cool.aqours!=-1) ){
		alert("您启用了“强制同色”和/或“强制同团”，但是你的卡片不足以为每个属性/组合组成一队。请添加一些卡片，或者关闭上述设置。");
		return false;
	}

	a.smile.muse=0;
	a.smile.aqours=0;
	a.smile.others=0;
	a.pure.muse=0;
	a.pure.aqours=0;
	a.pure.others=0;
	a.cool.muse=0;
	a.cool.aqours=0;
	a.cool.others=0;
	for (var i in inv){
		if(true){
			att=inv[i].mainatt;
		}else{
			att="smile";
		}
		if(true){
			group=inv[i].group;
		}else{
			group="muse";
		}
		a[att][group]++;
	}
	//Shouldn't miss attribute even when force att is off!
	if((a.smile.muse+a.smile.aqours<1)||(a.pure.muse+a.pure.aqours<1)||(a.cool.muse+a.cool.aqours<1)){
		alert("您的背包缺少一种属性的卡片。您的背包里每个属性（smile/pure/cool）至少应该有1张R或以上的卡片（A-RISE除外）。");
		return false;
	}

	return true;
}

//a group of functions to get values from card data
var getvalue=new Object();
	getvalue.attandkiz=function(c){
		//"temp" required: An array of current att and group!
		var att=0;
		var kizuna=0;
		if(settings.maxlevel==0){
			att=c[temp[0][0]];
		}else{
			att=c["max"+temp[0][0]];
		}
		if(c.mainatt==temp[0][0]){
			if(settings.maxkizuna==0){
				kizuna=c.kizuna;
			}else{
				kizuna=c.maxkizuna;
			}
		}
		return att+kizuna;
	}
	getvalue.ctrskill=function(c){
		if(version==3){
			return [c.ctr,c.ctrfrom,0,""];
		}else{
			return [c.ctr,c.ctrfrom,c.ctrextra,c.ctrextrafrom];
		}
	}
	getvalue.isscorescore=function(c){
		if(c.skilltypestring="score_score"){
			return true;
		}
		return false;
	}
	//Gets highest ctr skill for estimations
	getvalue.highestctr=function(){
		var maxctr=new Object();
			maxctr.smile=new Object();
			maxctr.smile.muse=0;
			maxctr.smile.aqours=0;
			maxctr.pure=new Object();
			maxctr.pure.muse=0;
			maxctr.pure.aqours=0;
			maxctr.cool=new Object();
			maxctr.cool.muse=0;
			maxctr.cool.aqours=0;
		var att="";
		var group="";
		for(var i in inv){
			att=inv[i].mainatt;
			if(settings.forcegroup==1){
				group=inv[i].group;
			}else{
				group="muse";
			}
			if(inv[i].ctr>maxctr[att][group]){
				maxctr[att][group]=inv[i].ctr;
			}
		}
		for(var i in maxctr){
			for(var j in maxctr[i]){
				if(maxctr[i][j]==0.12)maxctr[i][j]=0.09;
			}
		}
		if(version==4){
			for(var i in maxctr){
				for(var j in maxctr[i]){
					if(maxctr[i][j]==0.07)maxctr[i][j]=0.08;
					if(maxctr[i][j]==0.09)maxctr[i][j]=0.12;
				}
			}
		}
		return [maxctr.smile.muse,maxctr.pure.muse,maxctr.cool.muse,maxctr.smile.aqours,maxctr.pure.aqours,maxctr.cool.aqours];
	}
	getvalue.eststr=function(c){
		//"temp" required: an array, [0] is an array of current att and group, [1] is a number of ctr power.
		var att=0;
		var kizuna=0;
		var slots=0;
		if(settings.maxlevel==0){
			att=c[temp[0][0]];
		}else{
			att=c["max"+temp[0][0]];
		}
		if(c.mainatt==temp[0][0]){
			if(settings.maxkizuna==0){
				kizuna=c.kizuna;
			}else{
				kizuna=c.maxkizuna;
			}
		}
		if(version==3){
			att*=(1+temp[1]);
		}else{
			if(settings.sismode!="ignored"){
				//If it doesn't ignore SIS, this estimation will use a fixed 5.2% per slot! (exceptions will still be exceptions)
				if(settings.maxslots==0){
					slots=c.slots;
				}else{
					slots=c.maxslots;
				}
				if(slots==1){
					att+=200;
				}else if(slots==2){
					att+=Math.max(450,(att+kizuna)*0.1);
				}else{
					att+=(att+kizuna)*(slots*0.052);
				}
			}
			att*=(1+temp[1]);
			kizuna*=(1+temp[1]);
		}
		if(c.mainatt!=temp[0][0]){
			att/=(1+settings.colordebuff);
			kizuna=0;
		}
		
		return att+kizuna;
		
		
	}
	getvalue.ismemberof=function(c,group){
		if(c.group==group||c.year==group||c.subunit==group){
			return true;
		}
		return false;
	}
	getvalue.str=function(card){
		/*
		temp required: an array.
		[0]:
			[0][0] is a string of current attribute,
			[0][1] is a string of current group. When not considering group, use "any".
		[1]: an array of 4 elements, the ctr skill array generated by getvalue.ctrskill.
		[2]:
			[2][0]:the est. att pts of a team, for SIskill estimation,
			[2][1]:the est. str of a team, for score-score estimation.
		*/
		var c=card;
		//If max out settings are on, set current = max.
		if(settings.maxlevel==1){
			c.smile=c.maxsmile;
			c.pure=c.maxpure;
			c.cool=c.maxcool;
		}
		if(settings.maxkizuna==1){
			c.kizuna=c.maxkizuna;
		}
		if(settings.maxslots==1){
			c.slots=c.maxslots;
		}
		
		var att=c[temp[0][0]];
		var kizuna=0;
		if(temp[0][0]==c.mainatt){
			kizuna=c.kizuna;
		}
		var siskill=0;
		var skill=0;
		
		var t=0;
		var a=0;
		//for the 4 slot SIskill when using LLH mode...
		
		if(version==3){
			//str= att*ctr + kiz + skill
			//att += ctr bonus...
			att+=c[temp[1][1]]*temp[1][0];
			//skill...
			skill=skillstr(c,temp[2][1],settings.userevisedskilleff,version,"str");
			//if wrong att...
			if(c.mainatt!=temp[0][0]){
				att/=(1+settings.colordebuff);
				kizuna/=(1+settings.colordebuff);
			}
			if(temp[0][0]!=c.mainatt){
				att/=(1+settings.colordebuff);
				kizuna/=(1+settings.colordebuff);
			}
			return att+kizuna+skill;
		}else{
			//str = ((att+kiz) + SIskill ) *ctr +skill
			//For easier calculation, att = att+kiz...
			att+=kizuna;
			//SIskill...
			if(settings.sismode!="ignore"&&c.slots!=0){
				if(c.slots==1){
					siskill=200;
				}else if(c.slots==2){
					siskill=Math.max(450,0.1*att);
				}else{
					if(settings.sismode=="fixed"){
						if(settings.sisestimation[c.rarity].mode==0){
							//0 is value and 1 is %...
							siskill=settings.sisestimation[c.rarity].value*c.slots;
						}else{
							siskill=settings.sisestimation[c.rarity].value*c.slots*att;
						}
					}else if(settings.sismode="llhelper"){
						if(c.slots>=4){
							t=skillstr(c, temp[2][1], settings.userevisedskilleff,version,"siskill");
							if(c.mainatt==temp[1][1]){
								a=temp[1][0];
							}
							if(getvalue.ismemberof(c,temp[1][3])){
								a+=temp[1][2];
							}
							siskill=Math.max(t/(1+a),att*0.208);
							siskill+=att*0.052*(c.slots-4);
						}else{
							siskill=att*0.052*c.slots;
						}
					}else if(settings.sismode=="optimized"){
						//Whoops, but it's not ready yet!
						alert("亲爱的开发者： \n\n优化模式现在不支持，但是您暂时也不能帮助我开发。请您联系我以获取更多信息。");
					}
				}
			}
			att*=(1+a);
			if(c.mainatt!=temp[1][1]){
				att+=temp[1][0]*c[temp[1][1]];
			}
			siskill*=(1+a);
			skill=skillstr(c,temp[2][1],settings.userevisedskilleff,version,"str");
			if(temp[0][0]!=c.mainatt){
				att/=(1+settings.colordebuff);
				siskill/=(1+settings.colordebuff);
			}
			if(temp[0][1]!="any"&&!getvalue.ismemberof(c,temp[0][1])){
				att/=(1+settings.groupdebuff);
				siskill/=(1+settings.groupdebuff);
			}
			
			return att+siskill+skill;
		}
	}
	getvalue.str2=function(card){
		/*
		temp required: an array.
		[0]:
			[0][0] is a string of current attribute,
			[0][1] is a string of current group. When not considering group, use "any".
		[1]: an array of 4 elements, the ctr skill array generated by getvalue.ctrskill.
		[2]:
			[2][0]:the est. att pts of a team, for SIskill estimation,
			[2][1]:the est. str of a team, for score-score estimation.
		*/
		var c=card;
		//If max out settings are on, set current = max.
		if(settings.maxlevel==1){
			c.smile=c.maxsmile;
			c.pure=c.maxpure;
			c.cool=c.maxcool;
		}
		if(settings.maxkizuna==1){
			c.kizuna=c.maxkizuna;
		}
		if(settings.maxslots==1){
			c.slots=c.maxslots;
		}
		
		var att=c[temp[0][0]];
		var attctr=0
		var kizuna=0;
		if(temp[0][0]==c.mainatt){
			kizuna=c.kizuna;
		}
		var kizctr=0
		var siskill=0;
		var siskillbooster=0;
		var useskillbooster=false;
		var sisctr=0
		var skill=0;
		
		var colordebuff=0;
		var groupdebuff=0;
		var colordebuff2=0;
		var groupdebuff2=0;
		
		var t=0;
		var a=0;
		
		var str=0;
		var r=new Object();
			r.txt="";
		//for the 4 slot SIskill when using LLH mode...
		
		if(version==3){
			//str= att*ctr + kiz + skill
			//att += ctr bonus...
			attctr=c[temp[1][1]]*temp[1][0];
			//skill...
			skill=skillstr(c,temp[2][1],settings.userevisedskilleff,version,"str");
			//if wrong att...
			if(c.mainatt!=temp[0][0]){
				colordebuff+=(att+attctr)-(att+attctr)/(1+settings.colordebuff);
				colordebuff+=kizuna-kizuna/(1+settings.colordebuff);
			}
			r.str=Number((att+attctr+kizuna+skill-colordebuff).toPrecision(6));
			r.txt="属性值: "+Number(att.toPrecision(5))+" +"+Number(attctr.toPrecision(5))+" 主唱技能加成\\n绊: "+Number(kizuna.toPrecision(5))+"\\n技能: "+Number(skill.toPrecision(5))+"\\n非同色扣除: "+Number(colordebuff.toPrecision(5));
			r.id=c.id;
			return r;
		}else{
			//str = ((att+kiz) + SIskill ) *ctr +skill
			if(c.mainatt==temp[1][1]){
				a=temp[1][0];
			}
			if(getvalue.ismemberof(c,temp[1][3])){
				a+=temp[1][2];
			}
			//SIskill...
			if(settings.sismode!="ignore"&&c.slots!=0){
				if(c.slots==1){
					siskill=200;
				}else if(c.slots==2){
					siskill=Math.max(450,0.1*(att+kizuna));
				}else{
					if(settings.sismode=="fixed"){
						if(settings.sisestimation[c.rarity].mode==0){
							//0 is value and 1 is %...
							siskill=settings.sisestimation[c.rarity].value*c.slots;
						}else{
							siskill=settings.sisestimation[c.rarity].value*c.slots*(att+kizuna);
						}
					}else if(settings.sismode="llhelper"){
						if(c.slots>=4){
							t=skillstr(c, temp[2][1], settings.userevisedskilleff,version,"siskill");
							if(t/(1+a)>(att+kizuna)*0.208){
								useskillbooster=true;
								siskillbooster=t;
								siskill=(att+kizuna)*0.052*(c.slots-4);
							}else{
								siskill=(att+kizuna)*0.052*c.slots;
							}
						}else{
							siskill=(att+kizuna)*0.052*c.slots;
						}
					}else if(settings.sismode=="optimized"){
						//Whoops, but it's not ready yet!
						alert("亲爱的开发者： \n\n优化模式现在不支持，但是您暂时也不能帮助我开发。请您联系我以获取更多信息。");
					}
				}
			}
			attctr=att*a;
			kizctr=kizuna*a
			if(c.mainatt!=temp[1][1]){
				attctr+=temp[1][0]*c[temp[1][1]];
			}
			sisctr=siskill*a;
			skill=skillstr(c,temp[2][1],settings.userevisedskilleff,version,"str");
			if(temp[0][0]!=c.mainatt){
				colordebuff=(att+kizuna+attctr+kizctr)-(att+kizuna+attctr+kizctr)/(1+settings.colordebuff);
				colordebuff2=(siskill+sisctr)-(siskill-sisctr)/(1+settings.colordebuff);
			}
			if(temp[0][1]!="any"&&!getvalue.ismemberof(c,temp[0][1])){
				groupdebuff=(att+kizuna+attctr+kizctr-colordebuff)-(att+kizuna+attctr+kizctr-colordebuff)/(1+settings.groupdebuff);
				groupdebuff2=(siskill+sisctr-colordebuff2)-(siskill-sisctr-colordebuff2)/(1+settings.groupdebuff);
			}
			
			r.str=Number((att+attctr+kizuna+kizctr+siskill+sisctr+siskillbooster+skill-colordebuff-colordebuff2-groupdebuff-groupdebuff2).toPrecision(6));
			r.id=c.id;
			r.txt="属性值: "+Number(att.toPrecision(5))+" +"+Number(attctr.toPrecision(5))+" 主唱技能加成\\n绊: "+Number(kizuna.toPrecision(5))+" +"+Number(kizctr.toPrecision(5))+" 主唱技能加成\\n学园偶像技能: "+Number((siskill+siskillbooster).toPrecision(5))+" +"+Number(sisctr.toPrecision(5))+" 主唱技能加成";
			if(useskillbooster){
				r.txt=r.txt+" (使用了加分宝石或回血宝石)";
			}
			r.txt=r.txt+"\\n技能: "+Number(skill.toPrecision(5))+"\\n非同色扣除: "+Number((colordebuff+colordebuff2).toPrecision(5))+"\\n非同团扣除: "+Number((groupdebuff+groupdebuff2).toPrecision(5));
			return r;
		}
	}
	getvalue.healing=function(c){
		var r=new Object();
		r.id=c.id;
		r.str=skillstr(c,0,settings.userevisedskilleff,version,"healer");
		r.str=Number(r.str.toPrecision(5));
		r.txt="期望回血: "+r.str;
		return r;
	}
	getvalue.pl=function(c){
		var r=new Object();
		r.id=c.id;
		r.str=skillstr(c,0,settings.userevisedskilleff,version,"pl");
		r.str=Number(r.str.toPrecision(5));
		r.txt="判定覆盖率: "+r.str;
		return r;
	}
	getvalue.spl=function(c){
		var r=new Object();
		r.id=c.id;
		r.str=skillstr(c,0,settings.userevisedskilleff,version,"spl");
		r.str=Number(r.str.toPrecision(5));
		r.txt="判定覆盖率: "+r.str;
		return r;
	}
function hasinarray(a,b){
	for (var i in a){
		if(a[i].toString()==b.toString()){
			return i;
		}
	}
	return -1;
}

function estimateattribute(att,group){
	temp=att;
	var a=inv;
	if(settings.forceatt==1){
		a=a.filter(function(c){if(c.mainatt==temp)return true;return false;});
	}
	temp=group;
	if(settings.forcegroup==1){
		a=a.filter(function(c){if(c.group==temp)return true;return false;});
	}
	var array=[];
	temp=[att,group];
	array=a.map(getvalue.attandkiz);
	array.sort(function(a,b){return b-a;});
	var total=0;
	for(var i=0;i<=8;i++){
		total+=array[i];
	}
	return total;
}
function estimatestrength(att,group,ctr){
	temp=att;
	var a=inv;
	if(settings.forceatt==1){
		a=a.filter(function(c){if(c.mainatt==temp)return true;return false;});
	}
	temp=group;
	if(settings.forcegroup==1){
		a=a.filter(function(c){if(c.group==temp)return true;return false;});
	}
	temp=[[att,group],ctr];
	var array=[];
	array=a.map(getvalue.eststr);
	array.sort(function(a,b){return b-a;});
	var total=0;
	for(var i=0;i<=8;i++){
		total+=array[i];
	}
	return total;
}
function buildteam(att,group,ctr,estatt,eststr,mustkeepcard){
	//filter the cards...
	temp=att;
	var a=inv;
	if(settings.forceatt==1){
		a=a.filter(function(c){if(c.mainatt==temp)return true;return false;});
	}
	temp=group;
	if(settings.forcegroup==1){
		a=a.filter(function(c){if(c.group==temp)return true;return false;});
	}
	
	
	
	temp=[[att,group],ctr,[estatt,eststr]];
	var b=a.map(getvalue.str2);
	//gives str of each card in a, in a's order
	
	
	//find that mustkeepcard, and kick its data away... well no, directly save to something
	var d=[];
	for (var i in b){
		if(b[i].id==mustkeepcard.id){
			d[0]=b[i];
			break;
		}
	}
	//sort...
	b.sort(function(a,b){return b.str-a.str;});
	
	//pick top nine...
	
	var total=d[0].str;
	var looptime=8;
	for(var i=0;i<looptime;i++){
		if(b[i].id==mustkeepcard.id){
			looptime++;
			continue;
		}
		total+=b[i].str;
		d.push(b[i]);
	}
	d.unshift(Number(total.toPrecision(6)));
	return d;
}

function buildspecialteam(mode){
	var a=inv;
	var b=[];
	var d=[];
	var bb=[];
	var total=0;
	if(mode=="healer"){
		b=a.filter(function(c){if(c.skilltype[1]=="healer")return true;return false;});
		d=b.map(getvalue.healing);
		d.sort(function(a,b){return b.str-a.str;});
		d=d.slice(0,9);
		for(var i in d){
			total+=d[i].str;
		}
		d.unshift(Number(total.toPrecision(5)));
		return d;
	}else{
		b=a.filter(function(c){if(c.skilltype[1]=="pl")return true;return false;});
		d=b.map(getvalue.pl);
		d.sort(function(a,b){return b.str-a.str;});
		d=d.slice(0,9);
		for(var i in d){
			total+=(1-total)*(d[i].str);
		}
		d.unshift(Number(total.toPrecision(5)));
		return d;
		
	}
}



function calculate(ignorewarnings){
	//back up inventory to inv. This is where things are to be edited, sorted, etc...
	inv=inventory;
	
	//Are there more than 9 cards?
	if(inv.length<9){
		//Sorry, we can't build it!
		alert("抱歉，您没有足够多的卡片。您至少需要9张卡片。请添加卡片，然后重试。");
		return;
	}else if(inv.length==9){
		//Exactly nine cards!?
		alert("您正好有9张卡片（正好组成一队）。请添加卡片，然后重试。");
		return;
	}
	//Are there enough cards to build required teams, according to the forceatt and forcegroup settings?
	if(!ifhaveenoughcards()){
		return;
	}
	//Step 1-1: Estimate the att pts of each attribute's team, for team+__% SIS.
	//v3: 3 data will be calculated; will be saved to muse
	//v4: 6 data will be calculated; will save to all attributes of the object
	//I suppose that, if force att/group is off, all cards will count, and if on, only cards that match the att / group will count.
	var estimatedatt=new Object();
		estimatedatt.smile=new Object();
		estimatedatt.smile.muse=estimateattribute("smile","muse");
		estimatedatt.pure=new Object();
		estimatedatt.pure.muse=estimateattribute("pure","muse");
		estimatedatt.cool=new Object();
		estimatedatt.cool.muse=estimateattribute("cool","muse");
		if(version==4){
			estimatedatt.smile.aqours=estimateattribute("smile","aqours");
			estimatedatt.pure.aqours=estimateattribute("pure","aqours");
			estimatedatt.cool.aqours=estimateattribute("cool","aqours");
		}
	//Step 1-2: Estimate each team's STR, for score-score skills.
	//same as above: v3 - 3 numbers, v4 - 6.
	var r=[];
	var estimatedstr=new Object();
		//First get highest ctr skill of each attribute...
		//it returns an array of smile, pure, cool respectively.
		//For UR: It's considered as 0.09 for simplicity.
		//For v4: SSR extra is considered as 0.01 and UR as 0.03 for simplicity.
		r=getvalue.highestctr();
		//then get the nine best cards...
		estimatedstr.smile=new Object();
		estimatedstr.smile.muse=estimatestrength("smile","muse",r[0]);
		estimatedstr.pure=new Object();
		estimatedstr.pure.muse=estimatestrength("pure","muse",r[1]);
		estimatedstr.cool=new Object();
		estimatedstr.cool.muse=estimatestrength("cool","muse",r[2]);
		if(version==4){
			estimatedstr.smile.aqours=estimatestrength("smile","aqours",r[3]);
			estimatedstr.pure.aqours=estimatestrength("pure","aqours",r[4]);
			estimatedstr.cool.aqours=estimatestrength("cool","aqours",r[5]);
		}
	
	//Step 2-1: go through all ctr skills.
	//To DEVs: a v3 ctr skill is expressed by up to 3 variables (the att of the card, the %, and from which attribute if UR), and a v4 ctr skill is expressed by up to 5 variables (the % of extra ctr skill and from which members, if SSR or UR).
	//v3: all ctr skills will be saved in muse. 
	//v4: If force group is off, it will be saved to both muse and aqours, and if is on, will be saved to the group only. The reason is that when force group is off, an aqours card might take a muse team's ctr if it's strong enough, and vice versa.
	var listofctrskills=new Object();
		listofctrskills.smile=new Object();
		listofctrskills.smile.muse=[];
		listofctrskills.smile.aqours=[];
		listofctrskills.pure=new Object();
		listofctrskills.pure.muse=[];
		listofctrskills.pure.aqours=[];
		listofctrskills.cool=new Object();
		listofctrskills.cool.muse=[];
		listofctrskills.cool.aqours=[];
	var currctr=[];
	if(version==3){
		for(var i=0;i<inv.length;i++){
			currctr=getvalue.ctrskill(inv[i]);
			if( hasinarray(listofctrskills[inv[i].mainatt].muse,currctr)==-1){
				listofctrskills[inv[i].mainatt].muse.push(currctr);
			}
		}
	}else{
		for(var i=0;i<inv.length;i++){
			currctr=getvalue.ctrskill(inv[i]);
			if(inv[i].group!=""){
				if(settings.forcegroup==1){
					if( hasinarray(listofctrskills[inv[i].mainatt][inv[i].group],currctr)==-1){
						listofctrskills[inv[i].mainatt][inv[i].group].push(currctr);
					}
				}else{
					if( hasinarray(listofctrskills[inv[i].mainatt].muse,currctr)==-1){
						listofctrskills[inv[i].mainatt].muse.push(currctr);
					}
					if( hasinarray(listofctrskills[inv[i].mainatt].aqours,currctr)==-1){
						listofctrskills[inv[i].mainatt].aqours.push(currctr);
					}
				}
			}
		}
	}
	
	//Step 2-2(prep): prep vars for 2-2...
	var bestcardforctrskill=new Object();
		bestcardforctrskill.smile=new Object;
		bestcardforctrskill.smile.muse=[];
		bestcardforctrskill.smile.aqours=[];
		bestcardforctrskill.pure=new Object;
		bestcardforctrskill.pure.muse=[];
		bestcardforctrskill.pure.aqours=[];
		bestcardforctrskill.cool=new Object;
		bestcardforctrskill.cool.muse=[];
		bestcardforctrskill.cool.aqours=[];
	
	for(var i in bestcardforctrskill){
		for(var j in bestcardforctrskill[i]){
			for(var k in listofctrskills[i][j]){
				bestcardforctrskill[i][j][k]=[0,-1];
			}
		}
	}
	
	//Step 2-2: For each ctr skill, find a card w/ the highest str. This card will be placed in the team as the ctr.
	//v3: for each card, read its ctr, then find its place in listofctrskills, in the corresponding place in bestcardforctrskill, then compare the str w/ the saved one in the "best".
	//v4, forcegroup is on: same as above, just use the card's group rather than muse.
	//v4, forcegroup is off: same, but will go both muse and aqours.

	var curr=0;//the current str of the card, on given att and group
	var index=0;//the index of the ctr skill
	var attribute="";//the att...
	var group="";
	var group2="";
	for(var i in inv){
		attribute=inv[i].mainatt;
		if(version==3){
			//v3: the finding of ctr skill uses muse, the calculation of str uses any
			group="muse";
			group2="any";
		}else{
			if(settings.forcegroup==1){
				//v4 force group: both will be the actual attribute of the card
				group=inv[i].mainatt;
				group2=inv[i].mainatt;
			}
			//v4 no force group is more complicated!
		}
		var looptimes=1;
		if(version==4&&settings.forcegroup==0){
			looptimes=2;
		}
		for(var l=0;l<looptimes;l++){
			if(version==4&&settings.forcegroup==0&&l==0){
				group="muse";
				group2="muse";
			}else if(version==4&&settings.forcegroup==0&&l==1){
				group="aqours";
				group2="aqours";
			}
			//get the ctr of the card
			currctr=getvalue.ctrskill(inv[i]);
			//find the ctr in list.att.group
			index=hasinarray(listofctrskills[attribute][group],currctr);
			
			temp=[[attribute,group2],getvalue.ctrskill(inv[i]),[estimatedatt[attribute][group2],estimatedstr[attribute][group2]]];
			
			curr=getvalue.str2(inv[i]);
			if(curr.str>bestcardforctrskill[attribute][group][index][1]){
				bestcardforctrskill[attribute][group][index]=[Number(i),curr.str];
			}
		}
	}
	
	//I suppose we should start building now.
	var team=new Object();
		team.smile=new Object;
		team.smile.muse=[0];
		team.smile.aqours=[0];
		team.pure=new Object;
		team.pure.muse=[0];
		team.pure.aqours=[0];
		team.cool=new Object;
		team.cool.muse=[0];
		team.cool.aqours=[0];
	var currteam=[];
	//Both v3 and v4: will go through ctr skills in muse
	for(var i in listofctrskills.smile.muse){
		currteam=buildteam("smile","muse",listofctrskills.smile.muse[i],estimatedatt,estimatedstr,inv[bestcardforctrskill.smile.muse[i][0]]);
		if(currteam[0]>team.smile.muse[0]){
			team.smile.muse=currteam;
		}
	}
	for(var i in listofctrskills.pure.muse){
		currteam=buildteam("pure","muse",listofctrskills.pure.muse[i],estimatedatt,estimatedstr,inv[bestcardforctrskill.pure.muse[i][0]]);
		if(currteam[0]>team.pure.muse[0]){
			team.pure.muse=currteam;
		}
	}
	for(var i in listofctrskills.cool.muse){
		currteam=buildteam("cool","muse",listofctrskills.cool.muse[i],estimatedatt,estimatedstr,inv[bestcardforctrskill.cool.muse[i][0]]);
		if(currteam[0]>team.cool.muse[0]){
			team.cool.muse=currteam;
		}
	}
	
	//v4: in addition, will go through all aqours ctr skills...
	if(version==4){
		for(var i in listofctrskills.smile.aqours){
			currteam=buildteam("smile","aqours",listofctrskills.smile.aqours[i],estimatedatt,estimatedstr,inv[bestcardforctrskill.smile.aqours[i][0]]);
			if(currteam[0]>team.smile.aqours[0]){
				team.smile.aqours=currteam;
			}
		}
		for(var i in listofctrskills.pure.aqours){
			currteam=buildteam("pure","aqours",listofctrskills.pure.aqours[i],estimatedatt,estimatedstr,inv[bestcardforctrskill.pure.aqours[i][0]]);
			if(currteam[0]>team.pure.aqours[0]){
				team.pure.aqours=currteam;
			}
		}
		for(var i in listofctrskills.cool.aqours){
			currteam=buildteam("cool","aqours",listofctrskills.cool.aqours[i],estimatedatt,estimatedstr,inv[bestcardforctrskill.cool.aqours[i][0]]);
			if(currteam[0]>team.cool.aqours[0]){
				team.cool.aqours=currteam;
			}
		}
	}
	team.healer=buildspecialteam("healer");
	team.pl=buildspecialteam("pl");
	
	
	//Ooohhh I finally made it!!!
	//Now cope w/ ... displaying the result. >_<
	//Send all these things to a global var... Don't ask me why I didn't set it global at the beginning.
	for (var i in team){
		results[i]=team[i];
	}
	results.estatt=estimatedatt;
	results.eststr=estimatedstr;
	results.ready=true;
	
	printresults();
	$("#block_results").show("slow");
	
}

function importcardfromtext(){
	var x;
	var input=document.getElementById("importedcarddata").value;
	var idolized=parseInt(document.getElementById("import-card-idolized").value);
	//var implanguage=document.getElementById("import-card-lang").value;
	x=eval("("+input+")");
	var c=new Object();
	if(x.support==1){
		alert("您不能导入辅助卡！辅助卡不能入队。");
		return;
	}
	
	//language and idolize insensitive data...
	c.mainatt=x.attribute;
	c.ctr=Number((x.Cskillpercentage/100).toPrecision(10));
	c.ctrfrom=x.Cskillattribute;
	c.skilltype=[];
	if(x.skill){
		switch(x.skilleffect){
			case 4:
			c.skilltype[1]="spl";
			break;
			case 5:
			c.skilltype[1]="pl";
			break;
			case 9:
			c.skilltype[1]="healer";
			break;
			case 11:
			c.skilltype[1]="score";
			break;
		}
		switch(x.triggertype){
			case 1:
			c.skilltype[0]="time";
			break;
			case 3:
			c.skilltype[0]="icon";
			break;
			case 4:
			c.skilltype[0]="combo";
			break;
			case 5:
			c.skilltype[0]="score";
			break;
			case 6:
			c.skilltype[0]="perfect";
			break;
			case 12:
			c.skilltype[0]="star";
			break;
		}
		c.skilltypestring=c.skilltype[0]+"_"+c.skilltype[1];
	}else{
		c.skilltypestring="none";
		c.skilltype=["none","none"];
	}
	if(x.Csecondskillattribute){
		c.ctrextra=Number((x.Csecondskillattribute/100).toPrecision(10));
	}
	if(x.Csecondskilllimit){
		if(x.Csecondskilllimit>=1&&x.Csecondskilllimit<=3){
			c.ctrextrafromtype="year";
		}else if(x.Csecondskilllimit>=4&&x.Csecondskilllimit<=5){
			c.ctrextrafromtype="group";
		}else if(x.Csecondskilllimit>=6&&x.Csecondskilllimit<=11){
			c.ctrextrafromtype="subunit";
		}
	}
	if(x.skilldetail){
		c.skilltrigger=x.skilldetail[x.currskilllevel].require;
		c.skillchance=Number((x.skilldetail[x.currskilllevel].possibility/100).toPrecision(10));
		c.skilleffect=x.skilldetail[x.currskilllevel].score;
	}
	c.idolized=idolized;
	c.ispromo=x.special;
	//goddamned names
	//It uses JPname because some cards do not have CNname.
	switch(x.jpname){
		case "高坂穂乃果":
		c.character="honoka";
		break;
		case "絢瀬絵里":
		c.character="eli";
		break;
		case "南ことり":
		c.character="kotori";
		break;
		case "園田海未":
		c.character="umi";
		break;
		case "星空凛":
		c.character="rin";
		break;
		case "西木野真姫":
		c.character="maki";
		break;
		case "東條希":
		c.character="nozomi";
		break;
		case "小泉花陽":
		c.character="hanayo";
		break;
		case "矢澤にこ":
		c.character="nico";
		break;
		case "高海千歌":
		c.character="chika";
		break;
		case "桜内梨子":
		c.character="riko";
		break;
		case "松浦果南":
		c.character="kanan";
		break;
		case "黒澤ダイヤ":
		c.character="dia";
		break;
		case "渡辺曜":
		c.character="you";
		break;
		case "津島善子":
		c.character="yoshiko";
		break;
		case "国木田花丸":
		c.character="hanamaru";
		break;
		case "小原鞠莉":
		c.character="mari";
		break;
		case "黒澤ルビィ":
		c.character="ruby";
		break;
		default:
		c.character="others"
		break;
	}
	c.rarity=x.rarity.toLowerCase();
	c.slots=x.currslots
	//language sensitive...
	if(x.language==0&&x.eponym){
		c.name=x.eponym;
	}else if(x.jpeponym){
		c.name=x.jpeponym;
	}else{
		if(x.language==0){
			c.name=x.name;
		}else{
			c.name=x.jpname;
		}
	}

	//idolize sensitive...
	if(idolized==0){
		c.maxsmile=x.smile;
		c.maxpure=x.pure;
		c.maxcool=x.cool;
	}else{
		c.maxsmile=x.smile2;
		c.maxpure=x.pure2;
		c.maxcool=x.cool2;
	}
	inventory.push(c);
	createcard(inventory.length-1);
	inventory.pop();
	document.getElementById("cardeditor-currsmile").value="";
	document.getElementById("cardeditor-currpure").value="";
	document.getElementById("cardeditor-currcool").value="";
	if(advanced.quickimport){
		document.getElementById("cardeditor-currkizuna").value=document.getElementById("cardeditor-maxkizuna").innerHTML;
	}else{
		document.getElementById("cardeditor-currkizuna").value="";
	}
	$("#block_import").hide();
}


function saveinvtotext(){
	var txt="";
	txt+=inventory.length;
	txt+="||";
	for (var i in inventory){
		txt+=inventory[i].name;
		txt+="||";
		txt+=inventory[i].character;
		txt+="||";
		txt+=inventory[i].group;
		txt+="||";
		txt+=inventory[i].year;
		txt+="||";
		txt+=inventory[i].subunit;
		txt+="||";
		txt+=inventory[i].rarity;
		txt+="||";
		txt+=inventory[i].idolized;
		txt+="||";
		txt+=inventory[i].ispromo;
		txt+="||";
		txt+=inventory[i].mainatt;
		txt+="||";
		txt+=inventory[i].smile;
		txt+="||";
		txt+=inventory[i].pure;
		txt+="||";
		txt+=inventory[i].cool;
		txt+="||";
		txt+=inventory[i].kizuna;
		txt+="||";
		txt+=inventory[i].slots;
		txt+="||";
		txt+=inventory[i].maxsmile;
		txt+="||";
		txt+=inventory[i].maxpure;
		txt+="||";
		txt+=inventory[i].maxcool;
		txt+="||";
		txt+=inventory[i].maxkizuna;
		txt+="||";
		txt+=inventory[i].maxslots;
		txt+="||";
		txt+=inventory[i].skilltype[0];
		txt+="||";
		txt+=inventory[i].skilltype[1];
		txt+="||";
		txt+=inventory[i].skilltrigger;
		txt+="||";
		txt+=inventory[i].skillchance;
		txt+="||";
		txt+=inventory[i].skilleffect;
		txt+="||";
		txt+=inventory[i].ctr;
		txt+="||";
		txt+=inventory[i].ctrfrom;
		txt+="||";
		txt+=inventory[i].ctrextra;
		txt+="||";
		txt+=inventory[i].ctrextrafrom;
		txt+="||";
		txt+=inventory[i].ctrextrafromtype;
		if(i!=inventory.length-1){
			txt+="||";
		}
	}
	document.getElementById("invexport").value=txt;
}
function importinvfromtext(){
	var txt=document.getElementById("invexport").value;
	var d=txt.split("||");
	var i=1;
	var len=parseInt(d[0]);
	var c=new Object();
	c.skilltype=["",""];
	inventory=[];
	for (var j=0;j<len;j++){
		inventory.push(new Object());
		inventory[inventory.length-1].name=d[i];
		i++;
		inventory[inventory.length-1].character=d[i];
		i++;
		inventory[inventory.length-1].group=d[i];
		i++;
		inventory[inventory.length-1].year=d[i];
		i++;
		inventory[inventory.length-1].subunit=d[i];
		i++;
		inventory[inventory.length-1].rarity=d[i];
		i++;
		inventory[inventory.length-1].idolized=parseInt(d[i]);
		i++;
		inventory[inventory.length-1].ispromo=parseInt(d[i]);
		i++;
		inventory[inventory.length-1].mainatt=d[i];
		i++;
		inventory[inventory.length-1].smile=parseInt(d[i]);
		i++;
		inventory[inventory.length-1].pure=parseInt(d[i]);
		i++;
		inventory[inventory.length-1].cool=parseInt(d[i]);
		i++;
		inventory[inventory.length-1].kizuna=parseInt(d[i]);
		i++;
		inventory[inventory.length-1].slots=parseInt(d[i]);
		i++;
		inventory[inventory.length-1].maxsmile=parseInt(d[i]);
		i++;
		inventory[inventory.length-1].maxpure=parseInt(d[i]);
		i++;
		inventory[inventory.length-1].maxcool=parseInt(d[i]);
		i++;
		inventory[inventory.length-1].maxkizuna=parseInt(d[i]);
		i++;
		inventory[inventory.length-1].maxslots=parseInt(d[i]);
		i++;
		inventory[inventory.length-1].skilltype=[];
		inventory[inventory.length-1].skilltype[0]=d[i];
		i++;
		inventory[inventory.length-1].skilltype[1]=d[i];
		i++;
		if(inventory[inventory.length-1].skilltype[0]=="none"){
			inventory[inventory.length-1].skilltypestring="none";
		}else{
			inventory[inventory.length-1].skilltypestring=inventory[inventory.length-1].skilltype[0]+"_"+inventory[inventory.length-1].skilltype[1];
		}
		inventory[inventory.length-1].skilltrigger=parseInt(d[i]);
		i++;
		inventory[inventory.length-1].skillchance=parseFloat(d[i]);
		i++;
		inventory[inventory.length-1].skilleffect=parseFloat(d[i]);
		i++;
		inventory[inventory.length-1].ctr=parseFloat(d[i]);
		i++;
		inventory[inventory.length-1].ctrfrom=d[i];
		i++;
		inventory[inventory.length-1].ctrextra=parseFloat(d[i]);
		i++;
		inventory[inventory.length-1].ctrextrafrom=d[i];
		i++;
		inventory[inventory.length-1].ctrextrafromtype=d[i];
		i++;
		

	}
	updateinv();
}

function duplicate(index){
	if(index){
		inventory.push(inventory[index]);
	}else{
		inventory.push(inventory[inventory.length-1]);
	}
	updateinv();
}

function changeresults(){
	$("#results_smile_muse").hide();
	$("#results_pure_muse").hide();
	$("#results_cool_muse").hide();
	$("#results_smile_aqours").hide();
	$("#results_pure_aqours").hide();
	$("#results_cool_aqours").hide();
	$("#results_healer").hide();
	$("#results_pl").hide();
	var a=document.getElementById("results-which").value;
	$("#results_"+a).show();
	if(!results.ready){
		document.getElementById("results_smile_muse").innerHTML="请先计算。";
		document.getElementById("results_pure_muse").innerHTML="请先计算。";
		document.getElementById("results_cool_muse").innerHTML="请先计算。";
		document.getElementById("results_smile_aqours").innerHTML="请先计算。";
		document.getElementById("results_pure_aqours").innerHTML="请先计算。";
		document.getElementById("results_cool_aqours").innerHTML="请先计算。";
		document.getElementById("results_healer").innerHTML="请先计算。";
		document.getElementById("results_pl").innerHTML="请先计算。";
	}
}

function printresults(){
	
	var txt="";
	var cardid=0;
	if(results.ready){
		//smile muse
		txt="队伍强度: "+results.smile.muse[0]+"<br />";
		txt+="<table border=1>";
		for (var i=1;i<=9;i++){
			cardid=results.smile.muse[i].id;
			txt+=carddatatable(inventory[cardid],cardid,"str",results.smile.muse[i]);
		}
		txt+="</table>";
		document.getElementById("results_smile_muse").innerHTML=txt;
		
		//pure muse
		txt="队伍强度: "+results.pure.muse[0]+"<br />";
		txt+="<table border=1>";
		for (var i=1;i<=9;i++){
			cardid=results.pure.muse[i].id;
			txt+=carddatatable(inventory[cardid],cardid,"str",results.pure.muse[i]);
		}
		txt+="</table>";
		document.getElementById("results_pure_muse").innerHTML=txt;
		//cool muse
		txt="队伍强度: "+results.cool.muse[0]+"<br />";
		txt+="<table border=1>";
		for (var i=1;i<=9;i++){
			cardid=results.cool.muse[i].id;
			txt+=carddatatable(inventory[cardid],cardid,"str",results.cool.muse[i]);
		}
		txt+="</table>";
		document.getElementById("results_cool_muse").innerHTML=txt;
		if(version==4){
			//smile aqours
			txt="队伍强度: "+results.smile.aqours[0]+"<br />";
			txt+="<table border=1>";
			for (var i=1;i<=9;i++){
				cardid=results.smile.aqours[i].id;
				txt+=carddatatable(inventory[cardid],cardid,"str",results.smile.aqours[i]);
			}
			txt+="</table>";
			document.getElementById("results_smile_aqours").innerHTML=txt;
			//pure aqours
			txt="队伍强度: "+results.pure.aqours[0]+"<br />";
			txt+="<table border=1>";
			for (var i=1;i<=9;i++){
				cardid=results.pure.aqours[i].id;
				txt+=carddatatable(inventory[cardid],cardid,"str",results.pure.aqours[i]);
			}
			txt+="</table>";
			document.getElementById("results_pure_aqours").innerHTML=txt;
			//cool aqours
			txt="队伍强度: "+results.cool.aqours[0]+"<br />";
			txt+="<table border=1>";
			for (var i=1;i<=9;i++){
				cardid=results.cool.aqours[i].id;
				txt+=carddatatable(inventory[cardid],cardid,"str",results.cool.aqours[i]);
			}
			txt+="</table>";
			document.getElementById("results_cool_aqours").innerHTML=txt;
		}else{
			document.getElementById("results_smile_aqours").innerHTML="版本3.x模式不会组Aqours队伍。请在4.0模式下重新计算。";
			document.getElementById("results_pure_aqours").innerHTML="版本3.x模式不会组Aqours队伍。请在4.0模式下重新计算。";
			document.getElementById("results_cool_aqours").innerHTML="版本3.x模式不会组Aqours队伍。请在4.0模式下重新计算。";
		}
		//healer
		txt="期望回血: "+results.healer[0]+"<br />";
		txt+="<table border=1>";
		for (var i=1;i<results.healer.length;i++){
			cardid=results.healer[i].id;
			txt+=carddatatable(inventory[cardid],cardid,"healer",results.healer[i]);
		}
		txt+="</table>";
		document.getElementById("results_healer").innerHTML=txt;
		//pl
		txt="期望判定覆盖率: "+(results.pl[0]*100).toPrecision(4)+"%<br />";
		txt+="<table border=1>";
		for (var i=1;i<results.pl.length;i++){
			cardid=results.pl[i].id;
			txt+=carddatatable(inventory[cardid],cardid,"pl",results.pl[i]);
		}
		txt+="</table>";
		document.getElementById("results_pl").innerHTML=txt;
	}else{
		document.getElementById("results_smile_muse").innerHTML="请先计算。";
		document.getElementById("results_pure_muse").innerHTML="请先计算。";
		document.getElementById("results_cool_muse").innerHTML="请先计算。";
		document.getElementById("results_smile_aqours").innerHTML="请先计算。";
		document.getElementById("results_pure_aqours").innerHTML="请先计算。";
		document.getElementById("results_cool_aqours").innerHTML="请先计算。";
		document.getElementById("results_healer").innerHTML="请先计算。";
		document.getElementById("results_pl").innerHTML="请先计算。";
	}
	changeresults();
}