let mongoClient = require('mongodb').MongoClient;
// Строка подлючения
let url = 'mongodb://localhost:27017';
// Подключение
mongoClient.connect(url, { useNewUrlParser: true }, (err, client)=>{
	if(err){
		return console.log(err);
	}
	// взаимодействие с базой данных
	console.log('Подключились к базе данных!');
	let db = client.db('test');
	client.close();
});