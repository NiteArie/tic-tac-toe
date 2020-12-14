const Game = (function() {
    const _versusPlayerButton = document.querySelector(".hero__buttons__player");
    const _backButton = document.querySelector(".game__options__back");
    const _clearBoardButton = document.querySelector(".game__options__clear");
    const _boardContainer = document.querySelector(".board");
    const _game = document.querySelector(".game");
    const _hero = document.querySelector(".hero");
    const _gameTurnAlert = document.querySelector(".game__turn");
    const _gameOverlay = document.querySelector(".game__over");
    const _gameOverlayWinner = document.querySelector('.game__over__player');
    const _gameOverButton = document.querySelector('.game__over__again');

    let _currentMark = 1;
    let _gameHidden = true;
    let _gameDone = false;
    let _winner = null;
    const _size = 9;
    let _board = [];
    const _winCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    
    _versusPlayerButton.addEventListener("click", toggleGameUI);
    _backButton.addEventListener("click", toggleGameUI);
    _clearBoardButton.addEventListener("click", removeAllMarks);
    _gameOverButton.addEventListener("click", resetGame);

    initBoard();
    renderBoard();

    function clearBoardData() {
        for ( let i = 0; i < _board.length; i++) {
            _board[i] = 0;
        }
    }

    function displayGameTurn() {
        _gameTurnAlert.classList.remove("green", "red");
        if ( _currentMark == 1) {
            _gameTurnAlert.textContent = "It's player 1 turn";
            _gameTurnAlert.classList.add("green");
        } else {
            _gameTurnAlert.textContent = "It's player 2 turn";
            _gameTurnAlert.classList.add("red");
        }
    }

    function toggleGameUI() {
        _gameHidden = !_gameHidden;
        renderHero();
        renderGameUI();
    }

    function renderHero() {
        if (_gameHidden) {
            _hero.classList.remove('hidden');
        } else {
            _hero.classList.add('hidden');
        }
    }

    function renderGameUI() {
        if (_gameHidden) {
            _game.classList.add('hidden');
        } else {
            _game.classList.remove('hidden');
        }
    }

    function resetGame() {
        _currentMark = 1;
        _gameDone = false;
        _winner = null;
    
        clearBoardData();
        clearBoardDOM();
        renderBoard();
        renderGameOverlay();
    }

    function renderGameOverlay() {
        if (_gameDone) {
            _gameOverlay.classList.remove('hidden');
            if (_winner == 1) {
                _gameOverlayWinner.textContent = "Player 1 won!!!";
            } else if ( _winner == 2) {
                _gameOverlayWinner.textContent = "Player 2 won!!!";
            } else if ( _winner == 3) {
                _gameOverlayWinner.textContent = "Draw!!!";
            }
        } else {
            _gameOverlay.classList.add('hidden');
        }
    }

    function initBoard() {
        for ( let i = 0; i < _size; i++) {
            _board.push(0);
        }
    }

    function removeAllMarks() {
        let boardPads = document.querySelectorAll(".board__pad");

        for( let i = 0; i < boardPads.length; i++ ) {
            _board[i] = 0;
            boardPads[i].textContent = '';
            boardPads[i].removeAttribute('mark');

        }
    }

    function clearBoardDOM() {
        let boardPads = document.querySelectorAll(".board__pad");

        for( let i = 0; i < boardPads.length; i++ ) {
            boardPads[i].remove();
        }
    }

    function renderBoard() {
        let winCondition = checkWinCondition();
        for ( let i = 0 ; i < _board.length; i++) {
            let pad = document.createElement('div');
            pad.setAttribute('pos', i);
            pad.classList.add("board__pad");

            if ( !winCondition ) {
                pad.addEventListener('click', markPosition);
            }
            setPadMark(pad, _board[i]);

            _boardContainer.appendChild(pad);
        }
        displayGameTurn();
        if ( winCondition) {
            _gameDone = true;
            renderGameOverlay();
        }
    }

    function reverseMark() {
        if ( _currentMark == 1) 
            _currentMark = 2;
        else 
            _currentMark = 1;
    }

    function setPadMark(pad, value) {
        let markImg = document.createElement('img');
        markImg.alt = "Player Mark";
        markImg.classList.add("board__pad__mark");

        if (value == 1) {
            markImg.src = "assets/check.svg";
        } else if ( value == 2) {
            markImg.src = "assets/cancel.svg";
        } else {
            return;
        }
        pad.appendChild(markImg);
        pad.setAttribute('mark', value);
    }

    function markPosition(event) {
        let position = Number(event.target.getAttribute('pos'));

        if ( position < _board.length ) {
            if ( _board[position] == 0) {
                _board[position] = _currentMark;
                reverseMark();
                clearBoardDOM();
                renderBoard();
            }
        }
        
    }

    function checkWinCondition() {
        if ( _winCondition.some(winRow => {
            let _boardWinRow = [];
            winRow.forEach((position) => {
                if ( _board[position] != 0)
                    _boardWinRow.push(_board[position]);
            })
            if ( _boardWinRow.length == 3) {
                if ( _boardWinRow.every(mark => mark == 1)) {
                    _winner = 1;
                    return true;
                } else if ( _boardWinRow.every(mark => mark == 2)) {
                    _winner = 2;
                    return true;
                } else {
                    return false;
                }
            }
        })) {
            return true;
        } else if ( _board.filter(mark => mark != 0).length == 9 ) {
            _winner = 3;
            return true;

        } else {
            return false;
        }
    }

})();
