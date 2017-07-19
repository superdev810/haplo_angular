
angular.module('feeds.controllers',[])
.controller('FeedsController', function ($http, $scope, FeedRequest, $stateParams) {
  console.log($stateParams);
  FeedRequest.feedData('feeds').then(function(data){
    $scope.feeds = data.data;
    console.log($scope.feeds);

  },function(data){
    console.log('error', data)
  })

  FeedRequest.feedData('feeds/trending').then(function(data){
    $scope.trending = data.data;
    console.log($scope.trending)

  },function(data){
    console.log('error', data)
  });


    $scope.tab = 1;

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };
});
