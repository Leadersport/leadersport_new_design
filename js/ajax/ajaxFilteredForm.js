$(document).ready(function(){

		$('form#ajaxFilteredForm').submit(function(e){

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

                    },
                    error: function(error){

                    	console.log(error);

                    }
                });


		});

});