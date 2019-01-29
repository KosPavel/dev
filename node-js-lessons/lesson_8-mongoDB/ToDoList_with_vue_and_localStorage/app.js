const express = require('express');
const app = express();
let model = require('./model/model_tasks.js');
let bodyParser = require('body-parser');

model.init(()=>{ //сервер запустится ТОЛЬКО после установки
				//соединения с БД
	app.use(express.static('public'));
	app.use(bodyParser.json());

	//обработчик запросов от клиента
	app.post('/tasks', (req,res,next)=>{
		model.create(req.body,(err,result)=>{
			if(err){
				console.log(err);
				res.sendStatus(500);
			}
			res.send(result);
		});
	});

	app.listen(80, ()=>{
		console.log('server is running on 80 port!');
	});
});