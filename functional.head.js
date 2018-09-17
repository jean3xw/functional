"use strict";
/** functional to migrate OUT THIS FILE*/
function createIfNone(parentnode, tagname){let chk = parentnode.getElementsByTagName(tagname)[0];
if(chk === undefined){chk = document.createElement(tagname);parentnode.appendChild(chk);}return chk;}
function orCreate(parentnode, tagname){	return createIfNone(parentnode, tagname);}
/** -------------------------------------------------------------------------------------------------------------------------------
* functional.head.js version 0.3	date 28 12 2017,lastupdate: 15 02 2018
/-------------------------------------------------------------------------------------------------------------------------------*/
/** *functional.head * ANYTHING ABOUT HTMLElement head */
/** get <html> tag  */
function pageholder(){	return document.getElementsByTagName('html')[0];	}/** => <html>...</html>*note see Element.nodeRoot or something like it */
function pagehtml(){	return pageholder();}/** alias pageHolder */
function htmltag(){	return pageholder();}/** alias pageHolder */
/** *THIS FUINCTION IS DISABLE BY DEFAULT !!!NOTE THAT IS DANGEROUS FUNCTION WHO'll CLEAR ALL PAGE CONTENT !!!
*
function clearPage(){pageholder().innerHTML='';return pageholder();}
*/ 
/** html . head tag */
/** htmlHead() *WARNING : document.head better(although it'll not create a new tag if no exist */
function htmlHead(){let hed=document.getElementsByTagName('head')[0];
if(body() === null){document.getElementsByTagName('html')[0].appendChild(document.createElement('body'));}
if(hed === null){hed=document.createElement('head');document.getElementsByTagName('html')[0].insertBefore(hed, body());}return hed;
}
/** Head(append=null) *NOTICE THIS ONE WRITE LESSER CODE but won't create <head> if none ! */
function Head(append=null){if( !!document.head || document.head===undefined ){ return false; }
	if(append!==undefined){return [	document.head.appendChild(append),document.head.childNodes.length]}	return document.head;}
/** *ERROR charset won't be initialized by script !! and can cause NS ERROR */
/*
function setCharset(charset = 'utf-8'){
	let meta=newTag('meta');
	meta.setAttribute('charset', charset);
	return htmlHead().appendChild(meta);
}*/

/** WARNING : document.title really easier !*/
function pageTitle(){return orCreate(document.getElementsByTagName('head')[0],'title' );}
/** dTitle() *quicker but won't create title if no exist*/
function dTitle(){return document.title;}
function setTitle(title){pageTitle().innerHTML = title;return pageTitle();}
function title(ttl = null){if(document.head === null){	htmlHead();}if(ttl !== null){return setTitle(ttl);}return pageTitle();}
function title(ttl = null){if(document.head === null){	htmlHead();}if(ttl !== null){return setTitle(ttl);}return pageTitle();}
/** functional style */
/** *create IF NOT EXIST a tag style */
function initStyle(){let styling = document.getElementsByTagName('style')[0];
	if(styling === undefined ){seelog('creating HTMLElementStyle ');styling=newTag('style');styling.setAttribute('type', 'text/css');styling.setAttribute('rel', 'stylesheet');document.getElementsByTagName('head')[0].appendChild(styling);seelog('PAGE style tag added ');
	}else{seelog('PAGE STYLE TAG allready EXIST '+styling);}}
/**  ADD INTERNAL PAGE CSS <HEAD><style>*/
/** pageStyle get/create if none <style> tag */
function pageStyle(){if( htmlHead().getElementsByTagName('style')[0]===undefined ){	initStyle(); }return htmlHead().getElementsByTagName('style')[0];}
function pageStyleToString(addcss=''){pageStyle().innerHTML = pageStyle().innerHTML+addcss;return pageStyle().innerHTML;}
//-- TODO : create and get Arrays of class/id... and props css + methods to check/replace/...
function styleToString(){return pageStyleToString();}
/** addPageStyle, addStyle WRITE any CSS Rule into <head><style> tag *//** NOTICE : TODO add chainable function -who'll use callback(<ith HTML<style>)  *//** NOTE: that 'rule' can contain any css props */
function addPageStyle(selector, rule){pageStyle().innerHTML+=selector+'{'+rule+'}';seelog('addPageStyle '+selector+'{\n'+rule+'}');return pageStyle();}/** ADD INTERNAL CSS IN THE <style> * NOTICE: only set INTERNAL/PAGE CSS !  */
function addStyle(selector, rules){ return addPageStyle(selector, rules);}/** shortcut addPageStyle */
function pageStyleCreateClass(classname, cssrules, prefix=''){	seelog('pageStyleCreateClass '+classname);	return addPageStyle(prefix+'.'+classname, cssrules);}
function addPageClass(cname,css){	return pageStyleCreateClass(cname,css);}/** alias pageStyleCreateClass */
function pageStyleCreateId(idname, cssrules, prefix=''){ seelog('pageStyleCreateId id'+idname); return addPageStyle(prefix+'#'+idname, cssrules);}
function addPageId(idname, cssrules, prefix=''){	return 	pageStyleCreateId(idname, cssrules, prefix='');}