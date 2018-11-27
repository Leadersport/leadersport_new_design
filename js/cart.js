jQuery(document).ready(function($) {
	$('.get-val-pay ul li a').on('click', function(){
		$('input#pay_method').remove();
		var val = $(this).parents('li').attr('data-val');
		$('#ajaxFormCheckout').append('<input type="hidden" value="'+val+'" name="pay_method" id="pay_method">');
	})

	$('body').on('click', '.get-val-del ul li a', function(){
		$('input#del_method').remove();
		var val = $(this).parents('li').attr('data-val');
		console.log(val);
		$('#ajaxFormCheckout').append('<input type="hidden" value="'+val+'" name="delivery_method" id="del_method">');
		$('#mail_method').remove();
		$('#courier_method').remove();
		if (val == 1) {
			$('#address').attr('required', '')
			$('.mail-del').slideUp('200');
			$('.courier-del').slideDown('200');
			var valCo   = $('.courier-del .get-val-co ul').attr('data-val');
			var titleCo = $('.courier-del .get-val-co ul li[data-val='+valCo+'] a').text();
			var titleIn   = $('.courier-del #address').val();
			$('#ajaxFormCheckout').append('<input type="hidden" value="'+titleCo+', '+titleIn+'" name="address" id="courier_method">');
		}else if (val == 2) {
			$('#address').removeAttr('required');
			$('.courier-del').slideUp('200');
			$('.mail-del').slideUp('200');
		}else if (val == 3) {
			$('#address').removeAttr('required');
			$('.courier-del').slideUp('200');
			$('.mail-del').slideDown('200');
			var valCo   = $('.mail-del .get-val-co ul').attr('data-val');
			var titleCo = $('.mail-del .get-val-co ul li[data-val='+valCo+'] a').text();
			var valMl   = $('.mail-del .get-val-ml ul').attr('data-val');
			var titleMl = $('.mail-del .get-val-ml ul li[data-val='+valMl+'] a').text();
			$('#ajaxFormCheckout').append('<input type="hidden" value="'+titleCo+', '+titleMl+'" name="address" id="mail_method">');
		}
	})

	$('body').on('click', '#delivery .get-val ul li a', function() {
		var val = $(this).parents('li').attr('data-val');
		$(this).parents('ul').attr('data-val', val);
		GetData();
	});

	$('#address').keyup(function(){
		GetData();
	});

	$('#ajaxFormCheckout').on('submit', function() {
		var metVal = $('input#pay_method').val();
		$.cookie('EiQ3rUEmRBH1jRpn', JSON.stringify(0), {
			expires: 30,
			path: '/'
		});
	})


	$('.bonus-btn').on('click', function() {
		$(this).toggleClass('active-bonus');
		if ($(this).hasClass('active-bonus')) {
			$('.bonus-block').slideDown(200);
			$('#bonus').attr('requered', '');
			$('#bonus_method').val('1');
			Bonus();
		}else {
			var bonusInput = $('#bonus').val();
			var Total = $('#total_product').val();
			$('.bonus-block').slideUp(200);
			$('#bonus').removeAttr('requered');
			$('#bonus_method').val('0');
			$('#amount').val(Total);
			$('.card-bonus-amount').text(Total+' UAH');
		}
	});

	$('#bonus').keyup(function(){
		Bonus();
	});

	$('.btn.form-btn-ch').on('click', function() {
		var velMethod = $('#del_method').val();
		if (velMethod == 3) {
			var CountyVal = $('.get-val-co-mail.get-val span').text();
			if(CountyVal == 'Выберите город') {
				infoAlert('Выберите город пожалуйста!');
				return false;
			}else {
				var MailVal = $('.get-val-ml.get-val li').eq(0).attr('data-val');
				if(MailVal == 'empty') {
					infoAlert('В Вашем городе нету отделений, выберите другой город!');
					return false;
				}
			}
		}
	});

});

function GetData() {
	$('#mail_method').remove();
	$('#courier_method').remove();
	var val = $('#del_method').val();
	if (val == 1) {
		$('.mail-del').slideUp('200');
		$('.courier-del').slideDown('200');
		var valCo   = $('.courier-del .get-val-co ul').attr('data-val');
		var titleCo = $('.courier-del .get-val-co ul li[data-val='+valCo+'] a').text();
		var titleIn   = $('.courier-del #address').val();
		$('#ajaxFormCheckout').append('<input type="hidden" value="'+titleCo+', '+titleIn+'" name="address" id="courier_method">');
	}else if (val == 2) {
		$('.courier-del').slideUp('200');
		$('.mail-del').slideUp('200');
	}else if (val == 3) {
		$('.courier-del').slideUp('200');
		$('.mail-del').slideDown('200');
		var valCo   = $('.mail-del .get-val-co ul').attr('data-val');
		var titleCo = $('.mail-del .get-val-co ul li[data-val='+valCo+'] a').text();
		var valMl   = $('.mail-del .get-val-ml ul').attr('data-val');
		var titleMl = $('.mail-del .get-val-ml ul li[data-val='+valMl+'] a').text();
		$('#ajaxFormCheckout').append('<input type="hidden" value="'+titleCo+', '+titleMl+'" name="address" id="mail_method">');
	}
}

function Bonus() {
	var bonusInput = +$('#bonus').val();
	var bonusHave = +$('.diamond-balance-text').attr('data-bonus');
	var Total = +$('#total_product').val();
	var result = Total - bonusInput;
	console.log(bonusInput);
	if (bonusHave < bonusInput) {
		if (bonusHave > Total) {
			$('#bonus').val(Total - 1);
			$('#bonus-amount').val(Total - 1);
			$('#amount').val(1);
			$('.card-bonus-amount').text((1)+' UAH');
			infoAlert('У Вас недостаточно кристаллов!');
			console.log('f');
		}else {
			$('#bonus').val(bonusHave);
			$('#bonus-amount').val(bonusHave);
			$('#amount').val(Total - bonusHave);
			$('.card-bonus-amount').text((Total - bonusHave)+' UAH');
			infoAlert('У Вас недостаточно кристаллов!');
			console.log('f');
		}
	}else if (bonusInput >= Total) {
		if (bonusHave < bonusInput || bonusInput < Total) {
			$('#bonus').val(bonusHave);
			$('#bonus-amount').val(bonusHave);
			$('#amount').val(Total - 1);
			$('.card-bonus-amount').text((Total - 1)+' UAH');
			infoAlert('У Вас недостаточно кристаллов!');
			console.log('s');
		}else {
			$('#bonus').val(Total-1);
			$('#bonus-amount').val(Total-1);
			$('#amount').val(1);
			$('.card-bonus-amount').text(1+' UAH');
			infoAlert('Колличество кристаллов не может превышать цену заказа!');
			console.log('t');	
		}
	}else {
		//$('#bonus').val(bonusInput);
		$('#bonus-amount').val(bonusInput);
		$('#amount').val(result);
		$('.card-bonus-amount').text((result)+' UAH');
		infoAlert('У Вас недостаточно кристаллов!');
		console.log('s');
	}
}

window.getMailServ = function(text){
	$('.get-val-ml ul').empty();
	for (var i = 0; i < text.data.length; i++) {
		$('.get-val-ml ul').append('<li data-val="'+i+'"><a>'+text.data[i].DescriptionRu+'</a></li>')
	}
	if($('.get-val-ml ul').is(':empty')) {
		$('.get-val-ml ul').append('<li data-val="empty"><a>Нет почтовых отделений</a></li>');
		var firstVal = $('.get-val-ml ul li').eq(0).find('a').text();
		GetData();
		$('.get-val-ml.get-val span').text(firstVal)
		$('.get-val-ml-box').slideDown('200');
	}else {
		var firstVal = $('.get-val-ml ul li').eq(0).find('a').text();
		$('.get-val-ml ul').attr('data-val', '0');
		GetData();
		$('.get-val-ml.get-val span').text(firstVal)
		$('.get-val-ml-box').slideDown('200');
	}
}