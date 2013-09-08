var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var connect = require('connect');
var MongoStore = require('connect-mongo')(express);
var mongo = require('mongoose');

var app = express();

// mongo-connect
var conf = {
  db: {
    db: 'projectdb',
    host: '192.168.1.111',
    port: 27017,  // optional, default: 27017
    username: 'admin', // optional
    password: 'secret', // optional
    collection: 'mySessions' // optional, default: sessions
  },
  secret: '076ee61d63aa10a125ea872411e433b9'
};

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
app.use(express.session({
    secret: conf.secret,
    maxAge: new Date(Date.now() + 3600000),
    store: new MongoStore(conf.db)
  }));



app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
})

var dbUrl = 'mongodb://localhost/projectdb';
// dbUrl += conf.db.username+':'+conf.db.password+'@';
//dbUrl += conf.db.host+':'+conf.db.port;
//dbUrl += '/' + conf.db.db;
mongo.connect(dbUrl);
mongo.connection.on('open', function () {
  app.listen(3000);
});