/** --------------------- --------------------- --------------------- ------------------------------------------
**		functional.webdocument.js
*		explore and manage a tree, use presets page's layouts
*
*
*  --------------------- --------------------- --------------------- ------------------------------------------*/
// to add to functional.register.js when functional.register exist
let ref_page;
	
function tagName(tag){
	if(isElement(tag)){	return substring(''+tag,indexOf(''+tag))}
}

function extractPage (isRegister=false){
	return document.children();
	
}