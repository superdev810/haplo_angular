/* eslint-disable no-undef */
const request = require('supertest'),
    express = require('express'),
    index = require('../routes/users.js'),
    nock = require('nock'),
    path = require('path'),
    bodyParser = require('body-parser');

describe('The users route', () => {
    let app, api; //eslint-disable-line no-unused-vars
    before(()=> {
        process.env.HOST_NAME='localhost';
        process.env.IS_LOCAL=true;
        app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.set('views', path.join(__dirname, '../views'));
        app.set('view engine', 'pug');
        app.use('/users', index);
    });
    describe('returns get request pages', () => {
        it('serves the login page', ()=> {
            return request(app)
                .get('/users/login')
                .expect(200);
        });

        it('serves the verify page', ()=> {
            return request(app)
                .get('/users/verify')
                .expect(200);
        });

        it('serves the request-reset page', ()=> {
            return request(app)
                .get('/users/request-reset')
                .expect(200);
        });

        it('serves the reset-forgotten-password page', ()=> {
            return request(app)
                .get('/users/reset-forgotten-password')
                .expect(200);
        });
    });

    describe('signup page  ', () => {
        it('serves the get request', ()=> {
            return request(app)
                .get('/users/signup')
                .expect(200);
        });

        before(()=> {
            api = nock('http://localhost:3000')
                .post('/auth/signup', {
                    'username': 'ab',
                    'password': 'a1',
                    'phone': '777-555-8975',
                    'email': 'a@gmail.com'
                })
                .reply(200, {
                    'status': 200,
                    'username': 'ab',
                    'password': 'a1'
                });
        });

        it('processes the post signup page', () => {
            return request(app)
                .post('/users/signup')
                .type('form')
                .send({'username': 'ab',
                    'password': 'a1',
                    'phone': '777-555-8975',
                    'email': 'a@gmail.com'
                })
                .expect(200);
        });

        before(()=> {
            api = nock('http://localhost:3000')
                .post('/auth/signup', {
                    'username': 'ab',
                    'password': 'a1',
                    'phone': '777-555-8975',
                    'email': 'a@gmail.com'
                })
                .reply(200, {
                    'username': 'ab',
                    'password': 'a1'
                });
        });

        it('processes the post signup page without a 200 status from api', () => {
            return request(app)
                .post('/users/signup')
                .type('form')
                .send({'username': 'ab',
                    'password': 'a1',
                    'phone': '777-555-8975',
                    'email': 'a@gmail.com'
                })
                .expect(200);
        });
    });

    describe('login page  ', () => {
        it('serves the get request', ()=> {
            return request(app)
                .get('/users/login')
                .expect(200);
        });

        before(()=> {
            api = nock('http://localhost:3000')
                .post('/auth/token', {
                    'username': 'ab',
                    'password': 'a1'
                })
                .reply(200, {
                    'status': 200,
                    'username': 'ab',
                    'password': 'a1'
                });
        });

        it('processes the post login page', () => {
            return request(app)
                .post('/users/login')
                .type('form')
                .send({'username': 'ab',
                    'password': 'a1'
                })
                .expect(200);
        });

        before(()=> {
            api = nock('http://localhost:3000')
                .post('/auth/token', {
                    'username': 'ab',
                    'password': 'a1'
                })
                .reply(200, {
                    'username': 'ab',
                    'password': 'a1'
                });
        });

        it('processes the post login page without a 200 staus from api', () => {
            return request(app)
                .post('/users/login')
                .type('form')
                .send({'username': 'ab',
                    'password': 'a1'
                })
                .expect(200);
        });
    });

    describe('verify page  ', () => {
        it('serves the get request', ()=> {
            return request(app)
                .get('/users/verify')
                .expect(200);
        });

        before(()=> {
            api = nock('http://localhost:3000')
                .post('/auth/verify', {
                    'email': 'a@gmail.com'
                })
                .reply(200, {'status': 200,
                    'email': 'a@gmail.com'
                });
        });

        it('processes the post verify page', () => {
            return request(app)
                .post('/users/verify')
                .type('form')
                .send({
                    'email': 'a@gmail.com'
                })
                .expect(200);
        });

        before(()=> {
            api = nock('http://localhost:3000')
                .post('/auth/verify', {
                    'email': 'a@gmail.com'
                })
                .reply(200, {
                    'email': 'a@gmail.com'
                });
        });

        it('processes the post verify page without a status 200 from api', () => {
            return request(app)
                .post('/users/verify')
                .type('form')
                .send({
                    'email': 'a@gmail.com'
                })
                .expect(200);
        });
    });

    describe('request-reset page  ', () => {
        it('serves the get request', ()=> {
            return request(app)
                .get('/users/request-reset')
                .expect(200);
        });

        before(()=> {
            api = nock('http://localhost:3000')
                .post('/auth/forgot-password', {
                    'username': 'ab',
                    'phone': '777-555-8975',
                    'email': 'a@gmail.com'
                })
                .reply(200, {'status': 200,
                    'username': 'ab',
                    'phone': '777-555-8975',
                    'email': 'a@gmail.com'
                });
        });

        it('processes the post request-reset page', () => {
            return request(app)
                .post('/users/request-reset')
                .type('form')
                .send({
                    'username': 'ab',
                    'phone': '777-555-8975',
                    'email': 'a@gmail.com'
                })
                .expect(200);
        });

        before(()=> {
            api = nock('http://localhost:3000')
                .post('/auth/forgot-password', {
                    'username': 'ab',
                    'phone': '777-555-8975',
                    'email': 'a@gmail.com'
                })
                .reply(200, {
                    'username': 'ab',
                    'phone': '777-555-8975',
                    'email': 'a@gmail.com'
                });
        });

        it('processes the post request-reset page without a status 200 from api', () => {
            return request(app)
                .post('/users/request-reset')
                .type('form')
                .send({
                    'username': 'ab',
                    'phone': '777-555-8975',
                    'email': 'a@gmail.com'
                })
                .expect(200);
        });
    });

    describe('reset-forgotten-password page  ', () => {
        it('serves the get request', ()=> {
            return request(app)
                .get('/users/reset-forgotten-password')
                .expect(200);
        });

        before(()=> {
            api = nock('http://localhost:3000')
                .post('/auth/reset-forgotten-password', {
                    'code': '234567',
                    'password': 'ab',
                    'phone': '777-555-8975',
                    'email': 'a@gmail.com'
                })
                .reply(200, {'status': 200,
                    'password': 'ab',
                    'phone': '777-555-8975',
                    'email': 'a@gmail.com'
                });
        });

        it('processes the post reset-forgotten-password page', () => {
            return request(app)
                .post('/users/reset-forgotten-password')
                .type('form')
                .send({
                    'code': '234567',
                    'password': 'ab',
                    'phone': '777-555-8975',
                    'email': 'a@gmail.com'
                })
                .expect(200);
        });

        before(()=> {
            api = nock('http://localhost:3000')
                .post('/auth/reset-forgotten-password', {
                    'code': '234567',
                    'password': 'ab',
                    'phone': '777-555-8975',
                    'email': 'a@gmail.com'
                })
                .reply(200, {
                    'password': 'ab',
                    'phone': '777-555-8975',
                    'email': 'a@gmail.com'
                });
        });

        it('processes the post reset-forgotten-password page without a status 200 from api', () => {
            return request(app)
                .post('/users/reset-forgotten-password')
                .type('form')
                .send({
                    'code': '234567',
                    'password': 'ab',
                    'phone': '777-555-8975',
                    'email': 'a@gmail.com'
                })
                .expect(200);
        });
    });
});
/* eslint-enable no-undef */
