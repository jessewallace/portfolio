/*************************
Demo States
*************************/
var gametype = 'normal';
var difficulty = '';
var secondsElapsed = 0;
var minutesElapsed = 0;
var errorsMade = 12;
var noteMode = false;
var paused = false;
var tileSelected = false;
var placeNumber = false;
var activeNumber = 0;
var hintsUsed = 0;
var activeTile = null;
var sudokuTimer = 0;
/*************************
End Demo States
*************************/


// @TODO: When you trigger a hint, the number that appears on the board should have the '.sudoku-tile--highlight' class added to 
//        it and then removed after a short delay as a visual indicator of the number being added to the board.

// @TODO: When all of a number is used, add disabled property to that number.

// @TODO: Trigger completeGame() when game is finished

// @TODO: Trigger document.getElementById('error-sound').play(); and add the '.sudoku-tile--error' class to conflicting tiles if a user places an incorrect number


// Audio Track Volumes
document.getElementById('background-music').volume = 0.1;
document.getElementById('level-complete').volume = 0.1;
document.getElementById('asian-magic').volume = 0.2;

// Homepage Display Order
$('.sudoku-wrapper').toggle(true);
window.setTimeout(function() {$('.bamboo').not('.bamboo--complete').toggle(true).animo({animation: 'slideInUp', duration: 0.6});}, 200);
window.setTimeout(function() {
    $('.lantern').not('.lantern--two').toggle(true).animo({animation: 'lanternSlideIn', duration: 1}, function() {
        $('.lantern').not('.lantern--two').animo({animation: 'sway', keep: true, duration: 3.5, iterate: 'infinite'});
    });
    $('.lantern--two').toggle(true).animo({animation: 'lanternSlideInInverse', duration: 1}, function() {
        $('.lantern--two').animo({animation: 'swayInverse', keep: true, duration: 3.5, iterate: 'infinite'});
    });
}, 100);
window.setTimeout(function() {
    document.getElementById('whoosh').play(); 
    $('.sudoku-zen-logo-background').toggle(true).animo({animation: 'scaleInRotate', duration: 0.6});
}, 500);
window.setTimeout(function() {$('.sudoku-zen-logo').toggle(true).animo({animation: 'scaleIn', duration: 0.5});}, 1000);
window.setTimeout(function() {
    $('.sudoku-gametype-wrapper, .sudoku-gametype-select-text').toggle(true).animo({animation: 'fadeIn', duration: 0.5});
    if (!$('.sudoku-navigation-icon').is(':visible')) {
        $('.sudoku-navigation-icon, .sudoku-options-toggle').toggle(true).animo({animation: 'fadeIn', duration: 0.5});
    }
}, 1500);




// Blur background
function toggleBackgroundBlur(b) {
    if (!b) {
        $('.sudoku-game').animate({
            blurRadius: 0
        }, {
            duration: 200,
            easing: 'linear',
            step: function() {
                $(this).css({
                    "-moz-filter": "blur(" + this.blurRadius + "px)",
                    "-webkit-filter": "blur(" + this.blurRadius + "px)",
                    "filter": "blur(" + this.blurRadius + "px)"
                });
                window.setTimeout(function() {
                    $('.sudoku-game').removeAttr('style');
                },500);
            }
        });
    } else {
        $('.sudoku-game').animate({
            blurRadius: 5
        }, {
            duration: 200,
            easing: 'linear',
            step: function() {
                $(this).css({
                    "-moz-filter": "blur(" + this.blurRadius + "px)",
                    "-webkit-filter": "blur(" + this.blurRadius + "px)",
                    "filter": "blur(" + this.blurRadius + "px)"
                });
            }
        });
    }
}

// Reset Homescreen
function toggleHomeScreen(b) {
    var homeScreenElements = $('.bamboo, .lantern, .sudoku-zen-logo-background, .sudoku-zen-logo, .sudoku-gametype-select-text, .sudoku-gametype-wrapper, .sudoku-gametype--express-selected, .sudoku-gametype--normal-selected, .deselect-gametype');
    if (b) {
        homeScreenElements.toggle(false);
        $('.sudoku-start-game').toggle(false);
        window.setTimeout(function() {$('.bamboo').toggle(true).animo({animation: 'slideInUp', duration: 0.65});}, 200);
        window.setTimeout(function() {
            $('.lantern').not('.lantern--two').toggle(true).animo({animation: 'lanternSlideIn', duration: 1.25}, function() {
                $('.lantern').not('.lantern--two').animo({animation: 'sway', keep: true, duration: 3.5, iterate: 'infinite'});
            });
            $('.lantern--two').toggle(true).animo({animation: 'lanternSlideInInverse', duration: 1.25}, function() {
                $('.lantern--two').animo({animation: 'swayInverse', keep: true, duration: 3.5, iterate: 'infinite'});
            });
        }, 200);
        window.setTimeout(function() {$('.sudoku-zen-logo-background').toggle(true).animo({animation: 'scaleInRotate', duration: 0.6});}, 900);
        window.setTimeout(function() {$('.sudoku-zen-logo').toggle(true).animo({animation: 'scaleIn', duration: 0.5});}, 1550);
        window.setTimeout(function() {
            $('.sudoku-gametype-wrapper, .sudoku-gametype-select-text').toggle(true).animo({animation: 'fadeIn'});
            if (!$('.sudoku-navigation-icon').is(':visible')) {
                $('.sudoku-navigation-icon, .sudoku-options-toggle').toggle(true).animo({animation: 'fadeIn'});
            }
        }, 2050);
    } else {
        homeScreenElements.fadeOut();
        $('.sudoku-start-game').animo({animation: 'fadeOut', duration: 0.5}, function() {
            $('.sudoku-start-game').toggle(false);
        });
    }
}

// Generate Board
function generateBoard(gametype) {
    var board = $('.sudoku-board');
    var tiles = (gametype === 'normal') ? 81 : 36;

    var sectionCount = 0;
    var row = 0;
    var column = 0;
    var accentClass = '';

    for (i = 0; i < tiles; i++) {
        sectionCount += (i%3 === 0) ? 1 : 0;

        if (gametype === 'normal') {
            // Set Row
            switch(true) {
                case (i < 9):
                    row = 1;
                    break;
                case (9 <= i && i < 18):
                    row = 2;
                    break;
                case (18 <= i && i < 27):
                    row = 3;
                    break;
                case (27 <= i && i < 36):
                    row = 4;
                    break;
                case (36 <= i && i < 45):
                    row = 5;
                    break;
                case (45 <= i && i < 54):
                    row = 6;
                    break;
                case (54 <= i && i < 63):
                    row = 7;
                    break;
                case (63 <= i && i < 72):
                    row = 8;
                    break;
                case (72 <= i && i < 81):
                    row = 9;
                    break;
                default:
                    row = 0;
                    break;
            }

            // Set Column
            if (column < 9) {
                column += 1;
            } else {
                column = 1;
            }

            // Set Block
            switch(true) {
                case (column <= 3 && row <=3):
                    block = 1;
                    break; 
                case (column > 3 && column <=6 && row <=3):
                    block = 2;
                    break; 
                case (column > 6 && column <=9 && row <=3):
                    block = 3;
                    break; 
                case (column <= 3 && row > 3 && row <=6):
                    block = 4;
                    break; 
                case (column > 3 && column <=6 && row > 3 && row <=6):
                    block = 5;
                    break; 
                case (column > 6 && column <=9 && row > 3 && row <=6):
                    block = 6;
                    break; 
                case (column <= 3 && row > 6 && row <=9):
                    block = 7;
                    break; 
                case (column > 3 && column <=6 && row > 6 && row <=9):
                    block = 8;
                    break; 
                case (column > 6 && column <=9 && row > 6 && row <=9):
                    block = 9;
                    break;
                default:
                    block = 0;
                    break; 
            }

            // Add Accent Classes
            switch(block) {
                case (1):
                    accentClass = '';
                    break;
                case (2):
                    accentClass = ' sudoku-tile--accent';
                    break;
                case (3):
                    accentClass = '';
                    break;
                case (4):
                    accentClass = ' sudoku-tile--accent';
                    break;
                case (5):
                    accentClass = '';
                    break;
                case (6):
                    accentClass = ' sudoku-tile--accent';
                    break;
                case (7):
                    accentClass = '';
                    break;
                case (8):
                    accentClass = ' sudoku-tile--accent';
                    break;
                case (9):
                    accentClass = '';
                    break;
                default:
                    accentClass = '';
                    break;
            }
        } else {
            // Set Row
            switch(true) {
                case (i < 6):
                    row = 1;
                    break;
                case (6 <= i && i < 12):
                    row = 2;
                    break;
                case (12 <= i && i < 18):
                    row = 3;
                    break;
                case (18 <= i && i < 24):
                    row = 4;
                    break;
                case (24 <= i && i < 30):
                    row = 5;
                    break;
                case (30 <= i && i < 36):
                    row = 6;
                    break;
                default:
                    row = 0;
                    break;
            }

            // Set Column
            if (column < 6) {
                column += 1;
            } else {
                column = 1;
            }

            // Set Block
            switch(true) {
                case (column <= 3 && row <=2):
                    block = 1;
                    break; 
                case (column > 3 && column <=6 && row <=2):
                    block = 2;
                    break; 
                case (column <= 3 && row > 2 && row <=4):
                    block = 3;
                    break;
                case (column > 3 && column <=6 && row > 2 && row <=4):
                    block = 4;
                    break;
                case (column <= 3 && row > 4 && row <=6):
                    block = 5;
                    break;  
                case (column > 3 && column <= 6 && row > 4 && row <=6):
                    block = 6;
                    break; 
                default:
                    block = 0;
                    break;
            }

            // Add Accent Classes
            switch(block) {
                case (1):
                    accentClass = '';
                    break;
                case (2):
                    accentClass = ' sudoku-tile--accent';
                    break;
                case (3):
                    accentClass = ' sudoku-tile--accent';
                    break;
                case (4):
                    accentClass = '';
                    break;
                case (5):
                    accentClass = '';
                    break;
                case (6):
                    accentClass = ' sudoku-tile--accent';
                    break;
                default:
                    accentClass = '';
                    break;
            }
        }

        board.append('<div class="sudoku-tile sudoku-tile--' + gametype + accentClass +'" data-row="' + row + '" data-column="' + column + '" data-block="' + block + '">' +
                '<div class="sudoku-tile-value"></div>'+
                '<div class="sudoku-tile-clear-number" style="display:none;"><i class="flaticon stroke x-2"></i></div>'+
                '<div class="sudoku-notes">'+
                    '<div class="sudoku-note sudoku-note-1" style="display:none;">1</div>' +
                    '<div class="sudoku-note sudoku-note-2" style="display:none;">2</div>' +
                    '<div class="sudoku-note sudoku-note-3" style="display:none;">3</div>' +
                    '<div class="sudoku-note sudoku-note-4" style="display:none;">4</div>' +
                    '<div class="sudoku-note sudoku-note-5" style="display:none;">5</div>' +
                    '<div class="sudoku-note sudoku-note-6" style="display:none;">6</div>' +
                    '<div class="sudoku-note sudoku-note-7" style="display:none;">7</div>' +
                    '<div class="sudoku-note sudoku-note-8" style="display:none;">8</div>' +
                    '<div class="sudoku-note sudoku-note-9" style="display:none;">9</div>' +
                '</div>'+
            '</div>');
    }
}

function resetGame() {
    /*************************
    Reset Demo States
    *************************/
    gametype = 'normal';
    difficulty = '';
    secondsElapsed = 0;
    minutesElapsed = 0;
    noteMode = false;
    paused = false;
    tileSelected = false;
    placeNumber = false;
    activeNumber = 0;
    hintsUsed = 0;
    activeTile = null;
    sudokuTimer = 0;
    /*************************
    End Reset Demo States
    *************************/

    $('.sudoku-board, .sudoku-number-buttons').fadeOut(function() {
        $(this).html('');
    })
    $('.sudoku-controls, .sudoku-controls-divider, .sudoku-board-symbol').fadeOut();
    $('.sudoku-hint').removeClass('sudoku-hint--used');
    $('#notes-toggle').prop('checked', false);
}

function generateButtons(gametype) {
    var n = (gametype === 'normal') ? 9 : 6;
    var container = $('.sudoku-number-buttons');
    for (i = 1; i <= n; i++) {
        container.append('<button type="button" class="sudoku-button sudoku-button--number" value="' + i + '">' + i + '</button>');
    }
}

function toggleButtons(b) {
    var buttons = $('.sudoku-button--number');
    if (b) {
        buttons.addClass('sudoku-button--number-note');
    } else {
        buttons.removeClass('sudoku-button--number-note');
    }
}

function toggleCrosshair(element, bool) {
    var tile = $(element);
    var tileValue = tile.find('.sudoku-tile-value');
    var column = tile.data('column');
    var row = tile.data('row');

    var crosshair = noteMode ? 'sudoku-tile--crosshair-note' : 'sudoku-tile--crosshair';
    var targetedTile = noteMode ? 'sudoku-tile--targeted-note' : 'sudoku-tile--targeted';
    var selectedTile = noteMode ? 'sudoku-tile--selected-note' : 'sudoku-tile--selected';

    if (tileSelected) {
        return;
    } else {
        if (bool) {
            $('.sudoku-board').find('.sudoku-tile[data-row='+row+'], .sudoku-tile[data-column='+column+']').addClass(crosshair);
            if (tileValue.text() === '' && !tile.find('.sudoku-notes').children().is(':visible')) {
                tile.addClass(targetedTile);
            } else if (tileValue.text() === '' && tile.find('.sudoku-notes').children().is(':visible')) {
                // do nothing
            } else {
                tile.find('.sudoku-tile-clear-number').toggle(!placeNumber);
            }
        } else {
            $('.sudoku-board').find('.sudoku-tile[data-row='+row+'], .sudoku-tile[data-column='+column+']').removeClass(crosshair);
            tile.removeClass(targetedTile);
            tile.find('.sudoku-tile-clear-number').toggle(false);
        }
    }
}

function selectTile(element) {
    var tile = $(element);
    var tileValue = tile.find('.sudoku-tile-value');
    var column = tile.data('column');
    var row = tile.data('row');

    var crosshair = noteMode ? 'sudoku-tile--crosshair-note' : 'sudoku-tile--crosshair';
    var targetedTile = noteMode ? 'sudoku-tile--targeted-note' : 'sudoku-tile--targeted';
    var selectedTile = noteMode ? 'sudoku-tile--selected-note' : 'sudoku-tile--selected';

    if (placeNumber) {
        addNumber(tile);
        tile.removeClass(targetedTile);
    } else {
        if (tile.hasClass(selectedTile)) {
            // if tile is already selected remove select styles
            $('.sudoku-tile').removeClass(selectedTile);
            if (tileValue.text() === '' && !tile.find('.sudoku-notes').children().is(':visible')) {
                tile.addClass(targetedTile);
            }
            activeTile = null;
            tileSelected = false;
        } else if (tileValue.text() !== '') {
            // if tile has a number highlight all of that number on the board
            var n = tileValue.text();
            var accentTiles = $('.sudoku-tile').find('.sudoku-tile-value:contains("' + n + '")');
            if ($(accentTiles[0]).parent('.sudoku-tile').hasClass('sudoku-tile--highlight')) {
                accentTiles.parent('.sudoku-tile').removeClass('sudoku-tile--highlight');
            } else {
                $('.sudoku-tile').removeClass('sudoku-tile--highlight');
                accentTiles.parent('.sudoku-tile').addClass('sudoku-tile--highlight');
            }
        } else {
            // if tile is not selected then add select styles
            $('.sudoku-tile').removeClass(selectedTile).removeClass(crosshair).removeClass(targetedTile);
            $('.sudoku-board').find('.sudoku-tile[data-row='+row+'], .sudoku-tile[data-column='+column+']').addClass(crosshair);
            tile.addClass(selectedTile);
            activeTile = tile;
            tileSelected = true;
        }
    }
}

// Update existing crosshair/selected tiles when toggling note mode
function toggleCrosshairState(b) {
    if (b) {
        $('.sudoku-tile--crosshair').removeClass('sudoku-tile--crosshair').addClass('sudoku-tile--crosshair-note');
        $('.sudoku-tile--targeted').removeClass('sudoku-tile--targeted').addClass('sudoku-tile--targeted-note');
        $('.sudoku-tile--selected').removeClass('sudoku-tile--selected').addClass('sudoku-tile--selected-note');
    } else {
        $('.sudoku-tile--crosshair-note').addClass('sudoku-tile--crosshair').removeClass('sudoku-tile--crosshair-note');
        $('.sudoku-tile--targeted-note').addClass('sudoku-tile--targeted').removeClass('sudoku-tile--targeted-note');
        $('.sudoku-tile--selected-note').addClass('sudoku-tile--selected').removeClass('sudoku-tile--selected-note');
    }
}

function toggleNoteMode(element) {
    var toggleState = $(element).prop('checked');

    noteMode = toggleState;
    toggleButtons(toggleState);
    toggleCrosshairState(toggleState);
}

function useHint(element) {
    var hints = $(element).find('.sudoku-hint').not('.sudoku-hint--used');

    if (hints.length) {
        document.getElementById('asian-magic').play();
        $(hints[hints.length - 1]).addClass('sudoku-hint--used');
        hintsUsed += 1;
    } else {
        return;
    }
}

function addNumber(element, button) {
    var target = $(element);
    if (!element) {
        placeNumber = ($(button).hasClass('sudoku-button--number-place')) ? false : true;
        $('.sudoku-button--number').not(button).removeClass('sudoku-button--number-place');
        $(button).toggleClass('sudoku-button--number-place');
    } else if (noteMode) {
        target.find('.sudoku-note-'+activeNumber).toggle();
    } else {
        target.find('.sudoku-tile-value').text(activeNumber);
        target.find('.sudoku-notes').children().toggle(false);
    }
}

function removeNumber(event, element) {
    event.stopPropagation();
    var tile = $(element).parent('.sudoku-tile');
    tile.removeClass('sudoku-tile--error').removeClass('sudoku-tile--highlight').find('.sudoku-tile-value').text('');
    tile.mouseenter();
    $(element).toggle(false);
}

function startTimer() {
    sudokuTimer = setInterval(function() {
        if (secondsElapsed < 59) {
            secondsElapsed += 1;
        } else {
            minutesElapsed +=1;
            secondsElapsed = 0;
        }
        $('.sudoku-minutes').text(('0'+minutesElapsed).slice(-2));
        $('.sudoku-seconds').text(('0'+secondsElapsed).slice(-2));
    }, 1000);
}

function startGame() {
    generateBoard(gametype);
    generateButtons(gametype);

    $('.sudoku-board, .sudoku-board-symbol').fadeIn(750, function() {
        document.getElementById('whoosh-2').play();
        document.getElementById('background-music').play();
    });
    $('.sudoku-number-buttons').toggle(true).animo({animation: 'slideInUp', duration: 1});
    window.setTimeout(function() {
        $('.sudoku-controls-divider').toggle(true).animo({animation: 'slideInUp', duration: 1});
    }, 300);
    window.setTimeout(function() {
        $('.sudoku-controls').toggle(true).animo({animation: 'slideInUp', duration: 1}, function() {
           enqueueGameActions();
           startTimer();
        });
    }, 600);
}

function togglePlay(bool) {
    if (sudokuTimer !== 0) {
        document.getElementById('click-sound').play();
        $('.pause-game').toggle(!bool);
        $('.resume-game').toggle(bool);

        if (bool) {
            window.clearInterval(sudokuTimer);
        } else {
            startTimer();
        }
    }
}

function toggleSound(bool) {
    $('.mute-audio').toggle(!bool);
    $('.unmute-audio').toggle(bool);
    $('audio').prop('muted', bool);
}

function enqueueGameActions() {
    // Tile Hover
    $('.sudoku-tile').hover(function() {
        toggleCrosshair(this, true);
        }, function() {
        toggleCrosshair(this, false);
    });

    // Tile Select
    $('.sudoku-tile').on('click', function() {
        selectTile(this);
        document.getElementById('click-sound').play();
    });

    // Toggle Note Mode
    $('.sudoku-control--notes-toggle').find('input[type=checkbox]').on('click', function() {
        document.getElementById('switch-sound').play();
        toggleNoteMode(this);
    });

    // Use Hint
    $('.sudoku-control--hints').on('click', function() {
        useHint(this);
    });

    // Add Number
    $('.sudoku-button--number').on('click', function() {
        activeNumber = $(this).attr('value');
        addNumber(activeTile, this);
        document.getElementById('click-sound').play();
    });

    // Remove number
    $('.sudoku-tile-clear-number').on('click', function(event) {
        removeNumber(event, this);
        document.getElementById('click-sound').play();
    });
}

function completeGame() {
    window.clearInterval(sudokuTimer);
    $('.sudoku-overlay--complete').fadeIn(500, function() {
        document.getElementById('level-complete').play();
        $('.sudoku-overlay-background--purple').toggle(true).animo({animation: 'scaleInRotate', duration: 0.5}, function() {
            document.getElementById('whoosh').play();
            $('.bamboo--complete').toggle(true).animo({animation: 'slideInUp', duration: 0.5});
            $('.sudoku-game-complete').toggle(true).animo({animation: 'scaleIn', duration: 0.5});

            window.setTimeout(function() {
                $('.sudoku-game-complete').fadeOut(function() {
                    $('.sudoku-game-stats-logo').fadeIn(650, function() {
                        $('.sudoku-game-stats-title').fadeIn(650, function() {
                            document.getElementById('pop-drip').play();
                            $('.sudoku-game-stats-divider--1').fadeIn(750);
                            $('#sudoku-time-played-minutes').text(('0'+minutesElapsed).slice(-2));
                            $('#sudoku-time-played-seconds').text(('0'+secondsElapsed).slice(-2));
                            $('.sudoku-game-stats-time-played').fadeIn(750, function() {
                                document.getElementById('pop-drip').play();
                                $('.sudoku-game-stats-divider--2').fadeIn(750);
                                $('#sudoku-errors-made').text(errorsMade);
                                $('.sudoku-game-stats-errors-made').fadeIn(750, function() {
                                    document.getElementById('pop-drip').play();
                                    $('#sudoku-hints-used').text(hintsUsed);
                                    $('.sudoku-game-stats-hints-used').fadeIn(750, function() {
                                        document.getElementById('pop-drip').play();
                                        $('.sudoku-play-again').toggle(true).animo({animation: 'fadeIn', duration: 0.65});
                                    });
                                });
                            });
                        });
                    });
                });
            }, 2500);
        });
    });
    toggleBackgroundBlur(true);
}




// Toggle Game Pause
$('.sudoku-play-toggle').on('click', function() {
    var state = $('.pause-game').is(':visible');
    togglePlay(state);
});

// Toggle Game Audio
$('.sudoku-sound-toggle').on('click', function() {
    document.getElementById('click-sound').play();
    var state = $('.mute-audio').is(':visible');
    toggleSound(state);
});

// Instructions Modal
$('.sudoku-instructions').on('click', function() {
    document.getElementById('click-sound').play();
    toggleBackgroundBlur(true);
    window.clearInterval(sudokuTimer);
    $('.sudoku-overlay--instructions').fadeIn(650);
});
$('.close-sudoku-instructions').on('click', function() {
    document.getElementById('click-sound').play();
    $('.sudoku-overlay--instructions').fadeOut();
    toggleBackgroundBlur(false);
    if (sudokuTimer !== 0) {
        startTimer();
    }
});

// More Options Toggle
// $('.sudoku-options-toggle').on('click', function() {
//     document.getElementById('whoosh-2').play();
//     $('.sudoku-more-options').fadeToggle();
// });

// Select Gametype
$('.sudoku-gametype').not('.sudoku-gametype--normal-selected').not('.sudoku-gametype--express-selected').on('click', function() {
    gametype = $(this).attr('title').toLowerCase();
    document.getElementById('pop-drip').play();
    $('.sudoku-gametype--' + gametype + '-selected').fadeToggle();
    $('.sudoku-start-game, .deselect-gametype').fadeOut();
    $('.sudoku-difficulty--' + gametype).toggleClass('selected', false);
});

// Select Difficulty
$('.sudoku-difficulty--express').on('click', function() {
    $('.sudoku-difficulty--express').not($(this)).toggleClass('selected', false);
    $(this).toggleClass('selected');

    if ($(this).hasClass('selected')) {
        if ($('.sudoku-start-game').is(':visible')) {

        } else {
            $('.sudoku-start-game, .sudoku-deselect-express').toggle(true).animo({animation: 'fadeIn', duration: 0.5});
        }
        document.getElementById('click-sound').play();
    } else {
        $('.sudoku-start-game').animo({animation: 'fadeOut', duration: 0.5}, function() {
            $('.sudoku-start-game').toggle(false);
        });
        $('.sudoku-deselect-express').animo({animation: 'fadeOut', duration: 0.5}, function() {
            $('.sudoku-deselect-express').toggle(false);
        });
        document.getElementById('click-sound').play();
    }
});
$('.sudoku-difficulty--normal').on('click', function() {
    $('.sudoku-difficulty--normal').not($(this)).toggleClass('selected', false);
    $(this).toggleClass('selected');

    if ($(this).hasClass('selected')) {
        if ($('.sudoku-start-game').is(':visible')) {

        } else {
            $('.sudoku-start-game, .sudoku-deselect-normal').toggle(true).animo({animation: 'fadeIn', duration: 0.5});
        }
        document.getElementById('click-sound').play();
    } else {
        $('.sudoku-start-game').animo({animation: 'fadeOut', duration: 0.5}, function() {
            $('.sudoku-start-game').toggle(false);
        });
        $('.sudoku-deselect-normal').animo({animation: 'fadeOut', duration: 0.5}, function() {
            $('.sudoku-deselect-express').toggle(false);
        });
        document.getElementById('click-sound').play();
    }
});

// Deselect Gametype
$('.sudoku-deselect-normal').on('click', function() {
    document.getElementById('pop-drip').play();
    $('.sudoku-difficulty--normal').toggleClass('selected', false);
    $(this)
        .fadeToggle(false)
        .parent('.sudoku-gametype').fadeToggle(false);
    $('.sudoku-start-game').animo({animation: 'fadeOut', duration: 0.5}, function() {
        $('.sudoku-start-game').toggle(false);
    });
});
$('.sudoku-deselect-express').on('click', function() {
    document.getElementById('pop-drip').play();
    $('.sudoku-difficulty--express').toggleClass('selected', false);
    $(this)
        .fadeToggle(false)
        .parent('.sudoku-gametype').fadeToggle(false);
    $('.sudoku-start-game').animo({animation: 'fadeOut', duration: 0.5}, function() {
        $('.sudoku-start-game').toggle(false);
    });
});

// Return Home
$('.sudoku-home').on('click', function() {
    var overlay = $('.sudoku-overlay--quit');

    if (sudokuTimer !== 0) {
        document.getElementById('click-sound').play();
        document.getElementById('whoosh-2').play();
        toggleBackgroundBlur(true);
        overlay.fadeIn(650);
        window.clearInterval(sudokuTimer);
    }
});
$('.close-sudoku-quit, .sudoku-cancel-quit').on('click', function() {
    document.getElementById('click-sound').play();
    $('.sudoku-overlay--quit').fadeOut();
    toggleBackgroundBlur(false);
    startTimer();
});
$('.sudoku-quit-game').on('click', function() {
    $('.sudoku-overlay--quit').fadeOut();
    document.getElementById('click-sound').play();
    document.getElementById('whoosh').play();
    toggleBackgroundBlur(false);
    toggleHomeScreen(true);
    resetGame();
});

// Start Game
$('.sudoku-start-game').on('click', function() {
    document.getElementById('asian-magic').play();
    document.getElementById('whoosh').play();
    toggleHomeScreen(false);
    window.setTimeout(function() {
        startGame();
    }, 400) 
});

// Play again
$('.sudoku-play-again').on('click', function() {
    $('.sudoku-overlay--complete').fadeOut(function() {
        $(this).children().not('.sudoku-game-stats').toggle(false);
        $('.sudoku-game-stats').children().toggle(false);
    });
    document.getElementById('click-sound').play();
    document.getElementById('whoosh').play();
    toggleBackgroundBlur(false);
    toggleHomeScreen(true);
    resetGame();
});





