$(document).ready(function(){


var counter = 0;



//Polling Buttons

$('#like').click(function(){

});

$('#dislike').click(function() {

});

$('#comment').click(function() {

});

//Auto Increase Post Div Height

function incHeight() {
	var el = document.getElementbyClass("Second-Post");
	var height = el.offsetHeight;
	var newHeight = height + 200;
	el.style.height = newHeight + 'px';
}


//Popup Modal 


$(window).load(function(){
	$('.modal').fadeIn('slow');
});


$(window).load(function(){
	$('.mobile-modal').fadeIn('slow');
});



$('#toggle').click(function(){
		$(this).toggleClass('active');
		$('#overlay').toggleClass('open');

	});

$('#mobile-search').click(function(){
		

});



new WOW().init();


});

