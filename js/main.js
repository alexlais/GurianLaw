//Preloader
var preloader = $('.preloader');
$(window).load(function(){
	preloader.remove();
});

// --------------------------------------------------------------

// SET home page height as viewport height.
var slideHeight = $(window).height();
$('#home-slider .item').css('height',slideHeight);

// RESET height on resizing
$(window).resize(function(){
    slideHeight = $(window).height();
 	$('#home-slider .item').css('height',slideHeight);
});

// --------------------------------------------------------------

// Set nav css position setting (fixed/static)
// And set first section top padding to conpensate the nev css position setting change

var navHeight = $('.navbar').height();
var navHeight = navHeight - 2;
$('.navbar').css('margin-bottom', - navHeight);
$('.sub-page header.main').css('padding-top', navHeight);
if( $(window).scrollTop()>(slideHeight - navHeight)){
	$('.navbar').css("position","fixed");
} else {
	$('.navbar').css("position","static");
	$('#about').css("margin-top",navHeight);
}

$(window).on('scroll', function(){
	var navHeight = $('.navbar').height();
	var navHeight = navHeight - 2;
	$('.navbar').css('margin-bottom', - navHeight);
	// $('.sub-page header.main').css('margin-top', navHeight);
	if( $(window).scrollTop()>(slideHeight - navHeight)){
		$('.navbar').css("position","fixed");
	} else {
		$('.navbar').css("position","static");
		$('#about').css("margin-top",navHeight);
	}
});

// RESET height on resizing
$(window).resize(function(){
	var navHeight = $('.navbar').height();
	var navHeight = navHeight - 2;
	$('.navbar').css('margin-bottom', - navHeight);
	$('.sub-page header.main').css('padding-top', navHeight);
	if( $(window).scrollTop()>(slideHeight - navHeight)){
		$('.navbar').css("position","fixed");
	} else {
		$('.navbar').css("position","static");
		$('#about').css("margin-top",navHeight);
	}
});


//jQuery to collapse the navbar on scroll
// $(window).scroll(function() {
//     if ($(".navbar").offset().top > slideHeight) {
//         $(".navbar-fixed-top").css("position","static");
//     } else {
//         $(".navbar-fixed-top").css("position","relative");
//         $(".navbar-fixed-top").css("z-index","3");
//     }
// });

// jQuery for navigation and buttons page scrolling feature - requires jQuery Easing plugin

$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 300);
        // }, 300, 'easeInOutExpo');
        // event.preventDefault();
    });
});



// CAROUSEL
// http://www.w3schools.com/bootstrap/bootstrap_ref_js_carousel.asp
// https://getbootstrap.com/javascript/#carousel

// carousel = Speed ------------------------------------------------
$('.carousel').carousel({
  interval: 6000,
})

// carousel = Pause rotation on CTA hover --------------------------
$('.carousel-CTA').hover(function () {
    $('#home .carousel').carousel('pause');
});
$('.carousel-CTA').mouseout(function () {
    $('#home .carousel').carousel('cycle');
});

// carousel = vertical center caption ------------------------------------------------
$('.home-page .carousel .item .caption').css({
    'top' : '50%',
    'margin-top' : -$('.carousel .item .caption').outerHeight()/2
});


// activate image zoom when hoverring link below.
// Works in combination with CSS (figure:hover ~ h3 a)
 $(".promote h3 a").hover(function () {
    $(this).parent("h3").parent("hgroup").prev().toggleClass("hover");
 });

jQuery(function($) {

	//Initiat WOW JS
	new WOW().init();
	//smoothScroll
	smoothScroll.init();


	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
		});
	});

	//Google Map
	var latitude = $('#google-map').data('latitude')
	var longitude = $('#google-map').data('longitude')
	function initialize_map() {
		var myLatlng = new google.maps.LatLng(latitude,longitude);
		var mapOptions = {
			zoom: 14,
			scrollwheel: false,
			center: myLatlng
		};
		var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
		var contentString = '';
		var infowindow = new google.maps.InfoWindow({
			content: '<div class="map-content"><ul class="address">' + $('.address').html() + '</ul></div>'
		});
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map
		});
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize_map);

});










