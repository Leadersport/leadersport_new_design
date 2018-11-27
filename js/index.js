$(document).ready(function(){

$('.mobile-sidebar').click(function(){ 
	$('.main-sidebar').toggleClass('active');
	$('.mobile-sidebar').toggleClass('open');
});

$('.search').click(function(){
  $('.main-sidebar').removeClass('active');
  $('.mobile-sidebar').removeClass('open');
});

$('.main-slider').slick({
	autoplay: false,
	speed: 500,
	infinite: true,
  fade: true,
  cssEase: 'linear',
  arrows: true,
  prevArrow: '.top-arrow',
  nextArrow: '.bottom-arrow',
  dots: true,
  appendDots: '.line-box',
  pauseOnHover: false,
  pauseOnDotsHover: false,
  pauseOnHover: false
});

$('.switch .line-box .slick-dots li').click(function () {
	
	for(var i = 0; i < $(this).index() + 1; i++){

		slideController();
		
	}

});

$('.switch .top-arrow').click(function () {
	slideController();
});

$('.switch .bottom-arrow').click(function () {
	slideController();
});

var intervalID;

$('.textBlockSlider div:first-child').addClass('active');
$('.ProductMainCarouselSlide div:nth-child(2)').addClass('active');

function slideController() {
	var $activeSlide = $('.slide-box.slick-current').attr('data-slide').slice(6);
	var $slideText = $('.slide-text');
	var $slideMainText = $('.textBlockSlider');
	var $activeProgressBar = $('.numb-slide').find('[data-progres="progress-' + $activeSlide + '"]');
	var i = 0;
	
	$slideText.children('p').removeClass('active');
	$slideText.children('[data-text="text' + $activeSlide + '"]').addClass('active');


	$('.textBlockSlider div.textBlockSliderActive').removeClass('active');
	$slideMainText.children('[data-block="block' + $activeSlide + '"]').addClass('active');

	$('.col-3 .active-bar').css('width', '0%');
	$('.col-3').removeClass('active');
	$activeProgressBar.parents('.col-3').addClass('active');
	clearInterval(intervalID);
	intervalID = setInterval(function() {

		i++;
		progressController($activeProgressBar, i);

		if (i == 100) {
			i = 0;
			$(".main-slider").slick("slickNext");
			slideController();
		}

	}, 50);
}

function progressController(selector, value) {

	var $selector = $(selector).find('.active-bar');

	if (value <= 0) { value = 0 } 
	else if (value >= 100) { value = 100 }

	$selector.css('width', value + '%');
}

slideController();


});