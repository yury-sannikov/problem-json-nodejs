'use strict';

var request = require('supertest')
   , should = require('should')
   , express = require('express')
   , problemJson = require('../index.js');


var app = express(); 

app.use(problemJson());


describe('normal express calls', function(){
  var app = express();
  app.use(problemJson());

  app.get('/', function(req, res){
    res.send(200, {success: true});
  });

  var agent = request.agent(app);

  it('should get success', function(done){
    agent
    .get('/')
    .expect({success: true}, done);
  })
})