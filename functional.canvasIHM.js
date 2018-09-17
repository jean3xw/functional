/** REQUIRE tree.js */
 Array.prototype.press=function(id,item){	if( typeof this[id]===Array){ 
this[id].push(item)}else{[item,this[id]]; }	}
Array.prototype.add=function(id,item){	
	this[id] = this[id]===typeof Array?this[id].push(item):[this[id],item]
	return this[id].length; 
}

const CANVAS2D='2d';
const DOM='DOM';
const DOM2D='DOM2d';

const ELEMENTROOT='DOM2d';
//-- functional.canvasIHM.js est un addOn pour functional.canvas.js 
//--- requiert les mêmes fichiers mais(une partie -à voir-) peut aussi être utilisé indépendamment
//-- le but est de permettre/gérer les interactions utilisateurs centrées sur le canvas
/** coordonnées de la souris en fonction du canvas
* cette fn est plutôt un essai pour IHM / eventListener car généralisable à tous les éléments 
* vu quelle inclus un objet il serais bien faire hériter autre classe IHM
*/

class PageIHM{
	constructor(idname,idbox,typetag='main',viewmode='DOM'){
		this.settings={
			idname:idname,
			idbox:idbox,
			sets : { display:'DOM', tagName:typetag }
		}
		this.assets={	tag:null,tempTag:null}
		this.tree=null;
		// addSetTo:function(tagname,id,settings,values,box)
		
	}
	//-- private get only : settings, assets, cTree
	get settings(){	return this.settings;}
	set settings(stts){	this.setttings=stts;}
	get assets(){	return this.assets;}
//	set assets(){	return this.assets;}
	get tree(){	return this.tree;}
//	set tree(){	return this.tree;}
	/** ------------- ----------------- ------------- ----------------- ------------- -----------------
	**Methods 
	* ------------- ----------------- ------------- ----------------- ------------- ----------------- */
	init(viewmode='DOM'){
		this.tree=treeMap(this.settings.tagName,this.settings.idname,this.settings.idbox,viewmode);
	}
	start(){
		
	}
}
class CanvasIHM extends PageIHM{//	constructor(idname,idbox,typetag='main',viewmode='DOM'){
	constructor(idname,idbox,typetag='main'){
		this.assets.canvas=null;
		this.assets.CanvasRenderer2D=null;
		
		super(idname,idbox,typebox='main',DOM2D);
	}
	init(){
		this.super(DOM2D);// this.tree=treeMap(this.settings.tagName,this.settings.idname,this.settings.idbox,viewmode);
		// this.addSetTo('section','section'+this.settings.idbox,{ itemType:DOM, css:{ padding:0,margin:0 } }, this.settings.idname );
		this.tree.addTo('header','header'+this.settings.idname, this.settings.idname);
		this.tree.addTo(this.settings.tagName,'main'+this.settings.idname,this.settings.idname);
		this.tree.addTo('footer','footer'+this.settings.idname,this.settings.idname);
		this.tree.addTo('canvas',this.settings.idname,'main'+this.settings.idname);
		// this.tree.addSetTo(
	}
	
}

function mouseCanvasCoordinates(canvas,evt,xorigin=0,yorigin=0){
	if(!evt.clientX){ console.log('no available mouse coordinates in '+evt);return;}
	let canvasCoord={
		evt:evt,
		cnv:canvas,
		top:canvas.offsetTop,
		left:canvas.offsetLeft,
		xorigin:xorigin,
		yorigin:yorigin,
		mouseX:function(){	return this.evt.clientX;},
		mouseY:function(){	return this.evt.clientY;},
		X:function(){	let tx=this.mouseX <= this.left?this.left-this.mouseX:this.mouseX-this.left;
			if(this.mouseX<this.left+this.cnv.offsetWidth){tx+=this.left;}else{tx-=this.left;}
			return tx;},
		Y:function(){	let ty=this.mouseY <= this.top?this.left-this.mouseY:this.mouseY-this.top;
			if(this.mouseY<this.top+this.cnv.offsetHeight){ty+=this.top;}else{ty-=this.top;}
			return ty;},
		XY:function(){return [this.X(),this.Y()];},//-- the location of mouse regarding the canvas and it origin (aka default: x = 0, y = 0)
		isOnCanvas:function(){
			if(evt.target===this.cnv){return true;}return false;},//mind be sure that use event bind to canvas and stopPropagation() for truthfull
		isHover:function(){//-- much truth full result as isOnCanvas using canvas location// a bit slower too
			if(this.mouseX()<this.left){return false;}
			if(this.mouseX()>this.left+this.cnv.offSetWidth){return false;}
			if(this.mouseY()<this.top){return false;}
			if(this.mouseX()>this.top+this.cnv.offSetHeight){return false;}
			return true;
		}
	}
	return canvasCoord;
}