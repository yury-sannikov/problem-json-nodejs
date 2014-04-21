'use strict';

var request = require('supertest')
   , should = require('should')
   , express = require('express')
   , problemJson = require('../index.js');


var app = express(); 


describe('normal express calls', function(){
  var app = express();

  app.get('/', function(req, res){
    res.send(200, {success: true});
  });

  var agent = request.agent(app);
  app.use(problemJson());

  it('should get success', function(done){
    agent
    .get('/')
    .expect({success: true}, done);
  })
})

describe('execution fault during call', function(){

	it('exception should return problem+json', function(done){
		var app = express();

		app.get('/', function(req, res, next){
			throw "exception thrown";
		});

		var agent = request.agent(app);
		app.use(problemJson());
		
		agent.superagent.parse['application/problem+json'] = agent.superagent.parse['application/json'];

		agent.get('/')
			.expect(500)
			.expect('Content-Type', 'application/problem+json')
			.expect({detail: "exception thrown", status: 500, title: "An error occured", type: "about:blank"}, done);
	})

	it('next with err should return problem+json', function(done){
		var app = express();

		app.get('/', function(req, res, next){
			next("next return error");
		});

		var agent = request.agent(app);
		app.use(problemJson());
		
		agent.superagent.parse['application/problem+json'] = agent.superagent.parse['application/json'];

		agent.get('/')
			.expect(500)
			.expect('Content-Type', 'application/problem+json')
			.expect({detail: "next return error", status: 500, title: "An error occured", type: "about:blank"}, done);
	})
})