$(document).ready(function() {
	if ($.cookie('EiQ3rUEmRBH1jRpn')) {
		var listpc = JSON.parse($.cookie('EiQ3rUEmRBH1jRpn'));
		var Products = '';
		if (listpc != null && listpc != 0) {
			for(var i=0; i < listpc[0].length; i++) {
				var productName = listpc[0][i],
					productPrice = listpc[1][i],
					productLength = listpc[2][i],
					productImg = listpc[3][i],
					productLink = listpc[4][i],
					productAttr = listpc[6][i];
				if (productLength <= 9) {
					productLength = "0" + productLength
				}
				console.log(listpc);
				var	productCartTR = '<div class="list-content"> 	<div class="product"> 		<a href="'+productLink+'"> 			<img class="wish-list-img" src="'+productImg+'" alt=""> 		</a> 	</div> 	<span class="name">'+productName+'</span> 	<div class="quantity-block"> 		<button class="quantity-arrow-minus card-btn-minus" type="button"> </button> 		<input class="quantity-num card-input-quantity" type="number" value="'+productLength+'"> 		<button class="quantity-arrow-plus card-btn-plus" type="button"> </button> 	</div> 	<p class="price" data-price="'+productPrice+'"><span>'+productPrice+'</span> UAH</p> 	<span class="delete c-remove-item f-cart"><img src="svg/delete-button-grey.svg"></span> </div>';
				productLink = productLink.replace('https://leadersport.com.ua/shop/', '');
				productImg = productImg.replace('../uploads/', '');
				var ProductsTm = productName+'|'+productLength+'|'+productPrice+'|'+productImg+'|'+productLink+'<br>';
				$(".cart-table-wf").append(productCartTR);
				Products += ProductsTm;

				var productListLen = listpc[0].length,
					productQuanAll = 0,
					ProductQuan = 0,
					ProductPrice5 = 0,
					productQuan5 = 0,
					productPriceAll = 0;
				for (var j = 0; j < productListLen; j++) {
					ProductQuan = $(".cart-table-wf .list-content").eq(j).find("input").val();
					ProductPrice5 = $(".cart-table-wf .list-content").eq(j).find(".price").attr("data-price");
					productQuan5 = +ProductQuan;
					productPriceAll += +ProductPrice5 * productQuan5;
					productQuanAll += productQuan5;
				}

				$(".card-subtotal-price-amonut").text(productPriceAll+' UAH');
				$(".card-bonus-amount").text(productPriceAll+' UAH');
				
			}
			if(listpc[5] <= 0) {
				$(".cart-idnt-num").css("display", "none");
			}else {
				$(".cart-idnt-num").css("display", "flex");
				$(".cart-idnt-num").text(listpc[5]);	
			}
		}
		$('#ajaxFormCheckout').append('<input id="products" name="products" type="hidden" value="'+Products+'">');
		$('#ajaxFormCheckout').append('<input id="amount" name="amount" type="hidden" value="'+productPriceAll+'">');
		$('#ajaxFormCheckout').append('<input id="total_product" name="total_product" type="hidden" value="'+productPriceAll+'">');
	}else {
		//Cookie
		$.cookie('EiQ3rUEmRBH1jRpn', JSON.stringify(0), {
			expires: 30,
			path: '/'
		});
	}

	$("body").on("click", function() {
	if ($.cookie('EiQ3rUEmRBH1jRpn')) {
		var listpc = JSON.parse($.cookie('EiQ3rUEmRBH1jRpn'));
		var Products = '';
		if (listpc != null && listpc != 0) {
			for(var i=0; i < listpc[0].length; i++) {
				var productName = listpc[0][i],
					productPrice = listpc[1][i],
					productLength = listpc[2][i],
					productImg = listpc[3][i],
					productLink = listpc[4][i],
					productAttr = listpc[6][i];
				if (productLength <= 9) {
					productLength = "0" + productLength
				}
				productLink = productLink.replace('https://leadersport.com.ua/shop/', '');
				productImg = productImg.replace('../uploads/', '');
				var ProductsTm = productName+'|'+productLength+'|'+productPrice+'|'+productImg+'|'+productLink+'<br>';
				Products += ProductsTm;

				var productListLen = listpc[0].length,
					productQuanAll = 0,
					ProductQuan = 0,
					ProductPrice5 = 0,
					productQuan5 = 0,
					productPriceAll = 0;
				for (var j = 0; j < productListLen; j++) {
					ProductQuan = $(".cart-table-wf .list-content").eq(j).find("input").val();
					ProductPrice5 = $(".cart-table-wf .list-content").eq(j).find(".price").attr("data-price");
					productQuan5 = +ProductQuan;
					productPriceAll += +ProductPrice5 * productQuan5;
					productQuanAll += productQuan5;
				}

				$(".card-subtotal-price-amonut").text(productPriceAll+' UAH');
				
			}
			if(listpc[5] <= 0) {
				$(".cart-idnt-num").css("display", "none");
			}else {
				$(".cart-idnt-num").css("display", "flex");
				$(".cart-idnt-num").text(listpc[5]);	
			}
		}
		$('input#products').remove();
		//$('input#amount').remove();
		$('input#total_product').remove();
		$('#ajaxFormCheckout').append('<input id="products" name="products" type="hidden" value="'+Products+'">');
		//$('.price-box').append('<input id="amount" name="amount" type="hidden" value="'+productPriceAll+'">');
		$('#ajaxFormCheckout').append('<input id="total_product" name="total_product" type="hidden" value="'+productPriceAll+'">');
	}
	})
})