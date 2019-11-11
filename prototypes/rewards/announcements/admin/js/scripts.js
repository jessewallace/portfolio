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

    $(document).on('click', '.announcement-item', function() {
      $('.announcement-item').removeClass('selected');
      $(this).addClass('selected');
    });

    $(document).on('click', '.announcement-item', function() {
      var slideID = $(this).attr("name");
      $(".announcement-customizer .slide").hide();
      $(".slide").removeClass('current');
      $(".announcement-customizer").find("#" + slideID).show().addClass('current');
    });

    var regex = /^(.*)(\d)+$/i;
    var cloneIndex = $(".announcement-item.template").length;

    function newSlide(){
        $('.announcement-item').removeClass('selected');
        $(".slide").removeClass('current');
        $(".announcement-item.template").clone()
            .appendTo('.announcement-organizer ul')
            .removeClass('template').addClass('selected')
            .show()
            .attr("name", "slide-" +  cloneIndex);
        $(".announcement-customizer .slide").hide();
        $(".slide.template").clone()
            .appendTo('.announcement-customizer ul')
            .removeClass('template').addClass('current')
            .show()
            .attr("id", "slide-" +  cloneIndex)
        cloneIndex++;
    }

    $(document).on('click', '.new-announcement', function() {
      newSlide();
      sortableItems();
    });

    function sortableItems() {
      $('.announcement-organizer ul').sortable({
        opacity: 0.8,
        cursor: 'ns-resize',
        tolerance: 'intersect',
        axis: 'y',
        helper: 'clone',
        forceHelperSize: true,
        placeholder: 'item-placeholder'
      });
    }

    sortableItems();

  });

  $(document).on('keyup keypress blur', '.announcement-title', function() {
      var itemID = $(this).closest('.slide').attr("id");
      var input = $(this).text();
      $('.announcement-organizer').find("li[name='" + itemID + "']").find('span.item-title').text(input);
  });

  $('input:radio[name="linkon"]').change(function(){
    if(this.checked && this.value == 'none'){
       $('.cta').hide();
    }
    else {
       $('.cta').show();
    }
  });

  $(document).on('click', '.delete-announcement', function() {
      $('#delete-dialog').dialog({
        autoOpen: false,
        modal: true,
        minWidth: 325,
        resizable: false,
        draggable: false,
        open: function(event, ui) {
          $(this).parent().addClass('animated bounceInDown');
        },
        buttons: [
          {
            text: 'Delete announcement',
            'class': 'button-negative',
            click: function() {
              $(this).dialog('close');
              $(this).parent().removeClass('bounceInDown');
              $('.announcement-item.selected').remove();
              $('.slide.current').remove();
              $('.popover').remove();
              $('.announcement-organizer .announcement-item:last-child').addClass('selected');
              $('.announcement-customizer .slide:last-child').show().addClass('current');
            }
          },
          {
            text: 'Cancel',
            'class': 'button-link',
            click: function() {
              $(this).dialog('close');
              $(this).parent().removeClass('bounceInDown');
            }
          }
        ],
      });
      $('#delete-dialog').dialog("open");
  });

  $('#first-time').dialog({
    autoOpen: true,
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

})(jQuery, window, document);







