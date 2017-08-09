var express = require('express');
var url = require('url');
var request = require('request');
var router = express.Router();

var defaultProfileImage = 'http://ustadium-media.s3.amazonaws.com/content/feed/81/9bb200294b11e7bb99538ff4cfc91a/master.jpg';

var socialShare = {
  appId: '2231777543',
  title:'user on uSTADIUM',
  description: 'This is ustadium website for sports fan',
  siteName: 'Nextgen social sports website',
  url: 'https://ustadium-webapp.herokuapp.com',
  image: defaultProfileImage,
  imageAlt: 'ustadium',
  type: 'article'
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
  requestPostInfo(req.params.id, req, res, next);
}, function (req, res, next) {
  res.render('index', { socialShare: res.locals.socialShare, isPost: true });
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
    if(typeof feed != undefined) {
      var feedJson = JSON.parse(feed);
      // console.log(feedJson);
      if (feedJson.data && typeof feedJson.data.mediaFileThumbnail != undefined) {
        res.locals.socialShare.image = feedJson.data.mediaFileThumbnail;
      }

      if (feedJson.data && typeof feedJson.data.name !== undefined) {
        res.locals.socialShare.title = feedJson.data.name;
      }

      if (feedJson.data && typeof feedJson.data.description !== undefined) {
        res.locals.socialShare.description = feedJson.data.description;
      }

      if (feedJson.data && typeof feedJson.data.mediaFileThumbnail !== undefined) {
        res.locals.socialShare.url = feedJson.data.mediaFileThumbnail;
      }
    }
    next();
  })

}

function requestPostInfo(postId, req, res, next) {
  var requestEnd = '' + postId;
  request({
    uri: 'https://ustadium-api-dev.herokuapp.com/api/posts/'+ requestEnd ,
    method: 'GET'
  }, function (error, response, feed) {
    console.log(feed);
    if(feed != undefined) {
      var feedJson = JSON.parse(feed);
      console.log(feedJson);
      res.locals.socialShare.imageAlt = feedJson.data.author.username;
      if (feedJson.data.author.profileImageThumbnail) {
        res.locals.socialShare.image = feedJson.data.author.profileImageThumbnail ? feedJson.data.author.profileImageThumbnail : defaulProfileImage;
      }

      if (feedJson.data.author.nickname) {
        res.locals.socialShare.title = feedJson.data.author.nickname + ' on uSTADIUM';
      }

      if (feedJson.data.text) {
        res.locals.socialShare.description = feedJson.data.text;
      }

      var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      res.locals.socialShare.url = fullUrl;
    }
    next();
  })

}
module.exports = router;
