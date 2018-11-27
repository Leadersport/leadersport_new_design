jQuery(document).ready(function($) {
	
	var localV = location.hash;
	if(localV == '#t6') {

		var target = $(this).attr('data-tab');

		$('.tab-container').find('.tab').removeClass('active');
		$('[data-tab="#t6"]').addClass('active');

		$('.tab-container').children().children('.cont').removeClass('active');
		$('.tab-container').children().children('.cont#t6').addClass('active');

	}
	

});

function itemCount(item) {
	var parent = item.parents('.quantity-block');
	var countBlock = parent.find('.quantity-num');
	var number = countBlock.val();
	if ( item.hasClass('quantity-arrow-plus') ) {
		number++;
	}
	else {
		
		if ( number > 1 ) {
			number--;
		}
		else {
			number = 1;
		}
	}
	countBlock.val(number);
};


$('.quantity-arrow-plus').click(function(){
	itemCount($(this));
});
$('.quantity-arrow-minus').click(function(){
	itemCount($(this));
});


var $selector = $('.tab-container');

$selector.find('[data-tab]').click(function() {

	var target = $(this).attr('data-tab');

	$selector.find('.tab').removeClass('active');
	$(this).addClass('active');

	$selector.children().children('.cont').removeClass('active');
	$selector.children().children('.cont' + target).addClass('active');

});

  $('.slider-container').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	autoplay: false,
	autoplaySpeed: 2000,
		  responsive: [
	    {
	      breakpoint: 1450,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2,
	        infinite: true,
	      }
	    },
	    {
	      breakpoint: 960,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    },
	  ]
  });


  $('.product-list').slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	autoplay: false,
		  responsive: [
	    {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 3,
	        slidesToScroll: 1
	      }
	    },
	    {
	      breakpoint: 400,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 1
	      }
	    },
	  ]
  });

var a = $('.product-img-box');

a.find('.product-list img').click(function(){
	$('img').removeClass('active');
	$(this).addClass('active');
	var b =	a.find('img.active').attr("src");

	$('.product-img img').attr("src", b);
});

$('#new-post, #delivery-to-city, #pickup').click(function(){
	var target = $(this).attr('data-target').slice(5);
	$('[data-modal="modal-' + target + '"]').addClass('active');
});

$('.modal-container-deliver').click(function(event){
	var modalTarget = $(event.target);
	if (modalTarget.is('.modal-container-deliver')) {
		modalTarget.removeClass('active');
	}
});