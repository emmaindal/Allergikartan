$(document).ready(function(){
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
		$('#'+index).one('click', function() {
			if ($(this).hasClass('icon-disabled')) {
				$('#search-resturant').empty();
				$('#search-resturant').removeClass('btn-flat disabled');
				$('#search-resturant').css('cssText', 'background-color: rgba(36, 50, 32, 0.96) !important');
				$('#search-resturant').append('Hitta restaurang');
			} else if ($('#'+index).hasClass('icon-disabled') === false) {
				console.log("work in progress");
			} else{
				console.log("något är fel");
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
