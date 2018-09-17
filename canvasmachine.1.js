/**canvasmachine.1.js cloned/based from functional.canvas.js
* is about Canvas and 2D renderer ONLY! for 3D ive to make another file i.e.: functional.canvas3d.js
* WILL NOT REQUIRE OTHER FILES (keep in mind do not add any functional.js functions(s) 
* last update: 31/08/18
*/
/**test IF canvas */
"use strict";
//-- file global datas
let dump=[];
function dumplog(str,about=null){dump.push([(new Date().getTime()),about,str]);};
dumplog(support_canvas2D(),'support_canvas2D');
console.log(dump[0].join(' : '));
/**	render2d()
		* create an object containing context settings of context 2D <properties
		* separated in 2 objects: renderLocation and rendereDraw
*/
function render2d(){
	return {
		 rendererLocation:{
			translation:0,
			translate:[0,0],
			rotate:0,
			transform
		},
		 rendererDraw:{
			fillStyle,
			strokeStyle,
			shadowColor,
			shadowBlur,
			shadowOffsetX,
			shadowOffsetY
		},
		get:function(){return [this.rendererLocation,this.rendererDraw]; },
		getDrawRender:function(){ return this.rendererDraw();},
		getLocationRender:function(){ return this.rendererLocation();},
		setTranslate:function(x,y){ this.rendererLocation.translate[0]+=xthis.rendererLocation.translate[1]+=y; return this;},
		setRotate:function(ang){ this.rendererLocation.rad+=ang;this.rendererLocation.rad+=ang;return this;},
		setTransform:function(matrix){ this.transform=matrix; return this;}
	}
};
function useDrawSet(ctx,tabDraw,tabLoc=undefined){//-- arguments ([ 'translate', [10,0] ], [ [ 'fill' ,'#ffffff']]]
		//
};
function drawSet(){	return useDrawSet(ctx,tabdraw);}
//  CanvasRenderer2D SUPPORT
function support_canvas2D(){/** see other( supports_canvas() @ functional.polyfill.js )  */
	if(document.createElement('canvas').getContext('2d')){	return true};
	return false;
}



function detect2D(){	if(!support_canvas2D()){	console.log('ERROR no canvas 2D availlable');	return false;}	return true;}
function getRenderer2D(canvas){// [object CanvasRenderingContext2D] // see also two2D(cnv) in functional.js
	if(detect2D()){	return canvas.getContext('2d');}	return false;}
/** general CANVAS  */
/** create canvas element, even  return getContext('2d')  or both [canvas, Rendere2D]*/
function newCanvasElement(id,w,h,bg=null){
	let c=document.createElement('canvas');
	c.id=id; c.setAttribute('width',w); c.setAttribute('height',h);
	if(bg!==undefined && bg!==null){c.style.backgroundColor=bg;dumplog(c.style.backgroundColor,'style.backgroundColor');}
	return c;
}
function createCanvas(id,w,h,bg=null){ return newCanvasElement(id,w,h,bg=null);}//- shorten
function fullPageCanvas(id,bg=null){ return newCanvasElement(id,window.innerWidth,window.innerHeight,bg);}
function overScan(id,bg=null){	return fullPageCanvas(id,bg);}//-- shorten (old school name like)

function newCanvasRenderer2D(id,w,h,bg=null){return newCanvasElement(id,w,h,bg=null).getContext('2d');}
function createCanvas2D(id,w,h,bg=null){ return newCanvasRenderer2D(id,w,h,bg=null);}// shorten
function C2D(id,w,h,bg=null){ return newCanvasRenderer2D(id,w,h,bg=null);}// shorten even more
/** set/get width/height*/
function canvasWidth(c,w=null){	if(w===null){	return c.getAttribute('width');}else{c.setAttribute('width',w);return c;}}
function canvasHeight(c,w=null){	if(w===null){	return c.getAttribute('height');}else{c.setAttribute('height',w);return c;}}
function canvasDim(c,dim=null){
	if(dim===null){ return [c.getAttribute('width'),c.getAttribute('height')];}
	if(dim.length===2){ c.setAttribute('width',dim[0]);c.setAttribute('height',dim[1]); return c;}
	else{ console.warn('wrong parameter dim '+dim+' must be [w,h] ');return null;}
}
function setFullpageCanvas(c){ c.setAttribute('width',window.innerWidth);c.setAttribute('height',window.innerHeight);return c;}
function setOverScan(c){	return setFullPageCanvas(c);}//-- shorten 
//-- createCanvasAndRender2D return Array(HTMLcanvasElement,renderer2d)
function createCanvasAndRender2D(id,w,h,bg=null){
	let t=newCanvasElement(id,w,h,bg);return [t,t.getContext('2d')];
}
function canvas2D(id,w,h,bg=null){return createCanvasAndRender2D(id,w,h,bg=null);}//-- shorten createCanvasAndRender2D(id,w,h,bg=null)
/** Specifics CANVAS 
* newCartesianAxis a surface to draw geometric/mathematical F(x) */
function newCartesianAxis(id,w,h,bg='#FFF'){
	let ca=createCanvasAndRender2D(id,w,h,bg);
	//ca[1].save();
	ca[1].translate(w/2,h/2);//-- obviously centered to canvas
	ca.lineWidth=1;
	drawLine(drawLine(ca[1],-w/2,0,w/2,0),0,-h/2,0,h/2 );
	return ca;
}
function newCR(id,w,h,bg='#fff'){return newCartesian(id,w,h,bg);}//-- shorten (old name was CanvasRepere)
function wideCartesianAxis(id,bg='#FFF'){
	dumplog('window Sizes['+window.innerWidth+','+window.innerHeight+']',wideCartesianAxis);
	return newCartesianAxis(id,window.innerWidth,window.innerHeight,bg);
}
function newWCR(id,bg='#FFF'){return wideCartesianAxis(id,bg);}//-- shorten notation

/** * get WIDTH AND HEIGHT OF CANVAS 
// see also : //putWidthHeight() functional.js
*/
/** REMOVED or to make better !!! NOT so clear !!!
function canvasPixels(anycanvas){
	let tm=new Array(2);
	let units=new Array(2);
	
	units[0]=getAttr(anycanvas, 'width');
	units[1]=getAttr(anycanvas, 'height');
	
	tm[0]=parseFloat(units[0]);
	tm[1]=parseFloat(units[1]);
	if( !isInt(tm[0]) || !isInt(tm[1]) || tm[0]===0 || tm[1]===0 ){
		units=new Array(2);
		units[0]=getProp(anycanvas, 'width');// fn getProp( is short write for fn getCssValue( 
		units[1]=getProp(anycanvas, 'height');

		tm=new Array(2);
		tm[0]=parseFloat(units[0]);
		tm[1]=parseFloat(units[1]);
		if( !isInt(tm[0]) || !isInt(tm[1]) || tm[0]===0 || tm[1]===0 ){
			return [false, false];
		}
		
	}
	units[0]=units[0].slice(tm[0].length);
	units[1]=units[1].slice(tm[1].length);
	units[0].trim();
	units[1].trim();
	if(units[0]==='%'){	tm[0]=tm[0]/100;	}
	if(units[1]==='%'){	tm[1]=tm[1]/100;	}
	//-- will return float value ! to show off that not pixel value
	// TODO : use a value with em or pt !SHOULD BE ANOTHER METHOD !?  
	return [tm[0], tm[1]];/ WILL RETURN int (for px) or float for % 
}
function canvasPercent(canvas, perwidth, perheight){// typeof args[1,2] : numeric percent 
	let dims=canvasPixels();
	let res=new Array(2);
	if(isInt(dims[0])){	res[0]=perwidth*dims[0]/100;	}
	if(isInt(dims[1])){	res[1]=perheight*dims[1]/100;	}
	if(isFloat(dims[0])){	res[0]=perwidth;}
	if(isFloat(dims[1])){	res[1]=perheight;}// will return params if % used
	return [dims[0],dims[1]];
}
*/
/**-------------------------------------------------------------------------------------------------------------
-------------------------------------------------  CANVAS 2D *save, restore,externalise 	------------------------------*/
/** notice CTX suffix indicate CanvasRenderer2D from canvas tag ! *could use CTY for a 3D renderer if/when any  */
/** SAVE AND RESTORE */
function saveCTX(ct){ct.save(); dumplog('context saved',ct);return ct;}
function restoreCTX(ct){	ct.restore(); dumplog('context restored',ct);return ct;}
/** intoCTX 
*IS THE UPPER CLOSURE TO SAVE RESTORE 
*/
function intoCTX(ct, instructs){
	instructs( saveCTX(ct) ) ;
	return restoreCTX(ct);
}
/** EXAMPLE(notice DONT FORGET TO RETURN CanvasRendererContext2D in instructs !) : *
 setsCTX(
	ct, function (ct){
		return drawStroke(lineColor(drawRect( ct, 0, 0, 400, 300 ), '#ff0000'));
	}
); 
*/
/**--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------  CANVAS 2D *drawing settings 	----------------------------------------------------------------------------------------------------------------
*
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/** GETTERS settings
  * TODO yet experimental could use a global variable Array/Object to stock/reference them !!! */
function getCTXColorSets(ct){/** get colors values as litteral object */
	let settings={};
	if(ct.fillColor !== null){settings.fillColor=ct.fillColor; }
	if(ct.strokeColor !== null){settings.strokeColor=ct.strokeColor; }
	return settings;
}/** TODO Same with lineWeight .. others settings possible to externalise */

function getColorsC(ct){	return getCTXColorSets(ct); }/** getColorsC is shorten of getCTXColorSets */

/** SETTERS settings */
function lineWidth(ct, wdth=1){	ct.lineWidth=wdth; return ct;}
/** lineCap(..  cap accept 'butt'(default), 'round', 'square' */
function lineCap(ct, cap){ ct.lineCap=cap; return ct; }
function fillColor(ct, color){	ct.fillStyle=color; return ct;}//--color or gradient
function strokeColor(ct, color){	ct.strokeStyle=color; return ct;}//-- color or gradient
function stkColor(ct,color){}/** shorten strokeColor */
function globalAlpha(ctx, alphavalue){
	alphavalue=alphavalue>1?1:alphavalue; alphavalue=alphavalue<1?0:alphavalue; 
	ctx.globalAlpha=alphavalue;return ctx;
}
/** IMPORTANT TODO : lineJoin,  miterLimit */
/** lineStroke(.. *set  strokeColor, lineWidth and cap */
function lineSet(ct, color, width=1, cap='butt'){ return lineCap(lineWidth(strokeColor(ct,color),width),cap);}
function colorsCanvas(ct,stkcolor,filcolor ,galpha=null){//-- set stroke and fill colors, eventualy globalAlpha
	if(galpha!==null){globalAlpha(ct,galpha);}
	return fillColor(strokeColor(ct,stkcolor),filcolor);
}
function colorsC(ct,stk,fll){	return colorsCanvas(ct,stk,fll); }//-- shorten colorsCanvas
function setColorsLineFill(ct, colorbord, colorbg, width=1, cap=butt, galpha=null){
	return globalAlpha(lineSet( fillColor( ct , colorbg ) , colorbord, width ), galpha );
}
function setsC(ct, colorbord, colorbg, width=1, cap=butt, galpha=null){//-- shorten setColorsLineFill
	return setColorsLineFill(ct, colorbord, colorbg, width=1, cap=butt, galpha=null);
}
/** IMORTANT TODO set shadowCOlor, shadowBlur, shadowOffsetX/Y */
/** 
* notice that a gradient can be used in any color(stroke/fill) of drawing !
*TODO COMPLETE THE GRADIENT + add Radial ...*/
function drawLinearGradient(ct, xo,yo,x1,y1, colorStop=['black', 'white'], style='fill'){
	let g;
	g=ct.createLinearGradient(xo,xo,x1,y1);
	for(let i=0;colorStop.length<i;i++){
		g.addColorStop(i, colorStop[i]);
	}
	switch(style){
		case 'fill':
			ct.fillStyle=g;
		break;
		case 'stroke':
			ct.strokeStyle=g;
		break;
		case 'both':
			ct.fillStyle=g;
			ct.strokeStyle=g;
		break;
		default:
			ct.fillStyle=g;
		break;
	}
	return ct;
}
/** tanslate, rotate, and such */
//function clearOrigin(){} // if possible(?) reset translate to coordinates (0,0)
/**--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------  CANVAS 2D *drawing 	----------------------------------------------------------------------------------------------------------------
*
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*---------------------------------------------------------------------------------------------------------------------------
/** *	apply draw ( for all except clearRect ) */
function drawStroke(ct){ct.stroke();dumplog(ct+'.stroke() '+this, (''+drawStroke).slice(9,19));	return ct;}
function drawFill(ct){ct.fill();	dumplog(ct+'.fill() ','drawFill'); return ct;}
function drawIt(ct, mode='stroke'){/* mode accept stroke, fill, both  */
	switch(mode){
		case'stroke': 	drawStroke(ct);		break;
		case'fill':		drawFill(ct);		break;
		case'both':		drawFill(drawStroke(ct));	break;
		default:		drawStroke(ct);		break;
	}
	ct.closePath();
	return ct;
}
/** *	THE shapes 	* function 'create' prefix ready the shape, 'draw' prefix ready and draw  * usually with drawIt (see parameter mode) */
function drawClearRect( ct,xo,yo, x1, y1){ ct.clearRect(xo,yo, x1, y1);dumplog('['+xo+','+yo+','+x1+','+y1+']',ct+'.clearRect');return ct;	}
/** clearCanvas will clear with a rectangle shape sized with canvas dim *NOTE shape will not be fitted if any transformation from origin(0,0) still active ! */
function clearCanvas(canvas,fillcolor){//-- mind it
	let ct=canvas.getContext('2d');
	ct.save();ct.fillColor=fillcolor;
	drawClearRect(ct,0,0,canvas.getAttribute('width'),canvas.getAttribute('height'));ct.restore();
return ct;}
function createPath(ctx,draw_instructs){/** -- use closure -- */
	ctx.beginPath();
	draw_instructs(ctx);
	ctx.closePath();
	return ctx;
}
function drawPath(ctx,draw_instructs,mode='stroke'){
	return drawIt(createPath(ctx,draw_instructs),mode);
}
function createLine(ct, xo, yo, xend, yend){//--will note use beginPath()
	ct.moveTo(xo,yo);	ct.lineTo(xend,yend);
	return ct;
}

function drawLine(ct,xo,yo,xend,yend){
	return drawStroke(createLine(ct,xo,yo,xend,yend));
}
//-- drawLineShape NOTE: there's not function createLineShape (yet?) because that's mostly useless to create a shape that will be not draw!
function drawLineShape(ct, points,mode='stroke' ){//-- [[x0,y0],[x1,y1],...] Array(length>=2) of Arrays  
	if(points.length>1){//-- note: TODO add a try catch in for to handle error!
		ct.beginPath();
		ct.moveTo(points[0][0],points[0][1]);
		for(let i=1;i<points.length;i++){
			ct.lineTo(points[i][0],points[i][1]);
		}
		ct.closePath();
		return drawIt(ct);
	}else{		console.warn('wrong points.length not : must be [[x0,y0],[x1,y1],...] with at least 2 points. i.e.: [[0,0],[10,10]] will draw a line from coordinates (0,0) to (10,10)');}
	return ct;
}

function createRect(ct,xo,yo, x1, y2){	ct.rect(xo,yo, x1, y2);return ct;}
function drawRect(ct,xo,yo, x1, y2,mode){	return drawIt(creaRect(ct,xo,yo,x1,y2),mode);	}
function createSquare(ct,xo,yo, width){		return createRect(ct, xo,yo, width, width);		}
function drawSquare(ct,xo,yo,r,width,mode){	return drawIt(createRect(ct, xo,yo, width, width));}
function createArc(c,x0,y0,rado,radZ){	ctx.arc(x0,y0,r,radZ);return ctx;	}
function createCircle(ctx,x0,y0,r){ 	ctx.arc(x0,y0,r,0,2*Math.PI);return ctx;}
function drawArc(ctx,xo,yo,rado,radZ){	return DrawIt(createCircle(ctx,xo,yo,r,radZ));		}
function drawCircle(ctx,xo,yo,r,mode){	return drawIt(createCircle(ctx,xo,yo,r,0,2*Math.PI),mode);}

//function drawQuadraticCurve(){}

/** specialShape */

// --function createQuadraticCurve(){}
/** EXTRA Shapes */
function createTriangle(ct,x0,y0,x1,y1,x2,y2){
	return createPath(ct,function(ct){
		ct.moveTo(x0,y0,);
		ct.lineTo(x1,y1);
		ct.lineTo(x2,y2);
	});
}
function drawTriangle(ct,x0,y0,x1,y1,x2,y2,mode){ return drawIt(createTriangle(ct,x0,y0,x1,y1,x2,y2),mode); }

/** TODO: 



*IMPORTANT TODO
*SPECIFIC LINE : add method to draw shaped lines(zigzag, sinusoid, eventail...) using a starting pointXY and an end pointXY !
*SPECIFIC SHAPELINE : as previous but will use rect/square/circle... as the drawinf shape between start and end points
*/
function drawBrokenLines(ct, points ){//-- [[[xOo,yOo],[xOend,yOend]],[[x1o],[y1o],[x1end,y1end]], ... ] Array(length>=2) of Arrays  
	if(points.length>2){
//		ct.beginPath();// FALCULTATIVE: work is beginPath() used or not // in any case dont use .closePath() -that broken lines and no haves closing path ! would be an error if a path allready open!
		for(let i=0;i<points.length;i++){//-- note: add a try catch in for to handle error!
			ct.moveTo(points[i][0][0],points[i][0][1]); 
			ct.lineTo(points[i][1][0],points[i][1][1]);
			drawStroke(ct);
		}
	}else{ console.warn('wrong points.length not : must be [[[xOo,yOo],[xOend,yOend]],[[x1o],[y1o],[x1end,y1end]], ... ] Array(length>=2) of Arrays');}
	return ct;
}
function hashSegments(ct,xo,yo,xend,yend,len,depth,orientation='x'){//-- orientation = 'x'|'y'
	let tab=[0,0];
	let translation=0;
	let lim;
//	ct.save()
//	ct.strokeStyle='#c0c0c0';
//	ct.lineWidth=2;
	switch(orientation){
		case 'x':	 lim=xo+len;break;
		case 'y':	 lim=yo+len;break;
		default:	 lim=xo+len;orientation='x';break;
	}
	if(orientation==='x'){//-- horizontal hashs
		for(let o=0;o<=len;o+=depth){
			ct.translate(tab[0],0);
			drawLine(ct,xo,yo,xend,yend);
			tab[0]=depth;
			translation+=depth;
		}
		ct.translate(-1*translation,0);
	}else{//-- vertical hash
	for(let o=0;o<=len;o+=depth){
			ct.translate(0,tab[1]);
			drawLine(ct,xo,yo,xend,yend);
			tab[1]=depth;
			translation+=depth;
		}
		ct.translate(0,-1*translation);
	}
//	ct.restore();
	
	 
}
function drawShapeLine(ct,shapr){
	
}
//function shaperSet([ctx,ox,oy,zx,zy]){ let t={ ctx:ctx };}
function shaper(params,name){
	switch(name){
		case 'rect':		return createRect(params.ctx,params.xo,params.yo,params.x1,params.y1);break;
		default: console.log();break;
	}
}
/**

drawImage(image, dx, dy) takes an image and draws it on the canvas. The given
coordinates (dx, dy) will be the upper-left corner of the image. Coordinates (0,
0) would draw the image at the upper-left corner of the canvas.
� drawImage(image, dx, dy, dw, dh) takes an image, scales it to a width of dw and a
height of dh, and draws it on the canvas at coordinates (dx, dy).
* drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) takes an image, clips it to the rectangle (sx, sy, sw, sh), scales it to dimensions (dw, dh), and draws it on the canvas at coordinates (dx, dy).
*/
/** 
IMAGE(s) on 2D CANVAS
*/
//-- IMPORTANT modifier ou ajouter function drawImage pour utiliser soit Object.image.src as parameter soit Image soit HTMLIMAGEElement !!!
function drawImage(ct, img, args){/** draw image using Object.Image as arg 
*			IMPORTANT :  	args use array like, length determine the length of ct.drawImage PARAMETERS  
* possible params 8: [ sx, sy, sw, sh, dx, dy, dw, dh ] OR 4: [dx, dy, dw, dh] OR 2: [dx, dy] */
	let l=args.length;
	switch(l){
		case 2:	ct.drawImage(img, args[0], args[1]);
		break;
		case 4:	ct.drawImage(img, args[0], args[1], args[2], args[3]);
		break;
	/*	8 parameters method * drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) takes an image, clips it to the rectangle (sx, sy, sw, sh), scales it to dimensions (dw, dh), and draws it on the canvas at coordinates (dx, dy) */
		case 8:	ct.drawImage(img, args[0], args[1], args[2], args[3],args[4], args[5], args[6], args[7] );
		break;
		default:
		saylog('ERROR: wrong parameter(args) length');
		break;
	}
	return ct;
}
function drawImageSrc(ct, src ,  args){/** see args in drawImage */
	let img=new Image();
	img.src=src;
	return drawImage(cr, img, args);
}
//-- 
