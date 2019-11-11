/**
 * MODAL OVERLAY REGISTRATION WIDGET JAVASCRIPT
 * Created by scott.cody on 10/29/2014.
 */

// Global functions

_tdasModals = {

    init: function() {
        // Init datepickers
        $('.registration-widget-overlay-input-date').datepicker();
        _tdasModals.triggerGuestActions();
    },

    openModal: function() {
        $('.registration-widget-overlay').addClass('registration-widget-overlay-open');
        $('.container, body').addClass('overlay-open');
    },

    closeModal: function() {
        $('.registration-widget-overlay').removeClass('registration-widget-overlay-open');
        $('.container, body').removeClass('overlay-open');
    },

    signedIn: function() {
        $('.registration-widget-menu-not-logged-in').fadeOut(function() {
            $('.registration-widget-menu-logged-in').fadeIn(_tdasModals.triggerGuestActions);
        });
        _tdasModals.closeModal();

    },

    // LA show guest buttons if not logged in
    triggerGuestActions: function() {
        console.log ('function triggerGuestActions running');
        if ($('.registration-widget-menu-not-logged-in').is(':visible')) {
            $('#la-answer-form').hide();
            $('#la-guest-form').show();
        } else if ($('.registration-widget-menu-logged-in').is(':visible')) {
            $('#la-answer-form').show();
            $('#la-guest-form').hide();
        }
    }
}

$(function() {

    // open registration modal
    $('#registration-widget-sign-in, #la-guest-login').click(function(e) {
        e.preventDefault();
        $('.registration-widget-overlay-login').children().toggle(false);
        $('.registration-widget-overlay-forgot-password-email-sent').toggle(false);
        $('.registration-widget-overlay-login-form, .registration-widget-overlay-login-header, .registration-widget-overlay-social-wrapper, .registration-widget-overlay-forgot-password-send-email').toggle(true).css("display","");
        _tdasModals.openModal();
    });

    // close registration modal
    $('#close-registration-overlay, #registration-widget-return-to-site').click(function() {
        _tdasModals.closeModal();
    });

    // Sign Out
    $('#registration-widget-sign-out').click(function() {
        $('.registration-widget-menu-logged-in').fadeOut(function() {
            $('.registration-widget-menu-not-logged-in').fadeIn(_tdasModals.triggerGuestActions);
        });
    });

    // Social Sign In
    $('.registration-widget-overlay-button-social').click(function() {
        if ($('.registration-widget-overlay-login-header').css('display') !== 'none') {
            _tdasModals.signedIn();
        } else {
            $('.registration-widget-overlay-create-account, .registration-widget-overlay-social-wrapper').fadeOut(function() {
                $('.registration-widget-overlay-need-birthdate').fadeIn();
            });
        }
    });

    // Registered
    $('#registration-widget-register-submit').click(function() {
        $('.registration-widget-overlay-create-account, .registration-widget-overlay-social-wrapper').fadeOut(function() {
            $('.registration-widget-overlay-thanks-message').fadeIn();
        });
    });
    $('#registration-widget-finish-registration').click(function() {
        $('.registration-widget-overlay-need-birthdate').fadeOut(function() {
            $('.registration-widget-overlay-thanks-message').fadeIn();
        });
    });

    // Get Started
    $('#registration-widget-register-get-started').click(function() {
        _tdasModals.signedIn();
    });

    // Signed In
    $('#registration-widget-login-submit').click(function() {
        _tdasModals.signedIn();
    });

    // Save Changes
    $('#registration-widget-save-changes').click(function() {
        _tdasModals.closeModal();
    });

    // Edit Profile
    $('.registration-widget-menu-edit-profile').click(function() {
        $('.registration-widget-overlay-login').children().toggle(false);
        $('.registration-widget-overlay-edit-profile-header, .registration-widget-overlay-edit-profile').toggle(true).css("display","");
        _tdasModals.openModal();
        _tdasModals.openModal();
    });

    // Sign Up
    $('.registration-widget-overlay-no-account, #la-guest-register').click(function(e) {
        e.preventDefault();
        $('.registration-widget-overlay-listening-appts, .registration-widget-overlay-la-header').hide();

        if ($('.registration-widget-overlay-forgot-password').css('display') !== 'none') {
            $('.registration-widget-overlay-login-header, .registration-widget-overlay-forgot-password').fadeOut(function() {
                $('.registration-widget-overlay-create-account, .registration-widget-overlay-signup-header, .registration-widget-overlay-social-wrapper, .registration-widget-overlay-footer').fadeIn().css("display","");
            });
        } else {
            $('.registration-widget-overlay-login-header, .registration-widget-overlay-login-form, .registration-widget-overlay-social-wrapper').fadeOut(function() {
                $('.registration-widget-overlay-create-account, .registration-widget-overlay-signup-header, .registration-widget-overlay-social-wrapper, .registration-widget-overlay-footer').fadeIn().css("display","");
            });
        }
    });

    // Sign In
    $('.registration-widget-overlay-have-account').click(function() {

        if ($('.registration-widget-overlay-need-birthdate').css('display') !== 'none') {
            $('.registration-widget-overlay-signup-header, .registration-widget-overlay-need-birthdate, .registration-widget-overlay-footer').fadeOut(function() {
                $('.registration-widget-overlay-login-form, .registration-widget-overlay-login-header, .registration-widget-overlay-social-wrapper,').fadeIn().css("display","");
            });
        } else {
            $('.registration-widget-overlay-signup-header, .registration-widget-overlay-create-account, .registration-widget-overlay-social-wrapper, .registration-widget-overlay-footer').fadeOut(function() {
                $('.registration-widget-overlay-login-form, .registration-widget-overlay-login-header, .registration-widget-overlay-social-wrapper').fadeIn().css("display","");
            });
        }
    });

    // Forgot Password
    $('.registration-widget-overlay-forgot-password-link').click(function() {
        $('.registration-widget-overlay-login-form, .registration-widget-overlay-social-wrapper').fadeOut(function() {
            $('.registration-widget-overlay-forgot-password').fadeIn();
        });
    });

    // No thanks
    $('.registration-widget-overlay-no-thanks-link').click(function(){
        $('#close-registration-overlay').trigger('click');
    })

    // Send Reset Email
    $('#registration-widget-forgot-password-submit').click(function() {
        $('.registration-widget-overlay-forgot-password-send-email').fadeOut(function() {
            $('.registration-widget-overlay-forgot-password-email-sent').fadeIn();
        });
    });

    // Reset Password
    $('#registration-widget-reset-password').click(function() {
        $('.registration-widget-overlay-reset-password-wrapper').fadeOut(function() {
            $('.registration-widget-overlay-reset-password-submitted').fadeIn();
        });
    });

    // Reset Password registration-widget-login-return
    $('#registration-widget-reset-password-login').click(function() {
        $('.registration-widget-overlay-reset-password, .registration-widget-overlay-reset-password-header').fadeOut(function() {
            $('.registration-widget-overlay-login-form, .registration-widget-overlay-login-header, .registration-widget-overlay-social-wrapper').fadeIn().css("display","");
        });
    });

    // Return from Forgot Password
    $('#registration-widget-login-return').click(function() {
        $('.registration-widget-overlay-forgot-password').fadeOut(function() {
            $('.registration-widget-overlay-login-form, .registration-widget-overlay-social-wrapper').fadeIn().css("display","");
        });
    });

    _tdasModals.init();

});