var express = require('express');
var router = express.Router();
var http = require('http');
http.get({
  hostname: 'ustadium-development.herokuapp.com',
  path:'/api/feeds'
}, (res) => {
  var body = '';
  res.on('data', function(chunk) {
    body += chunk;
  });
  res.on('end', function() {
    console.log(body);
  });
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', searchSymbol: searchSymbol });
});

module.exports = router;
