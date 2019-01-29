let mongoClient = require('mongodb').MongoClient;
// Строка подключения
let url ='mongodb://localhost:27017';
let collection;

// Подключение
exports.init = function(cb){
	mongoClient.connect(url, { useNewUrlParser: true }, (err, client)=>{
		if(err)
			return console.log('connection error!');
		console.log('Подключились к базе данных!');
		collection = client.db('tasks').collection('tasks');
		cb();
	});
};

exports.create = function(data, callback){
	collection.insertOne(data, (err, result)=>{
		if(err)
			return callback(err)
		callback(null, result.ops[0]);
	});
};