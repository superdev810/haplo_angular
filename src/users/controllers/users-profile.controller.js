/**
 * Created by superdev on 8/3/2017.
 */
angular.module('users.controllers', [])
  .controller('UserProfileController', function ($scope, $http, $timeout, $state, Authentication, toastr, Notification) {
    $scope.xhr = false;
    $scope.redirect = false;

    $scope.submit = function (formInstance) {
      console.log('submit post');

      $scope.xhr = true;
      var data = $scope.registerObj;
      Authentication.signup(data)
        .then(function (data, status, headers, config) {
          console.info('post success - ', data);
          $scope.redirect = true;
          Notification.success({message: 'Successfully Registered', delay: 2000});
          $timeout(function () {
            $scope.xhr = false;
            $scope.xhr = false;
            $state.go('app.home');
          }, 2000);
        }, function (data, status, headers, config) {
          console.log(data);
          $scope.xhr = false;
          Notification.error({message: data.data.data.message, delay: 5000});
        });
    };
  });
