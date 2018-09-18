/** tools function */
function isNode(a){
	if(a.tagname!=undefined){	return a.tagname;}
	return;
}

function addTo(v,i){ if(isNaN(v) || isNaN(i)){ return false;}	return (v+i);}
function ad(v,i){	return addTo(v,i);}
function addToLimited(v, i, limit, higher=true){
	let t;
	t = addTo(v,i)!=false ? addTo(v,i) : false;
	if(t===false){	return false;}
	if( higher==true ){ t=t<limit?  t: [false,1];return t; }
}

function mover2D(as){//-- as IS Object ref
	let move={
	 as:as,
	 prepareDOM:{},//CSS prop name:[change value(s)]
	 prepare2D:{},
	 speed:1,
	 limits:{
			top:0,right:null,bottom:null,left:0,
			setsH:function(r,l){this.left=l;this.right=r;},
			setsV:function(t,b){this.top=t;this.bottom=b;},
			sets:function(t,r,b,l){this.setsV(t,b);this.setsH(l,r);}
			},
	 cmds:{
		moves:{
			//-- define move here !!!
			
		}
		,go:{}
	},
	addMove:function(name,mymv){//--	mymv IS closure 'function' ** not active see fn moveWatcher
		cmds.moves.name=mymv;
		return this;
	}
	}
//	function addListener(name,c){}
	return move;
}

function moverHorizontal(as,speed,limitleft,limitright){
	let mv=mover2D(as);
	mv.speed=speed;
	mv.cmds.moves.origin=function(){styleSet(mv.as,'left',(window.innerWidth/2)+'px' );styleSet(mv.as, 'top','140px');}
	
	mv.cmds.moves.left=function(dep=speed){
	//		alert(mv.as);
		let l=getCssValue(mv.as,'left');
		if(l!==undefined){
			l=parseInt(getCssValue(mv.as,'left'));
			if(!isNaN(l)){
				saylog('move : '+dep);
				if(mv.limits.left!==undefined ){
					if( (l-dep)>mv.limits.left){
						styleSet(mv.as,'left',(l-dep)+'px');
						saylog('new x'+(l-dep));
					}else{
						styleSet(mv.as,'left',mv.limits.left+'px');
						saylog('new x'+(mv.limits.left));
					}
				}
			}	
		}else{
			mv.cmd.move.origin();
			
		};
	}
	mv.cmds.moves.right=function(dep=speed){
		let l=getCssValue(mv.as,'left');
		if(l!==undefined){
			l=parseInt(getCssValue(mv.as,'left'));
			if(!isNaN(l)){
				saylog('move : '+dep);
				if(mv.limits.right!==undefined ){
					if(l+dep < mv.limits.right ){
						styleSet(mv.as,'left',(l+dep)+'px');
						saylog('new x'+(l+dep));
					}else{
						styleSet(mv.as,'left',mv.limits.right+'px');
						saylog('new x'+(mv.limits.right));
					}
				}
			}
		}else{
				saylog('move at start - init item');
				mv.cmds.moves.origin();
			
		};
	}
	return mv;
}
function moveWatcher(somemover2D){
	let mv=somemover2D;
	mv.limits.sets(0, -parseFloat(getCssValue(mv.as,'width'))/2,0, window.innerWidth-(parseFloat(getCssValue(mv.as,'width'))/2) );
	saylog('limits{left:'+mv.limits.left+', right:'+mv.limits.right+'}' );
	mv.cmds.moves.origin();
	
	
	document.addEventListener('keyup',function(e){
		//alert(mv.as);//ok
		let keyevent=e;//-- could be any event!
		let keycode=e.keyCode;
		e.stopPropagation();
		if(e.toString() ==='[object KeyboardEvent]'){
			switch(keycode){
				case 37:saylog('left move');mv.cmds.moves.left();break;
				case 39:saylog('right move');mv.cmds.moves.right();break;
				case 39:
				default: saylog('no command assigned to '+keycode);break;
			}
		}
	}, false );
}

