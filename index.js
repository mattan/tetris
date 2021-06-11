window.onload = ()=>{
	refresh();
}

refresh = ()=>{
	for(let x=0;x<stateX;x++)
	for(let y=0;y<stateY;y++){
		block_to_insert = document.getElementById( blockID(x,y) );
		if (!block_to_insert){
			block_to_insert = document.createElement( 'div' );
			container_block = document.getElementById( 'main' );
			block_to_insert.id = blockID(x,y);		
			block_to_insert.onclick=act;
			container_block.appendChild( block_to_insert );
		}
		block_to_insert.className=state[y][x];
	}
	for(x=0;x<directionsNames.length;x++){
		block_to_insert = document.getElementById( blockID(x) );
		if (!block_to_insert){
			block_to_insert = document.createElement( 'button' );
			container_block = document.getElementById( 'actions' );
			block_to_insert.id = blockID(x);		
			block_to_insert.onclick=act2(x);
			block_to_insert.innerHTML = directionsNames[x];
			container_block.appendChild( block_to_insert );
		}
		block_to_insert.disabled = !canAddShape(directionsFuctions[x](currentShape))
	}
	block_to_insert = document.getElementById( blockID("lock") );
		if (!block_to_insert){
			block_to_insert = document.createElement( 'button' );
			container_block = document.getElementById( 'actions' );
			block_to_insert.id = blockID("lock");		
			block_to_insert.onclick=lockShape;
			block_to_insert.innerHTML = "*";
			container_block.appendChild( block_to_insert );
		}
	block_to_insert.disabled = canAddShape(directionsFuctions[3](currentShape)) || currentShape.reduce(arraymin)[1]<0;

}


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
	for (let x=0;x<stateX;x++)
		for (let y=0;y<stateY;y++)
			oldstate[x][y]=state[x][y];
	act();
}

