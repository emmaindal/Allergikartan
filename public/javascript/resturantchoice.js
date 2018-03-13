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
		$("form input[type='checkbox']:checked").each(function(){
			console.log($(this).val());
		});
		var formdata = $('#allergy-form').submit();
		console.log(formdata);

	});
});


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
