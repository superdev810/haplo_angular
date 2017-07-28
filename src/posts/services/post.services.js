angular.module('post.services', [])
  .factory('postRequest', PostRequest);

PostRequest.$inject = ['$window', '$http', 'RestAPI', 'ApiEndpoints', 'toastr'];

function PostRequest($window, $http, RestAPI, ApiEndpoints) {
var postCall = {
  feedData: feedData,
  getFeed: getFeed,
  getPosts: getPosts,
  postComment: postComment
}
  return feedCall;

  function feedData(data) {
    // console.log('feedData', data);
    return $http.get(base + '/api/'+ data);

  }

  function getFeed(data) {
    return $http
      .get(base + '/api/'+ data);
  }

  function getPosts(feed_id) {
    console.log('Feed id: ', feed_id);
    return $http.get(base + '/api/feeds/'+feed_id+'/posts');
  }

  function postComment(post_params) {
    return $http.post(base + '/api/posts', post_params);
  }
}
