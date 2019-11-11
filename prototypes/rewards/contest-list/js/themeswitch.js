
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
       $(".td-contest-widget").addClass("td-contest--blue").removeClass("td-contest--orange td-contest--green td-contest--purple td-contest--red td-contest--gray");
     });

          $(".green").click(function(){
       $(".td-contest-widget").addClass("td-contest--green").removeClass("td-contest--blue td-contest--orange td-contest--purple td-contest--red td-contest--gray");
     });

          $(".orange").click(function(){
       $(".td-contest-widget").addClass("td-contest--orange").removeClass("td-contest--blue td-contest--green td-contest--purple td-contest--red td-contest--gray");
     });

          $(".purple").click(function(){
       $(".td-contest-widget").addClass("td-contest--purple").removeClass("td-contest--blue td-contest--green td-contest--orange td-contest--red td-contest--gray");
     });

          $(".red").click(function(){
       $(".td-contest-widget").addClass("td-contest--red").removeClass("td-contest--blue td-contest--green td-contest--orange td-contest--purple td-contest--gray");
     });

$(".gray").click(function(){
       $(".td-contest-widget").addClass("td-contest--gray").removeClass("td-contest--blue td-contest--green td-contest--red td-contest--purple td-contest--orange");
     });



$(".texture--scallop").click(function(){
       $(".td-contest-header").addClass("texture--scallop").removeClass("texture--burst texture--retro texture--edgy texture--modern texture--rough");
     });

$(".texture--burst").click(function(){
       $(".td-contest-header").addClass("texture--burst").removeClass("texture--scallop texture--retro texture--edgy texture--modern texture--rough");
     });
$(".texture--retro").click(function(){
       $(".td-contest-header").addClass("texture--retro").removeClass("texture--scallop texture--burst texture--edgy texture--modern texture--rough");
     });


$(".texture--edgy").click(function(){
       $(".td-contest-header").addClass("texture--edgy").removeClass("texture--scallop texture--burst texture--retro texture--modern texture--rough");
     });

$(".texture--modern").click(function(){
       $(".td-contest-header").addClass("texture--modern").removeClass("texture--scallop texture--burst texture--retro texture--edgy texture--rough");
     });

$(".texture--rough").click(function(){
       $(".td-contest-header").addClass("texture--rough").removeClass("texture--scallop texture--burst texture--retro texture--edgy texture--modern");
     });


});