angular.module('feeds.services', [])
  .factory('FeedRequest', FeedRequest);

FeedRequest.$inject = ['$window', '$http', 'RestAPI', 'ApiEndpoints', 'toastr'];

function FeedRequest($window, $http, RestAPI, ApiEndpoints) {
var feedCall = {
  feedData: feedData,
  postsData: postsData
}
  return feedCall;

  function feedData(data) {
    console.log('feedData', data);
    return $http.get(base + '/api/'+ data);

  }

  function postsData(data) {
    return $http
      .get(base + '/api/'+ data)
      .then(function(feed){
        console.log(feed.data)
        if (feed) {
          return $http.get(base + '/api/feeds/'+feed.data.data._id+'/posts');
        } else {
          return q.reject();
        }
      }).then (function (result) {
        return {data: result};
      }).catch(function() {
        return {data: "n0pe"};
      })
  }
}
