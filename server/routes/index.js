var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var socialShare = {
    appId: '2231777543',
    title:'ustadium',
    description: 'This is ustadium website for sports fan',
    siteName: 'Nextgen social sports website',
    url: 'https://ustadium-webapp.herokuapp.com',
    image: 'http://ustadium-media.s3.amazonaws.com/content/images/83/5bfaa0c56911e685d8934a6a5ce0af/small.jpg',
    type: 'website'
  };
  res.render('index', { socialShare: socialShare});
});

module.exports = router;
