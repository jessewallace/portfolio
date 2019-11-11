(function ($, window, document, undefined) {

  'use strict';

  $.widget.bridge('uitooltip', $.ui.tooltip);

  $(function () {

    $('input.minicolors').minicolors({
      position: 'top left',
      theme: ''
    });
    $(".datepicker").datepicker();
    $(".ui-tooltip-icon").uitooltip();
    $(".ui-popover").popover();

  });

  $('#first-time').dialog({
    autoOpen: false,
    modal: true,
    minWidth: 750,
    resizable: false,
    draggable: false,
    open: function(event, ui) {
      $(this).parent().addClass('animated bounceInDown');
    }
  });

  $('input.minicolors').change(function(){
    var buttonColor = $(this).val();
    $('.slide.current').find('.cta').css("background", buttonColor);
  });

  $(document).ready(function() {

    $(".open-customizer").on("click", function() {
      $(this).prev('.rewardskin-preview').removeClass('empty');
    });

    function e(e) {
        switch (e) {
            case "home":
                $(".td-rewards-widgets").show();
                break;
            case "trivia":
                $('[data-see-type="triviaUi"]').show();
                break;
            case "survey":
                $('[data-see-type="surveysUi"]').show();
                break;
            case "polls":
                $('[data-see-type="pollsUi"]').show();
                break;
            case "campaigns":
                $('[data-see-type="campaignUi"]').show();
                break;
            case "games":
                $('[data-see-type="Games"]').show(), $('[data-see-type="Games"]').removeClass("js-hide-games");
                break;
            default:
                console.log("This Target Does Not Exist")
        }
    }
    $(".js-subnav").on("click", function() {
          $(".td-rewards-site__container").toggleClass("is-opened"), $(this).toggleClass("is-opened")
      }), $(".see-loggedout .see-action").on("click", function() {
          $("#see-overlay").show()
      }), $(".see-loggedin .see-action").on("click", function() {
          $(".see-loggedout").show(), $(".see-loggedin").hide(), $("#see-widget-announcementui").hide()
      }), $("#see-overlay-modal .see-button").on("click", function() {
          $("#see-overlay").hide(), $(".see-loggedout").hide(), $(".see-loggedin").show(), $("#see-widget-announcementui").show()
      }), $(".see-x").on("click", function() {
          $("#see-overlay").hide()
      }), $(".see-onair-openmodal").on("click", function() {
          $(".js-see-onair-modal").css({
              display: "block",
              top: "0"
          })
      }), $(".js-widgetLink").on("click", function() {
          var s = $(this).data("name");
          $(this).parent().hide(), e(s)
      }), $(".js-navLinkText").on("click", function() {
          var s = $(this).data("link");
          $(".td-rewards-row--widgets").children().hide(), $(".td-rewards-site__container, .js-subnav").removeClass("is-opened"), e(s)
      })
    });

})(jQuery, window, document);







