
angular.module('ustadium.fcontroller',['ustadium.grandfather'])
.controller('FeedsController', function ($http, $scope) {
  $http({
  method: 'GET',
  url: 'https://ustadium-api-dev.herokuapp.com/api/feeds'
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    console.log('hello', response.data)
    $scope.feeds = response.data;
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log('error', response);
  });

  $http({
  method: 'GET',
  url: 'https://ustadium-api-dev.herokuapp.com/api/feeds/trending'
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    console.log('hello', response.data)
    $scope.trending = response.data;
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log('error', response);
  });
});
