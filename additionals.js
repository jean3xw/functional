/**addittionals.js
* added feature not in functional(previously methodal.js)
*/

"use strict";
/**
	o : Object based 
*/
String.prototype.cap = function(onlycheck=true){	let s='';
	if(onlycheck===true){	//-- capital letter at length=2
			s=this.substring(0,1).toUpperCase()+this.substring(1,this.length);
		}
		else{				//-- capital letter at 1st, lower case on following
			s=this.substring(0,1).toUpperCase()+this.substring(1,this.length).toLowerCase();
		}return s;
}
String.prototype.firstLowerCase=function(){
	let s=this.substring(0,1).toLowerCase()+this.substring(1,this.length);
	return s;
}
String.prototype.capWords=function(sep=' '){
	let tab=this.split(sep);
	for(let i = 0,len=tab.length;i<len;i++){
		tab[i]=tab[i].cap();
	}
	return tab.join(sep);
}

/** 
	*String.cap = (onlycheck=true) => onlycheck==true? 1ST letter toUpperCase : 1ST letter toUppercase others toLowerCase
	*String.capWords( sep=' ') use String.cap(true) majuscule après le séparateur indiqué par défaut ' '( espace vide )*/
/**
/*DEMO
 	String.capWords(sep=' ') no arg => String first letter to upper case upper case
*/
/** UNCOMMENT TO SEE in console
let tx='note: 1ère letter est toujours -toUpperCase bien je dév mon appli.avec string.cap et string.capWords.comme ça les majuscules sont mises après. et aprés sep /separateur en arg)';
let tx0=tx;
tx=tx.capWords('Case ');
tx=tx.capWords('. ');
tx=tx.capWords('.');
tx=tx.capWords('les ');
tx=tx.capWords('les M');
tx=tx.capWords('MA');
tx=tx.capWords('MAJ');
tx=tx.capWords('MAJU');
tx=tx.capWords('MAJUS');
tx=tx.capWords('MAJUSC');
tx=tx.capWords('MAJUSCU');
tx=tx.capWords('MAJUSCUL');

saylog(tx0+'\n'+tx+'\n'+tx.capWords());
saylog(tx.firstLowerCase());//-- replace la 1ère lettre par sa minuscule
*/

function additionals(){								return sayLog('additionals.js JAVASCRIPT LIBRARY');}
function domize(o,d){	
	o.domain = forceArray(d);
	o.getDomain = function( at=true ){ let r; switch(at){ case true:r=o.domain[0];break;case false:r = o.domain[o.domain.length-1];;break;default:r = isInt(at) && isMin(at,o.domain.length)? o.domain[at]:null;break;}return r;	};
return o;}

function typize(o,t){	o['type']=t;	o['getType'] = function(){return o.type;};			return o;}
function namize(o,n){	o['type']=n;	o['getName'] = function(){return o.name;};			return o;}
function idize(o,i){	o['i']=i;		o['getId'] = function(){return o.id;};			return o;}
function itemize(o,i,n,d,t){						return idize(namize(domize(typize(o,t),d),n),i);	}

function otype(o){	return o.getType;}

function oAdd(o,k,v){	 if( o[k] == null){ o[k] = v;}	return o;}
function oSet(o,k,v){	o[k]=v;							return o;}
function oChg(o,k,s){	o[k]=o[k];						return o;}///-- change a previous value by // incrementation and such
function oDel(o,k){		 if(o[k]!=null){	o[k]=null;}	return o;}


function makeItem(i,n,d,t){		return itemize({},i,n,d,t);	}
function mkItem(i,n,d,t){		return makeItem(i,n,d,t);	}
function createItem(i,n,d,t,args){let o=makeItem(i,n,d,t); for(k in args){	o[k]=args[k]; } return o;}
function oo(i,n,d,t,args){		return createItem(i,n,d,t,args); }
function o(args=null){	let o ={};if(args==null){return o;};for(k in args){	o[k]=args[k]; };return o;}


/** using setTimeout */
/** NOTICE waitAfter , waitBefore 
-------------------------------------------------- -------------------------------------------------- -------------------------------------------------- 
								QUELLE MERDE ça sert trop à rien comme functions !!! A SUPPR ? ou faire mieux en objet !
-------------------------------------------------- -------------------------------------------------- -------------------------------------------------- 
*/
function waitAfter(instr, delay){	setTimeout(instr,delay);}
function waitBefore( instr0, instrz, delay){
	instr0();
	setTimeout(instrz, delay);
}

/** repeatTimeout 	*CAUTION : result will be obtain only at end of delayTime X repeats , so better suited for late result (or no result needed!) OR need a check for returned value  ! */
/** TO DEBUG : the for loop don't wait for seTimeout !!!
function repeatTimeout(func, delayTime, repeats , args=null ){
	let res=new Array(repeats), tmp;
	for(let i=0; i<repeats; i++){
		let tmo=setTimeout(
			function (){
				res[i]=func(args,i);
			},delayTime
		);
//		clearTimeout(tmo);
	}
	saylog('[additionals]loopTimeOut :'+func+'\n\t each '+delayTime+'ms is DONE');
	return res;
}
*/