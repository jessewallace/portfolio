$(document).ready(function(){function e(e,t,a,i){e.on("addedfile",function(){setTimeout(function(){var e=$(t+" .dz-image img").attr("src"),s=$(t);"image"==i?$(a).attr("src",e):$(a).css("background-image","url("+e+")"),s.css("background-image","url("+e+")")},500)})}function t(e,t){$(e).parent().find("."+t).removeClass(t),$(e).addClass(t)}function a(e,t){$(e).css({"-webkit-transform":"translateX(-"+t+"%)","-moz-transform":"translateX(-"+t+"%)",transform:"translateX(-"+t+"%)"})}function i(e,t,a){var i=$(e).find(t).length;return shiftAmount=1/i*100,shiftAmount*a}function s(e,t){var a=$(e).find(t).length;parentWidth=100*a,childrenWidth=1/a*100,$(e).css({width:parentWidth+"%"})}function o(e,t,a){var i='<div id="module'+a+'" class="panel panel--module panel--highlight is-active" data-module="'+a+'"><div class="panel-header"><i class="panel__icon js-sort panel__icon--sort fa fa-bars"></i><h2 class="js-mirror panel-title js-panelTitle">New '+e+' Module</h2><div class="pull-right"><i class="panel__icon is-clickable fa fa-expand js-collaspe"></i><i class="panel__icon is-clickable fa fa-times-circle js-delete"></i></div></div><div class="panel-body contrast"><div class="panel-content">'+t+"</div></div></div>";return i}function n(e,t,a){$(e).clone().attr("data-module",t).appendTo(a).show()}function l(e,t){$(e).on("keyup",function(){var e=$(this).val();e.length>0?$(t).text(e):$(t).text("")})}function r(e){var t=105,a=d(e),i=.299*a.R+.587*a.G+.114*a.B;return t>255-i?"#000000":"#ffffff"}function d(e){var t=e.substring(1,3),a=e.substring(3,5),i=e.substring(5,7);return{R:parseInt(t,16),G:parseInt(a,16),B:parseInt(i,16)}}function c(e,t,a){$(e).change(function(){var e=$(this).val();"bg"==a?$(t).css({"background-color":e,color:r(e)}):$(t).css({color:e})})}var u=$("#livePreview"),p=($("#previewContent"),$("#campaignLogo")),b=$("#campaignTitle"),h=$("#campaignDescription"),m=$("#campaignSections"),v=$("#campaignBrand"),g=$(".js-subSection"),w=new Dropzone("#dropZoneLogo",{url:"/file/post",thumbnailWidth:500,thumbnailHeight:null,autoDiscover:!1}),f=new Dropzone("#dropZoneBg",{url:"/files/post",thumbnailWidth:1200,thumbnailHeight:null,autoDiscover:!1});$(".ui-tooltip-icon").tooltip({position:{my:"right bottom+50"},tooltipClass:"entry-tooltip-positioner"}),e(w,"#dropZoneLogo",".td-widget-head__img, #campaignLogo","image"),e(f,"#dropZoneBg",".td-widget-splash__body-bg, .td-widget-body__bg","bg"),$(".upload__remove-icon").on("click",function(){var e=$(this).parents(".js-dropZone"),t=$(this).data("target"),a=$('[data-target="'+t+'"]');switch(t){case"logo":a.attr("src","");break;case"background":a.css("background-image","none");break;default:console.log("This Target Does Not Exist")}e.css("background-image","none"),e.removeClass("dz-started"),e.find(".dz-preview").remove()});var C=$("#breadCrumbs");breadcrumb=$(".js-breadcrumb"),breadcrumbNumber=C.find(breadcrumb).length,breadcrumbActive=breadcrumb.children().filter(".is-active"),breadcrumbModule=breadcrumb.index(1),breadcrumb.on("click",function(){var e=$(this).index();a(m,i("#campaignSections",".js-subSection",e)),g.removeClass("is-active"),g.eq(e).addClass("is-active"),$(this).find(".breadcrumb__link").addClass("is-active"),$(this).siblings().find(".breadcrumb__link.is-active").removeClass("is-active"),0==e&&u.hasClass("has-content")&&($("#previewContent").show(),$("#previewModule").hide()),1!==e?$(".editable").removeClass("is-editable"):$(".editable").addClass("is-editable"),1==e&&S>0&&($("#previewContent").hide(),$("#previewModule").show())}),breadcrumb.one("click",function(){var e=$(this).index();1==e&&$("#first-time").dialog({autoOpen:!0,modal:!0,minWidth:750,resizable:!1,draggable:!1,open:function(e,t){$(this).parent().addClass("animated bounceInDown")}})});var y=0,k=0;$(".js-buttonShift").on("click",function(){var e=$(this).data("button"),t=20;"Next"==e?(g.removeClass("is-active"),g=g.next(),g.addClass("is-active"),k++,y+=t,a(m,y)):(g.removeClass("is-active"),g=g.prev(),g.addClass("is-active"),k--,y-=t,a(m,y)),console.log(k)}),$(".font-style").on("click",function(){var e=$(this).data("style"),a=$(".td-widget-container, input.td-widget-input__field");switch(t(this,"is-selected"),e){case"Arvo":a.css({"font-family":"'Arvo'"});break;case"Montserrat":a.css({"font-family":"'Montserrat'"});break;case"Oswald":a.css({"font-family":"'Oswald'"});break;default:console.log("Nothing Exists")}}),$(".button-style").on("click",function(){var e=$(this).data("style"),a=$(".td-button");switch(t(this,"is-selected"),e){case"Flat":a.css({"border-radius":"0"});break;case"Round":a.css({"border-radius":"10px"});break;case"Pill":a.css({"border-radius":"1000px"});break;default:console.log("This Button Type Does Not Exist")}}),$(".js-radioReward").on("click",function(){$("#contestEntry:checked").length>0?$("#shortID").show():$("#shortID").hide()}),$(".js-ctaButton").on("click",function(){$("#ctaCustom:checked").length>0?($("#ctaURL").show(),$("#ctaButton").show()):$("#ctaNone:checked").length>0?($("#ctaURL").hide(),$("#ctaButton").hide()):($("#ctaURL").hide(),$("#ctaButton").show())}),s("#campaignSections",".js-subSection");var x='<div class="input-container"><label class="is-required">Question</label><input class="js-mirrorInput width-1-1" data-mirror="Header" type="text"></div><div class="input-container"><label class="is-required">Correct Answer</label><input class="width-1-1" type="text"></div><div class="input-container"><label>Find Answer URL</label><input class="width-1-1" type="text"></div>',j='<div class="input-container"><label class="is-required">Codeword Module Title</label><input class="js-mirrorInput width-3-5" data-mirror="Header" type="text"><button class="width-2-5 button-upload is-appended">Upload Image <i class="fa fa-camera"></i><input type="file" class="button-upload__input"></button></div><div class="input-container"><label class="is-required">Correct Codeword</label><input class="width-1-1" type="text"></div><div class="input-container widget-description"><label class="width-1-1">Codeword Description</label><textarea class="width-1-1 js-mirrorInput" name="" data-mirror="Content" cols="30" rows="4"></textarea></div>',_='<div class="input-container"><label class="is-required">Coupon Module Title</label><input class="js-mirrorInput width-1-1"" data-mirror="Header" type="text"></div><div class="input-container widget-description"><label class="width-1-1">Coupon Disclaimer</label><textarea class="width-1-1 js-mirrorInput" name="" data-mirror="Content" cols="30" rows="4"></textarea></div><div class="input-container"><label class="is-required">Coupon Image</label><div id="dropZoneCoupon" class="js-dropZone dz-clickable upload upload--banner upload--drop" data-message="Drag and Drop, or click to upload image"></div></div>',I='<div class="u-display-flex u-display-flex--vcentered survey-module"><b class="survey-module__label">Selected Survey:</b><span class="survey-module__title js-surveyTitle">Hard Candies and you</span><a class="js-changeSurvey u-flex-right survey-module__link">Change Survey</a>',M='<div class="input-container"><label class="is-required">Video Module Title</label><input class="js-mirrorInput width-1-1" data-mirror="Header" type="text"></div><div class="input-container widget-description"><label class="is-required">Video Embed Code</label><textarea class="width-1-1" name="" cols="30" rows="4"></textarea></div>',T='<div class="input-container has-image-upload"><label class="is-required width-1-1">Featured Link Module Title</label><input class="js-mirrorInput width-3-5" data-mirror="Header" type="text"><button class="width-2-5 button-upload is-appended">Upload Image <i class="fa fa-camera"></i><input type="file" class="button-upload__input"></button></div><div class="input-container"><label class="is-required">Featured Link URL</label><input class="width-1-1" type="text"></div><div class="input-container widget-description"><label class="width-1-1">Module Content</label><textarea class="width-1-1 js-mirrorInput" data-mirror="Content" cols="30" rows="4"></textarea></div>',D='<div class="input-container has-image-upload"><label class="is-required width-1-1">Lead Generator Module Title</label><input class="js-mirrorInput width-3-5" data-mirror="Header" type="text"><button class="width-2-5 button-upload is-appended">Upload Image <i class="fa fa-camera"></i><input type="file" class="button-upload__input"></button></div><div class="input-container widget-description"><label class="width-1-1">Module Content</label><textarea class="width-1-1 js-mirrorInput" data-mirror="Content" name="" cols="30" rows="4"></textarea></div><div class="input-container"><label class="">Lead Generator Question</label><input class="width-1-1 js-mirrorInput" data-mirror="altContent" type="text"></div>',L='<div class="input-container has-image-upload"><label class="is-required width-1-1">Email Module Title</label><input class="js-mirrorInput width-3-5" data-mirror="Header" type="text"><button class="width-2-5 button-upload is-appended">Upload Image <i class="fa fa-camera"></i><input type="file" class="button-upload__input"></button></div><div class="input-container widget-description"><label class="width-1-1">Module Content</label><textarea class="width-1-1 js-mirrorInput" data-mirror="Content" cols="30" rows="4"></textarea></div>',S=0,H=0,q=($(".js-mirror"),$(".js-mirrorInput"),$(".js-moduleTrivia")),E=$(".js-moduleCodeword"),z=$(".js-moduleEmail"),B=$(".js-moduleVideo"),R=$(".js-moduleFeatured"),A=$(".js-moduleLead"),U=$(".js-moduleCoupon"),W=$(".js-moduleSurvey");$("body").on("keyup",".js-mirrorInput",function(){var e=$(this).data("mirror"),t=$(this).parents(".panel"),a=t.data("module"),i=$(this).val(),s=$('#previewModule [data-module="'+a+'"] [data-mirror="'+e+'"]'),o=$(this).parents(".panel").find(".panel-header .js-mirror");i.length>0?("Header"==e&&o.text(i),s.text(i)):("Header"==e&&o.text(""),s.text(""))}),$(".js-addButton").on("click",function(){var e=$(this).text(),t=$("#widgetContainer"),a="";switch(H++,1==H&&($("#widgetContainer").html(""),$("#livePreview").addClass("has-content"),$("#previewModule").show(),$("#previewContent").hide()),e){case"Trivia":a=x,n(q,H,t);break;case"Survey":$("#selectSurvey").dialog({autoOpen:!0,modal:!0,minWidth:450,resizable:!1,draggable:!1,open:function(e,t){$(".js-surveyItem").on("click",function(){$(this).siblings().removeClass("is-selected"),$(this).addClass("is-selected"),$(".button-highlight").attr("disabled",!1)})},buttons:[{text:"Accept","class":"button-highlight",disabled:"disabled",click:function(){$(this).dialog("close"),$(this).parent().removeClass("bounceInDown");var i=$(".js-surveyItem.is-selected").text();a=I,$("#modulesContainer").append(o(e,a,H)),n(W,H,t),$(".js-panelTitle, .js-surveyTitle").text(i)}},{text:"Cancel","class":"button-link",click:function(){$(this).dialog("close"),$(this).parent().removeClass("bounceInDown")}}]});break;case"Codeword":a=j,n(E,H,t);break;case"Coupon":a=_,n(U,H,t);break;case"Video":a=M,n(B,H,t);break;case"Featured Link":a=T,n(R,H,t);break;case"Email Opt-In":a=L,n(z,H,t);break;case"Lead Generator":a=D,n(A,H,t);break;default:console.log("Loser")}$("#modulesContainer").removeClass("is-empty"),"Survey"!==e&&$("#modulesContainer").append(o(e,a,H)),$("#modulesContainer .panel").prev().addClass("is-collasped").removeClass("is-active"),$(".js-module").prev().hide(),S++,$("#campaignTotals").text(S+" out of "+S),console.log(S+" Module(s) Added")}),$("body").on("click",".js-delete",function(){var e=$(this).parents(".panel"),t=e.data("module"),a=$('#previewModule [data-module="'+t+'"]');$("#deleteDialog").dialog({autoOpen:!1,modal:!0,minWidth:325,resizable:!1,draggable:!1,open:function(e,t){$(this).parent().addClass("animated bounceInDown")},buttons:[{text:"Delete module","class":"button-negative",click:function(){$(this).dialog("close"),e.hasClass("is-active")&&e.prev().addClass("is-active").removeClass("is-collasped"),e.remove(),a.prev().show(),a.remove(),S--,0===S&&($("#modulesContainer").addClass("is-empty"),$("#previewModule").hide())}},{text:"Cancel","class":"button-link",click:function(){$(this).dialog("close"),$(this).parent().removeClass("bounceInDown")}}]}),$("#deleteDialog").dialog("open"),console.log(S+" Modules Remaining"),console.log("Module "+t+" was removed")}),$("body").on("click",".js-collaspe",function(){var e=$(this).parents(".panel"),t=e.data("module"),a=$('#previewModule [data-module="'+t+'"]');e.hasClass("is-active")?e.toggleClass("is-collasped"):(e.addClass("is-active"),e.toggleClass("is-collasped"),e.siblings().addClass("is-collasped").removeClass("is-active"),a.show(),a.siblings().hide()),$("#campaignTotals").text(t+" out of "+S)}),$("body").on("keyup","#titleEntry",function(){var e=$("#titleEntry").val();e.length>0?(b.text(e),u.addClass("has-content")):(b.text(""),u.removeClass("has-content"))}),l("#descpritionEntry",h),l("#brandEntry",v),$("#modulesContainer").sortable({opacity:.8,cursor:"ns-resize",handle:".panel-header .js-sort",axis:"y",placeholder:"ui-sortable-placeholder",start:function(e,t){t.placeholder.height(t.item.outerHeight())}});var N=$("#brandLogo");brandText=$("#brandText"),$(".js-radio").on("click",function(){$(this).hasClass("js-radio--image")?(N.show(),p.show(),v.hide(),brandText.hide()):(N.hide(),p.hide(),v.show(),brandText.show())}),$(".js-switchScreen").on("click",function(){$(this).hasClass("js-switchScreen--start")?($("#previewContent").show(),$("#previewModule").hide()):($("#previewContent").hide(),$("#previewModule").show())}),$(".js-datePicker").datepicker(),$(".js-miniColors").minicolors({position:"bottom left",theme:""}),c("#primaryColor",".td-widget-splash__footer-bg, .td-widget-splash__footer, .td-button, .td-pill, .td-widget-head","bg"),c("#secondaryColor",".td-widget-body, .td-widget-splash","bg"),c("#headerColor",".td-header--accent, .td-widget-trivia__count","text"),$("[contenteditable]").keydown(function(e){return 13===e.keyCode?(document.execCommand("insertHTML",!1,"<br><br>"),!1):void 0})});