$( document ).ready(function() {

    $('#profileTab a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })

    $('.view-history').click(function (e) {
        $('.points-container').animate({left: "-100%"});
    })

    $('.view-aging').click(function (e) {
        $('.points-container').animate({left: "0%"});
    })

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    $('.datepicker').datepicker();

});

