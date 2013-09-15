var assert = require('assert');
var jira = require('../lib/jira');

// change this to match an actual jira login :)
var user = {
	userName: 'fred.smith',
	pass: 'password'
};

describe('Jira', function(){

	describe('Authenticate', function(){
		it('should create an authentication string', function(done){
			
			this.timeout(9000);
			assert.doesNotThrow(function(){

				jira.getAuthString(user, function(auth){
					assert.equal(auth, 'Basic ZnJlZC5zbWl0aDpwYXNzd29yZA==');
					done();
				})
				, function(err){
					if (err) throw err;
					done();
				}

			});

			
		})
	}); // Authenticate

	describe('Get authentication header', function(){
		it('should return the header string', function(done){

			this.timeout(9000);
			assert.doesNotThrow(function(){
				jira.getAuthHeader(user, function(headers){
					assert.equal(headers.Authorization,
						'Basic ZnJlZC5zbWl0aDpwYXNzd29yZA==');
					assert.equal(headers['Content-Type'],
						'application/json');
					done();
				})
				, function(err){
					if(err) throw err;
					done();
				}
			});
		});
	}); // Get Authentication header

	describe('Get Projects', function(){
		it('should list projects', function(done){
			this.timeout(9000); /* damn slow internet at sbucks */
			assert.doesNotThrow(function(){

				jira.getProjects(prodUser, function(resp){
					assert.equal(resp.statusCode, 200);
					done();
				})
				, function(err){
					if (err) throw err;
					done();
				}

			});

		});
	}); // Get Projects
/*
	describe('Get Project', function(){
		it('should return a project', function(){
			assert.equal(1, 0, 'not implemented');
		});
	}); // Get Project

	describe('Get Project Issues', function(){
		it('should return project issues', function(){
			assert.equal(1,0, 'not implemented');
		})
	});  // Get Project Issues

	describe('Get Issue', function(){
		it('should return an issue', function(){
			assert.equal(1,0, 'not implemented');
		})
	});  // Get Issue

	// user search?
*/
}); // Jira


