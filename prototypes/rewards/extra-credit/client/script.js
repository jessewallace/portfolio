$(document).ready(function(){function t(t,i){$(t).css({"-webkit-transform":"translateX(-"+i+"px)"})}var i=$(".js-video"),s=i.outerWidth(),e=(i.length,$(".td-widget-videos")),o=e.width(),d=o-4*s,n=$(".js-modalClose");$("body").on("click",".block",function(){$(".td-slider").addClass("td-is-slid")}),n.on("click",function(){$("#see-overlay").removeAttr("style")}),$(".js-goBack").on("click",function(){$(".td-slider").removeClass("td-is-slid")});var r=0;$(".td-widget-gallery__control").on("click",function(){var i=s;$(this).hasClass("js-moveForward")?r<d&&(r+=i,t(".td-widget-videos",r)):r>0&&(r-=i,t(".td-widget-videos",r))}),i.on("click",function(){$(this).parent().find(".td-is-viewing").removeClass("td-is-viewing"),$(this).find(".js-videoThumb").addClass("td-is-viewing")}),$(".js-refreshPoints").on("click",function(){$(this).addClass("td-is-positive"),setTimeout(function(){$(".js-refreshPoints").removeClass("td-is-positive")},1500)});var a=$(".td-carousel"),l=$(".td-carousel__img"),c=l.length,v=(l.width(),100*c+"%");a.width();$(".td-carousel").width(v),setTimeout(function(){var t=i,i=l.width();setInterval(function(){a.css({transform:"translateX(-"+i+"px)"}),i+=t},3e3)},1e3)});