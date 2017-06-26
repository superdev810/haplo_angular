var express = require('express');
var router = express.Router();
var http = require('http');

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'hello'});
});

router.post('/signup', function(req, res, next) {
  console.log(req.body.username);
  console.log(req.body.password);
  res.render('index', {title: 'hello'})
});

module.exports = router;
