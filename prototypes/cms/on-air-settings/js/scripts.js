jQuery(document).ready(function() {
	jQuery('select.onair-type').change(function(){
        if(jQuery(this).attr("value")=="now-playing"){
            jQuery('.single-title, .onair-autoupnext').show();
            jQuery('.combined-title , .onair-toggle').hide();
        }
        if(jQuery(this).attr("value")=="upcoming"){
            jQuery('.single-title').show();
            jQuery('.combined-title , .onair-toggle, .onair-autoupnext').hide();
        }
        if(jQuery(this).attr("value")=="combined"){
            jQuery('.single-title, .onair-autoupnext').hide();
            jQuery('.combined-title , .onair-toggle').show();
        }
    });

    jQuery('[title!=""]').qtip(); // A bit better. Grab elements with a title attribute that isn't blank.

});

