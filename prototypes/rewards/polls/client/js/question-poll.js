$(document).ready(function(){

      $(".td-polls-question").click (function(){
       $(".td-polls-question").removeClass("td-polls-questions-selected animated bounceIn");
       $(this).addClass("td-polls-questions-selected animated bounceIn");
     });

      $(".td-polls-question").click (function(){
       $(".td-polls-submit-answer-button").removeClass("td-polls-disabled").addClass("animated tada");
     });

      $(".td-polls-submit-answer-button").click(function () {
        $(".td-polls-results-area").show();
        $(".td-polls-questions").hide();
        $(".td-polls-complete-stamp").show();
      });

      $(".td-next-polls-button").click(function () {
        $(".td-polls-previous-results-container").show();
        $(".td-polls-container").hide();
      });

      /*percentage text animation*/

      $('.td-polls-percentage[td-polls-data-percentage]').each(function () {
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
      progress.text(pct) && progress.siblings().children().css('',pct);
    }
  });
      });



$("#q-1").each(function(){
       $("#q-1").addClass("animated fadeInUp");
     });

      $("#q-2").each(function(){
       $("#q-2").addClass("animated fadeInUp");
     });

      $("#q-3").each(function(){
       $("#q-3").addClass("animated fadeInUp");
     });

      $("#q-4").each(function(){
       $("#q-4").addClass("animated fadeInUp");
     });


      $("#q-result-1").each(function(){
       $("#q-result-1").addClass("animated bounceIn");
     });

      $("#q-result-2").each(function(){
       $("#q-result-2").addClass("animated bounceIn");
     });

      $("#q-result-3").each(function(){
       $("#q-result-3").addClass("animated bounceIn");
     });

      $("#q-result-4").each(function(){
       $("#q-result-4").addClass("animated bounceIn");
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