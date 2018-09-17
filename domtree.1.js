/** few const */
const TREEuitext='<h4>DEV DIARY TODO liste/TAF(travail à faire)</h4>'+
'<p style="margin: 0  24%;font-style:italic;">Légende/summary:<span  class="nottodo" style="margin-left:0;padding-left:2em;font-style:normal;margin-left:1.8em;" >\"•\" done todo / tâche effectuée</span></p>'+
'<ul style="clear:both;"><header>todo fix/debug et réparations à faire:</header>'+
'<li>functional.modal.js : bouton par défaut apparaît plusieurs fois car utilisation bt externe fait à la va vite! le rendre paramétrable dans son constructeur(arg function)</li>'+
'<li>... voir autres chapitres</li>'+
'</ul><ul><header>TODO list / liste TAF</header>'+
'<li class="nottodo">debugguer la boucle AnimationRatio corriger Animation / AnimationRatio (et/ou) réunir en une seule</li>'+
'<li> Terminer le modéle function Motor.listX -> LauncherAPI -> trie, rangement phases exécutions(before,now,after) avec utilisation des valeurs renvoyées pâr les phases précédentes</li><li>Intégrer la création du DOMTree à DataCollection.dataList/DataCollection.factory(class Generator) </li>'+
'<li>ajouter la gestion des données I: create/set, alter data, ajouter la gestion par l\'usine(factory class Generator)</li>'+
'<li>ajouter la gestion des données II:usine utilise parse et export , parse and load datas : JSon, localStorage, XML files & script\'s data values</li>'+
'<li>terminer d\'écrire la liste des TODO/Tâches à Faire, (ajouter un point rempli (avec classe) OK)</li>'+
'<li>Animation/Animation Ratio + LauncherAPI + Motor/Animotor : changer pour modèle papier</li>'+
'<li>class Animation, AnimationRatio améliorer et ajouter class dérivées</li>'+
'<li>gérer dans la boucle un TICK time qui FIRE (déclenche listener like) au dessus ou .trigger (Motor,LaunchAPI, FrameWork)</li>'+
'<li>ajouter la gestion des données III:usine utilise parse et export , parse and load datas : localStorage, <li>'+
'</ul>'+
'<hr><ul><header> TAF: DATAs</header>'+
'<li>inclure les params class constructor(nécessaires) dans les Data, les liers lors de initilisation framework</li>'+
'<li>DATA : methode load, mlethode export(avec factory/generator) </li>'+
'</ul><hr><ul><header>TODO new features / TAF: ajouter contenus</header>'+
'<li>gérer les classes/id css de style du DOMTree functional.header.js </li>'+
'<li>développer functional.header.1.js : gestion css interne, fiiers externes, accessibilité, créer variables globales(refered) REFclass , externaliser à balise de style secondaires(dans le body, ...</li>'+
'<li>créer class Logic renvoyant une commande logique(functions, série functions, test,...) selon une demande précise(trigger,FIRE, emit</li>'+
'<li>créer class Core</li>'+
'<li>créer class CoreGame, CoreWorldWarWeb, ...</li>'+
'<li>create emit as a Event like following current RUNTIME position, appel récurrent donnant des informations sur le status</li>'+
'<li>gérer log/archive/journal des emit/events dans DataCollection historique</li>'+
'</ul><hr><ul></hr><header>Autres</header>'+
'<li>améliorer functional.modal.js (paramtrage, dimensions content , nouvelles funcitonalités..)</li>'+
'</ul>'+
'<hr><ul><header> OPTIMISATION à faire:</header>'+
'<li>functional.modal.js passer les pâramètres de style(class) en paramètres, lier avec functional.graphickit.js pour class par défaut (later) </li>'+
'</ul>'+
'<hr><ul><header> FAIT (divers)</header>'+
'<ul>functional.limiter.js des functions pour tester des limites(comme hitTest2D pour l\'intersection de 2 objets 2D)</ul>'+
'</ul>'+
'<ul><header>MAJ diverses effectuées</header>'+
'<li>fichier functionals.js correction du LOGMODE (pour F seelog, infolog/ilog)</li>'+
'<li>fichier functionals.limiter.js  ajout de la fonction nullIsFalse / shorten falseNull (je sais pas vraiment si garder ou supprimer)</li>'+
'</ul>';
/** HIGHER and Global Functions *///--  moved fn forKeysInObject & fn fko to functionals 18/08/18 //-- delete from  here
function forKeysInObject(o,instrs){
	let res=[];
	for(k in o){
		res.push(instrs(k,o));
	}
	console.log('for k('+res.length+')'+res.join());
	return res;
}
function fko(o,instrs){	return forKeysInObject(o,instrs);	}//-- shorten write

function isReal(v){	return v!=null && v!='undefined'?true:false;	}

/** window and document functions */
function screenW(){	return window.innerWidth;}
function screenH(){	return window.innerHeight;}

function ratioOf(v,ratio,isfloat=false){
	let r=v*ratio;
	switch(isfloat){
		case false:			r=Math.round(r);		break;
		case true:			/*do nothing*/			break;
		case 1: 			r=Math.floor(r*10)/10; 	break;
		case 2: 			r=Math.floor(r*20)/20; 	break;
		default:			r=Math.round(r);		break;
	}
	return r;
}
//alert(screenW()+'/'+window.screen.availWidth+'X'+screenH()+'/'+window.screen.availHeight );

/** Object / Tools of class DomTree */

function ElementDom(i, tagname, parentnode, tpe='HTMLElement'){
	return {
		type:tpe,
		name:tagname,
		tagName:tagname,
		parentNode:parentnode,
		innerHTML:null,
		childs:[],
		o:null,
		attributes:{id:i},
		computed:{style:{}}
	}
}
/**
* 	description des classes 
****************************************************************************************************************************************
*/
class DomTree{
	constructor(idroot,tagname='section'){
		this.d=document;
		this.r=idroot;
		this.t= {	}//-- each key/Object contain a virtual Representative and the DOM Object View( with type== HTMLElement ) / with type== Cartesian coordinates and shape or location
		this.init(idroot,tagname);
	}
	init(idroot,tagname){
		this.t[idroot]={
			type:'HTMLElement',
			name:tagname,
			tagName:tagname,
			parentNode:'root',
			innerHTML:null,
			childs:[],
			o:null,
			attributes:{id:idroot},
			computed:{style:{}}
		};
		console.log('createRoot:'+this.createRoot());
		console.log('***ROOT CREATED \n\t'+this.get(idroot)+this.get(idroot).tagName)+'\n\t\t\t***';
	}
	listAll(){
		return fko( this.t,
		 function(kk,tt){	
			let st=' parent['+tt[kk].parentNode+']{ id:'+kk+' type:'+tt[kk].type+' name:'+tt[kk].tagName+'';
			console.log(st);
			return st;}
		);
	}

	add(i,tagname,pnode){
		if(this.t[pnode]!=null){	this.t[pnode].childs.push(i); }
		if(this.t[i]==null){
			this.t[i]={type:'HTMLElement',
			name:tagname,
			tagName:tagname,parentNode:pnode,childs:[],innerHTML:null,o:null,attributes:{id:i},computed:{style:{}}
			};
			console.log('add:'+this.t[i].id);
			return this;
		}
		return -1;
	}
	woami(i){
			if(this.t[i]!=null){	return this.type+this.t[i].tagName+this.id; }return -1;
	}
	has(i){	return isReal(this.t[i]);	}
	ready(i){	if( this.has(i) ){	if(isReal(this.t[i].o)){	return true;}return false; }	}
	
//-----------------------------------------------------------------------------------------//
//-----		this.get(identifier) 	=>	DOM.Object.HTMLElement | false | -1
//--		IF get HTMLElement fail THEN => false == !this.t[i] OR => -1 == !document.getElementId(i)
//--
//-- 		Object.DOM.HTMLElement (this.t[i].o) !=null 
//			OR set this.t[i].o Object.DOM.HTMLElement with DOM.getElementById(identifier)
//			OR -1 (no previously set (this.t[i].o) and unable to get from DOM.
//-----------------------------------------------------------------------------------------//
	get(i){
		if(!this.has(i)){	return -1;}
		if(!isReal(this.t[i].o)){
			if( isReal( this.d.getElementById(i) ) ){
				this.t[i].o=this.d.getElementById(i);
			}else{
				return -1;
			}
		}//-- return HTMLElement if found in object or in document.getElementById()
		return this.t[i].o;
	}
	getRoot(){	return this.get(this.r);}
	setInner(i,txhtml){
		if(this.has(i)){	
			this.t[i].innerHTML=txhtml;
			console.log('setInner('+i+'):'+txhtml);
			return 1;
		}
		return -1;
	}
	setAttr(i,atr,v){ 	if(this.has(i)){	this.t[i].attributes[atr]=''+v; console.log('setAttr '+atr+' : '+this.t[i].attributes[atr]	); }	}
	setAttrs(i,kv){/* kv={name:prop,...} set  a collection of attributes by Object.kv{key:value,...} */
		let ct=[];
		for(let k in kv){
			ct.push(k+'='+kv[k]);
			this.setAttr(i,k,kv[k]);
		}
		return ct;
	}
	setCS(i,rulename,v){if(this.has(i)){	this.t[i].computed.style[rulename]=v;}console.log('setCS '+rulename+':'+this.t[i].computed.style[rulename]);	}
	
	
	
	setHTML(i,attrs={},txh=false){
		if(attrs!={}){
			for(let key in attrs){
				this.setAttr(i,key,attrs[key]);
			}
		}
		if(typeof txh==typeof ''){
			this.setInner(i);
		}
		return this;
	}
	updateHTML(i,attrs={},tx=false,autoload=true){
		this.setHTML(i,attrs,tx);
		if(autoload==true){
			this.doHTML();
		}
		
	}
	createRoot(){
		if(!this.has(this.r)){	return;}
		if(this.get(this.r)==-1){
			this.t[this.r].o = this.d.createElement(this.t[this.r].tagName);
			this.t[this.r].o.id=this.r;
			
			this.d.body.appendChild(this.t[this.r].o);
			console.log(this.t[this.r].o+this.t[this.r].o.tagName+' created as root ');
			return this.t[this.r].o;
		}else{
			return 1;
		}
	}
	create(i,autoload=true){
		if(!this.has(i)){			return;	}
		if(this.t[i].parentNode== 'root'){
			return 0;//-- allready append in constructor !
		};
		
		console.log('create:'+i+' parentNode:'+this.t[i].parentNode);
		
		let p=this.t[i].parentNode;
		console.log('parentNode:'+p);
		let o=this.get(p);
		console.log('HTMLElement '+o);
		if(o==-1 || o==null || o == false){	return 0;}
		if(this.t[i].o!=null){	return -1;}
		this.t[i].o=this.d.createElement( this.t[i].tagName );
		
		//this.t[i].o.id=i;
		this.doAttrs(i);
		this.doInner(i);
		
		if(autoload==true){ 
		
		o.appendChild(this.t[i].o);
		}
		return this.t[i].o;
	}
	
	
	doInner(i){	if(this.has(i)){	if(this.t[i].innerHTML!=null){this.get(i).innerHTML=this.t[i].innerHTML;}	}	}
	doAttrs(i,opt=[]){//-- will set only attributes with name in opt Array[]
		if(this.has(i)){
				console.log(this.t[i].attributes);
			if(this.t[i].attributes!={}){
				let at=this.get(i);
				let c=[];
				if(opt.length<1){//-- NO constraint
					for(let k in this.t[i].attributes){
						c.push(k);
						at.setAttribute( k, this.t[i].attributes[k] );
						console.log('doAttr('+c.length+') '+k+': '+at.attributes[k]);
					}
				}else{
					for(let k in this.t[i].attributes){
						if(opt.includes(k)){//-- set ONLY for Array opt .includes(k)
							c.push(k);
							at.setAttribute( k, this.t[i].attributes[k] );
							console.log('doAttr('+c.length+') '+k+': '+at.attributes[k]);
						}
					}
				}										return c;
			}else{console.log(i+' has no attribute');	return 0;}
		}else{	console.log(i+' not exist');			return -1;}
	}
	
	updateAttr(i,attr){
		if(this.ready(i)){
			let chk=this.get(i).getAttribute(attr);
				if(chk != this.t[i].attributes[attr] || !isReal(chk) ){
					this.get(i).setAttribute(attr,this.t[i].attributes[i]);
					return 1;
				}return 0;//-- same value no need to update
		}return -1;//-- !this.ready()
	}

	doHTML(i){	this.doInner(i);this.doAttrs();}
	doComputedStyle(i,added=true){//-- this is a style per rule ! MIND to replace with functional.head.js functions
			if(this.has(i)){
				if(this.t[i].computed.style!={}){
					let c=0, at=this.get(i), style='';
					//-- keep attributes.style value at first hand IF ADDED===true
					if(this.t[i].attributes.style!=null){
						if(added===true){	style+=this.t[i].attributes.style;	}
					}
					
					for(let k in this.t[i].computed.style){
						c++;
						style+=k+':'+this.t[i].computed.style[k]+';';
						console.log( 'doCss('+c+') '+k+':'+this.t[i].computed.style[k]+';');
					}
										//-- keep attributes.style value at first hand IF ADDED===true
					if(this.t[i].attributes.style!=null){
						if(added===true){	style+=this.t[i].attributes.style;	}
					}

				at.setAttribute('style',style);
				}else{	console.log('there is no computed CSS rules');}
			}
	}
	doCs(i,a=true){	return doComputedStyle(i,a); }
}

class DOMTreeBuilder extends DomTree{
	constructor(root   = ['rootdefault','section'],
				//-- root	 Array.[id(root),tagname(root)],
				others = {	titledefault:['h1',	//-- others[...'id'].Array[0] = String tagName, 
							'rootdefault', 		//-- others[...'id'].Array[1] = String parentNode,
							{ innerHTML:'default title', attributes:{class:'titledefaultclass',style:'background-color:red;;text-transform:uppercase;color:#fff;text-align:center;',id:'wrongidvalue'} }//-- Array[2]
												//-- others.[...'id'].Array[2] = Object { innerHTML:String, attributes:{} }
							]
						}
				){
			
		super(root[0],root[1]);
		this.feed(others);
		console.log('first child element is '+this.t[this.t[this.r].childs[0]].tagName+'('+this.t[this.r].childs[0]+')');
	//	this.dispAll();
	}
	feed(adders){//-- with adders == {}
		for(let k in adders){
			this.add(k,adders[k][0],adders[k][1]);
			console.log(this.t[k].attributes.id+' is added');
			if(isReal(adders[k][2])){
				if(isReal(adders[k][2].innerHTML)){		this.setInner(k,adders[k][2].innerHTML);console.log(k+' setInner: '+this.t[k].innerHTML);			}else{		console.log(k+' has no inner content');		}
				if(isReal(adders[k][2].attributes)){	this.setAttrs(k,adders[k][2].attributes);		}else{		console.log(k+' has no attributes');		}
			}
			console.log(k+' has inner \''+this.t[k].innerHTML+'\'');
			this.create(k);
			
		}
		
	}
/*	dispAll(){
		for(let k in this.t){
			this.create(k);		
		}
		
	}
*/	
}


class TreeFrameWorkDefault extends DOMTreeBuilder{
	constructor(){
		super(['bg0','section'],
			{
				bg1:['canvas',
					'bg0',
					{attributes:{/** note Canvas will use depreciated attributes(width/height) instead of style ! */
						WIDTH:screenW()+'px',
						HEIGHT:screenH()+'px'
						}
					}],
				bg2:['article',
					'bg0',
					{
					attributes:{
						style:'width:'+screenW()+'px;height:'+screenH()+'px;'}
					}],
				gtitle:['h2','bg2',
					{innerHTML:'DOM virtual engine: data view',
					attributes:{style:'padding:0 0.2em 0.33em 0.3em;text-align:center;display:block;background-color:rgba(40,220,240,0.75);color:firebrick;'}
					}],
				bg3:['section','bg2',{innerHTML:'z=3 bg2.#bg3: DOM ViewGraphics Overlay(always on top)'} ],
				textscreen:['article','bg3',{innerHTML:'z=4 bg3#textscreen: only text overlay',attributes:{style:'z-index:4;'}}],
				bg4:['section','bg0',
					{innerHMTL:'z=5 #bg4 User Interface holder',
					attributes:{style:'z-index:5;'} } ],
				uitext:['article','bg4',{
					innerHTML:'<span class="devnote">z=5 bg4#uitext</span>',
					attributes:{style:'background-color:rgba(155,205,255,0.25);'} } ],
				uitexttitle:['h2','uitext',
					{innerHTML:'UI title',
					attributes:{style:'margin-top:5.6em;background-color:rgba(220,0,180,0.7);'}
					} ],
/**
	*			 below are content whose aren't bone - so can be removed, set size, change, replace... 		*
*/

				textdescript:['section','uitext',
					{innerHTML:'a text panel<br>'+TREEuitext,
					attributes:{style:'overflow:auto;position:absolute;padding:0.3em; margin:0.2em;top:28%;left:25%;width:60%;height:68.5%;border:2px solid lime;background-color:rgba(255,255,255,0.5);color:navy;'}
					} ],
				defaultui:['form','bg4',
					{innerHTML:'<p style="padding:0.25em;">default UI item </p>',
					attributes:{style:'position:absolute; left:2em; top:12em; width:8em; height:8em; background-color:rgba(220,238,255,0.7);border:1px dotted red;box-shadow:2px 2px 7px rgba(125,125,255,0.45);'} }],
				defaultuibutton:['button','defaultui',{innerHTML:'valider',attributes:{onclick:'(alert("vous cliquez un item par défaut, rien n\'arrive à part cette alerte texte stupide!"))',type:'button',value:'defaultform',style:'margin:1em 0 0 4em;'}}],
	
			}
		);
	}
}



/** 
previous description à la place textdescript[innerHTML]= 'a text panel<br>'+TREEuitext at section uitext
------------------------------------------------------------------------------------------------------------------
			/*+
					'POO file:"domtree.1.js" (in progress v:0.1, older=v0.0 "domtree.js" )<hr/><ol><li>bg0: root, set background-color/image</li>'+
					'<li>bg1:Canvas 2d Graphics</li>'
					+'<li>bg2:DOM ViewGraphics</li>'
					+'<li>bg2.bg3:DOM ViewGraphics Overlay</li>'
					+'<li>textscreen:display infos about graphics(mainly text)</li>'
					+'<li>bg4:User Interface holder(may contain menu/interface background)</li>'
					+'<li>bg4.uitext:User Interface text(display) content</li>'
					+'<li>bg4.uitexttitle:User Interface main title</li>'
					+'<li>bg4.uitexttitle:User Interface main title</li>'
					+'</ol> '
					+'<hr/>'
					+'<p>buts/goals:<br>'
					+'Ceci est l\'ossature générique du framework, l\'arbre des HTMLElement et VisualItem (extends VisualObject)'
					+'<br><i>VisualItem est au sens large un objet contenant tout élément d\'affichage autre que des balises HTML, ils peuvent être composés de plusieurs VisualItem(groupe)'
					+'<br>par ex.: un texte à afficher, des coordonnées de dessin pour Canvas2D,... l\'intérêt étant bien sûr de modéliser les données de différents éléments d\'affichage.</i>'
					+'<br><pre>+'
					+'ceci est la vue contenant les données(virtuelles et obtenues d\'un ObjectData.ObjectFactory ) et méthodes de visualisation(avec HTML=gestion du DOM et méthodes document + CanvasEngine(moteur graphique 2D))'
					+'</pre>'
					+'<br>Le modèle de données s\'inspire de MVC sans s\'y conformer et permet:'
					+'<ul><li>'
					+'gestion de l\'arbre DOM virtuel'
					+'</li>'
					+'<li>duplicata des données et vérification inversée(obtenir les valeurs à partir du DOM) et plus généralement un accés restreint à document.'
					+'</li>'
					+'<li>préparer et regrouper toutes les mises à jour pour:<br> changer uniquement les valeurs nécessaires(update)<br>ainsi que faire MAJs en groupe(pour limiter/réduire les appels au DOM=plus de vitesse, moins erreurs )'
					+'</li>'
					+'</ul><hr></p><p>'
					+'Modéle Conceptuel:'
					+'sur l\'exemple(bien aboutit) de la boucle d\'exécution, file: "exepileloop.js"(le nom est moche mais le code au top):<br>'
					+'un thread ou envirronnement d\'exécution boucle selon le mode de boucle choisit(pas à pas, timeout, setInterval, requestAnimationFrame)'
					+'<br>celui ci à accés à la majorité des Objets(main runtime)'
					+'<br>'

					+'</p>'
					
*------------------------------------------------------------------------------------------------------------------------------------------
					*/
