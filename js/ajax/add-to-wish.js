$(document).ready(function() {
	var urlMenu = (window.location.pathname);
	if (urlMenu == '/account/') {
		console.log('cl');
		$.cookie("7BKvyNLx5tNyZXnp", 0, {
		   expires : 7,
		   path : '/'
		});
	}
	ProductLengChanWish()

	$('body').on('click', '.icon.heart.auth-heart', function () {
		$.cookie("wish", 1, {
		   expires : 7,
		   path : '/'
		});
	});

	if (urlMenu == '/account/' && $.cookie("wish") == 1) {
		console.log('rob');
		$('#liked').addClass('active');
		$('.info-box .icon.heart').parents('.block').addClass('active');
		$('#account, #history').removeClass('active');
		$('.info-box .icon.user, .info-box .icon.clipboard').parents('.block').removeClass('active');
		$.cookie("wish", 0, {
		   expires : 7,
		   path : '/'
		});
	}


	$('.c-remove-item.f-wish').on('click', function() {
		$(this).parents(".list-content").hide(200, function() {
			
			$.when($(this).remove()).then( function () {
				if (!$('.list-content').is('.product-wish-ch')) {
					console.log('23');
					$('#liked .list-item').append('<p class="empty-box">Нет товаров</p>')
				}
			} );
		});
		
	});
});

function ProductLengChanWish() {
	if($.cookie("7BKvyNLx5tNyZXnp") && $.cookie("7BKvyNLx5tNyZXnp") != 0) {
		var countCo = $.cookie("7BKvyNLx5tNyZXnp");
		countCo = countCo.split(",");
		$(".wish-idnt-num").text(countCo.length);
		$(".wish-idnt-num").css("display", "flex");
		console.log(countCo);
	}else {
		$(".wish-idnt-num").css("display", "none");
	}
}

window.addToDataWish=function(product_id) {
	var headrIc = $('.icon.heart');
	var prdIc = $('[data-img="'+product_id+'"]');
	if($.cookie("7BKvyNLx5tNyZXnp")) {
		alredy = false;
		var countCo = $.cookie("7BKvyNLx5tNyZXnp");
		countCo = countCo.split(",");
		for (var i=0; i < countCo.length; i++) {
			if (countCo[i] == product_id) {
				alredy = true;
				break;
			}
		}
		if (alredy === true) {
			infoAlert('Данный товар уже добавлен в избранные!');
		}else {
			countCo.push(product_id);
			countCo = countCo.join(',')
			$.cookie("7BKvyNLx5tNyZXnp", countCo, {
			   expires : 7,
			   path : '/'
			});
			successAlert('Товар успешно добавлен в избранные.');
			flyToElementWish(prdIc, headrIc);
		}
	}else {
		$.cookie("7BKvyNLx5tNyZXnp", product_id, {
		   expires : 7,
		   path : '/'
		});
		successAlert('Товар успешно добавлен в избранные.');
		flyToElementWish(prdIc, headrIc);
	}
	ProductLengChanWish();
}

function flyToElementWish(flyer, flyingTo) {
    var $func = $(this);
    var divider = 3;
    var flyerClone = $(flyer).clone();
    $(flyerClone).css({position: 'absolute', 'z-index': '9999999', top: $(flyer).offset().top + "px", left: $(flyer).offset().left + "px", opacity: 1, 'z-index': 1000});
    $('body').append($(flyerClone));
    var gotoX = $(flyingTo).offset().left + ($(flyingTo).width() / 3) - ($(flyer).width()/divider)/3;
    var gotoY = $(flyingTo).offset().top + ($(flyingTo).height() / 3) - ($(flyer).height()/divider)/3;
    $(flyerClone).css("max-width", "150px")
    $(".wiggle-css-hover").addClass('wiggle-css-lp');
    setTimeout(function() {
    	$(".wiggle-css-hover").removeClass('wiggle-css-lp');
    }, 1500)
    $(flyerClone).animate({
        opacity: 0.4,
        left: gotoX,
        top: gotoY,
        width: $(flyer).width()/divider,
        height: $(flyer).height()/divider
    }, 500,
    function () {
        $(flyerClone).fadeOut(50, function () {
            $(flyerClone).remove();
            $(".wish-idnt-num").animate({
				"width": ["27px", "swing"],
				"height": ["27px", "swing"]
			}, 100, function() {
				$(".wish-idnt-num").animate({
					"width": ["20px", "swing"],
					"height": ["20px", "swing"]
				}, 100)
			})
        });
    });
}
