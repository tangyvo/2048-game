import React from "react";

const Gameover = ({ gameover, score }) => {
  return (
    <div className={gameover ? "gameover show" : "gameover"}>
      <p>{score >= 2048 ? `You've won` : `No more moves`}</p>
    </div>
  );
};

export default Gameover;
