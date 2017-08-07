angular.module('feed.controllers',[])
  .controller('FeedController', function ($http, $scope, FeedRequest, $stateParams, PostConstants, $rootScope, $location, PostRequest) {


    $rootScope.socialShare.title = 'Feed Controller';
    console.log($stateParams);

    // define variables
    $scope.page = {};

    // define functions
    $scope.showComment = showComment;
    $scope.postComment = postComment;
    $scope.postLike = postLike;
    $scope.postDislike = postDislike;

    // initialize the controller
    function init() {
      FeedRequest.getFeed('feeds/name/'+$stateParams.name)
        .then(function(feed){
          $scope.feed = feed.data.data;

          // change the social share info with feed info
          $rootScope.socialShare.title = $scope.feed.name;
          $rootScope.socialShare.description = $scope.feed.description;
          $rootScope.socialShare.url = $location.absUrl();
          $rootScope.socialShare.image = $scope.feed.mediaFileThumbnail?$scope.feed.mediaFileThumbnail:null;

          if (feed) {
            FeedRequest.getPosts($scope.feed._id)
              .then(function(data){
                $scope.posts = data.data;

                /* set default img when profile img is null */
                // for(var i=0; i<$scope.posts.length; i++){
                //   $scope.posts[i].author.profileImageThumbnail = $scope.posts[i].author.profileImageThumbnail?$scope.posts[i].author.profileImageThumbnail:defaulProfileImage;
                // }
                console.log($scope.posts);
                console.log($('#post-comment'));

                /* autosize setting to all textarea */
                angular.element(document).ready(function () {
                  var postCommentElem = document.getElementsByClassName("post-comment");
                  Array.from(postCommentElem).forEach(function (elem) {
                      autosize(elem);
                  })
                });
              },function(data){
                console.log('error', data)
              });
          } else {
            return q.reject();
          }

        }).then (function (result) {
        return {data: result};
      }).catch(function() {
        return {data: "n0pe"};
      })

      $scope.page.title = $stateParams.name;
      $scope.page.isComment = false;
      autosize(document.getElementById('post-post'));


    }

    // toggle post comment view
    function showComment() {
      $scope.page.isComment = true;
    }

    // post comment handle
    function postComment(postId, post) {

      let postParams = {
        text: post.commentText,
        // feeds: [$scope.feed._id],
        contentType: PostConstants.type.text,
        replyToPost: postId,
      }
      console.log(postParams);

      PostRequest.postComment(postParams)
        .then(function (data) {
          console.log(data.data);
          post.numComments++;
          Notification.success({message: "Comment post successfully", delay: 2000});

        }, function (error) {
          console.log(error);
        })
        .catch(function (excep) {
          console.log(excep);
        });
    }

    function postLike(post) {
      console.log(post);
      PostRequest.postLike(post._id)
        .then(function (success) {
          post.likes = success.data.data.post.likes;
          post.dislikes = success.data.data.post.dislikes;
          console.log(success);
          Notification.success({message: "Like post successfully", delay: 2000});
        }, function (error) {
          Notification.success({message: "Like post failure", delay: 2000});
          console.log('Error occur');
          console.log(error);
        })
        .catch(function (error) {
          Notification.success({message: "Like post failure", delay: 2000});
          console.log(error);
        })
    }

    function postDislike(post) {
      console.log(post);
      PostRequest.postDislike(post._id)
        .then(function (success) {
          post.likes = success.data.data.post.likes;
          post.dislikes = success.data.data.post.dislikes;
          console.log(success);
          Notification.success({message: "Like post successfully", delay: 2000});
        }, function (error) {
          Notification.success({message: "Like post failure", delay: 2000});
          console.log('Error occur');
          console.log(error);
        })
        .catch(function (error) {
          Notification.success({message: "Like post failure", delay: 2000});
          console.log(error);
        })
    }
    init();


  });
