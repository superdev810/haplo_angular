const request = require('supertest'),
    express = require('express'),
    rewire = require('rewire'),
    index = require('../routes/users.js'),
    nock = require('nock'),
    path = require('path');

describe('The users route', () => {
  let app;
  before(()=> {
    process.env.HOST_NAME='localhost';
    process.env.IS_LOCAL=true;
    app = express();
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'pug');
    app.use('/users', index);
  })
  describe('returns get request pages', () => {
    it('serves the signup page', ()=> {
      return request(app)
          .get('/users/signup')
          .expect(200);
    })

    it('serves the login page', ()=> {
      return request(app)
          .get('/users/login')
          .expect(200);
    })

    it('serves the verify page', ()=> {
      return request(app)
          .get('/users/verify')
          .expect(200);
    })

    it('serves the request-reset page', ()=> {
      return request(app)
          .get('/users/request-reset')
          .expect(200);
    })

    it('serves the reset-forgotten-password page', ()=> {
      return request(app)
          .get('/users/reset-forgotten-password')
          .expect(200);
    })
  })

})
