

/**
 * Created by scott.cody on 8/12/2014.
 *
 * Edits and Additions added by andrew.bailey on 11/26/2014
 */

$(function () {

    // Global Variables and Functions
        // Targeting Vars
            // Profile Icon Login/Signup
            var active = ('v1player-active');
            var targetControls = $('.login-ctrl').parent();
            var profileControls = $('.v1player-profile-controls , .v1player-overlay-exit');
            var profileWpr = ('.v1player-profile-icon-wpr');

            // History/Favorites tabs
            var v1pHistTitle = $('.v1player-history-title');
            var v1pFavTitle = $('.v1player-favorites-title');
            var favLogin = $('.v1player-favorites-login');
            var favEmpty = $('.v1player-favorites-empty');
            var favContent = $('.v1player-favorites-content-wpr');

            // Clearing all favorites
            var favList = $('.v1player-favorites-list');
            var clearConfirm = $('.v1player-clear-all-confirm');
            var clearAllWpr = $('.v1player-clear-all');
            var clearActive = $('.clear-active');

        // Custom Functions
            // If and Else for Favorites list based on login status
                // Show Content
                var showContent = function () {
                    $(favLogin).hide(),
                    $(favEmpty).hide(),
                    $(favContent).show()
                }

                // Show Login
                var showLogin = function () {
                    $(favLogin).show(),
                    $(favEmpty).hide(),
                    $(favContent).hide()
                }

                // Show Empty
                var showEmpty = function () {
                    $(favLogin).hide(),
                    $(favEmpty).show(),
                    $(favContent).hide()
                }

    // Player controls
    $('.v1player-control-playstop').click(function () {
        $('.v1player').toggleClass('v1player-playing');
    });

    $('.control-volume').hover(function () {
        // $(this).toggleClass('button-pressed');
        $('.v1player-control-volume-slider').toggle();
    });

    $('.control-history').on('click', function () {
        // $(this).toggleClass('button-pressed');
        $('.v1player-history-wrapper').toggleClass('show-history').css('transition', '0.5s ease all');
        $('.v1player-history-title').addClass('active');
        $(this).toggleClass('active');

        if ($('.v1player-favorites-title').hasClass('active')){

            $('.v1player-history-title').removeClass('active');

        }
    });

    // jQuery UI tabs
    $( "#tabs" ).tabs();

    // Reset for mobile player
    var windowHeight = ($(window).height() - 130);

    $(window).on('load resize', function () {
        if ($(window).width() < 621) {
            $('.v1player-history-wrapper').css('height', windowHeight).css('top', '0px');
            $('.v1player').removeClass('v1player-mobile-expanded');
            $('.v1player-history-wrapper').removeClass('show-history');
            $('.v1player-mobile-overlay-open').show();
            $('.collapsed-login').show();
            $('.expanded-login').hide();
        }else {
            $('.v1player-history-wrapper').removeAttr('style');
        }
    });

    var rowColorReset = function (){

        // History Tab Even / Odd background color - mobile injections require this to be performed with jQuery
        var histRowEven = $('.v1player-history-contents').find('.v1player-history-row:even').not('.v1player-mobile-buy-favorites-wpr');
        $(histRowEven).css('background', '#464646');

        var histRowOdd = $('.v1player-history-contents').find('.v1player-history-row:odd').not('.v1player-mobile-buy-favorites-wpr');
        $(histRowOdd).css('background', '#525252');

        // Favorites Tab Even / Odd background color - mobile injections reqiure this to be performed with jQuery
        var favRowEven = $('.v1player-favorites-list').find('.v1player-history-row:even').not('.v1player-mobile-buy-favorites-wpr');
        $(favRowEven).css('background', '#464646');

        var favRowOdd = $('.v1player-favorites-list').find('.v1player-history-row:odd').not('.v1player-mobile-buy-favorites-wpr');
        $(favRowOdd).css('background', '#525252');
    }

    // Sets the odd/even background color of the History / Favorites list
    rowColorReset();

    // Profile Icon Login/Signup
    $('.login-ctrl , .favorites-login').on('click', function(event) {

        $(targetControls).hide();
        $('.v1player-profile-wpr').addClass(active);
        showEmpty();
        $('.v1player-history-wrapper').addClass('is-logged-in');
    });

    // Profile open controls
    $(profileWpr).on('mouseenter', function(event) {

        $(this).addClass(active);
        $(profileControls).addClass(active);
    });

    // Overlay exit for profileWpr
    $('.v1player-overlay-exit').on('mouseenter', function(event) {

        $(this).removeClass(active);
        $(profileControls).removeClass(active);
        $('.v1player-profile-icon-wpr').removeClass(active);
    });

    // Profile control Logout
    $('.v1player-logout').on('click', function(event) {
        
        $(targetControls).show();
        $(profileControls).removeClass(active);
        $('.v1player-profile-icon-wpr, .v1player-profile-wpr').removeClass(active);
        showLogin();
        $('.v1player-history-wrapper').removeClass('is-logged-in');
    });

    // Favorites selectors on History tab to show login prompt
    $('.v1player-history-favorites .fa').on('click', function(event) {
        
        $(this).toggleClass('active fa-heart-o fa-heart');

        if ($('.v1player-profile-wpr').hasClass('v1player-active')){
            showContent();
        }

    });

    // History/Favorites tabs
    // Background and Color for active History tab control
    v1pHistTitle.on('click', function(event) {

        $(this).addClass('active');
        v1pFavTitle.removeClass('active');

    });

    // Background and Color for active Favorites tab control
    v1pFavTitle.on('click', function(event) {

        $(this).addClass('active');
        v1pHistTitle.removeClass('active');
    });

    // If and Else for Favorites list based on login status
    $(document.body).on('click', '.v1player-favorites-title', function(event) {

        var activeActive = ($('.v1player-profile-wpr').hasClass('v1player-active') && $('.v1player-history-favorites i').hasClass('active'));
        var inactiveInactive = (!$('.v1player-profile-wpr').hasClass('v1player-active') && !$('.v1player-history-favorites i').hasClass('active'));
        var activeInactive = ($('.v1player-profile-wpr').hasClass('v1player-active') && !$('.v1player-history-favorites i').hasClass('active'));
        var inactiveActive = (!$('.v1player-profile-wpr').hasClass('v1player-active') && $('.v1player-history-favorites i').hasClass('active'));

        if (activeActive === true){
            showContent();
        }else if (inactiveInactive === true){
            showLogin();
        }else if (activeInactive === true){
            showEmpty();
        }else if (inactiveActive === true){
            showLogin();
        }

        if ($(window).width() < 621) {

            var mActiveActive = ($('.v1player-mobile-profile-wpr').hasClass('v1player-active') && $('.v1player-history-row').hasClass('fav'));
            var mInactiveInactive = (!$('.v1player-mobile-profile-wpr').hasClass('v1player-active') && !$('.v1player-history-row').hasClass('fav'));
            var mActiveInactive = ($('.v1player-mobile-profile-wpr').hasClass('v1player-active') && !$('.v1player-history-row').hasClass('fav'));
            var mInactiveActive = (!$('.v1player-mobile-profile-wpr').hasClass('v1player-active') && $('.v1player-history-row').hasClass('fav'));

            if (mActiveActive === true){
                showContent();
            }else if (mInactiveInactive === true){
                showLogin();
            }else if (mActiveInactive === true){
                showEmpty();
            }else if (mInactiveActive === true){
                showLogin();
            }
        }

    });

    // Remove option on Favorites tab injection
    var undoRemove = function (songname) { return '<div class="v1player-remove-confirm"><div class="v1player-remove-confirm-text"><span class="v1player-remove-row-text">' + songname + '</span><br><span>REMOVED</span></div><div class="v1player-remove-confirm-control"><span class="undo-remove-control"><i class="fa fa-reply"></i>Undo</span></div></div>'};

    // Favorites remove overlay
    $('.v1player-favorites-control .fa').on('click', function(event) {

        var targetRow = $(this).parent().parent();
        var rowText = targetRow.data('songname');

        targetRow.after(undoRemove(rowText)).hide();

    });

        // Favorites Undo removal
        $(document.body).on('click', '.undo-remove-control',function(event) {


            var removeUndo = $(this).closest('.v1player-remove-confirm');
            
            $(this).parent().parent().prev().show();
            $(removeUndo).remove();
        });

    // Clearing all favorites
        // Open options
        clearAllWpr.on('click', function(event) {

            favList.hide();
            clearConfirm.show();
            clearAllWpr.addClass(clearActive);
        });

        // Cancel option
        $('.v1player-favorites-cancel-control').on('click', function(event) {

            
            favList.show();
            clearConfirm.hide();
            clearAllWpr.removeClass(clearActive);
        });

        // Clear All option
        $('.v1player-favorites-clear-control').on('click', function(event) {

            
            // Removing the favorites list and total
            favList.remove();
            $('.v1player-favorites-total').remove();

            $('.v1player-favorites-empty').show();
            clearConfirm.hide();
            clearAllWpr.removeClass(clearActive);
            $('.v1player-history-favorites i').removeClass('active fa-heart');
            $('.v1player-history-favorites i').addClass('fa-heart-o');
        });

    // Mobile jQuery
    // Open fully collaped player function
    var openFully = function ()
        {   
            $('.v1player').addClass('v1player-mobile-expanded'),
            $('.v1player-history-wrapper').addClass('show-history'),
            $(mobileHistFavOpen).show();
        };

    // Fully closed player open trigger
    $('.v1player-mobile-overlay-open').on('click', function () {
        if ($(window).width() < 621) {

            $(openFully);

            if ($('.v1player-history-wrapper').hasClass('show-history')) {
                $('.v1player-history-wrapper').animate({'top': '-36px'}, 500);
                $('.v1player-album-art').addClass('opened1');
                $('.expanded-login').show();
                $('.collapsed-login').hide();
                $(this).hide();
            } else {
                $('.expanded-login').hide();
                $('.collapsed-login').show();

            }
        }
    });    

    // Second click open for mobile history/favorites list overlays
    var mobileHistFavOpen = $('.v1player-mobile-history-open , .v1player-mobile-favorites-open');

        // History Open
        $('.v1player-mobile-history-open').on('click', function(event) {
            // console.log('sup');
            
            if ($('.v1player-history-wrapper').hasClass('show-history')) {
                    $('.v1player-history-wrapper').animate({'top': (windowHeight * -1)}, 500);
                    $(mobileHistFavOpen).hide();
                    $('.v1player-album-art').addClass('opened2').removeClass('opened1');
                    v1pHistTitle.trigger('click');
            }
        });

        // Favorites Open
        $('.v1player-mobile-favorites-open').on('click', function(event) {
            
            if ($('.v1player-history-wrapper').hasClass('show-history')) {
                    $('.v1player-history-wrapper').animate({'top': (windowHeight * -1)}, 500);
                    $(mobileHistFavOpen).hide();
                    $('.v1player-album-art').addClass('opened2').removeClass('opened1');
                    v1pFavTitle.trigger('click');
                } 
        });

    // Album Art collapse control
    $('.v1player-album-art').on('click', function () {
        if ($(window).width() < 621) {

            var closedReset = function (){
                $('.v1player-album-art').removeClass('opened1');
                $('.v1player-history-wrapper').removeClass('show-history');
                $('.v1player').removeClass('v1player-mobile-expanded');
                $('.v1player-mobile-overlay-open').show();
                $('.mobile-ctrl-closed').show();
                $('.mobile-ctrl-open').show();
                $(v1pHistTitle).removeClass('active');
                $(v1pFavTitle).removeClass('active');
            };


            if ($('.v1player-history-wrapper').hasClass('show-history') && $('.v1player-album-art').hasClass('opened2')) {

                $('.v1player-history-wrapper').animate({'top': '-36px'}, 500, function () {
                    $('.v1player-mobile-ctrl-open .fa').addClass('expanded');
                    $(mobileHistFavOpen).show();
                    $('.v1player-album-art').removeClass('opened2').addClass('opened1');
                    $('.v1player-mobile-overlay-open').hide();

                });
            }

            if ($('.v1player-album-art').hasClass('opened1')){

                    $('.v1player-history-wrapper').animate({'top': '0px'}, 500, function () {
                        
                        closedReset();
                        $('.v1player-mobile-overlay-open').show();
                        $('.v1player-mobile-login-wpr').hide();
                        $('.collapsed-login').show(); 
                });
            }
        }
    });
    
    // Favorite heart on Song Info
    $('.mobile-favorites-ctrl').on('click', function(event) {
        
        $(this).toggleClass('fa-heart-o active fa-heart');

        $(favLogin).hide();
        $(favEmpty).hide();
        $(favContent).show();
    });

    // History list Buy / Favorite injection trigger for favoriting songs
    $(document.body).on('click', '.v1player-mobile-favorites-ctrl-wpr', function() {

        var mobileFaved = $(this).parent().prev();

        $(mobileFaved).addClass('fav');
        $('.v1player-mobile-favorites-ctrl i').addClass('active');
        $(this).parent().remove();
        showContent();
    });

    // History Buy / Favorites controls overlay Show injection
    var mobileBuyFav = '<div class="v1player-mobile-buy-favorites-wpr" style="width:100%; position:absolute; top:0px; right:-400px; z-index:2002;"><div class="v1player-mobile-buy-ctrl-wpr"><span class="v1player-mobile-history-bars"><i class="fa fa-bars"></i></span><span class="v1player-mobile-buy-ctrl">Buy<i class="fa fa-shopping-cart"></i></span></div><div class="v1player-mobile-favorites-ctrl-wpr"><span class="v1player-mobile-favorites-ctrl">Favorite<i class="fa fa-heart"></i></span></div></div>';
    $('.v1player-history-bars').on('click', function(event) {
        
        var targetRow = $(this).parent();

        targetRow.after(mobileBuyFav);
        $('.v1player-mobile-buy-favorites-wpr').animate({'right': '0px'}, 300).removeAttr('right');

        console.log(targetRow);
    });

    var mobileBuyFavOpen = $('.v1player-history-contents .fav-target-row .v1player-history-row');

    if ($(window).width() < 621) {

        $(mobileBuyFavOpen).on('swipe', function(event) {
            
            $(this).after(mobileBuyFav);
            $('.v1player-mobile-buy-favorites-wpr').animate({'right': '0px'}, 300).removeAttr('right');
        });
    }

    // Favorites Buy / Remove controls overlay Show injection
    var mobileBuyRemove = '<div class="v1player-mobile-buy-favorites-wpr" style="width:100%; position:absolute; top:0px; right:-400px; z-index:2002;"><div class="v1player-mobile-buy-ctrl-wpr"><span class="v1player-mobile-history-bars"><i class="fa fa-bars"></i></span><span class="v1player-mobile-buy-ctrl">Buy<i class="fa fa-shopping-cart"></i></span></div><div class="v1player-mobile-favorites-remove-wpr"><span class="v1player-mobile-favorites-remove">Remove<i class="fa fa-trash"></i></span></div></div>';

    $('.v1player-favorites-bars').on('click', function(event) {
        
        var targetRow = $(this).parent();

        targetRow.after(mobileBuyRemove);
        $('.v1player-mobile-buy-favorites-wpr').animate({'right': '0px'}, 300).removeAttr('right');

        console.log(mobileBuyRemoveOpen);

    });

    var mobileBuyRemoveOpen = $('.v1player-favorites-contents .fav-target-row .v1player-history-row');

    if ($(window).width() < 621) {

        $(mobileBuyRemoveOpen).on('swipe', function(event) {
            
            $(this).after(mobileBuyRemove);
            $('.v1player-mobile-buy-favorites-wpr').animate({'right': '0px'}, 300).removeAttr('right');
        });
    }

    // Remove mobileBuyFav or mobileBuyRemove overlay
        // Swipe Action
        if ($(window).width() < 621) {

            $(document.body).on('swipe', '.v1player-mobile-buy-favorites-wpr',function(event) {

                var removeControls = $(this).parent().find('.v1player-mobile-buy-favorites-wpr');

                $(removeControls).animate({'right': '-400px'}, 300);
                setTimeout(function(){
                    $(removeControls).remove();
                }, 300);

            });
        }

        // Click Action
        $(document.body).on('click', '.v1player-mobile-history-bars',function(event) {


            var removeControls = $(this).parent().parent();

            $(removeControls).animate({'right': '-400px'}, 300);
            setTimeout(function(){
                $(removeControls).remove();
            }, 300);

        });

        // Remove favorited song
        $(document.body).on('click', '.v1player-mobile-favorites-remove-wpr',function(event) {


            var removeFavSong = $(this).closest('.fav-target-row');
            
            rowColorReset();
            $(this).parent().remove();
            $(removeFavSong).remove();
        });
    

    // Mobile login Bars expand control - EXPANDED
    if ($(window).width() < 621) {

        $('.expanded-login').on('swipe', function(event) {
            $(this).toggleClass('is-opened');

        });
    }

    $('.v1player-mobile-ctrl-open').on('click', function(event) {
        $('.expanded-login').toggleClass('is-opened');

    });

    // Mobile login Bars expand control - COLLAPSED
    if ($(window).width() < 621) {

        $('.collapsed-login').on('swipe', function(event) {
            $(this).toggleClass('is-opened');

        });
    }

    $('.collapsed-bar-ctrl').on('click', function(event) {
        $('.collapsed-login').toggleClass('is-opened');
        
    });

    // Mobile profile show after Log In
    $('.mobile-login-ctrl').on('click', function(event) {
        
        $('.v1player-mobile-auth-wpr').hide();
        $('.v1player-mobile-profile-wpr').addClass(active).show();
        $('.collapsed-mobile-auth-wpr').hide();
        $(favLogin).hide();
        $(favEmpty).show();
        $(favContent).hide();
    });

    // Mobile login/signup show after Log Out
    $('.mobile-logout-ctrl').on('click', function(event) {
        
        $('.v1player-mobile-auth-wpr').show();
        $('.v1player-mobile-profile-wpr').removeClass(active).hide();
        $('.collapsed-mobile-auth-wpr').show();
        $(favLogin).show();
        $(favEmpty).hide();
        $(favContent).hide();
    });

    // Untampered Stuff from scott.cody
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
        }); 
});    


























































