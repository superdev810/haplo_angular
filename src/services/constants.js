/**
 * Created by superdev on 7/15/2017.
 */
var base = "https://ustadium-api-dev.herokuapp.com";
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
      url : "https://ustadium-api-dev.herokuapp.com/auth/signup/",
      method: "POST"
    },
    api_feedlist_url: {
      url: "https://ustadium-api-dev.herokuapp.com/api/feeds",
      method: "GET"
    }
  });
