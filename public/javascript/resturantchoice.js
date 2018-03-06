$(document).ready(function(){
	$("#one").on('click', function(){
		if ($("#one").hasClass('icon-disabled')) {
			$(this).css('background', 'none');
			$("#icon-one").css('opacity', '1');
			$("#one").removeClass('icon-disabled');

		} else if ($("#one").hasClass('icon-disabled') === false) {
			$("#one").addClass('icon-disabled');
			$(this).css('background', 'linear-gradient(rgba(180, 180, 180, 1), rgba(180, 180, 180, 1))');
			$("#icon-one").css('opacity', '0.20');
		} else {
			console.log("något är fel")
		}
	});
	$("#two").on('click', function(){
		if ($("#two").hasClass('icon-disabled')) {
			$(this).css('background', 'none');
			$("#icon-two").css('opacity', '1');
			$("#two").removeClass('icon-disabled');

		} else if ($("#two").hasClass('icon-disabled') === false) {
			$("#two").addClass('icon-disabled');
			$(this).css('background', 'linear-gradient(rgba(180, 180, 180, 1), rgba(180, 180, 180, 1))');
			$("#icon-two").css('opacity', '0.20');
		} else {
			console.log("något är fel")
		}
	});
	$("#three").on('click', function(){
		if ($("#three").hasClass('icon-disabled')) {
			$(this).css('background', 'none');
			$("#icon-three").css('opacity', '1');
			$("#three").removeClass('icon-disabled');

		} else if ($("#three").hasClass('icon-disabled') === false) {
			$("#three").addClass('icon-disabled');
			$(this).css('background', 'linear-gradient(rgba(180, 180, 180, 1), rgba(180, 180, 180, 1))');
			$("#icon-three").css('opacity', '0.20');
		} else {
			console.log("något är fel")
		}
	});
	$("#four").on('click', function(){
		if ($("#four").hasClass('icon-disabled')) {
			$(this).css('background', 'none');
			$("#icon-four").css('opacity', '1');
			$("#four").removeClass('icon-disabled');

		} else if ($("#four").hasClass('icon-disabled') === false) {
			$("#four").addClass('icon-disabled');
			$(this).css('background', 'linear-gradient(rgba(180, 180, 180, 1), rgba(180, 180, 180, 1))');
			$("#icon-four").css('opacity', '0.20');
		} else {
			console.log("något är fel")
		}
	});
});
