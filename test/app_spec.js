const request = require('supertest'),
    express = require('express'),
    rewire = require('rewire'),
    index = require('../app.js'),
    nock = require('nock'),
    path = require('path');

describe('The Express App ', () => {
  let app;
  before(()=> {
    app = express();
    app.use(index)
  })
  it('404s when the wrong route is requested ', () => {
    return request(app)
    .get('/hello')
    .expect(404)
  })
})
