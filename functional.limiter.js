const LIMITDIRECTIONS=['>','>=','<','<='];



/** functional.limiter.js  */

/** TOOLS
may be in functionals.js
*/
function nullIsFalse(v){	return v===false || v===null ? false:v;}
function falseNull(v){		return nullIsFalse(v);}//-- shorten write
/** 
	**functional.limiter.js
		*is a limit checker of [<, >, <=, <=]
		* note: that numeric values are used but file will continue with around 
			#par exemple: tester les valeurs des couleurs en fonctions des limites R,V,B (RGB) sera un truc du genre:
			*	limitRedish(r,g,b){	return r>(g*30/100) && r>(b*30/100) ? } //-- note need color and convert to 256 values instead of hexa2bites(32)


*/

function numLimit( val, directio='>',  toler=false){
	let lm = {
		list:[],
		addLimit:function(v,direction,tolerance=false){
			let tab=new Array(3);
			if(v instanceof Number){	return;}
			direction = direction===true ? '>' : direction===false ? '<': direction;//-- true or false stand for > or <
			if(LIMITDIRECTIONS.includes(direction)) {	tab[0] = direction ;}
				tab[1] = v;
				if(tolerance!==false){
					if(isNumber(tolerance)){	tab[2]=tolerance;
					}else{ warn('wrong parameter : tolerance type:'+tolerance+' MUST be a Number! default set to false');tolerance=false;}
				}
				tab[2] = tolerance;
				this.list.push(tab);
		},
		setLimit:function(i,v,d,t=false){
			d = d===true ? '>' : d===false ? '<': d;
			if(isReal(this.list[i]) && isNumber(v) && LIMITDIRECTIONS.includes(d) ){
				if( isBool(tolerance) || isNumber(tolerance) ){
					this.list[i]=[v,d,t];
					return this;
				}
			}return;
		},
/** method testLimit
*		*CAUT ION NOTE:	#Inversion des limites 
			*POUR une tolérance negative le résultat sera inverse selon le test > ou >= tab[1] une tolérance de -10 sera équivalente à moins de tolérance car tab[1]--10 =tab[1]+10 pareil pour < et <= tb[1]+-10 =tab[1]-10 
*/
		testLimit(chk,ix=0,usetolerance=true){
			let test, tab=this.list[ix];
			
			if(isNumber(chk) && isReal(tab) && tab.length===3){	
				let r;
				seelog('testLimit ['+ix+'] check '+chk+' tolerance('+usetolerance+' of '+tab[2]+') with limit '+tab[0]+tab[1]);
				switch(tab[0]){
					case'>':
					if(chk>tab[1]){	r=true;
					}else if(tab[2]!=false && usetolerance===true){
						if( isNumber(tab[2]) && chk>(tab[1]-tab[2]) ){	r=true; }
					}
					break;
					case'>=':
					if(chk>=tab[1]){	r=true;
					}else if(tab[2]!=false && usetolerance===true){
						if( isNumber(tab[2]) && chk>=(tab[1]-tab[2]) ){	r=true; }
					}
					break;
					case'<':
					if(chk<tab[1]){	r=true;
					}else if(tab[2]!=false && usetolerance===true){
						if( isNumber(tab[2]) && chk<(tab[1]+tab[2]) ){	r=true; }
					}
					break;
					case'<=':
					if(chk<=tab[1]){	r=true;
					}else if(tab[2]!=false && usetolerance===true){
						if( isNumber(tab[2]) && chk<=(tab[1]+tab[2]) ){	r=true; }
					}
					break;

					default:r=0;break;
				}//-- end switch//seelog('after switch value '+r);
			return r==true?r:false;
			}
			warn('*ERROR*WRONG type of tolerance/arguments[0] MUST BE A NUMBER: '+chk);//-- MIND Error(return null) happen IF !isReal(this.list[ix]) //
			return null;//-- 
		},
		limits( chk, toler=true ){
			if( this.list.length<1 ){	return null;}
			let t=[];
			for(let i=0, len=this.list.length;i<len;i++){
				t.push(this.testLimit(chk,i,toler));
			}
			return t.includes(false) ? false:true;
		}
	};
	lm.addLimit(val,directio,toler);
	return lm;
}

/** hitTest2D test for  rectangles/squares shape Intersection X,Y */
function hitTest2D(xmax,xmin,ymax,ymin,boolOnly=[]){//-- xmax shape right border, xmin shape left border, ymax top border , ymin bottom border // IF is hitOnly =[x0,y0, w,h] )
	let h= numLimit(xmax,'<=');	//-- list[0]		//	AS xmax border right on cartesian	(origin horiz+width)	--//
	h.addLimit(xmin,'>=');		//-- list[1] 		//	AS xmin border left on cartesian	(origin horiz)			--//
	h.addLimit(ymax,'<=');		//-- list[2] 		//	AS ymax border top on cartesian	(origin vertic+height)	--//
	h.addLimit(ymin,'>=');		//-- list[3] 		//  AS ymin border bottom on cartesian	(origin vertic)			--//
	/** 
		**SETTERS :
			*methods setLimits, setTolerances, 
				#NOTE : args for theses methods IF !==false AND !==Number THEN will not set Value and keep previous one !!
			*methods setVertical, set Horizontal
				#NOTE : same for !isNumber(any arg value) BUT IF TRUE for TDown will use setted tolerance for ymax aka this.list[2][2] PAREIL 
	*/
	/** 
	*/
	/** JAMAIS TESTER : methods setLimits , setTolerances, setVertical, set Horizontal mais pas de raison ça marche pas
		
		*/
	h.setLimits=function(xmax,xmin,ymax,ymin){/** TODO clean code will use array argument in a for loop ! */
		this.list[0][1]=isNumber(xmax) || xmax===false ? xmax : this.list[0][1];
		this.list[1][1]=isNumber(xmin) || xmin===false ? xmin : this.list[0][1];
		this.list[2][1]=isNumber(ymax) || ymax===false ? xmax : this.list[0][1];
		this.list[3][1]=isNumber(ymin) || ymin===false ? ymin : this.list[0][1];
		return this;
	}
	h.setTolerances=function(xmax,xmin,ymax,ymin){/** TODO optimize code with array arg + for loop : see also h.updateLimits */
		this.list[0][2]= isNumber(xmax) || xmax===false ? xmax : this.list[0][2];
		this.list[1][2]= isNumber(xmin) || xmin===false ? xmin : this.list[0][2];
		this.list[2][2]= isNumber(ymax) || ymax===false ? ymax : this.list[0][2];
		this.list[3][2]= isNumber(ymin) || ymin===false ? ymin : this.list[0][2];
		return this;
	}
	h.setVertical=function(y0,h,TUp=false,TDown=true){//-- y0 origin y , w : width, TUp tolerance top , TDown = toler bottom//-- NOTE (CAUTION) : TDown IS true => use same tolerance as TUp
		this.list[2][1]= isNumber(y0) || y0===false ? y0 : this.list[2][1];
		this.list[3][1]= isNumber(y0+w) || y0+w===false ? y1 : this.list[3][1];
		this.list[2][2]= isNumber(TUp) || TUp===false ? TUp : this.list[2][2];
		this.list[3][2]= TDown===true ?  this.list[3][2] : isNumber(TDown) || TDown===false ? TDown : this.list[3][2];
		return this;
	}
	h.setVertical=function(y0,h,TUp=false,TDown=true){//-- y0 origin y , w : width, TUp tolerance top , TDown = toler bottom//-- NOTE (CAUTION) : TDown IS true => use same tolerance as TUp
		this.list[2][1]= isNumber(y0) || y0===false ? y0 : this.list[2][1];
		this.list[3][1]= isNumber(y0+w) || y0+w===false ? y1 : this.list[3][1];
		this.list[2][2]= isNumber(TUp) || TUp===false ? TUp : this.list[2][2];
		this.list[3][2]= TDown===true ?  this.list[3][2] : isNumber(TDown) || TDown===false ? TDown : this.list[3][2];
		return this;
	}



	h.hitX=function(x0,w){		if(!isNumber(x0) || !isNumber(w)){warn(' WRONG type hitX parameters MUST BE Numbers '+x0+' '+w);	return;}
		let test = h.testLimit(x0+w, 0, false);		test = test===false ? false : h.testLimit(x0, 1, false);
		return test;	
	}//-- intersect x true/false
	h.hitY=function(y0,h){		if(!isNumber(y0) || !isNumber(h)){warn(' WRONG type hitX parameters MUST BE Numbers '+y0+' '+h);	return;}
		let test = this.testLimit(y0+h, 2, false);		test = test===false ? false : this.testLimit(y0, 3, false);		return test;	
	}//-- intersect y true/false
		//-- intersect x, intersect y with with=xmax-xmin , height = ymax-ymin
	h.isHit=function(x,y,w,h){		return nullIsFalse(	this.hitX(x,w) )==false  ? false : this.hitY(y,h);	}
	return boolOnly.length==4 ? h.isHit(boolOnly[0],boolOnly[1],boolOnly[2],boolOnly[3])  : h;
}
/** hitTest2Dim 	*same as hitTest2D BUT take x origin, y origin , width, height of the shape as parameter */
function hitTest2Dim(x0, y0, w, h, testvals=[]){	return hitTest2D(x0+w,x0,y0+h,y0,testvals);	}
