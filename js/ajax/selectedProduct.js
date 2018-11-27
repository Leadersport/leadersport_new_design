

function selectedProduct(user_id , product_id){

	addToDataWish(product_id);

				$.ajax({
                    type: 'post',
                    url: '/userSelectedCreate',
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
                    },
                    data:{
                    	user_id:user_id,
                    	product_id:product_id
                    },
                    success: function (response) {

                    	console.log(response);

                    },
                    error: function(error){

                    	console.log(error);

                    }
                });

}

function deleteSelectedProduct(user_id , product_id){

                $.ajax({
                    type: 'post',
                    url: '/userSelectedDelete',
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
                    },
                    data:{
                        user_id:user_id,
                        product_id:product_id
                    },
                    success: function (response) {

                        console.log(response);
                        successAlert("Товар успешно удален из избранных товаров.");

                    },
                    error: function(error){

                        console.log(error);

                    }
                });

}


