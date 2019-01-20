const ToUpperStream = require('./upperStream');
const tUS = new ToUpperStream();
tUS.on('data', chunk => console.log(chunk.toString()));
tUS.write('Hello W');
tUS.write('orl');
tUS.end('d!');