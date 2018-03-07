$(document).ready(function(){
	var icon = $(".icons").children();
	icon.each(function(index){
		$('#'+index).on('click', function(){
			if ($('#'+index).hasClass('icon-disabled')) {
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
});
