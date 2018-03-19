$(document).ready(function () {
	//materialize jquery plugins
	$(".button-collapse").sideNav();
	$(".modal").modal({
		complete : clearRestaurantPins
	});
	$("select").material_select();

	getLocation();
});

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
	initMap(lat, lon);
}
var map;

function initMap(lat, lon) {
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: lat, lng: lon },
		zoom: 10,
		gestureHandling: 'greedy',
		zoomControl: true,
	});
	var marker = new google.maps.Marker({
		position: {
			lat: lat,
			lng: lon
		},
		map: map,
		title: "Här är du!"
	});
}
function showRestaurants(data) {
	$.each(data, function(index, restaurant) {
		console.log(restaurant);
		new google.maps.Marker({
			position: { lat: restaurant.lat, lng: restaurant.lon },
			map: map,
			title: restaurant.name
		});
	});

	//HÄR MÅSTE VI FIXA SÅ MAN KAN SÖKA PÅ ANNAN STAD
	$("#search-area").on("click", function() {
		$("#search-box").empty();
		$("#search-box").append(
			//Här ska sökboxen läggas till från Google places
			"<p>Detta ska bli en sökruta</p>"
		);
	});
}
function showError(text){
	$("#map").html("Kunde inte hitta resturanger");
};

//////////////////////// HÄR UNDER TESTAS DET//////////////

$("#map-close").click(function(){
	clearRestaurantPins;
});

var clearRestaurantPins = function() {
	// Clears pins from map
	$("#map").empty();
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
	// Gets location again since all pins are removed.
	getLocation();
};

$("#search-resturant").on("click", function (e) {
	e.preventDefault();
	var dict = {};
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
			console.log(data);
			showRestaurants(data);
		},
		error: function (result) {
			showError(result);
		}
	});
});



$('#tips-form').on("submit", function (e) {
	e.preventDefault();
	var email = $('#email').val()
	console.log(email);
	var restaurant = $('#restaurant').val()
	console.log(restaurant);
	var lat = $('#restaurant').attr('data-lat')
	console.log(lat);
	var lon = $('#restaurant').attr('data-lon')
	console.log(lon);

	var allergy = $('#allergy option:selected').text()
	console.log(allergy);
	
	
});

$("#new-city").keypress(function(e){
	var geocoder = new google.maps.Geocoder()
	if(e.which == 13) {
		var address = $('#new-city').val()
		console.log(address);
		
		geocoder.geocode( { 'address': address}, function(results, status) {
		  if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			map.setZoom(10);
			console.log(results);
			
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
		var dataLat=document.getElementById("restaurant").setAttribute("data-lat", place.geometry.location.lat());
		var dataLon=document.getElementById("restaurant").setAttribute("data-lon", place.geometry.location.lng());
	});
}




getPlaceLocation();