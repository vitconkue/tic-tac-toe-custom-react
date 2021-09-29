function joinArrayToString(arr) {
  let result = "";
  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] != null) {
      result += arr[i];
    } else {
      result += "N";
    }
  }
  return result;
}
function checkSubArray(main, sub) {
  const stringMain = joinArrayToString(main);
  const stringSub = joinArrayToString(sub);

  return stringMain.indexOf(stringSub);
}

function checkWinningRow(squares, winningNumber, numberOfColumn, numberOfRow)
{
  const XWinArray = Array(winningNumber).fill("X");
  const OWinArray = Array(winningNumber).fill("O");

  const result = {winner : null};

  //  create the arrays of rows
  let arrayOfRows = []; 
  for(let i = 0; i < numberOfRow; i++)
  {
     arrayOfRows.push(squares.slice(i*numberOfColumn, i*numberOfColumn + numberOfColumn));
  } 
  // TODO: check in rows
  arrayOfRows.forEach((row,index) => {
    const checkSubArrayXResult = checkSubArray(row,XWinArray);
    const checkSubArrayOResult = checkSubArray(row,OWinArray);


    if(checkSubArrayXResult > -1 || checkSubArrayOResult > -1)
    {
      const startNumber =  index * numberOfColumn + (checkSubArrayXResult > -1 ? checkSubArrayXResult : checkSubArrayOResult);
      let resultArray = [];
      for(let k = startNumber; k < winningNumber + startNumber; k++)
      {
        resultArray.push(k);
      }


      result.winner =  checkSubArrayXResult > -1 ? 'X': 'O';
      result.winningSquare = resultArray;
    }
  });

  // return fallback result

  return result;
}

function checkWinningColumn(squares, winningNumber, numberOfColumn, numberOfRow)
{
  const XWinArray = Array(winningNumber).fill("X");
  const OWinArray = Array(winningNumber).fill("O");

  const result = {winner : null};
  // TODO: create the arrays of columns
  let arrayOfColumns = [];
  for(let j=0 ; j < numberOfColumn; j++)
  {
    arrayOfColumns.push(
        squares.filter((square,index) => (index - j) % numberOfColumn === 0)
    );

  }

  // TODO: check in columns
  arrayOfColumns.forEach((column, index) => {
    const checkSubArrayXResult = checkSubArray(column,XWinArray);
    const checkSubArrayOResult = checkSubArray(column,OWinArray);

    if(checkSubArrayXResult > -1 || checkSubArrayOResult > -1)
    {
      const startNumber = index
          + (checkSubArrayXResult > -1 ? checkSubArrayXResult : checkSubArrayOResult) * numberOfColumn

      let resultArray = [];
      for(let i = 0; i < winningNumber; i++)
      {
         resultArray.push(startNumber + i*numberOfColumn);
      }

      result.winner =  checkSubArrayXResult > -1 ? 'X': 'O';
      result.winningSquare = resultArray;
    }

  })

  // TODO: return result
  return result;
}

function checkWinningDiagonal(squares, winningNumber, numberOfColumn, numberOfRow)
{
  const XWinArray = Array(winningNumber).fill("X");
  const OWinArray = Array(winningNumber).fill("O");

  const result = {winner : null};
  // TODO: create the arrays of diagonals

  // TODO: check in diagonals

  // TODO: return result
  return null;
}

export function calculateWinnerFinal(squares, winningNumber, numberOfColumn, numberOfRow)
{
  // TODO:  gather result from sub-problem
  const rowCheckResult = checkWinningRow(squares, winningNumber, numberOfColumn, numberOfRow);
  const columnCheckResult = checkWinningColumn(squares,winningNumber,numberOfColumn,numberOfRow);
  const haveWinner = (rowCheckResult.winner || columnCheckResult.winner);

  if(haveWinner)
  {
    if(rowCheckResult.winner)
      return rowCheckResult;
    if(columnCheckResult.winner)
      return columnCheckResult;
  }

  return {winner: null};
}


export default function calculateWinnerAdvanced(
  squares,
  winningNumber,
  numberOfColumn,
  numberOfRow
) {
 
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winningSquare: lines[i],
      };
    }
  }
  return {
    winner: null,
  };
}


