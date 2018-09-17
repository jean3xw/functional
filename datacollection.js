/** venu de framework.js 
*		TODO a developper !
*/
class DataCollection{
	constructor(){
		this.datalist = {};//-- contain named sublist 
		this.factory = new Generator('DataFactory');
	}
	list(id){	return this.dts.datalist[id];};
	gen(){	return this.factory; };
	addData( dataid, generateddata, datadomain ){
		if( this.datalist[datadomain]!=null  && this.datalist[datadomain][dataid]==null ){	this.datalist[datadomain][dataid]= generateddata;		}
	}
	loader(){
		
	}
		
	
}

class Generator{
	constructor(type='defaultFactory'){
	this.type=type;
	this.holder=['debut'+timeNow()];
		
	}
	
	generate(what,args){
		let tmp;
		switch(what){
			case 'text':	tmp=args.text;			break;
			case 'num':		tmp=args.num;			break;
			case 'array':	tmp=args.list;			break;
			case 'object':	tmp=args.o;				break;
			case 'item':	tmp=args.item;			break;
			default:		tmp=args;				break;
		}
		return tmp;
	}
	getType(){	return g.type;}
	get(a=null){	if(a!=null){this.generate(a);}return this.holder[1];}
	txt(a){holder[1] = generate('text',{text:a});return this;}
	num(a){holder[1] = generate('num',{num:a});return this;}
	tab(a){holder[1] = generate('array',{list:a});return this;}
	obj(a){holder[1] = generate('object',{o:a});return this;}
	
	
	sendTo(target){	target.acquire(this.holder[1]); }
	goNext(	a ){	let tmp=this.holder[0];generate(a);return tmp;}
		
	
	
}