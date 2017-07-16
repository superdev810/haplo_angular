angular.module('feeds.routes',[])
.config(function ($stateProvider) {
  console.log($stateProvider);
  $stateProvider
    .state('app.feeds', {
      url: '/feeds',
      templateUrl: 'feeds/views/feeds.tpl.html',
      controller: 'FeedsController',
      accessLevel: accessLevels.anon
    }).state('app.feed', {
      url: '/feeds/:name',
      templateUrl: 'feeds/views/feed.tpl.html',
      controller: 'FeedController',
      accessLevel: accessLevels.anon
    })
});
