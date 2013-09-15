var request = require('request');


var jiraOptions = {
	url: 'http://jira.idm.fr/rest/api/2/project',
	headers: {
		'Authorization': 'Basic Y29yZXkubWNjbGVsbGFuZDp3aWtpNENPTUM=',
		'Content-Type': 'application/json'
	}
}

var jiraApiUrl = 'http://jira.idm.fr/rest/api/2/';

// Jira security is a little interesting.  It will return some 
// resources without authentication.  Resources that need authentication
// expect it to come in a http header.  Best hope they use SSL :)
exports.getAuthString = function(user, callback){
	if(!user){
		callback();
	}

	var authFormat = user.userName + ':' + user.pass;
	var auth = new Buffer(authFormat).toString('base64');
	auth = 'Basic ' + auth;

	callback(auth);
}

exports.getAuthHeader = function(user, callback){
	if(!user){
		callback();
	}

	this.getAuthString(user, function(authString){
		var headers = {
			'Authorization': authString,
			'Content-Type': 'application/json'
		};

		callback(headers);
	});
}

exports.getProjects = function(user, callback){
	if(!user){
		callback();
	}

	this.getAuthHeader(user, function(authHeaders){
		var requestOptions = {
			url: jiraApiUrl + 'project',
			headers: authHeaders
		};

		request.get(requestOptions, function(error, response, body){
			if (!error && response.statusCode == 200) {
	    		var resp = {
	    			statusCode: response.statusCode,
	    			body: body
	    		};
	    		
	    		callback(resp);
	  		}

		});

	});

	 
}

