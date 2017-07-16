angular.module('feeds.services', [])
  .factory('FeedRequest', FeedRequest);

FeedRequest.$inject = ['$window', '$http', 'RestAPI', 'ApiEndpoints', 'toastr'];

function FeedRequest($window, $http, RestAPI, ApiEndpoints) {
var feedCall = {
  feedData: feedData
}
  return feedCall;

  function feedData(data) {
    console.log('feedData', data);
    return $http.get(base + '/api/'+ data);

  }
}
