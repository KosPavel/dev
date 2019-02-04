let express = require('express');

let app = express();
let router = express.Router();

app.use('/widgets', router);

router.get('/', function(req, res, next) => {
	res.send('<h1>All widgets</h1>');
});

router.get('/add', function(req, res, next) => {
	res.send('<h1>page add widgets</h1>');
});
