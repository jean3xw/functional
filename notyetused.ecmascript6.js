/**
* SHOULD BE ADD TO FUNCTIONAL 
* ORIGINALY PUT SOME PROPERTIES USING ES6 and follows by year name : ECMASCRIPT 2017
* CAN REGROUP AND ADD SUPPORT(polyfill) to lower version even if navigator should be at least updated on line to current year version by short time

 */
 
 /*
 Symbols are a new type of primitive value in JavaScript and are used to
create nonenumerable properties that can’t be accessed without referencing
the symbol. Although not truly private, these properties are harder to
accidentally change or overwrite and are therefore suitable for functionality
that needs a level of protection from developers.
You can provide descriptions for symbols that allow you to identify symbol
values easier. A global symbol registry allows you to use shared symbols
in different parts of code by using the same description. Thus, the same
symbol can be used for the same reason in multiple places.
Methods like Object.keys() or Object.getOwnPropertyNames() don’t return
symbols, so a new method called Object.getOwnPropertySymbols() was added in
ECMAScript 6 to allow you to retrieve symbol properties. You can still make
changes to symbol properties by calling the Object.defineProperty() and
Object.defineProperties() methods.*/

/** SYMBOLS */
function useSymbols(){
	let o=Symbol();
	if(o.toString()==='Symbol(o)'){
			return true;
	}
	return false;
}
let name;
let idname;
let id;
if( useSymbols() ){
	name= Symbol();
	idname= Symbol();
	id= Symbol();
}else{
	// exit(0);
}

function useSymbol(varname, obj, assign ='get'){
	if(assign==='get'){	return obj[varname],}
}

