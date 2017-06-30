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
  post(res, req, next, '/auth/signup', 'POST');
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
  post(res, req, next, '/auth/token', 'POST');
}, function (req, res, next) {
  responseFromServer = JSON.parse(res.locals.status);
  if (responseFromServer && responseFromServer.status === 200) {
    res.render('index', {title: 'logged in'})
  }else {
    res.render('login', {title: 'try again', data: responseFromServer})
  }
});

module.exports = router;
