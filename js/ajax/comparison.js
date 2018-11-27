jQuery(document).ready(function($) {
	$('.wf-hover-com-single').on('click',  function() {
		var productSlug = $('.product-name-wf').attr('data-slug');
		var categorySlug = $('.product-name-wf').attr('data-caty');
		var prdIc = $('.product-img-box img');
		getComparison(productSlug, categorySlug, prdIc);
		
	});

	$('.wf-hover-com').on('click',  function() {
		var productSlug  = $(this).parents('.product-wf').find('.product-name-wf').attr('data-name');
		var categorySlug = $(this).parents('.product-wf').find('.product-name-wf').attr('data-caty');
		if (categorySlug == undefined || categorySlug == '') {
			infoAlert('Нет категории для стравнения!');
		}else {
			console.log(productSlug+categorySlug);
			var prdIc = $(this).parents('.product-wf').find('.product-img-box img');
			getComparison(productSlug, categorySlug, prdIc);
		}
	});

	$('header span.balance').on('click', function() {
		var listpcc = JSON.parse($.cookie('2BcPpDBHSPv6jezf'));
		if (listpcc == null || listpcc == 0) {
			infoAlert('Добавьте товар в сравнения.');
		}else {
			window.location.replace("/compare");
		}
	})

	if (!$.cookie('2BcPpDBHSPv6jezf')) {
		$.cookie('2BcPpDBHSPv6jezf', JSON.stringify(0), {
			expires: 30,
			path: '/'
		});
		ProductLengChanCom();
	}else {
		ProductLengChanCom();
	}

	var urlMenu = (window.location.pathname);
	var pcdata = JSON.parse($.cookie('2BcPpDBHSPv6jezf'));
	if(pcdata == 0  || pcdata[5] <= 0) {
		if (urlMenu == '/compare') {
			window.location.replace("/shop");
		}
	}
});

function getComparison(productSlug, categorySlug, prdIc) {
	var productInfo = JSON.parse($.cookie('2BcPpDBHSPv6jezf'));
	var haveProduct = false;
	if (productInfo != null && productInfo != 0) {
		var productCount = productInfo.length;
		for (var i=0; i < productCount; i++) {
			if (productSlug == productInfo[i][1]) {
				haveProduct = i;
				break;
			}
		}

		if(haveProduct !== false) {
			infoAlert('Данный продукт уже добавлен в сравнения!');
			ProductLengChanCom();
		}else {
			successAlert('Товар успешно добавлен в сравнения.');
			var ProductData=[];
			var ProductsData=productInfo;
			ProductData[0] = categorySlug;
			ProductData[1] = productSlug;
			ProductsData[productCount] = ProductData;
			$.cookie('2BcPpDBHSPv6jezf', JSON.stringify(ProductsData), {
				expires: 30,
				path: '/'
			});
			console.log(ProductsData);
			ProductLengChanCom();
			var headrIc = $('.icon.balance');
			flyToElementCom(prdIc, headrIc);
		}
	}else{
		successAlert('Товар успешно добавлен в сравнения.');
		var ProductData=[];
		var ProductsData=[];
		ProductData[0] = categorySlug;
		ProductData[1] = productSlug;
		ProductsData[0] = ProductData;
		$.cookie('2BcPpDBHSPv6jezf', JSON.stringify(ProductsData), {
			expires: 30,
			path: '/'
		});
		console.log(ProductsData);
		ProductLengChanCom();
		var headrIc = $('.icon.balance');
		flyToElementCom(prdIc, headrIc);
	}
}

function ProductLengChanCom() {
	if($.cookie("2BcPpDBHSPv6jezf") && $.cookie("2BcPpDBHSPv6jezf") != 0) {
		var productInfo = JSON.parse($.cookie('2BcPpDBHSPv6jezf'));
		var productCount = productInfo.length;
		if(productCount != 0) {
			$(".com-idnt-num").text(productCount);
			$(".com-idnt-num").css("display", "flex");
		}else{
			$(".com-idnt-num").css("display", "none");
		}
		console.log(productCount);
	}else {
		$(".com-idnt-num").css("display", "none");
	}
}

function flyToElementCom(flyer, flyingTo) {
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
            $(".com-idnt-num").animate({
				"width": ["27px", "swing"],
				"height": ["27px", "swing"]
			}, 100, function() {
				$(".com-idnt-num").animate({
					"width": ["20px", "swing"],
					"height": ["20px", "swing"]
				}, 100)
			})
        });
    });
}

window.CompGet = function(compData, userData) {
	$('.compare-count').text(compData.length);
	for (var  i=0; i < compData.length; i++) {
		var categoryName = compData[i][1].title;
		var categorySlug = compData[i][1].slug;
		var productName = compData[i][0].title;
		var productId = compData[i][0].id;
		var productSlug = compData[i][0].slug;
		var productPrice = compData[i][0].price;
		var productImg = compData[i][0].image_url_name;

		if($('*').is('#'+categorySlug)) {
			if(userData == 0) {
				$('#'+categorySlug).append('<div class="col-3 product-wf" data-product="'+productSlug+'"><div class="list-item"><div class="item-head"><span class="price" data-price="'+productPrice+'">'+productPrice+' UAH</span><span class="icon"><a class="product-rem"></a></span></div><div class="item-body"><a href="/shop/'+productSlug+'"><img data-img="'+productId+'" src="../uploads/'+productImg+'" alt=""></a></div><div class="item-footer"><div class="name-func"><h4 class="name"><a href="/shop/'+categorySlug+'">'+productName+'</a></h4><a class="icon cart wf-hover-cart"></a><a onclick="infoAlert(&#39;Для добавление в список желаний пожалуйста авторизуйтесь!&#39;)" class="icon heart wf-hover-wish"></a></div><ul class="info"></ul></div></div></div>');
			}else {
				$('#'+categorySlug).append('<div class="col-3 product-wf" data-product="'+productSlug+'"><div class="list-item"><div class="item-head"><span class="price" data-price="'+productPrice+'">'+productPrice+' UAH</span><span class="icon"><a class="product-rem"></a></span></div><div class="item-body"><a href="/shop/'+productSlug+'"><img data-img="'+productId+'" src="../uploads/'+productImg+'" alt=""></a></div><div class="item-footer"><div class="name-func"><h4 class="name"><a href="/shop/'+categorySlug+'">'+productName+'</a></h4><a class="icon cart wf-hover-cart"></a><a  onclick="selectedProduct('+userData+' , '+productId+')" class="icon heart wf-hover-wish"></a></div><ul class="info"></ul></div></div></div>');
			}

		}else {
			if(i == 0) {
				$('.page-text').after('<div id="'+categorySlug+'" class="content slider-container active">');
				$(".page-switch").append('<a class="btn active" data-content="#'+categorySlug+'"><i>'+categoryName+' </i><span class="delete"></span></a>');
				if(userData == 0) {
					$('#'+categorySlug).append('<div class="col-3 product-wf" data-product="'+productSlug+'"><div class="list-item"><div class="item-head"><span class="price" data-price="'+productPrice+'">'+productPrice+' UAH</span><span class="icon"><a class="product-rem"></a></span></div><div class="item-body"><a href="/shop/'+productSlug+'"><img data-img="'+productId+'" src="../uploads/'+productImg+'" alt=""></a></div><div class="item-footer"><div class="name-func"><h4 class="name"><a href="/shop/'+categorySlug+'">'+productName+'</a></h4><a class="icon cart wf-hover-cart"></a><a onclick="infoAlert(&#39;Для добавление в список желаний пожалуйста авторизуйтесь!&#39;)" class="icon heart wf-hover-wish"></a></div><ul class="info"></ul></div></div></div>');
				}else {
					$('#'+categorySlug).append('<div class="col-3 product-wf" data-product="'+productSlug+'"><div class="list-item"><div class="item-head"><span class="price" data-price="'+productPrice+'">'+productPrice+' UAH</span><span class="icon"><a class="product-rem"></a></span></div><div class="item-body"><a href="/shop/'+productSlug+'"><img data-img="'+productId+'" src="../uploads/'+productImg+'" alt=""></a></div><div class="item-footer"><div class="name-func"><h4 class="name"><a href="/shop/'+categorySlug+'">'+productName+'</a></h4><a class="icon cart wf-hover-cart"></a><a  onclick="selectedProduct('+userData+' , '+productId+')" class="icon heart wf-hover-wish"></a></div><ul class="info"></ul></div></div></div>');
				}

			}else{
				$('.page-text').after('<div id="'+categorySlug+'" class="content slider-container">');
				$(".page-switch").append('<a class="btn" data-content="#'+categorySlug+'"><i>'+categoryName+'</i><span class="delete"></span></a>');
				if(userData == 0) {
					$('#'+categorySlug).append('<div class="col-3 product-wf" data-product="'+productSlug+'"><div class="list-item"><div class="item-head"><span class="price" data-price="'+productPrice+'">'+productPrice+' UAH</span><span class="icon"><a class="product-rem"></a></span></div><div class="item-body"><a href="/shop/'+productSlug+'"><img data-img="'+productId+'" src="../uploads/'+productImg+'" alt=""></a></div><div class="item-footer"><div class="name-func"><h4 class="name"><a href="/shop/'+categorySlug+'">'+productName+'</a></h4><a class="icon cart wf-hover-cart"></a><a onclick="infoAlert(&#39;Для добавление в список желаний пожалуйста авторизуйтесь!&#39;)" class="icon heart wf-hover-wish"></a></div><ul class="info"></ul></div></div></div>');
				}else {
					$('#'+categorySlug).append('<div class="col-3 product-wf" data-product="'+productSlug+'"><div class="list-item"><div class="item-head"><span class="price" data-price="'+productPrice+'">'+productPrice+' UAH</span><span class="icon"><a class="product-rem"></a></span></div><div class="item-body"><a href="/shop/'+productSlug+'"><img data-img="'+productId+'" src="../uploads/'+productImg+'" alt=""></a></div><div class="item-footer"><div class="name-func"><h4 class="name"><a href="/shop/'+categorySlug+'">'+productName+'</a></h4><a class="icon cart wf-hover-cart"></a><a  onclick="selectedProduct('+userData+' , '+productId+')" class="icon heart wf-hover-wish"></a></div><ul class="info"></ul></div></div></div>');
				}
			}
		}

		if (compData[i][2].length != 0) {

			for (var j=0; j < compData[i][2].length; j++) {
				var productFilterName = compData[i][2][j].title;
				var productFilterValue = compData[i][3][j].title;
				var copyCaty = 0;
				var count = ($('#'+categorySlug+' [data-product="'+productSlug+'"] ul.info li').length);
				for (var k=0; k < count ; k++) {
					if ($('#'+categorySlug+' [data-product="'+productSlug+'"] ul.info li').eq(k).attr('data-attr') == productFilterValue) {
					var oldValue = $('#'+categorySlug+' [data-product="'+productSlug+'"] ul.info li').eq(k).find('span').text();
					$('#'+categorySlug+' [data-product="'+productSlug+'"] ul.info li').eq(k).find('span').text(oldValue+', '+productFilterName);
					copyCaty=1;
					}
				}
				if(copyCaty == 0) {
					$('#'+categorySlug+' [data-product="'+productSlug+'"] ul.info').append('<li data-attr="'+productFilterValue+'">'+productFilterValue+': <span>'+productFilterName+'</span></li>')
				}
			}
		}else {
			$('#'+categorySlug+' [data-product="'+productSlug+'"] ul.info').append('<li style="display: none;" data-attr="Отсутствует">Отсутствует: <span>Отсутствует</span></li>')
		}
	}

	var CatyCount = $('.slider-container').length;
	for (var i=0; i < CatyCount; i++) {
		var CatyCountVal  = $('.slider-container').eq(i).attr('id');
		var ProductsCount = $('.slider-container').eq(i).find('.product-wf').length;
		window.filterCount = 0;
		window.filterL = 0;
		for (var j=0; j < ProductsCount; j++) {
			var ProductCountVal    = $('#'+CatyCountVal+' .product-wf').eq(j).attr('data-product');
			var ProductCountFilter = $('#'+CatyCountVal+' .product-wf').eq(j).find('ul.info li').length;
			if (ProductCountFilter > filterCount) {
				window.filterCount = ProductCountFilter;
				window.filterL = ProductCountVal;
			}
		}
		console.log(filterCount);
		for (var k=0; k < ProductsCount; k++) {
			for (var z=0; z < filterCount; z++) {
				var filterName   = $('.product-wf[data-product="'+filterL+'"] ul.info li').eq(z).attr('data-attr');
				var filterChName = $('.slider-container').eq(i).find('.product-wf').eq(k).find('ul.info li').eq(z).attr('data-attr');
				console.log(filterName+" "+filterChName);
				if (filterName != filterChName && z == 0) {
					if (z != 0) {
						z--
					}
					$('.slider-container').eq(i).find('.product-wf').eq(k).find('ul.info li:eq(0)').before('<li data-attr="'+filterName+'">'+filterName+': <span>Отсутствует</span></li>')
				}else if (filterName != filterChName || filterChName == undefined) {
					$('.slider-container').eq(i).find('.product-wf').eq(k).find('ul.info li:eq('+(z-1)+')').after('<li data-attr="'+filterName+'">'+filterName+': <span>Отсутствует</span></li>')
				}
			}
		}
	}


	for (var  n=0; n < compData.length; n++) {
		var productI = compData[n][0].slug;
		for (var i=0; i < compData[n][4].length; i++) {
			var productE = compData[n][4][i].title;
			var productV = compData[n][5][i].value;
			if (productV == null) {
				$('[data-product="'+productI+'"] ul.info').append('<li data-attr="'+productE+'">'+productE+': <span>Отсутствует</span></li>');
			}else {
				$('[data-product="'+productI+'"] ul.info').append('<li data-attr="'+productE+'">'+productE+': <span>'+productV+'</span></li>');
			}
		}
		
	}

}

$('body').on('click', '.page-switch .delete', function() {
	var catySlug = $(this).parents('.btn').attr('data-content');
	catySlug = catySlug.slice(1);
	$('.slider-container#'+catySlug).remove();
	$(this).parents('.btn').remove();

	var dataProduct = JSON.parse($.cookie('2BcPpDBHSPv6jezf'));
	console.log('y'+dataProduct.length);
	for (var i=0; i < dataProduct.length; i++) {
		console.log('cek'+i);
		if(dataProduct[i][0] == catySlug) {
			console.log(i);
			if(i == 0){
				dataProduct.shift();
			}else{
				dataProduct.splice(i, i);
			}
			$.cookie('2BcPpDBHSPv6jezf', JSON.stringify(dataProduct), {
				expires: 30,
				path: '/'
			});
				i--
		}
	}

	$(".page-switch .btn").eq(0).addClass('active');
	$('.compare-page-dyn .slider-container').eq(0).addClass('active');
	$('.compare-count').text(dataProduct.length);
	if(dataProduct.length == 0) {
		setTimeout(function() {
			window.location.replace("/shop");
		}, 300)
	}

	successAlert('Товар успешно удален из сравнений.');
});

$('body').on('click', '.slider-container .product-rem', function() {
	var prodSlug = $(this).parents('.col-3').attr('data-product');
	var catySl = $(this).parents('.slider-container').attr('id');
	$(this).parents('.slider-container').remove();
	 $(this).parents('.col-3').remove();

	var dataProduct = JSON.parse($.cookie('2BcPpDBHSPv6jezf'));
	for (var i=0; i < dataProduct.length; i++) {
		if(dataProduct[i][1] == prodSlug) {
			console.log(i);
			if(i == 0){
				dataProduct.shift();
			}else{
				dataProduct.splice(i, i);
			}
			$.cookie('2BcPpDBHSPv6jezf', JSON.stringify(dataProduct), {
				expires: 30,
				path: '/'
			});
			if(i !=0) {
				i--
			}
			
		}
	}

	if ($(this).parents('.slider-container').empty()) {
		console.log('hhh');
		$('.page-switch .btn[data-content="#'+catySl+'"]').remove();
	}

	$(".page-switch .btn").eq(0).addClass('active');
	$('.compare-page-dyn .slider-container').eq(0).addClass('active');
	$('.compare-count').text(dataProduct.length);
	if(dataProduct.length == 0) {
		setTimeout(function() {
			window.location.replace("/shop");
		}, 300)
	}

	successAlert('Товар успешно удален из сравнений.');
});