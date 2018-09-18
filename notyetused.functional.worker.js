//functional.worker.js
let workPlace=[];
function _support_Worker(){
	if(typeof(Worker) !== "undefined") {
    console.log(' Yes! Web worker support!');
	return true;}
	console.log(' Sorry! No Web Worker support..');
	return false;
}

function newWorker(){worktash}{
	if(_supportWorker()){
	let w=new Worker(worktash);
	workplace.push([w,worktash]);
	return w;
	}return;
}
function stopWorker(w){
	if(typeof w ==='Worker'){w.terminate();w=undefined;return;}
	if(parseInt(w)){		if(workPlace[w]){workPlace[w][0].terminate; workPlace[w][0]=undefined;return;	} }
	return false;
}
function createWorker(worktash){	newWorker(worktash);return workplace;}
function exterminateWorkers(worktash){
		let len=workPlace.length;
		let i=0;
	for( i;i<len;i++ ){
		workPlace(i][0].terminate();
	}
	workPlace=[];
}
function clearWorkPlace(){
	let place=[],
	 cpt=0;
	for(let i,len=workPlace.length;i<len;i++){	if(typeof workPlace[i]!===undefined){cpt++;place[i]=workPlace[i];}	}
	workPlace=place;
	return [workPlace,workPlace.length];
}
