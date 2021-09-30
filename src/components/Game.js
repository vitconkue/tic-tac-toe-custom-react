import {Board} from "./Board";
import React from "react";
import { calculateWinnerFinal } from "../gameLogic";
import "../index.css";

export const Game = ({ numberOfColumn , numberOfRow , winningNumber  }) => {
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