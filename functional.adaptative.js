/** functional.adaptative.js
* contains 2 main purpose/functionalities:
* 1) get browser, navigator, system and device specificities
* 2) then check, set and manage web page with web adaptative View and other specifities
* additional features (who will not be developped till after release) will be :
*  adapt to very specifics browser and settings as for text and vocal navigator or other stuff 
* fitting to people with disability; as vocal for blind or less seeing folk and such...)
*/
/** screen Object */
function _supportsScreen(){
	if(screen!==undefined){console.log('support screen');return true;} console.log('screen not supported');return false;}
//_supportsScreen();
function deviceW(){return screen.width;}
function deviceH(){return screen.height;}
function screenDim(){	return [screen.width,screen.height]; }
function availW(){return screen.availWidth; }
function availH(){return screen.availHeight; }
function availDim(){return [screen.availWidth,screen.availHeight]; }
function screenDepths(){ return [screen.pixelDepth,screen.colorDepth];}
function screenInfos(){ return {dim:screenDim(),depths:screenDepths(),availDim:availDim(),
	fit:function(){if(this.dim[0]===this.availDim[0] && this.dim[1]===this.availDim[1]){return true} return false;}}}
function screenRatio(){ let inf=screenInfos();return inf.dim[0]/inf.dim[1];}
function screenRatioReverse(){ let inf=screenInfos();return inf.dim[1]/inf.dim[0];}
function screenOrientation(){let r=screenRatio();if(r>1){ return 'horizontal';}if(r<1){return 'vertical'}}
// TODO //function resolutionType(){}//-- check 4/3, 16/9, 800p ...
function resolutionPerformance(){//-- based on 2016~ stats
	let pxs=screen.width*screen*screen.height;
	if(pxs> 1024*769){
		if(pxs<1280*801){	return 'average'}
		if(pxs<1280*1023){	return 'average high'}
		if(pxs>1920*1079){ return 'very high'}
		else{return 'high'}
	}
	if(pxs<=640*360)	{ return 'lower';}
	if(pxs<=800*600){ return 'very low';}
	if(pxs<=980*641){ return 'small';}
	if(pxs<=1024*780){ return 'low';}
	return 'average low';
}
function colorPerformance(){
	let t=screen.pixelDepth+screen.colorDepth;
	if (t>=128){ return 'outstanding';}
	if (t>=84){ return 'rich';}
	if (t>=64){ return 'average';}
	if (t>=48){ return 'poor';}
	if (t>=16){ return 'very poor';}
	return 'outdated';
}
function screenPerformances(){
	return [resolutionPerformance(),colorPerformance()];
}

/** navigator */
function navigatorInfos(){
	return {
		appCodeName:navigator.appCodeName,	//	Returns the code name of the browser
		appName:navigator.appName,	//	Returns the name of the browser
		appVersion:navigator.appVersion,	//	Returns the version information of the browser
		product:navigator.product,	//	Returns the engine name of the browser
		appVersion:navigator.cookieEnabled,	//	Determines whether cookies are enabled in the browser
		userAgent:navigator.userAgent,	//	Returns the user-agent header sent by the browser to the server
		onLine:navigator.onLine,	//	Determines whether the browser is online
		platform:navigator.platform,	//	Returns for which platform the browser is compiled
		language:navigator.language,	//	Returns the language of the browser
		geolocation:function(){navigator.geolocation},	//Returns a Geolocation object that can be used to locate the user's position
	//	cpuclass:navigator.cpuClass,// no more exist
		textArray: function(){return ['appName:'+this.appName,' userAgent:'+this.userAgent,' product:'+this.product,' platform:'+this.platform,'cpuClass:'+this.cpuClass];},
		settings:function(){ return 'language:'+this.language+' onLine:'+this.onLine;}
	}
}
function navigatorFullInfos(){
	let gt={}
	for (i in window.navigator){
		gt[i]=window.navigator[i];
//		console.log('*'+i+': '+window.navigator[i]);
	}return gt;
}
/**
Location Object Properties
Property	Description
hash	Sets or returns the anchor part (#) of a URL
host	Sets or returns the hostname and port number of a URL
hostname	Sets or returns the hostname of a URL
href	Sets or returns the entire URL
origin	Returns the protocol, hostname and port number of a URL
pathname	Sets or returns the path name of a URL
port	Sets or returns the port number of a URL
protocol	Sets or returns the protocol of a URL
search	Sets or returns the querystring part of a URL
Location Object Methods
Method	Description
assign()	Loads a new document
reload()	Reloads the current document
replace()	Replaces the current document with a new one
*/