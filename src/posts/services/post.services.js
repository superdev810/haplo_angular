angular.module('post.services', [])
  .factory('PostRequest', PostRequest);

PostRequest.$inject = ['$window', '$http', 'RestAPI', 'ApiEndpoints', 'toastr'];

function PostRequest($window, $http, RestAPI, ApiEndpoints) {
  var postCall = {
    getPost: getPost,
    postLike: postLike,
    postDislike: postDislike,
    postComment: postComment
  }
  return postCall;

  function getPost(data) {
    return $http.get(base + '/api/posts/'+ data);
  }

  function postLike(postId) {
    console.log(postId);
    return $http.put(base + '/api/posts/'+ postId + '/like');
  }

  function postDislike(postId) {
    return $http.put(base + '/api/posts/'+ postId + '/dislike');
  }

  function postComment(post_params) {
    return $http.post(base + '/api/posts', post_params);
  }
}
