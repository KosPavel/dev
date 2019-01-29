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
	let user = {name: "Sasha", age: 32};
	collection.insertOne(user, (err, result)=>{
		if(err){
			return console.log(err);
		}
		console.log(result.ops);
		let users = [{name: "Bob", age: 34} , 
			{name: "Alice", age: 21}, {name: "Tom", age: 45} ];
		collection.insertMany(users, (err, result)=>{
			if(err){
				return console.log(err);
			}
			console.log(result.ops);
			client.close();
		});
	});
});