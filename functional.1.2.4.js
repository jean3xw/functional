"use strict";
/** **
	** **
		** ** functional.1.2.4.js update from 1.2.3.js
	*	//	todo: retrieve eventual useful changes & add from functionals.js
	*	//-- added 
			 18/11/21
			** Array.prototype.ifNext/ifPrev' , modification/correction
			*
			** amélioration logTo peut sélectionner destinataire (pour log) sans besion LOGmode 'verbiose'
			** ajout logToDOM peut sélectionner destinataire ElementHTML
			** Modification et ajout FN saylog(expression) utilise let LOGmode ='verbiose';
			pour utiliser afficher/cacher console// voi les functions	allLog() noLog()
			** Modification function whatLog() pour retourner Array texte nom variable , valeur
*/
/** KNOW BUG AND FIX
	** previous versions compatibility glitches and issues:
		#	function sameAs is no more, use '===' (regular strictly equal) instead 
*/


//------------------------------------------------------------------------------------------------------------------------------------------------
//---functional JavaScript Here //----  all scope //--  tools //-- //-- mostly chainable && observable(throw result || throw back updated parameters)
//------------------------------------------------------------------------------------------------------------------------------------------------

/** **ENVIRONNMENT **Datas *const *var **/
const VERSION='1.2.4'
let LOGmode ='verbiose' /** *VARIABLE : active 'verbiose' log by default *see saylog below to change and output log  */

let LOGtarget = console
let LOGDOMdefault = document.body
//-- LOGmode 
function allLog(){	LOGmode = 'verbiose';	return LOGmode}/** *set LOGmode to 'verbiose' will show all log  */
function infoLog(){LOGmode='infolog'; return LOGmode}
function noLog(){	LOGmode = 'nolog';	return LOGmode}/** *set LOGmode to 'verbiose' will show all log  */
//-- whatlog info LOG
function whatLog(str=true){
	const t=[	'logMode: '+LOGmode,	'logPlace: '+(LOGtarget===console?'console':LOGtarget),	'logHTML: '+LOGDOMdefault	]
	return str===true ? t.toString(): t
}



/**Object :
 ** function forKeysInObject(o, instrs) == fko(o, instrs)
 * iterate instructions[FN] with parameter Object and keys
 *
*/
function forKeysInObject(o,instrs){
	let res=[]
	for(let k in o){		res.push(instrs(k,o))	}
	saylog('for k('+res.length+')'+res.join())
							return res
}
function fko(o,instrs){		return forKeysInObject(o,instrs);	}

/** CONSOLE & LOG *//** UPDATED 18/08/2018 , added logTo warnTo
	previous console.log function is now a 
*/
/** function logTo()
* parameter aim can be change, default is set in LOGtarget
*/
function logTo(tx,aim=LOGtarget){		aim.log(tx);return tx }
function logToDOM(tx,tag=LOGDOMdefault){	tag.innerHTML+=tx;return tx }
function logDOM(tx,tag=LOGDOMdefault){	logToDOM(tx,tag) }// -- shorten
function logDom(t,tag=LOGDOMdefault){	logToDOM(t,tag) }// -- shorten
function warnTo(tx,aim=console){				if(!isReal(aim.warn)){return logTo(tx);}return aim.warn(tx) }

function saylog(txt,always=false){//-- set always to true will log anyway
	return LOGmode === 'verbiose' || LOGmode==='infolog' || always===true ?	logTo(txt) : txt
}
//--function saylog(t){ LOGmode ==='verbiose' ? sayLog(t):null }//--deleted
function sayWarn(t){		console.warn(t); return t }
function sayError(t){	console.error(t); return t }
function warn(t){	return sayWarn(t) }
function errLog(t){	return sayError(t) }
function logAll(t,aim){	sayLog(t); return logTo(t,aim) }
function logAt(t,aim){	return logTo(t,aim) }

/** extra console.log * used to see and hide infos logs*/
/** *seeLog DELETED 7/01/22(again!) USE ilog
*/
function ilog(txt){ return LOGmode ==='verbiose' || LOGmode==='infolog'? saylog(txt) : txt	}
function infolog(txt){ return ilog(txt) }



/** window *getters */
function screenW(){	return window.innerWidth}
function screenH(){	return window.innerHeight}
function screenSizes(){	return new Array(window.innerWidth, window.innerHeight)}
/** window *setter */
function setFullScreen(){/** WARNING obsolete check for newly */
	if(window.confirm('display fullscreen ') == true){
		if(document.body.requestFullScreen) {
			document.body.requestFullScreen()
		} else if(document.body.mozRequestFullScreen) {
			document.body.mozRequestFullScreen()
		} else if(document.body.webkitRequestFullScreen) {
			document.body.webkitRequestFullScreen()
		} else if(document.body.msRequestFullScreen){
			document.body.msRequestFullScreen()
		}
		return getScreenSizes()
	}
}

/** HTMLElement..innerHTML	=>	 write/append Content *is HTML DOM OBJECTs*/
function getInner(tag){ return tag.innerHTML}
//-- this 2 functions innerText , inner are depreciated !!!
function innerText(tag, txt){	tag.innerHTML=''+txt;return tag}
function inner(tag, content){	
	if(isStr(content)){tag.innerHTML=content;return tag}
	if(typeof content.nodeName!=='undefined'){tag.appendChild(content);return tag}
	warn('wrong content argument:'+content)
	return tag
}

function say(tag,tosay){	tag.appendChild(document.createTextNode(tosay.toString()+''));	return tag}
function sayWith(tag,tosay, separateur=newTag('br')){	tag.appendChild( separateur ); return say(tag,tosay)}
function sayLine(tag,tosay, sep=styleSet(newTag('span'), 'display:block;width:100%;border-bottom:thin solid grey;')){
	return sayWith(tag,tosay, sep)
}
function write(tag,tosay){tag.innerHTML = ''+tosay;	return tag}/** DOC clear and write new content htmltext (html entities able)*/
function writeTo(tag,htmltext){ tag.innerHTML+=''+htmltext;return tag;}/** write after(add) htmltext(html entities able) older name was addInner */
function writeBefore(tag, addingto){	let tmp=tag.innerHTML;tag.innerHTML=addingto+tmp; return tag;}// -- old name was addBeforeInner
function writeIndexOf(tag,htmltext,seek,place=0){/** DOC  write at first occurence of a found string*the place argument can indicate how many char after found indexOf 'seek' argument the insert will be , ex: if place===1 then the 'htmltext'(to write) will be insert after founded value */
	let t=tag.innerHtml,
		s=t.indexOf(seek)
	if(s>-1){ let d=substring(0,s+place),e=substring(s+place+1,t.length-1)
		return write(tag,d+htmltext+e)
	}
	saylog('not found '+seek)
	return
}
function writeAt(tag,htmltext,seek,place=0){writeIndexOf(tag,htmltext,seek,place=0)}//-- shorten writeIndexOf 
function writeLastIndexOf(tag,htmltext,seek,place=0){/** DOC  same as writeIndexOf BUT with lastIndex used instead */
	let t=tag.innerHtml;let s=t.lastIndexOf(seek)
	if(s>-1){ let d=substring(0,s+place),e=substring(s+place+1,t.length-1)
		return write(tag,d+htmltext+e)
	}
	saylog('not found '+seek)
	return
}
function writeLast(t,htx,s,p=0){ return writeLastIndexOf(t,htx,s,p)}//-- shorten writeLastIndexOf

function tagAround(tagname,str){	return '<'+tagname+'>'+str+'</'+tagname+'>';}
function setTagAround(tagname,str,idname){	return strAround('<'+tagname+' id='+idname+' >','</'+tagname+'>',str)}
function setBtAround(str,idname, val){ return write(addAttr(addAttr(newTagId('button',idname),'value',val),'type','button'),''+str)}
function newBt(txt,id,v){	return setBtAround(txt,id,v);}//-- shorten and usual parce setBtAround est vraiment un nom pourri(et pas explicite)
/**  *GETTERS -- shorten code*/
function body(){return document.body}
function getId(id){	return document.getElementById(id)}
function getNamed(name){	return document.getElementsByTagName(name)}
function getBy(expr){	return document.querySelector(expr)}

function main(){return getNamed('main')[0]}
/** main0()* as function main() but  create <main> and add to <body> if no exist , return main() */		
function main0(){	if(!document.body.getElementsByTagName('main')[0]){
		return toBody(newTagId('main','mainDefault'));}
	return main()
}
/// some 'accelerated' getters // NOTICE: that will quicken the request if not starting from .document

function getIn(elder,expr){ return elder.querySelector(expr)}
function atId(elder,id){	return elder.getElementById(id)}


function idGet(tag){
	let tmp=tag.getAttribute('id')
	saylog('function idGet of'+tag+' is '+tmp)
	return isReal(tmp)? tmp : false
}
function countElementsByName(tagname){		return document.getElementsByTagName(tagname).length}
function countNamesFrom( tagroot, tagname){	return tagroot.getElementsByTagName(tagname).length}

/**  NAMESPACE  -- // --  typeof */
function typeOf(it){	let tm=typeof it;	return tm}
function isTypeOf(it,testvalue){if(typeOf(it) == testvalue){	return true}	return false}
function isSameType(it,testobject){	return isTypeOf(it,typeOf(testobject))}
function isInstanceOf(it,refobject){ return it instanceof refobject		}
function isInstance(it,refobject){ 	return isInstanceOf(it,refobject)	}/** shorten write isInstanceOf */

function nodeName(tag){return tag.nodeName}//-- tagName === nodeName pour HTMLElement nodeType === 1
function getTagName(tag){return tag.tagName}
function isNode(tag){ if(tag.nodeName!==undefined){ return true} return false}// .nodeName replace .tagname !
function isOnPage(tag){	return tag.parentNode!==null ? true:false }
function ifIsOnPage( tag , instructions ){
	if(tag.parentNode!== null ){
		saylog(tag+'[FUNCTIONAL] IfIsOnPage instructions exe'); return instructions(tag) }
	else{
		saylog(tag+'[FUNCTIONAL] IfIsOnPage instructions NOT exe'); return null} 
}

/** * with tag.appendChild 
*HTMLElement APPEND CHILD HTMLElement 
*/
function toDom(tag,dest){	dest.appendChild(tag); return tag}
function destIn(tag,dest){	dest.appendChild(tag); return dest}
function toBody(tag){	body().appendChild(tag); return tag}/** *toBody() similar to toDom() *but use no dest , tag will be inserted in <body> */
function toMain(tag){	main0().appendChild(tag); return tag}/** *toMain() *similar to toBody()  tag will be inserted in <main>[0] */
/** ElementHTML.insertBefore */
function toDomBefore(tag,before){
	if(before.parentNode!==undefined){
		if(before.parentNode===document.getElementsByTagName('html')[0]){
			warn('CANNOT APPENDS TO'+document.getElementsByTagName('html')[0]);
			return
		}
		before.parentNode.insertBefore(tag,before)
		saylog('[FUNCTIONAL]'+tag+' added to '+before.parentNode+' before '+before.tagName)
		return tag
	}
	warn(before+' has no parentNode')
	return
}
function toPrev(tag,before){	return toDomBefore(tag,before)}/** shorten toDomBefore */
function inDomBefore(tag,before){	return isReal(toDomBefore(tag,before))? tag.parentNode:null}//-- equivalent toDomBefore BUT return parentNode
function inPrev(tag,before){return inDomBefore(tag,before)}//-- shorten inDomBefore

function swap(tag1,tag2){//-- swap 2 tag if both are DOM Elements//-- return null if one if not DOM Element
	let ref1 = tag1.parentNode,
	 ref2 = tag2.parentNode,
	 posit=tag1.nextElementSibling
	 saylog('parents '+ref1+' '+ref2)
	ref2.insertBefore(tag1,tag2)
	if(posit!==undefined){
		ref1.insertBefore(tag2,posit)
	}else{
		ref1.appendChild(tag2)
	}
}

function replaceTag(newtag,aim, suppr=false){/** set suppr to true will return newtag, if false the replaced tag(cloneNode) will be returned */
	aim.parentNode.insertBefore(newtag,aim)
	if(suppr===false){
		let mem=aim.cloneNode();aim.parentNode.removeChild(aim);return mem
	}else{
		aim.parentNode.removeChild(aim);return newtag;
	}
}
/** newTag
** HTMLElement with createElement
** SEE ALSO function Element @functional.element.js
*/
function newTag(tag){ 				return document.createElement(tag)}
function newTagId(tag,id){			return setId(newTag(tag),id)}
function newTagClass(tag,attrclass){return setClass(newTag(tag),attrclass)}
function tagClass(t,a){				return newTagClass(t,a)}
function newTagCss(tag,somecss){	return setCss(newTag(tag),somecss)}
function textTag(tagname, txt){		return say( newTag(tagname), txt  )	}//-- a new tag with text node content
function textTagId(tagname, id, txt){return say(newTagId(tagname, id), txt)	}//-- a new tag with id and text node content
function writeTag(name, txH){		return write(newTag(name),txH)}//-- a new tag with text content who can be html
function wTag(n,t){					return write(newTag(n),t)}//-- shorten WriteTag
function writeTagId(name,id, txH){	return write(newTagId(name,id),txH)}//-- a new tag with id and text content who can be html
function wTagId(n,id,t){ 			return writeTagId(n,id,t)}//-- shorten writeTagId

function tagParenthood(par,chld){	return destIn(newTag(chld),newTag(par))}	/** NEW FEATURE(17/02/18)* create two embedded tag return the parent one*/ 
function newTagParent(p,c){return tagParenthood(p,c)}//-- shorten
function tagChildhood(par,chld){	return toDom(newTag(chld),newTag(par))	 }	/** NEW FEATURE(17/02/18)* create two embedded tag return the child one*/ 
function newTagChild(p,c){return tagChildhood(p,c)}


/** update: 10/01/22
**deleted tagRoothood replaced by newTagChain
**deleted replaced by newTagChainId
* NOTICE : for better and sharper USE function Element @functional.element.js
 */
function newTagChain(arr){// typeof arrs = Array.length >1 // create a 'tree' of embedded tag !
	let r=newTag(arr[0]),
		r0=r
	for(let i=1;i<arr.length;i++){
		let t=toDom(newTag(arr[i]),r)
		r=t
	}
	return r0
}
function newTagChainId(names, ids){
	let r=newTagId(names[0],ids[0]),
		r0=r
	for(let i=1;i<names.length;i++){
		let t=toDom(newTagId(names[i],ids[i]),r)
		r=t
	}
	return r0
}
/** 
	** create named HTMLElement(s)
		* using newTag, newTagId,...
			*	see also functional.element.js
*/
/** 	*HTMLElements are interactive	:	link, button see also functional.form.js for other user inputs */
function newLink(hrefvalue='#'){return setHref(newTag('a'), hrefvalue)}
function newLinkId(id, hrefvalue='#'){return setHref(newTagId('a', id), hrefvalue)}
function newTextLink( id, txt, hlink='#' ){	return write(newLinkId(id, hlink),txt)}//-- updated 18/08 say( replaced by write(
function newLinkItem(id,item, hlink='#'){
	saylog(item+'\t'+item.innerHTML)
	if(item.innerHTML !== undefined){
		return destIn( item,newLinkId(id, hlink) )
	}else if(isStr(item)){
		return newTextLink( id, item, hlink )
	}
	saylog('CAUTION:  argument[1] "item" type  not HTMLElement(tag) OR String(str) , item.toString() will be USED : '+item.toString());
	return say( newLinkId(id, hlink), item.toString() );
}

function addBt(id, val, alt, content){
	let tm=newTagId('button',id);
	setAttr(setAttr( tm , 'value', 'val'),'alt', alt );
	if(isStr(content)){	return say( tm, content);}
	if(typeof content.nodeName!==undefined){	return destIn( content, tm )}
	saylog('WARNING: wrong parameter content '+content+' is not added!')
	return tm
}
/** Object.Image && HTMLElement img */
function newImg(src, alt , name = null){/** *newImg(sec, alt) create Image*STAY AWARE(like VanDame) THIS IS NOT A TAG but newImage with src, alt and name* Use as param of newImgTag to make tag in DOM*/
	let im = new Image();
	im.src = src;
	im.alt=alt;
	if(name !== null){	im.name=name;	}
	ilog(im.src+' : '+im.alt.toString()+' FROM '+im.name );
	return im;
}
function newImgTag(newimg , id =""){//-- with newimg Object.Image
	return [ newTagImgId(newimg.src, id, newimg.alt), newimg ]
}
function newTagImg(imgsrc, altdescript){
	let tmp=newTag('img')
	tmp.setAttribute('alt', altdescript)
	tmp.setAttribute('src', imgsrc)
	return tmp
}
function newTagImgId(imgsrc, id, altdescript){
	let tmp=newTagId('img', id)
	tmp.setAttribute('alt', altdescript)
	tmp.setAttribute('src', imgsrc)
	return tmp
}
function tagImgId(imgsrc,alt,id){
	return setId(newTagImg(imgsrc,alt), id)

}
/** UPDATE 07/01/22 
*deleted newSectionArticleTitle
*deleted newSAT
* added and modified to newSectionArticleId hlevel
* added newSAI shorten of sectionArticleId
*/
/** *newSectionArticleId( *create tag section and child article => return section * Section with Article 1st child*/
function newSectionArticleId( idsection , idarticle , titletext, hlevel=2){
	return destIn(
		destIn( writeTag('h'+hlevel, titletext),
				newTagId('article', idarticle)
		),
		newTagId('section', idsection)
	)
}
function sectionArticleId( idsection , idarticle, ttl, hlv ){ return newSectionArticleId(idsection, idarticle, ttl, hlv)}//-- shorten
function newSAI(sectid,artid,ttl,hlv){return newSectionArticleId(idsection, idarticle, ttl, hlv)}

function addHeaderTo(tag, idheader = null){//-- insert a new <header id="idheader"> into the first argument(tag) and move tag content(innerHTML) to the header
	let tmp
	if(idheader === null){	tmp = newTag('header');}else{	tmp = newTagId( 'header', idheader);}
	let tmpsave =tag.innerHTML;
	tag.innerHTML='';
	toDom(tmp, tag).innerHTML=tmpsave;
	return tmp;
}
function tagHeader(t,i){	return addHeaderTo(t,i);}
function articleH(title,hlevel){ return destIn( say( newTag('h'+hlevel), title),newTag('article') );}
function aH(t,lv){return articleH(t,lv);}// shorten articleH 
// create Article+Hx with Article id 
function articleHId(id,title,hlevel){	return setId( articleH(title,hlevel), id ); }
function aHId(id,tt,hl){	return articleHId(id,tt,hl);}// shorten articleHId

/**   HTMLElement removeChild , replace/switch 
*/
function putOff(toremove,mybox=null){//-- NOTICE THIS FUNCTION ONLY WORK inside body() //-- TODO: add same with document.head @FILE = functional.head.js
	if(isReal(toremove) ){
		if( body()==toremove ){	return 1;}//--  toremove not body ! failsafe => 1
		if(!isReal(mybox)){	mybox = toRemove.parentNode;}//-- get parent appended to document.body OR not
		if(!isReal(mybox)){		return 0;}//-- check has found parent! failsafe => 0
		mybox.removeChild( toremove );//-- remove HTMLElement
		return toremove;//-- => removed HTMLElement/tag
	}
	return -1;//-- toremove found ! failsafe => -1
}	//--- 		END putOff => removeChild args(parent,childtoremove)     		---//
function tagRemove(idt){	return putOff(idt);}
function tagSwitch(mybox,toswitch){
	if(isReal(body().toswitch) ){//-- HTML in body()
		return putOff(toremove,mybox)
	}else{
		return toDom(toswitch,mybox)
	}
}

/**		HTMLElement test 
	*/
function tagContains(box,contained){	if(box.contains(contained)){	return contained;}	return false;}
function isToDom(anytag,slt){
	saylog('check is on Dom '+body().anytag+' body() '+body()+' tag '+anytag+' return '+(body().querySelector(slt)==anytag));
	if(body().querySelector(slt)==anytag){		return true;	}else return false;
}

/**  HTMLElement ATTRIBUTE
	*hasAttribute setAttribute removeAttribute
		*	attribute SETTER may be GETTER also , i.e: getAttr ? attribute value : false
*/
function getAttr(tag,attrname){if(tag.hasAttribute(attrname)){		return tag.getAttribute(attrname);}	return false;}
function ifAttr(tag,attrname){if(tag.hasAttribute(attrname)){		return getAttr(tag);}				return null;}/** very same of getAttr but will return null if no attribute*/

function addAttr(tag,attr,val){	tag.setAttribute(attr,val);	return tag;			}
function setAttr(tag,attr,val){ tag.setAttribute(attr,val);	return tag;			}/** todo ajouter echec si non existant* not sure it is OK *verifier et simplifier */
/** Ajout Mars 2022 */
function setAttrs(tag,attrs,vals){ if(attrs.length===vals.length){
	for(let i=0,ln=attrs.length;i<ln;i++){	tag.setAttribute(attrs[i],vals[i] )}
	return tag}
	return false}
function delAttr(tag,attr){		tag.removeAttribute(attr);	return tag			}
function setId(tag,idname){		tag.id=idname;				return tag			}
function removeId(tag){			tag.removeAttribute('id');	return tag			}
function doAttr(tag, attr, val, instr = function(a,b){return (a+b);} ){
 tag.setAttribute(attr, instr(tag.getAttribute(attr),val));	return tag			}
/** **onAttr- switch arg value AS true=>getAttr, false=>delAttr, default=>setAttr 		# /!\ NOTICE, IMPORTANT /!\ USE String value 'true' or 'false' instead of boolean to set attribute value!!! 	*/
function onAttr( tag ,atr,value=true){	switch(value){
	case false:return delAttr(tag,atr);break;case true:return tag.getAttribue(atr);break;default:return setAttr(tag,atr,value);break;}	
}
function setSrc(tag,idname){tag.src=idname;return tag;}
function setClass(tag,classname){tag.className=classname;return tag;}/** classname could be multiple WHEN SEPARATED WITH a whitespace * i.e.: setClass(aim, 'class1 class2') */
function addClass(tag,name){
	 if(!isReal(tag.className)){			return setClass(tag,name);}
	
	if(tag.className.indexOf(name)<0){		tag.className=tag.className+' '+name;return tag;	}
	
	if(name.length == tag.className.length ){ saylog('addClass: className allready contain '+name);return tag;}
	
	if(tag.className.charAt(tag.className.indexOf(name)+1)==' ' || tag.className.charAt(tag.className.indexOf(name)+1)==''){
			if(tag.className.charAt(tag.className.indexOf(name)-1)==' ' || tag.className.charAt(tag.className.indexOf(name)-1)==''){
				//-- then 
				saylog('addClass: class has allready '+tag.className);
				return tag;
			}
		}
		tag.className=tag.className+' '+name;
	return tag;
	

}
function removeClass(tag){tag.removeAttribute('class');return tag;}
function setHref(alink, url){ alink.setAttribute('href', url); return alink;}/** no failsafe, <p href="anything" > not make sense*/

/**  HTMLElement Atribute STYLE
	*setCss write style attribute, will erase previous, 
		* see styleSet and changeCssValue for updating style content	*/
/** setCss 
* very same as native tag.setAttribute 'style' BUT return tag for chaining ! 
*/
function setCss(tag,mystyle){
	saylog('[functional]setCss '+mystyle+' \n CAUTION : all previous value of tag attribute style will be overide!\t use fn:styleSet for sharp update.');
	tag.style=mystyle;
	return tag;
}
function addCss(tag,addstyle){
	let t=tag.style
	saylog('[functional]addCss from : '+t+'\n add : '+addstyle);
	t+=addstyle;
	return setCss(tag,t);
}
/** get tag attribute style(whole) ** TODO see further for Object.STYLE */
function getStyle(tag){ let str=tag.getAttribute('style');saylog('getStyle:'+str);
if(isReal(str) && str!=''){return str;}else{addAttr(tag,'style','');return null;}}	//--return string(attr style) or null

/**----------Get a Set any CSS value from tag attribute style--
*---extract CSS value from style attribute (in tag) from one CSS prop(or shorten notation)	*/
function getCssValue(tag,stylename){
	let str=getStyle(tag)
	if(str!=null){
		saylog('[functional] getCssValue from style = '+str);
		let lastidx=str.lastIndexOf(stylename);
		if(lastidx>-1 ){
			let styleindex,	subtmp,	separator,	endseparator;
			if(str.charAt(lastidx-1) === '-'){/** check if css properties in style is composite with '-' (ex: border-color; background-color to not mistake with color)*/
			saylog('[functional] checking for propertie without \'-\' ');
			let newstr='';
			let clean=-1;
				for(let i=0; i<str.length; i++){
					if(i > clean){
						if(str.charAt(i) !== '-' ){
							newstr+=str.charAt(i);
						}else if( parseFloat( str.charAt(i+1) ) ){/** will keep negative value*/
							newstr+=str.charAt(i);
						}else{
							clean=i+1;
						}
					}else{
						if(newstr.charAt(i) === ' '){	clean=i+1;	}
					}
				}
				lastidx=newstr.lastIndexOf(stylename);
				if(lastidx === -1){
					return null;/** not found in cleaned newstr */
				}
				str=newstr;/** lastidx and str are redefine to match search */
			}
			styleindex=lastidx-stylename.length;
			subtmp=str.substring(lastidx,str.length);
			separator=subtmp.indexOf(':')+1;
			endseparator=subtmp.indexOf(';');
			return subtmp.substring(separator,endseparator);
		}
		saylog('[functional] getCssValue not found');
		return null;/** not found in css sstyle value*/
	}
	saylog('[functional] getCssValue not found');
	return null;/** no css style value*/
}
function propCSS(tag, stylename){return getCssValue(tag, stylename);}/** propCSS shorten of getCssValue (previously funciton getProp )*/
//---replace CSS value from style attribute(tag) by another value//--OK

function changeCssValue(tag,stylename,newvalue){//-- return the tag if ok or string(not found) or null//--- better than addCss by replacing existing value but won't work if css rule do not exist 
let str=getStyle(tag);
if(str!=null){	let lastidx=str.lastIndexOf(stylename);
	if(lastidx>-1 ){
	let subtmp=str.substring(lastidx,str.length);
	let separator=subtmp.indexOf(':')+1;
	let endseparator=subtmp.indexOf(';');
	let leftstr=str.substring(0,lastidx+separator);
	let rightstr=str.substring(lastidx+endseparator);
	return setCss(tag,leftstr+newvalue+rightstr);
	}else{return undefined;/*stylename not found*/}}else{	return null;/*--style is not set*/}
}

/** USE styleSet( to change/add/set one rule of CSS */
function styleSet(tag,stylename,stylevalue){
saylog('[functional] attempt style '+stylename+' to '+stylevalue+' of '+idGet(tag));
let tmpcss=getStyle(tag);
	if(tmpcss !=null){
		if(getCssValue(tag,stylename) == null){/** */
			saylog('[functional]styleSet : add style propertie '+stylename);
			return addCss(tag,stylename+':'+stylevalue+';');
		}else{
			changeCssValue(tag,stylename,stylevalue);
			saylog('[functional]styleSet : replace style propertie '+stylename);
		return tag;
		}
	}else{
		return  setCss(tag,stylename+':'+stylevalue+';');
	}
}
/** TODO : modify setStyle to accept array in args and set multiple css properties*/
function setStyle(tag,stylename,stylevalue){return styleSet(tag,stylename,stylevalue);}/** same as setStyle*to avoid mistakes!  */
/** 21/02/22 ajout : function style */
function style(tag,names,values){
	!isArray(names) ? names=toArray(names) : null
	!isArray(values) ? values=toArray(values) : null
	if(names.length===values.length){
		for( let i=0, len=names.length; i<len; i++ ){
			styleSet(tag , names[i], values[i])
			saylog('style['+i+'] '+names[i]+':'+values[i])
		}
	return tag;
	}return
}
function styleRemove(tag,stylename){// remove a CSS props and value
let str=getStyle(tag);
if(str!=null){	let lastidx=str.lastIndexOf(stylename);
	if(lastidx>-1){
	let subtmp=str.substring(lastidx,str.length);
	let endseparator=subtmp.indexOf(';');
	let leftstr=str.substring(0,lastidx);
	let rightstr=str.substring(lastidx+endseparator+1);
	return setCss(tag,leftstr+rightstr);
	}else{return undefined;/*stylename not found*/}}else{	return null;/*--style is not set*/}
}

//-----------------    meta-settings HTML Element(s)                        -------------------------------------------------------------
function toScale(tag,w,h,unites){setCss(tag,'width:'+w+unites+';height:'+h+unites+';');}
function toPlace(tag,x,y,unites){setCss(tag,'position:absolute;left:'+x+unites+';top:'+y+unites+';');}
function setInPage(tag,x,y,w,h,unites){setStyle(tag,'position:absolute;left:'+x+unites+';top:'+y+unites+';width:'+w+unites+';height:'+h+unites+';');return tag;}
function sized(tag,ratiow,ratioh,bord,unites){setStyle(tag,'position:absolute;left:'+bord+unites+';top:'+bord+unites+';width:'+ratiow+unites+';height:'+ratioh+unites+';');return tag;}


function widesize(tag){return sized(tag,98,82,1,'%');}
function widescreen(tag){setInPage(tag,window.innerWidth*0.048,window.innerHeight*0.01,Math.floor(window.innerWidth*0.98),Math.floor(window.innerHeight*0.98),'px');return tag;}


//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------  numbers , calculation and such :
//-- get A percent value
function perCent(atvalue,endvalue){return Math.round((atvalue*100)/endvalue*100)/100;};

/** ----------------------   CANVAS functional*/
/** below functions addWidth , addHeight, addWH *set width and height attributes*NOT SPECIFIC TO CANVAS */
function addWidth(tag,widthvalue){return addAttr(tag,'WIDTH',widthvalue);};//-- to fix canvas by adding WIDTH attribute
function addHeight(tag,heightvalue){return addAttr(tag,'HEIGHT',heightvalue);};//-- to fix  canvas by adding HEIGHT attribute
function addWH(tag, w, h){/** put attributes width height with theirs styles values*/
return addWidth(addHeight(tag, h), w);
}
/** */
function attrWidthHeight(tag){	return attrWH(tag);}/** *similar as attrWH(more descriptive name)  */
function newCanvas(idcanvas){return newTagId('canvas', idcanvas);}
/** TODO * FIX THIS *
function canvasDim(idcanvas, w, h){
let tmp=newCanvas( idcanvas);
return tmp;
}
* FOR NOW USE setDim(newCanvas('maincanvas'), '100px', '100px')
*/

function twoD(canvas){	return canvas.getContext('2d');}
function mk2D(idC){let cnv=new Array(newTagId('canvas',idC), twoD(cnv[0]));return cnv; }
function canvasProps(){return null;}
function addCanvas(x,y,w,h,dest,unit){	let str='position:absolute;left:'+textAfter(x,unit)+';top:'+textAfter(y,unit)+';width:'+textAfter(w,unit)+';height:'+textAfter(h,unit)+';';	return  toDom(newTagCss('canvas',str),dest);}
function addWideCanvas(idname){return widesize(toDom(newTagId('canvas',idname),body()));}
function addScreen(tagname,idname){return widescreen(toDom(newTagId(tagname,idname),body()));}

function putWidthHeight(tag){/** *putWidthHeight(canvastag) set WIDTH & HEIGHT attribute to current style width and height*use it to add width and height attributes from style* not specific to canvas but few tag need such attributes(fix a bug that canvas tag don't know css values with native code */
saylog('[functional]putWidthHeight of '+tag);
return addWH(	tag,dimW(tag).slice(0,-2),dimH(tag).slice(0,-2) );
}/** *--- using style width and height set in px !!! WON'T WORK IF NO STYLE or width and height not in px
* putWidthHeight() to use both style sized width/height CSS */

/** STRINGs       */
function textAfter(str,txt){let mystr='';mystr+=str+''+txt;	return mystr;};//--- add arg2(str) to arg1(str)
function textBefore(str,txt){let mystr='';mystr+=txt+''+str;	return mystr;};//--- add arg1(str) to arg2(str)

//------------------------------------------------------------------------------------------------------------------------------------------------
//------------- DATE
//---------------for TIME COUNT //-- using timestamp (1/1/1970)
function timeNow(){	return (new Date()).getTime();	}
function timeInt(anydate){return anydate.getTime();}
function timeCount(oldtime){return timeNow-oldtime;}//--- oldtime UNIX time (int) === Date.getTime()

function msDate(dt){	return new Date(dt);	}
function sDate(dt){	return new Date().setSeconds(dt);}
function mDate(dt){/*	return*/ alert(new Date().setMinutes(dt));}
function hDate(dt){	return new Date().setHours(dt);}
function dateInt(anydate){	return anydate.getSeconds();}
function dateSeconds(anydate){	return anydate.getSeconds();}
function dateMinutes(anydate){	return anydate.getMinutes();}
function dateHours(anydate){	return anydate.getMinutes();}
function newDate(value, unit = 's'){
	switch(unit){
	case'ms':
		return msDate(value);
	break;
	case's':
		return sDate(value);
	break;
	case'm':
		return mDate(value);
	break;
	case'h':
		return hDate(value);
	break;/** add here others durations i.e. case'd' for days */

	default:
		saylog('WARNING unknow unit in arguments : send new Date() with null attributs ');
		return new Date();
	break;
	}
}
function getDate(anydate=new Date(), unit = 'ms'){
	switch(unit){
		case'ms':
			return dateInt(anydate);
		break;
		case's':
			return dateSeconds(anydate);
		break;
		case'm':
			return dateMinutes(anydate);
		break;
		case's':
			return dateSeconds(anydate);
		break;
		default:
		return anydate;
		break;
	
	}
}

function timePercent(timedebut,totaltime){
	return perCent(timeCount(timedebut),totaltime)
}

/** css getters */
function tagInfo(tag){let tmp='';tmp+='id'+idhtml(tag)+'\nW:'+dimW(tag)+'H:'+dimH(tag)+'BG:'+bgColor(tag)+'\nz-index:'+getZ(tag);return tmp;}
function bgColor(tag){let tmp=getCssValue(tag,'background-color');if (tmp != undefined && tmp!= null){return tmp;}else{return false;}}


function border(tag){let tmp=getCssValue(tag,'border');if (tmp != '' && tmp!= null){return tmp;}else{return false;}}
function dimW(tag){saylog('[functional] dimW get width of '+idGet(tag));let tmp=getCssValue(tag,'width');if (tmp != undefined && tmp!= null){return getCssValue(tag,'width');}else{return false;};}
function dimH(tag){let tmp=getCssValue(tag,'height');if (tmp != undefined && tmp!= null){return getCssValue(tag,'width');}else{return false;};}
function dim2d(tag){tmp=new Array();tmp.push(dimW(tag));tmp.push(dimH(tag));return tmp;}

function idhtml(tag){tmp=tag.getAttribute('id');if(tmp!=undefined && tmp !=null){return tmp;}return false;}
function getZ(tag){let tmp=getCssValue(tag,'z-index');if (tmp != undefined && tmp!= null){return tmp;}else{return false;}}
//----------------shorten styleSet() //-------SPECIFIED CSS rules
function setBg(tag,color){return styleSet( tag,'background-color',color );}
function setColors(tag, bgcolor, fontcolor){styleSet(tag,'color', fontcolor); return setBg(tag, bgcolor);}
function setBorder(tag,border){return styleSet(tag,'border',border);}
function setRoundBorder(tag, border, r){return styleSet(styleSet(tag,'border',border), 'border-radius', r);}
function setMargin(tag,margin){return styleSet(tag,'margin',margin);}
function setPadding(tag,padding){return styleSet(tag,'padding',padding);}
function clearMarges(tag){
setMargin(tag, 0);
setPadding(tag, 0);
return tag;
}
function clearDim(tag){	return setFont(clearMarges(tag),1,'center');}


function setW(tag,wdth){styleSet(tag,'width',wdth);return tag;}
function setH(tag,hgth){styleSet(tag,'height',hgth);return tag;}
function setDim(tag,wdth,hgth){
setW(tag, wdth);
setH(tag, hgth);
return tag;
}
function setWH(tag,wdth,hgth){return setDim(tag,wdth,hgth);}/** same as setDim */

function setRadius(tag,rounded){styleSet(tag,'border-radius',rounded);return tag;}

function setTop(tag,topval){styleSet(tag,'top',topval);return tag;}
function setLeft(tag,leftval){styleSet(tag,'left',leftval);return tag;}
function setTopLeft(tag, t, l){ return setLeft(setTop(tag, t), l); }
function setPosition(tag,positionstyle,left, top){
	styleSet(tag,'position',positionstyle);
	styleSet(tag,'top',top);
	styleSet(tag,'left',left);
	return tag;
}
function posAbsolute(tag,left,top){setPosition(tag,'absolute',left,top);return tag;}
function setAbsolute(tag,x,y,w,h){	
	saylog('[functional] setAbsolute WITH '+tag+' , '+x+' , '+y+' , '+w+' , '+h) ;
	return setDim(posAbsolute(tag, x, y), w, h);
}//--- set top left with height position:absolute		//---- setPos(tag,x,y,w,h)
function setPos(tag,x,y,w,h){		return setDim(posAbsolute(tag,x,y),w,h);}/** setPos is same as setAbsolute--- set top left with position:absolute		//---- setPos(tag,x,y,w,h)*/

function setZ(tag,zid){styleSet(tag,'z-index',zid);return tag;}
function setFontSize(tag,fsize){	return styleSet(tag,'font-size',fsize);}	//---font-size //--
function setFontColor(tag, fcolor){	return styleSet(tag, 'color', fcolor);}
function setFont(tag,fsize,justif){	return styleSet( setFontSize(tag,fsize),'text-align', justif );}
function setText(tag,txt, justif, fsize ='1em' , fcolor = '#000' ){	return setFontColor( setFont(tag,fsize, justif), fcolor );}

function setTextAlign(tag,justif){	return styleSet(tag,'text-align',justif);}	//---
function borderRed(tag){setBorder(tag,'1px solid red');return tag;}
function border(tag){let tmp=getCssValue(tag,'border');if (tmp != '' && tmp!= null){return tmp;}else{return false;}}
function dimW(tag){saylog('[functional] dimW get width of '+idGet(tag));let tmp=getCssValue(tag,'width');if (tmp != undefined && tmp!= null){return getCssValue(tag,'width');}else{return false;};}
function dimH(tag){let tmp=getCssValue(tag,'height');if (tmp != undefined && tmp!= null){return getCssValue(tag,'width');}else{return false;};}
function dim2d(tag){tmp=new Array();tmp.push(dimW(tag));tmp.push(dimH(tag));return tmp;}

function idhtml(tag){tmp=tag.getAttribute('id');if(tmp!=undefined && tmp !=null){return tmp;}return false;}
function getZ(tag){let tmp=getCssValue(tag,'z-index');if (tmp != undefined && tmp!= null){return tmp;}else{return false;}}

function initMain(tag,width,height){return setPos(clearMarges(tag),0,0,width,height);}

/** 	EVENTs and LISTENERs	*/
//-- NOTICE : 	Function.listen Seulement utile pour la valeur retournée sinon native code .addLisener will do the job // indique erreur dans EDGE/IE mais le code est quand même interpreté
function listen(tag, eventtrigger, instr,bubble=false){ tag.addEventListener( eventtrigger, instr, bubble); return tag;}

/** * ON LOAD() */
/** LOGICAL */
//loadInit(console.log('page loaded'));
function loadInit(instr){return listen(body(),'load',instr());};//-- use named/unamed function in args
/** PRELOAD images*/
function preloadImages(){
	if(document.images){
		let tabimages=new Array();
		for(let i= 0;i<preloadImages.arguments;i++){
			tabimages[i]=new Image();
			tabimages[i].src=preload.arguments[i];
			console.log(i+' preloaded ',tabimages[i].src);
		}
		return tabimages;
	}
}
/**
* ITERATORs functional may ( 'understanding ecmascript6 -- N.Zakas'  Iterators and Generators 139)
 */
function *createIterator(items) {/** *the '*'(etoile/multiply sign) make the function a generator and use keyword 'yield' to * */
for (let i = 0; i < items.length; i++) {
yield items[i];
}
}
function iterateArray(arr, instructions){/** closure got args function(key, value)*/
	for (let entry of arr.entries()){/** *.entries() is JS method iteractor for Array, Map and Set */
		instructions(entry[0], entry[1]);/** return entry === [key, value] */
	}
	return arr;
}
function iterateMap(mp, instructions){	return iterateArray(mp, instructions);	}
function iterateSet(st, instructions){
	for (let entry of st.entries()){/** *.entries() is JS method iteractor for Array, Map and Set */
		instructions(entry[0] );/** IN A Set() return entry === [value, value] so no need for doublon */
	}
	return st;
}
/** Arrays*/
/** * Array *use anonymous fn *see also native Array.forEach */
function onceArray(arr,instructions){//-- return tab[result] instructions(arr[i])
	let tmptab=new Array();
	for(let i=0;i<tmptab.length;i++){
	tmptab.push(instructions(arr[i]));}
	return tmptab;
}
function forArray(arr,instructions)	{//-- return tab[lastresult, tabresult[]] instructions(arr[i])
	let tmptab=new Array();	let tmpresult;
	for (let i=0;i<arr.length;i++)	{
		tmpresult=instructions(arr[i]);	
		tmptab.push(tmpresult);
	}
	return (new Array(tmpresult,tmptab));
}
function forLength(arr,instructions){//-- similar to forArray BUT won't return (and NOT create variable / quicker if no result)
	for(let i=0;i<arr.length;i++){
		instructions(arr[i]);
	}
}
function countInArray(arr,testvalue='all'){/** --	return tab[count condition OK *	set testvalue to a value the count only if arr[i]=== testvalue */
	let tmp=new Array(0, null);
	for (let i=0;i<arr.length;i++)	{
		if( testvalue === 'all' || testvalue === arr[i]){
		tmp[0]++;
		tmp[1]=arr[i];
		}
	}
	return tmp;
}
function isInArray(arr, val){//-- NOT A CLOSURE
	let res=false;
	for (let i = 0; i<arr.length ; i++){		if(arr[i] == val){	res=true; return true;}}
	return res;
}
function idInArray(arr, val){/** *return index if value is in Array*/
	if(Array.includes(val)){
		let res;
		for (let i = 0; i<arr.length ; i++){		if(arr[i] == val){	res=i; return i;}	}		return res;
	}
	return null;
}
function valueInArray(arr, val){
	let chekid=idInArray(arr,val);
	if( chekid!==false ){	return arr[chekid];}
	saylog('WARNING get '+val+' in '+arr+' is null');
	return null;
}
function numerize(parsestring){ 	return parseFloat(parsestring);	}/** 
*NOTE: parseFloat will return int or float in beginning of string *parse to number (or NaN if string not begin with number )  *avoid overwrite toNumber that a no-usable function but still could be used *whatever*/
function toNumber(parsestring){	return parsestring*1;	}/** parse to number if possible*/
/** /////////////////////////////////////////////////////////////////////
* getType : penser à l'utiliser
* ///////////////////////////////////////////////////////////////////////*/
function getType(objet){	return (typeof objet);}
/**	CONDITIONAL		
------------------------------------------------------------------------------*/
 
function isReal(any){		return any!==null && typeof any!=='undefined' ? true:false }
function isReality(any){	return isReal(any)?  (any!='' ? true:false) : false;}// AJOUT 16AOUT2018 
function really(any){ 		return isReality(any);}//-- shorten isReality ajout 10/2020
function isEmpty(any){		return isReal(any)? any!=[] && any!={} && any!='' ? false : true : null;}//-- AJOUT 18/08/2018
function isEmptyString(str){return str==='' || str==' '?true:false; }
/** ///////////////////////////////////////////////////////////////////////
*	isHtml / isHTML 
///////////////////////////////////////////////////////////////////////// */
function isHtml(any){		return isReal(any.tagName) || isReal(any.nodeName) ? true : false }
function isHTML(any){		return isReal(any.tagName) || isReal(any.nodeName) ? true : false }/** facilitateur isHTML */
function isElement(any){	return any.nodeType === 1? true:false}
/** isElement * NOTICE : the function name may be confusing 'isElement' test IF HTMLElement */
function isHtmlElement(any){return isReal(any.tagName) && any.toString().indexOf('object HTML')>-1 ? true: false }
function isSame(objet,objettest){	return objet === objettest ? true: false }
function isSameType(objet,objettest){	if(typeof objet === typeof objettest){return true;}return false;}
function isType(objet,objettest){	return isSameType( objet, objettest);}//-- shorten
function isEqual(item, testitem){	return item == testitem ? true : false }
function trueEqual(item, testitem){	return item === testitem? true : false }
//function isEqualTrue_AR(item, testitem){ return new Array(trueEqual(item, testitem), isEqual(item,testitem));}/** *combine , trueEqual, isEqual note * _AR is sufix to indicate returned value is ARRAY of values */

function isBool(value){	return typeof value === 'boolean' ? true : false}
function asBool(value){
	if(isBool(value)){	return true;}
	if (isInt(value)){	if(value<9){if(value===0 || value===1){	return true};	}
	return false;}
}
function isNumber(value){ return typeof value == 'number'? true: false }
function isNum(value){	return isNumber(value);}// isNum.prototype == isNumber();

function isPaar(value){	if(isNumber(value)){	if(!isInt(value) || value===0){	return 0;}if(value/2 == Math.floor(value/2)){	return true;}}	return false;}//-- added 18/08/18 (in first place) || value === 0 (or strictly equal ZERO)//-- 0 will no more be considered as paar or odd
function isOdd(value){	return !isPaar(value);	}/** reversed isPaar * you can use like this as same result:   !isPaar(13)  * CAUTION : isOdd could be retrieved while it's as easier to write !isPaar(v) for same result */

function isString(value){return typeof value == 'string'? true : false }
function isStr(value){	return isString(value); }/** isStr shorten isString */
function insensitiveCase(a,b){	if( isStr(a) && isStr(b) ){	return a.toLowerCase()===b.toLowerCase()?true:false}
	saylog('[functional]insensitiveCase : arguments are not both string.');return null;}
function ignoreCase(a,b){return insensitiveCase(a,b);}//-- shorten write

/** specialized numerics check 
* conditional arithmetics 
*/
function isInt(value){	if(isNumber(value)){if(Math.floor(value) == value){	return true}	return false;}	return false;}/*return null; }/** similar on some points of !isNaN(val) */
function isNotInt(v){	return parseFloat(isInt(v));}
function isInteger(value){	return Number.isInteger(value);}//-- will return false when string even if numeric int!
function isIntegerString(value){ if(parseFloat(value)===parseInt(value) && isInteger(parseInt(value))){return true;}	return false;}//-- return true if string only numeric int
//-- TODO : note should use modulo '%' for check in isMultiplier function  !!
function isMultiplier(value,multiple){	if(isNumber(value) && isInt()){if(Math.floor(value/multiplier) == value/multiplier){	return true}	return false;}	return null; }
function isFloat(value){	if(isNum(value)){if(Math.floor(value) == value){	return false}	return true;}	return null; }
/** TO REMOVE depreciated, useless, waste of time : keeping only for older version
// IMPORTANT : depreciated , better use regular comparator >,<,>=,<= although theses test functions will inform > and equal for greater to test //-- think to remove definetively? 
*/

function isDecimaMultiple(value){
	if( asBool(value) ){return true;}
	if( isFloat(value) ){	if( Math.abs(value)>0 && Math.abs(value<1) ){	return true;	} }/** checking gradients value between 1(true) and 0(false) as for htmlElementCANVAS.getContext('2d').globalAlpha */
}
function isDegreeAngle(angle){ if( isNumber(value) ){ if( Math.abs(value)<=360 ){ return true; } }
	return false;}
/** *---------------------- *CONDITIONAL		*-ARRAYS-*some MAP stuffs here too */
function floatOnly(val){	if(isFloat(val)){	return val-Math.floor(val); };if(isNum(val)){	return 0;}	return null;}

function isArray(val){		return val.constructor === Array ? true: false;}
function isArrayType(val){	return Array.isArray(va);}
function isMap(val){		return val.constructor === Map ? true : false}

function first(arr){	if(arr.length>0){	return arr[0];}else {			 return null;} }
function last(arr){		if(arr.length>0){	return arr[arr.length-1];}else { return null;} }
function second(arr){ if(arr.length>1){		return arr[1];}else{ 			 return null;} }
function beforelast(arr){		if(arr.length-2>-1){	return arr[arr.length-2];}else { return null;} }//-- avant dernier en anglais???

/** conditional evalute and return Type*/
/**depreciated functions : orStringArray , oStaR USE function toArray instead  !!  (that)'ll require  [] || ''
*/
function orStringArray(param){/**will if a string return Array[param] if Array return param if other return new Array() */
	if(isArray(param)){		return param;}
	if(isStr(param)){		return [param];	}
	saylog('ERROR:  param : must be String or Array ! wrong parameter,'+param);
	return new Array();
}
function oStaR(p){			return orStringArray(p);		}
function forceArray(value){/** same as orStringArray * plus let type 'number' as a possible value  in argument fn() */
	if(isArray(value)){	return value;	}
	if( isStr(value) || isNum(value)){	return Array.of(value);	}/** will return an Array[param] IF typeof param string OR numeric */
	if( isMap(value) ){	return arraysFromMap(value);	}/** return splitted Arrays Array[keys[...],vals[...]] */
	/** ADD other convert Object/function output ArrayLike  */
	
	return null;/** will return null for (unchecked) Object *Symbol, */
}
function asTab(v){	return forceArray(v);}
/* remplace orStringArray oStaR */
function toArray( param){ if(param.constructor.name === 'Array'){	return param;}	return Array.of( param );	} 
/** toArray 					* /!\ NOTICE /!\
* allthought shorter/quicker other convert function ALLTIME output=>ARRAY( even: new Array(null); )! return Array(param) 
*MIND THAT OTHER FUNCTIONS( on previous lines ) will output differents values i.e Map, string ..
*/

/** CONVERT TO ANOTHER PRIMITIVE VALUE */
function arraysToMap(keys,vals){/** *use 2 Arrays keys(MUST BE ARRAY[string...] and vals to convert in Map
*will set a null value is length of vals lower*/
	let m=new Map();
	for(let i=0;i<keys.length;i++){
		let preval,
			prekey;
		if(i>=vals.length){
			preval;
		}else{
			
			preval=vals[i];
		}
		
		if(isStr(keys[i])){	
		prekey=keys[i];			
		}else{
			if(keys[i].getName()!=='undefined'){/** if has method getName*/
				prekey=keys[i].getName();
			}else if(keys[i].getId()!=='undefined'){
				prekey=keys[i].getId();
			}else{
				prekey='default'+i;
			}
		}
		m.set(prekey, preval);
	}
	return m;
}

function asArray(value){	return forceArray(value);}//-- shorten forceArray
/** functional Math 
* this section could need another files.. for now and keep clear while other .mods not much as experiment */
/**
*convert and stir 'number' with Map *what a challenge in the JavaScript pit, files flooding the ground flwing the windows top of the tower. but that's another story not yet not untold indeed */
function numFloor( val , len=0 ){	if(len<1){return Math.floor(val);}	return Math.floor(val*Math.pow(len,10))/Math.pow(10,4);	 }


/** generate .random() values *//** *BETAVERSION ()=> random sorted on clock manually * wont use Math.Random but Date.getTime() instead *should have less security */
/** see also : Array.prototype.shuffle for a random value from array */
function rand0(max){return Math.round(Math.random()*max)}
function rand(max){return rand0(max)+1}
function randBool(){return rand(1) > 0 ?  true : false}
function randAt(min,max){return rand(max-min)+min;}
function dices(number,faces){let tmp=0;for(let i=0;i<faces;i++){tmp.push(rand(faces));}return tmp;}
function dicesroll(number,faces){let tmp=new Array();for(let i=0;i<faces;i++){tmp.push(rand(faces));}return tmp;}
function dicesPlus(number,faces,bonus){let tmp=new Array();for(let i=0;i<faces;i++){tmp.push(randAt(faces)+bonus);}return tmp;}
function randArray(arr){return arr[rand0(arr.length)];}//-- see also Array.prototype.shuffle
function decimalRandomize(decimale, multiplier=0.1 , useinteger = true, timevalue=timeNow() ){
	let t=timevalue;
	let res= t.toString().substring( t.length-decimale , t.length+1 );
	if(useinteger === false){	return res*multiplier;	}
	return parseInt(res*multiplier);	
}


/**
		** add a message at starting time
*/
function functionalOnScriptLoad( tx=timeNow() ){
	return isNum(tx) ? tx : timeNow();//-- return load ready time
}
/** function sayLog(tx)
*		*	not TO USE as a developpement log tool
*		for log see saylog who can be shut off by changing LOGmode LOGmode=!'verbiose'
*/

const LOADFUNCTIONAL=( functionalOnScriptLoad() );


/** Array AUGMENTED Object
*	
*/

Array.prototype.pushZ = 	function (v){ return this.includes(v)? warn('Array.pushZ :: CANT INSERT value :\n'+v+'\n is allready in Array'): this.push(v) }
Array.prototype.unshiftZ = 	function (v){	if(this.includes(v)){warn('Array.pushZ :: CANT INSERT value :\n'+v+'\n is allready in Array');return;}this.unshift(v);return this; }
Array.prototype.pushIf = 	function (v,cdt){ if(cdt===true){ this.push(v);} }
Array.prototype.pushZIf = 	function (v,cdt){ if(cdt===true){ this.pushZ(v);} }

Array.prototype.indexAddValue = function (i,inc){ this[i]+=inc; return this[i];}
Array.prototype.iAdd  = 		function (i,inc){ return this.indexAddValue(i,inc);}
Array.prototype.setIf = 		function (i,cdt,instr,args=null){
	let r;
	switch(cdt( this, args ) ){
		case true:	this[i]=instr(this); r=this[i];break;
		case false: r=r;break;
		default:	r=r; break;
	}return r;
}
Array.prototype.ifNext = function( i , test = function(a){return a?true:false;} ){
	return test( this[i] ) ? this[i] : ( test(this[i+1]) ? this[i+1] : null );
}
Array.prototype.ifPrev=function( i , test = function(a){
return true} ){	return test( this[i] ) ? this[i] : ( test(this[i-1]) ? this[i-1] : null );
}
/**	  Array.cropLast , 			Array.cropFirst		*/
Array.prototype.cropLast=function(i){	this.length=this.length-1;return this.length;}
Array.prototype.cropFirst=function(i){	this.reverse();this.length=this.length-1;this.reverse();return this.length;}
/**Array.prototype.crop=function(debut,end){	
	let t=[];
	this.slice(debut,end)
	return t[];//--create new Array without debut,end
}*/
Array.prototype.last=function(i){	return this[this.length-1];}
Array.prototype.relocate = 	function(i,ii){	if(i<this.length ){	this[ii]=this[i]; this[i] = null;}}
//-- changement(v.1.2.4 du previous name .allocate
Array.prototype.swap = 	function(i,ii){	if(i<this.length && ii<this.length){	let tmp=this[ii]; this[ii]=this[i];this[i]=tmp; return this;	}}
Array.prototype.orderLast = function(i){	return this.order(i,this.length);}
Array.prototype.orderFirst =function(i){	return this.order(i,0);}
Array.prototype.orderList = function(lst){
	let len=ii.length; 
	this.eachIndex(function(){
		while( isReal(lst[1])==true ){	if(this.length>1){this.order(lst[0],lst[1]);	lst.shift();	lst.shift();	}}
		if(lst[0]!==undefined && arr[0]!=null){	this.orderLast(lst[0]);}}
	);
}

Array.prototype.shuffle  = 	function(count){	this.eachIndex(function(){	this.order( Math.floor( Math.random()*(this.length+1) ) );});}

Array.prototype.has = 		function( val ){	return idInArray(this,val);/** CAUTION : that will require functional.js fn idInArray * and there Array.includes(v= v?true:false *see added function Array.prototype.included(*/ }
Array.prototype.setByValue=	function( val , newval ){	if(this.has(val)!==false){	this[this.has(val)] = newval; }; }
/** Array.eachIndex	about :	SEE ALSO functions :  onceArray(arr,instr), forArray(arr,instr), forLength(arr,instr) */
Array.prototype.eachIndex =	function( instructions ,condition = true){//-- very like .forEach BUT will return modified Array if instructions alter it!!
	let res=new Array();
	for(let i=0;this.length;i++){
		if(condition===true ){ res.push( instructions( this[i] ) );	}//-- changement 16/08/18 ! const TRUE()
	}
	return res;/** return array of instructions => result(s) where condition match	*/
}
Array.prototype.totalize = function(){/** total with only parseFloat values * WONT WORK IF one values isNaN */
	let c=0; for(let i=0;i<this.length;i++){c+=parseFloat(this[i]);}	return c; 
	}/** return NaN if parseFloat(Array[i]) === 'NaN' */
Array.prototype.tot = 		function(){/** total with any values ( isNaN values WONT BE ADDED in total )* work even if values isNaN */
	let c=0.0;
	for(let i=0;i<this.length;i++){
		let v=parseFloat(this[i]);
		if(	isNaN(v) ){
			saylog('unable to parse number at index: '+i);		
		}else{
			saylog('parsed to '+v );
			c+=v;
		}
	}
	return c;
}