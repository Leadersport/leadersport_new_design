		var AllProducts = 0,
    	ProductNameData = [],
    	ProductPriceData = [],
    	ProductLinkData = [],
    	ProductLengData = [],
    	ProductImgData = [],
    	ProductCount = 0,
    	ProductAttr = [],
    	ProductData = [ProductNameData, ProductPriceData, ProductLengData, ProductImgData, ProductLinkData, ProductCount, ProductAttr];
$(document).ready(function() {
	//Add to Cart
	$(document).on("click", ".wf-hover-cart", function() {
		var listpcc = JSON.parse($.cookie('EiQ3rUEmRBH1jRpn'));
		$(".cart-idnt-num").css("display", "flex");
			var productName = $(this).parents(".product-wf").find(".name a").text(),
				productPrice = $(this).parents(".product-wf").find(".price[data-price]").attr("data-price"),
				productLink = $(this).parents(".product-wf").find(".name a").attr("href"),
				productImg = $(this).parents(".product-wf").find(".item-body img").attr("src"),
				flyerP =  $(this).parents(".product-wf").find(".item-body img"),
				flyingToP = $(".cart:visible");
				console.log(productPrice);
			var prodcutLeng = addToData(productName, productPrice, productLink, productImg, 1, 0);
			flyToElement(flyerP, flyingToP);
		ProductLengChan();
		successAlert('Товар успешно добавлен в корзину.');
	})
	//AddToCartLeng
	$(".single-add-to-card-btn").on("click", function() {
		var listpcc = JSON.parse($.cookie('EiQ3rUEmRBH1jRpn'));
		var productName = $(".product-name-wf").attr('data-name'),
			productInput = $(".quantity-block .quantity-num").val(),
			productPrice = $(".product-price-wf").attr("data-price"),
			productImg = $(".product-img").find("img").eq(0).attr("src"),
			productLink = document.location.href,
			productAttr = [],
			flyerP =  $(".product-img").find("img:visible"),
			flyingToP = $(".cart:visible");
			characterCount = $('.character .item:not([style])').length - 1;
		for (var i=0; i < characterCount; i++) {
			var charackon = $('.character .item:not([style])').eq(i).find('select').val();
			productAttr.push(charackon);
		}
		productAttr = productAttr.join(', ');
		console.log(productAttr);
		if(listpcc == 0  || listpcc[5] <= 0) {
			var prodcutLeng = addToData(productName, productPrice, productLink, productImg, productInput, productAttr);
		}else {
			var prodcutLeng = changeCart(productName, productPrice, productLink, productImg, productInput, productAttr);
				$(".cart-idnt-num").css("display", "flex");
				$(".cart-idnt-num").text(listpcc[5]);
			
		}
		flyToElement(flyerP, flyingToP);
		successAlert('Товар успешно добавлен в корзину.');
	})
	//Remove from Cart
	$("body").on("click", '.c-remove-item.f-cart', function() {
		var productName = $(this).parents(".list-content").find(".name").text();
		$(this).parents(".list-content").hide(200, function() {
			$(this).remove();
			if($(".cart-table-wf").is(':empty')) {
				window.location.replace("/shop");
			}
		}); 
		var prodcutLeng = removeFrmoCart(productName);
		AllProducts = prodcutLeng;
		$(".cart-idnt-num").text(AllProducts);
		successAlert('Товар успешно удален из корзины.');
	})

	//Add product Button
	$("body").on("click", '.card-btn-plus', function() {
		console.log('add');
		var listpcc = JSON.parse($.cookie('EiQ3rUEmRBH1jRpn'));
		var productName = $(this).parents(".list-content").find(".name").text(),
			lengInp = $(this).parents(".list-content").find(".card-input-quantity").val();
		pluseButton(productName, lengInp);

	})
	//Misu cart Button
	$("body").on("click", '.card-btn-minus', function() {
		console.log('rem');
		var listpcc = JSON.parse($.cookie('EiQ3rUEmRBH1jRpn'));
		var productName = $(this).parents(".list-content").find(".name").text(),
			lengInp = $(this).parents(".list-content").find(".card-input-quantity").val();
		minusButton(productName, lengInp);

	})

	$('header span.cart').on('click', function() {
		var listpcc = JSON.parse($.cookie('EiQ3rUEmRBH1jRpn'));
		if (listpcc[5] <= 0 || listpcc == 0) {
			infoAlert('Корзина пуста. <a href="/shop">Перейти в магазин.</a>');
		}else {
			window.location.replace("/cart");
		}
	})

	$("body").on("click", function() {
		var listpcc = JSON.parse($.cookie('EiQ3rUEmRBH1jRpn'));
		if(listpcc != 0) {
			if(listpcc[5] <= 0) {
				$(".cart-idnt-num").css("display", "none");
			}else {
				$(".cart-idnt-num").text(listpcc[5]);
				$(".cart-idnt-num").css("display", "flex");
			}
		}
	})

	$("body").on("click", function() {
		var priceC = JSON.parse($.cookie('EiQ3rUEmRBH1jRpn'));
		var priceS = 0;
		if (priceC != null && priceC != 0) {
			for(var i=0; i < priceC[1].length; i++) {
				priceS += (+priceC[1][i] * +priceC[2][i]);
			}

			$.cookie('allAmount', JSON.stringify(priceS), {
				expires: 30,
				path: '/'
			});
		}
	})

	var urlMenu = (window.location.pathname);
	var pcdata = JSON.parse($.cookie('EiQ3rUEmRBH1jRpn'));
	if(pcdata == 0  || pcdata[5] <= 0) {
		if (urlMenu == '/cart') {
			window.location.replace("/shop");
		}
	}
})

function ProductLengChan() {
	console.log('a');
	var listpcc = JSON.parse($.cookie('EiQ3rUEmRBH1jRpn'));
	if(listpcc != 0) {
		if(listpcc[5] <= 0) {
			console.log('b');
			$(".cart-idnt-num").css("display", "none");
		}else {
			console.log('c');
			$(".cart-idnt-num").text(listpcc[5]);
			$(".cart-idnt-num").css("display", "flex");
			console.log(listpcc[5]);
		}
	}
}

function flyToElement(flyer, flyingTo) {
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
            $(".cart-idnt-num").animate({
				"width": ["27px", "swing"],
				"height": ["27px", "swing"]
			}, 100, function() {
				$(".cart-idnt-num").animate({
					"width": ["20px", "swing"],
					"height": ["20px", "swing"]
				}, 100)
			})
        });
    });
}

function addToData(name, price, link, img, leng = 1, attr = 0) {
	ProductDataCookie = JSON.parse($.cookie('EiQ3rUEmRBH1jRpn'));
	console.log(ProductDataCookie);
	if (ProductDataCookie == 0  || ProductDataCookie[5] <= 0) {
		ProductData[0][0] = name  + '('+attr+')';
		if (attr != 0) {
			console.log(attr);
			ProductData[0][0] = name  + '('+attr+')';
		}else {
			ProductData[0][0] = name;
		}
		ProductData[1][0] = price;
		ProductData[2][0] = +leng;
		ProductData[3][0] = img;
		ProductData[4][0] = link;

		ProductData[5] = +leng;

	}else{
		var nameLeng = ProductDataCookie[0].length,
			nameChange = 0,
			productsLeng = 0;

		for (var i=0; i < ProductDataCookie[0].length; i++) {
			var checPN = ProductDataCookie[0][i];
			if (checPN == name) {
				nameChange = i;
				break;
			}else {
				nameChange = false;
			}
		}


		if(nameChange === false) {
			if (attr != 0) {
				console.log(attr);
				ProductDataCookie[0][nameLeng] = name;
			}else {
				ProductDataCookie[0][nameLeng] = name;
			}
			ProductDataCookie[1][nameLeng] = price;
			ProductDataCookie[2][nameLeng] = +leng;
			ProductDataCookie[3][nameLeng] = img;
			ProductDataCookie[4][nameLeng] = link;
		}else {
			if (attr != 0) {
				console.log(attr);
				ProductDataCookie[0][nameChange] = name + '('+attr+')';
			}else {
				ProductDataCookie[0][nameChange] = name;
			}
			ProductDataCookie[1][nameChange] = price;
			ProductDataCookie[2][nameChange] += +leng;
			ProductDataCookie[3][nameChange] = img;
			ProductDataCookie[4][nameChange] = link;
		}

		for (var i=0; i < ProductDataCookie[0].length; i++) {
			productsLeng += +ProductDataCookie[2][i]
		}ProductDataCookie

		ProductDataCookie[5] = productsLeng;

		ProductData = ProductDataCookie;

		
	}


	//Cookie
	$.cookie('EiQ3rUEmRBH1jRpn', JSON.stringify(ProductData), {
		expires: 30,
		path: '/'
	});

	return ProductData[5];
}

function removeFrmoCart (name) {
	var listpc = JSON.parse($.cookie('EiQ3rUEmRBH1jRpn'));
	var nameLeng = listpc[0].length,
		nameChange = 0,
		productsLeng = 0;

	for (var i=0; i < listpc[0].length; i++) {
		var checPN = listpc[0][i];
		if (checPN == name) {
			nameChange = i;
			break;
		}else {
			nameChange = false;
		}
	}

	if(nameChange === false) {
		return false;
	}else if (nameChange === 0) {
		listpc[5] -= listpc[2];
		listpc[0].splice(0, 1);
		listpc[1].splice(0, 1);
		listpc[2].splice(0, 1);
		listpc[3].splice(0, 1);
		listpc[4].splice(0, 1);
	}else {
		listpc[5] -= listpc[2];
		listpc[0].splice(nameChange, nameChange);
		listpc[1].splice(nameChange, nameChange);
		listpc[2].splice(nameChange, nameChange);
		listpc[3].splice(nameChange, nameChange);
		listpc[4].splice(nameChange, nameChange);
	}

	for (var i=0; i < listpc[0].length; i++) {
		productsLeng += +listpc[2][i];
	}
	listpc[5] = productsLeng;
	//Cookie
	$.cookie('EiQ3rUEmRBH1jRpn', JSON.stringify(listpc), {
		expires: 30,
		path: '/'
	});

	return listpc[5];
}

function changeCart(name, price, link, img, leng = 1, attr = 0) {
	var listpcc = JSON.parse($.cookie('EiQ3rUEmRBH1jRpn'));
	var checkProduct = find(listpcc[0], name),
		nameLeng = listpcc[0].length,
		nameChange = 0,
		productsLeng = 0;

	for (var i=0; i < listpcc[0].length; i++) {
		var checPN = listpcc[0][i];
		if (checPN == name) {
			nameChange = i;
			break;
		}else {
			nameChange = false;
		}
	}


	if(nameChange === false) {
		if (attr != 0) {
			listpcc[0][nameLeng] = name + '('+attr+')';
		}else {
			listpcc[0][nameLeng] = name;
		}
		listpcc[1][nameLeng] = price;
		listpcc[2][nameLeng] = +leng;
		listpcc[3][nameLeng] = img;
		listpcc[4][nameLeng] = link;
		listpcc[6][nameLeng] = attr;
	}else {
		if (attr != 0) {
			listpcc[0][nameChange] = name + '('+attr+')';
		}else {
			listpcc[0][nameChange] = name;
		}
		listpcc[1][nameChange] = price;
		listpcc[2][nameChange] += +leng;
		listpcc[3][nameChange] = img;
		listpcc[4][nameChange] = link;
	}

	for (var i=0; i < listpcc[0].length; i++) {
		productsLeng += +listpcc[2][i];
	}

	listpcc[5] = productsLeng;

	//Cookie
	$.cookie('EiQ3rUEmRBH1jRpn', JSON.stringify(listpcc), {
		expires: 30,
		path: '/'
	});
}

function pluseButton(name, leng) {
	var listpcc = JSON.parse($.cookie('EiQ3rUEmRBH1jRpn'));
	var nameLeng = listpcc[0].length,
		nameChange = 0,
		productsLeng = 0;

	for (var i=0; i < listpcc[0].length; i++) {
		var checPN = listpcc[0][i];
		if (checPN == name) {
			nameChange = i;
			break;
		}else {
			nameChange = false;
		}
	}


	if(nameChange === false) {
		listpcc[2][nameLeng] += 1;
	}else {
		listpcc[2][nameChange] += 1;
	}

	for (var i=0; i < listpcc[0].length; i++) {
		productsLeng += +listpcc[2][i]
	}

	listpcc[5] = productsLeng;

	//Cookie
	$.cookie('EiQ3rUEmRBH1jRpn', JSON.stringify(listpcc), {
		expires: 30,
		path: '/'
	});

}

function minusButton(name, leng) {
	if(+leng == 1) {
		return false;
	}
	var listpcc = JSON.parse($.cookie('EiQ3rUEmRBH1jRpn'));
	var nameLeng = listpcc[0].length,
		nameChange = 0,
		productsLeng = 0;

	for (var i=0; i < listpcc[0].length; i++) {
		var checPN = listpcc[0][i];
		if (checPN == name) {
			nameChange = i;
			break;
		}else {
			nameChange = false;
		}
	}

	if(nameChange === false) {
		listpcc[2][nameLeng] -= 1;
	}else {
		listpcc[2][nameChange] -= 1;
	}

	for (var i=0; i < listpcc[0].length; i++) {
		productsLeng += +listpcc[2][i]
	}

	listpcc[5] = productsLeng;

	//Cookie
	$.cookie('EiQ3rUEmRBH1jRpn', JSON.stringify(listpcc), {
		expires: 30,
		path: '/'
	});

}