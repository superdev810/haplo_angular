var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var searchSymbol ='&#xF002;';
  console.log(searchSymbol);
  res.render('index', { title: 'Express', searchSymbol: searchSymbol });
});

module.exports = router;
