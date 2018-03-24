$(document).ready(function () {
	//materialize jquery plugins
	$(".button-collapse").sideNav();
	$(".modal").modal({
		complete : clearRestaurantPins
	});
	$("select").material_select();
	getLocation();
});
var googleMapsKey = config.GOOGLE_MAPS_KEY;
var googlePlacesKey = config.GOOGLE_PLACES_KEY;
var userLat;
var userLon;
var map;
var markers = [];
//geolocation
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);

	} else {
		console.log("Geolocation is not supported by this browser.");
	}
}
function showPosition(position) {
	userLat = position.coords.latitude;
	userLon = position.coords.longitude;
	initMap(userLat, userLon);
}

function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: userLat, lng: userLon },
		zoom: 13,
		gestureHandling: 'greedy',
		zoomControl: true,
	});
}

function createUserMarker(lat, lon) {
	new google.maps.Marker({
		position: {
			lat: lat,
			lng: lon
		},
		map: map,
		title: "Här är du!"
	});
}

function showRestaurants(data) {
	// Skapar användarens marker på kartan
	createUserMarker(userLat, userLon)
	// För varrje restaurang databasen skickar tillbaka, skapa en marker
	$.each(data, function(index, restaurant) {
		var marker = new google.maps.Marker({
			position: { lat: restaurant.lat, lng: restaurant.lon },
			map: map,
			title: restaurant.name,
			icon: {
				path: google.maps.SymbolPath.CIRCLE,
				scale: 8,
				strokeColor: "rgb(255, 134, 22)"
			},
		});
		markers.push(marker);
	});

	$("#search-area").on("click", function() {
		if ($("#search-area").hasClass('search-box') == false) {
			$("#search-area").addClass('search-box');
		} else {
			$("#search-area").removeClass('search-box');
		}

		if ($("#search-area").hasClass('search-box') == true){
			$("#search-box").show();
		} else {
			$("#search-box").hide();
		}
	});
}

function showError(text){
	$("#map").html("Kunde inte hitta resturanger");
};

$("#map-close").click(function(){
	$('#new-city').val('');
	$("#search-box").hide();
	clearRestaurantPins;
});

var clearRestaurantPins = function() {
	// Clears pins from map
	// För varje marker i den globala listan (kommer hit när vi skapar dom) sätt dess position till null
	$.each(markers, function(index, marker){
		marker.setMap(null);
	})
	// hides resturant
	$("#search-resturant").hide();
	// clears the allergy buttons
	var icon = $("#allergy-form").find('label').children();
	// Each child in label
	icon.each(function(index){
		// If it is disabled
		if ($(this).hasClass('icon-disabled')) {
			// find the image child and removes the class
			$(this).find('img').removeClass('icon-disabled-opacity')
			// Removes the disabled from the a tag
			$(this).removeClass('icon-disabled');
			// tar väck klassen active
			$(this).removeClass('active');

		}
	}
);
};

$("#search-resturant").on("click", function (e) {
	e.preventDefault();
	dict = {};
	// hasClass returns true/false if has class active. Gets class active when clicked in onclick listener on .allergi
	const laktos = $("#0").hasClass("active");
	const nut = $("#1").hasClass("active");
	const gluten = $("#2").hasClass("active");
	const egg = $("#3").hasClass("active");

	//Skickar enbart de allergier som är true till backend
	if (laktos == true) {
		dict["lactose"] = true;
	}
	if (nut == true) {
		dict["nut"] = true;
	}
	if (gluten == true) {
		dict["gluten"] = true;
	}
	if (egg == true) {
		dict["egg"] = true;
	}
	var stringDict = JSON.stringify(dict);
	// Sends the dictionary to / on our server. response = database match
	$.ajax({
		url: "/",
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		data: stringDict,
		success: function(data) {
			showRestaurants(data);
		},
		error: function (result) {
			showError(result);
		}
	});
});

$("#new-city").keypress(function(e){
	var geocoder = new google.maps.Geocoder()
	if(e.which == 13) {
		var address = $('#new-city').val()

		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				map.setZoom(10);
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	}
});

function getPlaceLocation() {
	var ac = new google.maps.places.Autocomplete(document.getElementById('restaurant'), {
		types: ['establishment']
	});

	ac.addListener('place_changed', function () {
		var place = ac.getPlace();

		if (!place.geometry) {
			// User entered the name of a Place that was not suggested and
			// pressed the Enter key, or the Place Details request failed.
			window.alert("No details available for input: '" + place.name + "'");
			return;
		}
		var tipsForm = document.getElementById('tips-form');
		tipsForm.appendChild(document.createElement('input')).setAttribute("id", "lat");
		document.getElementById('lat').setAttribute("name", "lat");
		document.getElementById('lat').value = place.geometry.location.lat();
		document.getElementById('lat').style.display = 'none';

		tipsForm.appendChild(document.createElement('input')).setAttribute("id", "lng");
		document.getElementById('lng').setAttribute("name", "lng");
		document.getElementById('lng').value = place.geometry.location.lng();
		document.getElementById('lng').style.display = 'none';

	});
}

getPlaceLocation();
