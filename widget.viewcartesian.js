/** widget.viewcartesian.js 
* require widget.api.js functional.canvas.js functional.1.js functional.head.js functional.form.js
*/
class ViewCartesian extends APIfunctional{
	constructor(container,width='max',height='max'){
		super();
		this.main.root=container;
		this.main.domain='CANVAS2D API';
		this.main.description.name='ViewCartesian';
		this.main.description.designation='0.2';//-- current version number
		this.main.taglist={};
		this.main.datas={};
		this.main.datas.canvas=null;
		this.main.datas.ctx=null;
		this.main.datas.dim={};
		this.main.datas.dim.w=width;// dimension(width) of canvas
		this.main.datas.dim.h=height;// dimension(height) of canvas
		this.main.datas.states={};
		this.main.datas.states.reperes=true;
		
		this.initStyle();
		this.start(width,height);
	}//-- END constructor
	
	taglist(identifier=null,value=null){
		
		
	}
/** GETTERS mostly shorten */
	canvas(){	return this.main.datas.canvas;}
	ctx(){		return this.main.datas.ctx;}
	canvasW(){	return this.main.datas.dim.w;}
	canvasH(){	return this.main.datas.dim.h;}
	canvasDim(){return [ this.main.datas.dim.w , this.main.datas.dim.h ]; }
/** METHODs */
	enableReperes(s=true){ this.main.datas.states.reperes = s === true ? s:false; }//-- disable is same function set to false!
	
	markReperes(depth){
		if( this.main.datas.states.reperes === true ){
			let modW=this.canvasW()%depth,
			 modH=this.canvasH()%depth;
			seelog('reperes marks enabled');
			hashSegments(this.ctx(),-5,(-this.canvasH()/2)-modH,5,(-this.canvasH()/2)-modH,this.canvasH(),depth,'y');
			hashSegments(this.ctx(),(-this.canvasW()/2)-modW,-5,(-this.canvasW()/2)-modW,5,this.canvasW(),depth,'x');
			ilog('reperes marks enabled, depth size: '+depth);
		}else{ seelog('reperes marks not enabled');}
	}
/** INITIALISATION methods */
	start(width,height){
		if(this.main.state.working !== null ){ warn(this.main.description.name+' allready started! FORBIDEN '); return; }
		this.initDOM(width,height);
		this.markReperes(10);
		//-- addEventListener (s)
		getId('maintitle').firstElementChild.addEventListener('click',function(e){
			e.stopPropagation();
			if(this.innerHTML==='X'){
				this.innerHTML='.';
				this.className='open';
				console.log(getId('maintitle'));
				setCss(getId('maintitle'),'top:-4em;opacity:0.6;');
				return 0;
			}else{
				this.innerHTML='X';
				this.className='close';
				setCss(getId('maintitle'),'opacity:1;');
				return 0;
			}
		},false);
	}
	
	initDOM(w,h){
//		if(this.main.root.getElementById('vcbox').nodeName!==undefined){ warn('DOM Elements allready set ');return; }//-- will delete previous added content
		toDom(
			destIn(
				destIn( 
					say( setAttr(setAttr(newTagId('span','btn1'),'class', 'close'),'title','show/hide main title'),'X') ,
					setId( textTag('h1',this.main.domain+' : '+this.main.description.name+' (v'+this.main.description.designation+')'),'maintitle' ) 
				),
				newTagId('article','canvasbox')
			),
			destIn(
				newTagId('section','vcbox'),
				this.main.root
			)
		);
		w= w === 'max' ? window.innerWidth:w;
		h= h === 'max' ? window.innerHeight:h;
		let tab=newCartesianAxis( 'cnv', w, h, '#008a00' );// function newCartesianAxis(id,w,h,bg='#FFF'){
		this.main.datas.canvas=tab[0];
		this.main.datas.ctx=tab[1];
		
		toDom( tab[0] , getId('canvasbox') );		
		toDom( newTagId('nav','panel'), getId('canvasbox') );
		getId('panel').innerHTML='MENUs ICI ...Bientôt(ou tard)';
		write(toDom(setCss(textTag('p'),'display:block;position:absolute;top:100px;left:100px;border:2px solid red;background-colot:#fff;width:220px;z-index:2;'),body()),'&#9874;');
		seelog('DOM setted');
	}
	initStyle(){
		addPageStyle('body','margin:0;padding:0;');
		addPageId('vcbox','margin:0;padding:0;');
		addPageId('maintitle','position:fixed;top:-0.75em;z-index:1;left:2px;font-size:1em;background-color:rgb(120,130,120);background-color;rgba(120,130,120,0.7);padding:0.2em 0.4em 0 1.4em;border:1px inset silver;color:rgb(72,61,139);'+
		'-webkit-animation-name: animatetitle;-webkit-animation-duration: 1s;'+
		'animation-name: animatetitle;animation-duration: 1s;');//transition: all 1s linear 0;-webkit-transition: all 1s linear 0;
		addPageStyle('nav#panel','position:fixed;bottom:0;width:92%;margin-left:3%;height:1.2em;background-color:rgb(240,240,240);background-color:rgba(220,220,220,0.4);border-bottom:1px solid #ccc;border-radius:0.4em 0.4em 0 0;padding:0 0.6em 0 0.6em;z-index:2');

		//--  class ATTENTION :  .close and .open are unic classes !!
		addPageClass('close','position:fixed;top:0.32em;left:2px;height:1em;width:1em;text-align:center;background-color:silver;color:#6495ed;border:thin outsetsilver;');
		addPageClass('close:hover,.close:focus','background-color:#304050;color:#ff7f50;border:thin inset #FFF;cursor:pointer;');
		addPageClass('open','position:fixed;top:0.32em;left:2px;height:1em;width:1em;margin-right:1em;text-align:center;background-color:rgb(0,0,0);background-color:rgba(0,0,0,0.1);color:#FFF;');
		addPageClass('open:hover,.open:focus','background-color:#0000FF;color:#F00;cursor:pointer;');
		//-- animation(s)
		addPageStyle('@-webkit-keyframes animatetitle ','from {left:-30%; opacity: 0} to {left:2px; opacity: 1}');
		addPageStyle('@keyframes animatetitle','from {left:-30%; opacity: 0} to {left:2px; opacity: 1}');


	}
	
}

//-- TODO: much and more...