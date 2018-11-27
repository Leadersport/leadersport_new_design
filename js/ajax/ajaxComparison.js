jQuery(document).ready(function($) {
	var productInfo = JSON.parse($.cookie('2BcPpDBHSPv6jezf'));
    console.log(productInfo);
	$.ajax({
        type: 'post',
        url: '/compareData',
        headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
                    },
        data: {data: productInfo},
        success: function (response) {

        	console.log(response.result);
            CompGet(response.result, response.user_id);

        },
        error: function(error){

        	console.log(error);

        }
    });
});