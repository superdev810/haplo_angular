var express = require('express');
var router = express.Router();
var get = require('../lib/middleware/get');


router.use(function (req, res, next){
    get('/api/feeds', res, next, 'data');
});

router.use(function (req, res, next){
    get('/api/feeds/trending', res, next, 'trending');
});
/* GET home page. */
router.get('/trending', function(req, res) {
    let trending = JSON.parse(res.locals.trending);
    trending.data.feeds.forEach((feed) => {
        feed.url = 'http://'+req.get('host')+'/feeds/'+feed.name;
    });

    res.render('index', { title: 'Trending', data: trending.data.feeds});
});

router.get('/all', function(req, res) {
    var data = JSON.parse(res.locals.data).data.feeds;
    data.forEach((feed) => {
        feed.url = 'http://'+req.get('host')+'/feeds/'+feed.name;
    });
    res.render('index', { title: 'feeds', data: data, host:req.get('host')});
});


router.get('/:name', function(req, res, next) {
    get('/api/feeds/name/'+encodeURIComponent(req.params.name), res, next, 'feedData');
}, function(req, res, next){
    //get the posts by using the feed id
    get('/api/feeds/' + JSON.parse(res.locals.feedData).data._id+'/posts', res, next, 'feedPosts');
}, function (req, res){
    res.render('index', { title: req.params.name, posts: JSON.parse(res.locals.feedPosts)});
});

module.exports = router;
