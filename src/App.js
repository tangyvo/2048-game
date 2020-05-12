import React, { useState, useEffect } from "react";
import { blockIds, colour } from "./globalObjects";
import Header from "./component/Header";

function App() {
  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [choosenBlock, setChoosenBlock] = useState();
  const [newBlock, setNewBlock] = useState();
  const [score, setScore] = useState();
  const [bestScore, setBestScore] = useState();
  const LOCALSTORAGE_KEY = '2048-best-score';

  useEffect(() => {
    twoFourBlock();
    assignBlock();
    setBestScore(localStorage.getItem(LOCALSTORAGE_KEY));
  }, []);

  useEffect(() => {
    setScore(newBlock);
  }, [newBlock])

  const init = () => {
    setGrid([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    twoFourBlock();
    assignBlock();
    setScore(newBlock);
    if (score > bestScore) { localStorage.setItem(LOCALSTORAGE_KEY, score); 
    setBestScore(score)};
  };

  // return either a 2 or 4
  const twoFourBlock = () => {
    const num = [2, 4];
    const randIndex = Math.round(Math.random());
    setNewBlock(num[randIndex]);
  };

  // return random block
  const randBlock = () => {
    const randIndex = Math.floor(Math.random() * 16);
    return blockIds[randIndex];
  };

  // assign a  block
  const assignBlock = () => {
    let id = randBlock();
    const col = id.split("-")[0];
    const row = id.split("-")[1];
    setChoosenBlock(id);
    console.log("assignBlock");
    setGrid((prev) => (prev[row][col] = newBlock));
  };

  const updateScore = () => {
    console.log(grid);
    let total = 0;
    total = grid[0].reduce((prev, cur) => prev + cur, total);
    console.log(grid[0], total);
    total = grid[1].reduce((prev, cur) => prev + cur, total);
    console.log(grid[1], total);
    total = grid[2].reduce((prev, cur) => prev + cur, total);
    console.log(grid[2], total);
    total = grid[3].reduce((prev, cur) => prev + cur, total);
    setScore(total);
    console.log(grid[3], total);
  };

  return (
    <div className="app">
      <Header score={score} bestScore={bestScore} init={init} />

      <main className="grid">
        {blockIds.map((block) => (
          <div
            className={block === choosenBlock ? colour(newBlock) : null}
            key={block}
          >
            {block === choosenBlock ? newBlock : ""}
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
