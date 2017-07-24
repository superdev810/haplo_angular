angular.module('feed.controllers',[])
  .controller('FeedController', function ($http, $scope, FeedRequest, $stateParams, PostConstants) {
    console.log($stateParams);

    // define variables
    $scope.page = {};


    // define functions
    $scope.showComment = showComment;
    $scope.postComment = postComment;

    function init() {
      FeedRequest.getFeed('feeds/name/'+$stateParams.name)
        .then(function(feed){
          $scope.feed = feed.data.data;
          console.log($scope.feed);
          if (feed) {
            FeedRequest.getPosts($scope.feed._id)
              .then(function(data){
                $scope.posts = data.data;
                console.log($scope.posts);

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
    }

    function showComment() {
      $scope.page.isComment = true;
      autosize(document.getElementById("comment-post"));
    }

    function postComment() {
      let postParams = {
        text: $scope.commentText,
        feeds: [$scope.feed._id],
        contentType: PostConstants.type.text,
        replyToPost: null,
      }

      console.log(postParams);

      FeedRequest.postComment(postParams)
        .then(function (data) {
          console.log(data.data);
        }, function (error) {

        })
        .catch(function (excep) {
          console.log(excep);
        });
    }

    init();


  });
