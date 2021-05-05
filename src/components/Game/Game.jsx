import "../../styles.css";
import { GameBoard, NameConfig } from "../";
import React, { useState } from "react";
import { GamePiece } from "../";

export const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const current = history[stepNumber];
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };
  const handleClick = (i) => {
    let newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    let squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      history.concat([
        {
          squares: squares
        }
      ])
    );
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  };
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      {/* TODO create GamePieces */}
      <GameBoard squares={current.squares} onClick={(i) => handleClick(i)} />
      <div className="game-info">
        <div className="status">{status}</div>
        {xIsNext ? <GamePiece player={1} /> : <GamePiece player={2} />}
        <ol>{moves}</ol>
        <NameConfig />
      </div>
    </div>
  );
};

export default Game;
