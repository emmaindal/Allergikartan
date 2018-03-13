$(document).ready(function(){
	$('#search-resturant').hide()
	var icon = $("#allergy-form").children();
	icon.each(function(index){
		$('#'+index).on('click', function(){
			if ($(this).hasClass('icon-disabled')) {
				$(this).css('background', 'none');
				$('#icon-'+index).css('opacity', '1');
				$('#'+index).removeClass('icon-disabled');
			} else if ($('#'+index).hasClass('icon-disabled') === false) {
				$('#'+index).addClass('icon-disabled');
				$(this).css('background', 'linear-gradient(rgba(180, 180, 180, 1), rgba(180, 180, 180, 1))');
				$('#icon-'+index).css('opacity', '0.20');
			} else {
				console.log("något är fel")
			};
		});
	});

	$("#search-resturant").on('click', function(e){
		e.preventDefault();
		var dict = {}
		// hasClass returns true/false if has class active. Gets class active when clicked in onclick listener on .allergi
		const laktos = $('#0').hasClass("active");
		const nut = $('#1').hasClass("active");
		const gluten = $('#2').hasClass("active");
		const egg = $('#3').hasClass("active");
		console.log(laktos, nut, gluten, egg)
		// Adds the above to dictionary
		dict.lactose = laktos
		dict.nut = nut
		dict.gluten = gluten
		dict.egg = egg
		console.log(dict);
		// Sends the dictionary to / on our server. response = database match			
		$.ajax({
			url: "/",
			type: "POST",
			data: dict,
			success: function (result) {
				console.log(result);
				if(result.status == 200){
					self.isEditMode(!self.isEditMode());
				}
			},
			error: function(result){
				console.log(result);
			}
		});
	});
})

	


$('.allergi').on('click', function()  {

	if($(this).hasClass('active') == false) {
		// If the button clicked doesnt have class active (which means its been clicked on)
		$(this).addClass('active')
		// add the class active
	} else {
		// If it DOES have it
		$(this).removeClass('active')
		// We remove the class (since its been clicked twice)
	}
	if($('.allergi').hasClass("active") == true) {
		// If any of the allergy buttons have active (been clicked)
		$('#search-resturant').show()
		// We SHOW the search restaurant button
	} else {
		// If none of the allergies have been clicked
		$('#search-resturant').hide()
		// We HIDE the search restaurant button
	}
})

