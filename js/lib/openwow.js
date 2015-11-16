if(typeof $oWoW=="undefined"){$oWoW={cdnUrl:'//cdn.openwow.com',expUrl:'.openwow.com'};}
if(typeof $oWoWTooltip=="undefined"){var $oWoWTooltip=new function(){var external=true;var headtag=document.getElementsByTagName("head")[0];var
method={type:3},currentType,currentId,currentLocale,currentDomain,currentParams,currentExpansion,currentA,cursorX,cursorY,mode=0,eventAttached=false,npcs={},objects={},items={},quests={},spells={},achievements={},STATUS_NONE=0,STATUS_QUERYING=1,STATUS_ERROR=2,STATUS_NOTFOUND=3,STATUS_OK=4,STATUS_SCALES=5,STATUS_INVALID=6,TYPE_NPC=1,TYPE_OBJECT=2,TYPE_ITEM=3,TYPE_QUEST=5,TYPE_SPELL=6,TYPE_ACHIEVEMENT=10
CURSOR_HSPACE=15,CURSOR_VSPACE=15,_LANG={loading:"Loading...",noresponse:"No response",notfound:" not found",invalid:"Invalid tooltip data"},LOOKUPS={1:[npcs,"npc","NPC"],2:[objects,"object","Object"],3:[items,"item","Item"],5:[quests,"quest","Quest"],6:[spells,"spell","Spell"],10:[achievements,"achievement","Achievement"]},SCALING={},LOCALES={0:"enus",},EXPANSIONS={0:"classic",1:"tbc",2:"wotlk",3:"cata",4:"mop",5:"wod"};if(external){var Locale={id:0,name:"enus"};}
function init()
{if(external)
{var script=document.createElement("script");script.src=$oWoW.cdnUrl+"/script/global.js";headtag.appendChild(script);}
else{attachEvent();}}
function attachEvent(){if(eventAttached){return;}
eventAttached=true;$oWoW.aE(document,"mouseover",onMouseOver);}
function onDOMReady(func){if(typeof jQuery!="undefined"){jQuery(func);return}/in/.test(document.readyState)?setTimeout(onDOMReady.bind(null,func),9):func();}
this.init=function(){if(external){$oWoW.ae(headtag,$oWoW.ce("link",{type:"text/css",href:$oWoW.cdnUrl+"/style/global.css",rel:"stylesheet"}));}
attachEvent();onDOMReady(function(){if(typeof openwowTooltips!="undefined"){for(var i=0;i<document.links.length;i++){var link=document.links[i];scanElement(link);}}});};function updateCursorPos(e){var pos=$oWoW.getCursorPos(e);cursorX=pos.x;cursorY=pos.y;}
function scanElement(t,e){if(t.nodeName!="A"&&t.nodeName!="AREA"){return-9999;}
if (!t.getAttribute("data-openwow") != null)
{
	t.setAttribute("data-openwow", "");
	if(t.href.indexOf("#/creature/") > -1) { var id = t.href.substr(t.href.indexOf("#/creature/"), t.href.length).replace("#/creature/", ""); t.setAttribute("data-openwow", "http://wotlk.openwow.com/npc="+id); }
	else if(t.href.indexOf("#/quest/") > -1) { var id = t.href.substr(t.href.indexOf("#/quest/"), t.href.length).replace("#/quest/", ""); t.setAttribute("data-openwow", "http://wotlk.openwow.com/quest="+id); }
	//else if(t.href.indexOf("#/gameobject/") > -1) { var id = t.href.substr(t.href.indexOf("#/gameobject/"), t.href.length).replace("#/gameobject/", ""); t.setAttribute("data-openwow", "http://wotlk.openwow.com/object="+id); }
	else if(t.href.indexOf("#/item/") > -1) { var id = t.href.substr(t.href.indexOf("#/item/"), t.href.length).replace("#/item/", ""); t.setAttribute("data-openwow", "http://wotlk.openwow.com/item="+id); }
}
if(!t.getAttribute("data-openwow").length&&!t.rel){return;}
if(t.rel&&t.rel.indexOf("np")!=-1&&t.rel.indexOf("np")!=t.rel.indexOf("npc=")){return;}
var
i0,i1,i2,url,params={};currentParams=params;var p=function(url,k,v){if(k=="buff"||k=="sock"||k=="map"){params[k]=true;}
else if(k=="rand"||k=="ench"||k=="lvl"||k=="c"||k=="transmog"){params[k]=parseInt(v);}
else if(k=="gems"||k=="pcs"||k=="know"){params[k]=v.split(":");}
else if(k=="text"){params[k]=true;}};if(method.type&1){i1=2;i2=3;if(t.getAttribute("data-openwow").indexOf("http://")==0||t.getAttribute("data-openwow").indexOf("https://")==0){i0=1;url=t.getAttribute("data-openwow").match(/^https?:\/\/(www|classic|tbc|wotlk|cata|mop|wod)?\.?openwow\.com\/.?(item|quest|spell|achievement|npc|object)=([0-9]+)/);}
else{url=t.getAttribute("data-openwow").match(/()\?(item|quest|spell|achievement|npc|object)=([0-9]+)/);}}
if(url==null&&t.rel&&(method.type&2)){i0=0;i1=1;i2=2;url=t.rel.match(/(item|quest|spell|achievement|npc|object).?([0-9]+)/);}
t.getAttribute("data-openwow").replace(/([a-zA-Z]+)=?([a-zA-Z0-9:-]*)/g,p);if(t.rel){t.rel.replace(/([a-zA-Z]+)=?([a-zA-Z0-9:-]*)/g,p);}
if(params.gems&&params.gems.length>0){var i;for(i=Math.min(3,params.gems.length- 1);i>=0;--i){if(parseInt(params.gems[i])){break;}}
++i;if(i==0){delete params.gems;}
else if(i<params.gems.length){params.gems=params.gems.slice(0,i);}}
if(url){var
locale,domain="www",expansion="wotlk";currentA=t;if(i0&&url[i0]){domain=url[i0].split(".")[0];}
locale=$oWoW.getLocaleFromDomain(domain);expansion=$oWoW.getExpansionFromDomain(domain);currentDomain=domain;if(t.getAttribute("data-openwow").indexOf("#")!=-1&&document.location.href.indexOf(url[i1]+"="+ url[i2])!=-1){return;}
mode=t.parentNode.className.indexOf("icon")==0&&t.parentNode.nodeName=="DIV"?1:0;if(!t.onmouseout){if(mode==0){t.onmousemove=onMouseMove;}
t.onmouseout=onMouseOut; t.onclick=onMouseOut;}
if(e){updateCursorPos(e);}
var
type=$oWoW.getIdFromTypeName(url[i1]),typeId=url[i2];display(type,typeId,locale,params,expansion);if(e||typeof openwowTooltips=="undefined"){return;}
var data=LOOKUPS[type][0][expansion][getFullId(typeId,params)];var timeout=function(t){if(data.status[locale]!=STATUS_OK&&data.status[locale]!=STATUS_NOTFOUND&&data.status[locale]!=STATUS_INVALID&&data.status[locale]!=STATUS_ERROR){window.setTimeout(function(){timeout(t);},5);return;}
if(openwowTooltips.rename){t.innerHTML="";}
if(openwowTooltips.icons&&data.icon&&(type==TYPE_ITEM||type==TYPE_ACHIEVEMENT||type==TYPE_SPELL))
{if(external){t.className+=" icontiny";if(openwowTooltips.iconsize){t.innerHTML=t.innerHTML+'<img style="width: '+ openwowTooltips.iconsize+'px; height: '+ openwowTooltips.iconsize+'px;" src="//cdn.openwow.com/'+ domain+'/icons/tiny/'+ data.icon.toLocaleLowerCase()+'.gif">';}else{t.innerHTML=t.innerHTML+'<img style="width:15px; height:15px;" src="//cdn.openwow.com/'+ domain+'/icons/tiny/'+ data.icon.toLocaleLowerCase()+'.gif">';}}else{t.className+=" icontinyl";t.style.background="url(//cdn.openwow.com/"+ domain+"/icons/tiny/"+ data.icon.toLocaleLowerCase()+".gif)";}}
if(openwowTooltips.rename)
{eval("name = data.name_"+ LOCALES[locale]);if(typeof name!="undefined"&&name!="undefined")
{t.innerHTML=t.innerHTML+ name;}}
if(openwowTooltips.qualitycolor)
{if(type==TYPE_ITEM){if(typeof openwowTooltips.overridecolor!="undefined"&&typeof openwowTooltips.overridecolor.items!="undefined"&&openwowTooltips.overridecolor.items){t.style.color=openwowTooltips.overridecolor.items;}else{t.className+=" q"+ data.quality;}}
if(typeof openwowTooltips.overridecolor!="undefined"){if(type==TYPE_SPELL){if(typeof openwowTooltips.overridecolor.spells!="undefined"&&openwowTooltips.overridecolor.spells){t.style.color=openwowTooltips.overridecolor.spells;}}
if(type==TYPE_ACHIEVEMENT){if(typeof openwowTooltips.overridecolor.achievements!="undefined"&&openwowTooltips.overridecolor.achievements){t.style.color=openwowTooltips.overridecolor.achievements;}}
if(type==TYPE_QUEST){if(typeof openwowTooltips.overridecolor.quests!="undefined"&&openwowTooltips.overridecolor.quests){t.style.color=openwowTooltips.overridecolor.quests;}}
if(type==TYPE_NPC){if(typeof openwowTooltips.overridecolor.npcs!="undefined"&&openwowTooltips.overridecolor.npcs){t.style.color=openwowTooltips.overridecolor.npcs;}}
if(type==TYPE_OBJECT){if(typeof openwowTooltips.overridecolor.objects!="undefined"&&openwowTooltips.overridecolor.objects){t.style.color=openwowTooltips.overridecolor.objects;}}}}};timeout(t);}}
function onMouseOver(a){a=$oWoW.evt(a);var t=a._target;var i=0;while(t!=null&&i<5&&scanElement(t,a)==-9999){t=t.parentNode;++i;}}
function onMouseMove(a){a=$oWoW.evt(a);updateCursorPos(a);$oWoW.Tooltip.move(cursorX,cursorY,0,0,CURSOR_HSPACE,CURSOR_VSPACE);}
function onMouseOut(){currentType=null;currentA=null;$oWoW.Tooltip.hide();}
function getTooltipField(locale,n){var prefix="tooltip";if(currentParams&&currentParams.buff){prefix="buff";}
if(currentParams&&currentParams.text){prefix="text";}
if(currentParams&&currentParams.premium){prefix="tooltip_premium";}
return prefix+(n?n:"")+"_"+ LOCALES[locale];}
function getIconField(){return(currentParams&&currentParams.text)?"text_icon":"icon";}
function getSpellsField(locale){return(currentParams&&currentParams.buff?"buff":"")+"spells_"+ LOCALES[locale];}
function initElement(type,id,locale,expansion){var arr=LOOKUPS[type][0];if(arr[expansion]==null){arr[expansion]={};}
if(arr[expansion][id]==null){arr[expansion][id]={};}
if(arr[expansion][id].status==null){arr[expansion][id].status={};}
if(arr[expansion][id].response==null){arr[expansion][id].response={};}
if(arr[expansion][id].status[locale]==null){arr[expansion][id].status[locale]=STATUS_NONE;}}
function display(type,id,locale,params,expansion){if(!params){params={};}
var fullId=getFullId(id,params);currentType=type;currentId=fullId;currentLocale=locale;currentParams=params;currentExpansion=expansion;initElement(type,fullId,locale,expansion);var arr=LOOKUPS[type][0];if(arr[expansion][fullId].status[locale]==STATUS_INVALID){showTooltip(_LANG.invalid);}
else if(arr[expansion][fullId].status[locale]==STATUS_OK||arr[expansion][fullId].status[locale]==STATUS_NOTFOUND){showTooltip(arr[expansion][fullId][getTooltipField(locale)],arr[expansion][fullId][getIconField()],arr[expansion][fullId].map,arr[expansion][fullId][getSpellsField(locale)],arr[expansion][fullId][getTooltipField(locale,2)],expansion);}
else if(arr[expansion][fullId].status[locale]==STATUS_QUERYING||arr[expansion][fullId].status[locale]==STATUS_SCALES){showTooltip(_LANG.loading);}
else{request(type,id,locale,null,params,expansion);}}
function request(type,id,locale,stealth,params,expansion){var fullId=getFullId(id,params);var arr=LOOKUPS[type][0];if(arr[expansion][fullId].status[locale]!=STATUS_NONE&&arr[expansion][fullId].status[locale]!=STATUS_ERROR){return;}
arr[expansion][fullId].status[locale]=STATUS_QUERYING;if(!stealth){arr[expansion][fullId].timer=setTimeout(function(){showLoading.apply(this,[type,fullId,locale,expansion]);},333);}
var p="";for(var i in params){if(i!="rand"&&i!="ench"&&i!="gems"&&i!="sock"&&i!="lvl"&&i!="pcs"&&i!="transmog"){continue;}
if(typeof params[i]=="object"){p+="&"+ i+"="+ params[i].join(":");}
else if(params[i]===true){p+="&"+ i;}
else{p+="&"+ i+"="+ params[i];}}
var xpac=$oWoW.getDomainFromExpansion(expansion);var url="//"+ xpac+ $oWoW.expUrl+"/";$oWoW.ajaxRequest(url+ LOOKUPS[type][1]+"="+ id+"&power=true"+ p);}
function showTooltip(html,icon,map,spellData,html2,expansion){if(currentA&&currentA._fixTooltip){html=currentA._fixTooltip(html,currentType,currentId,currentA);}
var notFound=false;if(!html){html=LOOKUPS[currentType][2]+ _LANG.notfound;icon="inv_misc_questionmark";notFound=true;}
else{if(currentParams!=null){if(currentParams.c){html=html.replace(/<span class="c([0-9]+?)">(.+?)<\/span><br \/>/g,'<span class="c$1" style="display: none">$2</span>');html=html.replace(new RegExp('<span class="c('+ currentParams.c+')" style="display: none">(.+?)</span>',"g"),'<span class="c$1">$2</span><br />');}}}
if(mode==1){$oWoW.Tooltip.setIcon(null);$oWoW.Tooltip.show(currentA,html,null,null,null,html2);}
else{$oWoW.Tooltip.setIcon(icon,expansion);$oWoW.Tooltip.showAtXY(html,cursorX,cursorY,CURSOR_HSPACE,CURSOR_VSPACE,html2);}}
function showLoading(type,id,locale,expansion){if(currentType==type&&currentId==id&&currentLocale==locale&&currentExpansion==expansion){showTooltip(_LANG.loading);var arr=LOOKUPS[type][0];arr[expansion][id].timer=setTimeout(function(){notFound.apply(this,[type,id,locale,expansion]);},3800);}}
function notFound(type,id,locale,expansion){var arr=LOOKUPS[type][0];arr[expansion][id].status[locale]=STATUS_ERROR;if(currentType==type&&currentId==id&&currentLocale==locale&&currentExpansion==expansion){showTooltip(_LANG.noresponse);}}
function getFullId(id,params,expansion){return id;}
this.register=function(type,id,locale,json,expansion){var arr=LOOKUPS[type][0];initElement(type,id,locale,expansion);if(SCALING[type]&&SCALING[type][locale]!=SCALES_LOADED){arr[expansion][id].status[locale]=STATUS_SCALES;arr[expansion][id].response[locale]=this.register.bind(this,type,id,locale,json,expansion);return;}
if(arr[expansion][id].timer){clearTimeout(arr[expansion][id].timer);arr[expansion][id].timer=null;}
if(!this.external&&json.map){if(arr[expansion][id].map==null){arr[expansion][id].map=new Mapper({parent:$oWoW.ce("div"),zoom:3,zoomable:false,buttons:false});}
arr[expansion][id].map.update(json.map);delete json.map;}
$oWoW.cO(arr[expansion][id],json);if(arr[expansion][id].status[locale]==STATUS_QUERYING||arr[expansion][id].status[locale]==STATUS_SCALES){if(arr[expansion][id][getTooltipField(locale)]){arr[expansion][id].status[locale]=STATUS_OK;}
else{arr[expansion][id].status[locale]=STATUS_NOTFOUND;}}
if(currentType==type&&id==currentId&&currentLocale==locale&&currentExpansion==expansion){showTooltip(arr[expansion][id][getTooltipField(locale)],arr[expansion][id].icon,arr[expansion][id].map,arr[expansion][id][getSpellsField(locale)],arr[expansion][id][getTooltipField(locale,2)],expansion);}};this.regNpc=function(id,locale,json,expansion){this.register(TYPE_NPC,id,locale,json,expansion);};this.regObject=function(id,locale,json,expansion){this.register(TYPE_OBJECT,id,locale,json,expansion);};this.regItem=function(id,locale,json,expansion){this.register(TYPE_ITEM,id,locale,json,expansion);};this.regQuest=function(id,locale,json,expansion){this.register(TYPE_QUEST,id,locale,json,expansion);};this.regSpell=function(id,locale,json,expansion){this.register(TYPE_SPELL,id,locale,json,expansion);};this.regAchievement=function(id,locale,json,expansion){this.register(TYPE_ACHIEVEMENT,id,locale,json,expansion);};this.displayTextTooltip=function(text){showTooltip(text);}
this.displayTooltip=function(type,id,locale,params,expansion){display(type,id,locale,params,expansion);};this.getStatus=function(type,id,locale){var arr=LOOKUPS[type][0];if(arr[id]!=null){return arr[id].status[locale];}
else{return STATUS_NONE;}};this.refreshLinks=function(){if(typeof openwowTooltips!="undefined"){for(var i=0;i<document.links.length;i++){var link=document.links[i];var node=link.parentNode;var isTooltipChild=false;while(node!=null){if((" "+ node.className+" ").replace(/[\n\t]/g," ").indexOf(" openwow-tt ")>-1){isTooltipChild=true;break;}
node=node.parentNode}
if(!isTooltipChild){scanElement(link);}}}
this.hideTooltip();};this.setParent=function(newParent){$oWoW.Tooltip.reset();$oWoW.Tooltip.prepare(newParent);};if(external){this.set=function(foo){$oWoW.cO(method,foo);};this.showTooltip=function(e,tooltip,icon,expansion){updateCursorPos(e);showTooltip(tooltip,icon,null,null,null,expansion);};this.hideTooltip=function(){$oWoW.Tooltip.hide();};this.moveTooltip=function(e){onMouseMove(e);}}
init();}};if(typeof $utilGrp=="undefined"){$utilGrp=$oWoWTooltip;}