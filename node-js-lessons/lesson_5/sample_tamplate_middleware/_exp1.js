module.exports = class textMiddlewareManager {
	constructor(readStream, writeStream) {
		this.readStream = readStream;
		this.writeStream = writeStream;
		this.boundMiddleware = [];
		readStream.on('data', chunk => {
			this.executeMiddleware(this.boundMiddleware, {
				data: chunk
			}, {
				send: (message) => {
					this.writeStream.write(message.data);
				}
			},
			(message) => {
				this.writeStream.write(message.data);
			});
		});
	}
	use(middleware) {
		this.boundMiddleware.push(middleware);
	}
	executeMiddleware(middleware, arg, objSend, finish) {
		function iterator(index) {
			if (index === middleware.length) {
				return finish(arg);
			}
			middleware[index](arg, objSend, err => {
				if (err) {
					return console.log('There was an error: ' + err.message);
				}
				iterator(++index);
			});
		}
		iterator(0);
	}
}