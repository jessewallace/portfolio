$(document).ready(function(){

      $(".td-survey-question").click (function(){
       $(".td-survey-question").removeClass("td-survey-questions-selected animated bounceIn");
       $(this).addClass("td-survey-questions-selected");
       //animated pulse
     });

      // $(".td-survey-question").on("click", function(){
      //  $("td-survey-radio-button").toggleClass("td-survey-radio-button-selected");

     $('.td-survey-question').click(function(e){
    $('.td-survey-radio-button').removeClass('td-survey-radio-button-selected');
    $(this).find('.td-survey-radio-button').addClass('td-survey-radio-button-selected animated bounceIn');
});


     $(".td-survey-question-yes-no").click (function(){
       $(".td-survey-question-yes-no").removeClass("td-survey-question-selected-yes-no animated bounceIn");
       $(this).addClass("td-survey-question-selected-yes-no animated bounceIn");
     });

    //   if ( $(".td-polls-question").hasClass("td-survey-questions-selected") ) {
    //     $(".td-survey-radio-button").addClass("td-survey-radio-button-selected");
    // }


    //start-screen radio-screen yes-no-screen results-screen


    $("#image-1").click(function () {
        $("#radio-screen").show();
        $("#start-screen").hide();
      });

    $("#image-2").click(function () {
        $("#yes-no-screen").show();
        $("#start-screen").hide();
      });

    $("#image-3").click(function () {
        $("#text-single-screen").show();
        $("#start-screen").hide();
      });

    $("#image-4").click(function () {
        $("#text-multi-screen").show();
        $("#start-screen").hide();
      });

    $("#image-5").click(function () {
        $("#profile-screen").show();
        $("#start-screen").hide();
      });


    $("#image-1-1").click(function () {
        $("#radio-screen").show();
        $("#results-screen").hide();
      });

    $("#image-2-2").click(function () {
        $("#yes-no-screen").show();
        $("#results-screen").hide();
      });



      $("#radio-screen .td-survey-question, .td-survey-question-yes-no").click (function(){
       $(".td-survey-submit-answer-button").removeClass("td-survey-disabled").addClass("animated jello");
       $(".td-submit-area").show();
     });

      $("#text-multi-screen textarea, #text-single-screen input").keyup (function(){
       $(".td-survey-submit-answer-button").removeClass("td-survey-disabled").addClass("animated jello");
       $(".td-submit-area").show();
     });

      $(".td-survey-submit-answer-button").click(function () {
        // $(".td-survey-results-area").show();
        // $(".td-survey-questions").hide();
        // $(".td-survey-complete-stamp").show();

        $("#results-screen").show();
        $("#yes-no-screen").hide();
        $("#text-single-screen").hide();
        $("#text-multi-screen").hide();
        $("#radio-screen").hide();
      });


      $("#td-survey-random-survey").click(function () {
        // $(".td-survey-results-area").show();
        // $(".td-survey-questions").hide();
        // $(".td-survey-complete-stamp").show();

        $("#results-screen").hide();
        $("#yes-no-screen").show();
      });

      // $(".td-next-survey-button").click(function () {
      //   $(".td-survey-previous-results-container").show();
      //   $(".td-survey-container").hide();
      // });

      /*percentage text animation*/

      $('.td-survey-percentage[td-survey-data-percentage]').each(function () {
        var progress = $(this);
        var percentage = Math.ceil($(this).attr('td-survey-data-percentage'));
        $({countNum: 0}).animate({countNum: percentage}, {
          duration: 5000,
          easing:'linear',
          step: function() {
      // What todo on every count
      var pct = '';
      if(percentage == 0){
        pct = Math.floor(this.countNum) + '%';
      }else{
        pct = Math.floor(this.countNum+1) + '%';
      }
      progress.text(pct) && progress.siblings().children().css('',pct);
    }
  });
      });



$("#q-1").each(function(){
       $("#q-1").addClass("animated flipInX");
     });

      $("#q-2").each(function(){
       $("#q-2").addClass("animated flipInX");
     });

      $("#q-3").each(function(){
       $("#q-3").addClass("animated flipInX");
     });

      $("#q-4").each(function(){
       $("#q-4").addClass("animated flipInX");
     });


$("#image-1").each(function(){
       $("#image-1").addClass("animated flipInX");
     });

      $("#image-2").each(function(){
       $("#image-2").addClass("animated flipInX");
     });

      $("#image-3").each(function(){
       $("#image-3").addClass("animated flipInX");
     });

      $("#image-4").each(function(){
       $("#image-4").addClass("animated flipInX");
     });

      $("#image-5").each(function(){
       $("#image-5").addClass("animated flipInX");
     });

      $("#image-6").each(function(){
       $("#image-6").addClass("animated flipInX");
     });



      $("#image-1-1").each(function(){
       $("#image-1-1").addClass("animated flipInX");
     });

      $("#image-2-2").each(function(){
       $("#image-2-2").addClass("animated flipInX");
     });

      $("#image-3-3").each(function(){
       $("#image-3-3").addClass("animated flipInX");
     });

      $("#image-4-4").each(function(){
       $("#image-4-4").addClass("animated flipInX");
     });

      $("#image-5-5").each(function(){
       $("#image-5-5").addClass("animated flipInX");
     });

      $("#image-6-6").each(function(){
       $("#image-6-6").addClass("animated flipInX");
     });


      $("#yes").each(function(){
       $("#yes").addClass("animated bounceIn");
     });

      $("#no").each(function(){
       $("#no").addClass("animated bounceIn");
     });

    $(".multi-text").keyup(function(){
        el = $(this);
        if(el.val().length >= 500){
            el.val( el.val().substr(0, 500) );
        } else {
            $(".charNum").text(0+el.val().length);
        }
    });

   $(".phone").mask("(999) 999-9999");

});

