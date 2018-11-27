var $AccTab = $('.info-box');
$AccTab.find('[data-tab]').click(function(){

  var account = $(this).attr('data-tab');
  
  $('.info-box').find('.block').removeClass('active');
  $(this).parent('.block').addClass('active');

  $('.col-8').find('.page-content').removeClass('active');
  $('.col-8').find('.page-content' + account).addClass('active');

});


var $selector = $('.page-content');
$selector.find('[data-tab]').click(function(){

	var target = $(this).attr('data-tab');
	if(target == '#payments') {
		$('.cart-back-block').css('visibility', 'visible');
	}
	if (target == '#delivery') {
		if ($('#name').val() == '' || $('#email').val() == '' || $('#phone').val() == '') {
		  dangerAlert('Чтобы продолжить заполните пустые поля!');
	    }else {
	    	$('.info-box').find('.block').removeClass('active');
			$('.info-box').find('.block' + target).addClass('active');

			$('.col-8').find('.page-content').removeClass('active');
			$('.col-8').find('.page-content' + target).addClass('active');
	    }
	}else {
		$('.info-box').find('.block').removeClass('active');
		$('.info-box').find('.block' + target).addClass('active');

		$('.col-8').find('.page-content').removeClass('active');
		$('.col-8').find('.page-content' + target).addClass('active');
	}

});

$('.cart-back-box').on('click', function() {
	if($('#payments').hasClass('active')) {
		$('.info-box').find('.block').removeClass('active');
		$('.info-box').find('.block#products').addClass('active');

		$('.col-8').find('.page-content').removeClass('active');
		$('.col-8').find('.page-content#products').addClass('active');

		$('.cart-back-block').css('visibility', 'hidden');
	}else if ($('#delivery').hasClass('active')) {
		$('.info-box').find('.block').removeClass('active');
		$('.info-box').find('.block#payments').addClass('active');

		$('.col-8').find('.page-content').removeClass('active');
		$('.col-8').find('.page-content#payments').addClass('active');
		$('.cart-back-block').css('visibility', 'visible');
	}
});

var pass = $('#password-show');
$('a.show_pass').click(function() {
  pass.attr('type', pass.attr('type') === 'password' ? 'text' : 'password');
});


$('.list-date').click(function() {
	if($(this).parents('.list-item').hasClass('active')) {
		$(this).parents('.list-item').removeClass('active');
	}else {
		$('.list-item').removeClass('active');
	    $(this).parents('.list-item').addClass('active');
	}
});


$('.select').click(function() {
	 $(this).children('.select-option').slideToggle();
});

$('body').on('click', '.select-option a',function() {
	var target = $(this);
	var value = target.html();
	var a = target.parents('.select').find('span').html(value);
});


// $(function(){
// 	var $minus = $(".quantity-arrow-minus");
// 	var $plus = $(".quantity-arrow-plus");
// 	var $number;
// 	var $price = $(".price");

// 	$plus.click(function(){
// 		var value = parseFloat($(this).parent().children('.quantity-num').val()) + 1;
// 		$(this).parent().find(".quantity-num").val(value);

// 	});

// 	$minus.click(function(){
// 		$number = $(".quantity-num").val();
// 		if ($number > 1) {
// 			var value = parseFloat($(this).parent().children('.quantity-num').val()) - 1;
// 			$(this).parent().find('.quantity-num').val(value);

// 		}
// 		console.log($number);
// 	});
// });


function itemCount(item) {
	var parent = item.parents('.quantity-block');
	var countBlock = parent.find('.quantity-num');
	var number = countBlock.val();
	// var quantityPrice = parent.siblings('.price').text();
	// var itemPrice = parseInt(quantityPrice.text());

	// console.log(quantityPrice);
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
mainSum();
	// var mainPrimeBlock = $('.price-box .price');
	// var mainPrime = mainPrimeBlock.val();
	// quantityPrice.html(itemPrice * number + ' UAH');
};


function mainSum(){
	var num = [];
	var ownPrice = [];
	var ownPriceNum = [];
	var mainPrice = 0;
	var priceBlock = $('.list-content .price span');
	var quantityBlock = $('.quantity-num');

	for ( var i = 0; i < priceBlock.length; i++ ) {
		ownPrice.push( $(priceBlock[i]).html() );
	};

	for ( var i = 0; i < quantityBlock.length; i++ ) {
		num.push( $(quantityBlock[i]).val() );
	};

	for ( var i = 0; i < ownPrice.length; i++ ) {
		ownPriceNum.push( ownPrice[i] * num[i] );
		mainPrice += ownPriceNum[i];
	};
	
	var a =	$('.price-box').find('.price').html(mainPrice + '<span> UAH</span>');
};

mainSum();

$('.quantity-arrow-plus').click(function(){
	itemCount($(this));
});
$('.quantity-arrow-minus').click(function(){
	itemCount($(this));
});