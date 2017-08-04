/**
 * Created by superdev on 7/13/2017.
 */
angular.module('users.routes', [])
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.register', {
        url: '/register',
        templateUrl: 'users/views/users.tpl.html',
        controller: 'RegisterController',
        accessLevel: accessLevels.anon
      })
      .state('app.profile', {
        url: '/:postId/profile',
        templateUrl: 'users/views/user-profile.tpl.html',
        controller: 'UserProfileController',
        accessLevel: accessLevels.anon
      });
  });
