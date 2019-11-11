/**
 * slidepuzzle.js
 */
_See.Slidepuzzle = {

    /**
     * This holds the templates just for this widget
     */
    templates : {},

    /**
     * Game object for logic and display
     *
     */
    Game : function (element) {

        // Initialize DOM structure
        // Ugly, but one less request
        _See.$(element).html(
//            '<div class="see-header"><h2>PicSlide</h2><span class="see-moves"/></div>' +
            '<div class="see-board"/>' +
            '<div class="see-footer" ><div class="see-newgame-wrapper"><img class="see-new" src="img/left-square-2.png" alt=new game" /></div><button class="see-shuffle">Shuffle</button>' +
            '<button class="see-help">Hints</button><div class="see-howto-wrapper"><img class="see-howto" src="img/question-2.png" alt="how to play" />' +
            '</div><div class="see-moves-wrapper">Total Moves<br/><div class="see-moves-digit"><div class="see-moves-digit-1">0<br/>1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9</div></div>' +
            '<div class="see-moves-digit"><div class="see-moves-digit-2">0<br/>1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9</div></div>' +
            '<div class="see-moves-digit"><div class="see-moves-digit-3">0<br/>1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9</div></div>' +
            '</div></div><div class="see-modal"/>' +
            '<div class="see-login">Login to keep the points you win from playing! <a>Log in now</a></div>'
        );

        var version = 2,

        /**
         * The key for game config items for this game
         * @type {String}
         */
        gameId = 'slidepuzzle',

        /**
         * Dom Object for tracking dom references
         */
        dom         = new _See.GameCore.DOM(element),

        /**
         * Events object for tracking / emitting game events
         */
        events      = new _See.GameCore.Events(element),

        /**
         * Modals object for handling modals
         */
        modals      = new _See.GameCore.Modals(dom, events),

        /**
         * Session Object for managing game sessions / attributes
         */
        session     = new _See.GameCore.Session('slidepuzzle', events),

        /**
         * Status objecet for tracking overall game and environment status
         */
        status      = new _See.GameCore.Status(events),

        /**
         * User Object for tracking user properties
         */
        user        = new _See.GameCore.User('slidepuzzle', events, dom),

        /**
         * Holds instance of Board Object once game is initialized
         */
        board       = {},

        /**
         * Ad Config as defined by Universal Config
         */
        ads         = new _See.GameCore.Ads(gameId, events);

        // Set up session properties / setting
        session.setting     = 1;
        session.size        = 4;  // size of board (width and height) min 3, max 9
        session.pieceSize   = 125; // pixel size of pieces
        session.plays       = 0;

        // Setup DOM configuration and start game
        dom.board           = dom.find('.see-board');
        dom.header          = dom.find('.see-header');
        dom.header.title    = dom.header.find('h2');
        dom.modal           = dom.find('.see-modal').hide();
        dom.footer          = dom.find('.see-footer');
        dom.footer.moves    = dom.footer.find('.see-moves');
        dom.login           = dom.find('.see-login');

        // Attach events
        dom.footer.find('img.see-new').onTap(function(){
            modals.open('newgame');
        });
        dom.find('button.see-help').onTap(function(){
            dom.toggleClass('see-help');
        });
        dom.find('img.see-howto').onTap(function(){
            if (modals.getCurrent() != 'howto') {
                modals.open('howto');
            } else {
                modals.close();
            }
        });
        dom.login.find('a').on('click', user.doLogin);

        // Execute a Load action, if there's one configured
        _See.GameCore.execAction(gameId, 'onLoad');

        /**
         * Set up modals
         */
        // newgame
        modals.add('newgame', {
            html        : '<div class="see-logo">Pic<span class="blue">Slide</span></div><div class="see-start-wrapper"><div class="see-start">Select Difficulty to Start</div><div class="see-button easy" data-setting="3">Easy<span class="see-points-value">500 Pts</span></div>' +
                '<div class="see-button medium" data-setting="4">Medium<span class="see-points-value">1500 Pts</span></div>' +
                '<div class="see-button hard" data-setting="5">Hard<span class="see-points-value">2500 Pts</span></div></div>',
            styleClass  : 'see-newgame',
            onOpen      : function (modal) {
                modal.find('.see-button').onTap(function(e){
                    session.setting = _See.$(e.target).data('setting');
                    session.size    = _See.$(e.target).data('setting');
                    newGame();
                });

                updateCounter('000','.see-footer',300);
                updateCounter('000','.see-results',300);
            }


        });

        // howto
        modals.add('howto', {
            html        : '<span class="see-close" />' +
              '<div class="see-howto-wrapper"><h3>How to Play</h3>' +
              '<br/><p>The goal of this game is to maneuver the tiles into their correct positions by sliding the tiles onto the empty space until the tiles form a complete picture.</p>' +
              '<br/><p>You can click on a tile adjacent to the empty space to move that tile into the empty space. You can also move multiple tiles by clicking a row or column of tiles that occupies the same row or column as the empty space.</p>' +
              '<br/><p>To win, arrange the tiles in the correct order from left-to-right and top-to-bottom in the smallest amount of moves possible. Each move that you make is tracked by a counter found above the game board to help you keep track of your progress.</p>' +
              '<br/><p>Completing the puzzle will earn you points. Higher difficulty puzzles will award greater amounts of points for their completion.</p></div>'
            ,
            styleClass  : 'see-howto',
            onOpen      : function (modal) {
                modal.find('.see-close').onTap(function(e){
                    modals.close();
                });

            }

        });

        // completegame
        modals.add('completegame', {
            html        : function(){ return '<div class="see-logo">Pic<span class="blue">Slide</span></div><div class="see-solved"><img src="img/thumbs-up-1.png" />Puzzle Solved!!</div>' +
                '<div class="see-results"><div class="see-moves-wrapper">Total Moves<br/>' +'' +
                '<div class="see-moves-digit"><div class="see-moves-digit-1">0<br/>1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9</div></div>' +
                '<div class="see-moves-digit"><div class="see-moves-digit-2">0<br/>1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9</div></div>' +
                '<div class="see-moves-digit"><div class="see-moves-digit-3">0<br/>1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9</div></div>' +
                '<span class="see-completion-time" >Time: <strong></strong> min <strong></strong> sec</span></div><div class="see-results-level">' +
                '<div class="see-results-stars"><span class="filled" /><span /><span /></div><div class="see-results-text">Puzzle Completed in less than <span>30 moves</span>' +
                '</div></div></div><div class="see-options"><button class="see-play-again">Play Again</button><button class="see-choose-difficulty">Choose New Difficulty</button></div>';
            },
            styleClass  : 'see-complete',
            onOpen      : function (modal) {
                modal.find('.see-choose-difficulty').onTap(function(){
                        modals.open('newgame');
                });
                modal.find('.see-play-again').onTap(function(){
                    newGame();
                });
                modal.find('.see-share').on('click', function(){
                    _See.GameCore.fbShare(
                        "I solved a " + session.size + "x" + session.size + " puzzle in " + session.movesCount + " moves in PicSlide",
                        "PicSlide is a puzzle game where you move tiles to assemble a picture in the least amount of moves, and playing earns points toward rewards!",
                        "Want to see if you can beat my score of " + session.movesCount + " moves on a " + session.size + "x" + session.size + " puzzle in PicSlide?",
                        "http://" + (_See.config.cdn ? _See.config.cdn : _See.config.serverName) + "/app/public/images/puzzles/fbshare.jpg"
                    );
                });
                // If we don't have a TSSO key, don't show share
                if (!_See.config.tsso_share) {
                    modal.find('.see-share').remove().end().find('.playagain').css({"top":"390px"});
                }
                var showResults = setTimeout(function(){updateCounter(session.movesCount,'.see-results',1000)},'1000');
                clearInterval(sessionTimer);
                displayCompletionTime();

            }


        });

        // Signin - Anonymous user has hit the limit of games without logging in
        modals.add('signin', {
            html        : '<div class="canvas"><h3>Sign In</h3><p>You must be signed in to continue playing. <br/><a href="#" class="see-do-login">Log in</a>' +
                          ' or <a href="#" class="see-do-register">Sign up</a> to continue.</p></div>',
            styleClass  : 'see-signin see-messagemodal',
            onOpen      : function (modal) {
                modal.find('a.see-do-login').onTap(function(){
                    user.doLogin('login');
                }).end().find('a.see-do-register').onTap(function(){
                    user.doLogin('register');
                });
            }
        });

        /**
         * Adding event listeners
         */
        events.on('playerStop', function(e, timeElapsed) {
            stopGame('playerstopped');
        })
        .on('playerStart userLoggedIn userLoggedOut', function(e, timeElapsed) {
            stopGame('newgame');
        })
        .on('adFinish', function(e, timeElapsed) {
            session.start(startGame);
        });

        /**
         * Method to start a new game / build a new game board
         */
        function newGame() {

            // if player is on page and not active, stop
            if (status.hasPlayer() && !status.activePlayer()){
                return stopGame('playerstopped');
            }

            dom.footer.show();  // display footer if hidden
            dom.board.hide();   // hide board while we reconfigure...

            /*if (!user.isLoggedIn && user.anonGameCookie()) {
                stopGame('signin');
                return;
            }*/

            // Set piece size
            switch (session.setting) {
                case 3: session.pieceSize = 166; break;
                case 4: session.pieceSize = 125; break;
                case 5: session.pieceSize = 100; break;
                default: break;
            }

            // Reset moves counter
            updateCounter('000','.see-footer',300);
            updateCounter('000','.see-results',300);

            // Append size class to DOM
            dom.removeClass('size-3 size-4 size-5').addClass('size-'+session.size);

            if (!status.hasPlayer() && ads.checkPlayAd(session.plays)){
                stopGame('videoad');
                ads.playAd();
                return;
            }
            session.start(startGame);

        }

        /**
         * This accepts server response from session start
         *
         * @param object data Session start data from the server
         */
        function startGame(data) {
            // reset session details for new game
            session.plays++;
            session.score       = 0;
            session.moves       = '';
            session.movesCount  = 0;
            var sessionTimer;
            clearInterval(sessionTimer);

            // Not solved
            dom.removeClass('see-solved');

            // Hide that modal
            modals.close();

            events.emit('gameStart');

            board = new Board(session.size, session.gameseed);
            // Start by rendering the board...
            renderBoard();
            // Then do an update
            updateBoard();
            // We've reconfigured, now show
            dom.board.show();
            // Execute a Load action, if there's one configured
            _See.GameCore.execAction(gameId, 'onPlay');
        }

        /**
         * Logic when game is won
         */
        function completeGame() {
            // Update DOM
            dom.addClass('see-solved');
            dom.board.find('.see-piece').off('touchstart mousedown');
            dom.board.find('.see-piece-hole').css({
                'top' : ((session.size - 1) * session.pieceSize),
                'left' : ((session.size - 1) * session.pieceSize)
            }).show();
            session.complete({
                "p1" : session.moves,
                "p2" : session.movesCount,
                "p3" : session.gameseed
            });
            modals.open('completegame');

            events.emit('gameComplete');
            // Execute a Finish action, if there's one configured
            _See.GameCore.execAction(gameId, 'onFinish');
        }

        /**
         * Stops play of game and if a modal is passed, opens that
         *
         * @param string modal [optional] Modal to display
         */
        function stopGame(modal)
        {
            _See.debug && console.info('slidepuzzle.stopGame : ', modal);
            // Send out gameComplete event
            events.emit('gameStop');
            if (modal) {
                modals.open(modal);
            }
        }

        /**
         * Initial render of the game board
         */
        function renderBoard() {
            var grid    = board.grid(),
                // iterators
                i       = 0,
                j       = 0,
                html    = '',
                label   = '',
                id      = '',
                pieceId = 0,
                offset  = 0,
                bgImage = session.img;

            // loop through grid and build HTML
            for ( i = 0; i < session.size; i++) {
                for ( j = 0; j < session.size; j++) {
                    id      = (grid[i][j] === false) ? 'hole' : grid[i][j];
                    label   = (id == 'hole') ? '' : id + 1;
                    html += '<span class="see-piece see-piece-' + id + '" data-piece="' + id + '" style="top:' + (i * session.pieceSize) + 'px; left:' + (j * session.pieceSize) + 'px;"><span class="see-piece-hint">' + label + '</span></span>';
                }
            }

            // Set up new HTML
            dom.board.html(html);

            // If no image is configured, grab one from the configuration, or a stock image
            if (!bgImage) {
                // Check if the config has been set with a collection of game images:
                var gameImages = _See.GameCore.getConfigSetting(gameId, 'images', []);
                if (gameImages.length) {
                    // set the bgImage from one of the array items
                    bgImage = gameImages[Math.floor(Math.random() * gameImages.length)];
                } else {
                bgImage = _See.getBaseUrl(true) + '/app/public/images/puzzles/puzzle.' + (Math.floor(Math.random() * 27) + 1) + '.jpg';
            }
            }
            // Set backgroud picture
            dom.find('.see-piece').css({"background-image": "url('" + bgImage + "')" });

            // Update background picture positions / offsets
            for ( i = 0; i < session.size; i++) {
                for ( j = 0; j < session.size; j++) {
                    id = i + (j * session.size);
                    if (id == session.size * session.size - 1) {
                        id = 'hole';
                    }
                    dom.find('.see-piece-'+id).css({
                        "background-position": ((i * -session.pieceSize)+"px "+(j * -session.pieceSize)+"px")
                    });
                }
            }

            // Add click events
            dom.board.find('.see-piece').onTap(function(e) {
                board.clickPiece(e.target);
            });
        }

        /**
         * Called to render / re-render board as it's contents change
         */
        function updateBoard() {
            // Update header
            dom.footer.moves.html(session.movesCount + ' move' + (session.movesCount == 1 ? '' : 's'));

            // @TODO: Add winTest in Board object
            var grid    = board.grid(),
                win     = true, // default to true, false if we miss a match in the render
            pieceId = 0, i = 0, j = 0;

            // loop through grid to check for win status
            for ( i = 0; i < session.size; i++) {
                for ( j = 0; j < session.size; j++) {
                    // win check - if the pieces all line up sequentially, you win
                    if (pieceId != grid[i][j] && grid[i][j] !== false) {
                        win = false;
                        break;
                    }
                    pieceId++;
                }
            }

            // if win, play victory music
            if (win) {
                completeGame();
            }
        }

        /**
         * Board object
         * Y, X - 0,0 at the top left
         *
         * @parm  {int}     size  Size of board, width / height
         * @parm  {string}  seed  A seed to build the board rather than generating randomly
         */
        function Board(size, seed) {

            var pieces = [], // Array to track each piece
            piecesCount = (size * size) - 1, // the number of pieces, minus the one piece

            // multidimensional array to track the board
            grid    = [],

            // track blank piece
            hole    = {
                y : 0,
                x : 0
            },
            // iterators
            pieceId     = 0,
            i           = 0,
            j           = 0,
            pieceVal    = 0;

            // If seed isn't long enough for size, we've got a problem
            if (seed.length != (size * size)) {
                _See.debug && console.log('Slidepuzzle: error, seed isn\'t correct size: ', seed, size );
                return false;
            }

            // Use Seed to build board
            for ( i = 0; i < size; i++) {
                grid[i] = [];
                // prime each row
                for ( j = 0; j < size; j++) {
                    pieceVal = seed.charCodeAt(pieceId) - 97;
                    // If piece isn't hole, set up
                    if (pieceVal != 25) {
                        pieces[pieceVal] = {y: i, x: j};
                        grid[i][j] = pieceVal;
                    } else {
                        grid[i][j] = false;
                        hole.y = i;
                        hole.x = j;
                    }
                    pieceId++;
                }
            }

            /**
             * Handle a piece click
             */
            function clickPiece(piece) {
                var pieceId     = _See.$(piece).data('piece'),
                    direction   = false,
                    offset      = 0,
                    oY          = 0,
                    oX          = 0,
                    pX, // piece X coord
                    pY; // piece Y coord

                // Test for valid pieceId
                if (pieceId < 0 || pieceId >= piecesCount) {
                    return false;
                }

                // Get coords for piece
                pY = pieces[pieceId].y;
                pX = pieces[pieceId].x;

                // One of these offsets must be the same for the piece to line up with the hole
                if (hole.y != pY && hole.x != pX) {
                    return false;
                }

                // Get offsets

                if (pY == hole.y) {
                    oX = (pX < hole.x) ? -1 : 1;
                } else {
                    oY = (pY < hole.y) ? -1 : 1;
                }

                // Now move each piece starting from the hole to the piece clicked
                offset = Math.abs(hole.y - pY + hole.x - pX);
                var cssProp     = (hole.y == pY) ? 'left' : 'top',
                    cssAdjust   = {},
                    tracking    = { y: hole.y, x: hole.x },
                    tempId      = -1,
                    pieceVal    = 0;

                cssAdjust[cssProp] = (oX < 0 || oY < 0 ? '+' : '-') + "=" + session.pieceSize + "px";

                for (var i=0; i < offset; i++) {
                    tracking.y += oY;
                    tracking.x += oX;

                    // Capture move
                    pieceVal = tracking.y * size + tracking.x;
                    captureMove(pieceVal);

                    // Swap piece with hole
                    tempId = grid[tracking.y][tracking.x];

                    pieces[tempId].y        = hole.y;
                    pieces[tempId].x        = hole.x;
                    grid[hole.y][hole.x]    = tempId;
                    grid[tracking.y][tracking.x] = false;
                    hole.y                  = tracking.y;
                    hole.x                  = tracking.x;

                    _See.debug && console.log(tracking.y, tracking.x, "Piece: " + tempId, pieceVal);

                    // If we're not mobile, animate, otherwise just switch
                    if (!_See.$.browser.mobileDevice) {
                        dom.board.find('.see-piece-'+tempId).animate(cssAdjust, 200);
                    } else {
                        dom.board.find('.see-piece-'+tempId).css(cssAdjust, 200);
                    }
                }

                // Finally update the board
                updateBoard();
                return true;
            }

            /**
             * Update user's moves string with latest square, and obfuscates using the game seed
             */
            function captureMove(square) {
                var i       = session.moves.length,
                    offset  = session.gameseed.charCodeAt(i % session.gameseed.length) - 97;
                if (session.moves.length < 150) {
                    session.moves += String.fromCharCode((square + offset) % 26 + 97);
                }
                session.movesCount++;

                //for testing (remove for production)
                if(session.movesCount>1000){
                    completeGame();
                }

                //start timer
                if(session.movesCount==1){
                    session.timer = null;
                    sessionTimer = setInterval(function(){session.timer++;},'1000');
                }

                //update counter
                updateCounter(session.movesCount, '.see-footer',300);
            }



            /**
             * Which direction is the piece in
             *
             * @param  integer pieceId   ID for piece being moved
             * @return integer Direction offset of piece from hole (1 move up, 2 move right, 3 move down, 4 move left)
             */
            function getMoveDirection(pieceId) {
                var pX, // piece X coord
                    pY, // piece Y coord
                    end = 1;

                // Test for valid pieceId
                if (pieceId < 0 || pieceId >= piecesCount) {
                    return false;
                }

                pY = pieces[pieceId].y;
                pX = pieces[pieceId].x;

                // Here's the test if the piece is nearby
                if (pY == hole.y && hole.x > pX) {
                    return 2;
                } else if (pY == hole.y && hole.x < pX) {
                    return 4;
                } else if (pX == hole.x && hole.y > pY) {
                    return 3;
                } else if (pX == hole.x && hole.y < pY) {
                    return 1;
                }

                // Everything else isn't
                return false;
            }

            // Return public methods
            return {

                piecesCount : piecesCount,

                // Expose clickPiece
                clickPiece : function(piece) {
                    return clickPiece(piece);
                },

                // expose current grid on request
                grid : function() {
                    return grid;
                }
            };
        }

        function updateCounter(points,scope,dur) {
            var l = points.toString().length;
            switch (l) {
                case 1:
                    $(scope + ' .see-moves-digit-3').animate({'top': rollDigit(points)}, dur);
                    break;
                case 2:
                    var char1 = points.toString().charAt(0);
                    var char2 = points.toString().charAt(1);
                    $(scope + ' .see-moves-digit-2').animate({'top': rollDigit(char1)}, dur);
                    $(scope + ' .see-moves-digit-3').animate({'top': rollDigit(char2)}, dur);
                    break;
                case 3:
                    var char1 = points.toString().charAt(0);
                    var char2 = points.toString().charAt(1);
                    var char3 = points.toString().charAt(2);
                    $(scope + ' .see-moves-digit-1').animate({'top': rollDigit(char1)}, dur);
                    $(scope + ' .see-moves-digit-2').animate({'top': rollDigit(char2)}, dur);
                    $(scope + ' .see-moves-digit-3').animate({'top': rollDigit(char3)}, dur);
                    break;
            }

            function rollDigit(value) {
                switch (parseInt(value)) {
                    case 0:
                        return '0';
                        break;
                    case 1:
                        return '-100%';
                        break;
                    case 2:
                        return '-200%';
                        break;
                    case 3:
                        return '-300%';
                        break;
                    case 4:
                        return '-400%';
                        break;
                    case 5:
                        return '-500%';
                        break;
                    case 6:
                        return '-600%';
                        break;
                    case 7:
                        return '-700%';
                        break;
                    case 8:
                        return '-800%';
                        break;
                    case 9:
                        return '-900%';
                        break;
                }
            }
        }

        function displayCompletionTime(){
            var mins = Math.floor(session.timer / 60);
            var secs = session.timer % 60;
            $('.see-completion-time strong').eq(0).html(mins);
            $('.see-completion-time strong').eq(1).html(secs);
        }

        _See.debug && console.log('new slidepuzzle game');

        // Show new game message
        modals.open('newgame');
    },

    // Initialize
    init : function() {
        _See.debug && console.log('Slidepuzzle: Init');
        _See.triggerEvent('SlidepuzzleReady');
    },

    // Initialize Widget instance
    initWidget : function(element) {
        _See.debug && console.log('Slidepuzzle: InitWidget.');
        element.game = new this.Game(element);
    }
};

_See.registerWidget(_See.Slidepuzzle);

$('head link[rel="stylesheet"]').remove();