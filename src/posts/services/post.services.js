angular.module('post.services', [])
  .factory('postRequest', PostRequest);

PostRequest.$inject = ['$window', '$http', 'RestAPI', 'ApiEndpoints', 'toastr'];

function PostRequest($window, $http, RestAPI, ApiEndpoints) {
var postCall = {
  postData: postData
}
  return postCall;

  function postData(data) {
    // console.log('feedData', data);
    return $http.get(base + '/api/'+ data);

  }
}
