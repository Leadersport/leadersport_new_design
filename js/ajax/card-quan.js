$( document ).ready(function() {
	$("body").on("click", '.card-btn-plus', function() {
 		var pValue= $(this).siblings(".card-input-quantity").val();
 		pValue = ( (+pValue + 1));
 		
 		if (pValue <= "09") {
 			pValue = "0" + pValue
 			$(this).siblings(".card-input-quantity").val(pValue);
 		}else {
 			$(this).siblings(".card-input-quantity").val(pValue);
 		}
	})

	$("body").on("click", '.card-btn-minus', function() {
 		var pValue= $(this).siblings(".card-input-quantity").val();
 		pValue = ( (+pValue - 1));
 		
 		if (pValue == 0) {
 			$(this).siblings(".card-input-quantity").val("01");
 			pValue = 0;
 		}else if (pValue <= 9) {
 			pValue = "0" + pValue
 			$(this).siblings(".card-input-quantity").val(pValue);
 		}else {
 			$(this).siblings(".card-input-quantity").val(pValue);
 		}
	})

});