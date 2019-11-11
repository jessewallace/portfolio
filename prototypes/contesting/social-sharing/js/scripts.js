(function ($, window, document, undefined) {

  'use strict';

  $(function () {

    $(document).on('click', '.share-button', function(e) {

		if ( $( this ).hasClass( "open" ) ) {
		 
	        $(this).removeClass('open');
			$('.share-popup').hide();


	    } else {

	    	$(this).addClass('open');
			$('.share-popup').show().focus();

	    }
    	
    });

    $("#email-popup-trigger").fancybox({
    	padding: 0
    });

    new Clipboard('.share-copy-url a');

    $(document).on('click', '.share-copy-url a', function() {
      $(this).html('<i class="fa fa-check"></i> Copied!').addClass('copied');
    });

    $("#email-addresses").tagit({
    	placeholderText: 'seperate with a space',
    	beforeTagAdded: function(event, ui) {
		      $("#email-addresses").data("ui-tagit").tagInput.removeAttr("placeholder")
        },
		afterTagRemoved: function(event, ui) {
		     if($('#email-addresses').tagit('assignedTags').length == 0) {
	             $("#email-addresses").data("ui-tagit").tagInput.attr("placeholder", "seperate with a space")
	         }
		}
    });

  });

})(jQuery, window, document);







