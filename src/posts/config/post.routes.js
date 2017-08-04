angular.module('post.routes',[])
.config(function ($stateProvider) {
  $stateProvider
    .state('app.post', {
      url: '/post/:id',
      templateUrl: 'posts/views/post.tpl.html',
      controller: 'PostController',
    })
});
