const DOM = (() => {
    let boardContainer = document.querySelector('.board');

    const renderBoard = (board) => {

    }
})();

const Player = function(name, mark, status) {
    this.name = name;
    this.mark = mark;
    this.status = status;
}



const gameboard = (function() {

    const size = 3;
    let board = [];

    initBoard();

    const initBoard = () => {
        for ( let i = 0; i < size; i++) {
            let row = []
            for ( let j = 0; j < size; j++) {
                row.push(0);
            }

            board.push(row);
        }
    }

    const markPosition = (xPos, yPos, player) => {
        if ( xPos < board.length && yPos < board.length ) {
            if ( board[xPos][yPos] == 0) {
                board[xPos][yPos] = 
            }
        }
    }

})();

// const firstPlayer
// const secondPlayer