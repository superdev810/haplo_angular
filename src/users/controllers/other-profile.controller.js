/**
 * Created by superdev on 8/3/2017.
 */
angular.module('users.profile', [])
  .controller('OtherProfileController', function ($scope, $http, $timeout, $state, $stateParams, PostRequest) {
    console.log($stateParams.postId);
    $scope.user = {};
    PostRequest.getPost($stateParams.postId)
      .then(function (post) {
        $scope.user = post.data.data.author;
        console.log($scope.user);
      })

  });
