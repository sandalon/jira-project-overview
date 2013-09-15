

module.exports = function(app){

	app.get('/', function (req, res) {
	  res.render('index',
	  { title : 'Jira Project Overview' }
	  )
	});

	app.post('/validateuser', function(req, res){
	  var user = req.param("user");
	  var pass = req.param("pass");
	  var user64 = new Buffer(user + ":" + pass).toString('base64');
	  console.log(user64);
	  req.session.user = user;
	  
	  res.redirect('/');
	});

}


