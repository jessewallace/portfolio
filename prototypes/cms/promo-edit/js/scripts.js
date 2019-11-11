jQuery(document).ready(function() {
	jQuery('input[name="thumb-type"]').click(function(){
        if(jQuery(this).attr("value")=="sidebar"){
            jQuery('.sidebar-position').show();
            jQuery('.thumb-shape, .thumb-position').hide();
        }
        if(jQuery(this).attr("value")=="thumb"){
            jQuery('.thumb-shape, .thumb-position').show();
            jQuery('.sidebar-position').hide();
        }
        if(jQuery(this).attr("value")=="none"){
            jQuery('.thumb-shape, .thumb-position, .sidebar-position').hide();
        }
    });
});