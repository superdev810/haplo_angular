angular.module('feed.controllers',[])
.controller('FeedController', function ($http, $scope, FeedRequest, $stateParams) {
  console.log($stateParams);

  // define variables
  $scope.page = {};


  // define functions
  $scope.showComment = showComment;

  function init() {
    FeedRequest.postsData('feeds/name/'+$stateParams.name).then(function(data){
      $scope.posts = data.data;
      console.log($scope.posts);

    },function(data){
      console.log('error', data)
    })

    $scope.page.title = $stateParams.name;
    $scope.page.isComment = false;
  }

  function showComment() {
    $scope.page.isComment = true;
    console.log('Auto Textarea', document.getElementById("comment-post"));
    autosize(document.getElementById("comment-post"));
  }



});
