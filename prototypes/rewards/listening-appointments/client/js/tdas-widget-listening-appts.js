/**
 * Created by scott.cody on 10/21/2014.
 */

$(function () {
    // ----- Initial Adjustment ----- //

    var height = $("[data-js='container-list']").height() + 36;
    $("[data-js='la-widget']").height(height);

    // ----- Button Hooks ----- //

    // List item link
    $("[data-js='la-list-item']").click(function (e) {
        $("[data-js='content-wrapper']").toggleClass('is-content');

        // @todo new content data will need to be loaded prior to next line executing

        var height = $("[data-js='container-content']").height() + 36;
        $("[data-js='la-widget']").height(height);
    })

    // Page Back Button
    $("[data-js='page-back']").click(function () {
        // @todo page back logic
    })

    // Page Next Button
    $("[data-js='page-next']").click(function () {
        // @todo page next logic
    })

    // Back to list Button
    $("[data-js='back-to-list']").click(function () {
        $("[data-js='content-wrapper']").toggleClass('is-content');

        var height = $("[data-js='container-list']").height() + 36;
        $("[data-js='la-widget']").height(height);
    })

    // Answer submit button
    $("[data-js='answer-submit']").click(function (e) {
        e.preventDefault();
        $("[data-js='content-form']").removeClass('answer-incorrect answer-correct');
        $(this).html('Submit');

        // display feedback
        if ($("[data-js='answer-input']").val() == 'wrong') {
            // if answer is wrong
            $("[data-js='content-form']").addClass('answer-incorrect');
        } else if ($("[data-js='answer-input']").val() == '') {
            // nothing
        } else {
            // if answer is correct
            $("[data-js='content-form']").addClass('answer-correct');
            $(this).html('You\'re Correct!').blur();
            $("[data-js='item-points']").html('<i class="fa fa-check-circle"></i>');

            // go back to list
            setTimeout(function () {
                $("[data-js='content-wrapper']").toggleClass('is-content');

                var height = $("[data-js='container-list']").height() + 36;
                $("[data-js='la-widget']").height(height);
            }, 1500)
        }
    })
})