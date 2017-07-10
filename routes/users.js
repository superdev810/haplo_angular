var express = require('express');
var router = express.Router();
var post = require('../lib/middleware/post');
var responseFromServer;
var globals = require('../lib/config/global');

/* GET users listing. */
router.get('/signup', function(req, res) {
    res.render('user/signup', {bgType: 'EMPTY', colorClass: "bg-faded", title: 'hello'});
});

router.post('/signup', function(req, res, next) {
    var data = {
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        email: req.body.email
    };
    post(res, req, next, '/auth/signup', 'POST', data);
}, function (req, res) {
    responseFromServer = JSON.parse(res.locals.status);
    if (responseFromServer && responseFromServer.status === 200) {
        res.render('index', {title: 'signed up'});
    }else {
        res.render('user/signup', {bgType: 'EMPTY', colorClass: "bg-faded", title: 'try again', data: responseFromServer});
    }

});

router.get('/login', function(req, res) {
    res.render('user/official-login-page', {bgType: 'SOLID', colorClass: "bg-success text-white", globalStrings: globals(), title: 'hello'});
});

router.post('/login', function(req, res, next) {
    var data = {
        username: req.body.username,
        password: req.body.password
    };
    post(res, req, next, '/auth/token', 'POST', data);
}, function (req, res) {
    responseFromServer = JSON.parse(res.locals.status);
    if (responseFromServer && responseFromServer.status === 200) {
        res.render('index', {title: 'logged in'});
    }else {
        res.render('user/official-login-page', {bgType: 'SOLID', colorClass: "bg-danger text-white", globalStrings: globals(), title: 'try again', data: responseFromServer});
    }
});

router.get('/verify', function (req, res) {
    res.render('verify', {title: 'verify'});
});

router.post('/verify', function (req, res, next) {
    var data = {
        verifyCode: req.body.code,
        email: req.body.email
    };
    post(res, req, next, '/auth/verify', 'POST', data);
}, function (req, res) {
    responseFromServer = JSON.parse(res.locals.status);
    if (responseFromServer && responseFromServer.status === 200) {
        res.render('index', {title: 'logged in'});
    }else {
        res.render('verify', {title: 'try again', data: responseFromServer});
    }
});

router.get('/forgot-password', (req, res) => {
    res.render('forgot-password', {title: 'Request reset'});
});

router.post('/forgot-password', (req, res, next) => {
    var data = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone
    };
    post(res, req, next, '/auth/forgot-password', 'POST', data);

}, (req, res) => {
    responseFromServer = JSON.parse(res.locals.status);
    if (responseFromServer && responseFromServer.status === 200) {
        res.render('reset-forgotten-password', {title: 'reset'});
    }else {
        res.render('forgot-password', {title: 'try again', data: responseFromServer});
    }
});

router.get('/reset-forgotten-password', (req, res) => {
    res.render('reset-forgotten-password', {title: 'Reset forgotten password'});
});

router.post('/reset-forgotten-password', (req, res, next) => {
    var data = {
        code: req.body.code,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    };
    post(res, req, next, '/auth/reset-forgotten-password', 'POST', data);

}, (req, res) => {
    responseFromServer = JSON.parse(res.locals.status);
    if (responseFromServer && responseFromServer.status === 200) {
        res.render('index', {title: 'password reset'});
    }else {
        res.render('reset-forgotten-password', {title: 'try again', data: responseFromServer});
    }
});

router.get('/reset-forgotten', (req, res) => {
    res.render('reset-forgotten', {title: 'Reset forgotten password'});
});

router.post('/reset-forgotten', (req, res, next) => {
    var data = {
        newPassword: req.body.phone,
        oldPassword: req.body.password
    };
    post(res, req, next, '/auth/reset-forgotten', 'POST', data);

}, (req, res) => {
    responseFromServer = JSON.parse(res.locals.status);
    if (responseFromServer && responseFromServer.status === 200) {
        res.render('index', {title: 'password reset'});
    }else {
        res.render('reset-forgotten', {title: 'try again', data: responseFromServer});
    }
});


module.exports = router;
