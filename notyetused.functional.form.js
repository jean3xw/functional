/** about HTML form 
*	require functional.js
*/
"use strict";
/** IMPORTANT 
*check if NOT allready EXIST SO ADD TO functional.js(perhaps qame fn in another file
*/
function newFragment(elems){/** use array or unique HTMLElement */
	elems=orStringArray(elems);
	let frag= document.createDocumentFragment();
	for(let elm=0; elems.length<elm; elm++){
		frag.appendChild(elems[elm]);
	}
	return frag;
}
function brosTag(tab){	return newFragment(tab);}// -- shorten write 

function newTagName(tagname, attrname){
	return setAttr(newTag(tagname), 'name', attrname);
}
/** functional.form.js*/
function placeholder(tag,txt){ if(typeof tag.placeholder!=='undefined'){ tag.placeholder=txt; } return tag; }

function newForm(id, action='self', methd='get'){
	let tmp=newTagId('form',id);
	if(action!=='self' && isStr(action)){
		tmp.setAttribute('action', action);}
	if(typeof methd!=='undefined' && methd!==null){
		methd=methd.toLowerCase();
		if(methd==='get' || methd==='post'){	tmp.setAttribute('method', methd);
		}else{
		saylog('wrong method parameter');
		}
	}
	return tmp;
}
function newFormMethod(id, act='', meth='post'){
	return setAttr(setAttr(newForm(id), 'action', act),'method', meth );	
}
function newFormContainer(id,name){ return setId(newTagName('form',name),id)}//-- will have no method and will not reload page// TODO add the novalidate attribute
	/**formField create <fieldset><legend> * fragment parameter IS document.createDocumentFragment()*/
function formField(anyform, legend, fragment=null){//-- appended to the form, got no id
	let f=newTag('fieldset');
	f.appendChild( say(newTag('legend'),legend) );
	if(fragment !== null && typeof fragment!=='undefined'){f.appendChild(fragment);	}//-- can be HTMLElement || DocumentFragment
	toDom(f, anyform);
	return f;
}
function newFieldset(id, legend, cont=null){//-- got id, not appended 
	let f=newTagId('fieldset',id);
	f.appendChild(say(newTag('legend'), legend) );
	if(cont !== null && typeof cont!=='undefined'){
		let t=orStringArray(cont);
		t.forEach(function(it){
			if(typeof it.tagName!=='undefined' || it instanceof DocumentFragment){
				f.appendChild(it);
			}else if(isStr(it)){
				say(f,it);
			}else{
				saylog('wrong type to add content: '+it);
			}
		});	
	}//-- can be HTMLElement || DocumentFragment
	return f;
}

function labelize(anyinput, txt){/** return fragment with (label,input)   */
	let id=idGet(anyinput);
	if(id===undefined || id===null || id===false){	/** set an ID if none */
		if( anyinput.getAttribute('name')!==undefined ){//-- ID is name+random
			id=''+anyinput.getAttribute('name')+rand0(10)+rand0(20);
 		}else{	//-- make a random ID with type
			id=''+rand0(10)+anyinput.getAttribute('type')+rand0(20);
		}
		return setId(anyinput,id);
	}
	let df=document.createDocumentFragment();
	let l=newLabel( id , txt);
	df.appendChild( l );
	df.appendChild( anyinput );
	seelog('label: '+l+' of \n\t	input: '+anyinput);
	return  df;
}/**CAUTION: will NOT APPEND FRAGMENT TO FORM!!! */

function formLabel(aform, aninput, txt){/** this ONE will append to form*/
	return toDom( labelize(aninput, txt ), aform );/** return a DocumentFragment obj*/
}
function newLabel(idfor, txt){	return say( setAttr( newTag('label'),'for', idfor), txt ); }
/** fn lbl(.. similar to fn newLabel(.. except a safe mode meaning only an existing tag id can be set to attribute 'for'
* by default it'll do the same as fn newLabel 
* set forceid param to false and label WILL NOT BEING CREATED IF no tag with idfor EXIST (
*/
function lbl(idfor,txt, forceid=true){	if(getId(idfor)!==undefined || forceid===true){
	return newLabel(idfor, txt);}	return false; 
}

//function labelOf(anyform, idfor, txt){	anyform.insertBefore( newLabel(idfor,txt), getId(idfor) ); }// AVERIF !!!
function newInput(type, id, name, value=null, label=false){/** fill label with string keyword */
	let inp=setAttr(setAttr(newTagId('input' , id),'type',type),'name',name);
	if(value!==null){	setAttr(inp, 'value', value);	}
		seelog('created input :'+inp);
	if(label===false ||  !isStr(label) ){
		return inp;
	}else {
		seelog('with label '+label);
		return labelize(inp, label);
	}
	
}
/** TODO complete formElement as a general form element creator !*/
function formElement(type, id, name, value=null, label=false){/** fill label with string keyword */
	let tagname, elem;
	
	switch(type){
		case'textarea':	elem=newTextarea(id,name,label);	break;
		
		default:
			elem = newInput(type, id, name, value=null, label=false);
		break;
	}
	return elem;
}
/** INPUT each differents TYPES */
//USING some function newInput(type, id, name, value=null, label=false){
function newInputText(id, name, label=false){	return newInput('text', id, name,null, label); }

function newInputCheckbox(id,name,value=null,label=false){
	return newInput('checkbox',id,name,value,label);
}
function addCheckboxSerie(aim,count,name,idpre,lbl=false){
	let tablbl=[];
	for(il=0;il<count;il++){tablbl.push(lbl);}
	for(let i=0; i<count; count++){
		aim.appendChild(newInputCheckbox(idpre+'i',name,name+'i',tablbl[i]));
	}
	return aim;
}

function newInputRadios(name, values, textes,  checked=-1){//-- set to -1 MEAN NONE CHECKED (by default)
	let fg = document.createDocumentFragment();
	if(isArray(values) && isArray(textes)){
		if(values.length && textes.length){
			let r;
			for(let i=0;i<values.length;i++){
				r = newTagName( 'input', name );
				if( checked>-1 && i===checked ){ setAttr(r, 'checked', ''); }//-- or use r.checked=true;
				fg.appendChild(  
					labelize( setAttr(setAttr( r, 'type', 'radio'), 'value', values[i]), textes[i] )  
				);
			}
		}
	}
	return fg;
}
function addInputRadios(anyform, name, values, textes, fieldlegend='' ,checked=-1){
		return formField(anyform,fieldlegend ,newInputRadios(name, values, textes, checked=-1));
}

function newTextarea(id, name, label=false){
	let ta=newTagId('textarea', id);
		if( label===true || isStr(label) ){
			return labelize(ta, label);/* return DocumentFragment WITH (label, textarea) */
		}
	return ta;/* return HTMLTextareaElement */
}
function textArea(id, name, label=false){	return newTextarea(id, name, label=false);	}

function formSelect(id, name, descript, optVals, optIns=[null]){/** params could use a better interface! */
	let fso= setAttr(newTagId('select',id), 'name', name);
	let myopt;
	optVals=orStringArray(optVals);
	optIns=orStringArray(optIns);
		for(let opt=0;optVals.length>opt;opt++){
			if( optIns[opt]===null || optIns[opt]===undefined){ optIns[opt]=optVals[opt];}/** IF NONE SET use value as html str content */
			myopt=say( setAttr( newTagId('option',id+opt ), 'value', optVals[opt] ), optIns[opt]);
			fso.appendChild( myopt );
		}
	return labelize(fso,descript);
}

function newInputNumber(id,max=null,min=null){//-- used for number or date //-- HAVE NOT LABEL
	let t= newTagId('input',id);
	setAttr(t,'type','number');
	if(max!==undefined){setAttr(t,'max',max);}
	if(min!==undefined){setAttr(t,'min',min);}
	return t;
}
/** setting input attributes */
function setInputAttributes(input, sets={placeholder:'input text here'} ){
	let check=function(){
		for(let match in sets){	if( sets[match] !== 'none' ){	
			seelog('setting '+	match);
			input.setAttribute(	match, sets[match]);	}
		}
	}
	check();
	return input;
}
/** USING litSetInput [object litteral] as interface(param to setInputAttributes 
* BEWARE : setting id will not update the previous label 'for' attribute,
	matching input id at creation(fn labelize) or self setting id(if none yet from name(or type if none) !!!
* CAUTION : changing type could implicate previous attribute will no more match
*/
function litSetInput(type='none', id='none', name='none', value='none', placeholder='none'){
	return {
		type:type,
		id:id,
		name:name,
		value:value,
		placeholder:placeholder
	}
}
/** inputSet shorten write of litInputSet */
function inputSet(type='none', id='none', name='none', value='none', placeholder='none'){	
	return litSetInput(type, id, name, value, placeholder);
}
/** same as litInputSet BUT with (nearly)whole possible attributes(specific to input 
* TODO : add same litteral object & interface for global attributes (HTMLElement) */
function litSettingsInput(type, id, name='none', value='none',
 autocomp='none', autofocus='none', checked='none', disabled='none', idform='none', 
 formnovalidate='none', max='none', maxlength='none',min='none',multiple='none',
 pattern='none',placeholder='none', readonly='none',required='none', step='none'){
	return {
		type:type,
		id:id,
		name:name,
		value:value,
		autocomplete:autocomp,
		autofocus:autofocus,
		checked:checked,
		disabled:disabled,
		form: idform,//-- is attribute 'form' Specifies one or more forms the <input> element belongs to
		formnovalidate: formnovalidate,
		max:max,
		maxlength:maxlength,
		min:min,
		multiple:multiple,
		pattern:pattern,/* use regexp */
		placeholder:placeholder,
		readonly:readonly,
		required:required,
		size:size,
		step:step
	}
}
/** INTERFACE making/Settings  litSettingsInput && litInputSet WITH  setInputAttributes 
see EXAMPLE IN test.functional.form.js
*/


function addFormInput(anyform, addtag, place='after'){//no Input type attribute defined
	seelog('place to'+place);
	
	switch(place.substring(0,8)){
		case 'after':
		seelog('after');
		anyform.appendChild(addtag);
	break;
	case'before'://-- same as default --// TODO : may add other case!
		seelog('before');
		anyform.insertBefore(addtag,anyform.firstChild);
	break;
	case 'fieldset' ://-- ADD INTO anyform child fieldset<index:int>
		seelog('o');
		if(anyform.getElementsByTagName('fieldset').length >= parseInt(place.substring(8))){
		anyform.getElementsByTagName('fieldset')[parseInt(place.substring(8))].appendChild(addtag);
		}else{warn('WRONG fieldset index: '+place.substring(8));}
	break;
	default:
		seelog('default');
		anyform.insertBefore(addtag,anyform.firstChild);
	break;
	}
	return anyform;
}
function addInputText(anyform, inputid, inputname='', placeholder='', place='after', label='auto'){
	let i = setAttr(newTagId('input', inputid), 'type', 'text');
	
	if(inputname===''){inputname=inputid;}//-- if blank inputname using same as id !
	setAttr(i, 'name', inputname);//--  always add a name attribute
	if(placeholder !==''){
	setAttr(i, 'placeholder', placeholder);
	}
	if(label!==false){
		let il;
		if( label==='auto' || label===true ){
				il=labelize(i, i.getAttribute('name') );				
		}else if( isStr(label) ){
			il=labelize(i, label);
		}
		if(il!==undefined){		i=il;	}
	}
	
	return addFormInput( anyform, i, place);
}

function newFormInputText(formid, inputid,inputname='', placeholder='', place=''){
	return addInputText( newForm(formid), 'testinputtext', 'nametext', placeholder, place);
}


function newFormSelect(selectid, listoptions, optvalues= null ){
	

}

function submiter(formbox, val, type='submit', alt='submit'){
	let subm;
	switch(type){
		case 'submit':subm = setAttr(setAttr(newTag('input'),'type',type),'value',val);
		break;
		case 'submitbutton':subm=setAttr(setAttr(newTag('input'),'type','button'),'value',val );//-- WILL NOT TRIGGER form.submit();
		break;
		case 'button':subm=setBtAround( val, val, val );
		break;
		default: warn('wrong submiter type');
		break;
	}
	if(subm === undefined ){ return null; }
	return toDom( setAttr(subm, 'alt', alt), formbox );
}
function submitAct(anyfunc,formbox,val,type='submitbutton',alt='submit'){//-- anyfunc is a function(closure or named) triggered by 'click'
	let actof=submiter(formbox, val, type, alt);
	if(type==='submit'){
/*		formbox.noValidate='novalidate';
		actof.formNoValidate='formnovalidate'; *HTML5 features tofix * so setted to type='button' */
		setAttr(actof,'type','button');
		
		}
/**	alert(anyfunc);
	alert(actof);*/
	listen(actof, 'click', anyfunc);
	return actof;
}
/** NOTES:
*------------------------------------------------------------------------------------
* dev diary:
*------------------------------------------------------------------------------------
* TODO LIST add polyfill input type=color (color picker) for IE, SAFARI who don't have feature
*/