$(document).ready(function(){
	//materialize jquery plugins
	$(".button-collapse").sideNav();
	$('.modal').modal();
	$('select').material_select();

	//geolocation
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	};

	function showPosition(position) {
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		console.log("Latitude: " + lat +
		" Longitude: " + lon);
		initMap(lat,lon)
	};

	var map;
	function initMap(lat,lon) {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: lat, lng: lon},
			zoom: 12
		});

		var marker = new google.maps.Marker({
			position: {lat: lat, lng: lon},
			map: map,
			title: 'Här är du!'
		});
	};

	$("#search-area").on('click', function(){
		$('#search-box').empty();
		$('#search-box').append('<form><label class="left">Skriv in stad:</label><input type="search"></form>');
	});

	getLocation();
});
