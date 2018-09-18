/** *older version
function brick(w,h,unit){
	let b={
	bloc : new Map(),
	init : function(){	this.bloc.set(WIDTH,w);	this.bloc.set(HEIGHT,h);	this.bloc.set(UNITE,unit);	},
	type  : 'brick',
	height: function(){		return this.bloc.get(HEIGHT);},
	width : function(){		return this.bloc.get(WIDTH); },
	unit:function(keyname){		let concatene='';if(this.bloc.has(keyname)){	concatene+=this.bloc.get(keyname)+this.bloc.get(UNITE);	return  concatene;} },
	toText:function(){				let concatene=u(WIDTH)+''+u(HEIGHT);	return concatene;},
	setUnit:function(u){			this.bloc.set(u);	return this.bloc; },
	setWidth : function(w){				this.bloc.set(WIDTH,w);		return this.bloc; },
	setHeight : function(h){			this.bloc.set(HEIGHT,h);	return this.bloc; },
	
	regen:function(wid,hei,u = false){	this.setHeight(hei); this.setWidth(wid);	if(u !==false){this.setUnit(u); }	return this.bloc; },
	revert:function(){ 			return this.regen(		this.height(),this.width(),false); }
	}
	this.width = function(){ return this.width;}
	this.height = function(){ return this.height;}
	b.init();
	return b;
	
}
*/
function brick(w=2,h=1){
	let b={
		w:w,h:h,
		wscale:1,
		hscale:1,
		unit:'px',
		plane:'2',
		type:'rectangle',//-- auth={'square', 'rectangle', 'circle','elipse',...}//define the shape
		shapeorientation:'horizontal',//--auth={horizontal,vertical,center,...}// define the shape orientation(i.e.: vertical mean
		rotation:null,// angular(radian) rotation
		width:function(){	return this.w*this.wscale;},
		height:function(){	return this.h*this.hscale;},
		dim:function(d='2',u=true){
			u = u===true ? this.unit : '';
			d=d.toLowerCase();
			d = d==='width' ? 'w': d ;
			d = d==='height' ? 'h': d ;
			switch(d){
				case'2': return [this.width()+''+u, this.height()+''+u]; break;
				case'w': return this.width()+''+u; break;
				case'h': return this.height()+''+u; break;
				default: return [this.width()+''+u, this.height()+''+u]; break;
			}
		},
		revert:function(){
			if(this.type ==='rectangle' || this.type==='elipse'){
				let mem = this.w; this.w = this.h; this.h = mem; mem=null;
				this.shapeorientation = (this.shapeorientation==='vertical') ? 'horizontal' : 'vertical'; 
			}
		},
		setW:function(w){this.w=w;shapeType()},
		setH:function(){this.h=h;shapeType()},
		setDim:function(w,h){this.w=w,this.h=h;shapeType()},
		setScale:function(ws,hs='regular'){/** set wscale and/or hscale */
			if(hs==='regular' || hs===ws ){	this.wscale=ws;this.hscale=ws;return ws;}/** with 'regular' scales (wscale equal hscale)*/
			if(ws===false){ this.hscale=hs; return hs;}/** change wscale ONLY */
			if(hs===false){ this.wscale=ws; return ws;}/** change hscale ONLY */
			this.wscale=ws;this.hscale=hs;return [ws,hs];/** change wscale and hscale with (differents)parameters values */
		},
		scaleTo:function(stw,sth){
			return [ stw*this.width, sth*this.height ];
		},
		scaleToRaw:function(stw,sth){/** same as scaleTo BUT with no brick scale values ! */
			return [ stw*this.w, sth*this.h ];
			
		}
	}
	this.get=function(){	return b;}
	//-- checking properties type,shapeOrientation
	function shapeType(){
		if(b.w===b.h ){
			if(b.type==='rectangle'){	b.type='square';b.shapeOrientation='center';	}
			if(b.type==='elipse'){	b.type='circle';b.shapeOrientation='center';	}			
		}else{
			if(this.type==='rectangle' || this.type==='elipse'){
				if(b.w>b.h){	b.shapeOrientation='horizontal'; }
				if(b.w<b.h){	b.shapeOrientation='vertical'; }
			}
			if(this.type==='square' ){
				if(b.w>b.h){	b.shapeOrientation='horizontal';this.type='rectangle'; }
				if(b.w<b.h){	b.shapeOrientation='vertical';this.type='rectangle'; }
			}
			if(this.type==='circle' ){
				if(b.w>b.h){	b.shapeOrientation='horizontal';this.type='elipse'; }
				if(b.w<b.h){	b.shapeOrientation='vertical';this.type='elipse'; }
			}
		}

	}
	shapeType();
	return this;
}
