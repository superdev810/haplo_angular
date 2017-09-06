angular.module('ustadium.pages', ['ustadium.grandfather'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.admin', {
        url: '/admin',
        templateUrl: 'pages/admin.tpl.html',
        accessLevel: accessLevels.admin
      })
      .state('app.user', {
        url: '/user',
        templateUrl: 'pages/user.tpl.html',
        accessLevel: accessLevels.user
      })
      .state('app.terms', {
        url: '/terms-and-service',
        templateUrl: 'pages/terms_and_service.tpl.html',
      })
      .state('app.support', {
        url: '/support',
        templateUrl: 'pages/support.tpl.html',
      });
  });
