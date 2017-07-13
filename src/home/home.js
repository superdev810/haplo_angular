angular.module('ustadium.home', ['ustadium.grandfather'])
.config(function ($stateProvider) {
  $stateProvider
    .state('app.home', {
      url: '/',
      templateUrl: 'home/home.tpl.html',
      controller: 'HomeController'
    });
})
.controller('HomeController', function ($scope) {
  $scope.users = angular.fromJson(localStorage.getItem('userStorage'));
});
