window.fbAsyncInit = function(){
FB.init({
    appId: '929428413917806', status: true, cookie: true, xfbml: true }); 
};
(function(d, debug){var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if(d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; 
    js.async = true;js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
    ref.parentNode.insertBefore(js, ref);}(document, /*debug*/ false));
function postToFeed(title, desc, url, image){
var obj = {method: 'feed',link: url, picture: 'https://leadersport.com.ua/uploads/'+image,name: title,description: desc};
function callback(response){}
FB.ui(obj, callback);
}

jQuery(document).ready(function($) {
	var selectCount = $('.character select').length;
	for (var i=0; i<selectCount; i++) {
		if($('.character select').eq(i).html().trim() == '') {
			console.log('assa');
			$('.character select').eq(i).parents('.item').hide();
		}
	}
	
});