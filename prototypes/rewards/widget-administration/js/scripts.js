(function ($, window, document, undefined) {

  'use strict';

  $.widget.bridge('uitooltip', $.ui.tooltip);

  $(function () {

    $(".tabs").tabs();
    $(".datepicker").datepicker();
    $(".ui-tooltip-icon").uitooltip();
    $(".ui-popover").popover();
    $('.dropdown-toggle').dropdown()
    $('.trivia-categories').sortable({
      connectWith: ".trivia-categories",
      update: function( event, ui ) {
        $('.save-order').removeClass('disabled').removeAttr("disabled");
      }
    });

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

  $(document).ready(function() {
    
    $(document).on('click', '.collapse-container', function() {
      $(this).closest('.panel-header').nextAll('[class^=panel]').hide();
      $(this).removeClass('fa-compress collapse-container').addClass('fa-expand expand-container');
    });

    $(document).on('click', '.expand-container', function() {
      $('.collapse-container').closest('.panel-header').nextAll('[class^=panel]').hide();
      $('.collapse-container').removeClass('fa-compress collapse-container').addClass('fa-expand expand-container');
      $(this).closest('.panel-header').nextAll('[class^=panel]').show();
      $(this).removeClass('fa-expand expand-container').addClass('fa-compress collapse-container');
    });

    var selectText = function () {
      document.execCommand('selectAll', false, null);
    };

    $(document).on('click', '.edit-module-name', function() {
      $(this).prev("span").attr("contenteditable","true").focus();
    });

    $(document).on('blur', '.widget-name span', function() {
      $(this).attr("contenteditable","false").focus();
    });

    $(".widget-name").on('keydown', 'span', function(e) {  
        if(e.keyCode == 13)
        {
            e.preventDefault();
            $(this).blur();
            $('.update-widgets').removeClass('disabled').removeAttr('disabled');
        }
    });

    $(document).on('click', '.toggle-checkbox', function() {
      $('.update-widgets').removeClass('disabled').removeAttr('disabled');
    });

    /* Easy theme switcher code */

    $('input[name="textures"]').click(function(){
        if($(this).attr("id")=="scallop"){
            $('#theme-preview').css("background-image","url(img/pattern-1.png)");
        }
        if($(this).attr("id")=="burst"){
            $('#theme-preview').css("background-image","url(img/pattern-2.png)");
        }
        if($(this).attr("id")=="retro"){
            $('#theme-preview').css("background-image","url(img/pattern-3.png)");
        }
        if($(this).attr("id")=="edgy"){
            $('#theme-preview').css("background-image","url(img/pattern-4.png)");
        }
        if($(this).attr("id")=="modern"){
            $('#theme-preview').css("background-image","url(img/pattern-5.png)");
        }
        if($(this).attr("id")=="rough"){
            $('#theme-preview').css("background-image","url(img/pattern-6.png)");
        }
        $('.update-theme').removeClass('disabled').removeAttr('disabled');
    });

    $('input[name="colors"]').click(function(){
        if($(this).attr("id")=="blue-theme"){
            $('#theme-preview').removeClass().addClass("blue-theme");
        }
        if($(this).attr("id")=="gray-theme"){
            $('#theme-preview').removeClass().addClass("gray-theme");
        }
        if($(this).attr("id")=="green-theme"){
            $('#theme-preview').removeClass().addClass("green-theme");
        }
        if($(this).attr("id")=="orange-theme"){
            $('#theme-preview').removeClass().addClass("orange-theme");
        }
        if($(this).attr("id")=="purple-theme"){
            $('#theme-preview').removeClass().addClass("purple-theme");
        }
        if($(this).attr("id")=="red-theme"){
            $('#theme-preview').removeClass().addClass("red-theme");
        }
        $('.update-theme').removeClass('disabled').removeAttr('disabled');
    });

    /* end theme switcher */

  });


})(jQuery, window, document);







