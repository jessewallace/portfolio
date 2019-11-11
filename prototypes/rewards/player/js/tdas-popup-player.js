/**
 * TDAS POPUP PLAYER JAVASCRIPT
 * Created by scottcody on 11/4/2014.
 */


_tdasPopupPlayer = {

    init: function() {

        var playerTarget = $('#tpp').attr('data-target'),
            width = 500,
            height = 400,
            posX = screen.width/2 - (width/2),
            posY = screen.height/2 - (height/2),

            props = "width=" + width + ", height=" + height + ", toolbar=no, left=700" + ", top=" + posY;

        // Hook popup trigger
        $('.fa-play').not('#tdas-popup-play').click(function(){
            window.open(playerTarget + "?cf="+ window.location,"_blank",props);
        })

        // to get volume & update icon

        $("#slider-horizontal").slider({
            orientation: "horizontal",
            min: 0,
            max: 100,
            value: 75,
            slide: function (event, ui) {

            }
        });

        // hook play/stop button

        $('#tdas-popup-stop').click(function(){
            $('.tdas-popup-player').removeClass('is-playing');
        })

        $('#tdas-popup-play').click(function(){
            $('.tdas-popup-player').addClass('is-playing');

        })

        // hook link back to full player
        $('#back-to-player').click(function(){
            try {
                window.opener.location.assign('testfile.html');
            } catch(e) {
                window.open('testfile.html');
            }

            var parent = window.location.split("?cf=");
            window.open(parent,"_blank")
        })
    }
}

$(function(){
    _tdasPopupPlayer.init();
})
