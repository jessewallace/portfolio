$(document).ready(function(){$(".list-item").on("click",function(e){e.preventDefault(),$(this).hasClass("active")?$(this).toggleClass("active").find(".view-instance-report").removeClass("active"):($(this).closest("#sortable").find(".list-item.active").removeClass("active").find(".view-instance-report").removeClass("active"),$(this).toggleClass("active").find(".view-instance-report").addClass("active"),$(this).find(".count").each(function(){$(this).prop("Counter",0).animate({Counter:$(this).data("completions")},{duration:1e3,easing:"swing",step:function(e){$(this).text(Math.ceil(e))}})}))}),$(".instance-table #sortable").sortable({placeholder:"ui-sortable-placeholder",opacity:.8,axis:"y",helper:"clone",tolerance:"intersect",start:function(e,t){$(t.helper).css("box-shadow","0 0 5px #0069AC")},cursor:"ns-resize",forceHelperSize:!0,handle:".fa-bars",update:function(e,t){$("#sortable .list-item").each(function(){var e=$(this).index();$(this).find(".instace-priority .list-order-number").text(e+1)})}}),$(".instance-table #sortable").disableSelection(),$(".filter-survey").on("click",function(e){$(".filters").toggle(),$(this).find("i").toggleClass("fa-caret-down fa-caret-up"),e.preventDefault()})});