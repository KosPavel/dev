let https = require('https');
let cheerio = require('cheerio');

let url = 'https://amdm.ru/akkordi/mike_shinoda/167157/place_to_start/';
https.get(url, (res)=>{
	let data = '';
	res.on('data', (chunk)=>{
		data += chunk;
		let $ = cheerio.load(data);
		let str = $('pre').text();
		console.log(str);
	});

	res.on('end', ()=>{
		console.log('finished');
	});
});