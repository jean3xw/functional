/** 
TraceEngine
never used stuff, see canvasmachine.js & dom2d.js
*/
function newClass(n, t,d){
	return { name:n, type:t, domain:[d], mode:'DOM', listViews:{dom2D:new DOM2D()}};
}
class Trace extends functrace{
	constructor(tpe,dom){
		super('Trace','classTrace#DrawObject','Trace']);
	}
	trace2DWith(md==){
		md=='DOM'
	}
}

