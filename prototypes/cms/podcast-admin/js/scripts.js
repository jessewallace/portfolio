jQuery( document ).ready(function( $ ) {
	$( ".add-audio" ).click(function() {
  		$(this).hide();
  		$( '.audio-manage').toggle();
	});
	$( ".remove-audio" ).click(function() {
  		$( '.audio-manage').toggle();
  		$('.add-audio').show();
	});
});