/**
 * Created by superdev on 8/3/2017.
 */
angular.module('my.profile', [])
  .controller('MyProfileController', function ($scope, $http, $timeout, $state, $stateParams, Authentication, Notification) {
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
          Notification.success({message: "User profile updated successfully", delay: 2000})
          console.log(success);
        }, function (error) {
          console.log(error);
          Notification.success({message: "User profile updated failure", delay: 2000})
        });
    }
  });
