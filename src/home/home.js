angular.module('ustadium.home', ['ustadium.grandfather'])
.config(function ($stateProvider) {
  $stateProvider
    .state('app.home', {
      url: '/',
      templateUrl: 'home/home.tpl.html',
      controller: 'HomeController'
    });
})
.controller('HomeController', function ($scope, $state, HomeRequest, $document, Notification) {
  $scope.users = angular.fromJson(localStorage.getItem('userStorage'));

  console.log("home")
  $scope.model= {};
  $scope.downloadLinkFunction = function (data) {
    console.log('downloadLinkFunction',data);
    if (typeof data !== 'undefined') {

      HomeRequest.requestDownloadLink(data.tel).then(function(dataRes){
        Notification.success({message: dataRes.data, delay: 2000});
      }, function(dataRes){
        // console.log(data);
      })
    } else {
        Notification.success({message: "Phone number not valid", delay: 2000});
    }
  }
}).factory('HomeRequest', function ($window, $http, RestAPI, ApiEndpoints, toastr) {
  var homeApiRequest = {
    requestDownloadLink: requestDownloadLink
  }

  return homeApiRequest;

  function requestDownloadLink (phoneNumber) {
    return $http.put(base + '/invite/phone/'+ phoneNumber);
  }
});
