/** functional.polyfill */
/** * is about detect compatibility then quirk OR polyfill is possible*/
/** FOR JavaScript*/
// CAPABILITY DETECTION 
//credit: Peter Michaux
function isHostMethod(object, property) {
	let t = typeof object[property];
	return t=='function' ||
	(!!(t=='object' && object[property])) ||
	t=='unknown';
}

/** HTML5 feature detect */
//	result = isHostMethod(xhr, “open”); //true
function supports_canvas() {
return !!document.createElement('canvas').getContext;
}
function supports_canvas_text() {
if (!supports_canvas()) { return false; }
let dummy_canvas = document.createElement('canvas');
let context = dummy_canvas.getContext('2d');
return typeof context.fillText == 'function';
}
function supports_video() {
return !!document.createElement('video').canPlayType;
}

function supports_h264_baseline_video() {
if (!supports_video()) { return false; }
let v = document.createElement("video");
return v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
}

function supports_ogg_theora_video() {
if (!supports_video()) { return false; }
var v = document.createElement("video");
return v.canPlayType('video/ogg; codecs="theora, vorbis"');
}

function supports_webm_video() {
if (!supports_video()) { return false; }
var v = document.createElement("video");
return v.canPlayType('video/webm; codecs="vp8, vorbis"');
}
function supports_local_storage() {
return ('localStorage' in window) && window['localStorage'] !== null;
}
function supports_web_workers() {
return !!window.Worker;
}
function supports_offline() {
return !!window.applicationCache;
}
function supports_geolocation() {
return !!navigator.geolocation;
}
function supports_input_types(){
	//list of HTML input type attributes : search , number, range, color, tel, url, email, month, week, time, datetime, datetime-local
	let supported={};
	let i = document.createElement('input');	i.setAttribute('type','search');	if(i.type !=='text'){	supported.search=true;	}
	i = document.createElement('input');	i.setAttribute('type','number');	if(i.type !=='text'){	supported.number=true;	}
	i = document.createElement('input');	i.setAttribute('type','range');	if(i.type !=='text'){	supported.range=true;	}
	i = document.createElement('input');	i.setAttribute('type','color');	if(i.type !=='text'){	supported.color=true;	}
	i = document.createElement('input');	i.setAttribute('type','tel');	if(i.type !=='text'){	supported.tel=true;	}
	i = document.createElement('input');	i.setAttribute('type','url');	if(i.type !=='text'){	supported.url=true;	}
	i = document.createElement('input');	i.setAttribute('type','email');	if(i.type !=='text'){	supported.email=true;	}
	i = document.createElement('input');	i.setAttribute('type','month');	if(i.type !=='text'){	supported.month=true;	}
	i = document.createElement('input');	i.setAttribute('type','week');	if(i.type !=='text'){	supported.week=true;	}
	i = document.createElement('input');	i.setAttribute('type','time');	if(i.type !=='text'){	supported.time=true;	}
	i = document.createElement('input');	i.setAttribute('type','datetime');if(i.type !=='text'){	supported.datetime=true;	}
	i = document.createElement('input');	i.setAttribute('type','datetime-local');
	if(i.type !=='text'){	supported.datetimelocal=true;	}
	return supported;
}
function supports_input_placeholder() {let i = document.createElement('input');return 'placeholder' in i;}

function supports_microdata_api() {
return !!document.getItems;
}
/** FOR C.S.S. */