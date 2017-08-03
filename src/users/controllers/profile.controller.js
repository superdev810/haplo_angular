/**
 * Created by superdev on 8/3/2017.
 */
angular.module('users.profile', [])
  .controller('UserProfileController', function ($scope, $http, $timeout, $state, Authentication, toastr, Notification) {
    $scope.user = {};
  });
