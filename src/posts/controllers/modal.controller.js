angular.module('post.controllers',['ui.bootstrap'])
  .controller('modalController', function($scope, $modalInstance, key) {

    $scope.featureName = key;

  });
