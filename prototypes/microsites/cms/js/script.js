$(window).load(function() {
    $('.loading').hide();
});

$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
                || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

$(document).ready(function () {

    // hide #back-top first
    $("#back-top").hide();

    // fade in #back-top
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 800) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });

        // scroll body to 0px on click
        $('#back-top a').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });
});

/**hide button on scroll**/
$(document).ready(function () {

    // hide #back-top first
    $(".buttontop").show();

    // fade in #back-top
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 4400) {
                $('.buttontop').fadeOut();
            } else {
                $('.buttontop').fadeIn();
            }
        });
    });
});

$(function(){
  $("#slides").slidesjs({
    play: {
        active: false,
        effect: "slide",
        interval: 10000,
        auto: true,
        swap: true,
        pauseOnHover: false,
        restartDelay: 2500
      },
      pagination: {
        active: false,
        effect: "slide"
      },
      navigation: {
        active: false,
        effect: "slide"
      },
      height: 275,
      width: 800
  });
});


$(function () {
    $("#calendar").dialog({
        width: 800,
        autoOpen: false,
        modal: true
    });
});

$("#calopen").click(function () {
    $("#calendar").dialog("open");
});

$(document).ready(function () {
    $('.floatright').waypoint(function() {
        $(this).animate({
            opacity: 1.0,
            right: [0,"swing"]
          }, 500, function() {
            // Animation complete.
          });
    }, 
    { 
        offset: '80%' 
    });
    $('.floatleft').waypoint(function() {
        $(this).animate({
            opacity: 1.0,
            left: [0,"swing"]
          }, 500, function() {
            // Animation complete.
          });
    }, 
    { 
        offset: '80%' 
    });
});