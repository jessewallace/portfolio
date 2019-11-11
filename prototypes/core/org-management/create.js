$(document).ready(function(){function e(){"ABC"!==m.val()?(m.parent().removeClass("is-negative"),m.parent().addClass("is-positive"),p.attr("data-validation",h[0])):(m.parent().removeClass("is-positive"),m.parent().addClass("is-negative"),p.attr("data-validation",h[1])),m.parent().removeClass("is-loading")}function s(e,s){$(e).css({"-webkit-transform":"translateX(-"+s+"%)","-moz-transform":"translateX(-"+s+"%)",transform:"translateX(-"+s+"%)"})}function i(e,s){var i=$(e).find(s).length;parentWidth=100*i,childrenWidth=1/i*100,$(e).css({width:parentWidth+"%"}),$(e+" "+s).css({width:childrenWidth+"%"})}function t(e,i){var t=0,a=$(e).next().find(i),n=$(e).children(),o=n.width()/$(e).width()*100,l=n.filter(".is-active");a.on("click",function(){C.show(),$(this).hasClass("js-button--next")?(l.removeClass("is-active"),l=l.next(),l.addClass("is-active"),t+=o,s(e,t)):(l.removeClass("is-active"),l=l.prev(),l.addClass("is-active"),t-=o,s(e,t)),console.log(t)})}function a(e,s,i){$("body").on("click",i,function(){$(this).is(":checked")&&!$(this).hasClass("has-selection")?$(e).dialog({autoOpen:!0,modal:!0,minWidth:475,resizable:!1,draggable:!1,buttons:[{text:"Cancel",click:function(){$(this).dialog("close"),$(i).attr("checked",!1)}}],open:function(e,s){$(this).parent().addClass("animated bounceInDown"),$(this).closest(".ui-dialog").find(".ui-dialog-titlebar-close").hide()}}):($(i).closest(".sidebar__link").next().toggleClass("is-opened"),$(s).toggleClass("fadeOut u-is-visible bounceInUp"),$(s).prev().toggleClass("u-is-invisible fadeIn fadeOut"))})}function n(){$("#rewardsToggle").closest(".sidebar__link").next().toggleClass("is-opened"),$("#rewardsToggle").addClass("has-selection"),$("#rewardsFields").addClass("animated bounceInUp u-is-visible").removeClass("u-is-invisible"),$("#rewardsFields").prev().addClass("animated fadeOut u-is-invisible"),$("#selectType").dialog("close")}function o(e){$('[data-product="Email"]').html("This org is currently using "+e),$("#emailToggle").addClass("has-selection"),$("#emailToggle").closest(".sidebar__link").next().addClass("is-opened"),$("#emailFields").addClass("animated bounceInUp u-is-visible").removeClass("u-is-invisible"),$("#emailFields").prev().addClass("animated fadeOut u-is-invisible"),$("#selectEmail").dialog("close")}var l=$("#siteName");$(".js-sidebarLink").on("click",function(){$(this).addClass("is-selected").parent().siblings().find(".js-sidebarLink").removeClass("is-selected")}),$(".js-chosen").chosen({disable_search_threshold:10}),$(".js-tagit").tagit(),$("body").on("keyup","#siteName",function(){var e=l.val();console.log(e),e.length>0?$("#siteHeader").text(e):$("#siteHeader").text("Site Name Goes Here")});var r=$basicInfo.find(".is-required").length,d=$("#addressInfo").find(".is-required").length,c=$("#emailInfo").find(".is-required").length;$(".js-basicAmount").text(r),$(".js-addressAmount").text(d),$(".js-emailAmount").text(c);var u=['For prizes valued under $500, the prize will ship to the mailing address in the member profile within 6-8 weeks.  For prizes valued $500 or above (this ONLY applies to members with US shipping addresses), a completed W-9 Form is required per the IRS guidelines before the prize will be issued. A Triton Digital Prizing coordinator will email the time-sensitive information in regards to completing and submitting the W-9 form. To check the status of your order, log in, go to the "My Account" section, and click on the "Where\'s My Stuff" link. ',"You must pick your prize up at the station between the hours of 9 AM - 5 PM, Monday through Friday.\n\nPlease print out a copy of this e-mail and bring it with you along with a Photo ID. You must come in person to claim your prize.\n\nHere is the information we have on file for your account:\n[firstname] [lastname]\n[address]\n[city], [state] [zip]\n[homephone]","Your prize will be mailed to the following address:\n\n[firstname][lastname]\n[address]\n[city], [state] [zip]\n\nYou can expect to receive your prize within 2-4 weeks. We are not responsible for any lost, stolen, or damaged prizes that are sent through the mail."];$("#pmgShip").text(u[0]),$("#pickupNotice").text(u[1]),$("#shipPolicy").text(u[2]);var h=["These call letters look good to go!","Sorry these call letters have been used before"],m=$(".js-callLetters"),p=m.parent(),g=null;m.keyup(function(){m.parent().removeClass("is-negative"),m.parent().removeClass("is-positive"),m.parent().addClass("is-loading"),clearTimeout(g),g=setTimeout(e,1500)}),m.on("blur",function(){var e=m.val().toLowerCase();$(".js-skinPath").val(e)});var v=$("#generalSection");section=$(".js-section"),numberOfSections=v.find(".js-section").length,sliderWidth=100*numberOfSections,sectionWidth=1/numberOfSections*100,subSection=$(".js-subSection"),subSections=$(".js-subSections"),i("#rewardsSections",".js-subSection"),i("#generalFields",".js-subSection"),i("#generalSection",".js-section"),i("#emailSections",".js-subSection");var b=$(".sidebar__list-item"),f=subSection.filter(".is-active");currentShowingSidebar=b.find(".sidebar__link").filter(".is-selected");var C=$(".js-button--prev");t("#rewardsSections",".js-button--rewards"),t("#generalFields",".js-button--basic"),$("#seeCheckbox").on("click",function(){$("#seeTenantID").toggle()}),$("#welcomeCheck").on("click",function(){$("#welcomeEmail").toggle()}),$(".js-datePicker").datepicker(),$(".js-changeEmail").on("click",function(){$("#selectEmail").dialog({autoOpen:!0,modal:!0,minWidth:475,resizable:!1,draggable:!1,buttons:[{text:"Cancel",click:function(){$(this).dialog("close")}}],open:function(e,s){$(this).parent().css("top",100),$(this).closest(".ui-dialog").find(".ui-dialog-titlebar-close").hide()}})}),a("#selectType","#rewardsFields","#rewardsToggle"),a("#selectEmail","#emailFields","#emailToggle"),$(".js-createButton").on("click",function(){var e=$(this).data("option"),s=$("#emailBasic").find(".td-icon");switch(e){case"Rewards":$("#pointsTab").show(),n();break;case"Club":$("#pointsTab").hide(),n();break;case"Tribal Direct":o(e),s.removeClass("td-icon-paper-plane"),s.addClass("td-icon-envelope"),$(this).addClass("is-selected").next().removeClass("is-selected");break;case"Silver Pop":o(e),s.removeClass("td-icon-envelope"),s.addClass("td-icon-paper-plane"),$(this).addClass("is-selected").prev().removeClass("is-selected");break;default:console.log("This Target Does Not Exist")}}),b.on("click",function(){var e=$(this).index();shiftAmount=33.3333*e,shiftAmountModified=(e-2)*sectionWidth,correctSectionModified=section.eq(e-2),correctSection=section.eq(e);f.next();prevItem=f.prev(),$(this).hasClass("js-basicLink")?(s(v,0),s(subSections,shiftAmount),section.removeClass("is-active"),section.eq(0).addClass("is-active"),$("#generalFields .js-subSection").filter(".is-active").removeClass("is-active"),$("#generalFields .js-subSection").eq(e).addClass("is-active")):$(this).hasClass("js-secondaryItem")?(s("#rewardsSections",20*e),$(this).parent().prev().addClass("is-selected"),$("#rewardsSections .js-subSection").filter(".is-active").removeClass("is-active"),$("#rewardsSections .js-subSection").eq(e).addClass("is-active")):(s(v,shiftAmountModified),section.removeClass("is-active"),correctSectionModified.addClass("is-active")),console.log(e),e>=1?C.show():C.hide()})});