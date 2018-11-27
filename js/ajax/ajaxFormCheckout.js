$(document).ready(function(){
    
		$('body').on('submit', 'form#ajaxFormCheckout' ,function(e){
    			e.preventDefault();

    				$.ajax({
                        type: $(this).attr('method'),
                        url: $(this).attr('action'),
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
                        },
                        data:$(this).serialize(),
                        success: function (response) {

                            console.log(response);

                            if(response.liqpay){
                                $('div#liqpay').append(response.result);
                                $('div#liqpay form input[type="image"]').click();
                            }else{
                               location.href = '/order_success';
                            }

                        },
                        error: function(error){

                        	console.log(error);

                        }
                    });

            

		});

});