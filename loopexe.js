/**
message from scripting 
	**constantes
	*WIP  : text message to use in debug and dev allthough data pools mostly informations about datas, still not JSon Object nor asynchronous(AJAX)
*/
const NAME='name:';const MK='*CREATED*';const MKN=MK+NAME;const F='[FUNCTION]()';const INTNUM='[Integer]()';
const FLOATNUM='[Float]()';const OBJ='[OBJECT]{}';const CLA='[CLASS]{()}';
/** ERROR *handling messages */const DBG='DEBUG';
const ERR='#ERROR#';const BAD='BAD:wrong value or parameter ';const MUST='value or parameter MUST:';const OUTRANGE='value or parameter OUT OF RANGE:';
const CANT='UNAVAILABLE value or parameter:';const YET='ALREADY exist:';const ERRYET=ERR+YET;const ERRNOT=ERR+'not found:';const NULL='NULL or undefined value:'
const ERRNULL=ERR+NULL;

/**	*other abstractions	*/
const FRM='FRAME';const NUM='[number]';const FRMN=FRM+NUM;


/**	polyfil requestAnimationFrame provided by Paul Irish	*/
window.requestAnimFrame = (function(callback){
return window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback){
window.setTimeout(callback, 1000/60);//--- NOTE : REPLACE WITH DEFAULTSPEED or a setted speed !
};
})();
/** -------------------------------------------------- -------------------------------------------------- -------------------------------------------------- 
*	class LoopExe
*	based on animotor.js class AnimationRatio XT class Animation
*	IMPORTANT : class LoopExecuter WILL REQUIRE functional.instructions.js 
 -------------------------------------------------- -------------------------------------------------- -------------------------------------------------- */

class LoopExe{
	constructor(spd){
		this.useSpeed=false;//-- 
		this.feed;//-- trigger
		this.disp;//-- pass objects(s)
		this.timer={
			speed:spd,
			burnspeed:0,
			t:0,
			startTime:null,
			pauseTime:null,//-- NOTICE pauseTime contain multiple debut, end of pause(Array) or null(there's no pause) 
			timeInterval:0,
			lastTime:0,
			framecount:0,
			state:false, //-- aka this.animating
			limit:{}
			
		}
		this.loopDebut;//-- this.stageDebut
		this.loopExe;//-- this.stage
		this.loopFinish;//-- this.stageFinish
	}
/**	--------------------------------------------------------------------------------------------------------	*
	GETTERS
	--------------------------------------------------------------------------------------------------------	*/
	isTimeRatio(){	return this.useSpeed;}
	isLoop(){		return this.timer.state;}
	duration(){		return timeNow()-this.timer.startTime;}//-- INSTANT value(is the real duration)
	lastDuration(){	return this.timer.startTime-this.timer.lastTime;}//-- with startTime-lastTime
	realDuration(){	return this.timer.startTime-this.timer.lastTime-this.timer.timeInterval;}//-- with startTime-lastTime-timeInterval MIND timeInterval value would be updated in loop/loopTime
	getSpeed(){		return this.timer.speed;}
	getInterval(){	return this.timer.timeInterval;}
	getRatio(){		return this.timer.timeInterval/this.timer.speed;}
	getFPS(){		return (this.duration()/(this.timer.framecount-2));}//-- TODO : debug, only average time/frame ms ! count each 1000ms each average 
	isPaused(){return !isReal(this.pauseTime) || this.pauseTime[this.pauseTime.length-1].length===2 ? false : true; }
	/** getter for pause(s) duration not yet tested, TODO : check theses one but later 'cause not needed yet */
	getPausesDurations(){
		if( !isArray(this.pauseTime) ){	return 0;}
		let tot=[];
		if(this.pauseTime.length>1){
			for(let i=0, len =this.pauseTime.length-1;i<len;i++){//-- all except the last index !!!
			let tmp=this.pauseTime[i].length===2 ? this.pauseTime[i][1]-this.pauseTime[i][0] : 0;
				tot.push( tmp );
			}
		}
		tot+= this.pauseTime[this.pauseTime.length-1].length===2 ? this.pauseTime[this.pauseTime.length-1][1]-this.pauseTime[i][0] : timeNow()-this.pauseTime[this.pauseTime.length-1][0];
		return tot;
	}
	getTotalPausesDuration(){
		let t=this.getPausesDurations();
		return t===0 ? t : t.totalize();
	}
/**	--------------------------------------------------------------------------------------------------------	*
																					--[ SETTERS ]--
	--------------------------------------------------------------------------------------------------------	*/
	setUseSpeed(bool=true){	this.useSpeed = bool==true?bool:false;return this;}
	setLimitName(n,d){
		if(!isNum(d)){	return ERR+BAD+d+BAD+'numeric';}
		this.timer.limit[n]=d;
		return this;
	}
	setLimitDuration(d){	return this.setLimitName('duration',d);		}
	setLimitFrame(d){		return this.setLimitName('framecount',d);	}
	setStopLimits(duree,fcount){		return this.setLimitDuration(duree).setLimitFrame(fcount);	}//-- set both duration and frame limits 
	setNoLimits(){	this.timer.limit={}; return this;}
	setNoLimitDuration(){this.timer.limit.duration=null; return this;}
	setNoLimitFrame(){this.timer.limit.framecount=null; return this;}
	
	addPauseTime(pausetime){//-- 
		if(!isNum(pausetime)){	return ilog(ERR+BAD+' Number argument '+pausetime);}
		if(!isReal(this.pauseTime)){//-- création Array des pauseTime ( pauseTime [[debutpause, endpause ou null],...] avec le debut pausetime
			this.pauseTime=[[pausetime]];
		}else if(this.pauseTime.length>1 ){
			if(this.pauseTime[this.pauseTime.length-1].length===2){
				this.pauseTime.push([pausetime]);
				return this.pauseTime.length;
			}return ilog(ERR+' last pause time must has a end pause time before you can add a pause time (Array length MUST be 2 ');
		}
	}
	setPauseNow(){	return addPauseTime(timeNow());}
	endPauseTime(endpause){//-- WILL NOT RUN THE LOOP: setting the time of pause ending!
		if(!isArray(this.pauseTime)){	return seelog(ERR+'no pause has been set');}
		if(this.pauseTime[this.pauseTime.length-1].length===1){//-- ok if timePause last index IS [ [pausetimedebut] ]
			this.pauseTime[this.pauseTime.length-1][1]=endpause;
			return this.pauseTime.length;
		}return ilog(ERR+' pause debut not found in pauseTime['+(this.pauseTime.length-1)+']');
	}
	
/**	--------------------------------------------------------------------------------------------------------	*
																					--[ SETTERS EXELIST ]--
	--------------------------------------------------------------------------------------------------------	*/

	setLoopDebut(func){	console.log(F+'setDebut executer : '+func);	if (isReal(func)){this.loopDebut=func;seelog('setStage : '+this.loopDebut); return this;}return warn(ERRNULL+func);}
	setLoopExe(func){	console.log(F+'setLoopExe executer : '+func);	if (isReal(func)){this.loopExe=func;seelog('setLoopExe : '+this.loopExe); return this;}return warn(ERRNULL+func);}
	setLoopFinish(func){	console.log(F+'setLoopFinish executer : '+func);	if (isReal(func)){this.loopFinish=func;seelog('setLoopFinish : '+this.loopFinish); return this;}return warn(ERRNULL+func);}
	setLoop(f0,f,fz){
		this.setLoopDebut(f0);
		this.setLoopExe(f);
		this.setLoopFinish(fz);
	}
	
	loopAll(){
		if(isReal(this.loopDebut)){			this.loopDebut();		}
		if(isReal(this.loopExe)){			this.loopExe();			}
		if(isReal(this.loopFinish)){		this.loopFinish();		}
	}
/**	--------------------------------------------------------------------------------------------------------	*
																					--[ Methods Running the loop ]--
	--------------------------------------------------------------------------------------------------------	*/
	start(){
		this.timer.state = this.timer.state==false ? true : false;
		if(this.timer.state!==true){	return ERR+BAD+'timer.state be false to start the loop'; }
		this.timer.startTime = timeNow();
		this.loopAll();//-- do the frame 0
		saylog('\t***\t'+FRMN+'0 DONE at '+timeNow());
		if(this.useSpeed==true){		saylog('\t***\tuse speed('+this.timer.speed+') loop start');	this.loopTime();		}
		if(this.useSpeed==false){		saylog('\t***\tno speed loop start');	this.loop();		}
//		return this;
	}
	unpause(){
	/**  loop isn't started nor set (set to NULL -- ou 0 (NOTE: startTime < 1 n'est pas possible pour l'instant mais peut être utilisé plus tard ) */
		if(!isReal(this.timer.startTime) || this.timer.startTime<1 ){	return seelog(ERR+'loop has not been started, use .start() method to run the loop.');  }
	/** mise à jour de limit (durée/frames) : REPORT des limites
	* NOTE : si limit.duration et limit.framecount sont tous les 2 présentes seules la limite ayant arrête la loop risque d'être mise à jour, avec les risques que cela comporte! Penser à supprimer l'un des deux (voir setNoLimit/setNoLimitDuration/setNoLimitFrame
	*	TODO: create method for up^date limit !
*/
		if(isReal(this.timer.limit.duration) && this.timer.limit.duration>=this.duration()){	this.timer.limit.duration += this.duration(); }//-- limit.duration devient this.duration+limit.duration(ancienne limite)
		if(isReal(this.timer.limit.framecount) && this.timer.limit.framecount>= this.timer.framecount){	this.timer.limit.framecount+=this.timer.framecount;}

		this.timer.state = this.timer.state==false ? true : false;
		if(this.timer.state!==true){	return ERR+BAD+'timer.state be false to start the loop'; }
/** 	SET pauseTime*/		
		this.addPauseTime(this.timer.lastTime);
		this.endPauseTime(timeNow());
		saylog('\t\t\tpause at '+this.pauseTime.join(' to '));
		if(this.useSpeed==true){		saylog('\t***\tuse speed('+this.timer.speed+') loop unpause');	this.loopTime();		}
		if(this.useSpeed==false){		saylog('\t***\tno speed loop unpause');	this.loop();		}
	}
	
	stop(){
		this.setNoLimits();//--- TODO : remove this line,  make methods for check limit(s) and put in there) !! IMPORTANT !!!
		let chk=this.isLoop();saylog('current loop run state is '+chk);
		this.timer.state = this.timer.state===true ? false : this.timer.state;
		return chk;
	}
	loop(){
//--  CHECK for end/pause limit(s)
		if(this.timer.limit.duration!=null){			if(this.timer.limit.duration<=this.duration()){ seelog('STOP '+this.stop()+' at duration :'+this.duration()+'ms');	return this.duration()-this.timer.limit.duration;		}}
		if( this.timer.limit.framecount != null ){	if(this.timer.limit.framecount <= this.timer.framecount ){ seelog('STOP '+this.stop()+' after '+this.timer.framecount+' frame'); return this.timer.framecount;		}	}

		let that =this;

		let thisTime=timeNow();
		this.timer.timeInterval=thisTime-this.timer.lastTime;
		this.timer.t=this.timer.timeInterval;
		this.timer.lastTime=thisTime;
		
		this.loopAll();
		
	
		this.timer.framecount++;
		saylog('TO'+DBG+' FPmS: '+this.getFPS()+' ecart moyen pour \'instant en ms');//-- TODO à compter tout les 1000 pour la dernière valeur seulement!
		saylog('LOOP framecount: '+this.timer.framecount+' duration '+this.duration()+'ms interval '+this.timer.timeInterval+'ms at timeInterval = '+thisTime+'-'+this.timer.lastTime+' = '+this.timer.timeInterval);

		if(this.isLoop()){
			return requestAnimFrame(	function(){	that.loop();}	);
		}return 0;
	}
/** NOTE : loopTime() similar to loop() BUT USE this.timer.speed */
	loopTime(){
		//--  CHECK for end/pause limit(s)
		if(this.timer.limit.duration!=null){				if(this.timer.limit.duration<=this.duration()){ seelog('STOP '+this.stop()+' at duration :'+this.duration()+'ms');	return this.duration()-this.timer.limit.duration; }	}
		if( this.timer.limit.framecount != null ){	if(this.timer.limit.framecount <= this.timer.framecount ){ seelog('STOP '+this.stop()+' after '+this.timer.framecount+' frame'); return this.timer.framecount;}	}
		
		let that =this;

		let thisTime=timeNow();
		this.timer.timeInterval=thisTime-this.timer.lastTime;

		if(this.timer.timeInterval >= this.timer.speed-this.timer.burnspeed){
			this.timer.burnspeed= this.timer.timeInterval-this.timer.speed >0 ? this.timer.timeInterval-this.timer.speed : 0 ;
			this.timer.t=this.timer.timeInterval;
			this.timer.lastTime=thisTime;
	


			
			this.loopAll();
			
			
			this.timer.framecount++;
			saylog('FPS: '+this.getFPS());
		}else{
			saylog('\t\t\t\t** interstate time '+FRMN+this.timer.framecount+' burnspeed:'+this.timer.burnspeed+' **');
		}
		saylog('LOOP framecount: '+this.timer.framecount+' duration '+this.duration()+'ms interval '+this.timer.timeInterval+'ms at timeInterval = '+thisTime+'-'+this.timer.lastTime+' = '+this.timer.timeInterval);

		if(this.isLoop()){
			return requestAnimFrame(	function(){	that.loopTime();}	);
		}return 0;
	}
}
/** -------------------------------------------------- -------------------------------------------------- -------------------------------------------------- 
	class LoopExecuter
	*same as mother class  BUT use function executer ONLY(as describe in  functional.instructions.js ) !!! 
 -------------------------------------------------- -------------------------------------------------- -------------------------------------------------- */
class LoopExecuter extends LoopExe{
	constructor(spd){
		super(spd);
		this.loopDebut=[];//-- this.loopDebut redefine as listInstructions , see functional.instructions.js
		this.loopExe=[];//-- this.loopExe redefine as listInstructions , see functional.instructions.js
		this.loopFinish=[];//-- this.loopFinish redefine as listInstructions , see functional.instructions.js
		this.interstateResult={ debut:null, exe:null, finish:null };
		this.useSpeed=true;//-- default value change to true !!! but can do either !
	}
	/** xOrXlist check IF IS makeInstruction (Array) OR instructionsList (Array(makeInstruction) * NOTE: even IF NOT use the cited functions as maker!!! */
	xOrXlist(xl){
		if(isArray(xl)){
			if( isString(xl[0]) && xl.length>1 && xl.length<=3){//-- param is instructions (Array) as [name,func,arg=null]
				return 0;//-- if an instructions (Array[String,Function,arg=null]
			}else if (isString(xl[0][0]) && xl[0].length>1 && xl[0].length<=3 ){//-- param is listInstructions as [[name,func,arg=null],...] //-- MIND THAT only first index is check !
				return 1;//-- if a list of instructions(array)
			}
		}
		return -1;//-- wrong type
	}
	
	/** 		*NOTICE : that (redefinitions) setLoopDebut, setLoopExe, setLoopFinish are NOT optimized !! *as methods addLoopDebut/Exe/Finish */
	setLoopDebut(xl){//-- redefine to use listInstructions
		let chk=this.xOrXlist(xl);
		switch(chk){
			case 0:this.loopDebut=[xl];			break;
			case 1:this.loopDebut=xl;			break;
			default:seelog(ERR+xl+BAD+' loopDebut [String,Function,arg OR null] OR [[String,Function,arg OR null],...]'); break;
		}
		if(chk>-1){	saylog('loopDebut SET*'+this.loopDebut.join('\n*') ); }//-- remove this line ONLY FOR DEBUG!
		return chk>-1 ? this.loopDebut.length : null;
	}
	addLoopDebut(nm,func,arg=null){
			let tmp=makeInstruction(nm,func,arg);
			isReal(tmp) ? this.loopDebut.push( tmp ) : seelog(ERR+BAD+'argument must be 0(name) :  String AND 1(function): Function ');
			return this.loopDebut.length;
	}
	setLoopExe(xl){
		let chk=this.xOrXlist(xl);
		switch(chk){
			case 0: this.loopExe=[xl];		break;
			case 1: this.loopExe=xl;		break;
			default:seelog(ERR+xl+BAD+' loopExe [String,Function,arg OR null] OR [[String,Function,arg OR null],...]'); break;
		}
		if(chk>-1){	saylog('loopExe SET*'+this.loopExe.join('\n*') ); }//-- remove this line ONLY FOR DEBUG!
		return chk>-1 ? this.loopExe.length : null;
	}
	addLoopExe(nm,func,arg=null){
			let tmp=makeInstruction(nm,func,arg);
			isReal(tmp) ? this.loopExe.push( tmp ) : seelog(ERR+BAD+'argument must be 0(name) :  String AND 1(function): Function ');
			return this.loopExe.length;
	}
	setLoopFinish(xl){
		let chk=this.xOrXlist(xl);
		switch(chk){
			case 0:this.loopFinish=[xl];		break;
			case 1:this.loopFinish=xl;			break;
			default:seelog(ERR+xl+BAD+' loopFinish [String,Function,arg OR null] OR [[String,Function,arg OR null],...]'); break;
		}
		if(chk>-1){	saylog('loopFinish SET*'+this.loopFinish.join('\n*') ); }//-- remove this line ONLY FOR DEBUG!
		return chk>-1 ? this.loopFinish.length : null;
	}
	addLoopFinish(nm,func,arg=null){
		let tmp=makeInstruction(nm,func,arg);
		isReal(tmp) ? this.loopFinish.push( tmp ) : seelog(ERR+BAD+'argument must be 0(name) :  String AND 1(function): Function ');
		return this.loopFinish.length;	
	}
	
	loopAll(){
		//--function readListInstructions(anyxlist){
		let res0, res1,resz;
		if(this.loopDebut.length>0){	res0=readListInstructions(this.loopDebut);	}
		if(isReal(res0)){	this.interstateResult.debut=res0;}
		if(this.loopExe.length>0){		res1=readListInstructions(this.loopExe);	}
		if(isReal(res1)){	this.interstateResult.exe=res1;}
		if(this.loopFinish.length>0){	resz=readListInstructions(this.loopFinish);	}
		if(isReal(resz)){	this.interstateResult.finish=resz;}
		saylog('RESULTS {debut:'+ isReal(res0)?res0:'none' +', exe:'+(isReal(res1)?res1:'none')+', finish:'+(isReal(resz)?resz:'none')+'}' );
	}
}
