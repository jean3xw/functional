//dialog.js
let _ref_dial;/** IMPORTANT : USED AS GLOBAL VARIABLE : will be set at end of function ! TODO : use singleton
* ex:*
 _ref_dial=dialog(document.getElementById('dial'), 'Comment allez vous',['bien','moyen','pas bien'],[1,2,3]);_ref_dial=dialog(document.getElementById('dial'), 'Comment allez vous',['bien','moyen','pas bien'],[1,2,3]);
*/ 
let default_mark='?';
function dialog(panel, question,choices,reponses){
	let holder={
		dial:[ [question,[choices, reponses] ] ],
		panel:panel,
		count:function(){	return this.dial.length;},
		addQuestion:function (question,choices,reponses,id=this.dial.length){
			if(this.dial[id]!==undefined){	console.log('overwrite id['+id+']');}
			if(id=this.dial.length){
				this.dial.push( [question,[choices, reponses] ] );
			}else{
				this.dial[id]=[question,[choices, reponses] ];
			}
	//		return this.dial.length;
		},
		say:function(idx){
			if (this.dial[idx]!==undefined){
				return [ this.dial[idx][0] , this.dial[idx][1][0] , this.dial[idx][1][1] ];//-- array contain: question<string> , choices<array> , reponses<array>
			}else{
				seelog('undefined idx in dial[]');
				return null;
			}
		},
		hiddenId:function(id){//-- add an input hidden with value = id
			let t=document.createElement('input');
			t.setAttribute('id','current');
			t.setAttribute('hidden','hidden');
			t.value=id;
			this.panel.appendChild(t);
			},
		sayIn:function (target, idx,clearpanel=true, mark=default_mark,renewpanel=false){
			// alert(this.dial[idx]);
			if(renewpanel===true){	this.panel=panel;}
			if (this.dial[idx]!==undefined && idx>-1 && idx<=this.dial.length){
			 if(typeof this.dial[idx][0]==='string'){
				if(clearpanel===true){ this.panel.innerHTML='';}
					this.hiddenId(idx);
					let pq=document.createElement('p');
					pq.appendChild(document.createTextNode(''+this.dial[idx][0]+mark));
					target.appendChild(pq);
					console.log('question: '+this.dial[idx][0]);
					toDom(newTag('br'), target);
					for(let i=0;  i<this.dial[idx][1][0].length;i++){
						//console.log( this.dial[idx][1][0][i]+' on '+target);
						let bt=document.createElement('button');
						bt.appendChild(document.createTextNode(this.dial[idx][1][0][i]+'') );
						bt.value=this.dial[idx][1][1][i];
						let me=this;
						target.appendChild(bt);
						bt.addEventListener('click', function(e){
							//bt.removeListener('click');// anonymous function cant be removed
							console.log('value is '+bt.value);
							if(bt.value<_ref_dial.dial.length){
								this.parentNode.appendChild( document.createElement('br') );
								this.parentNode.appendChild( document.createTextNode('value is : '+bt.value) );
							//let c=window.confirm(_ref_dial)
								_ref_dial.disp(bt.value);
							}else{
								alert('unknow index');
							}
						},
						false );
						
						
					}
			  }else if(typeof this.dial[idx][0]==='function'){
				this.dial[idx][0]();
			  }
			}else if(idx==='-1'){
				if(clearpanel===true){ this.panel.innerHTML='';}
				target.innerHTML='end of dialog';
			}else{
				console.log('undefined index '+idx);
			}

		},
		disp:function(id,clearpanel=true,mark=default_mark,renew=false){// sayIn:function (target, idx,clearpanel=true, mark='?',renewpanel=false){
			this.sayIn(this.panel,id,clearpanel,mark,renew);
		},
		getChoice(id,cho_id){		if(this.say(id)!==undefined){	return this.say(id)[1][cho_id];	}
			return null;	
		},
	//	select:function(){},
		getReponse:function(id,rep_id){
			if(this.say(id)!==undefined){	return this.say(id)[2][rep_id];	}
			return null;
		},
		getChoiceReponse(id,idx){
		return [ this.getChoice(id,idx),this.getReponse(id,idx) ];
		},
		drawMap(){//-- developpement ONLY
			let dv=document.createElement('div');
			document.body.appendChild(document.createElement('hr'));
			for(let i=0;i<this.dial.length;i++){
				let v=dv.cloneNode();
				v.setAttribute('style','border:1px solid #000;');
				v.appendChild(document.createTextNode('['+i+']'+this.dial[i][0]));
				v.appendChild(document.createElement('hr'));
				v.appendChild(document.createTextNode(' [ '+this.dial[i][1][0].join(' , ')+' ]'));
				v.appendChild(document.createElement('hr'));
				v.appendChild(document.createTextNode(' [ '+this.dial[i][1][1].join(' , ')+' ]'));
				dv.appendChild(v);
			}
			document.body.appendChild(dv);
		}
//	this.get=function(){	return this;}
	}//-- END holder
	_ref_dial=holder;//-- mind that only one occurence of dialog can be !!!
	return holder;
}//-- end function dialog