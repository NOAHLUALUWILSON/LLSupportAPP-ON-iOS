var localization=new Object();
	localization.zh=new Object(); //saves zh loc
	localization.zh.changeinnerHTML=new Object();
	localization.zh.vars=new Object();
	localization.en=new Object(); //saves en loc
	localization.en.changeinnerHTML=new Object();
	localization.en.vars=new Object();
	
	localization.changeinnerHTMLlist=[];
	//saves all names of loc that require the change of innerHTML. Elements in this array are strings that do NOT include the word "locale".
	localization.changevaluelist=["cardeditorcreate","save","saveanyway","cardeditorimportacard","cardeditorimport","cancel","save","saveanyway"];
	//saves all names of loc that req change of value. same as above

//settings and advsettings
localization.changeinnerHTMLlist.push("settings","showhide","version","4orabove","3orbelow","advsettings","forceatt","yes","no","forcegroup","sismode","ignored","fixed","llhelper","optimized","maxlevel","maxkizuna","maxslots","attemptallctrskills","userevisedskilleff","colordebuff","groupdebuff","ignorewarinings","sisestimation","value","percentage");

//song settings
localization.changeinnerHTMLlist.push("songsettings","songsettings-intro","preset","preset-glaceon","preset-glaceon2","numberofnotes","hold%","perfect%","time","songsettings-timeexplain","stars","songsettings-starexplain");

//database
localization.changeinnerHTMLlist.push("database");

//card builder, until number input,except character names
localization.changeinnerHTMLlist.push("cardeditor","renamecard","character","others","rarity","rarity-n","rarity-r","rarity-sr","rarity-ssr","rarity-ur","idolized","ispromo","mainatt","smile","pure","cool","kizuna","sis-slots","current","max");

//card builder, skill
localization.changeinnerHTMLlist.push("skill","none","icon-score","perfect-score","score-score","time-score","combo-score","star-score","icon-healer","perfect-healer","time-healer","combo-healer","icon-pl","time-pl","combo-pl","icon-spl","time-spl","skilleff-every","skilleff-there's","skilleff-chance");

//card builder, ctr skill
localization.changeinnerHTMLlist.push("ctrskill");

		localization.en.vars.skilltext=new Object(); 
		localization.en.vars.skilltext.none=["","",""];
		localization.en.vars.skilltext.icon_score=["icons","increasing score by",""];
		localization.en.vars.skilltext.perfect_score=["perfects","increasing score by",""];
		localization.en.vars.skilltext.score_score=["score","increasing score by",""];
		localization.en.vars.skilltext.time_score=["seconds","increasing score by",""];
		localization.en.vars.skilltext.combo_score=["hit combo string","increasing score by",""];
		localization.en.vars.skilltext.star_score=["perfect on starred notes","increasing score by",""];
		localization.en.vars.skilltext.icon_healer=["icons","healing by",""];
		localization.en.vars.skilltext.perfect_healer=["perfects","healing by",""];
		localization.en.vars.skilltext.time_healer=["seconds","healing by",""];
		localization.en.vars.skilltext.combo_healer=["hit combo string","healing by",""];
		localization.en.vars.skilltext.icon_pl=["icons","changing all Greats and Goods into Perfects for","seconds"];
		localization.en.vars.skilltext.time_pl=["seconds","changing all Greats and Goods into Perfects for","seconds"];
		localization.en.vars.skilltext.combo_pl=["hit combo string","changing all Greats and Goods into Perfects for","seconds"];
		localization.en.vars.skilltext.icon_spl=["icons","changing all Greats into Perfects for","seconds"];
		localization.en.vars.skilltext.time_spl=["seconds","changing all Greats into Perfects for","seconds"];
		
		localization.zh.vars.skilltext=new Object(); 
		localization.zh.vars.skilltext.none=["","",""];
		localization.zh.vars.skilltext.icon_score=["个图标","提升","积分"];
		localization.zh.vars.skilltext.perfect_score=["个perfect","提升","积分"];
		localization.zh.vars.skilltext.score_score=["分数","提升","积分"];
		localization.zh.vars.skilltext.time_score=["秒","提升","积分"];
		localization.zh.vars.skilltext.combo_score=["连击","提升","积分"];
		localization.zh.vars.skilltext.star_score=["个星星Perfect","提升","积分"];
		localization.zh.vars.skilltext.icon_healer=["个图标","回复","体力"];
		localization.zh.vars.skilltext.perfect_healer=["个perfect","回复","体力"];
		localization.zh.vars.skilltext.time_healer=["秒","回复","体力"];
		localization.zh.vars.skilltext.combo_healer=["连击","回复","体力"];
		localization.zh.vars.skilltext.icon_pl=["个图标","增强判定状态","秒"];
		localization.zh.vars.skilltext.time_pl=["秒","增强判定状态","秒"];
		localization.zh.vars.skilltext.combo_pl=["连击","增强判定状态","秒"];
		localization.zh.vars.skilltext.icon_spl=["个图标","稍微增强判定状态","秒"];
		localization.zh.vars.skilltext.time_spl=["秒","稍微增强判定状态","秒"];
		
		
		
		
		localization.en.vars.ctrskill=new Object();
		localization.en.vars.ctrskill.smile="Smile";
		localization.en.vars.ctrskill.pure="Pure";
		localization.en.vars.ctrskill.cool="Cool";
		localization.en.vars.ctrskill.power="Power";
		localization.en.vars.ctrskill.heart="Heart";
		localization.en.vars.ctrskill.star="Star";
		localization.en.vars.ctrskill.princess="Princess";
		localization.en.vars.ctrskill.angel="Angel";
		localization.en.vars.ctrskill.empress="Empress";
		localization.en.vars.ctrskill.increaseof="of";
		localization.en.vars.ctrskill.plus=", plus";
		
		localization.zh.vars.ctrskill=new Object();
		localization.zh.vars.ctrskill.smile="Smile";
		localization.zh.vars.ctrskill.pure="Pure";
		localization.zh.vars.ctrskill.cool="Cool";
		localization.zh.vars.ctrskill.power="的力量";
		localization.zh.vars.ctrskill.heart="之心";
		localization.zh.vars.ctrskill.star="之星";
		localization.zh.vars.ctrskill.princess="公主";
		localization.zh.vars.ctrskill.angel="天使";
		localization.zh.vars.ctrskill.empress="皇后";
		localization.zh.vars.ctrskill.increaseof="of";
		localization.zh.vars.ctrskill.plus="，外加";
		
		
		
		localization.en.vars.chartypetext=new Object();
		localization.en.vars.chartypetext.muse="&mu;'s";
		localization.en.vars.chartypetext.aqours="Aqours";
		localization.en.vars.chartypetext.printemps="Printemps";
		localization.en.vars.chartypetext.bibi="BiBi";
		localization.en.vars.chartypetext.lilywhite="Lily White";
		localization.en.vars.chartypetext.cyaron="CYaRon!";
		localization.en.vars.chartypetext.azalea="AZALEA";
		localization.en.vars.chartypetext.guiltykiss="Guilty Kiss";
		localization.en.vars.chartypetext.one="1st year";
		localization.en.vars.chartypetext.two="2nd year";
		localization.en.vars.chartypetext.three="3rd year";
		
		localization.zh.vars.chartypetext=new Object();
		localization.zh.vars.chartypetext.muse="&mu;'s";
		localization.zh.vars.chartypetext.aqours="Aqours";
		localization.zh.vars.chartypetext.printemps="Printemps";
		localization.zh.vars.chartypetext.bibi="BiBi";
		localization.zh.vars.chartypetext.lilywhite="Lily White";
		localization.zh.vars.chartypetext.cyaron="CYaRon!";
		localization.zh.vars.chartypetext.azalea="AZALEA";
		localization.zh.vars.chartypetext.guiltykiss="Guilty Kiss";
		localization.zh.vars.chartypetext.one="一年级";
		localization.zh.vars.chartypetext.two="二年级";
		localization.zh.vars.chartypetext.three="三年级";
		
		localization.en.vars.rarity=new Object();
		localization.en.vars.rarity.n="N";
		localization.en.vars.rarity.r="R";
		localization.en.vars.rarity.sr="SR";
		localization.en.vars.rarity.ssr="SSR";
		localization.en.vars.rarity.ur="UR";
		
		localization.zh.vars.rarity=new Object();
		localization.zh.vars.rarity.n="N";
		localization.zh.vars.rarity.r="R";
		localization.zh.vars.rarity.sr="SR";
		localization.zh.vars.rarity.ssr="SSR";
		localization.zh.vars.rarity.ur="UR";
		
		localization.en.vars.character=new Object();
		localization.en.vars.character.others="Other character";
		localization.en.vars.character.honoka="Kousaka Honoka";
		localization.en.vars.character.umi="Sonoda Umi";
		localization.en.vars.character.kotori="Minami Kotori";
		localization.en.vars.character.rin="Hoshizora Rin";
		localization.en.vars.character.maki="Nishikino Maki";
		localization.en.vars.character.hanayo="Koizumi Hanayo";
		localization.en.vars.character.nico="Yazawa Nico";
		localization.en.vars.character.eli="Ayase Eli";
		localization.en.vars.character.nozomi="Toujou Nozomi";
		localization.en.vars.character.chika="Takami Chika";
		localization.en.vars.character.riko="Sakurauchi Riko";
		localization.en.vars.character.kanan="Matsuura Kanan";
		localization.en.vars.character.dia="Kurosawa Dia";
		localization.en.vars.character.you="Watanabe You";
		localization.en.vars.character.yoshiko="Tsushima Yoshiko";
		localization.en.vars.character.hanamaru="Kunikida Hanamaru";
		localization.en.vars.character.mari="Ohara Mari";
		localization.en.vars.character.ruby="Kurosawa Ruby";
		
		localization.zh.vars.character=new Object();
		localization.zh.vars.character.others="其他角色";
		localization.zh.vars.character.honoka="高坂穗乃果";
		localization.zh.vars.character.umi="园田海未";
		localization.zh.vars.character.kotori="南小鸟";
		localization.zh.vars.character.rin="星空凛";
		localization.zh.vars.character.maki="西木野真姬";
		localization.zh.vars.character.hanayo="小泉花阳";
		localization.zh.vars.character.nico="矢泽妮可";
		localization.zh.vars.character.eli="绚濑绘里";
		localization.zh.vars.character.nozomi="东条希";
		localization.zh.vars.character.chika="高海千歌";
		localization.zh.vars.character.riko="樱内梨子";
		localization.zh.vars.character.kanan="松浦果南";
		localization.zh.vars.character.dia="黑泽黛雅";
		localization.zh.vars.character.you="渡边曜";
		localization.zh.vars.character.yoshiko="津岛善子";
		localization.zh.vars.character.hanamaru="国木田花丸";
		localization.zh.vars.character.mari="小原鞠莉";
		localization.zh.vars.character.ruby="黑泽露比";






















