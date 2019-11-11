(function ($, window, document, undefined) {

  'use strict';

  $.widget.bridge('uitooltip', $.ui.tooltip);

  $(function () {

    $(".datepicker").datepicker();
    $(".ui-tooltip-icon").uitooltip();
    $(".ui-popover").popover();
    $('.dropdown-toggle').dropdown()
    $('.fieldpicker-root').accordion({
      header: "div.reg-fields",
      collapsible: true,
      heightStyle: "content"
    });
    $('.fieldpicker-root').sortable();

    function newRegFieldStuff() {
      $('.fieldpicker-root').accordion('refresh');
      $('.fieldpicker-root').accordion({
        active: -1,
        header: "div.reg-fields",
        collapsible: true,
        heightStyle: "content"
      });
      $(".reg-controls").click(function(e) {
        e.stopPropagation();
      });
      $('.reg-controls .deny:not(.disabled)').click(function() {

        var thisParent = $(this).closest('li')
        
        $('#delete-dialog').dialog({
          autoOpen: false,
          modal: true,
          minWidth: 325,
          resizable: false,
          draggable: false,
          buttons: [
            {
              text: 'Permenantly delete field',
              'class': 'button-negative',
              click: function() {
                $(this).dialog('close');
                thisParent.remove();
              }
            },
            {
              text: 'Cancel',
              'class': 'button-link',
              click: function() {
                $(this).dialog('close');
              }
            }
          ],
        });
        $('#delete-dialog').dialog("open");
      });
    }

    $(".add-reg-text").click(function() {
      $(".reg-type-text.template").clone().appendTo('.fieldpicker-root').removeClass('template').show();
      newRegFieldStuff();
    });

    $(".add-reg-paragraph").click(function() {
      $(".reg-type-paragraph.template").clone().appendTo('.fieldpicker-root').removeClass('template').show();
      newRegFieldStuff();
    });

    $(".add-reg-dropdown").click(function() {
      $(".reg-type-dropdown.template").clone().appendTo('.fieldpicker-root').removeClass('template').show();
      newRegFieldStuff();
    });

    $(".add-reg-multiple").click(function() {
      $(".reg-type-multiple.template").clone().appendTo('.fieldpicker-root').removeClass('template').show();
      newRegFieldStuff();
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
    
    $(".reg-controls").click(function(e) {
      e.stopPropagation();
    });

    $(".form-dupe").click(function(e) {
      $("#form-dupe").dialog({
        modal: true,
        resizable: false,
        draggable: false,
        minWidth:500,
        buttons: [
            {
              text: 'Duplicate',
              'class': 'button-positive',
              click: function() {
                $(this).dialog('close');
                $('body').append("<div class='status-message success center-text'>Form successfully duplicated</div>");
                $('.status-message').delay(2500).fadeOut();
              }
            },
            {
              text: 'Cancel',
              'class': 'button-link',
              click: function() {
                $(this).dialog('close');
              }
            }
          ]
      });
    });

  });

  $(document).on('keyup keypress blur', '.customfieldnameinput', function() {
      $(this).closest('.config-group').prev('.reg-fields').find('.reg-label').text($(this).val());
  });

  $(document).on('click', '.multiAddOption', function() {
      $(this).closest('div').prev('.ui-list').append("<li class='option-row'><input class='option' type='text' value=''><a class='icon-remove-sign fa fa-times-circle deny'></a></li>");
  });

  $(document).on('click', '.option-row .deny', function() {
      $(this).closest('li').remove();
  });

  $(document).on('click', '.config-done', function() {
      $('.fieldpicker-root').accordion({
        active: false
      });
  });

  

})(jQuery, window, document);







