/** send if not exust allreadyin functional.js
*/
function mapper(keys,values){//- create a Map with arguments Arrays
	let m = new Map();
	for(let kv=0;kv<keys.length;kv++){
		m.set(keys[kv], values[kv]);
	}
	return m;
}

// functional.element.js is about DOM document and DOM elements
// require functional.js
/** interfaces creation element tag  */ 
function newTagAttr( name, atrMap){//-- attrmap typeof Map, use fn mapper(keys,values)/** CREATE A TAG WITH SPECIFIED ATTRIBUTES */
	let t=newTag(name);
	return tagAttr(t,atrMap);
}
function tagAttr(tag,atrMap){//-- typeof atrMap === Map use fn mapper/** CREATE/ALTER attributes of a tag (or new tag) */
	let t;
	if(isStr(tag)){ t=newTag(tag);}
	else if(isNode(tag)){ t=tag;}
	for (let entry of atrMap.entries()) {//-- entries() iterator
		if(entry[1]!==undefined){//-- avoid the null value 
			setAttr(t,entry[0],entry[1]);
		}
	}
	return t;
}
function newTagContent(name, contents){//-- conts typeof Array or String/** CREATE a new tag with Content(s) */
	let t = newTag(name);
	return tagContent(t,contents);
}
function tagContent(tag,contents){//-- extends the content of a tag OR create a new one
	contents=oStAr(contents);
	let tc;
	if(isStr(tag)){ tc=newTag(tag); }
	else if(isNode(tag)){	tc=tag; }
	else{	ilog('CAUTION : unable to compute origin Node '+tag); }
	for(let c=0;c<contents.length;c++){
		if(isNode(contents[c])){
			tc.appendChild(contents[c]);
		}else if(isStr(contents[c])){ 
			say(tc,contents[c]);  
		}else{
			saylog('out of type expression : '+typeof contents[c]);	
		}
	}
	return tc;
}
function newTagAttrConts(name, atrMap,contents){
	return tagContent(tagAttr(name,atrMap), contents);
}
function newTAC(name, atrMap,contents){ return newTagAttrConts(name, atrMap,contents); }//-- shorten write newTagAttrConts

function serieTags(nametag, count, ids){
	let df=new DocumentFragment();
	for(let i=0;i<count;i++){
		df.appendChild(newTag(nametag));
		if(ids[i]!==undefined){	df.lastChild.id=ids[i];}
	}
	return df;
}

/** Global wrapper * wrapping new tag around other one*/
function newTagAround( tagname, towrap ){	return destIn(towrap ,newTag(tagname)); }//-- wrap towrap in new tag // return new tag
function newTagBox( tagname, boxed ){ return toDom(boxed, newTag(tagname));}//-- same as newTagAround BUT return back the inside tag (boxed)

/** Element.attributes get, set, alter... */
function nodeTip(tag,title){ tag.title=title; return tag; }
function tip(aim,tit){return nodeTip(aim,title);}//-- shorten nodeTip
function nodeAlt(tag,alt){ return setAttr(tag, 'alt',alt);}


/** create HTMLNamedElement *quick write and return */
//Basic HTML

function pText(txt){ return textTag('p',txt); }
function spanText(txt){ return textTag('span',txt); }

function hTag( txt, lv=1 ){	return textTag('h'+lv,txt);}

function br(){	return newTag('br');}
function comment(tx){	return '<!--'+tx+'-->'; }// -- type: string
//function infoText(tx){	return '//** *'+tx+'*/';}// -- typestring -- write '*' for each (normalized) new line
//Formating 
function abbrTag(abbr,title){ return say( nodeTip( newTag('abbr'), title ), abbr );	}
function adressTag(tx){ return textTag('adress',tx); }//-- TODO: make a regular adress list ! add microdata 
/** ABOUT ADRESS TAG
*Tip: The <address> tag should NOT be used to describe a postal address, unless it is a part of the contact information.
*Tip: The <address> element will typically be included along with other information in a <footer> element.
*/

function bTag(txtortag){
	if( isStr(txtortag) ){ return textTag('b', txtortag); }
	if(	txtortag.tagName!==undefined){	return toDom( newTag('b'), txtortag); }
 }
 //-- <bdo> && <bdi> NOT TREATED --//-- 
function quoted(tx){	return textTag('blockquote', tx); }/** define a section quoted from another source */
function quot(tx){return textTag('q',tx);	}//<q> define a short quotation
function cited(tx){	return textTag('cite',tx); }//<cite>	Defines the title of a work

//-- PHRASE TAG //-- most(ly depreciated// NOT (yet? or no) treated <em><strong><small><code><samp><kbd><var>
//-- other not treated : <del><i><ins><kbd>
function dfnTag(df,tx){	return toDom( textTag('dfn', df), setId(textTag('p',tx) ), dfn);}//-- The <dfn> tag represents the defining instance of a term in HTML.
function marked(tx){ return textTag('mark', tx ); }//	Defines marked/highlighted text HTML5
function pre(tx){ textTag('pre',tx); }
function progress(value,max,tip=''){//-- set a string to something other than '' to display a tooltip on rollover !
	let t= setAttr(setAttr( newTag('progress'),'max', max), 'value', value );
	if(tip!=''){nodeTip(t,tip);}	return t;
}//-- The <progress> tag represents the progress of a task. HTML5
function subText(tx){return textTag('sub', tx);}//Defines subscripted text
function supText(tx){return textTag('sup', tx);}//Defines superscripted text
function timeTag(timetext,datetime=null){
	let t=textTag( 'time', timetext);
	if(datetime!==undefined){	setAttr( t, 'datetime', datetime);}
	return t;
}// define a time and/or date HTML5

/** TODO //see: file:///C:/Users/cash/Documents/biblos/cours_js/www.w3schools.com/tags/tag_meter.html
function meter(){}// <meter>Defines a scalar measurement within a known range (a gauge)
*/
//NOT TREATED <rp> ruby annotations, <rt>Defines an explanation/pronunciation of characters (for East Asian typography),
//s

/** Element(s) as general container (semantic) */
function newHeader(){	return newTag('header');}
function newHeaderId(id){	return newTagId('header',id);}
function newMain(id=null){	if(id===undefined){	return newTag('main');}	return newTagId('main',id);	}
function newFooter(id=null){	if(id===undefined){	return newTag('footer');}	return newTagId('footer',id);	}

function newNav(id){	return newTagId('nav',id); }

function newSection(id=null){	if(id===undefined){	return newTag('section');} 	return newTagId('section',id); 	}
function newArticle(id=null){	if(id===undefined){	return newTag('article');}	return newTagId('article',id); 	}

function newAside(id=null){		if(id===undefined){	return newTag('aside');}	return newTagId('aside',id); 	}//-- not supported IE8and <
//-- duplicated from functional.webpage.js//-- delete one of them to keep only in one file (todo later)
/** articleHId moved to functional.1-0.js
*
function articleH(title,hlevel){
	return destIn( say( newTag('h'+hlevel), title),newTag('article') );
}
function aH(t,lv){return articleH(t,lv);}// shorten articleH 

* create Article+Hx with Article id 
function articleHId(id,title,hlevel){	return setId( articleH(title,hlevel), id ); }

function aHId(id,tt,hl){	return articleHId(id,tt,hl);}// shorten articleHId
*/
/** create Section with 'n' articleH *(article with an Hx title)* PARAMS are both array, array(s).length define the number of articles in section*/
function sectionArticleH(titles,lvs){
	lvs=oStAr(lvs);
	let rs=newTag('section');
	for(let art=0; art<titles.length;art++){
		if(lvs.length<art){lvs.push(lvs[lvs.length]);}//-- if Array lvs < count of titles use last of value to add one
		if(lvs.length<art){lvs.push(lvs[lvs.length]);}//-- if Array lvs < count of titles use last of value to add one
		rs.appendChild(  articleH(titles[art], lvs[art] ) );	
	}
	return rs;
}
function sectionArticleHId(sectionid, ids, titles, lvs){/** sectionid string , ids Array ids articles, titles string Hcontent content, lvs Array H'lvs[i]'  */ 
	if(ids.length!==titles.length){	warn('wrong arrays sizes '+titles+' and '+ids+' MUST HAVE SAME length');	return;	}
	let rs=setId(sectionArticleH(titles,lvs),sectionid);
	if(rs===undefined){ return;}
	setId( rs.getElementsByTagName('section'), sectionid );
	let articles= rs.getElementsByTagName('article');
	for(let i=0;i<articles.length;i++){ setId( articles[i], ids[i] );saylog('article id set '+ids[i]); }
	return rs;
}
function sAHId(ids,titles,lvs){return sectionArticleHId(idsec,ids,titles,lvs);}/** shorten sectionArticleHId */
function sahid(ids,titles,lvs){return sectionArticleHId(idsec,ids,titles,lvs);}/** another shorten sectionArticleHId */

//-- end ajout from functional.webpage.js

function newDiv(id=null){if(isStr(id)){return newTagId('div',id);}return newTag('div');}
function divH(id,htext,hlv){ return destIn( hTag(htext,hlv), newTagId('div', id) );	}

//-- list elements (ul ol, ...menu, menuitem 
function newTagList(id,countLi,ordered=false){
	let typelist= ordered===true ? 'ol' : 'ul';
	let t=newTagId(typelist,id);
	if( isInt(countLi) ){
		for(countLi;countLi>0;countLi--){	t.appendChild(newTag('li')); }
		return t;
	}else if(isArray(countLi)){//-- add string or element in li 
		for(let i=0;i<countLi.length;i++){	t.appendChild(tagContent( newTag('li'), countLi[i] ) ); }
		return t;
	}else{
		warn('wrong paremeter countLi must be Integer or Array[String/Element]');
	}
}

function newDescriptionList(id,terms,descriptions){//-- parameters are both Array
	if(terms.length===descriptions.length && isArray(terms)){
		let t=newTagId('dl',id);
		for(let i=0;i<terms.length;i++){
			t.appendChild(textTag('dt',terms[i]));
			t.appendChild(textTag('dd',descriptions[i]));
		}
		return t;
	}else{
		warn('wrong parameters: terms, descriptions must be Arrays of both length');
	}
}
//-- menu, menuitem SUPPORTED ONLY IE,Firefox

//-- table element
function newTable(id,colcount,linecount,caption=null){
	let t=newTagId('table',id);
	if(caption!=null){	tagContent(t,caption);}
	let tr;
	for(let i=0;i<linecount;i++){
		tr=toDom(newTag('tr'),t);
		for(let j=0;j<colcount;j++){
			tr.appendChild(newTag('td'));
		}
	}
	return t;
}
//-- TABLE colgroup, col, th,thead,tfoot,tbody 


//-- a file:///C:/Users/cash/Documents/biblos/cours_js/www.w3schools.com/jsref/dom_obj_anchor.html , link and others too

function anchorDownload(href,tx){
	let t=setAttr(say(newTag('a'),tx), 'href', href);
	t.download=href;
	return t;
}
function newAdownload(href,dl,tx){ return anchorDownload(href,tx);}
//-- from w3Cschools.com 'style and semantics' do the semantics(of those who aren't done) tag IMPORTANT todo 

//-- meta info // put some newTag(... premaid functions
function newMeta(attr){/** CAUTION : ONLY ONE ATTRIBUTE WILL BE SET !! */
	let t=newTag('meta');
	attr=attr.toLowerCase();
	switch(attr){
		case 'content':t.content=attr; break;
		case 'httpequiv':t.httpEquiv=attr; break;
		case 'name':t.name=attr; break;
		default:setAttr(t,attr); break;
	}
}

//__ add the Programming HTML Elements 



/** OTHER TAG WHO SHOULD HAD THEIR OWN(or not)
*see below
*all of this is TODO 
 */
//-- for HTML Element <form> and dependancies(like <input type=...) see file functional.form.js 

//-- IMG are in functional.js(basic functions) and some other file(functional.element.img.js to create ?
//-- TODO img(usemap) with map and area 

/** figure containing figcaption and img */
function figureImg(idfig,src,alt,idimg=null){
	let im= idimg===undefined ? newTagImg(src,alt):tagImgId(src,alt,idimg);
	return destIn(im,newTagId('figure',idfig));
}

function newDetails(id,summary,open=false){//-- parameter: summary is string(text node) or array(textnode, HTMLelement)
	let t=tagContent(newTagId('details',id),summary);
	if( open===true ){ t.open=true; }
	return t;
}

//-- AUDIO/VIDEO tag (basic)
function newAudio( id, mpeg,ogg, wav, attrMap=null ){/** authorized attrMap(Map) autoplay=autoplay, controls=controls,loop=true,muted=muted,preload,src=url *note that no need for src cause <source> will provide it */
	let t=newTagId('audio',id);
	say(tagAttr(t,attrMap), 'Your browser do not support the audio tag.');
	if(mpeg!==undefined){	t.appendChild(setAttr( setAttr(newTag('source'),'type','audio/mpeg'),'src',mpeg)); }
	if(ogg!==undefined){	t.appendChild(setAttr( setAttr(newTag('source'),'type','audio/ogg'),'src',ogg)); }
	if(wav!==undefined){	t.appendChild(setAttr( setAttr(newTag('source'),'type','audio/wav'),'src',wav)); }
}
function newVideo(id,sources,types, controls=true, w=null, h=null){
	let t = say(newTag('video',id),'Your browser do not support the video tag.');
	if(controls===true){	setAttr(t, 'controls', controls); }
	if(w!==undefined){	setAttr( t,'width', w);  }
	if(h!==undefined){	setAttr( t,'height', h); }
	if(sources.length === types.length){
		for(let i=0;i<sources.length;i++){
			t.appendChild( setAttr(setAttr( newTag('source'), 'src',sources[i]),'type','video/'+types[i]) );
		}
	}
	return t;
}//-- see mediaplayer for more
function addTrack(mediatag,src,kind,srclang,label){//-- is for audio, video subtitles
	mediatag.appendChild( tagAttr( newTag('track') , mapper( ['src','kind','srclang','label'], [src,kind,srclang,label] ) ) );
	return mediatag;
}
/** see native : .addTextTrack : CAUTION NOT supported in any browser for now!
var text1 = myVid.addTextTrack("caption");
text1.addCue(new TextTrackCue("Test text", 01.000, 04.000, "", "", "", true));
*/
//-- other media / inpage program
function newEmbed(id,src,type){
	let t=newTagId('embed',id); t.src=src; t.type=type; return t;
}
/**The <object> tag defines an embedded object within an HTML document.
* Use this element to embed multimedia (like audio, video, Java applets, ActiveX, PDF, and Flash) in your web pages.
*You can also use the <object> tag to embed another webpage into your HTML document.
*/
function tagObject(id,type,data,paramMap=null){//-- params is Map of attribute// see function tagAttr( name, atrMap)
	let t=newTagId('object',id);
	setAttr( setAttr( t, 'data', data ), 'type', type);
	if(paramMap!==undefined){//-- add <param>
		tagAttr(toDom(newTag('param'),t), paramMap);//-- add attributes CAUTION SHOULD BE name= , value= ...
	}
	return say(t,'NOT supported '+data+' of type '+type+' in your browser.');
}
function newParamTo(aim, name, value){//-- aim MUST be tag <object>
	return destIn( setAttr( setAttr(newTag('param'),'name',name),'value',value ), aim);
}//-- will return the object container(<audio> or <video>)

