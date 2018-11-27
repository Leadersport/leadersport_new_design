$(document).ready(function(){

		$('form#reg').submit(function(e){

			e.preventDefault();
			   
			   $.ajax({
                    type: 'POST',
                    url: "/register",
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
                    },
                    data:$(this).serialize(),
                      success: function (response) {

                    	if(response.locate){
                            setTimeout(function() {
                                successAlert('Вы успешно зарегистрировались.');
                                location.href = '/account';
                            }, 1000)
						}else{
							
							console.log(response);
						}

                    },
                    error: function(error){
                    	
                    	console.log(error);

                    }
                });
	

		});

		$('form#login').submit(function(e){

			e.preventDefault();

				$.ajax({
                    type: "POST",
                    url: "/login",
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
                    },
                    data:$(this).serialize(),
                    success: function (response) {

                    	if(response.locate){
                            successAlert('Вы успешно вошли.');
							location.href = '/account';
						}else{
                            dangerAlert(response.result);
							console.log(response);
						}

                    },
                    error: function(error){

                    	console.log(error);

                    }
                });


		});

        $('#reg button').on('click', function() {
            if ($('#password').val() == $('#confirm_password').val()) {
            } else {
                dangerAlert('Пароли не совподают!')
               return false
            }
        });
});