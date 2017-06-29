var express = require('express');
var router = express.Router();
var request = require('request');
var connection;

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'hello'});
});

router.post('/signup', function(req, res, next) {
  if (process.env.IS_LOCAL === 'true'){
    connection = require('http');
  } else {
    connection = requre('https');
  }

var querystring = require('querystring');

// form data
var postData = querystring.stringify({
  username: req.body.username,
  password: req.body.password,
  phone: req.body.phone,
  email: req.body.email
});

// request option
var options = {
  host: process.env.HOST_NAME,
  method: 'POST',
  path: '/auth/signup',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};
if (process.env.IS_LOCAL === 'true') {
  options.port = '3000';
}
// request object
var requestPost = connection.request(options, function (response) {
  var result = '';
  response.on('data', function (chunk) {
    result += chunk;
  });
  response.on('end', function () {
    console.log('end', result);
    res.locals.status = result;
    next();
  });
  response.on('error', function (err) {
    console.log('on error', err);
  })
});

// req error
requestPost.on('error', function (err) {
  console.log('request error', err);
});

//send request witht the postData form
requestPost.write(postData);
requestPost.end();

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
  if (process.env.IS_LOCAL === 'true'){
    connection = require('http');
  } else {
    connection = requre('https');
  }

var querystring = require('querystring');

// form data
var postData = querystring.stringify({
  username: req.body.username,
  password: req.body.password
});

// request option
var options = {
  host: process.env.HOST_NAME,
  method: 'POST',
  path: '/auth/token',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};
if (process.env.IS_LOCAL === 'true') {
  options.port = '3000';
}
// request object
var requestPost = connection.request(options, function (response) {
  var result = '';
  response.on('data', function (chunk) {
    result += chunk;
  });
  response.on('end', function () {
    console.log(result);
    res.locals.status = result;
    next();
  });
  response.on('error', function (err) {
    console.log(err);
  })
});

// req error
requestPost.on('error', function (err) {
  console.log(err);
});

//send request witht the postData form
requestPost.write(postData);
requestPost.end();

}, function (req, res, next) {
  responseFromServer = JSON.parse(res.locals.status);
  if (responseFromServer && responseFromServer.status === 200) {
    res.render('index', {title: 'logged in'})
  }else {
    res.render('login', {title: 'try again', data: responseFromServer})
  }
});

module.exports = router;
