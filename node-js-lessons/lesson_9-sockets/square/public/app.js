let main_block = document.querySelector(".main_block");
let block = document.querySelector(".block");
let socket = io.connect(location.href);

//keypress
document.addEventListener('keydown', (e)=>{
	e.preventDefault();
	switch(e.keyCode) {
		case 37: //влево
			block.style.left = 
				(parseInt(block.style.left) - 10) + 'px';
			socket.emit('move', {
				top: block.style.top,
				left: block.style.left
			});
			break;
		case 39: //вправо
			block.style.left = 
				(parseInt(block.style.left) + 10) + 'px';
			socket.emit('move', {
				top: block.style.top,
				left: block.style.left
			});
			break;
		case 40: //вниз
			block.style.top = 
				(parseInt(block.style.top) + 10) + 'px';
			socket.emit('move', {
				top: block.style.top,
				left: block.style.left
			});
			break;
		case 38: //вверх
			block.style.top = 
				(parseInt(block.style.top) - 10) + 'px';
			socket.emit('move', {
				top: block.style.top,
				left: block.style.left
			});
	}
});

socket.on('enemy', (data)=>{
	let anotheBlock = document.getElementById(data.id);
	if(anotheBlock){
		anotheBlock.style.top = data.top;
		anotheBlock.style.left = data.left;
	} else {
		anotheBlock = document.createElement('div');
		anotheBlock.classList = "block";
		anotheBlock.style.top = data.top;
		anotheBlock.style.left = data.left;
		anotheBlock.style.backgroundColor = "red";
		anotheBlock.id = data.id;
		main_block.appendChild(anotheBlock);
	}
});

socket.on('allEnemy', (data)=>{
	let anotheBlock;
	for(let id in data){
		anotheBlock = document.createElement('div');
		anotheBlock.classList = "block";
		anotheBlock.style.top = data[id].top;
		anotheBlock.style.left = data[id].left;
		anotheBlock.style.backgroundColor = "red";
		anotheBlock.id = id;
		main_block.appendChild(anotheBlock);
	}	
});

socket.on('removeEnemy', (id)=>{
	let anotheBlock = document.getElementById(id);
	main_block.removeChild(anotheBlock);	
});