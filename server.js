var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var MongoStore = require('connect-mongo')(express);
var mongo = require('mongoose');
var app = express();
var db = require('./db');

// stylus
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({
    secret: db.conf.secret,
    maxAge: new Date(Date.now() + 3600000),
    store: new MongoStore(db.conf.db)
}));

var route = require('./route')(app);

var dbUrl = db.conf.connectionString;
mongo.connect(dbUrl);
mongo.connection.on('open', function () {
  app.listen(3000);
});

