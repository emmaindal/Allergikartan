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
	}
	function showPosition(position) {
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		console.log("Latitude: " + lat +
		" Longitude: " + lon);
	}

	getLocation();
});
