angular.module('feed.controllers',[])
.controller('FeedController', function ($http, $scope, FeedRequest, $stateParams) {
  console.log($stateParams);
  FeedRequest.postsData('feeds/name/'+$stateParams.name).then(function(data){
    $scope.posts = data.data;
    console.log($scope.posts);

  },function(data){
    console.log('error', data)
  })
  
  $scope.page = {};
  $scope.page.title = $stateParams.name;
});
