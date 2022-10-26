/** functional.element.js
** is about HTMLElement view
	*	require functional.VERSION.js 
	*	to use functions isArray, toDom, setAttr
*/
function setParams(tag, params={}){
	for (let k in params){
		saylog(tag.nodeName+' set '+k+': '+params[k]);
		switch(k.toLowerCase()){
			case 'inner':	tag.innerHTML = params[k];
			break;
			case 'classname':tag.className = params[k];
			break;
			case 'add':toDom(params[k], tag);
			break;
			case 'addlist': //-- CAUTION: MUST BE [HTMLElement,...] OR HTMLElement
			if( isArray(params[k]) ){	for( let i=0;i<params[k].length;i++){	toDom(params[k][i], tag) }
			}else{ toDom(params[k],tag) }
			break;
			default:setAttr(tag, k, params[k]);
			break;
		}
	}
	return tag;
}

function Element(tagname, params){//-- params === {}
	return setParams(newTag(tagname), params)	
}
/**	function ElementParentChilds
** add parent and childs Elements
*	args.listtagchilds[ARRAY] of String(tagname) && argslistparamchilds[ARRAY] of Object  MUST have same length
*/
function ElementParentChilds(tagparentname, paramparent, listtagchilds, listparamchilds){
	let parenttag= Element(tagparentname, paramparent)
	for(let i = 0; i<listtagchilds.length; i++){
		let t= Element(listtagchilds[i], listparamchilds[i])
		toDom(t, parenttag)
	}
	return parenttag;
}
//-- shorten ElementParentChilds
function ElementChilds(tagparentname, paramparent, listtagchilds, listparamchilds){
	return ElementParentChilds(tagparentname, paramparent, listtagchilds, listparamchilds)
}

function ElementsArrayList(tagnamesList, paramsList){//-- args = Array
	let t=[]
	for(let i = 0, len=tagnamesList.length; i<0; i++){
		t.push(Element(tagnamesList[i], paramsList[i]))
	}
	saylog('ElementsArrayList length:'+t.length)
	return t;
}
function ElementListAppend(targetTag, tagnamesList, paramsList){
	for(let i = 0, len=tagnamesList.length; i<len; i++){
		toDom(Element(tagnamesList[i], paramsList[i]), targetTag)
		saylog('ElementListAppend '+tagnamesList[i]+' to '+targetTag)
	}
	return targetTag
}