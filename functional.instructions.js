function makeInstruction(name,instr,arg=null){	return isString(name) && instr instanceof Function ? [name,instr,arg]:null;}
function makeX(n,i,a=null){	return makeInstruction(n,i,a);}
function mkX(n,i,a=null){	return makeInstruction(n,i,a);}
function listInstructions(instrs,tab=[]){	
	if(instrs instanceof Array){
		if(instrs[0] instanceof Array ){
			for(let i = 0,len = instrs.length; i<len;i++){
				if(instrs[i].length>1 && instrs[i].length<3){
					if( instrs[i][0] instanceof String && instrs[i][1] instanceof Function ){
						tab.push(instrs[i]);
					}
				}
			}
		}else if(instrs[0] instanceof String && instrs[1] instanceof Function){
			tab.push(instrs);
			return tab;
		}
	}
	return tab;
}
function Xlist(x,t=[]){	return listInstructions(x,t);}
function listX(x,t=[]){	return listInstructions(x,t);}

function readInstructions(instr){
	let tx=F+'readInstructions:\n';
	if(isArray(instr)){
		if(isString(instr[0]) ){
			if(instr[1] instanceof Function && instr.length<4){
				let res, ln=instr.length;
				saylog(instr.length);
				switch( ln ){
					case 3://-- function instr[1] has argument(s)
						instr[1](instr[2]);
						tx+=NAME+instr[0]+(isReal(res)?' result: '+res:'');
					break;
					case 2://-- function instr[1] has no argument
						 instr[1](instr[2]);
						tx+=NAME+instr[0]+(isReal(res)?' result: '+res:'');
					break;
					default:
						tx+='ERROR default length';
					break;
				}
				//saylog(tx);
				return res;
			}
		}
	}/*
	tx +=  tx == F+'readInstructions:\n' ? (ERR+BAD+'**Array '+instr+':must be [name,FN,args || null] see also FN makeInstruction') : tx;
	saylog(tx);*/
	return;
}

function executer(x){return readInstructions(x);}//-- shorten readInstructions
function xf(x){return readInstructions(x);}//-- shorten readInstructions

function readListInstructions(xl){
	let tabres=[];
	for( let i=0,len = xl.length; i<len; i++ ){
		let tmp=readInstructions( xl[i] );
		if( isReal(tmp) ){ tabres.push(tmp) };
	}
	return tabres;
}
function listExecuter(xl){ return readListInstructions(xl);}//-- shorten readListInstructions
function listExe(xl){ return readListInstructions(xl);}//-- shorten readListInstructions

function readListNamedInstructions(anyxlist){//-- same BUT will return name and returned value of function(aka list[i][1]) // MIND if value is null tabres[index].length will be 1 !!!
	let tabres=[];
	for(let i=0,len=anyxlist.length;i<len;i++){
		let tmp=readInstructions(anyxlist[i]);
		tabres.push( [anyxlist[0],tmp] );
	}
	return tabres;
}
function listNamedExecuter(xln){	return readListNamedInstructions(xln);}//-- shorten readListNamedInstructions
function listNamedExe(xln){				return readListNamedInstructions(xln);}//-- shorten readListNamedInstructions
