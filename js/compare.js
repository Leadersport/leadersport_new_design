var $switch = $('.page-switch');
$('body').on('click', '.page-switch [data-content] i',function(){

	var target = $(this).parents('a').attr('data-content');
	
	$switch.find('.btn').removeClass('active');
	$(this).parents('a').addClass('active');

	$('.slider-container').removeClass('active');
	$('.slider-container' + target).addClass('active');


});

// var windowWidth = $(window).width();
var slideWidth = $(".col-3").width();
console.log(slideWidth);
var count = 0;
var $selector = $('.slider-container.active');
var slideCount = $selector.find('.col-3').length;
console.log(slideCount);

$selector.find('.slides-row').css('width', slideWidth * slideCount + 50 + 'px');

function sliderController(count){
	var distance = count * slideWidth * (-1);
	$selector.find('.slides-row').css('transform', 'translateX(' + distance + 'px)');
};

$('.page-text').find('.arrow.left').click(function() {

	count--;
	if (count < 0) {
		count = slideCount -1;
	}
	sliderController(count);

});

$('.page-text').find('.arrow.right').click(function() {

	count++;
	if (count == slideCount) {
		count = 0;
	}
console.log(count);
	sliderController(count);

});
