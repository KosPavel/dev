const fs = require('fs');
const settings = require('./config.json');

process.on('message', (obj)=>{ //obj - отправлено родителем
	let logData = `Date ${new Date().toString()}`+
	`Request method ${obj.method}` +
	`Request params ${obj.params}\n`;

	fs.writeFile(settings.logFile, logData,{
		encoding:'utf-8',
		flag:'a'
	}, (err)=>{
		if(err){
			console.log('Child: can not leave log');
		} else {
			console.log('Child: log saved');
		}
	});
});