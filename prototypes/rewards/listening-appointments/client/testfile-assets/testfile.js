/**
 * Created by scott.cody on 8/12/2014.
 */

$(function () {

    $('.v1player-control-playstop').click(function () {
        $('.v1player').toggleClass('v1player-playing');
    })

    $('.control-volume').hover(function () {
        $(this).toggleClass('button-pressed');
        $('.v1player-control-volume-slider').toggle();
    })

    $('.control-history').on('click', function () {
        $(this).toggleClass('button-pressed');
        $('.v1player-history-wrapper').toggleClass('show-history').css('transition', '0.5s ease all');
        $('.v1player').toggleClass('v1player-mobile-expanded');
    })

//    var height = $(window).height() - 130;
//    $('.v1player-history-wrapper').css('width', $(window).width()).css('height', height).css('bottom', $('.v1player-history-wrapper').height() - 64 );

    var bottom;
    $(window).on('load resize', function () {
        if ($(window).width() < 621) {
            var height = $(window).height() - 130;
            bottom = (height - 130) * -1;
            $('.v1player-history-wrapper').css('width', $(window).width()).css('height', height).css('bottom', bottom).css('transition', 'none');
            $('.v1player').removeClass('v1player-mobile-expanded');
        } else {
            $('.v1player').removeClass('v1player-mobile-expanded');
            $('.v1player-history-wrapper').removeAttr('style');
        }
    })

    $('.v1player-song-info, .v1player-history-title').not('a').on('click', function () {
        if ($(window).width() < 621) {
            $('.v1player').addClass('v1player-mobile-expanded');
            $('.control-history').toggleClass('button-pressed');
            $('.v1player-history-wrapper').toggleClass('show-history');
            $('.v1player-history-contents').scroll();


            if ($('.v1player-history-wrapper').hasClass('show-history')) {
                $('.v1player-history-wrapper').animate({'bottom': '129px'}, 500);
            } else {

                $('.v1player-history-wrapper').animate({'bottom': '-337px'}, 500, function () {
                    $('.v1player').removeClass('v1player-mobile-expanded');
                });
            }
        }
    })


    $('.v1player-history-contents').scroll(function () {
        var contents = ($('.v1player-history-contents .v1player-history-row').length * 59) - $(this).height();
        console.log($(this).scrollTop());
        console.log(contents);
        if (contents < 0) {
            $('.v1player-history-bottom-shadow').hide();
            $('.v1player-history-top-shadow').hide();
        } else if ($(this).scrollTop() > contents) {
            $('.v1player-history-bottom-shadow').hide();
            $('.v1player-history-top-shadow').show();
        } else if ($(this).scrollTop() == 0) {
            $('.v1player-history-top-shadow').hide();
            $('.v1player-history-bottom-shadow').show();
        } else {
            $('.v1player-history-top-shadow').show();
            $('.v1player-history-bottom-shadow').show();
        }


    })

    // to hide volume on mobile devices

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('.control-volume').hide();
    }

    // to get volume & update icon

    $("#slider-vertical").slider({
        orientation: "vertical",
        min: 0,
        max: 100,
        value: 75,
        slide: function (event, ui) {
            // update icon
            if (ui.value == 0) {
                $('#fa-vol').removeAttr('class').addClass('icon icon-volume-mute');
            } else if (ui.value < 30) {
                $('#fa-vol').removeAttr('class').addClass('icon icon-volume-low');
            } else if (ui.value < 80) {
                $('#fa-vol').removeAttr('class').addClass('icon icon-volume-medium');
            } else {
                $('#fa-vol').removeAttr('class').addClass('icon icon-volume-high');
            }
        }
    });

    // to mute or unmute
    var vol = 0;
    $('#fa-vol').click(function () {
        if ($('#slider-vertical').slider("value") != 0) {
            vol = $('#slider-vertical').slider("value");
            $('#slider-vertical').slider("value", 0);
            $('#fa-vol').removeAttr('class').addClass('icon icon-volume-mute');
        } else {
            $('#slider-vertical').slider("value", vol);

            // update icon
            if (vol == 0) {
                $('#fa-vol').removeAttr('class').addClass('icon icon-volume-mute');
            } else if (vol < 30) {
                $('#fa-vol').removeAttr('class').addClass('icon icon-volume-low');
            } else if (vol < 80) {
                $('#fa-vol').removeAttr('class').addClass('icon icon-volume-medium');
            } else {
                $('#fa-vol').removeAttr('class').addClass('icon icon-volume-high');
            }
        }
    })

//    $('.v1player-history-wrapper').pep({
//        axis: 'y',
//        constrainTo: 'window',
//        //useCSSTranslation: false,
//        velocityMultiplier: 0,
//        //revert: true
//    });

//    $('.v1player-history-wrapper').draggable({
//        //containment: [0, 0, 0, $(window).height()],
//        axis: 'y',
//        start: function(event, ui) {
//            //$(this).addClass('v1player-expanded');
//        },
//        handle: '.v1player-song-info'
//    });

})

