/*USE VIDEO API, AUDIO, CANVAS*/
function videoPlayer(nameid, container=null, list='default'){
	let vp={
		type:{
			description:'video',
			selected:'video',
			ui:{theme:'default'},
			box:container		},
		video:{
				screen:(newTagId('video', nameid) ),
				id:nameid,
				canplaytype:'uncheck',
				src:'unset',
				altsrc:'unset',
				autorun:true 	},
		player:{
				idfix:'UI',
				screen:newTagId('form', ''+nameid+'UI'),
				inputs:{}// see addInput[{label:'', type:'head'}],
//		Internal public methods
		},
		addInput:function(type, label, value, position='last'){
			
		},
//		makeInput:function(type){},
		makeLabel:function(){	saylog('makeLabel yet to come');},
		append : function(dest){
			if(dest!==null){ dest.appendChild(this.video.screen);}else{	return false;}
			let tmp=this.video.screen;
			if(dest.tmp){dest.removeChild(this.video.screen); }
			dest.appendChild(this.video.screen);
			return this;
		},
		mediaplayer : function(){	return this;},
		mp:function(){	return this.mediaplayer;},// shorten mediaplayer
		initDom:function(){
			toDom(
				newTagId('article','vpui'),
				toDom(destIn( this.video.screen, newSectionArticleId('vpholder','vpscreen') ), body())
			);
		},
		disp:function(aim='vpscreen'){
			//alert(this.player.screen);
			//if(getId('vpholder')===undefined){
				this.initDom();//}
			//if( !body().getElementById(this.video.id) ){	body().removeElement(body().getElementById(this.video.id));}// check if allready added ! todo !!! if(body().getElementById('
			this.append(getId(aim));
			this.type.box=aim;
			if(this.type.ui.theme==='default'){
/** NOTE: 		function.button.parameters(id, val, alt, content)*/
				toDom(	addBt('fromstart', -1, 'from start', '0'), this.player.screen);
				toDom( 	addBt('nextplay', -1,'next' , '>>'),this.player.screen);
				toDom(	addBt('stopplay', -1,'stop' , '-'),this.player.screen);
				toDom(	addBt('prevplay', -1,'previous' , '<<'),this.player.screen);
				toDom(	addBt('playpause', -1,'play' , '>'),this.player.screen);
			}
			toDom(this.player.screen, getId('vpui'));
			saylog('display player');
			return this;
		}
			
	}
	return vp;
}
function mediaPlayer(	nameid, container=null, list=[], selectedtype='video'){
	let mp= videoPlayer(nameid, container=null, list='default');
	if(selected!=='video'){}
}