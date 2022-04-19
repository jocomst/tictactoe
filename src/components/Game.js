import React from "react";
import Board from "./Board.js";
import { useState } from "react";
import { calculateWinner } from "./helpers.js";
import { Button } from "react-bootstrap";

const styles = {
  width: "200px",
  margin: "20px auto",
};

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);

  const handleClick = (i) => {
    const timeInHistory = history.slice(0, stepNumber + 1);
    const current = timeInHistory[stepNumber];
    const squares = [...current];
    //if user clicks occupied square/ifgame is won return
    if (winner || squares[i]) return;
    // put x or O in square
    squares[i] = xIsNext ? "X" : "O";
    setHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const renderMoves = () => {
    return history.map((_step, move) => {
      const destination = move ? `Go to move ${move}` : `Go to start`;
      return (
        <li key={move}>
          <Button onClick={() => jumpTo(move)}>{destination}</Button>
        </li>
      );
    });
  };

  return (
    <>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div style={styles}>
        <p>
          {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`}
        </p>
        {renderMoves()}
      </div>
    </>
  );
};

export default Game;
