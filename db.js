let stateX = 5;
let stateY = 5;
let blockID=(x,y)=>"B"+x+"_"+y;
 
let state = 
	[[" "," "," "," "," "],
	 [" "," "," "," "," "],
	 [" "," "," "," "," "],
	 [" "," "," "," "," "],
	 [" "," "," "," "," "]
	]
	
let currentShape = [];
	
let oldstate = 
	[[" "," "," "," "," "],
	 [" "," "," "," "," "],
	 [" "," "," "," "," "],
	 [" "," "," "," "," "],
	 [" "," ","T"," "," "]
	]

let shapesNames = ["I","O","T","S","J","Z","L"]
let shapeSize=4;
let shapes = []
let options2 = []
let directionsNames = ["<",">","^","V","\\","/"]
let directionsFuctions = [fmove([-1,0]),fmove([1,0]),fmove([0,-1]),fmove([0,1]),frotShapeN(1),frotShapeN(3)]


let start = Date.now()
let shapesHash={};
initShapes([[0,0]]);
options2 = shapes;
console.log(`initShapes took ${Date.now()-start}ms`); 


function initFromOldstate(){
	for(let x=0;x<state.length;x++)
		for(let y=0;y<state[x].length;y++)
			state[x][y]=oldstate[x][y];
}

function arraysort(a,b){
	for (let i=0;a[i]!=null && b[i]!=null;i++){
		if(a[i]>b[i]) return 1;
		if(a[i]<b[i]) return -1;
	}
	return a.length-b.length;
}

function arrayequals(a,b) {return arraysort(a,b)==0;}

function arraymin(a,b){
	c=[];
	for (let i=0;a[i]!=null && b[i]!=null;i++){
		c.push(Math.min(a[i],b[i]))
	}
	return c;
}

function arraysum(a,b){
	c=[];
	for (let i=0;a[i]!=null && b[i]!=null;i++){
		c.push(a[i]+b[i])
	}
	return c;
}

function arrayCenter(x) {
		if(x.length==0) return [0,0];
		center = x.reduce(arraysum);
		center = arraysum(center,x[0]);
		center = center.map(a=>a/(x.length+1));
		center = [center[0]+center[1],center[0]-center[1]];
		center = center.map(Math.round);
		center = [(center[0]+center[1])/2,(center[0]-center[1])/2];
		return center;
	}

function arrayRotate([x,y],[cx,cy]) {
		return [-y+cy+cx,x-cx+cy];
	}
function arrayRotateN(i,x,c) {
 	if (i==0) return x;
 	x=arrayRotateN(i-1,x,c);
 	return arrayRotate(x,c);
 }
function frotN(i,c) {return x=>arrayRotateN(i,x,c)}
function frotShapeN(i) {return x=>x.map(frotN(i,arrayCenter(x)))}

function fsum(a) { return x=>arraysum(x,a);}
function fmove(a) { return x=>x.map(fsum(a))}

function init_centerShape(x){
	x.sort(arraysort);
	let min = x.reduce(arraymin);
	min = arrayRotateN(2,min,[0,0]);
	return x.map(fsum(min));
	
}

function shapeHash(s)
{
	let hash="";
	for(x of s)
		for(y of x)
			hash+=y;
	return hash;
}
function init_addShape(x){
	x = init_centerShape(x)
	for (let i=0;i<x.length-1;i++)
		if (x[i]<=x[i+1] && x[i]>=x[i+1])
			return;
	for(i=0;i<4;i++){
		x = x.map(frotN(1,[0,0]));
		x = init_centerShape(x)

		for(let j=0;j<shapes.length;j++){
			if (arrayequals(shapes[j],x))
				return;
		}
	}
	shapes.push(x);
	shapesHash[shapeHash(x)]=true;
}

function initShapes(x){
	if (x.length==shapeSize){
		init_addShape([...x])
		return;
	}
	for (atom of x){
		for (let i=0;i<4;i++){
			x.push(directionsFuctions[i]([atom])[0]);
			initShapes(x);
			x.pop();
		}
	}
}
