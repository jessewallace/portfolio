function update(){var t=72,e=$("#captionTop").css("font-size"),o=$("#captionBottom").css("font-size");$("#captionTop").html($("#captionTopTextarea").val()),$("#captionBottom").html($("#captionBottomTextarea").val()),$("#topCaption").textfill({maxFontPixels:t}),$("#bottomCaption").textfill({maxFontPixels:t}),$("#captionTopTextarea").val().length>0||$("#captionBottomTextarea").val().length>0?$(".js-submit-entry").removeAttr("disabled"):$(".js-submit-entry").attr("disabled",!0),$("#captionTopTextarea").css("font-size",e),$("#captionBottomTextarea").css("font-size",o)}$(function(){$("#captionTopTextarea").keyup(update),$("#captionBottomTextarea").keyup(update),update(),$(".js-submit-entry").on("click",function(){$("#loader").fadeIn().delay(3e3).queue(function(t){$(this).hide(),$("#termsSubmit").hide(),$("#submissionSuccess").show(),$("#socialShare").show(),$(".caption-textarea").hide(),$(".caption-placeholder").css("visibility","visible"),t()})})});