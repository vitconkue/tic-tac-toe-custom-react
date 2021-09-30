import React from "react";
import { Game } from "./Game";
import "../index.css";

export const GameFactory = () => {
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