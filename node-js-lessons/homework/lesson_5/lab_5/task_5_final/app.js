let express = require('express');
let mustacheExpress = require('mustache-express');
let app = express();
let bodyParser = require('body-parser');
let route = require('./routes/main.js');

app.set('views', __dirname + '/views');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use('/registration', route);

app.listen(80);