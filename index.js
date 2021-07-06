window.onload = ()=>{
	refresh();
}

drawMoves = () =>{
	document.getElementById( 'actions' ).replaceChildren();

	for(x=0;x<directionsNames.length;x++){
		block_to_insert = document.createElement( 'button' );
		container_block = document.getElementById( 'actions' );		
		block_to_insert.onclick=act2(x);
		block_to_insert.innerHTML = directionsNames[x];
		container_block.appendChild( block_to_insert );
		block_to_insert.disabled = !canAddShape(directionsFuctions[x](currentShape))
	}
	
	block_to_insert = document.createElement( 'button' );
	container_block = document.getElementById( 'actions' );
	block_to_insert.onclick=lockShape;
	block_to_insert.innerHTML = "*";
	container_block.appendChild( block_to_insert );
		
	block_to_insert.disabled = canAddShape(directionsFuctions[3](currentShape)) || currentShape.reduce(arraymin)[1]<0;
	block_to_insert = document.createElement( 'button' );
	container_block = document.getElementById( 'actions' );	
	block_to_insert.onclick=calcAllMoves;
	block_to_insert.innerHTML = "#";
	container_block.appendChild( block_to_insert );
	
}


refresh = ()=>{
	document.getElementById( 'main' ).replaceChildren();

	//draw main board
	for(let x=0;x<stateX;x++)
	for(let y=0;y<stateY;y++){
		block_to_insert = document.createElement( 'div' );
		container_block = document.getElementById( 'main' );	
		container_block.appendChild( block_to_insert );
		block_to_insert.className=state[y][x];
	}

	drawMoves();

	//draw options
	for(i=0;i<options2.length;i++){
		block_to_insert = document.createElement( 'div' );
		container_block = document.getElementById( 'main' );	
		block_to_insert.onclick=act(i);
		container_block.appendChild( block_to_insert );
		for(let x=0;x<stateX;x++)
		for(let y=0;y<stateY;y++){
			mini_block_to_insert = document.createElement( 'div' );
			container_block = block_to_insert;
			container_block.appendChild( mini_block_to_insert );
			mini_block_to_insert.className=oldstate[y][x];
			for (j=0;j<options2[i].length;j++){
				if (options2[i][j][0] == y && options2[i][j][1] == x )
					mini_block_to_insert.className=shapesNames[i%shapesNames.length];					
			}
			
		}
	}

}




