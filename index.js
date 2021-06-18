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




