angular.module('ustadium.feeds',['ustadium.grandfather', 'ustadium.fcontroller'])
.config(function ($stateProvider) {
  console.log($stateProvider);
  $stateProvider
    .state('app.feeds', {
      url: '/feeds',
      templateUrl: 'feeds/views/feeds.tpl.html',
      controller: 'FeedsController',
      accessLevel: accessLevels.anon
    });
});
