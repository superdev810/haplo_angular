/**
 * Created by superdev on 7/13/2017.
 */
angular.module('angular-login.register', ['angular-login.grandfather'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.register', {
        url: '/register',
        templateUrl: 'users/views/users.tpl.html',
        controller: 'RegisterController',
        accessLevel: accessLevels.anon
      });
  });
