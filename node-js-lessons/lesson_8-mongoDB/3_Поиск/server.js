let mongoClient = require('mongodb').MongoClient;
// Строка подключения
let url = 'mongodb://localhost:27017';
// Подключение
mongoClient.connect(url, { useNewUrlParser: true }, (err, client)=>{
	if(err){
		return console.log(err);
	}
	// взаимодействие с базой данных
	console.log('Подключились к базе данных!');
	let db = client.db('test');
	let collection = db.collection("users");
	collection.find().toArray((err, results)=>{
		console.log(results);
		collection.find({name: "Tom"}).toArray((err, results)=>{
			console.log(results);
			client.close();
		});
	});
});