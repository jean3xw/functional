/**based on functional domcanvas.js ( a imitating canvas renderer using DOM Elements in a holder notCanvas.ct
*replace canvas on a dom context(or with no canvas)
** see add // regroup with functional.polyfil.js
*/

function notCanvas(canvasid){
	let t=clearMarges(newTag('div'));
	let ct=clearMarges(newTag('div'));
	let old=getId(canvasid);

	ct.className='notcanvas'+canvasid;
	addPageClass( 'not_'+canvasid , 'margin:0;padding:0;width:'+old.getAttribute('width')+'px;height:'+old.getAttribute('height')+'px;border:1px solid red;' );
	addCss(ct,'width:100%;height:100%;');

	if( old.tagName === 'CANVAS' || old.tagname==='canvas'  ){
		
		setCss( t,'width:'+old.getAttribute('width')+'px; height:'+old.getAttribute('height')+'px;' );
		old=old.parentNode.replaceChild(t,old);
		setId(ct,canvasid);
		toDom(ct,t);
		//console.log( document.getElementById(canvasid));
		console.log('old width '+old.getAttribute('width'));
		
		return ct;
	};
	if(document.getElementById(canvasid).tagName==='div'){
		if(document.getElementById(canvasid).parentNode.id=''){
			document.getElementById(canvasid).parentNode.id=canvasid+'holdernotcanvas';
		};
		console.log('\n\t\t\t***'+ct);
		return ct;
	}
	
}

function canvasImage(idcanvas,src,alt='image not found',x,y,w,h){	
	let t=document.createElement('img');
	t.setAttribute('src',src);
	t.setAttribute('alt',alt);
	setCss(t,'position:fixed;top:'+x+'px;left:'+y+';width:'+w+'px;height:'+h+'px;');
	let nc=notCanvas(idcanvas);
	nc.appendChild(t);
	return nc;
}
function canvasPixel(idcan,x,y,w=1,h=1,idtf='pixel' , bg='#ffffff',stroke={}){//-- set stroke to false !=style 
	let p=setClass(newTag('p'),idtf);
	
	let nc= notCanvas(idcan);
	if(nc){ nc.appendChild(p);
	console.log(' **** '+nc.children[nc.children.length-1]+' '+p.className);
	console.log(nc+' appendChild '+p);}
	let cs= 'margin:0;padding:0;position:relative;display:box;top:'+x+'px;left:'+y+'px;width:'+w+'px;height:'+h+'px;';
	if(bg!=false){	cs+='background-color:'+bg+';'}
	if(stroke!=false){
		if( stroke.border ){	
			
			cs+='border:'+stroke.width+'px '+( stroke.style!=null?stroke.style:'solid' )+';'+( stroke.color!=null?stroke.color:'#fff' )+';';
			
		}else{
			cs+='border:1px solid'+stroke+';';
		}
	}
	addPageClass(idtf,cs);
	nc.appendChild(p);
	return nc;
}
//function drawPixel(id){	}
function canvasBitmap(w,h){
	let tabxy=new Array(w);
	for(let i =0; i<tabxy;i++){
		tabxy[i]=new Array(h);
	}
	return{
		xy:function(){	return tabxy;	},
		get:function(x,y){	return tabxy[x][y];},
		set:function(x,y,canvaspixel){ tabxy[x][y]=canvaspixel;	return this;}
	}
}

