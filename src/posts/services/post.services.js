angular.module('post.services', [])
  .factory('PostRequest', PostRequest);

PostRequest.$inject = ['$window', '$http', 'RestAPI', 'ApiEndpoints', 'toastr'];

function PostRequest($window, $http, RestAPI, ApiEndpoints) {
var postCall = {
  getPost: getPost
}
  return postCall;

  function getPost(data) {
    return $http.get(base + '/api/posts/'+ data);
  }
}
