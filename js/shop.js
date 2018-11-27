$(document).ready(function(){

var categoryCount = $('.sidebar.sidebar-category .body .main-menu-caty').length;
var locationCaty = window.location.pathname;

for (var i = 0; i < categoryCount; i++) {
	var href = $('.sidebar.sidebar-category .body .main-menu-caty').eq(i).attr('href');
	if(locationCaty == href) {
		$('.sidebar.sidebar-category .body .main-menu-caty').eq(i).css('text-decoration', 'underline');
	}
}

var categorySubCount = $('.sidebar.sidebar-category .body .sub-submenu a').length;

for (var i = 0; i < categorySubCount; i++) {
	var href = $('.sidebar.sidebar-category .body .sub-submenu a').eq(i).attr('href');
	if(locationCaty == href) {
		$('.sidebar.sidebar-category .body .sub-submenu a').eq(i).css('color', '##0F8B8D');
		$('.sidebar.sidebar-category .body .sub-submenu a').eq(i).parents('.checkbox').css('display', 'block');
	}
}

$('.sidebar .header').click(function() {

    $(this).siblings('form').find('.body').slideToggle();
    $(this).find('.filter-head-sc').toggleClass('close');
});


$('.sidebar .parent').click(function() {

    $(this).siblings('.checkbox').slideToggle();
    $(this).toggleClass('close');
});


$('.ProductMainCarouselSlide div:nth-child(2)').addClass('active');


var count = 0;
var selector = $('.ad');
var slideCount = selector.find('.slide').length;

$('.slide').find('.left-arrow').click(function() {
	$('.ad').find('.slide').removeClass('active');
	// $('.ad').find('.slide').fadeOut();

	count--;
	if (count < 0) {
		count = slideCount - 1;
	}

	var current = $( '.slide' ).eq(count);
	current.addClass('active');
	// current.fadeIn();
	console.log(count);
	console.log(current);
	

});

$('.slide').find('.right-arrow').click(function() {
	$('.ad').find('.slide').removeClass('active');
// $('.ad').find('.slide').fadeOut();
	count++;
	if (count > slideCount - 1) {
		count = 0;
	}

	var current = $( '.slide' ).eq(count);
	current.addClass('active');
	// current.fadeIn();
	console.log(count);
	console.log(current);
});

});

