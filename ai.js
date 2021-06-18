function stateHash(s)
{
	let hash="";
	for(x of s)
		for(y of s[x])
			hash+=s[x][y]==" "?0:1;
}











/////////////////////////////
// HANDLE movment
/////////////////////////////

function canAddShape(s){
	for (atom of s)
		if (!canAddAtom(atom)) return false;
	return true;
}

function canAddAtom([x,y]){
	if (x<0) return false;
	if (x>=stateX) return false;
	if (y>=stateY) return false;
	if (y<-4) return false;
	if (oldstate[x][y]!=" " && oldstate[x][y]!=null) return false;
	return true;	
}

function act2(i)
{
	return ()=>{
		currentShape=directionsFuctions[i](currentShape);
		if (!canAddShape(currentShape))
			return;
		initFromOldstate();
		addShape(currentShape);
		refresh();
	}
}


let index = 0;
function act()
{
	currentShape = fmove([0,-3])(shapes[index]);
	initFromOldstate();
	addShape(currentShape);
	index++;
	refresh();
}

function addShape(s){
	for (atom of s)
		addAtom(atom);
}

function addAtom([x,y]){
	if (y<0) return;
	state[x][y]=shapesNames[index%shapesNames.length];	
}

function lockShape(){
	removeLines();
	act();
}


function removeLines(){
	for (let x=0;x<stateX;x++)
		for (let y=0;y<stateY;y++)
			oldstate[x][y]=" ";
			
	let y2=stateY-1;
	for (let y=stateY-1;y>=0;y--){
		let fullLine=true;
		for (let x=0;x<stateX;x++){
			if (state[x][y]==" "){
				fullLine=false;
				break;
			}
		}
		if (fullLine==true)
			continue;
		for (let x=0;x<stateX;x++)
			oldstate[x][y2]=state[x][y];
		y2--;
	}
	
	for (let x=0;x<stateX;x++)
		for (let y=0;y<stateY;y++)
			state[x][y]=oldstate[x][y];
}