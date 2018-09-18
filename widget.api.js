
let _refWidgetAPI;//-- global varibale used as global reference (ie: 
/** 
	* OBJECT class
					*/
class API{
	constructor(){
		this.appName;
		this.config={};
		this.main={
			dependancies:{
				domain:null,
				scripts:[],//-- only JavaScript files
				path:[],
				plug:function(){
					for(let i=0;i<this.scripts.length;i++){
						let sc=document.createElement('script');
						sc.setAttribute('src', this.path[0]+this.scripts[i] );
						document.head.appendChild(sc);
					}
				}
			},
			description:{
				designation:'ABSTRACT',
				type:'class',
				name:'API ',
				version:1,
				runmode:'',
				text:(this.type+' '+this.name+' API '+this.designation+' run as '+this.runmode)
			},
			state:{ready:'LOADING',working:null},
			methods:{},
			root:null,
			stage:null,//Object
			datas:null //Object
			
		}//end this.main
		
	}//-- end constructor
	defineRef(refered){
			if(_refWidgetAPI===undefined){
				_refWidgetAPI=refered;
			}else{
				console.warn('reference allready defined. delete before define anew! ');
				console.log('tip: you can define refered as multiple values(i.e.: Array, Map, Object)');
			}
	}
	deleteRef(){
		console.log('CAUTION: refere,ce deleted!');
		_refWidgetAPI=null;
	}
}
class APIfunctional extends API{
	constructor(){
		super();
		this.main.name = 'APIfunctional';
		
		this.main.dependancies.domain=['functional'];
		this.main.dependancies.scripts=['functional.1-0.js'];
		this.main.dependancies.path=['../libraries/'];//-- /!\ MUST BE COUPLED with dependancies.script 
		
	}
}
class WidgetFunctional extends APIfunctional{
	constructor(){
		super();
		this.main.name = 'WidgetFunctional';
		this.main.dependancies.scripts.push('functional.head.js');
		this.main.dependancies.path.push('../libraries');
		
		this.main.dependancies.scripts.push('functional.polyfill.js');
		this.main.dependancies.path.push('../libraries');
		
	}
}
