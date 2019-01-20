const ToUpperStream = require('./upperStream');
const tUS = new ToUpperStream();
//Соединение в конвеер
process.stdin.pipe(tUS).pipe(process.stdout);