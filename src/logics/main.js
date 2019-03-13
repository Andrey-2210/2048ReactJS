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
        let row;
        let isMoved = false;
        for(let c = 0; c < this.options.size; c++)
            for(let r = 1; r < this.options.size; r++) 
                if(array[r][c]) {
                    row = r;
                    while (row - 1 >= 0) {
                        if (!array[row - 1][c]) {
                            array[row - 1][c] = array[row][c];
                            array[row][c] = 0;
                            isMoved = true;
                            row--;
                        } else if (array[row][c] === array[row - 1][c]) {
                            array[row - 1][c] *= 2;
                            this.score +=  array[row - 1][c];
                            array[row][c] = 0;
                            isMoved = true;
                            break;
                        } else
                            break;                        
                    }
                }
            
        this.addRandom = isMoved;
        this.board = array;
        this.addRandomCell();
    }

    moveDown() {
        let array = this.board;
        let row;
        let isMoved = false;

        for(let c = 0; c < this.options.size; c++)
            for(let r = this.options.size - 2; r >= 0; r--) 
                if(array[r][c]) {
                    row = r;                   
                    while (row + 1 < this.options.size) {
                        if (!array[row + 1][c]) {
                            array[row + 1][c] = array[row][c];
                            array[row][c] = 0;
                            isMoved = true;
                            row++;
                        } else if (array[row][c] === array[row + 1][c]) {
                            array[row + 1][c] *= 2;
                            this.score +=  array[row + 1][c];
                            array[row][c] = 0;
                            isMoved = true;
                            break;
                        } else
                            break;                        
                    }
                } 

        this.addRandom = isMoved;
        this.board = array;
        this.addRandomCell();
    }

    moveLeft() {
        let array = this.board;
        let col;
        let isMoved = false;

        for(let r = 0; r < this.options.size; r++)
            for(let c = 1; c < this.options.size; c++) 
                if(array[r][c]) {
                    col = c;
                    while (col - 1 >= 0) {
                        if (!array[r][col - 1]) {
                            array[r][col - 1] = array[r][col];
                            array[r][col] = 0;
                            isMoved = true;
                            col--;
                        } else if (array[r][col] === array[r][col - 1]) {
                            array[r][col - 1] *= 2;
                            this.score +=  array[r][col - 1];
                            array[r][col] = 0;
                            isMoved = true;
                            break;
                        } else
                            break;                        
                    }
                }
        this.addRandom = isMoved;       
        this.board = array;
        this.addRandomCell();
    }

    moveRight() {
        let array = this.board;
        let col;
        let isMoved = false;

        for(let r = 0; r < this.options.size; r++)
            for(let c = this.options.size - 2; c >= 0; c--) 
                if(array[r][c]) {
                    col = c;
                    while (col + 1 < this.options.size) {
                        if (!array[r][col + 1]) {
                            array[r][col + 1] = array[r][col];
                            array[r][col] = 0;
                            isMoved = true;
                            col++;
                        } else if (array[r][col] === array[r][col + 1]) {
                            array[r][col + 1] *= 2;
                            this.score +=  array[r][col + 1];
                            array[r][col] = 0;
                            isMoved = true;
                            break;
                        } else
                            break;                        
                    }
                }      

        this.addRandom = isMoved;        
        this.board = array;
        this.addRandomCell();
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

    }

    getEmptyCells() {
        const dummyArr = [];
        for (let r = 0; r < this.board.length; r++) {
            for (let c = 0; c < this.board[r].length; c++)
                if (this.board[r][c] === 0)
                    dummyArr.push([r, c]);
        }
        return dummyArr;
    }

    addRandomCell() {
        const emptyCoordinates = this.getEmptyCells();        
        if (emptyCoordinates.length){    
            if (this.addRandom){
                const randomCoordinate = emptyCoordinates[getRandomIntRange(emptyCoordinates.length)];
                this.board[randomCoordinate[0]][randomCoordinate[1]] = getRandomNumber();
            }
            }else{
                this.gameOver();
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
