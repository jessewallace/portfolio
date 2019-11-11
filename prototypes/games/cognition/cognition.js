/**
 * Created by scott.cody on 7/29/2014.
 */

// Game constraints
var maxRounds = 2;
var maxMultiplier = 5

// Thresholds for records
var record1 = 2000; //1 record awarded for 0 - this
var record2 = 3000; //2 records awarded for record1 - this
                    //3 records awarded for anything over record2
// Game variables
var rounds = 0;
var totalScore = 0;
var multiplier = 0;

// highest score possible is 4000 with 10 rounds //

$(document).ready(function(){
    // Timer resets
    var gameTimer = null;
    var resetTimer = null;

    // Fade in widget
    $('.see-widget-cognition').hide().fadeIn(1000);

    // Button bindings
    $('.see-cognition-start-button').click(function() { startGame(4500); })
    $('.see-cognition-play-again').click(function()   { restartGame();   })

    // Load logo SVG
    $.get('img/logo.svg', function(data) {
        $('.see-cognition-logo').append(data.documentElement);
        init();
    });

    // To start game
    function startGame(timeout) {
        // Move starting components out of view, display initial loading screen, then hide it
        $('.see-cognition-start').addClass('see-cognition-to-start');
        setTimeout(
            "$('.see-cognition-start').fadeOut(500).css('transition','none'); " +
            "$('.see-cognition-gameplay').show(); " +
            "$('.see-cognition-logo').fadeIn(200);" ,
            "4000"
        );

        // Show loader
        $('.see-cognition-loader').removeClass('see-cognition-loader-reset');

        // Reset question wrapper if need be
        $('.see-cognition-question-wrapper').addClass('hide-question').removeAttr('style');

        //Display the question
        setTimeout(displayQuestion,timeout);
    }

    // To display questions and answers
    function displayQuestion() {
        // @TODO backend logic to populate question and answers

        // Reset loading timer
        $('.see-cognition-loader').addClass('see-cognition-loader-reset');

        // Remove logo animation [for Chrome]
        $('#inner, #outer').css('animation','none');

        // Show question and answers
        $('.see-cognition-question-wrapper').removeClass('hide-question');

        //Start Timer
        $('.see-cognition-score-timer-wrapper').addClass('see-cognition-timer-active');

        // Unbind click event to prevent duplicate scoring
        $('.cognition-answer').unbind();

        //Bind click event to answers
        $('.cognition-answer').click(function(){

            // Determine how much time has elapsed
            var elem = document.getElementById('score-timer');
            var time = window.getComputedStyle(elem,null).getPropertyValue('width');
            time = time.substr(0,3);
            time = parseInt(time);
            time = Math.floor((time/390)*100);

            //Send selection and time to scoring function
            scoreRound($(this).attr('data-answer'),$(this).html(),time);

            // Unbind click event to prevent duplicate scoring
            $('.cognition-answer').unbind();
        })

        // End round after the timer has expired [if no answer]
        gameTimer = setTimeout(scoreRound,10500);
    }

    // To calculate the points accrued in the round
    function scoreRound(answer,selection,score){
        // Clear preset timer
        clearTimeout(gameTimer);

        // @TODO backend logic to get correct answer
        // aka getAnswer()? [DEFINED FOR TESTING BELOW]
        // Theoretically will return correct answer plain text to be matched below

        // Check answers to see which one is correct
        var correctAnswer = 0;
        if ( $('.cognition-answer[data-answer="1"]').html() == getAnswer() ) { correctAnswer = 1;}
        if ( $('.cognition-answer[data-answer="2"]').html() == getAnswer() ) { correctAnswer = 2;}
        if ( $('.cognition-answer[data-answer="3"]').html() == getAnswer() ) { correctAnswer = 3;}
        if ( $('.cognition-answer[data-answer="4"]').html() == getAnswer() ) { correctAnswer = 4;}

        var selector = ".cognition-answer[data-answer=" + answer + "]";

        // compare selected answer to correct answer (and answer is CORRECT)
        if(answer == correctAnswer){

            // Add correct class to answer
            $(selector).addClass('cognition-answer-correct');

            // Add incorrect classes to others
            $('.cognition-answer').not(selector).addClass('cognition-answer-incorrect').delay(1000).fadeOut(0);

            // Calculator score based on time
            var points = 0;
            if( score > 74){ points = 100;}
            else if( score > 49) { points = 75; }
            else if( score > 24) { points = 50; }
            else { points = 25 }

            // update multiplier
            if(multiplier < maxMultiplier ) {
                multiplier ++;
            }

            //show score notification and update counter
            updatePoints(points);
        }

        // or if answer is INCORRECT
        else {
            var goodAnswer = ".cognition-answer[data-answer=" + correctAnswer + "]";

            // reset multiplier
            multiplier = 0;

            // Add bad selection class to selected answer
            $(selector).addClass('cognition-answer-bad-selection');

            // Add incorrect class to two other incorrect answers
            $('.cognition-answer').not(selector).not(goodAnswer).addClass('cognition-answer-incorrect').delay(1000).fadeOut(0);

            // Add correct class to answer
            $(goodAnswer).addClass('cognition-answer-show-correct');
        }

        // Hide Timer
        $('.see-cognition-score-timer-wrapper').css({'transition-duration':'0.5s','transition-delay':'0s','height':'0'});
        rounds++;

        //Reset game board for next question
        resetTimer = setTimeout(resetBoard,2500);
    }

    // To update total points with points after each round
    function updatePoints(points){
        var roundPoints = 0;

        // Test for multiplier
        if(multiplier > 1){

            // Factor in multiplier
            roundPoints = points * multiplier;

            // Show base notification [with multiplier]
            $('.see-cognition-score-counter').append("<span class=\"points-added-notification with-mult\">+" + points + "</span><span class=\"points-multiplier-notification\">x" + multiplier + "</span>");

        } else {
            roundPoints = points;

            // Show base notification
            $('.see-cognition-score-counter').append("<span class=\"points-added-notification\">+" + points + "</span>");

        }

        // Update total score
        totalScore += roundPoints;

        // Update points counter
        $('.see-cognition-score-counter > .points').html(totalScore);

        // Remove notification(s)
        setTimeout("$('.points-added-notification, .points-multiplier-notification').remove()","2500");
    }

    // Reset question and answer pieces to default
    function resetBoard(){
        //Reset Timer
        $('.see-cognition-score-timer-wrapper').removeClass('see-cognition-timer-active').removeAttr('style');

        //Hide the question and answers (for new question)
        $('.see-cognition-question-wrapper').css('transition','none').fadeOut(300, function(){

            // Reset answer buttons
            $('.cognition-answer').removeClass('cognition-answer-incorrect cognition-answer-correct cognition-answer-show-correct cognition-answer-bad-selection').removeAttr('style');

        });

        // Check if we can continue
        if(rounds != maxRounds) {

            $('.see-cognition-start').delay(300).fadeIn(300, function () {

                //Show loader
                $('.see-cognition-loader').removeClass('see-cognition-loader-reset');

                // Start game again
                setTimeout(startGame(4500), 4000);
            });


        } else { endGame() }

        // Clear game timers
        clearTimeout(resetTimer);

    }

    // To end game and show score / records
    function endGame() {
        // Hide gameplay container
        $('.see-cognition-score-timer-wrapper').hide();
        $('.see-cognition-gameplay').css('transition','none').fadeOut(300);

        // Show end of game screen
        $('.see-cognition-end').css('transition','none').removeAttr('style');

        // Show records
        setTimeout("$('.see-cognition-records').removeClass('see-cognition-records-hidden')","500");

        // Spin records based on score
        if(totalScore < record1 ){
            $('.see-cognition-record-1').addClass('see-cognition-record1-show');

        } else if (totalScore < record2 ) {
            $('.see-cognition-record-1').addClass('see-cognition-record1-show');
            $('.see-cognition-record-2').addClass('see-cognition-record2-show');

        } else {
            $('.see-cognition-record-1').addClass('see-cognition-record1-show');
            $('.see-cognition-record-2').addClass('see-cognition-record2-show');
            $('.see-cognition-record-3').addClass('see-cognition-record3-show');

        }

        // Update score
        $('span.see-cognition-final-score').html(totalScore);

        // Reset variables
        totalScore = 0;
        rounds = 0;
        multiplier = 0;
    }

    // To restart game
    function restartGame() {
        // This is essentially a page refresh but quicker

        // Reset start screen
        $('.see-cognition-start').removeAttr('style').removeClass('see-cognition-to-start');

        // Hide gameplay container
        $('.see-cognition-gameplay').removeAttr('style').css('display','none');

        // Hide end container
        $('.see-cognition-end').css('display','none');

        // Hide timer wrapper
        $('.see-cognition-score-timer-wrapper').removeAttr('style');

        // Rehide records for use at end of new game
        $('.see-cognition-records').addClass('see-cognition-records-hidden');

        // Reset points
        $('.see-cognition-score-counter > .points').html(totalScore);

        // Reload logo
        $.get('img/logo.svg', function(data) {
            $('.see-cognition-logo').html(data.documentElement);
            init();
        });

    }

    //for testing
    function getAnswer() { var correct = '2008'; return correct;}
})