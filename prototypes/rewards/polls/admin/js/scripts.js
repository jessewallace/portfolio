(function ($, window, document, undefined) {

  'use strict';

  $(function () {

    // Filter Toggle Switch
    $('.filter-polls').on('click', function(e) {
      $('.filters').toggle();
      $(this).find('i').toggleClass('fa-caret-down fa-caret-up');
      e.preventDefault();
    });

    $('.polls-table #sortable').sortable({
      placeholder: 'ui-sortable-placeholder',
      opacity: 0.8,
      axis: 'y',
      helper: 'clone',
      // items: '> tr.list-item',
      tolerance: 'intersect',
      start: function(e, ui) {
        $(ui.helper).css('box-shadow','0 0 5px #0069AC');
      },
      cursor: 'ns-resize',
      forceHelperSize: true,
      handle: '.fa-bars',
      update: function(event, ui) {
        $('#sortable .list-item').each(function() {

          var listNumber = $(this).index();

          $(this).find('.poll-priority p.list-order-number').text(listNumber + 1);
        });
      },
    });
    $('.polls-table #sortable').disableSelection();


    // View Report 
    $('.list-item div[class^="poll"]').on('click', function(e) {
      e.preventDefault();
      if ($(this).parent().hasClass('active')) {
        $(this).parent().toggleClass('active').find('.view-poll-report').removeClass('active'); 
      } else {
        $(this).closest('#sortable').find('.list-item.active').removeClass('active').find('.view-poll-report').removeClass('active');
        $(this).parent().toggleClass('active').find('.view-poll-report').addClass('active');
        $(this).closest('html,body').animate({
          scrollTop: $(this).offset().top
        }, 400);
      }
    });

    $('.meter-bar').each(function() {
      $(this).width($(this).data('vote-count') + '%');
    });


    // Delete Poll Dialog
    $('.delete-poll').click(function(e) {
      $(this).closest('.list-item').addClass('itemDeleteConfirm');
      $('#deletePoll-dialog').dialog('open');
      $('.ui-dialog-titlebar-close').hide();
    });

    $('#deletePoll-dialog').dialog({
      autoOpen: false,
      modal: true,
      minWidth: 425,
      resizable: false,
      draggable: false,
      open: function(event, ui) {
        $(this).parent().addClass('animated bounceInDown');
      },
      buttons: [
        {
          text: 'Delete',
          'class': 'button-negative',
          click: function() {
            $('body').find('.itemDeleteConfirm').remove();
            $('#sortable .list-item').each(function() {

              var listNumber = $(this).index();

              $(this).find('.poll-priority p.list-order-number').text(listNumber + 1);
            });
            $(this).dialog('close');
            $(this).parent().removeClass('bounceInDown');
          }
        },
        {
          text: 'Cancel',
          click: function() {
            $('body').find('.itemDeleteConfirm').removeClass('itemDeleteConfirm');
            $(this).dialog('close');
            $(this).parent().removeClass('bounceInDown');
          }
        }
      ],
    });


    // Poll-Type Dialog
    $('#createPoll-dialog').dialog({
      autoOpen: false,
      modal: true,
      resizable: false,
      draggable: false,
      minWidth: 525,
      position: {my: 'center', at: 'center', of: window.top},
      open: function(event, ui) {
        $(this).parent().addClass('animated bounceInDown');
        return false;
      },
      buttons: [
        {
          text: 'Cancel',
          click: function() {
            $(this).dialog('close');
            $(this).parent().removeClass('animated bounceInDown');
          }
        }
      ],
    });

    $('#createPoll-modal').click(function(e) {
      $('#createPoll-dialog').dialog('open');
      $('.ui-dialog-titlebar-close').hide();
    });
    

    // Start and End Time Datepicker
    $('#poll-startTime, #poll-endTime').datepicker();


    // Points enable 
    $('.poll-points > input').change(function(e) {
      e.preventDefault();
      if ($(this).is(':checked')) {
        $(this).next().next().removeProp('disabled');
      } else {
        $(this).next().next().prop('disabled', true);
      }
      // $(this).next().next().prop('disabled', false);
      $(this).next().next().next('p').toggleClass('disabled');
    });


    // Back and Next buttons
    $('.poll-next').click(function() {
      $(this).parent().parent().animate({
        opacity: 0,
      }, 100 );
      $(this).parent().parent().next().animate({
        opacity: 1,
      }, 100 );
    });

    $('.poll-back').click(function() {
      $(this).parent().parent().animate({
        opacity: 0,
      }, 100 );
      $(this).parent().parent().prev().animate({
        opacity: 1,
      }, 100 );
    });


    // Breadcrumb Click Events
    $('.setup').click(function(e) {
      $(this).closest('.breadcrumbs').next().find('.poll-question, .poll-options, .poll-publish, .poll-syndication').animate({opacity: 0}, 100);
      $(this).closest('.breadcrumbs').next().find('.poll-setup').animate({opacity: 1}, 100);
      $(this).closest('.crumbs').find('a').removeClass('active');
      $(this).closest('.crumbs').find('.setup a').addClass('active');
      $('.poll-creation').css({
        transform: 'translateX(0%)',
        transition: 'all 1s ease'
      });
      $(this).closest('.breadcrumbs').next().find('.poll-setup').css('width', '479px').closest('.poll-leftside').css('overflow','hidden').next().css('visibility', 'visible');
      $(this).closest('.breadcrumbs').next().find('.poll-publish').css('display', 'none');
      e.preventDefault();
    });

    $('.question').click(function(e) {
      $(this).closest('.breadcrumbs').next().find('.poll-setup, .poll-options, .poll-publish, .poll-syndication').animate({opacity: 0}, 100);
      $(this).closest('.breadcrumbs').next().find('.poll-question').animate({opacity: 1}, 100);
      $(this).closest('.crumbs').find('a').removeClass('active');
      $(this).closest('.crumbs').find('.question a').addClass('active');
      $('.poll-creation').css({
        transform: 'translateX(-20%)',
        transition: 'all 1s ease'
      });
      $(this).closest('.breadcrumbs').next().find('.poll-question').css('width', '479px').closest('.poll-leftside').css('overflow','hidden').next().css('visibility', 'visible');
      $(this).closest('.breadcrumbs').next().find('.poll-publish').css('display', 'none');
      e.preventDefault();
    });

    $('.options').click(function(e) {
      $(this).closest('.breadcrumbs').next().find('.poll-setup, .poll-question, .poll-publish, .poll-syndication').animate({opacity: 0}, 100);
      $(this).closest('.breadcrumbs').next().find('.poll-options').animate({opacity: 1}, 100);
      $(this).closest('.crumbs').find('a').removeClass('active');
      $(this).closest('.crumbs').find('.options a').addClass('active');
      $('.poll-creation').css({
        transform: 'translateX(-40%)',
        transition: 'all 1s ease'
      });
      $(this).closest('.breadcrumbs').next().find('.poll-options').css('width', '479px').closest('.poll-leftside').css('overflow','hidden').next().css('visibility', 'visible');
      $(this).closest('.breadcrumbs').next().find('.poll-publish').css('display', 'none');
      e.preventDefault();
    });

    $('.syndication').click(function(e) {
      $(this).closest('.breadcrumbs').next().find('.poll-setup, .poll-question, .poll-options, .poll-publish').animate({opacity: 0}, 100);
      $(this).closest('.breadcrumbs').next().find('.poll-syndication').animate({opacity: 1}, 100);
      $(this).closest('.crumbs').find('a').removeClass('active');
      $(this).closest('.crumbs').find('.syndication a').addClass('active');
      $('.poll-creation').css({
        transform: 'translateX(-60%)',
        transition: 'all 1s ease'
      });
      $(this).closest('.breadcrumbs').next().find('.poll-syndication').css('width', '40%').closest('.poll-leftside').css('overflow','visible').next().css('visibility', 'hidden');
      $(this).closest('.breadcrumbs').next().find('.poll-publish').css('display', 'none');
      e.preventDefault();
    });

    $('.publish').click(function(e) {
      $(this).closest('.breadcrumbs').next().find('.poll-question, .poll-options, .poll-setup, .poll-syndication').animate({opacity: 0}, 100);
      $(this).closest('.breadcrumbs').next().find('.poll-publish').animate({opacity: 1}, 100);
      $(this).closest('.crumbs').find('a').removeClass('active');
      $(this).closest('.crumbs').find('.publish a').addClass('active');
      $('.poll-creation').css({
        transform: 'translateX(-80%)',
        transition: 'all 1s ease'
      });
      $(this).closest('.breadcrumbs').next().find('.poll-publish').css({'width': '479px', 'display': 'block'}).prev().css('width', '479px').closest('.poll-leftside').css('overflow','hidden').next().css('visibility', 'visible');
      e.preventDefault();
    });

   
    if ($('.poll-publish').hasClass('active') === true) {
      $(this).css('display', 'block');
    } 

    if ($('.poll-publish').hasClass('active') !== true) {
      $(this).css('display', 'none');
    } 


      // Setup Page Next Button
    $('.gotoQuestion').click(function(e) {
      $(this).closest('.poll-creation').css('transform','translateX(-20%)');
      $(this).closest('.poll-creation').prev().find('li.setup a').removeClass('active');
      $(this).closest('.poll-creation').prev().find('li.question a').addClass('active');
      e.preventDefault();
    });


      // Question Page Back Button
    $('.gotoSetup').click(function(e) {
      $(this).closest('.poll-creation').css('transform','translateX(0)');
      $(this).closest('.poll-creation').prev().find('li.question a').removeClass('active');
      $(this).closest('.poll-creation').prev().find('li.setup a').addClass('active');
      e.preventDefault();
    });


        // Question Page Next Button
    $('.gotoOptions').click(function(e) {
      $(this).closest('.poll-creation').css('transform','translateX(-40%)');
      $(this).closest('.poll-creation').prev().find('li.question a').removeClass('active');
      $(this).closest('.poll-creation').prev().find('li.options a').addClass('active');
      e.preventDefault();
    });


      // Options Page Back Button
    $('.gotoQuestion').click(function(e) {
      $(this).closest('.poll-creation').css('transform','translateX(-20%)');
      $(this).closest('.poll-creation').prev().find('li.options a').removeClass('active');
      $(this).closest('.poll-creation').prev().find('li.question a').addClass('active');
      e.preventDefault();
    });


      // Options Page Next Button
    $('.gotoSyndication').click(function(e) {
      $(this).closest('.poll-creation').css('transform','translateX(-60%)');
      $(this).closest('.poll-creation').prev().find('li.options a').removeClass('active');
      $(this).closest('.poll-creation').prev().find('li.syndication a').addClass('active');
      $(this).closest('.poll-options').next().css('width', '40%').next().css('display', 'none').closest('.poll-leftside').css('overflow','visible').next().css('visibility', 'hidden');
      e.preventDefault();
    });


      // Syndication Page Back Button
    $('.gotoOptions').click(function(e) {
      $(this).closest('.poll-creation').css('transform','translateX(-40%)');
      $(this).closest('.poll-creation').prev().find('li.syndication a').removeClass('active');
      $(this).closest('.poll-creation').prev().find('li.options a').addClass('active');
      $(this).closest('.poll-syndication').css('width', '479px').next().css('display', 'block').closest('.poll-leftside').css('overflow','hidden').next().css('visibility', 'visible');
      e.preventDefault();
    });


      // Syndication Page Next Button
    $('.gotoPublish').click(function(e) {
      $(this).closest('.poll-creation').css('transform','translateX(-80%)');
      $(this).closest('.poll-creation').prev().find('li.syndication a').removeClass('active');
      $(this).closest('.poll-creation').prev().find('li.publish a').addClass('active');
      $(this).closest('.poll-syndication').css('width', '479px').next().css('display', 'block').closest('.poll-leftside').css('overflow','hidden').next().css('visibility', 'visible');
      e.preventDefault();
    });


      // Publish Page Back Button
    $('.gotoSyndication').click(function(e) {
      $(this).closest('.poll-creation').css('transform','translateX(-60%)');
      $(this).closest('.poll-creation').prev().find('li.publish a').removeClass('active');
      $(this).closest('.poll-creation').prev().find('li.syndication a').addClass('active');
      $(this).closest('.poll-publish').css('display','none').prev().css('width', '40%').closest('.poll-leftside').css('overflow','visible').next().css('visibility', 'hidden');
      e.preventDefault();
    });


    // Points enable 
    $('.poll-points input').change(function() {
      $(this).parent('label').next('input').toggleClass('disabled');
      $(this).parent('label').next().next('p').toggleClass('disabled');
    });


    // Question Image Upload Button ::: THIS DOESN'T WORK PROPERLY!!!! 
    $('input:file#poll-question-image, input:button#poll-question-image').change(function() {
      var imageValidation = $.trim($(this).val());

      if ($(imageValidation.length > 0)) {
        $(this).parent().html('Remove Image' + '<i class="fa fa-times-circle"></i><input type="button" id="poll-question-image" />').on('click', function() {
          $(this).removeData().html('Upload Image' + '<i class="fa fa-camera"></i><input type="file" id="poll-question-image" />');
        });
      } 
    });


    // Sortable Choices - text only
    $('#sortable.sortable-choices').sortable({
      opacity: 0.8,
      cursor: 'ns-resize',
      tolerance: 'intersect',
      handle: '.fa-bars',
      axis: 'y',
      helper: 'clone',
      forceHelperSize: true,
      cursorAt: { top: 200, left: -436 },
      placeholder: 'sortable-placeholder',
      start: function(e, ui) {
        $(ui.helper).find('input').css('box-shadow','0 0 5px #0069AC');
      }
    });


    // Add Another Choice for Text Choices
    var remainingChoices = 2;

    function updateRemaining(isAdd) {
      if (isAdd) {
        remainingChoices = remainingChoices - 1;
      } else {
        remainingChoices = remainingChoices + 1;
      }

      $('.sortable-choices-text').index();
      if (remainingChoices === 0) {
        $('.add-choice').prop('disabled', true);
      } else {
        $('.add-choice').prop('disabled', false);
      }
    }

    $('.add-choice').click(function() {
      $(this).prev().find('.sortable-choice:last-child').after('<div class="sortable-choice"><i class="fa fa-bars"></i><input class="choices" type="text" /><i class="fa fa-times-circle"></i></div>');

      updateRemaining(true);
    });

    $(document).on('click', '.sortable-choice .fa-times-circle', function() {
      $(this).parent('div').remove();
      updateRemaining(false);
    });


    // Sortable Choices - image
    $('ul.sortable-choices-image').sortable({
      opacity: 0.8,
      cursor: 'move',
      handle: '.fa-bars',
      helper: 'clone',
      forceHelperSize: true,
      tolerance: 'pointer',
      placeholder: 'image-placeholder',
      cursorAt: {top: 200, left: -436 },
      start: function(e, ui) {
        $(ui.helper).find('input, div.poll-choices-image-uploader').css('box-shadow','0 0 5px #0069AC');
      }
    });
    
    $('ul.sortable-choices-image').disableSelection();


    // Sortable Choices - image & text
    $('ul.sortable-choices-imageText').sortable({
      opacity: 0.8,
      cursor: 'move',
      handle: '.fa-bars',
      helper: 'clone',
      forceHelperSize: true,
      tolerance: 'pointer',
      placeholder: 'imageText-placeholder',
      cursorAt: { top: 200, left: -436 },
      start: function(e, ui) {
        $(ui.helper).find('input, div.poll-choices-image-uploader').css('box-shadow','0 0 5px #0069AC');
      }
    });
    
    $('ul.sortable-choices-imageText').disableSelection();


    // Hover function remove links
    $('.poll-choices-image-uploader').on('mouseover', function() {
      if ($(this).find('.dz-preview').length) {
        $(this).find('.image-uploaded-options').addClass('active');
      } else {
        if (!$(this).find('.dz-preview').length) {
          $(this).find('.image-uploaded-options').removeClass('active');
        }
      }
    });

    $('.poll-choices-image-uploader').on('mouseout', function() {
      if ($(this).find('.dz-preview').length) {
        $(this).find('.image-uploaded-options').removeClass('active');
      } else {
        if (!$(this).find('.dz-preview').length) {
          $(this).find('.image-uploaded-options').removeClass('active');
        }
      }
    });


    // Remove Link
    $('.fa-trash-o').click(function() {
      $(this).parent().next().find('.dz-preview').remove();
      $(this).parent().removeClass('active');
    });


    // Options Page
    $('.round-input').on('click', 'input[type="radio"]', function() {
      $(this).prop('checked', true);
    });

    $('.poll-colors, .poll-textures').find('input[name="colors"]').attr("disabled","disabled");

    $('input[name="override-theme"]').change(function(e) {
      if ($(this).is(':checked')) {
        $('.poll-colors, .poll-textures').removeClass('disabled').find('input[name="colors"]').removeAttr("disabled");
      } else {
        $('.poll-colors, .poll-textures').addClass('disabled').find('input[name="colors"]').attr("disabled","disabled");
      }
    });

    $('.publishButton').click(function() {
      $(this).hide(0, function() {
        $(this).replaceWith('<a href="index.html"><button class="gotoDash button-highlight pull-right">Go to Dashboard<i class="fa fa-arrow-circle-right"></i></button></a>');
      });
      $('.publish, .published').toggleClass('active');
      setTimeout(function() {
        $('.publish, .published').toggleClass('visible');
      }, 300);
      setTimeout(function() {
        $('.fa-check-circle').addClass('animated bounceInLeft').css('display', 'block');
      }, 300);
    });

  });
})(jQuery, window, document);







