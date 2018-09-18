/** 
* standard fonction to migrate to functional.js
*/
function title(tag,cont=false,hlevel=1){
	let res;
	res= tag.getElementsByTagName('h'+hlevel)[0]!==undefined ? tag.getElementsByTagName('h'+hlevel)[0] : toDom( newTag('h'+hlevel) , tag ) ;
	seelog();
}
/** functional.webpage.js 
*is the layout of a webpage
* require functional.js 
*/
function newTree(url,enabled=true){//-- functional url
let pageTree= {
 functional:{ enabled:enabled, url:url },
 page:{
	doctype:'html5', 
	html:{
		head:{
			charset:'<meta charset="utf-8" />',
			style:'<style type="text/css" rel="stylesheet" ></style>',
			script:'<script></script>'
		}
		body:{
			header:{id:null},
			main:{id:null},
			footer:{id:null}
		}
	}
 },
 body:this.page.html.body,
 header:this.page.html.body.header.id,
 main:this.page.html.body.main.id,
 footer:this.page.html.body.footer.id,
 doc:this.page.html,
 node:function(bodypath='main',subpath=''){
	 let nodepath;
	 nodepath=this.(bodypath); 
	 if(nodepath!==undefined){
	 if(subpath===''){ return getId(nodepath);}
	 if(nodepath.();
 }
};
if(enabled===true){ pageTree.page.html.head.script='<script src="'+url+'" ></script>'; };
return pageTree;
}
/** create the variable pageTree */
let pageTree=newTree( '../functional.js' , true );

function tree(){ return pageTree; }
function treeBody(){ return pageTree.body; }
function treeAs(hbf='main'){hbf=hbf.toLowerCase();	
	switch(hbf){
		case'main':return treeBody().main;break;
		case'header':return treeBody().header;break;
		case'footer':return treeBody().footer;break;
		default:return treeBody().main; break;
	}
}

function initPage(){/** CAUTION : will clear the page content !  */
	document.body.innerHTML='';
	toDom( newTag('header'),body() );
	main0();
	toDom( newTag('footer'),body() );
}
function initPageId(main='main',header='header',footer='footer'){
	document.body.innerHTML='';
	toDom( newTagId('header',header),body() );
	setId(main0(),main);
	toDom( newTag('footer',footer),body() );
	tree().page.html.body.header.id = header;
	tree().page.html.body.main.id = main;
	tree().page.html.body.footer.id = footer;
}
function articleH(title,hlevel){
	return destIn( say( newTag('h'+hlevel), title),newTag('article') );
}
function aH(t,lv){return articleH(t,lv);}/** shorten articleH */
function articleHId(id,title,hlevel){	return setId( articleH(title,hlevel), id ); }/** create Article+Hx with Article id */
function aHId(id,tt,hl){	return articleHId(id,tt,hl);}/** shorten articleHId */
/** create Section with 'n' articleH *(article with an Hx title)* PARAMS are both array, array(s).length define the number of articles in section*/
function sectionArticleH(titles,lvs){
	let rs=newTag('section');
	if(titles.length!==lvs.length){
		warn('wrong arrays sizes '+titles+' and '+lvs+' MUST HAVE SAME length');
		return;
	}
	for(let art=0; art<titles.length;art++){		rs.appendChild( toDom( articleH(titles['art'], lvs['art'] ), );	}
	return rs;
}
function sectionArticleHId(sectionid, ids, titles, lvs){/** sectionid string , ids Array ids articles, titles string Hcontent content, lvs Array H'lvs[i]'  */ 
	if(ids.length!==titles.length){	warn('wrong arrays sizes '+titles+' and '+ids+' MUST HAVE SAME length');	return;	}
	let rs=sectionArticleH(titles,lvs);
	if(rs===undefined){ return;}
	setId( rs.getElementsByTagName('section'), sectionid );
	let articles= rs.getElementsByTagName('article');
	for(let i;i<articles.length;i++){ setId( article[i], ids[i] ); }
	return rs;
}
function sAHId(idsect,ids,titles,lvs){return sectionArticleHId(ids,titles,lvs);}/** shorten sectionArticleHId */
function sahid(idsect,ids,titles,lvs){return sectionArticleHId(ids,titles,lvs);}/** another shorten sectionArticleHId */

