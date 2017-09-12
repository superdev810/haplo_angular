angular.module('post.controllers',['ui.bootstrap'])
  .controller('PostController', function ($http, $scope, PostRequest, $stateParams, PostConstants, $rootScope, $location, Notification, Socialshare, $window, $document) {

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


    // download link request
    $scope.showLoading = false;
    $scope.linkResponse = null;
    $scope.model = {};
    $scope.model.phone_number = '79';

    $scope.signUp = function (phoneNumVal) {
      console.log(phoneNumVal);

      console.log(phoneNumVal);
      console.log($scope.model.tel);
      if(typeof phoneNumberVal !== 'undefined') {
        $scope.showLoading = true;
        PostRequest.requestDownloadLink(phoneNumberVal).then(function(dataRes){
          // Notification.success({message: dataRes.data, delay: 2000});
          $scope.showLoading = false;
          $scope.linkResponse = 'A download link was sent to your phone successfully';
          $('.intl-tel-input').hide();
          $('.modal-close').trigger('click');
          // $scope.openModal = true;
          sleep(1000);
          $('#thankyoubtn').trigger('click');
          $scope.openModal = false;
        }, function(dataRes){
          // console.log(data);
          $scope.showLoading = false;
          $scope.linkResponse = 'Your download link sending failure'
          $('.intl-tel-input').hide();
        });
      } else {
        Notification.success({message: "Not a valid number", delay: 2000});
      }
    }

    // timer function
    var sleep = function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // click anywhere to singup popup
    $scope.openModal = false;
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


    $scope.postLinkRequest = function (phoneNumberVal) {
      console.log(phoneNumberVal);
      console.log($scope.model.tel);
      if(typeof phoneNumberVal !== 'undefined') {
        $scope.showLoading = true;
        PostRequest.requestDownloadLink(phoneNumberVal).then(function(dataRes){
          // Notification.success({message: dataRes.data, delay: 2000});
          $scope.showLoading = false;
          $scope.linkResponse = 'A download link was sent to your phone successfully';
          $('.intl-tel-input').hide();
        }, function(dataRes){
          // console.log(data);
          $scope.showLoading = false;
          $scope.linkResponse = 'Your download link sending failure'
          $('.intl-tel-input').hide();
        });
      } else {
        Notification.success({message: "Not a valid number", delay: 2000});
      }

    }

    init();



  });
