let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let route = require('./routes/reg.js');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use('/registration', route);

app.listen(80);