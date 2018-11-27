jQuery(document).ready(function($) {
	$('.get-short-data .select-option a').on('click', function() {
		var method = $(this).parents('li').attr('data-val');
		var location = window.location;
		var attr = window.location.search;

		for (var i = 1; i < 5; i++) {
			attr = attr.replace('&sort='+i, '');
			attr = attr.replace('?sort='+i, '');
		}

		if (attr != '') {
			location.replace(window.location.protocol  + window.location.pathname + attr +'&sort='+method);
		}else {
			location.replace(window.location.protocol  + window.location.pathname + attr +'?sort='+method);
		}
	});

	var locationActive = window.location.search;
	console.log(locationActive.indexOf('&sort=1'));
	console.log(locationActive.indexOf('?sort=1'));
	if (locationActive.indexOf('&sort=1') != -1 || locationActive.indexOf('?sort=1') != -1) {
		$('.shop-short-left .get-short-data span').text('ОТ ДЕШЕВЫХ К ДОРОГИМ');
	}else if (locationActive.indexOf('&sort=2') != -1 || locationActive.indexOf('?sort=2') != -1) {
		$('.shop-short-left .get-short-data span').text('ОТ ДОРОГИХ К ДЕШЕВЫМ');
	}else if (locationActive.indexOf('&sort=3') != -1 || locationActive.indexOf('?sort=3') != -1) {
		$('.shop-short-left .get-short-data span').text('ПОПУЛЯРНЫЕ');
	}else if (locationActive.indexOf('&sort=4') != -1 || locationActive.indexOf('?sort=4') != -1) {
		$('.shop-short-left .get-short-data span').text('АКЦИОННЫЕ');
	}

	var data = locationActive;
	var countof = [];
	for (var i = 0; i < 100; i++) {
		if (data.indexOf('attributes%5B%5D=') != -1) {
			firstPos = data.indexOf('attributes%5B%5D=') + 17;
			lastPos = data.indexOf('&') - 18;
			var nam = data.substr(firstPos, lastPos);
			console.log(nam);
			data = data.replace('attributes%5B%5D=', '');
			data = data.replace('&', '');
			data = data.replace(nam, '');
			$('.sidebar .filtr li input[data-id="'+nam+'"]').prop( "checked", true );
		}else {
			break
		}
	}

	var sizeLoc = data;

	if(sizeLoc.indexOf('price_min=') != -1) {
		firstPosSize = sizeLoc.indexOf('price_min=') + 10;
		lastPosSize = sizeLoc.indexOf('&') - 11;
		var minSize = sizeLoc.substr(firstPosSize, lastPosSize);

		firstPosSize = sizeLoc.indexOf('price_max=') + 10;
		lastPosSize = sizeLoc.length;
		var maxSize = sizeLoc.substr(firstPosSize, lastPosSize);

		$('#options input').eq(0).val(minSize);
		$('#options input').eq(1).val(maxSize);

		console.log(minSize+' | '+maxSize);
	}

	

});