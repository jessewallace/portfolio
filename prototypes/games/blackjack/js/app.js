// Global Variables
var chipCounter = 0;
var pot = 0;
var bank = 0;
var playerCardCount = 0;
var dealerCardCount = 0;
var dealerValue = 0;
var playerValue = 0;
var playerSplitValue = 0;
var playerBet = 0;
var playerSplitBet = 0;
var handsPlayed = 0;
var biggestWin = 0;
var biggestLoss = 0;
var biggestBank = 0;


// Intro Animations
function animateIntro() {
    // Reset elements to hidden
    toggleIntroElements(false);

    // Fade in board on load
    $('.board').fadeIn(500, function() {

        // Fade in logo background
        $('.logo').toggle(true).animo({animation: 'fadeInDown', duration: 0.4, timing: 'ease-out'}, function() {
            // Fade in logo cards
            $('.logo--ace, .logo--ten').toggle(true).animo({animation: 'fadeInDown', duration: 0.45, timing: 'ease-out'}, function() {
                // Fade in logo text
                $('.logo--express').not('.off').toggle(true);
                $('.logo--blackjack').toggle(true).animo({animation: 'fadeInDown', duration: 0.5, timing: 'ease-out'});
                $('.logo--express.off').toggle(true).animo({animation: 'fadeInDown', duration: 0.5, timing: 'ease-out'}, function() {
                    // Flicker Express Neon
                    $('.logo--express').not('.off')
                            .animate(
                                {
                                    opacity: '1'
                                }, 10)
                            .animate(
                                {
                                    opacity: '0'
                                }, 10)
                            .animate(
                                {
                                    opacity: '1'
                                }, 10)
                            .animate(
                                {
                                    opacity: '0'
                                }, 10)
                            .animate(
                                {
                                    opacity: '1'
                                }, 10)
                            .animate(
                                {
                                    opacity: '0'
                                }, 10)
                            .animate(
                                {
                                    opacity: '1'
                                }, 20)
                            .animate(
                                {
                                    opacity: '0'
                                }, 20)
                            .animate(
                                {
                                    opacity: '1'
                                }, 50, function() {
                                    window.setTimeout(function() {
                                        // Bounce in gametype background
                                        $('.gametype').toggle(true).animo({animation: 'fadeIn', duration: 0.6}, function() {
                                            // Fade in gametype and bounce in deal me in
                                            $('.gametype-play').toggle(true).animo({animation: 'bounceIn', duration: 0.4, timing: 'ease-out'});
                                            $('.gametype-title').toggle(true).animo({animation: 'fadeIn', duration: 0.4, timing: 'ease-out'});

                                            // Fade in chips and how to play
                                            $('.gametype-instructions').toggle(true).animo({animation: 'fadeIn', duration: 0.4, timing: 'ease-out'});
                                            $('.gametype-chip--green, .gametype-chip--red, .gametype-chip--black').toggle(true).animo({animation: 'fadeInUp', duration: 0.3, timing: 'ease-out'});
                                        });
                                    },300);
                                });
                });
            });
        });
    });
}

// Blur background
function toggleBackgroundBlur(b) {
    if (!b) {
        $('.board').animate({blurRadius: 0}, {
            duration: 200,
            easing: 'linear',
            step: function() {
                $(this).css({
                    "-moz-filter": "blur("+this.blurRadius+"px)",
                    "-webkit-filter": "blur("+this.blurRadius+"px)",
                    "filter": "blur("+this.blurRadius+"px)"
                });
            }
        });
    }
    else {
        $('.board').animate({blurRadius: 5}, {
            duration: 200,
            easing: 'linear',
            step: function() {
                $(this).css({
                    "-moz-filter": "blur("+this.blurRadius+"px)",
                    "-webkit-filter": "blur("+this.blurRadius+"px)",
                    "filter": "blur("+this.blurRadius+"px)"
                });
            }
        });
    }
}

// Animated count up
function animatedCount(id, start, stop, onFinish) {
    var $this = $('.'+id);
    $({ Counter: start }).animate({ Counter: stop }, {
        duration: 600,
        easing: "swing",
        step: function () {
            $this.text(Math.ceil(this.Counter));
        },
        done: onFinish
    });
}

// Initialize game screen
function initializeGame() {
    // reset Variables
    chipCounter = 0;
    pot = 0;
    bank = bank;

    var betChips = $('#bet-chip-red, #bet-chip-green, #bet-chip-black');

    if (betChips.css('top') !== '437') {
        $('#bet-chip-red').css({top: 437, left: 135, opacity: 1});
        $('#bet-chip-green').css({top: 437, left: 212.5, opacity: 1});
        $('#bet-chip-black').css({top: 437, left: 292, opacity: 1});
    }

    $('#deal').prop('disabled', true);

    $('.board-graphic, .board-icons, .mute-audio').fadeIn(500);
    $('.user-bank-amount').text('0');
    if ($('.dealer-area').css('display') != 'none') {
        window.setTimeout(function() {
            document.getElementById('chip-stack-audio').play();
        }, 300);
        $('#bet-chip-red').toggle(true).animo({animation: 'bounceInUp', duration: 0.5});
        window.setTimeout(function() {
            document.getElementById('chip-stack-audio').play();
        }, 500);
        $('#bet-chip-green').toggle(true).animo({animation: 'bounceInUp', duration: 0.5});
        window.setTimeout(function() {
            document.getElementById('chip-stack-audio').play();
        }, 700);
        $('#bet-chip-black').toggle(true).animo({animation: 'bounceInUp', duration: 0.5}, function() {
            animatedCount('user-bank-amount', 0, bank);
        });
        $('.place-your-bet').toggle(true).animo({animation: 'fadeIn'});
        $('#deal, #allIn').toggle(true).animo({animation: 'fadeInUp', duration: 0.5});
        $('.user-bank-bet').toggle(true).animo({animation: 'fadeIn'});
    }
    else {
        $('.dealer-area').toggle(true).animo({animation: 'fadeInDown', duration: 0.5});
        $('.player-area').toggle(true).animo({animation: 'fadeInUp', duration: 0.5}, function() {
            window.setTimeout(function() {
                document.getElementById('chip-stack-audio').play();
            }, 300);
            $('#bet-chip-red').toggle(true).animo({animation: 'bounceInUp', duration: 0.5});
            window.setTimeout(function() {
                document.getElementById('chip-stack-audio').play();
            }, 500);
            $('#bet-chip-green').toggle(true).animo({animation: 'bounceInUp', duration: 0.5});
            window.setTimeout(function() {
                document.getElementById('chip-stack-audio').play();
            }, 700);
            $('#bet-chip-black').toggle(true).animo({animation: 'bounceInUp', duration: 0.5}, function() {
                animatedCount('user-bank-amount', 0, bank);
            });
            $('.place-your-bet').toggle(true).animo({animation: 'fadeIn'});
            $('#deal, #allIn').toggle(true).animo({animation: 'fadeInUp', duration: 0.5});
            $('.user-bank-bet').toggle(true).animo({animation: 'fadeIn'});
        });
    }

    $('.game-controls').toggle(true);
}

// Hide elements on game screen
function hideGameElements() {
    $('.game-container').children().fadeOut(300);
    $('.player-area').children().fadeOut(300);
}

// Fade in or out home screen elements
function toggleIntroElements(b) {
    if (!b) {
        $('.gametype').fadeOut(500).children().not('.gametype-chips').fadeOut(500);
        $('.gametype-chips').children().fadeOut(500);
        $('.logo').fadeOut(500).children().fadeOut(500);
    }
    else {
        $('.gametype').fadeIn(500).children().not('.gametype-chips').fadeIn(500);
        $('.gametype-chips').children().fadeIn(500);
        $('.logo').fadeIn(500).children().fadeIn(500);
    }
}

// Return from game to home
function returnHome() {
    hideGameElements();
    resetChips();
    resetCards();
    $('#allIn').fadeOut(500);
    window.setTimeout(function() {
        toggleIntroElements(true);
    }, 500);
}

// Generate a random position
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Make additional bet
function addChipToPot(target) {
    // Increase chip count
    chipCounter += 1;
    var chipValue = 0;
    var chip = [];

    // Limit display to 8 chips
    if (chipCounter <= 8) {
        // Create chip based on which chip is clicked
        if ($(target).hasClass('chip--red')) {
            $('.game-container').append('<div class="chip chip--red" id="chip' + chipCounter + '" style="position: absolute; left: 135px; top: 437px;">50</div>');
        }
        else if ($(target).hasClass('chip--green')) {
            $('.game-container').append('<div class="chip chip--green" id="chip' + chipCounter + '" style="position: absolute; left: 212.5px; top: 437px;">100</div>');
        }
        else if ($(target).hasClass('chip--black')) {
            $('.game-container').append('<div class="chip chip--black" id="chip' + chipCounter + '" style="position: absolute; left: 292px; top: 437px;">200</div>');
        }

        chip = $('#chip' + chipCounter);

        // Animate chip from bank to random position in middle of board
        document.getElementById('chip-stack-audio').play();
        chip.animate({top: randomNumber(195,283), left: randomNumber(167,220)}, 500);

        // Reveal pot if not visible
        if ($('.pot').css('display') === 'none') {
            $('.pot, #reset-chips').fadeIn(500);
        }

        // Enable deal if disabled
        if ($('#deal').prop('disabled')) {
            $('#deal').prop('disabled', false);
        }
    }

    chipValue = parseInt($(target).attr('value'));

    // add chip to pot if player has enough money in bank
    if ((bank - chipValue) >= 0) {
        if (chipCounter > 8) {
            if ($(target).hasClass('chip--red')) {
                $('.game-container').append('<div class="chip chip--red" id="chip' + chipCounter + '" style="position: absolute; left: 135px; top: 437px;">50</div>');
            }
            else if ($(target).hasClass('chip--green')) {
                $('.game-container').append('<div class="chip chip--green" id="chip' + chipCounter + '" style="position: absolute; left: 212.5px; top: 437px;">100</div>');
            }
            else if ($(target).hasClass('chip--black')) {
                $('.game-container').append('<div class="chip chip--black" id="chip' + chipCounter + '" style="position: absolute; left: 292px; top: 437px;">200</div>');
            }

            chip = $('#chip' + chipCounter);

            chip.animate({top: randomNumber(195,283), left: randomNumber(167,220), opacity: 0}, 500, function() {
                $(this).remove();
            });
        }

        // Add money to pot
        pot += chipValue;
        animatedCount('pot-amount', (pot - chipValue), pot);
        animatedCount('bet-amount', (pot - chipValue), pot);

        // Remove money from bank
        bank += -chipValue;
        animatedCount('user-bank-amount', (bank+chipValue), (bank-1));
    }
    else {
        chip.remove();
        chipCounter += -1;
    }
}

// Go all in
function allIn() {
    chipCounter += 1;
    for (i=chipCounter; i<=8; i++) {
        if (i === 0 || i === 3 || i === 6) {
            $('.game-container').append('<div class="chip chip--red" id="chip' + i + '" style="position: absolute; left: 135px; top: 437px;" value="50">50</div>');
        }
        else if (i === 1 || i === 4 || i === 7) {
            $('.game-container').append('<div class="chip chip--green" id="chip' + i + '" style="position: absolute; left: 212.5px; top: 437px;" value="100">100</div>');
        }
        else if (i === 2|| i === 5) {
            $('.game-container').append('<div class="chip chip--black" id="chip' + i + '" style="position: absolute; left: 292px; top: 437px;" value="200">200</div>');
        }

        chip = $('#chip' + i);

        // Animate chip from bank to random position in middle of board
        chip.animate({top: randomNumber(195,283), left: randomNumber(167,220)}, 500);

        // Reveal pot if not visible
        if ($('.pot').css('display') === 'none') {
            $('.pot, #reset-chips').fadeIn(500);
        }

        // Enable deal if disabled
        if ($('#deal').prop('disabled')) {
            $('#deal').prop('disabled', false);
        }
    }

    $('#bet-chip-red, #bet-chip-green, #bet-chip-black').animate({top: randomNumber(195,283), left: randomNumber(167,220), opacity: 0}, 500, function() {
        $('#bet-chip-red, #bet-chip-green, #bet-chip-black').toggle(false);
    });

    pot += bank;
    animatedCount('pot-amount', (pot-bank), pot);
    animatedCount('bet-amount', (pot-bank), pot);

    // Remove money from bank
    animatedCount('user-bank-amount', bank, -1);
    bank = 0;

    $('#allIn').fadeOut(500);
}

// send chips back to bank
function resetChips() {
    var redChips = $('.chip--red').not('#bet-chip-red, #user-bank-chip-red');
    var greenChips = $('.chip--green').not('#bet-chip-green, #user-bank-chip-green');
    var blackChips = $('.chip--black').not('#bet-chip-black, #user-bank-chip-black');
    var betChips = $('#bet-chip-red, #bet-chip-green, #bet-chip-black');

    if (betChips.css('top') !== '437') {
        $('#bet-chip-red').animate({top: 437, left: 135, opacity: 1});
        $('#bet-chip-green').animate({top: 437, left: 212.5, opacity: 1});
        $('#bet-chip-black').animate({top: 437, left: 292, opacity: 1});
    }

    redChips.animate({top: 437, left: 135, opacity: 0}, function() {$(this).remove();});
    greenChips.animate({top: 437, left: 212.5, opacity: 0}, function() {$(this).remove();});
    blackChips.animate({top: 437, left: 292, opacity: 0}, function() {$(this).remove();});
    document.getElementById('chip-slide-in-audio').play();

    // Add money to bank
    bank += pot;
    animatedCount('user-bank-amount', (bank-pot), bank);

    // Remove money from pot
    animatedCount('pot-amount', pot, 0);
    animatedCount('bet-amount', pot, 0);
    pot = 0;

    // Hide bank and disable deal
    $('.pot, #reset-chips').fadeOut(500);
    $('#deal').prop('disabled', true);
    if ($('#deal').css('display') === 'inline-block') {
        $('#allIn').fadeIn(500);
    }

    // Reset chip Counter
    chipCounter = 0;
}

// Reset cards dealt during game
function resetCards() {
    $('.card').animate({top: -650, left: 145});
    document.getElementById('card-slide-audio').play();

    window.setTimeout(function() {
        $('.card, .front--dim, .value--dim').remove();
        $('.player-cards').animate({left: '97px', width: '187px'});
        $('.player-value-initial').animate({left: '172px'});
        $('.player-bet-initial').animate({right: '65px'});
        $('.dealer-value, .player-initial-value, .player-split-value, .player-message').toggle(false);
        $('.game-controls').children().toggle(false);
        playerCardCount = 0;
        dealerCardCount = 0;
        dealerValue = 0;
        playerValue = 0;
        playerSplitValue = 0;
    },750);
}

// generate a random card value accounting for ace, jack, king and queen
function cardValue(number) {
  switch (number) {
    case 1:
      cardClass = "card-ace";
      value = 'A';
      numberValue = 11;
      break;
    case 2:
      cardClass = "card-two";
      value = number.toString();
      numberValue = number;
      break;
    case 3:
      cardClass = "card-three";
      value = number.toString();
      numberValue = number;
      break;
    case 4:
      cardClass = "card-four";
      value = number.toString();
      numberValue = number;
      break;
    case 5:
      cardClass = "card-five";
      value = number.toString();
      numberValue = number;
      break;
    case 6:
      cardClass = "card-six";
      value = number.toString();
      numberValue = number;
      break;
    case 7:
      cardClass = "card-seven";
      value = number.toString();
      numberValue = number;
      break;
    case 8:
      cardClass = "card-eight";
      value = number.toString();
      numberValue = number;
      break;
    case 9:
      cardClass = "card-nine";
      value = number.toString();
      numberValue = number;
      break;
    case 10:
      cardClass = "card-ten";
      value = number.toString();
      numberValue = number;
      break;
    case 11:
      cardClass = "card-jack";
      value = 'J';
      numberValue = 10;
      break;
    case 12:
      cardClass = "card-queen";
      value = 'Q';
      numberValue = 10;
      break;
    case 13:
      cardClass = "card-king";
      value = 'K';
      numberValue = 10;
  }
}

// generate a random card suit
function randomSuit() {
  var num = Math.floor((Math.random() * 4) + 1);

  switch(num) {
    case 1:
      suitIcon = '&clubs;';
      cardSuit = 'club';
      break;
    case 2:
      suitIcon = '&diams;';
      cardSuit = 'diamond';
      break;
    case 3:
      suitIcon = '&spades;';
      cardSuit = 'spade';
      break;
    case 4:
      suitIcon = '&hearts;';
      cardSuit = 'heart';
  }
}

// generate proper card face based on suit and value
function generateCardIcons(value, suit, suitIcon) {
  switch(value) {
    case 'A':
      cardIcons = '<span class="suit middle_center">'+suitIcon+'</span>';
      break;
    case '2':
      cardIcons = '<span class="suit top_center">'+suitIcon+'</span> <span class="suit bottom_center">'+suitIcon+'</span>';
      break;
    case '3':
      cardIcons = '<span class="suit top_center">'+suitIcon+'</span> <span class="suit middle_center">'+suitIcon+'</span> <span class="suit bottom_center">'+suitIcon+'</span>';
      break;
    case '4':
      cardIcons = '<span class="suit top_left">'+suitIcon+'</span> <span class="suit top_right">'+suitIcon+'</span> <span class="suit bottom_left">'+suitIcon+'</span> <span class="suit bottom_right">'+suitIcon+'</span>';
      break;
    case '5':
      cardIcons = '<span class="suit top_left">'+suitIcon+'</span> <span class="suit top_right">'+suitIcon+'</span> <span class="suit middle_center">'+suitIcon+'</span> <span class="suit bottom_left">'+suitIcon+'</span> <span class="suit bottom_right">'+suitIcon+'</span>';
      break;
    case '6':
      cardIcons = '<span class="suit top_left">'+suitIcon+'</span> <span class="suit top_right">'+suitIcon+'</span> <span class="suit middle_left">'+suitIcon+'</span> <span class="suit middle_right">'+suitIcon+'</span> <span class="suit bottom_left">'+suitIcon+'</span> <span class="suit bottom_right">'+suitIcon+'</span>';
      break;
    case '7':
      cardIcons = '<span class="suit top_left">'+suitIcon+'</span> <span class="suit top_right">'+suitIcon+'</span> <span class="suit middle_left">'+suitIcon+'</span> <span class="suit middle_top">'+suitIcon+'</span> <span class="suit middle_right">'+suitIcon+'</span> <span class="suit bottom_left">'+suitIcon+'</span> <span class="suit bottom_right">'+suitIcon+'</span>';
      break;
    case '8':
      cardIcons = '<span class="suit top_left">'+suitIcon+'</span> <span class="suit top_right">'+suitIcon+'</span> <span class="suit middle_left">'+suitIcon+'</span> <span class="suit middle_top">'+suitIcon+'</span> <span class="suit middle_right">'+suitIcon+'</span> <span class="suit middle_bottom">'+suitIcon+'</span> <span class="suit bottom_left">'+suitIcon+'</span> <span class="suit bottom_right">'+suitIcon+'</span>';
      break;
    case '9':
      cardIcons = '<span class="suit top_left">'+suitIcon+'</span> <span class="suit top_right">'+suitIcon+'</span> <span class="suit middle_top_left">'+suitIcon+'</span> <span class="suit middle_center">'+suitIcon+'</span> <span class="suit middle_top_right">'+suitIcon+'</span> <span class="suit bottom_left">'+suitIcon+'</span> <span class="suit bottom_right">'+suitIcon+'</span> <span class="suit middle_bottom_left">'+suitIcon+'</span> <span class="suit middle_bottom_right">'+suitIcon+'</span>';
      break;
    case '10':
      cardIcons = '<span class="suit top_left">'+suitIcon+'</span> <span class="suit top_right">'+suitIcon+'</span> <span class="suit middle_top_left">'+suitIcon+'</span> <span class="suit middle_top_center">'+suitIcon+'</span> <span class="suit middle_top_right">'+suitIcon+'</span> <span class="suit bottom_left">'+suitIcon+'</span> <span class="suit bottom_right">'+suitIcon+'</span> <span class="suit middle_bottom_center">'+suitIcon+'</span> <span class="suit middle_bottom_left">'+suitIcon+'</span> <span class="suit middle_bottom_right">'+suitIcon+'</span>';
      break;
    case 'J':
      cardIcons = '<span class="face middle_center"><img src="img/faces/face-jack-'+suit+'.png"></span>';
      break;
    case 'Q':
      cardIcons = '<span class="face middle_center"><img src="img/faces/face-queen-'+suit+'.png"></span>';
      break;
    case 'K':
      cardIcons = '<span class="face middle_center"><img src="img/faces/face-king-'+suit+'.png"></span>';
  }
}

// create a random card
function dealRandomCard(player) {
    if (player === 'player') {
        playerCardCount += 1;
        cardCount = playerCardCount;
    }
    else if (player === 'dealer') {
        dealerCardCount += 1;
        cardCount = dealerCardCount;
    }

    var number = randomNumber(1, 13);
    cardValue(number);
    randomSuit();

    generateCardIcons(value, cardSuit, suitIcon);

    $('.'+player+'-area').append(
    '<div class="card card--'+player+'" id="'+player+'-card-'+cardCount+'" value="'+numberValue+'" style="display:none;"><div class = "front"> <div class = "'+cardClass+' '+cardSuit+'"> <div class = "corner top"> <span class = "number">'+value+'</span> <span>'+suitIcon+'</span> </div>'+ cardIcons +'<div class = "corner bottom"> <span class = "number">'+value+'</span> <span>'+suitIcon+'</span> </div> </div> </div> </div>');
}

// display the values of initial 2 cars
function displayValues() {
    var dealerCards = $('.card--dealer');
    var playerCards = $('.card--player');

    dealerValue += parseInt($(dealerCards[1]).attr('value'));

    for (i=0; i < playerCards.length; i++) {
        var playerCardValue = parseInt($(playerCards[i]).attr('value'));
        playerValue += playerCardValue;
    }

    $('.dealer-value--inner').text(dealerValue);
    $('.player-value-initial--inner').text(playerValue);

    $('.dealer-value, .player-value-initial').fadeIn(500);
}

function dealCards() {
    // fade in elements relevant to playing hand
    $('.player-cards, .player-bet-initial').fadeIn(500);

    $('#hit, #doubleDown, #stand, #split').toggle(true).animo({animation: 'bounceInLeft', duration: 1});

    // bring in the bank in the lower left corner
    $('.user-bank--chips').toggle(true);
    $('#user-bank-chip-red').toggle(true).animo({animation: 'bounceInLeft', duration: 1});
    window.setTimeout(function() {
        $('#user-bank-chip-green').toggle(true).animo({animation: 'bounceInLeft', duration: 1});
    },200);
    window.setTimeout(function() {
        $('#user-bank-chip-black').toggle(true).animo({animation: 'bounceInLeft', duration: 1});
    },400);

    // deal two cards each to dealer and player
    window.setTimeout(function() {
        $('.user-bank-deal').toggle(true).animo({animation: 'bounceInLeft', duration: 1}, function() {
            // deal cards
            for (i=0; i<2; i++) {
                dealRandomCard('player');
                dealRandomCard('dealer');
            }
            document.getElementById('card-slide-audio').play();
            $('#dealer-card-1').toggle(true).animate({top: '10px', left: '130px'}, 650);
            window.setTimeout(function() {
                document.getElementById('card-slide-audio').play();
                $('#player-card-1').toggle(true).animate({top: '-50px', left: '130px'}, 650);
            },300);
            window.setTimeout(function() {
                document.getElementById('card-slide-audio').play();
                $('#dealer-card-2').toggle(true).animate({top: '20px', left: '155px'}, 650);
            },650);
            window.setTimeout(function() {
                document.getElementById('card-slide-audio').play();
                $('#player-card-2').toggle(true).animate({top: '-50px', left: '155px'}, 650, function() {
                    // display value of player's card and dealer's visible card
                    displayValues();
                    // Display the onboarding overlay on the fist hand dealt
                    if (handsPlayed === 1) {
                        toggleControlOnboarding(true);
                    }
                    else {
                        var playerCards = $('.card--player');
                        if ($(playerCards[0]).attr('value') != $(playerCards[1]).attr('value')) {
                            $('#split').fadeOut(500);
                        }
                    }
                });
            },1000);
        });
    },400);
}

// Deal initial hand after bet
function dealHand() {
    // increase hands played
    handsPlayed += 1;

    // hide allIn button if still visible
    if ($('#allIn').css('display') === 'inline-block') {
        $('#allIn').animo({animation: 'fadeOutDown', duration: 0.5}, function() {
            $('#allIn').toggle(false);
        });
    }

    // hide deal button
    $('#deal').animo({animation: 'fadeOutDown', duration: 0.5}, function() {
        $('#deal').toggle(false);
        if (handsPlayed === 1) {
            document.getElementById('card-fan-audio').play();
        }
    });

    // fade out bet bank, reset chips 'x', and place your bet text
    $('#reset-chips, .user-bank-bet, .place-your-bet').fadeOut(500, function() {
        $('#reset-chips, .user-bank-bet, .place-your-bet').toggle(false);
    });

    var betChips = $('#bet-chip-red, #bet-chip-green, #bet-chip-black');
    // Just deal cards if all in
    if (betChips.css('display') === 'none') {
       dealCards();
    }
    else {
        // slide bet chip buttons off screen
        $('#bet-chip-red').animo({animation: 'slideOutDown', duration: 0.6}, function() {
            $('#bet-chip-red').toggle(false);
        });
        $('#bet-chip-green').animo({animation: 'slideOutDown', duration: 0.6}, function() {
            $('#bet-chip-green').toggle(false);
        });
        $('#bet-chip-black').animo({animation: 'slideOutDown', duration: 0.6}, function() {
            $('#bet-chip-black').toggle(false);
            dealCards();
        });
    }
}

// toggle onboarding overlay for first hand
function toggleControlOnboarding(b) {
    if (b) {
        $('.game-controls').find('button').attr('disabled', b);
        $('.controls-onboarding-overlay').fadeIn(500, function() {
            $('.onboarding--hit').toggle(true).animo({animation: 'fadeInDown', duration: 0.5});
            $('.onboarding--doubleDown, .onboarding--stand, .onboarding--split, .onboarding--bank').toggle(true).animo({animation: 'fadeInRight', duration: 0.5});
        });
    }
    else {
        $('.game-controls').find('button').attr('disabled', b);
        $('.onboarding--hit').animo({animation: 'fadeOutUp', duration: 0.5}, function() {
            $('.onboarding--hit').toggle(false);
        });
        $('.onboarding--doubleDown').animo({animation: 'fadeOutRight', duration: 0.5}, function() {
            $('.onboarding--doubleDown').toggle(false);
        });
        $('.onboarding--stand').animo({animation: 'fadeOutRight', duration: 0.5}, function() {
            $('.onboarding--stand').toggle(false);
        });
        $('.onboarding--split').animo({animation: 'fadeOutRight', duration: 0.5}, function() {
            $('.onboarding--split').toggle(false);
        });
        $('.onboarding--bank').animo({animation: 'fadeOutRight', duration: 0.5}, function() {
            $('.onboarding--bank').toggle(false);
            $('.controls-onboarding-overlay').fadeOut(500, function() {
                var playerCards = $('.card--player');
                if ($(playerCards[0]).attr('value') != $(playerCards[1]).attr('value')) {
                    $('#split').fadeOut(500);
                }
            });
        });
    }
}

// split player's initial cards into 2 hands
function playerSplit() {
    if (playerCardCount === 2) {
        // Fade In second card area and animate current elements to make room
        $('.player-value-split, .player-bet-split, .player-cards-split').fadeIn(500);
        $('.player-cards').animate({width: '155px', left: '204px'});
        $('.player-bet-initial').animate({right: '-15px'});
        $('.player-value-initial').animate({left: '261px'}).append('<div class="value--dim"></div>');
        document.getElementById('card-slide-audio').play();
        $('#player-card-1').animate({left: '55px'});
        $('#player-card-2').animate({left: '233px'}).append('<div class="front--dim"></div>');

        // Split card values
        var playerValue = parseInt($('#player-card-1').attr('value'));
        var playerSplitValue = parseInt($('#player-card-2').attr('value'));

        $('.player-value-split--inner').text(playerValue);
        $('.player-value-initial--inner').text(playerSplitValue);

        // Split bet
        playerBet = (pot / 2);
        playerSplitBet = (pot / 2);

        $('.bet-amount').text(playerBet);
        $('.split-bet-amount').text(playerSplitBet);

        // fade out split button
        $('#split').fadeOut(500);
    }
    else {
        // do nothing
    }
}

// add additional card for player
function playerHit() {
    if (dealerCardCount === 2) {
        window.setTimeout(function() {
            // deal random card to player
            dealRandomCard('player');

            var cardPosition = (playerCardCount - 1) * 25 + 130 - (12*(playerCardCount - 2));

            // animate new player card
            document.getElementById('card-slide-audio').play();
            $('#player-card-'+playerCardCount).toggle(true).animate({top: '-50px', left: cardPosition + 'px'}, 650);

            // slide over existing cards to make room for new card
            for (i=1; i<playerCardCount; i++) {
                var updatedCardPosition = (i - 1) * 25 + 130 - (12*(playerCardCount - 2));
                $('#player-card-'+i).animate({left: updatedCardPosition + 'px'}, 300);
            }

            // add value of hit to player value
            var hitCardValue = parseInt($('#player-card-'+playerCardCount).attr('value'));
            playerValue += hitCardValue;

            animatedCount('player-value-initial--inner', (playerValue - hitCardValue), playerValue, checkForWinner('player', playerValue));

            // fade out split button
            if ($('#split').css('display') != 'none') {
                $('#split').fadeOut(500);
            }
        },150);
    }
    else {
        // do nothing
    }
}

// add additional card for player
function dealerHit() {
    if (dealerValue < 17) {
        // deal random card to player
        dealRandomCard('dealer');

        var cardPosition = (dealerCardCount - 1) * 25 + 130 - (12*(dealerCardCount - 2));

        // animate new player card
        document.getElementById('card-slide-audio').play();
        $('#dealer-card-'+dealerCardCount).toggle(true).animate({top: '20px', left: cardPosition + 'px'}, 650);

        // slide over existing cards to make room for new card
        for (i=1; i<dealerCardCount; i++) {
            var updatedCardPosition = (i - 1) * 25 + 130 - (12*(dealerCardCount - 2));
            $('#dealer-card-'+i).animate({left: updatedCardPosition + 'px'}, 300);
        }

        // add value of hit to player value
        var hitCardValue = parseInt($('#dealer-card-'+dealerCardCount).attr('value'));
        dealerValue += hitCardValue;

        animatedCount('dealer-value--inner', (dealerValue - hitCardValue), dealerValue, checkForWinner('dealer', dealerValue));
    }
}

// flip & reveal hidden dealer card
function dealerShow() {
    if ($('#dealer-card-1').find('.front').css('display') === 'none') {
        $('#dealer-card-1').animate({top: 20}, 250, function() {
            $('#dealer-card-1').find('.front').fadeIn(500);

            // add hidden card's value to dealer value
            hiddenCardValue = parseInt($('#dealer-card-1').attr('value'));
            dealerValue += hiddenCardValue;
            animatedCount('dealer-value--inner', (dealerValue - hiddenCardValue), dealerValue, checkForWinner('dealer', dealerValue));
        });
        // fade out split button
        $('#split').fadeOut(500);
    }
    else {
        // do nothing
    }
}

// animate chips back to dealer
function chipsToDealer() {
    var redChips = $('.chip--red').not('#bet-chip-red, #user-bank-chip-red');
    var greenChips = $('.chip--green').not('#bet-chip-green, #user-bank-chip-green');
    var blackChips = $('.chip--black').not('#bet-chip-black, #user-bank-chip-black');

    window.setTimeout(function() {
        redChips.animate({top: -40, left: 212.5, opacity: 0}, function() {$(this).remove();});
        greenChips.animate({top: -40, left: 212.5, opacity: 0}, function() {$(this).remove();});
        blackChips.animate({top: -40, left: 212.5, opacity: 0}, function() {$(this).remove();});
        document.getElementById('chip-slide-in-audio').play();
    }, 650);
}

// animate chips to player
function chipsToPlayer() {
    var redChips = $('.chip--red').not('#bet-chip-red, #user-bank-chip-red');
    var greenChips = $('.chip--green').not('#bet-chip-green, #user-bank-chip-green');
    var blackChips = $('.chip--black').not('#bet-chip-black, #user-bank-chip-black');

    window.setTimeout(function() {
        redChips.animate({top: 437, left: 135, opacity: 0}, function() {$(this).remove();});
        greenChips.animate({top: 437, left: 212.5, opacity: 0}, function() {$(this).remove();});
        blackChips.animate({top: 437, left: 292, opacity: 0}, function() {$(this).remove();});
        document.getElementById('chip-slide-in-audio').play();
    }, 650);
}

// player wins
function playerWin() {
    chipsToPlayer();
    document.getElementById('win-audio').play();
    $('.game-container').append('<div class="player-message win"><p><i class="flaticon solid checkmark-3"></i> Win!<br /><span class="user-bank-change">+ $'+(pot*2)+'</span></p></div>');
    // add winnings to bank
    var winnings = pot*2;
    animatedCount('user-bank-amount',bank, (bank+winnings));
    bank += winnings;

    // update biggest win
    if (winnings > biggestWin) {
        biggestWin = winnings;
    }

    // update biggest bank
    if (bank > biggestBank) {
        biggestBank = bank;
    }

    // start new game
    endGame();
}

// player loses
function playerLose() {
    chipsToDealer();
    $('.game-container').append('<div class="player-message"><p><i class="flaticon solid x-3"></i> Lost!<br /><span class="user-bank-change">- $'+pot+'</span></p></div>');
    document.getElementById('lose-audio').play();

    // update biggest loss
    if (pot > biggestLoss) {
        biggestLoss = pot;
    }

    // update biggest bank
    if (bank > biggestBank) {
        biggestBank = bank;
    }

    // start new game
    endGame();
}

// dealer busts
function dealerBust() {
    chipsToPlayer();
    document.getElementById('win-audio').play();
    $('.game-container').append('<div class="dealer-message"><p><i class="flaticon solid x-3"></i> Bust!</p></div><div class="player-message win"><p><i class="flaticon solid checkmark-3"></i> Win!<br /><span class="user-bank-change">+ $'+(pot*2)+'</span></p></div>');
    // add winnings to bank
    var winnings = pot*2;
    animatedCount('user-bank-amount',bank, (bank+winnings));
    bank += winnings;

    // update biggest win
    if (winnings > biggestWin) {
        biggestWin = winnings;
    }

    // update biggest bank
    if (bank > biggestBank) {
        biggestBank = bank;
    }

    // start new game
    endGame();
}

// player busts
function playerBust() {
    chipsToDealer();
    $('.game-container').append('<div class="player-message"><p><i class="flaticon solid x-3"></i> Bust!<br /><span class="user-bank-change">- $'+pot+'</span></p></div>');
    document.getElementById('lose-audio').play();

    // update biggest loss
    if (pot > biggestLoss) {
        biggestLoss = pot;
    }

    // update biggest bank
    if (bank > biggestBank) {
        biggestBank = bank;
    }

    // start new game
    endGame();
}

// player ties
function playerTie() {
    chipsToPlayer();
    $('.game-container').append('<div class="player-message"><p><i class="flaticon solid x-3"></i> Tie!</p></div>');
    document.getElementById('lose-audio').play();
    // return bet to player
    animatedCount('user-bank-amount',bank, (bank+pot));
    bank += pot;

    // update biggest bank
    if (bank > biggestBank) {
        biggestBank = bank;
    }

    // start new game
    endGame();
}

// fade out game controls at end of game
function endGame() {
        $('.game-controls').children().fadeOut(500);
        $('.dealer-value, .player-value-initial, .player-value-split, .pot, .player-cards, .player-bet-initial, .player-bet-split').fadeOut(500);
        window.setTimeout(function() {
            $('.user-bank-deal').animo({animation: 'bounceOutLeft', duration: 0.75}, function() {
                $('.user-bank-deal').toggle(false);
                resetCards();
            });
            window.setTimeout(function() {
                $('#user-bank-chip-black').animo({animation: 'bounceOutLeft', duration: 0.5}, function() {
                    $('#user-bank-chip-black').toggle(false);
                });
            },300);
            window.setTimeout(function() {
                $('#user-bank-chip-green').animo({animation: 'bounceOutLeft', duration: 0.5}, function() {
                    $('#user-bank-chip-green').toggle(false);
                });
            },500);
            window.setTimeout(function() {
                $('#user-bank-chip-red').animo({animation: 'bounceOutLeft', duration: 0.5}, function() {
                    $('#user-bank-chip-red').toggle(false);
                    $('.player-message, .dealer-message').fadeOut(500, function() {
                        if (bank === 0) {
                            // end game if bank is 0
                            triggerGameComplete();
                        }
                        else {
                            initializeGame();
                        }
                    });
                });
            },700);
        }, 1000);
}

// Check for bust or winner based on player and value
function checkForWinner(player, value) {
    // Determine which value we are checking against
    if (player === 'player' && value > 21) {
        // bust
        playerBust();
    }
    else if (playerValue === 21 && dealerValue === 21) {
        if (dealerCardCount === 2 && playerCardCount > 2) {
            // lose
            playerLose();
        }
        else {
            // push
            playerTie();
        }
    }
    else if (player === 'dealer' && value > 21) {
        // dealer bust
        dealerBust();
    }
    else if (player === 'dealer' && value < 17) {
        window.setTimeout(function() {
            dealerHit();
        }, 650);
    }
    else if (player === 'dealer' && value === playerValue) {
        //tie
        playerTie();
    }
    else {
        if (dealerCardCount === 2 && dealerValue < 17) {
            return;
        }
        else if (dealerValue > playerValue) {
            // lose
            playerLose();
        }
        else {
            // win
            playerWin();
        }
    }
}

// Run intro animation on load
$(document).ready(function() {
    animateIntro();
});

// Open gametype instructions
$('.gametype-instructions, #info').click(function() {
    $('.gametype-instructions-overlay').fadeIn(350, function() {
        $('.gametype-instructions-content').toggle(true).animo({animation: 'bounceIn', duration: 0.45});
    });
    toggleBackgroundBlur(true);
});

// Close gametype instructions
$('#close-instructions-overlay').click(function() {
    $('.gametype-instructions-content').animo({animation: 'bounceOut', duration: 0.45}, function() {
        $('.gametype-instructions-content').toggle(false);
        $('.gametype-instructions-overlay').fadeOut(350);
        toggleBackgroundBlur(false);
        window.setTimeout(function() {
            $('.board').removeAttr('style');
        },500);
    });
});

// Open quit game modal
$('#home').click(function() {
    $('.confirm-quit-overlay').fadeIn(350, function() {
        $('.confirm-quit-content').toggle(true).animo({animation: 'bounceIn', duration: 0.45});
    });
    toggleBackgroundBlur(true);
});

// Close quit game modal
$('#close-quit-overlay, #cancel, #quit-game').click(function(e) {
    $('.confirm-quit-content').animo({animation: 'bounceOut', duration: 0.45}, function() {
        if ($(e.target).attr('id') === 'quit-game') {
            triggerGameComplete();
        }

        else {
            $('.confirm-quit-content').toggle(false);
            $('.confirm-quit-overlay').fadeOut(350);
            toggleBackgroundBlur(false);

             window.setTimeout(function() {
                $('.board').removeAttr('style');
            },500);
        }
    });
});

// actions when done playing
function triggerGameComplete() {
    // open complete game modal
    $('#close-quit-overlay').fadeOut(500);
    $('.confirm-quit-content, .confirm-quit-overlay').toggle(false);
    $('.game-complete-overlay').toggle(true);
    $('.game-complete-tip').toggle(true).animo({animation: 'fadeInUp', duration: 0.75, timing: 'ease-out'});
    window.setTimeout(function() {
        $('#play-again').toggle(true).animo({animation: 'fadeInUp', duration: 0.75, timing: 'ease-out'});
    },250);
    window.setTimeout(function() {
        $('.game-complete-content').toggle(true).animo({animation: 'fadeInUp', duration: 0.75, timing: 'ease-out'});
    },500);
    window.setTimeout(function() {
        $('.game-complete-title').toggle(true).animo({animation: 'fadeInUp', duration: 0.75, timing: 'ease-out'});
    },750);
    window.setTimeout(function() {
        $('.game-complete-logo').toggle(true).animo({animation: 'fadeInUp', duration: 0.75, timing: 'ease-out'}, function() {
            animatedCount('highest-chip-count', 0, biggestBank);
            animatedCount('biggest-loss-amount', 0, biggestLoss);
            animatedCount('biggest-win-amount', 0, biggestWin);
            animatedCount('hands-played-amount', 0, handsPlayed);
        });
    },1000);
}

function resetCompleteOverlay() {
    $('.game-complete-overlay').children().toggle(false);
    $('.hands-played-amount, .highest-chip-count, .biggest-win-amount, biggest-loss-amount').text('0');
}

function toggleMute(b) {
    $('audio').prop('muted', b);

    if (b) {
        $('.mute-audio').removeClass('speaker-1').addClass('speaker-3 unmute');
    }
    else {
        $('.mute-audio').removeClass('unmute speaker-3').addClass('speaker-1');
    }
}

// Play again
$('#play-again').click(function() {
    handsPlayed = 0;
    biggestWin = 0;
    biggestLoss = 0;
    biggestBank = 0;

    hideGameElements();
    resetChips();
    resetCards();
    $('.game-complete-overlay').fadeOut(500, function() {
        resetCompleteOverlay();
        toggleBackgroundBlur(false);
        window.setTimeout(function() {
            $('.board').removeAttr('style');
            initializeGame();
        },500);
    });
});

// Advance to gametype
$('.gametype-play').click(function() {
    document.getElementById('click-audio').play();
    $('.logo').animo({animation: 'fadeOutUp', duration: 0.5}, function() {
        $('.logo').toggle(false);
    });
    $('.gametype').animo({animation: 'fadeOutDown', duration: 0.5}, function() {
        $('.gametype').toggle(false);
    });
    $('.game-container').toggle(true);
    window.setTimeout(function() {
        bank = 1000;
        handsPlayed = 0;
        biggestWin = 0;
        biggestLoss = 0;
        biggestBank = 0;
        initializeGame();
    },350);
});

// Toggle audio mute
$('.mute-audio').click(function(e) {
    if ($(this).hasClass('unmute')) {
        console.log('unmute');
        toggleMute(false);
    }
    else {
      console.log('mute');
      toggleMute(true);
    }
});

// Bet chips
$('#bet-chip-red, #bet-chip-green, #bet-chip-black').click(function(e) {
    addChipToPot(e.target);
});

// Go all in
$('#allIn').click(function() {
    document.getElementById('click-audio').play();
    document.getElementById('chip-slide-in-audio').play();
    allIn();
});

// Reset chips
$('#reset-chips').click(function() {
    $('#bet-chip-red, #bet-chip-green, #bet-chip-black').toggle(true);
    resetChips();
});

// Deal hand
$('#deal').click(function() {
    document.getElementById('click-audio').play();
    dealHand();
});

// Close onboarding on click of close button or anywhere in overlay
$('.controls-onboarding-overlay, #close-onboarding-overlay').click(function() {
    toggleControlOnboarding(false);
});

// Player hit
$('#hit').click(function() {
    document.getElementById('click-audio').play();
    playerHit();
});

// Player stand
$('#stand').click(function() {
    document.getElementById('click-audio').play();
    dealerShow();
});

// Player split
$('#split').click(function() {
    document.getElementById('click-audio').play();
    playerSplit();
});