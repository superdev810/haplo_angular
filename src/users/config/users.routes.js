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
      .state('app.otherprofile', {
        url: '/:postId/profile',
        templateUrl: 'users/views/other-profile.tpl.html',
        controller: 'OtherProfileController',
        accessLevel: accessLevels.anon
      })
      .state('app.myprofile', {
        url: '/profile/:userId',
        templateUrl: 'users/views/my-profile.tpl.html',
        controller: 'MyProfileController',
        accessLevel: accessLevels.admin
      });
  });
