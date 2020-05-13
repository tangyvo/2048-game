import React, { useState, useEffect } from "react";
import { blockIds, colour } from "./globalObjects";
import Header from "./component/Header";

function App() {
  const [grid, setGrid] = useState([
    [32, 0, 0, 0],
    [8, 0, 0, 0],
    [16, 0, 0, 0],
    [128, 0, 0, 0],
  ]);
  const [newBlock, setNewBlock] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const LOCALSTORAGE_KEY = "2048-best-score";
  const [playing, setPlaying] = useState(false);
  const [resetToggle, setResetToggle] = useState(true);

  useEffect(() => {
    setBestScore(localStorage.getItem(LOCALSTORAGE_KEY));
    twoFourBlock();
    let id = randBlock();
    const col = id.split("-")[0];
    const row = id.split("-")[1];
    const gridCopy = [...grid];
    gridCopy[row][col] = newBlock;
    setGrid(gridCopy);
    setScore(newBlock);
  }, [resetToggle]);


  // clicking RESET
  const init = () => {
    setGrid([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    if (score > bestScore) {
      localStorage.setItem(LOCALSTORAGE_KEY, score);
      setBestScore(score);
    }
    setResetToggle((prev) => (prev === true ? false : true));
    setPlaying(true);
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

  // shift LEFT eventlistener
  


  return (
    <div className="app">
      {console.log(grid)}
      <Header score={score} bestScore={bestScore} init={init} playing={playing}/>

      <main className="grid">
        {grid
          .join(",")
          .split(",")
          .map((block) => (
            <div className={colour(block)} key={Math.random()}>
              {block === "0" ? "" : block}
            </div>
          ))}
      </main>
    </div>
  );
}

export default App;
