angular.module('post.controllers',[])
  .run(function ($rootScope) {
    console.log('run rootscope', $rootScope.socialShare);
  })
  .controller('PostController', function ($http, $scope, PostRequest, $stateParams, PostConstants, $rootScope, $location, Socialshare, $window, $document) {
    console.log($window);
    console.log($document);
    $scope.open=1;
    console.log($stateParams);
    PostRequest.getPost($stateParams.id).then(function(data){
        $scope.post = data.data.data;
        console.log('hello', $scope.post);

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
        modal.classList.remove('mDisplay');
      }
    }

    // $rootScope.socialShare.title = 'Feed Controller';
    // console.log($stateParams);
    //
    // // define variables
    // $scope.page = {};
    //
    //
    // //Call service to trigger immediately the sharing method
    // //*
    // // Socialshare.share({
    // //   'provider': 'twitter',
    // //   'attrs': {
    // //     'socialshareUrl': $rootScope.socialShare.url,
    // //     'socialshareHashtags': 'ustadium, angular, socialshare'
    // //   }
    // // });
    // //*/
    //
    // // define functions
    // $scope.showComment = showComment;
    // $scope.postComment = postComment;
    //
    // // initialize the controller
    // function init() {
    //   FeedRequest.getFeed('feeds/name/'+$stateParams.name)
    //     .then(function(feed){
    //       $scope.feed = feed.data.data;
    //
    //       // change the social share info with feed info
    //       $rootScope.socialShare.title = $scope.feed.name;
    //       $rootScope.socialShare.description = $scope.feed.description;
    //       $rootScope.socialShare.url = $location.absUrl();
    //       $rootScope.socialShare.image = $scope.feed.mediaFileThumbnail?$scope.feed.mediaFileThumbnail:null;
    //
    //       if (feed) {
    //         FeedRequest.getPosts($scope.feed._id)
    //           .then(function(data){
    //             $scope.posts = data.data;
    //             console.log($scope.posts);
    //
    //           },function(data){
    //             console.log('error', data)
    //           });
    //       } else {
    //         return q.reject();
    //       }
    //     }).then (function (result) {
    //     return {data: result};
    //   }).catch(function() {
    //     return {data: "n0pe"};
    //   })
    //
    //   $scope.page.title = $stateParams.name;
    //   $scope.page.isComment = false;
    // }
    //
    // // toggle post comment view
    // function showComment() {
    //   $scope.page.isComment = true;
    //   autosize(document.getElementById("comment-post"));
    // }
    //
    // // post comment handle
    // function postComment() {
    //   let postParams = {
    //     text: $scope.commentText,
    //     feeds: [$scope.feed._id],
    //     contentType: PostConstants.type.text,
    //     // replyToPost: null,
    //   }
    //   delete $http.defaults.headers.common['X-Token'];
    //
    //   FeedRequest.postComment(postParams)
    //     .then(function (data) {
    //       console.log(data.data);
    //     }, function (error) {
    //
    //     })
    //     .catch(function (excep) {
    //       console.log(excep);
    //     });
    // }
    //
    // init();


  });
