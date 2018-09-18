// add to functionalR.1.2-1.js *R Register

const REG={};
let register;
register.tmp={};
function reg(){return isReal(REG)?register:false;}

function listenWith(target, action, withfn, namefn,  bubble=false,isTemporary=true){	
	if(isTemporary === true){reg.tmp[namefn]=withfn;}
	document.addEventListener(action,reg.tmp[namefn],bubble);
	return target;
	
}


/** 
*Interface crée une interface , 
required :
functional.1-0.js
*/
function inObject(o,instructions){	for(let k in o){		return instructions(k,o);	}	}

function filterObject(obj,params){
		inObject(o, function(){});
}
function filter(atIt, instructions){
	let rep=[];
	atIt.forEach(k,v,atMe){function(){	let t=instructions(k,v,atMe);if( isReal( t ) ){rep.push( t );}}
	return rep;
}
function mpX(tab, doMap){
	for(let i=0,len=tab.length;i<len;i++){
	seelog('[mpX]:'+doMap(tab[i])+'\n');
	}
	return tab;
}
function reduce(tab,clause,instructions){
	let rest=[]
	for(let i=0,len=tab.length;i<len;i++){
		if(isReal(clause(tab[i]))){	rest.push(instructions( tab[i] ) );}
	}
	return rest;
}
function filterMpX(atIt,clause, domap){
	return mpX(filter(atIt, clause),domap);
}


const defaultNAMENODE='article';
const UNSET='unset';
//-- 
let treeMap=function(tag, domroot,name,mode='DOM'){
	let name=name;
	let display=mode;
	let tree= new Map(root:domroot,tagName:{ });
	let setDisplay(disp){ display=disp;}
	return {
		setDisplayDom2d(){setDisplay('DOM2D');return this;}
		setDisplay2d(){setDisplay('2D');return this;}
		setDisplayDom(){setDisplay('DOM');return this;}
	}

}

uiConfig=function(name,percentWidth,percentHeight,node=NAMENODE,borders=[0],colors=['#000','#FFF']}){return {
nameid:NAMENODE,
namenode=,
percentWidth:,
percentHeight:0,
border:borders,
colors,
dimpixels:UNSET,

}}

let userInterface=function ( uiConfig,niveau,box, user='public'){
	let conf=uiConfig(); //-- some tag ELEMENT settings
	let lv:niveau;
	let box=box;
	let user='public';
	let itemList;
	
	return this;
}
class  UIclass{
	constructor( userInterface() ){
		let ui= userInterface();
		let cmds={
			alarm:function(msg){	alert(msg); }
		}
		let listListener={}// id:{ cmd, enabled}
	}
	addCmd(name,fnct){cmds[name]=fnct;}
	onListen(item,trig,cmd, bub=false){ item.addEventListener(trig,cmds[cmd], bub);listListener.id=cmd; listListener.id.enabled=true; }
	offListen(item,trig,cmd){ item.removeEventListener( trig,cmds[listListener[item.id].cmd] ); listListener.id.enabled=false; }
	toggleListen(item,cmd, bub=false){
		if(isReal(listListener[item.id]) && listListener[item.id].enabled ){	
			offListen(item,listListener[item.id];
		}else{
			onListen(item,cmds[listListener[item.id].cmd], bub);
		}
	}
	
}
