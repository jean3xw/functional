/** author: bit-less @ stack-overflow */
function rgbaHex(c, a) {
	// RGBA to Hex
	if (Array.isArray(c) || (typeof c === 'string' && /,/.test(c))) {
		c = Array.isArray(c) ? c : c.replace(/[\sa-z\(\);]+/gi, '').split(',');
		c = c.map(s => window.parseInt(s).toString(16).replace(/^([a-z\d])$/i, '0$1'));

		return '#' + c[0] + c[1] + c[2];
	}
	// Hex to RGBA
	else {
		c = c.replace(/#/, '');
		c = c.length % 6 ? c.replace(/(.)(.)(.)/, '$1$1$2$2$3$3') : c;
		c = window.parseInt(c, 16);
		
		a = window.parseFloat(a) || null;
		
		const r = (c >> 16) & 255;
		const g = (c >> 08) & 255;
		const b = (c >> 00) & 255;
		
		return `rgb${a ? 'a' : ''}(${[r, g, b, a].join().replace(/,$/,'')})`;
	}
}
/**
Usages:

rgbaHex('#a8f')

rgbaHex('#aa88ff')

rgbaHex('#A8F')

rgbaHex('#AA88FF')

rgbaHex('#AA88FF', 0.5)

rgbaHex('#a8f', '0.85')

// etc.
rgbaHex('rgba(170,136,255,0.8);')

rgbaHex('rgba(170,136,255,0.8)')

rgbaHex('rgb(170,136,255)')

rgbaHex('rg170,136,255')

rgbaHex(' 170, 136, 255 ')

rgbaHex([170,136,255,0.8])

rgbaHex([170,136,255])

// etc.
*/
function lighten(color, rate){// rate is 0 to 1 (0 to 100%) SET A NEGATIVE VALUE DARKEN THE COLOR
	
	if( Array.isArray(rgbaHex(color)) ){
		saylog('color converted to 255');
		color=rgbaHex(color);
	}else{
		saylog('color 255');
	}
	for(let ic=0;ic<3;ic++){
		color[ic]+=color[ic]*rate;
		if(color[ic]>255){	color[ic]=255;}
		if(color[ic]<0){	color[ic]=0;}
	}
	return color;
}
function darken(color,rate){// SET A NEGATIVE VALUE WILL LIGHTEN THE COLOR
	return lighten(color,-rate);
}