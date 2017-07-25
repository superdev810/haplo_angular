/**
 * Created by superdev on 7/13/2017.
 */
angular.module('users.routes', [])
  .config(function ($stateProvider) {
    console.log($stateProvider);
    $stateProvider
      .state('app.register', {
        url: '/register',
        templateUrl: 'users/views/users.tpl.html',
        controller: 'RegisterController',
        accessLevel: accessLevels.anon
      });
  });