
// const getRandomInt = (min, max) =>
//     Math.floor(Math.random() * (max - min)) + min;
const getRandomNumber = () =>
    Math.random() >  0.3 ? 2 : 4; 

const getRandomIntRange = (range) =>
    Math.floor(Math.random() * range);

class Board {
    constructor() {
        this.options = {
            size: 4
        };
        this.board = null;
        this.score = 0;
        this.addRandom = true;
    }

    createBoard() {
        let array = [];
        for (let r = 0; r < this.options.size; r++) {
            array[r] = [];
            for (let c = 0; c < this.options.size; c++)
                array[r][c] = 0;
        }
        this.board = array;
        this.addRandomCell();
        this.addRandomCell();  //colhose
    }

    moveUp() {
        let array = this.board;
        for (let r = this.options.size - 1; r > 0; r--)
            for (let c = 0; c < this.options.size; c++) {
                if (array[r][c] !== 0 && array[r - 1][c] === array[r][c]) {
                    array[r - 1][c] = array[r][c] * 2;
                    this.score += array[r][c] * 2;
                    array[r][c] = 0;
                }
                if (array[r - 1][c] === 0) {
                    array[r - 1][c] = array[r][c];
                    array[r][c] = 0;
                }
            }
        this.board = array;
    }

    moveDown() {
        let array = this.board;
        for (let r = 0; r < this.options.size - 1; r++)
            for (let c = 0; c < this.options.size; c++) {
                if (array[r][c] !== 0 && array[r + 1][c] === array[r][c]) {
                    array[r + 1][c] = array[r][c] * 2;
                    this.score += array[r][c] * 2;
                    array[r][c] = 0;
                }
                if (array[r + 1][c] === 0) {
                    array[r + 1][c] = array[r][c];
                    array[r][c] = 0;
                }
            }
        this.board = array;
    }

    moveLeft() {
        let array = this.board;
        for (let r = 0; r < this.options.size; r++)
            for (let c = this.options.size - 1; c > 0; c--) {
                if (array[r][c] !== 0 && array[r][c - 1] === array[r][c]) {
                    array[r][c - 1] = array[r][c] * 2;
                    this.score += array[r][c] * 2;
                    array[r][c] = 0;
                }
                if (array[r][c - 1] === 0) {
                    array[r][c - 1] = array[r][c];
                    array[r][c] = 0;
                }
            }
        this.board = array;
    }

    moveRight() {
        let array = this.board;
        // let moved = false;
        for (let r = 0; r < this.options.size; r++)
            for (let c = 0; c < this.options.size - 1; c++) {
                if (array[r][c] !== 0 && array[r][c + 1] === array[r][c]) {
                    array[r][c + 1] = array[r][c] * 2;
                    this.score += array[r][c] * 2;
                    array[r][c] = 0;
                    // moved = true;
                }
                if (array[r][c + 1] === 0) {
                    array[r][c + 1] = array[r][c];
                    array[r][c] = 0;
                    // moved = true;
                }
            }
        // this.addRandom = moved;
        this.board = array;

    }

    moved(direction) {
            switch (direction) {
                case "up":
                    this.moveUp();
                    break;
                case "down":
                    this.moveDown();
                    break;
                case "left":
                    this.moveLeft();
                    break;
                case "right":
                    this.moveRight();
                    break;
                default:
                    break;
            }
            this.addRandomCell();
    }

    getEmptyCells() {
        const dummyArr = [];
        for (let r = 0; r < this.board.length; r++) {
            for (let c = 0; c < this.board[r].length; c++)
                if (this.board[r][c] === 0)
                    dummyArr.push([r, c]);
        }
        if (!dummyArr.length){
            this.gameOver();
        }
        return dummyArr;
    }

    addRandomCell() {
        const emptyCoordinates = this.getEmptyCells();
        if (emptyCoordinates.length){            
            const randomCoordinate = emptyCoordinates[getRandomIntRange(emptyCoordinates.length)];
            this.board[randomCoordinate[0]][randomCoordinate[1]] = getRandomNumber();
        }
    }

    gameOver() {
        this.board = null;
        this.score = 0;
        this.addRandom = false;
        alert('You lose');  
        this.createBoard();
        
    }

    /// GETTERS
    get getBoard() {
        return this.board;
    }

    get getScore() {
        return this.score;
    }
}

export default new Board();
