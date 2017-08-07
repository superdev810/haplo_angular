angular.module('feeds.services', [])
  .factory('FeedRequest', FeedRequest);

FeedRequest.$inject = ['$window', '$http', 'RestAPI', 'ApiEndpoints', 'toastr'];

function FeedRequest($window, $http, RestAPI, ApiEndpoints) {
var feedCall = {
  feedData: feedData,
  getFeed: getFeed,
  getPosts: getPosts
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

}
