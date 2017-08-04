angular.module('feeds.routes',[])
.config(function ($stateProvider) {
  $stateProvider
    .state('app.feeds', {
      url: '/feeds/:type',
      templateUrl: 'feeds/views/feeds.tpl.html',
      controller: 'FeedsController',
    }).state('app.feed', {
      url: '/feed/:name',
      templateUrl: 'feeds/views/feed.tpl.html',
      controller: 'FeedController',
    })
});
