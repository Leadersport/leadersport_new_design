jQuery(document).ready(function($) {

$('.get-val-co-mail.get-val a').on('click', function(){

		var cityName = $(this).text();
		$.ajax({
		    type: "POST",
		    dataType: "json",
		    url: "https://api.novaposhta.ua/v2.0/json/",
		    data: JSON.stringify({
			    "modelName": "AddressGeneral",
			    "calledMethod": "getWarehouses",
			    "methodProperties": {
			         "Language": "ru",
			         "CityName": cityName
			    },
			    "apiKey": "89744e92374af145ec0794dff7e940e7"
			}),
		    headers: {
		        "Content-Type": "application/json"
		    },
		    xhrFields: {
		        withCredentials: false 
		    },
		    success: function(texts){
		        console.log(texts);
		        getMailServ(texts);
		    },
		});
	})
});	