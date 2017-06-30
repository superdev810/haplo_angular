module.exports = function (res, req, next, path, method) {
  if (process.env.IS_LOCAL === 'true'){
    connection = require('http');
  } else {
    connection = require('https');
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
  method: method,
  path: path,
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

}
