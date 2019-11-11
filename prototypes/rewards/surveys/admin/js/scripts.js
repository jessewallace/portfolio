(function ($, window, document, undefined) {

  'use strict';    

  $.widget.bridge('uitooltip', $.ui.tooltip);

  $(function () {

    $(".ui-tooltip-icon").uitooltip();
    $(".ui-popover").popover();

    // Filter Toggle Switch
    $('.filter-survey').on('click', function(e) {
      $('.filters').toggle();
      $(this).find('i').toggleClass('fa-caret-down fa-caret-up');
      e.preventDefault();
    });

    $('.instance-table #sortable').sortable({
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

          $(this).find('.instace-priority p.list-order-number').text(listNumber + 1);
        });
      },
    });
    $('.instance-table #sortable').disableSelection();


    // View Report 
    // View Report 
    $('.list-item').on('click', function(e) {
      e.preventDefault();
      if ($(this).hasClass('active')) {
        $(this).toggleClass('active').find('.view-instance-report').removeClass('active'); 
      } else {
        $(this).closest('#sortable').find('.list-item.active').removeClass('active').find('.view-instance-report').removeClass('active');
        $(this).toggleClass('active').find('.view-instance-report').addClass('active');

        $(this).find('.count').each(function() {
          $(this).prop('Counter',0).animate({
            Counter: $(this).data('completions')
          }, {
            duration: 1000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
              }
          });
        });
      }
    });

    $('.meter-bar').each(function() {
      $(this).width($(this).data('vote-count') + '%');
    });


    // Delete survey Dialog
    $('.delete-instance').click(function(e) {
      $(this).closest('.list-item').addClass('itemDeleteConfirm');
      $('#deleteinstance-dialog').dialog('open');
      $('.ui-dialog-titlebar-close').hide();
    });

    $('#deleteinstance-dialog').dialog({
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

              $(this).find('.instance-priority p.list-order-number').text(listNumber + 1);
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
 

    // Start and End Time Datepicker
    $('#survey-startTime, #survey-endTime').datepicker();


    // Points enable 
    $('.survey-points > input').change(function(e) {
      e.preventDefault();
      if ($(this).is(':checked')) {
        $(this).next().next().removeProp('disabled');
      } else {
        $(this).next().next().prop('disabled', true);
      }
      // $(this).next().next().prop('disabled', false);
      $(this).next().next().next('p').toggleClass('disabled');
    });

    // Question Image Upload Button ::: THIS DOESN'T WORK PROPERLY!!!! 
    $(document).on('click', '.question-image-uploader', function() {
      if ($(this).text() == "Upload Image") {
        $(this).html('Remove Image<i class="fa fa-remove"></i>');
      } else {
        $(this).html('Upload Image<i class="fa fa-camera"></i><input type="file" id="survey-question-image" class="widget-question-image">');
      }
    });

    // Back and Next buttons
    $('.survey-next').click(function() {
      $('.survey-leftside').css('overflow','hidden');
      $(this).parent().parent().animate({
        opacity: 0,
      }, 100 );
      $(this).parent().parent().next().animate({
        opacity: 1,
      }, 100 );
      $('.survey-leftside').delay(1100).queue(function (next) { $(this).css('overflow', 'visible'); next(); });
    });

    $('.survey-back').click(function() {
      $('.survey-leftside').css('overflow','hidden');
      $(this).parent().parent().animate({
        opacity: 0,
      }, 100 );
      $(this).parent().parent().prev().animate({
        opacity: 1,
      }, 100 );
      $('.survey-leftside').delay(1100).queue(function (next) { $(this).css('overflow', 'visible'); next(); });
    });

    // Breadcrumb Click Events
    $('.setup').click(function(e) {
      $(this).closest('.breadcrumbs').next().find('.survey-question, .survey-options, .survey-publish, .survey-syndication').animate({opacity: 0}, 100);
      $(this).closest('.breadcrumbs').next().find('.survey-setup').animate({opacity: 1}, 100);
      $(this).closest('.crumbs').find('a').removeClass('active');
      $(this).closest('.crumbs').find('.setup a').addClass('active');
      $('.survey-creation').css({
        transform: 'translateX(0%)',
        transition: 'all 1s ease'
      });
      $(this).closest('.breadcrumbs').next().find('.survey-setup').css('width', '479px').closest('.survey-leftside').css('overflow','hidden').next().css('visibility', 'visible');
      $(this).closest('.breadcrumbs').next().find('.survey-publish').css('display', 'none');
      $('.survey-leftside').delay(1100).queue(function (next) { $(this).css('overflow', 'visible'); next(); });
      e.preventDefault();
    });

    $('.question').click(function(e) {
      $(this).closest('.breadcrumbs').next().find('.survey-setup, .survey-options, .survey-publish, .survey-syndication').animate({opacity: 0}, 100);
      $(this).closest('.breadcrumbs').next().find('.survey-question').animate({opacity: 1}, 100);
      $(this).closest('.crumbs').find('a').removeClass('active');
      $(this).closest('.crumbs').find('.question a').addClass('active');
      $('.survey-creation').css({
        transform: 'translateX(-20%)',
        transition: 'all 1s ease'
      });
      $(this).closest('.breadcrumbs').next().find('.survey-question').css('width', '479px').closest('.survey-leftside').css('overflow','hidden').next().css('visibility', 'visible');
      $(this).closest('.breadcrumbs').next().find('.survey-publish').css('display', 'none');
      $('.survey-leftside').delay(1100).queue(function (next) { $(this).css('overflow', 'visible'); next(); });
      e.preventDefault();
    });

    $('.options').click(function(e) {
      $(this).closest('.breadcrumbs').next().find('.survey-setup, .survey-question, .survey-publish, .survey-syndication').animate({opacity: 0}, 100);
      $(this).closest('.breadcrumbs').next().find('.survey-options').animate({opacity: 1}, 100);
      $(this).closest('.crumbs').find('a').removeClass('active');
      $(this).closest('.crumbs').find('.options a').addClass('active');
      $('.survey-creation').css({
        transform: 'translateX(-40%)',
        transition: 'all 1s ease'
      });
      $(this).closest('.breadcrumbs').next().find('.survey-options').css('width', '479px').closest('.survey-leftside').css('overflow','hidden').next().css('visibility', 'visible');
      $(this).closest('.breadcrumbs').next().find('.survey-publish').css('display', 'none');
      $('.survey-leftside').delay(1100).queue(function (next) { $(this).css('overflow', 'visible'); next(); });
      e.preventDefault();
    });

    $('.syndication').click(function(e) {
      $(this).closest('.breadcrumbs').next().find('.survey-setup, .survey-question, .survey-options, .survey-publish').animate({opacity: 0}, 100);
      $(this).closest('.breadcrumbs').next().find('.survey-syndication').animate({opacity: 1}, 100);
      $(this).closest('.crumbs').find('a').removeClass('active');
      $(this).closest('.crumbs').find('.syndication a').addClass('active');
      $('.survey-creation').css({
        transform: 'translateX(-60%)',
        transition: 'all 1s ease'
      });
      $(this).closest('.breadcrumbs').next().find('.survey-syndication').css('width', '40%').closest('.survey-leftside').css('overflow','visible').next().css('visibility', 'hidden');
      $(this).closest('.breadcrumbs').next().find('.survey-publish').css('display', 'none');
      $('.survey-leftside').delay(1100).queue(function (next) { $(this).css('overflow', 'visible'); next(); });
      e.preventDefault();
    });

    $('.publish').click(function(e) {
      $(this).closest('.breadcrumbs').next().find('.survey-question, .survey-options, .survey-setup, .survey-syndication').animate({opacity: 0}, 100);
      $(this).closest('.breadcrumbs').next().find('.survey-publish').animate({opacity: 1}, 100);
      $(this).closest('.crumbs').find('a').removeClass('active');
      $(this).closest('.crumbs').find('.publish a').addClass('active');
      $('.survey-creation').css({
        transform: 'translateX(-80%)',
        transition: 'all 1s ease'
      });
      $(this).closest('.breadcrumbs').next().find('.survey-publish').css({'width': '479px', 'display': 'block'}).prev().css('width', '479px').closest('.survey-leftside').css('overflow','hidden').next().css('visibility', 'visible');
      $('.survey-leftside').delay(1100).queue(function (next) { $(this).css('overflow', 'visible'); next(); });
      e.preventDefault();
    });

   
    if ($('.survey-publish').hasClass('active') === true) {
      $(this).css('display', 'block');
    } 

    if ($('.survey-publish').hasClass('active') !== true) {
      $(this).css('display', 'none');
    } 


      // Setup Page Next Button
    $('.gotoQuestion').click(function(e) {
      $(this).closest('.survey-creation').css('transform','translateX(-20%)');
      $(this).closest('.survey-creation').prev().find('li.setup a').removeClass('active');
      $(this).closest('.survey-creation').prev().find('li.question a').addClass('active');
      e.preventDefault();
    });


      // Question Page Back Button
    $('.gotoSetup').click(function(e) {
      $(this).closest('.survey-creation').css('transform','translateX(0)');
      $(this).closest('.survey-creation').prev().find('li.question a').removeClass('active');
      $(this).closest('.survey-creation').prev().find('li.setup a').addClass('active');
      e.preventDefault();
    });


        // Question Page Next Button
    $('.gotoOptions').click(function(e) {
      $(this).closest('.survey-creation').css('transform','translateX(-40%)');
      $(this).closest('.survey-creation').prev().find('li.question a').removeClass('active');
      $(this).closest('.survey-creation').prev().find('li.options a').addClass('active');
      e.preventDefault();
    });


      // Options Page Back Button
    $('.gotoQuestion').click(function(e) {
      $(this).closest('.survey-creation').css('transform','translateX(-20%)');
      $(this).closest('.survey-creation').prev().find('li.options a').removeClass('active');
      $(this).closest('.survey-creation').prev().find('li.question a').addClass('active');
      $('.survey-leftside').delay(1100).queue(function (next) { $(this).css('overflow', 'visible'); next(); });
      e.preventDefault();
    });


      // Options Page Next Button
    $('.gotoSyndication').click(function(e) {
      $(this).closest('.survey-creation').css('transform','translateX(-60%)');
      $(this).closest('.survey-creation').prev().find('li.options a').removeClass('active');
      $(this).closest('.survey-creation').prev().find('li.syndication a').addClass('active');
      $(this).closest('.survey-options').next().css('width', '40%').next().css('display', 'none').closest('.survey-leftside').css('overflow','visible').next().css('visibility', 'hidden');
      $('.survey-leftside').delay(1100).queue(function (next) { $(this).css('overflow', 'visible'); next(); });
      e.preventDefault();
    });


      // Syndication Page Back Button
    $('.gotoOptions').click(function(e) {
      $(this).closest('.survey-creation').css('transform','translateX(-40%)');
      $(this).closest('.survey-creation').prev().find('li.syndication a').removeClass('active');
      $(this).closest('.survey-creation').prev().find('li.options a').addClass('active');
      $(this).closest('.survey-syndication').css('width', '479px').next().css('display', 'block').closest('.survey-leftside').css('overflow','hidden').next().css('visibility', 'visible');
      $('.survey-leftside').delay(1100).queue(function (next) { $(this).css('overflow', 'visible'); next(); });
      e.preventDefault();
    });


      // Syndication Page Next Button
    $('.gotoPublish').click(function(e) {
      $(this).closest('.survey-creation').css('transform','translateX(-80%)');
      $(this).closest('.survey-creation').prev().find('li.syndication a').removeClass('active');
      $(this).closest('.survey-creation').prev().find('li.publish a').addClass('active');
      $(this).closest('.survey-syndication').css('width', '479px').next().css('display', 'block').closest('.survey-leftside').css('overflow','hidden').next().css('visibility', 'visible');
      $('.survey-leftside').delay(1100).queue(function (next) { $(this).css('overflow', 'visible'); next(); });
     e.preventDefault();
    });


      // Publish Page Back Button
    $('.gotoSyndication').click(function(e) {
      $(this).closest('.survey-creation').css('transform','translateX(-60%)');
      $(this).closest('.survey-creation').prev().find('li.publish a').removeClass('active');
      $(this).closest('.survey-creation').prev().find('li.syndication a').addClass('active');
      $(this).closest('.survey-publish').css('display','none').prev().css('width', '40%').closest('.survey-leftside').css('overflow','visible').next().css('visibility', 'hidden');
      $('.survey-leftside').delay(1100).queue(function (next) { $(this).css('overflow', 'visible'); next(); });
      e.preventDefault();
    });


    // Points enable 
    $('.survey-points input').change(function() {
      $(this).parent('label').next('input').toggleClass('disabled');
      $(this).parent('label').next().next('p').toggleClass('disabled');
    });


    // Sortable Choices - Questions
    $('.widget-question-holder').sortable({
      opacity: 0.8,
      cursor: 'ns-resize',
      handle: '.panel-header .fa-bars',
      axis: 'y',
      cursorAt: { top: 200, left: -436 },
      placeholder: 'ui-sortable-placeholder',
      start: function(e, ui){
        ui.placeholder.height(ui.item.outerHeight());
      }
    });

    function initLogicPopover() {
      $('.add-logic').popover({
        trigger:"manual",
        html:true,
        placement:"top",
        content:"When this answer is selected, <select name='logic-change'><option value='nothing'>Do nothing</><option value='goto'>Go to question</option><option value='end'>End the survey</option></select><select style='display:none;' name='goto-quesiton'><option value='empty'>Select a question</option><option value='1'>Question title goes here</option><option value='2'>Question title goes here</option><option value='3'>Question title goes here</option></select>"
      }).popover('show').next('.popover').hide();
      $(document).on('click', '.add-logic', function() {
        
        if($(this).is('.active')) {
          $(this).removeClass('active').next('.popover').hide();
        }
        
        else{
          $('.add-logic').removeClass('active');
          $('.popover').hide();
          $(this).addClass('active').next('.popover').show();
        }

      });
      $('select[name="logic-change"]').on('change',function(){
        if($(this).val()=="nothing"){
            $(this).closest('.sortable-choice').find('.add-logic').removeClass('button-positive active').find('.fa').removeClass('fa-check').addClass('fa-plus');
            $(this).next('select[name="goto-quesiton"]').hide();
            $(this).closest('.sortable-choice').find('.popover').hide();
        }
        if($(this).val()=="goto"){
            $(this).next('select[name="goto-quesiton"]').show();
        }
        if($(this).val()=="end"){
            $(this).closest('.sortable-choice').find('.add-logic').addClass('button-positive active').find('.fa').removeClass('fa-plus').addClass('fa-check');
            $(this).next('select[name="goto-quesiton"]').hide();
            $(this).closest('.sortable-choice').find('.popover').hide();
        }
      });
      $('select[name="goto-quesiton"]').on('change',function(){
        if($(this).val()=="empty"){
        }
        else{
            $(this).closest('.sortable-choice').find('.add-logic').addClass('button-positive active').find('.fa').removeClass('fa-plus').addClass('fa-check');
            $(this).closest('.sortable-choice').find('.popover').hide();        }
      });
    }

    // Sortable Choices - text only
    function sortableAnswers() {
      $('.sortable-choices').sortable({
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
      initLogicPopover();
    }

    


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

    $(document).on('click', '.add-choice', function() {
      $(this).prev().find('.sortable-choice:last-child').after('<div class="sortable-choice"><i class="fa fa-bars ui-sortable-handle"></i><input class="choices" type="text" /><i class="fa fa-times-circle"></i><a class="add-logic button" role"button" tabindex=3><i class="fa fa-plus"></i> Logic</a></div>');
      initLogicPopover();
      $(".ui-popover").popover();
      updateRemaining(true);
    });

    $(document).on('click', '.sortable-choice .fa-times-circle', function() {
      $(this).parent('div').remove();
      updateRemaining(false);
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
    
    // Open targeting selector dialog
    $(document).on('click', '.survey-column-trigger', function() {
      var columnTrigger = $(this);
      $('#targeting-selector-dialog').dialog({
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
            text: 'Set Data Field',
            'class': 'button-highlight',
            click: function() {
              $(this).dialog('close');
              $(this).parent().removeClass('bounceInDown');
              columnTrigger.text('Some New Field');
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
      $('#targeting-selector-dialog').dialog('open');
    });

    

    /* Delete survey question */
    $(document).on('click', '.delete-question', function() {
      $(this).closest('.survey-question-type').remove();
    });

    $(document).on('click', '.deactivate-question', function() {
      $(this).closest('.survey-question-type').toggleClass('deactivated');
      $(this).closest('.panel-header').nextAll('[class^=panel]').toggle();
      $('.question-settings').popover('hide');
    });

    // /* Add multiple choice question */
    // $('.add-multiple-choice').click(function(e) {
    //   $('.multiple-choice.template').clone().appendTo('.widget-question-holder').removeClass('template').show();
    //   sortableAnswers();
    // });

    // /* Add multiple choice question */
    // $('.add-yesno').click(function(e) {
    //   $('.yesno.template').clone().appendTo('.widget-question-holder').removeClass('template').show();
    //   sortableAnswers();
    // });


    var regex = /^(.*)(\d)+$/i;
    var cloneIndex = $(".multiple-choice.template").length;

    function cloneMult(){
        $(".multiple-choice.template").clone()
            .appendTo('.widget-question-holder')
            .removeClass('template')
            .show()
            .attr("id", "survey-question-" +  cloneIndex)
            .find("#toggle-surveyFilter").attr("id", "#toggle-surveyFilter-" +  cloneIndex)
            .next(".toggle-container").attr("for", "#toggle-surveyFilter-" +  cloneIndex)
            sortableAnswers()
        cloneIndex++;
        $(".ui-popover").popover();
    }

    function cloneYesNo(){
        $(".yesno.template").clone()
            .appendTo('.widget-question-holder')
            .removeClass('template')
            .show()
            .attr("id", "survey-question-" +  cloneIndex)
            .find("#toggle-surveyFilter").attr("id", "#toggle-surveyFilter-" +  cloneIndex)
            .next(".toggle-container").attr("for", "#toggle-surveyFilter-" +  cloneIndex)
        cloneIndex++;
        $(".ui-tooltip-icon").uitooltip();
        $(".ui-popover").popover();
    }

    function cloneText(){
        $(".text-entry.template").clone()
            .appendTo('.widget-question-holder')
            .removeClass('template')
            .show()
            .attr("id", "survey-question-" +  cloneIndex)
            .find("#toggle-surveyFilter").attr("id", "#toggle-surveyFilter-" +  cloneIndex)
            .next(".toggle-container").attr("for", "#toggle-surveyFilter-" +  cloneIndex)
        cloneIndex++;
        $(".ui-popover").popover();
    }



    $(".add-multiple-choice").on("click", cloneMult);
    $(".add-yesno").on("click", cloneYesNo);
    $(".add-text").on("click", cloneText);



    /* Toggle panel content */
    $(document).on('click', '.collapse-question', function() {
      $(this).closest('.panel-header').nextAll('[class^=panel]').toggle();
    });

    $(document).on('click', '.create-button', function() {
      $('.survey-add-question').addClass('has-text-divider');
    });

    /* Bind value of input to panel header */
    $(document).on('keyup keypress blur', 'input.mirror-field', function() {
        var input = $(this).val();
        $(this).closest('.panel').find('.panel-title').text(input);
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

    $(document).on('change', '#silverpop-sub', function(){
      if ($(this).val() === 'no'){
          $('.vendor-message').addClass('disabled');
          $('.vendor-message input').prop( "disabled", true );
      }
      if ($(this).val() === 'other'){
          $('.vendor-message').removeClass('disabled');
          $('.vendor-message input').prop( "disabled", false );
      }
    });

    $('body').on('hidden.bs.popover', function (e) {
      $(e.target).data("bs.popover").inState.click = false;
    });

  });
})(jQuery, window, document);







