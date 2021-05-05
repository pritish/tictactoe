import { Square } from "../";
export const GameBoard = (props) => {
  const highlightSquares = (i) => {
    // if (props.winningSquares.length > 0) {
    //   if (props.winningSquares.indexOf(i) > -1) {
    //     return "square winningSquares";
    //   } else {
    //     return "square";
    //   }
    // } else {
    //   return "square";
    // }
  };
  const renderSquare = (i) => {
    let highlight = highlightSquares(i);

    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        key={i}
        highlightWinSquares={highlight}
      />
    );
  };

  const generateRow = (index, max) => {
    let rows = [];

    for (index; index < max; index++) {
      rows.push(renderSquare(index));
    }
    return rows;
  };

  const generateBoard = (columns, rows) => {
    let board = [];

    /**
     * Generate (col * row, here, 3 * 3 = 9) squares
     */
    for (let i = 0; i < columns * rows; i++) {
      /**
       * Generate columns.
       *
       * Only allow multiples of "number of columns".
       * For example, if number of columns is 3, then,
       * 3, 6, 9.
       */
      if (i % columns === 0) {
        board.push(
          <div className="board-row" key={i}>
            {generateRow(i, i + columns)}
          </div>
        );
      }
    }
    return board;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "399px",
          height: "399px",
          border: "10px solid grey"
        }}
      >
        {generateBoard(3, 3)}
        {props.children}
      </div>
    </>
  );
};

export default GameBoard;
