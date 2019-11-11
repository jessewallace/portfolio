/**
 * MODAL OVERLAY REGISTRATION GATING JAVASCRIPT
 * Created by scott.cody on 10/29/2014.
 */

$(function(){

    function openModal(action) {
        $('.registration-widget-overlay').addClass('registration-widget-overlay-open');
        $('.container, body').addClass('overlay-open');

        if(action =='blocker'){
            var blocker = $('.registration-widget-overlay-modal-content');
            blocker.find('h2').html('Now that you got a taste...');
            blocker.find('p').not('.registration-widget-overlay-modal-content-attention').html('Listening to the stream is a member benefit - you need to register to continue listening. <br/><br/> ' +
                'It&apos;s easy and only takes seconds! Sign up now to get immediate access to the stream and exclusive member benefits.');
            blocker.find('#registration-widget-modal-register').html('Yes, I&apos;ll register now');
            blocker.find('.registration-widget-overlay-no-thanks-link').html('No, thanks');
            blocker.find('.registration-widget-overlay-modal-content-attention').hide();
        }
    }

    // Register from modal
    $('#registration-widget-modal-register').click(function(){
        $('.registration-widget-overlay-modal-header, .registration-widget-overlay-modal-content').fadeOut(function(){
            $('.registration-widget-overlay-signup-header, .registration-widget-overlay-create-account, .registration-widget-overlay-social-wrapper, .registration-widget-overlay-or-divider-wrapper').fadeIn();
        })
    })

    // Sign in from modal
    $('#sign-in-from-modal').click(function(){
        $('.registration-widget-overlay-modal-header, .registration-widget-overlay-modal-content').fadeOut(function() {
            $('.registration-widget-overlay-login-header, .registration-widget-overlay-login-form, .registration-widget-overlay-social-wrapper, .registration-widget-overlay-or-divider-wrapper').fadeIn();
        })
    })

    // For testing @todo remove

//    setTimeout(function(){
//        openModal();
//        $('.fa-user').click(function(){
//            openModal('blocker');
//        });
//    },1000)

});