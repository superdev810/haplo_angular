const request = require('supertest'),
    express = require('express'),
    index = require('../app.js');

describe('The Express App ', () => { //eslint-disable-line no-undef
    let app;
    before(()=> { //eslint-disable-line no-undef
        app = express();
        app.use(index);
    });
    it('404s when the wrong route is requested ', () => {  //eslint-disable-line no-undef
        return request(app)
            .get('/hello')
            .expect(404);
    });

    it('404s when the wrong route is requested ', () => { //eslint-disable-line no-undef
        process.env.NODE_ENV='development';
        return request(app)
            .get('/heel/all/what')
            .expect(404);
    });

    it('500s when the route is not defined', () => { //eslint-disable-line no-undef
    // still need to figure it out
    });
});
