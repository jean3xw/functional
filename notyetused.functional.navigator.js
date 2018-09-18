/** 
functional.navigator
*/
/** THIS IS A PROTOTYPAL function , for now equal to using function window.navigator 
* todo: add IE and Opera compatibility * and other device/browser
*/
function navigatorInfo(){/** will return Object litteral */
/** TODO : window.clientInformation for IE and window.opera for opera !!!*/
	let navinfo=window.navigator;
	let navig={};
	/** for NOW just copy window.navigator into Object litteral */
	navig.appCodeName=navinfo.appCodeName;
	navig.apiMinorVersion=navinfo.appMinorVersion;
	navig.appName=navinfo.appName;
	navig.appVersion=navinfo.appVersion;
	navig.buildID=navinfo.buildID;//-- only with Mozilla !!
	navig.cookieEnabled=navinfo.cookieEnabled;
	navig.cpuClass=navinfo.cpuClass;//-- only IE !!
	navig.javaEnabled=navinfo.javaEnabled();
	navig.language=navinfo.language;// -- NOTE: IE will use .systemLanguage ,  IE AND OPERA use .userLanguage 
	navig.mimeTypes=navinfo.mimeTypes;
	navig.onLine=navinfo.onLine;
	navig.oscpu=navinfo.oscpu;//-- ONLY WITH FIREFOX
	navig.platform=navinfo.platform;
	navig.plugins=navinfo.plugins;
//	navig.preference=navinfo.preference();//-- ONLY FIREFOX in privelegied mode // disable by default
	
	navig.product=navinfo.product;//-- ONLY FIREFOX/SAFARI/CHROME
	navig.productSub=navinfo.productSub;//-- ONLY FIREFOX/SAFARI/CHROME
	navig.userAgent=navinfo.userAgent;
	
	this.infos=function(){	return navig;}
	this.toString=function (){
	return ''+navig.appCodeName+' '+navig.appName+' '+navig.appVersion+' '+navig.buildID+' '+navig.cookieEnabled+' '+navig.cpuClass+' '+navig.javaEnabled+' '+navig.language
	+' '+navig.mimeTypes+' '+navig.onLine+' '+navig.oscpu+' '+navig.platform+' '+navig.plugins+' '+navig.product+' '+navig.productSub+' '+navig.userAgent;
	}
	return this;
	
	

}

//plugin detection - doesn’t work in Internet Explorer
function hasPlugin(name){
name = name.toLowerCase();
for (let i=0; i < navigator.plugins.length; i++){
if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1){
return true;
}
}
return false;
}
/** detect flash
alert(hasPlugin('Flash')); //-- NOTICE : IS Flash not enabled (default) will return false !!!
detect quicktime
alert(hasPlugin('QuickTime'));
*/
//plugin detection for Internet Explorer
function hasIEPlugin(name){
try {
new ActiveXObject(name);
return true;
} catch (ex){
return false;
}
}
/**detect flash
alert(hasIEPlugin('ShockwaveFlash.ShockwaveFlash'));
detect quicktime
alert(hasIEPlugin('QuickTime.QuickTime'));
*/

/** *detect flash for all browsers*/
function hasFlash(){
	let result = hasPlugin('Flash');
	if (!result){
		result = hasIEPlugin('ShockwaveFlash.ShockwaveFlash');
	}
	return result;
}
//detect quicktime for all browsers
function hasQuickTime(){
	let result = hasPlugin('QuickTime');
	if (!result){
		result = hasIEPlugin('QuickTime.QuickTime');
	}
	return result;
}

/** FROM Javascript for webdeveloppers 3rd  edition p.287
*/
/** WARNING NEED TO USE navigator.userAgent to set engine value to check *see further code in book !! */
let client=function() {
 
//rendering engines
	let engine = {
		ie: 0,
		gecko: 0,
		webkit: 0,
		khtml: 0,
		opera: 0,
		//complete version
		ver: null
	};
	//browsers
	let browser = {
	//browsers
		ie: 0,
		firefox: 0,
		safari: 0,
		konq: 0,
		opera: 0,
		chrome: 0,
		//specific version
		ver: null
	};
	//platform/device/OS
	let system = {
		win: false,
		mac: false,
		x11: false,
		//mobile devices
		iphone: false,
		ipod: false,
		ipad: false,
		ios: false,
		android: false,
		nokiaN: false,
		winMobile: false,
		//game systems
		wii: false,
		ps: false
	};

let ua = navigator.userAgent;
if (window.opera){
engine.ver = browser.ver = window.opera.version();
engine.opera = browser.opera = parseFloat(engine.ver);
} else if (/AppleWebKit\/(\S+)/.test(ua)){
engine.ver = RegExp['$1'];
engine.webkit = parseFloat(engine.ver);
//figure out if it’s Chrome or Safari
if (/Chrome\/(\S+)/.test(ua)){
browser.ver = RegExp['$1'];
browser.chrome = parseFloat(browser.ver);
} else if (/Version\/(\S+)/.test(ua)){
browser.ver = RegExp['$1'];
browser.safari = parseFloat(browser.ver);
} else {
//approximate version
let safariVersion = 1;
if (engine.webkit < 100){
safariVersion = 1;
} else if (engine.webkit < 312){
safariVersion = 1.2;
} else if (engine.webkit < 412){
safariVersion = 1.3;
} else {
safariVersion = 2;
}
browser.safari = browser.ver = safariVersion;
}
} else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
engine.ver = browser.ver = RegExp['$1'];
engine.khtml = browser.konq = parseFloat(engine.ver);
} else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
engine.ver = RegExp['$1'];
engine.gecko = parseFloat(engine.ver);
//determine if it’s Firefox
if (/Firefox\/(\S+)/.test(ua)){
browser.ver = RegExp['$1'];
browser.firefox = parseFloat(browser.ver);
}
} else if (/MSIE ([^;]+)/.test(ua)){
engine.ver = browser.ver = RegExp['$1'];
engine.ie = browser.ie = parseFloat(engine.ver);
}
//detect browsers
browser.ie = engine.ie;
browser.opera = engine.opera;
//detect platform
let p = navigator.platform;

system.win = p.indexOf('Win') == 0;
system.mac = p.indexOf('Mac') == 0;
system.x11 = (p == 'X11') || (p.indexOf('Linux') == 0);
//detect windows operating systems
if (system.win){
if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
if (RegExp['$1'] == 'NT'){
switch(RegExp['$2']){
case '5.0':
system.win = '2000';
break;
case '5.1':
system.win = 'XP';
break;
case '6.0':
system.win = 'Vista';
break;
case '6.1':
system.win = '7';
break;
default:
system.win = 'NT';
break;
}
} else if (RegExp['$1'] == '9x'){
system.win = 'ME';
} else {
system.win = RegExp['$1'];
}
}
}
//mobile devices
system.iphone = ua.indexOf('iPhone') > -1;
system.ipod = ua.indexOf('iPod') > -1;
system.ipad = ua.indexOf('iPad') > -1;
system.nokiaN = ua.indexOf('NokiaN') > -1;
//windows mobile
if (system.win == 'CE'){
system.winMobile = system.win;
} else if (system.win == 'Ph'){
if(/Windows Phone OS (\d+.\d+)/.test(ua)){;
system.win = 'Phone';
system.winMobile = parseFloat(RegExp['$1']);
}
}
//determine iOS version
if (system.mac && ua.indexOf('Mobile') > -1){
if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
system.ios = parseFloat(RegExp.$1.replace('_', '.'));
} else {
system.ios = 2; //can’t really detect - so guess
}
}
//determine Android version
if (/Android (\d+\.\d+)/.test(ua)){
system.android = parseFloat(RegExp.$1);
}
//gaming systems
system.wii = ua.indexOf('Wii') > -1;
system.ps = /playstation/i.test(ua);
//return it
return {
engine: engine,
browser: browser,
system: system
};
}();
