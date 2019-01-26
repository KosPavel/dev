let express = require('express');
let session = require('express-session');

let app = express();

app.use(session({
     secret: ' 23msdfl34kasd ', //подпись куки
     name: 'mysid',
     cookie: { secure: false, httpOnly: true, maxAge: 6000},
     resave: false,
     saveUninitialized: false,
   }));

app.get('/', function(req, res, next) {
  let sess = req.session;
  if (sess.views) {
    sess.views++;
    res.setHeader("Content-Type", "text/html");
    res.write('<p>views: ' + sess.views + '</p>');
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
    res.end();
  } else {
    sess.views = 1;
    res.end('welcome to the session demo. refresh! id = ' + req.session.id );
  }
});

app.listen(9000);