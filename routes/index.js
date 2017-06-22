var express = require('express');
var router = express.Router();
var http = require('http');


router.use(function (req, res, next){
  http.get({
    hostname: 'ustadium-development.herokuapp.com',
    path:'/api/feeds'
  }, (response) => {
    var body = '';
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      res.locals.data = body;
      next();
    });
  })
})
/* GET home page. */
router.get('/ustadium/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.get('/ustadium/feeds', function(req, res, next) {
  var data = JSON.parse(res.locals.data).data.feeds;
  data.forEach((feed) => {
    feed.url = "http://"+req.get('host')+"/ustadium/feeds/"+feed.name
    console.log(feed.url)
  })
  res.render('index', { title: 'feeds', data: data, host:req.get('host')});
});


router.get('/ustadium/feeds/:name', function(req, res, next) {
  http.get({
    hostname: 'ustadium-development.herokuapp.com',
    path:'/api/feeds/name/'+encodeURIComponent(req.params.name)
  }, (response) => {
    var body = '';
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      res.locals.feedData = body;
      next();
    });
  })
}, function(req, res, next){
  //get the posts by using the feed id
  console.log('1', JSON.parse(res.locals.feedData).data._id);
  http.get({
    hostname: 'ustadium-development.herokuapp.com',
    path:'/api/feeds/' + JSON.parse(res.locals.feedData).data._id+'/posts'
  }, (response) => {
    var body = '';
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      res.locals.feedPosts = body;
      next();
    });
  })
}, function (req, res, next){
  res.render('index', { title: req.params.name, posts: JSON.parse(res.locals.feedPosts)});
});

module.exports = router;
