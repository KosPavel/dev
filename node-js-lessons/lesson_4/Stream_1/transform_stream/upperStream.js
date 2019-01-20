const stream = require('stream');
const util = require('util');
class ToUpperStream extends stream.Transform {
	constructor() {
		super();
	}
	_transform(chunk, encoding, callback) {
		 this.push(chunk.toString().toUpperCase());
		 callback();
	}
	/*_flush(callback) {
		callback();
	}*/
}
module.exports = ToUpperStream;