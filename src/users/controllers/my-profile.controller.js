/**
 * Created by superdev on 8/3/2017.
 */
angular.module('my.profile', [])
  .controller('MyProfileController', function ($scope, $http, $timeout, $state, $stateParams, Authentication) {
    console.log($stateParams.userId);
    $scope.user = {};
    Authentication.getUser($stateParams.userId)
      .then(function (post) {
        $scope.user = post.data.data;
        $scope.user.profileImageThumbnail = $scope.user.profileImageThumbnail?$scope.user.profileImageThumbnail:defaulProfileImage;
        console.log($scope.user);
      })

    $scope.saveProfile = function () {
      Authentication.updateUser($scope.user._id, $scope.user)
        .then(function (success) {
          console.log(success);
        }, function (error) {
          console.log(error);
        });
    }
  });
