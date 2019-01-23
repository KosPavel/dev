let express = require('express');
let app = express();
let reg = require('./routes/registration.js');

app.use('/registration', reg);
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(express.static('public'));

// app.post('/registration', (req,res,next)=>{
// 	console.log('Параметры POST запроса: ' + JSON.stringify(req.body));
// 	res.send(JSON.stringify(req.body));
// });

app.listen(80);