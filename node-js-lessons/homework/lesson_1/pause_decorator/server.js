const http = require('http');

const server = http.createServer((req, res) => {

	let paused = pause(func, 2000);
    paused();

});

server.listen(8080, () => {
	console.log('http works on port 8080');
});







function func() {
	console.log('функция выполнится с задержкой в 2 секунды!');
}

function pause(f, delay) { //delay in ms
	return function(...args) {
		setTimeout(f, delay);
	}
}