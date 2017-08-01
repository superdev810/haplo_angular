var express = require('express');
var url = require('url');
var request = require('request');
var router = express.Router();

var socialShare = {
  appId: '2231777543',
  title:'ustadium',
  description: 'This is ustadium website for sports fan',
  siteName: 'Nextgen social sports website',
  url: 'https://ustadium-webapp.herokuapp.com',
  image: 'http://ustadium-media.s3.amazonaws.com/content/images/83/5bfaa0c56911e685d8934a6a5ce0af/small.jpg',
  type: 'website'
},
  feedType = {
    New: '/',
    Hot: '/trending',
    subscribed: '/subscribed',
    created: '/created'
  };

router.get('/feeds/:name', function(req, res, next) {
  res.locals.socialShare = socialShare;
  var single = '';
  requestFeedInfo(req.params.name, single, res, next)
}, function(req, res, next) {
  // console.log(res.locals.socialShare);
  res.render('index', { socialShare: res.locals.socialShare });
});

router.get('/feed/:name', function(req, res, next) {
  res.locals.socialShare = socialShare;
  var single = '/name/'
  requestFeedInfo(req.params.name, single, res, next)
}, function(req, res, next) {
  res.render('index', { socialShare: res.locals.socialShare });
});

router.get('/post/:id', function(req, res, next) {
  res.locals.socialShare = socialShare;
  console.log('post id: ', req.params.id);
  requestPostInfo(req.params.id, res, next);
}, function (req, res, next) {
  res.render('index', { socialShare: res.locals.socialShare });
})

router.get('/', function(req, res, next) {
  var ua = req.headers['user-agent'];
  console.log('index.....................')
  if (/^(facebookexternalhit)|(Twitterbot)|(Pinterest)/gi.test(ua)) {
    console.log(ua,' is a bot');
  }
  res.render('index', { socialShare: socialShare });
});

router.get('*', function(req, res, next) {
  res.render('index', { socialShare: socialShare });
});


function requestFeedInfo(feedName, single, res, next) {
  var isSingle = !single ? feedType[feedName] : feedName;
  var requestEnd = '' + single + isSingle;
  request({
    uri: 'https://ustadium-api-dev.herokuapp.com/api/feeds'+ requestEnd ,
    method: 'GET'
  }, function (error, response, feed) {
    var feedJson = JSON.parse(feed);
    // console.log(feedJson);
    if (feedJson.data.mediaFileThumbnail) {
      res.locals.socialShare.image = feedJson.data.mediaFileThumbnail;
    }

    if (feedJson.data.name) {
      res.locals.socialShare.title = feedJson.data.name;
    }

    if (feedJson.data.description) {
      res.locals.socialShare.description = feedJson.data.description;
    }

    if(feedJson.data.mediaFileThumbnail) {
      res.locals.socialShare.url = feedJson.data.mediaFileThumbnail;
    }
    next();
  })

}

function requestPostInfo(postId, res, next) {
  var requestEnd = '' + postId;
  request({
    uri: 'https://ustadium-api-dev.herokuapp.com/api/posts/'+ requestEnd ,
    method: 'GET'
  }, function (error, response, feed) {
    var feedJson = JSON.parse(feed);
    // console.log(feedJson);
    if (feedJson.data.mediaFileThumbnail) {
      res.locals.socialShare.image = feedJson.data.mediaFileThumbnail?feedJson.data.mediaFileThumbnail:feedJson.data.author.profileImageThumbnail;
    }

    if (feedJson.data.name) {
      res.locals.socialShare.title = feedJson.data.author.username;
    }

    if (feedJson.data.description) {
      res.locals.socialShare.description = feedJson.data.text;
    }

    if(feedJson.data.mediaFileThumbnail) {
      res.locals.socialShare.url = feedJson.data.mediaFileThumbnail;
    }
    next();
  })

}
module.exports = router;
