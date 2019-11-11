$(document).ready(function(){

      $(".td-polls-question").click(function(){
       $(".td-polls-question").removeClass("td-polls-questions-selected");
       $(this).addClass("td-polls-questions-selected");
     });

      $(".td-polls-question").click(function(){
       $(".td-polls-question").addClass("td-polls-question-not-selected");
     });

      $(".td-polls-question").click(function(){
       $(".td-polls-submit-answer-button").removeClass("td-polls-disabled").addClass("animated tada");
     });

      $(".td-polls-submit-answer-button").click(function () {
        $(".td-polls-results-area").show();
        $(".td-polls-image-questions").hide();
        $(".td-polls-complete-stamp").show();
      });

      $(".td-next-polls-button").click(function () {
        $(".td-polls-previous-results-container").show();
        $(".td-polls-container").hide();
      });

      /*percentage text animation*/

      $('.td-polls-results-percentage-text[td-polls-data-percentage]').each(function () {
        var progress = $(this);
        var percentage = Math.ceil($(this).attr('td-polls-data-percentage'));
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
      progress.text(pct) && progress.siblings().children().css('width',pct);
    }
  });
      });

      $('.td-polls-total-votes-vote[td-polls-data-percentage]').each(function () {
        var progress = $(this);
        var percentage = Math.ceil($(this).attr('td-polls-data-percentage'));
        $({countNum: 0}).animate({countNum: percentage}, {
          duration: 4000,
          easing:'linear',
          step: function() {
      // What todo on every count
      var pct = '';
      if(percentage == 0){
        pct = Math.floor(this.countNum) + '';
      }else{
        pct = Math.floor(this.countNum+1) + '';
      }
      progress.text(pct) && progress.siblings().children().css('',pct);
    }
  });
      });

        $("#image-1").each(function(){
       $("#image-1").addClass("animated flipInY");
     });

      $("#image-2").each(function(){
       $("#image-2").addClass("animated flipInY");
     });

      $("#image-3").each(function(){
       $("#image-3").addClass("animated flipInY");
     });

      $("#image-4").each(function(){
       $("#image-4").addClass("animated flipInY");
     });


      $("#result-1").each(function(){
       $("#result-1").addClass("animated bounceIn");
     });

      $("#result-2").each(function(){
       $("#result-2").addClass("animated bounceIn");
     });

      $("#result-3").each(function(){
       $("#result-3").addClass("animated bounceIn");
     });

      $("#result-4").each(function(){
       $("#result-4").addClass("animated bounceIn");
     });


      $("#more-1").each(function(){
       $("#more-1").addClass("animated bounceInUp");
     });

      $("#more-2").each(function(){
       $("#more-2").addClass("animated bounceInUp");
     });

      $("#more-3").each(function(){
       $("#more-3").addClass("animated bounceInUp");
     });

      $("#more-4").each(function(){
       $("#more-4").addClass("animated bounceInUp");
     });


    });