/**
 * Created by superdev on 7/15/2017.
 */
var base = prod ? "https://ustadium-api.herokuapp.com" : "https://ustadium-api-dev.herokuapp.com";
var defaulProfileImage = 'http://ustadium-media.s3.amazonaws.com/content/feed/81/9bb200294b11e7bb99538ff4cfc91a/master.jpg';

angular.module('ustadium.constants', [])
  .constant('ApiEndpoints', {
    /*
     api_url_example : {
     "url"     : base + "/api/user",
     "method"  : "POST",
     "parameter" :  {      //Not use, Just use for check format of paramters
     "username" : "",
     "email" : "",
     "password":"",
     "phone" : "",
     }
     },
     */
    api_signup_url: {
      url : base + "/auth/signup/",
      method: "POST"
    },
    api_feedlist_url: {
      url: base + "/api/feeds",
      method: "GET"
    },
    api_trending_feedlist_url: {
      url: base + "/api/feeds/trending",
      method: "GET"
    }
  })
  .constant('PostConstants', {
    type: {
      text: 'ContentTypeText',
      photo: 'ContentTypePhoto',
      audio: 'ContentTypeAudio',
      video: 'ContentTypeVideo',
    }
  });
