/** from functional JS*/
function isReal(any){	return any!==null && typeof any!=='undefined' ? true:false }
function isString(value){return typeof value == 'string' ? true : false }
function isStr(value){	return isString(value); }

/** ----------- ----------- ----------- ----------- 
** tree.js
* is a dom (or whatever) tree using a Map with custom methods

*/
const ELEMENTROOT='rootelement';
let treeMap=function( rootTag, rootId, treename, treetype='DOM' ){
	let name = treename;//-- a name for the tree
	let type = treetype;//-- type and/or domain of items
	let tree = new Map ();
	tree.set(rootId,  {lv:0, boxed:ELEMENTROOT, tagName:rootTag, childs:[], attributes:{ itemType:type }} );
	let seed=rootId;
	//-- tree [Map] contain
	return {
/** ------------- ------------- ------------- ------------- -------------
**		GETTERS
* ------------- ------------- ------------- ------------- -------------*/
		getSeed:function(){	return seed;},
		count:function(){		return tree.size;},
		countChilds:function(id){
			return tree.has(id) ? tree.has(id).childs.length: null;
		},
		hasChild:function(id){
			return this.countChilds(id)>0 ? true:false;
		},
		getId:function(id){
			if(tree.has(id)){
			// if(tree.tagname===CANVAS2D){	return (tree.attributes.drawList);}
				return tree.get(id);
			}
			return;
		},
		getChildByIndex:function(parentId,childIndex){
			let tmp=this.getId(parentId);
			if(tmp!=='undefined'){
				if(childIndex<tmp.childs.length && childIndex>-1){
					return getId(tmp.childs[childIndex]);
				}
			}
			return;
		}
		,
		getParent:function(id){
			if(!tree.has(id)){	return null;}
			return tree.get(id).boxed;
		},
		getLevel:function(id){ if(!tree.has(id)){ return null;}
			return tree.get(id).lv;
		},
		getChilds:function (id){	return this.countChilds(id)>0?tree.get(id).childs:false },
		getSiblings:function(id){	return this.getChilds(getParent(id));},
		isParent:function(id){
			if(id==ELEMENTROOT){ return parentRoot;}
			if(!tree.has(id)){ console.log(id+' not found');return;}
			return tree.get(id).childs.length>0 ? true :false
		},
		getAttributes:function(id){
			if( tree.has(id) ){
				return tree.get(id).attributes;
			}return;
		},
		flatMap:function(){//-- indicate only levels from root(0)!
			let tabres=[];
			tree.forEach(function(value, key, ownerMap) {
				if(isReal(tabres[value.lv])){tabres[value.lv].push(key);}else{
					tabres[value.lv]=[key];
				}
			});
			return tabres;
		},
		mapTree(){
			let t=new Map();
			tree.forEach(function(value, key, ownerMap){
				t.set(key,value.childs);
			});
			return t;
		},
		mapRoute:function(){
			let branch=new Map();
		  	tree.forEach(function(value, key, ownerMap) {
		
		if(value.childs.length>0){
					branch.set(key,value.childs);
				}
			});
			return branch;
		},/**
		*GRMBL!!!
		dispRoute:function(){
			let route=this.mapRoute();
			let fg=document.createDocumentFragment();
			let ulProto=document.createElement('ul');
			let liProto=document.createElement('li');
			route.get();
		},*/
/** ------------- ------------- ------------- -------------
**		SETTERS
*------------- ------------- ------------- -------------*/
		addTo:function (tag, idChild , idParent ){
			if(isString(idParent) && isString(idChild)){
				if(!tree.has(idParent)){ console.log('parent id \"'+idParent+'\"not found in tree map ')
					return;}
				
				if(tree.get(idParent).childs.includes(idChild) ){
					saylog(idParent+' allready includes '+idChild);
				}else{
					tree.get(idParent).childs.push(idChild);
					tree.set(idChild,{lv:tree.get(idParent).lv+1,
					tagName:tag,
					boxed:idParent, childs:[],
					attributes:{itemType:'DOM'} } );
				}
				return this;
			}
			warn('{canvasIHM}.(addInto): wrong parameter type , must be both string ');return;
		},
		set:function(id,attributes){//-- set the attributes , 2nd param is a object(or any paar objects keys/values)
			if(!tree.has(id)){	return;}
			for( let k in attributes){this.getId(id).attributes[k]=attributes[k];}
			return this;
		},
		addAttributesTo:function(tagname,id,attributes,box){
			this.addTo(tagname,id,box);
			this.set(id,attributes);
			return this;
		},
		addToWith:function(tagname,id,box,attrs){
			this.addAttributesTo(tagname,id,attrs,box);
		},
		addItem:function(tagname,id,box,params){
			this.addAttributesTo(tagname,id,params,box);
		},
		addDrawTo:function(id,canvas,drawSettings){
			this.addSetTo(CANVAS2D,id,{itemType:CANVAS2D,draw:drawSettings},canvas);
			
		},
/** ------------- ------------- ------------- -------------
**		METHODS
* ------------- ------------- ------------- -------------*/
		domItem:function(id){
			if(this.getId(id)!== null && this.getId(id)!== 'undefined' ){	return getId(id);}return;
		},
		isType:function(id,type){
			if(this.get(id).attributes.itemType==type ){	return true;}
			return false;
		}
	}
}
//-- pour utiliser avec DOM
//--	let treeMap=function( rootTag, rootId, treename, treetype='DOM' ){
let treeMapDOM=function(rootTag, rootId, treename){
	let treeDOM=treeMap(rootTag, rootId, treename, 'DOM' );
	return {
		tree:treeDOM,
		display:function(targetElement=document.body){
			if(!isReal(targetElement)){	console.log('no element to display '+targetElement);return null;}
			targetElement.innerHTML='';
			let listItems=this.tree.flatMap();
			for(let i=0,len=listItems.length;i<len;i++){
				for(let j=0,jlen=listItems[i].length;j<jlen;j++){
					let tmp=this.tree.getId(listItems[i][j]);
					console.log(': '+tmp.boxed);
					if(tmp.attributes.itemType==='DOM'){
						let myTag=document.createElement(tmp.tagName);
						myTag.id=listItems[i][j];
						if(isReal(tmp.attributes.name)){	myTag.setAttribute('name',tmp.attributes.name); }
						if(isReal(tmp.attributes.className)){	myTag.className=tmp.attributes.className; }
						if(isReal(tmp.attributes.type)){	myTag.setAttribute('type',tmp.attributes.type); }
						if(isReal(tmp.attributes.width)){	myTag.setAttribute('width',tmp.attributes.width); }
						if(isReal(tmp.attributes.height)){	myTag.setAttribute('height',tmp.attributes.height); }
						if(isReal(tmp.attributes.style)){	myTag.setAttribute('style',tmp.attributes.style); }
						if(isReal(tmp.attributes.inner)){	myTag.innerHTML=tmp.attributes.inner; }
						
						
					//-- append to page
						if(i<1){//	i===0
							targetElement.appendChild(myTag);//-- only for root
						}else{
							if(isReal(document.getElementById(tmp.boxed).firstChild) && document.getElementById(tmp.boxed).firstChild.nodeType==3){
								document.getElementById(tmp.boxed).insertBefore(myTag,document.getElementById(tmp.boxed).firstChild);
							}else{//-- Attention prends pas en compte les types de node autres que element ou text
								document.getElementById(tmp.boxed).appendChild(myTag);
							}
						}
					}else{//-- TODO: add other(s) itemType i.e. shape on canvas
						console.log(listItems[i][j]+' is not a DOM item.');
					}
				}
			}
		},
		remove:function(container=document.body){
			console.log('remove root '+document.getElementById(this.tree.flatMap()[0][0]).id+' from '+container+' (id:'+container.id+')');
			container.removeChild(document.getElementById(this.tree.flatMap()[0][0]));
		}//, add other methods below
	}
}

console.log('tree.js loaded');
