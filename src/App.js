import React, { Component } from 'react';
import Board from './logics/main';
import './App.css';
import Row from './components/Row';
function getTouches(e) {
  return e.touches
}                                                     


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      board: [],
      size: 4,
      score: 0
    }
    this.xTouch=null;
    this.yTouch=null;

  }


  restartGame = () =>{
    Board.restartGame();
    this.updateBoard();
  }
  updateBoard(){
    this.setState({board: Board.getBoard,
      score: Board.getScore});
  }

  componentWillUnmount(){
    window.removeEventListener("keyup", this.keyHandling);
  }

  componentDidMount(){
    window.addEventListener("keyup", this.keyHandling);
    document.addEventListener("touchstart", this.touchStart,false);
    document.addEventListener("touchmove", this.touchMove,false);
    Board.createBoard();
    this.updateBoard(); 
  }

  keyHandling = (e) =>{
    switch (e.keyCode) {
      case 38:  //up
        Board.moved('up');
        this.updateBoard();
        break;
      case 40:  //down
        Board.moved('down');
        this.updateBoard();
        break;
      case 37:  //left
        Board.moved('left');
        this.updateBoard();
        break;
      case 39:  //right
        Board.moved('right');
        this.updateBoard();
        break;
      default:
        break;
    }
  }

  touchStart = (e) => {
    e.preventDefault(); 
    const firstTouch = getTouches(e)[0];                                      
    this.xTouch = firstTouch.clientX;                                      
    this.yTouch = firstTouch.clientY;   
  }

  touchMove = (e) => {
    e.preventDefault(); 
    if ( ! this.xTouch || ! this.yTouch ) {
      return;
  }
    let xTouchEnd = e.touches[0].clientX;
    let yTouchEnd = e.touches[0].clientY;
    let xDiff = this.xTouch - xTouchEnd;
    let yDiff = this.yTouch - yTouchEnd;
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
      if ( xDiff > 0 ) {
        Board.moved('left');
        this.updateBoard();
      } else {
        Board.moved('right');
        this.updateBoard();
      }                       
  } else {
      if ( yDiff > 0 ) {
        Board.moved('up');
        this.updateBoard();
      } else { 
        Board.moved('down');
        this.updateBoard();
      }                                                                 
  }


    this.yTouch = null;
    this.xTouch = null;
  }

  render() {
    const { board, score } = this.state;
    return (
      <div className="App">
        <div className="info">
          <h5 className="score">Score: <b>{score}</b></h5>
          <button className="restart" onClick={this.restartGame}>Restart</button>
        </div>
        <div className="board">
          {board.length > 0 && board.map((value,index) => 
            <div key={index} className="board__row">
              <Row  value={value}/>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;

