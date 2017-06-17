$(document).ready(function(){



	var title = "Original uSTADIUM";
	var apiURLFeed = "api/feeds/name";
	var apiURLPosts = "api/posts";
	


	var feedURL1 = "https://ustadium-development.herokuapp.com/"+apiURLFeed+"/"+title;
	var postURL1 = "https://ustadium-development.herokuapp.com/"+apiURLPosts;

	

	$.get(feedURL1)
	.done(function(data) {

			var id = data["data"]["_id"];
	        var apiURLFeedPosts = "api/feeds/"+id+"/posts";
	        var feedURL2 = "https://ustadium-development.herokuapp.com/"+apiURLFeedPosts;


		$(".feed-name").html(data["data"]["name"]);

		$.get(feedURL2)
		.done(function(data) {


			var postData = data["data"];
			// console.log(data["data"][]["author"]["username"]);

			// for(i=0; i < postData.length; i++) {
			// 	var username = postData[i]["author"]["username"];
			// 	var timestamp = postData[i]["author"]["createdAt"];
			// 	var avatar = postData[i]["author"]["profileImageThumbnail"];
			// 	var text = postData[i]["text"];
			// }

			for (i in postData) {
				var username = postData[i]["author"]["username"];
				var timestamp = postData[i]["author"]["createdAt"];
			    var avatar = postData[i]["author"]["profileImageThumbnail"];
			    var text = postData[i]["text"];
			    var media = postData[i]["mediaFile"];
			    var likes = postData[i]["likes"];
			    var dislikes = postData[i]["dislikes"];
			    var comments = postData[i]["numComments"];
			}

				// var username = postData[10]["author"]["username"];
				// var timestamp = postData[10]["author"]["createdAt"];
			 //    var avatar = postData[10]["author"]["profileImageThumbnail"];
			 //    var text = postData[10]["text"];
			 //    var media = postData[10]["mediaFile"];

			    console.log(media);




		    var timeago = $.timeago(new Date(timestamp));


			$('.post-username').html(username);			
			$('.post-timestamp').html(timeago + "<p></p>");
			$(".post-avatar").attr('src', avatar);
			$(".post-content").html(text);
			$("#likes").html(likes);
			$("#dislikes").html(dislikes);
			$("#comments").html(comments);

			if (media) { 
			$(".post-media").attr('src', media);
		};

		

		})








	})

	.fail(function(err) {

		$(".feed-name").html("Error from "+encodeURI(feedURL));
		$(".error").html("var error = "+JSON.stringify(err, null, 2));

	});


///Getting the post URL and ID

	// $.get(postURL1) 
 //     .done(function(data){

	// 		var id = data["data"]["_id"];
	// 		var apiPostID = "api/posts/"+id;
	// 		var postURL2 = "https://ustadium-development.herokuapp.com/"+apiPostID;

	// 		$.get(postURL2) 
	// 		.done(function(data) {


	// 		});




	// 	})



 //     .fail(function(err) {


	// 	$(".feed-name").html("Error from "+encodeURI(feedURL));
	// 	$(".error").html("var error = "+JSON.stringify(err, null, 2));


 //     });


  //     if (screen.width <= 800) {
  //   window.location = "https://itunes.apple.com/us/app/ustadium/id1184610766?mt=8";
  // }














});