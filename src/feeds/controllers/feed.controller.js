angular.module('feed.controllers',[])
.controller('FeedController', function ($http, $scope, FeedRequest, $stateParams) {
  console.log($stateParams);
  $scope.page = {};
  $scope.page.title = $stateParams.name;
});
