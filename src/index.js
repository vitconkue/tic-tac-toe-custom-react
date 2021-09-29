import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { calculateWinnerFinal } from "./gameLogic.js";



const Square = ({ value, onClick, isHightlight }) => {
  return (
    <button
      className={`square ${isHightlight ? "green-border" : "none"}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

const Board = ({
  numberOfColumn,
  numberOfRow,
  squares,
  handleClick,
  winningSquares,
}) => {
  const renderSquare = (i) => {
    return (
      <Square
        value={squares.at(i)}
        onClick={() => handleClick(i)}
        isHightlight={winningSquares.includes(i)}
      />
    );
  };

  // render a row
  const renderBoardRow = (rowIndex) =>
    Array(numberOfColumn)
      .fill(0)
      .map((_, index) => renderSquare(rowIndex * numberOfColumn + index));

  // render multiple row
  const renderBoard = (numberOfRow) =>
    Array(numberOfRow)
      .fill(0)
      .map((_, index) => (
        <div className="board-row">{renderBoardRow(index)}</div>
      ));

  return <>{renderBoard(numberOfRow)}</>;
};

// Game component receives 2 game parameters: number of row, number of col, winning number
const Game = ({ numberOfColumn , numberOfRow , winningNumber  }) => {
  const [history, setHistory] = React.useState([
    { squares: Array(numberOfRow * numberOfColumn).fill(null), lastMovePlace: -1 },
  ]);

  const [isXNext, setIsXNext] = React.useState(true);

  const [stepNumber, setStepNumber] = React.useState(0);

  const [isSortingHistoryAcs, setIsSortingHistoryAcs] = React.useState(false);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (
      calculateWinnerFinal(
        squares,
        winningNumber,
        numberOfColumn,
        numberOfRow
      ).winner ||
      squares[i]
    ) {
      return;
    }

    squares[i] = isXNext ? "X" : "O";
    setHistory(newHistory.concat([{ squares: squares, lastMovePlace: i }]));
    console.log(`Just hit ${i} th square`);
    setStepNumber(newHistory.length);
    setIsXNext(!isXNext);
  };

  const current = history.at(stepNumber);
  const winnerInformation = calculateWinnerFinal(
    current.squares,
    winningNumber,
    numberOfColumn,
    numberOfRow
  );
  let status;
  let winningSquares;
  if (winnerInformation.winner) {
    status = "Winner: " + winnerInformation.winner;
    winningSquares = winnerInformation.winningSquare;
  } else {
    status = current.squares.includes(null)
      ? "Next player: " + (isXNext ? "X" : "O")
      : "Draw Game !!";

    winningSquares = [];
  }

  const reversedHistory = history.slice().reverse();

  const renderHistoryMoves = (isSortingHistoryAcs) => {
    const workingHistory = isSortingHistoryAcs ? history : reversedHistory;
    return workingHistory.map((step, move) => {
      const index = isSortingHistoryAcs
        ? move
        : workingHistory.length - 1 - move;
      const desc = index
        ? "Go to move #" +
          index +
          `: ${index % 2 === 0 ? "O" : "X"} go in place col: ${
            step.lastMovePlace % numberOfColumn
          }, row: ${Math.floor(step.lastMovePlace / numberOfColumn)}`
        : "Go to game start";
      return (
        <li key={index}>
          <button onClick={() => handleJumpToHistory(index)}>
            <p className={index === stepNumber ? "bold-text" : "none"}>
              {desc}
            </p>
          </button>
        </li>
      );
    });
  };

  const handleJumpToHistory = (move) => {
    setStepNumber(move);

    setIsXNext(move % 2 === 0);
  };

  const handleChangeSortHistory = () => {
    setIsSortingHistoryAcs(!isSortingHistoryAcs);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          numberOfColumn={numberOfColumn}
          numberOfRow={numberOfRow}
          squares={current.squares}
          handleClick={handleClick}
          winningSquares={winningSquares}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>
          <button onClick={handleChangeSortHistory}>
            Change history sort order to{" "}
            {isSortingHistoryAcs ? "Decsending" : "Acsending"}
          </button>
        </div>
        <span>
          <ol>{renderHistoryMoves(isSortingHistoryAcs)}</ol>
        </span>
      </div>
    </div>
  );
};

const GameFactory = () => {
  const [numberOfColumn, setNumberOfColumn] = React.useState(3);
  const [numberOfRow, setNumberOfRow] = React.useState(3);
  const [winningNumber, setWinningNumber] = React.useState(3);

  const handleChangeNumberOfColumn = (event) => {
   
    const intNumberOfColumn = parseInt(event.target.value);
    if( isNaN(intNumberOfColumn) || intNumberOfColumn < 2)
    {
      setNumberOfColumn(3);
      return;
    }
    setNumberOfColumn(intNumberOfColumn);
    
   
  }

  const handleChangeNumberOfRow = (event) => {
   
    const intNumberOfRow = parseInt(event.target.value);
    if( isNaN(intNumberOfRow) || intNumberOfRow < 2)
    {
      setNumberOfRow(3);
      return;
    }
    setNumberOfRow(intNumberOfRow);

  }

  const handleChangeWinningNumber = (event) => {
    const intWinningNumber = parseInt(event.target.value);
    setWinningNumber(intWinningNumber);
  }

  return (
      <>
        <Game numberOfColumn={numberOfColumn} numberOfRow={numberOfRow} winningNumber={winningNumber}/>
      <hr></hr>
        <div className= "gameFactory">
          <label>No. col.: </label>
          <input
              id="inputNumberOfColumn"
              value={numberOfColumn}
              type = "number"
              onChange={handleChangeNumberOfColumn}
          />
          <label>No. row: </label>
          <input
              id="inputNumberOfColumn"
              value={numberOfRow}
              type = "number"
              onChange={handleChangeNumberOfRow}
          />

          <label>Winning:  </label>
          <input
              id="inputNumberOfColumn"
              value={winningNumber}
              type = "number"
              onChange={handleChangeWinningNumber}
          />
        </div>
      </>
  )
}

// ========================================

ReactDOM.render(<GameFactory />, document.getElementById("root"));
