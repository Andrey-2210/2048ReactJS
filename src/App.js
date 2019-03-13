import React, { Component } from 'react';
import Board from './logics/main';
import './App.css';
import Row from './components/Row';

class App extends Component {

    state = {
      board: [],
      size: 4,
      score: 0
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

