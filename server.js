var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var MongoStore = require('connect-mongo')(express);
var mongo = require('mongoose');
var jiraConnect = require('./lib/jira');

var app = express();

// mongo-connect
var conf = {
  db: {
    db: 'projectdb',
    host: 'localhost',
    port: 27017,  // optional, default: 27017
    username: 'admin', // optional
    password: 'secret', // optional
    collection: 'sessions', // optional, default: sessions
    auto_reconnect: 'true'
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
app.use(express.bodyParser());
app.use(express.session({
    secret: conf.secret,
    maxAge: new Date(Date.now() + 3600000),
    store: new MongoStore(conf.db)
  }));



app.get('/', function (req, res) {


  res.render('index',
  { title : 'Jira Project Overview' }
  )
})

app.post('/validateuser', function(req, res){
  var user = req.param("user");
  var pass = req.param("pass");
  var user64 = new Buffer(user + ":" + pass).toString('base64');
  console.log(user64);
  req.session.user = user;
  
  res.redirect('/');
})

var dbUrl = 'mongodb://localhost/projectdb?auto_reconnect=true';
mongo.connect(dbUrl);
mongo.connection.on('open', function () {
  app.listen(3000);
});

jiraConnect.getProjects('zz', function(resp){
    //console.log(resp.body);
  });