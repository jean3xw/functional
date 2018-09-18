/** dialogmaker.js is an API to make dialogs path/ways and display them
* REQUIRED : functional.1-0.js, functional.form.js, functional.clientstorage.js, functional.head.js
// 	+ TOADD : functional.modal.js (pour remplacer prompt/confirm/alert et ajouter nouvelles fenêtres modales -pas encore fait-
*/
/** tools: ATTENTION l'objet commence à class DialogMaker ! 
*tout le reste est (tools)global pour le moment, TODO: rendre 'private' le 'scope' pour exploitation (closure ou simple parenthése)
*/
function selectOptions(arr,id,pre=''){
	if(Array.isArray(arr)){
		let rt='<select id='+id+' >';
		for(let i=0,len=arr.length;i<len;i++){
			rt+='<option value='+arr[i]+' >'+pre+arr[i]+'</option>';
		}
		return rt+'</select>';
	}return;
}
//-- dialogmaker.js
let dial_ref;//-- used as global variable !!!
const DIALEND='dialog ended';
const TERMINATE='dialog terminate';
const ENDWITH='end width';
//-- function listener:
function btListener(e){
//	let q=anybt.dataset.q;
	console.log(this.value+' clicked');
	dial_ref.display(this.value,dial_ref.viewHolder(),this.parentNode);
}
function validListener(t,siz){
	if(t.value.length>siz){	t.className='valid';
	}else{		t.className='';}
}
function modifQuestionListener(){//-- create and show a form in a modal window
		function updateQuestionValues(){
			
				let qtext=this.parentNode.getElementsByTagName('textarea')[0].value;//-- same value as this.parentNode.getElementsByTagName('textarea')[0].innerHTML 
				let seltags=this.parentNode.getElementsByTagName('input');
				let seltexts=[];
				let controlValues='';
				for(let j=0,lj=seltags.length;j<lj;j++){
					if(seltags[j].value==='' || seltags[j].value===' '){
						controlValues+=' '+seltags[j].id+' cannot be empty.';
					}
					seltexts.push(seltags[j].value);
				}
				if(!isEmptyString(controlValues)){ alert(controlValues);return; }
				let mykeyid=getId('qlist').value,
				 updated=0;
				if(!trueEqual(dial_ref.getQuestion(mykeyid).quest,qtext)){
					dial_ref.getQuestion(mykeyid).quest=qtext;
					updated++;
				}
				for(let ii=0,lenSel=seltexts.length;ii<lenSel;ii++){
					if(!trueEqual(dial_ref.getQuestion(mykeyid).sel[ii],seltexts[ii])){
						dial_ref.getQuestion(mykeyid).sel[ii]=seltexts[ii];
						updated++;
					}
				}
				if(updated>0){
					dial_ref.updatePanel();
					styleSet(styleSet(write(getId('updatehappen'),updated+' modification(s) effectuées.'),'color','green'),'background-color','silver');
					setTimeout(function(){styleSet(styleSet(getId('updatehappen'),'color','silver'),'background-color','green');},1020);
				}
		}//-- fin function updateQuestionValues() // as LISTENER : modifier
	let mykey=getId('qlist').value;
	if(dial_ref.getQuestion(mykey)!==null){
		let thatq=dial_ref.getQuestion(mykey);
		let fieldchoices = destIn(textTag('legend','choix'),newTagId('fieldset','selfield'));//-- créer un fieldset pour les choix(attribut sel)
		//-- ajouter le(s) input au field set
		let tmp, tmplbl;
		for( let i=0,len=thatq.sel.length; i<len; i++ ){
			tmplbl=newLabel('cho'+i,thatq.rep[i]);
			tmp=setClass( setAttr( setAttr( newTagId('input','cho'+i),'type','text'), 'value', thatq.sel[i] ),'modif-choix');
			console.log(tmp+' de '+thatq.sel[i]);
			toDom( tmp, destIn( tmplbl, fieldchoices ));
		}
		toDom(setAttr(newBt('+','addchoiceinput','choice'),'title','ajout case de choix'),fieldchoices).addEventListener(
			'click',
			function(){
				toDom( setAttr(newBt('Ajouter','modifaddchoice','choice'),'title','ajouter choix'),
					destIn( placeholder(setClass(setAttr(newTag('input'),'type','text'),'modif-add-rep'),'liaison') ,
						destIn( placeholder(setClass(setAttr(newTag('input'),'type','text'),'modif-add-sel'),'choix') , getId('selfield') ))).addEventListener(
						'click',
						function(e){

							let repval=this.previousSibling.value;
							let selval=this.previousSibling.previousSibling.value;
							if(!isEmptyString(repval) && !isEmptyString(selval)){
								dial_ref.addSelRep(getId('qlist').value,selval, repval);
							}
						},false );
			},
			false );
		//-- cont est le contenu de modPanel = newModal
		//-- la récursivité ressemble à ça:
		let cont0=destIn(		
			listen(newBt('modifier','modifbt','bt'+mykey), // créer le bt avec son listener
			'click', updateQuestionValues, false ),
			destIn(	fieldchoices,
				destIn(//-- ajout fieldset avec les choix
					say( newTextarea('modifqtxt','qtxt'),thatq.quest ), //-- ajout textarea
					newFormContainer('modcont','modif'+mykey) //-- créer form
				))
			);
			toDom(write(setCss(newTag('i'),'font-size:0.92em;color:silver;'),'n\'oublier pas de sauvegarder après modifications'), cont0);
			// toDom()
			toDom(setCss(newTagId('span','updatehappen'),'width:100%;background-color:#FFF;border-bottom:thin solid cyan;transition:all 1s;'), cont0);
			let cont=destIn(cont0,
			articleHId('modif',mykey,4 ));
			cont.getElementsByTagName('h4')[0].dataset['qid']=mykey;
		// toBody(cont);
		
//------ function newModal(id,bt,targetBT,content,width,height,vt='center',hz='center',maxresize=true,z=0,animated=true){
//------ function launchedModal(id,isremoved=false,aim,content,width,height,vt='center',hz='center',maxresize=true,z=0,animated=true){
		 autoLaunchModal('modifpanel',newBt('auto','a','a'),body(),cont,96,89,1,1,true,2,true);
		}
	//return null;// no use of returned value!
}
/** no more in use// remove or fix or screw it *#!! grmbl :(
function checkEnd(me){
	alert('as end');
	if(me.checked===true){getId(me.value).value='fin;'}
}*/
// function checkNext(){} //?? remove ??
/**------------------- ------------------- -------------------------------------- ------------------- -------------------   
*						class	DialogMaker
 -------------------------------------------------------------------------------- ------------------- ------------------- */
class DialogMaker{
	constructor(holder,maker=true){
		this.version='0.1.0-alpha1';
		this.type='dialogSerie';
		this.refid='dialogAPI';
		this.dialName='';
		
		this.hasLocalStorage;
		
		this.holder=holder;
		this.question;//new Map(); //-- this.question.set(id,{ quest:question, sel:choices, rep:reponses, cmd:commande
		this.initQMap();
		this.commandsList={
			alarm:function(args){	console.log('commandList.alarm('+args+')');return 'alarm'+args; },
			dialend:function(){ dial_ref.holder.innerHTML=DIALEND;},
			dice6:function(){	return Math.floor(Math.random()*6)+1; }
			//-- add each command needed here! // TODO add method  addCommand()
		}
		
		//-- UI
		this.makerUI;
		this.infoUI;
		this.makeUI;
		this.dispUI;
		this.formUI;
		
		this.init(maker);
	}
	//-- some GETTERS
	viewHolder(){	return this.holder;}
	tabQ(){
		let qid=[];
		this.question.forEach(function(value, key, ownerMap){
			if(key!=='fin'){ qid.push(key); }
		});
		return qid;
	}
	qSize(){	return this.question.size;}
	tabOrphan(){//-- unnasigned id next! meaning list  for the id where not next is set (except constantes like DIALEND)
		let tabRep=[], qst=this.tabQ();
		this.question.forEach(function(v,k,ownerMap){
			let tt=v.rep;
			for(let j=0,le=tt.length;j<le;j++){
				if(tt[j]!=='fin'){
					if( !qst.includes(tt[j]) ){
						tabRep.push(tt[j]);
						console.log(' --- unnasigned: \n '+k+' sel:'+v.sel+' rep:'+v.rep+' cmd:'+v.cmd+'\n (*) quest:'+v.quest);
					}
				}
			}
		});
		return tabRep;
	}
	getQuestion(id){ if( this.question.has(id) ){ return this.question.get(id);} return null;}	
	getRep(id,selidx){
		return this.question.get(id).rep[selidx];	
	}
	getChoice(id,idx){}//-- TODO
	resolve(id,idx){
		if(typeof this.getRep(id,idx)==='number'){
			return this.question.get( this.getRep(id,idx) );
		}
	}
	
	
	addQuestion(id,question,choices,reponses,commande='none'){
		if(this.question.has(id)){ console.log(id+'is allready set.'); return this; }
		this.question.set(id,{ quest:question, sel:choices, rep:reponses, cmd:commande });
	console.log('addQuestion with id:'+question+',sel['+choices.join()+'], rep ['+reponses.valueOf()+'], cmd:'+commande);
		return this;
	}
	addSelRep(id,sel,rep){
		let q=this.question.get(id);
		if(isReal(q)){
			if(!q.sel.includes(sel)){
				q.sel.push(sel);
				q.rep.push(rep);
				return 1;
			}return 0;
		}return null;
	}
//--- DATA management
	extractDatas(){
		if(this.question.size<1){return;}//-- no data exist return undefined
//--		if(name=''){ console.warn('CANNOT extract Data with no dialName');	return;}//-- put at localSave
		let xDatas={};
		this.question.forEach(function(v,k,m){
			xDatas[k]=v;
			console.log('extact of '+v+' type '+typeof v );
		});
		return xDatas;
	}
	saveDatasToLocal(name=this.dialName){
		if(this.hasLocalStorage!==true){	let ms='Unable to Save datas : NO localStorage enable on your browser! please check for update.';warn(ms);alert(ms);return;}
		 if(name==='' || typeof name==='undefined' || name===null){warn('Can not Save Datas with No Available serie name. TIP: set \'nommer Série\' before saving whole dialog. ');return;}
		// function storeRefJSON(k,obj,refid){
		let xD=this.extractDatas();//-- todo check xD not an empty object! // if(xD!=={}){ //or log warning and do nothing
		console.log(xD);
		xD.savetime=timeNow();
		
		storeRefJSON(name,xD,this.refid);
	}
	loadDatasFromLocal(seriename){
		//function storeGetRefJSON(k,refid){
		let r=storeGetRefJSON(seriename,this.refid);
		if(typeof r==='undefined' || r===null){console.log('no datas with dialName '+seriename);return null;}
		// for(let v in r){			console.log(v+' typeof '+typeof v);}
		return r;
	}
	setLoadedDatas(dts,dname){
		if(dts===null || typeof dts==='undefined'){console.log('unavailable datas arguments!');return;}
		let c=window.confirm('Confirm All previous datas will be deleted?');
		if(c===true){
			this.initQMap();//question=new Map();
			for(let q in dts){
//	addQuestion(id,question,choices,reponses,commande='none'){	
// this.question.set(id,{ quest:question, sel:choices, rep:reponses, cmd:commande }	);
				if(q!=='savetime' && q!=='ref'){//-- filter irrelevant data(savetime and ref)
					this.addQuestion(q,dts[q].quest,dts[q].sel,dts[q].rep,dts[q].cmd);
					console.log(' load and add '+q+' '+dts[q].quest+' '+dts[q].sel+' '+dts[q].rep+' '+dts[q].cmd);
				}
			}
			
			this.setDialName(dname);
			this.dispDialName();
			this.updatePanel();
			return this;
		}
		return;
	}
	setLoadedDatasFromLocal(dname){
		let t=this.loadDatasFromLocal(dname);
		this.setLoadedDatas(t,dname);
	}
	setDialName(str){	this.dialName=str; }
//--- ALL the following is about VIEW and/or DATA INPUTs
	dispDialName(pre=''){
		if(this.dialName!==''){
			// alert(getId('serietitle').tagName);
			if(typeof document.getElementsByTagName('h3')[0]!=='undefined' && document.getElementsByTagName('h3')[0]!==null){
				document.getElementsByTagName('h3')[0].innerHTML=pre+this.dialName;
			}else{
				this.infoUI.insertBefore(textTagId('h3','serietitle',pre+this.dialName),this.infoUI.firstElementChild);
			}
			return this.dialName;	
		}
		return;
	}

	display(id,aim='default',argCmd=null){//--TODO utiliser argCmd quand besoin!!
		// if(id===TERMINATE){return;}
		if( this.question.get(id).cmd!=='none' ){
			let res;
			if( typeof this.commandsList[this.question.get(id).cmd] ==='function'){
				res=this.commandsList[this.question.get(id).cmd](argCmd);}
			if( typeof this.commandsList[this.question.get(id).cmd] ==='string'){
				res=this.commandsList[this.question.get(id).cmd];}
			console.log('cmd res: '+res);
		}
		if(aim=='default'){	aim=this.holder;}
		aim=this.holder;// TODO : remove this line , BUT NEED fix BUG!!!
		//aim.innerHTML='';//-- remove this line: just for showing content will be cleared!
		
		aim.innerHTML='<header>'+this.question.get(id).quest+'</header>';
		/**
		switch(id){
			case TERMINATE: aim.firstChild.innerHTML=TERMINATE; break;
			case DIALEND: aim.firstChild.innerHTML=DIALEND; break;
			case 'fin':saylog('DEBUG:aim.id = '+aim.id);aim.firstchild.innerHTML='Terminé';return;break;
			default:break;//-- do nothing id is good to go!
		}*/
		for(let i=0,len=this.question.get(id).sel.length;i<len;i++){
			aim.innerHTML+='<button type=button value='+
			this.question.get(id).rep[i]+
			' >'+this.question.get(id).sel[i]+'</button>';
		}
		let btlist=aim.getElementsByTagName('button');
		for(let j=0,lb=btlist.length;j<lb;j++){
			btlist[j].addEventListener( 'click', btListener, false );
		}
	}
	updatePanel(){
		this.infoUI.getElementsByTagName('p')[0].firstElementChild.innerHTML=''+this.question.size;
		this.infoUI.getElementsByTagName('p')[1].firstElementChild.innerHTML=''+selectOptions(this.tabOrphan(),'oqlst')+'('+this.tabOrphan().length+')';
		this.infoUI.getElementsByTagName('p')[2].firstElementChild.innerHTML=''+selectOptions(this.tabQ(),'qlist')+
		'('+this.tabQ().length+'/'+(this.tabQ().length+this.tabOrphan().length)+')';
		this.initAlterUI();
	}
	initQMap(){//initSet=null){//-- initSet AS {id:string, quest:string, sel:array, rep:array, cmd:string || array }
		this.question=new Map();
		this.question.set('fin',{quest:DIALEND,sel:[],rep:[],cmd:'dialend'});
		console.log(this.question.get('fin'));
	/** TOFIX:	if(isReal(initSet)){
			if( isReal(initSet.id) && isReal(initSet.quest) && isReal(initSet.sel) && isReal(initSet.rep)  ){
			let cmd = isReal(initSet.cmd) ? initSet.cmd :'none';
			this.addQuestion(initSet.id, initSet.quest,initSet.sel,initSet.rep,cmd);
	}}*/
	}
	init(maker=true){
		this.hasLocalStorage = supports_html5_storage();
		this.initStyle();
		dial_ref=this;//-- set global variable to self
		if(maker===true){
			this.initDOM();
			this.initFooter();
			this.initForm();
			this.initIHM();
		}
	}
	initDOM(){
		let mkdial=document.createElement('section');
			mkdial.id='mkdial';
			let mkswitch=document.createElement('div');
			mkswitch.id='mkswitch';mkswitch.setAttribute('title','hide/show panel');
			mkswitch.appendChild(document.createElement('hr'));


			this.makerUI=document.createElement('article');
			let panelh2=document.createElement('h2');
			panelh2.title='JavaScript API';
			this.makerUI.appendChild(panelh2);
			this.makerUI.firstChild.innerHTML='&boxbox; Dialog Maker<span>(ways are better )</span>';
			
			mkdial.appendChild(this.makerUI);
			mkdial.appendChild(mkswitch);
			this.infoUI=document.createElement('header');
			this.infoUI.id='infodial';
			this.makeUI=document.createElement('main');
			this.makeUI.id='makedial';
			this.dispUI=document.createElement('footer');
			this.dispUI.id='dispdial';
			this.makerUI.appendChild(this.infoUI);
			this.makerUI.appendChild(this.makeUI);
			this.makerUI.appendChild(this.dispUI);
			document.body.appendChild(mkdial);
//-- INFOS(header)
			let p=document.createElement('p');
			let sp=document.createElement('span');
			p.appendChild(document.createTextNode('count:'));
			p.appendChild(sp);
			let pcount=p.cloneNode('true');
			pcount.id='qcount';
			this.infoUI.appendChild(pcount);
			p.removeChild(p.firstChild);
			p.insertBefore(document.createTextNode('non terminés:'),p.firstElementChild);
			let porphan=p.cloneNode(true);
			porphan.id='qorphan';
			this.infoUI.appendChild(porphan);
			p.removeChild(p.firstChild);
			p.insertBefore(document.createTextNode('liste:'),p.firstElementChild);
			let listQID=p.cloneNode(true);
			listQID.id='qids';
			this.infoUI.appendChild(listQID);
			let vinfo=document.createElement('i');
			vinfo.style='padding-left:0.6em;position:relative;left:27%;top:-1.6em;color:#78789a;font-size:0.8em;';
			vinfo.appendChild(document.createTextNode('v:'+this.version));
			this.makerUI.insertBefore(vinfo,this.makerUI.firstChild.nextElementSibling);
			//--- element nav
			this.initAlterUI();
			
		
		}
	initAlterUI(){
		if( this.qSize()>1 && !isReal( getId('modifdial') ) ){
			this.infoUI.appendChild(setAttr(write( newTagId('span','modifdial'),'&#9874;'), 'title', 'modifier sélection') );
			this.infoUI.appendChild(setAttr(write( newTagId('span','cmddial'),'&#10031;'), 'title', 'attribuer commande') );
			getId('modifdial').addEventListener('click', modifQuestionListener,false);
		}
	}
//--- MAKE DIALOG UI(main)
	initForm(){
		if(typeof this.formUI!=='undefined'){
			if(this.formUI.tagName.toLowerCase()==='form' && this.formUI.parentNode!==null && typeof this.formUI.parentNode!=='undefined'){
			this.formUI.parentNode.removeChild(this.formUI);
			}
		}//-- remove if exist !
		this.formUI=newFormContainer('forminputs', 'dialogmakerform');
			destIn( newTextarea('addqtext','questiontext','intitulé:'),
			destIn(newTag('br'),
			destIn( newBt('avec non définis(sélection)','fillorph','getorph'),
			destIn(	newInputText('addid', 'qid', 'id: '), 
			formField(this.formUI, 'ajouter question')
			))));
		toDom(
			newFieldset('choicelist','ajout des choix',
			[setClass( newInputText('cho0','qcho','choix0:'), 'inplist'),
			setCss(newTag('br'),'clear:both;'),
			setClass( newInputText('cho1','qcho','choix1:'),'inplist'),
			setAttr(newBt('+','addchoice','choice'),'title','ajout case de choix')]),
			this.formUI.getElementsByTagName('fieldset')[0]
		);
		this.formUI.getElementsByTagName('fieldset')[1].insertBefore(
			setCss(textTag('i','-un choix (minimum)doit être remplit, les choix laissés vides ne seront pas ajoutés-'),'position:relative;top:-0.8em;font-style:italic;color:#872321;font-size:0.72em;display:inline-block;width:100%;text-align:center;'),
		this.formUI.getElementsByTagName('fieldset')[1].firstChild
		);	
		this.makeUI.appendChild(this.formUI);
		getId('addid').required=true;
		getId('addqtext').required=true;
		getId('cho0').required=true;
		toDom(newBt('&gt;&gt;créer les liens&gt;&gt;','nextstep','next'),this.formUI.getElementsByTagName('fieldset')[0]);
	/** LISTENERS: */
		document.getElementById('addchoice').addEventListener('click',function (e){
			let tabinputs=getId('choicelist').getElementsByTagName('input'),
			 cpt=tabinputs.length;
			this.parentNode.insertBefore(setClass( newInputText('cho'+cpt,'qcho','choix'+cpt+':'),'inplist'),this);
}
,false);
		let tin=this.formUI.getElementsByTagName('input');
		//let tta=this.formUI.getElementsByTagName('textarea');//-- if lot of text area!
		for(let i=0,len=tin.length;i<len;i++){
			if(tin[i].required===true){
				tin[i].addEventListener('blur',function(e){
					validListener(this,1);
					if(i===0){
						if(dial_ref.tabQ().includes(tin[i].value)){
							tin[i].className='invalid';
						}
					}
				},false);
			}
		}
		getId('addqtext').addEventListener('blur',function(e){	validListener(this,2);	},false);
		getId('nextstep').addEventListener('click',function(e){
			let puts=this.parentElement.getElementsByTagName('input'),
			 confirmate=0, msg='',gather=[];
			for(let i=0,len=puts.length;i<len;i++){
				if(puts[i].id==='addid' ){
					if(puts[i].value.length>1 && puts[i].value!=' '){//--	console.log(isNaN(parseInt(puts[i].value)));
						if(isNaN(parseInt(puts[i].value))){confirmate++;gather[0]=puts[i].value;}
						else{ msg+=' * id ne peut commencer par un nombre.'}
					}else{msg+=' * id doit avoir au moins 2 caractères.'}
				}
				if(puts[i].id==='cho0' ){	
					if(puts[i].value.length>2){
						confirmate++;gather[2]=puts[i].value;
					}else{
						//gather=null;//-- for IE
						msg+=' * choix0 doit avoir au moins 3 caractères.';
					}
				}
			}
			//this.parentElement.getElementById('addqtext').value;
			let ta=document.getElementById('addqtext').value;
			console.log('intitulé: '+ta);
			if(ta.length>2 && ta!='  ' && ta!==null && (typeof ta!=='undefined') ){
				confirmate++;
				gather[1]=ta;
			}else{
				msg+=' * l\'intitulé '+ta+'doit avoir au moins 3 caractères.';
			}
			if(confirmate>=3){
				if(dial_ref.tabQ().includes(gather[0])){
					alert('id:'+gather[0]+' existe déjà.');
					puts[0].className='invalid';
					gather=null;
					return;
				}
				let cholist=document.getElementById('choicelist').getElementsByTagName('input'),
				 choval=[gather[2]];
				for(let i=1,len=cholist.length;i<cholist.length;i++){
					if(cholist[i].value!==' ' && cholist[i].value!==null && cholist[i].value!==''){
						choval.push(cholist[i].value);
					}
				}
				dial_ref.formNext(gather[0],gather[1],choval);
			}else{
				alert(msg);//-- that a real alert message, dont delete in production !!
			}
		},false);
		getId('fillorph').addEventListener('click',function(e){
			getId('addid').value=getId('oqlst').value;	
		},false);
	}
	formNext(id,qtext,cholist){		/** typeof cholist => Array 	* this.formNext(cholist) ONCE form VALIDATE(initForm) display the next form */
		replaceTag(textTagId('p','idq',id),getId('addid'),true);
		replaceTag(textTagId('p','textq',qtext),getId('addqtext'),true);
		let replist=getId('choicelist');
		toDomBefore( newInputText('cmd','addcommand','commande: '),replist);
		replist.innerHTML='';//-- delete content
		toDom(setCss(
			write(newTag('span'), 'marquer <b style=font-style:normal; >fin</b> pour indiquer une fin de dialogue'),
			'font-size:0.7;float:right;font-style:italic;color:#989898;'),
			destIn( textTag('legend','Indiquer les liens'), replist ));
		
		for(let i=0,len=cholist.length;i<len;i++){
			//-- function newInputText(id, name, label=false){	return newInput('text', id, name,null, lab
			ilog('with value : '+cholist[i]);
			//function newInputCheckbox(id,name,value=null,label=false){
			/** // removed! toDom( newInputCheckbox(''+cholist[i]+i,cholist[i]+'_as_end','rep'+i,'end of dial'), */
				destIn( newInputText('rep'+i, 'replist', cholist[i]), replist );//);
			seelog('input text : '+document.getElementById('rep'+i));
			document.getElementById('rep'+i).required=true;
			
			//getId(cholist[i]+i).addEventListener('click',checkEnd(this),false);
		}
//function newInputText(id, name, label=false){	return newInput('text', id, name,null, label); }
		//--BT 'Confirmer' LISTENER(chained)
		replaceTag( newBt('Confirmer','finalstep','laststep'), getId('nextstep'), true ).addEventListener(
			'click',function(e){
				let replist=document.getElementById('choicelist').getElementsByTagName('input'),
				 repval=[], inputerror='';
				for(let i=0,len=replist.length;i<len;i++){
					if(replist[i].value.length>0 && replist[i].value!=' ' && replist[i].value!==null ){
						if(replist[i].value.indexOf(' ')>-1){inputerror+=''+replist[i].substring(4)+' ';}
						repval.push(replist[i].value);
					}
				}
				if( repval.length<replist.length ){ alert('indiquez '+(replist.length-repval.length)+' liens non remplis.'); return;}
				if( inputerror!=='' ){ alert(' les liaisons (index0) '+inputerror+' ne peuvent pas contenir d\'espaces!'); return;}

			let id=getId('idq').innerHTML;
			let qtx=getId('textq').innerHTML;
			let cmd=getId('cmd').innerHTML;
			let lbls=document.getElementById('choicelist').getElementsByTagName('label');
			let chovalues=[];
			for(let i=0,len=lbls.length;i<len;i++){
				chovalues.push(lbls[i].innerHTML);
			}
			if(cmd===null || typeof cmd==='undefined' || cmd==' '){	cmd='none';}	
//-- with	addQuestion(id,question,choices,reponses,commande='none'){
			dial_ref.addQuestion(id,qtx,chovalues,repval,cmd).updatePanel();
			alert('added '+id);
			dial_ref.initForm();
			},false);
	}
	initFooter(){
		if(!this.dispUI.hasChildNodes()){//--create if not yet
//------- NOMMER/SAUVEGARDER/CHARGER
		toDom( setAttr( newBt('nommer','namedial'),'title', 'nommer la série' ), 
			destIn(placeholder(  newInputText( 'putname','inputname') , 'nommer Série'),
				toDom( setCss(newTagId('div','databox'),'float:left;width:49.25%;margin-left:0.3%;border:1px solid #CD4700;background-color:#efffef;'),
					this.dispUI ))).addEventListener('click',
				function(e){
					let pname=getId('putname').value;
					console.log(pname);
					if(pname!=='' && pname!==null && typeof pname!=='undefined'){
						dial_ref.setDialName(pname);
						dial_ref.dispDialName();
					}
				},false);
			toDom( setAttr( newBt('sauvegarder(local)','localsave'),'title', 'sauvegarde localement: cet ordinateur, ce navigateur.' ) ,
			getId('databox') ).addEventListener('click',
				function(e){
					let dname;
					if(dial_ref.dialName===''){
						let p=window.prompt('Pour sauvegarder(localement) vous devez indiquer un nom pour cette série:');
						if(isStr(p) && p.indexOf(' ')===-1){
							dname=p;
						}else{
							ilog('Nom invalide: '+p+' Le nom ne peut comporter d\'espace et doit être une chaînes de caractères -typiquement- alphabétiques.');
							return;
						}
					}else{
						dname=dial_ref.dialName;
					}
					dial_ref.saveDatasToLocal(dname);
				},false);
			
			toDom( setAttr( newBt('charger(local)','localload'),'title', 'charger localement: cet ordinateur, ce navigateur.' ) ,
				toDom( newTagId('p','pload' ) ,
				getId('databox')));
//-- --	--	 formSelect(id, name, descript, optVals, optIns=[null])
			toDom(	formSelect('localsaves', 'svl', '==> ', storeRefList(this.refid) ) , getId('pload'));
			
			getId('localload').addEventListener('click',
				function(e){//setLoadedDatasFromLocal(dname){
					dial_ref.setLoadedDatasFromLocal(getId('localsaves').value);
				},false);

/**			getId('databox').appendChild(document.createTextNode('+(saveOK)+(loadOK) avec localStorage + case à cocher AUTOSAVE, PUIS online DB'+
			'ajouter aussi VISUALISATION: Dialoguer:[_listID_], mapSerie &amp; -dans this.formNext- insérer :liste des commandes + menu modifier'));*/
//-------  DISPLAY / Lancer Dialogue - avec functional.js on enchaîne un peu XD (<i>JQuery is for newbies</i>) :
			toDom(setAttr(newBt('lancer dialogue','godial','go'), 'title','commencer un dialogue'),
				toDom(
					placeholder(newInput('text', 'putdial', 'saydial',null, false),' ID dialogue '),
					toDom(
						destIn( listen( styleSet( newBt('avec listed(sélection)','withlisted','lstid'), 'float', 'right' ),
						'click',function(e){
									console.log('you click '+this);
									getId('putdial').value=getId('qlist').value;
								},false),
							setCss( newTagId('div','dispbox'), 'float:right;width:49.25%;margin-right:0.1%;border:1px solid #00CCFF;background-color:#ffefef;')
							),
						this.dispUI
			)).parentNode).addEventListener('click', function(e){//-- //this.id==='godial'
					let t=getId('putdial').value;
					if(t!=='' && typeof t!==undefined && t!==null){
						dial_ref.display(t);//-- with display(id,argues=null,aim='default')
					}
				},false);
			
			}
		return this;
	}

	initIHM(){
		document.getElementById('mkswitch').addEventListener('click',function(e){
			if(this.className==='switchoff'){
				this.className='';
				this.setAttribute('style','');
				this.title='hide';
				document.getElementById('mkdial').className='';
				document.getElementById('mkdial').style='';
			}else{
				this.className='switchoff';
				this.style='transitionn:all 4s;position:fixed;width:1%;margin-left:79.25%;';
				this.title='show';
				document.getElementById('mkdial').className='mkdialoff';
				document.getElementById('mkdial').style='transition:all 1s;left:100%;opacity:0.7;';
			}
		},false);
	}
	initStyle(){let incss;
		if(typeof document.head.getElementsByTagName('style')[0]==='undefined' || document.head.getElementsByTagName('style')[0]===null ){
			incss=document.createElement('style');
			incss.setAttribute('rel','stylesheet');
			incss.setAttribute('type','text/css');
			document.head.appendChild(incss);
			console.log('head style added');
		}else{
			incss=document.head.getElementsByTagName('style')[0];
		}
		
		incss.innerHTML+='.inplist{clear:both;margin: 1em 0 0.2em 35%;display:block;}';
		incss.innerHTML+='body{margin:0;padding:0;overflow:auto;}';
		incss.innerHTML+='[required]{border:1px solid red;}';
		incss.innerHTML+='.valid{border:1px solid green;}';
		incss.innerHTML+='.invalid{border:1px solid green;background-color:#cc0000;}';

		incss.innerHTML+='#mkdial header p{display:inline;border:1px inset lime;margin:0 0.1em 0 0.5em;padding:0.1em 0.22em 0 0.44em;background-color:rgba(0,255,0,0.32);}';
		incss.innerHTML+='p span{padding:0 0.4em 0 0.4em;border:1px dashed rgb(255,60,0);background-color:#eef;}';
		incss.innerHTML+='p span{padding:0 0.4em 0 0.4em;border:1px dashed rgb(255,60,0);background-color:#eef;}';
		incss.innerHTML+='#mkdial{ position:fixed;width:80%;height:98%;right:0;top:1%;margin:0;padding:0;'+
		'border:1px solid grey;background-color:rgba(205,205,205,0.7);overflow:auto;}';
		incss.innerHTML+='h2{margin:0;padding:0.3em 0 0.32em 0;text-align:center;letter-spacing:0.6em;color:#22C;'+
		'text-decoration:underline;font-family:trebuchet,verdana,arial;}';
		incss.innerHTML+='h2::first-letter{text-transform:uppercase;font-size:1.23em;color:rgba(40,62,220,0.8);}';
		incss.innerHTML+='h2 span{ position:relative;top:-0.75em;margin-left:1.5em;font-size:0.48em;letter-spacing:0;text-decoration:initial;font-style:italic;color:#124;}';
		incss.innerHTML+='#mkdial article{margin:0;height:100%;padding-left:0.1em;background-color:rgba(255,255,255,0.4);border:1px solid #ddccaa;border-left-color:silver;}';
		incss.innerHTML+='article header:first-of-type, article main:first-of-type, article footer:first-of-type{border-bottom:2px ridge #dea776;padding:0.2em 0 0.4em; 0.2em}';
		incss.innerHTML+='article main:first-of-type{overflow:auto;}';
		incss.innerHTML+='#mkdial h3{ margin-left:0.7em;}';
		incss.innerHTML+='#forminputs{ background-color:#FFFFAA;overflow:auto;}';
		incss.innerHTML+='fieldset{ border:thin ridge #ffcc00;text-align:center;}';
		incss.innerHTML+='fieldset{ border:thin ridge #ffcc00;text-align:center;}';
		incss.innerHTML+='fieldset#choicelist{ text-align:left;border-width:0;}';
		incss.innerHTML+='fieldset legend{ border:thin groove gold;padding:0 1.4em;font-style:italic;text-transform:uppercase;background-color:#fff;color:#66C;}';
		incss.innerHTML+='fieldset#choicelist legend{ border:thin outset #fffedc;text-align:center;color:#88E;}';

		incss.innerHTML+='fieldset input{margin-left:1em;}';
		incss.innerHTML+='fieldset textarea:first-of-type{width:80%;}';
		incss.innerHTML+='fieldset label{color:magenta;width:87%;display:block;}';
		//-- nav
		incss.innerHTML+='#modifdial{ display:inline-block;width:1.3em;margin-left:2em;padding-right:0.05em;text-align:center;font-size:1em;border-radius:3.14em;color:orange;background-color:#5577EE;border:thin solid gold;}';
		incss.innerHTML+='#cmddial {  display:inline-block;width:1.3em;margin-left:2em;padding-right:0.05em;text-align:center;font-size:1em;border-radius:3.14em;color:gold;background-color:#000;border:thin solid gold;}';
		incss.innerHTML+='#modifdial:hover{ cursor:pointer;color:#5577EE;background-color:orange;border-color:dimgrey;box-shadow: 1px 3px 3px rgba(149,100,0,0.75);transition:all 1s;}';
		incss.innerHTML+='#cmddial:hover{cursor:pointer;color:#00f;background-color:#f00;border:thin groove silver;box-shadow: 1px 3px 3px rgba(178,34,34,0.75);transition:all 1s;}';
		incss.innerHTML+='#modifdial:active:active{ color:#000;background-color:#FFF;}';
		incss.innerHTML+='#cmddial:active{ border-radius:3.14em;color:#F00;background-color:#000;}';
		
		incss.innerHTML+='button:hover{cursor:pointer;}';
		incss.innerHTML+='div#mkswitch{display:block;z-index:2;position:fixed;top:0.9%;left:19.4%;width:0.5%;height:98.2%;text-align:center;'+
		'background-color:#ccc;border:1px solid #234;border-width:1px 2px 1px 1px;border-right:3px ridge rgba(220,220,220,0.5);border-radius:0.31em 0 0 0.31em;}';
		incss.innerHTML+='#mkswitch:hover{cursor:pointer;background-color:rgb(150,150,255);border-left:1px inset #c0c0c0;border-width:2px solid rgba(60,60,255,0.8);}';
		incss.innerHTML+='#mkswitch:active{opacity:0.5;}';
		incss.innerHTML+='#mkswitch hr{transform: rotate(90deg);position:absolute;left:-3.9em;width:8em;top:47%;color:#4448FF;background-color:#4448ff;display:block;opacity:0.9;}';
		incss.innerHTML+='div.switchoff{transitionn:all 4s;position:fixed;width:1%;margin-left:79.4%;}';
		incss.innerHTML+='.mkdialoff{ transition:all 1s;left:100%;opacity:0.7;}';
		
//		incss.innerHTML+='#putname{margin-left:0.32em;}';
//-- style modal modifier
		incss.innerHTML+='#modifqtxt{ width:92%;}';
		incss.innerHTML+='article#modif{ background-color:#5577EE; background-color:rgba(85,119,238,0.75);padding:0.2em;border:1px solid red;}';
		incss.innerHTML+='#modif h4{ text-align:center;color:#fff;font-size:1.32em;}';
		incss.innerHTML+='#modif input.modif-choix{ display:inline;width:70%;}';
		incss.innerHTML+='#modif label{width:74%;font-weight:bold;text-align:left;margin-left:13%;padding-left:2%;color:#EEAA11;border-bottom:thin solid navy;}';
		
		incss.innerHTML+='input.modif-add-sel{display:inline;width:46%;background-color:rgba(210,200,180,0.4);}';
		incss.innerHTML+='input.modif-add-rep{display:inline;width:46%;background-color:rgba(220,210,80,0.4);}';
		// incss.innerHTML+='input.modif-add-rep{background-color:rgba(220,210,80,0.4);}';
	}
}
