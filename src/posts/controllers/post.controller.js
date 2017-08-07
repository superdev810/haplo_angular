angular.module('post.controllers',[])
  .controller('PostController', function ($http, $scope, PostRequest, $stateParams, PostConstants, $rootScope, $location, Socialshare, $window, $document) {

    $scope.open=1;
    console.log($stateParams);
    PostRequest.getPost($stateParams.id).then(function(data){
        $scope.post = data.data.data;
        // console.log('hello', $scope.post);

      },function(data){
        // console.log('error', data)
      });

      PostRequest.getPost($stateParams.id + '/replies').then(function(data){
          $scope.replies = data.data.data;
          console.log('replies', $scope.replies);
        },function(data){
          console.log('error', data)
        });

    $scope.closeModal = function (id) {
      $scope.open = id;
    }

    function init () {
      $scope.closeModal(1);
    }

    init();
    var modal = document.getElementById('myModal');
    $window.onclick = function (event) {
      console.log(event.target == modal);
      if (event.target == modal) {
        window.location = "https://itunes.apple.com/us/app/ustadium/id1184610766?mt=8"
      }
    }


  });
