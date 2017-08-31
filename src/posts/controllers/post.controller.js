angular.module('post.controllers',[])
  .controller('PostController', function ($http, $scope, PostRequest, $stateParams, PostConstants, $rootScope, $location, Socialshare, $window, $document) {

    $scope.open=1;
    $scope.imgCount = 4;
    $scope.postMedia = [];
    console.log($stateParams);
    PostRequest.getPost($stateParams.id).then(function(data){
        $scope.post = data.data.data;
        console.log($scope.post.media.length);
        console.log('POST MEDIA: ');
        console.log($scope.post);

        angular.forEach($scope.post.media, function (item) {
          if(item.quality > 0.1){
            $scope.postMedia.push(item);
          }
        })
        console.log('POST MEDIA: ');
        console.log($scope.postMedia);
        $scope.imgCount = $scope.post.media.length / 2;
        console.log('image count: ', $scope.imgCount);
        console.log('hello', $scope.post);

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
