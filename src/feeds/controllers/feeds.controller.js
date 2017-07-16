
angular.module('feeds.controllers',[])
.controller('FeedsController', function ($http, $scope, FeedRequest, $stateParams) {
  console.log($stateParams);
  FeedRequest.feedData('feeds').then(function(data){
    $scope.feeds = data.data;
    console.info('status', data.status);
    console.info('headers', data.headers);
    console.info('config', data.config);

  },function(data){
    console.log('error', data)
  })

  FeedRequest.feedData('feeds/trending').then(function(data){
    $scope.trending = data.data;
    console.info('status', data.status);
    console.info('headers', data.headers);
    console.info('config', data.config);

  },function(data){
    console.log('error', data)
  });
});
