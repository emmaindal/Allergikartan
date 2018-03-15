$(document).ready(function() {
	//materialize jquery plugins
	$(".button-collapse").sideNav();
	$(".modal").modal();
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
	console.log("Latitude: " + lat + " Longitude: " + lon);

	initMap(lat, lon);
}

function showRestaurants(data) {
	$.each(data, function(index, key) {
		console.log(data);

		new google.maps.Marker({
			position: { lat: key.lat, lng: key.lon },
			map: map,
			title: key.name
		});
	});
}

var map;
function initMap(lat, lon) {
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: lat, lng: lon },
		zoom: 12
	});

	var marker = new google.maps.Marker({
		position: { lat: lat, lng: lon },
		map: map,
		title: "Här är du!"
	});
}

$("#search-area").on("click", function() {
	$("#search-box").empty();
	$("#search-box").append(
		'<form><label class="left">Skriv in stad:</label><input type="search"></form>'
	);
});

//////////////////////// HÄR UNDER TESTAS DET//////////////
$("#map-close").on("click", function(){
	$("#map").empty();
	getLocation();
});


$("#search-resturant").on("click", function(e) {
	e.preventDefault();
	var dict = [];
	// hasClass returns true/false if has class active. Gets class active when clicked in onclick listener on .allergi
	const laktos = $("#0").hasClass("active");
	const nut = $("#1").hasClass("active");
	const gluten = $("#2").hasClass("active");
	const egg = $("#3").hasClass("active");

	//Skickar enbart de allergier som är true till backend
	//EN REFACTORING PÅ KOD NEDAN ÄR NÖDVÄNDIGT
	if (laktos == true) {
		var obj ={
			key: "lactose",
			value: laktos,
		}
		dict.push(obj);
	}
	if (nut == true) {
		var obj ={
			key: "nut",
			value: nut,
		}
		dict.push(obj);
	}
	if (gluten == true) {
		var obj ={
			key: "gluten",
			value: gluten,
		}
		dict.push(obj);
	}
	if (egg == true) {
		var obj ={
			key: "egg",
			value: egg,
		}
		dict.push(obj);
	}
	console.log(dict);
	var stringDict = JSON.stringify(dict);
	// Sends the dictionary to / on our server. response = database match
	$.ajax({
		url: "/",
		type: "POST",
		data: stringDict,
		success: function(data) {
			showRestaurants(data);
		},
		error: function(result) {
			console.log(result);
		}
	});
});
