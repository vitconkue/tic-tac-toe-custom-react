import {Square} from "./Square"
import "../index.css";


export const Board = ({
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