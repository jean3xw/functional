/** widget.modal.js $ display/hide modal
* require functional.js, functional.head.js
* inspired from : www.w3schools.com/howto/howto_css_modals.html
*/
/** DOC: function newModal(id,bt,content,width=80,height=80, aim=null,top='center',left='center')
** arguments :
* id = string modal.id // must be UNIQUE
* content = HTML content || string(text) to display in modalContent 
* bt = HTMLElement who receive listener 'click' to open // this 'button' can be any HTMLElement
* width = width in percent, default is 80 
* height = height in percent, default is 80 
* aim = HTMLElement whose will append bt , set to null(default) it will append to HTMLBodyElement 
* hz = decay from top can be int(positive or negative % ) or string 'center'(centered),'top'(fixed to top line), 'bottom'(fixed to bottom line), default is 'center'
* vt = decay from left can be int or string 'center(default), 'left'(aligned to left side), 'rigth'(aligned to right side)
* maxresize : if true(default) set style.width and style.height 100; 
* z = falcultative z-index increment , if needed higher than 1 (if any set it will be added)
* animated if true add animation from top !
*/
function newModal(id,bt,aim,content,width,height,vt='center',hz='center',maxresize=true,z=0,animated=true){
	let modal=newTagId('div',id),
	 btn=bt,
	 modalContent=newTagId('div',id+'-modal'),
	 btnParentNode=aim,
	 btClose=say(setId( newTagClass('span','close'), id+'-modal-close'),'X');
	 w=width,
	 h=height,
	 zidx=1+z;
	 vertical=vt;
	 horizontal=hz;
	
	if(!isNum(vertical)){
		switch(vertical){
			case 'center':vertical=parseFloat((100-h)/2);break;
			case 'top':vertical=0;break;
			case 'bottom':vertical=parseFloat(96.3-h);break;//-- NOTE : always a decalage at bottom(so it wont force scrollbar/overflow to show)
			default:seelog('undefined vertical(hz) string parameter. top decay will be set to center');vertical=parseFloat((100-h)/2);
			break;
		}
	}
	if(!isNum(horizontal)){
		switch(horizontal){
			case 'center':horizontal=parseFloat((100-w)/2);break;
			case 'left':horizontal=0;break;
			case 'right':horizontal=parseFloat(99.4-w);break;
			default:seelog('undefined horizontal(vt) string parameter. left decay will be set to center');horizontal=parseFloat((100-w)/2);
			break;
		}
	}
/** add the needed style */	
	addPageStyle('div#'+id,
	'display:none;margin:0;padding:0;position:fixed;z-index:'+zidx+';z-index:'+
	zidx+';top:0;left:0;width:100%;height:100%;overflow:auto;background-color:rgb(0,0,0);background-color:rgba(0,0,0,0.5);');// note: the 1st background-color is fallback 
//-- next addPageStyle is multiline for human readable, put in one line for minified version!
	addPageStyle('#'+id+'-modal', 'margin:0;padding:0;width:'+w+'%;height:'+h+'%;position:absolute;'+
	'top:'+vertical+'%;left:'+horizontal+'%;background-color:rgb(220,220,220);'+
	'background-color:rgba(255,255,255,0.8);border:1px solid #888;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);'+
	'-webkit-animation-name: animatetop;-webkit-animation-duration: 0.2s;animation-name: animatetop;animation-duration: 0.2s;');
//-- animate the modal appareance
	if(animated===true){
		addPageStyle('@-webkit-keyframes animatetop ','from {top: -300px; opacity: 0} to {top: 0; opacity: 1}');
		addPageStyle('@keyframes animatetop','from {top: -300px; opacity: 0} to {top: 0; opacity: 1}');
	}
//-- style close button
	addPageStyle('.close','color: #aaa;background-color:#000;border:1px solid red;float: right;font-size:1em;width:1em;text-align:center;height:1em;font-weight: bold;');
	addPageStyle('.close:hover,.close:focus','color: #f00;border:1px solid #000;background-color:#fff;text-decoration: none;cursor: pointer;');
    
 /** appends content to each container then to body */
	toDom( btClose , modalContent);
	ilog('[functional.modal] content: '+content);
    if(isHtml(content)){//-- if HTMLElement
		toDom(content,modalContent);
	}else if(isStr(content)){//-- if is STRING
		say(modalContent, content);
	}else{
		warn('unable to append content, parameter MUST be string or HTMLElement! ');
	}

	toDom( destIn( modalContent , modal ) , body());
    toDom( btn , btnParentNode);
/** listener FN */
	function modalShow(){modal.style.display='block';}
	function modalHide(){modal.style.display='none';}
/** add the listener(s) */ 
	btn.addEventListener('click', modalShow,false);
	btClose.addEventListener('click', modalHide,false);
	window.addEventListener('click',function(e){
		if (e.target == getId(id)) {
			getId(id).style.display = "none";
		}
	},false);
    
	if(maxresize===true && content.nodeName!==undefined ){		styleSet(styleSet(content,'width','100%'),'height','100%'); }
	
	return [modal,modalContent,btn];
}
//-- instantly show the modal
function launchModal(id,autoBt,aim,content,width,height,vt='center',hz='center',maxresize=true,z=0,animated=true){
	let alm = newModal(id,autoBt,aim,content,width,height,vt,hz,maxresize,z,animated);
	autoBt.click();
}
//-- instantly show a modal and then remove the button used to launch it
function autoLaunchModal(id,autoBt,aim,content,width,height,vt='center',hz='center',maxresize=true,z=0,animated=true){
	let alm = newModal(id,autoBt,aim,content,width,height,vt,hz,maxresize,z,animated);
	autoBt.click();
	autoBt.parentNode.removeChild(autoBt);
}
function launchedModal(id,aim,content,width,height,vt='center',hz='center',maxresize=true,z=0,animated=true,isremoved=false){
	if(isHtml(isremoved)){
		return launchModal(id,isremoved,aim,content,width,height,vt,hz,maxresize,z,animated);
	}
	let launchBT;
	let textBT = isBool(isremoved)?'showModal':isremoved;//-- with 2nd argument is boolean or string
	launchBT=newBt(textBT,'btauto'+rand0(101),'launchmodal');
	if(isremoved===true){
		return autoLaunchModal(id,launchBT,aim,content,width,height,vt,hz,maxresize,z,animated);
	}
	return launchModal(id,launchBT,aim,content,width,height,vt,hz,maxresize,z,animated);
}