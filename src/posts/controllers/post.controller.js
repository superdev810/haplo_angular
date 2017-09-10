angular.module('post.controllers',['ui.bootstrap'])
  .controller('PostController', function ($http, $scope, PostRequest, $stateParams, PostConstants, $rootScope, $location, Socialshare, $window, $document) {

    this.message = 'It works!';

    var key = 1000;

    this.modal = function() {
      var modalInstance = $modal.open({
        controller: 'ModalController',
        templateUrl: '../views/modal.tpl.html',
        resolve: {
          key: function() {
            return key;
          }
        }
      });
      modalInstance.result.then(function(optionSelected) {
        if (optionSelected === 'yes') {
          console.log("Yes selected!")
        }
      })
    }

    $(".btn.btn-info.btn-lg").click(function () {
      // var data_target = $(this).attr("data-target");
      // $(data_target).addClass("show");
      // $(data_target).addClass("in");
      // $("body").append("<div class='modal-backdrop'></div>");
      // $('.modal-backdrop').addClass("show");
      // $('.modal-backdrop').addClass("in");
    });

    $scope.open=1;
    $scope.imgCount = 0;
    $scope.videoCount = 0;
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
        if($scope.post.hasPhotos) {
          $scope.imgCount = $scope.post.media.length / 2;
        } else if($scope.post.hasVideos){
          $scope.imgCount = $scope.post.media.length;
        } else {

        }
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
    $scope.openModal = false;
    $scope.signUp = function () {
      console.log($scope.phone_number);

      $('.modal-close').trigger('click');
      $('#thankyoubtn').trigger('click');
      $scope.openModal = false;
    }
    // click anywhere to singup popup
    $document.on('click', function (event) {
      // event.preventDefault();
      if($scope.openModal){
        if($(event.target).hasClass('modal')){
          $('.modal-close').trigger('click');
          $scope.openModal = false;
          return;
        }
        return;
      }
      console.log(event.target.className);
      var class_name = event.target.className;

      if (!$(event.target).hasClass('comments-click') && !$(event.target).hasClass('like-click') && !$(event.target).hasClass('dislike-click')) {
        console.log('Click Sing up');
        $scope.openModal = true;
        $('#signupbtn').trigger('click');

        return;
      }
      $scope.openModal = false;
    });

    init();



  });
