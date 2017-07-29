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
};

/* GET home page. */
router.get('/', function(req, res, next) {
  var req_url = req.baseUrl;
  console.log(req_url.indexOf('/feed/'));

  switch (checkUrl(req_url)){
    case 'SingleFeed':
      console.log('SINGLE FEED URL PARSE: ', decodeURI(req_url.split('/')[2]));
      var feed_name = decodeURI(req_url.split('/')[2]);
      requestFeedInfo(feed_name, res);
      break;
    case 'SinglePost':
      console.log('SINGLE POST URL PARSE: ', decodeURI(req_url.split('/')[2]));
      var post_id = req_url.split('/')[2];
      res.render('index', { socialShare: socialShare});
      break;
    default:
      res.render('index', { socialShare: socialShare});
      break;
  }
});

/* GET single feed page */
router.get('/feed/:name', function(req, res, next) {
  console.log(req.params);
  // var socialShare = {
  //   appId: '2231777543',
  //   title:'ustadium',
  //   description: 'This is ustadium website for sports fan',
  //   siteName: 'Nextgen social sports website',
  //   url: 'https://ustadium-webapp.herokuapp.com',
  //   image: 'http://ustadium-media.s3.amazonaws.com/content/images/83/5bfaa0c56911e685d8934a6a5ce0af/small.jpg',
  //   type: 'website'
  // }
  // res.render('index', { socialShare: socialShare });
});

function checkUrl(url) {
  if(url.indexOf('/feed/') != -1){
    return 'SingleFeed';
  } else if(url.indexOf('/feeds/Hot') != -1) {
    return 'HotFeeds';
  } else if(url.indexOf('/feeds/New') != -1) {
    return 'HotFeeds';
  } else if(url.indexOf('/feeds/Subscribed') != -1) {
    return 'HotFeeds';
  } else if(url.indexOf('/feeds/Created') != -1) {
    return 'HotFeeds';
  } else if(url.indexOf('/post/') != -1) {
    return 'SinglePost';
  }else{
    return null;
  }

}

function requestFeedInfo(feedName, res) {
  request({
    uri: 'https://ustadium-api-dev.herokuapp.com/api/feeds/name/' + feedName,
    method: 'GET'
  }, function (error, response, feed) {
    var feedJson = JSON.parse(feed);
    console.log(feedJson);
    socialShare.image = feedJson.data.mediaFileThumbnail;
    socialShare.title = feedJson.data.name;
    socialShare.description = feedJson.data.description;
    socialShare.url = feedJson.data.mediaFileThumbnail;
    res.render('index', {socialShare: socialShare});
  })
}
module.exports = router;
