var http = require('http');

module.exports = function (path, res, next, varName) {
  http.get({
    hostname: process.env.HOST_NAME,
    path: path
  }, (response) => {
    var body = '';
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      res.locals[varName] = body;
      next();
    });
  })
}
