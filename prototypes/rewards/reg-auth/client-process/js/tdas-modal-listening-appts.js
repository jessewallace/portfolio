/**
 * MODAL OVERLAY LISTENING APPOINTMENTS JAVASCRIPT
 * Created by scott.cody on 10/29/2014.
 */

$(function() {

    // open LA modal
    $('.registration-widget-menu-listening-appts').click(function () {
        $('.registration-widget-overlay-login').children().toggle(false);
        $('.registration-widget-overlay-forgot-password-email-sent').toggle(false);

        $('.registration-widget-overlay-la-header, .registration-widget-overlay-listening-appts').show();
        _tdasModals.openModal();
    });

    // LA content hooks
    $('.registration-widget-overlay-listening-appts-item-list-item').click(function () {
        $('.registration-widget-overlay-listening-appts-item-list, .registration-widget-overlay-modal-content-button-container-bordered').fadeOut(function () {
            $('.registration-widget-overlay-listening-appts-content').fadeIn();
        })
    })

    $('#la-back-to-list').click(function () {
        $('.registration-widget-overlay-listening-appts-content').fadeOut(function () {
            $('.registration-widget-overlay-listening-appts-item-list, .registration-widget-overlay-modal-content-button-container-bordered').fadeIn();
        })
    })

    $('#la-answer-submit').click(function (e) {
        e.preventDefault();
        $('.registration-widget-overlay-listening-appts-content-input').addClass('la-answer-incorrect');

        // for testing @todo remove
        setTimeout(function () {
            $('.registration-widget-overlay-listening-appts-content-input').removeClass('la-answer-incorrect').addClass('la-answer-correct');
            $('#la-answer-submit').html('<i class="fa fa-chevron-circle-left registration-widget-overlay-icon registration-widget-overlay-icon-button"></i> Go back to list');
            $('.registration-widget-overlay-listening-appts-content > form').css('width', '365px');
            $('#la-answer-submit, #la-back-to-list').unbind().click(function () {
                $('.registration-widget-overlay-listening-appts-content').fadeOut(function () {
                    $('.registration-widget-overlay-listening-appts-item-list').children('li').eq(0).addClass('item-completed');
                    $('.registration-widget-overlay-listening-appts-item-list, .registration-widget-overlay-modal-content-button-container-bordered').fadeIn();
                })
            })
        }, 1500)
    })
});