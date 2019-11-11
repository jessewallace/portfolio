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

    /**slideshow js**/

    $(document).ready(function() {
        $('body').removeClass('no-js');
        $('#my-carousel-1-landing').carousel({
            auto:true,
            waitTime:6000,
            itemsPerPage: 1,
            itemsPerTransition: 1,
            loop: true,
            speed: 800,
        });
    });


        $(window).load(function(){
            $('.bwWrapper').BlackAndWhite({
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