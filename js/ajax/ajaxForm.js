$(document).ready(function(){

		$('form#ajaxForm ,form.ajaxForm , form#ajaxFormCallback').submit(function(e){

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
                        $('form.ajaxForm input , form.ajaxForm textarea').val('');
                        successAlert(response.result);

                    },
                    error: function(error){

                    	console.log(error);

                    }
                });


		});

});