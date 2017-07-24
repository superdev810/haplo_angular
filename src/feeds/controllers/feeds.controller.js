
angular.module('feeds.controllers',[])
  .controller('FeedsController', function ($http, $scope, FeedRequest, $state, $location, $stateParams) {
    FeedRequest.feedData('feeds').then(function(data){
      $scope.feeds = data.data;
    },function(data){
      console.log('error', data)
    })

    FeedRequest.feedData('feeds/trending').then(function(data){
      $scope.trending = data.data;
      console.log($scope.trending);
    },function(data){
      console.log('error', data)
    });
    var feedsTypes = {
      Hot: 1,
      New: 2,
      Subscribed: 3,
      Created: 4
    }

    $scope.tab = 1;
    // console.log('$stateParams.type', $stateParams.type);
    // console.log(feedsTypes.types);
    if ($stateParams.type) {
      $scope.tab = feedsTypes[$stateParams.type]
    }
    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };

  });
