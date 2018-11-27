$(document).ready(function(){

var review = $('.text_review');
var reviewHeight = review.height();
if (reviewHeight > 200){
  review.css('height', '200px');
  $('.read_more').addClass('active');
}
$(".read_more").click(function(){

   $(this).hasClass('active') 
    review.addClass('full');
    review.css('height', 'auto');
    $('.read_more').css('display', 'none');

});

var countProduct = $('.item-footer.hover-character .product-name-wf').length;

for (var i = 0; i < countProduct; i++) {
	var charac = $('.item-footer.hover-character .product-name-wf').eq(i).html();
	if (+charac == 0) {
		$('.item-footer.hover-character .product-name-wf').eq(i).parents('.hover-character').css('padding', '0');
	}
}

$('.select').click(function() {
	 $(this).children('.shop-upper-short .select-option').slideToggle();
});

$('body').on('click', '.shop-upper-short .select-option a',function() {
	var target = $(this);
	var value = target.html();
	var a = target.parents('.select').find('span').html(value);
});

$('.mobile-menu').click(function(){
	$('.mobile-nav-menu').addClass('active');
});

$('.close-btn').click(function(){
	$('.mobile-nav-menu').removeClass('active');
});

$(document).mouseup(function (e){ // событие клика по веб-документу
	var popup = $(".mobile-nav-menu-list"); // тут указываем ID элемента
	if (!popup.is(e.target) // если клик был не по нашему блоку
	    && popup.has(e.target).length === 0) { // и не по его дочерним элементам
		$('.mobile-nav-menu').removeClass('active');
	}
});

// for video

$('.play-video').click(function(){
  $('#video').addClass('active');
});

// var firstScriptTag = $('script').first();
// var tag = document.createElement('script');
// var player;
// tag.src = 'https://www.youtube.com/iframe_api';
// $(firstScriptTag).after(tag);

// function onYouTubeIframeAPIReady(){
//   player = new YT.Player('video-frame', {
//     height: '100%',
//     width: '100%',
//     videoId: 'Pul8lw7WRsw'
//   });
// }


// for search 

$('.search').click(function(){
	$('.search-popup').addClass('active');
});


$(document).mouseup(function (e){ // событие клика по веб-документу
	var popup_search = $(".input-group-search"); // тут указываем ID элемента
	if (!popup_search.is(e.target) // если клик был не по нашему блоку
	    && popup_search.has(e.target).length === 0) { // и не по его дочерним элементам
		$('.search-popup').removeClass('active');
	}
});

// for join/reg


$('body').on('click' , '#registr' , function(){
	$('.modal-container').addClass('active');
	$('.registration').addClass('active');
	$('.login').removeClass('active');
	$('.forget-password').removeClass('active');
});

$('#login , .loginBtn , .account').click(function(){
	$('.modal-container').addClass('active');
	$('.login').addClass('active');
	$('.registration').removeClass('active');
	$('.forget-password').removeClass('active');
	$('.callback-popup').removeClass('active');
});

$('body').on('click' , '#forget_pass' , function(){
	$('.modal-container').addClass('active');
	$('.forget-password').addClass('active');
	$('.registration').removeClass('active');
	$('.callback-popup').removeClass('active');
	$('.login').removeClass('active');
	console.log(1);
});

$('body').on('click' , '.call-btn' , function(){
	$('.modal-container').addClass('active');
	$('.callback-popup').addClass('active');
	$('.forget-password').removeClass('active');
	$('.registration').removeClass('active');
	$('.login').removeClass('active');
	console.log(1);
});

$(document).mouseup(function (e){ 
  var modal_container = $(".registration, .forget-password, .login, .callback-popup"); 
  if (!modal_container.is(e.target) 
      && modal_container.has(e.target).length === 0) { 
    $('.modal-container, .modal-container-video').removeClass('active');
    modal_container.removeClass('active');
    if ( $('.modal-container-video').is('#video') ) {
      player.stopVideo();
    }
  }
});

	$('.single-point .item input').on('click', function() {
		if ($(this).hasClass('active-in')) {
			$(this).parents('.single-point').find('.item input').prop('checked', false);
			$(this).parents('.single-point').find('.item input').removeClass('active-in');
		}else{
			var checkedElement = $(this).index();
			$(this).parents('.single-point').find('.item input').removeClass('active-in');
			$(this).addClass('active-in');
			$(this).parents('.single-point').find('.item input').prop('checked', false);
			$(this).prop('checked', true);
		}
	});

	$('.form-btn-ch').on('click', function() {
		if ($('#name').val() == '' || $('#email').val() == '') {
			return false
		}
	})

	$('.form-btn-vg').on('click', function() {
		if ($('#address').val() == '') {
			return false
		}
	})

	$('header a.heart').on('click', function() {
		var urlMenu = (window.location.pathname);
		if (urlMenu == '/account/') {			
			location.reload();
			$('.modal-container').addClass('active');
			$('.login').addClass('active');
			$('.registration').removeClass('active');
			$('.forget-password').removeClass('active');
			$('.callback-popup').removeClass('active');
		}else if ($(this).hasClass('auth-heart')) {
			window.location.replace("/account/#heart");
		}else {
			$('.modal-container').addClass('active');
			$('.login').addClass('active');
			$('.registration').removeClass('active');
			$('.forget-password').removeClass('active');
			$('.callback-popup').removeClass('active');
		}
	})

	$('.btnShare').click(function(){
		elem = $(this);
		postToFeed(elem.data('title'), elem.data('desc'), elem.prop('href'), elem.data('image'));
	});

	$('.diamond-balance-box').hover(function() {
		if (!$('.hover-info-block').is(':visible')) {
			$('.hover-info-block').fadeIn(200);
		}
	}, function() {
		if ($('.hover-info-block').is(':visible')) {
			$('.hover-info-block').fadeOut(200);
		}
	});

	  var top_show = 150; // В каком положении полосы прокрутки начинать показ кнопки "Наверх"
	  var delay = 1000; // Задержка прокрутки
	    $(window).scroll(function () { // При прокрутке попадаем в эту функцию
	      /* В зависимости от положения полосы прокрукти и значения top_show, скрываем или открываем кнопку "Наверх" */
	      if ($(this).scrollTop() > top_show){
	      	$('.footer-up-btn').fadeIn(300);
	      	$('footer .call-btn').css('bottom', '120px');
	      } 
	      else{
	      	$('.footer-up-btn').fadeOut(300);
	      	$('footer .call-btn').css('bottom', '40px');
	      } 
	    });
	    $('.footer-up-btn').click(function () { // При клике по кнопке "Наверх" попадаем в эту функцию
	      /* Плавная прокрутка наверх */
	      $('body, html').animate({
	        scrollTop: 0
	      }, delay);
	  });



});

window.successAlert = function (result='Успешно!') {
	if ($('.alert-success').is(":hidden")) {
		$(".alert").hide();
		$('.alert-success .alert-message span').text(result);
		$('.alert-success .close').on('click', function() {
			clearTimeout(timerAlert);
			$(".alert-success").hide();
		})
		$(".alert-success").toggle("drop", {direction: "right"}, 200, function() {
	      window.timerAlert = setTimeout(function() {
	      	if ($('.alert-success').is(":visible")) {
	      		$(".alert-success").toggle("drop", {direction: "right"}, 200);
	      	}
	      }, 5000)
	    });
	}else {
		clearTimeout(timerAlert);
		$(".alert-success").hide();
		$('.alert-success .alert-message span').text(result);
		$(".alert-success").toggle("drop", {direction: "right"}, 200, function() {
	      window.timerAlert = setTimeout(function() {
	      	if ($('.alert-success').is(":visible")) {
	      		$(".alert-success").toggle("drop", {direction: "right"}, 200);
	      	}
	      }, 5000)
	    });
	}
}

window.dangerAlert = function (result='Ошибка!') {
	if ($('.alert-danger').is(":hidden")) {
		$(".alert").hide();
		$('.alert-danger .alert-message span').text(result);
		$('.alert-danger .close').on('click', function() {
			clearTimeout(timerAlert);
			$(".alert-danger").hide();
		})
		$(".alert-danger").toggle("drop", {direction: "right"}, 200, function() {
	      window.timerAlert = setTimeout(function() {
	      	if ($('.alert-danger').is(":visible")) {
	      		$(".alert-danger").toggle("drop", {direction: "right"}, 200);
	      	}
	      }, 5000)
	    });
	}else {
		clearTimeout(timerAlert);
		$(".alert-danger").hide();
		$('.alert-danger .alert-message span').text(result);
		$(".alert-info").toggle("drop", {direction: "right"}, 200, function() {
	      window.timerAlert = setTimeout(function() {
	      	if ($('.alert-info').is(":visible")) {
	      		$(".alert-info").toggle("drop", {direction: "right"}, 200);
	      	}
	      }, 5000)
	    });
	}
}

window.infoAlert = function (result='Что-то пошло не так!') {
	if ($('.alert-info').is(":hidden")) {
		$(".alert").hide();
		$('.alert-info .alert-message span').html(result);
		$('.alert-info .close').on('click', function() {
			clearTimeout(timerAlert);
			$(".alert-info").hide();
		})
		$(".alert-info").toggle("drop", {direction: "right"}, 200, function() {
	      window.timerAlert = setTimeout(function() {
	      	if ($('.alert-info').is(":visible")) {
	      		$(".alert-info").toggle("drop", {direction: "right"}, 200);
	      	}
	      }, 5000)
	    });
	}else {
		clearTimeout(timerAlert);
		$(".alert-info").hide();
		$('.alert-info .alert-message span').html(result);
		$(".alert-info").toggle("drop", {direction: "right"}, 200, function() {
	      window.timerAlert = setTimeout(function() {
	      	if ($('.alert-info').is(":visible")) {
	      		$(".alert-info").toggle("drop", {direction: "right"}, 200);
	      	}
	      }, 5000)
	    });
	}
}
