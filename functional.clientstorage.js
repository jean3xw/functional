/** functional.clientstorage.js lastupdated:28/02/18
* * IS ABOUT STORAGE ON A LOCAL computer
*/

function supports_html5_storage() {//-- very same as function supports_local_storage() @functional.polyfill.js
return ('localStorage' in window) && window['localStorage'] !== null;
}
console.log('supports_html5_storage() is '+supports_html5_storage());
/*
interface Storage {
getter any getItem(in DOMString key);
setter creator void setItem(in DOMString key, in any data);
};*/
function store(){ return localStorage;}

function storeItem(k,v){
	localStorage.setItem(k,v);
}
function storeGet(k){	return localStorage.getItem(k);}
function storeRemove(k){	localStorage.removeItem(k);}
function storeList(){
	let res=[];
	for (let k in localStorage){
		//retrieve default methods: length : key : getItem : setItem : removeItem : clear
		if(k!=='length' && k!=='key' && k!=='getItem' && k!=='setItem' && k!=='removeItem' && k!=='clear'){
			res.push(k);
		}
	}
	return res;
}
function storeMapAll(){
	let res=new Map();
	for(let k in localStorage){
		if(k!=='length' && k!=='key' && k!=='getItem' && k!=='setItem' && k!=='removeItem' && k!=='clear'){
			res.set(k,localStorage.getItem(k));
		}
	}
	return res;
}
function storeArrayAll(){
	let res=[];
	for(let k in localStorage){
		if(k!=='length' && k!=='key' && k!=='getItem' && k!=='setItem' && k!=='removeItem' && k!=='clear'){
			res.push([k,localStorage.getItem(k)]);
		}
	}
	return res;
}
function storeClearAll(){
	let c=window.confirm('Confirm: Delete All('+localStorage.length+') Datas in LocalStorage?');
	if(c===true){
		localStorage.clear();
		console.log('All localStorage Datas deleted;');
		return 1;
	}
	return 0;
}


function storeJSON(k,obj){//-- obj MUST be a litteral object
	store().setItem(k, JSON.stringify(obj));
}
function storeGetJSON(k){
	return JSON.parse(store().getItem(k));
}

/**   JSON with reference * SETTERs(setItem) */
function storeRefJSON(k,obj,refid){//-- store item with a ref added//-- arg obj MUST be object!
	obj['ref']=refid;
	storeJSON(k,obj);
}
/**   JSON with reference  * list */
function storeRefList(ref){
	let res=[],tmp;
	for (let k in localStorage){
		//retrieve default methods: length : key : getItem : setItem : removeItem : clear
		if(k!=='length' && k!=='key' && k!=='getItem' && k!=='setItem' && k!=='removeItem' && k!=='clear'){
			tmp=JSON.parse(localStorage.getItem(k));
//			console.log('storeRefList: '+k+' with value '+tmp['ref']);
			if(tmp.ref===ref){
			res.push(k);
			}
		}
	}
	return res;
}
/** JSON with reference * REMOVEs */
function storeClearRef(ref){
	let refereds=storeList(ref);
	if(refereds.length<1){	return 0;}
	let c=window.confirm('Confirm: Delete ('+refereds.length+') Datas in LocalStorage with reference '+ref+'?');
	if(c===true){
		for(let i=0,len=refereds.length;i<len;i++){
			localStorage.removeItem(refereds[i]);
		}
	}
	return;
}
/** JSON with reference * GETTERs */
function storeGetRefJSON(k,refid){//--k, get item matching k and refid
	let sg=storeGetJSON(k);
	if(typeof sg.ref!=='undefined' && sg.ref!==null && sg.ref===refid){	return sg;}
	return null;
}
function localAllRefMapJSON(ref){//-- all item(s) matching ref reduce a map
	let refmap=new Map();
	let tmp;
	for (let k in localStorage){
		if(k!=='length' && k!=='key' && k!=='getItem' && k!=='setItem' && k!=='removeItem' && k!=='clear'){//-- retrieve native methods
			tmp=JSON.parse(localStorage.getItem(k));
			if(typeof tmp.ref!=='undefined' && tmp.ref!==null && tmp.ref===ref){ refmap.set(k,tmp); }
		}
	}
	if (refmap.size>0){;return refmap;}
	console.log('no item with ref '+ref);
	return;
}
function localAllObjectRefJSON(ref){//-- all item(s) matching ref reduce as object litteral
	let refs={}, tmp, count=0;
	for (let k in localStorage){
		if(k!=='length' && k!=='key' && k!=='getItem' && k!=='setItem' && k!=='removeItem' && k!=='clear'){//-- retrieve native methods
			tmp=JSON.parse(localStorage.getItem(k));
			if(typeof tmp.ref!=='undefined' && tmp.ref!==null && tmp.ref===ref){
				count++;
				refs[k]=tmp;
			}
		}
	}
	if (count>0){
		console.log('count '+count);
		refs.size=count;
		console.log('size of result '+refs.size);
		return refs;
	}
	console.log('no item with ref '+ref);
	return;
}
