
        $(document).ready(function(){


$('.theme-color li').click(function() {
    $('.theme-color li').removeClass('selected');
    $(this).closest('li').addClass('selected');
});

          $('.theme-texture li').click(function() {
    $('.theme-texture li').removeClass('selected');
    $(this).closest('li').addClass('selected');
});

          $(".blue").click(function(){
       $(".td-survey-theme-area").addClass("td-survey--blue").removeClass("td-survey--orange td-survey--green td-survey--purple td-survey--red td-survey--gray");
     });

          $(".green").click(function(){
       $(".td-survey-theme-area").addClass("td-survey--green").removeClass("td-survey--blue td-survey--orange td-survey--purple td-survey--red td-survey--gray");
     });

          $(".orange").click(function(){
       $(".td-survey-theme-area").addClass("td-survey--orange").removeClass("td-survey--blue td-survey--green td-survey--purple td-survey--red td-survey--gray");
     });

          $(".purple").click(function(){
       $(".td-survey-theme-area").addClass("td-survey--purple").removeClass("td-survey--blue td-survey--green td-survey--orange td-survey--red td-survey--gray");
     });

          $(".red").click(function(){
       $(".td-survey-theme-area").addClass("td-survey--red").removeClass("td-survey--blue td-survey--green td-survey--orange td-survey--purple td-survey--gray");
     });

$(".gray").click(function(){
       $(".td-survey-theme-area").addClass("td-survey--gray").removeClass("td-survey--blue td-survey--green td-survey--red td-survey--purple td-survey--orange");
     });



$(".texture--scallop").click(function(){
       $(".td-survey-top-header").addClass("texture--scallop").removeClass("texture--burst texture--retro texture--edgy texture--modern texture--rough");
       $(".td-survey-inline-bg-img-question-survey").hide();
     });

$(".texture--burst").click(function(){
       $(".td-survey-top-header").addClass("texture--burst").removeClass("texture--scallop texture--retro texture--edgy texture--modern texture--rough");
       $(".td-survey-inline-bg-img-question-survey").hide();
     });
$(".texture--retro").click(function(){
       $(".td-survey-top-header").addClass("texture--retro").removeClass("texture--scallop texture--burst texture--edgy texture--modern texture--rough");
       $(".td-survey-inline-bg-img-question-survey").hide();
     });


$(".texture--edgy").click(function(){
       $(".td-survey-top-header").addClass("texture--edgy").removeClass("texture--scallop texture--burst texture--retro texture--modern texture--rough");
       $(".td-survey-inline-bg-img-question-survey").hide();
     });

$(".texture--modern").click(function(){
       $(".td-survey-top-header").addClass("texture--modern").removeClass("texture--scallop texture--burst texture--retro texture--edgy texture--rough");
       $(".td-survey-inline-bg-img-question-survey").hide();
     });

$(".texture--rough").click(function(){
       $(".td-survey-top-header").addClass("texture--rough").removeClass("texture--scallop texture--burst texture--retro texture--edgy texture--modern");
       $(".td-survey-inline-bg-img-question-survey").hide();
     });


});