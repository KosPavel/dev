let input = document.querySelector(".input");
let button = document.querySelector(".button");
let ul = document.querySelector(".ul");
let socket = io.connect(location.href);

let name = prompt('Введите имя');

button.onclick = function() {
	if (input.value !== '') {
		let li = document.createElement('li');
		li.innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} ${name}: ${input.value}`;
		ul.appendChild(li);

		socket.emit('from_client', {
			name: name,
			message: input.value,
		});

		input.value = '';
	};
};

socket.on('from_server', (data)=>{
	let li = document.createElement('li');
	li.innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} ${data.name}: ${data.message}`;
	ul.appendChild(li);
});

socket.on('new_user', (data)=>{
	let li = document.createElement('li');
	li.innerHTML = data;
	ul.appendChild(li);
});

socket.on('user_left', (data)=>{
	let li = document.createElement('li');
	li.innerHTML = data;
	ul.appendChild(li);
});