var request = require('request');


var jiraOptions = {
	url: 'http://jira.idm.fr/rest/api/2/user',
	headers: {
		'Authorization': 'Basic Y29yZXkubWNjbGVsbGFuZDp3aWtpNENPTUM=',
		'Content-Type': 'application/json'
	}
}


exports.getProjects = function(user, callback){
	if(!user){
		callback();
	}

	request.get(jiraOptions, function(error, response, body){
		if (!error && response.statusCode == 200) {
    		console.log(body);
  		}
	});
	 
}

