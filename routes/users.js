var express = require('express');
var router = express.Router();
var request = require('request');
var connection;
var post = require('../lib/middleware/post');

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'hello'});
});

router.post('/signup', function(req, res, next) {
  var data = {
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    email: req.body.email
  }
  post(res, req, next, '/auth/signup', 'POST', data);
}, function (req, res, next) {
  responseFromServer = JSON.parse(res.locals.status);
  if (responseFromServer && responseFromServer.status === 200) {
    res.render('index', {title: 'signed up'})
  }else {
    res.render('signup', {title: 'try again', data: responseFromServer})
  }

});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'hello'});
});

router.post('/login', function(req, res, next) {
  var data = {
    username: req.body.username,
    password: req.body.password
  }
  post(res, req, next, '/auth/token', 'POST', data);
}, function (req, res, next) {
  responseFromServer = JSON.parse(res.locals.status);
  if (responseFromServer && responseFromServer.status === 200) {
    res.render('index', {title: 'logged in'})
  }else {
    res.render('login', {title: 'try again', data: responseFromServer})
  }
});

router.get('/verify', function (req, res, next) {
  res.render('verify', {title: 'verify'});
});

router.post('/verify', function (req, res, next) {
  var data = {
    verifyCode: req.body.code,
    email: req.body.email
  }
  post(res, req, next, '/auth/verify', 'POST', data);
}, function (req, res, next) {
  responseFromServer = JSON.parse(res.locals.status);
  if (responseFromServer && responseFromServer.status === 200) {
    res.render('index', {title: 'logged in'})
  }else {
    res.render('verify', {title: 'try again', data: responseFromServer})
  }
})

  router.get('/request-reset', (req, res, next) => {
    res.render('request-reset-password', {title: 'Request reset'});
  })

  router.post('/request-reset', (req, res, next) => {
    var data = {
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone
    }
    post(res, req, next, '/auth/forgot-password', 'POST', data);

  }, (req, res, next) => {
    responseFromServer = JSON.parse(res.locals.status);
    if (responseFromServer && responseFromServer.status === 200) {
      res.render('reset-forgotten-password', {title: 'reset'})
    }else {
      res.render('request-reset-password', {title: 'try again', data: responseFromServer})
    }
  })

  router.get('/reset-forgotten-password', () => {
    res.render('reset-forgotten-password', {title: 'Reset forgotten password'})
  })

  router.post('/reset-forgotten-password', (req, res, next) => {
    var data = {
      code: req.body.code,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password
    }
    post(res, req, next, '/auth/reset-forgotten-password', 'POST', data);

  }, (req, res, next) => {
    responseFromServer = JSON.parse(res.locals.status);
    if (responseFromServer && responseFromServer.status === 200) {
      res.render('index', {title: 'password reset'})
    }else {
      res.render('reset-forgotten-password', {title: 'try again', data: responseFromServer})
    }
  })

module.exports = router;
